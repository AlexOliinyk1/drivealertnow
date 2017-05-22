app.controller("EditDeviceController", ['$location', 'DevicesService',
    function ($location, devicesService) {
        var vm = this;

        function _init() {
            alert(devicesService.editorDeviceId);
        }

        _init();
    }
]);