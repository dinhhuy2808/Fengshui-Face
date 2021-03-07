import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from './header.module';

@NgModule( {
    exports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,
        HeaderModule,
    ]
})

export class BaseModule { }