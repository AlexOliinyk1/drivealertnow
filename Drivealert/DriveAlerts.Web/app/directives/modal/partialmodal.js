app.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            modalContent: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
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
        template: 'partialmodal.html' // See below
    };
});