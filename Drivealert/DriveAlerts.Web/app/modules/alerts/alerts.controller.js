app.controller('AlertsController', ['$scope', 'AlertService', 'DevicesService', 'AuthService',
    function ($scope, alertService, devicesService, authService) {
        var vm = this;

        vm.phones = [];//added phones : need to take this from api
        vm.selectedPhone = {};
        vm.alerts = [];
        vm.searchWord = "";
        vm.searchConfig = {
            DateStart: "2017-05-18",
            DateEnd: "2017-05-23",
            IsSpeedAlerts: true,
            IsEmergencyCalls: true,
            IsConnectionViolations: true,
            IsCallViolationAlerts: true,
        };
        vm.searchAlerts = _searchAlerts;
        _loadPhones();

        $scope.$watch('vm.selectedPhone', function (current, original) {
            if (current) {
                _searchAlerts();
            }
        });

        //  get phones for user
        function _loadPhones() {
            devicesService.getDevices(authService.authentication.userId)
                .then(function (result) {
                    vm.phones = result;
                    vm.selectedPhone = vm.phones[0];
                });
        }

        //  get alerts for selected phone
        function _searchAlerts() {
            alertService.getAlerts(vm.selectedPhone.PhoneNumber, vm.searchConfig)
                .then(function (result) {
                    vm.alerts = result;
                });
        }
    }
]);
