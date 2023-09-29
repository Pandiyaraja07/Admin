import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SimplebarAngularModule } from 'simplebar-angular';
//import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { LightboxModule } from 'ngx-lightbox';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import {
    NgbAlertModule, NgbCarouselModule, NgbPopoverModule, NgbProgressbarModule, NgbCollapseModule, NgbAccordionModule, NgbPaginationModule, NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

import { NgxFileDropModule } from 'ngx-file-drop';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { TechnicalSkillComponent } from './technical-skill/technical-skill.component';
import { BehaviorSkillComponent } from './behavior-skill/behavior-skill.component';
import { StrengthImprovementComponent } from './strength-improvement/strength-improvement.component';
import { ProjectInfoComponent } from './emp-project-info/project-info.component';
import { AdditionalSkillComponent } from './additional-skill/additional-skill.component';
import { AddProjectComponent } from './emp-project-info/add-project/add-project.component';
import { AddPatentComponent } from './additional-skill/add-patent/add-patent.component';
import { AddAdditionalSkillComponent } from './additional-skill/add-additional-skill/add-additional-skill.component';
import { JobChatComponent } from './job-chat/job-chat.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { FunctionalSkillMapComponent } from './functional-skill-map/functional-skill-map.component';
import { FunctionalSkillGapMatrixComponent } from './functional-skill-gap-matrix/functional-skill-gap-matrix.component';
import { ProjectConsultantComponent } from './project-consultant/project-consultant.component';
import { TeamComponent } from './team/team.component';
import { AddJobChatComponent } from './job-chat/add-job-chat/add-job-chat.component';
import { ApprovalListComponent } from './dashboard1/approval-list/approval-list.component';
import { EmployeeListComponent } from './dashboard1/employee-list/employee-list.component';
import { AddSkillMapComponent } from './functional-skill-map/add-skill-map/add-skill-map.component';
import { ViewSkillMapComponent } from './functional-skill-map/view-skill-map/view-skill-map.component';
import { GeneralCommentsComponent } from './functional-skill-gap-matrix/general-comments/general-comments.component';
import { ProfileComponent } from './team/profile/profile.component';
import { UpdateEmpSkillComponent } from './team/update-emp-skill/update-emp-skill.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxEchartsModule } from 'ngx-echarts';
import { ShowmorelessNgxModule } from 'showmoreless-ngx';

import * as echarts from 'echarts';
import { LocalTime } from '../custom.pipe';
//Advanced Table
//import { Ng2SmartTableModule } from 'ng2-smart-table';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};

// FullCalendarModule.registerPlugins([
//     dayGridPlugin,
//     interactionPlugin
// ]);
@NgModule({
    declarations: [
		LocalTime,
        DashboardComponent,
        TechnicalSkillComponent,
        BehaviorSkillComponent,
        StrengthImprovementComponent,
        ProjectInfoComponent,
        AdditionalSkillComponent,
        AddProjectComponent,
        AddPatentComponent,
        AddAdditionalSkillComponent,
        JobChatComponent,
        Dashboard1Component,
        Dashboard2Component,
        FunctionalSkillMapComponent,
        FunctionalSkillGapMatrixComponent,
        ProjectConsultantComponent,
        TeamComponent,
        AddJobChatComponent,
        ApprovalListComponent,
        EmployeeListComponent,
        AddSkillMapComponent,
        ViewSkillMapComponent,
        GeneralCommentsComponent,
        ProfileComponent,
        UpdateEmpSkillComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        NgbDropdownModule,
        NgApexchartsModule,
        SharedModule,
        WidgetModule,
        LeafletModule,
        SimplebarAngularModule,
        //FullCalendarModule,
        FormsModule,
        ReactiveFormsModule,
        NgbNavModule,
        NgbTooltipModule,
        DndModule,
        LightboxModule,
        NgbDatepickerModule,
        FlatpickrModule.forRoot(),
        NgSelectModule,
        NgbAlertModule,
        DropzoneModule,
        NgxFileDropModule,
        SwiperModule,
        NgbTypeaheadModule,
        NgbPaginationModule,
        NgbPopoverModule,
        NgbAccordionModule,
        Ng2SearchPipeModule,
        NgxEchartsModule.forRoot({
            echarts
        }),
        ShowmorelessNgxModule
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ]
})
export class PagesModule { }
