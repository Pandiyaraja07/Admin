import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { roles } from "../../../environments/roles";
import { CookieService } from "ngx-cookie-service";
import { TranslateService } from "@ngx-translate/core";

import { LanguageService } from "../../core/services/language.service";
import { AuthService } from "../../core/services/auth.service";
import { ProjectInfoService } from "src/app/core/services/project-info.service";
import { AdditionalSkillService } from "src/app/core/services/additional-skill.service";
import { JobChatService } from "src/app/core/services/job-chat.service";
import { UserProfileService } from "src/app/core/services/user.service";
import { TechSkillLevelMasterService } from "src/app/core/services/tech-skill-levels.service";
import * as _ from "lodash";
@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})

/**
 * Topbar Component
 */
export class TopbarComponent implements OnInit {
  mode: string | undefined;
  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  appRoles = roles;
  valueset: any;
  currentUser: any = {};
  pendingApprovalLs: any;
  empInfo: any = {};
  searchTerm: any = {};
  searchList1: any = [];
  searchList: any = [];
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(
    private router: Router,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private authService: AuthService,
    public projectInfoService: ProjectInfoService,
    public additionalSkillService: AdditionalSkillService,
    public jobChatService: JobChatService,
    public userProfileService: UserProfileService,
    public techSkillLevelMasterService: TechSkillLevelMasterService
  ) {}

  /***
   * Language Listing
   */
  listLang = [
    { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
    { text: "Spanish", flag: "assets/images/flags/spain.jpg", lang: "es" },
    { text: "German", flag: "assets/images/flags/germany.jpg", lang: "de" },
    { text: "Italian", flag: "assets/images/flags/italy.jpg", lang: "it" },
    { text: "Russian", flag: "assets/images/flags/russia.jpg", lang: "ru" },
  ];

  @Output() settingsButtonClicked = new EventEmitter();

  ngOnInit(): void {
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get("lang");
    const val = this.listLang.filter((x) => x.lang === this.cookieValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = "assets/images/flags/us.jpg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    this.currentUser = this.authService.currentUser;
    if (
      this.currentUser.role == this.appRoles.roles[2] ||
      this.currentUser.role == this.appRoles.roles[3] ||
      this.currentUser.role == this.appRoles.roles[0]
    ) {
      this.getTeamPendingInfo(this.currentUser.emp_id);
    }

    if (this.currentUser.role == "HR" || this.currentUser.role == "CD") {
      this.getUserBasicInfo(this.currentUser.sgId);
    } else {
      this.getUser(this.currentUser.sgId);
    }

    this.getTechSkillLevelByLevel();
  }

  switchRole(tempRole: any) {
    let redirect = "";

    if (tempRole == "FL" || tempRole == "supervisor") {
      this.currentUser.tempRole = "employee";
      redirect = "/";
    } else {
      this.currentUser.tempRole = this.currentUser.role;
      redirect = "/dashboard1";
    }

    this.authService.updateUser(this.currentUser);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([redirect]);
  }

  getUser(empSgId: any) {
    this.userProfileService.getUser(empSgId).subscribe((data) => {
      this.empInfo = data.emp_info[0];
    });
  }
  //without FL Mapping
  getUserBasicInfo(empSgId: any) {
    this.userProfileService.getUserBasicInfo(empSgId).subscribe((data) => {
      this.empInfo = data.emp_info[0];
    });
  }

  getTeamPendingInfo(flId: any) {
    let offset = 0;
    let limit = 5;
    let approvalStatus = 0;
    this.projectInfoService
      .getPendingInfo(flId, approvalStatus, offset, limit)
      .subscribe((data) => {
        this.pendingApprovalLs = data[0];
        console.log("---------------ptorjct ----------- data", data);
      });
  }

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  searchFn(event: any) {
    let searchHolder:any = document.querySelector<HTMLInputElement>(
      ".fl-search .ng-select .ng-select-container .ng-value-container .ng-placeholder"
    );
    searchHolder.style.display = "none";
    if (event?.subdomain_id) {
      this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
        this.router.navigate(["/dashboard1/employee-list"], {
          queryParams: {
            subdomain: event.subdomain_id,
            level_id: event.tech_skill_id,
          },
        });
      });
    }
  }

  onKeypressEvent(event: any) {
    let searchHolder: any = document.querySelector<HTMLInputElement>(
      ".fl-search .ng-select .ng-select-container .ng-value-container .ng-placeholder"
    );
    searchHolder.style.display = "none";
  }

  getTechSkillLevelByLevel() {
    this.techSkillLevelMasterService
      .getTechSkillLevelByLevel()
      .subscribe((data) => {
        this.searchList1 = data.tech_skills_info;
        this.searchList = _.sortBy(this.searchList1, (o) => o.skill_nm);
        for(let each of this.searchList){
          if(each.levels == 'level1'){
            each.levels = 'L1';
          }
          else if(each.levels == 'level2'){
            each.levels = 'L2';
          }
          else if (each.levels == 'level3'){
            each.levels = 'L3';
          }
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/account/login"]);
  }

  clearonNavigate() {
    let searchHolder: any = document.querySelector<HTMLInputElement>(
      ".fl-search .ng-select .ng-select-container .ng-value-container .ng-placeholder"
    );
    searchHolder.style.display = "block";
  }
}
