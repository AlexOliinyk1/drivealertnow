app.controller('DriveAlertNowController', ['$scope', '$location', 'AuthService', 'BufferService',
    function ($scope, $location, AuthService, bufferService) {

        function _logout() {
            console.log('logout');
            AuthService.logOut();
            $location.path('/home');
        }

        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }

        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            bufferService.activePhone = phone;
        });

        $scope.logOut = _logout;
        $scope.authentication = AuthService.authentication;
        $scope.isIFrame = bufferService.getIsIFrame;
    }
]);