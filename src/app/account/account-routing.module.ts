import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change.password.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'change-password', 
	component: ChangePasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
