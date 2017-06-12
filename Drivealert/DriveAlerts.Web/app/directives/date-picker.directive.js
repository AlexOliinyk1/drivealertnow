app.directive('datePicker', function () {
    return {
        restrict: 'A',
        scope: {
            modelValue: '=ngModel'
        },
        link: function (scope, element, attrs, ctrl) {
            element.daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                startDate: scope.modelValue,
            });
        }
    };
});