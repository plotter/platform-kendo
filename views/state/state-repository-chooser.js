var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', 'aurelia-router', '../platform/state/state-directory', '../platform/plotter'], function (require, exports, aurelia_framework_1, aurelia_router_1, state_directory_1, plotter_1) {
    "use strict";
    var StateRepositoryChooser = (function () {
        function StateRepositoryChooser(stateDirectory, router, plotter) {
            var _this = this;
            this.stateDirectory = stateDirectory;
            this.router = router;
            this.plotter = plotter;
            this.choose = function () {
                // route to session chooser
                _this.plotter.stateRepository = _this.state;
                _this.router.navigateToRoute('session', { hostId: _this.state.uniqueId });
            };
            this.states = stateDirectory.stateRepositories;
        }
        StateRepositoryChooser = __decorate([
            aurelia_framework_1.inject(state_directory_1.StateDirectory, aurelia_router_1.Router, plotter_1.Plotter), 
            __metadata('design:paramtypes', [state_directory_1.StateDirectory, aurelia_router_1.Router, plotter_1.Plotter])
        ], StateRepositoryChooser);
        return StateRepositoryChooser;
    }());
    exports.StateRepositoryChooser = StateRepositoryChooser;
});
