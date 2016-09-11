var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', '../platform/state/state-directory', '../platform/state/view-instance'], function (require, exports, aurelia_framework_1, state_directory_1, view_instance_1) {
    "use strict";
    var Shell = (function () {
        function Shell(stateDirectory) {
            var _this = this;
            this.stateDirectory = stateDirectory;
            this.navViewInstances = new Array();
            this.mainViewInstances = new Array();
            this.mainCollapsed = false;
            this.altViewInstances = new Array();
            this.altCollapsed = false;
            this.focusViewInstance = function (viewInstance) {
                switch (viewInstance.paneType) {
                    case 'nav':
                        _this.navActiveViewInstance = viewInstance;
                        break;
                    case 'main':
                        _this.mainActiveViewInstance = viewInstance;
                        break;
                    case 'alt':
                        _this.altActiveViewInstance = viewInstance;
                        break;
                    default:
                        break;
                }
            };
            this.launchViewInstance = function (viewInstance) {
                switch (viewInstance.paneType) {
                    case 'nav':
                        _this.navViewInstances.push(viewInstance);
                        if (!_this.navActiveViewInstance) {
                            _this.navActiveViewInstance = viewInstance;
                        }
                        break;
                    case 'main':
                        _this.mainViewInstances.push(viewInstance);
                        if (!_this.mainActiveViewInstance) {
                            _this.mainActiveViewInstance = viewInstance;
                        }
                        break;
                    case 'alt':
                        _this.altViewInstances.push(viewInstance);
                        if (!_this.altActiveViewInstance) {
                            _this.altActiveViewInstance = viewInstance;
                        }
                        break;
                    default:
                        break;
                }
                _this.focusViewInstance(viewInstance);
            };
            var that = this;
            this.splitterCreatedPromise = new Promise(function (resolve, reject) {
                that.splitterCreatedResolve = resolve;
                that.splitterCreatedReject = reject;
            });
            this.viewInstancesLoadedPromise = new Promise(function (resolve, reject) {
                that.viewInstancesLoadedResolve = resolve;
                that.viewInstancesLoadedReject = reject;
            });
            Promise.all([this.splitterCreatedPromise, this.viewInstancesLoadedPromise])
                .then(function (val) {
                setTimeout(function () {
                    that.refreshSplitters();
                }, 50);
            })
                .catch(function (reason) {
                alert("error in load sequence: " + JSON.stringify(reason));
            });
        }
        Shell.prototype.launchViewInstanceJSON = function (viewInstanceJSON) {
            var newViewInstance = view_instance_1.ViewInstance.fromJSON(viewInstanceJSON);
            this.launchViewInstance(newViewInstance);
            this.focusViewInstance(newViewInstance);
        };
        Shell.prototype.attached = function () {
            var that = this;
            $(".body").kendoSplitter({
                orientation: "horizontal",
                panes: [
                    { collapsible: true, size: "270px" },
                    { collapsible: true }
                ]
            });
            $(".body2").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: true, size: "50%" },
                    { collapsible: true }
                ]
            });
            this.splitterCreatedResolve(true);
        };
        Shell.prototype.refreshSplitters = function () {
            var body2Splitter = $(".body2").data('kendoSplitter');
            // refresh alt pane based (has or doesn't have view instances)
            if (this.altViewInstances.length > 0) {
                if (this.altCollapsed) {
                    body2Splitter.expand(".k-pane:last");
                    this.altCollapsed = false;
                }
            }
            else {
                if (!this.altCollapsed) {
                    body2Splitter.collapse(".k-pane:last");
                    this.altCollapsed = true;
                }
            }
            // refresh main pane based (has or doesn't have view instances)
            if (this.mainViewInstances.length > 0) {
                if (this.mainCollapsed) {
                    body2Splitter.expand(".k-pane:first");
                    this.mainCollapsed = false;
                }
            }
            else {
                if (!this.mainCollapsed) {
                    body2Splitter.collapse(".k-pane:first");
                    this.mainCollapsed = true;
                }
            }
        };
        Shell.prototype.activate = function (params) {
            var that = this;
            this.hostId = params.hostId;
            this.sessionId = params.sessionId;
            this.stateDirectory.getStateSession(this.hostId, this.sessionId)
                .then(function (session) {
                that.session = session;
                that.session.activePaks.forEach(function (activePak) {
                    activePak.viewInstances.forEach(function (viewInstance) {
                        that.launchViewInstance(viewInstance);
                    });
                });
                that.viewInstancesLoadedResolve(true);
            });
        };
        Shell = __decorate([
            aurelia_framework_1.inject(state_directory_1.StateDirectory), 
            __metadata('design:paramtypes', [(typeof (_a = typeof state_directory_1.StateDirectory !== 'undefined' && state_directory_1.StateDirectory) === 'function' && _a) || Object])
        ], Shell);
        return Shell;
        var _a;
    }());
    exports.Shell = Shell;
});
