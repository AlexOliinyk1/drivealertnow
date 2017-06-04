app.run(['AuthService', '$rootScope', '$location', 'BufferService', '$http',
    function (AuthService, $rootScope, $location, bufferService, $http) {

        if (window != window.top) {
            var res = $location.search();
            bufferService.setIsIFrame(true);
            AuthService.setSpesialAuthData(res.token, res.userId);
        }
        else {
            AuthService.fillAuthData();
        }

        console.log(bufferService.getIsIFrame());

        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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

            $rootScope.$broadcast('pageTitle.change.start', null);
        });

        $rootScope.$on("$routeChangeSuccess", function (evt, to, from) {
            if (to.title) {
                $rootScope.$broadcast('pageTitle.change.end', { title: to.title, icon: to.icon });
            }
        });
    }
]);