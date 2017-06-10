app.controller('DriveAlertNowController', ['$scope', '$location', 'AuthService', 'BufferService',
    function ($scope, $location, AuthService, bufferService) {

        $scope.getClass = _getClass;
        $scope.logOut = _logout;
        $scope.authentication = AuthService.authentication;
        $scope.isIFrame = bufferService.getIsIFrame;
        $scope.pageTitle = {
            text: '',
            icon: ''
        };

        $scope.$on('phoneNumber.changed', function (evnt, phone) {
            if (phone) {
                bufferService.activePhone = phone.PhoneNumber;
            }
        });

        $scope.$on('pageTitle.change.start', function (evnt) {
            $scope.pageTitle.text = '';
            $scope.pageTitle.icon = '';
        });

        $scope.$on('pageTitle.change.end', function (evnt, resource) {
            $scope.pageTitle.text = resource.title;
            $scope.pageTitle.icon = resource.icon;
        });

        function _logout() {
            console.log('logout');
            AuthService.logOut();
            $location.path('/home');
        }

        function _getClass(path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }

    }
]);