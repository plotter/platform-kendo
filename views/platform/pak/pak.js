define(["require", "exports", './view'], function (require, exports, view_1) {
    "use strict";
    var Pak = (function () {
        function Pak() {
        }
        Pak.fromJSON = function (json) {
            var pak = new Pak();
            // assign properties...
            pak.locked = json.locked;
            pak.uniqueId = json.uniqueId;
            pak.views = json.views.map(function (viewJson) {
                var view = view_1.View.fromJSON(viewJson);
                view.pak = pak;
                return view;
            });
            return pak;
        };
        Pak.prototype.getView = function (viewId) {
            var views = this.views.filter(function (view) { return view.uniqueId === viewId; });
            if (views.length > 0) {
                return views[0];
            }
            return null;
        };
        return Pak;
    }());
    exports.Pak = Pak;
});
