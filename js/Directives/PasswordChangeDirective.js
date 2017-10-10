(function() {
    'use strict';

    angular
        .module('gobhash')
        .directive('PasswordChangeDirective', PasswordChangeDirective);

    PasswordChangeDirective.$inject = ['dependency1'];
    function PasswordChangeDirective(dependency1) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: PasswordChangeController,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {
                usuario: '=usuario'
            }
        };

        return directive;
        
        function link(scope, element, attrs) {
        }
    }

    angular
        .module('gobhash')
        .controller('PasswordChangeDirective', PasswordChangeController);

    PasswordChangeController.$inject = ['$scope', '$attrs'];
    /* @ngInject */
    function PasswordChangeController () {
        
    }
})();
