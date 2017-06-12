app.controller('SummaryController', ['$scope', 'SummaryService', 'BufferService',
    function ($scope, summaryService, bufferService, authService, devicesService) {
        var vm = this;
        var filter = {
            fromDate: new Date(),
            toDate: new Date()
        };

        vm.currentPhone = null;
        vm.isLoading = {};
        vm.summaryReport = [];
        vm.filterUI = {
            fromDate: new Date(),
            toDate: new Date()
        };
        vm.updateData = _loadReport;

        $scope.$watch('vm.filterUI.fromDate', function (current, original) {
            vm.filter.fromDate = new Date(current);
            vm.filter.fromDate.setHours(0, 0, 0, 0);
        });

        $scope.$watch('vm.filterUI.toDate', function (current, original) {
            vm.filter.toDate = new Date(current);
            vm.filter.toDate.setHours(0, 0, 0, 0);
        });

        function _loadReport() {
            vm.isLoading = summaryService.getSummary(filter.fromDate, filter.toDate)
                .then(function (result) {
                    console.log(result);
                    vm.summaryReport = result;
                });
        }

        _loadReport();
    }
]);
