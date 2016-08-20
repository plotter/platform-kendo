var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', '../../shell/shell'], function (require, exports, aurelia_framework_1, shell_1) {
    "use strict";
    var One = (function () {
        function One(shell) {
            this.shell = shell;
            this.targetPane = 'main';
            this.targetMessage = 'some message from you...';
            this.targetViewModel = '../views/one/one';
        }
        One.prototype.activate = function (model) {
            this.model = model;
        };
        One.prototype.launchTarget = function () {
            // alert(`Launch Target: ${this.targetPane} / ${this.targetMessage}...`)
            this.shell.launchViewInstanceJSON({
                'uniqueId': 'vi-05',
                'viewId': 'view3',
                'paneType': this.targetPane,
                'viewTemplate': null,
                'viewModel': this.targetViewModel,
                'viewState': {
                    'a': this.targetMessage,
                },
            });
        };
        One = __decorate([
            aurelia_framework_1.inject(shell_1.Shell), 
            __metadata('design:paramtypes', [shell_1.Shell])
        ], One);
        return One;
    }());
    exports.One = One;
});
