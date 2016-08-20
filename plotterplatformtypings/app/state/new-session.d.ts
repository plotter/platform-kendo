import { StateDirectory } from '../platform/state/state-directory';
import { StateRepository } from '../platform/state/state-repository';
import { PakDirectory } from '../platform/pak/pak-directory';
export declare class NewSession {
    private stateDirectory;
    hostId: string;
    stateRepository: StateRepository;
    pakDirectory: PakDirectory;
    constructor(stateDirectory: StateDirectory);
    activate(params: any): void;
}
