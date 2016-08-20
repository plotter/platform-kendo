export declare class PhoneGapHelper {
    readonly baseUrl: any;
    readonly isPhoneGap: boolean;
    readFromFile: (fileName: string) => Promise<Object>;
    errorHandler: (fileName: any, e: any) => string;
}
