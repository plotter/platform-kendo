var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', '../platform/state/view-instance'], function (require, exports, aurelia_framework_1, view_instance_1) {
    "use strict";
    var ViewInstanceToolbar = (function () {
        function ViewInstanceToolbar() {
            var _this = this;
            this.removeItem = function (vi, index, viArr) {
                viArr.splice(index, 1);
                if (_this.activeViewInstance === vi && viArr.length > 0) {
                    _this.activeViewInstance = viArr[0];
                }
            };
        }
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', view_instance_1.ViewInstance)
        ], ViewInstanceToolbar.prototype, "activeViewInstance", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Array)
        ], ViewInstanceToolbar.prototype, "viewInstances", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], ViewInstanceToolbar.prototype, "showTitle", void 0);
        ViewInstanceToolbar = __decorate([
            aurelia_framework_1.customElement('view-instance-toolbar'), 
            __metadata('design:paramtypes', [])
        ], ViewInstanceToolbar);
        return ViewInstanceToolbar;
    }());
    exports.ViewInstanceToolbar = ViewInstanceToolbar;
});
