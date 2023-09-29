import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    currentUserValue: any;

    constructor(private http: HttpClient,
        private router: Router,) { }

    rootURL = environment.rootUrl;

    authentication(credentials?: any): Observable<any> {
        this.currentUserValue = true;
        return this.http.post(this.rootURL + '/sgri/auth', credentials);
    }

    /**
       * Returns the current user
       */
    /*public currentUser(): any {
      this.currentUserValue = true;
      return true;
    }
  */
    /**
      * Logout the user
      */
    logout() {
        this.currentUserValue = false;
    }
}
