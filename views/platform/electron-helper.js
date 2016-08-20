define(["require", "exports"], function (require, exports) {
    "use strict";
    var ElectronHelper = (function () {
        function ElectronHelper() {
        }
        Object.defineProperty(ElectronHelper.prototype, "isElectron", {
            get: function () {
                return this.fs && window.location
                    && window.location.toString().startsWith('file:');
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ElectronHelper.prototype, "fs", {
            get: function () {
                return window.nodeReq && window.nodeReq('fs');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElectronHelper.prototype, "app", {
            get: function () {
                return window.nodeReq && window.nodeReq('app');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElectronHelper.prototype, "process", {
            get: function () {
                return window.nodeReq && window.nodeReq('process');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElectronHelper.prototype, "userDataPath", {
            get: function () {
                return window.__dirname;
            },
            enumerable: true,
            configurable: true
        });
        return ElectronHelper;
    }());
    exports.ElectronHelper = ElectronHelper;
});
