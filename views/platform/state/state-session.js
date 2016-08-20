define(["require", "exports", './active-pak'], function (require, exports, active_pak_1) {
    "use strict";
    var StateSession = (function () {
        function StateSession() {
            this.activePaks = [];
        }
        StateSession.fromJSON = function (json) {
            var stateSession = new StateSession();
            // assign properties...
            stateSession.locked = json.locked;
            stateSession.uniqueId = json.uniqueId;
            stateSession.activePaks = json.activePaks.map(function (activePakJson) {
                var activePak = active_pak_1.ActivePak.fromJSON(activePakJson);
                activePak.stateSession = stateSession;
                return activePak;
            });
            return stateSession;
        };
        return StateSession;
    }());
    exports.StateSession = StateSession;
});
