jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");

sap.ui.app.Application.extend("Application", {
	
	init : function() {
		// Modelo Global da Aplicação 
		var model = new sap.ui.model.odata.ODataModel("http://54.83.17.19:50000/sap/opu/odata/sap/FLIGHTINFORMATION",true,"DEVELOPER","Fbfb0047");
		sap.ui.getCore().setModel(model);
	},
	
	main : function() {
		var root = this.getRoot();		
		sap.ui.jsview("app", "view.App").placeAt(root);
	}
});