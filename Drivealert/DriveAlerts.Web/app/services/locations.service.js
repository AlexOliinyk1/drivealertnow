app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getLocations = _getLocations;
        service.showOnMap = _showOnMap;

        function _showOnMap() {

        }

        function _getLocations(phoneNumber, searchParams) {
            return $http.post(serviceBase + "location-trackings/phones/" + phoneNumber, searchParams, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data.LocationTrackings;
                }).catch(function (error) {
                    console.log(error);
                    return [];
                });
        }

        return service;
    }
]);