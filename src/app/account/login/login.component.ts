import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';
import { LAYOUT_MODE } from '../../layouts/layouts.model';

import { LoginService } from '../../core/services/login.service';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

    // set the currenr year
    year: number = new Date().getFullYear();
    // Carousel navigation arrow show
    showNavigationArrows: any;
    loginForm!: FormGroup;
    submitted = false;
    error = '';
    returnUrl!: string;
    layout_mode!: string;
    fieldTextType!: boolean;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        public loginService: LoginService,
        private modalService: NgbModal
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUser) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.layout_mode = LAYOUT_MODE
        if (this.layout_mode === 'dark') {
            document.body.setAttribute("data-layout-mode", "dark");
        }
        //Validation Set
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        document.body.setAttribute('data-layout', 'vertical');
    }

    /**
       * position sweet alert
       * @param position modal content
       */

     position() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
        });
    }

    /**
     * timer sweet alert
     * @param timer modal content
     */
    timer() {
        let timerInterval: any;
        Swal.fire({
            html: '<img src="assets/images/SYNAPSE-LOGO.gif" width="100%" height="100%" >',
            timer: 5000,
            timerProgressBar: false,
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            width: '110%',
            heightAuto: false,
            didOpen: () => {
               // Swal.showLoading();
                timerInterval = setInterval(() => {
                    const content = Swal.getHtmlContainer();
                    if (content) {
                        const b: any = content.querySelector('b');
                        if (b) {
                            b.textContent = Swal.getTimerLeft();
                        }
                    }
                }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            // if (result.dismiss === Swal.DismissReason.timer) {
            //   //console.log('I was closed by the timer');
            // }
        });
    }


    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    /**3
     * Form submit
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
          } else {
            this.authService.login(this.f.email.value, this.f.password.value)
              .pipe(first())
              .subscribe({
                next: (data: any) => {
                
                  // if(data){
                  //     this.timer();
                  // }
                  this.router.navigate(['/']);
                },
                error: (error) => {
                    console.log("loginError",error)
                  this.error = error ? error : '';
                },
              });
          }
        }

    

    /**
     * Password Hide/Show
     */
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

}
