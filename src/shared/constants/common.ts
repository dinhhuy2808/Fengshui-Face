import { Item } from "../models/common/item.model";

export const availableLanguages: Item[] = [
    { name: "en", value: "English" },
    { name: "id", value: "Bahasa Indonesia" },
    { name: "ja", value: "日本語" },
    { name: "th", value: "ภาษาไทย" },
    { name: "vi", value: "Tiếng Việt" }
];

export const defaultLanguageByCountryCode: Item[] = [
    { name: "vn", value: "vi" },
    { name: "th", value: "th" },
    { name: "id", value: "id" },
    { name: "sg", value: "en" },
    { name: "my", value: "en" }
];
export const languageCodeSeparator: string = '-';

export module countryCodes {
    export const thailand: string = "TH";
    export const indonesia: string = "ID";
    export const vietnam: string = "VN";
};
export const SCHEME_HTTP = 'http://';
export const SCHEME_HTTPS = 'https://';
