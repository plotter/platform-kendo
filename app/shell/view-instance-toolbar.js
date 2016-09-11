var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', '../platform/state/view-instance', './shell'], function (require, exports, aurelia_framework_1, view_instance_1, shell_1) {
    "use strict";
    var ViewInstanceToolbar = (function () {
        function ViewInstanceToolbar(shell) {
            var _this = this;
            this.shell = shell;
            this.moveItem = function (vi, index, viArr) {
                var that = _this;
                viArr.splice(index, 1);
                if (_this.activeViewInstance === vi && viArr.length > 0) {
                    _this.activeViewInstance = viArr[0];
                }
                if (vi.paneType === 'alt') {
                    vi.paneType = 'main';
                    _this.shell.launchViewInstance(vi);
                }
                else {
                    vi.paneType = 'alt';
                    _this.shell.launchViewInstance(vi);
                }
                setTimeout(function () {
                    that.shell.refreshSplitters();
                }, 50);
            };
            this.removeItem = function (vi, index, viArr) {
                var that = _this;
                viArr.splice(index, 1);
                if (_this.activeViewInstance === vi && viArr.length > 0) {
                    _this.activeViewInstance = viArr[0];
                }
                setTimeout(function () {
                    that.shell.refreshSplitters();
                }, 50);
            };
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', (typeof (_a = typeof view_instance_1.ViewInstance !== 'undefined' && view_instance_1.ViewInstance) === 'function' && _a) || Object)
        ], ViewInstanceToolbar.prototype, "activeViewInstance", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Array)
        ], ViewInstanceToolbar.prototype, "viewInstances", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], ViewInstanceToolbar.prototype, "showTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], ViewInstanceToolbar.prototype, "isUp", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Array)
        ], ViewInstanceToolbar.prototype, "moveToViewInstances", void 0);
        ViewInstanceToolbar = __decorate([
            aurelia_framework_1.customElement('view-instance-toolbar'),
            aurelia_framework_1.inject(shell_1.Shell), 
            __metadata('design:paramtypes', [(typeof (_b = typeof shell_1.Shell !== 'undefined' && shell_1.Shell) === 'function' && _b) || Object])
        ], ViewInstanceToolbar);
        return ViewInstanceToolbar;
        var _a, _b;
    }());
    exports.ViewInstanceToolbar = ViewInstanceToolbar;
});
