import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class TechSkillMasterService {
    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        "content-type": "application/json",
        "x-hasura-admin-secret": environment.hasuraAdminSecret,
    });

    getTechDomainMaster({}): Observable<any> {
        return this.http.get(this.apiUrl + "/get-domains", {
            headers: this.httpHeaders,
        });
    }

    getTechCountDomainMaster(whereCondition?: any): Observable<any> {
        console.log("----------------domain where", whereCondition);

        const options = {
            condition: whereCondition,
        };
        return this.http.post(this.apiUrl + "/get-domain-count", options, {
            headers: this.httpHeaders,
        });
    }
    getEmpCount(flId: any): Observable<any> {
        return this.http.get(this.apiUrl + "/get-all-emp-count/" + flId, {
            headers: this.httpHeaders,
        });
    }
    getAllEmployeeCount(): Observable<any> {
        return this.http.get(this.apiUrl + "/get-all-employee-count", {
            headers: this.httpHeaders,
        });
    }
    getTechSubdomainMasterBySubDept(subdept: any): Observable<any> {
        return this.http.get(this.apiUrl + "/get-all-sub-domain/" + subdept, {
            headers: this.httpHeaders,
        });
    }
    getTechDomainMasterBySubDept(subdept: any): Observable<any> {
        return this.http.get(this.apiUrl + "/domains/" + subdept, {
            headers: this.httpHeaders,
        });
    }

    getTechSubDomainMaster(domain: any): Observable<any> {
        const endPoint = this.apiUrl + "/get-subdomains/" + domain;
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getTechSubDomainInfo({ }): Observable<any> {
        const endPoint = this.apiUrl + "/get-subdomain-info";
        return this.http.get(endPoint, { headers: this.httpHeaders });
    }
    getSubdomainInfo(subdomainId: any): Observable<any> {
        return this.http.get(this.apiUrl + "/get-subdomain-info/" + subdomainId, {
            headers: this.httpHeaders,
        });
    }
    getSubdomainWithEmpCount(
        domain?: any,
        whereCondition?: any
    ): Observable<any> {
        console.log("--------------service weher", whereCondition);
        const options = {
            condition: whereCondition,
        };
        if (domain) {
            return this.http.post(
                this.apiUrl + "/emp-subdomain-count/" + domain,
                options,
                { headers: this.httpHeaders }
            );
        } else {
            return this.http.post(this.apiUrl + "/emp-subdomain-count", options, {
                headers: this.httpHeaders,
            });
        }
    }
    getFlDept(flId: any): Observable<any> {
        return this.http.get(this.apiUrl + "/get-fl-dept/" + flId, {
            headers: this.httpHeaders,
        });
    }
    getAllDeptMaster({ }): Observable<any> {
        return this.http.get(this.apiUrl + "/get-all-dept/", {
            headers: this.httpHeaders,
        });
    }
    getAllSubDeptMaster({ }): Observable<any> {
        return this.http.get(this.apiUrl + "/get-all-subdept-master/", {
            headers: this.httpHeaders,
        });
    }
    getTeamDept(flId: any): Observable<any> {
        return this.http.get(this.apiUrl + "/get-team-dept/" + flId, {
            headers: this.httpHeaders,
        });
    }

    getAllSubdeptMaster(dept: any): Observable<any> {
        return this.http.get(this.apiUrl + "/get-all-subdept/" + dept, {
            headers: this.httpHeaders,
        });
    }

    getFlSubdept(flId: any, dept_id: any): Observable<any> {
        return this.http.get(
            this.apiUrl + "/get-fl-subdept/" + flId + "/" + dept_id,
            { headers: this.httpHeaders }
        );
    }

    getSunburstChartData(): Observable<any> {
        return this.http.get(
            this.rootURL + '/sunburst'
        );
    }

}
