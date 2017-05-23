app.controller('SettingsController', ['$scope', 'SettingsService', 'DevicesService', 'AuthService', 'BufferService',
    function ($scope, settingsService, devicesService, authService, bufferService) {
        var vm = this;

        vm.phones = [];
        vm.activePhone = {};
        vm.setting = {
            PhoneNumber: "",
            AllowHeadset: false,             //Notify if Bluetooth is off
            AlertSpeedFrame: '',              //Interval Between Alerts
            AlertSpeed: 60,                 //Radiobuttons
            GpsNotify: false,                //Notify if Location Services are disabled
            BluetoothNotify: false,          //Notify if Bluetooth is off
            DongleDisconnected: false,       //
            UninstalledNotify: false,        //Notify if Uninstalled
            EnableSpeedAlerts: false,        //Enable Speed Alerts
            EnableAutoReply: false,          //for android only?
            AutoReplyText: "",              //for android only?
            //admin settings
            EnableAdminTextAlerts: false,    //Enable Text Alerts to Administrator
            AdminMobilePhoneNumber: "",      //Phone
            EnableAdminEmailAlerts: false,   //Enable Email Alerts to Administrator
            AdminEmailAddress: "",           //Email
            //END admin settings
            EnableReportMovements: false,    //Report vehicle activity
            EnableReportCoordinates: false,  // Include coordinates
            EnableReportTrackFrame: '',       //Interval between location moves
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
        vm.saveSettings = _saveSettings;
        vm.saveAllSettings = _saveAllSettings;

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

        function _saveSettings() {
            settingsService.saveSettings(vm.activePhone.phoneId, vm.setting)
                .then(function (result) {
                    if (result) {
                        alert("Success");
                    } else {
                        alert("Fail");
                    }
                });
        }

        function _saveAllSettings() {
            console.log('Not Implemented Yet');
        }

        function _changePhone(phone) {
            vm.activePhone = phone;
            _getSettings(vm.activePhone.PhoneId);
        }

        _init();
    }
]);
