!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("cursorify",[],t):"object"==typeof exports?exports.cursorify=t():e.cursorify=t()}(this,function(){return function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,r){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=0)}([function(e,t,o){e.exports=o(1)},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.deleteByCursor=t.setByCursor=t.getByCursor=t.createCursors=void 0;var n=o(2),u=r(n),f=o(3),i=r(f),y=o(4),c=r(y),l=o(5),a=r(l);t.createCursors=u.default,t.getByCursor=i.default,t.setByCursor=c.default,t.deleteByCursor=a.default},function(e,t,o){"use strict";function r(){var e={};return Object.defineProperty(e,"push",{enumerable:!1,value:function(t,o){if("object"!==(void 0===o?"undefined":n(o))&&"function"!=typeof o)throw new Error("you can only create cursors for objects and functions");if(void 0!==e[t])throw new Error("a cursor with name ["+t+"] already exists");return e[t]={name:t,value:o},o}}),e}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=r},function(e,t,o){"use strict";function r(e,t){e=e||{};var o=!0,u=!1,f=void 0;try{for(var i,y=Object.keys(e)[Symbol.iterator]();!(o=(i=y.next()).done);o=!0){var c=i.value,l=e[c];if(l===t.value)return l;if("object"===(void 0===l?"undefined":n(l))){var a=r(l,t);if(a)return a}}}catch(e){u=!0,f=e}finally{try{!o&&y.return&&y.return()}finally{if(u)throw f}}}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=r},function(e,t,o){"use strict";function r(e,t,o){e=e||{};var u=!0,f=!1,i=void 0;try{for(var y,c=Object.keys(e)[Symbol.iterator]();!(u=(y=c.next()).done);u=!0){var l=y.value,a=e[l];a===t.value?(t.value=o,e[l]=o):"object"===(void 0===a?"undefined":n(a))&&r(a,t,o)}}catch(e){f=!0,i=e}finally{try{!u&&c.return&&c.return()}finally{if(f)throw i}}}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=r},function(e,t,o){"use strict";function r(e,t){function o(e,t){e=e||{};var f=!0,i=!1,y=void 0;try{for(var c,l=Object.keys(e)[Symbol.iterator]();!(f=(c=l.next()).done);f=!0){var a=c.value,s=e[a];r=a,u=e,s===t.value?Array.isArray(u)?u.splice(a,1):delete u[r]:"object"===(void 0===s?"undefined":n(s))&&o(s,t)}}catch(e){i=!0,y=e}finally{try{!f&&l.return&&l.return()}finally{if(i)throw y}}}var r=void 0,u=void 0;o(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=r}])});
//# sourceMappingURL=dist.js.map