app.factory('BufferService', ['$http', '$q',
    function ($http, $q) {
        var service = {};
        var _isInFrame = false;

        service.editorDevice = null;
        service.activePhone = null;
        service.setIsIFrame = _setIsIFrame;
        service.getIsIFrame = _getIsIFrame;

        function _setIsIFrame(val) {
            _isInFrame = val;
        }
        function _getIsIFrame() {
            return _isInFrame;
        }

        return service;
    }
]);
