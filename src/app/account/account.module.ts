import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';

import { NgbRatingModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './change-password/change.password.component';

@NgModule({
  declarations: [
    LoginComponent,
	ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    NgbModule
  ]
})
export class AccountModule { }
