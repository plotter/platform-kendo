import { StateDirectory } from '../platform/state/state-directory';
import { StateSession } from '../platform/state/state-session';
import { ViewInstanceJSON } from '../platform/state/view-instance';
export declare class Shell {
    private stateDirectory;
    hostId: string;
    sessionId: string;
    session: StateSession;
    navViewInstances: any[];
    navActiveViewInstance: any;
    mainViewInstances: any[];
    mainActiveViewInstance: any;
    altViewInstances: any[];
    altActiveViewInstance: any;
    constructor(stateDirectory: StateDirectory);
    launchViewInstanceJSON(viewInstanceJSON: ViewInstanceJSON): void;
    attached(): void;
    activate(params: any): void;
    focusViewInstance: (viewInstance: any) => void;
    launchViewInstance: (viewInstance: any) => void;
}
