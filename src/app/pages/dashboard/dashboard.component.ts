import { Component, OnInit, ViewChild } from "@angular/core";
import { circle, latLng, tileLayer } from "leaflet";

import {
  revenueChart,
  refundsChart,
  userChart,
  orderChart,
  analyticsChart,
  users,
  slides,
} from "./data";
import { ChartType, slideModel } from "./dashboard.model";

import { SwiperOptions } from "swiper";
import { SwiperComponent, SwiperDirective } from "ngx-swiper-wrapper";

import { UserProfileService } from "../../core/services/user.service";
import { PeopleReviewService } from "../../core/services/people-review.service";
import { ProjectInfoService } from "src/app/core/services/project-info.service";
import { TruncatePipe } from "src/app/custom.pipe";
import { map } from "rxjs/operators";
import { TechnicalSkillService } from "src/app/core/services/tech-skill-map.service";
import { BehaviorSkillService } from "src/app/core/services/behavior-skill.service";
import { AdditionalSkillService } from "src/app/core/services/additional-skill.service";
import { JobChatService } from "src/app/core/services/job-chat.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Charts } from "src/app/layouts/chart/chart.config";
import { AuthService } from "src/app/core/services/auth.service";
import { roles } from "../../../environments/roles";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})

/**
 * dashboard Component
 */
export class DashboardComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: true }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  slides!: slideModel[];

  /**
   * Swiper setting
   */
  /*config: SwiperOptions = {
      a11y: { enabled: true },
      direction: 'horizontal',
      slidesPerView: 3,
      keyboard: true,
      mousewheel: true,
      scrollbar: false,
      navigation: true,
      pagination: false
    };*/
  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0,
    slidesPerView: 1,
  };
  /**
   * Swiper setting
   */
  cardConfig = {
    initialSlide: 0,
    slidesPerView: 3,
  };
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  revenueChart!: ChartType;
  appRoles = roles;
  refundsChart!: ChartType;
  userChart!: ChartType;
  orderChart!: ChartType;
  donutChart: any;
  analyticsChart!: ChartType;
  users: any;
  paramUser: any;
  empSgId: any;
  currentUserId: any = {};
  currentUser: any = {};
  qualArr: any = [];
  peopleReview: any = [];
  projectInfo: any = [];
  techSkillInfo: any = [];
  behaviorSkillInfo: any = [];
  additionalSkillInfo: any = [];
  patentSkillInfo: any = [];
  trainingCertificates: any = [];
  productLaunches: any = [];
  consultation: any = [];
  conferences: any = [];
  jobChatInfo: any = [];

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
    "badge-soft-custom-blue",
  ];
  bgRandom: any = [];
  totalCount: any;
  skillType: any;
  constructor(
    public userProfileService: UserProfileService,
    public peopleService: PeopleReviewService,
    private authService: AuthService,
    public projectInfoService: ProjectInfoService,
    public technicalSkillService: TechnicalSkillService,
    public behaviorSkillService: BehaviorSkillService,
    public additionalSkillService: AdditionalSkillService,
    public jobChatService: JobChatService,
    private route: ActivatedRoute,
    private chart: Charts,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "SGRI" },
      { label: "Dashboard", active: true },
    ];

    this.fetchData();

    this.activeUserQualification();

    this.currentUserId = this.authService.currentUser;
    if (
      this.currentUserId.role == this.appRoles.roles[4] ||
      this.currentUserId.tempRole == this.appRoles.roles[4]
    ) {
      this.empSgId = this.currentUserId.sgId;
    } else if (
      (this.currentUserId.role == this.appRoles.roles[2] &&
        this.currentUserId.tempRole == this.appRoles.roles[2]) ||
      (this.currentUserId.role == this.appRoles.roles[3] &&
        this.currentUserId.tempRole == this.appRoles.roles[3])
    ) {
      this.router.navigate(["/dashboard1"]);
      //this.empSgId = this.currentUserId.sgId;
    } else if (
      this.currentUserId.role == this.appRoles.roles[1] ||
      this.currentUserId.role == this.appRoles.roles[0]
    ) {
      this.router.navigate(["/dashboard1"]);
    }

    //this.getCurrentUser();

    this.getUser(this.empSgId);
  }

  /*getCurrentUser() {
      let userId = this.currentUserId.sgId;
      this.userProfileService.getUserById(userId).subscribe(data => {
        this.currentUser = data;
        console.log('----------------current emp', data);
        this.activeUserQualification();
      });
    }*/

  getUser(empSgId: any) {
    this.userProfileService.getUser(empSgId).subscribe((data) => {
      this.currentUser = data.emp_info[0];
      this.buildDonutChart(data.emp_info[0]);
      console.log("-------------employee data", this.currentUser);
    });
  }

  activeUserQualification() {
    let qual1 = this.currentUser.qual_level1_nm;
    let qual2 = this.currentUser.qual_level2_nm;
    let qual3 = this.currentUser.qual_level3_nm;

    if (qual1 != null) {
      let qualificationArr1 = qual1.split("-");
      this.qualArr["qual1ArrPart1"] = qualificationArr1[0];
      this.qualArr["qual1ArrPart2"] = qualificationArr1[1];
    }
    if (qual2 != null) {
      let qualificationArr2 = qual2.split("-");
      this.qualArr["qual2ArrPart1"] = qualificationArr2[0];
      this.qualArr["qual2ArrPart2"] = qualificationArr2[1];
    }
    if (qual3 != null) {
      let qualificationArr3 = qual3.split("-");
      this.qualArr["qual3ArrPart1"] = qualificationArr3[0];
      this.qualArr["qual3ArrPart2"] = qualificationArr3[1];
    }
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.revenueChart = revenueChart;
    this.refundsChart = refundsChart;
    this.userChart = userChart;
    this.orderChart = orderChart;
    this.analyticsChart = analyticsChart;
    this.users = users;
    this.slides = slides;
  }

  private buildDonutChart(emp_info: any = {}) {
    let total = emp_info.internal_exp + emp_info.external_exp;
    let internal = ((emp_info.internal_exp / total) * 100).toFixed(2);
    let external = ((emp_info.external_exp / total) * 100).toFixed(2);

    let experience = [];
    let int_data: any = {};
    let ex_data: any = {};
    int_data["value"] = parseFloat(internal);
    int_data["name"] = "Internal Experience";

    experience.push(int_data);
    ex_data["value"] = parseFloat(external);
    ex_data["name"] = "External Experience";

    experience.push(ex_data);
    this.donutChart = this.chart.BuildDonutchart({
      experiece: experience,
      total_exp: emp_info.total_exp,
    });
  }
  /*
      nextSlide() {
        if (this.componentRef !== undefined) {
          this.componentRef.directiveRef?.nextSlide();
        }
      }
      prevSlide() {
        if (this.componentRef !== undefined) {
          this.componentRef.directiveRef?.prevSlide();
        }
      }*/
  /**
   * Swiper Next set
   */
  nextSlide() {
    this.directiveRef!.nextSlide();
  }

  /**
   * Swiper Previous set
   */
  previousSlide() {
    this.directiveRef!.prevSlide();
  }

  /**
   * Swiper card next set
   */
  nextSlideComp() {
    this.componentRef!.directiveRef!.nextSlide();
  }

  /**
   * Swiper card previous set
   */
  previousSlideComp() {
    this.componentRef!.directiveRef!.prevSlide();
  }

  /*
    layers = [
      circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
      circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
      circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    ];
    */
}
