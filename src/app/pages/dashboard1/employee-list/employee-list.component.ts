import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TechSkillLevelMasterService } from "src/app/core/services/tech-skill-levels.service";
import { TeamSkillService } from "src/app/core/services/team-skill.service";
import { TechnicalSkillService } from "src/app/core/services/tech-skill-map.service";
import { TargetProficiencyService } from "src/app/core/services/target-proficiency";
import { TechSkillMasterService } from "src/app/core/services/tech-skill-master.service";
import { AuthService } from "src/app/core/services/auth.service";
import { roles } from '../../../../environments/roles';
import * as _ from "lodash";

@Component({
    selector: "app-employee-list",
    templateUrl: "./employee-list.component.html",
    styleUrls: ["./employee-list.component.scss"],
})
export class EmployeeListComponent implements OnInit {
    empSgId: any;
    currentUserId: any = {};
    currentUser: any = {};
    empId: any;
    userRole: any;
    appRoles = roles;
    subDept: any;
    subDomainId: any;
    radioLevel1: any;
    getLevel1: any;
    getLevel2: any;
    getLevel3: any;
    targetProf: any;

    selectedDomainName: any;
    selectSubdomainName: any;
    selectedDomain: any;
    selectedDept: any;
    selectedSubDept: any;

    getSelectedLevel1: any = null;
    getSelectedLevel2: any = null;
    getSelectedLevel3: any = null;
    selectedTargetProf: any = null;
    employeeSkill: any;
    colorCode = ["card-bg1", "card-bg2", "card-bg3", "card-bg4"];
    cardBg: any = [];

    selectedLevelValue1: any;
    selectedLevelValue2: any;
    selectedLevelValue3: any;
    selectedLevelDepth: any;
    tech_skill_id: any;
    offset = 0;
    limit = 20;
    totalCount = 0;
    selected = true;
    fromSearch = false;

    @Output() clearGlobalSearch = new EventEmitter<String>();

    constructor(
        private route: ActivatedRoute,
        public techSkillLevelMasterService: TechSkillLevelMasterService,
        private authService: AuthService,
        public technicalSkillService: TechnicalSkillService,
        public targetProficiencyService: TargetProficiencyService,
        public teamSkillService: TeamSkillService,
        public techSkillMasterService: TechSkillMasterService
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            if (params.subdomain) {
                this.subDomainId = params.subdomain;
            }
            if (params.domain) {
                this.selectedDomain = params.domain;
            }
            if (params.dept_id && params.dept_id !== '0') {
                this.selectedDept = params.dept_id;
            }
            if (params.subdept_id && params.subdept_id > 0) {
                this.selectedSubDept = params.subdept_id;
            } else if (params.subdept_id && params.subdept_id == 0) {
                this.selectedSubDept = 0;
            }
            if (params.level_id) {
                this.fromSearch = true;
                this.tech_skill_id = params.level_id;
                this.getSelectedLevel1 = null;
                this.getSelectedLevel2 = null;
                this.getSelectedLevel3 = null;
            }
            this.getSelectedSubDomain(this.subDomainId);
            this.getLevels(this.subDomainId);
        });

        this.currentUserId = this.authService.currentUser;
        if (this.currentUserId.role == this.appRoles.roles[4] || this.currentUserId.tempRole == this.appRoles.roles[4]) {
            // "access denied";

        } else if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.currentUser = this.currentUserId.sgId;
            this.empId = this.currentUserId.emp_id;
            this.userRole = this.currentUserId.role;
            this.getFlSubdept();
            this.getLevelFilter(this.empId);
            //this.getTeam(this.currentUserId.emp_id);
        } else if (
            this.currentUserId.role == this.appRoles.roles[1] ||
            this.currentUserId.role == this.appRoles.roles[0]
        ) {
            this.currentUser = this.currentUserId.sgId;
            this.userRole = this.currentUserId.role;
            this.getLevelFilter();
            //this.getEmployee();
        }

        this.getTargetProficiency();
    }

    getFlSubdept() {
        this.techSkillMasterService.getFlSubdept(this.empId, this.selectedDept).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length > 0) {

            } else {
                this.selectedSubDept = null;
            }
        });
    }

    getSelectedSubDomain(subdomain: any) {
        this.techSkillMasterService
            .getSubdomainInfo(subdomain)
            .subscribe((data) => {
                this.selectedDomainName = data.subdomain_info[0].domain_info.domain_nm;
                this.selectSubdomainName = data.subdomain_info[0].subdomain_nm;
            });
    }
    getTeam(flId: any) {
        //this.teamSkillService.getTeamByFlId(flId, this.offset, this.limit).subscribe(data => {
        this.teamSkillService
            .getTeamMemberBySubdomain(flId, this.subDomainId, this.offset, this.limit)
            .subscribe((data) => {
                this.employeeSkill = data.emp_info;
                this.totalCount = data.emp_info_aggregate.aggregate.count;
                for (let i = 0; i < this.employeeSkill.length; i++) {
                    for (let j = 0; j < this.colorCode.length; j++) {
                        this.cardBg.push(this.colorCode[j]);
                    }
                }
            });
    }
    getEmployee() {
        //this.teamSkillService.getAllMember(this.offset, this.limit).subscribe(data => {
        this.teamSkillService
            .getEmpBySubdomain(
                this.selectedDept,
                this.subDomainId,
                this.offset,
                this.limit
            )
            .subscribe((data) => {
                this.employeeSkill = data.emp_info;
                this.totalCount = data.emp_info_aggregate.aggregate.count;
                for (let i = 0; i < this.employeeSkill.length; i++) {
                    for (let j = 0; j < this.colorCode.length; j++) {
                        this.cardBg.push(this.colorCode[j]);
                    }
                }
            });
    }
    getLevelFilter(flId?: any) {

        let whereCondition: any = {
            "team_skills_info": {},
            "team_skill_status": { "_eq": 0 }
        }
        let flWhereCondition = {}
        if (this.getSelectedLevel1) {
            whereCondition.team_skills_info["tech_skill_level1_id"] = { "_eq": this.getSelectedLevel1 }
        }
        if (this.getSelectedLevel2) {
            whereCondition.team_skills_info["tech_skill_level2_id"] = { "_eq": this.getSelectedLevel2 }
        }
        if (this.getSelectedLevel3) {
            whereCondition.team_skills_info["tech_skill_level3_id"] = { "_eq": this.getSelectedLevel3 }
        }
        if (this.selectedDept) {
            whereCondition.team_skills_info["dept_id"] = { "_eq": parseInt(this.selectedDept) }
        }
        if (this.selectedSubDept) {
            whereCondition.team_skills_info["subdept_id"] = { "_eq": parseInt(this.selectedSubDept) }
        } else if (this.selectedSubDept == 0) {
            whereCondition.team_skills_info["subdept_id"] = { "_is_null": true }
        }
        if (this.selectedDomain) {
            whereCondition.team_skills_info["domain"] = { "_eq": parseInt(this.selectedDomain) }
        }
        if (this.subDomainId) {
            console.log('-----------------subdomains', this.subDomainId);
            whereCondition.team_skills_info["sub_domain"] = { "_eq": parseInt(this.subDomainId) }
        }
        if (this.selectedTargetProf) {
            whereCondition["technical_depth_id"] = { "_eq": this.selectedTargetProf }
        } else {
            whereCondition["technical_depth_id"] = { "_is_null": false }
        }

        if (flId) {
            flWhereCondition = { "_or": [{ "fl_emp_id": { "_eq": flId } }, { "emp_id": { "_eq": flId } }, { "supervisor_emp_id": { "_eq": flId } }] }
        }
        this.teamSkillService.getEmpLisTForAllTech(whereCondition, flWhereCondition, this.offset, this.limit)
            .subscribe((data) => {
                console.log(data);
                this.employeeSkill = data.emp_info;
                this.totalCount = data.emp_info_aggregate.aggregate.count;
            });

        for (let i = 0; i < this.totalCount; i++) {
            for (let j = 0; j < this.colorCode.length; j++) {
                this.cardBg.push(this.colorCode[j]);
            }
        }
    }

    getLevel2Filter(flId: any, level1Id: any, level2Id: any) {
        this.teamSkillService
            .getTeamMemberWithSkillevel2(
                flId,
                level1Id,
                level2Id,
                this.offset,
                this.limit
            )
            .subscribe((data) => {
                this.employeeSkill = data.emp_info;
                this.totalCount = data.emp_info_aggregate.aggregate.count;
                for (let i = 0; i < this.employeeSkill.length; i++) {
                    for (let j = 0; j < this.colorCode.length; j++) {
                        this.cardBg.push(this.colorCode[j]);
                    }
                }
            });
    }

    getDepthFilter(flId: any, level1Id: any) {
        this.teamSkillService
            .getTeamMemberWithSkillevel1(flId, level1Id, this.offset, this.limit)
            .subscribe((data) => {
                this.employeeSkill = data.emp_info;
                this.totalCount = data.emp_info_aggregate.aggregate.count;
                for (let i = 0; i < this.employeeSkill.length; i++) {
                    for (let j = 0; j < this.colorCode.length; j++) {
                        this.cardBg.push(this.colorCode[j]);
                    }
                }
            });
    }

    getLevels(subdomain: any) {
        this.techSkillLevelMasterService
            .getTechSkillLevel(subdomain, "level1")
            .subscribe((data) => {
                this.getLevel1 = data.tech_skills_info;
                if (this.tech_skill_id) {
                    let index = _.findIndex(this.getLevel1, (topic1: any) => {
                        return topic1.tech_skill_id == this.tech_skill_id;
                    });
                    if (index != -1) {
                        this.selectedLevel1(parseInt(this.tech_skill_id), index, true);
                    }
                }
            });

        this.techSkillLevelMasterService
            .getTechSkillLevel(subdomain, "level2")
            .subscribe((data) => {
                this.getLevel2 = data.tech_skills_info;
                if (this.tech_skill_id) {
                    let index = _.findIndex(this.getLevel2, (topic1: any) => {
                        return topic1.tech_skill_id == this.tech_skill_id;
                    });
                    if (index != -1) {
                        this.selectedLevel2(parseInt(this.tech_skill_id), index, true);
                    }
                }
            });

        this.techSkillLevelMasterService
            .getTechSkillLevel(subdomain, "level3")
            .subscribe((data) => {
                this.getLevel3 = data.tech_skills_info;
                if (this.tech_skill_id) {
                    let index = _.findIndex(this.getLevel3, (topic1: any) => {
                        return topic1.tech_skill_id == this.tech_skill_id;
                    });
                    if (index != -1) {
                        this.selectedLevel3(parseInt(this.tech_skill_id), index, true);
                    }
                }
            });
    }

    getTargetProficiency() {
        this.targetProficiencyService.getTargetProficiency().subscribe((data) => {
            this.targetProf = data.technical_depth;
        });
    }

    getAllEmpSkill(obj: any) {
        let offset = 0;
        let limit = 15;
        this.technicalSkillService
            .listAllSkillMapping(obj, offset, limit)
            .subscribe((data) => {
                this.employeeSkill = data;

                for (let i = 0; i < this.employeeSkill.length; i++) {
                    for (let j = 0; j < this.colorCode.length; j++) {
                        this.cardBg.push(this.colorCode[j]);
                    }
                }
            });
    }

    selectedLevel1(id: any, i: any, search: any) {
        if (!this.getSelectedLevel2 && this.getSelectedLevel3) {
            this.getLevel3.forEach((item: any) => {
                if (item.tech_skill_id == this.getSelectedLevel3) {
                    item.selected = false;
                    this.getSelectedLevel3 = "";
                }
            });
        }

        this.getLevel1.forEach((item: any) => {
            if (item.tech_skill_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
                this.getSelectedLevel1 = id;
                if (
                    (this.userRole == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) ||
                    (this.userRole == this.appRoles.roles[3] &&
                        this.currentUserId.tempRole == this.appRoles.roles[3])
                ) {
                    this.getLevelFilter(this.empId);
                } else if (this.userRole == this.appRoles.roles[1] || this.userRole == this.appRoles.roles[0]) {
                    this.getLevelFilter();
                }
            }
        });
        this.clearSearch(search);
    }
    selectedLevel2(id: any, i: any, search: any) {
        if (!this.getSelectedLevel1 && this.getSelectedLevel3) {
            this.getLevel3.forEach((item:any) => {
                if (item.tech_skill_id == this.getSelectedLevel3) {
                    item.selected = false;
                    this.getSelectedLevel3 = "";
                }
            });
        }
        this.getLevel2.forEach((item: any) => {
            if (item.tech_skill_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
                this.getSelectedLevel2 = id;

                if (
                    (this.userRole == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) ||
                    (this.userRole == this.appRoles.roles[3] &&
                        this.currentUserId.tempRole == this.appRoles.roles[3])
                ) {
                    this.getLevelFilter(this.empId);
                } else if (this.userRole == this.appRoles.roles[1] || this.userRole == this.appRoles.roles[0]) {
                    this.getLevelFilter();
                }
            }
        });
        this.clearSearch(search);
    }
    selectedLevel3(id: any, i: any, search: any) {
        this.getLevel3.forEach((item: any) => {
            if (item.tech_skill_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
                this.getSelectedLevel3 = id;

                if (
                    (this.userRole == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) ||
                    (this.userRole == this.appRoles.roles[3] &&
                        this.currentUserId.tempRole == this.appRoles.roles[3])
                ) {
                    this.getLevelFilter(this.empId);
                } else if (this.userRole == this.appRoles.roles[1] || this.userRole == this.appRoles.roles[0]) {
                    this.getLevelFilter();
                }
            }
        });
        this.clearSearch(search);
    }
    counter(i: number) {
        return new Array(i);
    }
    targetProficiency(id: any, i: any) {
        this.targetProf.forEach((item: any) => {
            if (item.technical_depth_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
                this.selectedTargetProf = id;

                if (
                    (this.userRole == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) ||
                    (this.userRole == this.appRoles.roles[3] &&
                        this.currentUserId.tempRole == this.appRoles.roles[3])
                ) {
                    this.getLevelFilter(this.empId);
                } else if (this.userRole == this.appRoles.roles[1] || this.userRole == this.appRoles.roles[0]) {
                    this.getLevelFilter();
                }
            }
        });
    }

    clearSearch(search: any) {
        if (!search) {
            if (this.fromSearch) {
                this.fromSearch = false;
                let clearBtn = document
                    .getElementsByClassName("clear-btn")
                    .item(0) as HTMLElement;
                if (clearBtn) clearBtn.click();
            }
        }
    }
}
