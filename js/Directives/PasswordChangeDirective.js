(function() {
    'use strict';

    angular
        .module('gobhash')
        .directive('passwordChange', PasswordChangeDirective);

    PasswordChangeDirective.$inject = [];
    function PasswordChangeDirective() {
        var directive = {
            bindToController: true,
            controller: function() {},
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            templateUrl: 'html/User/Profile/change_password.html',
            scope: {
                data: '=data'
            }
        };

        return directive;
        
        function link(scope, element, attrs) {
        }
    }
})();
