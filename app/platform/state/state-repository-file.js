var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', 'aurelia-fetch-client', '../pak/pak-directory', './state-session', '../electron-helper', '../phone-gap-helper'], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, pak_directory_1, state_session_1, electron_helper_1, phone_gap_helper_1) {
    "use strict";
    var StateRepositoryFile = (function () {
        function StateRepositoryFile(httpClient, electronHelper, phoneGapHelper) {
            var _this = this;
            this.httpClient = httpClient;
            this.electronHelper = electronHelper;
            this.phoneGapHelper = phoneGapHelper;
            this.locked = false;
            this.uniqueId = 'state-repository';
            this.stateRepositoryType = 'File';
            this.stateSessionPromiseMap = new Map();
            this.stateSessionMap = new Map();
            this.getPakDirectory = function () {
                if (_this.pakDirectoryPromise) {
                    return _this.pakDirectoryPromise;
                }
                var that = _this;
                return _this.pakDirectoryPromise = new Promise(function (resolve, reject) {
                    if (that.electronHelper.isElectron) {
                        var fs = that.electronHelper.fs;
                        var resourcePath = that.electronHelper.userDataPath;
                        fs.readFile(resourcePath + "/" + that.path + "/" + that.uniqueId + "/pak-directory.json", function (reason, stringData) {
                            if (reason) {
                                reject(new Error("fetch pak-directory failed: reason: \r\n\r\n" + reason));
                                return;
                            }
                            var data = JSON.parse(stringData);
                            var pakDirectory = pak_directory_1.PakDirectory.fromJSON(data);
                            pakDirectory.stateRepository = that;
                            resolve(pakDirectory);
                            return;
                        });
                    }
                    else if (that.phoneGapHelper.isPhoneGap) {
                        var pakDirectoryFile = that.path + "/" + that.uniqueId + "/pak-directory.json";
                        that.phoneGapHelper.readFromFile("" + pakDirectoryFile)
                            .then(function (o) {
                            var pakDirectory = pak_directory_1.PakDirectory.fromJSON(o);
                            pakDirectory.stateRepository = that;
                            resolve(pakDirectory);
                        })
                            .catch(function (r) { return reject(r.toString()); });
                    }
                    else {
                        that.httpClient.fetch(that.path + "/" + that.uniqueId + "/pak-directory.json")
                            .then(function (response) {
                            return response.json();
                        })
                            .then(function (data) {
                            var pakDirectory = pak_directory_1.PakDirectory.fromJSON(data);
                            pakDirectory.stateRepository = that;
                            resolve(pakDirectory);
                        })
                            .catch(function (reason) {
                            reject(new Error("fetch pak-directory failed: reason: \r\n\r\n" + reason));
                        });
                    }
                });
            };
        }
        StateRepositoryFile.fromJSON = function (json) {
            var stateRepository = new StateRepositoryFile(new aurelia_fetch_client_1.HttpClient(), new electron_helper_1.ElectronHelper(), new phone_gap_helper_1.PhoneGapHelper());
            // assign properties...
            stateRepository.locked = json.locked;
            stateRepository.uniqueId = json.uniqueId;
            stateRepository.stateRepositoryType = json.stateRepositoryType;
            stateRepository.path = json.path;
            return stateRepository;
        };
        StateRepositoryFile.prototype.getStateSession = function (sessionId) {
            if (this.stateSessionPromiseMap.has(sessionId)) {
                return this.stateSessionPromiseMap.get(sessionId);
            }
            var that = this;
            var stateSessionPromise = new Promise(function (resolve, reject) {
                if (that.electronHelper.isElectron) {
                    var fs = that.electronHelper.fs;
                    var resourcePath = that.electronHelper.userDataPath;
                    fs.readFile(resourcePath + "/" + that.path + "/" + that.uniqueId + "/" + sessionId + ".json", function (reason, stringData) {
                        if (reason) {
                            reject(new Error("fetch session list: reason: \r\n\r\n" + reason));
                            return;
                        }
                        var data = JSON.parse(stringData);
                        var stateSession = state_session_1.StateSession.fromJSON(data);
                        stateSession.stateRepository = that;
                        that.stateSessionMap.set(sessionId, stateSession);
                        resolve(stateSession);
                        return;
                    });
                }
                else if (that.phoneGapHelper.isPhoneGap) {
                    var stateSessionFile = that.path + "/" + that.uniqueId + "/" + sessionId + ".json";
                    that.phoneGapHelper.readFromFile("" + stateSessionFile)
                        .then(function (o) {
                        var stateSession = state_session_1.StateSession.fromJSON(o);
                        stateSession.stateRepository = that;
                        that.stateSessionMap.set(sessionId, stateSession);
                        resolve(stateSession);
                    })
                        .catch(function (r) { return reject(r); });
                }
                else {
                    that.httpClient.fetch(that.path + "/" + that.uniqueId + "/" + sessionId + ".json")
                        .then(function (response) {
                        return response.json();
                    })
                        .then(function (data) {
                        var stateSession = state_session_1.StateSession.fromJSON(data);
                        stateSession.stateRepository = that;
                        that.stateSessionMap.set(sessionId, stateSession);
                        resolve(stateSession);
                    })
                        .catch(function (reason) {
                        reject(new Error("fetch session list: reason: \r\n\r\n" + reason));
                    });
                }
            });
            this.stateSessionPromiseMap.set(sessionId, stateSessionPromise);
            return stateSessionPromise;
        };
        StateRepositoryFile.prototype.getSessionList = function () {
            var that = this;
            return new Promise(function (resolve, reject) {
                if (that.electronHelper.isElectron) {
                    var fs = that.electronHelper.fs;
                    var resourcePath = that.electronHelper.userDataPath;
                    fs.readFile(resourcePath + "/" + that.path + "/" + that.uniqueId + "/session-list.json", function (reason, stringData) {
                        if (reason) {
                            reject(new Error("fetch session list: reason: \r\n\r\n" + reason));
                            return;
                        }
                        var data = JSON.parse(stringData);
                        resolve(data.sessionList);
                        return;
                    });
                }
                else if (that.phoneGapHelper.isPhoneGap) {
                    var sessionListFile = that.path + "/" + that.uniqueId + "/session-list.json";
                    that.phoneGapHelper.readFromFile("" + sessionListFile)
                        .then(function (data) {
                        resolve(data.sessionList);
                    })
                        .catch(function (r) { return reject(r); });
                }
                else {
                    that.httpClient.fetch(that.path + "/" + that.uniqueId + "/session-list.json")
                        .then(function (response) {
                        return response.json();
                    })
                        .then(function (data) {
                        resolve(data.sessionList);
                    })
                        .catch(function (reason) {
                        reject(new Error("fetch session list: reason: \r\n\r\n" + reason));
                    });
                }
            });
        };
        StateRepositoryFile.prototype.toJSON = function () {
            return {
                locked: this.locked,
                stateRepositoryType: this.stateRepositoryType,
                uniqueId: this.uniqueId,
                path: this.path,
            };
        };
        StateRepositoryFile = __decorate([
            aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, electron_helper_1.ElectronHelper, phone_gap_helper_1.PhoneGapHelper), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, electron_helper_1.ElectronHelper, phone_gap_helper_1.PhoneGapHelper])
        ], StateRepositoryFile);
        return StateRepositoryFile;
    }());
    exports.StateRepositoryFile = StateRepositoryFile;
});
// 
