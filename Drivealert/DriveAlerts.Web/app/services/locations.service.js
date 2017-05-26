app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getLocations = _getFakeLocations;
        service.toGoogleCoordinates = _toGoogleCoordinates;

        function _toGoogleCoordinates(coordinates) {
            var d = $q.defer();
            var result = [];

            angular.forEach(coordinates, function (value, key) {
                if (value.Selected) {
                    result.push([value.Latitude, value.Longitude]);
                }

                if (key == coordinates.length - 1) {
                    d.resolve(result);
                }
            })

            return d.promise;
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

        function _getFakeLocations() {
            //  mock data
            var d = $q.defer();
            setTimeout(function () {
                d.resolve([
                    {
                        Selected: false,
                        Date: "5/20/2017 9:24:03 AM",
                        Longitude: "-74.18",
                        Latitude: "40.74"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 3:10:07 PM",
                        Longitude: "-73.42",
                        Latitude: "40.87"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 2:49:59 PM",
                        Longitude: "-74.10",
                        Latitude: "40.64"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 2:10:19 PM",
                        Latitude: "40.54",
                        Longitude: "-74.05"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 1:50:14 PM",
                        Latitude: "40.44",
                        Longitude: "-74"
                    }
                ]);
            }, 1000);

            return d.promise;
        }

        return service;
    }
]);