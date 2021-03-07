import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { CustomError } from "../../models/common/custom-error.model";
import { errorMessageField } from "../../constants/error";
import { LocalStorageService } from "../common/local-storage.service";
import { ApiService } from "../common/api.service";
import { MomentService } from "../common/moment.service";

@Injectable()
export class ErrorLogService {
    private newLine: string = "\n";
    private separateLine: string = "\n=====================================================\n";
    private apiService: ApiService;
    intervalAllowToCheckStorageErrorLog: number = 3000;

    constructor( private injector: Injector, private localStorageService: LocalStorageService, private momentService: MomentService ) {
    }

    /**
     * Commits error logs to API If log can not then save error to storage.
     *
     * @param {string} errorMessage
     *          Given error context
     */
    public handleErrorLog( errorMessage: string ): void {
        let generatedMessage = this.generateErrorMessage( errorMessage );
        this.handleErrorMessages( generatedMessage );
    }

    /**
     * Generates error log to commit to api.
     *
     * @param {string} errorMessage
     *          Input error that need to be generated
     * @returns {string}
     *          Generated string from input error
     */
    public generateErrorMessage( errorMessage: string ): string {
        let messages: string[] = [];

        messages.push( errorMessageField.title );
        messages.push( errorMessage );
        messages.push( `Occurred DateTime: ${this.momentService.getDateTimeToday()}` );
        messages.push( `${errorMessageField.location}: ${this.getCurrentLocation()}` );
        messages.push( `${errorMessageField.localstorage}:` );
        for ( let i: number = 0; i < this.localStorageService.getLength(); i++ ) {
            let key: string = this.localStorageService.getKey( i );
            if ( key && key != errorMessageField.errorBackupLog ) {
                messages.push( `\t${key}: ${this.localStorageService.getStringItem( key )}` );
            }
        }

        return messages.join( this.newLine );
    }

    /**
     * Sends error log to server.
     *
     * @param {string} errorMessage
     *          Given errorMessage
     * @returns {Observable<number>}
     *          The number of response status wrapped by Observable
     */
    public sendErrorLog( errorMessage: string ): Observable<number> {
        this.setApiService();
        let customError: CustomError = new CustomError( errorMessage );
        return this.apiService.postDataAndGetResponseStatusWithoutCatchError( '/v1/logs/frontend/error', customError );
    }

    public commitAvailableErrorLog(): void {
        let backupErrorLog: string = this.localStorageService.getStringItem( errorMessageField.errorBackupLog );

        if ( backupErrorLog ) {
            this.sendErrorLog( backupErrorLog ).subscribe(
                response => {
                    this.cleanBackupStorageErrorLog();
                },
                error => {
                }
            )
        }
    }

    handleErrorMessages( errorMessage: string ): void {

        let combinedMessage: string = this.combineErrorMessages( errorMessage );
        if ( combinedMessage ) {
            this.sendErrorLog( combinedMessage ).subscribe(
                response => {
                    this.cleanBackupStorageErrorLog();
                },
                error => {
                    this.backupErrorLogToStorage( combinedMessage );
                }
            )
        }
    }

    combineErrorMessages( errorMessage: string ): string {

        let combinedMessage: string = errorMessage;
        let backupErrorLog: string = this.localStorageService.getStringItem( errorMessageField.errorBackupLog );
        if ( errorMessage && backupErrorLog ) {
            combinedMessage = errorMessage.concat( this.separateLine ).concat( backupErrorLog );
        } else if ( backupErrorLog ) {
            combinedMessage = backupErrorLog
        }

        return combinedMessage;
    }

    backupErrorLogToStorage( message: string ): void {
        this.localStorageService.setItem( errorMessageField.errorBackupLog, message );
    }

    cleanBackupStorageErrorLog(): void {
        this.localStorageService.setItem( errorMessageField.errorBackupLog, '' );
    }

    getCurrentLocation(): string {
        return window.location.href;
    }

    private setApiService(): void {
        if ( !this.apiService ) {
            this.apiService = this.injector.get( ApiService );
        }
    }
}