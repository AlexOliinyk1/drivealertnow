app.factory('DevicesService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var service = {};

        service.getDevices = _getDevices;
        service.createDevice = _createDevice;
        service.updateDevice = _updateDevice;
        service.removeDevice = _removeDevice;

        //  GET /v1/phones/users/{userId}
        function _getDevices(userId) {
            var url = ngWebSettings.api.getPhones + userId;
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

        //  POST /v1/phones/users/{userId}
        function _createDevice(userId, device) {
            var url = ngWebSettings.api.addPhone + userId;
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
            return $http.put(ngWebSettings.api.updatePhone + id, device, { headers: { 'Content-Type': 'application/json' } })
                .then(function () {
                    return true;
                }).catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        //  DELETE /v1/phones/{phoneId}
        function _removeDevice(id) {
            return $http.delete(ngWebSettings.api.removePhone + id, { headers: { 'Content-Type': 'application/json' } })
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