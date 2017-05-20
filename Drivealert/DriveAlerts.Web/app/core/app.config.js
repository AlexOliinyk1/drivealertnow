app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'AlertsCtrl',
        templateUrl: 'app/modules/alerts/alerts.html',
        controllerAs: 'vm',
        authorize: true
    });

    $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: '/app/modules/login/login.html',
        controllerAs: 'vm'
    });

    $routeProvider.when('/account', {
        controller: 'AccountCtrl',
        templateUrl: '/app/modules/account/account.html',
        controllerAs: 'vm',
        authorize: true
    });

    $routeProvider.when('/devices', {
        controller: 'DevicesCtrl',
        templateUrl: '/app/modules/devices/devices.html',
        controllerAs: 'vm',
        authorize: true
    });

    $routeProvider.when('/faq', {
        controller: 'FaqCtrl',
        templateUrl: '/app/modules/faq/faq.html',
        controllerAs: 'vm',
        authorize: true
    });

    $routeProvider.when('/settings', {
        controller: 'SettingsCtrl',
        templateUrl: '/app/modules/settings/settings.html',
        controllerAs: 'vm',
        authorize: true
    });

    $routeProvider.when('/video', {
        controller: 'VideoCtrl',
        templateUrl: '/app/modules/video/video.html',
        controllerAs: 'vm',
        authorize: true
    });

    $routeProvider.when('/reminder', {
        controller: 'ReminderCtrl',
        templateUrl: '/app/modules/reminder/reminder.html',
        controllerAs: 'vm',
        authorize: false
    });

    $routeProvider.otherwise({ redirectTo: '/' });
    //$locationProvider.html5Mode(true);
});

app.constant('ngWebSettings', {
    apiServiceBaseUri: 'http://api.drivealertapi.usa.cc/',
    apiVersion: 'v1',
    clientId: 'C35E917F-8B62-41E0-896E-A4A625C15C4D'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptorService');
});
