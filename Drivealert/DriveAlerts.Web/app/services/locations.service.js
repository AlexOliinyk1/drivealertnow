app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        function _getLocations(phoneNumber) {
            return $http.post(serviceBase + "/location-trackings/phones/" + phoneNumber, null, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                }).catch(function (error) {
                    return error;
                });
        }

        service.getLocations = _getLocations;
        return service;
    }
]);