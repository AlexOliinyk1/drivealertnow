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
        var currentStep = 0;

        vm.init = init;
        vm.proccess = false;
        vm.steps = [
            {
                email: '',
                orderNumber: '',
                promotionCode: '',
                selectedState: '',
                selectedCounty: '',
                changeState: changeState,
                availableStates: [],
                availableCounties: [],
                validatePromoCode: validatePromoCode,
                validateOrder: validateOrder,
                promocodeMessage: "",
                orderNumberMessage: "",
                isValid: false
            },
            {
                maxPhones: maxPhones,
                phones: [new phoneModel()],
                canAddPhone: true,
                violations: '',

                addPhone: addNewCell,
                removePhone: removeNewCell,
                validatePhoneNumber: validatePhoneNumber,
                isValid: false
            },
            {
                adminName: '',
                email: '',
                password: '',
                confirmPassword: '',
                isValid: false
            }
        ];
        vm.stepsResources = {
            yesNoQuestion: [{ text: 'Yes', value: true }, { text: 'No', value: false }],
            isHavePromotionCode: false,
            isPartOfSafetyProgram: false,
        };
        vm.goBack = goBack;
        vm.goForward = goForward;
        vm.submit = submitWizard;

        $scope.$watch('vm.stepsResources.isPartOfSafetyProgram', function (newVal, oldVal) {
            if (newVal) {
                vm.steps[1].maxPhones = 1;
                vm.steps[1].phones.splice(1, vm.steps[1].phones.length);
            }
            else {
                vm.steps[1].maxPhones = maxPhones;
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
            if (vm.steps[1].canAddPhone) {
                vm.steps[1].phones.push(new phoneModel());
            }

            vm.steps[1].canAddPhone = vm.steps[1].phones.length < vm.steps[1].maxPhones;
        };

        function removeNewCell(index) {
            if (vm.steps[1].phones.length > 1) {
                vm.steps[1].phones.splice(index, 1);
            }

            vm.steps[1].canAddPhone = vm.steps[1].phones.length < vm.steps[1].maxPhones;
        };

        function changeState() {
            vm.steps[0].availableCounties = vm.steps[0].selectedState.Counties;
        }

        function loadStates() {
            signupWizardService.getCounties()
                .then(function (result) {
                    vm.steps[0].availableStates = result;
                });
        }

        function submitWizard() {
            var submitModel = {
                Email: "string",
                TicketNumber: "string",
                CountyId: 0,
                StateId: 0,

                Phones: [
                  {
                      FirstName: "string",
                      LastName: "string",
                      PhoneNumber: "string",
                      OsType: 0,
                      Email: "string"
                  }
                ],

                FirstName: "string",
                LastName: "string",
                Password: "string",
                ConfirmPassword: "string",
                TimeZoneId: 0
            }

            signupWizardService.submitWizard(submitModel)
                .then(function (result) {
                    if (result.status == 200) {
                    }
                    else {
                    }
                });
        }

        function validatePromoCode(code) {
            signupWizardService.validatePromoCode(code)
                .then(function (result) {
                    if (result.status == 200) {
                        vm.steps[0].promocodeMessage = "";
                    }
                    else {
                        vm.steps[0].promocodeMessage = "Promotion code is invalid."
                    }
                });
        }

        function validateOrder() {
            var toValidate = {
                OrderNumber: vm.steps[0].orderNumber,
                Email: vm.steps[0].email
            };

            signupWizardService.validateOrderInfo(toValidate)
                .then(function (result) {
                    if (result.status == 200) {
                        vm.steps[0].orderNumberMessage = "";
                    }
                    else {
                        vm.steps[0].orderNumberMessage = "Purchase with orderNumber " + vm.steps[0].orderNumber + " for user " + vm.steps[0].email + " not found";
                    }
                });
        }

        function goBack() {
            if (currentStep > 0) {
                currentStep--;
            }
        }

        function goForward(e) {
            if (vm.steps[currentStep].isValid && currentStep < vm.steps.length - 1) {
                currentStep++;
            }
        }

        function init() {
            if ($routeParams.orderNumber && $routeParams.email) {
                vm.proccess = signupWizardService.validateOrderInfo({ OrderNumber: $routeParams.orderNumber, Email: $routeParams.email })
                    .then(function (result) {
                        if (result.status == 200) {
                            vm.steps[0].email = $routeParams.email;
                            vm.steps[0].orderNumber = $routeParams.orderNumber;
                        }
                    });
            }

            loadStates();
        }
    }
]);
