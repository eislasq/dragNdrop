var eiq_submodules_ = [];
[].forEach.call(
        'dragstart drag dragenter dragleave dragover drop dragend'.split(' '),
        function (eventName) {
            var directiveName = 'ng' + eventName[0].toUpperCase() + eventName.slice(1);
            var submoduleName = 'drag-and-drop.directives.' + eventName;
            eiq_submodules_.push(submoduleName);
            angular.module(submoduleName, [])
                    .directive(directiveName, ['$parse', '$rootScope', function ($parse, $rootScope) {
                            return {
                                restrict: 'A',
                                compile: function ($element, attr) {
                                    // We expose the powerful $event object on the scope that provides access to the Window,
                                    // etc. that isn't protected by the fast paths in $parse.  We explicitly request better
                                    // checks at the cost of speed since event handler expressions are not executed as
                                    // frequently as regular change detection.
                                    var fn = $parse(attr[directiveName], /* interceptorFn */ null, /* expensiveChecks */ true);
                                    return function ngEventHandler(scope, element) {
                                        element.on(eventName, function (event) {
                                            var callback = function () {
                                                fn(scope, {$event: event});
                                            };
                                            scope.$apply(callback);
                                        });
                                    };
                                }
                            };
                        }]);
        }
);


angular.module('drag-and-drop', eiq_submodules_);