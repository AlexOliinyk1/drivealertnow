app.factory('SummaryService', ['$http', '$q', 'ngWebSettings', 'AuthService', 'DevicesService',
    function ($http, $q, ngWebSettings, authService, devicesService) {
        var service = {};

        service.getSummary = _getDevicesReports;

        function _getDevicesReports(fromDate, toDate) {
            var d = $q.defer();
            //  load devices
            devicesService.getDevices(authService.authentication.userId)
                  .then(function (devices) {
                      var requests = [];

                      for (var i = 0; i < devices.length; i++) {
                          devices[i].Violations = [];
                          devices[i].DailyTripReport = [];
                          requests.push(_getSummary(devices[i].PhoneNumber, fromDate, toDate));
                      }

                      $q.all(requests).then(function (data) {
                          for (var i = 0; i < data.length; i++) {
                              devices[i].Violations = data[i].Violations;
                              devices[i].DailyTripReport = data[i].DailyTripReport;
                          }

                          d.resolve(devices);
                      });
                  });
            return d.promise;
        }

        function _getSummary(phoneNumber, fromDate, toDate) {
            return $http.post(ngWebSettings.api.report + phoneNumber, { StartDate: fromDate, EndDate: toDate })
                 .then(function (result) {
                     return result.data;
                 })
                 .catch(function (error) {
                     console.log(error);
                     return [];
                 });
        }

        return service;
    }
]);
