import { ActivePak, ActivePakJSON } from './active-pak';
import { StateRepository } from './state-repository';
export declare class StateSession {
    static fromJSON(json: StateSessionJSON): StateSession;
    locked: boolean;
    uniqueId: string;
    activePaks: ActivePak[];
    stateRepository: StateRepository;
}
export interface StateSessionJSON {
    locked: boolean;
    uniqueId: string;
    activePaks: ActivePakJSON[];
}
