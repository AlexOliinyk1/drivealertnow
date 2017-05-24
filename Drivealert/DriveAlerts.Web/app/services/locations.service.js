app.factory('LocationService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getLocations = _getFakeLocations;
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

        function _getFakeLocations() {
            //  mock data
            var d = $q.defer();
            setTimeout(function () {
                d.resolve([
                    {
                        Selected: false,
                        Date: "5/20/2017 9:24:03 AM",
                        Longitude: "40.887801675164",
                        Latitude: "-73.424288593301"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 3:10:07 PM",
                        Longitude: "40.8729421238853",
                        Latitude: "-73.4210208237099"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 2:49:59 PM",
                        Longitude: "40.7719467580698",
                        Latitude: "-73.4222734161405"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 2:10:19 PM",
                        Longitude: "40.8235885017",
                        Latitude: "-73.4125429485677"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 1:50:14 PM",
                        Longitude: "40.8855578815945",
                        Latitude: "-73.417848022723"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 12:46:34 PM",
                        Longitude: "40.8454840863504",
                        Latitude: "-73.4064258356331"
                    },
                    {
                        Selected: false,
                        Date: "5/19/2017 12:16:28 PM",
                        Longitude: "40.8957626810678",
                        Latitude: "-73.4298960027037"
                    }
                ]);
            }, 1000);

            return d.promise;
        }

        return service;
    }
]);