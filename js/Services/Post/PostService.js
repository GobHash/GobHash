(function () {
    'use strict';

    angular
        .module('gobhash')
        .factory('PostService', PostService);

    PostService.$inject = ['$http'];
    function PostService($http) {
        // var apiUrl = 'https://api.gobhash.com/v1';
        var apiUrl = 'https://api-dev.gobhash.com/v1';
        var service = {};

        service.CreatePost = CreatePost;

        return service;

        // Crear post
        function CreatePost(data, callback) {
            return $http.post(
                    apiUrl + '/post',
                    data
                )
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
