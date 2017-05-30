app.directive('bootstrapCollapseBtn', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var expanded = 'fa-minus';
            var collapsed = 'fa-plus';

            element.click(function (e) {
                var i = element.find('i');

                if (i.hasClass(expanded)) {
                    i.removeClass(expanded);
                    i.addClass(collapsed);
                }
                else {
                    i.removeClass(collapsed);
                    i.addClass(expanded);
                }
            });
        }
    };
});