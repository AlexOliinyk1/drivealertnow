(function () {
    var apiServiceBaseUri = 'http://api.drivealertapi.usa.cc/';
    var apiVersion = 'v1';

    app.constant('ngWebSettings', {
        clientId: 'C35E917F-8B62-41E0-896E-A4A625C15C4D',
        deviceTypes: [{ name: "Android", id: 1 }, { name: "IOS", id: 2 }],

        api: {
            //Alert
            alertSearch: apiServiceBaseUri + apiVersion + '/alerts/phones/',//{phoneNumber},POST
            //LocationTracking
            locationsSearch: apiServiceBaseUri + apiVersion + '/location-trackings/phones/',//{phoneNumber},POST
            //Phone
            getPhones: "" + apiServiceBaseUri + apiVersion + '/phones/users/',//{userId},GET
            addPhone: apiServiceBaseUri + apiVersion + '/phones/users/',//{userId},POST
            removePhone: apiServiceBaseUri + apiVersion + '/phones/',//{phoneId},DELETE
            updatePhone: apiServiceBaseUri + apiVersion + '/phones/',//{phoneId},PUT
            //Setting
            getPhoneSettings: apiServiceBaseUri + apiVersion + '/settings/phones/',//{phoneId}',GET
            savePhoneSettings: apiServiceBaseUri + apiVersion + '/settings/phones/',//{phoneId}',POST
            saveSettingsForAllPhones: apiServiceBaseUri + apiVersion + '/settings',//POST
            //Auth
            authorize: apiServiceBaseUri + apiVersion + '/token',//POST
        }
    });
}());

