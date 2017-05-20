app.controller('AlertsController', ['$scope', 'AlertService', 'DevicesService',
    function ($scope, alertService, devicesService) {
        var vm = this;

        vm.phones = [];//added phones : need to take this from api
        vm.selectedPhone = '';
        vm.alerts = [];
        vm.searchConfig = {
            DateStart: "2017-05-18T0:00:00.1Z",
            DateEnd: "2017-05-21T0:00:00.1Z",
            IsSpeedAlerts: true,
            IsEmergencyCalls: true,
            IsConnectionViolations: true,
            IsCallViolationAlerts: true
        };

        //  get phones for user
        function _loadPhones() {
            devicesService.getDevices()
                .then(function (result) {//success
                    vm.phones.push(result);
                    vm.selectedPhone = vm.phones[0];
                }, function () {//fail
                });
        }

        //  get alerts for selected phone
        function _searchAlerts() {
            alertService.getAlerts(vm.selectedPhone, vm.searchConfig)
                .then(function (result) {//success
                    debugger;
                    vm.alerts = result.data.Alerts;
                    if (vm.alerts.length == 0) {
                        _set_test_alerts();
                    }
                }, function (exc) {//fail
                    console.log(exc);
                });
        }

        vm.searchAlerts = _searchAlerts;
        _loadPhones();

        $scope.$watch('vm.selectedPhone', function (current, original) {
            if (current !== '') {
                _searchAlerts();
            }
        });
    }
]);
