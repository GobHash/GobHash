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
        service.UpdateProfile = UpdateProfile;
        service.GetProfilePicture = GetProfilePicture;
        service.GetProfileStats = GetProfileStats;

        return service;

        // Obtener perfil del usuario
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

        // Obtener foto perfil del usuario
        function GetProfilePicture(id, callback) {
            return $http.get(apiUrl + '/users/' + id)
                .then(function (response) {
                    handleSuccess(response, callback);
                })
                .catch(function (error) {
                    handleError(error, callback);
                }
            );
        }

        // Obtener estadisticas de usuario
        function GetProfileStats(id, callback) {
            return $http.get(apiUrl + '/stats/user/' + id)
                .then(function (response) {
                    handleSuccess(response, callback);
                })
                .catch(function (error) {
                    handleError(error, callback);
                }
            );
        }

        // Actualizar información del perfil
        function UpdateProfile(data, callback) {
            return $http.post(
                    apiUrl + '/users/profile',
                    {
                        biography: data.biography,
                        occupation: data.occupation
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
