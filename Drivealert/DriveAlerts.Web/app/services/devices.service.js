app.factory('DevicesService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri;
        var service = {};

        service.getDevices = _getFakeDevices;
        service.createDevice = _createDevice;
        service.updateDevice = _updateDevice;
        service.removeDevice = _removeDevice;

        //  GET /phones/user/{userId}
        function _getDevices(userId) {
            var url = serviceBase + 'phones/user/' + userId;
            return $http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                });
        }

        function _getFakeDevices() {
            var d = $q.defer();
            // imitate request
            setTimeout(function () {
                //User    Phone Number    Activation Code    Last Activity Date    Install Date    Phone    Version    Options
                d.resolve([{
                    FirstName: "Social",
                    LastName: "Judo",
                    PhoneNumber: '1111111111',
                    PhoneId: 1,
                    ActivationCode: "6F17A6",
                    LastActivityDate: "5/17/2017 3:19 PM",
                    InstallDate: "4/26/2016 2:14 PM",
                    Phone: "Android",
                    Version: "4.0.4"
                },
                {
                    User: "Another User",
                    PhoneNumber: '1111111112',
                    PhoneId: 2,
                    ActivationCode: "3IZR8K",
                    LastActivityDate: "5/1/2017 6:29 AM",
                    InstallDate: "6/7/2016 9:51 PM",
                    Phone: "iOS",
                    Version: ""
                }]);
            }, 1000);
            return d.promise;
        }

        //  POST /phones/user/{userId}
        function _createDevice(userId, device) {
            var url = serviceBase + 'phones/user/' + userId;
            return $http.post(url, device, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.status;
                }).catch(function (error) {
                    return error.data;
                });
        }

        //  PUT /phones/{phoneId}
        function _updateDevice(id, device) {
            return $http.put(serviceBase + 'phones/' + id, device, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.status
                }).catch(function (error) {
                    return error;
                });
        }

        //  DELETE /phones
        function _removeDevice(id) {
            return $http.delete(serviceBase + 'phones/' + id, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.status
                }).catch(function (error) {
                    return error;
                });
        }

        return service;
    }
]);