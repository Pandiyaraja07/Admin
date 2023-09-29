import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service'

@Injectable({ providedIn: 'root' })

export class PermissionService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {

    }

    isCD(){
        return this.authService.isCD();
    }

    isFL(temp?: any){
        return this.authService.isFL(temp);
    }

    isHR(){
        return this.authService.isHR();
    }

    isSupervisor(temp?: any){
        return this.authService.isSupervisor(temp);
    }

    isEmployee(temp?: any) {
        return this.authService.isEmployee(temp);
    }


}