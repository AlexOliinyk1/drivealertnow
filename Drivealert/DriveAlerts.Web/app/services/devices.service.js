app.factory('DevicesService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + '/';
        var service = {};

        function _getDevices() {
            var url = serviceBase + 'phones/user/' + authService.authentication.userId;
            return $http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                });
        }

        function _createDevice(device) {
            return $http.post(serviceBase + 'accounts/phones', device, { headers: { 'Content-Type': 'application/json' } });
        }

        service.getDevices = _getDevices;
        service.createDevice = _createDevice;
        return service;
    }
]);