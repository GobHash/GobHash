(function() {
	'use strict';

	angular.module('Widgets')
	.config(config);


	function config($stateProvider, $urlRouterProvider) {
		var registerStatefulModal = function (stateName, controller, controllerAs, template, parent, params, size, resolves) {
            params = params || {};
            resolves = resolves || angular.extend({}, resolves, { stateParams: ["$stateParams", function ($stateParams) { return $stateParams; }] });
            size = size || "md";
            var modal;
            $stateProvider.state(stateName, {
                modal: true,
                parent: parent || "home",
                params: params,
                onEnter: [
                "$stateParams",
                "$uibModal",
                function ($stateParams, $uibModal) {
                    //log('stateful modal enter', stateName, resolves);
                    /$previousState.memo('modalInvoker');/
                    modal = $uibModal.open({
                        animation: true,
						controller: controller,
						controllerAs: controllerAs,
                        templateUrl: template,
                        backdrop: "static",
                        keyboard: false,
                        size: size,
                        resolve: resolves
                    });
                    // $scope.cancel functions should use modal.dismiss('cancel') or modal.dismiss('success') etc. to close the modal
                    // so we can restore the previous state
                    modal.result.then(
                        // modal exited via state change 
                        function (result) {
                            //log('modal close', result); 
                        },
                        // modal exited via cancel or escape
                        function (reason) {
                            //log('modal dismiss', reason);
                        });
                }
                ],
                onExit: function () {
                    if (modal) {
                        modal.close();
                    }
                }
            });
        }


		var WidgetState = {
			name: 'createWidget',
			url: '/createWidget',
			component: 'widget'
		}

		$stateProvider.state(WidgetState);

		registerStatefulModal(
			'widgetIndex',
			'CreateWidgetController',
			'vmWidgetIndex',
			'js/WidgetModule/views/widgetIndex.html',
			'add_post',
			{}
			);
        registerStatefulModal(
			'widgetEntity',//Nombre del estado
			'EntityWidgetController',//Controlador
			'vmWidgetData',
			'js/WidgetModule/views/widgetData.html',//Template
			'widgetIndex',//Papa
			{}
			);
        registerStatefulModal(
			'widgetFilter',//Nombre del estado
			'FilterWidgetController',//Controller
			'vmWidgetFilter',
			'js/WidgetModule/views/widgetFilter.html', //Template
			'widgetEntity',//Papa
			{}
			);
        registerStatefulModal(
			'widgetPreview',//Nombre del estado
			'PreviewWidgetController',//Controller
			'vmWidgetPreview',
			'js/WidgetModule/views/widgetPreview.html', //Template
			'widgetFilter',//Papa
			{}
			);

        
	}
})();
