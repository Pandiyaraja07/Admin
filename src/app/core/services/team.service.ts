import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeamMemberService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });
    //not in use
    getTeamMembers(flId?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-team-members/' + flId;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }


}
