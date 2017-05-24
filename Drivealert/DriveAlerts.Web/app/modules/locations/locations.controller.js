app.controller('LocationsController', ['$scope', 'LocationService', 'DevicesService', 'AuthService', 'BufferService',
    function ($scope, locationService, devicesService, authService, bufferService) {
        var vm = this;

        vm.phones = [];
        vm.selectedPhone = {};
        vm.locations = [];
        vm.searchOptions = {
            DateStart: new Date(),
            DateEnd: new Date()
        };
        vm.showOnMap = _showOnMap;
        vm.searchLocations = _loadLocations;
        vm.selectAll = _selectAll;
        vm.allSelected = false;

        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            _changePhoneNumber(phone);
        });

        function _init() {
            if (bufferService.activePhone !== null) {
                _changePhoneNumber(bufferService.activePhone);
            }
        }

        function _loadLocations() {
            locationService.getLocations(vm.selectedPhone.PhoneNumber, vm.searchOptions)
                .then(function (result) {
                    if (!result.status) {
                        vm.locations = result;
                    }
                    else {
                        console.log(result);
                    }
                });
        }

        function _showOnMap() {

        }

        function _selectAll() {
            for (var i = 0; i < vm.locations.length; i++) {
                vm.locations[i].Selected = vm.allSelected;
            }
        }

        function _changePhoneNumber(phone) {
            vm.selectedPhone = phone;
            _loadLocations();
        }

        _init();
    }
]);