app.factory('BufferService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var service = {};
        var _isInFrame = false;

        service.editorDeviceId = '';
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
