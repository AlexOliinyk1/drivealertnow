app.factory('SignupWizardService', ['$http', '$q', 'ngWebSettings', 
    function ($http, $q, ngWebSettings) {
        var service = {};
       
        service.getCounties = _getCounties;

        function _getCounties() {

            return $http.get(ngWebSettings.api.getCounties, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result.data;
                })
                .catch(function (error) {
                    console.log(error);
                    return false;
                });
        }

        return service;
    }
]);
