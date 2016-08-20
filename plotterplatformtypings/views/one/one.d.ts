import { Shell } from 'app/shell/shell';
import { PaneType } from 'app/platform/pak/view';
export declare class One {
    private shell;
    model: any;
    targetPane: PaneType;
    targetMessage: string;
    targetViewModel: string;
    constructor(shell: Shell);
    activate(model: any): void;
    launchTarget(): void;
}
