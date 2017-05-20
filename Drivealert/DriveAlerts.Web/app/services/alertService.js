app.factory('AlertService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var alertServiceFactory = {};

        function _getAlerts(phoneNumber, searchParams) {
            return $http.post(serviceBase + '/alerts/phones/' + phoneNumber, searchParams, { headers: { 'Content-Type': 'application/json' } });
        }

        function _createAlert() {
            return $http.post(serviceBase + 'alerts');
        }

        alertServiceFactory.getAlerts = _getAlerts;
        alertServiceFactory.createAlerts = _createAlert;
        return alertServiceFactory;
    }
]);