(function(){
	'use strict';

	angular
	.module('Widgets')
	.factory('EntitiesService', EntitiesService);

	EntitiesService.$inject = ['$http', 'EntitiesRepository', 'OperationRepository'];

	function EntitiesService($http, EntitiesRepository, OperationRepository){
		var definition = {
			name : null,
			widgetType : null,
			entity : null,
			filters : null,
			dateFilters: null,
			baseColumn : null,
			category:{
				operation:{},
				column:{}
			}
		}
		var valueOperation = [
			{
				id: 1,
				operation: 'Sumar'
			},
			{
				id: 2,
				operation: 'Contar'
			},
			{
				id: 3,
				operation: 'Sacar el Minimo' 
			},
			{
				id: 4,
				operation: 'Sacar el Maximo'
			}
		]
		var entities = [
			{id: 1, name: 'Comprador'},
			{id: 2, name: 'Adjudicacion'},
			{id: 3, name: 'Proveedor'}
		];

		var widgetsType = [
			{id: 1, name: 'Gráfico de Pie'},
			{id: 2, name: 'Gráfico de Barras'},
			{id: 3, name: 'Gráfico de Líneas'}
		];
		var columns = [];
		var widgetQueryData = [];
		var widgetData = [];
		var hash = {
			"definition":null,
			"data":null
		};
		/*
		var entityColumns = [
	
			{id:1, name:"Nombre del Comprador", type: "string", entity:"Comprador"},
			{id:2, name:"Tipo de Comprador", type: "string", entity:"Comprador"},
			{id:3, name:"Origen de fondos", type: "string", entity:"Comprador"},
			{id:4, name:"Nit del Comprador", type: "string", entity:"Comprador"},
			{
				id: 5,
				name: "Nombre del Proveedor",
				type: "string",
				entity: "Proveedor"
			},
			{
				id: 6, 
				name:"Tipo de Proveedor",
				type: "string",
				entity: "Proveedor"
			},
			{
				id: 7, 
				name: "Municipio",
				type: "string",
				entity: "Proveedor"
			},
			{
				id: 8, 
				name: "Nit de Proveedor",
				type: "string",
				entity: "Proveedor"
			},
			{id:9, name:"Estatus", type: "string", entity: "Adjudicacion"},
			{id:10, name:"Modalidad", type: "string", entity: "Adjudicacion" },
			{id:11, name:"Categoria", type: "string", entity: "Adjudicacion"},
			{id:12, name:"Monto", type: "int", entity: "Adjudicacion"},
			{id:13, name: "Año de Adjudicacion", type: "date", entity: "Adjudicacion"},
			{id:14, name: "Mes de Adjudicacion", type: "date", entity: "Adjudicacion"}

			
		];
		*/
		var service = {
			getEntities: getEntities,
			getWidgets : getWidgets,
			getColumnsByEntity : getColumnsByEntity,
			entities : entities,
			widgetsType : widgetsType,
			definition : definition,
			getDefinition : getDefinition,
			setBasicDefinition : setBasicDefinition,
			setEntity : setEntity,
			setBaseColumn : setBaseColumn,
			valueOperation : valueOperation,
			getValueOperation : getValueOperation,
			getAllColumns : getAllColumns,
			setCategory : setCategory,
			setFilters: setFilters,
			setDateFilters: setDateFilters,
			getOperationsByType : getOperationsByType,
			setDefinition : setDefinition,
			columns : columns,
			getColumnsForFilters : getColumnsForFilters,
			getOperationsByColumnType : getOperationsByColumnType,
			getColumnsForDateFilters : getColumnsForDateFilters,
			getPreviewData : getPreviewData,
			widgetData : widgetData,
			setData : setData,
			getData : getData,
			hash : hash,
			setHash : setHash,
			getHash : getHash,
			widgetQueryData : widgetQueryData,
			reset : reset
		};
		return service;


		function getEntities() {
			return EntitiesRepository.getEntities().then(function(data){
				service.entities = data;
				var entities = [];
				data.forEach(function(item, index){
					if(item.visible){
						entities.push(item);
					}
				});
				return entities;
			}).catch(function(err){
				console.log(err);
			})
			
		}

		function getWidgets() {
			return service.widgetsType;
		}

		function getColumnsByEntity(entity) {
			
			/*var columns = [];
			for(var i=0; i<service.entityColumns.length; i++){
				var element = service.entityColumns[i];
				if(element.entity == entity){
					columns.push(element);
				}
				
			}*/

			return EntitiesRepository.getColumnsByEntity(entity).then(function(data){
				console.log(data)
				return data;
			}).catch(function(err){
				console.log(err);
			})
		}

		function getDefinition(){
			return service.definition;
		}

		function setBasicDefinition(definition){
			service.definition.name = definition.name;
			service.definition.widgetType = definition.widgetType;
		}

		function setEntity(entity){
			service.definition.entity = entity;
		}

		function setBaseColumn(column){
			service.definition.baseColumn = column;
		}

		function getValueOperation(){
			return service.valueOperation;
		}

		function getAllColumns(){
			return EntitiesRepository.getColumns().then(function(data){
				service.columns = data;
				return data;
			}).catch(function(err){
				console.log(err);
			})
		}

		function setCategory(operation, column){
			service.definition.category.operation = operation;
			service.definition.category.column = column;
		}

		function setFilters(filter){
			service.definition.filters = filter;
		}

		function setDateFilters(filers){
			service.definition.dateFilters = filers;
		}

		function getOperationsByType (type){
			return OperationRepository.getOperationsByOperationType(type)
				.then(function(data){
					console.log(data);
					return data;
				}).catch(function(err){
					console.log(err);
				});
		}

		function setDefinition(definition){
			vm.definition = definition;
		}

		function getColumnsForFilters(){
			var columns = [];
			service.columns.forEach(function(item, index){
				if(item.second_table != "dim_fecha"){
					columns.push(item);
				}
			});
			return columns;

		}

		function getOperationsByColumnType(operations, type){
			var operationsByType = [];
			operations.forEach(function(item, index){
				if(item.value_type == type){
					operationsByType.push(item);
				}
			});
			return operationsByType;
		}

		function getColumnsForDateFilters(){
			var columns = [];
			service.columns.forEach(function(item, index){
				if(item.second_table == "dim_fecha"){
					columns.push(item);
				}
			});
			return columns;
		}

		function getPreviewData(){
			return EntitiesRepository.getPreviewData(service.definition).then(function(data){
				return data;
			}).catch(function(err){
				return err;
			});
		}

		function setData(data){
			service.widgetQueryData = data;
		}

		function getData(){
			var data = [];
			var key = [];
			var value = [];
			var val = service.widgetQueryData[1].fields[1].name;
			service.widgetQueryData[0].forEach(function(item, index){
				key.push(item.value);
				value.push(item[val]);
			})
			data.push(key, value);
			service.widgetData = data;
			return data;
		}

		function setHash(){
			service.hash.definition = service.definition;
			service.hash.data = service.widgetData;
		}

		function getHash(){
			return service.hash;
		}

		function reset(){
			service.definition = {
				name : null,
				widgetType : null,
				entity : null,
				filters : null,
				dateFilters: null,
				baseColumn : null,
				category:{
					operation:{},
					column:{}
				}
			};
		}

	}
})();