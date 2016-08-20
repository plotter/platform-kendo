define(["require", "exports", './view-instance'], function (require, exports, view_instance_1) {
    "use strict";
    var ActivePak = (function () {
        function ActivePak() {
        }
        ActivePak.fromJSON = function (json) {
            var activePak = new ActivePak();
            activePak.locked = json.locked;
            activePak.uniqueId = json.uniqueId;
            activePak.pakHostId = json.pakHostId;
            activePak.pakId = json.pakId;
            activePak.viewInstances = json.viewInstances.map(function (viewInstanceJson) {
                var viewInstance = view_instance_1.ViewInstance.fromJSON(viewInstanceJson);
                viewInstance.activePak = activePak;
                return viewInstance;
            });
            // let this run on the next 'tick' since it uses activePak's stateSession property 
            //    which isn't set until the return of this function
            setTimeout(function () { return activePak.getPak(); }, 0);
            return activePak;
        };
        ActivePak.prototype.getPak = function () {
            if (this.pakPromise) {
                return this.pakPromise;
            }
            var that = this;
            return this.pakPromise = that.stateSession.stateRepository.getPakDirectory()
                .then(function (pakDirectory) {
                var pakHosts = pakDirectory.pakRepositories.filter(function (pr) { return pr.uniqueId === that.pakHostId; });
                if (pakHosts.length >= 1) {
                    var pakHost = pakHosts[0];
                    return pakHost.getPak(that.pakId)
                        .then(function (pak) {
                        that.pak = pak;
                        return pak;
                    });
                }
                else {
                    throw (new Error("Failed to get pak - couldn't find pakHost(" + that.pakHostId + ")"));
                }
            });
        };
        return ActivePak;
    }());
    exports.ActivePak = ActivePak;
});
