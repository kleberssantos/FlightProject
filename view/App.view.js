sap.ui.jsview("view.App", {

	getControllerName: function () {
		return "view.App";
	},

	createContent : function (oController) {
		
		this.setDisplayBlock(true);
		
		this.app = new sap.m.App({
			homeIcon : {
				'phone' : 'img/57_iPhone_Desktop_Launch.png',
				'phone@2' : 'img/114_iPhone-Retina_Web_Clip.png',
				'tablet' : 'img/72_iPad_Desktop_Launch.png',
				'tablet@2' : 'img/144_iPad_Retina_Web_Clip.png',
				'favicon' : 'img/favicon.ico',
				'precomposed': false
			}
		});
		
		this.app.addPage(sap.ui.jsview("Flights", "view.Flights"));
		
		return this.app;
	}
});
