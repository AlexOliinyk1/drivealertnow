app.controller('SignupWizardController', ['$scope',
    function ($scope) {
        var vm = this;

        vm.step1 = {
            email: '',
            orderNumber: '',
            yesNoQuestion: [{ text: 'Yes', value: true }, { text: 'No', value: false }],
            isHavePromotionCode: false,
            promotionCode: '',
            isPartOfSafetyProgram: false
        };

    }
]);
