app.controller('LocationsController', ['$scope', 'LocationService', 'DevicesService', 'AuthService', 'BufferService', 'NgMap',
    function ($scope, locationService, devicesService, authService, bufferService, NgMap) {
        var vm = this;
        var searchOptions = {
            DateStart: undefined,
            DateEnd: undefined
        };

        vm.isLoading = {};
        vm.phones = [];
        vm.selectedPhone = 0;
        vm.locations = [];
        vm.searchOptionsUI = {
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
            if (phone) {
                _changePhoneNumber(phone.PhoneNumber);
            }
        });

        $scope.$watch('vm.searchOptionsUI.DateStart', function (current, original) {
            vm.searchOptions.DateStart = new Date(current);
            vm.searchOptions.DateStart.setHours(0, 0, 0, 0);
        });

        $scope.$watch('vm.searchOptionsUI.DateEnd', function (current, original) {
            vm.searchOptions.DateEnd= new Date(current);
            vm.searchOptions.DateEnd.setHours(0, 0, 0, 0);
        });

        function _init() {
            if (bufferService.activePhone !== null) {
                _changePhoneNumber(bufferService.activePhone);
            }
        }

        function _loadLocations() {
            vm.isLoading = locationService.getLocations(vm.selectedPhone, searchOptions)
                .then(function (result) {
                    vm.locations = result;
                });
        }

        function _selectAll() {
            for (var i = 0; i < vm.locations.length; i++) {
                if (vm.locations[i].Latitude != 0 && vm.locations[i].Longitude != 0) {
                    vm.locations[i].Selected = vm.allSelected;
                }
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