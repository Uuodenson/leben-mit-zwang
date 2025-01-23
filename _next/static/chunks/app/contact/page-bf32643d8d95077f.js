(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[977],{8990:(e,t,r)=>{Promise.resolve().then(r.bind(r,1869))},5551:(e,t)=>{"use strict";t.Y=function(e,t){return e.split(",").map(function(e){var t=(e=e.trim()).match(r),a=t[1],i=t[2],o=t[3]||"",c={};return c.inverse=!!a&&"not"===a.toLowerCase(),c.type=i?i.toLowerCase():"all",o=o.match(/\([^\)]+\)/g)||[],c.expressions=o.map(function(e){var t=e.match(n),r=t[1].toLowerCase().match(s);return{modifier:r[1],feature:r[2],value:t[2]}}),c}).some(function(e){var r=e.inverse,n="all"===e.type||t.type===e.type;if(n&&r||!(n||r))return!1;var s=e.expressions.every(function(e){var r=e.feature,n=e.modifier,s=e.value,a=t[r];if(!a)return!1;switch(r){case"orientation":case"scan":return a.toLowerCase()===s.toLowerCase();case"width":case"height":case"device-width":case"device-height":s=l(s),a=l(a);break;case"resolution":s=c(s),a=c(a);break;case"aspect-ratio":case"device-aspect-ratio":case"device-pixel-ratio":s=o(s),a=o(a);break;case"grid":case"color":case"color-index":case"monochrome":s=parseInt(s,10)||1,a=parseInt(a,10)||0}switch(n){case"min":return a>=s;case"max":return a<=s;default:return a===s}});return s&&!r||!s&&r})};var r=/(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,n=/\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,s=/^(?:(min|max)-)?(.+)/,a=/(em|rem|px|cm|mm|in|pt|pc)?$/,i=/(dpi|dpcm|dppx)?$/;function o(e){var t,r=Number(e);return r||(r=(t=e.match(/^(\d+)\s*\/\s*(\d+)$/))[1]/t[2]),r}function c(e){var t=parseFloat(e);switch(String(e).match(i)[1]){case"dpcm":return t/2.54;case"dppx":return 96*t;default:return t}}function l(e){var t=parseFloat(e);switch(String(e).match(a)[1]){case"em":case"rem":return 16*t;case"cm":return 96*t/2.54;case"mm":return 96*t/2.54/10;case"in":return 96*t;case"pt":return 72*t;case"pc":return 72*t/12;default:return t}}},8740:(e,t,r)=>{"use strict";var n=r(5551).Y,s="undefined"!=typeof window?window.matchMedia:null;function a(e,t,r){var a,i=this;function o(e){i.matches=e.matches,i.media=e.media}s&&!r&&(a=s.call(window,e)),a?(this.matches=a.matches,this.media=a.media,a.addListener(o)):(this.matches=n(e,t),this.media=e),this.addListener=function(e){a&&a.addListener(e)},this.removeListener=function(e){a&&a.removeListener(e)},this.dispose=function(){a&&a.removeListener(o)}}e.exports=function(e,t,r){return new a(e,t,r)}},5192:(e,t,r)=>{"use strict";var n=r(859);function s(){}function a(){}a.resetWarningCache=s,e.exports=function(){function e(e,t,r,s,a,i){if(i!==n){var o=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:s};return r.PropTypes=r,r}},1996:(e,t,r)=>{e.exports=r(5192)()},859:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},8190:(e,t,r)=>{"use strict";r.d(t,{Ub:()=>_});var n=r(2115),s=r(8740),a=r.n(s),i=/[A-Z]/g,o=/^ms-/,c={};function l(e){return"-"+e.toLowerCase()}let u=function(e){if(c.hasOwnProperty(e))return c[e];var t=e.replace(i,l);return c[e]=o.test(t)?"-"+t:t};var m=r(1996),h=r.n(m);let d=h().oneOfType([h().string,h().number]),p={all:h().bool,grid:h().bool,aural:h().bool,braille:h().bool,handheld:h().bool,print:h().bool,projection:h().bool,screen:h().bool,tty:h().bool,tv:h().bool,embossed:h().bool},{type:f,...b}={orientation:h().oneOf(["portrait","landscape"]),scan:h().oneOf(["progressive","interlace"]),aspectRatio:h().string,deviceAspectRatio:h().string,height:d,deviceHeight:d,width:d,deviceWidth:d,color:h().bool,colorIndex:h().bool,monochrome:h().bool,resolution:d,type:Object.keys(p)},x={minAspectRatio:h().string,maxAspectRatio:h().string,minDeviceAspectRatio:h().string,maxDeviceAspectRatio:h().string,minHeight:d,maxHeight:d,minDeviceHeight:d,maxDeviceHeight:d,minWidth:d,maxWidth:d,minDeviceWidth:d,maxDeviceWidth:d,minColor:h().number,maxColor:h().number,minColorIndex:h().number,maxColorIndex:h().number,minMonochrome:h().number,maxMonochrome:h().number,minResolution:d,maxResolution:d,...b};var v={all:{...p,...x}};let g=e=>`not ${e}`,y=(e,t)=>{let r=u(e);return("number"==typeof t&&(t=`${t}px`),!0===t)?r:!1===t?g(r):`(${r}: ${t})`},w=e=>e.join(" and "),j=e=>{let t=[];return Object.keys(v.all).forEach(r=>{let n=e[r];null!=n&&t.push(y(r,n))}),w(t)},k=(0,n.createContext)(void 0),C=e=>e.query||j(e),O=e=>{if(e)return Object.keys(e).reduce((t,r)=>(t[u(r)]=e[r],t),{})},L=()=>{let e=(0,n.useRef)(!1);return(0,n.useEffect)(()=>{e.current=!0},[]),e.current},N=e=>{let t=(0,n.useContext)(k),r=()=>O(e)||O(t),[s,a]=(0,n.useState)(r);return(0,n.useEffect)(()=>{let e=r();!function(e,t){if(e===t)return!0;if(!e||!t)return!1;let r=Object.keys(e),n=Object.keys(t),s=r.length;if(n.length!==s)return!1;for(let n=0;n<s;n++){let s=r[n];if(e[s]!==t[s]||!Object.prototype.hasOwnProperty.call(t,s))return!1}return!0}(s,e)&&a(e)},[e,t]),s},E=e=>{let t=()=>C(e),[r,s]=(0,n.useState)(t);return(0,n.useEffect)(()=>{let e=t();r!==e&&s(e)},[e]),r},S=(e,t)=>{let r=()=>a()(e,t||{},!!t),[s,i]=(0,n.useState)(r),o=L();return(0,n.useEffect)(()=>{if(o){let e=r();return i(e),()=>{e&&e.dispose()}}},[e,t]),s},I=e=>{let[t,r]=(0,n.useState)(e.matches);return(0,n.useEffect)(()=>{let t=e=>{r(e.matches)};return e.addListener(t),r(e.matches),()=>{e.removeListener(t)}},[e]),t},_=(e,t,r)=>{let s=N(t),a=E(e);if(!a)throw Error("Invalid or missing MediaQuery!");let i=S(a,s),o=I(i),c=L();return(0,n.useEffect)(()=>{c&&r&&r(o)},[o]),(0,n.useEffect)(()=>()=>{i&&i.dispose()},[]),o}},1869:(e,t,r)=>{"use strict";r.d(t,{Navbartop:()=>u});var n=r(5155),s=r(7439),a=r(399),i=r(8173),o=r.n(i),c=r(2115),l=r(8190);function u(){let e=(0,l.Ub)({query:"(max-width: 782px)"}),[t,r]=(0,c.useState)(!1),[i,u]=(0,c.useState)(!1),[m,h]=(0,c.useState)(!1),d=async()=>{(0,a.xI)(s.Q).onAuthStateChanged(async e=>{console.log(e),e&&h(!0)})};return(0,c.useEffect)(()=>{u(!0),d()},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("nav",{className:"bg-gray-800 p-4 rounded-b-2xl",children:[(0,n.jsxs)("div",{className:"container mx-auto flex justify-between items-center",children:[(0,n.jsx)(o(),{href:"/",className:"text-white text-lg font-bold",children:"Leben mit zwang"}),(0,n.jsxs)("div",{children:[e&&i&&(0,n.jsx)("div",{className:"flex items-center",children:(0,n.jsx)("button",{className:"text-white focus:outline-none",onClick:()=>r(!t),children:(0,n.jsx)("svg",{className:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16m-7 6h7"})})})}),!e&&i&&(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsx)(o(),{href:"/about",className:"text-white hover:text-gray-300",children:"\xdcber uns"}),(0,n.jsx)(o(),{href:"/services",className:"text-white hover:text-gray-300",children:"Angebote"}),(0,n.jsx)(o(),{href:"/contact",className:"text-white hover:text-gray-300",children:"Kontakt"})]})})]})]}),t&&e&&i&&(0,n.jsxs)("div",{className:"md:hidden",children:[(0,n.jsx)(o(),{href:"/about",className:"block text-white py-2 px-4 hover:bg-gray-700",children:"\xdcber uns"}),(0,n.jsx)(o(),{href:"/services",className:"block text-white py-2 px-4 hover:bg-gray-700",children:"Angebote"}),(0,n.jsx)(o(),{href:"/contact",className:"block text-white py-2 px-4 hover:bg-gray-700",children:"Kontakt"})]})]}),!m&&i&&(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("button",{className:"fixed bottom-0 right-1/2",onClick:()=>{window.location.href="/login"},children:"Log in"})})]})}},7439:(e,t,r)=>{"use strict";r.d(t,{Q:()=>a,db:()=>i});var n=r(9904),s=r(7058);let a=(0,n.Wp)({apiKey:"AIzaSyCcHErKKMChASKp7yLgBRH5xE_nwMIC7C8",authDomain:"lebem-mit-zwang.firebaseapp.com",projectId:"lebem-mit-zwang",storageBucket:"lebem-mit-zwang.firebasestorage.app",messagingSenderId:"408968648776",appId:"1:408968648776:web:4ce590ba59a7cb45bda07d",measurementId:"G-M3Z7D02S82"}),i=(0,s.aU)(a)}},e=>{var t=t=>e(e.s=t);e.O(0,[992,882,459,173,441,517,358],()=>t(8990)),_N_E=e.O()}]);