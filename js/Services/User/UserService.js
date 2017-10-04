(function () {
    'use strict';

    angular
        .module('gobhash')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.ResetPassword = ResetPassword;
        service.SendResetPassword = SendResetPassword;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function ResetPassword(username, email) {
            return $http.post('https://api.gobhash.com/v1/auth/reset', { username: username, email: email })
                .then(
                    handleSuccess,
                    handleError('Error recuperando contraseña')
                );
        }

        function SendResetPassword(token, password) {
            return $http.post('https://api.gobhash.com/v1/users/password/change', { token: token, password: password })
                .then(
                    handleSuccess,
                    handleError('Error enviando nueva contraseña')
                );
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
