var app = angular.module("DriveAlertNow", [
    'ngRoute',
    'LocalStorageModule',
]);

function AuthorizationError(description) {
    this.message = "Forbidden";
    this.description = description || "User authentication required.";
}

AuthorizationError.prototype = Object.create(Error.prototype);
AuthorizationError.prototype.constructor = AuthorizationError;