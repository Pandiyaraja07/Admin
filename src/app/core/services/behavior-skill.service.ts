import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BehaviorSkillService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    getRecentBehaviorSkillMap(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                approvalStatus: 0,
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-emp-behavior-skill/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }
    getPendinBehaviorSkillMapCount(sgId?: any): Observable<any> {
        const endPoint = this.apiUrl + '/behavior-skill-mapping-count/' + sgId;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getPendinBehaviorSkillMap(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-emp-pending-behavior-skill/' + sgId + '/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getEmpBehaviorSkillMap(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-employee-behavior-skills/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    updateBehaviorSkillMappingBulkApproval(sgId?: any, obj?: any): Observable<any> {
        return this.http.put(this.rootURL + '/behavior-skill-mapping-bulk-approval/' + sgId, obj)
    }

    // getBehaviorSkillPendingApproval(sgId?: any, obj?: any): Observable<any> {
    //   return this.http.put(this.rootURL + '/behavior-skill-mapping-bulk-approval/' + sgId, obj)
    // }
    createBehaviorSkill(obj?: any): Observable<any> {
        return this.http.post(this.rootURL + '/behavior-skill-mapping', obj)
    }

    deleteBehaviorSKill(id?: any): Observable<any> {
        return this.http.delete(this.rootURL + '/emp-behavior-skill/' + id);
    }

    getBehaviorSkillId(id: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-behavior-skill-pk/' + id, { headers: this.httpHeaders })
    }

    UpdateBehaviorSkill(id: any, obj: any): Observable<any> {
        return this.http.put(this.rootURL + '/emp-behavior-skill/' + id, obj)
    }


}
