app.controller('DriveAlertNowController', ['$scope', '$location', 'AuthService', 'BufferService',
    function ($scope, $location, AuthService, bufferService) {

        function _logout() {
            console.log('logout');
            AuthService.logOut();
            $location.path('/home');
        }

        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            bufferService.activePhone = phone;
        });

        $scope.logOut = _logout;
        $scope.authentication = AuthService.authentication;
        $scope.isIFrame = bufferService.getIsIFrame;
    }
]);