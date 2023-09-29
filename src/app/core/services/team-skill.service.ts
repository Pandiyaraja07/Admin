import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeamSkillService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });
    //update employee skill mapping & functional skill map list
    getTeamTechSkillMap(flId?: any, offset?: any, limit?: any, dept?: any, subdept?: any): Observable<any> {
        const endPoint = this.rootURL + '/team-skill-mapping/' + flId + '/' + offset + '/' + limit;
        let paramObj: any = {}
        if (dept) {
            paramObj = { params: { dept: dept } }
        }
        if (subdept) {
            paramObj['params'].subdept = subdept
        }
        return this.http.get(endPoint, paramObj);
    }
    getAllTeamByFlId(id: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-all-team-members/' + id, { headers: this.httpHeaders })
    }
    getAllTeamByHrId(): Observable<any> {
        return this.http.get(this.apiUrl + '/get-all-employees', { headers: this.httpHeaders })
    }
    //get team members - list emp in dashboard1 
    getTeamByFlId(flId: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-team-members/' + flId + '/' + offset + '/' + limit, { headers: this.httpHeaders })
    }
    getTeamMemberWithSkillDept(flId: any, dept: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-dept/' + flId + '/' + dept + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberWithSkillDomain(flId: any, dept: any, domain: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-domain/' + flId + '/' + dept + '/' + domain + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberWithSkillSubdomain(flId: any, dept: any, domain: any, subdomain: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-subdomain/' + flId + '/' + dept + '/' + domain + '/' + subdomain + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberBySubdomain(flId: any, subdomain: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-by-subdomain/' + flId + '/' + subdomain + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberWithSkillevel1(flId: any, level1Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-level1/' + flId + '/' + level1Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }

    //employee list for team
    getTeamMemberEmpListWithSkillevel1(flId: any, subdomain: any, level1Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-list-skill-level1/' + flId + '/' + subdomain + '/' + level1Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberEmpListWithSkillevel2(flId: any, subdomain: any, level1Id: any, level2Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-list-skill-level2/' + flId + '/' + subdomain + '/' + level1Id + '/' + level2Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberEmpListWithSkillevel3(flId: any, subdomain: any, level1Id: any, level2Id: any, level3Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-list-skill-level3/' + flId + '/' + subdomain + '/' + level1Id + '/' + level2Id + '/' + level3Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberListByDepth(flId: any, subdomain: any, techDepth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-list-by-depth/' + flId + '/' + subdomain + '/' + techDepth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberListWithSkillDepthtoLevel1(flId: any, subdomain: any, level1Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-list-skill-level1-depth/' + flId + '/' + subdomain + '/' + level1Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberListWithSkillDepthtoLevel2(flId: any, subdomain: any, level1Id: any, level2Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-list-skill-level2-depth/' + flId + '/' + subdomain + '/' + level1Id + '/' + level2Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberListWithSkillDepthtoLevel3(flId: any, subdomain: any, level1Id: any, level2Id: any, level3Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-list-skill-level3-depth/' + flId + '/' + subdomain + '/' + level1Id + '/' + level2Id + '/' + level3Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }


    getTeamMemberWithSkillevel2(flId: any, level1Id: any, level2Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-level2/' + flId + '/' + level1Id + '/' + level2Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberWithSkillevel3(flId: any, level1Id: any, level2Id: any, level3Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-level3/' + flId + '/' + level1Id + '/' + level2Id + '/' + level3Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberWithSkillDepthtoLevel2(flId: any, level1Id: any, level2Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-level2-depth/' + flId + '/' + level1Id + '/' + level2Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberWithSkillDepthtoLevel3(flId: any, level1Id: any, level2Id: any, level3Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-skill-level3-depth/' + flId + '/' + level1Id + '/' + level2Id + '/' + level3Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getTeamMemberByDepth(flId: any, techDepth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/team-member-by-depth/' + flId + '/' + techDepth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }

    getAllMember(offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-employees/' + offset + '/' + limit, { headers: this.httpHeaders })
    }
    getEmpWithSkillDept(dept: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-dept/' + dept + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillDomain(dept: any, domain: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-domain/' + dept + '/' + domain + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillSubdomain(dept: any, domain: any, subdomain: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-subdomain/' + dept + '/' + domain + '/' + subdomain + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpBySubdomain(dept_id: any, subdomain: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-by-subdomain/' + dept_id + '/' + subdomain + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillevel1(level1Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-level1/' + level1Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }

    //employee list
    getEmpListWithSkillevel1(dept_id: any, level1Id: any, subdomain: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-list-skill-level1/' + dept_id + '/' + level1Id + '/' + subdomain + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpListWithSkillevel2(dept_id: any, level1Id: any, subdomain: any, level2Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-list-skill-level2/' + dept_id + '/' + level1Id + '/' + subdomain + '/' + level2Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpListWithSkillevel3(dept_id: any, level1Id: any, subdomain: any, level2Id: any, level3Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-list-skill-level3/' + dept_id + '/' + level1Id + '/' + subdomain + '/' + level2Id + '/' + level3Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }

    getEmpListWithSkillDepthtoLevel3(dept_id: any, level1Id: any, subdomain: any, level2Id: any, level3Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-list-skill-level3-depth/' + dept_id + '/' + level1Id + '/' + subdomain + '/' + level2Id + '/' + level3Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpListWithSkillDepthtoLevel2(dept_id: any, level1Id: any, subdomain: any, level2Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-list-skill-level2-depth/' + dept_id + '/' + level1Id + '/' + subdomain + '/' + level2Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    //search with all 3 level skills
    getEmpListWithSkillDepthtoLevel1(dept_id: any, level1Id: any, subdomain: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-list-skill-level1-depth/' + dept_id + '/' + level1Id + '/' + subdomain + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getAllEmpListByDepth(dept_id: any, subdomain: any, techDepth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-list-by-depth/' + dept_id + '/' + subdomain + '/' + techDepth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }


    getEmpOnlyForlevel2(level2Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-level2-emp/' + level2Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpOnlyForlevel3(level3Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-level3-emp/' + level3Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillevel2(level1Id: any, level2Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-level2/' + level1Id + '/' + level2Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillevel3(level1Id: any, level2Id: any, level3Id: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-level3/' + level1Id + '/' + level2Id + '/' + level3Id + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillDepthtoLevel2(level1Id: any, level2Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-level2-depth/' + level1Id + '/' + level2Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillLevel2Depth(level2Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-level2-depth/' + level2Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillLevel1Depth(level1Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-level1-depth/' + level1Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillDepthtoLevel3(level1Id: any, level2Id: any, level3Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-skill-level3-depth/' + level1Id + '/' + level2Id + '/' + level3Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getEmpWithSkillLevel3Depth(level3Id: any, depth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-level3-depth/' + level3Id + '/' + depth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getAllEmpByDepth(dept_id: any, techDepth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-by-depth/' + dept_id + '/' + techDepth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getAllEmpDeptDepth(dept: any, techDepth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-dept-depth/' + dept + '/' + techDepth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }

    getAllEmpDomainDepth(dept_id: any, domain: any, techDepth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-domain-depth/' + dept_id + '/' + domain + '/' + techDepth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }
    getAllEmpSubdomainDepth(dept_id: any, subdomain: any, techDepth: any, offset?: any, limit?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/filter-emp-subdomain-depth/' + dept_id + '/' + subdomain + '/' + techDepth + '/' + offset + '/' + limit, { headers: this.httpHeaders });
    }




    createFunctionalSkillMap(objData?: any): Observable<any> {
        return this.http.post(this.rootURL + '/team-skill', objData);
    }

    UpdateFunctionalSkillMap(objData?: any, teamSkilId?: any): Observable<any> {
        return this.http.put(this.rootURL + '/team-skill/' + teamSkilId, objData);
    }

    getTeamEmpTechSkillToUpdate(flId?: any, sgId?: any, offset?: any, limit?: any): Observable<any> {
        //const endPoint = this.rootURL + '/emp-tech-skill-map/' + flId + '/' + offset + '/' + limit;
        const endPoint = this.rootURL + '/get-team-emp-skill/' + flId + '/' + sgId + '/' + offset + '/' + limit;
        return this.http.get(endPoint);
    }

    getTeam(flId?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.rootURL + '/get-team/' + flId + '/' + offset + '/' + limit;
        return this.http.get(endPoint);
    }

    teamSkillSettingInfo(obj: any): Observable<any> {
        return this.http.post(this.rootURL + '/team-skill-settings', obj);
    }

    getTeamSkillSettingInfo(): Observable<any> {
        console.log(this.apiUrl);
        return this.http.get(this.apiUrl + '/settings', { headers: this.httpHeaders } );
    }

    getAllEmployee(obj?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.rootURL + '/get-employee/' + offset + '/' + limit;
        return this.http.get(endPoint, { params: obj });
    }

    getTeamFilter(objData?: any, flId?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.rootURL + '/get-team-filter/' + flId + '/' + offset + '/' + limit;
        return this.http.get(endPoint, objData);
    }
    getAllEmployeeFilter(objData?: any, offset?: any, limit?: any): Observable<any> {
        const endPoint = this.rootURL + '/get-employee-filter/' + offset + '/' + limit;
        return this.http.get(endPoint, { params: objData });
    }
    getTechSkillComment($teamSkillId: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-technical-skill-comments/' + $teamSkillId, { headers: this.httpHeaders });
    }
    
    getTeamTechSkillComment($flId: any, $teamSkillId: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-team-technical-skill-comments/' + $flId + '/' + $teamSkillId, { headers: this.httpHeaders });
    }

    updateComments(obj: any, id: any): Observable<any> {
        return this.http.put(this.rootURL + '/team-skill-comments/' + id, obj);
    }

    deleteFunctionalRow(id: any): Observable<any> {
        return this.http.delete(this.rootURL + '/team-skill/' + id);
    }

    getTeamSkillInfo(team_skill_id?: any): Observable<any> {
        return this.http.get(this.apiUrl + '/get-team-skill-info/' + team_skill_id, { headers: this.httpHeaders });
    }

    getTeamSkillDeleteStatus(team_skill_id?: any, deletestatus?: any): Observable<any> {
        return this.http.put(this.rootURL + '/team-skill-deletestatus/' + team_skill_id + '/' + deletestatus, { headers: this.httpHeaders });
    }

    getEmpLisTForAllTech(whereCondition?: any, flWhereCondition?: any, offset?: any, limit?: any): Observable<any> {
        console.log('getEmpLisTForAllTeach: ', whereCondition);

        const options = {
            "condition": whereCondition,
            "flId": flWhereCondition
        }
        return this.http.post(this.apiUrl + '/get-emp-list-for-all-tech/' + offset + '/' + limit, options, { headers: this.httpHeaders });
    }
}
