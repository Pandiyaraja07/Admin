import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TechDepthService } from 'src/app/core/services/tech-depth-master';
import { TechnicalSkillService } from 'src/app/core/services/tech-skill-map.service';
import { TechSkillMasterService } from 'src/app/core/services/tech-skill-master.service';
import { TechSkillLevelMasterService } from 'src/app/core/services/tech-skill-levels.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { TeamSkillService } from 'src/app/core/services/team-skill.service'
import { elementAt } from 'rxjs';
import { roles } from 'src/environments/roles';
import * as _ from "lodash";
@Component({
    selector: 'app-functional-skill-gap-matrix',
    templateUrl: './functional-skill-gap-matrix.component.html',
    styleUrls: ['./functional-skill-gap-matrix.component.scss']
})
export class FunctionalSkillGapMatrixComponent implements OnInit {
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
    level3: any;
    isDropdownDisabled: boolean = false;


    techDepthLevels: any;
    skillGapMatrix: any;
    filteredEmp: any;
    techDepth: any;
    //selectedSkills = [82, 69, 144, 290];
    department: any;

    submitted = false;

    skillGapMatrix1: any;

    filterTeamForm!: FormGroup;

    functionalSkillObj: any = {};
    isShowSelectLevel: boolean = false;
    tempselectedTopics: any = []
    finalAddedLevels: any = []
    addSkillBasedOn: boolean = false;

    isLevelEmpty: boolean = true;
    levelsArr: any = [];
    isDisable: boolean = false;
    offset: number = 0
    limit: number = 10;
    valueSelected: Boolean= false;

    constructor(public techDepthService: TechDepthService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private modalService: NgbModal,
        public technicalSkillService: TechnicalSkillService,
        public techSkillMasterService: TechSkillMasterService,
        public techSkillLevelMasterService: TechSkillLevelMasterService,
        public teamSkillService: TeamSkillService) { }

    ngOnInit(): void {
        this.getTechDepthLevels();

        this.currentUserId = this.authService.currentUser;
        if (this.currentUserId.role == this.appRoles.roles[4] || this.currentUserId.tempRole == this.appRoles.roles[4]) {
            this.userRole = this.appRoles.roles[4];
        } else if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.currentUser = this.currentUserId.sgId;
            this.empId = this.currentUserId.emp_id;
            this.userRole = this.currentUserId.role;
            this.getFLDept(this.empId);
            //this.getTeamTechSkillGapMatrix({}, this.empId)
        } else if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.currentUser = this.currentUserId.sgId;
            this.empId = this.currentUserId.emp_id;
            this.userRole = this.currentUserId.role;
            this.getAllDept();
            //this.getAllTechSkillGapMatrix({});
        }

        this.filterTeamForm = this.formBuilder.group({
            dept: [''],
            subDept: [''],
            domain: [''],
            subdomain: [''],
            level1: [''],
            level2: [''],
            level3: [''],

        });

    }
    getTechDepthLevels() {
        this.techDepthService.getTechDepthLevels().subscribe(data => {
            this.techDepthLevels = (data.technical_depth).reverse();
        });
    }

    getAllTechSkillGapMatrix(obj?: any) {
        let offset = 0
        let limit = 5
        this.technicalSkillService.getAllTechSkillGapMatrix(obj, offset, limit).subscribe(data => {
            this.skillGapMatrix = data.rows;
        })
    }

    counter(i: number) {
        return i >= 0 ? new Array(i) : new Array(0);
    }

    getTeamDept(flId: any) {
        this.techSkillMasterService.getTeamDept(flId).subscribe(data => {
            this.dept = data.dept_info
        });
    }
    getFLDept(flId: any) {
        // console.log('-----------------FL dept', flId);

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
        this.form.subDept.patchValue('');
        this.form.domain.patchValue('');
        this.form.subdomain.patchValue('');
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.selectedSubdept = '';
        this.subDept = [];
        this.domainList = [];
        this.subdomainList = [];
        this.level1List = [];
        this.level2List = [];
        this.finalAddedLevels = [];
        this.skillMatrixResult = [];
        this.isShowSelectLevel = false;
        if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.getAllSubdept(this.form.dept.value);
        }
        else {
            this.getFlSubdept(this.empId, this.form.dept.value);

        }

    }
    getAllSubdept(dept: any) {
        //console.log('---------deptttttt', dept);

        this.techSkillMasterService.getAllSubdeptMaster(dept).subscribe(data => {
            this.subDept = data.subdept_info;
            //console.log('-----------subDept',this.subDept.length);
            if (this.subDept.length > 0) {


            } else {
                this.getAllDomain();
            }
        });

    }

    getFlSubdept(flId: any, dept_id: any) {
        this.techSkillMasterService.getFlSubdept(flId, dept_id).subscribe(data => {
            this.subDept = data.subdept_info;
            //this.selectedSubdept = data.subdept_info[0].subdept_id;
            if (this.subDept.length > 0) {
                //this.domainList ='';
            } else {
                this.getAllDomain();
            }
        });
        //this.getAllDomain();
    }

    getSelectedSubdept() {
        this.form.domain.patchValue('');
        this.form.subdomain.patchValue('');
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.subdomainList = [];
        this.domainList = [];
        this.level1List = [];
        this.level2List = [];
        // this.techSkillMasterService.getTechDomainMasterBySubDept(this.selectedSubdept).subscribe(data => {
        //     this.domainList = data.domain_info;
        // });
        this.finalAddedLevels = [];
        this.skillMatrixResult = [];
        this.getAllDomain();

    }
    getAllDomain() {
        if (
            (this.subDept.length > 0 && this.selectedSubdept && this.form.dept.value) ||
            (this.subDept.length <= 0 && !this.selectedSubdept && this.form.dept.value)) {
            console.log('--------inside');
            this.techSkillMasterService.getTechDomainMaster({}).subscribe(data => {
                this.domainList = data.domain_info;
            });
        } else {
            console.log('-----------outsite');

        }

    }
    // getSelectedDomain(event: any) {
        
    //     if (this.functionalSkillObj.domain != null && event.length > 0) {            
    //         this.isDropdownDisabled = true;

    //         this.techSkillMasterService.getTechSubDomainMaster(this.functionalSkillObj.domain).subscribe(data => {
    //             this.subdomainList = data.subdomain_info;
    //         });
    //     }else{
    //         this.isDropdownDisabled = false;
    //         this.subdomainList=[];
    //     }
    //     this.form.subdomain.patchValue('');
    //     this.form.level1.patchValue('');
    //     this.form.level2.patchValue('');
    //     this.subdomainList = [];
    //     this.level1List = [];
    //     this.level2List = [];
    //     this.finalAddedLevels = [];
    //     // this.skillMatrixResult = [];
    //     //  this.submitted = false;
    //     this.isShowSelectLevel = false;

    // }


    getSelectedDomain(event: any) {
        // if (this.functionalSkillObj.domain != null && event.length > 0) {
        if (this.functionalSkillObj.domain != null) {
            this.techSkillMasterService.getTechSubDomainMaster(this.functionalSkillObj.domain).subscribe(data => {
                console.log("datatatata",data)
                this.subdomainList = data.subdomain_info;
            });
        }
        this.form.subdomain.patchValue('');
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.subdomainList = [];
        this.level1List = [];
        this.level2List = [];
        this.finalAddedLevels = [];
        // this.skillMatrixResult = [];
        //  this.submitted = false;
        this.isShowSelectLevel = false;

    }


    

    getSelectedSubDomain(event: any) {
        if (this.functionalSkillObj.subdomain != null) {
            this.techSkillLevelMasterService.getTechSkillLevel(this.functionalSkillObj.subdomain, 'level1').subscribe(data => {
                this.level1List = data.tech_skills_info;
                console.log('-----------subDomain', event);

            });
        }
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.level1List = [];
        this.level2List = [];
        // this.skillMatrixResult = [];
        this.isShowSelectLevel = false;
        this.finalAddedLevels = [];


    }



    getSelectLevel1(strongAreaModel1: any) {
        this.finalAddedLevels = [];
        this.level2List = []
        this.levelsArr = [];
        this.isShowSelectLevel = false;
        this.form.level2.patchValue('');
        this.selectedTopics = [];
        if (this.functionalSkillObj.level1 != null) {
            this.techSkillLevelMasterService.getTechSkillLevel(this.functionalSkillObj.subdomain, 'level2').subscribe(data => {
                this.level2List = data.tech_skills_info;
                this.techSkillLevelMasterService.getTechSkillLevel(this.functionalSkillObj.subdomain, 'level3').subscribe(data => {
                    let techlevel3 = data.tech_skills_info;
                    if (techlevel3.length > 0) {
                        //this.isShowSelectLevel = true;
                        this.isLevelEmpty = false;
                    } else if (this.level2List.length > 0) {
                        this.levelsArr = this.level2List;
                        this.isShowSelectLevel = true;
                        this.isLevelEmpty = true;
                        this.modalService.open(strongAreaModel1, {
                            scrollable: true,
                            ariaLabelledBy: 'job-chart',
                            backdrop: 'static',
                            keyboard: true,
                            windowClass: 'my_custom_class'
                        });
                    }
                });
            });
        }
    }

    getSelectLevel2(strongAreaModel1: any) {
        this.selectedTopics = [];
        this.levelsArr = [];
        this.finalAddedLevels = [];
        //  this.skillMatrixResult = [];
        this.isDisable = false;
        if (this.functionalSkillObj.level2 != null && this.functionalSkillObj.level2 != '') {
            this.techSkillLevelMasterService.getTechSkillLevel(this.functionalSkillObj.subdomain, 'level3').subscribe(data => {
                this.level3List = data.tech_skills_info;
                this.isShowSelectLevel = true;
                this.levelsArr = this.level3List;
                this.modalService.open(strongAreaModel1, {
                    scrollable: true,
                    ariaLabelledBy: 'job-chart',
                    backdrop: 'static',
                    keyboard: true,
                    windowClass: 'my_custom_class'
                });
            });
        }
    }

    get form() {
        return this.filterTeamForm.controls;
    }

    skillMatrixResult:any = [];
    getTeamTechSkillGapMatrix1(obj: any, flId: any) {
        let offset = 0;
        let limit = 100;

        this.technicalSkillService.getTeamTechSkillGapMatrix(obj, flId, offset, limit).subscribe(data => {
            let responseData: any = [];
            data.rows.forEach((row: any) => {
                const foundAvailable = responseData.some((el: any) => el.team_skill_id === row.team_skill_id);
                if (!foundAvailable) responseData.push(row);
            });

            if (this.unCheckArray.length > 0) {
                this.unCheckArray.forEach((uncheckObj: any) => {
                    if (uncheckObj.levels == "level3") {
                        let index = this.skillMatrixResult.findIndex((item: any) => (item.domain_id === uncheckObj.domain_id && item.subdomain_id === uncheckObj.subdomain_id && item.level1.tech_skill_id === uncheckObj.level1.tech_skill_id && item.level2.tech_skill_id === uncheckObj.level2.tech_skill_id && item.tech_skill_id === uncheckObj.tech_skill_id));
                        if (index != -1) {
                            this.skillMatrixResult.splice(index);
                        }
                    }
                    if (uncheckObj.levels == "level2") {
                        let index = this.skillMatrixResult.findIndex((item: any) => (item.domain_id === uncheckObj.domain_id && item.subdomain_id === uncheckObj.subdomain_id && item.level1.tech_skill_id === uncheckObj.level1.tech_skill_id && item.tech_skill_id === uncheckObj.tech_skill_id));
                        if (index != -1) {
                            this.skillMatrixResult.splice(index);
                        }
                    }
                    if (uncheckObj.levels == "level3") {
                        let index = this.skillMatrixResult.findIndex((item: any) => (item.domain === uncheckObj.domain_id && item.sub_domain === uncheckObj.subdomain_id && item.tech_skill_level1_id === uncheckObj.level1.tech_skill_id) && (item.tech_skill_level2_id === uncheckObj.level2.tech_skill_id) && (item.tech_skill_level3_id === uncheckObj.tech_skill_id));
                        if (index != -1) {
                            this.skillMatrixResult.splice(index);
                        }
                    }
                    if (uncheckObj.levels == "level2") {
                        let index = this.skillMatrixResult.findIndex((item: any) => (item.domain === uncheckObj.domain_id && item.sub_domain === uncheckObj.subdomain_id && item.tech_skill_level1_id === uncheckObj.level1.tech_skill_id && item.tech_skill_level2_id === uncheckObj.tech_skill_id));
                        if (index != -1) {
                            this.skillMatrixResult.splice(index);
                        }
                    }
                });
            }

            this.selectedTopics.forEach((finalData: any) => {
                let level1Index = this.level1List.findIndex((item: any) => item.tech_skill_id === this.functionalSkillObj.level1);
                let skillMatrixResultRow:any = {
                    "tech_skill_id": finalData.tech_skill_id,
                    "skill_nm": finalData.skill_nm,
                    "domain_id": finalData.domain_id,
                    "subdomain_id": finalData.subdomain_id,
                    "domain_nm": finalData.domain_info.domain_nm,
                    "level": finalData.levels,
                    "level1": this.level1List[level1Index],
                    "level1_nm": this.level1List[level1Index].skill_nm,
                    "technical_depth": {
                        "level_no": -1
                    }
                }
                if (finalData.levels == 'level3') {
                    let level2Index = this.level2List.findIndex((item: any) => item.tech_skill_id === this.functionalSkillObj.level2);

                    skillMatrixResultRow["level2_nm"] = this.level2List[level2Index].skill_nm;
                    skillMatrixResultRow["level2"] = this.level2List[level2Index];
                }

                let foundSkill = responseData.find((el: any) => (el.tech_skill_level2_id === finalData.tech_skill_id
                    || el.tech_skill_level3_id === finalData.tech_skill_id));

                if (!foundSkill) {
                    foundSkill = skillMatrixResultRow;
                }
                foundSkill.skill_nm = skillMatrixResultRow.skill_nm;
                if (foundSkill.level == "level2") {
                    let index = this.skillMatrixResult.findIndex((item: any) => (item.domain_id === foundSkill.domain_id && item.subdomain_id === foundSkill.subdomain_id && item.level1.tech_skill_id === foundSkill.level1.tech_skill_id) && (item.tech_skill_id === foundSkill.tech_skill_id));
                    if (index == -1) {
                        this.skillMatrixResult.push(foundSkill);
                    }
                }
                if (foundSkill.level == "level3") {
                    let index1 = this.skillMatrixResult.findIndex((item: any) => (item.domain_id === foundSkill.domain_id && item.subdomain_id === foundSkill.subdomain_id && item.level1.tech_skill_id === foundSkill.level1.tech_skill_id) && (item.level2.tech_skill_id === foundSkill.level2.tech_skill_id) && (item.tech_skill_id === foundSkill.tech_skill_id));
                    if (index1 == -1) {
                        this.skillMatrixResult.push(foundSkill);
                    }
                }

                if (foundSkill.team_skill_id) {
                    let index2 = this.skillMatrixResult.findIndex((item: any) => (item.domain === foundSkill.domain && item.sub_domain === foundSkill.sub_domain && item.team_skill_id === foundSkill.team_skill_id));
                    if (index2 == -1) {
                        this.skillMatrixResult.push(foundSkill);
                    }
                }
                return true;
            })
            this.unCheckArray = [];
            for (let skill of this.skillMatrixResult) {
                if (skill.skill_mappings && skill.skill_mappings.length > 0) {
                    let skillsByEmp: any = _.groupBy(skill.skill_mappings, 'sg_id');
                    // sgid => [emp skills mapping]
                    skillsByEmp = _.map(skillsByEmp, (empSkills, sgId) => {
                        return _.maxBy(empSkills, 'technical_depth.level_no');
                    });

                    // techdepthid => [emp skills mapping]
                    let depthByEmp:any = {};
                    skill.maxDepthAchieved = 0;
                    _.map(skillsByEmp, (empSkill: any) => {
                        if (!depthByEmp[empSkill.technical_depth.level_no]) {
                            depthByEmp[empSkill.technical_depth.level_no] = [];
                        }
                        depthByEmp[empSkill.technical_depth.level_no].push(empSkill);
                        if (empSkill.technical_depth.level_no > skill.maxDepthAchieved) {
                            skill.maxDepthAchieved = empSkill.technical_depth.level_no;
                        }
                        return depthByEmp;
                    });

                    skill.depthByEmp = depthByEmp;
                }
            }
        });
    }

    selectedTopics: any = []
    isSelectedLevel(event: any) {
        return this.selectedTopics.indexOf(event) >= 0;
    }

    unCheckArray: any = [];
    addSkillBased: any = [];
    onChangeLevel(event: any, $event: any) {
        if (this.addSkillBasedOn && $event.target.checked) {
            this.addSkillBased.push(event);
            this.isDisable = this.addSkillBased.length > 0 ? true : false;
        } else if (this.addSkillBasedOn && !$event.target.checked) {
            let index = _.findIndex(this.addSkillBased, (topic1: any) => {
                return topic1.tech_skill_id == event.tech_skill_id;
            });
            if (index != -1) {
                this.addSkillBased.splice(index, 1);
            } else if (index == -1) {
                let level1Index = this.level1List.findIndex((item: any) => item.tech_skill_id === this.functionalSkillObj.level1);
                event["level1"] = this.level1List[level1Index]
                if (event.levels == "level3") {
                    let level2Index = this.level2List.findIndex((item: any) => item.tech_skill_id === this.functionalSkillObj.level2);
                    event["level2"] = this.level2List[level2Index];
                }
                this.unCheckArray.push(event);
            }
        } else {
            let index = this.selectedTopics.indexOf(event);
            if (index == -1) {
                this.selectedTopics.push(event);
                this.tempselectedTopics.push(event);
            } else {
                this.selectedTopics.splice(index, 1);
            }
        }

        if (this.unCheckArray.length == this.selectedTopics.length && this.addSkillBased.length <= 0) {
            this.isDisable = false;
        } else if (this.selectedTopics.length > 0) {
            this.isDisable = true;
        } else if (this.addSkillBased.length > 0) {
            this.isDisable = true;
        } else {
            this.isDisable = false;
        }

    }

    addSkillsLastLevel(strongAreaModel1: any) {
        if (this.selectedTopics.length > 0) {
            this.addSkillBasedOn = true;
        }
        this.modalService.open(strongAreaModel1, {
            scrollable: true,
            ariaLabelledBy: 'job-chart',
            backdrop: 'static',
            keyboard: true,
            windowClass: 'my_custom_class'
        });
    }

    selectedClose(i: any) {
        let level1Index = this.level1List.findIndex((item: any) => item.tech_skill_id === this.functionalSkillObj.level1);
        this.finalAddedLevels[i]["level1"] = this.level1List[level1Index]
        if (this.finalAddedLevels[i].levels == "level3") {
            let level2Index = this.level2List.findIndex((item: any) => item.tech_skill_id === this.functionalSkillObj.level2);
            this.finalAddedLevels[i]["level2"] = this.level2List[level2Index];
        }
        //find levels
        if (this.finalAddedLevels[i].levels == "level3") {
            let index = this.skillMatrixResult.findIndex((item: any) => (item.domain_id == this.finalAddedLevels[i].domain_id && item.subdomain_id == this.finalAddedLevels[i].subdomain_id && item.level1.tech_skill_id == this.finalAddedLevels[i].level1.tech_skill_id) && (item.level2.tech_skill_id == this.finalAddedLevels[i].level2.tech_skill_id) && (item.tech_skill_id == this.finalAddedLevels[i].tech_skill_id));
            if (index != -1) {
                this.skillMatrixResult.splice(index, 1);
            }
        }
        if (this.finalAddedLevels[i].levels == "level2") {
            let index = this.skillMatrixResult.findIndex((item: any) => (item.domain_id === this.finalAddedLevels[i].domain_id && item.subdomain_id === this.finalAddedLevels[i].subdomain_id && item.level1.tech_skill_id === this.finalAddedLevels[i].level1.tech_skill_id) && (item.tech_skill_id === this.finalAddedLevels[i].tech_skill_id));
            if (index != -1) {
                this.skillMatrixResult.splice(index, 1);
            }
        }
        if (this.finalAddedLevels[i].levels == "level3") {
            let index = this.skillMatrixResult.findIndex((item: any) => (item.domain === this.finalAddedLevels[i].domain_id && item.sub_domain === this.finalAddedLevels[i].subdomain_id && item.tech_skill_level1_id === this.finalAddedLevels[i].level1.tech_skill_id && item.tech_skill_level2_id === this.finalAddedLevels[i].level2.tech_skill_id && item.tech_skill_level3_id === this.finalAddedLevels[i].tech_skill_id));
            if (index != -1) {
                this.skillMatrixResult.splice(index, 1);
            }
        }
        if (this.finalAddedLevels[i].levels == "level2") {
            let index = this.skillMatrixResult.findIndex((item: any) => (item.domain === this.finalAddedLevels[i].domain_id && item.sub_domain === this.finalAddedLevels[i].subdomain_id && item.tech_skill_level1_id === this.finalAddedLevels[i].level1.tech_skill_id && item.tech_skill_level2_id === this.finalAddedLevels[i].tech_skill_id));
            if (index != -1) {
                this.skillMatrixResult.splice(index, 1);
            }
        }

        this.finalAddedLevels.splice(i, 1);
        if (this.tempselectedTopics.length > 0) {
            this.isDisable = true;
            this.finalAddedLevels = this.selectedTopics;
        }
        this.finalArr = [];
        if (this.finalAddedLevels.length > 0) {
            this.finalAddedLevels.forEach((ele: any) => {
                this.finalArr.push(ele.tech_skill_id);
            });
        } else {
            //   this.skillMatrixResult = [];
            this.isDisable = false;
            return;
        }

        let obj = {
            'dept': this.functionalSkillObj.dept,
            'subdept': this.selectedSubdept || null,
            'domain': this.functionalSkillObj.domain,
            'subdomain': this.functionalSkillObj.subdomain,
            'level1': this.functionalSkillObj.level1,
            'level2': this.functionalSkillObj.level2 || null,
            'level3': this.finalArr
        }

        if ((this.currentUserId.role == 'FL' && this.currentUserId.tempRole == "FL") || (this.currentUserId.role == 'supervisor' && this.currentUserId.tempRole == 'supervisor')) {
            //  this.skillMatrixResult = [];
            this.getTeamTechSkillGapMatrix1(obj, this.empId)
            this.finalArr = []
        }
        else if (this.currentUserId.role == 'HR' || this.currentUserId.role == 'CD') {
            this.getTeamTechSkillGapMatrix1(obj, this.empId);
        }

        this.isShowSelectLevel = true;
        this.modalService.dismissAll();
        this.tempselectedTopics = [];

    }

    clearSkills() {
        this.form.dept.patchValue('')
        this.form.subDept.patchValue('');
        this.form.domain.patchValue('');
        this.form.subdomain.patchValue('');
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.domainList = [];
        this.subDept = [];
        this.subdomainList = [];
        this.level1List = [];
        this.level2List = [];
        this.skillMatrixResult = [];
        this.finalAddedLevels = [];
        this.isShowSelectLevel = false;
        this.submitted = false;
    }

    closelevel() {
        this.modalService.dismissAll();
        for (let i = 0; i < this.tempselectedTopics.length; i++) {
            for (let j = 0; j < this.selectedTopics.length; j++) {
                if (this.selectedTopics[j].tech_skill_id == this.tempselectedTopics[i].tech_skill_id) {
                    this.selectedTopics.splice(j, 1);
                }
            }
        }

        if (this.selectedTopics.length > 0) {
            this.isDisable = true;
        }
        this.addSkillBased = [];
        this.unCheckArray = [];
        this.addSkillBasedOn = false;
    }

    teams: any;
    finalArr: any = [];
    filterForm(FilterForm: NgForm) {
        if (this.unCheckArray.length > 0 && this.addSkillBased.length > 0) {
            this.unCheckArray.forEach((events:any) => {
                var events:any = _.remove(this.selectedTopics, function (topic: any) {
                    return topic?.tech_skill_id == events?.tech_skill_id;
                });
            });
            this.addSkillBased.forEach((events:any) => {
                var events:any = _.remove(this.unCheckArray, function (topic: any) {
                    return topic?.tech_skill_id == events?.tech_skill_id;
                });
            });
        }

        if (this.addSkillBased.length > 0) {
            this.addSkillBased.forEach((event: any) => {
                this.finalAddedLevels.push(event);
            });
        }
        if (this.unCheckArray.length > 0) {
            this.unCheckArray.forEach((event: any) => {
                var events = _.remove(this.finalAddedLevels, function (topic:any) {
                    return topic.tech_skill_id == event.tech_skill_id;
                });
            });
        }

        this.submitted = true;
        this.addSkillBasedOn = false;
        if (this.tempselectedTopics.length > 0) {
            this.isDisable = true;
            this.finalAddedLevels = this.selectedTopics;
        }
        this.finalArr = [];
        this.finalAddedLevels.forEach((ele: any) => {
            this.finalArr.push(ele.tech_skill_id);
        });

        let obj = {
            'dept': this.functionalSkillObj.dept,
            'subdept': this.selectedSubdept || null,
            'domain': this.functionalSkillObj.domain,
            'subdomain': this.functionalSkillObj.subdomain,
            'level1': this.functionalSkillObj.level1,
            'level2': this.functionalSkillObj.level2 || null,
            'level3': this.finalArr
        }


        if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            // this.skillMatrixResult = [];
            this.getTeamTechSkillGapMatrix1(obj, this.empId)
            this.finalArr = []
        }
        else if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            //this.getAllTechSkillGapMatrix(obj);
            // this.skillMatrixResult = [];
            this.getTeamTechSkillGapMatrix1(obj, this.empId)
            this.finalArr = []
        }

        this.teamSkillService.getTeamFilter(obj, this.empId, this.offset, this.limit).subscribe(data => {
            this.teams = data.rows
        });
        this.addSkillBased = [];
        this.isShowSelectLevel = true;
        this.modalService.dismissAll();
        this.tempselectedTopics = [];

    }
}


  // filterTeam() {
  //   this.submitted = true

  //   let obj = {
  //     "dept": this.filterTeamForm.get('dept')?.value,
  //     "subDept": this.filterTeamForm.get('subDept')?.value,
  //     "domain": this.filterTeamForm.get('domain')?.value,
  //     "subdomain": this.filterTeamForm.get('subdomain')?.value,
  //     "level1": this.filterTeamForm.get('level1')?.value,
  //     "level2": this.filterTeamForm.get('level2')?.value,
  //     "level3": this.filterTeamForm.get('level3')?.value
  //   }
  //   let offset = 0;
  //   let limit = 10;

  //   if (this.currentUserId.role == 'FL') {
  //     // this.teamSkillService.getTeamFilter(obj, this.empId, offset, limit).subscribe(data => {
  //     //   this.teams = data.rows
  //     //   console.log('-----------filter team data', data);
  //     // });
  //   } else {
  //     // this.teamSkillService.getAllEmployeeFilter(obj, offset, limit).subscribe(data => {
  //     //   this.teams = data.rows
  //     //   console.log('-----------filter team data', data);
  //     // });
  //   }

  // }