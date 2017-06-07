app.controller('SignupWizardController', ['$scope', 'SignupWizardService', '$routeParams',
    function ($scope, signupWizardService, $routeParams) {
        var vm = this;
        var maxPhones = 4;
        var phoneModel = function () {
            var model = {};
            model.id = '';
            model.fullName = '';
            model.phoneNumber = '';
            model.phoneOs = '';
            model.validationMessage = '';
            return model;
        };

        vm.init = init;
        vm.proccess = false;
        vm.firstStep = {
            email: '',
            orderNumber: '',
            promotionCode: '',
            selectedState: '',
            selectedCounty: '',
            changeState: changeState,
            availableStates: [],
            availableCounties: [],
            isValid: false
        };
        vm.secondStep = {
            maxPhones: maxPhones,
            phones: [new phoneModel()],
            canAddPhone: true,
            violations: '',

            addPhone: addNewCell,
            removePhone: removeNewCell,
            validatePhoneNumber: validatePhoneNumber,
            isValid: false
        };
        vm.thirdStep = {
            adminName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isValid: false
        };
        vm.stepsResources = {
            yesNoQuestion: [{ text: 'Yes', value: true }, { text: 'No', value: false }],
            isHavePromotionCode: false,
            isPartOfSafetyProgram: false,

        };

        $scope.$watch('vm.stepsResources.isPartOfSafetyProgram', function (newVal, oldVal) {
            if (newVal) {
                vm.secondStep.maxPhones = 1;
                vm.secondStep.phones.splice(1, vm.secondStep.phones.length);
            }
            else {
                vm.secondStep.maxPhones = maxPhones;
            }
        });

        function validatePhoneNumber(number) {
            if (number.phoneNumber) {
                signupWizardService.validatePhoneNumber(number.phoneNumber)
                .then(function (response) {
                    if (response.status != 200) {
                        number.validationMessage = JSON.parse(response.data.Message).Message;
                    }
                    else {
                        number.validationMessage = '';
                    }
                });
            }
            else {
                number.validationMessage = 'Phone Number Is Required';
            }
        }

        function addNewCell() {
            if (vm.secondStep.canAddPhone) {
                vm.secondStep.phones.push(new phoneModel());
            }

            vm.secondStep.canAddPhone = vm.secondStep.phones.length < vm.secondStep.maxPhones;
        };

        function removeNewCell(index) {
            if (vm.secondStep.phones.length > 1) {
                vm.secondStep.phones.splice(index, 1);
            }

            vm.secondStep.canAddPhone = vm.secondStep.phones.length < vm.secondStep.maxPhones;
        };

        function changeState() {
            vm.firstStep.availableCounties = vm.firstStep.selectedState.Counties;
        }

        function loadStates() {
            signupWizardService.getCounties()
                .then(function (result) {
                    vm.firstStep.availableStates = result;
                });
        }

        function init() {
            if ($routeParams.orderNumber && $routeParams.email) {
                vm.proccess = signupWizardService.validateOrderInfo({ OrderNumber: $routeParams.orderNumber, Email: $routeParams.email })
                    .then(function (result) {
                        if (result.status == 200) {
                            vm.firstStep.email = $routeParams.email;
                            vm.firstStep.orderNumber = $routeParams.orderNumber;
                        }
                    });
            }

            loadStates();
        }
    }
]);
