import { ViewInstance } from '../platform/state/view-instance';
export declare class ViewInstanceToolbar {
    activeViewInstance: ViewInstance;
    viewInstances: ViewInstance[];
    showTitle: boolean;
    isUp: boolean;
    moveToViewInstances: ViewInstance[];
    moveItem: (vi: any, index: number, viArr: any[]) => void;
    removeItem: (vi: any, index: number, viArr: any[]) => void;
}
