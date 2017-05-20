app.controller('LoginCtrl', ['$location', 'AuthService', 'ngWebSettings', function ($location, AuthService, ngWebSettings) {
    var self = this;

    self.loginData = {
        userName: "",
        password: ""
    };

    self.message = "";

    self.login = function () {

        AuthService.login(self.loginData).then(function (response) {
            $location.path('/');
        },
        function (err) {
            self.message = err.error_description;
        });
    };

}]);