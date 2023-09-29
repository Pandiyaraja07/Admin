import { Component, OnInit, ViewChild } from "@angular/core";
import {
    revenueChart,
    refundsChart,
    userChart,
    orderChart,
    analyticsChart,
    users,
    slides,
    basicChart,
} from "../../dashboard/data";
import { ChartType, slideModel } from "../../dashboard/dashboard.model";

import { SwiperOptions } from "swiper";
import {
    SwiperComponent,
    SwiperDirective,
    SwiperConfigInterface,
} from "ngx-swiper-wrapper";

import { UserProfileService } from "src/app/core/services/user.service";
import { TechnicalSkillService } from "src/app/core/services/tech-skill-map.service";
import { BehaviorSkillService } from "src/app/core/services/behavior-skill.service";
import { AdditionalSkillService } from "src/app/core/services/additional-skill.service";
import { JobChatService } from "src/app/core/services/job-chat.service";
import { PeopleReviewService } from "src/app/core/services/people-review.service";
import { ProjectInfoService } from "src/app/core/services/project-info.service";
import { AuthService } from "src/app/core/services/auth.service";

import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TechDepthService } from "src/app/core/services/tech-depth-master";
import { Charts } from "src/app/layouts/chart/chart.config";
import * as moment from "moment";
import * as _ from "lodash";
import { Location } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";
import { roles } from "../../../../environments/roles";
import * as echarts from 'echarts';
import { TechSkillMasterService } from 'src/app/core/services/tech-skill-master.service';
import { BehaviorMasterService } from "src/app/core/services/behavior-master.service";
import { environment } from "src/environments/environment";
import { PermissionService } from "../../../core/services/permission.service"

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})


export class ProfileComponent implements OnInit {
    @ViewChild(SwiperComponent, { static: true }) componentRef?: SwiperComponent;
    @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
    
    rootURL = environment.rootUrl +"/";

    slides!: slideModel[];
    appRoles = roles;

    //   config = {
    //     initialSlide: 0,
    //      slidesPerView: 3,
    //  }

    // public config: SwiperConfigInterface = {
    //   direction: 'horizontal',
    //   slidesPerView: 4,
    //   keyboard: true,
    //   mousewheel: true,
    //   scrollbar: false,
    //   navigation: true,
    //   pagination: false,
    //   breakpoints:{
    //      150:{
    //           slidesPerView: 3,
    //          }
    //   }
    // };
    config: SwiperOptions = {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
    };

    /**
     * Swiper setting
     */
    cardConfig = {
        initialSlide: 0,
        slidesPerView: 3,
    };
    currentUserId: any = {};
    peopleReview: any = [];
    peopleReviewBad: any = [];
    projectInfo: any = [];
    techSkillInfo: any = [];
    behaviorSkillInfo: any = [];
    additionalSkillInfo: any = {};
    patentSkillInfo: any = {};
    trainingCertificates: any = {};
    productLaunches: any = {};
    consultation: any = {};
    conferences: any = {};
    jobChatInfo: any = [];
    domainList: any;
    selectedDomain: any;

    additionalSKillPendingCount: any;
    additionalSkillRecentAction: any;
    behaviorSKillPendingCount: any;
    pendingBehaviorSkillInfo: any;
    projectPendingCount: any;
    projectRecentAction: any;
    pendingTechnicalSkillsCount: any;
    pendingTechSkill: any;
    pendingJobChatCount: any;
    jobChatRecentAction: any;
    qualitativeComment: any;
    getQualitativeCommentID: any;
    commmentApprovalStatus: any;
    peopleReviewPendingCount: any;
    peopleRecentAction: any;
    graphdata: any = [];
    chartdata: any =[];
    chartDom: any;
    myChart: any;
    radarOption: any;
    spyderOption: any;

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
        "bg-soft-secondary",
        "bg-soft-dark",
        "badge-soft-custom-orange",
    ];
    bgRandom: any = [];
    totalCount: any;
    techBarChart: any;
    techDomainChart: any;
    techSubChart: any;
    techOverallChart: any;
    behavirolChart: any;
    behavioralDomainChart: any;
    behavioralOverallChart: any;
    activeTechDomainBtn: any = true;
    activeBehaviourDomainBtn: any = true;
    techDepth: any;
    profileId: any;
    donutChart: any;
    basicInfo: any = {};
    qualArr: any = [];
    showTxt: any = "see more";
    readMore: boolean = false;
    submitted = false;
    techSkillApproval = false;
    behaviourSkillApproval = false;
    //option: any;
    selectedBehaviorDomain: any;
    behaviorDomainAll: any;

    offset = 0;
    limit = 5;

    activeTab = 2;
    queryParams: any = {};

    flRole : boolean = false
    flAccess: boolean = false;
    supervisorAccess: boolean = false;
    ownProfile: boolean = false;

    constructor(
        public techSkillMasterService: TechSkillMasterService,
        private route: ActivatedRoute,
        private location: Location,
        public userProfileService: UserProfileService,
        private authService: AuthService,
        public peopleService: PeopleReviewService,
        public projectInfoService: ProjectInfoService,
        public technicalSkillService: TechnicalSkillService,
        public behaviorSkillService: BehaviorSkillService,
        public additionalSkillService: AdditionalSkillService,
        public jobChatService: JobChatService,
        public techDepthService: TechDepthService,
        private router: Router,
        private chart: Charts,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private behaviorMasterService: BehaviorMasterService,
        private permissionService : PermissionService
    ) { }

    ngOnInit(): void {
        this.currentUserId = this.authService.currentUser;
        let active;
        this.route.queryParams.subscribe((params) => {
            this.queryParams = JSON.parse(JSON.stringify(params));
            this.profileId = params.userId;
            if (params.tab) {
                active = Number(params.tab);
            }
            console.log(this.profileId);
        });
        if (this.currentUserId.role == this.appRoles.roles[2] || this.currentUserId.tempRole == this.appRoles.roles[3] || this.currentUserId.role == this.appRoles.roles[0] 
            ) {
            this.hideApprovalStatus();

        }
        this.techDepthService.getTechDepthLevels().subscribe((data) => {
            this.techDepth = data.technical_depth;
        });

        this.getRecentTechnicalSkillMap(this.profileId);
        this.getPendingBehaviorSkillMap(this.profileId);
        this.getProfile(this.profileId);
        this.getProfilePendingTechSkillMapping(this.profileId);
        this.getAllDomain();
        this.getAllBehaviorDomain();
        // this.technicalSkillService
        //   .getEmpechSkillCount(this.profileId)
        //   .subscribe((data) => {
        //     this.techDomainChart = data.domain;
        //     this.techSubChart = data.subdomain;
        //     this.techOverallChart = data.overall;
        //     console.log("techSkillGraphData",data);
        //     this.graphdata = data.techSkillGraphData.rows;
        //     this.spyderChart();
        //     this.changeTechChart(2);
        //   });

        //this.getChartFn(this.profileId)

        // this.technicalSkillService
        //     .getEmpBehavioralSkillCount(this.profileId,this.selectedBehaviorDomain)
        //     .subscribe((data) => {
        //         this.behavioralDomainChart = data.beDomain;
        //         this.behavioralOverallChart = data.beOverall;
        //     });

        if (active) {
            this.activeTab = active;
            switch (active) {
                case 3:
                    this.getBehaviorTab();
                    break;
                case 4:
                    this.strengthImprovement();
                    break;
                case 5:
                    this.getRecentProjectInfo();
                    break;
                case 6:
                    this.getRecentAdditionalSkill();
                    break;
                case 7:
                    this.getRecentJobChat();
                    break;
            }
        }
        //this.spyderChart();
    }

    updateQueryParams(tab: any) {
        this.queryParams.tab = tab;
        const urlTree = this.router.createUrlTree([], {
            queryParams: this.queryParams,
            queryParamsHandling: "merge",
            preserveFragment: true,
        });

        this.location.go(urlTree.toString());
    }

    getProfile(profileId: any) {
        this.userProfileService.getUser(profileId).subscribe((data) => {
            this.basicInfo = data.emp_info[0];
            console.log("-------------employee data", this.basicInfo);
            this.fetchData(this.basicInfo);
            if(this.basicInfo.fl_emp_id ==  this.currentUserId.emp_id)
            {
                    this.flAccess = true;
            }
            if(this.basicInfo.emp_id == this.currentUserId.emp_id)
            {
                    this.ownProfile = true;
            }
            if(this.basicInfo.supervisor_emp_id ==  this.currentUserId.emp_id)
            {
                    this.supervisorAccess = true;
            }
        });
    }

    counter(i: number) {
        return new Array(i);
    }

    /*
        activeUserQualification() {
          let qual1 = this.basicInfo.qual_level1_nm;
          let qual2 = this.basicInfo.qual_level2_nm;
          let qual3 = this.basicInfo.qual_level3_nm;
      
          if (qual1 != null) {
            let qualificationArr1 = qual1.split("r'(\*+");
            this.qualArr['qual1ArrPart1'] = qualificationArr1[0];
            this.qualArr['qual1ArrPart2'] = qualificationArr1[1];
          }
          if (qual2 != null) {
            let qualificationArr2 = qual2.split("r'(\*+");
            this.qualArr['qual2ArrPart1'] = qualificationArr2[0];
            this.qualArr['qual2ArrPart2'] = qualificationArr2[1];
          }
          if (qual3 != null) {
            let qualificationArr3 = qual3.split("r'(\*+");
            this.qualArr['qual3ArrPart1'] = qualificationArr3[0];
            this.qualArr['qual3ArrPart2'] = qualificationArr3[1];
          }
      
        }  
      */

    getTechSkillTab() {
        this.getRecentTechnicalSkillMap(this.profileId);
        this.getChartFn(this.profileId, this.selectedDomain);
        this.changeTechChart(2);
    }

    getChartFn(profileId: any, domain?: any,) {
        console.log("-----------Dom", domain);
        this.technicalSkillService
            .getEmpechSkillCount(profileId, domain)
            .subscribe((data) => {
                this.techDomainChart = data.domain;
                this.techSubChart = data.subdomain;
                this.techOverallChart = data.overall;
                console.log("techSkillGraphData1: ", data.techSkillGraphData.rows);
                if (data.techSkillGraphData.count)
                    this.graphdata = data.techSkillGraphData.rows;
                else
                    this.graphdata = null;
                this.spyderChart();
                this.changeTechChart(2);
            });
    }
    getBehaviorTab() {
        if(!this.selectedBehaviorDomain){
          this.selectedBehaviorDomain = 'overall';
        }
        this.getRecentBehaviorSkillMap(this.profileId);
        this.technicalSkillService
            .getEmpBehavioralSkillCount(this.profileId,this.selectedBehaviorDomain)
            .subscribe((data) => {
                this.behavioralDomainChart = data.beDomain;
                this.behavioralOverallChart = data.beOverall;
                console.log("behaviouralSkillGraphData: ", data);
                this.chartdata = data.behavioralGraphData[0];
                if(!this.chartdata.length){
                  this.chartdata = null;
                }
                this.radarChart();
                this.changeBehaviourChart(2);
            });
    }
    strengthImprovement() {
        this.getRecentPeopleReviews(this.profileId);
    }

    getRecentTechnicalSkillMap(empSgId: any) {
        this.technicalSkillService
            .getEmpAllTechSkillMapping(empSgId, this.offset, this.limit)
            .subscribe((data) => {
                let techSkill = data.rows;
                techSkill.forEach((row: any) => {
                    row.tech_depth_history = this.getTargetHistory(
                        row.tech_depth_history
                    );
                });
                this.techSkillInfo = techSkill;
            });

        // this.technicalSkillService.getPendingTechSkillCount(empSgId).subscribe(data => {
        //     this.pendingTechnicalSkillsCount = data.skill_mapping_aggregate.aggregate.count;
        // });
    }

    getProfilePendingTechSkillMapping(empSgId: any) {
        let approvalStatus = 0;
        this.technicalSkillService
            .getProfileTechSkillMappingByApprovalStatus(
                empSgId,
                approvalStatus,
                this.offset,
                this.limit
            )
            .subscribe((data) => {
                this.pendingTechSkill = data.rows;
                this.pendingTechnicalSkillsCount = data.count;
                this.pendingTechSkill.forEach((row: any) => {
                    row.tech_depth_history = this.getTargetHistory(
                        row.tech_depth_history
                    );
                });
                console.log("---------------deerrrrrrrrrrrrrr", data.count);
            });

        // this.technicalSkillService.getPendingTechSkillCount(empSgId).subscribe(data => {
        //     console.log('-------------------pendingfffffff', data);

        //     this.pendingTechnicalSkillsCount = data.skill_mapping_aggregate.aggregate.count;
        // });
    }

    getRecentBehaviorSkillMap(empSgId: any) {
        this.behaviorSkillService
            .getRecentBehaviorSkillMap(empSgId, this.offset, this.limit)
            .subscribe((data) => {
                this.behaviorSkillInfo = data.behavior_skill_mapping;
                this.behaviorSkillInfo.forEach((element: any) => {
                    return (element["new_demonstrated_level"] =
                        element.demonstrated_level
                            ? element.demonstrated_level : element.demonstrated_level_to_approve);
                            
                });
            });

        this.behaviorSkillService
            .getPendinBehaviorSkillMapCount(empSgId)
            .subscribe((data) => {
                this.behaviorSKillPendingCount =
                    data.behavior_skill_mapping_aggregate.aggregate.count;
            });
    }

    getPendingBehaviorSkillMap(empSgId: any) {
        this.behaviorSkillService
            .getPendinBehaviorSkillMap(empSgId, this.offset, this.limit)
            .subscribe((data) => {
                this.pendingBehaviorSkillInfo = data.behavior_skill_mapping;
                this.pendingBehaviorSkillInfo.forEach((element: any) => {
                    return (element["new_demonstrated_level"] =
                        element.demonstrated_level
                            ? element.demonstrated_level : element.demonstrated_level_to_approve
                            );
                });
            });
    }

    getRecentPeopleReviews(empSgId: any) {
        this.peopleService
            .getRecentPeopleReviews(empSgId, this.offset, this.limit)
            .subscribe((data) => {
                this.peopleReview = data.people_review.filter((row: any) => {
                    return row.review_type == "Accelerator";
                });
                console.log("people", this.peopleReview);

                this.peopleReviewBad = data.people_review.filter((row: any) => {
                    return row.review_type == "Decelerator";
                });
                console.log("peopleBad", this.peopleReviewBad);
            });

        this.peopleService
            .getPeopleReviewPendingCount(this.profileId)
            .subscribe((data) => {
                console.log('---------------data', data);
                this.peopleRecentAction = data.people_review[0];
                this.peopleReviewPendingCount = data.people_review_aggregate.aggregate.count;
            });
    }

    getRecentProjectInfo() {
        let offset = 0;
        let limit = 6;
        this.projectInfoService
            .getProjectInfo(this.profileId, offset, limit)
            .subscribe((data) => {
                this.projectInfo = data.project_info;
                console.log("project Details---------------", this.projectInfo);
                for (let i = 0; i < this.projectInfo.length; i++) {
                    let random = Math.floor(Math.random() * this.colors.length);
                    this.bgRandom.push(this.colors[random]);
                }
                //const projectSkill = this.projectInfo.map((x: any) => (x.project_skills.map((y: any) => (y.tech_skills_info))));
            });

        this.projectInfoService
            .getProjectPendingCount(this.profileId)
            .subscribe((data) => {
                this.projectRecentAction = data.project_info[0];
                this.projectPendingCount = data.project_info_aggregate.aggregate.count;
            });
    }

    getRecentAdditionalSkill() {
        this.getAdditionalSkill(this.profileId, "Patents");
        this.getAdditionalSkill(this.profileId, "Training");
        this.getAdditionalSkill(this.profileId, "Additional Skills");
        this.getAdditionalSkill(this.profileId, "Product Launches");
        this.getAdditionalSkill(this.profileId, "Conferences");
        this.getAdditionalSkill(this.profileId, "Consultation");

        this.getAdditionalSkillPendingCount(this.profileId);
    }

    getAdditionalSkillPendingCount(sgId: any) {
        this.additionalSkillService
            .getPendingAdditionalSkillCount(sgId)
            .subscribe((data) => {
                this.additionalSkillRecentAction = data.additional_skills_info[0];
                this.additionalSKillPendingCount =
                    data.additional_skills_info_aggregate.aggregate.count;
            });
    }
    getAdditionalSkill(profileId: any, skillType?: any) {
        let offset = 0;
        let limit = 1;
        this.additionalSkillService
            .getRecentAdditionalSkill(profileId, skillType, offset, limit)
            .subscribe((data) => {
                if (skillType == "Patents") {
                    data.additional_skills_info[0].additional_skill_attachments =
                        this.getFile(
                            data.additional_skills_info[0]?.additional_skill_attachments
                        );
                    this.patentSkillInfo = data.additional_skills_info[0];
                } else if (skillType == "Additional Skills") {
                    data.additional_skills_info[0].additional_skill_attachments =
                        this.getFile(
                            data?.additional_skills_info[0]?.additional_skill_attachments
                        );
                    this.additionalSkillInfo = data.additional_skills_info[0];
                    console.log("Additional Skill", this.additionalSkillInfo);
                } else if (skillType == "Training") {
                    data.additional_skills_info[0].additional_skill_attachments =
                        this.getFile(
                            data?.additional_skills_info[0]?.additional_skill_attachments
                        );
                    this.trainingCertificates = data.additional_skills_info[0];
                } else if (skillType == "Product Launches") {
                    data.additional_skills_info[0].additional_skill_attachments =
                        this.getFile(
                            data?.additional_skills_info[0]?.additional_skill_attachments
                        );
                    this.productLaunches = data.additional_skills_info[0];
                } else if (skillType == "Conferences") {
                    data.additional_skills_info[0].additional_skill_attachments =
                        this.getFile(
                            data?.additional_skills_info[0]?.additional_skill_attachments
                        );
                    this.conferences = data.additional_skills_info[0];
                } else if (skillType == "Consultation") {
                    data.additional_skills_info[0].additional_skill_attachments =
                        this.getFile(
                            data?.additional_skills_info[0]?.additional_skill_attachments
                        );
                    this.consultation = data.additional_skills_info[0];
                } else {
                    console.log("-------empty additional skill");
                }
            });
    }

    getRecentJobChat() {
        let offset = 0;
        let limit = 3;
        this.jobChatService
            .getJobChatInfo(this.profileId, offset, limit)
            .subscribe((data) => {
                this.totalCount = data.job_chat_aggregate.aggregate.count;
                console.log("jobbbbbbbbbbbbbbbb", data.job_chat[0]);
                this.jobChatInfo = data.job_chat[0];
                this.jobChatInfo.career_plan_infos.forEach((data: any, i:any) => {
                    this.jobChatInfo.career_plan_infos[i].aspired_role = JSON.parse(
                        data.aspired_role
                    );
                });
                this.getPendingJobChatCount(this.profileId);
            });
    }

    getPendingJobChatCount(sgId: any) {
        this.jobChatService.getPendingJobChatCount(sgId).subscribe((data) => {
            console.log("-------------------------------shggggggggggggg", data);

            this.jobChatRecentAction = data.job_chat[0];
            this.pendingJobChatCount = data.job_chat_aggregate.aggregate.count;
            console.log("------------------job chat count", data);
        });
    }


    hideApprovalStatus() {
        this.technicalSkillService.getHideApprovalStatus().subscribe((data) => {
            const date = moment(new Date()).format("YYYY-MM-DD");
            const start = data.settings[2].setting_value;
            const end = data.settings[3].setting_value;

            if (date >= start && date <= end) {
                console.log('date is between the 2 dates');
                if (data.settings[0].setting_value == 'true') {
                    this.techSkillApproval = true;
                }
                if (data.settings[1].setting_value == 'true') {
                    this.behaviourSkillApproval = true;

                }
            } else {
                console.log('date is not in the range');
            }
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
        };

        this.technicalSkillService
            .updateSkillMappingBulkApproval(this.profileId, obj)
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

    changeBehaviorSkillStatus(status: any) {
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

    changePeopleReviewStatus(status: any) {
        console.log("statussssssss", status);
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
        this.peopleService
            .peopleReviewBulkApprovalStatus(obj, this.profileId)
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

    changeProjectStatus(status: any) {
        console.log("statussssssss", status);
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
        this.projectInfoService
            .updateProjectBulkApprovalStatus(obj, this.profileId)
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
    changeAdditionalSkillStatus(status: any) {
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
        this.additionalSkillService
            .updateAdditionalSkillBulkApprovalStatus(obj, this.profileId)
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

    changeJobChatStatus(status: any) {
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
            approval_fl_id: this.currentUserId.sgId,
            updated_by_nm: this.currentUserId.username,
        };
        this.jobChatService
            .updateJobChatBulkApprovalStatus(this.profileId, obj)
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

    nextSlide() {
        this.directiveRef!.nextSlide();
        console.log("next slide");
    }

    previousSlide() {
        this.directiveRef!.prevSlide();
        console.log("prev slide");
    }

    nextSlideComp() {
        this.componentRef!.directiveRef!.nextSlide();
    }

    previousSlideComp() {
        this.componentRef!.directiveRef!.prevSlide();
    }

    /**
     * Fetches the data
     */
    private fetchData(emp_info: any = {}) {
        let total = emp_info.internal_exp + emp_info.external_exp;
        let internal = ((emp_info.internal_exp / total) * 100).toFixed(2);
        let external = ((emp_info.external_exp / total) * 100).toFixed(2);

        let experience = [];
        let int_data: any = {};
        let ex_data: any = {};
        int_data["value"] = parseFloat(internal);
        int_data["name"] = "Internal Experience";

        experience.push(int_data);
        ex_data["value"] = parseFloat(external);
        ex_data["name"] = "External Experience";

        experience.push(ex_data);
        this.donutChart = this.chart.BuildDonutchart({
            experiece: experience,
            total_exp: emp_info.total_exp,
        });
    }

    public seriesOptions = {
        type: "bar",
        barGap: 0.2,
        barCategoryGap: "30%",
        colorBy: "data",
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: "insideTop",
                    color: "#48494a",
                    formatter: function (d: any) {
                        if (d.seriesName == "Doer Plus") {
                            return "D+";
                        } else if (d.seriesName == "Not Available") {
                            return "NA";
                        }
                        return d.seriesName[0];
                    },
                },
            },
        },
    };

    changeTechChart(chartName: any) {
        let barSeries = [
            this.seriesOptions,
            this.seriesOptions,
            this.seriesOptions,
            this.seriesOptions,
            this.seriesOptions,
            this.seriesOptions,
        ];
        let overAllBarSeries = {
            type: "bar",
            barGap: 0.3,
            barCategoryGap: "50%",
            colorBy: "data",
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        color: "#48494a",
                    },

                    position: "insideTop",
                    formatter: function (d: any) {
                        return d.data[1];
                    },
                },
            },
            showInTooltip: false,
        };
        let techColor = ["#edd7f6", "#c3dffa", "#fff1dd"];
        let chartData = [];
        if (chartName == "1") {
            this.activeTechDomainBtn = false;
            chartData = this.techOverallChart;
            let overallColor = [
                "#67b9b0",
                "#feb22b",
                "#fd6e6e",
                "#f03131",
                "#941a2d",
                "#6d696a",

            ];

            this.getTechBarChart(chartData, overAllBarSeries, overallColor, "Tech", {
                show: false,
            });
        } else if (chartName == "2") {
            chartData = this.techDomainChart;
            this.getTechBarChart(chartData, barSeries, techColor, "Tech", {});
            console.log("chartdata", chartData);

        } else {
            this.activeTechDomainBtn = false;
            chartData = this.techSubChart;
            techColor = [
                "#edd7f6",
                "#edd7f6",
                "#edd7f6",
                "#c3dffa",
                "#c3dffa",
                "#c3dffa",
                "#fff1dd",
                "#fff1dd",
            ];
            this.getTechBarChart(chartData, barSeries, techColor, "Tech", {});
        }
    }

    changeBehaviourChart(chartName: any) {
        let barSeries = [
            this.seriesOptions,
            this.seriesOptions,
            this.seriesOptions,
            this.seriesOptions,
        ];
        let overAllBarSeries = {
            type: "bar",
            barGap: 0.3,
            barCategoryGap: "50%",
            colorBy: "data",
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        color: "#48494a",
                    },

                    position: "insideTop",
                    formatter: function (d: any) {
                        return d.data[1];
                    },
                },
            },
            barWidth: 40,
        };
        let techColor = ["#cef6ed", "#fdefdb", "#eac4ff", "#c3dffa "];
        let chartData = [];
        if (chartName == "1") {
            this.activeBehaviourDomainBtn = false;
            chartData = this.behavioralOverallChart;
            let overallColor = ["#cef6ed", "#fdefdb", "#eac4ff", "#c3dffa "];
            this.getTechBarChart(
                chartData,
                overAllBarSeries,
                overallColor,
                "Behavirol",
                { show: false }
            );
        } else {
            chartData = this.behavioralDomainChart;
            this.getTechBarChart(chartData, barSeries, techColor, "Behavirol", {});
            console.log("!!!!!!!BBBchartdata", chartData);
        }
    }

    getTechBarChart(sourceData: any, seriesData: any, techColor: any, tab: any, tooltip: any) {
        var barChartOption = {
            tooltip: tooltip,
            dataset: {
                source: sourceData,
            },
            xAxis: {
                type: "category",
                axisLine: {
                    show: false,
                },
                offset: 13,
                nameTextStyle: {
                    fontStyle: "Ubuntu-Regular",
                    fontSize: 10,
                },
                axisLabel: {
                    boundaryGap: false,
                    fontSize: 12,
                },
            },
            grid: {
                width: "97%",
                left: 34,
            },
            color: techColor,
            legend: { show: false },
            label: { position: "inside" },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: seriesData,
        };

        if (tab == "Tech") {
            this.techBarChart = barChartOption;
        } else {
            this.behavirolChart = barChartOption;
        }
    }

    getTargetHistory(history: any) {
        history = JSON.parse(history);
        let techDepthHistory = [];

        history = _.filter(history, (h) => {
            return h.technical_depth_id;
        });

        for (let i = 0; i < history.length; i++) {
            let tech = history[i];
            if (tech && tech.technical_depth_id) {
                tech.name = this.getTechnicalDepthName(tech.technical_depth_id);
                if (i == history.length - 1 || history.length == 1) {
                    tech.last = true;
                } else {
                    tech.last = false;
                }
                let updatedDate = tech.updated_date
                    ? tech.updated_date
                    : tech.update_date;
                if (updatedDate) {
                    if (
                        moment(
                            updatedDate,
                            ["YYYY-MM-DD", "YYYY-M-DD", "YYYY-MM-D", "YYYY-M-D"],
                            true
                        ).isValid()
                    ) {
                        tech.updatedDate = moment(updatedDate, "YYYY-MM-DD").format(
                            "MMM DD"
                        );
                    } else {
                        tech.updatedDate = moment(updatedDate).format("MMM DD");
                    }
                }
                techDepthHistory.push(tech);
            }
        }
        return techDepthHistory;
    }

    getTechnicalDepthName(id: any) {
        let depthName = "";
        for (let depth of this.techDepth ?? []) {
            if (depth.technical_depth_id == id) {
                depthName = depth.technical_depth_nm;
            }
        }
        return depthName;
    }

    getFile(val: any) {
        console.log(val);
        let fileDetails = [];
        for (let row of val) {
            let fileDetailObj: any = {};
            fileDetailObj["src"] = this.rootURL + row.attachment_nm ;
            fileDetailObj["name"] =
                row.attachment_nm.split("/")[row.attachment_nm.split("/").length - 1];
            fileDetailObj["detail"] = row;
            fileDetails.push(fileDetailObj);
        }
        return fileDetails;
    }

    qualitativeCommentModelFn(qualitativeCommentModel: any) {
        this.modalService.open(qualitativeCommentModel, { scrollable: true });
    }

    getComment(skillMapId: any) {
        this.technicalSkillService
            .getQualitativeComment(skillMapId)
            .subscribe((data) => {
                console.log("skilllllllllll", data);

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
        }
        this.modalService.dismissAll();
    }



    spyderChart() {
        //console.log('----------------chart');
        var Indicator = []
        let technicaldepth = [];
        let axisValue: any;
        let axisLine : any;
        axisLine= {
          lineStyle: {
           color:'#000000'
          }
        }
        if(this.graphdata){
          axisLine['show'] = true;
        } else {
          axisLine['show'] = false;
        }
       console.log("!!!!!!!!!!!:", this.graphdata);
        axisValue = {
          show: true,
          formatter: function (value: any, index: any) {
            switch (index) {
              case 1:
                return "B"
                break;
              case 2:
                return "N"
                break;
              case 3:
                return "D"
                break;
              case 4:
                return "D+"
                break;
              case 5:
                return "A"
                break;
    
              default:
                return ''
              // code
            }
          }
        }

        if (this.graphdata) {
            for (let each of this.graphdata) {
                let levels:any = { max: 5 }
                if (each.level3) {
                    levels['name'] = each.level3.skill_nm.concat(" ", '(L3)');
                } else {
                    levels['name'] = each.level2.skill_nm;
                }
                Indicator.push(levels);
            }
            for (let each of this.graphdata) {
                if (each.technical_depth) {
                    technicaldepth.push(each.skill_mappings[0].technical_depth.level_no);
                }
            }
        } else {
            Indicator = [{}];
            technicaldepth = [];
        }
        Indicator[0]['axisLine'] = axisLine
        // console.log('Indicator[0]: ', typeof Indicator[0]); 
        Indicator[0]['axisLabel'] = axisValue;
        // console.log('Indicator: ', Indicator);
        
        this.chartDom = document.getElementById('main');
        this.myChart = echarts.init(this.chartDom);

        this.radarOption = {
            title: {
                text: ''
            },
            legend: {
                data: ['Technical Depth', 'Actual Spending']
            },
            radar: {
                shape: 'circle',
                indicator: Indicator,
                axisLine: {
                  lineStyle: {
                   color:'#000000'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color:'#8C8691'
                  }
                }
              },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',

                    data: [
                        {
                            value: technicaldepth,
                            //name: 'Technical Depth',
                            areaStyle: {
                              color: 'rgba(145, 144, 218, 0.7)'
                            },
                        },
                    ]
                }
            ]
        };

        this.radarOption && this.myChart.setOption(this.radarOption);

    }
    getAllDomain() {
        this.techSkillMasterService.getTechDomainMaster({}).subscribe(data => {
            this.domainList = data.domain_info;
            this.domainList.unshift({ "domain_nm": "OverAll", "domain_id": "overall" });
            //console.log("dmlist: ", this.domainList);

            if (this.domainList == null) {
            } else {
                console.log("*******", data);
                this.selectedDomain = data.domain_info[0].domain_id;
                //console.log('--------------------seeeeeeeeeelllllllle', this.selectedDomain, this.profileId);
                this.getChartFn(this.profileId, this.selectedDomain);
            }
        });
    }

    getSelectedDomain(event: any) {
        this.getChartFn(this.profileId, this.selectedDomain);
        if (event.length > 0) {
            if (this.selectedDomain) {
            }
        }
        console.log(",,,,,,,,,,,,SelDom", this.selectedDomain);
    }

    getSelectedLevel() {
        this.getChartFn(this.profileId, this.selectedDomain,);

    }

    radarChart() {
      //console.log('----------------chart')
      let indicator = [];
      let depthvalue = [];
      let axisValue: any;
      let axisLine : any;
        axisLine= {
          lineStyle: {
           color:'#000000'
          }
        }
        if(this.chartdata){
          axisLine['show'] = true;
        } else {
          axisLine['show'] = false;
        }
      console.log("!!!!!!!!!!!@@@@@@@@@@@:", this.chartdata);
      axisValue = {
        show: true,
        formatter: function (value: any, index: any) {
          switch (index) {
            case 1:
              return "S"
              break;
            case 2:
              return "O"
              break;
            case 3:
              return "E"
              break;
            case 4:
              return "R"
              break;
  
            default:
              return ''
            // code
          }
        },
       
      }
      if (this.chartdata) {
      for (let each of this.chartdata) {
        let skill: any = { max: 4 }
        skill['name'] = each.behavior_level_nm;
        indicator.push(skill);
      }
      for (let each of this.chartdata) {
        depthvalue.push(each.depth_value);
      }
    }
    else{
      indicator = [{}];
      depthvalue = []
    }

      indicator[0]['axisLabel'] = axisValue;
      indicator[0]['axisLine'] = axisLine;
      console.log("-------------INDICATOR---------: ", indicator);
      this.chartDom = document.getElementById('behaviour');
      this.myChart = echarts.init(this.chartDom);
  
      this.spyderOption = {
        color: ['#7472F7'],
        title: {
          text: ''
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          splitNumber: 4,
          shape: 'circle',
          indicator: indicator,
          axisLine: {
            lineStyle: {
             color:'#000000'
            }
          },
          splitLine: {
            lineStyle: {
              color:'#8C8691'
            }
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: depthvalue,
                areaStyle: {
                  color: 'rgba(145, 144, 218, 0.7)'
                },
                //name: 'Allocated Budget'
  
              }
            ]
          }
        ]
      };
  
      this.spyderOption && this.myChart.setOption(this.spyderOption);
  
    }

    getSelectedBehaviorDomain() {
      this.getBehaviorTab();
    }
  
    getAllBehaviorDomain() {
      
      this.behaviorMasterService.getBehaviorDomain().subscribe((data) => {
        this.behaviorDomainAll = data.behavior_domain_info;
        this.behaviorDomainAll.unshift({ "behavior_domain_nm": "OverAll", "behavior_domain_id": "overall" });
        console.log("****************did", this.behaviorDomainAll);
        this.selectedBehaviorDomain = this.behaviorDomainAll[0]['behavior_domain_id'];
        
        this.radarChart();
      });
    }
  }



