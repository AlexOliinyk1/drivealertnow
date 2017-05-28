app.factory('SummaryService', ['$http', '$q', 'ngWebSettings',
    function ($http, $q, ngWebSettings) {
        var serviceBase = ngWebSettings.apiServiceBaseUri + ngWebSettings.apiVersion + '/';
        var service = {};

        service.getSummary = _getSummary;

        function _getSummary(fromDate, toDate) {
            var d = $q.defer();
            // imitate request
            setTimeout(function () {
                d.resolve([
                    {
                        name: 'Edvard',
                        violationType: '###', //it's mean Violation# on UI                   
                        phoneNumber: '(832) 622-4609',
                        installDate: '2/6/2017 3:51:12 PM',
                        lastActivityDate: '',
                        lastViolationDate: '',
                        callViolations: [
                            {
                                date: '2/6/2017 3:51:12 PM',
                                description: 'Call type: Incoming | Call Received While moving | Call was dropped'
                            },
                            {
                                date: '2/6/2017 3:51:12 PM',
                                description: 'Call type: Outgoing | Call Made While moving | Call was dropped'
                            }
                        ],
                        connectionViolations: [
                            {
                                date: '2/6/2017 3:51:12 PM',
                                description: 'Bluetooth has been turned off'
                            },
                            {
                                date: '2/6/2017 3:51:12 PM',
                                description: 'Location Services are disabled'
                            }
                        ],
                        dailyTripReports: [
                            {
                                day: 'monday',
                                startTime: '2/6/2017 3:51:12 PM',
                                endTime: '4/6/2017 3:51:12 PM'
                            }
                        ]
                    },
                    {
                        name: 'Robert Piazza',
                        violationType: '', //it's mean Violation# on UI                   
                        phoneNumber: '(516) 322-6377',
                        installDate: '2/27/2017 11:15:55 AM',
                        lastActivityDate: '4/8/2017 6:44:25 PM',
                        lastViolationDate: '4/6/2017 8:41:47 AM',
                        callViolations: [
                            {
                                date: '',
                                description: ''
                            }
                        ],
                        connectionViolations: [
                            {
                                date: '',
                                description: ''
                            }
                        ],
                        dailyTripReports: [
                            {
                                day: '',
                                startTime: '',
                                endTime: ''
                            }
                        ]
                    },
                ]);
            }, 1000);

            return d.promise;
        }

        return service;
    }
]);
