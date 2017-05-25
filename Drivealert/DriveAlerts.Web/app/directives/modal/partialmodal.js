app.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            modalContent: '='
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function () {
                scope.modalContent = null;
            };
        },
        templateUrl: "app/directives/modal/partialmodal.html"
    };
});