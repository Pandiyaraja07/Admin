import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddAdditionalSkillComponent } from 'src/app/pages/additional-skill/add-additional-skill/add-additional-skill.component';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.baseUrlHasura;
    rootURL = environment.rootUrl;
    private httpHeaders = new HttpHeaders({
        'content-type': 'application/json',
        'x-hasura-admin-secret': environment.hasuraAdminSecret
    });

    bulkUpload(file: any,skillExists:any): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('skillExists',skillExists);
        return this.http.post(`${this.rootURL}/bulk-upload`, formData, {
            reportProgress: true,
            observe: 'events',
        });
    }


}
