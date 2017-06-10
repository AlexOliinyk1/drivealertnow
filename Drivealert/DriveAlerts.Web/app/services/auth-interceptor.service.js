app.factory('AuthInterceptorService', ['$q', '$location', 'localStorageService', '$injector',
    function ($q, $location, localStorageService, $injector) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');

            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authData = localStorageService.get('authorizationData');
                if (authData != null) {
                    var authService = $injector.get('AuthService');
                    authService.logOut();
                }

                var bufferService = $injector.get('BufferService');

                if (bufferService.getIsIFrame()) {
                    $location.path('/unathorize');
                }
                else {
                    $location.path('/login');
                }
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }
]);