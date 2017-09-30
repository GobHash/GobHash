(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$rootScope', 'FlashService', '$scope'];
    function ProfileController(UserService, $rootScope, FlashService, $scope) {
        var vm = this;

        vm.user = null;
        vm.uploadCurrentUserProfile = uploadCurrentUserProfile;

        vm.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        vm.myImage='';
        vm.myCroppedImage='';

        var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function() {
                vm.myImage = evt.target.result;
            });
        };

        reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function uploadCurrentUserProfile() {
            UserService.Update(vm.user)
                .then(function (user) {
                    FlashService.Success('Actualizacion exitosa', true);
                });
        }

    }

})();
