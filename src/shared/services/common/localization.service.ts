import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { availableLanguages, localStorageName, languageCodeSeparator } from "../../constants/";
import { LocalStorageService } from "./local-storage.service";
import { Observable } from 'rxjs';

@Injectable()
export class LocalizationService {

    constructor( private translateService: TranslateService, private localStorageService: LocalStorageService ) { }

    /**
     * Load translation of multiple strings at once
     * @param {string} messages - an array string want to be translated
     */
    localizeMultiple( messages: string[] ): void {
        for ( let index in messages ) {
            this.translateService.get( messages[index] ).subscribe(( localizedMessage: string ) => {
                messages[index] = localizedMessage;
            });
        }
    }

    /**
     * Load translation of single string at once
     * @param message - a string want to be translated.
     * @returns {string}
     */
    localize( message: string ): string {
        this.translateService.get( message ).subscribe(
            ( localizedMessage: string ) => {
                message = localizedMessage;
            });
        return message;
    }

    /**
     * load translation of 1 string contains parameters
     * @param {string} localizationString - the key in localization file (.json)
     * @param {object} parameters
     * @returns {Observable<string>}
     */
    localizeWithParameters( localizationString: string, parameters = {}): Observable<string> {
        if ( Object.keys( parameters ).length > 0 ) {
            return this.translateService.get( localizationString, parameters );
        } else {
            return this.translateService.get( localizationString );
        }
    }

    /**
     * Switch language to chosen language
     * @param {string} toLanguage
     */
    setLanguage( toLanguage: string ): void {
        this.localStorageService.setItem( localStorageName.locale, toLanguage );
        this.translateService.use( toLanguage );
    }

    /**
     * Init language setting
     */
    init(): void {
        this.setSupportedLanguageIfNecessary();
        this.translateService.use( this.localStorageService.getStringItem( localStorageName.locale ) );
    }

    /**
     * Get current language
     * @returns {string}
     */
    getCurrentLanguageName(): string {
        let currentLanguageCode: string;
        if ( !this.localStorageService.getStringItem( localStorageName.locale ) ) {
            currentLanguageCode = this.translateService.getDefaultLang();
        } else {
            currentLanguageCode = this.localStorageService.getStringItem( localStorageName.locale );
        }

        return availableLanguages.find( language => language.name === currentLanguageCode ).value.toString();
    }

    /**
     * Validate locale language and set language code to locale if locale or navigator have other than supportive language
     */
    setSupportedLanguageIfNecessary(): void {
        const localStorageLanguage: string = this.localStorageService.getStringItem( localStorageName.locale );
        const languageToValidate: string = localStorageLanguage ? localStorageLanguage : this.getBrowserLanguage();
        const isSupportedLanguage: boolean = availableLanguages.some( language => language.name === languageToValidate );
        const defaultLanguage: string = 'en';
        const languageToSet: string = isSupportedLanguage ? languageToValidate : defaultLanguage;

        if ( !localStorageLanguage || !isSupportedLanguage ) {
            this.localStorageService.setItem( localStorageName.locale, languageToSet );
        }
    }

    /**
     * Visible for testing.
     */
    getBrowserLanguage(): string {
        return navigator.language.split( languageCodeSeparator )[0];
    }
}
