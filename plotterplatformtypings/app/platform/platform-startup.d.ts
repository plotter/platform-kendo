import { HttpClient } from 'aurelia-fetch-client';
import { StateDirectory } from './state/state-directory';
import { Plotter } from './plotter';
import { ElectronHelper } from './electron-helper';
import { PhoneGapHelper } from './phone-gap-helper';
export declare class PlatformStartup {
    private httpClient;
    private plotter;
    private electronHelper;
    private phoneGapHelper;
    constructor(httpClient: HttpClient, plotter: Plotter, electronHelper: ElectronHelper, phoneGapHelper: PhoneGapHelper);
    start(): Promise<StateDirectory>;
}
