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
    var StateSessionChooser = (function () {
        function StateSessionChooser(stateDirectory, plotter, router) {
            this.stateDirectory = stateDirectory;
            this.plotter = plotter;
            this.router = router;
            this.message = 'no message.';
            this.sessionList = [];
        }
        StateSessionChooser.prototype.activate = function (params) {
            var that = this;
            this.stateRepoUniqueId = params.hostId;
            this.stateRepo = this.stateDirectory.getStateRepository(this.stateRepoUniqueId);
            if (this.stateRepo) {
                this.message = 'found repo';
                this.stateRepo.getSessionList()
                    .then(function (sessionList) {
                    that.sessionList = sessionList;
                });
            }
            else {
                this.message = 'did not find repo';
            }
        };
        StateSessionChooser.prototype.choose = function () {
            var that = this;
            if (!this.sessionId) {
                // route to new-session
                this.router.navigateToRoute('newSession', { hostId: this.stateRepoUniqueId });
                return;
            }
            // route to shell
            this.stateDirectory.getStateSession(this.stateRepoUniqueId, this.sessionId)
                .then(function (stateSession) {
                that.plotter.stateSession = stateSession;
                that.router.navigateToRoute('shell', { hostId: that.stateRepoUniqueId, sessionId: that.sessionId });
            });
        };
        StateSessionChooser = __decorate([
            aurelia_framework_1.inject(state_directory_1.StateDirectory, plotter_1.Plotter, aurelia_router_1.Router), 
            __metadata('design:paramtypes', [state_directory_1.StateDirectory, plotter_1.Plotter, aurelia_router_1.Router])
        ], StateSessionChooser);
        return StateSessionChooser;
    }());
    exports.StateSessionChooser = StateSessionChooser;
});
