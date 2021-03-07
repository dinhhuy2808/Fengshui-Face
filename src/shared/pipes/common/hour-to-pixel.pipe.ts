import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Thousands separator.
 */
@Pipe( { name: 'hourToPixel' })
@Injectable()
export class HourToPixelPipe implements PipeTransform {

    transform( num: number ): string {
        if ( !num ) {
            return '0';
        }
        var roundValue = 60*(Math.round(num*-1/100)*-1);
        var value =  60*(((num/100)-Math.round(num*-1/100)*-1)/0.6);
        return roundValue+value+'px';
    }
}


