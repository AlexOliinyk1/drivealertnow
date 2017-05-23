app.controller('LocationsController', ['$scope', 'LocationService', 'DevicesService', 'AuthService',
    function ($scope, locationService, devicesService, authService) {
        var vm = this;

        vm.phones = [];
        vm.selectedPhone = {};
        vm.locations = [];
        vm.searchOptions = {
            DateStart: new Date(),
            DateEnd: new Date()
        };
        vm.showOnMap = _showOnMap;
        vm.searchLocations = _loadLocations

        function _loadPhones() {
            devicesService.getDevices(authService.authentication.userId)
                .then(function (result) {
                    vm.phones = result;
                    vm.selectedPhone = result[0];
                });
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

        $scope.$watch('vm.selectedPhone', function (current, original) {
            if (current != original) {
                _loadLocations(current.PhoneId);
            }
        });

        _loadPhones();
    }
]);