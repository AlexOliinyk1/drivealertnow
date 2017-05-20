app.run(['AuthService', '$rootScope', '$location', function (AuthService, $rootScope, $location) {
    AuthService.fillAuthData();

    $rootScope.$on("$routeChangeStart", function (evt, to, from) {
        if (to.authorize === true) {
            to.resolve = to.resolve || {};
            if (!to.resolve.authorizationResolver) {
                to.resolve.authorizationResolver = ["AuthService", function (AuthService) {
                    if (AuthService.authentication.isAuth) {
                        return true;
                    }
                    $location.path("/login");
                }];
            }
        }
    });
}]);