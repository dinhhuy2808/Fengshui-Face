import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoService {

    constructor() { }

    decryptAES256( encryptedMessage: string, key: string, iv: string ): string {
        let keyUtf8 = CryptoJS.enc.Utf8.parse( key );
        let ivUtf8 = CryptoJS.enc.Utf8.parse( iv );
        return CryptoJS.AES.decrypt( encryptedMessage, keyUtf8, { iv: ivUtf8, padding: CryptoJS.pad.ZeroPadding }).toString( CryptoJS.enc.Utf8 );
    }
}