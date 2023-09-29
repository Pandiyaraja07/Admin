import { Component, OnInit, ɵConsole } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LogIn } from "angular-feather/icons";
//import { AnyARecord } from 'dns';
//import { ApiHttpService } from '../../core/services/api-http.service'
import { ProjectInfoService } from "src/app/core/services/project-info.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { UserProfileService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { roles } from "../../../environments/roles";
import { PermissionService } from "src/app/core/services/permission.service";
@Component({
  selector: "app-project-info",
  templateUrl: "./project-info.component.html",
  styleUrls: ["./project-info.component.scss"],
})
export class ProjectInfoComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  subscription: any;

  constructor(
    public projectInfoService: ProjectInfoService,
    public userProfileService: UserProfileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private permissionService: PermissionService
  ) {}

  /*contactList: any;
    contact: any;
    employees: any;*/
  appRoles = roles;
  empSgId: any;
  currentUserId: any = {};
  basicInfo: any;
  profileId: any;
  currentUser: any = {};
  userRole: any;
  projectInfo: any = [];
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

  //pagenation variable
  limit: number = 6;
  offset: number = 0;
  page: number = 1;
  totalCount: any;
  approvedStatus: any;
  showTxt: any = "see more";
  readMore: boolean = false;
  flAccess: boolean = false;
  supervisorAccess: boolean = false
  ownProfile: boolean = false;
  employeeRole: boolean = false;
  employeeRoletemp: boolean = false;
  flRole: boolean = false;
  flRoletemp: boolean = false;
  supervisorRole: boolean = false;
  supervisorRoletemp: boolean = false;
  hrRole: boolean = false;
  cdRole: boolean = false;
  FlSupervisorAccess: boolean = true;

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "SGRI" },
      { label: "Study / Project Details", active: true },
    ];

    /*this.apiHttpService.getContacts({}).subscribe(data => {
          this.contactList = data;
        });
    
        let id = 1;
    
        this.apiHttpService.getContact(id).subscribe(data => {
          console.log(data);
          this.contact = data;
        });
    
        this.apiHttpService.getEmployees({}).subscribe(data => {
          this.employees = data;
        });*/
    this.currentUserId = this.authService.currentUser;

    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.currentUser = this.currentUserId.sgId;
      this.empSgId = this.currentUserId.sgId;
      this.userRole = this.appRoles.roles[4];
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      this.currentUserId.role == this.appRoles.roles[1] ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3]) ||
      this.currentUserId.role == this.appRoles.roles[0]
    ) {
      this.subscription = this.route.params.subscribe((param: any) => {
        this.empSgId = param["id"];
        if (param["id"]) {
          this.empSgId = param["id"];
        } else {
          this.empSgId = this.currentUserId.sgId;
        }
        this.profileId = param["id"];
      });

      this.userRole = this.currentUserId.role;
    }
    this.getProfile(this.empSgId);
    this.getProjectInfo(this.empSgId, this.offset, this.limit);

    this.employeePermission();
  }

  projectApproveAction(status: any, projectId: any) {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let objData = {
      approval_date: date,
      approved_fl_id: this.currentUserId.sgId,
      approval_status: status,
    };
    this.projectInfoService
      .updateProjectApprovalStatus(objData, projectId)
      .subscribe((data) => {
        this.approvedStatus = data;
        window.location.reload();
      });
    // this.modalService.dismissAll()
    //window.location.reload();
  }
  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
      if( this.basicInfo.supervisor_emp_id == this.currentUserId.emp_id
        ){
            this.supervisorAccess = true;
        }
        if(this.basicInfo.emp_id == this.currentUserId.emp_id){
            this.ownProfile = true;
        }
        if(this.basicInfo.fl_emp_id == this.currentUserId.emp_id ){
            this.flAccess = true;
        }
        if (this.basicInfo.supervisor_emp_id == this.currentUserId.emp_id && this.basicInfo.fl_emp_id == this.currentUserId.emp_id) {
            this.FlSupervisorAccess = false;
        } 
    });
  }

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    this.getProjectInfo(this.empSgId, this.offset, this.limit);
  }

  getProjectInfo(empSgId: any, offset: number, limit: number) {
    this.projectInfoService
      .getProjectInfo(empSgId, offset, limit)
      .subscribe((data) => {
        this.projectInfo = data.project_info;
        this.totalCount = data.project_info_aggregate.aggregate.count;
        console.log("totalllll", this.projectInfo);

        for (let i = 0; i < this.projectInfo.length; i++) {
          let random = Math.floor(Math.random() * this.colors.length);
          this.bgRandom.push(this.colors[random]);
        }
      });
  }
  /*updateData(id: any) {
      const updateInfo = { "title": "new title", "description": "updated desc", "role": "member", "significance": "local", "start_date": "2022-04-24", "end_date": "2022-03-23" };
      this.apiHttpService.updateProject(id, updateInfo).subscribe(data => {
        console.log(updateInfo);
        console.log(data)
      });
    }
  */
  // deleteData(id: any) {
  //   this.projectInfoService.deleteProject(id).subscribe(data => {
  //     console.log(data)
  //   });
  // }

  deleteData(id: any) {
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
          this.projectInfoService.deleteProject(id).subscribe(
            (data) => {
              this.toastr.success(
                "Study/Project Deleted successfully.",
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
                  .navigate(["/team/profile/project-info"])
                  .then(() => {
                    window.location.reload();
                  });
              }
            },
            (error) => {
              this.toastr.error("Study/Project Not Delete .", "Error");
            }
          );
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Study/Project is safe :)",
            "error"
          );
        }
      });
  }
  employeePermission(){
    this.employeeRole = this.permissionService.isEmployee()
    this.employeeRoletemp = this.permissionService.isEmployee("temp")
    this.flRole = this.permissionService.isFL()
    this.flRoletemp = this.permissionService.isFL("temp")
    this.supervisorRole = this.permissionService.isSupervisor()
    this.supervisorRoletemp = this.permissionService.isSupervisor("temp")
    this.hrRole = this.permissionService.isHR()
    this.cdRole = this.permissionService.isCD()
}
}
