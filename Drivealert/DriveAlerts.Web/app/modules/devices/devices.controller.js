app.controller('DevicesController', ['DevicesService',
    function (devicesService) {
        var vm = this;
        vm.text = "Devices";
        vm.phones = [];
        vm.$onInit = _loadDevices;

        function _loadDevices() {
            devicesService.getDevices()
                .then(function (result) {//success
                    vm.phones = result;
                });
        }

        _loadDevices();
    }
]);
