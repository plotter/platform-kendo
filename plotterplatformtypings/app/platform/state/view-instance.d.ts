import { ActivePak } from './active-pak';
import { View, PaneType } from '../pak/view';
export declare class ViewInstance {
    static fromJSON(json: ViewInstanceJSON): ViewInstance;
    uniqueId: string;
    title: string;
    viewId: string;
    paneType: PaneType;
    viewTemplate: string;
    viewModel: string;
    viewState: Object;
    activePak: ActivePak;
    view: View;
    private viewPromise;
    getView(): Promise<View>;
}
export interface ViewInstanceJSON {
    uniqueId: string;
    title?: string;
    viewId?: string;
    paneType: PaneType;
    viewTemplate?: string;
    viewModel?: string;
    viewState?: Object;
}
