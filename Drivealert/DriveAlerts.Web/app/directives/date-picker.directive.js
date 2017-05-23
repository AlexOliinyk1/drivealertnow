app.directive('datePicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.daterangepicker({
                singleDatePicker: true,
                showDropdowns: true
            });
        }
    };
});