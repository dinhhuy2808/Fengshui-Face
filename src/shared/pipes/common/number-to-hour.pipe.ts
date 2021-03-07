import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Thousands separator.
 */
@Pipe( { name: 'numberToHour' })
@Injectable()
export class NumberToHourPipe implements PipeTransform {

    transform( num: number ): string {
        if ( !num ) {
            return '0';
        }
        var value = Math.round(num)+''
        return value.substring(0,value.length-2)+":"+value.substring(value.length-2,value.length);
    }
}


