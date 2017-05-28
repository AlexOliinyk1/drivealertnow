app.controller('SummaryController', ['SummaryService', function (summaryService) {
    var vm = this;

    vm.isLoading = {};
    vm.summaryReport = [];
    vm.filter = {
        fromDate: new Date(),
        toDate: new Date()
    };
    vm.loadReport = _loadReport;

    function _loadReport() {
        vm.isLoading = summaryService.getSummary(vm.filter.fromDate, vm.filter.toDate)
            .then(function (result) {
                console.log(result);
                vm.summaryReport = result;
            });
    }

    _loadReport();
}]);
