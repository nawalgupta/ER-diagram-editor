(function (angular) {
	'use strict';

	function editorManager() {
		var manager = {};

		var entities = [];
		var relationships = [];

		manager.createEntity = function (name) {
			var entity = new Entity(name);
			entities.push(entity);
			return entity;
		};

		manager.removeEntity = function (entity) {
			var idx = entities.indexOf(entity);
			if (idx === -1) {
				return;
			}
			entities.splice(idx, 1);
		};

		manager.createRelationship = function (name) {
			var relationship = new Relationship(name);
			relationships.push(relationship);
			return relationship;
		};

		manager.removeRelationship = function (relationship) {
			var idx = relationships.indexOf(relationship);
			if (idx === -1) {
				return;
			}
			relationships.splice(idx, 1);
		};

		/**
		 *
		 * @param name String the name of entity/relationship
		 * @return boolean if the name is available
		 */
		manager.isNameAvailable = function (name) {
			var hasDuplicate = false;
			entities.forEach(function (entity) {
				if (name.toLowerCase() === entity.name.toLowerCase()) {
					hasDuplicate = true;
				}
			});
			relationships.forEach(function (relationship) {
				if (name.toLowerCase() === relationship.name.toLowerCase()) {
					hasDuplicate = true;
				}
			});

			return hasDuplicate ? false : true;
		};

		manager.generateSchemaData = function () {
			var data = {
				entities: []
			};
			entities.forEach(function (entity) {
				data.entities.push(entity.summarize());
			});

			return data;
		};

		return manager;
	}


	angular.module('myApp.services').factory('editorManager', editorManager);
})(window.angular);