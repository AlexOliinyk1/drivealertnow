app.factory('DevicesService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        function _getDevices() {
            var d = $q.defer();

            // imitate request
            setTimeout(function () {
                d.resolve([{ PhoneNumber : '1111111111' }]);
            }, 3000);

            return d.promice;
        }

        service.getDevices = _getDevices;
        return service;
    }
]);