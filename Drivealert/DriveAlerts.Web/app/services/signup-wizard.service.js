app.factory('SignupWizardService', ['$http', '$q', 'ngWebSettings', 
    function ($http, $q, ngWebSettings) {
        var service = {};
       
        service.getCounties = _getCounties;
        service.validateOrderInfo = validateOrderInfo;
        service.validatePhoneNumber = validatePhoneNumber;
        service.validatePromoCode = validatePromoCode;
        service.submitWizard = submitWizard;

        return service;

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

        function validateOrderInfo(toValidate) {
            return $http.post(ngWebSettings.api.validateOrder, toValidate, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result;
                })
                .catch(function (error) {
                    console.log(error);
                    return error;
                });
        }

        function validatePhoneNumber(phoneNumber) {
            return $http.post(ngWebSettings.api.validatePhoneNumber, phoneNumber, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function validatePromoCode(code) {
            return $http.post(ngWebSettings.api.validatePromoCode, code, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function submitWizard(data) {
            return $http.post(ngWebSettings.api.submitWizard, data, { headers: { 'Content-Type': 'application/json' } })
                .then(function (result) {
                    return result;
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
]);
