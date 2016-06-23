/*global inject, expect, spyOnAngularService, spyOnAngularServiceError*/
describe('RoadsInWorkController', function() {
    var RoadsService;
    var ctrl;

    beforeEach(function() {
        module('Roads');

        inject(function($injector) {
            RoadsService = $injector.get('RoadsService');
            ctrl = $injector.get('$controller')('RoadsInWorkController', {
                RoadsService: RoadsService
            });
        });
    });

    describe('Initialization', function() {
        it('Should instatiate local variables with default values', function() {
            expect(ctrl.roadsInWork).toEqual([]);
        });
    });

    describe('Service calls', function() {
        it('Should call RoadsService and retrieve roads in work', function() {
            var roads = [{a: 1}, {b: 2}];
            var response = {
                data: {
                    data: roads
                }
            };
            var roadsInWorkSpy = spyOnAngularService(RoadsService, 'roadsInWork', response);
    
            ctrl.init();
            expect(roadsInWorkSpy).toHaveBeenCalled();
            expect(ctrl.roadsInWork).toEqual(roads);
            
        });
    });


});