(function () {
    'use strict';

    angular
        .module('gobhash')
        .factory('FeedService', FeedService);

    FeedService.$inject = ['$http'];
    function FeedService($http) {
        // var apiUrl = 'https://api.gobhash.com/v1';
        var apiUrl = 'https://api-dev.gobhash.com/v1';
        var service = {};

        service.GetPosts = GetPosts;
        service.GetPost = GetPost;
        service.AddPostComment = AddPostComment;

        return service;

        // Obtener los posts
        function GetPosts(callback) {
            return $http.get(apiUrl + '/posts')
                .then(function (response) {
                    handleSuccess(response, callback);
                })
                .catch(function (error) {
                    handleError(error, callback);
                }
            );
        }

        // Obtener un post específico
        function GetPost(id, callback) {
            return $http.get(
                    apiUrl + '/posts/' + id
                )
                .then(function (response) {
                    handleSuccess(response, callback);
                })
                .catch(function (error) {
                    handleError(error, callback);
                }
            );
        }

        function AddPostComment(data, callback) {
            return $http.post(
                    apiUrl + '/posts/comment',
                    {
                        postId: data.postId,
                        content: data.content
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
