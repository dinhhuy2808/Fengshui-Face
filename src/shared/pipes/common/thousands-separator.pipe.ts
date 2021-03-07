import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Thousands separator.
 */
@Pipe( { name: 'thousandsSeparator' })
@Injectable()
export class ThousandsSeparatorPipe implements PipeTransform {

    transform( num: number ): string {
        if ( !num ) {
            return '0';
        }

        return num.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
    }
}


