import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { query } from '@angular/animations';


@Injectable({
    providedIn: 'root'
})
export class TechnicalSkillService {

    constructor(private http: HttpClient) { }

    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });
    getRecentTechSkill(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                offset: offset,
                limit: limit
            }
        });
        const endPoint = this.apiUrl + '/get-tech-skill-info/' + sgId;
        return this.http.get(endPoint, { params: httpParams, headers: this.httpHeaders });
    }
    getPendingTechSkillCount(sgId?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/skill-mapping-count/' + sgId, { headers: this.httpHeaders });
    }
    getPendingAuthorityTechSkillCount(sgId?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/skill-mapping-authority-count/' + sgId, { headers: this.httpHeaders });
    }
    getRecentTechnicalSkillMap(sgId?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.rootURL + '/get-emp-tech-skill-map/' + sgId + '/' + offset + '/' + limit;
        return this.http.get(endPoint);
    }

    //get all authority tech depth data for approval
    getPendingApprovalListOfAuthority(): Observable<any> {
        return this.http.get(this.apiUrl + '/get-all-authority-list', { headers: this.httpHeaders });
    }
    updateAuthorityDepthApprovalStatus(obj?: any, skillMapId?: any): Observable<any> {
        return this.http.put(this.rootURL + '/update-authority-depth/' + skillMapId, obj)
    }

    /*getTeamTechSkillMappingFilter(flId?: any, offset?: any, limit?: any): Observable<any> {
      return this.http.get(this.rootURL + '/team-skill-map/' + flId + '/' + offset + '/' + limit);
    }*/
    createSkillMap(obj?: any): Observable<any> {
        return this.http.post(this.rootURL + '/skill-mapping', obj)
    }
    updateSkillMap(skillMapId?: any, obj?: any): Observable<any> {
        return this.http.put(this.rootURL + '/skill-mapping/' + skillMapId, obj)
    }
    getQualitativeComment(skillMapId: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-qualitative-comment/' + skillMapId, { headers: this.httpHeaders })
    }
    updateQualitativeComment(skillMapId?: any, obj?: any): Observable<any> {
        return this.http.put(this.rootURL + '/update-qualitative-comment/' + skillMapId, obj)
    }
    updateSkillMappingBulkApproval(sgId?: any, obj?: any): Observable<any> {
        return this.http.put(this.rootURL + '/skill-mapping-bulk-approval/' + sgId, obj)
    }

    //Project Consultant
    getProjectConsultant(offset?: any, limit?: any, obj?: any): Observable<any> {
        return this.http.get(this.rootURL + '/project-consultant/' + offset + '/' + limit, { params: obj });
    }
    getProjectConsultantByDepth(obj?: any, techDepth?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/depth-project-consultant/' + techDepth + '/' + offset + '/' + limit, { params: obj });
    }
    getProjectConsultantFilter(obj: any, offset: any, limit: any): Observable<any> {
        return this.http.get(this.rootURL + '/project-consultant-filter/' + offset + '/' + limit, { params: obj });
    }

    //Skill Gap Matrix
    getAllTechSkillGapMatrix(obj?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/skill-gap-matrix/' + offset + '/' + limit, { params: obj });
    }
    getTeamTechSkillGapMatrix(obj?: any, flId?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/team-skill-gap-matrix/' + flId + '/' + offset + '/' + limit, { params: obj });
    }
    skillGapMatrixTeamFilterLevel2(flId: any, obj?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: obj
        });
        return this.http.get(this.apiUrl + '/team-skill-gap-matrix-filter-level2/' + flId, { params: httpParams, headers: this.httpHeaders })
    }
    skillGapMatrixTeamFilterLevel3(flId: any, obj?: any): Observable<any> {
        const httpParams = new HttpParams({
            fromObject: {
                "domain": obj.domain,
                "subdomain": obj.subdomain,
                "level1": obj.level1,
                "level2": obj.level2,
                "level3": obj.level3
            }
        });
        return this.http.get(this.apiUrl + '/team-skill-gap-matrix-filter-level3/' + flId, { params: httpParams, headers: this.httpHeaders })
    }
    //project Consultant
    projectConsultant(offset: any, limit: any, obj?: any): Observable<any> {
        return this.http.post(this.apiUrl + '/project-consultant-search/' + offset + '/' + limit, obj, { headers: this.httpHeaders })
    }

    //profile technical skill
    getProfileTechSkillMappingByApprovalStatus(sgId?: any, approvalStatus?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/profile-pending-tech-skill-map/' + sgId + '/' + approvalStatus + '/' + offset + '/' + limit);
    }
    getAllTechSkillMappingByDepth(depth?: any, approvalStatus?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/depth-tech-skill-map/' + depth + '/' + approvalStatus + '/' + offset + '/' + limit);
    }

    //List all employee 
    listTeamSkillMapping(obj?: any, flId?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/list-team-skill-mapping/' + flId + '/' + offset + '/' + limit, { params: obj })
    }
    listTeamSkillMappingFilter(obj?: any, flId?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/list-team-skill-mapping-filter/' + flId + '/' + offset + '/' + limit, { params: obj })
    }

    listAllSkillMapping(obj?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/list-all-emp-skill-mapping/' + offset + '/' + limit, { params: obj })
    }

    //used IN all technical skill list - team
    getTeamTechSkillMapping(flId?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/team-skill-mapping/' + flId + '/' + offset + '/' + limit);
    }
    getTeamTechSkillMappingFilter(obj?: any, flId?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/team-skill-mapping-filter/' + flId + '/' + offset + '/' + limit, { params: obj });
    }

    getEmpPendingTechSkillCount(sgId?: any): Observable<any> {
        return this.http.get(this.rootURL + '/emp-tech-skill-map/' + sgId);
    }
    getEmpAllTechSkillMapping(sgId?: any, offset?: any, limit?: any, option?:any, tempRole?: any): Observable<any> {

       let obj = {
            'option' : option,
            'tempRole': tempRole
        }
     
        return this.http.get(this.rootURL + '/emp-tech-skill-map/' + sgId + '/' + offset + '/' + limit, { params: obj, headers: this.httpHeaders });
    }
    
    getTechSkillMappingByPk(skillMapId?: any): Observable<any> {
        return this.http.get(this.rootURL + '/emp-tech-skill-map-pk/' + skillMapId);
    }

    getAllEmpSkillByDepth(techDepth?: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/skill-mapping/' + techDepth + '/' + offset + '/' + limit);
    }
    getEmpSkillBySkillAndDepth(teamSkillId?: any, techDepth?: any) {
        return this.http.get(this.rootURL + '/depth-skill-mapping/' + teamSkillId + '/' + techDepth);
    }
    getAllEmpSKillAPI(offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.rootURL + '/skill-mapping/' + offset + '/' + limit);
    }
    getEmpechSkillCount(sgId?: any, domain?: any): Observable<any> {
        let obj = {
            'domain' : domain,
        }
        return this.http.get(this.rootURL + '/emp-tech-graph-count/' + sgId, { params: obj });
    }
    getEmpBehavioralSkillCount(sgId?: any, domain?: any): Observable<any> {
        let obj = {
            'domain' : domain,
        }
        return this.http.get(this.rootURL + '/emp-behavioral-graph-count/' + sgId, { params: obj });
    }
    getHideApprovalStatus(): Observable<any> {
        return this.http.get(this.apiUrl + '/settings', { headers: this.httpHeaders });
    }
}
