define(["require", "exports"], function (require, exports) {
    "use strict";
    var ViewInstance = (function () {
        function ViewInstance() {
        }
        ViewInstance.fromJSON = function (json) {
            var viewInstance = new ViewInstance();
            viewInstance.uniqueId = json.uniqueId;
            if (!json.title) {
                viewInstance.title = json.uniqueId;
            }
            else {
                viewInstance.title = json.title;
            }
            viewInstance.viewId = json.viewId;
            viewInstance.viewTemplate = json.viewTemplate;
            viewInstance.viewModel = json.viewModel;
            viewInstance.viewState = json.viewState;
            viewInstance.paneType = json.paneType;
            return viewInstance;
        };
        ViewInstance.prototype.getView = function () {
            if (this.viewPromise) {
                return this.viewPromise;
            }
            var that = this;
            return this.viewPromise = that.activePak.stateSession.stateRepository.getPakDirectory()
                .then(function (pakDirectory) {
                var pakHosts = pakDirectory.pakRepositories.filter(function (pr) { return pr.uniqueId === that.activePak.pakHostId; });
                if (pakHosts.length >= 1) {
                    var pakHost = pakHosts[0];
                    return pakHost.getPak(that.activePak.pakId)
                        .then(function (pak) {
                        var view = pak.getView(that.viewId);
                        that.view = view;
                        return view;
                    });
                }
                else {
                    throw (new Error("Failed to get pak - couldn't find pakHost(" + that.activePak.pakHostId + ")"));
                }
            });
        };
        return ViewInstance;
    }());
    exports.ViewInstance = ViewInstance;
});
