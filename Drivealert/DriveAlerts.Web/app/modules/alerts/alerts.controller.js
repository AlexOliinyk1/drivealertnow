app.controller('AlertsController', ['$scope', 'AlertService', 'DevicesService', 'AuthService', 'BufferService',
    function ($scope, alertService, devicesService, authService, bufferService) {
        var vm = this;
        var selectedPhone = 0;

        vm.isLoading = {};
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
            if (phone) {
                _changePhone(phone.PhoneNumber);
            }
        });

        function _init() {
            if (bufferService.activePhone != null) {
                _changePhone(bufferService.activePhone);
            }
        }

        //  get alerts for selected phone
        function _searchAlerts() {
            vm.isLoading = alertService.getAlerts(selectedPhone, vm.searchConfig)
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
