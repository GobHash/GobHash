(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$rootScope'];
    function AuthController($rootScope) {}

})();
