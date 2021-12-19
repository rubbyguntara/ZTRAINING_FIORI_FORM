sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"xxxxxxZTRAINING_RUBBY_FORM/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageToast, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("xxxxxxZTRAINING_RUBBY_FORM.controller.Form", {

		// set the formatter
		formatter: formatter,

		onInit: function() {

		},
		onBeforeRendering: function() {
			// MessageToast.show("onBeforeRendering");
		},
		onAfterRendering: function() {
			var vDate = this.getView().byId("idDatePicker");
			var today = new Date();
			var minDate = new Date();
			var maxDate = new Date();

			//set default value
			this.getView().byId("idInputManual").setValue("Rubby");
			this.getView().byId("idInputManual").setEnabled(false);

			this.getView().byId("idCheckBox").setSelected(true);
			vDate.setDateValue(today);

			// set min and max date datepicker
			minDate.setDate(today.getDate() - 7);
			vDate.setMaxDate(today);
			vDate.setMinDate(minDate);

			//disable manual input datepicker
			vDate.addDelegate({
				onAfterRendering: function() {
					vDate.$().find("input").attr("Disabled", true).css("color", "red");
				}
			}, vDate);
		},
		onSubmit: function() {
			var valueDate = this.getView().byId("idDatePicker").getDateValue();
			var valueCombo = this.getView().byId("idComboBox").getSelectedKey();
			var valueSwitch = this.getView().byId("idSwitch").getState();
			var valueCheckbox = this.getView().byId("idCheckBox").getSelected(true);
			var valueRadio = this.getView().byId("idRadioGrp1").getSelectedButton().getText();

			console.log(valueDate);
			console.log(valueCombo);
			console.log(valueSwitch);
			console.log(valueCheckbox);
			console.log(valueRadio);

		},
		onLiveChangeTextArea: function() {
			var a = this.getView().byId("idTextArea").getValue();
			var b = a.length;

			if (b === 0) {
				this.getView().byId("idTextArea").setValueState("Error");
			} else {
				this.getView().byId("idTextArea").setValueState("None");
			}

			if (b >= 10) {
				this.getView().byId("idTextArea").setShowExceededText(false);
				this.getView().byId("idTextArea").setValueState("Success");
			} else {
				this.getView().byId("idTextArea").setShowExceededText(true);
			}
		},
		onSelectionFinish: function(oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			var text = "";

			for (var i = 0; i < selectedItems.length; i++) {
				text += "'" + selectedItems[i].getKey() + "'";
				if (i != selectedItems.length - 1) {
					text += ",";
				}
			}

			console.log(text);
		},
		onPressSearchHelp: function() {
			var dialogSearchHelp = this._getDialogSearchHelp();

			dialogSearchHelp.open();
		},
		_getDialogSearchHelp: function() {
			if (this.dialogSearchHelp) {
				return this.dialogSearchHelp;
			}

			this.dialogSearchHelp = sap.ui.xmlfragment("xxxxxxZTRAINING_RUBBY_FORM.fragment.additional", this);
			this.getView().addDependent(this.dialogSearchHelp);

			//debug untuk cari id button cancel
			console.log(sap.ui.getCore().byId("idTableAdditional"));
			sap.ui.getCore().byId("idTableAdditional-cancel").setType("Reject");
			return this.dialogSearchHelp;
		},
		onSelectedSearchHelp: function(oEvent) {
			var selectedItem = oEvent.getParameter("selectedItems");
			console.log(selectedItem[0].getTitle());
			this.getView().byId("idSearchHelp").setValue(selectedItem[0].getTitle());
		},
		onSearchCategory: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("CategoryName", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
		}

	});
});