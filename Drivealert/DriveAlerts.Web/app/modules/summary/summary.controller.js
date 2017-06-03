app.controller('SummaryController', ['$scope', 'SummaryService', 'BufferService',
    function ($scope, summaryService, bufferService, authService, devicesService) {
        var vm = this;

        vm.currentPhone = null;
        vm.isLoading = {};
        vm.summaryReport = [];
        vm.filter = {
            fromDate: new Date(),
            toDate: new Date()
        };
        vm.updateData = _loadReport;

        function _loadReport() {
            vm.isLoading = summaryService.getSummary(vm.filter.fromDate, vm.filter.toDate)
                .then(function (result) {
                    console.log(result);
                    vm.summaryReport = result;
                });
        }

        _loadReport();
    }
]);
