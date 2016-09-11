import { customElement, bindable, inject } from 'aurelia-framework';
import { ViewInstance } from '../platform/state/view-instance';
import { Shell } from './shell';

@customElement('view-instance-toolbar')
@inject(Shell)
export class ViewInstanceToolbar {
    @bindable() public activeViewInstance: ViewInstance;
    @bindable() public viewInstances: ViewInstance[];
    @bindable() public showTitle: boolean;
    @bindable() public isUp: boolean;
    @bindable() public moveToViewInstances: ViewInstance[];

    constructor(private shell: Shell) {}

    public moveItem = (vi: ViewInstance, index: number, viArr: ViewInstance[]) => {
        let that = this;
        
        viArr.splice(index, 1);
        if (this.activeViewInstance === vi && viArr.length > 0) {
            this.activeViewInstance = viArr[0];
        }

        if (vi.paneType === 'alt') {
            vi.paneType = 'main';
            this.shell.launchViewInstance(vi);
        } else {
            vi.paneType = 'alt';
            this.shell.launchViewInstance(vi);
        }

        setTimeout(function() {
            that.shell.refreshSplitters();
        }, 50);
    }

    public removeItem = (vi: ViewInstance, index: number, viArr: ViewInstance[]) => {
        let that = this;

        viArr.splice(index, 1);
        if (this.activeViewInstance === vi && viArr.length > 0) {
            this.activeViewInstance = viArr[0];
        }

        setTimeout(function() {
            that.shell.refreshSplitters();
        }, 50);
    }
}
