import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { Observable } from "rxjs";
import { DecimalPipe } from "@angular/common";
import { roles } from "../../../environments/roles";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorMasterService } from "src/app/core/services/behavior-master.service";

import { Table } from "./advanced.model";
import { BehaviorSkillService } from "src/app/core/services/behavior-skill.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { UserProfileService } from "src/app/core/services/user.service";
import { PermissionService } from "src/app/core/services/permission.service";

@Component({
  selector: "app-behavior-skill",
  templateUrl: "./behavior-skill.component.html",
  styleUrls: ["./behavior-skill.component.scss"],
})
export class BehaviorSkillComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  paramUser: any;
  profileId: any;
  basicInfo: any;
  empSgId: any;
  behaviorSKillPendingCount: any;
  appRoles = roles;
  currentUserId: any = {};
  currentUser: any = {};
  userRole: any;
  demonstratedLevels = [
    { demonstrated_level: 1, value: "Seldom" },
    { demonstrated_level: 2, value: "Occasional" },
    { demonstrated_level: 3, value: "Extensive" },
    { demonstrated_level: 4, value: "Role Model" },
  ];
  behaviorSkillInfo: any = [];
  behaviorDomainAll: any = [];
  behaviorSubDomainAll: any = [];
  behaviorLeve1Traits: any = [];
  demonstratedLevel: any;

  selectValue = ["Recent", "Old"];
  selectedObj: any = {};
  selectedSubDomain: any;
  selectedLevel1: any;

  submitted = false;
  editOption = false;
  behaviorSkillForm!: FormGroup;

  //pagenation variable
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  totalCount: any;
  tableData!: Table[];
  editableTable: any;
  isShowdemonstratedLevels: boolean = false;
  button: any;
  flAccess: boolean = false;
  supervisorAccess: boolean = false;
  hrRole: boolean = false;
  cdRole: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private behaviorSkillService: BehaviorSkillService,
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private behaviorMasterService: BehaviorMasterService,
    private toastr: ToastrService,
    public userProfileService: UserProfileService,
    private permissionService: PermissionService
  ) {}

  isDesc: boolean = false;
  column: any = "name";

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "SGRI" },
      { label: "Employee Behavior Skill", active: true },
    ];

    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.empSgId = "";
      this.currentUser = this.currentUserId.sgId;
      this.empSgId = this.currentUserId.sgId;
      this.userRole = this.appRoles.roles[4];
      this.getRecentBehaviorSkillMap(this.empSgId, this.offset, this.limit);
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      this.currentUserId.role == this.appRoles.roles[1] ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3]) ||
      this.currentUserId.role == this.appRoles.roles[0]
    ) {
      this.userRole = this.currentUserId.role;
      this.empSgId = "";
      this.route.queryParams.subscribe((params) => {
        this.empSgId = params.userId;
        this.profileId = params.userId;
      });
      this.getProfile(this.profileId);
      this.getRecentBehaviorSkillMap(this.empSgId, this.offset, this.limit);
    } else {
    }
    this.behaviorSkillForm = this.formBuilder.group({
      behaviorDomain: ["", [Validators.required]],
      behaviorSubDomain: ["", [Validators.required]],
      behaviorLevel1: ["", [Validators.required]],
      new_demonstrated_level: ["", [Validators.required]],
    });
  }

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    this.getRecentBehaviorSkillMap(this.empSgId, this.offset, this.limit);
  }
  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
      if(this.basicInfo.fl_emp_id == this.currentUserId.emp_id ){
        this.flAccess = true;
      }
      if( this.basicInfo.supervisor_emp_id == this.currentUserId.emp_id){
        this.supervisorAccess = true;
      }
    });
  }
  getRecentBehaviorSkillMap(empSgId: any, offset: any, limit: any) {
    this.behaviorSkillInfo = [];
    this.behaviorSkillService
      .getRecentBehaviorSkillMap(empSgId, offset, limit)
      .subscribe((data) => {
        this.behaviorSkillInfo = data.behavior_skill_mapping;
        this.behaviorSkillInfo.forEach((element: any) => {
          return (element["new_demonstrated_level"] =
            element.approval_status == 0
              ? element.demonstrated_level_to_approve
              : element.demonstrated_level);
        });
        this.totalCount = data.behavior_skill_mapping_aggregate.aggregate.count;
      });
    this.behaviorSkillService
      .getPendinBehaviorSkillMapCount(empSgId)
      .subscribe((data) => {
        this.behaviorSKillPendingCount =
          data.behavior_skill_mapping_aggregate.aggregate.count;
      });
  }

  changeBehaviorSkillStatus(status: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let obj: any = {
      approval_date: date,
      approval_status: status,
      approved_fl_id: this.currentUserId.sgId,
      updated_by_nm: this.currentUserId.username,
    };
    this.behaviorSkillService
      .updateBehaviorSkillMappingBulkApproval(this.profileId, obj)
      .subscribe(
        (data) => {
          this.toastr.success(
            "Approval Status Updated successfully.",
            "Success"
          );
          window.location.reload();
          //this.router.navigate(['profile'], { queryParams: { "userId": this.profileId } });
        },
        (error) => {
          this.toastr.error("Approval Status Not Updated", "Error");
        }
      );
  }

  getBehaviorDomainMaster() {
    this.behaviorMasterService.getBehaviorDomain().subscribe((data) => {
      this.behaviorDomainAll = data.behavior_domain_info;
    });
  }
  getSelectedDomain(id: any) {
    this.form.behaviorSubDomain.patchValue("");
    this.form.behaviorLevel1.patchValue("");
    this.form.new_demonstrated_level.patchValue("");
    this.behaviorLeve1Traits = [];
    this.behaviorMasterService
      .getBehaviorSubDomainFilter(id)
      .subscribe((data) => {
        this.behaviorSubDomainAll = data.behavior_subdomain_info;
        this.isShowdemonstratedLevels = false;
      });
  }

  getSelectedSubDomain(id: any) {
    this.form.behaviorLevel1.patchValue("");
    this.form.new_demonstrated_level.patchValue("");
    this.behaviorMasterService.getBehaviorLevel1Filter(id).subscribe((data) => {
      this.behaviorLeve1Traits = data.behavior_level1_traits;
      this.isShowdemonstratedLevels = false;
    });
  }

  getselectedLevel1() {
    this.isShowdemonstratedLevels = true;
  }

  openModal(content: any) {
    this.button = "Add";
    this.editOption = false;
    this.getBehaviorDomainMaster();
    this.submitted = false;
    this.modalService.open(content, {
      size: "lg",
      windowClass: "modal-holder",
      centered: true,
    });
  }

  get form() {
    return this.behaviorSkillForm.controls;
  }

  onClose() {
    this.form.behaviorDomain.patchValue("");
    this.form.behaviorSubDomain.patchValue("");
    this.form.behaviorLevel1.patchValue("");
    this.form.new_demonstrated_level.patchValue("");
    this.behaviorDomainAll = [];
    this.behaviorSubDomainAll = [];
    this.behaviorLeve1Traits = [];
    this.isShowdemonstratedLevels = false;
    this.selectedLevel1 = {};
    this.modalService.dismissAll();
  }

  saveBehaviorSkill() {
    if (this.behaviorSkillForm.valid) {
      let behaviorDomain = this.behaviorSkillForm.get("behaviorDomain")?.value;
      let behaviorSubDomain =
        this.behaviorSkillForm.get("behaviorSubDomain")?.value;
      let behaviorLevel1 = this.behaviorSkillForm.get("behaviorLevel1")?.value;
      let demonstrated_level = this.behaviorSkillForm.get(
        "new_demonstrated_level"
      )?.value;

      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      let obj:any = {
        behavior_domain_id: behaviorDomain,
        behavior_subdomain_id: behaviorSubDomain,
        behavior_keyarea_id: behaviorLevel1,
        emp_id: this.empSgId,
        demonstrated_level_to_approve: demonstrated_level,
      };
      console.log("objecttttttttt", obj);

      if (this.selectedObj.behavior_skill_id) {
        obj["updated_by_nm"] = this.currentUserId.username;
        obj["approval_date"] = date;
        obj["approval_status"] = 0;
        this.behaviorSkillService
          .UpdateBehaviorSkill(this.selectedObj.behavior_skill_id, obj)
          .subscribe(
            (data) => {
              if (data.statusCode && data.statusCode == 409) {
                this.toastr.error("Behavior SKill Already mapped", "Error");
              } else {
                this.toastr.success(
                  "Behavior SKill Updated successfully.",
                  "Success"
                );
                window.location.reload();
              }
            },
            (error) => {
              this.toastr.error("Behavior SKill Not Update .", "Error");
            }
          );
        this.modalService.dismissAll();
        this.behaviorSubDomainAll = [];
        this.behaviorLeve1Traits = [];
        this.selectedObj = {};
      } else {
        obj["updated_by_nm"] = this.currentUserId.username;
        obj["approval_status"] = 0;
        this.behaviorSkillService.createBehaviorSkill(obj).subscribe(
          (data) => {
            if (data.statusCode && data.statusCode == 409) {
              this.toastr.error("Behavior SKill Already mapped", "Error");
            } else {
              this.toastr.success(
                "Behavior SKill Created successfully.",
                "Success"
              );
              window.location.reload();
            }
          },
          (error) => {
            this.toastr.error("Behavior SKill Not Created .", "Error");
          }
        );
        this.modalService.dismissAll();
        this.behaviorSubDomainAll = [];
        this.behaviorLeve1Traits = [];
        this.selectedObj = {};
      }
    }
    this.submitted = true;
  }

  editCareer(id: any, content:any) {
    this.editOption = true;
    this.behaviorSkillService.getBehaviorSkillId(id).subscribe((data) => {
      this.selectedObj = data.behavior_skill_mapping[0];
      this.selectedObj["new_demonstrated_level"] =
        this.selectedObj.approval_status == 0
          ? this.selectedObj.demonstrated_level_to_approve
          : this.selectedObj.demonstrated_level;
      console.log(
        "this.selectedObjthis.selectedObjthis.selectedObj",
        this.selectedObj
      );

      this.behaviorMasterService.getBehaviorDomain().subscribe((data) => {
        this.behaviorDomainAll = data.behavior_domain_info;
      });
      this.behaviorMasterService
        .getBehaviorSubDomainFilter(this.selectedObj.behavior_domain_id)
        .subscribe((data) => {
          this.behaviorSubDomainAll = data.behavior_subdomain_info;
        });
      this.behaviorMasterService
        .getBehaviorLevel1Filter(this.selectedObj.behavior_subdomain_id)
        .subscribe((data) => {
          this.behaviorLeve1Traits = data.behavior_level1_traits;
        });
      this.isShowdemonstratedLevels = true;
    });

    this.submitted = false;
    this.button = "Update";
    this.modalService.open(content, {
      size: "lg",
      windowClass: "modal-holder",
      centered: true,
    });
  }

  openDeleteModal(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ms-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.behaviorSkillService.deleteBehaviorSKill(id).subscribe(
            (data) => {
              this.toastr.success(
                "Behavior SKill Delete successfully.",
                "Success"
              );
              window.location.reload();
            },
            (error) => {
              this.toastr.error("Behavior SKill Not Delete .", "Error");
            }
          );

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Behavior SKill is safe :)",
            "error"
          );
        }
      });
  }

  sort(level: any) {}
  employeePermission(){
    this.hrRole = this.permissionService.isHR()
    this.cdRole = this.permissionService.isCD()
  }
}
