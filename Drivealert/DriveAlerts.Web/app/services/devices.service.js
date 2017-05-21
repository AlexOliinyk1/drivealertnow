app.factory('DevicesService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri;
        var service = {};

        //  GET /phones/user/{userId}
        function _getDevices(userId) {
            var url = serviceBase + 'phones/user/' + userId;
            return $http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                });
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
            return $http.delete(serviceBase + 'phones/', { params: { phoneId: id }, headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.status
                }).catch(function (error) {
                    return error;
                });
        }

        service.getDevices = _getDevices;
        service.createDevice = _createDevice;
        service.updateDevice = _updateDevice;
        service.removeDevice = _removeDevice;
        return service;
    }
]);