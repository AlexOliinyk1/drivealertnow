app.controller('AlertsCtrl', ['$scope', 'AlertService',
    function ($scope, alertService) {
        var vm = this;

        vm.phones = [];//added phones : need to take this from api
        vm.selectedPhone = '';
        vm.searchConfig = {
            DateStart: "2017-05-20T10:17:20.315Z",
            DateEnd: "2017-05-20T10:17:20.315Z",
            IsSpeedAlerts: true,
            IsEmergencyCalls: true,
            IsConnectionViolations: true,
            IsCallViolationAlerts: true
        };
        vm.alerts = [];

        //  get phones for user
        function _loadPhones() {
            vm.phones.push('1111111111');
            vm.selectedPhone = vm.phones[0];
        }

        //  get alerts for selected phone
        function _searchAlerts() {
            alertService.getAlerts(vm.selectedPhone, vm.searchConfig)
                .then(function (result) {//success
                    vm.alerts = result.data.Alerts;
                }, function (exc) {//fail
                    console.log(exc);
                });
        }

        vm.searchAlerts = _searchAlerts;
        _loadPhones();

        $scope.$watch('vm.selectedPhone', function (newValue, oldValue) {
            _searchAlerts();
        });
    }
]);
