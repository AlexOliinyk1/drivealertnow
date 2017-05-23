app.controller("EditDeviceController", ['$location', 'DevicesService', 'ngWebSettings', 'BufferService',
    function ($location, devicesService, ngWebSettings, bufferService) {
        var vm = this;

        vm.deviceTypes = ngWebSettings.deviceTypes;
        vm.saveDevice = _save;
        vm.cancel = _cancel;
        vm.phone = {
            PhoneId: 0,
            PhoneNumber: "",
            FirstName: "",
            LastName: "",
            PhoneOs: 0
        };

        function _save() {
            devicesService.updateDevice(vm.phone.PhoneId, vm.phone)
                .then(function (result) {
                    if (result) {
                        $location.path("/devices");
                    }
                    else {
                        console.log(result);
                    }
                });
        }

        function _cancel() {
            $location.path("/devices");
        }

        function _init() {
            if (bufferService.editorDevice == null) {
                $location.path('/devices');
            }
            else {
                vm.phone.PhoneId = bufferService.editorDevice.PhoneId;
                vm.phone.PhoneNumber = bufferService.editorDevice.PhoneNumber;
                vm.phone.FirstName = bufferService.editorDevice.FirstName;
                vm.phone.LastName = bufferService.editorDevice.LastName;
                vm.phone.PhoneOs = bufferService.editorDevice.PhoneOs;
            }
            bufferService.editorDevice = null;
        }

        _init();
    }
]);