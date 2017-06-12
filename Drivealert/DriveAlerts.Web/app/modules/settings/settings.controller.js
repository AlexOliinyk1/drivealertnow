app.controller('SettingsController', ['$scope', 'SettingsService', 'DevicesService', 'AuthService', 'BufferService',
    function ($scope, settingsService, devicesService, authService, bufferService) {
        var vm = this;

        vm.setting = {
            PhoneNumber: "",
            AllowHeadset: false,
            AlertSpeedFrame: '',
            AlertSpeed: 60,
            GpsNotify: false,
            BluetoothNotify: false,
            DongleDisconnected: false,
            UninstalledNotify: false,
            EnableSpeedAlerts: false,
            EnableAutoReply: false,
            AutoReplyText: "",
            //admin settings
            EnableAdminTextAlerts: false,
            AdminMobilePhoneNumber: "",
            EnableAdminEmailAlerts: false,
            AdminEmailAddress: "",
            //END admin settings
            EnableReportMovements: false,
            EnableReportCoordinates: false,
            ReportTrackFrame: '',
            AllowedPhone1: "911",
            AllowedPhone2: "",
            AllowedPhone3: "",
            AllowedPhone4: "",
            AllowedPhone5: "",
            AllowedPhoneOwner1: "",
            AllowedPhoneOwner2: "",
            AllowedPhoneOwner3: "",
            AllowedPhoneOwner4: "",
            AllowedPhoneOwner5: ""
        };
        vm.activePhone = '';
        vm.activePhoneId = '';
        vm.saveSettings = _saveSettings;
        vm.saveAllSettings = _saveAllSettings;
        vm.modalContent = null;
        vm.showModal = _showModal;

        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            _changePhone(phone);
        });

        function _init() {
            if (bufferService.activePhone !== null) {
                _changePhone(bufferService.activePhone);
            }
        }

        function _getSettings(phoneId) {
            settingsService.getSettings(phoneId)
                .then(function (result) {
                    if (result) {
                        vm.setting = result;
                    }
                });
        }

        function _getPhoneId(phoneNumber) {
            devicesService.searchDeviceByNumber(authService.authentication.userId, phoneNumber)
                .then(function (result) {
                    vm.activePhoneId = result.PhoneId
                    _getSettings(vm.activePhoneId);
                });
        }

        function _saveSettings() {
            settingsService.saveSettings(vm.activePhoneId, vm.setting)
                .then(function (result) {
                    if (result) {
                        console.log("Save successed");
                    } else {
                        console.log("Save failed");
                    }
                });
        }

        function _saveAllSettings() {
            settingsService.saveAllSettings(vm.setting)
                .then(function () {
                    if (result) {
                        console.log("Save successed");
                    } else {
                        console.log("Save failed");
                    }
                });
        }

        function _changePhone(phone) {
            vm.activePhone = phone;
            _getPhoneId(phone);
        }

        function _showModal(modalContentId) {
            var content = document.getElementById(modalContentId).innerHTML;
            vm.modalContent = content;
        }

        _init();
    }
]);
