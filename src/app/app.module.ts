import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService
} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { DragModule } from './drag/drag.module';
import { LoaderComponent } from '../shared/components';
import { BaseModule } from '../shared/modules';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {FormsModule} from "@angular/forms";  

@NgModule({
  declarations: [
    AppComponent,LoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HomeModule,
    DragModule,
    BaseModule,
    FormsModule,
    TranslateModule.forRoot( {
        loader: {
            provide: TranslateLoader,
            useFactory: ( http: HttpClient ) => new TranslateHttpLoader( http, '/assets/i18n/', '.json' ),
            deps: [HttpClient]
        }
    })],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
