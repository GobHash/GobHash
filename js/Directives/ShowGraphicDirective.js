(function() {
    'use strict';

    angular
        .module('gobhash')
        .directive('showGraphic', ShowGraphicDirective);

    ShowGraphicDirective.$inject = [];
    function ShowGraphicDirective() {
        var directive = {
            bindToController: true,
            controller: function() {
            },
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            templateUrl: 'html/Feed/Post/Graphic/display.html',
            scope: {
                data: '=data'
            }
        };

        return directive;
        
        function link(scope, element, attrs) {
        }
    }
})();
