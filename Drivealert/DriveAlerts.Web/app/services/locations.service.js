app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getLocations = _getLocations;
        service.showOnMap = _showOnMap;

        function _showOnMap() {

        }

        function _getLocations(phoneNumber) {

            var d = $q.defer();
            // imitate request
            setTimeout(function () {
                //User    Phone Number    Activation Code    Last Activity Date    Install Date    Phone    Version    Options
                d.resolve([{
                    Date: "5/17/2017 3:19 PM",
                    Longitude: "43.3434333",
                    Latitude: "44.545452454",
                },
                {
                    Date: "5/17/2017 3:19 PM",
                    Longitude: "44.5434333",
                    Latitude: "45.54543432243",
                },
                {
                    Date: "5/17/2017 3:19 PM",
                    Longitude: "45.6834333",
                    Latitude: "46.545452454",
                },
                {
                    Date: "5/17/2017 3:19 PM",
                    Longitude: "44.7832333",
                    Latitude: "47.545452454",
                },
                {
                    Date: "5/17/2017 3:19 PM",
                    Longitude: "43.3434333",
                    Latitude: "48.545452454",
                },
                ]);
            }, 500);
            return d.promise;

            //return $http.post(serviceBase + "/location-trackings/phones/" + phoneNumber, null, { headers: { 'Content-Type': 'application/json' } })
            //    .then(function (result) {
            //        return result.data;
            //    }).catch(function (error) {
            //        return error;
            //    });
        }

        return service;
    }
]);