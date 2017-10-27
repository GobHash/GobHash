(function () {
    'use strict';

    angular
        .module('gobhash')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        // var apiUrl = 'https://api.gobhash.com/v1';
        var apiUrl = 'https://api-dev.gobhash.com/v1';
        var service = {};

        service.Create = Create;
        service.ResetPassword = ResetPassword;
        service.SendResetPassword = SendResetPassword;
        service.SetHeaders = SetHeaders;

        return service;

        function SetHeaders() {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookieStore.get('globals').currentUser.token;
        }

        // Registro de usuario
        function Create(user, callback) {
            return $http.post(
                    apiUrl + '/users',
                    user
                )
               .then(function (response) {
                    handleSuccess(response, callback);
               })
               .catch(function (error) {
                    handleError(error, callback);
               }
            );
        }

        // Solicitar recuperación de usuario
        function ResetPassword(username, email, callback) {
            return $http.post(
                    apiUrl + '/auth/reset',
                    {
                        username: username,
                        email: email
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

        // Recuperación de usuario confirmada
        function SendResetPassword(token, password, callback) {
            return $http.patch(
                    apiUrl + '/users/password/change',
                    {
                        token: token,
                        password: password
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
