app.controller('DevicesController', ['$scope', 'DevicesService', 'AuthService', 'BufferService', '$location', 'SweetAlert',
    function ($scope, devicesService, authService, bufferService, $location, SweetAlert) {
        var vm = this;
        vm.phones = [];
        vm.deleteDevice = _deleteDevice;
        vm.openEditor = _openEditor;
        $scope.isIFrame = bufferService.getIsIFrame;

        function _loadDevices() {
            devicesService.getDevices(authService.authentication.userId)
                .then(function (result) {//success
                    vm.phones = result;
                });
        }

        function _deleteDevice(id, number) {
            SweetAlert.swal({
                title: "Are you sure you want to delete phone number " + number +" ?",
                //text: "Your will not be able to recover!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function (isConfirm) {
                if (isConfirm) {
                    devicesService.removeDevice(id)
                    .then(function (result) {
                        if (result) {
                            _loadDevices();
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                }
                
                });

            
        }

        function _openEditor(phone) {
            bufferService.editorDevice = phone;
            $location.path("/edit-device");
        }

        _loadDevices();
    }
]);
