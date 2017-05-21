app.controller('DevicesController', ['DevicesService',
    function (devicesService) {
        var vm = this;
        vm.text = "Devices";
        vm.phones = [];
        vm.deleteDevice = _deleteDevice;
        vm.openEditor = _openEditor;
        vm.$onInit = _loadDevices;

        function _loadDevices() {
            devicesService.getDevices()
                .then(function (result) {//success
                    vm.phones = result;
                });
        }

        function _deleteDevice() {
            devicesService.removeDevice(id)
                .then(function (result) {
                    if (result == 200) {

                    } else { 
                        console.log(result);
                    }
                });
        }

        function _openEditor(id) {
            alert('need to implement Edit. id = ' + id);
        }

        //  todo: move this to updata controller
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
