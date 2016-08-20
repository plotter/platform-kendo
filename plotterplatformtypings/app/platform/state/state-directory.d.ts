import { StateRepository, StateRepositoryJSON } from './state-repository';
import { StateSession } from './state-session';
export declare class StateDirectory {
    static fromJSON(json: StateDirectoryJSON): StateDirectory;
    locked: boolean;
    uniqueId: string;
    stateRepositories: StateRepository[];
    getStateRepository(uniqueId: string): StateRepository;
    getStateSession(stateRepositoryId: string, stateSessionId: string): Promise<StateSession>;
    toJSON(): StateDirectoryJSON;
}
export interface StateDirectoryJSON {
    locked: boolean;
    uniqueId: string;
    stateRepositories: StateRepositoryJSON[];
}
