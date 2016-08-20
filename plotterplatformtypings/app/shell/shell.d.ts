import { StateDirectory } from '../platform/state/state-directory';
import { StateSession } from '../platform/state/state-session';
import { ViewInstance, ViewInstanceJSON } from '../platform/state/view-instance';
export declare class Shell {
    private stateDirectory;
    hostId: string;
    sessionId: string;
    session: StateSession;
    navViewInstances: ViewInstance[];
    navActiveViewInstance: any;
    mainViewInstances: ViewInstance[];
    mainActiveViewInstance: any;
    altViewInstances: ViewInstance[];
    altActiveViewInstance: any;
    constructor(stateDirectory: StateDirectory);
    launchViewInstanceJSON(viewInstanceJSON: ViewInstanceJSON): void;
    activate(params: any): void;
    focusViewInstance: (viewInstance: ViewInstance) => void;
    launchViewInstance: (viewInstance: ViewInstance) => void;
}
