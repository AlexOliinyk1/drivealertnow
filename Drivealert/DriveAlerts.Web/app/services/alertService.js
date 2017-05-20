app.factory('AlertService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri;

        var alertServiceFactory = {};

        function _getAlerts() {
            return $http.get(serviceBase + '???').then(function (results) {
                return results;
            });
        }

        function _createAlert() {
            var deferred = $q.defer();

            $http.post(serviceBase + 'alerts').then(function (results) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        }

        alertServiceFactory.getAlerts = _getAlerts;
        alertServiceFactory.createAlerts = _createAlert;
        return alertServiceFactory;
    }
]);