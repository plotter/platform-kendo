import {Aurelia} from 'aurelia-framework';

// Configure Bluebird Promises.
// Note: You may want to use environment-specific configuration.
// (<any> Promise).config({
//   warnings: {
//     wForgottenReturn: false,
//   },
// });

export function configure(aurelia: Aurelia) {

  aurelia.use
    .standardConfiguration()
    //.feature('resources');

  aurelia.use.developmentLogging();

  aurelia.start().then(() => aurelia.setRoot());
}
