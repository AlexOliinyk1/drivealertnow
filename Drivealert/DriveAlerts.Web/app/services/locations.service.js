app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        function _getLocations(phoneNumber) {
            return $http.post(serviceBase + '/locations/phones/' + phoneNumber, { headers: { 'Content-Type': 'application/json' } });
        }

        service.getAlerts = _getLocations;
        return service;
    }
]);