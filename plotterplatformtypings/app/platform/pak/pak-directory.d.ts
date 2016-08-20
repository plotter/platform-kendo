import { PakRepository, PakRepositoryJSON } from './pak-repository';
import { StateRepository } from '../state/state-repository';
export declare class PakDirectory {
    static fromJSON(json: PakDirectoryJSON): PakDirectory;
    locked: boolean;
    uniqueId: string;
    pakRepositories: PakRepository[];
    stateRepository: StateRepository;
    toJSON(): PakDirectoryJSON;
}
export interface PakDirectoryJSON {
    locked: boolean;
    uniqueId: string;
    pakRepositories: PakRepositoryJSON[];
}
