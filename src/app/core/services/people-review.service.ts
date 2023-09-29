import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PeopleReviewService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    getRecentPeopleReviews(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-employee-people-reviews/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    updatePeopleReviewApprovalStatus(obj?: any, id?: any): Observable<any> {
        console.log('-----------obj', obj);
        return this.http.put(this.rootURL + '/people-review-approval/' + id, obj);
    }

    peopleReviewBulkApprovalStatus(obj?: any, id?: any): Observable<any> {
        console.log('-----------obj', obj);
        return this.http.put(this.rootURL + '/people-review-bulk-approval/' + id, obj);
    }

    getPeopleReviewPendingCount(sgId?: any): Observable<any> {
        const endPoint = this.apiUrl + '/pending-people-review-count/' + sgId;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    getPeopleReviews(whereCondition: any, orderCondition: any, offset: any, limit: any): Observable<any> {
        const options = {
            "condition": whereCondition,
            "orderCondition": orderCondition
        }
        return this.http.post(this.apiUrl + '/people-reviews/' + offset + '/' + limit, options, { headers: this.httpHeaders })
    }

    getOldPeopleReviews(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-old-people-review/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    getEmpRecentPeopleReviews(sgId?: any, type?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-emp-recent-people-reviews/' + sgId + '/' + type;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    getEmpOldPeopleReviews(sgId?: any, type?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-emp-old-people-review/' + sgId + '/' + type;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    addPeopleReviews(obj?: any): Observable<any> {
        return this.http.post(this.rootURL + '/people-review', obj);
    }

    getAllPeopleReviews(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-all-people-review/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }

    getSingleData(id: any): Observable<any> {
        const endPoint = this.apiUrl + '/get-people-review/' + id;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }

    updatePeopleReviews(id: any, obj: any): Observable<any> {
        return this.http.put(this.rootURL + '/people-review/' + id, obj);
    }

    deletePeopleReviews(id: any): Observable<any> {
        return this.http.delete(this.rootURL + '/people-review/' + id);
    }
} 
