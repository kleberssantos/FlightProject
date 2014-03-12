/*
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.TablePersoDialog");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.m.InputListItem");jQuery.sap.require("sap.m.Switch");jQuery.sap.require("sap.m.SwitchType");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.Button");sap.ui.base.ManagedObject.extend("sap.m.TablePersoDialog",{constructor:function(i,s){sap.ui.base.ManagedObject.apply(this,arguments)},metadata:{properties:{"contentWidth":{type:"sap.ui.core/CSSSize"},"persoMap":{type:"object"}},associations:{"persoDialogFor":sap.m.Table},events:{confirm:{},cancel:{}},library:"sap.m"}});
sap.m.TablePersoDialog.prototype.init=function(){var t=this;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oP13nModel=new sap.ui.model.json.JSONModel();this._columnItemTemplate=new sap.m.InputListItem({label:"{Personalization>text}",content:new sap.m.Switch({state:"{Personalization>visible}",customTextOn:" ",customTextOff:" "})}).addStyleClass("sapMPersoDialog");this._oDialog=new sap.m.Dialog({title:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),stretch:jQuery.device.is.phone,content:new sap.m.List({includeItemInSelection:true,mode:sap.m.ListMode.SingleSelectMaster}),subHeader:new sap.m.Bar({contentLeft:[new sap.m.Button({icon:"sap-icon://arrow-top",press:function(e){t._moveItem(-1)}}),new sap.m.Button({icon:"sap-icon://arrow-bottom",press:function(e){t._moveItem(1)}})],contentRight:new sap.m.Button({icon:"sap-icon://refresh",press:function(){t._resetAll()}})}),leftButton:new sap.m.Button({text:this._oRb.getText("PERSODIALOG_OK"),press:function(){this.getParent().close();t.fireConfirm()}}),rightButton:new sap.m.Button({text:this._oRb.getText("PERSODIALOG_CANCEL"),press:function(){t._readCurrentSettingsFromTable();this.getParent().close();t.fireCancel()}})})};
sap.m.TablePersoDialog.prototype.retrievePersonalizations=function(){return this._oP13nModel.getData()};
sap.m.TablePersoDialog.prototype.open=function(){var l=this._oDialog.getContent()[0];this._readCurrentSettingsFromTable();this._oInitialState=JSON.stringify(this._oP13nModel.getData().aColumns);this._oDialog.setModel(this._oP13nModel,"Personalization");l.bindAggregation("items","Personalization>/aColumns",this._columnItemTemplate);this._oDialog.open()};
sap.m.TablePersoDialog.prototype.getContentWidth=function(){return this._oDialog.getContentWidth()};
sap.m.TablePersoDialog.prototype.setContentWidth=function(w){this._oDialog.setContentWidth(w);return this};
sap.m.TablePersoDialog.prototype._resetAll=function(){var d=this._oP13nModel.getData();d.aColumns=JSON.parse(this._oInitialState);this._oP13nModel.setData(d)};
sap.m.TablePersoDialog.prototype._tableColumnInfo=function(t){if(!!this.getPersoMap()){var C=t.getColumns();var d=[];for(var c=0,e=C.length;c<e;c++){var o=C[c];d.push({text:o.getHeader().getText(),order:o.getOrder(),visible:o.getVisible(),id:this.getPersoMap()[o]})}d.sort(function(a,b){return a.order-b.order});return d}return null};
sap.m.TablePersoDialog.prototype._moveItem=function(d){var l=this._oDialog.getContent()[0];var m=this._oP13nModel;var s=l.getSelectedItem();if(!s)return;var a=m.getData();var i=s.getBindingContext("Personalization").getPath().split("/").pop()*1;var b=i+d;if(b<0||b>=a.aColumns.length)return;var t=a.aColumns[b];a.aColumns[b]=a.aColumns[i];a.aColumns[b].order=b;a.aColumns[i]=t;a.aColumns[i].order=i;l.removeSelections(true);this._swapListItemContent(l,i,b);l.setSelectedItem(l.getItems()[b],true)};
sap.m.TablePersoDialog.prototype._swapListItemContent=function(l,i,s){var L=l.getItems();var a="#"+L[i].getId()+" label",b="#"+L[s].getId()+" label";var c=jQuery(b).html();var S="#"+L[i].getContent()[0].getId();var d="#"+L[s].getContent()[0].getId();var e=jQuery(d).html();jQuery(b).html(jQuery(a).html());jQuery(a).html(c);jQuery(d).html(jQuery(S).html());jQuery(S).html(e)};
sap.m.TablePersoDialog.prototype._readCurrentSettingsFromTable=function(){var t=sap.ui.getCore().byId(this.getPersoDialogFor());this._oP13nModel.setData({aColumns:this._tableColumnInfo(t)})};
