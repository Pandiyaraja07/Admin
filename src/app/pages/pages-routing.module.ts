import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Employee routes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TechnicalSkillComponent } from "./technical-skill/technical-skill.component";
import { BehaviorSkillComponent } from "./behavior-skill/behavior-skill.component";
import { StrengthImprovementComponent } from "./strength-improvement/strength-improvement.component";
import { ProjectInfoComponent } from "./emp-project-info/project-info.component";
import { AdditionalSkillComponent } from "./additional-skill/additional-skill.component";
import { AddProjectComponent } from "./emp-project-info/add-project/add-project.component";
import { AddAdditionalSkillComponent } from "./additional-skill/add-additional-skill/add-additional-skill.component";
import { JobChatComponent } from "./job-chat/job-chat.component";

//FL routes
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { FunctionalSkillMapComponent } from "./functional-skill-map/functional-skill-map.component";
import { FunctionalSkillGapMatrixComponent } from "./functional-skill-gap-matrix/functional-skill-gap-matrix.component";
import { ProjectConsultantComponent } from "./project-consultant/project-consultant.component";
import { TeamComponent } from "./team/team.component";
import { AddJobChatComponent } from "./job-chat/add-job-chat/add-job-chat.component";
import { ApprovalListComponent } from "./dashboard1/approval-list/approval-list.component";
import { EmployeeListComponent } from "./dashboard1/employee-list/employee-list.component";
import { AddSkillMapComponent } from "./functional-skill-map/add-skill-map/add-skill-map.component";
import { ViewSkillMapComponent } from "./functional-skill-map/view-skill-map/view-skill-map.component";
import { GeneralCommentsComponent } from "./functional-skill-gap-matrix/general-comments/general-comments.component";
import { ProfileComponent } from "./team/profile/profile.component";
import { UpdateEmpSkillComponent } from "./team/update-emp-skill/update-emp-skill.component";
import { roles } from "../../environments/roles";
import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    data: {
      role: [roles.roles[4]],
    },
    canActivate: [],
  },
  {
    path: "technical-skill",
    component: TechnicalSkillComponent,
  },
  {
    path: "behavior-skill",
    component: BehaviorSkillComponent,
  },
  {
    path: "strength-improvement",
    component: StrengthImprovementComponent,
  },
  {
    path: "project-info",
    component: ProjectInfoComponent,
  },
  {
    path: "project-info/add-project",
    component: AddProjectComponent,
  },
  {
    path: "project-info/edit-project/:id",
    component: AddProjectComponent,
  },
  {
    path: "additional-skill",
    component: AdditionalSkillComponent,
  },
  {
    path: "additional-skill/:skillType",
    component: AdditionalSkillComponent,
  },
  {
    path: "additional-skill/add-additional-skill/:skillType",
    component: AddAdditionalSkillComponent,
  },
  {
    path: "additional-skill/add-additional-skill-edit/:id",
    component: AddAdditionalSkillComponent,
  },
  {
    path: "team/profile/additional-skill/:id",
    component: AdditionalSkillComponent,
  },
  {
    path: "dashboard1",
    component: Dashboard1Component,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "functional-skill-map",
    component: FunctionalSkillMapComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "functional-skill-gap-matrix",
    component: FunctionalSkillGapMatrixComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "project-consultant",
    component: ProjectConsultantComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "team",
    component: TeamComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "job-chat",
    component: JobChatComponent,
  },
  {
    path: "job-chat/add-job-chat",
    component: AddJobChatComponent,
  },
  {
    path: "job-chat/edit-job-chat/:id",
    component: AddJobChatComponent,
  },
  {
    path: "dashboard1/approval-list",
    component: ApprovalListComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard1/employee-list",
    component: EmployeeListComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "functional-skill-map/add-skill-map",
    component: AddSkillMapComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "functional-skill-map/add-skill-map/:id",
    component: AddSkillMapComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "functional-skill-map/view-skill-map",
    component: ViewSkillMapComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "functional-skill-gap-matrix/view-general-comments",
    component: GeneralCommentsComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  /*{
      path: 'team/profile/:sgId',
      component: ProfileComponent
    },
  */
  {
    path: "team/profile",
    component: ProfileComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "team/profile/job-chat/:id",
    component: JobChatComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "team/profile/project-info/:id",
    component: ProjectInfoComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "team/profile/project-info",
    component: ProjectInfoComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "team/profile/additional-skill",
    component: AdditionalSkillComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
  {
    path: "team/update-emp-skill",
    component: UpdateEmpSkillComponent,
    data: {
      role: [roles.roles[2], roles.roles[1], roles.roles[3], roles.roles[0]],
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
