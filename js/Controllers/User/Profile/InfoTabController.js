(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('InfoTabController', InfoTabController);

    InfoTabController.$inject = ['$rootScope', 'FlashService', 'ProfileService'];
    function InfoTabController($rootScope, FlashService, ProfileService) {
        var vm = this;

        vm.GetProfileData = GetProfileData;
        vm.profileData = {};

        vm.GetProfileData();

        function GetProfileData() {
            ProfileService.GetProfile(
                function(response) {
                    vm.profileData = response.response.data;
                }
            );
        }
    }

})();
