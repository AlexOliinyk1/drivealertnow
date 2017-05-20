app.factory('AuthService', ['$http', '$q', 'localStorageService', 'ngWebSettings',
    function ($http, $q, localStorageService, ngWebSettings) {

        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            userId: 0
        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&api_key=" + ngWebSettings.clientId;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(
                function (response) {
                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.data.userName });

                    _authentication.isAuth = true;
                    _authentication.userName = response.data.userName;
                    _authentication.userId = response.data.userId;

                    deferred.resolve(response);
                }, function (err, status) {
                    _logOut();
                    deferred.reject(err.data);
                });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }

        }

        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;

        return authServiceFactory;
    }
]);