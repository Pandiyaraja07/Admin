import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Output,
  Input,
  EventEmitter,
} from "@angular/core";
import { Observable } from "rxjs";
import { DecimalPipe } from "@angular/common";
import { TechnicalSkillService } from "src/app/core/services/tech-skill-map.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { UserProfileService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { roles } from "../../../environments/roles";
import { TechSkillMasterService } from "src/app/core/services/tech-skill-master.service";

@Component({
  selector: "app-technical-skill",
  templateUrl: "./technical-skill.component.html",
  styleUrls: ["./technical-skill.component.scss"],
})
export class TechnicalSkillComponent implements OnInit {
  listSelected = 1;
  sortList = [ { key : 1, value : "Recently modified" }, { key: 2, value: "Domain : Descending(z-a)" }, { key : 3, value : "Domain : Ascending(a-z)" }, { key : 4, value : "Technical depth : High to Low" }, { key : 5, value: "Technical depth : Low to High" }]
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  currentUserId: any = {};
  currentUser: any = {};
  paramUser: any;
  selectedSortOp: any;
  empSgId: any;
  domainList: any;
  appRoles = roles;
  pendingCount: any;
  profileId: any;
  option: any;
  pendingTechnicalSkillsCount: any;
  userRole: any = [];
  techSkillInfo: any = [];
  qualitativeComment: any;
  getQualitativeCommentID: any;
  commmentApprovalStatus: any;
  basicInfo: any;
  list: any;  
  @Input() allData:any= [];
  latestData: any;
  tableData: any = [];
  selectedDomain: any;
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  totalCount: any;

  constructor(
    private route: ActivatedRoute,
    public technicalSkillService: TechnicalSkillService,
    public userProfileService: UserProfileService,
    private modalService: NgbModal,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public techSkillMasterService: TechSkillMasterService
  ) { }

  isDesc: boolean = false;
  column: any = "name";
  submitted = false;
  peopleReviewObj: any = {};
  ngOnInit(): void {

    this.currentUserId = this.authService.currentUser;

    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.currentUser = this.currentUserId.sgId;
      this.empSgId = this.currentUserId.sgId;
      this.userRole = this.appRoles.roles[4];
      this.getTechnicalSkillMap(this.empSgId, this.offset, this.limit, this.option,'employee');
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      this.currentUserId.role == this.appRoles.roles[1] ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3]) ||
      this.currentUserId.role == this.appRoles.roles[0]
    ) {
      this.route.queryParams.subscribe((params) => {
        this.empSgId = params.userId;
        this.profileId = params.userId;
      });
      this.getProfile(this.profileId);
      this.getPendingCount();
      this.getTechnicalSkillMap(this.empSgId, this.offset, this.limit, this.option);
      //this.empSgId = this.currentUserId.sgId;
      this.userRole = this.currentUserId.role;
      //this.getAllEmpSKillMap(this.offset, this.limit);
    }
  }

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ){
      this.getTechnicalSkillMap(this.empSgId, this.offset, this.limit, this.option, 'employee');
    }else{
      this.getTechnicalSkillMap(this.empSgId, this.offset, this.limit, this.option);
    }
    
  }

  counter(i: number) {
    return new Array(i);
  }
  /**
   * Open scroll modal
   * @param qualitativeCommentModel scroll modal data
   */
  qualitativeCommentModelFn(qualitativeCommentModel: any) {
    this.modalService.open(qualitativeCommentModel, { scrollable: true });
  }
  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
    });
  }

  getComment(skillMapId: any) {
    this.technicalSkillService
      .getQualitativeComment(skillMapId)
      .subscribe((data) => {
        console.log("--------------------ddddddddddddddddd", data);
        this.qualitativeComment = data.skill_mapping[0].qualitative_comments_nm;
        this.getQualitativeCommentID = data.skill_mapping[0].skill_mapping_id;
        this.commmentApprovalStatus = data.skill_mapping[0].approval_status;
      });
  }
  onSubmit(techSkillCommentUpdateForm: NgForm) {
    this.submitted = true;
    let obj = {
      qualitative_comments_nm: this.qualitativeComment,
    };
    if (this.getQualitativeCommentID) {
      this.technicalSkillService
        .updateQualitativeComment(this.getQualitativeCommentID, obj)
        .subscribe(
          (data) => {
            this.toastr.success(
              "Qualitative Comment Update successfully.",
              "Success"
            );
            window.location.reload();
          },
          (error) => {
            this.toastr.error("Qualitative Comment Not Update .", "Error");
          }
        );
      this.modalService.dismissAll();
    }
  }

  getTechnicalSkillMap(empSgId: any, offset: any, limit: any, option: any, tempRole ?: any)  {
    this.techSkillInfo = [];
    if(!option){
      option = 1;
    }
    this.technicalSkillService
      .getEmpAllTechSkillMapping(empSgId, offset, limit, option, tempRole)
      .subscribe((data) => {
        this.techSkillInfo = data.rows;
        console.log("-------------------daataaaaaaaaaaaaa", data);

        this.totalCount = data.count;
      });
  }

 getSelectedListItem(e:any){
  console.log("getSelectedListItem", e);
  this.option = e;
  this.getTechnicalSkillMap(this.empSgId, this.offset, this.limit, this.option);
 }

  getPendingCount() {
    this.technicalSkillService
      .getPendingTechSkillCount(this.empSgId)
      .subscribe((data) => {
        this.pendingCount = data.skill_mapping[0];
        this.pendingTechnicalSkillsCount =
          data.skill_mapping_aggregate.aggregate.count;
      });
  }
  changeTechSkillStatus(status: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let obj = {
      approval_date: date,
      approval_status: status,
      approved_fl_id: this.currentUserId.sgId,
      updated_by_nm: this.currentUserId.username,
    };
    this.technicalSkillService
      .updateSkillMappingBulkApproval(this.empSgId, obj)
      .subscribe(
        (data) => {
          this.toastr.success(
            "Approval Status Updated successfully.",
            "Success"
          );
          window.location.reload();
        },
        (error) => {
          this.toastr.error("Approval Status Not Updated", "Error");
        }
      );
  }

  getAllEmpSKillMap(offset: any, limit: any) {
    this.techSkillInfo = [];
    this.technicalSkillService
      .getAllEmpSKillAPI(offset, limit)
      .subscribe((data) => {
        this.techSkillInfo = data.rows;
        this.totalCount = data.count;
      });
  }

  selectedSortFn(event: any) {
    this.selectedSortOp = event.target.value;
    this.page = 1;
    this.loadPage(this.page);
  }

  sort(level: any) {}
}
