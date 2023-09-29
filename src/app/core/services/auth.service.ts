import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { roles } from "../../../environments/roles";

const appRoles = roles;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private rootURL = environment.rootUrl;

    private currentUserSubject!: BehaviorSubject<any>;

    private bc = new BroadcastChannel('test_channel');

    constructor(private http: HttpClient,
        private toastr: ToastrService,
    ) {
        
        //this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));

        const currentUserString = localStorage.getItem('currentUser');

        if (currentUserString !== null) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(currentUserString));
        }

        this.bc.onmessage = function (ev) {
            if (ev.data == "sgri_reload") {
                window.location.reload();
            }
        }
    }

    /**
     * current user
     */
    public get currentUser() {
        console.log("authservice -- currentUser",this.currentUserSubject)
        return this.currentUserSubject?.value;
    }

    updateUser(currentUser: any) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.currentUserSubject.next(currentUser);
        this.bc.postMessage("sgri_reload");
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        const credentials = { "username": email, "password": password };
        return this.http.post(this.rootURL + '/sgri/auth', credentials)
            .pipe(map((data: any)=> {
                //console.log(data,'login ttttttttttttttdatas')

                if (data && data['statusCode'] == 200) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    //get the Grid model.
                    let value = localStorage.getItem('currentUser'); //"gridGrid" is component name + component id.
                    console.log(value,"localStorage check");
                    
                   

                    this.currentUserSubject.next(data);
                    console.log(this.currentUserSubject.next(data),'login datas')
                    // this.toastr.success("Logged In successfully.", "Success");
                    return data;
                } else {
                    console.log(data['message'],"error message")
                    this.toastr.error(data['message'], "Error");
                }
                this.currentUserSubject.next(null);
                return null;
            }));
    }


    /**
     * Logout the user
     */
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    refreshToken() {
        return this.http.post(this.rootURL + '/sgri/refreshToken', { "refresh_token": this.currentUser['refreshToken'] })
            .pipe(map((data: any) => {
                if (data) {
                    let currentUser = this.currentUser;
                    currentUser.accessToken = data['accessToken'];
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    this.currentUserSubject.next(currentUser);
                    return data;
                }
                return null;
            }));
    }

    changePassword(currentPassword: any, newPassword: any) {
        const credentials = { "current": currentPassword, "new": newPassword };
        return this.http.post(this.rootURL + '/sgri/changePassword', credentials)
            .pipe(map((data: any) => {
                if (data && data['statusCode'] == 200) {
                    this.toastr.success("Password changed successfully.", "Success");
                    return data;
                } else {
                    this.toastr.error(data['message'], "Error");
                }
                return null;
            }));
    }

    isCD() {
        if (this.currentUser['role'] == appRoles.roles[0])
            return true
        return false
    }

    isFL(temp?: any) {
        if(temp == "temp"){            
            if (this.currentUser['tempRole'] == appRoles.roles[2])
                return true
        }
        else if (this.currentUser['role'] == appRoles.roles[2]){
            return true
        }
        else{
            return false
        }
    
        return false
    }

    isHR() {
        if (this.currentUser['role'] == appRoles.roles[1])
            return true
        return false
    }

    isSupervisor(temp?: any) {
        if(temp == "temp"){            
            if (this.currentUser['tempRole'] == appRoles.roles[3])
                return true
        }
        else if (this.currentUser['role'] == appRoles.roles[3]){
            return true
        }
        else{
            return false
        }
    
        return false
    }

    isEmployee(temp?: any) {
        if(temp == "temp"){            
            if (this.currentUser['tempRole'] == appRoles.roles[4])
                return true
        }
        else if (this.currentUser['role'] == appRoles.roles[4]){
            return true
        }
        else{
            return false
        }
    
        return false
    }

    
}
