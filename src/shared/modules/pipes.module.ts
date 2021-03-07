import { NgModule } from '@angular/core';

import {
    ThousandsSeparatorPipe,
} from '../pipes';

@NgModule( {
    declarations: [
        ThousandsSeparatorPipe,
    ],
    exports: [
        ThousandsSeparatorPipe,
    ]
})

export class PipesModule { }