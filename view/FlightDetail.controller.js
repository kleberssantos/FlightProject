jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("util.Formatter");

sap.ui.controller("view.FlightDetail", {

	onInit : function() {
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},

	onBeforeShow : function(evt) {
		if (evt.data.context) {
			this.getView().setBindingContext(evt.data.context);
		}
	},

	bookingsButtonPress: function(evt){
		// Bookings 
		sap.ui.getCore().getModel().read("/Bookings", this.getView().getBindingContext(),null, false,this.fnSuccessRead,this.fnErrorRead);

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "Bookings",
			data : {
				context : this.getView().getBindingContext()
			}
		});		
	},	

	fnSuccessRead : function(oData, response){
		if( !sap.ui.getCore().getModel("bookingModel") ){
			this.oJsonModel = new sap.ui.model.json.JSONModel();
			this.oJsonModel.setData(oData);
			sap.ui.getCore().setModel(this.oJsonModel, "bookingModel");
		}else{
			sap.ui.getCore().getModel("bookingModel").setData(oData);
		}

	},

	fnErrorRead : function(oError){

	},	

	navButtonPress : function(evt) {
		var oModel = sap.ui.getCore().getModel();
		var oContext = this.getView().getBindingContext();
		var oValue = oModel.getProperty("AirlineId",oContext);		
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}	
});