app.factory('AlertService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var alertServiceFactory = {};

        function _getAlerts(phoneNumber, searchParams) {
            return $http.post(serviceBase + "alerts/phones/" + phoneNumber, searchParams, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data.Alerts;
                }).catch(function (error) {
                    console.log(error);
                    return [];
                });
        }

        alertServiceFactory.getAlerts = _getAlerts;
        return alertServiceFactory;
    }
]);