app.factory('AccountService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var service = this;

        service.getUserData = _getUserData;
        service.updateUserData = _updateUserData;
        service.changeUserPassword = _changeUserPassword;

        function _getUserData(userId) {
            return $http.get(ngWebSettings.api.getAccountInfo + userId, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                })
                .catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        function _updateUserData(userInfo) {
            return $http.put(ngWebSettings.api.updateAccountInfo, userInfo, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return true;
                })
                .catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        function _changeUserPassword(passwordData) {
            return $http.put(ngWebSettings.api.changePasswordAccount, passwordData, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return true;
                })
                .catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        return service;
    }
])