app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/alerts', {
        controller: 'AlertsController',
        templateUrl: 'app/modules/alerts/alerts.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Alerts',
        icon: 'fa-phone'
    });

    $routeProvider.when('/login', {
        controller: 'LoginController',
        templateUrl: '/app/modules/login/login.html',
        controllerAs: 'vm'
    });

    $routeProvider.when('/account', {
        controller: 'AccountController',
        templateUrl: '/app/modules/account/account.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Account',
        icon: 'fa-user'
    });

    $routeProvider.when('/devices', {
        controller: 'DevicesController',
        templateUrl: '/app/modules/devices/devices.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Devices',
        icon: 'fa-mobile'
    });

    $routeProvider.when('/add-device', {
        controller: 'AddDeviceController',
        templateUrl: '/app/modules/add-device/add-device.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Add Device',
        icon: 'fa-phone'
    });

    $routeProvider.when('/edit-device', {
        controller: 'EditDeviceController',
        templateUrl: '/app/modules/add-device/add-device.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Edit Device',
        icon: 'fa-phone'
    });

    $routeProvider.when('/faq', {
        controller: 'FaqController',
        templateUrl: '/app/modules/faq/faq.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'FAQ',
        icon: 'fa-question'
    });

    $routeProvider.when('/settings', {
        controller: 'SettingsController',
        templateUrl: '/app/modules/settings/settings.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Settings',
        icon: 'fa-gears'
    });

    $routeProvider.when('/video', {
        controller: 'VideoController',
        templateUrl: '/app/modules/video/video.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Videos',
        icon: 'fa-play'
    });

    $routeProvider.when('/reminder-password', {
        controller: 'ReminderPasswordController',
        templateUrl: '/app/modules/reminder-password/reminder-password.html',
        controllerAs: 'vm',
        authorize: false
    });

    $routeProvider.when('/signup-wizard', {
        controller: 'SignupWizardController',
        templateUrl: '/app/modules/signup-wizard/signup-wizard.html',
        controllerAs: 'vm',
        authorize: false
    });

    $routeProvider.when('/monthly-subscriptions', {
        controller: 'MonthlySubscriptionsController',
        templateUrl: '/app/modules/monthly-subscriptions/monthly-subscriptions.html',
        controllerAs: 'vm',
        authorize: false
    });

    $routeProvider.when('/locations', {
        controller: 'LocationsController',
        templateUrl: '/app/modules/locations/locations.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Locations',
        icon: 'fa-map-marker'
    });

    $routeProvider.when('/summary', {
        controller: 'SummaryController',
        templateUrl: '/app/modules/summary/summary.html',
        controllerAs: 'vm',
        authorize: true,
        title: 'Summary',
        icon: 'fa-table'
    });

    $routeProvider.otherwise({ redirectTo: '/alerts' });

    //$locationProvider.html5Mode(true);
});

app.constant('ngWebSettings', {
    apiServiceBaseUri: 'http://api.drivealertapi.usa.cc/',
    apiVersion: 'v1',
    clientId: 'C35E917F-8B62-41E0-896E-A4A625C15C4D',
    deviceTypes: [{ name: "Android", id: 1 }, { name: "IOS", id: 2 }]
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptorService');
});
