define(["require", "exports"], function (require, exports) {
    "use strict";
    // Configure Bluebird Promises.
    // Note: You may want to use environment-specific configuration.
    // (<any> Promise).config({
    //   warnings: {
    //     wForgottenReturn: false,
    //   },
    // });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration();
        //.feature('resources');
        aurelia.use.developmentLogging();
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});
