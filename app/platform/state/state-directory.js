define(["require", "exports", 'aurelia-fetch-client', './state-repository-file', '../electron-helper', '../phone-gap-helper'], function (require, exports, aurelia_fetch_client_1, state_repository_file_1, electron_helper_1, phone_gap_helper_1) {
    "use strict";
    var StateDirectory = (function () {
        function StateDirectory() {
        }
        StateDirectory.fromJSON = function (json) {
            var stateDirectory = new StateDirectory();
            // assign properties...
            stateDirectory.locked = json.locked;
            stateDirectory.uniqueId = json.uniqueId;
            stateDirectory.stateRepositories = json.stateRepositories.map(function (stateRepositoryJSON) {
                switch (stateRepositoryJSON.stateRepositoryType) {
                    case 'File':
                        {
                            var stateRepository = new state_repository_file_1.StateRepositoryFile(new aurelia_fetch_client_1.HttpClient(), new electron_helper_1.ElectronHelper(), new phone_gap_helper_1.PhoneGapHelper());
                            stateRepository.locked = stateRepositoryJSON.locked;
                            stateRepository.uniqueId = stateRepositoryJSON.uniqueId;
                            stateRepository.stateRepositoryType = stateRepositoryJSON.stateRepositoryType;
                            stateRepository.path = stateRepositoryJSON.path;
                            stateRepository.stateDirectory = stateDirectory;
                            return stateRepository;
                        }
                    default:
                        throw new Error("repository " + stateRepositoryJSON.stateRepositoryType + " not supported.");
                }
            });
            return stateDirectory;
        };
        StateDirectory.prototype.getStateRepository = function (uniqueId) {
            // let the default plotter host (aka state repository) be the first one in the list
            if (!uniqueId && this.stateRepositories.length > 0) {
                return this.stateRepositories[0];
            }
            var repoMatch = null;
            this.stateRepositories.some(function (repo) {
                if (repo.uniqueId === uniqueId) {
                    repoMatch = repo;
                    return true; // stops processing, so we choose the first repo having that unique id
                }
                return false;
            });
            return repoMatch;
        };
        StateDirectory.prototype.getStateSession = function (stateRepositoryId, stateSessionId) {
            var repo = this.getStateRepository(stateRepositoryId);
            if (!repo) {
                throw new Error("Could not retrieve repository: " + stateRepositoryId);
            }
            return repo.getStateSession(stateSessionId);
        };
        StateDirectory.prototype.toJSON = function () {
            return {
                locked: this.locked,
                stateRepositories: this.stateRepositories.map(function (stateRepository) { return stateRepository.toJSON(); }),
                uniqueId: this.uniqueId,
            };
        };
        return StateDirectory;
    }());
    exports.StateDirectory = StateDirectory;
});
