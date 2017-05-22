app.controller('DevicesController', ['DevicesService', 'AuthService', 'BufferService', '$location',
    function (devicesService, authService, bufferService, $location) {
        var vm = this;
        vm.phones = [];
        vm.deleteDevice = _deleteDevice;
        vm.openEditor = _openEditor;

        function _loadDevices() {
            devicesService.getDevices(authService.authentication.userId)
                .then(function (result) {//success
                    vm.phones = result;
                });
        }

        function _deleteDevice(id) {
            devicesService.removeDevice(id)
                .then(function (result) {
                    if (result == 200) {
                        _loadDevices();
                    } else {
                        console.log(result);
                    }
                });
        }

        function _openEditor(phone) {
            bufferService.editorDevice = phone;
            $location.path("/edit-device");
        }

        //  todo: move this to update controller
        function _updataDevice(device) {
            devicesService.updateDevice(device.PhoneId, device)
                .then(function (result) {
                    if (result == 200) {

                    } else {
                        console.log(result);
                    }
                });
        }

        _loadDevices();
    }
]);
