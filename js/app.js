(function () {
    'use strict';

    angular
        .module('gobhash', [])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/auth/login");

        $stateProvider
            .state('index', {
                url: '/',
                controller: 'IndexController',
                controllerAs: 'vm',
                templateUrl: 'html/Home/indexGobhash.html'
            })

            .state('auth', {
                url: '/auth',
                controller: 'AuthController',
                controllerAs: 'vm',
                templateUrl: 'html/Home/indexAuth.html'
            })

            .state('home', {
                parent: 'index',
                url: '/home',
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: 'html/Home/home.html'
            })

            .state('login', {
                parent: 'auth',
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: 'html/User/login.html'
            })

            .state('register', {
                parent: 'auth',
                url: '/register',
                controller: 'RegisterController',
                controllerAs: 'vm',
                templateUrl: 'html/User/register.html'
            })

            .state('recover', {
                parent: 'auth',
                url: '/recover',
                controller: 'RecoverController',
                controllerAs: 'vm',
                templateUrl: 'html/User/recover_password.html'
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/recover']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/auth/login');
            }
        });
    }

})();
