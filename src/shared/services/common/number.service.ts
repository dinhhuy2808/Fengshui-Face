import { Injectable } from '@angular/core';

@Injectable()
export class NumberService {

    constructor() { }

    /**
     * Get the signum of a number.
     * @param {number} A number.
     * @return {string} The signum of a number.
     */
    getSignumOf( num: number ): string {
        return num >= 0 ? '+' : '-';
    }
    
    /**
     * Get the absolute value of a number.
     * @param {number} A number.
     * @return {number} The absolute value of a number.
     */
    getAbsoluteValueOf( num: number ): number {
        return Math.abs(num);
    }
}
