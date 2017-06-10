app.factory('AlertService', ['$http', '$q', 'ngWebSettings', 'AuthService',
    function ($http, $q, ngWebSettings, authService) {
        var alertServiceFactory = {};

        alertServiceFactory.getAlerts = _getAlerts;

        return alertServiceFactory;

        function _getAlerts(phoneNumber, searchParams) {
            return $http.post(ngWebSettings.api.alertSearch + phoneNumber, searchParams, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data.Alerts;
                }).catch(function (error) {
                    console.log(error);
                    return [];
                });
        }

        function _getFakeAlerts() {
            var d = $q.defer();
            // imitate request
            setTimeout(function () {
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
    }
]);