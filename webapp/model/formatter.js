sap.ui.define([], function() {
	"use strict";
	return {
		categoryIcon: function(sCategoryId) {
			var nCategory = Number(sCategoryId); 
			if (nCategory % 2 == 0) {
				return "sap-icon://tags";
			} else {
				return "sap-icon://blank-tag-2";
			}
		}
	};
});