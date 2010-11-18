YUI.add("recordset-base",function(F){var A=F.Base.create("record",F.Base,[],{_setId:function(){return F.guid();},initializer:function(G){},destructor:function(){},getValue:function(G){if(G===undefined){return this.get("data");}else{return this.get("data")[G];}return null;}},{ATTRS:{id:{valueFn:"_setId"},data:{value:null}}});F.Record=A;var B=F.ArrayList,D=F.bind,C=F.Lang,E=F.Base.create("recordset",F.Base,[],{initializer:function(){this.publish("add",{defaultFn:this._defAddFn});this.publish("remove",{defaultFn:this._defRemoveFn});this.publish("empty",{defaultFn:this._defEmptyFn});this.publish("update",{defaultFn:this._defUpdateFn});this._recordsetChanged();this._syncHashTable();},destructor:function(){},_defAddFn:function(K){var G=this._items.length,J=K.added,H=K.index,I=0;for(;I<J.length;I++){if(H===G){this._items.push(J[I]);}else{this._items.splice(H,0,J[I]);H++;}}},_defRemoveFn:function(G){if(G.index===0){this._items.pop();}else{this._items.splice(G.index,G.range);}},_defEmptyFn:function(G){this._items=[];},_defUpdateFn:function(H){for(var G=0;G<H.updated.length;G++){this._items[H.index+G]=this._changeToRecord(H.updated[G]);}},_defAddHash:function(J){var I=this.get("table"),H=this.get("key"),G=0;for(;G<J.added.length;G++){I[J.added[G].get(H)]=J.added[G];}this.set("table",I);},_defRemoveHash:function(J){var I=this.get("table"),H=this.get("key"),G=0;for(;G<J.removed.length;G++){delete I[J.removed[G].get(H)];}this.set("table",I);},_defUpdateHash:function(J){var I=this.get("table"),H=this.get("key"),G=0;for(;G<J.updated.length;G++){if(J.overwritten[G]){delete I[J.overwritten[G].get(H)];}I[J.updated[G].get(H)]=J.updated[G];}this.set("table",I);},_defEmptyHash:function(){this.set("table",{});},_setHashTable:function(){var J={},I=this.get("key"),H=0;if(this._items&&this._items[0]){var G=this._items.length;for(;H<G;H++){J[this._items[H].get(I)]=this._items[H];}}return J;},_changeToRecord:function(H){var G;if(H instanceof F.Record){G=H;}else{G=new F.Record({data:H});}return G;},_recordsetChanged:function(){this.on(["update","add","remove","empty"],function(){this.fire("change",{});});},_syncHashTable:function(){this.after("add",function(G){this._defAddHash(G);});this.after("remove",function(G){this._defRemoveHash(G);});this.after("update",function(G){this._defUpdateHash(G);});this.after("update",function(G){this._defEmptyHash();});},getRecord:function(G){if(C.isString(G)){return this.get("table")[G];}else{if(C.isNumber(G)){return this._items[G];}}return null;},getRecordByIndex:function(G){return this._items[G];},getRecordsByIndex:function(I,H){var J=0,G=[];H=(C.isNumber(H)&&(H>0))?H:1;for(;J<H;J++){G.push(this._items[I+J]);}return G;},getLength:function(){return this.size();},getValuesByKey:function(I){var H=0,G=this._items.length,J=[];for(;H<G;H++){J.push(this._items[H].getValue(I));}return J;},add:function(K,H){var J=[],G,I=0;G=(C.isNumber(H)&&(H>-1))?H:this._items.length;if(C.isArray(K)){for(;I<K.length;I++){J[I]=this._changeToRecord(K[I]);}}else{if(C.isObject(K)){J[0]=this._changeToRecord(K);}}this.fire("add",{added:J,index:G});return this;},remove:function(H,G){var I=[];H=(H>-1)?H:(this.size()-1);G=(G>0)?G:1;I=this._items.slice(H,(H+G));this.fire("remove",{removed:I,range:G,index:H});return this;},empty:function(){this.fire("empty",{});return this;},update:function(J,H){var K,G,I=0;G=(!(C.isArray(J)))?[J]:J;K=this._items.slice(H,H+G.length);for(;I<G.length;I++){G[I]=this._changeToRecord(G[I]);}this.fire("update",{updated:G,overwritten:K,index:H});return this;}},{ATTRS:{records:{validator:C.isArray,getter:function(){return new F.Array(this._items);},setter:function(I){var H=[];function G(J){var K;if(J instanceof F.Record){H.push(J);}else{K=new F.Record({data:J});H.push(K);}}if(I){F.Array.each(I,G);this._items=new F.Array(H);}else{this._items=new F.Array();}},lazyAdd:false},table:{valueFn:"_setHashTable"},key:{value:"id",readOnly:true}}});F.augment(E,B);F.Recordset=E;},"@VERSION@",{requires:["base","arraylist"]});YUI.add("recordset-sort",function(D){var A=D.ArraySort.compare,C=D.Lang.isValue;function B(E,F,G){B.superclass.constructor.apply(this,arguments);}D.mix(B,{NS:"sort",NAME:"recordsetSort",ATTRS:{lastSortProperties:{value:{field:undefined,desc:true,sorter:undefined},validator:function(E){return(C(E.field)&&C(E.desc)&&C(E.sorter));}},defaultSorter:{value:function(G,E,H,I){var F=A(G.getValue(H),E.getValue(H),I);if(F===0){return A(G.get("id"),E.get("id"),I);}else{return F;}}},isSorted:{value:false,valueFn:"_getState"}}});D.extend(B,D.Plugin.Base,{initializer:function(E){this.publish("sort",{defaultFn:D.bind("_defSortFn",this)});},destructor:function(E){},_getState:function(){var F=this.get("host"),E=D.bind(function(){this.set("isSorted",false);},this);this.on("sort",function(){this.set("isSorted",true);});this.onHostEvent("add",E,F);this.onHostEvent("update",E,F);},_defSortFn:function(E){this.set("lastSortProperties",E);this.get("host")._items.sort(function(G,F){return(E.sorter)(G,F,E.field,E.desc);});},sort:function(E,F,G){this.fire("sort",{field:E,desc:F,sorter:G||this.get("defaultSorter")});},resort:function(){var E=this.get("lastSortProperties");this.fire("sort",{field:E.field,desc:E.desc,sorter:E.sorter||this.get("defaultSorter")});},reverse:function(){this.get("host")._items.reverse();},flip:function(){var E=this.get("lastSortProperties");if(C(E.field)){this.fire("sort",{field:E.field,desc:!E.desc,sorter:E.sorter||this.get("defaultSorter")});}else{}}});D.namespace("Plugin").RecordsetSort=B;},"@VERSION@",{requires:["recordset-base","arraysort","plugin"]});YUI.add("recordset-filter",function(D){var C=D.Array,B=D.Lang;function A(E){A.superclass.constructor.apply(this,arguments);}D.mix(A,{NS:"filter",NAME:"recordsetFilter",ATTRS:{}});D.extend(A,D.Plugin.Base,{initializer:function(E){},destructor:function(E){},filter:function(J,F){var I=this.get("host").get("records"),E=I.length,G=0,K=[],H=J;if(B.isString(J)&&B.isValue(F)){H=function(L){if(L.getValue(J)===F){return true;}else{return false;
}};}K=C.filter(I,H);return new D.Recordset({records:K});},reject:function(E){return new D.Recordset({records:C.reject(this.get("host").get("records"),E)});},grep:function(E){return new D.Recordset({records:C.grep(this.get("host").get("records"),E)});}});D.namespace("Plugin").RecordsetFilter=A;},"@VERSION@",{requires:["recordset-base","plugin","array-extras"]});YUI.add("recordset-indexer",function(B){function A(C){A.superclass.constructor.apply(this,arguments);}B.mix(A,{NS:"indexer",NAME:"recordsetIndexer",ATTRS:{hashTables:{value:{}},keys:{value:{}}}});B.extend(A,B.Plugin.Base,{initializer:function(C){var D=this.get("host");this.onHostEvent("add",B.bind("_defAddHash",this),D);this.onHostEvent("remove",B.bind("_defRemoveHash",this),D);this.onHostEvent("update",B.bind("_defUpdateHash",this),D);},destructor:function(C){},_setHashTable:function(E){var F=this.get("host"),G={},D=0,C=F.getLength();for(;D<C;D++){G[F._items[D].getValue(E)]=F._items[D];}return G;},_defAddHash:function(D){var C=this.get("hashTables");B.each(C,function(E,F){B.each(D.added||D.updated,function(G){if(G.getValue(F)){E[G.getValue(F)]=G;}});});},_defRemoveHash:function(E){var D=this.get("hashTables"),C;B.each(D,function(F,G){B.each(E.removed||E.overwritten,function(H){C=H.getValue(G);if(C&&F[C]===H){delete F[C];}});});},_defUpdateHash:function(C){C.added=C.updated;C.removed=C.overwritten;this._defAddHash(C);this._defRemoveHash(C);},createTable:function(C){var D=this.get("hashTables");D[C]=this._setHashTable(C);this.set("hashTables",D);return D[C];},getTable:function(C){return this.get("hashTables")[C];}});B.namespace("Plugin").RecordsetIndexer=A;},"@VERSION@",{requires:["recordset-base","plugin"]});YUI.add("recordset",function(A){},"@VERSION@",{use:["recordset-base","recordset-sort","recordset-filter","recordset-indexer"]});