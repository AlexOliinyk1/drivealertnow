﻿app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var service = {};

        service.getLocations = _getLocations;
        service.toGoogleCoordinates = _toGoogleCoordinates;

        return service;

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
            return $http.post(ngWebSettings.api.locationsSearch + phoneNumber, searchParams, { headers: { 'Content-Type': 'application/json' } })
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
                        Date: new Date(),
                        Longitude: "-74.181818181818",
                        Latitude: "40.747474747474"
                    },
                    {
                        Selected: false,
                        Date: new Date(),
                        Longitude: "-73.424242424242",
                        Latitude: "40.878787878787"
                    },
                    {
                        Selected: false,
                        Date: new Date(),
                        Longitude: "-74.101010101010",
                        Latitude: "40.646464646464"
                    },
                    {
                        Selected: false,
                        Date: new Date(),
                        Latitude: "40.545454545454",
                        Longitude: "-74.050505050505"
                    },
                    {
                        Selected: false,
                        Date: new Date(),
                        Latitude: "0",
                        Longitude: "0"
                    },
                    {
                        Selected: false,
                        Date: new Date(),
                        Latitude: "40.444444444444",
                        Longitude: "-74"
                    }
                ]);
            }, 1000);

            return d.promise;
        }

    }
]);