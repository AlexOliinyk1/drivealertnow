app.factory('DevicesService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var serviceBase = ngWebSettings.apiServiceBaseUri;
        var service = {};

        //  GET /phones/user/{userId}
        function _getDevices() {
            var url = serviceBase + 'phones/user/' + authService.authentication.userId;
            return $http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                });
        }

        //  POST /phones/user/{userId}
        function _createDevice(userId, device) {
            var url = serviceBase + 'phones/user/' + authService.authentication.userId;

            return $http.post(url, device, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {

                });
        }

        //  PUT /phones/{phoneId}
        function _updateDevice(id, device) {
            return $http.put(serviceBase + 'phones/' + id, device, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.status
                }).catch(function (error) {
                    return 500;
                });
        }

        //  DELETE /phones
        function _removeDevice(id) {
            return $http.put(serviceBase + 'phones', id, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.status
                }).catch(function (error) {
                    return 500;
                });
        }

        service.getDevices = _getDevices;
        service.createDevice = _createDevice;
        service.updateDevice = _updateDevice;
        service.removeDevice = _removeDevice;
        return service;
    }
]);