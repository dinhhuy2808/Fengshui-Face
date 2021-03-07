import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';

@Injectable()
export class MomentService {
    readonly days: any = 'days';
    readonly week: any = 'week';
    readonly month: any = 'month';
    readonly year: any = 'year';
    readonly longDateFormat: string = 'MMM DD, YYYY';
    readonly mediumDateFormat: string = 'MMM DD';
    readonly defaultDateFormat: string = 'YYYY-MM-DD';
    readonly defaultDateTimeFormat: string = 'YYYY-MM-DD HH:mm:ss';
    readonly slashDateFormat: string = 'YYYY/MM/DD';
    readonly longMonthFormat: string = 'MMM YYYY';
    readonly defaultMonthFormat: string = 'YYYY-MM';
    readonly monthFormat: string = 'YYYYMM';
    readonly dateTimeFormat: string = 'YYYYMMDDHHmmss';
    readonly dateRangeSeparator: string = ' ~ ';

    /**
     * Generate a number of unix time in seconds.
     * @return {number} A number of unix time in seconds.
     */
    getUnixTimeInSeconds(): number {
        return this.getMoment().unix();
    }

    /**
     * Generate a date range string by start/end date and a specified date format. 
     * @param {string} Start date in default date format.
     * @param {string} End date in default date format.
     * @param {string} A specified date format.
     * @return {string} A string of date range.
     */
    generateDateRange( startDate, endDate, dateFormat ): string {
        return this.getMomentDate( startDate ).format( dateFormat )
            + this.dateRangeSeparator
            + this.getMomentDate( endDate ).format( dateFormat );
    }

    /**
     * Format the date by default format.
     * @param {any} Date with type 'moment'.
     * @return {any} Date of a day in default format.
     */
    formatDate( momentDate: any, dateFormat: string = this.defaultDateFormat ): string {
        return momentDate.format( dateFormat );
    }

    /**
     * Format the month by default format.
     * @param {any} Date with type 'moment'.
     * @return {any} Month of a day in default format.
     */
    formatMonth( momentDate: any, monthFormat: string = this.defaultMonthFormat ): string {
        return momentDate.format( monthFormat );
    }

    /**
     * Get the date of first day of a month in default format.
     * @param {string} Month in default month format.
     * @return {string} First day of a month in default date format.
     */
    getStartDateOfMonth( month: string ): string {
        return month + '-01';
    }

    /**
     * Get the date of today in default format.
     * @return {any} Date of today in default format.
     */
    getDateToday(): string {
        return this.formatDate( this.getMoment() );
    }

    /**
     * Get the date time of today in 24h datetime format.
     * @return {any} Date of today in default format.
     */
    getDateTimeToday(): string {
        return this.formatDate( this.getMoment(), this.defaultDateTimeFormat );
    }

    /**
     * Get the date of a day n days before in default format.
     * @param {string} Number of the days before.
     * @return {any} Date of a day in default format.
     */
    getDateDaysBefore( numberOfDaysBefore: number ): string {
        return this.formatDate( this.getMomentDateDaysBefore( numberOfDaysBefore ) );
    }

    /**
     * Get the date of a specified day with type 'moment'.
     * @param {string} Date in default format.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentDate( date: string ): any {
        return moment( date );
    }

    /**
     * Get the date of a day n days before with type 'moment'.
     * @param {string} Number of the days before.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentDateDaysBefore( numberOfDaysBefore: number ): any {
        return this.getMoment().subtract( numberOfDaysBefore, this.days );
    }

    /**
     * Get the start date of this week with type 'moment'.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentStartDateOfThisWeek(): any {
        return this.getMoment().startOf( this.week );
    }

    /**
     * Get the end date of this week with type 'moment'.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentEndDateOfThisWeek(): any {
        return this.getMoment().endOf( this.week );
    }

    /**
     * Get the start date of latest weeks with type 'moment'.
     * @param {string} Number of the latest weeks.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentStartDateOfLatestWeeks( numberOfLatestWeeks: number ): any {
        return this.getMoment().subtract( numberOfLatestWeeks, this.week ).startOf( this.week );
    }

    /**
     * Get the end date of latest weeks with type 'moment'.
     * @param {string} Number of the latest weeks.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentEndDateOfLatestWeeks( numberOfLatestWeeks: number ): any {
        return this.getMoment().subtract( numberOfLatestWeeks, this.week ).endOf( this.week );
    }

    /**
     * Get the start date of this month with type 'moment'.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentStartDateOfThisMonth(): any {
        return this.getMoment().startOf( this.month );
    }

    /**
     * Get the end date of this month with type 'moment'.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentEndDateOfThisMonth(): any {
        return this.getMoment().endOf( this.month );
    }

    /**
     * Get the end date of month which is the month of given date.
     * @param {string} Date of a day in default format.
     * @return {string} Date of a day in default format.
     */
    getEndDateOfMonthByGivenDate( date: string ): string {
        return this.formatDate( moment( date ).endOf( 'month' ) );
    }

    /**
     * Get the start date of latest months with type 'moment'.
     * @param {string} Number of the latest months.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentStartDateOfLatestMonths( numberOfLatestMonths: number ): any {
        return this.getMoment().subtract( numberOfLatestMonths, this.month ).startOf( this.month );
    }

    /**
     * Get the end date of latest months with type 'moment'.
     * @param {string} Number of the latest months.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentEndDateOfLatestMonths( numberOfLatestMonths: number ): any {
        return this.getMoment().subtract( numberOfLatestMonths, this.month ).endOf( this.month );
    }

    /**
     * Get the start date of this year with type 'moment'.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentStartDateOfThisYear(): any {
        return this.getMoment().startOf( this.year );
    }

    /**
     * Get the end date of this year with type 'moment'.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentEndDateOfThisYear(): any {
        return this.getMoment().endOf( this.year );
    }

    /**
     * Get the start date of latest years with type 'moment'.
     * @param {string} Number of the latest years.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentStartDateOfLatestYears( numberOfLatestYears: number ): any {
        return this.getMoment().subtract( numberOfLatestYears, this.year ).startOf( this.year );
    }

    /**
     * Get the end date of latest years with type 'moment'.
     * @param {string} Number of the latest years.
     * @return {any} Date of a day with type 'moment'.
     */
    getMomentEndDateOfLatestYears( numberOfLatestYears: number ): any {
        return this.getMoment().subtract( numberOfLatestYears, this.year ).endOf( this.year );
    }

    /**
     * Get the month n months before in default format.
     * @param {string} Number of the months before.
     * @return {any} Month in default format.
     */
    getMonthMonthsBefore( numberOfMonthsBefore: number ): string {
        return this.formatMonth( this.getMomentStartDateOfLatestMonths( numberOfMonthsBefore ) );
    }

    /**
     * Get the month of today in default format.
     * @return {any} Month of today in default format.
     */
    getMonthToday(): string {
        return this.formatMonth( this.getMoment() );
    }

    /**
     * Get the month of date in specified format.
     * @return {any} Month of date in specified format.
     */
    getMonthOfDateWithFormat( date: string, monthFormat: string ): string {
        return this.formatMonth( this.getMomentDate( date ), monthFormat );
    }

    /**
     * Returns incremented date by days with formatted string as 'YYYY-MM-DD'.
     * @param {string} Date in default format
     * @param {number} duration of days to add
     * @return incremented date by days with formatted string as 'YYYY-MM-DD'
     */
    addDays( date: string, duration: number ): string {
        return this.formatDate( moment( date ).add( duration, this.days ) );
    }

    /**
     * Get the incremented date by days with type 'moment.Moment'.
     * @param {string} Date in default format.
     * @param {string} zoneId of publisher's country.
     * @param {number} duration of days to add
     * @return the incremented date by days with type 'moment.Moment'.
     */
    addDaysWithTimezone( date: string, zoneId: string, duration: number ): moment.Moment {
        return momentTz.tz( date, zoneId ).add( duration, 'days' );
    }

    /**
     * Get the incremented date by months with type 'moment.Moment'.
     * @param {string} Date in default format.
     * @param {string} zoneId of publisher's country.
     * @param {number} duration of months to add.
     * @return the incremented date by months with type 'moment.Moment'.
     */
    addMonthsWithTimezone( date: string, zoneId: string, duration: number ): moment.Moment {
        return momentTz.tz( date, zoneId ).add( duration, 'months' );
    }

    /**
     * Returns the period of days between 'startDate' and 'endDate'.
     * @param {startDate} the start date
     * @param {endDate} the end date
     * @return the period of days between 'startDate' and 'endDate'
     */
    getPeriodOfDays( startDate: string, endDate: string ): number {
        return moment( endDate ).diff( startDate, this.days );
    }

    /**
     * Returns the period of months between 'startDate' and 'endDate'.
     * @param {startDate} the start date
     * @param {endDate} the end date
     * @return the period of months between 'startDate' and 'endDate'
     */
    getPeriodOfMonths( startDate: string, endDate: string ): number {
        return moment( endDate ).diff( startDate, this.month );
    }

    /**
     * Get the date of today with type 'moment'.
     * @return {any} Date of today with type 'moment'.
     */
    getMoment(): any {
        return moment();
    }

    /**
     * Returns the formatted start date of previous month by 'numberOfMonthsBefore'.
     * @param {string} Date in default format
     * @param {number} duration of month to subtract
     * @return the formatted start date of previous month by 'numberOfMonthsBefore'
     */
    getStartDateOfPreviousMonth( date: string, numberOfMonthsBefore: number ): string {
        return this.formatDate( this.getMomentDate( date ).subtract( numberOfMonthsBefore,
                this.month ).startOf( this.month ) );
    }

    /**
     * Returns the formatted end date of previous month by 'numberOfMonthsBefore'.
     * @param {string} Date in default format
     * @param {number} duration of month to subtract
     * @return the formatted end date of previous month by 'numberOfMonthsBefore'
     */
    getEndDateOfPreviousMonth( date: string, numberOfMonthsBefore: number ): string {
        return this.formatDate( this.getMomentDate( date ).subtract( numberOfMonthsBefore,
                this.month ).endOf( this.month ) );
    }

    /**
     * Get the date of today with type 'moment.Moment' by given the zone ID.
     * @param {string} zoneId of publisher's country.
     * @return Date of today with type 'moment.Moment' by given the zone ID
     */
    getDateTimeWithTimezone( zoneId: string ): moment.Moment {
        return this.getMoment().tz( zoneId );
    }
}
