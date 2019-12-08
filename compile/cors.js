'use strict';/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const r=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function u(l){for(var e=0,g=[],d=0,f=0,n=l.length;f<n;f++)switch(l.charCodeAt(f)){case 32:d==e&&(d=e=f+1);break;case 44:g.push(l.substring(d,e));d=e=f+1;break;default:e=f+1}g.push(l.substring(d,e));return g};module.exports={_cors:function(l={}){let {allowMethods:e="GET,HEAD,PUT,POST,DELETE,PATCH",exposeHeaders:g,allowHeaders:d,maxAge:f,credentials:n=!1,keepHeadersOnError:v=!0,origin:p}=l;Array.isArray(e)&&(e=e.join(","));Array.isArray(g)&&(g=g.join(","));Array.isArray(d)&&(d=d.join(","));f&&(f=`${f}`);return async function(a,c){var k=a.get("Origin");a.vary("Origin");if(!k)return await c();if("function"===typeof p){var b=p(a);b instanceof Promise&&(b=await b);if(!b)return await c()}else b=p||k;k={};if("OPTIONS"!=
a.method){a.set("Access-Control-Allow-Origin",b);k["Access-Control-Allow-Origin"]=b;n&&(a.set("Access-Control-Allow-Credentials","true"),k["Access-Control-Allow-Credentials"]="true");g&&(b=g,a.set("Access-Control-Expose-Headers",b),k["Access-Control-Expose-Headers"]=b);if(!v)return await c();try{return await c()}catch(q){a=q.headers||{};var h=a.vary||a.Vary||"";if("string"!=typeof h)throw new TypeError("header argument is required");c=Array.isArray("Origin")?"Origin":u("Origin");for(b=0;b<c.length;b++)if(!r.test(c[b]))throw new TypeError("field argument contains an invalid header name");
if("*"==h)c=h;else if(b=h,h=u(h.toLowerCase()),c.includes("*")||h.includes("*"))c="*";else{for(let m=0;m<c.length;m++){const t=c[m].toLowerCase();h.includes(t)||(h.push(t),b=b?b+", "+c[m]:c[m])}c=b}delete a.a;q.headers=Object.assign({},a,k,{vary:c});throw q;}}else{if(!a.get("Access-Control-Request-Method"))return await c();a.set("Access-Control-Allow-Origin",b);n&&a.set("Access-Control-Allow-Credentials",!0);f&&a.set("Access-Control-Max-Age",f);e&&a.set("Access-Control-Allow-Methods",e);d||(d=a.get("Access-Control-Request-Headers"));
d&&a.set("Access-Control-Allow-Headers",d);a.status=204}}}};

//# sourceMappingURL=cors.js.map