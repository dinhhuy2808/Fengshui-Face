import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components';

@NgModule( {
    imports: [CommonModule, RouterModule, TranslateModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})

export class HeaderModule { }