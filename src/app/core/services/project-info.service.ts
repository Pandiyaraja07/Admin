import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectInfoService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    getProjectInfo(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-project-info-emp/' + sgId + '/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getProjectPendingCount(sgId?: any): Observable<any> {
        const endPoint = this.apiUrl + '/project-info-count/' + sgId;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    updateProjectApprovalStatus(obj?: any, id?: any): Observable<any> {
        console.log('-----------obj', obj);
        return this.http.put(this.rootURL + '/project-info-approval/' + id, obj);
    }

    updateProjectBulkApprovalStatus(obj?: any, sgId?: any): Observable<any> {
        console.log('-----------bulk obj', obj);
        return this.http.put(this.rootURL + '/project-info-bulk-approval/' + sgId, obj);
    }

    getPendingInfo(flId?: any, approval_status?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.rootURL + '/pending-info/' + flId + '/' + approval_status + '/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getAllPendingInfo(flId?: any, approval_status?: any, offset?: any, limit?: any , filter?: any): Observable<any> {
        const endPoint = this.rootURL + '/all-pending-info/' + flId + '/' + approval_status + '/' + offset + '/' + limit + '/' + filter;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getTeamApprovalProjectInfo(flId?: any, approval_status?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-team-approval-project-info/' + flId + '/' + approval_status + '/' + offset + '/' + limit;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getAllProjectInfo(offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-all-project-info/' + offset + '/' + limit, { headers: this.httpHeaders });
    }

    createProjectInfo(obj?: any): Observable<any> {
        return this.http.post(this.rootURL + '/project-info', obj)
    }

    updateProjectInfo(id?: any, obj?: any): Observable<any> {
        return this.http.put(this.rootURL + '/project-info/' + id, obj)
    }

    getProjectByPK(pk?: any): Observable<any> {
        const endPoint = this.rootURL + '/project-info/' + pk;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getProjectByProjectId(projectId?: any): Observable<any> {
        const endPoint = this.apiUrl + '/project-info/' + projectId;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    deleteProject(id: any): Observable<any> {
        return this.http.delete(this.rootURL + '/project-info/' + id);
    }

}
