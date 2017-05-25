app.run(['AuthService', '$rootScope', '$location', 'BufferService',
    function (AuthService, $rootScope, $location, bufferService) {
        if (window != window.top) {
            var res = $location.search();
            bufferService.setIsIFrame(true);
            AuthService.setSpesialAuthData(res.token, res.userId);
        }
        else { AuthService.fillAuthData(); }
        console.log(bufferService.getIsIFrame());

        $rootScope.$on("$routeChangeStart", function (evt, to, from) {
            if (to.authorize === true) {
                to.resolve = to.resolve || {};
                if (!to.resolve.authorizationResolver) {
                    to.resolve.authorizationResolver = ["AuthService", function (AuthService) {
                        if (AuthService.authentication.isAuth) {
                            return true;
                        }
                        evt.preventDefault();
                        $location.path("/login");
                    }];
                }
            }
        });
    }
]);