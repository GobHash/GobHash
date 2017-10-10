(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('RecoverPasswordController', RecoverPasswordController);

    RecoverPasswordController.$inject = ['$rootScope', 'FlashService', 'ProfileService'];
    function RecoverPasswordController($rootScope, FlashService, ProfileService) {
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
