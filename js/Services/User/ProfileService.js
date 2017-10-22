(function () {
    'use strict';

    angular
        .module('gobhash')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$http', '$rootScope', 'Upload'];
    function ProfileService($http, $rootScope, Upload) {
        // var apiUrl = 'https://api.gobhash.com/v1';
        var apiUrl = 'https://api-dev.gobhash.com/v1';

        var service = {};

        service.GetProfile = GetProfile;
        service.GetProfileById = GetProfileById;
        service.FollowUser = FollowUser;
        service.UpdateProfile = UpdateProfile;
        service.GetProfilePicture = GetProfilePicture;
        service.GetProfileStats = GetProfileStats;
        service.UpdateProfilePicture = UpdateProfilePicture;
        service.UpdateProfilePassword = UpdateProfilePassword;

        return service;

        function FollowUser(username, callback) {
            return $http.post(
                    apiUrl + '/users/follow',
                    {
                        username: username
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

        // Obtener perfil del usuario por id
        function GetProfileById(id, callback) {
            return $http.get(apiUrl + '/users/' + id)
                .then(function (response) {
                    handleSuccess(response, callback);
                })
                .catch(function (error) {
                    handleError(error, callback);
                }
            );
        }

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
            return $http.patch(
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

        // Actualizar información del perfil
        function UpdateProfilePicture(file, callback) {
            file.upload = Upload.upload({
                url: apiUrl + '/users/picture',
                data: {
                    profile: file
                }
            });

            return file.upload.then(function (response) {
                handleSuccess(response, callback);
            })
            .catch(function (error) {
                handleError(error, callback);
            });
        }

        // Actualizar la contraseña
        function UpdateProfilePassword(data, callback) {
            return $http.patch(
                    apiUrl + '/users/password/update',
                    {
                      currentPassword: data.currentPassword,
                      password: data.password
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
