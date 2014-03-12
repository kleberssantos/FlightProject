jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("util.Formatter");

sap.ui.controller("view.Bookings", {

	onInit : function() {
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},

	fnGroupSupplier : function (oContext) {
      var sFirstLetter = oContext.getProperty("CustomerName");
      return {
        key:  sFirstLetter.substring(0,1),
        text: sFirstLetter.substring(0,1)
      };
    },

	onBeforeShow : function(evt) {
		if (evt.data.context) {
			// Dados de Transferência
			var oData     = {
				AirlineId    : evt.data.context.getProperty("AirlineId"   ),
				ConnectionNo : evt.data.context.getProperty("ConnectionNo"),
				FlightDate   : evt.data.context.getProperty("FlightDate")
			}

			if( !sap.ui.getCore().getModel("flightModel") ){
				this.oFlightModel = new sap.ui.model.json.JSONModel();
				this.oFlightModel.setData(oData);				
				sap.ui.getCore().setModel(this.oFlightModel, "flightModel");
			}else{
				sap.ui.getCore().getModel("flightModel").setData(oData);
			}	
					
			this.getView().setBindingContext(evt.data.context);
		}
	},

	createBooking : function(evt){
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "BookingCreate"
		});
	},

	itemPress : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "BookingDetail",
			data : {
				context : evt.getSource().getBindingContext()
			}
		});
	},

	navButtonPress : function(evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}	
});