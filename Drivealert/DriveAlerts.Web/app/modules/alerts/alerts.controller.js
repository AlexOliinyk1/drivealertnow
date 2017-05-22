app.controller('AlertsController', ['$scope', 'AlertService', 'DevicesService', 'AuthService',
    function ($scope, alertService, devicesService, authService) {
        var vm = this;

        vm.phones = [];//added phones : need to take this from api
        vm.selectedPhone = {};
        vm.alerts = [];
        vm.searchConfig = {
            DateStart: "2017-05-18T0:00:00.1Z",
            DateEnd: "2017-05-21T0:00:00.1Z",
            IsSpeedAlerts: true,
            IsEmergencyCalls: true,
            IsConnectionViolations: true,
            IsCallViolationAlerts: true
        };
        vm.searchAlerts = _searchAlerts;
        _loadPhones();

        $scope.$watch('vm.selectedPhone', function (current, original) {
            //_searchAlerts();
            _loadAlerts();
        });

        function _loadAlerts() {
            alertService.getAlerts(vm.selectedPhone)
            .then(function (result) {
                vm.alerts = result;
            });
        }

        //  get phones for user
        function _loadPhones() {
            devicesService.getDevices(authService.authentication.userId)
                .then(function (result) {//success
                    vm.phones = result;
                    vm.selectedPhone = vm.phones[0];
                });
        }

        //  get alerts for selected phone
        function _searchAlerts() {
            alertService.getAlerts(vm.selectedPhone, vm.searchConfig)
                .then(function (result) {//success
                    vm.alerts = result.data.Alerts;
                    if (vm.alerts.length == 0) {
                        _set_test_alerts();
                    }
                }, function (exc) {//fail
                    console.log(exc);
                });
        }
    }
]);
