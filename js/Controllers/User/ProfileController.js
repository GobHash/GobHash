(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$rootScope', 'FlashService', '$scope'];
    function ProfileController(UserService, $rootScope, FlashService, $scope) {
        var vm = this;

        vm.user = null;
        // vm.uploadCurrentUserProfile = uploadCurrentUserProfile;

        vm.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        vm.myImage='';
        vm.myCroppedImage='';


    }

})();
