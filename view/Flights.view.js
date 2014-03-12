sap.ui.jsview("view.Flights", {

	getControllerName: function () {
		return "view.Flights";
	},

	createContent : function (oController) {

        this.page = new sap.m.Page({
                title : "Vôos Disponíveis",
                content : [],
        });
            
        this.growingList = new sap.m.List({
             items : {
              path     : "/Flights",
              sorter   : new sap.ui.model.Sorter("AirlineId", false, oController.fnGroupSupplier),
              template : new sap.m.StandardListItem({
                     title: "{Title}",
                     description: "Linha Aérea {AirlineId} - Conexão {ConnectionNo} - Preço {Price}",
                     icon: sap.ui.core.IconPool.getIconURI("flight"),
                     iconDensityAware: false,
                     iconInset: false,
                     type: "Navigation",
                     press : [ oController.itemPress, oController ]
              })
             }
        });
        
        this.page.addContent(this.growingList);
        return this.page;
    }
});
