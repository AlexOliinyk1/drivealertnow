app.controller('DevicesController', ['$scope', 'DevicesService', 'AuthService', 'BufferService', '$location', 'SweetAlert',
    function ($scope, devicesService, authService, bufferService, $location, SweetAlert) {
        var vm = this;
        vm.phones = [];
        vm.deleteDevice = _deleteDevice;
        vm.openEditor = _openEditor;
        vm.searchWord = "";
        vm.isIFrame = bufferService.getIsIFrame;

        function _loadDevices() {
            devicesService.getDevices(authService.authentication.userId)
                .then(function (result) {//success
                    vm.phones = result;
                });
        }

        function _deleteDevice(id, number) {
            SweetAlert.swal({
                title: "Are you sure you want to delete phone number " + number + " ?",
                //text: "Your will not be able to recover!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
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

        $scope.$watch('vm.searchWord', function (value) {
            for (var i = 0; i < vm.phones.length; i++) {
                if (vm.phones[i].FirstName.indexOf(value) === -1
                    && vm.phones[i].LastName.indexOf(value) === -1
                    && vm.phones[i].PhoneNumber.indexOf(value) === -1
                    && value !== "") {
                    vm.phones[i].disabled = true;
                }
                else {
                    vm.phones[i].disabled = false;
                }
            }
        });

        _loadDevices();
    }
]);
