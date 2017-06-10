app.controller('AccountController', ['AccountService', 'AuthService',
    function (accountService, authService) {
        var vm = this;

        vm.userData = {
            Email: "",
            PhoneNumber: "",
            FirstName: "",
            LastName: "",
            TimeZone: 2
        };

        vm.passwordData = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }

        vm.saveUserInfo = _saveUserInfo;
        vm.changePassword = _changePassword;

        function _getUserData() {
            accountService.getUserData()
                .then(function (data) {
                    if (data) {
                        vm.userData = data;
                    } else {
                        //  TODO: Notify about error
                    }
                });
        }

        function _saveUserInfo() {
            accountService.updateUserData(vm.userData)
                .then(function (result) {

                });
        }

        function _changePassword() {
            accountService.changeUserPassword(vm.passwordData)
                .then(function (result) {
                    _resetPasswordFields();
                });
        }

        function _resetPasswordFields() {
            vm.passwordData.currentPassword = '';
            vm.passwordData.newPassword = '';
            vm.passwordData.confirmPassword = '';
        }

        _getUserData();
        _resetPasswordFields();
    }
]);
