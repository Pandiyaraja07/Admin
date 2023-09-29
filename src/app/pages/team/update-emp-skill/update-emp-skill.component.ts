import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user.service';
import { TechnicalSkillService } from 'src/app/core/services/tech-skill-map.service';
import { TeamSkillService } from 'src/app/core/services/team-skill.service';
import { TechDepthService } from 'src/app/core/services/tech-depth-master';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { roles } from '../../../../environments/roles';
import * as _ from "lodash";
@Component({
    selector: 'app-update-emp-skill',
    templateUrl: './update-emp-skill.component.html',
    styleUrls: ['./update-emp-skill.component.scss']
})
export class UpdateEmpSkillComponent implements OnInit {
    currentUserId: any;
    profileId: any;
    basicInfo: any;
    techSkillInfo: any;
    empSgId: any;
    pendingCount: any;
    pendingTechnicalSkillsCount: any;
    techDepth: any = [];
    techDepthLevels: any;
    selectedtechDepth: any;
    createSkillData: any = [];
    updateSkillData: any = [];
    appRoles = roles;

    //pagenation variable
    limit: number = 10;
    offset: number = 0;
    page: number = 1;
    subscription: any;
    totalCount: any;

    qualitativeComment: any;
    getQualitativeCommentID: any;
    submitted = false;

    clicked = false;

    techSkillInModal:any;

    //getSelectedvalue: any;
    constructor(private route: ActivatedRoute,
        private modalService: NgbModal,
        private authService: AuthService,
        public userProfileService: UserProfileService,
        public technicalSkillService: TechnicalSkillService,
        public teamSkillService: TeamSkillService,
        public techDepthService: TechDepthService,
        private router: Router,
        private toastr: ToastrService) { }

    ngOnInit(): void {
        this.currentUserId = this.authService.currentUser;
        this.route.queryParams
            .subscribe(params => {
                this.profileId = params.userId;
                console.log(this.profileId);
            }
            );

        this.getPeofile(this.profileId);
        this.getPendingCount();
        this.getEmpTechSkillToUpdate(this.currentUserId.emp_id, this.profileId, this.offset, this.limit, '');
        this.getTechDepthLevels();
    }

    loadPage(page: number) {
        this.page = page;
        this.offset = (this.page - 1) * this.limit;
        this.getEmpTechSkillToUpdate(this.currentUserId.emp_id, this.profileId, this.offset, this.limit, '');
    }

    getPeofile(profileId: any) {
        this.userProfileService.getUserById(profileId).subscribe(data => {
            this.basicInfo = data;
        })
    }
    getEmpTechSkillToUpdate(flId: any, sgId: any, offset: any, limit: any, content: any,) {
        this.teamSkillService.getTeamEmpTechSkillToUpdate(flId, sgId, offset, limit).subscribe(data => {
            //this.teamSkillService.getTeamTechSkillMap(flId, offset, limit).subscribe(data => {
            this.techSkillInfo = data.query[0];
            for (let techSkill of this.techSkillInfo) {
                techSkill.new_tech_depth = techSkill.approval_status == 0 ? techSkill.tech_depth_to_approve : techSkill.technical_depth_id;
            }
            this.totalCount = data.count;
            if (content == 'create') {
                this.toastr.success("Technical SKill Map Created successfully.", "Success");
            } else if (content == 'update') {
                this.toastr.success("Technical SKill Map Updated successfully.", "Success");
            }
        });
    }

    getPendingCount() {
        this.technicalSkillService.getPendingTechSkillCount(this.profileId).subscribe(data => {
            console.log('---------------pendingTechnicalSkillsCountttt ', data);
            this.pendingCount = data.skill_mapping[0]
            this.pendingTechnicalSkillsCount = data.skill_mapping_aggregate.aggregate.count;
        });
    }

    getTechDepthLevels() {
        this.techDepthService.getTechDepthLevels().subscribe(data => {
            this.techDepthLevels = data.technical_depth;
            console.log(data);
        });
    }
    counter(i: number) {
        return new Array(i);
    }
    /**
  * Open scroll modal
  * @param qualitativeCommentModel scroll modal data
  */
    qualitativeCommentModelFn(qualitativeCommentModel: any, techSkill:any) {
        this.techSkillInModal = techSkill;
        if(techSkill.new_tech_depth == techSkill.technical_depth_id){
            let commentData = this.getComment(techSkill.skill_mapping_id);
            if(commentData){
                this.techSkillInModal.qualitative_comments_nm =  this.qualitativeComment
            }
        }
        this.modalService.open(qualitativeCommentModel, { scrollable: true });
    }
    getComment(skillMapId: any) {
        this.technicalSkillService.getQualitativeComment(skillMapId).subscribe(data => {
            this.getQualitativeCommentID = data.skill_mapping[0].skill_mapping_id
            this.qualitativeComment = data.skill_mapping[0].qualitative_comments_nm
        })
        return true
    }
    onSubmit(techSkillCommentUpdateForm: NgForm) {
        this.submitted = true;
        let obj = {
            "qualitative_comments_nm": this.qualitativeComment
        }
        if (this.getQualitativeCommentID) {
            this.technicalSkillService.updateQualitativeComment(this.getQualitativeCommentID, obj).subscribe(data => {
                this.toastr.success("Qualitative Comment Update successfully.", "Success");
                window.location.reload();
            }, error => {
                this.toastr.error("Qualitative Comment Not Update .", "Error");
            });
            this.modalService.dismissAll();
        }
    }

    changeTechSkillStatus(status: any) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let obj = {
            "approval_date": date,
            "approval_status": status,
            "approved_fl_id": this.currentUserId.sgId,
            "updated_by_nm": this.currentUserId.username
        }
        this.technicalSkillService.updateSkillMappingBulkApproval(this.profileId, obj).subscribe(data => {
            if (data.status == '"Success"') {
                this.toastr.success("Approval Status Updated successfully.", "Success");
                window.location.reload();
            } else {
                this.toastr.error("Approval Status Not Updated", "Error");
            }
        }, error => {
            this.toastr.error("Approval Status Not Updated", "Error");
        });
    }

    updateTechSkill() {
        console.log("techSkillInfo", this.techSkillInfo);

        this.technicalSkillService.createSkillMap(this.techSkillInfo).subscribe(data => {

            for (let techSkill of this.techSkillInfo) {
                let found = _.find(data, d => d.team_skill_id == techSkill.team_id);
                if (found) {
                    techSkill.approval_status = found.approval_status;
                }
            }

            //this.router.navigate(['profile', this.profileId]);
            this.toastr.success("Technical Skill updated", "Success");
        }, error => {
            this.toastr.error("Error updating Techincal Skill", "Error");
        });
    }

    getSelectedTechDepth(selectedTechDepthId: any, teamId: any, skillMapId: any, domain: any, subdomain: any) {
        console.log('-----------------skillMapIdssssssssssS', domain, subdomain);

        if (selectedTechDepthId != 'undefined') {
            if (skillMapId != null) {
                console.log('------------------logggg', skillMapId);

                let techSkillData = {
                    "teamId": teamId,
                    "techDepthId": selectedTechDepthId,
                    "skillMapId": skillMapId,
                    "domain": domain,
                    "subdomain": subdomain,
                    "updated_by_nm": this.currentUserId.username
                }
                console.log('-----------------tech skill data', techSkillData);

                this.technicalSkillService.updateSkillMap(skillMapId, techSkillData).subscribe(data => {
                    this.getEmpTechSkillToUpdate(this.currentUserId.emp_id, this.profileId, this.offset, this.limit, "update");

                }, error => {
                    this.toastr.error("Functional SKill Map Not Updated .", "Error");
                });
            } else {
                console.log('-------------------test');

                let techSkillData = {
                    "empSgID": this.profileId,
                    "teamId": teamId,
                    "techDepthId": selectedTechDepthId,
                    "domain": domain,
                    "subdomain": subdomain,
                    "created_by_nm": this.currentUserId.username
                }
                this.technicalSkillService.createSkillMap(techSkillData).subscribe(data => {
                    this.getEmpTechSkillToUpdate(this.currentUserId.emp_id, this.profileId, this.offset, this.limit, "create");

                    //this.router.navigate(['profile', this.profileId]);
                }, error => {
                    this.toastr.error("Functional SKill Map Not Created .", "Error");
                });
            }
        } else {
            this.toastr.error("Please select valid technical depth .", "Error");
        }
    }
}
