import { BrowserModule } from '@angular/platform-browser';
import { DragComponent } from './drag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonPipeModule } from '../../shared/pipes/common-pipe.module';
@NgModule( {
    declarations: [
        DragComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatTabsModule,
        CommonPipeModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DragModule { }