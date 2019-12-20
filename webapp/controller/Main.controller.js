/* global salte:true */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"basecamp_check-ins/libs/SlateAuth"
], function (Controller, slateAuthJs, oauth) {
	"use strict";

	return Controller.extend("basecamp_check-ins.controller.Main", {

		onInit: function () {
			this.list = this.getView().byId("listId");
			this.count = 1;
			this.token = 'BAhbB0kiAbB7ImNsaWVudF9pZCI6IjQ3MzExOTA2OTg4NDY3MDA1MTQ5YWRlNWJhYWY3YzEzMjM5OWZiNzQiLCJleHBpcmVzX2F0IjoiMjAyMC0wMS0wM1QxMjowMzozNloiLCJ1c2VyX2lkcyI6WzM5NzMyMTI4XSwidmVyc2lvbiI6MSwiYXBpX2RlYWRib2x0IjoiMjM1MzkyYzZlZWNmMzc2YzEzNzdmYjI5OTIwYWY0MjcifQY6BkVUSXU6CVRpbWUNbAAewAF/Qg4JOg1uYW5vX251bWkC5wE6DW5hbm9fZGVuaQY6DXN1Ym1pY3JvIgdIcDoJem9uZUkiCFVUQwY7AEY=--b56654a4e7bb4f6673e5fbff1c9dd2ba36c0608c';
			window.This = this;
			// this.token = "";
			this.refreshToken = "";

			var complete_url = window.location.href;

			var pieces = complete_url.split("?");
			if (pieces[1]) {


				var params = pieces[1].split("&");

				var aTemp = params.filter(function (param) {
					return param.split("=")[0] === "code" ? true : false;
				});

				// it means we got the remporary code from basecamp
				if (aTemp.length !== 0) {
					// if(window.localStorage.getIte)
					var sCode = aTemp[0].split("=")[1];
					var tokenUrl =
						"https://launchpad.37signals.com/authorization/token?type=web_server&client_id=47311906988467005149ade5baaf7c132399fb74&redirect_uri=http://127.0.0.1:5500/webapp/&client_secret=291202cc6b77e1f8134f9a9ed3a9f3b8820e253f&code=" +
						sCode;
					fetch(tokenUrl, {
						method: 'POST'
					}).then(function (response) {
						return response.json()
					}).then(function (json) {
						this.token = json.access_token;
						this.refreshToken = json.refresh_token
					}.bind(this));
				}
			}
			this.fetchCheckIns(1);
		},

		onGetCheckIns: function (oEvent) {

			// Do the redirect
			window.location.href =
				"https://launchpad.37signals.com/authorization/new?type=web_server&client_id=47311906988467005149ade5baaf7c132399fb74&redirect_uri=http://127.0.0.1:5500/webapp/";

		},

		// initializeCheckInsModel: function() {
		// 	var json = this.fetchCheckIns(1);
		// 	var checkinsModel = new sap.ui.model.json.JSONModel(json);
		// 	this.getView().setModel(checkinsModel, "checkinsModel");
		// },

		fetchCheckIns: async function (page=1) {
			this.list.setBusy(true);
			var headers = new Headers();

			// headers.append('Content-Type', 'application/json');
			// headers.append('Accept', 'application/json');
			headers.append('Authorization', 'Bearer ' + this.token);
			// headers.append('Origin','http://localhost:3000');

			var url = "https://3.basecampapi.com/4232356/buckets/12358716/questions/2098378696/answers.json?page=" + page;
			// "https://3.basecamp.com/4232356/buckets/12358716/questions/2098378696/answers.json"
			// var url = "https://3.basecamp.com/4232356/projects.json";
			// var url = "https://services.odata.org/V2/Northwind/Northwind.svc/Customers?$format=json";
			try {
				var response = await fetch(url, {
					// mode: 'no-cors',
					headers: headers
				});
				var json = await response.json();
			} catch (err) {
				console.log(err);
			}
			// var json = {"answers": array};
			var checkinsModel = new sap.ui.model.json.JSONModel(json);
			this.getView().setModel(checkinsModel, "checkinsModel");
			this.list.setBusy(false);
		},

		filterList: function (oEvent) {
			var list = this.getView().byId("listId");
			list.getBinding("items").filter([
				new sap.ui.model.Filter({
					path: "creator/name",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: 'Rishabh Gour'
				})
			]);

		},

		next: function(oEvent){
			this.fetchCheckIns(++this.count);
		},
		previous: function(oEvent){
			this.fetchCheckIns(--this.count);
		}
	});
});