import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { env } from '../../../environments/environment';
import { apiRequestHeader, localStorageName } from '../../constants';
import { ApiService } from './api.service';
import { StringService } from './string.service';

@Injectable()
export class AuthService {

    constructor( private http: HttpClient, private apiService: ApiService, private stringService: StringService ) { }

    /**
     * Save user auth info.
     * @param {string} User id.
     * @param {string} User password.
     * @return {Observable<any>}
     */
    signIn( id: string, password: string ): Observable<any> {
        return this.stringService.hashSha256( id + ':' + this.stringService.hashMd5( password ) ).pipe(
            mergeMap(( authorization: string ) => this.authenticate( id, authorization ) )
        );
    }

    /**
     * Get user auth info.
     * @param {string} User id.
     * @param {string} User authorization.
     * @return {Observable<any>}
     */
    authenticate( id: string, authorization: string ): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders( {
            'Authorization': authorization,
            'Content-Type': apiRequestHeader.contentType
        });

        return this.http.get( env.apiUrl + `/auth/${id}`, { headers: headers }).pipe(
            map( this.saveAuthInfo ),
            catchError( this.handleError )
        );
    }

    /**
     * Delete user auth info.
     * @return {void}
     */
    signOut(): void {
        localStorage.removeItem( localStorageName.accountId );
        localStorage.removeItem( localStorageName.userUid );
        localStorage.removeItem( localStorageName.secretKey );
        localStorage.removeItem( localStorageName.zoneId );
        localStorage.removeItem( localStorageName.currentSiteId );
    }

    /**
     * Check if user auth info is available or not.
     * @return {boolean} Whether user auth info is available or not.
     */
    isSignedIn(): boolean {
        return localStorage.getItem( localStorageName.accountId ) != null
            && localStorage.getItem( localStorageName.userUid ) != null
            && localStorage.getItem( localStorageName.secretKey ) != null;
    }

    private saveAuthInfo( response: any ) {
        localStorage.setItem( localStorageName.accountId, response.accountId );
        localStorage.setItem( localStorageName.userUid, response.userUid );
        localStorage.setItem( localStorageName.secretKey, response.secretKey );

        return '';
    }

    private handleError( response: HttpResponse<any> | any ) {
        return throwError( null );
    }
}
