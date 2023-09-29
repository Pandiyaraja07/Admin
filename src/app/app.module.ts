import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { PagesModule } from './pages/pages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ExtrapagesModule } from './extrapages/extrapages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxFileDropModule } from 'ngx-file-drop';

import * as echarts from 'echarts';

import { AuthInterceptor } from './auth.interceptor';
import { CacheRouteReuseStrategy } from './core/helpers/cache-route-reuse.strategy';
import { RouteReuseStrategy } from '@angular/router';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgSelectModule,
        BrowserModule,
        NgxFileDropModule,
        AppRoutingModule,
        PagesModule,
        LayoutsModule,
        NgbModule,
        HttpClientModule,
        ExtrapagesModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
		NgProgressModule,
		NgProgressHttpModule,
        NgxEchartsModule.forRoot({
            echarts
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: RouteReuseStrategy, useClass: CacheRouteReuseStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
