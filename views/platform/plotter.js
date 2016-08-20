define(["require", "exports"], function (require, exports) {
    "use strict";
    var Plotter = (function () {
        function Plotter() {
            this.stateDirectoryName = 'state-directory';
        }
        Object.defineProperty(Plotter.prototype, "stateDirectory", {
            get: function () {
                return this.myStateDirectory;
            },
            set: function (value) {
                this.myStateDirectory = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Plotter.prototype, "stateRepository", {
            get: function () {
                return this.myStateRepository;
            },
            set: function (value) {
                this.myStateRepository = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Plotter.prototype, "stateSession", {
            get: function () {
                return this.myStateSession;
            },
            set: function (value) {
                this.myStateSession = value;
            },
            enumerable: true,
            configurable: true
        });
        return Plotter;
    }());
    exports.Plotter = Plotter;
});
