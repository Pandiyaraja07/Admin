import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ɵɵtrustConstantResourceUrl,
} from "@angular/core";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { roles } from "../../../../environments/roles";

import { TechSkillMasterService } from "src/app/core/services/tech-skill-master.service";
import { TechSkillLevelMasterService } from "src/app/core/services/tech-skill-levels.service";
import { ProjectInfoService } from "src/app/core/services/project-info.service";
import { UserProfileService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { alertData } from "./data";
import { AlertColor } from "./data.model";
import { ToastrService } from "ngx-toastr";
import { LogIn } from "angular-feather/icons";
// import { map } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.scss"],
})
export class AddProjectComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  alertData: AlertColor[] = [];
  @Input() fromDate: Date | null = null;
  @Input() toDate: Date | null = null;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  date1 = new Date(new Date().setDate(new Date().getDate() + 2));
  date2 = new Date(new Date().setDate(new Date().getDate() + 4));

  submitted = false;

  addProjectForm!: FormGroup;
  skillLevel1: any = [];
  appRoles = roles;
  skillLevel: any = [];
  UpdateArr: any = [];
  level: any = [];
  projectObj: any = {};
  techDomain: any = [];
  techSubDomain: any = [];
  techLevel1: any = [];
  techLevel2: any = [];
  techLevel3: any = [];
  selectedDomain: any;
  selectedSubDomain: any;
  level1: any = [];
  level2: any = [];
  level3: any = [];
  selectedTopics1: any = [];
  selectedTopics2: any = [];
  selectedTopics3: any = [];
  tempselectedTopics1: any = [];
  tempselectedTopics2: any = [];
  tempselectedTopics3: any = [];
  currentUserId: any;
  empSgId: any;
  forEmpSgId: any;
  basicInfo: any = {};
  profileId: any;
  levels: any;
  updateLevel1: any = [];
  updateLevel2: any = [];
  updateLevel3: any = [];

  disabledDate = [this.date1, this.date2];
  button: any;
  editOrAddButton: any;
  subscription: any;
  islevel1: boolean = false;
  islevel2: boolean = false;
  islevel3: boolean = false;
  checkRadioObj: any = {};
  isDisableButton: boolean = false;
  // isDropdownDisabled: boolean = false;


  selectedSkills: any;
  searchSkills: any = [];
  isLevel1length: boolean = false;
  isLevel2length: boolean = false;
  constructor(
    private modalService: NgbModal,
    public userProfileService: UserProfileService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public techSkillMasterService: TechSkillMasterService,
    public techSkillLevelMasterService: TechSkillLevelMasterService,
    public projectInfoService: ProjectInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((param: any) => {
      this.profileId = param["id"];
      let keys = Object.keys(param);
      if (!param["id"]) {
        this.button = "Save and Create";
        this.editOrAddButton = "Add";
      } else {
        this.getSingleProject(param["id"]);
        this.button = "Update";
        this.editOrAddButton = "Edit";
      }
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams.empId) {
        this.forEmpSgId = queryParams.empId;
        if (queryParams.empId) {
          this.getProfile(queryParams.empId);
        }
      }
    });
    //this.getProfile(this.profileId);
    this.breadCrumbItems = [
      { label: "SGRI" },
      { label: "Add Study / Project Details", active: true },
    ];

    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.empSgId = this.currentUserId.sgId;
      this.basicInfo.emp_nm = this.currentUserId.username;
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3] ||
        this.currentUserId.role == this.appRoles.roles[0])
    ) {
      this.empSgId = this.currentUserId.sgId;

      //this.profileId = this.authService.currentUser;
      //this.getProfile(this.profileId);
      // console.log('-----------------------profiiileeeeeeeeee', this.profileId);
    }

    this._fetchData();
    this.getTechDomainMaster();

    this.addProjectForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      role: ["", [Validators.required]],
      significance: ["", [Validators.required]],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      description: ["", [Validators.required]],
      domain: [""],
      subdomain: [""],
      levels: [""],
      level1: new FormArray([]),
      level2: new FormArray([]),
      level3: new FormArray([]),
    });

    this.techSkillLevelMasterService
      .getTechSkillLevelByLevel()
      .subscribe((data) => {
        this.searchSkills = _.sortBy(data.tech_skills_info, "skill_nm");
        for(let each of this.searchSkills){
          if(each.levels == 'level1'){
            each['Levels'] = 'L1';
          }
          else if(each.levels == 'level2'){
            each['Levels'] = 'L2';
          }
          else if (each.levels == 'level3'){
            each['Levels'] = 'L3';
          }
        }
        console.log(">>>>>>>>>>>", this.searchSkills);
        
      });

    // this.searchSkills = this.techSkillLevelMasterService.getTechSkillLevelByLevel()
    // 						.pipe(map(res => {
    // 							return _.sortBy(res.tech_skills_info, 'skill_nm');
    // 						}));
  }

  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
    });
  }

  onSkillChange($event:any) {
    if ($event.levels == "level1") {
      this.onChangeLevel1($event, null);
    } else if ($event.levels == "level2") {
      this.onChangeLevel2($event, null);
    } else if ($event.levels == "level3") {
      this.onChangeLevel3($event, null);
    }
  }

  onSkillAdd($event:any) {
    this.onSkillChange($event);
    this.projectObj.domain = {};
    this.projectObj.subdomain = {};
    this.techSubDomain = [];
    this.techLevel1 = [];
    this.techLevel2 = [];
    this.techLevel3 = [];
    this.selectedSkills = [];
    this.tempselectedTopics1 = [];
    this.tempselectedTopics2 = [];
    this.tempselectedTopics3 = [];
    this.isLevel1length = false;
    this.isLevel2length = false;
    this.isLevel3length = false;
  }

  onSkillRemove($event:any) {
    this.onSkillChange($event);
  }

  private _fetchData() {
    this.alertData = alertData;
  }

  close(alert: AlertColor, alertData: AlertColor[]) {
    alertData.splice(alertData.indexOf(alert), 1);
  }

  get form() {
    return this.addProjectForm.controls;
  }

  minDate: any;
  onSelectedStart(event:any) {
    this.minDate = event.target.value;
    this.form.end_date.patchValue("");
  }

  getTechDomainMaster() {
    this.techSkillMasterService.getTechDomainMaster({}).subscribe((data) => {
      this.techDomain = data.domain_info;
    });
  }

  getSelectedDomain(event:any) {
    if (event) {
      this.techSkillMasterService
        .getTechSubDomainMaster(event)
        .subscribe((data) => {
          this.techSubDomain = data.subdomain_info;
          this.isDisableButton = true;
          this.projectObj.subdomain = '';
          
        });
    } else {
      this.isDisableButton = false;
      this.form.subdomain.patchValue("");
      this.techSubDomain = [];
      this.techLevel1 = [];
      this.techLevel2 = [];
      this.techLevel3 = [];
      this.tempselectedTopics1 = [];
      this.tempselectedTopics2 = [];
      this.tempselectedTopics3 = [];
      this.isLevel1length = false;
      this.isLevel2length = false;
      this.isLevel3length = false;
    }
  }


// getSelectedDomain(event: any) {
//     if (event.length > 0) {
//       this.techSkillMasterService
//         .getTechSubDomainMaster(event)
//         .subscribe((data) => {
//           this.techSubDomain = data.subdomain_info;
//           this.isDisableButton = true;
//         });
//     } else {
//       this.isDisableButton = false;
//       this.form.subdomain.patchValue("");
//       this.techSubDomain = [];
//       this.techLevel1 = [];
//       this.techLevel2 = [];
//       this.techLevel3 = [];
//       this.tempselectedTopics1 = [];
//       this.tempselectedTopics2 = [];
//       this.tempselectedTopics3 = [];
//       this.isLevel1length = false;
//       this.isLevel2length = false;
//       this.isLevel3length = false;
//     }
//   }

  isLevel3length: boolean = false;

  getSelectedSubDomain(event:any) {
    this.isLevel1length = true;
    this.isLevel2length = true;
    if (event) {
      this.isDisableButton = true;
      this.techSkillLevelMasterService
        .getTechSkillLevel(event, "level2")
        .subscribe((data) => {
          let templevel2 = data.tech_skills_info;
          this.techSkillLevelMasterService
            .getTechSkillLevel(event, "level3")
            .subscribe((data) => {
              let templevel3 = data.tech_skills_info;
              if (templevel3.length > 0) {
                this.isLevel3length = true;
              } else if (templevel2.length > 0) {
                this.isLevel3length = false;
              }
            });
        });
    } else {
      this.isDisableButton = false;
      this.techLevel1 = [];
      this.techLevel2 = [];
      this.techLevel3 = [];
      this.tempselectedTopics1 = [];
      this.tempselectedTopics2 = [];
      this.tempselectedTopics3 = [];
    }
  }

  onSelectlevel1() {
    if (this.tempselectedTopics1.length <= 0) {
      this.techSkillLevelMasterService
        .getTechSkillLevel(this.projectObj.subdomain[0], "level1")
        .subscribe((data) => {
          this.techLevel1 = data.tech_skills_info;
        });
      this.islevel1 = true;
      this.islevel3 = false;
      this.islevel2 = false;
    } else {
      this.islevel1 = true;
      this.islevel3 = false;
      this.islevel2 = false;
    }
  }

  onSelectlevel2() {
    if (this.tempselectedTopics2.length <= 0) {
      this.techSkillLevelMasterService
        .getTechSkillLevel(this.projectObj.subdomain[0], "level2")
        .subscribe((data) => {
          this.techLevel2 = data.tech_skills_info;
          this.islevel2 = true;
          this.islevel3 = false;
          this.islevel1 = false;
        });
    } else {
      this.islevel2 = true;
      this.islevel3 = false;
      this.islevel1 = false;
    }
  }

  onSelectlevel3() {
    if (this.tempselectedTopics3.length <= 0) {
      this.techSkillLevelMasterService
        .getTechSkillLevel(this.projectObj.subdomain[0], "level3")
        .subscribe((data) => {
          this.techLevel3 = data.tech_skills_info;
          this.islevel3 = true;
          this.islevel1 = false;
          this.islevel2 = false;
        });
    } else {
      this.islevel3 = true;
      this.islevel1 = false;
      this.islevel2 = false;
    }
  }

  isSelectedLevel1(event:any) {
    return this.selectedTopics1.indexOf(event) >= 0;
  }

  isSelectedLevel2(event:any) {
    return this.selectedTopics2.indexOf(event) >= 0;
  }

  isSelectedLevel3(event:any) {
    return this.selectedTopics3.indexOf(event) >= 0;
  }

  onChangeLevel1(event:any, $event:any) {
    if (this.profileId) {
      let sameData = _.findIndex(this.updateLevel1, (topic1:any) => {
        return topic1.skill_id == event.tech_skill_id;
      });
      if (sameData != -1) {
        this.toastr.warning(
          "level1 " + event.skill_nm + " already Added",
          "Warning"
        );
      } else {
        this.level1SelectedData(event, $event);
      }
    } else {
      this.level1SelectedData(event, $event);
    }
  }

  level1SelectedData(event:any, $event:any) {
    let index = _.findIndex(this.selectedTopics1, (topic:any) => {
      return topic.tech_skill_id == event.tech_skill_id;
    });

    if (index == -1) {
      this.selectedTopics1.push(event);
      this.level1.push(event.tech_skill_id);
      this.tempselectedTopics1.push(event);
    } else if ($event?.target.checked === false) {
      this.selectedTopics1.splice(index, 1);
    }
  }

  onChangeLevel2(event:any, $event:any) {
    if (this.profileId) {
      let sameData = _.findIndex(this.updateLevel2, (topic2:any) => {
        return topic2.skill_id == event.tech_skill_id;
      });
      if (sameData != -1) {
        this.toastr.warning(
          "level2 " + event.skill_nm + " already Added",
          "Warning"
        );
      } else {
        this.level2SelectedData(event, $event);
      }
    } else {
      this.level2SelectedData(event, $event);
    }
  }

  level2SelectedData(event:any, $event:any) {
    let index = _.findIndex(this.selectedTopics2, (topic:any) => {
      return topic.tech_skill_id == event.tech_skill_id;
    });
    if (index == -1) {
      this.selectedTopics2.push(event);
      this.level2.push(event.tech_skill_id);
      this.tempselectedTopics2.push(event);
    } else if ($event?.target.checked === false) {
      this.selectedTopics2.splice(index, 1);
    }
  }

  onChangeLevel3(event:any, $event:any) {
    if (this.profileId) {
      let sameData = _.findIndex(this.updateLevel3, (topic3:any) => {
        return topic3.skill_id == event.tech_skill_id;
      });
      if (sameData != -1) {
        this.toastr.warning(
          "level3 " + event.skill_nm + " already Added",
          "Warning"
        );
      } else {
        this.level3SelectedData(event, $event);
      }
    } else {
      this.level3SelectedData(event, $event);
    }
  }

  level3SelectedData(event:any, $event:any) {
    let index = _.findIndex(this.selectedTopics3, (topic:any) => {
      return topic.tech_skill_id == event.tech_skill_id;
    });
    if (index == -1) {
      this.selectedTopics3.push(event);
      this.level3.push(event.tech_skill_id);
      this.tempselectedTopics3.push(event);
    } else if ($event?.target.checked === false) {
      this.selectedTopics3.splice(index, 1);
    }
  }
  selectedClose1(i:any) {
    // doing this way for binding to reflect
    this.selectedSkills = this.selectedSkills?.filter(
      (tech_skill_id:any) =>
        tech_skill_id !== this.selectedTopics1[i]?.tech_skill_id
    );
    this.selectedTopics1.splice(i, 1);
    this.level1.splice(i, 1);
  }

  selectedClose2(i:any) {
    this.selectedSkills = this.selectedSkills?.filter(
      (tech_skill_id:any) =>
        tech_skill_id !== this.selectedTopics2[i]?.tech_skill_id
    );
    this.selectedTopics2.splice(i, 1);
    this.level2.splice(i, 1);
  }

  selectedClose3(i:any) {
    this.selectedSkills = this.selectedSkills?.filter(
      (tech_skill_id:any) =>
        tech_skill_id !== this.selectedTopics3[i]?.tech_skill_id
    );
    this.selectedTopics3.splice(i, 1);
    this.level3.splice(i, 1);
  }

  getSingleProject(id:any) {
    this.projectObj = [];
    this.projectInfoService.getProjectByPK(id).subscribe((data) => {
      this.projectObj = data;
      this.projectObj.project_skills.forEach((item:any) => {
        if (item.levels == "level1") {
          this.updateLevel1.push(item);
        }
        if (item.levels == "level2") {
          this.updateLevel2.push(item);
        }
        if (item.levels == "level3") {
          this.updateLevel3.push(item);
        }
      });
      console.log("level1update", this.updateLevel1);
      console.log("level2update", this.updateLevel2);
      console.log("level3update", this.updateLevel3);
    });
  }
  removed: any = [];
  UpdateselectedClose1(skill_id: any, i: any) {
    this.removed.push(skill_id);
    this.updateLevel1.splice(i, 1);
  }

  UpdateselectedClose2(skill_id: any, i: any) {
    this.removed.push(skill_id);
    this.updateLevel2.splice(i, 1);
  }

  UpdateselectedClose3(skill_id: any, i: any) {
    this.removed.push(skill_id);
    this.updateLevel3.splice(i, 1);
  }

  onCancel() {
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4] ||
      this.currentUserId.role == this.appRoles.roles[1]
    ) {
      this.router.navigate(["/project-info"]).then(() => {
        window.location.reload();
      });
    } else {
      this.router
        .navigate(["/team/profile/project-info/" + this.forEmpSgId])
        .then(() => {
          window.location.reload();
        });
    }
  }

  addProject() {
    this.submitted = true;
    if (this.addProjectForm.valid) {
      let obj:any = {
        title: this.addProjectForm.get("title")?.value,
        role: this.addProjectForm.get("role")?.value,
        significance: this.addProjectForm.get("significance")?.value,
        start_date: new Date(
          this.addProjectForm.get("start_date")?.value
        ).toLocaleDateString("sv-SE"),
        end_date: new Date(
          this.addProjectForm.get("end_date")?.value
        ).toLocaleDateString("sv-SE"),
        description: this.addProjectForm.get("description")?.value,
        emp_id: this.empSgId,
        approval_status: 0,
      };
      let level:any= [];
      if (
        this.level1.length > 0 ||
        this.level2.length > 0 ||
        this.level3.length > 0
      ) {
        let objs = {
          level1: this.level1,
          level2: this.level2,
          level3: this.level3,
        };
        level.push(objs);
        obj["level"] = level;
      } else {
        obj["level"] = level;
      }
      if (
        (this.currentUserId.role == this.appRoles.roles[2] &&
          this.currentUserId.tempRole == this.appRoles.roles[2]) ||
        (this.currentUserId.role == this.appRoles.roles[3] &&
          this.currentUserId.tempRole == this.appRoles.roles[3]) || 
          (this.currentUserId.role == this.appRoles.roles[0])
      ) {
        obj["emp_id"] = this.forEmpSgId;
      }

      if (this.projectObj.project_id) {
        obj["removed"] = this.removed;
        obj["project_id"] = this.projectObj.project_id;
        console.log("update---------------- ", obj);
        this.projectInfoService
          .updateProjectInfo(this.projectObj.project_id, obj)
          .subscribe(
           { next:(data) => {
            this.toastr.success(
              "Study/Project Updated successfully.",
              "Success"
            );
            if (
              this.currentUserId.role == this.appRoles.roles[4] ||
              this.currentUserId.role == this.appRoles.roles[1]
            ) {
              this.router.navigate(["/project-info"]).then(() => {
                window.location.reload();
              });
            } else {
              this.router
                .navigate(["/team/profile/project-info/" + this.forEmpSgId])
                .then(() => {
                  window.location.reload();
                });
            }
          },

        error:(error:any) => {
          this.toastr.error("Study/Project Not Update .", "Error");
        }
      })
      } else {
        console.log("create", obj);
        this.projectInfoService.createProjectInfo(obj).subscribe({next :(data) => {
          this.toastr.success("Study/Project Created successfully.", "Success");
          if (
            this.currentUserId.role == this.appRoles.roles[4] ||
            this.currentUserId.tempRole == this.appRoles.roles[4] ||
            this.currentUserId.role == this.appRoles.roles[1]
          ) {
            this.router.navigate(["/project-info"]).then(() => {
              window.location.reload();
            });
          } else {
            this.router
              .navigate(["/team/profile/project-info/" + this.forEmpSgId])
              .then(() => {
                window.location.reload();
              });
          }
        }
        });
        error:(error:any) => {
          this.toastr.error("Study/Project Not Create .", "Error");
        };
      }
    }
  }
}
