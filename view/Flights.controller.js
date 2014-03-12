jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("view.Flights", {

	onInit : function() {

	},

	fnGroupSupplier : function (oContext) {
      var sAirlineId    = oContext.getProperty("AirlineId");
      var sConnectionNo = oContext.getProperty("ConnectionNo");
      return {
        key:  "Empresa: " + sAirlineId + " Vôo: " + sConnectionNo,
        text: "Empresa: " + sAirlineId + " Vôo: " + sConnectionNo
      };
    },
	
	itemPress : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "FlightDetail",
			data : {
				context : evt.getSource().getBindingContext()
			}
		});
	}	
});