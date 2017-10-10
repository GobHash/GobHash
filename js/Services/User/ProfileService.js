(function () {
    'use strict';

    angular
        .module('gobhash')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$http', '$rootScope'];
    function ProfileService($http, $rootScope) {
        // var apiUrl = 'https://api.gobhash.com/v1';
        var apiUrl = 'https://api-dev.gobhash.com/v1';

        // $rootScope.globals

        var service = {};

        service.GetProfile = GetProfile;

        return service;

        // Recuperación de usuario confirmada
        function GetProfile(callback) {
            return $http.get(apiUrl + '/users/profile')
                .then(function (response) {
                    handleSuccess(response, callback);
                })
                .catch(function (error) {
                    handleError(error, callback);
                }
            );
        }


        // private functions

        function handleSuccess(res, callback) {
            let returnData = {
                success: true,
                response: res
            };

            return callback(returnData);
        }

        function handleError(error, callback) {
            let returnData = {
                success: false,
                message: error
            };

            return callback(returnData);
        }
    }

})();
