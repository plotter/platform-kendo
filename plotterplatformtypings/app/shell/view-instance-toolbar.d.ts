import { ViewInstance } from '../platform/state/view-instance';
export declare class ViewInstanceToolbar {
    activeViewInstance: ViewInstance;
    viewInstances: ViewInstance[];
    showTitle: boolean;
    removeItem: (vi: ViewInstance, index: number, viArr: ViewInstance[]) => void;
}
