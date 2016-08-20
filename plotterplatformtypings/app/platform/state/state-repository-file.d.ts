import { HttpClient } from 'aurelia-fetch-client';
import { StateRepository, StateRepositoryType, StateRepositoryJSON } from './state-repository';
import { PakDirectory } from '../pak/pak-directory';
import { StateSession } from './state-session';
import { StateDirectory } from './state-directory';
import { ElectronHelper } from '../electron-helper';
import { PhoneGapHelper } from '../phone-gap-helper';
export declare class StateRepositoryFile implements StateRepository {
    private httpClient;
    private electronHelper;
    private phoneGapHelper;
    static fromJSON(json: StateRepositoryJSON): StateRepositoryFile;
    locked: boolean;
    uniqueId: string;
    stateRepositoryType: StateRepositoryType;
    stateDirectory: StateDirectory;
    path: string;
    private pakDirectoryPromise;
    private stateSessionPromiseMap;
    private stateSessionMap;
    constructor(httpClient: HttpClient, electronHelper: ElectronHelper, phoneGapHelper: PhoneGapHelper);
    getPakDirectory: () => Promise<PakDirectory>;
    getStateSession(sessionId: string): Promise<StateSession>;
    getSessionList(): Promise<string[]>;
    toJSON(): StateRepositoryJSON;
}
export interface StateRepositoryFileJSON {
    locked: boolean;
    uniqueId: string;
    stateRepositoryType: StateRepositoryType;
}
