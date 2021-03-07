import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BaseModule } from '../../shared/modules';
import { CommonPipeModule } from '../../shared/pipes/common-pipe.module';

import { FormsModule } from "@angular/forms";
@NgModule( {
    imports: [
        BaseModule, FormsModule,CommonPipeModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }