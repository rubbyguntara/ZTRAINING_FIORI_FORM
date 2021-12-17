sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("xxxxxxZTRAINING_RUBBY_FORM.controller.Form", {
		onInit: function() {

		},
		onBeforeRendering: function() {
			MessageToast.show("onBeforeRendering");
		},
		onAfterRendering: function() {
			var today = new Date();
			var minDate = new Date();
			var maxDate = new Date();

			this.getView().byId("idCheckBox").setSelected(true);
			this.getView().byId("idDatePicker").setDateValue(today);

			// set min and max date datepicker
			minDate.setDate(today.getDate() - 7);
			this.getView().byId("idDatePicker").setMaxDate(today);
			this.getView().byId("idDatePicker").setMinDate(minDate);
		}
	});
});