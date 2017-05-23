app.controller('AddDeviceController', ['$location', 'DevicesService', 'AuthService', 'ngWebSettings',
    function ($location, devicesService, authService, ngWebSettings) {
        var vm = this;

        vm.deviceTypes = ngWebSettings.deviceTypes;
        vm.phone = {
            PhoneId: 0,
            PhoneNumber: "",
            FirstName: "",
            LastName: "",
            PhoneOs: 0
        };
        vm.saveDevice = _saveDevice;
        vm.cancel = _goToDevices;

        function _goToDevices() {
            $location.path("/devices");
        }

        function _saveDevice() {
            devicesService.createDevice(authService.authentication.userId, vm.phone)
                .then(function (result) {
                    if (result) {
                        _goToDevices();
                    }
                });
        }
    }
]);