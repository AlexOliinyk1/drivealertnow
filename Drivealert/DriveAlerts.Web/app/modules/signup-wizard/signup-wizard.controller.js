app.controller('SignupWizardController', ['$scope', 'SignupWizardService',
    function ($scope, signupWizardService) {
        var vm = this;
        vm.isDisableAdd = false;

        vm.step1 = {
            email: '',
            orderNumber: '',
            yesNoQuestion: [{ text: 'Yes', value: true }, { text: 'No', value: false }],
            isHavePromotionCode: false,
            promotionCode: '',
            isPartOfSafetyProgram: false,
            availableStates: [],
            selectedState: '',
            selectState: function (state) {

                vm.step1.availableCounties = vm.step1.selectedState.Counties;
            },
            availableCounties: [],
            selectedCountie: '',
        };

        vm.step2 = {
            email: '',
            orderNumber: '',
            yesNoQuestion: [{ text: 'Yes', value: true }, { text: 'No', value: false }],
            isHavePromotionCode: false,
            promotionCode: '',
            isPartOfSafetyProgram: false
        };


        vm.step3 = {
            email: '',
            orderNumber: '',
            yesNoQuestion: [{ text: 'Yes', value: true }, { text: 'No', value: false }],
            isHavePromotionCode: false,
            promotionCode: '',
            isPartOfSafetyProgram: false
        };


        function _loadDevices() {
            vm.isLoading = signupWizardService.getCounties()
                .then(function (result) {

                    //success
                    vm.step1.availableStates = result;
                });
        }

        _loadDevices();

        $scope.choices = [
            { id: 'choice1', fullName: 'fullName 1', phoneNumber: 'phoneNumber 1', phoneOs: 'phoneOs 1' },
          
        ];

        $scope.addNewChoice = function () {
            var newItemNo = $scope.choices.length + 1;
            if (newItemNo < 5) {
                vm.isDisableAdd = false;

                $scope.choices.push({ 'id': 'choice' + newItemNo, 'fullName': '', 'phoneNumber': '', 'phoneOs': '' });

            }
            else {
                vm.isDisableAdd = true;
            }
        };

        $scope.removeNewChoice = function () {
            var newItemNo = $scope.choices.length - 1;
            vm.isDisableAdd = false;
            if (newItemNo !== 0) {
                $scope.choices.pop();
            }
        };

        $scope.showAddChoice = function (choice) {
            return choice.id === $scope.choices[$scope.choices.length - 1].id;
        };


    }
]);
