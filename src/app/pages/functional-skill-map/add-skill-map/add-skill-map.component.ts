import { Component, OnInit } from '@angular/core';
import { TechSkillMasterService } from 'src/app/core/services/tech-skill-master.service';
import { TechSkillLevelMasterService } from 'src/app/core/services/tech-skill-levels.service';
import { TargetProficiencyService } from 'src/app/core/services/target-proficiency';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TeamSkillService } from 'src/app/core/services/team-skill.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { roles } from "../../../../environments/roles";


@Component({
    selector: 'app-add-skill-map',
    templateUrl: './add-skill-map.component.html',
    styleUrls: ['./add-skill-map.component.scss'],
    providers: [DatePipe]
})
export class AddSkillMapComponent implements OnInit {
    public Collapsed = false;
    public firstColleaps = false;
    public secondColleaps = false;
    public bothColleaps = false;

    currentUserId: any;
    currentUser: any;
    userRole: any;
    empId: any;
    appRoles = roles;

    getDomain: any;
    getSubDomain: any;
    getDept: any;
    getSubDept: any;
    getLevel1: any;
    getLevel2: any;
    getLevel3: any;
    //getTargetProf: any;
    targetProf: any;
    submitted = false;
    addSkillMapForm!: any;
    dept: any;
    subdept: any;
    domain: any;
    subdomain: any;
    level1: any;
    level2: any;
    level3: any;
    depth: any;
    subscription: any;
    teamSkillEditValue: any = {};
    submitButton: any;
    activeIds: any = [];
    skillText: any = 'Create Skill Map'
    onEdit: any = false

    multiSelectLevel3: any = [];
    selectedMultiLevel: any = [];
    multiSelectLevel2: any = [];

    clicked = false;
    portSubmit: boolean = false;
    constructor(public techSkillMasterService: TechSkillMasterService,
        public formBuilder: FormBuilder,
        private authService: AuthService,
        public techSkillLevelMasterService: TechSkillLevelMasterService,
        public targetProficiencyService: TargetProficiencyService,
        private datePipe: DatePipe,
        public teamSkillService: TeamSkillService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService) { }


    ngOnInit(): void {
        this.submitButton = "Save and Create"
        this.activeIds = ['static-1']
        this.currentUserId = this.authService.currentUser;
        if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3] || this.currentUserId.role == this.appRoles.roles[0])) {
            this.currentUser = this.currentUserId.sgId;
            this.empId = this.currentUserId.emp_id;
            this.userRole = this.currentUserId.role;
            this.getFLDept(this.empId);

        } else if (this.currentUserId.role == this.appRoles.roles[1]) {
            this.currentUser = this.currentUserId.sgId;
            this.userRole = this.currentUserId.role;
            this.getDeptInfo();
        }

        this.subscription = this.route.params.subscribe((param: any) => {
            let teamSkillId = param['id']
            if (teamSkillId) {
                this.getTeamSkillInfo(teamSkillId)
                this.addSkillMapForm = this.formBuilder.group({
                    dept: [""],
                    subdept: [""],
                    domain: [""],
                    subdomain: [""],
                    level1: [""],
                    level2: [],
                    level2Multiple: [],
                    level3: [],
                    depth: [""],
                });
            } else {
                this.addSkillMapForm = this.formBuilder.group({
                    dept: ['', [Validators.required]],
                    subdept: [''],
                    domain: ['', [Validators.required]],
                    subdomain: ['', [Validators.required]],
                    level1: ['', [Validators.required]],
                    level2: [''],
                    level2Multiple: [''],
                    level3: [''],
                    depth: ['', [Validators.required]]
                });
            }

        })
        this.getTargetProficiency();
        //this.getDomainInfo();
    }

    selectedTopics: any = []
    isSelectedLevel(event: any) {
        return this.selectedTopics.indexOf(event) >= 0;
    }

    selectedMultiLevel2: any = []
    isSelectedLevel2(event: any) {
        return this.selectedMultiLevel2.indexOf(event) >= 0;
    }

    onChangeLevel(event: any) {
        var index = this.multiSelectLevel3.indexOf(event);
        if (index === -1) {
            this.multiSelectLevel3.push(event);
        } else {
            this.multiSelectLevel3.splice(index, 1);
        }

        if (this.multiSelectLevel3.length <= 0) {
            this.form.level3.patchValue('');
        }
    }

    onChangeLevel2(event: any) {
        var index = this.multiSelectLevel2.indexOf(event);
        if (index === -1) {
            this.multiSelectLevel2.push(event);
        } else {
            this.multiSelectLevel2.splice(index, 1);
        }

        if (this.multiSelectLevel2.length <= 0) {
            this.form.level2Multiple.patchValue('');
        }
    }

    getTeamSkillInfo(teamSkillId: any) {
        this.submitButton = "Update"
        this.activeIds = ["static-4"]
        this.skillText = 'Update Skill Map'
        this.onEdit = true

        this.teamSkillService.getTeamSkillInfo(teamSkillId).subscribe((data) => {
            this.teamSkillEditValue = data.team_skills_info[0]
            console.log("editttttt", this.teamSkillEditValue);
            this.form.level2.patchValue(this.teamSkillEditValue.tech_skill_level2_id);
            this.form.level3.patchValue(this.teamSkillEditValue.tech_skill_level3_id);
            this.getFlSubdept(this.empId, this.teamSkillEditValue.dept_id);
            //this.isSubdept = true;
            this.getAllDomain()
            this.techSkillMasterService.getTechSubDomainMaster(this.teamSkillEditValue.domain).subscribe(data => {
                this.getSubDomain = data.subdomain_info
            });
            this.techSkillLevelMasterService.getTechSkillLevel(this.teamSkillEditValue.sub_domain, 'level1').subscribe(data => {
                this.getLevel1 = data.tech_skills_info
            });
            this.techSkillLevelMasterService.getTechSkillLevel(this.teamSkillEditValue.sub_domain, 'level2').subscribe(data => {
                this.getLevel2 = data.tech_skills_info
            });
            this.techSkillLevelMasterService.getTechSkillLevel(this.teamSkillEditValue.sub_domain, 'level3').subscribe(data => {
                this.getLevel3 = data.tech_skills_info
                if (this.getLevel3.length > 0) {
                    this.islevel3 = true;
                    this.addSkillMapForm.get('level3').setValidators(Validators.required);
                } else {
                    this.addSkillMapForm.get('level3').clearValidators();
                }
            });
        })
    }

    getTargetProficiency() {
        this.targetProficiencyService.getTargetProficiency().subscribe(data => {
            this.targetProf = data.technical_depth
            console.log('-----------target', data);
        })
    }

    getFLDept(flId: any) {
        this.techSkillMasterService.getFlDept(flId).subscribe(data => {
            this.getDept = data.dept_info
        });
    }

    getDeptInfo() {
        this.techSkillMasterService.getAllDeptMaster({}).subscribe(data => {
            this.getDept = data.dept_info;
            console.log('--------------dept', data);

        });
    }

    // getSubdeptInfo(dept?: any) {
    //     this.techSkillMasterService.getAllSubdeptMaster(dept).subscribe(data => {
    //         this.getSubDept = data.subdept_info;
    //         console.log('----------------sub dept info', data);
    //     });

    // }

    getFlSubdept(flId: any, dept_id: any) {
        this.techSkillMasterService.getFlSubdept(flId, dept_id).subscribe(data => {
            this.getSubDept = data.subdept_info;
            //this.selectedSubdept = data.subdept_info[0].subdept_id;
            if (this.getSubDept.length > 0) {
                this.isSubdept = true;
                //this.domainList ='';
                this.addSkillMapForm.get('subdept').setValidators(Validators.required);
            } else {
                this.addSkillMapForm.get('subdept').clearValidators();
                this.getAllDomain();
            }
        });
        //this.getAllDomain();
    }

    getAllDomain() {
        this.techSkillMasterService.getTechDomainMaster({}).subscribe(data => {
            this.getDomain = data.domain_info
        });
    }
    getDomainInfo(id?: any) {
        this.techSkillMasterService.getTechDomainMasterBySubDept(id).subscribe(data => {
            this.getDomain = data.domain_info
            console.log('----------------domain', data);
        });
    }

    isSubdept: boolean = false;
    selectedDept(id: any, i: any) {
        this.getDomain = [];
        this.subdomain = [];
        this.getDept.forEach((item: any) => {
            if (item.dept_id !== id) {
                item.selected = false;
            } else {
                //this.isSubdept = true;
                item.selected = true;
                this.getFlSubdept(this.empId, id);

                //this.getAllDomain();
                // this.techSkillMasterService.getTechDomainMaster({}).subscribe(data => {
                //     this.getDomain = data.domain_info;
                // })
            }
        })
        this.getLevel1 = [];
        this.getLevel2 = [];
        this.getLevel3 = [];
        this.multiSelectLevel2 = [];
        this.multiSelectLevel3 = [];
        this.form.domain.patchValue('');
        this.form.subdomain.patchValue('');
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.form.level3.patchValue('');
    }

    selectedSubdept(id: any, i: any) {
        this.getSubDept.forEach((item: any) => {
            if (item.subdept_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
                this.getAllDomain();
                //this.getDomainInfo(id);
            }
        })
        this.getDomain = [];
        this.subdomain = [];
        this.getLevel1 = [];
        this.getLevel2 = [];
        this.getLevel3 = [];
        this.multiSelectLevel2 = [];
        this.multiSelectLevel3 = [];
        this.form.domain.patchValue('');
        this.form.subdomain.patchValue('');
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.form.level3.patchValue('');
    }

    selectedDomain(id: any, i: any) {
        this.subdomain = [];
        // this.isSubdept = true;
        this.getDomain.forEach((item: any) => {
            if (item.domain_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
                this.techSkillMasterService.getTechSubDomainMaster(id).subscribe(data => {
                    this.getSubDomain = data.subdomain_info
                });
            }
        })
        this.getLevel1 = [];
        this.getLevel2 = [];
        this.getLevel3 = [];
        this.multiSelectLevel2 = [];
        this.multiSelectLevel3 = [];
        this.form.subdomain.patchValue('');
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.form.level3.patchValue('');
    }

    subDomainId: any;
    selectedSubDomain(id: any, i: any) {
        this.subDomainId = id;
        this.techSkillLevelMasterService.getTechSkillLevel(this.subDomainId, 'level1').subscribe(data => {
            this.getLevel1 = data.tech_skills_info
        });

        this.getSubDomain.forEach((item:any) => {
            if (item.subdomain_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
            }
        })
        this.getLevel1 = [];
        this.getLevel2 = [];
        this.getLevel3 = [];
        this.multiSelectLevel2 = [];
        this.multiSelectLevel3 = [];
        this.form.level1.patchValue('');
        this.form.level2.patchValue('');
        this.form.level3.patchValue('');
    }
    selectedLevel1(id: any, i: any) {
        this.selectedMultiLevel2 = [];
        this.techSkillLevelMasterService.getTechSkillLevel(this.subDomainId, 'level2').subscribe(data => {
            this.getLevel2 = data.tech_skills_info
        });

        this.getLevel1.forEach((item:any) => {
            if (item.tech_skill_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
            }
        })
        this.getAllLevel3();
        this.getLevel2 = [];
        this.getLevel3 = [];
        this.multiSelectLevel2 = [];
        this.multiSelectLevel3 = [];
        this.form.level2Multiple.patchValue('');
        this.form.level2.patchValue('');
        this.form.level3.patchValue('');

    }
    islevel3: boolean = false;
    selectedLevel2(id: any, i: any) {
        this.multiSelectLevel2 = []
        this.islevel3 = false;
        this.getAllLevel3();
        this.getLevel2.forEach((item: any) => {
            if (item.tech_skill_id !== id) {
                item.selected = false;
            } else {
                item.selected = true;
                this.clicked = false;
                this.multiSelectLevel2.push(id)
            }
        })
        this.getLevel3 = [];
        this.form.level3.patchValue('');
    }

    checkValidLevel3: any;
    getAllLevel3() {
        this.techSkillLevelMasterService.getTechSkillLevel(this.subDomainId, 'level3').subscribe(data => {
            this.getLevel3 = data.tech_skills_info
            if (this.getLevel3.length > 0) {
                this.islevel3 = true;
                this.checkValidLevel3 = true;
                this.addSkillMapForm.get('level2').setValidators(Validators.required);
                this.addSkillMapForm.get('level3').setValidators(Validators.required);
                this.addSkillMapForm.get('level2Multiple').clearValidators();
            } else {
                this.checkValidLevel3 = false;
                this.addSkillMapForm.get('level2Multiple').setValidators(Validators.required);
                this.addSkillMapForm.get('level2').clearValidators();
                this.addSkillMapForm.get('level3').clearValidators();
                if (this.addSkillMapForm.get('level2Multiple').value) {
                    this.clicked = false
                } else {
                    this.clicked = true
                }
            }
        });
    }
    selectedLevel3(id: any, i: any) {
        this.getLevel3.forEach((item: any) => {
            if (item.tech_skill_id !== id) {
                item.selected = false;
            } else {
                this.clicked = false;
                item.selected = true;
            }
        })
    }
    targetProficiency(id: any, i: any) {
        this.targetProf.forEach((item: any) => {
            if (item.technical_depth_id !== id) {
                item.selected = false;
            } else {
                this.clicked = false;
                item.selected = true;
            }
        })
    }

    get form() {
        return this.addSkillMapForm.controls;
    }

    addSkillMap() {
        this.submitted = true;
        this.clicked = true;
        if (this.addSkillMapForm.valid) {
            this.portSubmit = true;
            let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
            let obj = {
                "dept_id": this.addSkillMapForm.get('dept')?.value || null,
                "subdept_id": this.addSkillMapForm.get('subdept')?.value || null,
                "domain": this.addSkillMapForm.get('domain')?.value || null,
                "sub_domain": this.addSkillMapForm.get('subdomain')?.value || null,
                "tech_skill_level1_id": this.addSkillMapForm.get('level1')?.value || null,
                "tech_skill_level2_id": this.multiSelectLevel2.length ? this.multiSelectLevel2 : null,
                "tech_skill_level3_id": this.multiSelectLevel3.length ? this.multiSelectLevel3 : null,
                "target_proficiency": this.addSkillMapForm.get('depth')?.value || null,
                "target_proficiency_history": JSON.stringify([{ 'depth': this.addSkillMapForm.get('depth')?.value, 'date': today }]) || null,
                "created_by_nm": this.currentUserId.username
            }
            // if (this.addSkillMapForm.get('level2')?.value == null) {
            //     delete obj.tech_skill_level2_id;
            // }
            // if (this.addSkillMapForm.get('level3')?.value == null) {
            //     delete obj.tech_skill_level3_id;
            // }
            console.log("createeeeeeeee", obj);

            if (this.teamSkillEditValue.team_skill_id) {

                let obj = {
                    "dept_id": this.teamSkillEditValue?.dept_id,
                    "subdept_id": this.teamSkillEditValue?.subdept_id,
                    "domain": this.teamSkillEditValue?.domain,
                    "sub_domain": this.teamSkillEditValue?.sub_domain,
                    "tech_skill_level1_id": this.teamSkillEditValue?.tech_skill_level1_id,
                    "tech_skill_level2_id": this.teamSkillEditValue?.tech_skill_level2_id,
                    "tech_skill_level3_id": this.teamSkillEditValue?.tech_skill_level3_id,
                    "target_proficiency": this.addSkillMapForm.get('depth')?.value || null,
                    "target_proficiency_history": JSON.stringify([{ 'depth': this.addSkillMapForm.get('depth')?.value, 'date': today }]) || null,
                    "created_by_nm": this.currentUserId.username,
                    "updated_by_nm": this.currentUserId.username

                }

                this.teamSkillService.UpdateFunctionalSkillMap(obj, this.teamSkillEditValue.team_skill_id).subscribe(data => {
                    if (data.status !== "Success") {
                        this.toastr.error("Functional SKill Map Already mapped", "Error");
                        this.router.navigate(['/functional-skill-map']);
                    } else {
                        if (data.status) {
                            this.toastr.success("Functional SKill Map Updated successfully.", "Success");
                            this.router.navigate(['/functional-skill-map']);
                        }
                    }
                    this.portSubmit = false;
                    this.teamSkillEditValue = {}
                },
                    error => {
                        this.toastr.error("Functional SKill Map Not updated .", "Error");
                    })
            } else {
                this.teamSkillService.createFunctionalSkillMap(obj).subscribe(data => {
                    console.log('--------------------dataaaaaaaaaaaaaaaaa');

                    // if (data.statusCode && data.statusCode == 409) {
                    //     this.toastr.error("Functional SKill Map Already mapped", "Error");
                    // } else {
                    //     if (data.team_skill_id > 0) {
                    //         this.toastr.success("Functional SKill Map Created successfully.", "Success");
                    //         this.router.navigate(['functional-skill-map']);
                    //     }
                    // }
                    if (data.teamSkillCount[0] > 0) {
                        this.toastr.success(data.added, "Success");
                    }

                    if (data.teamSkillCount[1] > 0) {
                        this.toastr.error(data.notAdded, "Error");
                    }
                    this.router.navigate(['functional-skill-map']);
                    this.portSubmit = false;
                },
                    error => {
                        this.toastr.error("Functional SKill Map Not Created .", "Error");
                        this.portSubmit = false;
                    });
            }
        }
    }
}

