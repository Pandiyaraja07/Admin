import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TechSkillMasterService } from 'src/app/core/services/tech-skill-master.service';
import { TechnicalSkillService } from 'src/app/core/services/tech-skill-map.service';
import { ProjectInfoService } from 'src/app/core/services/project-info.service';
import { AdditionalSkillService } from 'src/app/core/services/additional-skill.service';
import { JobChatService } from 'src/app/core/services/job-chat.service';
import * as echarts from 'echarts';
import { Charts } from 'src/app/layouts/chart/chart.config';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { query } from '@angular/animations';
import { roles } from 'src/environments/roles';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {
    empSgId: any;
    appRoles = roles;
    currentUserId: any = {};
    currentUser: any = {};
    empId: any;
    userRole: any;
    dept: any;
    subDept: any;
    domain: any;
    subdomain: any;
    selectedDept: any;
    selectedSubdept: any;
    selectedDomain: any;
    selectedSubdomain: any;
    pendingApprovalLs: any;
    auhorityTechSkill: any;
    pendingApprovalAdditionalSkill: any;
    pendingApprovalJobChat: any;
    projectPopContent: any;
    additionalSkillPopContent: any;
    jobChatPopContent: any;

    authorityList: any;
    techSkillOfSkillMapId: any;
    qualitativeComment: any;

    approvedStatus: any;
    chart: any;
    options: any;
    barOptions: any;
    chartDom: any;
    myChart: any;
    bubble: any;
    bubbleChart: any;
    oldFunnelOptions: any;
    orderedSub: any;
    totalEmp: any;

    sunburstOption: any;
    sunburstMyChart: any;
    sunburstData: any = [];
    sunburstDataFirstLayer: any = [];
    sunburstDataDomain: any = [];
    sliceArr: any;

    //queryParams: any = {};
    location: any;
    active: any = 1;

    //new
    node!:any;
    rootURL = environment.rootUrl + "/";

    public x = {
        callbacks: {
            title: function (tooltipItem: any, data: any) {
                return '';
            },
            label: function (tooltipItem: any, data: any) {
                return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            }
        }
    }

    constructor(public techSkillMasterService: TechSkillMasterService,
        private modalService: NgbModal,
        private authService: AuthService,
        public projectInfoService: ProjectInfoService,
        public additionalSkillService: AdditionalSkillService,
        public jobChatService: JobChatService,
        public chartConfig: Charts,
        public router: Router,
        public technicalSkillService: TechnicalSkillService,
        private toastr: ToastrService

    ) {
        //Chart.register(...registerables)
    }

    ngOnInit(): void {

        this.currentUserId = this.authService.currentUser;
        if (this.currentUserId.role == this.appRoles.roles[4] || this.currentUserId.tempRole == this.appRoles.roles[4]) {
            //this.router.navigate(['/']);
        } else if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) || (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
            this.currentUser = this.currentUserId.sgId;
            this.empId = this.currentUserId.emp_id;
            this.userRole = this.currentUserId.role;

            this.getTeamPendingInfo(this.empId);
            this.getFLDept(this.empId);
            this.getEmpCount(this.empId);

        } else if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.currentUser = this.currentUserId.sgId;
            this.userRole = this.currentUserId.role;
            this.getAllDept();
            this.getAllEmployeeCount();

            if (this.currentUserId.role == this.appRoles.roles[0]) {
                this.empId = this.currentUserId.emp_id;
                this.getProfileTechSkillMappingForAuthority()
                this.getTeamPendingInfo(this.empId);
            }
        }
    }

    pyramidChart() {
        if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.getAllDept();
            this.getAllEmployeeCount();
        } else {
            this.getFLDept(this.empId);
            this.getEmpCount(this.empId);
        }
    }

    getProfileTechSkillMappingForAuthority() {
        let depth = 'Authority'
        let approvalStatus = 0
        let offset = 0
        let limit = 5
        this.technicalSkillService.getAllTechSkillMappingByDepth(depth, approvalStatus, offset, limit).subscribe(data => {
            this.auhorityTechSkill = data.rows
        })
    }
    getEmpCount(flId: any) {
        this.techSkillMasterService.getEmpCount(flId).subscribe(data => {
            this.totalEmp = data.emp_info_aggregate.aggregate.count
        });
    }
    getAllEmployeeCount() {
        this.techSkillMasterService.getAllEmployeeCount().subscribe(data => {
            this.totalEmp = data.emp_info_aggregate.aggregate.count
        })
    }

    /**
       * Open scroll modal
       * @param jobChatModel scroll modal data
       */
    jobChatModelFn(jobChatModel: any, id: any) {
        console.log('------------------id', id);
        this.getJobChatByPK(id)
        this.modalService.open(jobChatModel, { scrollable: true });
    }

    /**
       * Open scroll modal
       * @param projectApprovalModel scroll modal data
       */
    projectApprovalModelFn(projectApprovalModel: any, id: any) {
        this.getProjectByPK(id)
        this.modalService.open(projectApprovalModel, { scrollable: true });
    }

    /**
       * Open scroll modal
       * @param authorityListModel scroll modal data
       */
    authorityListModelFn(authorityListModel: any, id: any) {
        this.getTechSkillBySkillMappingPk(id)
        this.modalService.open(authorityListModel, { scrollable: true });
    }
    getTechSkillBySkillMappingPk(skillMapId: any) {
        this.technicalSkillService.getTechSkillMappingByPk(skillMapId).subscribe(data => {
            this.techSkillOfSkillMapId = data
        })
    }
    /**
      * Open scroll modal
      * @param additioanalSkillModel scroll modal data
      */
    additioanalSkillModelFn(additioanalSkillModel: any, id: any) {
        this.getAdditionalSkillByPk(id)
        this.modalService.open(additioanalSkillModel, { scrollable: true });
    }

    jobChatApproveAction(status: any, jobChatId: any) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let objData = {
            "approval_date": date,
            "approval_fl_id": this.currentUser,
            "approval_status": status
        }
        this.jobChatService.updateJobChatApprovalStatus(objData, jobChatId).subscribe(data => {
            this.approvedStatus = data;
            window.location.reload();
        });
        this.modalService.dismissAll()
    }

    authorityListApproval(status: any, skillMapId: any) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let objData = {
            "approval_date": date,
            "approval_status": status,
            "qualitative_comments_nm": this.qualitativeComment
        }
        this.technicalSkillService.updateAuthorityDepthApprovalStatus(objData, skillMapId).subscribe({
            next:(data:any) => {
            this.approvedStatus = data;
            this.toastr.success("Approval Status Updated successfully.", "Success");
        },
        error:(error:any) => {
            this.toastr.error("Approval Status Not Update .", "Error");
        }
    })
        window.location.reload();
        this.modalService.dismissAll()
    }

    getFLDept(flId: any) {
        this.techSkillMasterService.getFlDept(flId).subscribe(data => {
            this.dept = data.dept_info;
            if (!this.selectedDept) {
                this.selectedDept = data.dept_info[0].dept_id
            }
            this.getFlSubdept(flId, this.selectedDept);
            this.getAllDomainInfo();
            this.getAllSubdomainInfo();
        });
    }
    getAllDept() {
        this.techSkillMasterService.getAllDeptMaster({}).subscribe(data => {
            this.dept = data.dept_info;
            if (this.currentUserId.role == this.appRoles.roles[0] || this.currentUserId.role == this.appRoles.roles[1]) {
                this.dept.unshift({ dept_id: 0, dept_code: '', name: "ALL" })
            }
            if (this.dept == null) {
            } else {
                if (!this.selectedDept) {
                    this.selectedDept = data.dept_info[0].dept_id
                }
                this.getAllDomainInfo();
                this.getAllSubdomainInfo();
            }
        });
    }

    getSelectedDept() {
        this.subDept = [];
        this.selectedSubdept = '';
        if (this.selectedDept == null) {
            this.subDept = [];
        }
        if (this.currentUserId.role == this.appRoles.roles[1] || this.currentUserId.role == this.appRoles.roles[0]) {
            this.getAllSubdept(this.selectedDept);
        } else {
            this.getFlSubdept(this.empId, this.selectedDept);
        }
        this.getAllDomainInfo()
        this.getAllSubdomainInfo()
    }
    getAllSubdept(dept: any) {
        this.techSkillMasterService.getAllSubdeptMaster(dept).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length > 0) {

            } else {
                this.selectedSubdept = null;
            }
        });
    }
    getFlSubdept(flId: any, dept_id: any) {
        this.techSkillMasterService.getFlSubdept(flId, dept_id).subscribe(data => {
            this.subDept = data.subdept_info;
            if (this.subDept.length <= 0) {
                this.selectedSubdept = null
            }
        });

    }
    getSelectedSubdept() {
        this.getAllDomainInfo()
        this.getAllSubdomainInfo()
    }

    getAllDomainMaster(subdept: any) {
        this.techSkillMasterService.getTechDomainMasterBySubDept(subdept).subscribe(data => {
            this.domain = data.domain_info;
            this.getTunnelChart(this.domain)
        });
    }
    getAllDomainInfo() {
        this.techSkillMasterService.getTechDomainMaster({}).subscribe(data => {
            this.domain = data.domain_info;
            let whereCondition: any= {
                "team_skills_info": {},
                "technical_depth_id": { "_is_null": false },
                "team_skill_status": { "_eq": 0 }
            }
            if (this.selectedDept != 'undefined' && this.selectedDept > 0) {
                whereCondition.team_skills_info["dept_id"] = { "_eq": this.selectedDept }
            }
            if (this.selectedSubdept != 'undefined' && this.selectedSubdept > 0) {
                whereCondition.team_skills_info["subdept_id"] = { "_eq": this.selectedSubdept }
            } else if (this.selectedDept === null) {
                whereCondition.team_skills_info["subdept_id"] = { "_is_null": true }
            } else {

            }
            if ((this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) ||
                (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3])) {
                whereCondition["emp_info"] = {
                    "_or": [
                        {
                            "fl_emp_id":
                            {
                                "_eq": this.currentUserId.emp_id
                            }
                        },
                        {
                            "emp_id":
                            {
                                "_eq": this.currentUserId.emp_id
                            }
                        },
                        {
                            "supervisor_emp_id":
                            {
                                "_eq": this.currentUserId.emp_id
                            }
                        }
                    ]
                }
            }

            this.techSkillMasterService.getTechCountDomainMaster(whereCondition).subscribe(data => {

                let total = data.domain_info.map((val:any) => (val.skill_mappings_aggregate.aggregate.count))
                total = total.reduce((pre:any, cur:any) => pre + cur, 0)

                data.domain_info.forEach((element:any) => {
                    element.percentage = ((element.skill_mappings_aggregate.aggregate.count / this.totalEmp) * 100).toFixed(0)
                    if (isNaN(element.percentage)) {
                        element.percentage = 0
                    }
                });
                this.getTunnelChart(data.domain_info)
            })
        });
    }
    getAllSubdomainMaster(subdept: any) {
        this.techSkillMasterService.getTechSubdomainMasterBySubDept(subdept).subscribe(data => {
            this.subdomain = data.subdomain_info;
        });
    }
    getAllSubdomainInfo(domain?: any) {
        let whereCondition: any = {
            "team_skills_info": {},
            "technical_depth_id": { "_is_null": false },
            "team_skill_status": { "_eq": 0 }
        }
        if (this.selectedDept != 'undefined' && this.selectedDept > 0) {
            whereCondition.team_skills_info["dept_id"] = { "_eq": this.selectedDept }
        }
        if (this.selectedSubdept != 'undefined' && this.selectedSubdept > 0) {
            whereCondition.team_skills_info["subdept_id"] = { "_eq": this.selectedSubdept }
        } else if (this.selectedSubdept === null) {
            whereCondition.team_skills_info["subdept_id"] = { "_is_null": true }
        } else {

        }
        if (this.currentUserId.role == this.appRoles.roles[2] && this.currentUserId.tempRole == this.appRoles.roles[2]) {
            whereCondition["emp_info"] = {
                "_or": [
                    {
                        "fl_emp_id":
                        {
                            "_eq": this.currentUserId.emp_id
                        }
                    },
                    {
                        "emp_id":
                        {
                            "_eq": this.currentUserId.emp_id
                        }
                    }
                ]
            }
        }
        if (this.currentUserId.role == this.appRoles.roles[3] && this.currentUserId.tempRole == this.appRoles.roles[3]) {
            whereCondition["emp_info"] = {
                "_or": [
                    {
                        "supervisor_emp_id":
                        {
                            "_eq": this.currentUserId.emp_id
                        }
                    },
                    {
                        "emp_id":
                        {
                            "_eq": this.currentUserId.emp_id
                        }
                    }
                ]
            }
        }

        if (domain) {
            this.techSkillMasterService.getSubdomainWithEmpCount(domain, whereCondition).subscribe(data => {
                this.subdomain = this.getPercentage(data.subdomain_info);
                this.getcircleChart();
            });
        } else {
            this.techSkillMasterService.getSubdomainWithEmpCount(domain, whereCondition).subscribe(data => {
                this.subdomain = this.getPercentage(data.subdomain_info);
                this.getcircleChart();
            });
        }
    }

    getSelectedDomain(domain: any) {
        // this.getSubdomainByDomain(domain);
        this.getSubdomainByDomain(domain);
    }

    getSelectedSubDomain(subdomain: any) {
        // console.log("subDomain======>", subdomain);
        /*
        this.techSkillLevelMasterService.getTechSkillLevel(id, 'level1').subscribe(data => {
              this.getLevel1 = data.tech_skills_info
              console.log('--------------1', data);
            });
        */

    }

    getSubdomainByDomain(domain: any) {
        this.techSkillMasterService.getTechSubDomainMaster(domain).subscribe(data => {
            this.subdomain = data.subdomain_info;
        });
    }

    getTeamPendingInfo(flId: any) {
        let offset = 0;
        let limit = 5
        let approvalStatus = 0;
        this.projectInfoService.getPendingInfo(flId, approvalStatus, offset, limit).subscribe(data => {
            this.pendingApprovalLs = data[0];
        });
    }


    shortAspireRole: any = [];
    getJobChatByPK(pk: any) {
        this.jobChatService.getJobChatbyPK(pk).subscribe(data => {
            this.jobChatPopContent = data.job_chat[0];
            for (let j = 0; j < this.jobChatPopContent.career_plan_infos.length; j++) {
                this.shortAspireRole = this.jobChatPopContent.career_plan_infos[j].aspired_role
                this.jobChatPopContent.career_plan_infos[j].aspired_role = JSON.parse(this.shortAspireRole);
            }
        });
    }

    getProjectByPK(pk: any) {
        this.projectInfoService.getProjectByProjectId(pk).subscribe(data => {
            this.projectPopContent = data.project_info[0]
            // console.log('============dash pop', data);
        })
        // this.projectInfoService.getProjectByPK(pk).subscribe(data => {
        //     this.projectPopContent = data;
        //     console.log('============dash pop', data);
        // });
    }

    getAdditionalSkillByPk(pk?: any) {
        this.additionalSkillService.getAdditionalSkillId(pk).subscribe(data => {
            data.additional_skills_info[0].additional_skill_attachments = this.getFile(data.additional_skills_info[0].additional_skill_attachments)
            this.additionalSkillPopContent = data.additional_skills_info[0];
        });
    }

    projectApproveAction(status: any, projectId: any) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let objData = {
            "approval_date": date,
            "approved_fl_id": this.currentUser,
            "approval_status": status
        }
        this.projectInfoService.updateProjectApprovalStatus(objData, projectId).subscribe(data => {
            this.approvedStatus = data;
            window.location.reload();
        });
        this.modalService.dismissAll()
    }

    additionalSkillApproveAction(status: any, additionalSkillId: any) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let objData = {
            "approval_date": date,
            "approved_fl_id": this.currentUser,
            "approval_status": status
        }
        this.additionalSkillService.UpdateApprovalAdditionalSkill(objData, additionalSkillId).subscribe(data => {
            this.approvedStatus = data;
            window.location.reload();
        });
        this.modalService.dismissAll()
    }

    getDomainid(index:any) {
        let domain = this.domain[index]
        console.log(domain)
        //this.getSubdomainByDomain(domain.domain_id)
        this.getAllSubdomainInfo(domain.domain_id)
    }

    getTunnelChart(domainArr:any) {
        this.chartDom = document.getElementById('funnel');
        this.myChart = echarts.init(this.chartDom);
        const data2 = [];
        var i = 0
        for (let domain of domainArr) {
            i = i + 30
            var val = {}
            if (i === 30) {
                val = {
                    "value": i, "name": "\n \n \n " + domain.domain_nm.replace("&", "\n & \n") + "\n  " + domain.percentage + "%", itemStyle: { color: this.getColor(i)[0] }, label: { color: this.getColor(i)[1] }, emphasis: {
                        label: {
                            color: "white",
                            textBorderColor: "rgba(37, 36, 36, 1)",
                            fontSize: 13,
                        },
                        itemStyle: {
                            color: this.getColor(i)[1]
                        },

                    },
                    "emp_count": "Employee Count:" + domain.skill_mappings_aggregate.aggregate.count
                }
            } else {
                val = {
                    "value": i, "name": domain.domain_nm + "\n \n " + domain.percentage + "%", itemStyle: { color: this.getColor(i)[0] }, label: { color: this.getColor(i)[1] }, emphasis: {
                        label: {
                            color: "#fff",
                            textBorderColor: "rgba(37, 36, 36, 1)",
                            fontSize: 13,
                        },
                        itemStyle: {
                            color: this.getColor(i)[1]
                        },

                    },
                    "emp_count": "Employee Count:" + domain.skill_mappings_aggregate.aggregate.count
                }
            }
            data2.push(val)
        }
        this.options = {
            title: {
                text: 'Domain'
            },
            toolbox: {
                feature: {
                    saveAsImage: { title: "Save as Image" }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: (val:any) => {
                    return val.data.emp_count
                }
            },
            series: [
                {
                    name: 'Funnel',
                    type: 'funnel',
                    left: '0%',
                    top: 40,
                    width: '100%',
                    height: "85%",
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'ascending',
                    gap: 9,
                    label: {
                        show: true,
                        position: 'inside',
                        fontSize: 11,
                        fontFamily: "ubuntu"

                    },
                    data: data2,
                },
            ]
        };

        this.myChart.setOption(this.options)
        this.myChart.on('click', (params:any) => {
            this.getDomainid(params.dataIndex)
        })

    }

    getColor(percentage:any) {
        if (percentage == 30) {
            return ["#edd7f6", "#7a1ba0"]
        } else if (percentage == 60) {
            return ["#c3dffa", "#0a3f6a"]
        }
        return ["#fff1dd", "#9b4a09"]

    }

    getcircleChart() {
        let query_params = {}
        // if(){}
        this.bubbleChart = echarts.init(document.getElementById('bubbles'));
        this.bubble = this.chartConfig.getcircleChart(this.subdomain)
        this.bubbleChart.setOption(this.bubble)

        this.bubbleChart.on('click', (params:any) => {
            let queryData = {
                "dept_id": this.selectedDept,
                "subdept_id": this.selectedSubdept,
                "subdomain": this.orderedSub[params.seriesIndex].subdomain_id
            }
            this.router.navigate(['/dashboard1/employee-list/'], { queryParams: queryData })
        })
    }

    getPercentage(values:any) {
        let totalcounts = values.map((row:any) => {
            return row.skill_mappings_aggregate.aggregate.count
        })
        totalcounts = totalcounts.reduce((pre:any, cur:any) => pre + cur, 0)
        values.forEach((element:any) => {
            element.percentage = ((element.skill_mappings_aggregate.aggregate.count / this.totalEmp) * 100).toFixed(0)
            if (isNaN(element.percentage)) {
                element.percentage = 0
            }
        });

        if (values.length > 3) {
            this.orderedSub = values.sort(function (a:any, b:any) {
                return a.percentage - b.percentage;
            });

            return this.orderedSub
        }

        this.orderedSub = values.sort(function (a:any, b:any) {
            return b.percentage - a.percentage;
        });

        return this.orderedSub

    }

    getFile(val:any) {
        console.log(val);
        let fileDetails = []
        for (let row of val) {
            let fileDetailObj:any= {}
            fileDetailObj["src"] = this.rootURL + row.attachment_nm
            fileDetailObj["name"] = row.attachment_nm.split("/")[row.attachment_nm.split("/").length - 1]
            fileDetailObj["detail"] = row
            fileDetails.push(fileDetailObj)
        }
        return fileDetails
    }

    sunburstChart() {
        this.techSkillMasterService.getSunburstChartData().subscribe(data => {

            this.sunburstData = data[1][0]
            this.sunburstDataFirstLayer = data[0][0]
            this.sunburstDataDomain = data[2][0]

            var chartDom = document.getElementById('demo-chart');
            this.sunburstMyChart = echarts.init(chartDom);

            var groupResult:any = [];
            let loadData = '';

            for (let data of this.sunburstDataFirstLayer) {

                var dept = _.find(groupResult, (c) => (c.dept_id == data.dept_id))
                if (!dept) {
                    dept = {};
                    dept['name'] = data.dept_nm;
                    //dept['name'] = data.dept_nm ? data.dept_nm.split(' ').join('\n') : data.dept_nm;
                    dept['dept_id'] = data.dept_id;
                    //dept['itemStyle'] = { color: data.dept_color };
                    //dept['itemStyle'] = { color: '#b8d2c7' };
                    dept['itemStyle'] = { color: '#DBF5F0' };
                    dept['level'] = 1;
                    dept['children'] = [];
                    groupResult.push(dept);
                }

                var subDept = _.find(dept['children'], (c) => (c.subdept_id == data.subdept_id))
                if (!subDept) {
                    subDept = {};
                    subDept['name'] = data.subdept_nm ? data.subdept_nm.split(' ').join('\n') : data.subdept_nm;
                    subDept['subdept_id'] = data.subdept_id;
                    //subDept['itemStyle'] = { color: data.dept_color };
                    //subDept['itemStyle'] = { color: '#b8d2c7' };
                    subDept['itemStyle'] = { color: '#A4E5E0' };
                    subDept['children'] = [];
                    subDept['value'] = data.emp_count
                    subDept['level'] = 2
                    dept['children'].push(subDept);
                }
            }

            for (let data1 of this.sunburstDataDomain) {
                var dept = _.find(groupResult, (c) => (c.dept_id == data1.dept_id))
                if (!dept) {
                    dept = {};
                    dept['name'] = data1.dept_nm;
                    dept['dept_id'] = data1.dept_id
                    dept['itemStyle'] = { color: '#b8d2c7' };
                    dept['children'] = [];
                    dept['level'] = 1;
                    groupResult.push(dept);
                }

                var subDept = _.find(dept['children'], (c) => (c.subdept_id == data1.subdept_id))
                if (!subDept) {
                    subDept = {};
                    subDept['name'] = data1.subdept_nm ? data1.subdept_nm.split(' ').join('\n') : data1.subdept_nm;
                    subDept['subdept_id'] = data1.subdept_id;
                    subDept['itemStyle'] = { color: '#b8d2c7' };
                    subDept['value'] = data1.emp_count
                    subDept['children'] = [];
                    subDept['level'] = 2;
                    dept['children'].push(subDept);
                }

                var domain = _.find(subDept['children'], (c) => (c.domain_id == data1.domain_id))
                if (!domain) {
                    domain = {};
                    domain['name'] = data1.domain_nm ? data1.domain_nm.split(' ').join('\n') : data1.domain_nm;
                    domain['domain_id'] = data1.domain_id;
                    domain['itemStyle'] = { color: data1['domain_color'] };
                    domain['level'] = 3;
                    domain['value'] = data1.emp_count;
                    domain['children'] = [];
                    subDept['children'].push(domain);
                }
            }

            for (let currentObj of this.sunburstData) {
                var subDomain: any = {};
                subDomain['name'] = currentObj['subdomain_nm'] ? currentObj['subdomain_nm'].split(' ').join('\n') : currentObj['subdomain_nm'];
                subDomain['subdomain_id'] = currentObj['subdomain_id'];
                subDomain['itemStyle'] = { color: currentObj['domain_color'] };
                subDomain['value'] = currentObj['emp_count'];
                subDomain['level'] = 4

                var dept = _.find(groupResult, (c) => (c.dept_id == currentObj.dept_id))
                if (!dept) {
                    dept = {};
                    dept['name'] = currentObj.dept_nm;
                    //dept['name'] = currentObj.dept_nm ? currentObj.dept_nm.split(' ').join('\n') : currentObj.dept_nm;
                    dept['dept_id'] = currentObj.dept_id
                    dept['itemStyle'] = { color: '#b8d2c7' };
                    dept['children'] = [];
                    dept['level'] = 1;
                    groupResult.push(dept);
                }

                var subDept = _.find(dept['children'], (c) => (c.subdept_id == currentObj.subdept_id))
                if (!subDept) {
                    subDept = {};
                    subDept['name'] = currentObj.subdept_nm ? currentObj.subdept_nm.split(' ').join('\n') : currentObj.subdept_nm;
                    subDept['subdept_id'] = currentObj.subdept_id;
                    subDept['itemStyle'] = { color: '#b8d2c7' };
                    subDept['value'] = currentObj.emp_count
                    subDept['children'] = [];
                    subDept['level'] = 2;
                    dept['children'].push(subDept);
                }

                var domain = _.find(subDept['children'], (c) => (c.domain_id == currentObj.domain_id))
                if (!domain) {
                    domain = {};
                    domain['name'] = currentObj.domain_nm ? currentObj.domain_nm.split(' ').join('\n') : currentObj.domain_nm;
                    domain['domain_id'] = currentObj.domain_id;
                    domain['itemStyle'] = { color: currentObj['domain_color'] };
                    domain['level'] = 3;
                    domain['value'] = currentObj.emp_count;
                    domain['children'] = [];
                    subDept['children'].push(domain);
                }

                domain['children'].push(subDomain);
            }

            setDataIndex(groupResult);
            let chartData = filterUpto2Levels(groupResult, true);

            function setDataIndex(data:any) {
                var dataIndex = 0;
                data.forEach(function iter(a:any) {
                    a.dataIndex = ++dataIndex;
                    if (a.children) {
                        a.children.forEach((b:any) => {
                            b.parent = dataIndex;
                        });
                        a.children.forEach(iter);
                    }
                });
                console.log(data)
            }

            function findByDataIndex(data: any, dataIndex: any) {
                var obj;
                console.log("findByDataIndex data", data);
                data.forEach(function iter(a:any) {
                    //console.log("iter", a);
                    if (a.dataIndex == dataIndex) {
                        obj = a;
                    }
                    if (a.children) {
                        a.children.forEach(iter);
                    }
                });
                return obj;
            }

            function filterUpto2Levels(data: any, first: any) {
                var finalResult = JSON.parse(JSON.stringify(data));
                for (let i = 0; i <= (finalResult.length - 1); i++) {
                    if (finalResult[i].children) {
                        if ((finalResult[i].level == 2 || finalResult[i].level == 3) && ((finalResult[i].children).length > 0)) {
                            delete finalResult[i].value
                        }
                        for (let j = 0; j <= ((finalResult[i].children).length - 1); j++) {
                            delete finalResult[i].children[j].children;
                        }
                    }
                }
                if (!first) {
                    return [
                        { 'name': '', 'dataIndex': finalResult[0].parent, 'children': finalResult }
                    ];
                }

                return finalResult;
            }

            function filterData(dataIndex: any) {
                let data = findByDataIndex(groupResult, dataIndex);
                console.log('findByDataIndex', data);
                return filterUpto2Levels([data], false);
            }

            const getPath = (output:any, dataIndex:any) => {
                this.node = findByDataIndex(groupResult, dataIndex);
                console.log("nodeeeeeeeeeeeeeeee",this.node);
                output.push(this.node);
                if (this.node.parent) {
                    getPath(output, this.node.parent);
                }
            }

            this.sunburstOption = {
                tooltip: {
                    enabled: false,
                    formatter: function (params:any) {
                        if(params.name) {  return `${params.name} : ${params.value}`  }
                        else { return ` - : ${params.value} ` }
                    }
                },
                series: {
                    type: 'sunburst',
                    data: chartData,
                    radius: [0, '100%'],
                    color: ['#A8DADC'],                
                    label: {
                        rotate: 0,
                        fontFamily: 'Ubuntu',
                        fontWeight: 'bold',
                        minAngle: 10,
                        fontSize: 10,
                    },
                    emphasis: false
                }
            };

            this.sunburstOption && this.sunburstMyChart.setOption(this.sunburstOption);
            this.sunburstMyChart.on('click', (params:any) => {

                if (!params.data.dataIndex) {
                    // back
                    console.log('back');
                    loadData = filterUpto2Levels(groupResult, true);
                } else {
                    if (params.data.level == 4) {
                        let lvls:any = [];
                        getPath(lvls, params.data.dataIndex);
                        if (lvls) {
                            let queryData = {
                                "dept_id": lvls[3].dept_id,
                                "subdept_id": lvls[2].subdept_id ? lvls[2].subdept_id : 0,
                                "subdomain": lvls[0].subdomain_id
                            }
                            this.router.navigate(['/dashboard1/employee-list/'], { queryParams: queryData })
                            //this.router.navigate([]).then(result => { window.open(`/dashboard1/employee-list?dept_id=${queryData.dept_id}&subdept_id=${queryData.subdept_id}&subdomain=${queryData.subdomain}`, '_blank'); });
                        }
                    }
                    loadData = filterData(params.data.dataIndex);

                }

                this.sunburstOption.series.data = loadData;
                console.log('loadData', loadData)
                loadData && this.sunburstMyChart.setOption(this.sunburstOption, true);
            })

        })
    }




}