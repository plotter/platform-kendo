import { ViewInstance, ViewInstanceJSON } from './view-instance';
import { StateSession } from './state-session';
import { Pak } from '../pak/pak';
export declare class ActivePak {
    static fromJSON(json: ActivePakJSON): ActivePak;
    locked: boolean;
    uniqueId: string;
    pakHostId: string;
    pakId: string;
    pak: Pak;
    viewInstances: ViewInstance[];
    stateSession: StateSession;
    private pakPromise;
    getPak(): Promise<Pak>;
}
export interface ActivePakJSON {
    locked: boolean;
    uniqueId: string;
    pakHostId: string;
    pakId: string;
    viewInstances: ViewInstanceJSON[];
}
