define(["require", "exports"], function (require, exports) {
    "use strict";
    var View = (function () {
        function View() {
        }
        View.fromJSON = function (json) {
            var view = new View();
            view.locked = json.locked;
            view.uniqueId = json.uniqueId;
            view.pane = json.pane;
            view.moduleUrl = json.moduleUrl;
            return view;
        };
        return View;
    }());
    exports.View = View;
});
