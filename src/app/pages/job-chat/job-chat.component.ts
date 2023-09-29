import { Component, OnInit } from "@angular/core";
import { JobChatService } from "src/app/core/services/job-chat.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { roles } from "../../../environments/roles";
import { UserProfileService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { PermissionService } from "src/app/core/services/permission.service";

@Component({
  selector: "app-job-chat",
  templateUrl: "./job-chat.component.html",
  styleUrls: ["./job-chat.component.scss"],
})
export class JobChatComponent implements OnInit {
  selectValue = ["Recent", "Old"];

  paramUser: any;
  empSgId: any;
  basicInfo: any;
  currentUserId: any = {};
  currentUser: any = {};
  appRoles = roles;
  jobChatInfo: any = [];
  midAspireRole: any;
  longAspireRole: any;
  shortAspireRole: any;
  midTerm: any = [];
  shortTerm: any = [];
  longTerm: any = [];
  selectedSortOp = "Recent";
  //pagenation variable
  limit: number = 5;
  offset: number = 0;
  page: number = 1;
  totalCount: any;
  subscription: any;
  isShowButton: any = false;
  profileId: any;
  approvedStatus: any;

  showTxt: any = "see more";
  readMore: boolean = false;
  flAccess: boolean = false;
  ownProfile: boolean = false;
  employeeRole: boolean = false;
  employeeRoletemp: boolean = false;
  flRole: boolean = false;
  flRoletemp: boolean = false;
  supervisorRole: boolean = false;
  supervisorRoletemp: boolean = false;
  cdRole: boolean = false;
  hrRole: boolean = false;
  supervisorAccess: boolean = false;
  FlSupervisorAccess: boolean = true;

  constructor(
    public jobChatService: JobChatService,
    private authService: AuthService,
    public userProfileService: UserProfileService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.empSgId = this.currentUserId.sgId;
    } else {
      this.empSgId = this.currentUserId.sgId;
    }

    this.subscription = this.activatedRoute.params.subscribe((param: any) => {
      if (
        (this.currentUserId.role == this.appRoles.roles[2] &&
          this.currentUserId.tempRole == this.appRoles.roles[2]) ||
        (this.currentUserId.role == this.appRoles.roles[3] &&
          this.currentUserId == this.appRoles.roles[3])
      ) {
      }
      if (param["id"]) {
        this.profileId = param["id"];

        this.isShowButton = true;
        if ((this.selectedSortOp = "Recent")) {
          this.getRecentJobChat(param["id"], this.offset, this.limit);
        } else {
          this.getOldjobChat(param["id"], this.offset, this.limit);
        }
        this.getProfile(this.profileId);
      } else {
        this.isShowButton = false;
        if ((this.selectedSortOp = "Recent")) {
          this.getRecentJobChat(this.empSgId, this.offset, this.limit);
        } else {
          this.getOldjobChat(this.empSgId, this.offset, this.limit);
        }
      }
    });
    this.employeePermission();
  }

  jobChatApproveAction(status: any, jobChatId: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let objData = {
      approval_date: date,
      approval_fl_id: this.currentUserId.sgId,
      approval_status: status,
    };
    this.jobChatService
      .updateJobChatApprovalStatus(objData, jobChatId)
      .subscribe((data) => {
        this.approvedStatus = data;
        console.log("---------------data", data);
        this.ngOnInit();
      });
  }
  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
      if( this.basicInfo.supervisor_emp_id == this.currentUserId.emp_id
        ){
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

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;

    if (this.isShowButton == false) {
      if (this.selectedSortOp == "Recent") {
        this.getRecentJobChat(this.empSgId, this.offset, this.limit);
      } else {
        this.getOldjobChat(this.empSgId, this.offset, this.limit);
      }
    } else {
      if (this.selectedSortOp == "Recent") {
        this.getRecentJobChat(this.profileId, this.offset, this.limit);
      } else {
        this.getOldjobChat(this.profileId, this.offset, this.limit);
      }
    }
  }

  selectedSortFn() {
    if (this.isShowButton == false) {
      if (this.selectedSortOp == "Recent") {
        this.getRecentJobChat(this.empSgId, this.offset, this.limit);
      } else {
        this.getOldjobChat(this.empSgId, this.offset, this.limit);
      }
    } else {
      if (this.selectedSortOp == "Recent") {
        this.getRecentJobChat(this.profileId, this.offset, this.limit);
      } else {
        this.getOldjobChat(this.profileId, this.offset, this.limit);
      }
    }
  }

  getRecentJobChat(empSgId: any, offset: number, limit: number) {
    this.jobChatService
      .getJobChatInfo(empSgId, offset, limit)
      .subscribe((data) => {
        this.jobChatInfo = data.job_chat;
        for (let i = 0; i < this.jobChatInfo.length; i++) {
          for (
            let j = 0;
            j < this.jobChatInfo[i].career_plan_infos.length;
            j++
          ) {
            this.shortAspireRole =
              this.jobChatInfo[i].career_plan_infos[j].aspired_role;
            this.jobChatInfo[i].career_plan_infos[j].aspired_role = JSON.parse(
              this.shortAspireRole
            );
          }
        }
        this.totalCount = data.job_chat_aggregate.aggregate.count;
      });
  }

  getOldjobChat(empSgId: any, offset: number, limit: number) {
    this.jobChatService
      .getOldJobChatInfo(empSgId, offset, limit)
      .subscribe((data) => {
        this.jobChatInfo = data.job_chat;
        for (let i = 0; i < this.jobChatInfo.length; i++) {
          for (
            let j = 0;
            j < this.jobChatInfo[i].career_plan_infos.length;
            j++
          ) {
            this.shortAspireRole =
              this.jobChatInfo[i].career_plan_infos[j].aspired_role;
            this.jobChatInfo[i].career_plan_infos[j].aspired_role = JSON.parse(
              this.shortAspireRole
            );
          }
        }
        this.totalCount = data.job_chat_aggregate.aggregate.count;
      });
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  openDeleteAllJobChat(i : any) {
    console.log("delete id", this.jobChatInfo[i].job_chat_id);
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
          this.jobChatService
            .deleteCareerPlanJobChat(this.jobChatInfo[i].job_chat_id)
            .subscribe(
              (data) => {
                this.jobChatInfo.splice(i, 1);
                this.toastr.success(
                  "JOb-Chat Deleted successfully.",
                  "Success"
                );
              },
              (error) => {
                this.toastr.error("JOb-Chat Not Delete .", "Error");
              }
            );
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your JOb-Chat is safe :)",
            "error"
          );
        }
      });
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
