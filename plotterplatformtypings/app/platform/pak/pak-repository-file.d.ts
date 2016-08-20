import { HttpClient } from 'aurelia-fetch-client';
import { PakRepository, PakRepositoryType } from './pak-repository';
import { Pak } from './pak';
import { PakDirectory } from './pak-directory';
import { ElectronHelper } from '../electron-helper';
import { PhoneGapHelper } from '../phone-gap-helper';
export declare class PakRepositoryFile implements PakRepository {
    private httpClient;
    private electronHelper;
    private phoneGapHelper;
    locked: boolean;
    uniqueId: string;
    pakRepositoryType: PakRepositoryType;
    pakDirectory: PakDirectory;
    path: string;
    pakList: string[];
    private pakMap;
    private pakPromiseMap;
    constructor(httpClient: HttpClient, electronHelper: ElectronHelper, phoneGapHelper: PhoneGapHelper);
    getPak: (pakId: any) => Promise<Pak>;
    getPakList: () => Promise<string[]>;
}
