import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NumberToHourPipe } from './common/number-to-hour.pipe';
import { HourToPixelPipe } from './common/hour-to-pixel.pipe';
@NgModule( {
    declarations: [
        NumberToHourPipe, HourToPixelPipe
    ],
    exports: [NumberToHourPipe, HourToPixelPipe]
})

export class CommonPipeModule { }