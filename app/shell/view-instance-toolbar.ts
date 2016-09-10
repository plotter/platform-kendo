import { customElement, bindable } from 'aurelia-framework';
import { ViewInstance } from '../platform/state/view-instance';

@customElement('view-instance-toolbar')
export class ViewInstanceToolbar {
    @bindable() public activeViewInstance: ViewInstance;
    @bindable() public viewInstances: ViewInstance[];
    @bindable() public showTitle: boolean;
    @bindable() public isUp: boolean;
    @bindable() public moveToViewInstances: ViewInstance[];

    public moveItem = (vi: ViewInstance, index: number, viArr: ViewInstance[]) => {
        viArr.splice(index, 1);
        if (this.activeViewInstance === vi && viArr.length > 0) {
            this.activeViewInstance = viArr[0];
        }
        this.moveToViewInstances.push(vi);
    }

    public removeItem = (vi: ViewInstance, index: number, viArr: ViewInstance[]) => {
        viArr.splice(index, 1);
        if (this.activeViewInstance === vi && viArr.length > 0) {
            this.activeViewInstance = viArr[0];
        }
    }
}
