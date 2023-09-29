import { Component, OnInit } from "@angular/core";
import { ProjectInfoService } from "src/app/core/services/project-info.service";
import { AdditionalSkillService } from "src/app/core/services/additional-skill.service";
import { JobChatService } from "src/app/core/services/job-chat.service";
import { AuthService } from "src/app/core/services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { roles } from "../../../../environments/roles";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-approval-list",
  templateUrl: "./approval-list.component.html",
  styleUrls: ["./approval-list.component.scss"],
})
export class ApprovalListComponent implements OnInit {
  paramUser: any;
  empSgId: any;
  currentUserId: any = {};
  currentUser: any = {};
  userRole: any;
  appRoles = roles;
  selectedSortOp: any;
  pendingApprovalProject: any = [];
  pendingApprovalDetails: any = [];
  pendingApprovalAdditionalSkill: any = [];
  pendingApprovalJobChat: any = [];
  projectPopContent: any = [];
  additionalSkillPopContent: any = [];
  jobChatPopContent: any = [];
  approvedStatus: any;
  empId: any;
  //pagenation variable
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  totalCount: any;
  rootURL = environment.rootUrl +"/";

  constructor(
    private modalService: NgbModal,
    public projectInfoService: ProjectInfoService,
    private authService: AuthService,
    public additionalSkillService: AdditionalSkillService,
    public jobChatService: JobChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      //this.userRole = this.currentUserId.role;
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      this.currentUserId.role == this.appRoles.roles[0] ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3])
    ) {
      this.currentUser = this.currentUserId.sgId;
      this.empId = this.currentUserId.emp_id;
      this.userRole = this.currentUserId.role;
      this.selectedSortOp = "project";
      this.getTeamPendingInfo(this.empId, this.offset, this.limit, "PJT");
    } else if (this.currentUserId.role == this.appRoles.roles[1]) {
      this.currentUser = this.currentUserId.sgId;
      this.userRole = this.currentUserId.role;

      this.getAllProjectInfo(this.offset, this.limit);
      this.getAllJobChatInfo(this.offset, this.limit);
      this.getAllAdditionalSkillInfo(this.offset, this.limit);
    }
  }
  loadPage(page: number) {
    console.log("pageeee", page);
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      this.currentUserId.role == this.appRoles.roles[0] ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3])
    ) {
      if (this.selectedSortOp == "additionalSkill") {
        this.getTeamPendingInfo(this.empId, this.offset, this.limit, "ADSK");
      } else if (this.selectedSortOp == "jobChat") {
        this.getTeamPendingInfo(this.empId, this.offset, this.limit, "JC");
      } else {
        this.getTeamPendingInfo(this.empId, this.offset, this.limit, "PJT");
      }
    } else if (this.currentUserId.role == this.appRoles.roles[1]) {
      if (this.selectedSortOp == "additionalSkill") {
        this.getAllAdditionalSkillInfo(this.offset, this.limit);
      } else if (this.selectedSortOp == "jobChat") {
        this.getAllJobChatInfo(this.offset, this.limit);
      } else {
        this.getAllProjectInfo(this.offset, this.limit);
      }
    }
  }
  /**
   * Open scroll modal
   * @param jobChatModel scroll modal data
   */
  jobChatModelFn(jobChatModel: any, id: any) {
    this.getJobChatByPK(id);
    this.modalService.open(jobChatModel, { scrollable: true });
  }

  /**
   * Open scroll modal
   * @param projectApprovalModel scroll modal data
   */
  projectApprovalModelFn(projectApprovalModel: any, id: any) {
    this.getProjectByPK(id);
    this.modalService.open(projectApprovalModel, { scrollable: true });
  }
  /**
   * Open scroll modal
   * @param additioanalSkillModel scroll modal data
   */
  additioanalSkillModelFn(additioanalSkillModel: any, id: any) {
    this.getAdditionalSkillByPk(id);
    this.modalService.open(additioanalSkillModel, { scrollable: true });
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
      approval_fl_id: this.currentUser,
      approval_status: status,
    };
    this.jobChatService
      .updateJobChatApprovalStatus(objData, jobChatId)
      .subscribe((data) => {
        this.approvedStatus = data;
      });
    this.modalService.dismissAll();
    //this.router.navigate(['dashboard1/approval-list']);
    window.location.reload();
  }

  getTeamPendingInfo(flId: any, offset: any, limit: any, filter: any) {
    let approvalStatus = 0;
    this.projectInfoService
      .getAllPendingInfo(flId, approvalStatus, offset, limit, filter)
      .subscribe((data) => {
        this.pendingApprovalDetails = data.pending;
        this.totalCount = data.count;
        console.log("-------------- project info", data);
      });
  }

  getAllProjectInfo(offset: any, limit: any) {
    this.projectInfoService
      .getAllProjectInfo(offset, limit)
      .subscribe((data) => {
        this.selectedSortOp = "project";
        this.pendingApprovalProject = data.project_info;
        this.totalCount = data.project_info_aggregate.aggregate.count;
        console.log("-------------- project info hr", data.project_info);
      });
  }

  getAllAdditionalSkillInfo(offset: any, limit: any) {
    this.additionalSkillService
      .getAllAdditionalSkillInfo(offset, limit)
      .subscribe((data) => {
        this.pendingApprovalAdditionalSkill = data.additional_skills_info;
        this.totalCount = data.additional_skills_info_aggregate.aggregate.count;
        console.log(
          "-------------- additional skills",
          data.additional_skills_info
        );
      });
  }

  getAllJobChatInfo(offset: any, limit: any) {
    this.jobChatService
      .getAllApprovalJobChatInfo(offset, limit)
      .subscribe((data) => {
        this.pendingApprovalJobChat = data.job_chat;
        this.totalCount = data.job_chat_aggregate.aggregate.count;
        console.log("-------------- job chat", data.job_chat);
      });
  }
  shortAspireRole: any = [];
  getJobChatByPK(pk: any) {
    this.jobChatService.getJobChatbyPK(pk).subscribe((data) => {
      this.jobChatPopContent = data.job_chat[0];
      for (
        let j = 0;
        j < this.jobChatPopContent.career_plan_infos.length;
        j++
      ) {
        this.shortAspireRole =
          this.jobChatPopContent.career_plan_infos[j].aspired_role;
        this.jobChatPopContent.career_plan_infos[j].aspired_role = JSON.parse(
          this.shortAspireRole
        );
      }
      console.log(
        "--------------------------pop up job chat",
        data.job_chat[0]
      );
    });
  }

  getProjectByPK(pk: any) {
    // this.projectInfoService.getProjectByPK(pk).subscribe(data => {
    //   this.projectPopContent = data;
    //   let skillName = [];
    //   (data.project_skills).forEach(element => {
    //     let obj1 = { "domain_id": element.skillLevel1.domain_id, "skill_nm": element.skillLevel1.skill_nm }
    //     let obj2 = { "domain_id": element.skillLevel2.domain_id, "skill_nm": element.skillLevel2.skill_nm }
    //     let obj3 = { "domain_id": element.skillLevel3.domain_id, "skill_nm": element.skillLevel3.skill_nm }
    //     skillName.push(obj1)
    //     skillName.push(obj2)
    //     skillName.push(obj3)
    //   });

    //   let uniqueChars = [...new Set(skillName)];
    //   console.log('------------------data pk', uniqueChars);
    // });
    this.projectInfoService.getProjectByProjectId(pk).subscribe((data) => {
      this.projectPopContent = data.project_info[0];
      console.log("============dash pop", data);
    });
  }

  getAdditionalSkillByPk(pk?: any) {
    this.additionalSkillService.getAdditionalSkillId(pk).subscribe((data) => {
      data.additional_skills_info[0].additional_skill_attachments =
        this.getFile(
          data.additional_skills_info[0].additional_skill_attachments
        );
      this.additionalSkillPopContent = data.additional_skills_info[0];
    });
  }

  projectApproveAction(status: any, projectId: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let objData = {
      approval_date: date,
      approved_fl_id: this.currentUser,
      approval_status: status,
    };
    this.projectInfoService
      .updateProjectApprovalStatus(objData, projectId)
      .subscribe((data) => {
        this.approvedStatus = data;
      });
    console.log("------------------stauts", status, projectId);
    this.modalService.dismissAll();
    //this.router.navigate(['dashboard1/approval-list']);
    window.location.reload();
    this.selectedSortOp = "project";
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
      approved_fl_id: this.currentUser,
      approval_status: status,
    };
    this.additionalSkillService
      .UpdateApprovalAdditionalSkill(objData, additionalSkillId)
      .subscribe((data) => {
        this.approvedStatus = data;
      });
    console.log(
      "------------------additionalSkill update",
      status,
      additionalSkillId
    );
    this.modalService.dismissAll();
    //this.router.navigate(['approval-list']);
    window.location.reload();
    this.selectedSortOp == "additionalSkill";
  }

  selectedSortFn(event: any) {
    this.selectedSortOp = event.target.value;
    this.page = 1;
    this.loadPage(this.page);
  }

  getFile(val: any) {
    console.log(val);
    let fileDetails = [];
    for (let row of val) {
      let fileDetailObj: any = {};
      fileDetailObj["src"] = this.rootURL + row.attachment_nm;
      fileDetailObj["name"] =
        row.attachment_nm.split("/")[row.attachment_nm.split("/").length - 1];
      fileDetailObj["detail"] = row;
      fileDetails.push(fileDetailObj);
    }
    return fileDetails;
  }
}
