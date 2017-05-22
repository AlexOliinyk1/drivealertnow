app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getLocations = _getLocations;
        service.showOnMap = _showOnMap;

        function _showOnMap() {

        }

        function _getLocations(phoneNumber) {
            return $http.post(serviceBase + "/location-trackings/phones/" + phoneNumber, null, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                }).catch(function (error) {
                    return error;
                });
        }

        return service;
    }
]);