app.factory('DevicesService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getDevices = _getDevices;
        service.createDevice = _createDevice;
        service.updateDevice = _updateDevice;
        service.removeDevice = _removeDevice;

        //  GET /v1/phones/user/{userId}
        function _getDevices(userId) {
            var url = serviceBase + 'phones/users/' + userId;
            return $http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    var phones = result.data;
                    for (var i = 0; i < phones.length; i++) {
                        phones.disabled = false;
                    }

                    return phones;
                }).catch(function (error) {
                    console.log(error);
                    return [];
                });
        }

        //  POST /v1/phones/user/{userId}
        function _createDevice(userId, device) {
            var url = serviceBase + 'phones/user/' + userId;
            return $http.post(url, device, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return true;
                }).catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        //  PUT /v1/phones/{phoneId}
        function _updateDevice(id, device) {
            return $http.put(serviceBase + 'phones/' + id, device, { headers: { 'Content-Type': 'application/json' } })
                .then(function () {
                    return true;
                }).catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        //  DELETE /v1/phones/{phoneId}
        function _removeDevice(id) {
            return $http.delete(serviceBase + 'phones/' + id, { headers: { 'Content-Type': 'application/json' } })
                .then(function () {
                    return true;
                }).catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        return service;
    }
]);