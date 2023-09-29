import { ActivatedRoute, } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUser;
        console.log("canActivate------",currentUser)
        //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            // logged in 
            if (route.data.role) {
                // check page permissions
                if (!(route.data.role.includes(currentUser.tempRole))) {
                    this.router.navigate(['/']);
                    return false;
                }
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
