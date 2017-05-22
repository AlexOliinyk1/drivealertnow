app.controller('DevicesController', ['DevicesService', 'AuthService', 'BufferService', '$location',
    function (devicesService, authService, bufferService, $location) {
        var vm = this;
        vm.text = "Devices";
        vm.phones = [];
        vm.deleteDevice = _deleteDevice;
        vm.openEditor = _openEditor;
        vm.$onInit = _loadDevices;

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

        function _openEditor(id) {
            bufferService.editorDeviceId = id;
            $location.path("/edit-device");
            alert('need to implement Edit. id = ' + id);
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
