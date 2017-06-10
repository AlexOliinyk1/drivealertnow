app.run(['AuthService', '$rootScope', '$location', 'BufferService', '$http',
    function (AuthService, $rootScope, $location, bufferService, $http) {

        if (window != window.top) {
            bufferService.setIsIFrame(true);
            bufferService.authorizationInProcess = true;

            var queryString = $location.search();
            var socialToken = queryString.token;
            var socialUserId = queryString.userId;

            bufferService.activePhone = queryString.phoneNumber;

            AuthService.socialLogin({ socialToken: socialToken, userId: socialUserId })
                .then(function success(data) {

                    AuthService.setSpesialAuthData(data.token, data.userId);
                    bufferService.authorizationInProcess = false;
                    $location.path('/');

                }, function fail(exc) {

                    console.log(exc);
                    bufferService.authorizationInProcess = false;
                    $location.path('/unathorize');

                });
        }
        else {
            AuthService.fillAuthData();
        }

        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

        $rootScope.$on("$routeChangeStart", function (evt, to, from) {
            //  Custom redirecting rule for authorized or anonymous users
            if (to.authorize === true) {
                to.resolve = to.resolve || {};
                if (!to.resolve.authorizationResolver) {
                    to.resolve.authorizationResolver = ["AuthService", function (AuthService) {
                        //  need to wait for end of social authorization
                        if (!bufferService.authorizationInProcess) {

                            if (AuthService.authentication.isAuth) {
                                return true;
                            }
                            evt.preventDefault();

                            if (bufferService.getIsIFrame()) {
                                //  if site use as IFrame show unauthorize page
                                $location.path('/unathorize');
                            }
                            else {
                                //  if main site go to login
                                $location.path('/login');
                            }
                        }
                    }];
                }
            }

            $rootScope.$broadcast('pageTitle.change.start');
        });

        $rootScope.$on("$routeChangeSuccess", function (evt, to, from) {
            if (to.title) {
                $rootScope.$broadcast('pageTitle.change.end', { title: to.title, icon: to.icon });
            }
        });
    }
]);