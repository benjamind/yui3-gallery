YUI.add("dom-style",function(a){(function(e){var o="documentElement",b="defaultView",n="ownerDocument",h="style",i="float",q="cssFloat",r="styleFloat",k="transparent",d="getComputedStyle",c="getBoundingClientRect",g=e.config.doc,s=undefined,p=e.DOM,f="transform",l=["WebkitTransform","MozTransform","OTransform"],m=/color$/i,j=/width|height|top|left|right|bottom|margin|padding/i;e.Array.each(l,function(t){if(t in g[o].style){f=t;}});e.mix(p,{DEFAULT_UNIT:"px",CUSTOM_STYLES:{},setStyle:function(w,t,x,v){v=v||w.style;var u=p.CUSTOM_STYLES;if(v){if(x===null||x===""){x="";}else{if(!isNaN(new Number(x))&&j.test(t)){x+=p.DEFAULT_UNIT;}}if(t in u){if(u[t].set){u[t].set(w,x,v);return;}else{if(typeof u[t]==="string"){t=u[t];}}}else{if(t===""){t="cssText";x="";}}v[t]=x;}},getStyle:function(w,t,v){v=v||w.style;var u=p.CUSTOM_STYLES,x="";if(v){if(t in u){if(u[t].get){return u[t].get(w,t,v);}else{if(typeof u[t]==="string"){t=u[t];}}}x=v[t];if(x===""){x=p[d](w,t);}}return x;},setStyles:function(u,v){var t=u.style;e.each(v,function(w,x){p.setStyle(u,x,w,t);},p);},getComputedStyle:function(u,t){var w="",v=u[n];if(u[h]&&v[b]&&v[b][d]){w=v[b][d](u,null)[t];}return w;}});if(g[o][h][q]!==s){p.CUSTOM_STYLES[i]=q;}else{if(g[o][h][r]!==s){p.CUSTOM_STYLES[i]=r;}}if(e.UA.opera){p[d]=function(v,u){var t=v[n][b],w=t[d](v,"")[u];if(m.test(u)){w=e.Color.toRGB(w);}return w;};}if(e.UA.webkit){p[d]=function(v,u){var t=v[n][b],w=t[d](v,"")[u];if(w==="rgba(0, 0, 0, 0)"){w=k;}return w;};}e.DOM._getAttrOffset=function(x,u){var z=e.DOM[d](x,u),w=x.offsetParent,t,v,y;if(z==="auto"){t=e.DOM.getStyle(x,"position");if(t==="static"||t==="relative"){z=0;}else{if(w&&w[c]){v=w[c]()[u];y=x[c]()[u];if(u==="left"||u==="top"){z=y-v;}else{z=v-x[c]()[u];}}}}return z;};e.DOM._getOffset=function(t){var v,u=null;if(t){v=p.getStyle(t,"position");u=[parseInt(p[d](t,"left"),10),parseInt(p[d](t,"top"),10)];if(isNaN(u[0])){u[0]=parseInt(p.getStyle(t,"left"),10);if(isNaN(u[0])){u[0]=(v==="relative")?0:t.offsetLeft||0;}}if(isNaN(u[1])){u[1]=parseInt(p.getStyle(t,"top"),10);if(isNaN(u[1])){u[1]=(v==="relative")?0:t.offsetTop||0;}}}return u;};p.CUSTOM_STYLES.transform={set:function(u,v,t){t[f]=v;},get:function(u,t){return p[d](u,f);}};})(a);(function(d){var b=parseInt,c=RegExp;d.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!d.Color.re_RGB.test(e)){e=d.Color.toHex(e);}if(d.Color.re_hex.exec(e)){e="rgb("+[b(c.$1,16),b(c.$2,16),b(c.$3,16)].join(", ")+")";}return e;},toHex:function(f){f=d.Color.KEYWORDS[f]||f;if(d.Color.re_RGB.exec(f)){f=[Number(c.$1).toString(16),Number(c.$2).toString(16),Number(c.$3).toString(16)];for(var e=0;e<f.length;e++){if(f[e].length<2){f[e]="0"+f[e];}}f=f.join("");}if(f.length<6){f=f.replace(d.Color.re_hex3,"$1$1");}if(f!=="transparent"&&f.indexOf("#")<0){f="#"+f;}return f.toUpperCase();}};})(a);},"@VERSION@",{requires:["dom-base"]});