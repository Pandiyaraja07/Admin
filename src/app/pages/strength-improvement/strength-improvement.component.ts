import { Component, OnInit } from "@angular/core";
import { PeopleReviewService } from "../../core/services/people-review.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { UserProfileService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";

import { roles } from "../../../environments/roles";
import { PermissionService } from "src/app/core/services/permission.service";
@Component({
    selector: "app-strength-improvement",
    templateUrl: "./strength-improvement.component.html",
    styleUrls: ["./strength-improvement.component.scss"],
})
export class StrengthImprovementComponent implements OnInit {
    // bread crumb items
    breadCrumbItems!: Array<{}>;
    peopleReview: any = [];
    appRoles = roles;
    paramUser: any;
    empSgId: any;
    profileId: any;
    basicInfo: any;
    currentUserId: any = {};
    currentUser: any = {};
    userRole: any;
    selectedSortOp = "Recent";
    selectValue = ["Recent", "Old"];
    strongAreaDesc: any;
    strongAreaReview: any;
    improveAreaDesc: any;
    improveAreaReview: any;

    submitted = false;
    peopleReviewObj: any = {};
    reviewType: any = "Accelerator";
    //pagenation variable
    limit: number = 10;
    offset: number = 0;
    page: number = 1;
    totalCount: any;
    button: any;
    approvedStatus: any;
    flAccess: boolean = false
    ownProfile : boolean = false
    flRole: boolean = false
    flRoletemp: boolean = false
    supervisorRole: boolean = false
    supervisorRoletemp: boolean = false
    employeeRole: boolean = false
    employeeRoletemp: boolean = false
    hrRole: boolean = false
    cdRole: boolean = false
    supervisorAccess: boolean = false
    FlSupervisorAccess: boolean = true 
    constructor(
        public peopleService: PeopleReviewService,
        private authService: AuthService,
        public userProfileService: UserProfileService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private permissionService : PermissionService) { }

    ngOnInit(): void {
        this.breadCrumbItems = [
            { label: "SGRI" },
            { label: "Strength & Improvement", active: true },
        ];

        this.currentUserId = this.authService.currentUser;
        if (
            this.currentUserId.role == this.appRoles.roles[4] ||
            this.currentUserId.tempRole == this.appRoles.roles[4]
        ) {
            this.currentUser = this.currentUserId.sgId;
            this.empSgId = this.currentUserId.sgId;
            this.userRole = this.appRoles.roles[4];
            this.profileId = this.currentUserId.sgId;
        } else if (
            (this.currentUserId.role == this.appRoles.roles[2] &&
                this.currentUserId.tempRole == this.appRoles.roles[2]) ||
            this.currentUserId.role == this.appRoles.roles[1] ||
            (this.currentUserId.role == this.appRoles.roles[3] &&
                this.currentUserId.tempRole == this.appRoles.roles[3]) ||
            this.currentUserId.role == this.appRoles.roles[0]
        ) {
            this.userRole = this.currentUserId.role;

            this.route.queryParams.subscribe((params) => {
                this.currentUser = params.userId;
                this.profileId = params.userId;
            });
        }
        this.getProfile(this.profileId);
        if (this.selectedSortOp == "Old") {
            // this.getEmpOldPeopleReviews(
            //     this.currentUser,
            //     this.reviewType,
            //     this.offset,
            //     this.limit
            // );
            this.getEmpPeopleReview(this.currentUser,
                this.reviewType,
                this.offset,
                this.limit,
                0);
        } else {
            // this.getEmpRecentPeopleReviews(
            //     this.currentUser,
            //     this.reviewType,
            //     this.offset,
            //     this.limit
            // );
            this.getEmpPeopleReview(this.currentUser,
                this.reviewType,
                this.offset,
                this.limit,
                1);
        }

        this.getEmpPeopleReview(this.currentUser,
            this.reviewType,
            this.offset,
            this.limit,
            1);

        this.employeePermission()
    }

    onTypeChange(type: any) {
        this.reviewType = type;
        this.loadPage(1);
    }

    PeopleReviewApproveAction(status: any, peopleId: any) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let objData = {
            "approval_date": date,
            "approved_fl_id": this.currentUserId.sgId,
            "approval_status": status
        }
        this.peopleService.updatePeopleReviewApprovalStatus(objData, peopleId).subscribe(data => {

            this.approvedStatus = data;
            window.location.reload();
        });
        // this.modalService.dismissAll()
        //window.location.reload();
    }

    loadPage(page: number) {
        this.page = page;
        this.offset = (this.page - 1) * this.limit;
        if (this.selectedSortOp == 'Old') {
            this.getEmpPeopleReview(this.currentUser,
                this.reviewType,
                this.offset,
                this.limit,
                0);
            // this.getEmpOldPeopleReviews(this.currentUser, this.reviewType, this.offset, this.limit);
        } else {
            this.getEmpPeopleReview(this.currentUser,
                this.reviewType,
                this.offset,
                this.limit,
                1);
            // this.getEmpRecentPeopleReviews(this.currentUser, this.reviewType, this.offset, this.limit);
        }
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

    // getEmpRecentPeopleReviews(
    //     empSgId: any,
    //     reviewType: any,
    //     offset: any,
    //     limit: any
    // ) {
    //     this.peopleReview = [];
    //     this.peopleService
    //         .getEmpRecentPeopleReviews(empSgId, reviewType, offset, limit)
    //         .subscribe((data) => {
    //             this.peopleReview = data.people_review;
    //             this.totalCount = data.people_review_aggregate.aggregate.count;
    //         });
    // }

    // getEmpOldPeopleReviews(empSgId: any, reviewType: any, offset: any, limit: any) {
    //     this.peopleReview = [];
    //     this.peopleService.getEmpOldPeopleReviews(empSgId, reviewType, offset, limit).subscribe(data => {
    //         this.peopleReview = data.people_review;
    //         console.log("total1", data.people_review);

    //         this.totalCount = data.people_review_aggregate.aggregate.count;
    //     });
    // }

    getEmpPeopleReview(empSgId: any, reviewType: any, offset: any, limit: any, sortBy?: any) {
        let whereCondition : any = {}
        let orderCondition = {}
        whereCondition['emp_id'] = { "_eq": empSgId }
        whereCondition['review_type'] = { "_eq": reviewType }
        if (
            this.currentUserId.role == this.appRoles.roles[4] ||
            this.currentUserId.tempRole == this.appRoles.roles[4]
        ) {
            whereCondition['approval_status'] = { "_eq": 1 }
        }

        if (sortBy == 1) {
            orderCondition = { "created_ts": "desc" };
        } else {
            orderCondition = { "created_ts": "asc" };
        }

        this.peopleService.getPeopleReviews(whereCondition, orderCondition, offset, limit).subscribe(data => {
            this.peopleReview = data.people_review;
            this.totalCount = data.people_review_aggregate.aggregate.count;
        })
    }

    /**
     * Open scroll modal
     * @param strongAreaModel scroll modal data
     */
    strongAreaModelFn(strongAreaModel: any) {
        this.peopleReviewObj = {};
        console.log("people review dataaa ", this.peopleReview);
        this.button = "Add";
        this.modalService.open(strongAreaModel, {
            scrollable: true,
            ariaLabelledBy: "job-chart",
            backdrop: "static",
            keyboard: true,
            windowClass: "my_custom_class",
        });
    }

    selectedSortFn() {
        this.page = 1;
        this.loadPage(this.page);
    }

    onClose() {
        this.modalService.dismissAll();
        this.peopleReviewObj = {};
    }

    onSubmit(peopleReviewForm: NgForm) {
        this.submitted = true;
        let obj = {
            emp_id: this.currentUser,
            review: this.peopleReviewObj.review,
            review_type: this.peopleReviewObj.review_type,
            description: this.peopleReviewObj.description,
            approval_status: 0
        };
        if (this.peopleReviewObj.people_review_id) {
            this.peopleService
                .updatePeopleReviews(this.peopleReviewObj.people_review_id, obj)
                .subscribe(
                    (data) => {
                        this.toastr.success(
                            "Strength & Improvements Update successfully.",
                            "Success"
                        );
                        window.location.reload();
                    },
                    (error) => {
                        this.toastr.error("Strength & Improvements Not Update .", "Error");
                    }
                );
            this.modalService.dismissAll();
        } else {
            this.peopleService.addPeopleReviews(obj).subscribe(
                (data) => {
                    this.toastr.success(
                        "Strength & Improvements Created successfully.",
                        "Success"
                    );
                    window.location.reload();
                },
                (error) => {
                    this.toastr.error("Strength & Improvements Not Created .", "Error");
                }
            );
            this.modalService.dismissAll();
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
                if (result.value) {
                    let id = this.peopleReview[i].people_review_id;
                    this.peopleService.deletePeopleReviews(id).subscribe(
                        (data) => {
                            this.toastr.success(
                                "Strength & Improvements Delete successfully.",
                                "Success"
                            );
                            window.location.reload();
                        },
                        (error) => {
                            this.toastr.error(
                                "Strength & Improvements Not Delete .",
                                "Error"
                            );
                        }
                    );
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
                        "Your Strength & Improvements  is safe :)",
                        "error"
                    );
                }
            });
    }

    editCareer(i: any, strongAreaModel: any) {
        this.button = "Update";
        this.peopleReviewObj = {};
        let id = this.peopleReview[i].people_review_id;
        if (id != undefined) {
            this.peopleService.getSingleData(id).subscribe((data) => {
                this.peopleReviewObj = data.people_review[0];
                console.log("editeeeee", this.peopleReviewObj);

            });

            this.modalService.open(strongAreaModel, {
                scrollable: true,
                ariaLabelledBy: "job-chart",
                backdrop: "static",
                keyboard: true,
                windowClass: "my_custom_class",
            });
        }
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
