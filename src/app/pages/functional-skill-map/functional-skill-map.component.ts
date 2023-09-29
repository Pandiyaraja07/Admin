import { Component, OnInit } from "@angular/core";
import { TeamSkillService } from "src/app/core/services/team-skill.service";
import { TechnicalSkillService } from "src/app/core/services/tech-skill-map.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { TechDepthService } from "src/app/core/services/tech-depth-master";
import { AuthService } from "src/app/core/services/auth.service";
import { roles } from "../../../environments/roles";
import { TechSkillMasterService } from "src/app/core/services/tech-skill-master.service";

@Component({
    selector: "app-functional-skill-map",
    templateUrl: "./functional-skill-map.component.html",
    styleUrls: ["./functional-skill-map.component.scss"],
})
export class FunctionalSkillMapComponent implements OnInit {
    empSgId: any;
    currentUserId: any = {};
    currentUser: any = {};
    empId: any;
    userRole: any;
    delete_status: any;
    teamSkills: any = [];
    appRoles = roles;
    //pagenation variable
    limit: number = 10;
    offset: number = 0;
    page: number = 1;
    totalCount: any;
    techDepth: any;
    dept: any;
    subDept: any;
    selectedDept: any;
    selectedSubdept: any;

    btnchk = false
    btnchkData: any;

    constructor(
        public techSkillMasterService: TechSkillMasterService,
        public teamSkillService: TeamSkillService,
        public technicalSkillService: TechnicalSkillService,
        private authService: AuthService,
        public toastr: ToastrService,
        public techDepthService: TechDepthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.currentUserId = this.authService.currentUser;
        if (
            this.currentUserId.role == this.appRoles.roles[4] ||
            this.currentUserId.tempRole == this.appRoles.roles[4]
        ) {
        } else if (
            (this.currentUserId.role == this.appRoles.roles[2] &&
                this.currentUserId.tempRole == this.appRoles.roles[2]) ||
            (this.currentUserId.role == this.appRoles.roles[3] &&
                this.currentUserId.tempRole == this.appRoles.roles[3]) || this.currentUserId.role == this.appRoles.roles[0]
        ) {
            this.currentUser = this.currentUserId.sgId;
            this.empId = this.currentUserId.emp_id;
            this.userRole = this.currentUserId.role;
            this.getFLDept(this.empId);
            //this.getFlSubdept(this.empId);
        } else if (
            this.currentUserId.role == this.appRoles.roles[1] 
        ) {
            this.currentUser = this.currentUserId.sgId;
            this.userRole = this.currentUserId.role;
            this.getAllEmpSKillAPI(this.offset, this.limit);
        }
        this.techDepthService.getTechDepthLevels().subscribe((data) => {
            this.techDepth = data.technical_depth;
        });
    }

    loadPage(page: number) {
        this.page = page;
        this.offset = (this.page - 1) * this.limit;
        if (
            this.userRole == this.appRoles.roles[2] ||
            this.userRole == this.appRoles.roles[3] || this.userRole == this.appRoles.roles[0]
        ) {
            this.getTeamTechSkillMap(this.empId, this.offset, this.limit, this.selectedDept, this.selectedSubdept);
        } else if (this.userRole == this.appRoles.roles[1]) {
            this.getAllEmpSKillAPI(this.offset, this.limit);
        }
    }

    getTeamTechSkillMap(flId: any, offset: number, limit: any, dept?: any, subdept?: any) {
        this.teamSkillService
            .getTeamTechSkillMap(flId, offset, limit, dept, subdept)
            .subscribe((data) => {
                if(data?.rows){
                let teamskill = data.rows;

                teamskill.forEach((row:any) => {
                    row.target_proficiency_history = this.getTargetHistory(
                        row.target_proficiency_history
                    );
                    if (row.targetAchievedHistory) {
                        row.targetAchievedHistory = this.getTargetAchievedHistory(
                            row.targetAchievedHistory
                        );
                    }
                });

                this.teamSkills = teamskill;

                for(let each of this.teamSkills){

                    if(each.delete_status)
                      each.delete_status = 0;
                    else
                      each.delete_status = 1;
                }
                
                this.totalCount = data.count;
            }else{
                this.teamSkills = []
            }
            });
    }

     getTargetAchievedHistory(history:any) {
        let techDepthAchievedHistory = [];
        for (let i = 0; i < history.length; i++) {
            let tech = history[i];
            if (tech) {
                if (i == history.length - 1 || history.length == 1) {
                    tech.last = true;
                } else {
                    tech.last = false;
                }
                techDepthAchievedHistory.push(tech);
            }
        }
        return techDepthAchievedHistory;
    }

    getAllEmpSKillAPI(offset: any, limit: any) {
        this.technicalSkillService
            .getAllEmpSKillAPI(offset, limit)
            .subscribe((data) => {
                let teamskill = data.rows;
                teamskill.forEach((row:any) => {
                    row.target_proficiency_history = this.getTargetHistory(
                        row.target_proficiency_history
                    );
                });
                console.log('44444444444444444444444444444444444444444');
                
                this.teamSkills = teamskill;
                console.log('3333333333333333333333333333333333333333333333');
                
                this.totalCount = data.count;
            });
    }

    counter(i: number) {
        return new Array(i);
    }

    editFunctional(skill:any) {
        console.log("inside the edit called", skill);
    }

    deleteFunctional(i: any) {
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
                    this.teamSkillService
                        .deleteFunctionalRow(this.teamSkills[i].team_skill_id)
                        .subscribe(
                            (data) => {
                                this.teamSkills.splice(i, 1);
                                this.router.navigate(["/functional-skill-map"]);
                                this.toastr.success(
                                    "FunctionalRow Deleted successfully.",
                                    "Success"
                                );
                            },
                            (error) => {
                                this.toastr.error("FunctionalRow Not Delete .", "Error");
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
                        "Your FunctionalRow is safe :)",
                        "error"
                    );
                }
            });
    }

    getTargetHistory(history: any) {
        history = JSON.parse(history);
        let techDepthHistory = [];
        for (let i = 0; i < history.length; i++) {
            let tech = history[i];
            if (tech) {
                tech.name = this.getTechnicalDepthName(tech.depth);
                if (i == history.length - 1 || history.length == 1) {
                    tech.last = true;
                } else {
                    tech.last = false;
                }
                techDepthHistory.push(tech);
            }
        }
        return techDepthHistory;
    }

    getTechnicalDepthName(id: any) {
        let depthName = "";
        for (let depth of this.techDepth) {
            if (depth.technical_depth_id == id) {
                depthName = depth.technical_depth_nm;
            }
        }
        return depthName;
    }

    getTeamSkillDeletedStatus(event: any, i: any , event_data: any) {
    if(event.target.checked){
       this.delete_status = 1;   
       this.teamSkills.forEach((val: any) => {

        if(val.team_skill_id ==  event_data.team_skill_id){
            val.delete_status = 1;   
        }
       })
       this.teamSkillService.getTeamSkillDeleteStatus(this.teamSkills[i].team_skill_id, this.delete_status).subscribe((data)=>{
       console.log("Skill id" + this.teamSkills[i].team_skill_id);
       console.log("Delete_Status" + this.delete_status);
       console.log("Checked: ", JSON.stringify(data));       
     })
    } else{
      this.teamSkills[i].delete_status = true;
       console.log("Team Skill Id", this.teamSkills[i]);
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
        text: "Disabling this skill will disable the skills mapped across all the employees. Do you want to proceed?",
        icon: "warning",
        confirmButtonText: "Yes, disable it!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
       })
      .then((result) => {
        if (result.value) {
           this.delete_status = 0;
           this.teamSkills.forEach((val: any) => {

           if(val.team_skill_id ==  event_data.team_skill_id){
            val.delete_status = 0;   
           }
           })
           this.teamSkillService.getTeamSkillDeleteStatus(this.teamSkills[i].team_skill_id, this.delete_status).subscribe((data)=>{
           console.log("Skill id" + this.teamSkills[i].team_skill_id);
           console.log("Delete_Status" + this.delete_status);
           console.log("Unchecked: ", JSON.stringify(data));
           this.toastr.success(
                  "Skill has been disabled successfully.",
                  "Success"
                );
              },
              (error) => {
                this.toastr.error("Skill is enabled.", "Error");
              }
            );
          swalWithBootstrapButtons.fire(
            "Disabled!",
            "Skill has been disabled.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Skill is still enabled.",
            "error"
          );
        }
      }
      );
    
    }

  }

    getSelectedDept() {
        this.subDept = [];
        this.selectedSubdept = '';
        if (this.selectedDept == null) {
            this.subDept = [];
        }
        if (this.currentUserId.role == this.appRoles.roles[1]) {
            this.getAllSubdept(this.selectedDept);
        } else {
            this.getTeamTechSkillMap(this.empId, this.offset, this.limit, this.selectedDept)
            this.getFlSubdept(this.empId, this.selectedDept);
        }

    }

    getSelectedSubdept() {
        this.getTeamTechSkillMap(this.empId, this.offset, this.limit, this.selectedDept, this.selectedSubdept);
    }

    getAllSubdept(dept: any) {
        //console.log('----------------dept', dept);
        this.techSkillMasterService.getAllSubdeptMaster(dept).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length > 0) {

            } else {
                this.selectedSubdept = null;
            }
            //this.selectedSubdept = data.subdept_info[0].subdept_id;
            //console.log('----------------subdept', dept);
        });
    }

    getFlSubdept(flId: any, dept_id: any, btnchk?: any) {
        console.log("-------------getFlSubdept", dept_id);

        this.techSkillMasterService.getFlSubdept(flId, dept_id).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length <= 0) {
                this.selectedSubdept = null
            } else {
                this.btnchkData = true
            }
            //this.selectedSubdept = data.subdept_info[0].subdept_id;
        });
    }

    getFLDept(flId: any) {
        this.techSkillMasterService.getFlDept(flId).subscribe(data => {
            this.dept = data.dept_info;
            this.selectedDept = data.dept_info[0].dept_id
            //this.getFlSubdept(flId, this.selectedDept);
            this.getFlSubdept(flId, this.selectedDept, this.btnchk);
            this.getTeamTechSkillMap(this.empId, this.offset, this.limit, this.selectedDept);
        });
    }

    

}
