import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class AdditionalSkillService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });
    private formHttpHeaders = new HttpHeaders({
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    getRecentAdditionalSkill(sgId?: any, skillType?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit,
                skillType: skillType
            }
        });
        const endPoint = this.apiUrl + `/get-additional-skills/${sgId}/${skillType}/${offset}/${limit}`;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    getAdditionalSkill(sgId?: any, skillType?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + `/get-additional-skills/${sgId}/${skillType}/${offset}/${limit}`;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getOldAdditionalSkill(sgId?: any, skillType?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + `/get-additional-details/${sgId}/${skillType}/${offset}/${limit}`;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getAdditionalSkillId(id?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-additional-skill/' + id, { headers: this.httpHeaders });
    }

    getTeamApprovalAdditionalSkillInfo(flId?: any, approval_status?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-additional-skill-approval-info/' + flId + '/' + approval_status + '/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getAllAdditionalSkillInfo(offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-all-additional-skill/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    createAdditionalSkill(obj?: any): Observable<any> {
        return this.http.post(this.rootURL + '/additional-skill', obj, { headers: this.formHttpHeaders });
    }

    UpdateAdditionalSkill(id?: any, obj?: any): Observable<any> {
        return this.http.put(this.rootURL + '/additional-skill/' + id, obj, { headers: this.formHttpHeaders });
    }
    UpdateApprovalAdditionalSkill(obj?: any, id?: any): Observable<any> {
        return this.http.put(this.rootURL + '/additional-skill-approval-status/' + id, obj);
    }
    updateAdditionalSkillBulkApprovalStatus(obj?: any, sgId?: any): Observable<any> {
        return this.http.put(this.rootURL + '/additional-skill-bulk-approval-status/' + sgId, obj);
    }

    getPendingAdditionalSkillCount(sgId?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/pending-additional-skill-count/' + sgId, { headers: this.httpHeaders });
    }

    deleteAdditionalDetails(id: any): Observable<any> {
        return this.http.delete(this.rootURL + '/additional-skill/' + id);
    }

    getFile(obj?: any): Observable<any> {
        return this.http.get(obj, { headers: this.formHttpHeaders });
    }
}