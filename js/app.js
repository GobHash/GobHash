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
            // Feed: Aqui se ven todos los posts
            .state('index', {
                url: '/',
                controller: 'IndexController',
                controllerAs: 'vm',
                templateUrl: 'html/Home/indexGobhash.html'
            })

            // Auth: Este contiene la vista del Welcome y heredan las vistas de registro,
            // inicio de sesión, recuperar contraseña
            .state('auth', {
                url: '/auth',
                controller: 'AuthController',
                controllerAs: 'vm',
                templateUrl: 'html/Home/indexAuth.html'
            })

            // Login: Estado con el formulario para inicio de sesión
            .state('login', {
                parent: 'auth',
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: 'html/User/login.html'
            })

            // Register: Estado con el formulario para registro de usuario
            .state('register', {
                parent: 'auth',
                url: '/register',
                controller: 'RegisterController',
                controllerAs: 'vm',
                templateUrl: 'html/User/register.html'
            })

            // Recover: Estado que solicita el reinicio (reset) de contraseña
            .state('recover', {
                parent: 'auth',
                url: '/recover',
                controller: 'RecoverController',
                controllerAs: 'vm',
                templateUrl: 'html/User/recover.html'
            })

            // SendRecover: Estado que confirma la nueva contraseña y la envía
            .state('send_recover', {
                parent: 'auth',
                url: '/recover/{token}',
                controller: 'RecoverPasswordController',
                controllerAs: 'vm',
                templateUrl: 'html/User/recover_password.html'
            })

            // Profile: Estado que contiene la información del usuario, de aquí heredan
            // información de perfil y nueva contraseña
            .state('profile', {
                parent: 'index',
                url: 'user/profile',
                controller: 'ProfileController',
                controllerAs: 'vm',
                templateUrl: 'html/User/profile.html'
            })

            .state('show_profile', {
                parent: 'index',
                url: 'user/profile/{userId}',
                controller: 'ShowProfileController',
                controllerAs: 'vm',
                templateUrl: 'html/User/Profile/show_profile.html'
            })

            .state('feed', {
                parent: 'index',
                url: 'feed',
                controller: 'FeedController',
                controllerAs: 'vm',
                templateUrl: 'html/Feed/feed.html'
            })

            .state('my_feed', {
                parent: 'index',
                url: 'my/feed',
                controller: 'MyFeedController',
                controllerAs: 'vm',
                templateUrl: 'html/Feed/feed.html'
            })

            .state('show_post', {
                parent: 'index',
                url: 'feed/post/{postId}',
                controller: 'ShowPostController',
                controllerAs: 'vm',
                templateUrl: 'html/Feed/Post/single.html'
            })

            .state('add_post', {
                parent: 'index',
                url: 'feed/post',
                controller: 'CreatePostController',
                controllerAs: 'vm',
                templateUrl: 'html/Post/create.html'
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
            var restrictedPage = $.inArray($location.path(), ['/auth/login', '/auth/register', '/auth/recover']) === -1;
            var tokenRegex = /^\/auth\/recover\/[a-z0-9]+$/;

            if ($location.path().match(tokenRegex)) {
                restrictedPage = false;
            }

            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/auth/login');
            }
        });
    }

})();
