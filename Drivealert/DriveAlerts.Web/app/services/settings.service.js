app.service('SettingsService', ['$http', 'ngWebSettings',
    function ($http, ngWebSettings) {
        var baseService = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getSettings = _getSettings;
        service.saveSettings = _saveSettings;
        service.saveSettingsForAll = _saveSettingsForAll;

        //  GET /v1/settings/phones/{phoneId}
        function _getSettings(phoneId) {
            return $http.get(ngWebSettings.api.getPhoneSettings + phoneId, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                }).catch(function (error) {
                    console.log(error);
                    return undefined;
                });
        }

        //  POST /v1/settings/phones/{phoneId}
        function _saveSettings(phoneId, settings) {
            return $http.post(ngWebSettings.api.savePhoneSettings + phoneId, settings, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return true;
                }).catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        //  POST /v1/settings
        function _saveSettingsForAll(settings) {
            return $http.post(ngWebSettings.api.saveSettingsForAllPhones, settings, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return true;
                }).catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        return service;
    }
]);