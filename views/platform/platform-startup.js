var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', 'aurelia-fetch-client', './state/state-directory', './plotter', './electron-helper', './phone-gap-helper'], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, state_directory_1, plotter_1, electron_helper_1, phone_gap_helper_1) {
    "use strict";
    var PlatformStartup = (function () {
        function PlatformStartup(httpClient, plotter, electronHelper, phoneGapHelper) {
            this.httpClient = httpClient;
            this.plotter = plotter;
            this.electronHelper = electronHelper;
            this.phoneGapHelper = phoneGapHelper;
        }
        PlatformStartup.prototype.start = function () {
            var that = this;
            return new Promise(function (resolve, reject) {
                var sdn = that.plotter.stateDirectoryName;
                // check if sdn has prefix (service:, githubgist:myStateDir[.json], localstorage:)
                if (sdn.toLowerCase().startsWith('service:')) {
                    reject('service not supported yet.');
                }
                else if (sdn.toLowerCase().startsWith('githubgist:')) {
                    reject('githubgist not supported yet.');
                }
                else if (sdn.toLowerCase().startsWith('localstorage:')) {
                    reject('localstorage not supported yet.');
                }
                else {
                    // check if (and use) platform origin has state-directory
                    // this.httpClient.baseUrl = 'http://localhost:9000/';
                    if (that.electronHelper.isElectron) {
                        var fs = that.electronHelper.fs;
                        var resourcePath = that.electronHelper.userDataPath;
                        fs.readFile(resourcePath + "/" + sdn + ".json", function (err, stringData) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            var data = JSON.parse(stringData);
                            var stateDirectory = state_directory_1.StateDirectory.fromJSON(data);
                            that.plotter.stateDirectory = stateDirectory;
                            resolve(stateDirectory);
                            return;
                        });
                    }
                    else if (that.phoneGapHelper.isPhoneGap) {
                        that.phoneGapHelper.readFromFile(sdn + ".json")
                            .then(function (o) {
                            var stateDirectory = state_directory_1.StateDirectory.fromJSON(o);
                            that.plotter.stateDirectory = stateDirectory;
                            resolve(stateDirectory);
                        })
                            .catch(function (r) { return reject(r); });
                    }
                    else {
                        that.httpClient.fetch(sdn + ".json")
                            .then(function (response) {
                            return response.json();
                        })
                            .then(function (data) {
                            var stateDirectory = state_directory_1.StateDirectory.fromJSON(data);
                            that.plotter.stateDirectory = stateDirectory;
                            resolve(stateDirectory);
                        })
                            .catch(function (reason) {
                            reject(new Error("fetch state-dictionary2: reason: \r\n\r\n" + reason));
                        });
                    }
                }
            });
        };
        PlatformStartup = __decorate([
            aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, plotter_1.Plotter, electron_helper_1.ElectronHelper, phone_gap_helper_1.PhoneGapHelper), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, plotter_1.Plotter, electron_helper_1.ElectronHelper, phone_gap_helper_1.PhoneGapHelper])
        ], PlatformStartup);
        return PlatformStartup;
    }());
    exports.PlatformStartup = PlatformStartup;
});
