(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8499:function(a,b,c){"use strict";var d=c(9499),e=c(4730),f=c(6835),g=c(7294),h=c(1664),i=c(6247),j=c(5016),k=c(803),l=c(7385),m=c(5944),n=["name","anchor","onAnchor","typeref"];function o(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function p(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{};b%2?o(Object(c),!0).forEach(function(b){(0,d.Z)(a,b,c[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(c)):o(Object(c)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(c,b))})}return a}var q=function a(b){var c=b.data;return(0,m.BX)("span",{css:{color:"var(--color-fg3) !important"},children:[function(){switch(null==c?void 0:c.kind){case"StringKeyword":return"string";case"NumberKeyword":return"number";case"BooleanKeyword":return"boolean";case"VoidKeyword":return"void";case"AnyKeyword":return"any";case"NullKeyword":return"null";case"StringLiteral":return"\"".concat(c.text,"\"");case"LiteralType":return(0,m.tZ)(a,{data:c.literal});case"ArrayType":return(0,m.BX)(m.HY,{children:[(0,m.tZ)(a,{data:c.elementType}),"[]"]});case"ParenthesizedType":return(0,m.BX)(m.HY,{children:["(",(0,m.tZ)(a,{data:c.type}),")"]});case"FunctionType":return(0,m.BX)(m.HY,{children:["(",(0,m.tZ)(r,{data:c}),") ","=>"," ",(0,m.tZ)(a,{data:c.type})]});case"UnionType":return c.types.map(function(b,d){return(0,m.BX)(g.Fragment,{children:[(0,m.tZ)(a,{data:b}),d===c.types.length-1?"":" | "]},d)});case"TypeReference":return l.V[c.typeName]?(0,m.tZ)(D.Consumer,{children:function(a){return(0,m.tZ)("span",{css:{textDecoration:"underline",cursor:"pointer"},onClick:function(){return a.typeref&&a.typeref(c.typeName)},children:c.typeName})}}):c.typeName;case"TypeLiteral":return(0,m.tZ)(i.Z,{gap:2,stretchX:!0,children:Object.entries(c.members).map(function(a){var b=(0,f.Z)(a,2);return b[0],b[1].map(function(a){return(0,m.tZ)(A,{data:a},a.name)})})});case"IndexedAccessType":return(0,m.BX)(m.HY,{children:[(0,m.tZ)(a,{data:c.objectType}),"[",(0,m.tZ)(a,{data:c.indexType}),"]"]});default:return"unknown"}}(),(null==c?void 0:c.typeArguments)&&(0,m.BX)("span",{children:["<",c.typeArguments.map(function(b,d){return(0,m.BX)(g.Fragment,{children:[(0,m.tZ)(a,{data:b}),d===c.typeArguments.length-1?"":", "]},b.typeName+d)}),">"]})]})},r=function(a){var b=a.data;return b.parameters.map(function(a,c){return(0,m.BX)("span",{children:[a.name,a.questionToken?"?":"",": ",a.dotDotDotToken?"...":(0,m.tZ)(q,{data:a.type}),c===b.parameters.length-1?"":", "]},a.name)})},s=function(a){var b=a.name;return(0,m.tZ)(i.Z,{bg:2,pad:0.5,rounded:!0,children:(0,m.tZ)(j.Z,{code:!0,color:3,bold:!0,size:"small",children:b})})},t=function(a){var b,c=a.data,d=a.small,e=a.children;return(0,m.BX)(i.Z,{gap:1,dir:"row",align:"center",children:[(b=c,["TypeAliasDeclaration","InterfaceDeclaration","ClassDeclaration"].includes(b.kind)&&(0,m.tZ)(s,{name:"type"})),(0,m.BX)(j.Z,{code:!0,color:1,select:!0,size:d?"normal":"big",children:[d?(0,m.tZ)(m.HY,{children:c.name}):(0,m.tZ)(D.Consumer,{children:function(a){return(0,m.tZ)(h.default,{href:"#".concat(a.anchor),children:(0,m.tZ)("a",{onClick:a.onAnchor,children:c.name})})}}),e]})]})},u=function(a){var b,c=a.data,d=a.small;return(0,m.BX)(i.Z,{gap:1,stretchX:!0,children:[(0,m.BX)(t,{data:c,small:d,children:["(",(0,m.tZ)(r,{data:c}),")",(null===(b=c.type)|| void 0===b?void 0:b.kind)!=="VoidKeyword"&&(0,m.BX)(m.HY,{children:[" => ",(0,m.tZ)(q,{data:c.type})]})]}),(0,m.tZ)(C,{data:c})]})},v=function(a){var b=a.data,c=a.small;return(0,m.BX)(i.Z,{gap:1,stretchX:!0,children:[(0,m.BX)(t,{data:b,small:c,children:[b.questionToken?"?":"",": ",(0,m.tZ)(q,{data:b.type})]}),(0,m.tZ)(C,{data:b})]})},w=function(a){var b=a.data;return(0,m.BX)(i.Z,{gap:1,stretchX:!0,children:[(0,m.BX)(j.Z,{code:!0,color:1,select:!0,size:"big",children:[b.name,"(",(0,m.tZ)(r,{data:b}),")"]}),(0,m.tZ)(C,{data:b})]})},x=function(a){var b=a.data;return(0,m.BX)(i.Z,{gap:1,stretchX:!0,children:[(0,m.tZ)(t,{data:b}),function(){switch(b.type.kind){case"TypeLiteral":return Object.entries(b.type.members).map(function(a){var b=(0,f.Z)(a,2);return b[0],b[1].map(function(a){return(0,m.tZ)(B,{data:a},a.name)})});case"TypeReference":case"UnionType":case"StringKeyword":case"NumberKeyword":case"BooleanKeyword":case"VoidKeyword":case"AnyKeyword":case"NullKeyword":case"FunctionType":return(0,m.tZ)(q,{data:b.type});case"IntersectionType":return b.type.types.map(function(a,c){return(0,m.BX)(g.Fragment,{children:[(0,m.tZ)(q,{data:a}),c===b.type.types.length-1?"":"&"]},c)});default:return(0,m.tZ)(m.HY,{})}(0,m.tZ)(C,{data:b})}()]})},y=function(a){var b=a.data;return(0,m.BX)(i.Z,{gap:2,stretchX:!0,children:[(0,m.BX)(i.Z,{gap:1,stretchX:!0,children:[(0,m.tZ)(t,{data:b}),(0,m.tZ)(C,{data:b})]}),Object.entries(b.members).map(function(a,b){var c=(0,f.Z)(a,2);return c[0],c[1].map(function(a,c){return(0,m.tZ)(A,{data:a},"".concat(a.name,"-").concat(b,"-").concat(c))})})]})},z=function(a){var b=a.data;return(0,m.BX)(i.Z,{gap:2,stretchX:!0,children:[(0,m.BX)(i.Z,{gap:1,stretchX:!0,children:[(0,m.tZ)(t,{data:b}),(0,m.tZ)(C,{data:b})]}),Object.entries(b.members).map(function(a,b){var c=(0,f.Z)(a,2);return c[0],c[1].map(function(a,c){return(0,m.tZ)(A,{data:a},"".concat(a.name,"-").concat(b,"-").concat(c))})})]})},A=function(a){var b=a.data;switch(b.kind){case"MethodSignature":return(0,m.tZ)(u,{data:b,small:!0});case"PropertySignature":return(0,m.tZ)(v,{data:b,small:!0});case"MethodDeclaration":return(0,m.tZ)(u,{data:b,small:!0});case"PropertyDeclaration":return(0,m.tZ)(v,{data:b,small:!0})}return(0,m.tZ)(m.HY,{})},B=function(a){var b=a.data;switch(b.kind){case"MethodSignature":return(0,m.tZ)(u,{data:b});case"PropertySignature":return(0,m.tZ)(v,{data:b});case"FunctionDeclaration":return(0,m.tZ)(w,{data:b});case"TypeAliasDeclaration":return(0,m.tZ)(x,{data:b});case"InterfaceDeclaration":return(0,m.tZ)(y,{data:b});case"ClassDeclaration":return(0,m.tZ)(z,{data:b})}return(0,m.tZ)(m.HY,{})},C=function(a){var b=a.data;return b.jsDoc?(0,m.BX)(i.Z,{gap:1,stretchX:!0,children:[b.jsDoc.doc&&(0,m.tZ)(j.Z,{select:!0,color:3,children:b.jsDoc.doc}),Object.entries(b.jsDoc.tags).map(function(a){var b=(0,f.Z)(a,2),c=b[0];return b[1].map(function(a){switch(c){case"section":return;case"example":return(0,m.tZ)(k.Z,{padY:1,src:a},a);default:return(0,m.BX)(i.Z,{gap:1,dir:"row",children:[(0,m.tZ)(s,{name:c}),(0,m.tZ)(j.Z,{select:!0,color:3,children:a})]},a)}})})]}):(0,m.tZ)(m.HY,{})},D=g.createContext({typeref:function(){}});b.Z=function(a){var b=a.name,c=a.anchor,d=a.onAnchor,f=a.typeref,g=(0,e.Z)(a,n),h=l.V[b]||l.V.KaboomCtx[0].members[b];return h?(0,m.tZ)(D.Provider,{value:{typeref:f,anchor:c,onAnchor:d},children:(0,m.tZ)(i.Z,p(p({stretchX:!0},g),{},{gap:3,children:h.map(function(a,b){return(0,m.tZ)(B,{data:a},"".concat(a.name,"-").concat(b))})}))}):(0,m.BX)(j.Z,{color:3,children:["Entry not found: ",b]})}},1569:function(a,b,c){"use strict";var d=c(7812),e=c(9499),f=c(4730),g=c(7294),h=c(6247),i=c(7436),j=c(5944),k=["handle","bigHandle","expanded","setExpanded","paneWidth","height","dir","children"];function l(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function m(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{};b%2?l(Object(c),!0).forEach(function(b){(0,e.Z)(a,b,c[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(c)):l(Object(c)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(c,b))})}return a}var n=g.forwardRef(function(a,b){var c,l,n=a.handle,o=a.bigHandle,p=a.expanded,q=a.setExpanded,r=a.paneWidth,s=a.height,t=a.dir,u=a.children,v=(0,f.Z)(a,k),w=g.useRef(null),x=null!=b?b:w;r=null!==(c=r)&& void 0!==c?c:240;var y=n?o?24:16:0;return(0,i.Z)(x,function(){q(!1)},[]),(0,j.BX)(j.HY,{children:[(0,j.BX)(h.Z,{ref:x,dir:"row",bg:1,rounded:!0,outlined:!0,height:null!=s?s:"90%",width:r+y,css:(l={position:"fixed",top:"50%",transform:"translateY(-50%)"},(0,e.Z)(l,null!=t?t:"left",p?-4:n?-r:-r-4),(0,e.Z)(l,"transition","0.2s"),(0,e.Z)(l,"overflow","hidden"),(0,e.Z)(l,"zIndex",200),l),children:[(0,j.tZ)(h.Z,m(m({gap:1,stretchY:!0,css:{flex:"1",overflow:"auto",order:"right"===t||"bottom"===t?2:1}},v),{},{children:u})),n&&(0,j.tZ)(h.Z,{dir:"row",align:"center",justify:"around",padX:0.5,width:y,stretchY:!0,onClick:function(){return q(function(a){return!a})},css:{cursor:"pointer",order:"right"===t||"bottom"===t?1:2},children:(0,d.Z)(Array(o?2:1)).map(function(a,b){return(0,j.tZ)(h.Z,{height:"calc(100% - 16px)",width:2,bg:2},b)})})]}),(0,j.tZ)(h.Z,{css:{background:"black",width:"100vw",height:"100vh",opacity:p?0.5:0,transition:"0.2s opacity",pointerEvents:"none",position:"fixed",zIndex:199,top:0,left:0}})]})});b.Z=n},1115:function(a,b,c){"use strict";var d=c(9499),e=c(6835),f=c(4730),g=c(7294),h=c(5944),i=["value","onChange","placeholder"];function j(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}b.Z=function(a){var b=a.value,c=a.onChange,k=a.placeholder,l=(0,f.Z)(a,i),m=g.useState(null!=b?b:""),n=(0,e.Z)(m,2),o=n[0],p=n[1];return(0,h.tZ)("input",function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{};b%2?j(Object(c),!0).forEach(function(b){(0,d.Z)(a,b,c[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(c)):j(Object(c)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(c,b))})}return a}({value:o,onChange:function(a){c&&c(a.currentTarget.value),p(a.currentTarget.value)},placeholder:null!=k?k:"",css:{fontSize:"var(--text-normal)",userSelect:"auto",background:"var(--color-bg3)",borderRadius:8,boxShadow:"0 0 0 2px var(--color-outline)",border:"none",padding:8,width:"100%",color:"var(--color-fg1)","::placeholder":{color:"var(--color-fg3)"},":focus":{boxShadow:"0 0 0 2px var(--color-highlight)"}}},l))}},803:function(a,b,c){"use strict";var d=c(9499),e=c(4730);c(7294);var f=c(7441),g=c(837),h=c(9622),i=c(2247),j=c(1042),k=c(6140),l=c(6167),m=c(6247),n=c(5944),o=["src","baseUrl","dim"];function p(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}g.Z.registerLanguage("javascript",h.Z),g.Z.registerLanguage("typescript",i.Z),g.Z.registerLanguage("xml",j.Z),g.Z.registerLanguage("shell",k.Z),g.Z.registerLanguage("bash",l.Z),f.TU.setOptions({highlight:function(a,b){return g.Z.highlight(a,{language:b}).value}}),b.Z=function(a){var b,c=a.src,g=a.baseUrl,h=a.dim,i=(0,e.Z)(a,o);return(0,n.tZ)(m.Z,function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{};b%2?p(Object(c),!0).forEach(function(b){(0,d.Z)(a,b,c[b])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(c)):p(Object(c)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(c,b))})}return a}({stretchX:!0,gap:2,dangerouslySetInnerHTML:{__html:(0,f.TU)(c,{baseUrl:g})},css:(b={"*":{maxWidth:"100%"},h1:{fontSize:48},h2:{fontSize:36},"h3,h4,h5,h6":{fontSize:24},"h1,h2,h3,h4,h5,h6,p":{color:"var(--color-fg".concat(h?2:1,")")},p:{fontSize:"var(--text-normal)",lineHeight:1.6,userSelect:"text"},"ul,ol":{color:"var(--color-fg".concat(h?2:1,")"),lineHeight:2,marginLeft:24},a:{color:"var(--color-highlight)"},"a:visited":{color:"var(--color-highlight)"},img:{borderRadius:8},video:{borderRadius:8},pre:{width:"100%",background:"var(--color-bg2)",borderRadius:8,boxShadow:"0 0 0 2px var(--color-outline)",display:"flex",userSelect:"text",code:{padding:16,width:"100%",overflowY:"auto"}},code:{userSelect:"text",fontFamily:"IBM Plex Mono",color:"var(--color-fg2)",background:"var(--color-bg2)",borderRadius:8,padding:"4px 8px"},"p > code":{padding:"2px 6px",borderRadius:8,background:"var(--color-bg2)"},"blockquote *":{fontStyle:"italic",color:"var(--color-fg3)"}},(0,d.Z)(b,".hljs-comment,.hljs-quote",{color:"var(--color-fg4)"}),(0,d.Z)(b,".hljs-variable,.hljs-template-variable,.hljs-tag,.hljs-name,.hljs-selector-id,.hljs-selector-class,.hljs-regexp,.hljs-link,.hljs-meta",{color:"#ef6155"}),(0,d.Z)(b,".hljs-number,.hljs-built_in,.hljs-builtin-name,.hljs-literal,.hljs-type,.hljs-params,.hljs-deletion",{color:"#f99b15"}),(0,d.Z)(b,".hljs-section,.hljs-attribute",{color:"#fec418"}),(0,d.Z)(b,".hljs-string,.hljs-symbol,.hljs-bullet,.hljs-addition",{color:"#48b685"}),(0,d.Z)(b,".hljs-keyword,.hljs-selector-tag",{color:"#815ba4"}),(0,d.Z)(b,".hljs-emphasis",{fontStyle:"italic"}),(0,d.Z)(b,".hljs-strong",{fontWeight:"bold"}),b)},i))}},3990:function(a,b,c){"use strict";var d=c(9499),e=c(6835),f=c(7294),g=c(1664),h=c(917),i=c(415),j=c(5280),k=c(9626),l=c(6247),m=c(5016),n=c(1115),o=c(1569),p=c(7728),q=c(7385),r=c(5944),s=(0,h.F4)("\n\t0% {\n\t\ttransform: scale(1);\n\t}\n\t5% {\n\t\ttransform: scale(1.1);\n\t}\n\t10% {\n\t\ttransform: scale(1);\n\t}\n"),t=function(a){var b=a.text,c=a.link;return(0,r.tZ)(g.default,{href:c,passHref:!0,children:(0,r.tZ)("a",{children:(0,r.tZ)(l.Z,{focusable:!0,padX:1,padY:0.5,rounded:!0,css:{cursor:"pointer",position:"relative",left:"-4px",":hover":{background:"var(--color-highlight)","> *":{color:"var(--color-fghl) !important"}}},children:(0,r.tZ)(m.Z,{color:2,children:b})})})})},u=function(){var a=(0,i.Z)("(max-width: ".concat(840,"px)")),b=f.useState(!1),c=(0,e.Z)(b,2),d=c[0],g=c[1];return(0,j.Z)(function(){g(!a)},[a]),a?(0,r.tZ)(o.Z,{handle:!0,height:"90%",expanded:d,setExpanded:g,children:(0,r.tZ)(v,{shrink:function(){return g(!1)}})}):(0,r.tZ)(l.Z,{stretchY:!0,bg:2,children:(0,r.tZ)(v,{shrink:function(){return g(!1)}})})},v=function(a){var b=a.shrink,c=f.useState(""),d=(0,e.Z)(c,2),h=d[0],i=d[1],j=q.N.reduce(function(a,b){var c=b.entries.filter(function(a){return!h||a.match(new RegExp(h,"i"))});return c.length>0?a.concat([[b.name,c]]):a},[]);return(0,r.tZ)(r.HY,{children:(0,r.BX)(l.Z,{dir:"column",gap:2,stretchY:!0,width:240,pad:3,css:{overflowX:"hidden",overflowY:"auto"},children:[(0,r.tZ)(l.Z,{}),(0,r.tZ)(function(){return(0,r.tZ)(g.default,{href:"/",passHref:!0,children:(0,r.tZ)("a",{children:(0,r.BX)(l.Z,{desc:"Back to home",rounded:!0,css:{cursor:"pointer"},children:[(0,r.tZ)("img",{src:"/site/img/boom.svg",alt:"boom",css:{position:"relative",width:"80%",left:"10%",animation:"".concat(s," 5s infinite")}}),(0,r.tZ)("img",{src:"/site/img/ka.svg",alt:"ka",css:{width:"90%",position:"absolute",left:"2px",top:"28px",animation:"".concat(s," 5s infinite"),animationDelay:"0.08s"}})]})})})},{}),(0,r.tZ)(p.Z,{width:160}),(0,r.BX)(l.Z,{gap:0.5,children:[(0,r.tZ)(t,{link:"/play",text:"PlayGround"}),(0,r.tZ)(t,{link:"/doc/intro",text:"Tutorial"}),(0,r.tZ)(t,{link:"/blog",text:"Blog"}),(0,r.tZ)(t,{link:"https://github.com/replit/kaboom",text:"GitHub"}),(0,r.tZ)(t,{link:"https://discord.com/invite/aQ6RuQm3TF",text:"Discord"})]}),(0,r.tZ)(n.Z,{value:h,onChange:i,placeholder:"Search in doc"}),j.map(function(a){var c=(0,e.Z)(a,2),d=c[0],f=c[1];return(0,r.BX)(l.Z,{stretchX:!0,gap:1,children:[(0,r.tZ)(m.Z,{size:"big",color:3,children:d}),(0,r.tZ)(l.Z,{children:f.map(function(a){var c,d,e,f=(null===(c=q.V.KaboomCtx[0].members[a])|| void 0===c?void 0:c[0])||(null===(d=q.V[a])|| void 0===d?void 0:d[0]);if(null===(e=f.jsDoc)|| void 0===e||!e.tags.deprecated){var g="MethodSignature"===f.kind||"FunctionDeclaration"===f.kind;return(0,r.tZ)("a",{href:"/#".concat(a),children:(0,r.tZ)(l.Z,{padX:1,padY:0.5,onClick:b,css:{cursor:"pointer",borderRadius:8,":hover":{background:"var(--color-bg3)"}},children:(0,r.BX)(m.Z,{color:2,code:!0,children:[a,g?"()":""]})})},a)}})})]},d)})]})})};b.Z=function(a){var b,c=a.children;return(0,r.tZ)(k.Z,{pad:3,css:(b={},(0,d.Z)(b,"@media (max-width: ".concat(640,"px)"),{padding:"0 !important",borderRadius:0}),(0,d.Z)(b,"@media (max-width: ".concat(840,"px)"),{paddingLeft:40}),b),children:(0,r.BX)(l.Z,{stretch:!0,dir:"row",align:"center",bg:1,rounded:!0,outlined:!0,css:(0,d.Z)({overflow:"hidden"},"@media (max-width: ".concat(640,"px)"),{borderRadius:0}),children:[(0,r.tZ)(u,{}),(0,r.tZ)(l.Z,{dir:"column",gap:3,stretchY:!0,css:(0,d.Z)({overflowX:"hidden",overflowY:"auto",padding:32,flex:"1"},"@media (max-width: ".concat(640,"px)"),{padding:24,paddingLeft:40}),children:c})]})})}},415:function(a,b,c){"use strict";c.d(b,{Z:function(){return f}});var d=c(6835),e=c(7294);function f(a){arguments.length>1&& void 0!==arguments[1]&&arguments[1];var b=e.useState(null),c=(0,d.Z)(b,2),f=c[0],g=c[1];return e.useEffect(function(){var b=window.matchMedia(a);return g(b.matches),b.onchange=function(){g(b.matches)},function(){b.onchange=null}},[]),f}},6509:function(a,b,c){"use strict";c.r(b),c.d(b,{"default":function(){return t}});var d=c(6835),e=c(7294),f=c(1664),g=c(917),h=c(2345),i=c(3990),j=c(6247),k=c(5016),l=c(803),m=c(1569),n=c(8499),o=c(415),p=c(7385),q=JSON.parse("[\"https://gush.amoniker.repl.co/\",\"https://lajbel.itch.io/dont-break-the-country\",\"https://lajbel.itch.io/monkeyrunps\",\"https://lajbel.itch.io/purple-egg\",\"https://freshjuices.itch.io/eggou\",\"https://satoshi-run.thenvn.repl.co/\",\"https://swilliamsio.itch.io/triple-threat\",\"https://achtaitaipai.itch.io/dodog\",\"https://tailpipe.larrystone.repl.co\",\"https://goliath.zekehernandez.repl.co\",\"https://meeting-woom.tessa.repl.co\"]"),r=c(5944),s=(0,g.F4)("\n\t0% {\n\t\tcolor: blue;\n\t}\n\t20% {\n\t\tcolor: orange;\n\t}\n\t40% {\n\t\tcolor: yellow;\n\t}\n\t60% {\n\t\tcolor: green;\n\t}\n\t80% {\n\t\tcolor: cyan;\n\t}\n\t100% {\n\t\tcolor: blue;\n\t}\n"),t=function(){var a=e.useState(null),b=(0,d.Z)(a,2),c=b[0],g=b[1],t=(0,o.Z)("(max-width: ".concat(840,"px)"));return(0,r.BX)(i.Z,{children:[(0,r.tZ)(h.Z,{title:"Kaboom",scale:0.8}),(0,r.tZ)(j.Z,{bg:3,outlined:!0,pad:2,rounded:!0,children:(0,r.BX)(k.Z,{children:["Kaboom v3000.0 beta released! Checkout ",(0,r.tZ)(f.default,{href:"https://3000.kaboomjs.com/blog/3000",children:"this article"})," for more info. View v3000 doc / examples ",(0,r.tZ)("a",{href:"http://3000.kaboomjs.com/",children:"here"}),"."]})}),(0,r.BX)(k.Z,{select:!0,size:"huge",color:1,children:["Kaboom is a Javascript game programming library that helps you make games fast and ",(0,r.tZ)(function(){return(0,r.tZ)("span",{onClick:function(){window.open(q[Math.floor(Math.random()*q.length)])},css:{":hover":{cursor:"pointer",animation:"".concat(s," 1s infinite linear")}},children:"fun"})},{}),"."]}),(0,r.tZ)(l.Z,{stretchX:!0,src:"\n```js\n// start the game\nkaboom()\n\n// load a default sprite\nloadBean()\n\n// add character to screen, from a list of components\nconst player = add([\n\tsprite(\"bean\"),  // renders as a sprite\n\tpos(120, 80),    // position in world\n\tarea(),          // has a collider\n\tbody(),          // responds to physics and gravity\n])\n\n// jump when player presses \"space\" key\nonKeyPress(\"space\", () => {\n\t// .jump() is provided by the body() component\n\tplayer.jump()\n})\n```\n\nPlay with it yourself or check out the examples in the [Playground](/play)!\n\t\t"}),p.N.map(function(a){return(0,r.BX)(j.Z,{stretchX:!0,gap:1,children:[(0,r.tZ)(k.Z,{size:"huge",color:3,id:a.name,children:a.name}),a.doc&&(0,r.tZ)(l.Z,{src:a.doc,dim:!0}),(0,r.tZ)(j.Z,{stretchX:!0,gap:3,children:a.entries.map(function(a){return(0,r.tZ)(n.Z,{id:a,name:a,anchor:a,typeref:g},a)})})]},a.name)}),Object.keys(p.V).map(function(a){if("KaboomCtx"!==a&&"kaboom"!==a)return(0,r.tZ)(n.Z,{id:a,name:a,anchor:a,typeref:g},a)}),(0,r.tZ)(m.Z,{dir:"right",pad:2,height:"64%",paneWidth:t?320:360,expanded:null!==c,setExpanded:function(a){!1===a&&g(null)},children:c&&(0,r.tZ)(n.Z,{anchor:c,onAnchor:function(){return g(null)},name:c,typeref:g})})]})}},5301:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(6509)}])}},function(a){a.O(0,[194,350,828,774,888,179],function(){return a(a.s=5301)}),_N_E=a.O()}])