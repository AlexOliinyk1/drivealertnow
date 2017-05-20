app.factory('DevicesService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        function _getDevices() {
            //  todo: get data from API - not ready yet
            var d = $q.defer();
            // imitate request
            setTimeout(function () {
                //User	Phone Number	Activation Code	Last Activity Date	Install Date	Phone	Version	Options
                d.resolve([{
                    User: "Social Judo",
                    PhoneNumber: '1111111111',
                    id: 23,
                    ActivationCode: "6F17A6",
                    LastActivityDate: "5/17/2017 3:19 PM",
                    InstallDate: "4/26/2016 2:14 PM",
                    Phone: "Android",
                    Version: "4.0.4"
                },
                {
                    User: "Another User",
                    PhoneNumber: '1111111112',
                    id: 23,
                    ActivationCode: "3IZR8K",
                    LastActivityDate: "5/1/2017 6:29 AM",
                    InstallDate: "6/7/2016 9:51 PM",
                    Phone: "iOS",
                    Version: ""
                }]);
            }, 1000);

            return d.promise;
        }

        function _createDevice(device) {
            return $http.post(serviceBase + 'accounts/phones', device, { headers: { 'Content-Type': 'application/json' } });
        }

        service.getDevices = _getDevices;
        service.createDevice = _createDevice;
        return service;
    }
]);