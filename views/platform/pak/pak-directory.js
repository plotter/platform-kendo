define(["require", "exports", 'aurelia-fetch-client', './pak-repository-file', '../electron-helper', '../phone-gap-helper'], function (require, exports, aurelia_fetch_client_1, pak_repository_file_1, electron_helper_1, phone_gap_helper_1) {
    "use strict";
    var PakDirectory = (function () {
        function PakDirectory() {
        }
        PakDirectory.fromJSON = function (json) {
            var pakDirectory = new PakDirectory();
            // assign properties...
            pakDirectory.locked = json.locked;
            pakDirectory.uniqueId = json.uniqueId;
            pakDirectory.pakRepositories = json.pakRepositories.map(function (pakRepositoryJSON) {
                switch (pakRepositoryJSON.pakRepositoryType) {
                    case 'File':
                        {
                            var pakRepository = new pak_repository_file_1.PakRepositoryFile(new aurelia_fetch_client_1.HttpClient(), new electron_helper_1.ElectronHelper(), new phone_gap_helper_1.PhoneGapHelper());
                            pakRepository.locked = pakRepositoryJSON.locked;
                            pakRepository.uniqueId = pakRepositoryJSON.uniqueId;
                            pakRepository.pakRepositoryType = pakRepositoryJSON.pakRepositoryType;
                            pakRepository.path = pakRepositoryJSON.path;
                            pakRepository.pakDirectory = pakDirectory;
                            return pakRepository;
                        }
                    default:
                        throw new Error("repository " + pakRepositoryJSON.pakRepositoryType + " not supported.");
                }
            });
            return pakDirectory;
        };
        PakDirectory.prototype.toJSON = function () {
            return JSON.parse(JSON.stringify(this));
        };
        return PakDirectory;
    }());
    exports.PakDirectory = PakDirectory;
});
