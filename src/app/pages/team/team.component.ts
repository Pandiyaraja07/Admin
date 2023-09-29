import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from 'src/app/core/services/team.service';
import { TeamSkillService } from 'src/app/core/services/team-skill.service';
import { TechSkillMasterService } from 'src/app/core/services/tech-skill-master.service';
import { TechSkillLevelMasterService } from 'src/app/core/services/tech-skill-levels.service';
import { TechnicalSkillService } from 'src/app/core/services/tech-skill-map.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserProfileService } from 'src/app/core/services/user.service'
import { roles } from 'src/environments/roles';
import { dataTool } from 'echarts';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    empSgId: any;
    empId: any;
    currentUserId: any = {};
    currentUser: any = {};
    appRoles = roles;
    dept: any;
    subDept: any = [];
    selectedDept: any;
    selectedSubdept: any;
    tempSelectedLevel1: any
    tempSelectedLevel2: any
    tempSelectedLevel3: any
    searchTerm: any;
    domainList: any;
    selectedDomain: any;
    employeeSkill: any
    subdomainList: any;
    selectedSubDomain: any;
    selectedLevel1: any;
    level1List: any;
    addTeamSettingInfo : any;
    selectedLevel2: any;
    level2List: any;
    selectedLevel3: any;
    techDepth: any;
    level3List: any;
    userRole: any;
    teams: any;
    colorCode = ['card-bg1', 'card-bg2', 'card-bg3', 'card-bg4'];
    cardBg: any = [];
    submitted = false;
    filterTeamForm!: FormGroup;
    file: any
    //pagenation variable
    limit: number = 20;
    offset: number = 0;
    page: number = 1;
    totalCount: any;
    settingId: any;
    uploadFile: any;
    uploadSubmitted = false;
    getTechnicalSkillInfo: any;
    getBehaviouralSkillInfo: any; 
    getValidFromInfo: any;
    getValidToInfo: any;
    ValidFromId: any;
    ValidToId: any; 
    cdTeamFilter: any = 'All';
    uploadObj: any = {};
    TECHNICAL_SKILL_ID: any;
    BEHAVIOURAL_SKILL_ID: any;
    VALID_FROM: any;
    VALID_FROM_ID: any;
    VALID_TO: any;
    VALID_TO_ID: any;
    skillExists: boolean = false;
    skillMapName = "Auto create Skill Map if not exists";
    public loading: boolean = false;
    responseMsg: any;
    searchList: any = [];
    ENABLE_TECHNICAL_SKILL_APPROVAL: any;
    ENABLE_BEHAVIOURAL_SKILL_APPROVAL : any;
    todaydate: any;
    isDropdownDisabled: boolean = false;


    constructor(public techSkillMasterService: TechSkillMasterService,
        public teamMemberService: TeamMemberService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        public teamSkillService: TeamSkillService,
        public technicalSkillService: TechnicalSkillService,
        public techSkillLevelMasterService: TechSkillLevelMasterService,
        public uploadService: UploadService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private userProfileService: UserProfileService,
        private router: Router) { }

    ngOnInit(): void {
        this.currentUserId = this.authService.currentUser;
        this.todaydate = new Date();
        // this.todaydate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        if (this.currentUserId.role == this.appRoles.roles[4] || this.currentUserId.tempRole == this.appRoles.roles[4]) {

        } else if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.empId = this.currentUserId.emp_id;
            this.empSgId = this.currentUserId.sgId;
            this.userRole = this.currentUserId.role;
            //this.cdTeamFilter == 'Team'
            this.getFLDept(this.empId);
            this.getTeam(this.empId, this.offset, this.limit);
            this.getAllFLTeams(this.empId);

        } else if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.empId = this.currentUserId.emp_id;
            this.currentUser = this.currentUserId.sgId;
            this.userRole = this.currentUserId.role;
            if (this.cdTeamFilter == 'Team') {
                this.getTeam(this.currentUserId.emp_id, this.offset, this.limit);
                this.getAllFLTeams(this.currentUserId.emp_id);
            } else {
                this.getEmployee(this.offset, this.limit);
                this.getAllHRTeams();
            }
            //this.getEmployee(this.offset, this.limit);
            this.getAllDept();

        }
        // document.getElementById('get_file').onclick = function () {
        //     document.getElementById('my_file').click();
        // }

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

    loadPage(page: number) {
        this.page = page;
        this.offset = (this.page - 1) * this.limit;
        if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.getTeam(this.empId, this.offset, this.limit);
        } else if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            if (this.cdTeamFilter == 'All') {
                this.getEmployee(this.offset, this.limit);
            } else {
                this.getTeam(this.empId, this.offset, this.limit);
            }
        }
    }

    conditionCheck() {
        if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.teamFilters(this.empId);
        } else {
            this.teamFilters();
        }

    }

    getcdTeamFilter(ez: any) {
        this.closeFilter()
        if (this.currentUserId.role == this.appRoles.roles[0] && this.cdTeamFilter == 'Team') {
            this.getTeam(this.currentUserId.emp_id, this.offset, this.limit);
            this.getAllFLTeams(this.currentUserId.emp_id);
        } else {
            this.getEmployee(this.offset, this.limit);
            this.getAllHRTeams();
        }
        this.searchTerm = null;

    }

    getTeam(flId: any, offset: any, limit: any) {
        this.teamSkillService.getTeamByFlId(flId, offset, limit).subscribe(data => {
            this.teams = data.emp_info;
            this.totalCount = data.emp_info_aggregate.aggregate.count
            for (let i = 0; i < this.teams.length; i++) {
                for (let j = 0; j < this.colorCode.length; j++) {
                    this.cardBg.push(this.colorCode[j]);
                }
            }
        });
    }

    getAllFLTeams(id: any) {
        this.searchList = [];
        this.teamSkillService.getAllTeamByFlId(id).subscribe(data => {
            this.searchList = data.emp_info;
        });
    }

    getAllHRTeams() {
        this.searchList = [];
        this.teamSkillService.getAllTeamByHrId().subscribe(data => {
            this.searchList = data.emp_info;
        });
    }

    getEmployee(offset: any, limit: any) {
        this.teamSkillService.getAllMember(offset, limit).subscribe(data => {
            this.teams = data.emp_info
            this.totalCount = data.emp_info_aggregate.aggregate.count
            for (let i = 0; i < this.teams.length; i++) {
                for (let j = 0; j < this.colorCode.length; j++) {
                    this.cardBg.push(this.colorCode[j]);
                }
            }

        });
    }
    // getTeamMember(flId: any, offset: any, limit: any) {
    //   this.teamSkillService.getTeam(flId, offset, limit).subscribe(data => {
    //     this.teams = data.rows;
    //     this.totalCount = data.count;

    //     for (let i = 0; i < this.teams.length; i++) {
    //       for (let j = 0; j < this.colorCode.length; j++) {
    //         this.cardBg.push(this.colorCode[j]);
    //       }
    //     }
    //   });
    // }

    // getAllEmployee(offset: any, limit: any) {
    //   this.teamSkillService.getAllEmployee(offset, limit).subscribe(data => {
    //     this.teams = data.rows;
    //     this.totalCount = data.count;

    //     for (let i = 0; i < this.teams.length; i++) {
    //       for (let j = 0; j < this.colorCode.length; j++) {
    //         this.cardBg.push(this.colorCode[j]);
    //       }
    //     }
    //   });
    // }

    teamFilters(flId?: any) {
        let whereCondition:any = {
            "team_skills_info": {},
            "team_skill_status": { "_eq": 0 }
        }
        let flWhereCondition = {}

        if (this.selectedDept) {
            whereCondition.team_skills_info["dept_id"] = { "_eq": this.selectedDept }
        }

        if (this.selectedSubdept) {
            whereCondition.team_skills_info["subdept_id"] = { "_eq": this.selectedSubdept }
        } else if (this.selectedSubdept == null) {
            whereCondition.team_skills_info["subdept_id"] = { "_is_null": true }
        } else {

        }
        if (this.selectedDomain) {
            whereCondition.team_skills_info["domain"] = { "_eq": parseInt(this.selectedDomain) }
        }
        if (this.selectedSubDomain) {
            whereCondition.team_skills_info["sub_domain"] = { "_eq": this.selectedSubDomain }
        }
        if (this.selectedLevel1) {
            whereCondition.team_skills_info["tech_skill_level1_id"] = { "_eq": this.selectedLevel1 }
        }
        if (this.selectedLevel2) {
            whereCondition.team_skills_info["tech_skill_level2_id"] = { "_eq": this.selectedLevel2 }
        }
        if (this.selectedLevel3) {
            whereCondition.team_skills_info["tech_skill_level3_id"] = { "_eq": this.selectedLevel3 }
        }
        if (this.techDepth) {
            whereCondition["technical_depth_id"] = { "_eq": this.techDepth }
        } else {
            whereCondition["technical_depth_id"] = { "_is_null": false }
        }

        if (flId) {
            flWhereCondition = { "_or": [{ "fl_emp_id": { "_eq": flId } }, { "emp_id": { "_eq": flId } }, { "supervisor_emp_id": { "_eq": flId } }] }
        }

        this.teamSkillService.getEmpLisTForAllTech(whereCondition, flWhereCondition, this.offset, this.limit)
            .subscribe((data) => {
                this.teams = data.emp_info;
                this.totalCount = data.emp_info_aggregate.aggregate.count;
            });

        // if (this.selectedDept && !this.selectedDomain && !this.selectedSubDomain && !this.selectedLevel1) {
        //     this.teamSkillService.getEmpWithSkillDept(this.selectedDept, this.offset, this.limit).subscribe(data => {
        //         this.teams = data.emp_info
        //         this.totalCount = data.emp_info_aggregate.aggregate.count
        //     })
        // }
        // if (this.selectedDept && this.selectedDomain && !this.selectedSubDomain && !this.selectedLevel1) {
        //     this.teamSkillService.getEmpWithSkillDomain(this.selectedDept, this.selectedDomain, this.offset, this.limit).subscribe(data => {
        //         this.teams = data.emp_info
        //         this.totalCount = data.emp_info_aggregate.aggregate.count
        //     });
        // }
        // if (this.selectedDept && this.selectedDomain && this.selectedSubDomain && !this.selectedLevel1) {
        //     this.teamSkillService.getEmpWithSkillSubdomain(this.selectedDept, this.selectedDomain, this.selectedSubDomain, this.offset, this.limit).subscribe(data => {
        //         this.teams = data.emp_info
        //         this.totalCount = data.emp_info_aggregate.aggregate.count
        //     })
        // }
        // if (this.selectedLevel1 && !this.selectedLevel2 && !this.selectedLevel3) {
        //     this.teamSkillService.getEmpListWithSkillevel1(this.selectedDept, this.selectedLevel1, this.selectedSubDomain, this.offset, this.limit).subscribe(data => {
        //         this.teams = data.emp_info
        //         this.totalCount = data.emp_info_aggregate.aggregate.count
        //     })
        // }
        // if (this.selectedLevel1 && this.selectedLevel2 && !this.selectedLevel3) {
        //     this.teamSkillService.getEmpListWithSkillevel2(this.selectedDept, this.selectedLevel1, this.selectedSubDomain, this.selectedLevel2, this.offset, this.limit).subscribe(data => {
        //         this.teams = data.emp_info
        //         this.totalCount = data.emp_info_aggregate.aggregate.count
        //     })
        // }
        // if (this.selectedLevel1 && this.selectedLevel2 && this.selectedLevel3) {
        //     this.teamSkillService.getEmpListWithSkillevel3(this.selectedDept, this.selectedLevel1, this.selectedSubDomain, this.selectedLevel2, this.selectedLevel3, this.offset, this.limit).subscribe(data => {
        //         this.teams = data.emp_info
        //         this.totalCount = data.emp_info_aggregate.aggregate.count
        //     })
        // }


        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.colorCode.length; j++) {
                this.cardBg.push(this.colorCode[j]);
            }
        }

        // } else if (this.currentUserId.role != this.appRoles.roles[1] || (this.currentUserId.role == this.appRoles.roles[0] && this.cdTeamFilter == 'Team')) {
        //     if (this.selectedDept && !this.selectedDomain && !this.selectedSubDomain && !this.selectedLevel1) {
        //         this.teamSkillService.getTeamMemberWithSkillDept(this.empId, this.selectedDept, this.offset, this.limit).subscribe(data => {
        //             this.teams = data.emp_info
        //             this.totalCount = data.emp_info_aggregate.aggregate.count
        //         })
        //     }
        //     if (this.selectedDept && this.selectedDomain && !this.selectedSubDomain && !this.selectedLevel1) {
        //         this.teamSkillService.getTeamMemberWithSkillDomain(this.empId, this.selectedDept, this.selectedDomain, this.offset, this.limit).subscribe(data => {
        //             this.teams = data.emp_info
        //             this.totalCount = data.emp_info_aggregate.aggregate.count
        //         });
        //     }
        //     if (this.selectedDept && this.selectedDomain && this.selectedSubDomain && !this.selectedLevel1) {
        //         this.teamSkillService.getTeamMemberWithSkillSubdomain(this.empId, this.selectedDept, this.selectedDomain, this.selectedSubDomain, this.offset, this.limit).subscribe(data => {
        //             this.teams = data.emp_info
        //             this.totalCount = data.emp_info_aggregate.aggregate.count
        //         })
        //     }
        //     if (this.selectedLevel1 && !this.selectedLevel2 && !this.selectedLevel3) {
        //         this.teamSkillService.getTeamMemberEmpListWithSkillevel1(this.empId, this.selectedSubDomain, this.selectedLevel1, this.offset, this.limit).subscribe(data => {
        //             this.teams = data.emp_info
        //             this.totalCount = data.emp_info_aggregate.aggregate.count
        //         })
        //     }
        //     if (this.selectedLevel1 && this.selectedLevel2 && !this.selectedLevel3) {
        //         this.teamSkillService.getTeamMemberEmpListWithSkillevel2(this.empId, this.selectedSubDomain, this.selectedLevel1, this.selectedLevel2, this.offset, this.limit).subscribe(data => {
        //             this.teams = data.emp_info
        //             this.totalCount = data.emp_info_aggregate.aggregate.count
        //         })
        //     }
        //     if (this.selectedLevel1 && this.selectedLevel2 && this.selectedLevel3) {
        //         this.teamSkillService.getTeamMemberEmpListWithSkillevel3(this.empId, this.selectedSubDomain, this.selectedLevel1, this.selectedLevel2, this.selectedLevel3, this.offset, this.limit).subscribe(data => {
        //             this.teams = data.emp_info
        //             this.totalCount = data.emp_info_aggregate.aggregate.count
        //         })
        //     }

        //     for (let i = 0; i < this.teams.length; i++) {
        //         for (let j = 0; j < this.colorCode.length; j++) {
        //             this.cardBg.push(this.colorCode[j]);
        //         }
        //     }
        // }
    }


    getFLDept(flId: any) {
        this.techSkillMasterService.getFlDept(flId).subscribe(data => {
            this.dept = data.dept_info;
        });
        //this.getAllSubdept(this.selectedDept);
    }

    getAllDept() {
        this.techSkillMasterService.getAllDeptMaster({}).subscribe(data => {
            this.dept = data.dept_info;
        });
    }

    getSelectedDept() {
        this.searchTerm = null;
        //this.cdTeamFilter = 'All'
        this.subdomainList = [];
        this.domainList = [];
        this.level1List = [];
        this.level2List = [];
        this.level3List = [];
        this.subDept = [];
        this.selectedSubdept = '';
        this.selectedDomain = '';
        this.selectedSubDomain = '';
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.islevel3length = false;

        if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.getAllSubdept(this.selectedDept);
        }
        else {
            this.getFlSubdept(this.empId, this.selectedDept);

        }
        // this.getAllDomain();
        //this.teamFilters();
        this.conditionCheck();
    }

    getAllSubdept(dept: any) {
        this.techSkillMasterService.getAllSubdeptMaster(dept).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length > 0) {

            } else {
                this.selectedSubdept = null;
                this.getAllDomain()
            }
        });
        //this.getAllDomain();
    }

    getSelectedSubdept() {
        //this.teamFilters();
        this.conditionCheck();
        this.getAllDomain();
    }

    getFlSubdept(flId: any, dept_id: any) {
        this.techSkillMasterService.getFlSubdept(flId, dept_id).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length > 0) {

            } else {
                this.selectedSubdept = null;
                this.getAllDomain()
            }
            //this.selectedSubdept = data.subdept_info[0].subdept_id;
        });
    }

    getAllDomain() {
        if (
            (this.subDept.length > 0 && this.selectedSubdept && this.selectedDept) ||
            (this.subDept.length <= 0 && !this.selectedSubdept && this.selectedDept)) {
            this.techSkillMasterService.getTechDomainMaster({}).subscribe(data => {
                this.domainList = data.domain_info;
            });
        } else {

        }
        this.selectedSubDomain = ''
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.islevel3length = false;
    }

    // getSelectedDomain(event: any) {
    //     if (event.length > 0) {
    //         if (this.selectedDomain) {
    //             this.techSkillMasterService.getTechSubDomainMaster(this.selectedDomain).subscribe(data => {
    //                 this.subdomainList = data.subdomain_info;
    //             });
    //             this.conditionCheck();
    //             //this.teamFilters();
    //         }
    //         this.subdomainList = [];
    //     }

    //     this.subdomainList = [];
    //     this.selectedLevel1 = ''
    //     this.selectedLevel2 = ''
    //     this.selectedLevel3 = ''
    //     this.selectedSubDomain = ''
    //     this.islevel3length = false;
    //     this.level1List = [];
    //     this.level2List = [];
    //     this.level3List = [];
    // }

        getSelectedDomain(event: any) {
        if (event.length > 0) {
        this.isDropdownDisabled = true;
            
            if (this.selectedDomain) {
                this.techSkillMasterService.getTechSubDomainMaster(this.selectedDomain).subscribe(data => {
                    this.subdomainList = data.subdomain_info;
                });
                this.conditionCheck();
                //this.teamFilters();
            }
        }else{
            this.isDropdownDisabled = false;
            this.subdomainList = [];

        }

        this.subdomainList = [];
        this.selectedLevel1 = ''
        this.selectedLevel2 = ''
        this.selectedLevel3 = ''
        this.selectedSubDomain = ''
        this.islevel3length = false;
        this.level1List = [];
        this.level2List = [];
        this.level3List = [];
    }


    islevel3length: boolean = false;
    getSelectedSubDomain() {
        this.level1List = [];
        this.level2List = [];
        this.level3List = [];
        this.selectedLevel1 = ''
        this.selectedLevel2 = ''
        this.selectedLevel3 = ''
        this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level1').subscribe(data => {
            this.level1List = data.tech_skills_info;
        });
        this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level2').subscribe(data => {
            let templevel2List = data.tech_skills_info;
            this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level3').subscribe(data => {
                let templevel3List = data.tech_skills_info;
                if (templevel3List.length > 0) {
                    this.islevel3length = true;
                }
            });
        });

        this.level2List = [];
        this.level3List = [];
        this.conditionCheck();
        //this.teamFilters();
    }

    getSelectedLevel1() {
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.level2List = [];
        this.level3List = [];
        this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level2').subscribe(data => {
            this.level2List = data.tech_skills_info;
        });
        this.conditionCheck();
        //this.teamFilters();
    }

    getSelectedLevel2() {
        this.selectedLevel3 = '';
        this.level3List = [];
        this.techSkillLevelMasterService.getTechSkillLevel(this.selectedSubDomain, 'level3').subscribe(data => {
            this.level3List = data.tech_skills_info;
        });
        this.conditionCheck();
        //this.teamFilters();
    }

    getSelectedLevel3() {
        this.conditionCheck()
        //this.teamFilters();
    }

    get form() {
        return this.filterTeamForm.controls;
    }

    onChange(event: any) {
        if (event.target.files[0]?.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            this.file = event.target.files[0];
            this.inValidArray = [];
            this.responseMsg = undefined;
        } else {
            this.uploadObj = {};
            this.responseMsg = undefined;
            this.toastr.error("Excel file format only accept ", "Error");
        }
    }

    inValidArray: any = [];
    onUpload(uploadForm: NgForm) {
        this.loading = true;
        this.uploadService.bulkUpload(this.file, this.skillExists).subscribe(data => {
            if (data.body) {
                this.responseMsg = data.body;
                if (data.body?.status == 'success') {
                    this.toastr.success("Bulk Upload Completed Successfully", "Success");
                    this.loading = false;
                } else if (data.body?.status == 'invalid') {
                    const ArrName = Object.values(data.body?.validation_errors);
                    ArrName.forEach((keyValue: any) => { this.inValidArray.push(keyValue[0]) });
                    this.toastr.error("Upload Valid Data File", "Error");
                    this.loading = false;
                } else if (data.body?.status == 'failure') {
                    this.toastr.error("Bulk Upload Failed", "Error");
                    this.loading = false;
                } else {
                    this.toastr.error("Bulk Upload Failed", "Error");
                    this.loading = false;
                }
            }
        }, error => {
            this.toastr.error("Bulk Upload Failed", "Error");
            this.loading = false;
        });
    }

    onClose() {
        this.file = ''
        this.uploadObj = {};
        this.skillExists = false;
        this.inValidArray = [];
        this.responseMsg = undefined;
        this.modalService.dismissAll();
        // this.ENABLE_TECHNICAL_SKILL_APPROVAL = "" ;
        // this.TECHNICAL_SKILL_ID = "" ;
        // this.ENABLE_BEHAVIOURAL_SKILL_APPROVAL = "" ; 
        // this.BEHAVIOURAL_SKILL_ID = "" ;
        // this.VALID_FROM =  "" ;
        // this.VALID_FROM_ID = "" ;
        // this.VALID_TO = "" ;
        // this.VALID_TO_ID = "" ;
    }

    bulkUploadModelFn(bulkUploadModel: any) {
        this.responseMsg = undefined
        this.modalService.open(bulkUploadModel, {
            scrollable: true,
            backdrop: 'static',
            keyboard: true,
            windowClass: 'my_custom_class'
        });
    }

    // onSubmit(techSkillCommentUpdateForm: NgForm) {
    //   this.uploadSubmitted = true;

    //   this.technicalSkillService.updateQualitativeComment().subscribe(data => {
    //     this.toastr.success("Qualitative Comment Update successfully.", "Success");
    //     window.location.reload();
    //   }, error => {
    //     this.toastr.error("Qualitative Comment Not Update .", "Error");
    //   });
    //   this.modalService.dismissAll();

    // }
    searchFn(events: any) {
        this.closeFilter()
        this.userProfileService.getUserById(events).subscribe(data => {
            this.teams.push(data);
            this.totalCount = 1;

        })
    }

    closeFilter() {
        this.selectedDept = '';
        this.selectedSubdept = '';
        this.selectedDomain = '';
        this.selectedSubDomain = '';
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.techDepth = 0;
        this.tempSelectedLevel2 = '';
        this.tempSelectedLevel1 = '';
        this.tempSelectedLevel3 = '';
        this.employeeSkill = [];
        this.level1List = [];
        this.level2List = [];
        this.level3List = [];
        this.subdomainList = [];
        this.domainList = [];
        this.teams = [];
       
    }

    filterTeam() {
        this.submitted = true

        let obj = {
            "dept": this.filterTeamForm.get('dept')?.value || null,
            "subDept": this.filterTeamForm.get('subDept')?.value || null,
            "domain": this.filterTeamForm.get('domain')?.value || null,
            "subdomain": this.filterTeamForm.get('subdomain')?.value || null,
            "level1": this.filterTeamForm.get('level1')?.value || null,
            "level2": this.filterTeamForm.get('level2')?.value || null,
            "level3": this.filterTeamForm.get('level3')?.value || null
        }
        let offset = 0;
        let limit = 10;

        if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3]) || this.cdTeamFilter == 'Team') {
            //this.getTeamMember(obj, this.empId);
            this.teamSkillService.getTeamFilter(obj, this.empId, offset, limit).subscribe(data => {
                this.teams = data.rows;
            });
        } else {
            //this.getAllEmployee(obj);
            this.teamSkillService.getAllEmployeeFilter(obj, offset, limit).subscribe(data => {
                this.teams = data.rows;
            });
        }

    }

    collapseBtn() {
        this.searchTerm = null;
        this.selectedDept = '';
        this.selectedSubdept = '';
        this.selectedDomain = '';
        this.selectedSubDomain = '';
        this.selectedLevel1 = '';
        this.selectedLevel2 = '';
        this.selectedLevel3 = '';
        this.techDepth = 0;
        this.tempSelectedLevel2 = '';
        this.tempSelectedLevel1 = '';
        this.tempSelectedLevel3 = '';
        this.employeeSkill = [];
        this.level1List = [];
        this.level2List = [];
        this.level3List = [];
        this.subdomainList = [];
        this.domainList = [];

        if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.getTeam(this.currentUserId.emp_id, this.offset, this.limit);
            this.getAllFLTeams(this.currentUserId.emp_id);
        } else if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            if (this.cdTeamFilter == 'All') {
                this.getEmployee(this.offset, this.limit);
                this.getAllHRTeams();
            } else {
                this.getTeam(this.currentUserId.emp_id, this.offset, this.limit);
                this.getAllFLTeams(this.currentUserId.emp_id);
            }
        }
    }

    openModelSetting(openContentSetting: any){
          this.getTeamSkillSetting();
          this.modalService.open(openContentSetting, {
            scrollable: true,
            backdrop: 'static',
            keyboard: true,
            windowClass: 'my_custom_class'
        });
    }

    getTeamSkillSetting(){
          this.teamSkillService.getTeamSkillSettingInfo().subscribe({
          next: (data: any) => {
            console.log("getTeamSkillSettingInfo", data);

              this.getTechnicalSkillInfo = {};
              this.getBehaviouralSkillInfo = {};
              this.getValidFromInfo = {};
              this.getValidToInfo = {};

            data["settings"].forEach((setting: any) => {
                console.log("settingsinfo", setting);
                
                if(setting.setting_id == 1){               
                    this.getTechnicalSkillInfo = setting;
                    if(this.getTechnicalSkillInfo.setting_value === 'true'){
                        this.getTechnicalSkillInfo.setting_value = true;
                    } else {
                        this.getTechnicalSkillInfo.setting_value = false;
                    }
                }
                else if(setting.setting_id == 2){
                    this.getBehaviouralSkillInfo = setting;
                    if(this.getBehaviouralSkillInfo.setting_value === 'true'){
                        this.getBehaviouralSkillInfo.setting_value = true;
                    } else {
                        this.getBehaviouralSkillInfo.setting_value = false;
                    }
                }
                else if(setting.setting_id == 3){          
                    this.getValidFromInfo = setting;
                }
               else if( setting.setting_id == 4){                        
                    this.getValidToInfo = setting;
                }
            })
         },
        });
    }


    onSubmitSetting(settingForm :NgForm){

        console.log("SettingFormValue", settingForm.form.value);
        this.addTeamSettingInfo = settingForm.form.value;
        let SettingInfo = [];

        let technicalSkillInfo = {
            ENABLE_TECHNICAL_SKILL_APPROVAL: this.addTeamSettingInfo.ENABLE_TECHNICAL_SKILL_APPROVAL.toString(),
            TECHNICAL_SKILL_ID: this.addTeamSettingInfo.TECHNICAL_SKILL_ID,
        };

        let behaviouralSkillInfo = {
            ENABLE_BEHAVIOURAL_SKILL_APPROVAL: this.addTeamSettingInfo.ENABLE_BEHAVIOURAL_SKILL_APPROVAL.toString(),
            BEHAVIOURAL_SKILL_ID: this.addTeamSettingInfo.BEHAVIOURAL_SKILL_ID,
        }

//         const formatDate = (date: Date) => {
// function pad(s) { return (s
// var d = new Date(date)
// return [pad(d. getMonth()+1), pad(d. getDate()), d. getFullYear()]. join(‘/’)
// console. log(formatDate(new Date()))

        let validFromInfo = {
            VALID_FROM: this.addTeamSettingInfo.VALID_FROM,
            VALID_FROM_ID: this.addTeamSettingInfo.VALID_FROM_ID,
        }

        let validToInfo = {
            VALID_TO: this.addTeamSettingInfo.VALID_TO,
            VALID_TO_ID: this.addTeamSettingInfo.VALID_TO_ID,
        }

        SettingInfo.push(technicalSkillInfo, behaviouralSkillInfo, validFromInfo, validToInfo);

        console.log("SettingInfo", SettingInfo);
        this.teamSkillService.teamSkillSettingInfo(SettingInfo).subscribe({
        next: (data: any) => {
        console.log("addTeamSettingInfo", JSON.stringify(data));
      },
      });

      this.modalService.dismissAll();
      
  }
      
}