app.controller('LocationsController', ['$scope', 'LocationService', 'DevicesService',
    function ($scope, locationService, devicesService) {
        var vm = this;
        vm.phones = [];
        vm.selectedPhone = {};
        vm.locations = [];
        vm.$onInit = _loadPhones;
        vm.showOnMap = _showOnMap;

        function _loadPhones() {
            devicesService.getDevices()
                .then(function (result) {
                    vm.phones = result;
                    vm.selectedPhone = result[0];
                });
        }

        function _loadLocations() {
            locationService.getLocations(vm.selectedPhone.PhoneNumber)
                .then(function (result) {
                    vm.locations = result;
                });
        }

        function _showOnMap() {

        }

        $scope.$watch('vm.selectedPhone', function (current, original) {
            if (current != original) {
                _loadLocations();
            }
        });

        _loadPhones();
    }
]);