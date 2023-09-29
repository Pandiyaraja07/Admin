import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobChatService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    getJobChatInfo(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        })
        const endPoint = this.apiUrl + '/get-job-chat-info/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    getOldJobChatInfo(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        })
        const endPoint = this.apiUrl + '/get-job-chat-reverse/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    getSingleJobChat(id: any): Observable<any> {
        return this.http.get(this.apiUrl + '/job-chat-info/' + id, { headers: this.httpHeaders });
    }

    createJobChat(obj?: any): Observable<any> {
        obj.job_chat.forEach((data: any, i:any) => {
            obj.job_chat[i].aspired_role = JSON.stringify(data.aspired_role);
        });
        console.log("serviceObj", obj);
        return this.http.post(this.rootURL + '/career-plan', obj, { headers: this.httpHeaders });
    }

    updateJobChat(id: any, obj: any): Observable<any> {
        console.log("serviceObj", obj);
        return this.http.put(this.rootURL + '/career-plan/' + id, obj, { headers: this.httpHeaders });
    }
    updateJobChatBulkApprovalStatus(sgId: any, obj: any): Observable<any> {
        return this.http.put(this.rootURL + '/job-chat-bulk-approval/' + sgId, obj);
    }
    getJobChatbyPK(pk?: any): Observable<any> {
        const endPoint = this.apiUrl + '/job-chat-info/' + pk;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getPendingJobChatCount(sgId?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/job-chat-count/' + sgId, { headers: this.httpHeaders });
    }
    getTeamApprovalJobChatInfo(flId?: any, approval_status?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-job-chat-approval-info/' + flId + '/' + approval_status + '/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getAllApprovalJobChatInfo(offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-all-job-chat/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    updateJobChatApprovalStatus(obj?: any, jobChatId?: any): Observable<any> {
        return this.http.put(this.rootURL + '/career-plan-approval/' + jobChatId, obj);
    }

    deleteCareerPlan(id?: any): Observable<any> {
        return this.http.delete(this.rootURL + '/career-plan/' + id);
    }

    deleteCareerPlanJobChat(id?: any): Observable<any> {
        return this.http.delete(this.rootURL + '/career-plan-job-chart/' + id);
    }

    getCareerPlanId(id: any): Observable<any> {
        return this.http.get(this.rootURL + '/career-plan/' + id);
    }
}