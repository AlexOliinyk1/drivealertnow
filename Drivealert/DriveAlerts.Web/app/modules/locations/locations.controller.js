app.controller('LocationsController', ['$scope', 'LocationService', 'DevicesService', 'AuthService', 'BufferService', 'NgMap',
    function ($scope, locationService, devicesService, authService, bufferService, NgMap) {
        var vm = this;

        vm.isLoading = {};
        vm.phones = [];
        vm.selectedPhone = {};
        vm.locations = [];
        vm.searchOptions = {
            DateStart: new Date(),
            DateEnd: new Date()
        };
        vm.searchLocations = _loadLocations;
        vm.selectAll = _selectAll;
        vm.allSelected = false;
        vm.selectLocation = _selectLocation;
        //  map
        vm.path = [];
        vm.mapCenter = [0, 0];

        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            _changePhoneNumber(phone);
        });

        function _init() {
            if (bufferService.activePhone !== null) {
                _changePhoneNumber(bufferService.activePhone);
            }
        }

        function _loadLocations() {
            vm.isLoading = locationService.getLocations(vm.selectedPhone.PhoneNumber, vm.searchOptions)
                .then(function (result) {
                    if (!result.status) {
                        vm.locations = result;
                    }
                    else {
                        console.log(result);
                    }
                });
        }

        function _selectAll() {
            for (var i = 0; i < vm.locations.length; i++) {
                vm.locations[i].Selected = vm.allSelected;
            }
            _selectLocation();
        }

        function _changePhoneNumber(phone) {
            vm.selectedPhone = phone;
            _loadLocations();
        }

        function _selectLocation() {
            locationService.toGoogleCoordinates(vm.locations)
                .then(function (result) {
                    vm.path = result;

                    if (vm.path.length) {
                        vm.mapCenter = vm.path[0];
                    }
                    else {
                        vm.mapCenter = [0, 0];
                    }
                });
        }



        _init();
    }
]);