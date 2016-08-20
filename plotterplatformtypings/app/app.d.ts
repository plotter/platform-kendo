import { Container } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { PlatformStartup } from './platform/platform-startup';
import { Plotter } from './platform/plotter';
import { StateDirectory } from './platform/state/state-directory';
export declare class App {
    private platformStartup;
    private plotterConfig;
    private container;
    router: Router;
    message: string;
    constructor(platformStartup: PlatformStartup, plotterConfig: Plotter, container: Container);
    activate(): Promise<StateDirectory>;
    configureRouter(config: RouterConfiguration, router: Router): void;
}
