(function() {
    'use strict';

    angular
        .module('gobhash')
        .directive('showPost', ShowPostDirective);

    ShowPostDirective.$inject = [];
    function ShowPostDirective() {
        var directive = {
            bindToController: true,
            controller: function() {},
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            templateUrl: 'html/Feed/Post/show.html',
            scope: {
                data: '=data'
            }
        };

        return directive;
        
        function link(scope, element, attrs) {
        }
    }
})();
