/* global salte:true */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"basecamp_check-ins/libs/SlateAuth"
], function (Controller, slateAuthJs) {
	"use strict";

	return Controller.extend("basecamp_check-ins.controller.Main", {

		onInit: function () {
			this.fetchCheckIns();
		},

		onGetCheckIns: function (oEvent) {

			var client = new jso.JSO({
				providerID: "basecamp",
				client_id: "47311906988467005149ade5baaf7c132399fb74",
				redirect_uri: "https://basecampcheckins-ad74c0790.dispatcher.hana.ondemand.com/index.html?hc_reset", // The URL where you is redirected back, and where you perform run the callback() function.
				authorization: "https://launchpad.37signals.com/authorization/new",
				// scopes: {
				// 	request: ["https://www.googleapis.com/auth/userinfo.profile"]
				// }
				// response_type: 'code',
				type: 'web_server',
				client_secret: "291202cc6b77e1f8134f9a9ed3a9f3b8820e253f",
				token: "https://launchpad.37signals.com/authorization/token",
			});
			client.callback();
			client.getToken()
				.then((token) => {
					console.log("I got the token: ", token)
				})

			// var checkinsModel = this.getView().getModel("checkinsModel");
			// var oBinding = this.getView().byId("listId").getBinding("items");
			// oBinding.filter([new sap.ui.model.Filter({
			// 		path: "creator/name", // string
			// 		operator: FilterOperator.EQ, // sap.ui.model.FilterOperator
			// 		value1: "Rishabh Gour"
			// 	}
			// )]);
			// const auth = new salte.SalteAuth({
			// 				  providerUrl: 'https://launchpad.37signals.com/authorization/new', 
			// 				  responseType: 'id_token',
			// 				  redirectUrl: location.origin,
			// 				  clientId: '47311906988467005149ade5baaf7c132399fb74',
			// 				  scope: 'openid',

			// 				  routes: [
			// 				    'http://localhost:8080/account'
			// 				  ],

			// 				  endpoints: [
			// 				    'https://launchpad.37signals.com/authorization.json'
			// 				  ],

			// 				  provider: 'auth0'
			// 			});

			// // Display an iframe to the user that allows them to login
			// auth.loginWithIframe();
		},

		// initializeCheckInsModel: function() {
		// 	var json = this.fetchCheckIns(1);
		// 	var checkinsModel = new sap.ui.model.json.JSONModel(json);
		// 	this.getView().setModel(checkinsModel, "checkinsModel");
		// },

		fetchCheckIns: async function (page) {
			var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + "Bearer BAhbB0kiAbB7ImNsaWVudF9pZCI6IjQ3MzExOTA2OTg4NDY3MDA1MTQ5YWRlNWJhYWY3YzEzMjM5OWZiNzQiLCJleHBpcmVzX2F0IjoiMjAxOS0xMS0wMVQxNzo0NTozOFoiLCJ1c2VyX2lkcyI6WzM5NzMyMTI4XSwidmVyc2lvbiI6MSwiYXBpX2RlYWRib2x0IjoiMjM1MzkyYzZlZWNmMzc2YzEzNzdmYjI5OTIwYWY0MjcifQY6BkVUSXU6CVRpbWUNMegdwKCVZbYJOg1uYW5vX251bWkC7wE6DW5hbm9fZGVuaQY6DXN1Ym1pY3JvIgdJUDoJem9uZUkiCFVUQwY7AEY=--d25727d429466a8b821221f045eb42e4e389888c");
    // headers.append('Origin','http://localhost:3000');
			
			var url = "https://3.basecamp.com/4232356/buckets/12358716/questions/2098378696/answers.json";
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
		}
	});
});