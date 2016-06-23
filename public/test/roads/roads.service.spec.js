/*global inject, expect*/
describe('RoadsService', function() {
    var service;
    var httpBackend;

    beforeEach(function() {
        module('Roads');

        inject(function($injector) {
            service = $injector.get('RoadsService');
            httpBackend = $injector.get('$httpBackend');
        });
    });

    describe('Remote calls', function() {
        describe('All roads', function() {
            it('Should execute GET and return ALL roads', function() {
                var roads = [{
                    a: 1
                }, {
                    b: 2
                }];
                httpBackend.expectGET('/api/roads').respond(200, roads);

                var returnedRoads;
                service.roads().then(function(response) {
                    returnedRoads = response.data;
                });

                httpBackend.flush();
                expect(returnedRoads).toEqual(roads);
            });
        });
        
        describe('Slow roads', function() {
            it('Should execute GET and return SLOW roads', function() {
                var roads = [{
                    a: 1
                }, {
                    b: 2
                }];
                httpBackend.expectGET('/api/slow-roads').respond(200, roads);

                var returnedRoads;
                service.slowRoads().then(function(response) {
                    returnedRoads = response.data;
                });

                httpBackend.flush();
                expect(returnedRoads).toEqual(roads);
            });
        });
        
        describe('Closed roads', function() {
            it('Should execute GET and return CLOSED roads', function() {
                var roads = [{
                    a: 1
                }, {
                    b: 2
                }];
                httpBackend.expectGET('/api/closed-roads').respond(200, roads);

                var returnedRoads;
                service.closedRoads().then(function(response) {
                    returnedRoads = response.data;
                });

                httpBackend.flush();
                expect(returnedRoads).toEqual(roads);
            });
        });
        
        describe('Roads in work', function() {
            it('Should execute GET and return roads IN WORK', function() {
                var roads = [{
                    a: 1
                }, {
                    b: 2
                }];
                httpBackend.expectGET('/api/in-work-roads').respond(200, roads);

                var returnedRoads;
                service.roadsInWork().then(function(response) {
                    returnedRoads = response.data;
                });

                httpBackend.flush();
                expect(returnedRoads).toEqual(roads);
            });
        });
        
        describe('Weather slowed roads', function() {
            it('Should execute GET and return WEATHER SLOWED roads', function() {
                var roads = [{
                    a: 1
                }, {
                    b: 2
                }];
                httpBackend.expectGET('/api/weather-slowed-roads').respond(200, roads);

                var returnedRoads;
                service.weatherSlowedRoads().then(function(response) {
                    returnedRoads = response.data;
                });

                httpBackend.flush();
                expect(returnedRoads).toEqual(roads);
            });
        });
        
        describe('Weather closed roads', function() {
            it('Should execute GET and return WEATHER CLOSED roads', function() {
                var roads = [{
                    a: 1
                }, {
                    b: 2
                }];
                httpBackend.expectGET('/api/weather-closed-roads').respond(200, roads);

                var returnedRoads;
                service.weatherClosedRoads().then(function(response) {
                    returnedRoads = response.data;
                });

                httpBackend.flush();
                expect(returnedRoads).toEqual(roads);
            });
        });
    });
});