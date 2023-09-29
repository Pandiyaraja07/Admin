import { Component, OnInit } from "@angular/core";
import { AdditionalSkillService } from "src/app/core/services/additional-skill.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { roles } from "../../../environments/roles";
import { UserProfileService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { environment } from "src/environments/environment";
import { PermissionService } from "src/app/core/services/permission.service";

@Component({
  selector: "app-additional-skill",
  templateUrl: "./additional-skill.component.html",
  styleUrls: ["./additional-skill.component.scss"],
})
export class AdditionalSkillComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public Collapsed = false;
  public firstColleaps = false;
  public secondColleaps = false;
  public bothColleaps = false;
  selectedSortOp = "Recent";
  selectValue = ["Recent", "Old"];
  rootURL = environment.rootUrl +"/";


  empSgId: any;
  additionalSkillService: any;
  patentSkillInfo: any;
  additionalSkillInfo: any;
  trainingCertificates: any;
  productLaunches: any;
  appRoles = roles;
  conferences: any;
  basicInfo: any;
  profileId: any;
  consultation: any;
  currentUserId: any;
  additionalSkills: any = [];
  totalCount: any;
  SkillTypeName: any;
  skillType: any = "Additional Skills";
  active: any = 1;
  isShowButton: Boolean = true;
  //pagenation variable
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  subscription: any;
  approvedStatus: any;
  colors: any = [
    "badge-soft-custom-primary",
    "bg-soft-success",
    "bg-soft-purple",
    "bg-soft-primary",
    "badge-soft-custom-warning",
    "badge-soft-custom-purple",
    "bg-soft-danger",
    "bg-soft-warning",
    "bg-soft-info",
    "badge-soft-custom-green",
    "badge-soft-custom-orange",
    "bg-soft-dark",
  ];
  bgRandom: any = [];

  additionalSkillApprovedStatus: any;
  flAccess: boolean = false;
  ownProfile: boolean = false;
  employeeRole: boolean = false;
  employeeRoletemp: boolean = false;
  flRole: boolean = false;
  flRoletemp: boolean = false;
  supervisorRole: boolean = false;
  supervisorRoletemp: boolean = false;
  hrRole: boolean = false;
  cdRole: boolean = false;
  supervisorAccess: boolean = false;
  FlSupervisorAccess: boolean = true;

  constructor(
    private AdditionalSkillService: AdditionalSkillService,
    private authService: AuthService,
    public userProfileService: UserProfileService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private permissionService : PermissionService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "SGRI" },
      { label: "Employee Additional Skill", active: true },
    ];
    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.empSgId = this.currentUserId.sgId;
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      this.currentUserId.role == this.appRoles.roles[1] ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3]) ||
      this.currentUserId.role == this.appRoles.roles[0]
    ) {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.empSgId = params["id"];
        this.profileId = params["id"];
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        console.log("--------------------------loggggggggggg", params);

        if (params["skillType"]) {
          this.skillType = params["skillType"];
          if (this.skillType == "Additional Skills") {
            this.active = 1;
          } else if (this.skillType == "Training") {
            this.active = 2;
          } else if (this.skillType == "Patents") {
            this.active = 3;
          } else if (this.skillType == "Product Launches") {
            this.active = 4;
          } else if (this.skillType == "Consultation") {
            this.active = 5;
          } else if (this.skillType == "Conferences") {
            this.active = 6;
          }
        }
      });
    }
    this.getProfile(this.empSgId);
    this.subscription = this.activatedRoute.params.subscribe((param: any) => {
      let keys = Object.keys(param);
      console.log(param);
      for (let key of keys) {
        if (param["skillType"] && key == "skillType") {
          this.skillType = param["skillType"];
          if (this.skillType == "Additional Skills") {
            this.active = 1;
          } else if (this.skillType == "Training") {
            this.active = 2;
          } else if (this.skillType == "Patents") {
            this.active = 3;
          } else if (this.skillType == "Product Launches") {
            this.active = 4;
          } else if (this.skillType == "Consultation") {
            this.active = 5;
          } else if (this.skillType == "Conferences") {
            this.active = 6;
          }
        }
      }
    });

    if ((this.selectedSortOp = "Recent")) {
      this.getAdditionalSkill(this.skillType, this.offset, this.limit);
    } else {
      this.getOldAdditionalSkill(this.skillType, this.offset, this.limit);
    }

    this.employeePermission()
  }

  additionalSkillApproveAction(status: any, additionalSkillId: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let objData = {
      approval_date: date,
      approved_fl_id: this.currentUserId.sgId,
      approval_status: status,
    };
    this.AdditionalSkillService.UpdateApprovalAdditionalSkill(
      objData,
      additionalSkillId
    ).subscribe((data) => {
      this.approvedStatus = data;
      this.ngOnInit();
    });
  }

  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
      if( this.basicInfo.supervisor_emp_id == this.currentUserId.emp_id){
            this.supervisorAccess = true;
        }
        if(this.basicInfo.emp_id == this.currentUserId.emp_id){
            this.ownProfile = true;
        }
        if(this.basicInfo.fl_emp_id == this.currentUserId.emp_id ){
            this.flAccess = true;
        }
        if (this.basicInfo.supervisor_emp_id == this.currentUserId.emp_id && this.basicInfo.fl_emp_id == this.currentUserId.emp_id) {
            this.FlSupervisorAccess = false;
        } 
    });
  }

  loadPage(page: number, skillType: any) {
    this.page = page;
    this.skillType = skillType;
    this.offset = (this.page - 1) * this.limit;
    if (this.selectedSortOp == "Recent") {
      this.getAdditionalSkill(this.skillType, this.offset, this.limit);
    } else {
      this.getOldAdditionalSkill(this.skillType, this.offset, this.limit);
    }
  }

  getAdditionalSkill(skillType?: any, offset?: number, limit?: number) {
    this.additionalSkills = [];
    this.AdditionalSkillService.getAdditionalSkill(
      this.empSgId,
      skillType,
      offset,
      limit
    ).subscribe((data) => {
      let additionalskill = [];
      for (let row of data.additional_skills_info) {
        row.additional_skill_attachments = this.getFile(
          row.additional_skill_attachments
        );
        additionalskill.push(row);
      }
      this.additionalSkills = additionalskill;
      this.totalCount = data.additional_skills_info_aggregate.aggregate.count;
      this.SkillTypeName = skillType;
      console.log("additional skill", this.additionalSkills);
      for (let i = 0; i < this.additionalSkills.length; i++) {
        let random = Math.floor(Math.random() * this.colors.length);
        this.bgRandom.push(this.colors[random]);
      }
    });
  }

  getOldAdditionalSkill(skillType?: any, offset?: number, limit?: number) {
    this.additionalSkills = [];
    this.AdditionalSkillService.getOldAdditionalSkill(
      this.empSgId,
      skillType,
      offset,
      limit
    ).subscribe((data) => {
      let additionalskill = [];
      for (let row of data.additional_skills_info) {
        row.additional_skill_attachments = this.getFile(
          row.additional_skill_attachments
        );
        additionalskill.push(row);
      }
      this.additionalSkills = additionalskill;
      this.totalCount = data.additional_skills_info_aggregate.aggregate.count;
      this.SkillTypeName = skillType;
      for (let i = 0; i < this.additionalSkills.length; i++) {
        let random = Math.floor(Math.random() * this.colors.length);
        this.bgRandom.push(this.colors[random]);
      }
    });
  }

  selectedSortFn() {
    this.loadPage(this.page, this.SkillTypeName);
  }

  deleteAdditinalSkill(id: any) {
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
          this.AdditionalSkillService.deleteAdditionalDetails(id).subscribe(
            (val) => {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );

              if (
                this.currentUserId.role == this.appRoles.roles[4] ||
                this.currentUserId.role == this.appRoles.roles[1]
              ) {
                this.router
                  .navigate(["/additional-skill/" + this.skillType])
                  .then(() => {
                    window.location.reload();
                  });
              } else {
                this.router
                  .navigate(["/team/profile/additional-skill"], {
                    queryParams: {
                      id: this.empSgId,
                      skillType: this.skillType,
                    },
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }
            },
            (error) => {
              this.toastr.error("Additional Skills Not Delete .", "Error");
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your " + this.skillType + " is safe :)",
            "error"
          );
        }
      });
  }

  getFile(val: any) {
    console.log(val);
    let fileDetails = [];
    for (let row of val) {
      let fileDetailObj: any = {};
      fileDetailObj["src"] = this.rootURL + row.attachment_nm
      fileDetailObj["name"] =
        row.attachment_nm.split("/")[row.attachment_nm.split("/").length - 1];
      fileDetailObj["detail"] = row;
      fileDetails.push(fileDetailObj);
    }
    return fileDetails;
  }
  employeePermission(){
    this.employeeRole = this.permissionService.isEmployee()
    this.employeeRoletemp = this.permissionService.isEmployee("temp")
    this.flRole = this.permissionService.isFL()
    this.flRoletemp = this.permissionService.isFL("temp")
    this.supervisorRole = this.permissionService.isSupervisor()
    this.supervisorRoletemp = this.permissionService.isSupervisor("temp")
    this.hrRole = this.permissionService.isHR()
    this.cdRole = this.permissionService.isCD()
}
}
