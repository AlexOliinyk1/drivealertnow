(function () {
    var apiServiceBaseUri = 'http://api.drivealertapi.usa.cc/';
    var apiVersion = 'v1';

    app.constant('ngWebSettings', {
        clientId: 'C35E917F-8B62-41E0-896E-A4A625C15C4D',
        deviceTypes: [{ name: "Android", id: 1 }, { name: "iOS", id: 2 }],

        api: {
            //Account
            getAccountInfo: apiServiceBaseUri + apiVersion + '/NONE/',//GET: Not implemented
            createAccount: apiServiceBaseUri + apiVersion + '/accounts/',//POST: Create new account
            updateAccountInfo: apiServiceBaseUri + apiVersion + '/accounts/',//PUT: Update user info
            //  used 'addPhone' instead this
            addPnoneNumberToAccount: apiServiceBaseUri + apiVersion + '/accounts/phones/',//POST: Add new child's phone number
            changePasswordAccount: apiServiceBaseUri + apiVersion + '/accounts/passwords/',//PUT: Update password for user
            //Alert
            alertSearch: apiServiceBaseUri + apiVersion + '/alerts/phones/',//{phoneNumber},POST
            //LocationTracking
            locationsSearch: apiServiceBaseUri + apiVersion + '/location-trackings/phones/',//{phoneNumber},POST
            //Phone
            getPhones: apiServiceBaseUri + apiVersion + '/phones/users/',//{userId},GET
            addPhone: apiServiceBaseUri + apiVersion + '/phones/users/',//{userId},POST
            removePhone: apiServiceBaseUri + apiVersion + '/phones/',//{phoneId},DELETE
            updatePhone: apiServiceBaseUri + apiVersion + '/phones/',//{phoneId},PUT
            //Setting
            getPhoneSettings: apiServiceBaseUri + apiVersion + '/settings/phones/',//{phoneId},GET
            savePhoneSettings: apiServiceBaseUri + apiVersion + '/settings/phones/',//{phoneId},POST
            saveSettingsForAllPhones: apiServiceBaseUri + apiVersion + '/settings/',//POST
            //Auth
            authorize: apiServiceBaseUri + apiVersion + '/token',//POST
            report: apiServiceBaseUri + apiVersion + '/reports/phones/',//{phoneNumber},POST
            // signup wizard
            getCounties: apiServiceBaseUri + apiVersion + '/counties/',//GET 
        }
    });
}());

