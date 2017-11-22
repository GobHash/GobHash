(function () {
    'use strict';

    angular
        .module('gobhash')
        .factory('PostService', PostService);

    PostService.$inject = ['$http', '$cookieStore'];
    function PostService($http, $cookieStore) {
        // var apiUrl = 'https://api.gobhash.com/v1';
        var apiUrl = 'https://api-dev.gobhash.com/v1';
        var service = {};

        service.CreatePost = CreatePost;
        service.SetHeaders = SetHeaders;
        service.LikePost = LikePost;
        service.UserLikePostValidation = UserLikePostValidation;

        return service;

        function SetHeaders() {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookieStore.get('globals').currentUser.token;
        }

        // Crear post
        function CreatePost(data, callback) {
            service.SetHeaders();
            return $http.post(
                    apiUrl + '/posts',
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

        // Like a post
        function LikePost(id, callback) {
            return $http.post(
                    apiUrl + '/posts/like',
                    {
                        postId: id
                    }
                )
               .then(function (response) {
                    handleSuccess(response, callback);
               })
               .catch(function (error) {
                    handleError(error, callback);
               }
            );
        }

        // Verifica si se le puede dar like a un post
        function UserLikePostValidation(data, callback) {
            return $http.get(apiUrl + '/posts/like/validation/' + data.postId + '/' + data.userId)
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
