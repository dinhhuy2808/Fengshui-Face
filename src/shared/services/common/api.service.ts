import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpResponse,
    HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { apiRequestHeader } from '../../constants';
import { env } from '../../../environments/environment';
import { JwtService } from "./jwt.service";
import { ErrorLogService } from "../logs/error-log.service";

@Injectable()
export class ApiService {

    constructor( private http: HttpClient,
        private router: Router,
        private jwtService: JwtService,
        private errorLogService: ErrorLogService ) {
    }

    /**
     * Send request by GET method and parse response to json.
     * @param {string} path - API url path.
     * @return {Observable<any>}
     */
    getData( path: string ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap(( requestOptions: any ) => {
                return this.http.get<any>( this.getBaseApiUrl() + path, requestOptions ).pipe(
                    map( this.extractBody ),
                    catchError( response => this.handleError( response ) )
                );
            })
        )
    }

    /**
     * Send request by GET method and receives response as text.
     *
     * @param {string} path - API url path.
     * @return {Observable<any>}
     */
    getPlainText( path: string ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap(( requestOptions: any ) => {
                requestOptions.responseType = 'text';
                return this.http.get<any>( this.getBaseApiUrl() + path, requestOptions ).pipe(
                    map( this.extractBody ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * Send request by GET method without JWT and parse response to json.
     * @param {string} path - API url path.
     * @return {Observable<any>}
     */
    getDataAndExtractDataWithoutJwt( path: string ): Observable<any> {
        return this.http.get<any>( this.getBaseApiUrl() + path ).pipe(
            map( response => response ),
            catchError( response => this.handleError( response ) )
        );
    }

    /**
     * Send request by POST method and parse response to json.
     * @param {string} path API url path.
     * @param {any} data.
     * @return {Observable<any>}
     */
    postDataAndExtractData( path: string, data: any ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap(( requestOptions: any ) => {
                return this.http.post( this.getBaseApiUrl() + path, JSON.stringify( data ), requestOptions ).pipe(
                    map( response => response ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * Send request by POST method and parse response to json and check status.
     * @param {string} path - API url path.
     * @param {any} data.
     * @return {Observable<any>}
     */
    postDataAndExtractDataWithStatus( path: string, data: any ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap( requestOptions => {
                return this.http.post<any>( this.getBaseApiUrl() + path, JSON.stringify( data ), requestOptions ).pipe(
                    map(( response: HttpResponse<any> ) => this.extractDataWithStatus( response ) ),
                    catchError( error => this.handleError( error ) )
                );
            })
        );
    }

    /**
     * Send request by POST method and check response status.
     * @param {string} path - API url path.
     * @param {any} data.
     * @return {Observable<any>}
     */
    postDataAndExtractResult( path: string, data: any ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap( requestOptions => {
                return this.http.post<any>( this.getBaseApiUrl() + path, JSON.stringify( data ), requestOptions ).pipe(
                    map( this.extractResult ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * post data to api and get response status code.
     * @param {string} path - url path
     * @param {any} data
     * @returns {Observable<any>}
     */
    postDataAndGetResponseStatus( path: string, data: any ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap( requestOptions => {
                return this.http.post<any>( this.getBaseApiUrl() + path, JSON.stringify( data ), requestOptions ).pipe(
                    map(( response: HttpResponse<any> ) => response.status ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * posts data to api and get response status code.
     * @param {string} path - url path
     * @param {any} data
     * @returns {Observable<any>}
     */
    postDataAndGetResponseStatusWithoutCatchError( path: string, data: any ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap( requestOptions => {
                return this.http.post<any>( this.getBaseApiUrl() + path, JSON.stringify( data ), requestOptions ).pipe(
                    map(( response: HttpResponse<any> ) => response.status )
                );
            })
        );
    }

    /**
     * post data to api and get response status code.
     * @param {string} path - url path
     * @param {any} data
     * @returns {Observable<number>}
     */
    postDataAndGetResponseStatusWithoutJwt( path: string, data: any ): Observable<number> {
        return this.http.post( this.getBaseApiUrl() + path, JSON.stringify( data ),
            this.generateRequestOptions( apiRequestHeader.contentType ) ).pipe(
            map(( response: any ) => response.status ),
            catchError( this.handleErrorForResponse )
            );
    }

    /**
     * Send request by PUT method and parse response to json.
     * @param {string} path - API url path.
     * @param {any} data.
     * @return {Observable<any>}
     */
    putDataAndExtractData( path: string, data: any ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap( requestOptions => {
                return this.http.put( this.getBaseApiUrl() + path, JSON.stringify( data ), requestOptions ).pipe(
                    map(( response: any ) => this.extractBody( response ) ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * Send request by PUT method and check response status.
     * @param {string} path - API url path.
     * @param {any} data.
     * @return {Observable<boolean>}
     */
    putDataAndExtractResult( path: string, data: any ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap( requestOptions => {
                return this.http.put<any>( this.getBaseApiUrl() + path, JSON.stringify( data ), requestOptions ).pipe(
                    map( this.extractResult ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * Send a request with multipart/form-data by PUT method and check response status.
     * @param {string} path - API url path
     * @param {FormData} formData
     * @return {Observable<any>}
     */
    putFormDataAndExtractResult( path: string, formData: FormData ): Observable<any> {
        return this.jwtService.generateAuthorizationHeader().pipe(
            mergeMap(( headerList: HttpHeaders ) => {
                return this.http.put<any>( this.getBaseApiUrl() + path, formData, this.generateRequestOptionsByHeaders( headerList ) ).pipe(
                    map( this.extractResult ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * Send request by DELETE method and parse response to json.
     * @param {string} path - API url path.
     * @return {Observable<any>}
     */
    deleteData( path: string ): Observable<any> {
        return this.jwtService.generateRequestOptions().pipe(
            mergeMap( requestOptions => {
                return this.http.delete<any>( this.getBaseApiUrl() + path, requestOptions ).pipe(
                    map( this.extractResult ),
                    catchError( response => this.handleError( response ) )
                );
            })
        );
    }

    /**
     * Send request by POST method without JWT and check response status.
     * @param {string} path - API url path.
     * @param {any} data.
     * @return {Observable<any>}
     */
    postDataAndExtractResultWithoutJwt( path: string, data: any ): Observable<any> {
        return this.http.post<any>( this.getBaseApiUrl() + path, JSON.stringify( data ),
            this.generateRequestOptions( apiRequestHeader.contentType ) ).pipe(
            map( this.extractResult ),
            catchError( response => this.handleError( response ) )
            );
    }

    /**
     * Send request by POST method without JWT and parse response to json.
     * @param {string} path - API url path.
     * @param {any} data.
     * @return {Observable<any>}
     */
    postDataAndExtractDataWithoutJwt( path: string, data: any ): Observable<any> {
        return this.http.post<any>( this.getBaseApiUrl() + path, JSON.stringify( data ),
            this.generateRequestOptions( apiRequestHeader.contentType ) ).pipe(
            map( this.extractBody ),
            catchError( response => this.handleError( response ) )
            );
    }

    /**
     * Made public for testing.
     */
    handleError( response: any ) {
        if ( response instanceof Error ) {
            this.errorLogService.handleErrorLog( response.stack );
            return throwError( response );
        }
        this.errorLogService.handleErrorLog( response.message );
        return throwError( new Error( response.message ) );
    }

    /**
     * Made public for testing.
     */
    handleErrorForResponse( response: any ) {
        return throwError( response );
    }

    /**
     * Made public for testing.
     */
    getBaseApiUrl(): string {
        return env.apiUrl;
    }

    /**
     * Made public for testing.
     */
    routerNavigate( path: string ) {
        this.router.navigate( [path] );
    }

    private extractResult( response: HttpResponse<any> ) {
        return response.status == 200;
    }

    private extractBody( response: HttpResponse<any> ) {
        return response.body;
    }

    private extractDataWithStatus( response: HttpResponse<any> ) {
        return {
            data: this.extractBody( response ),
            isStatusOk: this.extractResult( response )
        };
    }

    private generateRequestOptions( contentType: string ): any {
        let headerList: HttpHeaders = new HttpHeaders( {
            'Content-Type': contentType
        });
        return { headers: headerList, observe: 'response' };
    }

    private generateRequestOptionsByHeaders( headerList: HttpHeaders ): any {
        return { headers: headerList, observe: 'response' };
    }
}