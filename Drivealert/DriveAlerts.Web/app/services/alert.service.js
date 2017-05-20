app.factory('AlertService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var alertServiceFactory = {};

        function _searchAlerts(phoneNumber, searchParams) {
            return $http.post(serviceBase + '/alerts/phones/' + phoneNumber, searchParams, { headers: { 'Content-Type': 'application/json' } });
        }

        function _getAlerts() {
            var d = $q.defer();
            // imitate request
            setTimeout(function () {
                //User	Phone Number	Activation Code	Last Activity Date	Install Date	Phone	Version	Options
                d.resolve([
                    {
                        User: "Social Judo",
                        Date: "5/17/2017 3:19 PM",
                        ViolationType: "Speed alerts",
                        ViolationDescription: "Some deription"
                    },
                    {
                        User: "Another User",
                        Date: "5/17/2017 3:19 PM",
                        ViolationType: "Emergency calls",
                        ViolationDescription: "This is test decription"
                    },
                    {
                        User: "Social Judo",
                        Date: "5/17/2017 3:19 PM",
                        ViolationType: "Connection Violations",
                        ViolationDescription: "Lorem ipsum"
                    }
                ]);
            }, 1000);

            return d.promise;
        }

        function _createAlert() {
            return $http.post(serviceBase + 'alerts');
        }

        alertServiceFactory.getAlerts = _getAlerts;
        alertServiceFactory.searchAlerts = _searchAlerts;
        alertServiceFactory.createAlerts = _createAlert;
        return alertServiceFactory;
    }
]);