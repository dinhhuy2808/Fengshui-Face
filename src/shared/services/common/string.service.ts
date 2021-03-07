import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Md5 } from "ts-md5/dist/md5";
import { subtleCrypto } from "../../constants";

@Injectable()
export class StringService {

    constructor() {

    }

    /**
     * Encode a string to base64.
     * @param {string} A string.
     * @return {string} A base64 encoded string.
     */
    encodeBase64( plainText: string ): string {
        return btoa( plainText ).replace( /\//g, "_" ).replace( /=/g, "" );
    }

    /**
     * Generate a md5 hash of a string.
     * @param {string} A string.
     * @return {string} A md5 hash.
     */
    hashMd5( plainText: string ): string {
        return Md5.hashStr( plainText ).toString();
    }

    /**
     * Generate a sha256 hash of a string.
     * @param {string} A string.
     * @return {Observable<any>} A sha256 hash.
     */
    hashSha256( plainText: string ): Observable<any> {
        let uint8Array: Uint8Array = this.stringToUint8Array( plainText );
        let promise: Promise<string> = Promise.resolve(
            crypto.subtle.digest( subtleCrypto.digest.algorithm.sha256, uint8Array.buffer )
                .then(( hash: ArrayBuffer ) => { return this.hex( hash ); })
        );

        return from( promise );
    }

    /**
     * Convert an uint8 array to a string.
     * @param {string} A string.
     * @return {Uint8Array} An uint8 array.
     */
    uint8ArrayToString( uint8Array: Uint8Array ): string {
        return String.fromCharCode.apply( String, uint8Array );
    }

    /**
     * Convert a string to an uint8 array.
     * @param {string} A string.
     * @return {Uint8Array} An uint8 array.
     */
    stringToUint8Array( str: string ): Uint8Array {
        let uint8Array: Uint8Array = new Uint8Array( str.length );

        for ( let i: number = 0; i < str.length; i++ ) {
            uint8Array[i] = str.charCodeAt( i );
        }

        return uint8Array;
    }

    /**
     * Convert a string to an array buffer.
     * @param {string} A string.
     * @return {ArrayBuffer} An array array.
     */
    stringToArrayBuffer( str: string ): ArrayBuffer {
        let arrayBuffer: ArrayBuffer = new ArrayBuffer( str.length );

        for ( let i: number = 0; i < str.length; i++ ) {
            arrayBuffer[i] = str.charCodeAt( i );
        }

        return arrayBuffer;
    }

    /**
     * Convert an array buffer to a hex code string.
     * @param {ArrayBuffer} An array buffer.
     * @return {string} A hex code string.
     */
    hex( arrayBuffer: ArrayBuffer ): string {
        const bytesProcessEachTime: number = 4;
        const decimal: number = 16;
        const hexPadding: string = '00000000';

        let hexCodes: string[] = [];
        let dataView: DataView = new DataView( arrayBuffer );

        for ( let i: number = 0; i < dataView.byteLength; i += bytesProcessEachTime ) {
            let hexCode: string = dataView.getUint32( i ).toString( decimal );
            let hexCodePadded = ( hexPadding + hexCode ).slice( -hexPadding.length );

            hexCodes.push( hexCodePadded );
        }

        return hexCodes.join( "" );
    }
    
    /**
     * Check if the string contains the keyword or not.
     * @param {string} A string.
     * @param {string} A keyword.
     * @return {boolean} Whether the string contains the keyword or not.
     */
    contains(str: string, keyword: string): boolean {
        return str.indexOf(keyword) >= 0;
    };

    /**
     * Check if the string starts with the prefix or not.
     * @param {string} A string.
     * @param {string} A prefix.
     * @return {boolean} Whether the string starts with the prefix or not.
     */
    startsWith(str: string, prefix: string): boolean  {
        return str.indexOf(prefix) === 0;
    };

    /**
     * Check if the string ends with the suffix or not.
     * @param {string} A string.
     * @param {string} A suffix.
     * @return {boolean} Whether the string ends with the suffix or not.
     */
    endsWith(str: string, suffix: string): boolean  {
        return str.indexOf(suffix, str.length - suffix.length) >= 0;
    };
}
