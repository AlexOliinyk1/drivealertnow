app.controller('DriveAlertNowController', ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

        function _logout() {
            console.log('logout');
            AuthService.logOut();
            $location.path('/home');
        }

        $scope.logOut = _logout;
        $scope.authentication = AuthService.authentication;
    }
]);