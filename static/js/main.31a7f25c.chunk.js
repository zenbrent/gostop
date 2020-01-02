(this.webpackJsonphanafuda=this.webpackJsonphanafuda||[]).push([[0],{44:function(n,e,t){n.exports=t(57)},49:function(n,e,t){},50:function(n,e,t){},57:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),i=t(35),o=t.n(i),c=(t(49),t(27)),u=t(4),l=t(5),s=t(61),m=t(62),d=t(60),p=t(63),f=(t(50),t(65)),b=t(66),h=t(67),g="Bright",I="Animal",y="Ribbon",v="Junk",E=[g,I,y,v],O=[{month:"January",plant:"Pine",types:[g,y,v,v]},{month:"February",plant:"Plum",types:[I,y,v,v]},{month:"March",plant:"Cherry",types:[g,y,v,v]},{month:"April",plant:"Wisteria",types:[I,y,v,v]},{month:"May",plant:"Iris",types:[I,y,v,v]},{month:"June",plant:"Peony",types:[I,y,v,v]},{month:"July",plant:"Blush Clover",types:[I,y,v,v]},{month:"August",plant:"Pampas Grass",types:[g,I,v,v]},{month:"September",plant:"Chrysanthemum",types:[I,y,v,v]},{month:"October",plant:"Maple",types:[I,y,v,v]},{month:"November",plant:"Paulownia",types:[g,v,v,v]},{month:"December",plant:"Willow",types:[g,I,y,v]}],j=Object(s.a)(Object(p.a)((function(n){var e=n.month,t=n.plant,r=n.types;return Object(f.a)(p.a)((function(n,r){return{month:e,plant:t,type:n,index:r}}))(r)})),b.a)(O),w=function(n){var e=n.month;return Object(h.a)((function(n){return n.month===e}))(O)},k=function(n){var e=n.type;return Object(h.a)((function(n){return n===e}))(E)},A=function(n){return Object(m.a)((function(e){return e.type===n}))},x={bright:A(g)(j),animal:A(I)(j),ribbon:A(y)(j),junk:A(v)(j)},C={rainMan:j.find((function(n){return"December"===n.month&&0===n.index})),geese:j.find((function(n){return"August"===n.month&&n.type===I})),cuckoo:j.find((function(n){return"April"===n.month&&n.type===I})),nightingale:j.find((function(n){return"February"===n.month&&n.type===I})),poetryRibbons:j.filter((function(n){return n.type===y&&["January","February","March"].includes(n.month)})),purpleRibbons:j.filter((function(n){return n.type===y&&["June","September","October"].includes(n.month)})),dryRibbons:j.filter((function(n){return n.type===y&&["April","May","July"].includes(n.month)})),sake:j.find((function(n){return"September"===n.month&&1===n.index})),lightning:j.find((function(n){return"December"===n.month&&3===n.index})),paulownia:j.find((function(n){return"November"===n.month&&1===n.index}))};function z(){var n=Object(u.a)(["\n  display: inline-block;\n  position: relative;\n  margin-right: 2px;\n\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  border-radius: 3px;\n\n  cursor: pointer;\n\n  @media (min-width: 376px) {\n    width: calc(30px + 4vw);\n  }\n  @media (max-width: 375px) {\n    width: calc(20vw - 10px);\n  }\n"]);return z=function(){return n},n}var M=l.a.img.attrs((function(n){return{className:"Card-image-".concat(w(n.card),"-").concat(n.card.index),src:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACkCAQAAADLA0NrAAAAmUlEQVR42u3PAQEAAAgCoPx/uh8KD8iViIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIyHbkAQJkAKVTKMc5AAAAAElFTkSuQmCC"}}))(z()),F=function(n){return"".concat(n.month," ").concat(n.type," ").concat(n.index)},J=(t(68),t(43),t(69),[{name:"5 Brights",points:{base:15},count:5,pool:x.bright},{name:"Wet 4 Brights",points:{base:4},count:4,pool:x.bright,requires:[C.rainMan]},{name:"Dry 4 Brights",points:{base:5},count:4,pool:x.bright,excludes:[C.rainMan]},{name:"Wet 3 Brights",points:{base:2},count:3,pool:x.bright,requires:[C.rainMan]},{name:"Dry 3 Brights",points:{base:3},count:3,pool:x.bright,excludes:[C.rainMan]},{name:"5 Animals",points:{base:1,additionalAfter:5},min:5,pool:x.animal},{name:"Godori",points:{base:3},sets:[[C.geese,C.cuckoo,C.nightingale]]},{name:"5 Ribbons",points:{base:1,additionalAfter:5},count:5,pool:x.ribbon},{name:"3 Matching Ribbons",points:{base:3},notes:'This doesn\'t include the "rain ribbon" in December.\nAlso note -- "Freedom of choice" principle: 2 ribbon triplets can count as 3 matching ribbons twice, plus 5 ribbons + 1, for 8 points.',sets:[C.poetryRibbons,C.purpleRibbons,C.dryRibbons]},{name:"Ten Pi",notes:"Pi is Korean for Junk",points:{base:1,additionalAfter:10},min:10,pool:x.junk},{name:"Special Junk",notes:"These cards count as 2 junks. The Sake card may be one Animal card XOR 2 junk cards. sang-pi in Korean.",points:{base:2},sets:[[C.sake],[C.lightning],[C.paulownia]]}]);function R(){var n=Object(u.a)(["\n  text-align: center;\n  color: deeppink;\n"]);return R=function(){return n},n}function B(){var n=Object(u.a)(["\n  text-align: center;\n  font-weight: bold;\n"]);return B=function(){return n},n}function S(){var n=Object(u.a)(["\n  display: block;\n"]);return S=function(){return n},n}function T(){var n=Object(u.a)(["\n  display: inline-block;\n  padding-right: 1rem;\n"]);return T=function(){return n},n}function P(){var n=Object(u.a)(["\n  padding-bottom: 1rem;\n"]);return P=function(){return n},n}function D(){var n=Object(u.a)(["\n  display: block;\n"]);return D=function(){return n},n}function W(){var n=Object(u.a)(["\n  grid-area: controls;\n  margin: 1rem;\n  margin-top: 0;\n"]);return W=function(){return n},n}function G(){var n=Object(u.a)(["\n  grid-area: page;\n"]);return G=function(){return n},n}var K=l.a.div(G()),N=l.a.div(W()),Q=l.a.a(D()),V=l.a.div(P()),q=l.a.div(T()),U=l.a.div(S()),L=l.a.div(B()),H=Object(l.a)(L)(R());function X(n){var e=n.zoomCard,t=function(n){return n.cards.map((function(n){return a.a.createElement(M,{card:n,key:F(n),onClick:function(){return e(n)}})}))};return a.a.createElement(a.a.Fragment,null,a.a.createElement(N,null,J.map((function(n){var e=n.name;return a.a.createElement(Q,{href:"#".concat(e),key:e},e)}))),a.a.createElement(K,null,J.map((function(n){var e=n.name,r=n.pool,i=void 0===r?[]:r,o=n.count,c=n.min,u=n.requires,l=void 0===u?[]:u,f=n.excludes,b=void 0===f?[]:f,h=n.sets,g=void 0===h?[]:h,I=n.notes,y=n.points,v=Object(s.a)(Object(m.a)((function(n){return!l.includes(n)})),Object(m.a)((function(n){return!b.includes(n)})),d.a)(i);return a.a.createElement(V,{key:e},a.a.createElement(L,{id:e},e),a.a.createElement(H,null,y.base," ",1===y.base?"point":"points",y.additionalAfter?" after ".concat(y.additionalAfter," cards, and an additional point per card after"):"","."),I&&a.a.createElement("div",null,"Note: ",I),$(l,(function(){return a.a.createElement(q,null,a.a.createElement(U,null,1===l.length?"this card":"the following cards"),a.a.createElement(t,{cards:l}))})),$(v,(function(){return a.a.createElement(q,null,a.a.createElement(U,null,$(l,(function(){return"and "})),!c&&!!v.length&&o&&(o<v.length+l.length?"any ".concat(o-l.length," of the following cards"):"all of the following cards"),v&&c&&"at least ".concat(c," of the following cards")),a.a.createElement(t,{cards:v.filter((function(n){return!b.includes(n)}))}))})),$(b,(function(){return a.a.createElement(q,null,a.a.createElement(U,null,"not"),a.a.createElement(t,{cards:b}))})),$(g,(function(){return a.a.createElement(q,null,a.a.createElement(U,null,1===g.length&&"All cards in this set",g.length>1&&"Any one of these sets"),Object(p.a)((function(n){return a.a.createElement(t,{cards:n,key:Object(p.a)(F,n).join(",")})}))(g))})))}))))}function $(n,e){if(n.length)return e()}var Y=t(40),Z=t(58),_=t(64),nn=t(59);function en(){var n=Object(u.a)(["\n  margin-bottom: 1rem;\n"]);return en=function(){return n},n}function tn(){var n=Object(u.a)(["\n  display: block;\n"]);return tn=function(){return n},n}function rn(){var n=Object(u.a)(["\n  display: block;\n  text-align: left;\n"]);return rn=function(){return n},n}function an(){var n=Object(u.a)(["\n  display: inline-block;\n  margin-right: 1em;\n"]);return an=function(){return n},n}function on(){var n=Object(u.a)(["\n  grid-area: page;\n  text-align: center;\n"]);return on=function(){return n},n}function cn(){var n=Object(u.a)(["\n  grid-area: controls;\n\n  margin: 1rem;\n  margin-top: 0;\n"]);return cn=function(){return n},n}var un=l.a.div(cn()),ln=l.a.div(on()),sn=l.a.div(an()),mn=l.a.div(rn());function dn(n){var e=n.filters,t=n.setFilters,r=n.organize,i=n.setOrganize,o=n.zoomCard;return a.a.createElement(a.a.Fragment,null,a.a.createElement(un,null,a.a.createElement(bn,{filters:e,setFilters:t}),a.a.createElement(hn,{organize:r,setOrganize:i})),a.a.createElement(ln,null,Object(s.a)(Object(m.a)(gn(e)),Object(Z.a)(In(r)),Object(_.a)((function(n){return n[r.toLowerCase()]})),Object(p.a)(Object(p.a)((function(n){return a.a.createElement(M,{card:n,key:F(n),onClick:function(){return o(n)}})}))),Object(nn.a)((function(n,e){return a.a.createElement(sn,{key:e},a.a.createElement(yn,{type:r,group:e,count:n.length}),a.a.createElement("div",null,n))})),Object.values)(j)))}var pn=l.a.label(tn()),fn=l.a.div(en()),bn=function(n){var e=n.filters,t=n.setFilters,r=e.length===E.length,i=function(n){return function(r){r.target.checked?t([n].concat(Object(Y.a)(e))):t(e.filter((function(e){return e!==n})))}},o=function(n){var t,o=n.prop,c=n.children;return a.a.createElement(pn,null,a.a.createElement("input",{type:"checkbox",checked:(t=o,r||e.includes(t)),onChange:i(o)}),c)};return a.a.createElement(fn,null,"Filter card types:",a.a.createElement(pn,null,a.a.createElement("input",{type:"checkbox",checked:r,onChange:function(n){return n.target.checked?t(E):t([g])}}),"All"),a.a.createElement(o,{prop:g},"Bright"),a.a.createElement(o,{prop:I},"Animal"),a.a.createElement(o,{prop:y},"Ribbon"),a.a.createElement(o,{prop:v},"Junk"))},hn=function(n){var e=n.organize,t=n.setOrganize;return a.a.createElement(fn,null,"Group by:",a.a.createElement(pn,null,a.a.createElement("input",{type:"radio",name:"organize",checked:"Month"===e,onChange:function(n){return t("Month")}}),"Month"),a.a.createElement(pn,null,a.a.createElement("input",{type:"radio",name:"organize",checked:"Type"===e,onChange:function(n){return t("Type")}}),"Type"))},gn=function(n){return function(e){return 0===n.length||(e.type===v?n.includes(v):n.includes(e.type))}},In=function(n){return function(e,t){var r;return"Month"===n?r=w(e)-w(t):"Type"===n&&(r=k(e)-k(t)),0!==r?r:e.index-t.index}},yn=function(n){var e=n.type,t=n.group,r=n.count;return a.a.createElement(mn,null,a.a.createElement((function(){if("Month"===e){var n=O.find((function(n){return n.month===t}));return a.a.createElement(a.a.Fragment,null," ",n.month,": ",a.a.createElement("i",null,n.plant))}if("Type"===e)return a.a.createElement(a.a.Fragment,null," ",t," ")}),null)," (",r,")")},vn=t(24),En=t(16);function On(){var n=Object(u.a)(["\n  grid-area: zoom;\n  width: calc(100% - 2rem);\n  margin: 0 auto;\n"]);return On=function(){return n},n}function jn(){var n=Object(u.a)(["\n  grid-area: header;\n  justify-self: center;\n  align-self: center;\n"]);return jn=function(){return n},n}function wn(){var n=Object(u.a)(["\n  grid-area: nav;\n  margin: 1rem;\n  margin-top: 0;\n"]);return wn=function(){return n},n}function kn(){var n=Object(u.a)(['\n  display: grid;\n  @media (min-width: 376px) {\n    grid-template:\n      [row1-start] ".        header header" 2rem [row1-end]\n      [row2-start] "nav      page   page"   auto [row2-end]\n      [row3-start] "controls page   page"   auto [row3-end]\n      [row4-start] "zoom     page   page"   1fr  [row4-end]\n      [row5-start] "footer   footer footer" 2em  [row5-end]\n      / 15rem auto;\n  }\n\n  @media (max-width: 375px) {\n    grid-template:\n      [row1-start] "header"   2rem [row1-end]\n      [row2-start] "nav "     auto [row2-end]\n      [row3-start] "controls" auto [row3-end]\n      [row3-start] "page"     auto [row3-end]\n      [row4-start] "zoom"     1fr  [row4-end]\n      [row5-start] "footer"   2em  [row5-end]\n      / 100%;\n  }\n']);return kn=function(){return n},n}var An=l.a.div(kn()),xn=l.a.div(wn()),Cn=l.a.div(jn()),zn=Object(l.a)(M)(On()),Mn=window.location.host.endsWith("github.io")?vn.b:vn.a;var Fn=function(){var n=Object(r.useState)([]),e=Object(c.a)(n,2),t=e[0],i=e[1],o=Object(r.useState)("Month"),u=Object(c.a)(o,2),l=u[0],s=u[1],m=Object(r.useState)(),d=Object(c.a)(m,2),p=d[0],f=d[1];return a.a.createElement(Mn,null,a.a.createElement(An,null,a.a.createElement(Cn,null,"Go Stop"),a.a.createElement(xn,null,a.a.createElement(vn.c,{to:"/"},"Cards"),a.a.createElement("br",null),a.a.createElement(vn.c,{to:"/combinations"},"Combinations")),a.a.createElement(En.c,null,a.a.createElement(En.a,{path:"/combinations"},a.a.createElement(X,{zoomCard:f})),a.a.createElement(En.a,{path:"/"},a.a.createElement(dn,{filters:t,setFilters:i,organize:l,setOrganize:s,zoomCard:f}))),p?a.a.createElement(zn,{card:p}):""))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(Fn,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()}))}},[[44,1,2]]]);
//# sourceMappingURL=main.31a7f25c.chunk.js.map