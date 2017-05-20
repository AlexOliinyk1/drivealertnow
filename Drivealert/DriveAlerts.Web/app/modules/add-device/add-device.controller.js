app.controller('AddDeviceController', ['$location', 'DevicesService',
    function ($location, devicesService) {
        var vm = this;

        vm.deviceTypes = [{ name: "Android", id: 1 }, { name: "IOS", id: 2 }];

        vm.phone = {
            PhoneNumber: "",
            FirstName: "",
            LastName: "",
            OsType: 0
        };

        vm.saveDevice = _saveDevice;
        vm.cancel = _cancel;

        function _goToDevices() {
            $location.path("/devices");
        }

        function _saveDevice() {
            devicesService.createDevice(vm.phone)
                .then(function () {//success
                    _goToDevices();
                });
        }

        function _cancel() {
            _goToDevices();
        }
    }
]);