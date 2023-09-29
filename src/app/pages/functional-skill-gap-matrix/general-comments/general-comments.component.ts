import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TeamSkillService } from "src/app/core/services/team-skill.service";
import { AuthService } from "src/app/core/services/auth.service";
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn,
} from "@angular/forms";
import { roles } from "../../../../environments/roles";
@Component({
  selector: "app-general-comments",
  templateUrl: "./general-comments.component.html",
  styleUrls: ["./general-comments.component.scss"],
})
export class GeneralCommentsComponent implements OnInit {
  empSgId: any;
  currentUserId: any = {};
  currentUser: any = {};
  empId: any;
  userRole: any;
  appRoles = roles;
  skillGapMatrixId: any;
  comments: any = {};
  comment: any = {};
  submitted = false;
  updateCommentForm!: FormGroup;
  commentObj: any = {};
  skill_mappings: any = [];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public teamSkillService: TeamSkillService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.skillGapMatrixId = params.skillGapMatrixId;
      console.log(this.skillGapMatrixId);
    });

    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3])
    ) {
      this.empId = this.currentUserId.emp_id;
      this.empSgId = this.currentUserId.sgId;
      this.userRole = this.currentUserId.role;

      this.getTeamTechSkillComment(this.empId);
    } else if (
      this.currentUserId.role == this.appRoles.roles[1] ||
      this.currentUserId.role == this.appRoles.roles[0]
    ) {
      this.currentUser = this.currentUserId.sgId;
      this.userRole = this.currentUserId.role;
      this.getTechSkillComment();
    }
  }

  updateComment(generalCommentForm: NgForm) {
    this.submitted = true;
    let skillArr : any = [];
    if (generalCommentForm.valid) {
      this.comments.skill_mappings.forEach((element: any) => {
        let object = {
          skill_matrix_comment: element.skill_matrix_comment,
          skill_mapping_id: element.skill_mapping_id,
        };
        skillArr.push(object);
      });
      let obj: any = {};
      obj["general_comment_history"] = this.comments.general_comment_history;
      obj["skill_mapping_comments"] = skillArr;
      this.teamSkillService
        .updateComments(obj, this.skillGapMatrixId)
        .subscribe(
          (data) => {
            this.toastr.success(
              "Functional Skill Gap Matrix Comments Updated successfully.",
              "Success"
            );
            this.router.navigate(["/functional-skill-gap-matrix"]);
          },
          (error) => {
            this.toastr.error(
              "Functional Skill Gap Matrix Comments Not Updated .",
              "Error"
            );
          }
        );
    }
  }

  getTechSkillComment() {
    this.teamSkillService
      .getTechSkillComment(this.skillGapMatrixId)
      .subscribe((data) => {
        this.comments = data.team_skills_info[0];
        console.log("-------------------data1", this.skillGapMatrixId);
      });
  }

  getTeamTechSkillComment(flId: any) {
    this.teamSkillService
      .getTeamTechSkillComment(flId, this.skillGapMatrixId)
      .subscribe((data) => {
        this.comments = data.team_skills_info[0];
        console.log(
          "-------------------------diueryuiweryiuweyriuweyr",
          data.team_skills_info[0]
        );
      });
  }

  counter(i: number) {
    return new Array(i);
  }
}
