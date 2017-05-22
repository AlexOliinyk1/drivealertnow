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
        vm.cancel = _cancel;

        function _goToDevices() {
            $location.path("/devices");
        }

        function _saveDevice() {
            devicesService.createDevice(authService.authentication.userId, vm.phone)
                .then(function (result) {//success
                    if (result == 200) {
                        _goToDevices();
                    } else {
                        alert("Failed");
                        console.log(result);
                    }
                });
        }

        function _cancel() {
            _goToDevices();
        }
    }
]);