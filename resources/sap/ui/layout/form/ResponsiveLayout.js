/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.layout.form.ResponsiveLayout");jQuery.sap.require("sap.ui.layout.library");jQuery.sap.require("sap.ui.layout.form.FormLayout");sap.ui.layout.form.FormLayout.extend("sap.ui.layout.form.ResponsiveLayout",{metadata:{library:"sap.ui.layout"}});jQuery.sap.require("sap.ui.layout.ResponsiveFlowLayout");jQuery.sap.require("sap.ui.layout.ResponsiveFlowLayoutData");sap.ui.core.Control.extend("sap.ui.layout.form.ResponsiveLayoutPanel",{metadata:{aggregations:{"content":{type:"sap.ui.layout.ResponsiveFlowLayout",multiple:false}},associations:{"container":{type:"sap.ui.layout.form.FormContainer",multiple:false},"layout":{type:"sap.ui.layout.form.ResponsiveLayout",multiple:false},}},getLayoutData:function(){var c=sap.ui.getCore().byId(this.getContainer());var l=sap.ui.getCore().byId(this.getLayout());var L;if(l&&c){L=l.getLayoutDataForElement(c,"sap.ui.layout.ResponsiveFlowLayoutData")}return L},getCustomData:function(){var c=sap.ui.getCore().byId(this.getContainer());if(c){return c.getCustomData()}},refreshExpanded:function(){var c=sap.ui.getCore().byId(this.getContainer());if(c){if(c.getExpanded()){jQuery.sap.byId(this.getId()).removeClass("sapUiRLContainerColl")}else{jQuery.sap.byId(this.getId()).addClass("sapUiRLContainerColl")}}},renderer:function(r,p){var c=sap.ui.getCore().byId(p.getContainer());var l=sap.ui.getCore().byId(p.getLayout());var C=p.getContent();var e=c.getExpandable();var t=c.getTooltip_AsString();r.write("<div");r.writeControlData(p);r.addClass("sapUiRLContainer");if(e&&!c.getExpanded()){r.addClass("sapUiRLContainerColl")}if(t){r.writeAttributeEscaped('title',t)}r.writeClasses();r.write(">");if(c.getTitle()){l.getRenderer().renderTitle(r,c.getTitle(),c._oExpandButton,e,false,c.getId())}if(C){r.write("<div");r.addClass("sapUiRLContainerCont");r.writeClasses();r.write(">");r.renderControl(C);r.write("</div>")}r.write("</div>")}});(function(){sap.ui.layout.form.ResponsiveLayout.prototype.init=function(){this.mContainers={};this._defaultLayoutData=new sap.ui.layout.ResponsiveFlowLayoutData({margin:false})};sap.ui.layout.form.ResponsiveLayout.prototype.exit=function(){var t=this;for(var C in this.mContainers){h(t,C)}if(this._mainRFLayout){this._mainRFLayout.destroy();delete this._mainRFLayout}this._defaultLayoutData.destroy();delete this._defaultLayoutData};sap.ui.layout.form.ResponsiveLayout.prototype.onBeforeRendering=function(E){var F=this.getParent();if(!F||!(F instanceof sap.ui.layout.form.Form)){return}var t=this;_(t,F);k(t,F)};sap.ui.layout.form.ResponsiveLayout.prototype.contentOnAfterRendering=function(F,C){sap.ui.layout.form.FormLayout.prototype.contentOnAfterRendering.apply(this,arguments);if(C.getWidth&&(!C.getWidth()||C.getWidth()=="auto")&&C.getMetadata().getName()!="sap.ui.commons.Image"){C.$().css("width","100%")}};sap.ui.layout.form.ResponsiveLayout.prototype.toggleContainerExpanded=function(C){var E=C.getExpanded();var s=C.getId();if(this.mContainers[s]&&this.mContainers[s][0]){var p=this.mContainers[s][0];p.refreshExpanded()}};sap.ui.layout.form.ResponsiveLayout.prototype.onLayoutDataChange=function(E){var s=E.srcControl;if(s instanceof sap.ui.layout.form.FormContainer){if(this._mainRFLayout){this._mainRFLayout.onLayoutDataChange(E)}}else if(s instanceof sap.ui.layout.form.FormElement){var C=s.getParent().getId();if(this.mContainers[C]&&this.mContainers[C][1]){this.mContainers[C][1].onLayoutDataChange(E)}}else{var p=s.getParent();if(p instanceof sap.ui.layout.form.FormElement){var o=p.getParent();var C=o.getId();var i=p.getId();if(this.mContainers[C]&&this.mContainers[C][2]&&this.mContainers[C][2][i]){this.mContainers[C][2][i][0].onLayoutDataChange(E)}}}};sap.ui.layout.form.ResponsiveLayout.prototype.onsapup=function(E){this.onsapleft(E)};sap.ui.layout.form.ResponsiveLayout.prototype.onsapdown=function(E){this.onsapright(E)};var _=function(L,F){var C=F.getFormContainers();var m=C.length;var v=0;for(var i=0;i<m;i++){var o=C[i];if(o.getVisible()){v++;var s=o.getId();var p=undefined;var r=undefined;if(L.mContainers[s]&&L.mContainers[s][1]){r=L.mContainers[s][1]}else{r=d(L,o,undefined)}var t=o.getTitle();if(t||o.getExpandable()){if(L.mContainers[s]&&L.mContainers[s][0]){p=L.mContainers[s][0]}else{p=a(L,o,r);e(r,true)}}else{if(L.mContainers[s]&&L.mContainers[s][0]){b(L.mContainers[s][0]);e(r,false)}}var n=c(L,o,r);L.mContainers[s]=[p,r,n]}}var O=l(L.mContainers);if(v<O){for(var s in L.mContainers){var q=false;for(var i=0;i<m;i++){var o=C[i];if(s==o.getId()&&o.getVisible()){q=true;break}}if(!q){h(L,s)}}}};var a=function(L,C,r){var s=C.getId();var p=new sap.ui.layout.form.ResponsiveLayoutPanel(s+"--Panel",{container:C,layout:L,content:r});return p};var b=function(p){p.setContent("");p.setLayout("");p.setContainer("");p.destroy();delete p};var c=function(L,C,o){var s=C.getId();var E=C.getFormElements();var m=E.length;var v=0;var r={};if(L.mContainers[s]&&L.mContainers[s][2]){r=L.mContainers[s][2]}var R;var F;var n=-1;for(var i=0;i<m;i++){var p=E[i];if(p.getVisible()){var q=p.getId();j(L,C,p,r,o,i);if(r[q]){R=r[q][0];n=o.indexOfContent(R)}else{R=d(L,C,p);R.addStyleClass("sapUiRLElement");if(p.getLabel()){R.addStyleClass("sapUiRLElementWithLabel")}r[q]=[R,undefined];n++;o.insertContent(R,n)}var t=p.getFields();if(p.getLabel()&&t.length>1){if(r[q][1]){F=r[q][1]}else{F=d(L,C,p,true);F.addStyleClass("sapUiRLElementFields");r[q][1]=F}f(L,F,t)}else{if(r[q][1]){F=r[q][1];g(F);r[q][1]=undefined}}v++}}var O=l(r);if(v<O){for(var q in r){var u=false;for(var i=0;i<m;i++){var p=E[i];if(q==p.getId()&&p.getVisible()){u=true;break}}if(!u){if(r[q][1]){F=r[q][1];g(F)}R=r[q][0];o.removeContent(R);g(R);delete r[q]}}}return r};var d=function(L,C,E,i){var I;if(E&&!i){I=E.getId()+"--RFLayout"}else if(E&&i){I=E.getId()+"--content--RFLayout"}else if(C){I=C.getId()+"--RFLayout"}else{return}var r=new sap.ui.layout.ResponsiveFlowLayout(I);r.__myParentLayout=L;r.__myParentContainerId=C.getId();if(E){r.__myParentElementId=E.getId();if(!i){r.getContent=function(){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){var m=new Array();var o=E.getLabelControl();var F=E.getFields();if(!o||F.length<=1){var m=F;if(o){m.unshift(o)}}else{var L=this.__myParentLayout;var s=this.__myParentContainerId;var n=E.getId();if(o){m.push(o)}if(L.mContainers[s]&&L.mContainers[s][2]&&L.mContainers[s][2][n]){m.push(L.mContainers[s][2][n][1])}}return m}else{return false}}}else{r.getContent=function(){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){return E.getFields()}else{return false}}}}if((E&&!i)||(!E&&!C.getTitle()&&!C.getExpandable())){e(r,false)}else{r.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({margin:false}))}return r};var e=function(r,o){if(o){if(r.__originalGetLayoutData){r.getLayoutData=r.__originalGetLayoutData;delete r.__originalGetLayoutData}}else if(!r.__originalGetLayoutData){r.__originalGetLayoutData=r.getLayoutData;r.getLayoutData=function(){var L=this.__myParentLayout;var C=sap.ui.getCore().byId(this.__myParentContainerId);var E=sap.ui.getCore().byId(this.__myParentElementId);var i;if(E){i=L.getLayoutDataForElement(E,"sap.ui.layout.ResponsiveFlowLayoutData")}else if(C){i=L.getLayoutDataForElement(C,"sap.ui.layout.ResponsiveFlowLayoutData")}if(i){return i}else{return L._defaultLayoutData}}}};var f=function(L,r,F){var o;var w=0;for(var i=0;i<F.length;i++){var m=F[i];o=L.getLayoutDataForElement(m,"sap.ui.layout.ResponsiveFlowLayoutData");if(o){w=w+o.getWeight()}else{w++}}o=r.getLayoutData();if(o){o.setWeight(w)}else{r.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({weight:w}))}};var g=function(r){if(r.__myParentContainerId){r.__myParentContainerId=undefined}if(r.__myParentElementId){r.__myParentElementId=undefined}r.__myParentLayout=undefined;r.destroy();delete r};var h=function(L,C){var i=L.mContainers[C];var r;var E=i[2];if(E){for(var s in E){if(E[s][1]){g(E[s][1])}r=E[s][0];g(r);delete E[s]}}r=i[1];if(r){r.removeAllContent();g(r)}var p=i[0];if(p){b(p)}delete L.mContainers[C]};var j=function(L,C,E,r,o,i){var s=E.getId();var I=s+"--RFLayout";var R=sap.ui.getCore().byId(I);if(!r[s]&&R){var O=R.__myParentContainerId;r[s]=L.mContainers[O][2][s];o.insertContent(R,i);R.__myParentContainerId=C.getId();if(r[s][1]){r[s][1].__myParentContainerId=C.getId()}delete L.mContainers[O][2][s]}};var k=function(L,F){var C=F.getFormContainers();var m=0;var n=0;for(var i=0;i<C.length;i++){var o=C[i];if(o.getVisible()){m++}}if(m>1){if(!L._mainRFLayout){L._mainRFLayout=new sap.ui.layout.ResponsiveFlowLayout(F.getId()+"--RFLayout").setParent(L)}else{var p=L._mainRFLayout.getContent();n=p.length;var E=false;for(var i=0;i<n;i++){var q=p[i];var o=undefined;if(q.getContainer){o=sap.ui.getCore().byId(q.getContainer())}else{o=sap.ui.getCore().byId(q.__myParentContainerId)}if(o&&o.getVisible()){var r=L.mContainers[o.getId()];if(r[0]&&r[0]!=q){E=true;break}if(!r[0]&&r[1]&&r[1]!=q){E=true;break}}else{L._mainRFLayout.removeContent(q)}}if(E){L._mainRFLayout.removeAllContent();n=0}}if(n<m){for(var i=0;i<C.length;i++){var o=C[i];if(o.getVisible()){var s=o.getId();if(L.mContainers[s]){if(L.mContainers[s][0]){L._mainRFLayout.addContent(L.mContainers[s][0])}else if(L.mContainers[s][1]){L._mainRFLayout.addContent(L.mContainers[s][1])}}}}}}};var l=function(o){var L=0;if(!Object.keys){jQuery.each(o,function(){L++})}else{L=Object.keys(o).length}return L}}());
