var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', './platform/platform-startup', './platform/plotter', './platform/state/state-directory'], function (require, exports, aurelia_framework_1, platform_startup_1, plotter_1, state_directory_1) {
    "use strict";
    var App = (function () {
        function App(platformStartup, plotterConfig, container) {
            this.platformStartup = platformStartup;
            this.plotterConfig = plotterConfig;
            this.container = container;
            this.message = 'Hello World!';
        }
        App.prototype.activate = function () {
            var _this = this;
            this.plotterConfig.stateDirectoryName = window.plotterStateDirectoryName;
            return this.platformStartup.start()
                .then(function (stateDirectory) {
                _this.message = "Hello World! (started:" + stateDirectory.stateRepositories.length + ")";
                _this.container.registerInstance(state_directory_1.StateDirectory, stateDirectory);
                return stateDirectory;
            });
        };
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Plotter-Platfrom';
            config.map([
                { route: ['', 'state'], name: 'state', moduleId: './state/state-repository-chooser', nav: false, title: 'State' },
                { route: 'session', name: 'session', moduleId: './state/state-session-chooser', nav: false, title: 'Session' },
                { route: 'new-session', name: 'newSession', moduleId: './state/new-session', nav: false, title: 'New Session' },
                { route: 'shell', name: 'shell', moduleId: './shell/shell', nav: false, title: 'Shell' },
            ]);
            this.router = router;
        };
        App = __decorate([
            aurelia_framework_1.inject(platform_startup_1.PlatformStartup, plotter_1.Plotter, aurelia_framework_1.Container), 
            __metadata('design:paramtypes', [platform_startup_1.PlatformStartup, plotter_1.Plotter, aurelia_framework_1.Container])
        ], App);
        return App;
    }());
    exports.App = App;
});
