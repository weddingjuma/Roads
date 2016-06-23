/*global inject, expect, spyOnAngularService*/
describe('RoadsController', function() {
    var ctrl;
    var RoadsService;
    var $rootScope;
    var $scope;

    beforeEach(function() {
        module('Roads');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = {
                $apply : function() {}
            };
            RoadsService = $injector.get('RoadsService');
            ctrl = $injector.get('$controller')('RoadsController', {
                RoadsService: RoadsService,
                $scope: $scope
            });
        });
    });


    describe('Initialization', function() {
        it('Should instatiate local variables with default values', function() {
            expect(ctrl.slowRoads).toEqual([]);
            expect(ctrl.closedRoads).toEqual([]);
            expect(ctrl.roadsInWork).toEqual([]);
            expect(ctrl.weatherClosedRoads).toEqual([]);
            expect(ctrl.weatherSlowedRoads).toEqual([]);
        });

        it('Should instantiate limit variables with default values', function() {
            expect(ctrl.slowRoadsLimit).toEqual(6);
            expect(ctrl.roadsInWorkLimit).toEqual(0);
            expect(ctrl.closedRoadsLimit).toEqual(0);
            expect(ctrl.weatherClosedRoadsLimit).toEqual(0);
            expect(ctrl.weatherSlowedRoadsLimit).toEqual(0);
        });
    });

    describe('Service calls', function() {
        it('Should call RoadsService and get all values and initialize limits array', function() {
            var roads = [{
                a: 1
            }, {
                b: 2
            }];
            var response = {
                data: {
                    slowRoads: {
                        data: roads
                    },
                    inWorkRoads: {
                        data: roads
                    },
                    closedRoads: {
                        data: roads
                    },
                    weatherClosedRoads: {
                        data: roads
                    },
                    weatherSlowedRoads: {
                        data: roads
                    }
                }
            };
            var roadsSpy = spyOnAngularService(RoadsService, 'roads', response);

            ctrl.init();
            expect(roadsSpy).toHaveBeenCalled();
            expect(ctrl.closedRoads).toEqual(roads);
            expect(ctrl.slowRoads).toEqual(roads);
            expect(ctrl.roadsInWork).toEqual(roads);
            expect(ctrl.weatherClosedRoads).toEqual(roads);
            expect(ctrl.weatherSlowedRoads).toEqual(roads);

            expect(ctrl.limits).toEqual([{
                current: ctrl.slowRoadsLimit,
                max: ctrl.slowRoads.length
            }, {
                current: ctrl.roadsInWorkLimit,
                max: ctrl.roadsInWork.length
            }, {
                current: ctrl.closedRoadsLimit,
                max: ctrl.closedRoads.length
            }, {
                current: ctrl.weatherClosedRoadsLimit,
                max: ctrl.weatherClosedRoads.length
            }, {
                current: ctrl.weatherSlowedRoadsLimit,
                max: ctrl.weatherSlowedRoads.length
            }]);

        });
    });

    describe('Action handlers', function() {
        describe('Lazy loading function', function() {
            it('Should increment only the first value less than it\'s limit', function() {
                ctrl.limits = [{
                    current: 6,
                    max: 6
                }, {
                    current: 0,
                    max: 7
                }, {
                    current: 0,
                    max: 8
                }, {
                    current: 0,
                    max: 9
                }, {
                    current: 0,
                    max: 10
                }];
                ctrl.load();
                
                expect(ctrl.limits[0].current).toEqual(6);
                expect(ctrl.limits[1].current).toEqual(6);
                expect(ctrl.limits[2].current).toEqual(0);
                expect(ctrl.limits[3].current).toEqual(0);
                expect(ctrl.limits[4].current).toEqual(0);
            });
        });
    });


});