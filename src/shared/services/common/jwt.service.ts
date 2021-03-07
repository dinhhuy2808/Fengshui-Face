import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    apiRequestHeader,
    localStorageName,
    subtleCrypto,
} from '../../constants';
import { StringService } from './string.service';
import { MomentService } from './moment.service';
import { env } from '../../../environments/environment';

@Injectable()
export class JwtService {
    readonly headerBase64: string = 'eyJhbGciOiJIUzI1NiJ9';
    readonly algorithmName: string = 'HMAC';
    readonly hashName: string = subtleCrypto.digest.algorithm.sha256;
    userUid: string;
    secretKey: string;
    readonly timestampApiPath: string = env.apiUrl + "/timestamp";
    readonly localTimestampKey: string = "theMomentOfGettingApiTimestamp";
    readonly apiTimestampKey: string = "timestampApi";
    readonly timestampCacheExpirationInSeconds: number = 3;

    constructor( private momentService: MomentService, private stringService: StringService, private http: HttpClient ) {
        this.loadAuthInfo();
    }

    /**
     * Load auth info from local storage.
     */
    loadAuthInfo() {
        this.userUid = localStorage.getItem( localStorageName.userUid );
        this.secretKey = localStorage.getItem( localStorageName.secretKey );
    }

    /**
     * Generate request options with auth info by a secret key.
     * @param {string} A secret key string.
     * @return {Observable<any>} Request options.
     */
    generateRequestOptions(): Observable<any> {
        return from(
            this.generateCryptoKey( this.secretKey )
                .then(( cryptoKey: CryptoKey ) => { return this.generateToken( this.userUid, cryptoKey ) })
                .then(( token: string ) => {
                    let headerList: HttpHeaders = new HttpHeaders( {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': apiRequestHeader.contentType,
                        'X-ACCESSTRADE-USER-TYPE': 'publisher'
                    });
                    return { headers: headerList, observe: 'response' };
                })
        );
    }

    /**
     * Generate request options with auth info by a secret key without content type
     * @param {string} A secret key string.
     * @return {Observable<any>} Request options.
     */
    generateAuthorizationHeader(): Observable<any> {
        return from(
            this.generateCryptoKey( this.secretKey )
                .then(( cryptoKey: CryptoKey ) => { return this.generateToken( this.userUid, cryptoKey ) })
                .then(( token: string ) => {
                    return new HttpHeaders( {
                        'Authorization': 'Bearer ' + token,
                        'X-ACCESSTRADE-USER-TYPE': 'publisher'
                    });
                })
        );
    }

    /**
     * Generate JWT.
     * @param {number} userUid - An user account id.
     * @param {CryptoKey} cryptokey - A crypto key generated by secret key from the response of sign-in API.
     * @return {Promise<string>} A base64 encoded JWT header, payload and signature joined by '.'.
     */
    generateToken( userUid: string, cryptokey: CryptoKey ): Promise<string> {
        if ( this.isCachedTimestampValid() ) {
            return this.encodeSignatureString( userUid, cryptokey, localStorage.getItem( this.apiTimestampKey ) );
        } else {
            return this.getTimestampFromApi().then(
                ( response: HttpResponse<string> ) => {
                    let apiTimestamp: string = String( response );
                    this.saveMomentOfGettingApiTimestamp();
                    this.saveApiTimestamp( apiTimestamp );
                    return this.encodeSignatureString( userUid, cryptokey, apiTimestamp );
                }
            );
        }
    }

    /**
     * Generate a crypto key by a secret key.
     * @param {string} A secret key string.
     * @return {Promise<CryptoKey>} A crypto key.
     */
    generateCryptoKey( secretKey: string ): Promise<CryptoKey> {
        return Promise.resolve(
            crypto.subtle.importKey(
                subtleCrypto.importKeyForSign.format,
                this.stringService.stringToUint8Array( secretKey ),
                {
                    name: this.algorithmName,
                    hash: {
                        name: this.hashName
                    }
                },
                false,
                subtleCrypto.importKeyForSign.usages
            ).then(( key: CryptoKey ) => { return key; })
        );
    }

    private encodeSignatureString( userUid: string, cryptokey: CryptoKey, timestamp: string ): Promise<string> {
        let jwtPayload: string = `{"sub":"${userUid}","iat":${timestamp}}`;
        let jwtHeaderPayloadBase64: string = this.headerBase64 + '.' + this.stringService.encodeBase64( jwtPayload );
        return Promise.resolve(
            crypto.subtle.sign(
                {
                    name: this.algorithmName,
                    hash: {
                        name: this.hashName
                    }
                },
                cryptokey,
                this.stringService.stringToUint8Array( jwtHeaderPayloadBase64 )
            ).then(( signatureArrayBuffer: ArrayBuffer ) => {
                let signatureUnit8Array: Uint8Array = new Uint8Array( signatureArrayBuffer );
                let signatureString: string = this.stringService.uint8ArrayToString( signatureUnit8Array );

                return jwtHeaderPayloadBase64 + '.' + this.stringService.encodeBase64( signatureString );
            })
        );
    }

    private getTimestampFromApi(): Promise<HttpResponse<any>> {
        return this.http.get( this.timestampApiPath ).pipe(
            map(( response: HttpResponse<any> ) => {
                return response
            })
        ).toPromise();
    }

    private saveApiTimestamp( timestamp: string ) {
        localStorage.setItem( this.apiTimestampKey, String( timestamp ) );
    }

    private saveMomentOfGettingApiTimestamp() {
        localStorage.setItem( this.localTimestampKey, String( this.momentService.getUnixTimeInSeconds() ) );
    }

    private isCachedTimestampValid() {
        let delta: number = this.momentService.getUnixTimeInSeconds() - Number( localStorage.getItem( this.localTimestampKey ) );
        return this.timestampCacheExpirationInSeconds >= Math.abs( delta );
    }
}
