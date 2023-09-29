import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AdditionalSkillService } from "src/app/core/services/additional-skill.service";
import { AuthService } from "src/app/core/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { UserProfileService } from "src/app/core/services/user.service";
import { environment } from "src/environments/environment";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { roles } from "../../../../environments/roles";
@Component({
  selector: "app-add-additional-skill",
  templateUrl: "./add-additional-skill.component.html",
  styleUrls: ["./add-additional-skill.component.scss"],
})
export class AddAdditionalSkillComponent implements OnInit {
  public files: any = [];
  fileUrl: any = [];
  rootURL = environment.rootUrl +"/";
  additionalSkillObj: any = {};
  subscription!: Subscription;
  skillType: any;
  currentUserId: any;
  empSgId: any;
  appRoles = roles;
  profileId: any;
  basicInfo: any = {};
  forEmpSgId: any;
  additional_skills_id: any;
  button: any;
  ShowsButon: any;
  file: any = [];
  delFile: any = [];
  clicked: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public userProfileService: UserProfileService,
    private authService: AuthService,
    private additionalSkillService: AdditionalSkillService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((param: any) => {
      let keys = Object.keys(param);
      for (let key of keys) {
        if (param["skillType"] && key == "skillType") {
          this.skillType = param["skillType"];
          this.button = "Save and Create";
          this.ShowsButon = "Add";
        } else if (param["id"] && key == "id") {
          this.additional_skills_id = param["id"];
          this.button = "Update";
          this.ShowsButon = "Edit";
          this.getAdditionalSkill(this.additional_skills_id);
        }
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
    }
  }

  getAdditionalSkill(id: any) {
    this.additionalSkillObj = {};
    this.additionalSkillService.getAdditionalSkillId(id).subscribe((res) => {
      for (let row of res.additional_skills_info[0]
        .additional_skill_attachments) {
        this.files.push({
          url: this.rootURL + row.attachment_nm,
          name: row.attachment_nm.split("/")[
            row.attachment_nm.split("/").length - 1
          ],
          file: null,
          detail: row,
        });
      }
      this.additionalSkillObj = res.additional_skills_info[0];
      this.skillType = this.additionalSkillObj.additional_skill_type;
    });
  }

  getProfile(profileId: any) {
    this.userProfileService.getUser(profileId).subscribe((data) => {
      this.basicInfo = data.emp_info[0];
    });
  }

  onCancal() {
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4] ||
      this.currentUserId.role == this.appRoles.roles[1]
    ) {
      this.router.navigate(["/additional-skill/" + this.skillType]);
    } else {
      this.router.navigate(["/team/profile/additional-skill"], {
        queryParams: { id: this.forEmpSgId, skillType: this.skillType },
      });
    }
  }

  onSubmit(additionalSkillForm: NgForm) {
    if (this.additionalSkillObj.additional_skills_id) {
      var obj:any = {};
      if (
        (this.currentUserId.role == this.appRoles.roles[2] &&
          this.currentUserId.tempRole == this.appRoles.roles[2]) ||
        (this.currentUserId.role == this.appRoles.roles[3] &&
          this.currentUserId.tempRole == this.appRoles.roles[3] ||
          this.currentUserId.role == this.appRoles.roles[0])
      ) {
        obj = {
          additional_skill_type: this.additionalSkillObj.additional_skill_type,
          additional_skills_id: this.additionalSkillObj.additional_skills_id,
          description: this.additionalSkillObj.description,
          lead_id: this.empSgId,
          emp_id: this.additionalSkillObj.emp_id,
          approval_status: 0,
          scope: this.additionalSkillObj.scope,
          status: this.additionalSkillObj.status,
          title: this.additionalSkillObj.title,
          updated_by_nm: this.currentUserId.username,
        };
        console.log("----------------logattachment", obj);
      } else {
        obj = {
          additional_skill_type: this.additionalSkillObj.additional_skill_type,
          additional_skills_id: this.additionalSkillObj.additional_skills_id,
          description: this.additionalSkillObj.description,
          emp_id: this.additionalSkillObj.emp_id,
          scope: this.additionalSkillObj.scope,
          approval_status: 0,
          status: this.additionalSkillObj.status,
          title: this.additionalSkillObj.title,
          updated_by_nm: this.currentUserId.username,
        };
      }

      const formData: any = new FormData();

      Object.keys(obj).forEach((key) => {
        formData.append(key, obj[key]);
      });

      formData.append("delfile", this.delFile);

      this.files.forEach((element: any) => {
        if (element?.file) {
          formData.append("file", element?.file);
        }
      });

      this.additionalSkillService
        .UpdateAdditionalSkill(
          this.additionalSkillObj.additional_skills_id,
          formData
        )
        .subscribe(
          (res) => {
            this.toastr.success(
              this.skillType + " Update successfully.",
              "Success"
            );
            if (
              this.currentUserId.role == this.appRoles.roles[4] ||
              this.currentUserId.role == this.appRoles.roles[1]
            ) {
              this.router.navigate(["/additional-skill/" + this.skillType]);
            } else {
              this.router.navigate(["/team/profile/additional-skill"], {
                queryParams: { id: this.forEmpSgId, skillType: this.skillType },
              });
            }
          },
          (error) => {
            this.toastr.error(this.skillType + " Not Update .", "Error");
            this.clicked = false;
          }
        );
    } else {
      console.log("createeeee", this.additionalSkillObj);
      this.additionalSkillObj["created_nm"] = this.currentUserId.username;
      if (
        (this.currentUserId.role == this.appRoles.roles[2] &&
          this.currentUserId.tempRole == this.appRoles.roles[2]) ||
        (this.currentUserId.role == this.appRoles.roles[3] &&
          this.currentUserId.tempRole == this.appRoles.roles[3] ||
          this.currentUserId.role == this.appRoles.roles[0])
      ) {
        this.additionalSkillObj["lead_id"] = this.currentUserId.sgId;
        this.additionalSkillObj["emp_id"] = this.forEmpSgId;
      } else {
        this.additionalSkillObj["emp_id"] = this.currentUserId.sgId;
      }
      this.additionalSkillObj["additional_skill_type"] = this.skillType;

      const formData: any = new FormData();

      Object.keys(this.additionalSkillObj).forEach((key) =>
        formData.append(key, this.additionalSkillObj[key])
      );

      this.files.forEach((element: any) => {
        if (element?.file) {
          formData.append("file", element?.file);
        }
      });

      this.additionalSkillService.createAdditionalSkill(formData).subscribe(
        (res) => {
          this.toastr.success(
            this.skillType + " Created successfully.",
            "Success"
          );
          if (
            this.currentUserId.role == this.appRoles.roles[4] ||
            this.currentUserId.tempRole == this.appRoles.roles[4] ||
            this.currentUserId.role == this.appRoles.roles[1]
          ) {
            this.router
              .navigate(["/additional-skill/" + this.skillType])
              .then(() => {
                window.location.reload();
              });
          } else {
            this.router
              .navigate(["/team/profile/additional-skill"], {
                queryParams: { id: this.forEmpSgId, skillType: this.skillType },
              })
              .then(() => {
                window.location.reload();
              });
          }
        },
        (error) => {
          this.toastr.error(this.skillType + " Not Create.", "Error");
          this.clicked = false;
        }
      );
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    // this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var reg = /(.*?)\.(jpg|jpeg|png|xlsx|xls|pdf|docx|docs)$/;
          if (file.name.match(reg) && file.size < 5242880) {
            if (file.name.length <= 100) {
              let reader = new FileReader();
              reader.onload = (e: any) => {
                this.files.push({
                  url: e.target.result,
                  name: file.name,
                  file: file,
                });
              };
              reader.readAsDataURL(file);
            } else {
              this.toastr.error("File name is Too large", "Error");
            }
          } else {
            this.toastr.error(
              "Allowed Formats (.pdf, .xlsx, .doc, .png, .jpg) and fileSize (max.5MB)",
              "Error"
            );
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  openNewTab(obj: any) {
    var image = new Image();
    image.src = obj.url;
    var w = window.open("");
    w?.document.write(image.outerHTML);
  }

  delelteImg(index: any) {
    if (this.files[index]?.detail) {
      this.delFile.push(this.files[index]?.detail?.attachment_id);
    }

    this.files.splice(index, 1);
  }
}
