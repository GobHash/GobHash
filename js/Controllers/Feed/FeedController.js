(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['$scope'];
    function FeedController($scope) {
      let vm = this;
      $scope.UpdateHeader();
    }

})();
