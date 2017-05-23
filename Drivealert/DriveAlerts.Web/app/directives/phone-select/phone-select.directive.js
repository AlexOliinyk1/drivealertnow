﻿app.directive('phoneSelect', ['AuthService', 'DevicesService', 'BufferService', '$rootScope',
    function (authService, devicesService, bufferService, $rootScope) {
        function link($scope, $element, $attrs) {
            $scope.phones = [];
            $scope.activePhone = {};
            $scope.format = _format;

            $scope.$watch('activePhone', function (current, original) {
                if (current != original) {
                    $rootScope.$broadcast('phoneNumber.changed', current);
                }
            });

            function _loadPhones() {
                devicesService.getDevices(authService.authentication.userId)
                    .then(function (result) {
                        $scope.phones = result;
                        $scope.activePhone = $scope.phones[0];
                        bufferService.activePhone = $scope.activePhone;
                    });
            }

            function _format(firstName, lastName, phoneNumber) {
                return firstName + " " + lastName + "|" + phoneNumber;
            }

            _loadPhones();
        }

        return {
            scope: true,
            link: link,
            restrict: 'E',
            templateUrl: '/app/directives/phone-select/phone-select.template.html'
            //templateUrl: '<select ng-model="activePhone" ng-init="activePhone = phones[0]" ng-options="phone.PhoneNumber for phone in phones"></select>'
        };
    }
]);