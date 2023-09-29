import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BehaviorMasterService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    getBehaviorDomain(obj?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-behavior-domain-master';
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getBehaviorSubDomain(): Observable<any> {
        const endPoint = this.apiUrl + '/behavior-subdomain-master';
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getBehaviorSubDomainFilter(domain?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-subdomain-filter/' + domain;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getBehaviorLevel1Filter(subdomain?: any): Observable<any> {
        const endPoint = this.apiUrl + '/behavior-level1-trait/' + subdomain;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

}
