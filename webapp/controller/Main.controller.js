sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("basecamp_check-ins.controller.Main", {

		onInit: function() {
			this.fetchCheckIns();
		},

		onGetCheckIns: function(oEvent) {
			var checkinsModel = this.getView().getModel("checkinsModel");
			var oBinding = this.getView().byId("listId").getBinding("items");
			oBinding.filter([new sap.ui.model.Filter({
					path: "creator/name", // string
					operator: FilterOperator.EQ, // sap.ui.model.FilterOperator
					value1: "Rishabh Gour"
				}
			)]);
		},

		// initializeCheckInsModel: function() {
		// 	var json = this.fetchCheckIns(1);
		// 	var checkinsModel = new sap.ui.model.json.JSONModel(json);
		// 	this.getView().setModel(checkinsModel, "checkinsModel");
		// },

		fetchCheckIns: async function(page) {
			var url = "https://3.basecamp.com/4232356/buckets/12358716/questions/2098378696/answers.json";
			// var url = "https://services.odata.org/V2/Northwind/Northwind.svc/Customers?$format=json";
			try {
				var response = await fetch(url);
				var json = await response.json();
			} catch (err) {
				console.log(err);
			}
			// var json = {"answers": array};
			var checkinsModel = new sap.ui.model.json.JSONModel(json);
			this.getView().setModel(checkinsModel, "checkinsModel");
		}
	});
});