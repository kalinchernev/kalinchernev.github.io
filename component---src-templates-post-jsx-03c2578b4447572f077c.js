webpackJsonp([0xc1d74b0851a0],{297:function(e,t,a){var s;!function(n){"use strict";function r(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}function l(e){var t=new Date(e.getFullYear(),e.getMonth(),e.getDate());t.setDate(t.getDate()-(t.getDay()+6)%7+3);var a=new Date(t.getFullYear(),0,4);a.setDate(a.getDate()-(a.getDay()+6)%7+3);var s=t.getTimezoneOffset()-a.getTimezoneOffset();t.setHours(t.getHours()-s);var n=(t-a)/6048e5;return 1+Math.floor(n)}function o(e){var t=e.getDay();return 0===t&&(t=7),t}function d(e){return null===e?"null":void 0===e?"undefined":"object"!=typeof e?typeof e:Array.isArray(e)?"array":{}.toString.call(e).slice(8,-1).toLowerCase()}var u=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,t=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,a=/[^-+\dA-Z]/g;return function(s,n,i,m){if(1!==arguments.length||"string"!==d(s)||/\d/.test(s)||(n=s,s=void 0),s=s||new Date,s instanceof Date||(s=new Date(s)),isNaN(s))throw TypeError("Invalid date");n=String(u.masks[n]||n||u.masks.default);var c=n.slice(0,4);"UTC:"!==c&&"GMT:"!==c||(n=n.slice(4),i=!0,"GMT:"===c&&(m=!0));var f=i?"getUTC":"get",y=s[f+"Date"](),p=s[f+"Day"](),g=s[f+"Month"](),h=s[f+"FullYear"](),M=s[f+"Hours"](),T=s[f+"Minutes"](),v=s[f+"Seconds"](),D=s[f+"Milliseconds"](),N=i?0:s.getTimezoneOffset(),S=l(s),E=o(s),H={d:y,dd:r(y),ddd:u.i18n.dayNames[p],dddd:u.i18n.dayNames[p+7],m:g+1,mm:r(g+1),mmm:u.i18n.monthNames[g],mmmm:u.i18n.monthNames[g+12],yy:String(h).slice(2),yyyy:h,h:M%12||12,hh:r(M%12||12),H:M,HH:r(M),M:T,MM:r(T),s:v,ss:r(v),l:r(D,3),L:r(Math.round(D/10)),t:M<12?u.i18n.timeNames[0]:u.i18n.timeNames[1],tt:M<12?u.i18n.timeNames[2]:u.i18n.timeNames[3],T:M<12?u.i18n.timeNames[4]:u.i18n.timeNames[5],TT:M<12?u.i18n.timeNames[6]:u.i18n.timeNames[7],Z:m?"GMT":i?"UTC":(String(s).match(t)||[""]).pop().replace(a,""),o:(N>0?"-":"+")+r(100*Math.floor(Math.abs(N)/60)+Math.abs(N)%60,4),S:["th","st","nd","rd"][y%10>3?0:(y%100-y%10!=10)*y%10],W:S,N:E};return n.replace(e,function(e){return e in H?H[e]:e.slice(1,e.length-1)})}}();u.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},u.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]},s=function(){return u}.call(t,a,t,e),!(void 0!==s&&(e.exports=s))}(this)},206:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var n=a(3),r=s(n),l=a(6),o=s(l),d=a(297),u=s(d),i=a(48),m=s(i),c=a(40),f=s(c),y=a(208),p=s(y),g=function(e){var t=e.post,a=t.timeToRead,s=t.frontmatter,n=s.date,l=s.tags;return r.default.createElement("div",null,r.default.createElement("section",{className:m.default["post-meta"]},r.default.createElement("time",{className:m.default["post-time"],dateTime:n},(0,u.default)(n,"fullDate")),r.default.createElement("ul",{className:m.default["post-tags"]},l.map(function(e){return r.default.createElement(p.default,{key:(0,f.default)(),tag:e})}))),r.default.createElement("div",{className:m.default["post-timeToRead"]},"Approximately ",a," minutes to read ..."))};g.propTypes={post:o.default.shape({frontmatter:o.default.shape({date:o.default.string,timeToRead:o.default.string,tags:o.default.array})}).isRequired},t.default=g,e.exports=t.default},208:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var n=a(3),r=s(n),l=a(6),o=s(l),d=a(18),u=s(d),i=a(78),m=s(i),c=a(48),f=s(c),y=function(e){var t=e.tag;return r.default.createElement("li",{className:f.default["post-tag"]},r.default.createElement(u.default,{title:"Click here to see all posts about "+t.toLowerCase(),to:"/tags/"+(0,m.default)(t)},"#",t))};y.propTypes={tag:o.default.string.isRequired},t.default=y,e.exports=t.default},48:function(e,t){e.exports={header:"src-components-css----styles-module---header---2zWhO","header-heading":"src-components-css----styles-module---header-heading---101pz","header-layout":"src-components-css----styles-module---header-layout---1uhr_",logo:"src-components-css----styles-module---logo---SfU8_","post-meta":"src-components-css----styles-module---post-meta---w1c3N","post-time":"src-components-css----styles-module---post-time---1sQsi","post-timeToRead":"src-components-css----styles-module---post-timeToRead---T-kZB","post-tags":"src-components-css----styles-module---post-tags---1BKid","post-tag":"src-components-css----styles-module---post-tag---3ePpn","social-media":"src-components-css----styles-module---social-media---2Jk6G"}},311:function(e,t){},212:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.query=void 0;var n=a(3),r=s(n),l=a(6),o=s(l),d=a(56),u=s(d),i=a(206),m=s(i);a(311);var c=function(e){var t=e.data,a=t.markdownRemark;return r.default.createElement("div",null,r.default.createElement(u.default,{htmlAttributes:{lang:"en"}},r.default.createElement("meta",{charSet:"utf-8"}),r.default.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0 shrink-to-fit=no"}),r.default.createElement("title",null,a.frontmatter.title," | Kalin Chernev")),r.default.createElement(m.default,{post:a}),r.default.createElement("h1",null,a.frontmatter.title),r.default.createElement("div",{dangerouslySetInnerHTML:{__html:a.html}}))};t.query="** extracted graphql fragment **";c.propTypes={data:o.default.shape({markdownRemark:o.default.shape({frontmatter:o.default.shape({title:o.default.string.isRequired}),html:o.default.string.isRequired}).isRequired}).isRequired},t.default=c},40:function(e,t){"use strict";t.__esModule=!0,t.default=function(){return Math.floor(Math.random()*Math.floor(1e3))},e.exports=t.default},78:function(e,t){"use strict";e.exports=function(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}}});
//# sourceMappingURL=component---src-templates-post-jsx-03c2578b4447572f077c.js.map