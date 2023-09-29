
import { Component, OnInit } from '@angular/core';
import { TechDepthService } from 'src/app/core/services/tech-depth-master';
import { TechnicalSkillService } from 'src/app/core/services/tech-skill-map.service';
import { TechSkillMasterService } from 'src/app/core/services/tech-skill-master.service';
import { TeamSkillService } from 'src/app/core/services/team-skill.service';
import { TechSkillLevelMasterService } from 'src/app/core/services/tech-skill-levels.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { roles } from 'src/environments/roles';
import * as _ from 'lodash';


@Component({
    selector: 'app-project-consultant',
    templateUrl: './project-consultant.component.html',
    styleUrls: ['./project-consultant.component.scss']
})
export class ProjectConsultantComponent implements OnInit {
    empSgId: any;
    currentUserId: any = {};
    currentUser: any = {};
    empId: any;       
    userRole: any;
    appRoles = roles;
    dept: any;
    subDept: any = [];
    selectedDept: any;
    selectedSubdept: any;
    domainList: any;
    selectedDomain: any;
    subdomainList: any;
    selectedSubDomain: any;
    selectedLevel1: any;
    level1List: any;
    selectedLevel2: any;
    level2List: any;
    selectedLevel3: any;
    level3List: any;
    tempSelectedLevel1: any
    tempSelectedLevel2: any
    tempSelectedLevel3: any

    techDepth: any = 0;
    techDepthLevels: any;
    employeeSkill: any
    searchTerm: any;
    searchList: any = [];
    colorCode = ['card-bg1', 'card-bg2', 'card-bg3', 'card-bg4'];
    cardBg:any[] = [];
    limit: number = 20;
    offset: number = 0;
    page: number = 1;
    totalCount = 0;
    submitted = false;
    filterTab: any = 'ALL'
    active: any = 0;
    filterProjectConsultantForm!: FormGroup;
    searchList1: any = [];
    isDropdownDisabled: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        public techDepthService: TechDepthService,
        public technicalSkillService: TechnicalSkillService,
        public techSkillMasterService: TechSkillMasterService,
        public teamSkillService: TeamSkillService,
        public techSkillLevelMasterService: TechSkillLevelMasterService) { }

    ngOnInit(): void {

        this.currentUserId = this.authService.currentUser;
        if (this.currentUserId.role == this.appRoles.roles[4] || this.currentUserId.tempRole == this.appRoles.roles[4]) {
            this.userRole = this.appRoles.roles[4];
            // "access denied";

        } else if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.currentUser = this.currentUserId.sgId;
            this.empId = this.currentUserId.emp_id;
            this.userRole = this.currentUserId.role;
            // this.getFLDept(this.empId);

        } else if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.currentUser = this.currentUserId.sgId;
            this.userRole = this.currentUserId.role;
        }
        this.getAllDept()
        //  this.getAllMember(this.offset, this.limit);
        this.getAllDept()
        this.getTechDepthLevels();
        this.getTechSkillLevelByLevel();

        this.filterProjectConsultantForm = this.formBuilder.group({
            dept: [''],
            subDept: [''],
            domain: [''],
            subdomain: [''],
            level1: [''],
            level2: [''],
            level3: [''],
        });
    }

    getAllMember(offset: any, limit: any) {
        this.teamSkillService.getAllMember(offset, limit).subscribe(data => {
            this.employeeSkill = data.emp_info
            this.totalCount = data.emp_info_aggregate.aggregate.count;

            for (let i = 0; i < this.employeeSkill.length; i++) {
                for (let j = 0; j < this.colorCode.length; j++) {
                    this.cardBg.push(this.colorCode[j]);
                }
            }
        })
    }

    projectConsultantFilter() {
        let whereCondition:any = {
            "team_skills_info": {},
            "team_skill_status": { "_eq": 0}
        }
        let flWhereCondition = {}
        let selectedLevelOne: any;
        let selectedLevelTwo: any;
        let selectedLevelThree: any;

        if (this.selectedDept) {
            whereCondition.team_skills_info["dept_id"] = { "_eq": this.selectedDept }
        }
        if (this.selectedSubdept) {
            whereCondition.team_skills_info["subdept_id"] = { "_eq": this.selectedSubdept }
        } else if (this.selectedSubdept === null) {
            whereCondition.team_skills_info["subdept_id"] = { "_is_null": true }
        } else {

        }
        if (this.selectedDomain) {
            whereCondition.team_skills_info["domain"] = { "_eq": parseInt(this.selectedDomain) }
        }
        if (this.selectedSubDomain) {
            whereCondition.team_skills_info["sub_domain"] = { "_eq": this.selectedSubDomain }
        }
        selectedLevelOne = this.selectedLevel1 ? this.selectedLevel1 : this.tempSelectedLevel1;
        if (selectedLevelOne) {
            whereCondition.team_skills_info["tech_skill_level1_id"] = { "_eq": selectedLevelOne }
        }
        selectedLevelTwo = this.selectedLevel2 ? this.selectedLevel2 : this.tempSelectedLevel2;
        if (selectedLevelTwo) {
            whereCondition.team_skills_info["tech_skill_level2_id"] = { "_eq": selectedLevelTwo }
        }
        selectedLevelThree = this.selectedLevel3 ? this.selectedLevel3 : this.tempSelectedLevel3;
        if (selectedLevelThree) {
            whereCondition.team_skills_info["tech_skill_level3_id"] = { "_eq": selectedLevelThree }
        }
        if (this.techDepth) {
            whereCondition["technical_depth_id"] = { "_eq": this.techDepth }
        } else {
            whereCondition["technical_depth_id"] = { "_is_null": false }
        }

        this.teamSkillService.getEmpLisTForAllTech(whereCondition, flWhereCondition, this.offset, this.limit)
            .subscribe((data: any) => {
                console.log(data);
                this.employeeSkill = data.emp_info;
                this.totalCount = data.emp_info_aggregate.aggregate.count;
            });

        for (let i = 0; i < this.employeeSkill?.length; i++) {
            for (let j = 0; j < this.colorCode.length; j++) {
                this.cardBg.push(this.colorCode[j]);
            }
        }
    }

    getTechSkillLevelByLevel() {
        this.techSkillLevelMasterService.getTechSkillLevelByLevel().subscribe(data => {
            this.searchList1 = data.tech_skills_info;
            this.searchList = _.sortBy(this.searchList1, (o: any) => o.skill_nm)
            for(let each of this.searchList){
                each.levelShortForm = 'L' + each.levels[5]
              }
        });
    }

    public searchFn(skill: any): void {
        this.selectedDept = '';
        this.selectedSubdept = '';
        this.selectedDomain = '';
        this.selectedSubDomain = '';
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.tempSelectedLevel1 = '';
        this.tempSelectedLevel2 = '';
        this.tempSelectedLevel3 = '';

        this.employeeSkill = [];
        if (skill.levels == "level1") {
            this.tempSelectedLevel1 = skill.tech_skill_id;
        }
        if (skill.levels == "level2") {
            this.tempSelectedLevel2 = skill.tech_skill_id;
        }
        if (skill.levels == "level3") {
            this.tempSelectedLevel3 = skill.tech_skill_id;
        }
        this.domainList = []
        this.selectedDomain = '';
        this.subdomainList = []
        this.level1List = []
        this.level2List = []
        this.level3List = []
        console.log("data******", this.subdomainList)
        this.projectConsultantFilter();
    }

    getTechDepthLevels() {
        this.techDepthService.getTechDepthLevels().subscribe(data => {
            this.techDepthLevels = data.technical_depth;
        });
    }

    getEmpBySkillDepth(techDepth: any, obj?: any) {
        let offset = 0;
        let limit = 10;
        this.technicalSkillService.getProjectConsultantByDepth(obj, techDepth, offset, limit).subscribe(data => {
            this.employeeSkill = data.rows;
            this.totalCount = data.count;
        });
    }

    selectedTechDepth(techDepthId: any) {
        this.filterTab = techDepthId;
        if (techDepthId > 0 && this.selectedDept || this.searchTerm) {
            this.techDepth = techDepthId;
            this.projectConsultantFilter()
        } else {
            if (this.selectedDept || this.searchTerm) {
                this.techDepth = techDepthId;
                this.projectConsultantFilter()
            } else {
                // this.getAllMember(this.offset, this.limit);
                this.techDepth = techDepthId;
                this.employeeSkill = []
                this.totalCount = 0
            }
        }
    }

    counter(i: number) {
        return new Array(i);
    }

    getFLDept(flId: any) {
        this.techSkillMasterService.getFlDept(flId).subscribe(data => {
            this.dept = data.dept_info;
        });
    }
    getAllDept() {
        this.techSkillMasterService.getAllDeptMaster({}).subscribe(data => {
            this.dept = data.dept_info;
        });
    }
    getSelectedDept() {
        this.selectedSubdept = '';
        this.selectedDomain = '';
        this.selectedSubDomain = '';
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.tempSelectedLevel2 = '';
        this.tempSelectedLevel1 = '';
        this.tempSelectedLevel3 = '';
        this.employeeSkill = [];
        this.domainList = [];
        this.searchTerm = '';
        this.getAllSubdept(this.selectedDept);

        this.projectConsultantFilter();
    }
    getAllSubdept(dept: any) {
        this.techSkillMasterService.getAllSubdeptMaster(dept).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length > 0) {

            }
            else {
                this.subDept = null;
                this.getAllDomain()
            }
        });
    }
    getSelectedSubdept() {
        // this.techSkillMasterService.getTechDomainMasterBySubDept(this.selectedSubdept).subscribe(data => {
        //     this.domainList = data.domain_info;
        // });
        this.projectConsultantFilter();
        this.getAllDomain();

    }
    getAllDomain() {
        this.techSkillMasterService.getTechDomainMaster({}).subscribe(data => {
            this.domainList = data.domain_info;
        });

        this.selectedSubDomain = '';
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.tempSelectedLevel2 = '';
        this.tempSelectedLevel1 = '';
        this.tempSelectedLevel3 = '';
    }

    // getSelectedDomain() {
    //     // if (this.selectedDomain.length > 0) {
    //     this.techSkillMasterService.getTechSubDomainMaster(this.selectedDomain).subscribe({
    //         next:( data: any)=>{
    //         this.subdomainList = data.subdomain_info;
    //         }
    //     });
    //     this.selectedSubDomain = '';
    //     this.selectedLevel1 = '';
    //     this.selectedLevel2 = '';
    //     this.selectedLevel3 = '';
    //     this.totalCount = 0;
    //     this.employeeSkill = [];
    //     this.subdomainList = []
    //     this.projectConsultantFilter()
    //     this.subdomainList = []
    //     this.level1List = []
    //     this.level2List = []
    //     this.level3List = []

    // }

    // Declare a boolean variable to track whether the dropdown should be disabled.


getSelectedDomain() {
    if (this.selectedDomain.length > 0) {
        // Disable the dropdown.
        this.isDropdownDisabled = true;

        this.techSkillMasterService.getTechSubDomainMaster(this.selectedDomain).subscribe({
            next: (data: any) => {
                this.subdomainList = data.subdomain_info;
            }
        });
        
    } else {
        this.isDropdownDisabled = false;
        this.subdomainList = [];
    }
    this.selectedSubDomain = '';
    this.selectedLevel1 = '';
    this.selectedLevel2 = '';
    this.selectedLevel3 = '';
    this.totalCount = 0;
    this.employeeSkill = [];
    this.subdomainList = [];
    this.projectConsultantFilter();
    this.subdomainList = [];
    this.level1List = [];
    this.level2List = [];
    this.level3List = [];
}

    getSelectedSubDomain() {
        this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level1').subscribe(data => {
            this.level1List = data.tech_skills_info;
        });
        this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level2').subscribe(data => {
            this.level2List = data.tech_skills_info;
        });
        this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level3').subscribe(data => {
            this.level3List = data.tech_skills_info;
        });
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.employeeSkill = [];
        this.totalCount = 0;
        this.projectConsultantFilter()
    }
    getSelectedLevel1() {
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.employeeSkill = [];
        this.totalCount = 0;
        this.projectConsultantFilter()
    }
    getSelectedLevel2() {
        this.selectedLevel3 = '';
        this.employeeSkill = [];
        this.totalCount = 0;
        this.projectConsultantFilter()
    }
    getSelectedLevel3() {
        this.employeeSkill = [];
        this.projectConsultantFilter()
    }
    get form() {
        return this.filterProjectConsultantForm.controls;
    }

    loadPage(page: number) {
        this.page = page;
        this.offset = (this.page - 1) * this.limit;
        this.projectConsultantFilter();
    }

    collapseBtn() {
        this.selectedDept = '';
        this.searchTerm = '';
        this.selectedSubdept = '';
        this.selectedDomain = '';
        this.selectedSubDomain = '';
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.tempSelectedLevel2 = '';
        this.tempSelectedLevel1 = '';
        this.tempSelectedLevel3 = '';
        this.employeeSkill = [];
        this.totalCount = 0;
        this.domainList = [];
        this.subdomainList = [];
        this.level1List = [];
        this.level2List = [];
        this.level3List = [];
    }

}



