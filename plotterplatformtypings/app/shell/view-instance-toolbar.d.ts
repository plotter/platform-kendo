import { ViewInstance } from '../platform/state/view-instance';
import { Shell } from './shell';
export declare class ViewInstanceToolbar {
    private shell;
    activeViewInstance: ViewInstance;
    viewInstances: ViewInstance[];
    showTitle: boolean;
    isUp: boolean;
    moveToViewInstances: ViewInstance[];
    constructor(shell: Shell);
    moveItem: (vi: any, index: number, viArr: any[]) => void;
    removeItem: (vi: any, index: number, viArr: any[]) => void;
}
