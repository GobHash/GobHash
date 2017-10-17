(function() {
    'use strict';

    angular
        .module('gobhash')
        .directive('profileData', ProfileDataDirective);

    ProfileDataDirective.$inject = [];
    function ProfileDataDirective() {
        var directive = {
            bindToController: true,
            controller: function() {},
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            templateUrl: 'html/User/Profile/profile_info.html',
            scope: {
                profile: '=profile',
                noactions: '=?'
            }
        };

        return directive;
        
        function link(scope, element, attrs) {
        }
    }
})();
