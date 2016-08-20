var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', 'aurelia-fetch-client', './pak', '../electron-helper', '../phone-gap-helper'], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, pak_1, electron_helper_1, phone_gap_helper_1) {
    "use strict";
    var PakRepositoryFile = (function () {
        function PakRepositoryFile(httpClient, electronHelper, phoneGapHelper) {
            var _this = this;
            this.httpClient = httpClient;
            this.electronHelper = electronHelper;
            this.phoneGapHelper = phoneGapHelper;
            this.locked = false;
            this.uniqueId = 'state-provider';
            this.pakRepositoryType = 'File';
            this.pakMap = new Map();
            this.pakPromiseMap = new Map();
            this.getPak = function (pakId) {
                if (_this.pakPromiseMap.has(pakId)) {
                    return _this.pakPromiseMap.get(pakId);
                }
                var that = _this;
                var pakPromise = new Promise(function (resolve, reject) {
                    if (that.electronHelper.isElectron) {
                        var fs = that.electronHelper.fs;
                        var resourcePath = that.electronHelper.userDataPath;
                        fs.readFile(resourcePath + "/" + that.path + "/" + that.uniqueId + "/" + pakId + ".json", function (reason, stringData) {
                            if (reason) {
                                reject(new Error("fetch pak failed: reason: \r\n\r\n" + reason));
                                return;
                            }
                            var data = JSON.parse(stringData);
                            var pak = pak_1.Pak.fromJSON(data);
                            pak.pakRepository = that;
                            that.pakMap.set(pakId, pak);
                            resolve(pak);
                            return;
                        });
                    }
                    else if (that.phoneGapHelper.isPhoneGap) {
                        var pakFile = that.path + "/" + that.uniqueId + "/" + pakId + ".json";
                        that.phoneGapHelper.readFromFile("" + pakFile)
                            .then(function (o) {
                            var pak = pak_1.Pak.fromJSON(o);
                            pak.pakRepository = that;
                            that.pakMap.set(pakId, pak);
                            resolve(pak);
                        })
                            .catch(function (r) { return reject(r); });
                    }
                    else {
                        that.httpClient.fetch(that.path + "/" + that.uniqueId + "/" + pakId + ".json")
                            .then(function (response) {
                            return response.json();
                        })
                            .then(function (data) {
                            var pak = pak_1.Pak.fromJSON(data);
                            pak.pakRepository = that;
                            that.pakMap.set(pakId, pak);
                            resolve(pak);
                        })
                            .catch(function (reason) {
                            reject(new Error("fetch pak failed: reason: \r\n\r\n" + reason));
                        });
                    }
                });
                _this.pakPromiseMap.set(pakId, pakPromise);
                return pakPromise;
            };
            this.getPakList = function () {
                var that = _this;
                return new Promise(function (resolve, reject) {
                    if (that.electronHelper.isElectron) {
                        var fs = that.electronHelper.fs;
                        var resourcePath = that.electronHelper.userDataPath;
                        fs.readFile(resourcePath + "/" + that.path + "/" + that.uniqueId + "/pak-list.json", function (reason, stringData) {
                            if (reason) {
                                reject(new Error("fetch pak list failed: reason: \r\n\r\n" + reason));
                                return;
                            }
                            var data = JSON.parse(stringData);
                            that.pakList = data.pakList;
                            resolve(data.pakList);
                            return;
                        });
                    }
                    else if (that.phoneGapHelper.isPhoneGap) {
                        var pakListFile = that.path + "/" + that.uniqueId + "/pak-list.json";
                        that.phoneGapHelper.readFromFile("" + pakListFile)
                            .then(function (o) {
                            that.pakList = o.pakList;
                            resolve(o.pakList);
                        })
                            .catch(function (r) { return reject(r); });
                    }
                    else {
                        that.httpClient.fetch(that.path + "/" + that.uniqueId + "/pak-list.json")
                            .then(function (response) {
                            return response.json();
                        })
                            .then(function (data) {
                            that.pakList = data.pakList;
                            resolve(data.pakList);
                        })
                            .catch(function (reason) {
                            reject(new Error("fetch pak list failed: reason: \r\n\r\n" + reason));
                        });
                    }
                });
            };
        }
        PakRepositoryFile = __decorate([
            aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, electron_helper_1.ElectronHelper, phone_gap_helper_1.PhoneGapHelper), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, electron_helper_1.ElectronHelper, phone_gap_helper_1.PhoneGapHelper])
        ], PakRepositoryFile);
        return PakRepositoryFile;
    }());
    exports.PakRepositoryFile = PakRepositoryFile;
});
