import { inject } from 'aurelia-framework';
import { StateDirectory } from '../platform/state/state-directory';
import { StateSession } from '../platform/state/state-session';
import { ViewInstance, ViewInstanceJSON } from '../platform/state/view-instance';

@inject(StateDirectory)
export class Shell {
    public hostId: string;
    public sessionId: string;
    public session: StateSession;

    public navViewInstances = new Array<ViewInstance>();
    public navActiveViewInstance;

    public mainViewInstances = new Array<ViewInstance>();
    public mainActiveViewInstance;
    public mainCollapsed = false;

    public altViewInstances = new Array<ViewInstance>();
    public altActiveViewInstance;
    public altCollapsed = false;

    constructor(private stateDirectory: StateDirectory) { }

    public launchViewInstanceJSON(viewInstanceJSON: ViewInstanceJSON) {
        let newViewInstance = ViewInstance.fromJSON(viewInstanceJSON);
        this.launchViewInstance(newViewInstance);
        this.focusViewInstance(newViewInstance);
    }

    public attached() {
        let that = this;
        
        $(".body").kendoSplitter({
            orientation: "horizontal",
            panes: [
                { collapsible: true, size: "270px" },
                { collapsible: true }
            ]
        });

        $(".body2").kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: true, size: "50%" },
                { collapsible: true }
            ]
        });

        setTimeout(function() {
            that.shell.refreshSplitters();
        }, 50);
    }

    public refreshSplitters() {
        let body2Splitter = $(".body2").data('kendoSplitter');
        // refresh alt pane based (has or doesn't have view instances)
        if (this.altViewInstances.length > 0) {
            if (this.altCollapsed) {
                body2Splitter.expand(".k-pane:last");
                this.altCollapsed = false;
            }
        } else {
            if (!this.altCollapsed) {
                body2Splitter.collapse(".k-pane:last");
                this.altCollapsed = true;
            }
        }

        // refresh main pane based (has or doesn't have view instances)
        if (this.mainViewInstances.length > 0) {
            if (this.mainCollapsed) {
                body2Splitter.expand(".k-pane:first");
                this.mainCollapsed = false;
            }
        } else {
            if (!this.mainCollapsed) {
                body2Splitter.collapse(".k-pane:first");
                this.mainCollapsed = true;
            }
        }
    }

    public activate(params) {
        let that = this;

        this.hostId = params.hostId;
        this.sessionId = params.sessionId;

        this.stateDirectory.getStateSession(this.hostId, this.sessionId)
            .then(session => {
                that.session = session;

                that.session.activePaks.forEach(activePak => {
                    activePak.viewInstances.forEach(viewInstance => {
                        that.launchViewInstance(viewInstance);
                    });
                });
            });
    }

    public focusViewInstance = (viewInstance: ViewInstance) => {
        switch (viewInstance.paneType) {
            case 'nav':
                this.navActiveViewInstance = viewInstance;
                break;

            case 'main':
                this.mainActiveViewInstance = viewInstance;
                break;

            case 'alt':
                this.altActiveViewInstance = viewInstance;
                break;

            default:
                break;
        }
    }

    public launchViewInstance = (viewInstance: ViewInstance) => {
        switch (viewInstance.paneType) {
            case 'nav':
                this.navViewInstances.push(viewInstance);
                if (!this.navActiveViewInstance) {
                    this.navActiveViewInstance = viewInstance;
                }
                break;

            case 'main':
                this.mainViewInstances.push(viewInstance);
                if (!this.mainActiveViewInstance) {
                    this.mainActiveViewInstance = viewInstance;
                }
                break;

            case 'alt':
                this.altViewInstances.push(viewInstance);
                if (!this.altActiveViewInstance) {
                    this.altActiveViewInstance = viewInstance;
                }
                break;

            default:
                break;
        }

        this.focusViewInstance(viewInstance);
    }
}
