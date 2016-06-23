/*global angular, windowBottom*/
angular.module('Roads').directive('scrollCallback', function($window) {
    return {
        scope: {
            callbackFn: '&scrollCallback'
        },
        link: function(scope, elem, attrs) {
            angular.element($window).bind("scroll", function() {
                var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                var body = document.body,
                    html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                windowBottom = windowHeight + window.pageYOffset;
                if (windowBottom >= docHeight) {
                    scope.callbackFn();
                }
            });
        }
    };
});