app.controller('LoginController', ['$location', 'AuthService', 'ngWebSettings', function ($location, AuthService, ngWebSettings) {
    var self = this;

    self.loginData = {
        userName: "",
        password: ""
    };

    function _login() {

        AuthService.login(self.loginData)
            .then(function (response) {
                $location.path('/');
            },
            function (err) {
                self.message = err.error_description;
            });
    };

    self.message = "";

    self.login = _login;
}]);