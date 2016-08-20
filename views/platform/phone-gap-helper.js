define(["require", "exports"], function (require, exports) {
    "use strict";
    var PhoneGapHelper = (function () {
        function PhoneGapHelper() {
            var _this = this;
            this.readFromFile = function (fileName) {
                var that = _this;
                return new Promise(function (resolve, reject) {
                    var pathToFile = "" + _this.baseUrl + fileName;
                    window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                resolve(JSON.parse(this.result));
                            };
                            reader.readAsText(file);
                        }, function (reason) {
                            reject(new Error("fileEntry.file Failed.  " + that.errorHandler(fileName, reason) + " Reason: " + JSON.stringify(reason)));
                        });
                    }, function (reason) {
                        reject(new Error("resolveLocalFileSystemURL Failed.  " + that.errorHandler(fileName, reason) + " Reason: " + JSON.stringify(reason)));
                    });
                });
            };
            this.errorHandler = function (fileName, e) {
                var msg = '';
                switch (e.code) {
                    case window.FileError.QUOTA_EXCEEDED_ERR:
                        msg = 'Storage quota exceeded';
                        break;
                    case window.FileError.NOT_FOUND_ERR:
                        msg = 'File not found';
                        break;
                    case window.FileError.SECURITY_ERR:
                        msg = 'Security error';
                        break;
                    case window.FileError.INVALID_MODIFICATION_ERR:
                        msg = 'Invalid modification';
                        break;
                    case window.FileError.INVALID_STATE_ERR:
                        msg = 'Invalid state';
                        break;
                    default:
                        msg = 'Unknown error';
                        break;
                }
                ;
                return "Error (" + fileName + "): " + msg;
            };
        }
        Object.defineProperty(PhoneGapHelper.prototype, "baseUrl", {
            get: function () {
                // only set it the first time
                window.plotterRootPath = window.plotterRootPath
                    || window.location.toString().replace('index.html', '');
                return window.plotterRootPath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PhoneGapHelper.prototype, "isPhoneGap", {
            get: function () {
                return window.cordova && window.location
                    && window.location.toString().startsWith('file:');
            },
            enumerable: true,
            configurable: true
        });
        ;
        return PhoneGapHelper;
    }());
    exports.PhoneGapHelper = PhoneGapHelper;
});
