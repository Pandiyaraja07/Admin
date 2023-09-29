import { Component, OnInit } from "@angular/core";
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
import { JobChatService } from "src/app/core/services/job-chat.service";
import { ToastrService } from "ngx-toastr";
// import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Router } from "@angular/router";
import { jobChat } from "../job-chat";
import { ThirdPartyDraggable } from "@fullcalendar/interaction";
import Swal from "sweetalert2";
import { UserProfileService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { roles } from "../../../../environments/roles";
@Component({
  selector: "app-add-job-chat",
  templateUrl: "./add-job-chat.component.html",
  styleUrls: ["./add-job-chat.component.scss"],
})
export class AddJobChatComponent implements OnInit {
  submitted = false;
  jobChatObj: any = {};
  addJobChatInfo: any = [];
  career_plan_infos: any = [];
  appRoles = roles;
  career_plan_infos1: any = [];
  jobChatFinalObj: any = {};
  currentUserId: any;
  empSgId: any;
  profileId: any;
  basicInfo: any = {};
  submitted1: any;
  subscription: any;
  skillType: any;
  button: any;
  isOthers: boolean = false;
  delIndex: any;
  update_id: any;
  Company = ["SGRI", "SG India", "SG World Wide", "Others"];
  editOrAddButton: any;
  objj: any = {};
  unit: any = {};
  unitArray: any = [];
  Business: any = [];
  Location: any = [];
  values: any;
  CategoryList: any;
  Category: any;
  aspired_roleObjs: any = {};
  jobChatObjs: any = {};
  unitObjs: any = {};

  showTxt: any = "see more";
  readMore: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private jobChatService: JobChatService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((param: any) => {
      let keys = Object.keys(param);
      if (!param["id"]) {
        this.button = "Save and Create";
        this.editOrAddButton = "Add";
      } else {
        this.getSingleJobChat(param["id"]);
        this.update_id = param["id"];
        this.button = "Update";
        this.editOrAddButton = "Edit";
      }
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams.empId) {
        this.profileId = queryParams.empId;
        if (queryParams.empId) {
          this.getProfile(queryParams.empId);
        }
      }
    });

    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.empSgId = this.currentUserId.sgId;
      this.basicInfo.emp_nm = this.currentUserId.username;
    } else {
      this.empSgId = this.currentUserId.sgId;
    }
  }

  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
    });
  }

  onChangeCompany(event : any) {
    this.isOthers = false;
    this.CategoryList = [];
    this.Category = [];
    this.unit = {};
    this.unitArray = [];
    this.unitObjs = {};
    delete this.aspired_roleObjs["category"];
    if (event != "Others") {
      Object.keys(jobChat).map((key) => {
        if (key == event) {
          this.CategoryList = Object.keys(jobChat[key]).map((value) => {
            console.log("companyyyyy", jobChat[key].category);
            return jobChat[key].category;
          });
        }
      });
      this.Category = Object.keys(this.CategoryList[0]).map((key) => {
        return key;
      });
    } else {
      this.isOthers = true;
    }
  }

  onChangeCategory(event:any) {
    this.isOthers = false;
    this.objj = {};
    this.unit = {};
    this.unitArray = [];
    this.unitObjs = {};
    delete this.aspired_roleObjs.location;
    if (
      event != "Support Teams" &&
      event != "Sales & Marketing" &&
      event != "Others" &&
      event != "category" &&
      event != "Manufacturing/Operations" &&
      event != "SG India"
    ) {
      this.obj = this.CategoryList[0];
      Object.keys(this.CategoryList[0]).map((key) => {
        if (key == event) {
          this.unit = this.obj[key][0];
        }
      });
      if (this.unit != "Open Text") {
        Object.keys(this.unit).map((key) => {
          this.unit[key].forEach((element : any) => {
            this.unitArray.push(element);
          });
        });
      } else {
        this.isOthers = true;
      }
    } else if (
      event == "Manufacturing/Operations" &&
      this.aspired_roleObjs.company == "SG India"
    ) {
      this.Business = [];
      this.obj = this.CategoryList[0];
      Object.keys(this.CategoryList[0]).map((key) => {
        if (key == event) {
          this.unit = this.obj[key][0];
        }
      });

      Object.keys(this.unit.Business[0]).map((key) => {
        this.Business.push(key);
      });
      console.log("Category list=====>", this.Business);
    } else {
      console.log("Category list=====>else", event);
      this.isOthers = true;
    }
  }

  onChangeBusiness(event:any) {
    delete this.aspired_roleObjs.location;
    Object.keys(this.unit.Business[0]).map((key) => {
      if (event == key) {
        this.Location = this.unit.Business[0][key].Location;
      }
    });
  }

  AspiredRoleClose() {
    this.modalService.dismissAll();
    this.unitObjs = {};
    this.aspired_roleObjs = {};
    this.jobChatObjs = {};
  }

  modelRef: any;
  strongAreaModelFn(strongAreaModel1: any) {
    this.jobChatObjs = {};
    this.unitObjs = {};
    this.aspired_roleObjs = {};
    this.modelRef = this.modalService.open(strongAreaModel1, {
      scrollable: true,
      ariaLabelledBy: "job-chart",
      backdrop: "static",
      keyboard: true,
      windowClass: "my_custom_class",
    });
  }

  getSingleJobChat(id: any) {
    this.career_plan_infos = [];
    this.jobChatFinalObj = {};
    this.jobChatService.getSingleJobChat(id).subscribe((res) => {
      this.jobChatFinalObj = res.job_chat[0];
      this.career_plan_infos = this.jobChatFinalObj.career_plan_infos;
      delete this.jobChatFinalObj.career_plan_infos;
      for (let i = 0; i < this.career_plan_infos.length; i++) {
        this.career_plan_infos[i].aspired_role = JSON.parse(
          this.career_plan_infos[i].aspired_role
        );
      }
      this.jobChatFinalObj["career_plan_infos"] = this.career_plan_infos;
    });
  }

  index: any;
  addJobChats(JobChatForm: NgForm) {
    this.unitObjs["name"] = "Business";
    this.aspired_roleObjs["unit"] = this.unitObjs;
    this.jobChatObjs["aspired_role"] = this.aspired_roleObjs;
    // if(this.jobChatObjs.comments_nm.length>450){
    //      return;
    // }

    if (this.index >= 0) {
      this.career_plan_infos[this.index] = this.jobChatObjs;
      this.index = -1;
    } else {
      this.career_plan_infos.push(this.jobChatObjs);
    }

    this.modelRef = this.modalService.dismissAll();
  }

  editCareer(i: number, strongAreaModel1: any) {
    this.index = i;
    this.modalService.open(strongAreaModel1, {
      scrollable: true,
      ariaLabelledBy: "job-chart",
      backdrop: "static",
      keyboard: true,
      windowClass: "my_custom_class",
    });

    let id = this.jobChatFinalObj.career_plan_infos[i].career_plan_id;
    this.jobChatService.getCareerPlanId(id).subscribe((data) => {
      this.jobChatObjs = data;
      this.aspired_roleObjs = JSON.parse(data.aspired_role);
      this.unitObjs = this.aspired_roleObjs.unit;
    });
  }

  onBack() {
    this.router.navigate(["/job-chat"]);
  }

  onCancel() {
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4] ||
      this.currentUserId.role == this.appRoles.roles[1]
    ) {
      this.router.navigate(["/job-chat"]).then(() => {
        window.location.reload();
      });
    } else {
      this.router
        .navigate(["/team/profile/job-chat/" + this.profileId])
        .then(() => {
          window.location.reload();
        });
    }
  }

  obj: any = {};
  onSubmit(JobChatFinalForm: NgForm) {
    this.obj = {};
    this.submitted = true;
    if (this.career_plan_infos.length == 0) {
      this.toastr.error(
        "JOb-Chat Career Milestones Select Minimum One .",
        "Error"
      );
      return;
    }
    this.obj = {
      emp_id: this.empSgId,
      job_chat: this.career_plan_infos,
      aspiration_stmt: this.jobChatFinalObj.aspiration_stmt,
      path_preference: this.jobChatFinalObj.path_preference,
      approval_status: 0,
    };
    if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3] ||
        this.currentUserId.role == this.appRoles.roles[0])
    ) {
      this.obj["emp_id"] = this.profileId;
    }
    if (this.jobChatFinalObj.job_chat_id) {
      let career_obj : any = {};
      let jobArray : any = [];
      this.obj.job_chat.forEach((data : any) => {
        career_obj = {};
        career_obj["aspired_role"] = JSON.stringify(data.aspired_role);
        career_obj["time_frame"] = data.time_frame;
        career_obj["comments_nm"] = data.comments_nm;
        career_obj["career_plan_id"] = data.career_plan_id || null;
        jobArray.push(career_obj);
      });
      this.obj["updated_by_nm"] = this.currentUserId.username;
      delete this.obj.job_chat;
      this.obj["job_chat"] = jobArray;
      console.log("updateeeeee", this.obj);
      this.jobChatService
        .updateJobChat(this.jobChatFinalObj.job_chat_id, this.obj)
        .subscribe(
          (result) => {
            this.toastr.success("JOb-Chat Updated successfully.", "Success");
            if (
              this.currentUserId.role == this.appRoles.roles[4] ||
              this.currentUserId.tempRole == this.appRoles.roles[4] ||
              this.currentUserId.role == this.appRoles.roles[1]
            ) {
              this.router.navigate(["/job-chat"]).then(() => {
                window.location.reload();
              });
            } else {
              this.router
                .navigate(["/team/profile/job-chat/" + this.profileId])
                .then(() => {
                  window.location.reload();
                });
            }
          },
          (error) => {
            this.toastr.error("JOb-Chat Not Update .", "Error");
          }
        );
    } else {
      this.obj["created_by_nm"] = this.currentUserId.username;
      console.log("createeeee", this.obj);
      this.jobChatService.createJobChat(this.obj).subscribe(
        (res) => {
          this.toastr.success("JOb-Chat Created successfully.", "Success");
          if (
            this.currentUserId.role == this.appRoles.roles[4] ||
            this.currentUserId.tempRole == this.appRoles.roles[4] ||
            this.currentUserId.role == this.appRoles.roles[1]
          ) {
            this.router.navigate(["/job-chat"]).then(() => {
              window.location.reload();
            });
          } else {
            this.router
              .navigate(["/team/profile/job-chat/" + this.profileId])
              .then(() => {
                window.location.reload();
              });
          }
        },
        (error) => {
          this.toastr.error("JOb-Chat Not Create .", "Error");
        }
      );
    }
  }

  openDeleteModal(i : any) {
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
        if (
          result.value &&
          this.career_plan_infos[i].career_plan_id == undefined
        ) {
          this.career_plan_infos.splice(i, 1);
          this.toastr.success(
            "JOb-Chat Career Milestones Deleted successfully.",
            "Success"
          );
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.value) {
          this.jobChatService
            .deleteCareerPlan(this.career_plan_infos[i].career_plan_id)
            .subscribe(
              (data) => {
                this.career_plan_infos.splice(i, 1);
                this.toastr.success(
                  "JOb-Chat Career Milestones Deleted successfully.",
                  "Success"
                );
              },
              (error) => {
                this.toastr.error(
                  "JOb-Chat Career Milestones Not Delete .",
                  "Error"
                );
              }
            );
          this.jobChatObj = {};
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
            "Your Career Milestone is safe :)",
            "error"
          );
        }
      });
  }

  test(cc:any) {
    console.log(cc);
  }
}
