import { Router } from 'aurelia-router';
import { StateDirectory } from '../platform/state/state-directory';
import { StateRepository } from '../platform/state/state-repository';
import { Plotter } from '../platform/plotter';
export declare class StateRepositoryChooser {
    private stateDirectory;
    private router;
    private plotter;
    states: StateRepository[];
    state: StateRepository;
    constructor(stateDirectory: StateDirectory, router: Router, plotter: Plotter);
    choose: () => void;
}
