app.controller('AlertsController', ['$scope', 'AlertService', 'DevicesService', 'AuthService', 'BufferService',
    function ($scope, alertService, devicesService, authService, bufferService) {
        var vm = this;
        var selectedPhone = 0;

        vm.isLoading = {};
        vm.alerts = [];
        vm.searchWord = "";
        vm.searchConfigUI = {
            UIDateStart: new Date(),
            UIDateEnd: new Date()
        };
        vm.searchConfig = {
            DateStart: undefined,
            DateEnd: undefined,
            IsSpeedAlerts: true,
            IsEmergencyCalls: true,
            IsConnectionViolations: true,
            IsCallViolationAlerts: true,
        };
        vm.searchAlerts = _searchAlerts;
        vm.setupDatetime = _setupDatetime;
        
        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            if (phone) {
                _changePhone(phone.PhoneNumber);
            }
        });

        function _init() {
            vm.searchConfigUI.UIDateStart.setDate(vm.searchConfigUI.UIDateEnd.getDate() - 2);

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

        function _setupDatetime() {
            vm.searchConfig.DateStart = new Date(vm.searchConfigUI.UIDateStart);
            vm.searchConfig.DateEnd = new Date(vm.searchConfigUI.UIDateEnd);;

            vm.searchConfig.DateStart.setHours(0, 0, 0, 0);
            vm.searchConfig.DateEnd.setHours(23, 59, 59, 999);
        }

        function _changePhone(phone) {
            selectedPhone = phone;
            _searchAlerts();
        }

        _init();
    }
]);
