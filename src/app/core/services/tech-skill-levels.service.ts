import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TechSkillLevelMasterService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    getTechSkillLevelsByDomain(domain: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-domain-tech-skill-level/' + domain;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getTechSkillLevelsBySubDomain(subdomain: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-subdomain-tech-skill-level/' + subdomain;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getTechSkillLevel(subdomain: any, level: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-tech-skills/' + subdomain + '/' + level;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getTechSkillLevelByLevel(): Observable<any> {
        return this.http.get(this.apiUrl + '/get-tech-skill-levels', { headers: this.httpHeaders });
    }
}
