var app = angular.module("DriveAlertNow", [
    'ngRoute',
    'LocalStorageModule',
    'oitozero.ngSweetAlert',
    'ngSanitize',
    'ngMap'
    ]);

function AuthorizationError(description) {
    this.message = "Forbidden";
    this.description = description || "User authentication required.";
}

AuthorizationError.prototype = Object.create(AuthorizationError.prototype);
AuthorizationError.prototype.constructor = AuthorizationError;
