import { Router } from 'aurelia-router';
import { StateDirectory } from '../platform/state/state-directory';
import { StateRepository } from '../platform/state/state-repository';
import { Plotter } from '../platform/plotter';
export declare class StateSessionChooser {
    private stateDirectory;
    private plotter;
    private router;
    stateRepoUniqueId: string;
    stateRepo: StateRepository;
    message: string;
    sessionList: string[];
    sessionId: string;
    constructor(stateDirectory: StateDirectory, plotter: Plotter, router: Router);
    activate(params: any): void;
    choose(): void;
}
