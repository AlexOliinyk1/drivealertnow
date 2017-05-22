app.controller('SettingsController', ['$scope', 'SettingsService', 'DevicesService', 'AuthService',
    function ($scope, settingsService, devicesService, authService) {
        var vm = this;

        vm.phones = [];
        vm.activePhone = {};
        vm.setting = {};
        vm.saveSettings = _saveSettings;
        vm.saveAllSettings = _saveAllSettings;
        _loadPhones();

        $scope.$watch('vm.activePhone', function (current, original) {
            _getSettings(current.PhoneId);
        });

        function _loadPhones() {
            devicesService.getDevices(authService.authentication.userId)
                .then(function (result) {
                    debugger;
                    vm.phones = result;
                    vm.activePhone = vm.phones[0];
                });
        }

        function _getSettings(phoneId) {
            settingsService.getSettings(phoneId)
                .then(function (result) {

                });
        }

        function _saveSettings() {
            settingsService.saveSettings()
                .then(function (result) {

                });
        }

        function _saveAllSettings() {

        }
    }
]);
