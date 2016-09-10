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
    moveItem: (vi: ViewInstance, index: number, viArr: ViewInstance[]) => void;
    removeItem: (vi: ViewInstance, index: number, viArr: ViewInstance[]) => void;
}
