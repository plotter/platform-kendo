import { StateDirectory } from './state/state-directory';
import { StateRepository } from './state/state-repository';
import { StateSession } from './state/state-session';
export declare class Plotter {
    stateDirectoryName: string;
    private myStateDirectory;
    stateDirectory: StateDirectory;
    private myStateRepository;
    stateRepository: StateRepository;
    private myStateSession;
    stateSession: StateSession;
}
