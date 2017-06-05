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

        $scope.cells = [
            { id: 'choice1', fullName: 'fullName 1', phoneNumber: 'phoneNumber 1', phoneOs: 'phoneOs 1' },
          
        ];

        $scope.addNewCell = function () {
            var newItemNo = $scope.cells.length + 1;
            if (newItemNo < 5) {
                vm.isDisableAdd = false;

                $scope.cells.push({ 'id': 'cell' + newItemNo, 'fullName': '', 'phoneNumber': '', 'phoneOs': '' });

            }
            else {
                vm.isDisableAdd = true;
            }
        };

        $scope.removeNewCell = function (cell) {
             
            //var newItemNo = $scope.cells.length - 1;
            $scope.cells;
            vm.isDisableAdd = false;
            
                //$scope.cells.pop();
                $scope.cells = $scope.cells.filter(function (obj) {
                    return obj.id !== cell.id;
                });
            
           
            $scope.cells;
        };

        $scope.showAddCell = function (cell) {
            return cell.id === $scope.cells[$scope.cells.length - 1].id;
        };


    }
]);
