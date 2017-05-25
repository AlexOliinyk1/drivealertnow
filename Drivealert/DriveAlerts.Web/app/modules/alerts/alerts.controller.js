app.controller('AlertsController', ['$scope', 'AlertService', 'DevicesService', 'AuthService', 'BufferService',
    function ($scope, alertService, devicesService, authService, bufferService) {
        var vm = this;
        var selectedPhone = {};

        vm.alerts = [];
        vm.searchWord = "";
        vm.searchConfig = {
            DateStart: new Date(),
            DateEnd: new Date(),
            IsSpeedAlerts: true,
            IsEmergencyCalls: true,
            IsConnectionViolations: true,
            IsCallViolationAlerts: true,
        };
        vm.searchAlerts = _searchAlerts;

        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            _changePhone(phone);
        });

        function _init() {
            if (bufferService.activePhone) {
                _changePhone(bufferService.activePhone);
            }
        }

        //  get alerts for selected phone
        function _searchAlerts() {
            alertService.getAlerts(selectedPhone.PhoneNumber, vm.searchConfig)
                .then(function (result) {
                    vm.alerts = result;
                });
        }

        function _changePhone(phone) {
            selectedPhone = phone;
            _searchAlerts();
        }

        _init();
    }
]);
