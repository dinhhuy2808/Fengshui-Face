import { ErrorHandler, Injectable, Injector, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ApiService, LocalizationService, LocalStorageService } from './';
import {
    appReloadingMessage,
    localStorageName
} from '../../constants';
import { ErrorLogService } from "../logs";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    private apiService: ApiService;
    private localStorageService: LocalStorageService;
    private localizationService: LocalizationService;
    private errorLogsService: ErrorLogService;

    constructor( private injector: Injector ) { }

    /**
     * Handle error for different modes
     * 
     * @param {Error} error
     * @return {void}
     */
    handleError( error: Error ): void {

        if ( isDevMode() || !error || !error.stack ) {
            return;
        }

        this.localStorageService = this.injector.get( LocalStorageService );
        this.apiService = this.injector.get( ApiService );
        this.localizationService = this.injector.get( LocalizationService );
        this.errorLogsService = this.injector.get( ErrorLogService );

        let errorMessage: string = this.errorLogsService.generateErrorMessage( error.stack );
        let logApiResource: Observable<number> = this.errorLogsService.sendErrorLog( errorMessage ).pipe(
            finalize(
                () => {
                    let isAppRunning: boolean = this.localStorageService.getBooleanItem( localStorageName.isAppRunning );
                    if ( isAppRunning ) {
                        this.localStorageService.setBooleanItem( localStorageName.isAppRunning, false );
                        alert( this.localizationService.localize( appReloadingMessage ) );
                        this.reloadApp();
                    }
                }
            )
        );

        setTimeout( () => logApiResource.subscribe(
            () => {
            },
            error => {
                this.errorLogsService.backupErrorLogToStorage( errorMessage );
            }
        ) );
    }

    private reloadApp(): void {
        window.location.replace( '' );
    }
}
