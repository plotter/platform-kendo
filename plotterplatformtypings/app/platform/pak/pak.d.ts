import { View, ViewJSON } from './view';
import { PakRepository } from './pak-repository';
export declare class Pak {
    static fromJSON(json: PakJSON): Pak;
    locked: boolean;
    uniqueId: string;
    pakRepository: PakRepository;
    views: View[];
    getView(viewId: string): View;
}
export interface PakJSON {
    locked: boolean;
    uniqueId: string;
    views: ViewJSON[];
}
