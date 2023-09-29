import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/auth.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });
    /**
     * Get All User
     */
    // getAll() {
    //     return this.http.get<User[]>(`api/users`);
    // }

    /**
     * Facked User Register
     */
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    //SGRI GET USER
    getUser(sgId?: any): Observable<any> {
        /*const httpParams = new HttpParams({
            fromObject: {
                sgId: sgId
            }
        });*/
        const endPoint = this.apiUrl + '/get-employee/' + sgId;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getUserById(sgId?: any): Observable<any> {
        const endPoint = this.rootURL + '/employee-info/' + sgId;
        return this.http.get(endPoint);
    }

    //cd and hr info
    getUserBasicInfo(sgId?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-employee-basic-info/' + sgId, { headers: this.httpHeaders })
    }
}
