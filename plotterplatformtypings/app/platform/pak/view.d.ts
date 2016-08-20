import { Pak } from './pak';
export declare class View {
    static fromJSON(json: ViewJSON): View;
    locked: boolean;
    uniqueId: string;
    pane: PaneType;
    moduleUrl: string;
    pak: Pak;
}
export declare type PaneType = 'nav' | 'main' | 'alt';
export interface ViewJSON {
    locked: boolean;
    uniqueId: string;
    pane: PaneType;
    moduleUrl: string;
}
