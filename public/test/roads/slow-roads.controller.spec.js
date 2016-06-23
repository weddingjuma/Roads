/*global inject, expect, spyOnAngularService, spyOnAngularServiceError*/
describe('SlowRoadsController', function() {
    var RoadsService;
    var ctrl;

    beforeEach(function() {
        module('Roads');

        inject(function($injector) {
            RoadsService = $injector.get('RoadsService');
            ctrl = $injector.get('$controller')('SlowRoadsController', {
                RoadsService: RoadsService
            });
        });
    });

    describe('Initialization', function() {
        it('Should instatiate local variables with default values', function() {
            expect(ctrl.slowRoads).toEqual([]);
            expect(ctrl.weatherSlowedRoads).toEqual([]);
        });
    });

    describe('Service calls', function() {
        it('Should call RoadsService and retrieve slow and weather slowed roads', function() {
            var roads = [{a: 1}, {b: 2}];
            var response = {
                data: {
                    data: roads
                }
            };
            var slowRoadsSpy = spyOnAngularService(RoadsService, 'slowRoads', response);
            var weatherSlowedRoadsSpy = spyOnAngularService(RoadsService, 'weatherSlowedRoads', response);
    
            ctrl.init();

            expect(slowRoadsSpy).toHaveBeenCalled();
            expect(weatherSlowedRoadsSpy).toHaveBeenCalled();
            
            expect(ctrl.slowRoads).toEqual(roads);
            expect(ctrl.weatherSlowedRoads).toEqual(roads);
            
        });
    });


});