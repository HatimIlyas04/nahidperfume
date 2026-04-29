var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function te(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function ne(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function re(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,re(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+te(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),re(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+te(a,u),c+=re(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+te(a,u++),c+=re(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return re(ne(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ie(e,t,n){if(e==null)return e;var r=[],i=0;return re(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ae(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var A=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},j={map:ie,forEach:function(e,t,n){ie(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ie(e,function(){t++}),t},toArray:function(e){return ie(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=j,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ae}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,A)}catch(e){A(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.5`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&te(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&te(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,ee=k.port2;k.port1.onmessage=D,O=function(){ee.postMessage(null)}}else O=function(){_(D,0)};function te(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,te(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.5`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}var m=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),D=Symbol.for(`react.memo`),O=Symbol.for(`react.lazy`),k=Symbol.for(`react.activity`),ee=Symbol.for(`react.memo_cache_sentinel`),te=Symbol.iterator;function ne(e){return typeof e!=`object`||!e?null:(e=te&&e[te]||e[`@@iterator`],typeof e==`function`?e:null)}var re=Symbol.for(`react.client.reference`);function ie(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===re?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case k:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case D:return t=e.displayName||null,t===null?ie(e.type)||`Memo`:t;case O:t=e._payload,e=e._init;try{return ie(e(t))}catch{}}return null}var ae=Array.isArray,A=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,oe={pending:!1,data:null,method:null,action:null},se=[],ce=-1;function le(e){return{current:e}}function ue(e){0>ce||(e.current=se[ce],se[ce]=null,ce--)}function de(e,t){ce++,se[ce]=e.current,e.current=t}var fe=le(null),pe=le(null),me=le(null),he=le(null);function ge(e,t){switch(de(me,t),de(pe,e),de(fe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Ud(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Ud(t),e=Wd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ue(fe),de(fe,e)}function _e(){ue(fe),ue(pe),ue(me)}function ve(e){e.memoizedState!==null&&de(he,e);var t=fe.current,n=Wd(t,e.type);t!==n&&(de(pe,e),de(fe,n))}function ye(e){pe.current===e&&(ue(fe),ue(pe)),he.current===e&&(ue(he),ep._currentValue=oe)}var be,xe;function Se(e){if(be===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);be=t&&t[1]||``,xe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+be+e+xe}var Ce=!1;function we(e,t){if(!e||Ce)return``;Ce=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ce=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Se(n):``}function Te(e,t){switch(e.tag){case 26:case 27:case 5:return Se(e.type);case 16:return Se(`Lazy`);case 13:return e.child!==t&&t!==null?Se(`Suspense Fallback`):Se(`Suspense`);case 19:return Se(`SuspenseList`);case 0:case 15:return we(e.type,!1);case 11:return we(e.type.render,!1);case 1:return we(e.type,!0);case 31:return Se(`Activity`);default:return``}}function Ee(e){try{var t=``,n=null;do t+=Te(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var De=Object.prototype.hasOwnProperty,Oe=t.unstable_scheduleCallback,ke=t.unstable_cancelCallback,Ae=t.unstable_shouldYield,je=t.unstable_requestPaint,Me=t.unstable_now,Ne=t.unstable_getCurrentPriorityLevel,Pe=t.unstable_ImmediatePriority,Fe=t.unstable_UserBlockingPriority,Ie=t.unstable_NormalPriority,Le=t.unstable_LowPriority,Re=t.unstable_IdlePriority,ze=t.log,Be=t.unstable_setDisableYieldValue,Ve=null,He=null;function Ue(e){if(typeof ze==`function`&&Be(e),He&&typeof He.setStrictMode==`function`)try{He.setStrictMode(Ve,e)}catch{}}var We=Math.clz32?Math.clz32:qe,Ge=Math.log,Ke=Math.LN2;function qe(e){return e>>>=0,e===0?32:31-(Ge(e)/Ke|0)|0}var Je=256,Ye=262144,Xe=4194304;function Ze(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Qe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ze(n))):i=Ze(o):i=Ze(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ze(n))):i=Ze(o)):i=Ze(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function $e(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function et(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tt(){var e=Xe;return Xe<<=1,!(Xe&62914560)&&(Xe=4194304),e}function nt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function rt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function it(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-We(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&at(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function at(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-We(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ot(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-We(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function st(e,t){var n=t&-t;return n=n&42?1:ct(n),(n&(e.suspendedLanes|t))===0?n:0}function ct(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function lt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ut(){var e=j.p;return e===0?(e=window.event,e===void 0?32:gp(e.type)):e}function dt(e,t){var n=j.p;try{return j.p=e,t()}finally{j.p=n}}var ft=Math.random().toString(36).slice(2),pt=`__reactFiber$`+ft,mt=`__reactProps$`+ft,ht=`__reactContainer$`+ft,gt=`__reactEvents$`+ft,_t=`__reactListeners$`+ft,vt=`__reactHandles$`+ft,yt=`__reactResources$`+ft,bt=`__reactMarker$`+ft;function xt(e){delete e[pt],delete e[mt],delete e[gt],delete e[_t],delete e[vt]}function St(e){var t=e[pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ht]||n[pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=pf(e);e!==null;){if(n=e[pt])return n;e=pf(e)}return t}e=n,n=e.parentNode}return null}function Ct(e){if(e=e[pt]||e[ht]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Tt(e){var t=e[yt];return t||=e[yt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Et(e){e[bt]=!0}var Dt=new Set,Ot={};function kt(e,t){At(e,t),At(e+`Capture`,t)}function At(e,t){for(Ot[e]=t,e=0;e<t.length;e++)Dt.add(t[e])}var jt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Mt={},Nt={};function Pt(e){return De.call(Nt,e)?!0:De.call(Mt,e)?!1:jt.test(e)?Nt[e]=!0:(Mt[e]=!0,!1)}function Ft(e,t,n){if(Pt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function It(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Lt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Rt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Bt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vt(e){if(!e._valueTracker){var t=zt(e)?`checked`:`value`;e._valueTracker=Bt(e,t,``+e[t])}}function Ht(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=zt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ut(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Wt=/[\n"\\]/g;function Gt(e){return e.replace(Wt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Kt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Rt(t)):e.value!==``+Rt(t)&&(e.value=``+Rt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Jt(e,o,Rt(n)):Jt(e,o,Rt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Rt(s):e.removeAttribute(`name`)}function qt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Vt(e);return}n=n==null?``:``+Rt(n),t=t==null?n:``+Rt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Vt(e)}function Jt(e,t,n){t===`number`&&Ut(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Yt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Rt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Xt(e,t,n){if(t!=null&&(t=``+Rt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Rt(n)}function Zt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ae(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Rt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Vt(e)}function Qt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $t=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function en(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||$t.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function tn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&en(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&en(e,o,t[o])}function nn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var rn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),an=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function on(e){return an.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function sn(){}var cn=null;function ln(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var un=null,dn=null;function fn(e){var t=Ct(e);if(t&&(e=t.stateNode)){var n=e[mt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Kt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Gt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[mt]||null;if(!a)throw Error(i(90));Kt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ht(r)}break a;case`textarea`:Xt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Yt(e,!!n.multiple,t,!1)}}}var pn=!1;function mn(e,t,n){if(pn)return e(t,n);pn=!0;try{return e(t)}finally{if(pn=!1,(un!==null||dn!==null)&&(Su(),un&&(t=un,e=dn,dn=un=null,fn(t),e)))for(t=0;t<e.length;t++)fn(e[t])}}function hn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[mt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var gn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),_n=!1;if(gn)try{var vn={};Object.defineProperty(vn,`passive`,{get:function(){_n=!0}}),window.addEventListener(`test`,vn,vn),window.removeEventListener(`test`,vn,vn)}catch{_n=!1}var yn=null,bn=null,xn=null;function Sn(){if(xn)return xn;var e,t=bn,n=t.length,r,i=`value`in yn?yn.value:yn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return xn=i.slice(e,1<r?1-r:void 0)}function Cn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function wn(){return!0}function Tn(){return!1}function En(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?wn:Tn,this.isPropagationStopped=Tn,this}return m(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=wn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=wn)},persist:function(){},isPersistent:wn}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},On=En(Dn),kn=m({},Dn,{view:0,detail:0}),An=En(kn),jn,Mn,Nn,Pn=m({},kn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Nn&&(Nn&&e.type===`mousemove`?(jn=e.screenX-Nn.screenX,Mn=e.screenY-Nn.screenY):Mn=jn=0,Nn=e),jn)},movementY:function(e){return`movementY`in e?e.movementY:Mn}}),Fn=En(Pn),In=En(m({},Pn,{dataTransfer:0})),Ln=En(m({},kn,{relatedTarget:0})),Rn=En(m({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0})),zn=En(m({},Dn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Bn=En(m({},Dn,{data:0})),Vn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Hn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Un={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Wn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Un[e])?!!t[e]:!1}function Gn(){return Wn}var Kn=En(m({},kn,{key:function(e){if(e.key){var t=Vn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Cn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Hn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gn,charCode:function(e){return e.type===`keypress`?Cn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Cn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),qn=En(m({},Pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Jn=En(m({},kn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gn})),Yn=En(m({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Xn=En(m({},Pn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Zn=En(m({},Dn,{newState:0,oldState:0})),Qn=[9,13,27,32],$n=gn&&`CompositionEvent`in window,er=null;gn&&`documentMode`in document&&(er=document.documentMode);var tr=gn&&`TextEvent`in window&&!er,nr=gn&&(!$n||er&&8<er&&11>=er),rr=` `,ir=!1;function ar(e,t){switch(e){case`keyup`:return Qn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function or(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var sr=!1;function cr(e,t){switch(e){case`compositionend`:return or(t);case`keypress`:return t.which===32?(ir=!0,rr):null;case`textInput`:return e=t.data,e===rr&&ir?null:e;default:return null}}function lr(e,t){if(sr)return e===`compositionend`||!$n&&ar(e,t)?(e=Sn(),xn=bn=yn=null,sr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return nr&&t.locale!==`ko`?null:t.data;default:return null}}var ur={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ur[e.type]:t===`textarea`}function fr(e,t,n,r){un?dn?dn.push(r):dn=[r]:un=r,t=Od(t,`onChange`),0<t.length&&(n=new On(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var pr=null,mr=null;function hr(e){xd(e,0)}function gr(e){if(Ht(wt(e)))return e}function _r(e,t){if(e===`change`)return t}var vr=!1;if(gn){var yr;if(gn){var br=`oninput`in document;if(!br){var xr=document.createElement(`div`);xr.setAttribute(`oninput`,`return;`),br=typeof xr.oninput==`function`}yr=br}else yr=!1;vr=yr&&(!document.documentMode||9<document.documentMode)}function Sr(){pr&&(pr.detachEvent(`onpropertychange`,Cr),mr=pr=null)}function Cr(e){if(e.propertyName===`value`&&gr(mr)){var t=[];fr(t,mr,e,ln(e)),mn(hr,t)}}function wr(e,t,n){e===`focusin`?(Sr(),pr=t,mr=n,pr.attachEvent(`onpropertychange`,Cr)):e===`focusout`&&Sr()}function Tr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return gr(mr)}function Er(e,t){if(e===`click`)return gr(t)}function Dr(e,t){if(e===`input`||e===`change`)return gr(t)}function Or(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var kr=typeof Object.is==`function`?Object.is:Or;function Ar(e,t){if(kr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!De.call(t,i)||!kr(e[i],t[i]))return!1}return!0}function jr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mr(e,t){var n=jr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=jr(n)}}function Nr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ut(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ut(e.document)}return t}function Fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Ir=gn&&`documentMode`in document&&11>=document.documentMode,Lr=null,Rr=null,zr=null,Br=!1;function Vr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Br||Lr==null||Lr!==Ut(r)||(r=Lr,`selectionStart`in r&&Fr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zr&&Ar(zr,r)||(zr=r,r=Od(Rr,`onSelect`),0<r.length&&(t=new On(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Lr)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Ur={animationend:Hr(`Animation`,`AnimationEnd`),animationiteration:Hr(`Animation`,`AnimationIteration`),animationstart:Hr(`Animation`,`AnimationStart`),transitionrun:Hr(`Transition`,`TransitionRun`),transitionstart:Hr(`Transition`,`TransitionStart`),transitioncancel:Hr(`Transition`,`TransitionCancel`),transitionend:Hr(`Transition`,`TransitionEnd`)},Wr={},Gr={};gn&&(Gr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),`TransitionEvent`in window||delete Ur.transitionend.transition);function Kr(e){if(Wr[e])return Wr[e];if(!Ur[e])return e;var t=Ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gr)return Wr[e]=t[n];return e}var qr=Kr(`animationend`),Jr=Kr(`animationiteration`),Yr=Kr(`animationstart`),Xr=Kr(`transitionrun`),Zr=Kr(`transitionstart`),Qr=Kr(`transitioncancel`),$r=Kr(`transitionend`),ei=new Map,ti=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ti.push(`scrollEnd`);function ni(e,t){ei.set(e,t),kt(t,[e])}var ri=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ii=[],M=0,N=0;function ai(){for(var e=M,t=N=M=0;t<e;){var n=ii[t];ii[t++]=null;var r=ii[t];ii[t++]=null;var i=ii[t];ii[t++]=null;var a=ii[t];if(ii[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&li(n,i,a)}}function oi(e,t,n,r){ii[M++]=e,ii[M++]=t,ii[M++]=n,ii[M++]=r,N|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function si(e,t,n,r){return oi(e,t,n,r),ui(e)}function ci(e,t){return oi(e,null,null,t),ui(e)}function li(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-We(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ui(e){if(50<J)throw J=0,mu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var di={};function fi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pi(e,t,n,r){return new fi(e,t,n,r)}function mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function hi(e,t){var n=e.alternate;return n===null?(n=pi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function gi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function _i(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)mi(e)&&(s=1);else if(typeof e==`string`)s=Gf(e,n,fe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case k:return e=pi(31,n,t,a),e.elementType=k,e.lanes=o,e;case y:return vi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=pi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=pi(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=pi(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case D:s=14;break a;case O:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=pi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function vi(e,t,n,r){return e=pi(7,e,r,t),e.lanes=n,e}function yi(e,t,n){return e=pi(6,e,null,t),e.lanes=n,e}function bi(e){var t=pi(18,null,null,0);return t.stateNode=e,t}function xi(e,t,n){return t=pi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Si=new WeakMap;function Ci(e,t){if(typeof e==`object`&&e){var n=Si.get(e);return n===void 0?(t={value:e,source:t,stack:Ee(t)},Si.set(e,t),t):n}return{value:e,source:t,stack:Ee(t)}}var wi=[],Ti=0,Ei=null,Di=0,Oi=[],ki=0,Ai=null,ji=1,Mi=``;function Ni(e,t){wi[Ti++]=Di,wi[Ti++]=Ei,Ei=e,Di=t}function Pi(e,t,n){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,Ai=e;var r=ji;e=Mi;var i=32-We(r)-1;r&=~(1<<i),n+=1;var a=32-We(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ji=1<<32-We(t)+i|n<<i|r,Mi=a+e}else ji=1<<a|n<<i|r,Mi=e}function Fi(e){e.return!==null&&(Ni(e,1),Pi(e,1,0))}function Ii(e){for(;e===Ei;)Ei=wi[--Ti],wi[Ti]=null,Di=wi[--Ti],wi[Ti]=null;for(;e===Ai;)Ai=Oi[--ki],Oi[ki]=null,Mi=Oi[--ki],Oi[ki]=null,ji=Oi[--ki],Oi[ki]=null}function Li(e,t){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,ji=t.id,Mi=t.overflow,Ai=e}var Ri=null,zi=null,P=!1,Bi=null,Vi=!1,Hi=Error(i(519));function Ui(e){throw Yi(Ci(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Hi}function Wi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[pt]=e,t[mt]=r,n){case`dialog`:X(`cancel`,t),X(`close`,t);break;case`iframe`:case`object`:case`embed`:X(`load`,t);break;case`video`:case`audio`:for(n=0;n<yd.length;n++)X(yd[n],t);break;case`source`:X(`error`,t);break;case`img`:case`image`:case`link`:X(`error`,t),X(`load`,t);break;case`details`:X(`toggle`,t);break;case`input`:X(`invalid`,t),qt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:X(`invalid`,t);break;case`textarea`:X(`invalid`,t),Zt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Nd(t.textContent,n)?(r.popover!=null&&(X(`beforetoggle`,t),X(`toggle`,t)),r.onScroll!=null&&X(`scroll`,t),r.onScrollEnd!=null&&X(`scrollend`,t),r.onClick!=null&&(t.onclick=sn),t=!0):t=!1,t||Ui(e,!0)}function Gi(e){for(Ri=e.return;Ri;)switch(Ri.tag){case 5:case 31:case 13:Vi=!1;return;case 27:case 3:Vi=!0;return;default:Ri=Ri.return}}function Ki(e){if(e!==Ri)return!1;if(!P)return Gi(e),P=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Gd(e.type,e.memoizedProps)),n=!n),n&&zi&&Ui(e),Gi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));zi=ff(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));zi=ff(e)}else t===27?(t=zi,$d(e.type)?(e=df,df=null,zi=e):zi=t):zi=Ri?uf(e.stateNode.nextSibling):null;return!0}function qi(){zi=Ri=null,P=!1}function Ji(){var e=Bi;return e!==null&&(tu===null?tu=e:tu.push.apply(tu,e),Bi=null),e}function Yi(e){Bi===null?Bi=[e]:Bi.push(e)}var Xi=le(null),Zi=null,Qi=null;function $i(e,t,n){de(Xi,t._currentValue),t._currentValue=n}function ea(e){e._currentValue=Xi.current,ue(Xi)}function ta(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function na(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ta(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ta(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ra(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;kr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===he.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[ep]:e.push(ep))}a=a.return}e!==null&&na(t,e,n,r),t.flags|=262144}function ia(e){for(e=e.firstContext;e!==null;){if(!kr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function aa(e){Zi=e,Qi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function oa(e){return ca(Zi,e)}function sa(e,t){return Zi===null&&aa(e),ca(e,t)}function ca(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Qi===null){if(e===null)throw Error(i(308));Qi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Qi=Qi.next=t;return n}var la=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ua=t.unstable_scheduleCallback,da=t.unstable_NormalPriority,fa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pa(){return{controller:new la,data:new Map,refCount:0}}function ma(e){e.refCount--,e.refCount===0&&ua(da,function(){e.controller.abort()})}var ha=null,ga=0,_a=0,va=null;function ya(e,t){if(ha===null){var n=ha=[];ga=0,_a=pd(),va={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ga++,t.then(ba,ba),t}function ba(){if(--ga===0&&ha!==null){va!==null&&(va.status=`fulfilled`);var e=ha;ha=null,_a=0,va=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function xa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Sa=A.S;A.S=function(e,t){iu=Me(),typeof t==`object`&&t&&typeof t.then==`function`&&ya(e,t),Sa!==null&&Sa(e,t)};var Ca=le(null);function wa(){var e=Ca.current;return e===null?Vl.pooledCache:e}function Ta(e,t){t===null?de(Ca,Ca.current):de(Ca,t.pool)}function Ea(){var e=wa();return e===null?null:{parent:fa._currentValue,pool:e}}var Da=Error(i(460)),Oa=Error(i(474)),ka=Error(i(542)),Aa={then:function(){}};function ja(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ma(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(sn,sn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e;default:if(typeof t.status==`string`)t.then(sn,sn);else{if(e=Vl,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e}throw Pa=t,Da}}function Na(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Pa=e,Da):e}}var Pa=null;function Fa(){if(Pa===null)throw Error(i(459));var e=Pa;return Pa=null,e}function Ia(e){if(e===Da||e===ka)throw Error(i(483))}var La=null,Ra=0;function za(e){var t=Ra;return Ra+=1,La===null&&(La=[]),Ma(La,e,t)}function Ba(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Va(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ha(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=hi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=yi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===O&&Na(i)===t.type)?(t=a(t,n.props),Ba(t,n),t.return=e,t):(t=_i(n.type,n.key,n.props,null,e.mode,r),Ba(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=xi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=vi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=yi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=_i(t.type,t.key,t.props,null,e.mode,n),Ba(n,t),n.return=e,n;case v:return t=xi(t,e.mode,n),t.return=e,t;case O:return t=Na(t),f(e,t,n)}if(ae(t)||ne(t))return t=vi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,za(t),n);if(t.$$typeof===C)return f(e,sa(e,t),n);Va(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case O:return n=Na(n),p(e,t,n,r)}if(ae(n)||ne(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,za(n),r);if(n.$$typeof===C)return p(e,t,sa(e,n),r);Va(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case O:return r=Na(r),m(e,t,n,r,i)}if(ae(r)||ne(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,za(r),i);if(r.$$typeof===C)return m(e,t,n,sa(t,r),i);Va(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),P&&Ni(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return P&&Ni(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),P&&Ni(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),P&&Ni(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return P&&Ni(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),P&&Ni(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===O&&Na(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ba(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=vi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=_i(o.type,o.key,o.props,null,e.mode,c),Ba(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=xi(o,e.mode,c),c.return=e,e=c}return s(e);case O:return o=Na(o),b(e,r,o,c)}if(ae(o))return h(e,r,o,c);if(ne(o)){if(l=ne(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,za(o),c);if(o.$$typeof===C)return b(e,r,sa(e,o),c);Va(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=yi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Ra=0;var i=b(e,t,n,r);return La=null,i}catch(t){if(t===Da||t===ka)throw t;var a=pi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ua=Ha(!0),F=Ha(!1),Wa=!1;function I(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ga(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ka(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function qa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ui(e),li(e,null,n),t}return oi(e,r,t,n),ui(e)}function Ja(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}function Ya(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Xa=!1;function Za(){if(Xa){var e=va;if(e!==null)throw e}}function Qa(e,t,n,r){Xa=!1;var i=e.updateQueue;Wa=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(K&f)===f:(r&f)===f){f!==0&&f===_a&&(Xa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,f);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,f=typeof h==`function`?h.call(_,d,f):h,f==null)break a;d=m({},d,f);break a;case 2:Wa=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Yl|=o,e.lanes=o,e.memoizedState=d}}function $a(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function eo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)$a(n[e],t)}var to=le(null),no=le(0);function ro(e,t){e=ql,de(no,e),de(to,t),ql=e|t.baseLanes}function io(){de(no,ql),de(to,to.current)}function ao(){ql=no.current,ue(to),ue(no)}var oo=le(null),so=null;function co(e){var t=e.alternate;de(mo,mo.current&1),de(oo,e),so===null&&(t===null||to.current!==null||t.memoizedState!==null)&&(so=e)}function lo(e){de(mo,mo.current),de(oo,e),so===null&&(so=e)}function uo(e){e.tag===22?(de(mo,mo.current),de(oo,e),so===null&&(so=e)):fo(e)}function fo(){de(mo,mo.current),de(oo,oo.current)}function po(e){ue(oo),so===e&&(so=null),ue(mo)}var mo=le(0);function ho(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||sf(n)||cf(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var go=0,L=null,_o=null,vo=null,yo=!1,bo=!1,xo=!1,So=0,Co=0,wo=null,To=0;function Eo(){throw Error(i(321))}function Do(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!kr(e[n],t[n]))return!1;return!0}function Oo(e,t,n,r,i,a){return go=a,L=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?Us:Ws,xo=!1,a=n(r,i),xo=!1,bo&&(a=Ao(t,n,r,i)),ko(e),a}function ko(e){A.H=Hs;var t=_o!==null&&_o.next!==null;if(go=0,vo=_o=L=null,yo=!1,Co=0,wo=null,t)throw Error(i(300));e===null||sc||(e=e.dependencies,e!==null&&ia(e)&&(sc=!0))}function Ao(e,t,n,r){L=e;var a=0;do{if(bo&&(wo=null),Co=0,bo=!1,25<=a)throw Error(i(301));if(a+=1,vo=_o=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}A.H=Gs,o=t(n,r)}while(bo);return o}function jo(){var e=A.H,t=e.useState()[0];return t=typeof t.then==`function`?Ro(t):t,e=e.useState()[0],(_o===null?null:_o.memoizedState)!==e&&(L.flags|=1024),t}function Mo(){var e=So!==0;return So=0,e}function No(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Po(e){if(yo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}yo=!1}go=0,vo=_o=L=null,bo=!1,Co=So=0,wo=null}function Fo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return vo===null?L.memoizedState=vo=e:vo=vo.next=e,vo}function Io(){if(_o===null){var e=L.alternate;e=e===null?null:e.memoizedState}else e=_o.next;var t=vo===null?L.memoizedState:vo.next;if(t!==null)vo=t,_o=e;else{if(e===null)throw L.alternate===null?Error(i(467)):Error(i(310));_o=e,e={memoizedState:_o.memoizedState,baseState:_o.baseState,baseQueue:_o.baseQueue,queue:_o.queue,next:null},vo===null?L.memoizedState=vo=e:vo=vo.next=e}return vo}function Lo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ro(e){var t=Co;return Co+=1,wo===null&&(wo=[]),e=Ma(wo,e,t),t=L,(vo===null?t.memoizedState:vo.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?Us:Ws),e}function zo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Ro(e);if(e.$$typeof===C)return oa(e)}throw Error(i(438,String(e)))}function Bo(e){var t=null,n=L.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=L.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Lo(),L.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ee;return t.index++,n}function Vo(e,t){return typeof t==`function`?t(e):t}function Ho(e){return R(Io(),_o,e)}function R(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(go&f)===f:(K&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===_a&&(d=!0);else if((go&p)===p){u=u.next,p===_a&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,L.lanes|=p,Yl|=p;f=u.action,xo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,L.lanes|=f,Yl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!kr(o,e.memoizedState)&&(sc=!0,d&&(n=va,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Uo(e){var t=Io(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);kr(o,t.memoizedState)||(sc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Wo(e,t,n){var r=L,a=Io(),o=P;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!kr((_o||a).memoizedState,n);if(s&&(a.memoizedState=n,sc=!0),a=a.queue,ms(qo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||vo!==null&&vo.memoizedState.tag&1){if(r.flags|=2048,us(9,{destroy:void 0},Ko.bind(null,r,a,n,t),null),Vl===null)throw Error(i(349));o||go&127||Go(r,t,n)}return n}function Go(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=L.updateQueue,t===null?(t=Lo(),L.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ko(e,t,n,r){t.value=n,t.getSnapshot=r,Jo(t)&&Yo(e)}function qo(e,t,n){return n(function(){Jo(t)&&Yo(e)})}function Jo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!kr(e,n)}catch{return!0}}function Yo(e){var t=ci(e,2);t!==null&&_u(t,e,2)}function Xo(e){var t=Fo();if(typeof e==`function`){var n=e;if(e=n(),xo){Ue(!0);try{n()}finally{Ue(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:e},t}function Zo(e,t,n,r){return e.baseState=n,R(e,_o,typeof r==`function`?r:Vo)}function Qo(e,t,n,r,a){if(zs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};A.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,$o(t,o)):(o.next=n.next,t.pending=n.next=o)}}function $o(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=A.T,o={};A.T=o;try{var s=n(i,r),c=A.S;c!==null&&c(o,s),es(e,t,s)}catch(n){ns(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),A.T=a}}else try{a=n(i,r),es(e,t,a)}catch(n){ns(e,t,n)}}function es(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ts(e,t,n)},function(n){return ns(e,t,n)}):ts(e,t,n)}function ts(e,t,n){t.status=`fulfilled`,t.value=n,rs(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,$o(e,n)))}function ns(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,rs(t),t=t.next;while(t!==r)}e.action=null}function rs(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function is(e,t){return t}function as(e,t){if(P){var n=Vl.formState;if(n!==null){a:{var r=L;if(P){if(zi){b:{for(var i=zi,a=Vi;i.nodeType!==8;){if(!a){i=null;break b}if(i=uf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){zi=uf(i.nextSibling),r=i.data===`F!`;break a}}Ui(r)}r=!1}r&&(t=n[0])}}return n=Fo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:is,lastRenderedState:t},n.queue=r,n=Is.bind(null,L,r),r.dispatch=n,r=Xo(!1),a=Rs.bind(null,L,!1,r.queue),r=Fo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Qo.bind(null,L,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function os(e){return ss(Io(),_o,e)}function ss(e,t,n){if(t=R(e,t,is)[0],e=Ho(Vo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Ro(t)}catch(e){throw e===Da?ka:e}else r=t;t=Io();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(L.flags|=2048,us(9,{destroy:void 0},cs.bind(null,i,n),null)),[r,a,e]}function cs(e,t){e.action=t}function ls(e){var t=Io(),n=_o;if(n!==null)return ss(t,n,e);Io(),t=t.memoizedState,n=Io();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function us(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=L.updateQueue,t===null&&(t=Lo(),L.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ds(){return Io().memoizedState}function fs(e,t,n,r){var i=Fo();L.flags|=e,i.memoizedState=us(1|t,{destroy:void 0},n,r===void 0?null:r)}function z(e,t,n,r){var i=Io();r=r===void 0?null:r;var a=i.memoizedState.inst;_o!==null&&r!==null&&Do(r,_o.memoizedState.deps)?i.memoizedState=us(t,a,n,r):(L.flags|=e,i.memoizedState=us(1|t,a,n,r))}function ps(e,t){fs(8390656,8,e,t)}function ms(e,t){z(2048,8,e,t)}function hs(e){L.flags|=4;var t=L.updateQueue;if(t===null)t=Lo(),L.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function gs(e){var t=Io().memoizedState;return hs({ref:t,nextImpl:e}),function(){if(W&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function _s(e,t){return z(4,2,e,t)}function vs(e,t){return z(4,4,e,t)}function ys(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bs(e,t,n){n=n==null?null:n.concat([e]),z(4,4,ys.bind(null,t,e),n)}function xs(){}function Ss(e,t){var n=Io();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Do(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cs(e,t){var n=Io();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Do(t,r[1]))return r[0];if(r=e(),xo){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r}function ws(e,t,n){return n===void 0||go&1073741824&&!(K&261930)?e.memoizedState=t:(e.memoizedState=n,e=gu(),L.lanes|=e,Yl|=e,n)}function Ts(e,t,n,r){return kr(n,t)?n:to.current===null?!(go&42)||go&1073741824&&!(K&261930)?(sc=!0,e.memoizedState=n):(e=gu(),L.lanes|=e,Yl|=e,t):(e=ws(e,n,r),kr(e,t)||(sc=!0),e)}function Es(e,t,n,r,i){var a=j.p;j.p=a!==0&&8>a?a:8;var o=A.T,s={};A.T=s,Rs(e,!1,t,n);try{var c=i(),l=A.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ls(e,t,xa(c,r),hu(e)):Ls(e,t,r,hu(e))}catch(n){Ls(e,t,{then:function(){},status:`rejected`,reason:n},hu())}finally{j.p=a,o!==null&&s.types!==null&&(o.types=s.types),A.T=o}}function Ds(){}function Os(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ks(e).queue;Es(e,a,t,oe,n===null?Ds:function(){return As(e),n(r)})}function ks(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:oe,baseState:oe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:oe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function As(e){var t=ks(e);t.next===null&&(t=e.alternate.memoizedState),Ls(e,t.next.queue,{},hu())}function js(){return oa(ep)}function Ms(){return Io().memoizedState}function Ns(){return Io().memoizedState}function Ps(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=hu();e=Ka(n);var r=qa(t,e,n);r!==null&&(_u(r,t,n),Ja(r,t,n)),t={cache:pa()},e.payload=t;return}t=t.return}}function Fs(e,t,n){var r=hu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},zs(e)?Bs(t,n):(n=si(e,t,n,r),n!==null&&(_u(n,e,r),Vs(n,t,r)))}function Is(e,t,n){Ls(e,t,n,hu())}function Ls(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(zs(e))Bs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,kr(s,o))return oi(e,t,i,0),Vl===null&&ai(),!1}catch{}if(n=si(e,t,i,r),n!==null)return _u(n,e,r),Vs(n,t,r),!0}return!1}function Rs(e,t,n,r){if(r={lane:2,revertLane:pd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},zs(e)){if(t)throw Error(i(479))}else t=si(e,n,r,2),t!==null&&_u(t,e,2)}function zs(e){var t=e.alternate;return e===L||t!==null&&t===L}function Bs(e,t){bo=yo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}var Hs={readContext:oa,use:zo,useCallback:Eo,useContext:Eo,useEffect:Eo,useImperativeHandle:Eo,useLayoutEffect:Eo,useInsertionEffect:Eo,useMemo:Eo,useReducer:Eo,useRef:Eo,useState:Eo,useDebugValue:Eo,useDeferredValue:Eo,useTransition:Eo,useSyncExternalStore:Eo,useId:Eo,useHostTransitionStatus:Eo,useFormState:Eo,useActionState:Eo,useOptimistic:Eo,useMemoCache:Eo,useCacheRefresh:Eo};Hs.useEffectEvent=Eo;var Us={readContext:oa,use:zo,useCallback:function(e,t){return Fo().memoizedState=[e,t===void 0?null:t],e},useContext:oa,useEffect:ps,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),fs(4194308,4,ys.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fs(4194308,4,e,t)},useInsertionEffect:function(e,t){fs(4,2,e,t)},useMemo:function(e,t){var n=Fo();t=t===void 0?null:t;var r=e();if(xo){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Fo();if(n!==void 0){var i=n(t);if(xo){Ue(!0);try{n(t)}finally{Ue(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Fs.bind(null,L,e),[r.memoizedState,e]},useRef:function(e){var t=Fo();return e={current:e},t.memoizedState=e},useState:function(e){e=Xo(e);var t=e.queue,n=Is.bind(null,L,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:xs,useDeferredValue:function(e,t){return ws(Fo(),e,t)},useTransition:function(){var e=Xo(!1);return e=Es.bind(null,L,e.queue,!0,!1),Fo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=L,a=Fo();if(P){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Vl===null)throw Error(i(349));K&127||Go(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ps(qo.bind(null,r,o,e),[e]),r.flags|=2048,us(9,{destroy:void 0},Ko.bind(null,r,o,n,t),null),n},useId:function(){var e=Fo(),t=Vl.identifierPrefix;if(P){var n=Mi,r=ji;n=(r&~(1<<32-We(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=So++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=To++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:js,useFormState:as,useActionState:as,useOptimistic:function(e){var t=Fo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Rs.bind(null,L,!0,n),n.dispatch=t,[e,t]},useMemoCache:Bo,useCacheRefresh:function(){return Fo().memoizedState=Ps.bind(null,L)},useEffectEvent:function(e){var t=Fo(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Ws={readContext:oa,use:zo,useCallback:Ss,useContext:oa,useEffect:ms,useImperativeHandle:bs,useInsertionEffect:_s,useLayoutEffect:vs,useMemo:Cs,useReducer:Ho,useRef:ds,useState:function(){return Ho(Vo)},useDebugValue:xs,useDeferredValue:function(e,t){return Ts(Io(),_o.memoizedState,e,t)},useTransition:function(){var e=Ho(Vo)[0],t=Io().memoizedState;return[typeof e==`boolean`?e:Ro(e),t]},useSyncExternalStore:Wo,useId:Ms,useHostTransitionStatus:js,useFormState:os,useActionState:os,useOptimistic:function(e,t){return Zo(Io(),_o,e,t)},useMemoCache:Bo,useCacheRefresh:Ns};Ws.useEffectEvent=gs;var Gs={readContext:oa,use:zo,useCallback:Ss,useContext:oa,useEffect:ms,useImperativeHandle:bs,useInsertionEffect:_s,useLayoutEffect:vs,useMemo:Cs,useReducer:Uo,useRef:ds,useState:function(){return Uo(Vo)},useDebugValue:xs,useDeferredValue:function(e,t){var n=Io();return _o===null?ws(n,e,t):Ts(n,_o.memoizedState,e,t)},useTransition:function(){var e=Uo(Vo)[0],t=Io().memoizedState;return[typeof e==`boolean`?e:Ro(e),t]},useSyncExternalStore:Wo,useId:Ms,useHostTransitionStatus:js,useFormState:ls,useActionState:ls,useOptimistic:function(e,t){var n=Io();return _o===null?(n.baseState=e,[e,n.queue.dispatch]):Zo(n,_o,e,t)},useMemoCache:Bo,useCacheRefresh:Ns};Gs.useEffectEvent=gs;function Ks(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:m({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var qs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=hu(),i=Ka(r);i.payload=t,n!=null&&(i.callback=n),t=qa(e,i,r),t!==null&&(_u(t,e,r),Ja(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=hu(),i=Ka(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=qa(e,i,r),t!==null&&(_u(t,e,r),Ja(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=hu(),r=Ka(n);r.tag=2,t!=null&&(r.callback=t),t=qa(e,r,n),t!==null&&(_u(t,e,n),Ja(t,e,n))}};function Js(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ar(n,r)||!Ar(i,a):!0}function Ys(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&qs.enqueueReplaceState(t,t.state,null)}function Xs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=m({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Zs(e){ri(e)}function Qs(e){console.error(e)}function $s(e){ri(e)}function ec(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function nc(e,t,n){return n=Ka(n),n.tag=3,n.payload={element:null},n.callback=function(){ec(e,t)},n}function rc(e){return e=Ka(e),e.tag=3,e}function ic(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){tc(t,n,r),typeof i!=`function`&&(su===null?su=new Set([this]):su.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ac(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ra(t,n,a,!0),n=oo.current,n!==null){switch(n.tag){case 31:case 13:return so===null?ku():n.alternate===null&&Jl===0&&(Jl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),qu(e,r,a)),!1;case 22:return n.flags|=65536,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),qu(e,r,a)),!1}throw Error(i(435,n.tag))}return qu(e,r,a),ku(),!1}if(P)return t=oo.current,t===null?(r!==Hi&&(t=Error(i(423),{cause:r}),Yi(Ci(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ci(r,n),a=nc(e.stateNode,r,a),Ya(e,a),Jl!==4&&(Jl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Hi&&(e=Error(i(422),{cause:r}),Yi(Ci(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ci(o,n),eu===null?eu=[o]:eu.push(o),Jl!==4&&(Jl=2),t===null)return!0;r=Ci(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=nc(n.stateNode,r,e),Ya(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(su===null||!su.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=rc(a),ic(a,e,n,r),Ya(n,a),!1}n=n.return}while(n!==null);return!1}var oc=Error(i(461)),sc=!1;function cc(e,t,n,r){t.child=e===null?F(t,null,n,r):Ua(t,e.child,n,r)}function lc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return aa(t),r=Oo(e,t,n,o,a,i),s=Mo(),e!==null&&!sc?(No(e,t,i),Nc(e,t,i)):(P&&s&&Fi(t),t.flags|=1,cc(e,t,r,i),t.child)}function uc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,dc(e,t,a,r,i)):(e=_i(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Pc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ar:n,n(o,r)&&e.ref===t.ref)return Nc(e,t,i)}return t.flags|=1,e=hi(a,r),e.ref=t.ref,e.return=t,t.child=e}function dc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ar(a,r)&&e.ref===t.ref)if(sc=!1,t.pendingProps=r=a,Pc(e,i))e.flags&131072&&(sc=!0);else return t.lanes=e.lanes,Nc(e,t,i)}return yc(e,t,n,r,i)}function fc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return mc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ta(t,a===null?null:a.cachePool),a===null?io():ro(t,a),uo(t);else return r=t.lanes=536870912,mc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ta(t,null),io(),fo(t)):(Ta(t,a.cachePool),ro(t,a),fo(t),t.memoizedState=null);return cc(e,t,i,n),t.child}function pc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function mc(e,t,n,r,i){var a=wa();return a=a===null?null:{parent:fa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ta(t,null),io(),uo(t),e!==null&&ra(e,t,r,!0),t.childLanes=i,null}function hc(e,t){return t=Oc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function gc(e,t,n){return Ua(t,e.child,null,n),e=hc(t,t.pendingProps),e.flags|=2,po(t),t.memoizedState=null,e}function _c(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(P){if(r.mode===`hidden`)return e=hc(t,r),t.lanes=536870912,pc(null,e);if(lo(t),(e=zi)?(e=of(e,Vi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,Ri=t,zi=null)):e=null,e===null)throw Ui(t);return t.lanes=536870912,null}return hc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(lo(t),a)if(t.flags&256)t.flags&=-257,t=gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(sc||ra(e,t,n,!1),a=(n&e.childLanes)!==0,sc||a){if(r=Vl,r!==null&&(s=st(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ci(e,s),_u(r,e,s),oc;ku(),t=gc(e,t,n)}else e=o.treeContext,zi=uf(s.nextSibling),Ri=t,P=!0,Bi=null,Vi=!1,e!==null&&Li(t,e),t=hc(t,r),t.flags|=4096;return t}return e=hi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function vc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function yc(e,t,n,r,i){return aa(t),n=Oo(e,t,n,r,void 0,i),r=Mo(),e!==null&&!sc?(No(e,t,i),Nc(e,t,i)):(P&&r&&Fi(t),t.flags|=1,cc(e,t,n,i),t.child)}function bc(e,t,n,r,i,a){return aa(t),t.updateQueue=null,n=Ao(t,r,n,i),ko(e),r=Mo(),e!==null&&!sc?(No(e,t,a),Nc(e,t,a)):(P&&r&&Fi(t),t.flags|=1,cc(e,t,n,a),t.child)}function xc(e,t,n,r,i){if(aa(t),t.stateNode===null){var a=di,o=n.contextType;typeof o==`object`&&o&&(a=oa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=qs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},I(t),o=n.contextType,a.context=typeof o==`object`&&o?oa(o):di,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ks(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&qs.enqueueReplaceState(a,a.state,null),Qa(t,r,a,i),Za(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Xs(n,s);a.props=c;var l=a.context,u=n.contextType;o=di,typeof u==`object`&&u&&(o=oa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ys(t,a,r,o),Wa=!1;var f=t.memoizedState;a.state=f,Qa(t,r,a,i),Za(),l=t.memoizedState,s||f!==l||Wa?(typeof d==`function`&&(Ks(t,n,d,r),l=t.memoizedState),(c=Wa||Js(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ga(e,t),o=t.memoizedProps,u=Xs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=di,typeof l==`object`&&l&&(c=oa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ys(t,a,r,c),Wa=!1,f=t.memoizedState,a.state=f,Qa(t,r,a,i),Za();var p=t.memoizedState;o!==d||f!==p||Wa||e!==null&&e.dependencies!==null&&ia(e.dependencies)?(typeof s==`function`&&(Ks(t,n,s,r),p=t.memoizedState),(u=Wa||Js(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ia(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,vc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ua(t,e.child,null,i),t.child=Ua(t,null,n,i)):cc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Nc(e,t,i),e}function Sc(e,t,n,r){return qi(),t.flags|=256,cc(e,t,n,r),t.child}var Cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function wc(e){return{baseLanes:e,cachePool:Ea()}}function Tc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Ql),e}function Ec(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(mo.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(P){if(a?co(t):fo(t),(e=zi)?(e=of(e,Vi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,Ri=t,zi=null)):e=null,e===null)throw Ui(t);return cf(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(fo(t),a=t.mode,c=Oc({mode:`hidden`,children:c},a),r=vi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=wc(n),r.childLanes=Tc(e,s,n),t.memoizedState=Cc,pc(null,r)):(co(t),Dc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(co(t),t.flags&=-257,t=kc(e,t,n)):t.memoizedState===null?(fo(t),c=r.fallback,a=t.mode,r=Oc({mode:`visible`,children:r.children},a),c=vi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ua(t,e.child,null,n),r=t.child,r.memoizedState=wc(n),r.childLanes=Tc(e,s,n),t.memoizedState=Cc,t=pc(null,r)):(fo(t),t.child=e.child,t.flags|=128,t=null);else if(co(t),cf(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Yi({value:r,source:null,stack:null}),t=kc(e,t,n)}else if(sc||ra(e,t,n,!1),s=(n&e.childLanes)!==0,sc||s){if(s=Vl,s!==null&&(r=st(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ci(e,r),_u(s,e,r),oc;sf(c)||ku(),t=kc(e,t,n)}else sf(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,zi=uf(c.nextSibling),Ri=t,P=!0,Bi=null,Vi=!1,e!==null&&Li(t,e),t=Dc(t,r.children),t.flags|=4096);return t}return a?(fo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=hi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=vi(c,a,n,null),c.flags|=2):c=hi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,pc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=wc(n):(a=c.cachePool,a===null?a=Ea():(l=fa._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=Tc(e,s,n),t.memoizedState=Cc,pc(e.child,r)):(co(t),n=e.child,e=n.sibling,n=hi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Dc(e,t){return t=Oc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Oc(e,t){return e=pi(22,e,null,t),e.lanes=0,e}function kc(e,t,n){return Ua(t,e.child,null,n),e=Dc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ac(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ta(e.return,t,n)}function jc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Mc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=mo.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,de(mo,o),cc(e,t,r,n),r=P?Di:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ac(e,n,t);else if(e.tag===19)Ac(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ho(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),jc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ho(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}jc(t,!0,n,null,a,r);break;case`together`:jc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Nc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Yl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(ra(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=hi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=hi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Pc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&ia(e))):!0}function Fc(e,t,n){switch(t.tag){case 3:ge(t,t.stateNode.containerInfo),$i(t,fa,e.memoizedState.cache),qi();break;case 27:case 5:ve(t);break;case 4:ge(t,t.stateNode.containerInfo);break;case 10:$i(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,lo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(co(t),e=Nc(e,t,n),e===null?null:e.sibling):Ec(e,t,n):(co(t),t.flags|=128,null);co(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(ra(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Mc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),de(mo,mo.current),r)break;return null;case 22:return t.lanes=0,fc(e,t,n,t.pendingProps);case 24:$i(t,fa,e.memoizedState.cache)}return Nc(e,t,n)}function Ic(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)sc=!0;else{if(!Pc(e,n)&&!(t.flags&128))return sc=!1,Fc(e,t,n);sc=!!(e.flags&131072)}else sc=!1,P&&t.flags&1048576&&Pi(t,Di,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Na(t.elementType),t.type=e,typeof e==`function`)mi(e)?(r=Xs(e,r),t.tag=1,t=xc(null,t,e,r,n)):(t.tag=0,t=yc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=lc(null,t,e,r,n);break a}else if(a===D){t.tag=14,t=uc(null,t,e,r,n);break a}}throw t=ie(e)||e,Error(i(306,t,``))}}return t;case 0:return yc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Xs(r,t.pendingProps),xc(e,t,r,a,n);case 3:a:{if(ge(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ga(e,t),Qa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,$i(t,fa,r),r!==o.cache&&na(t,[fa],n,!0),Za(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Sc(e,t,r,n);break a}else if(r!==a){a=Ci(Error(i(424)),t),Yi(a),t=Sc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(zi=uf(e.firstChild),Ri=t,P=!0,Bi=null,Vi=!0,n=F(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(qi(),r===a){t=Nc(e,t,n);break a}cc(e,t,r,n)}t=t.child}return t;case 26:return vc(e,t),e===null?(n=jf(t.type,null,t.pendingProps,null))?t.memoizedState=n:P||(n=t.type,e=t.pendingProps,r=Hd(me.current).createElement(n),r[pt]=t,r[mt]=e,Id(r,n,e),Et(r),t.stateNode=r):t.memoizedState=jf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ve(t),e===null&&P&&(r=t.stateNode=mf(t.type,t.pendingProps,me.current),Ri=t,Vi=!0,a=zi,$d(t.type)?(df=a,zi=uf(r.firstChild)):zi=a),cc(e,t,t.pendingProps.children,n),vc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&P&&((a=r=zi)&&(r=rf(r,t.type,t.pendingProps,Vi),r===null?a=!1:(t.stateNode=r,Ri=t,zi=uf(r.firstChild),Vi=!1,a=!0)),a||Ui(t)),ve(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Gd(a,o)?r=null:s!==null&&Gd(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Oo(e,t,jo,null,null,n),ep._currentValue=a),vc(e,t),cc(e,t,r,n),t.child;case 6:return e===null&&P&&((e=n=zi)&&(n=af(n,t.pendingProps,Vi),n===null?e=!1:(t.stateNode=n,Ri=t,zi=null,e=!0)),e||Ui(t)),null;case 13:return Ec(e,t,n);case 4:return ge(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ua(t,null,r,n):cc(e,t,r,n),t.child;case 11:return lc(e,t,t.type,t.pendingProps,n);case 7:return cc(e,t,t.pendingProps,n),t.child;case 8:return cc(e,t,t.pendingProps.children,n),t.child;case 12:return cc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,$i(t,t.type,r.value),cc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,aa(t),a=oa(a),r=r(a),t.flags|=1,cc(e,t,r,n),t.child;case 14:return uc(e,t,t.type,t.pendingProps,n);case 15:return dc(e,t,t.type,t.pendingProps,n);case 19:return Mc(e,t,n);case 31:return _c(e,t,n);case 22:return fc(e,t,n,t.pendingProps);case 24:return aa(t),r=oa(fa),e===null?(a=wa(),a===null&&(a=Vl,o=pa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},I(t),$i(t,fa,a)):((e.lanes&n)!==0&&(Ga(e,t),Qa(t,null,null,n),Za()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,$i(t,fa,r),r!==a.cache&&na(t,[fa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),$i(t,fa,r))),cc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Lc(e){e.flags|=4}function Rc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Eu())e.flags|=8192;else throw Pa=Aa,Oa}else e.flags&=-16777217}function zc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Kf(t))if(Eu())e.flags|=8192;else throw Pa=Aa,Oa}function Bc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:tt(),e.lanes|=t,$l|=t)}function Vc(e,t){if(!P)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Hc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Uc(e,t,n){var r=t.pendingProps;switch(Ii(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Hc(t),null;case 1:return Hc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ea(fa),_e(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ki(t)?Lc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ji())),Hc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Lc(t),o===null?(Hc(t),Rc(t,a,null,r,n)):(Hc(t),zc(t,o))):o?o===e.memoizedState?(Hc(t),t.flags&=-16777217):(Lc(t),Hc(t),zc(t,o)):(e=e.memoizedProps,e!==r&&Lc(t),Hc(t),Rc(t,a,e,r,n)),null;case 27:if(ye(t),n=me.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Hc(t),null}e=fe.current,Ki(t)?Wi(t,e):(e=mf(a,r,n),t.stateNode=e,Lc(t))}return Hc(t),null;case 5:if(ye(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Hc(t),null}if(o=fe.current,Ki(t))Wi(t,o);else{var s=Hd(me.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[pt]=t,o[mt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Id(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Lc(t)}}return Hc(t),Rc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Lc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=me.current,Ki(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ri,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[pt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Nd(e.nodeValue,n)),e||Ui(t,!0)}else e=Hd(e).createTextNode(r),e[pt]=t,t.stateNode=e}return Hc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ki(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[pt]=t}else qi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Hc(t),e=!1}else n=Ji(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(po(t),t):(po(t),null);if(t.flags&128)throw Error(i(558))}return Hc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ki(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[pt]=t}else qi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Hc(t),a=!1}else a=Ji(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(po(t),t):(po(t),null)}return po(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Bc(t,t.updateQueue),Hc(t),null);case 4:return _e(),e===null&&wd(t.stateNode.containerInfo),Hc(t),null;case 10:return ea(t.type),Hc(t),null;case 19:if(ue(mo),r=t.memoizedState,r===null)return Hc(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Vc(r,!1);else{if(Jl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ho(e),o!==null){for(t.flags|=128,Vc(r,!1),e=o.updateQueue,t.updateQueue=e,Bc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)gi(n,e),n=n.sibling;return de(mo,mo.current&1|2),P&&Ni(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Me()>au&&(t.flags|=128,a=!0,Vc(r,!1),t.lanes=4194304)}else{if(!a)if(e=ho(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Bc(t,e),Vc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!P)return Hc(t),null}else 2*Me()-r.renderingStartTime>au&&n!==536870912&&(t.flags|=128,a=!0,Vc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Hc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Me(),e.sibling=null,n=mo.current,de(mo,a?n&1|2:n&1),P&&Ni(t,r.treeForkCount),e);case 22:case 23:return po(t),ao(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Hc(t),t.subtreeFlags&6&&(t.flags|=8192)):Hc(t),n=t.updateQueue,n!==null&&Bc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ue(Ca),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ea(fa),Hc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Wc(e,t){switch(Ii(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ea(fa),_e(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ye(t),null;case 31:if(t.memoizedState!==null){if(po(t),t.alternate===null)throw Error(i(340));qi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(po(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));qi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ue(mo),null;case 4:return _e(),null;case 10:return ea(t.type),null;case 22:case 23:return po(t),ao(),e!==null&&ue(Ca),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ea(fa),null;case 25:return null;default:return null}}function Gc(e,t){switch(Ii(t),t.tag){case 3:ea(fa),_e();break;case 26:case 27:case 5:ye(t);break;case 4:_e();break;case 31:t.memoizedState!==null&&po(t);break;case 13:po(t);break;case 19:ue(mo);break;case 10:ea(t.type);break;case 22:case 23:po(t),ao(),e!==null&&ue(Ca);break;case 24:ea(fa)}}function Kc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Y(t,t.return,e)}}function qc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Y(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Y(t,t.return,e)}}function Jc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{eo(t,n)}catch(t){Y(e,e.return,t)}}}function Yc(e,t,n){n.props=Xs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Y(e,t,n)}}function Xc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Y(e,t,n)}}function Zc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Y(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Y(e,t,n)}else n.current=null}function Qc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Y(e,e.return,t)}}function $c(e,t,n){try{var r=e.stateNode;Ld(r,e.type,n,t),r[mt]=t}catch(t){Y(e,e.return,t)}}function el(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&$d(e.type)||e.tag===4}function tl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||el(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&$d(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function nl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=sn));else if(r!==4&&(r===27&&$d(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(nl(e,t,n),e=e.sibling;e!==null;)nl(e,t,n),e=e.sibling}function rl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&$d(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(rl(e,t,n),e=e.sibling;e!==null;)rl(e,t,n),e=e.sibling}function il(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Id(t,r,n),t[pt]=e,t[mt]=n}catch(t){Y(e,e.return,t)}}var al=!1,ol=!1,B=!1,sl=typeof WeakSet==`function`?WeakSet:Set,V=null;function cl(e,t){if(e=e.containerInfo,Bd=lp,e=Pr(e),Fr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Vd={focusedElem:e,selectionRange:n},lp=!1,V=t;V!==null;)if(t=V,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,V=e;else for(;V!==null;){switch(t=V,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Xs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Y(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)nf(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:nf(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,V=e;break}V=t.return}}function ll(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Cl(e,n),r&4&&Kc(5,n);break;case 1:if(Cl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Y(n,n.return,e)}else{var i=Xs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Y(n,n.return,e)}}r&64&&Jc(n),r&512&&Xc(n,n.return);break;case 3:if(Cl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{eo(e,t)}catch(e){Y(n,n.return,e)}}break;case 27:t===null&&r&4&&il(n);case 26:case 5:Cl(e,n),t===null&&r&4&&Qc(n),r&512&&Xc(n,n.return);break;case 12:Cl(e,n);break;case 31:Cl(e,n),r&4&&ml(e,n);break;case 13:Cl(e,n),r&4&&hl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Xu.bind(null,n),lf(e,n))));break;case 22:if(r=n.memoizedState!==null||al,!r){t=t!==null&&t.memoizedState!==null||ol,i=al;var a=ol;al=r,(ol=t)&&!a?Tl(e,n,(n.subtreeFlags&8772)!=0):Cl(e,n),al=i,ol=a}break;case 30:break;default:Cl(e,n)}}function ul(e){var t=e.alternate;t!==null&&(e.alternate=null,ul(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var H=null,dl=!1;function fl(e,t,n){for(n=n.child;n!==null;)pl(e,t,n),n=n.sibling}function pl(e,t,n){if(He&&typeof He.onCommitFiberUnmount==`function`)try{He.onCommitFiberUnmount(Ve,n)}catch{}switch(n.tag){case 26:ol||Zc(n,t),fl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ol||Zc(n,t);var r=H,i=dl;$d(n.type)&&(H=n.stateNode,dl=!1),fl(e,t,n),hf(n.stateNode),H=r,dl=i;break;case 5:ol||Zc(n,t);case 6:if(r=H,i=dl,H=null,fl(e,t,n),H=r,dl=i,H!==null)if(dl)try{(H.nodeType===9?H.body:H.nodeName===`HTML`?H.ownerDocument.body:H).removeChild(n.stateNode)}catch(e){Y(n,t,e)}else try{H.removeChild(n.stateNode)}catch(e){Y(n,t,e)}break;case 18:H!==null&&(dl?(e=H,ef(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Fp(e)):ef(H,n.stateNode));break;case 4:r=H,i=dl,H=n.stateNode.containerInfo,dl=!0,fl(e,t,n),H=r,dl=i;break;case 0:case 11:case 14:case 15:qc(2,n,t),ol||qc(4,n,t),fl(e,t,n);break;case 1:ol||(Zc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Yc(n,t,r)),fl(e,t,n);break;case 21:fl(e,t,n);break;case 22:ol=(r=ol)||n.memoizedState!==null,fl(e,t,n),ol=r;break;default:fl(e,t,n)}}function ml(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Fp(e)}catch(e){Y(t,t.return,e)}}}function hl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Fp(e)}catch(e){Y(t,t.return,e)}}function gl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new sl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new sl),t;default:throw Error(i(435,e.tag))}}function _l(e,t){var n=gl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Zu.bind(null,e,t);t.then(r,r)}})}function vl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if($d(c.type)){H=c.stateNode,dl=!1;break a}break;case 5:H=c.stateNode,dl=!1;break a;case 3:case 4:H=c.stateNode.containerInfo,dl=!0;break a}c=c.return}if(H===null)throw Error(i(160));pl(o,s,a),H=null,dl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)bl(t,e),t=t.sibling}var yl=null;function bl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:vl(t,e),xl(e),r&4&&(qc(3,e,e.return),Kc(3,e),qc(5,e,e.return));break;case 1:vl(t,e),xl(e),r&512&&(ol||n===null||Zc(n,n.return)),r&64&&al&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=yl;if(vl(t,e),xl(e),r&512&&(ol||n===null||Zc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[bt]||o[pt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Id(o,r,n),o[pt]=e,Et(o),r=o;break a;case`link`:var s=Uf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Id(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Uf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Id(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[pt]=e,Et(o),r=o}e.stateNode=r}else Wf(a,e.type,e.stateNode);else e.stateNode=Rf(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&$c(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Wf(a,e.type,e.stateNode):Rf(a,r,e.memoizedProps))}break;case 27:vl(t,e),xl(e),r&512&&(ol||n===null||Zc(n,n.return)),n!==null&&r&4&&$c(e,e.memoizedProps,n.memoizedProps);break;case 5:if(vl(t,e),xl(e),r&512&&(ol||n===null||Zc(n,n.return)),e.flags&32){a=e.stateNode;try{Qt(a,``)}catch(t){Y(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,$c(e,a,n===null?a:n.memoizedProps)),r&1024&&(B=!0);break;case 6:if(vl(t,e),xl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Y(e,e.return,t)}}break;case 3:if(Hf=null,a=yl,yl=vf(t.containerInfo),vl(t,e),yl=a,xl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Fp(t.containerInfo)}catch(t){Y(e,e.return,t)}B&&(B=!1,Sl(e));break;case 4:r=yl,yl=vf(e.stateNode.containerInfo),vl(t,e),xl(e),yl=r;break;case 12:vl(t,e),xl(e);break;case 31:vl(t,e),xl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,_l(e,r)));break;case 13:vl(t,e),xl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(ru=Me()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,_l(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=al,d=ol;if(al=u||a,ol=d||l,vl(t,e),ol=d,al=u,xl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||al||ol||wl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Y(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Y(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?tf(m,!0):tf(l.stateNode,!1)}catch(e){Y(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,_l(e,n))));break;case 19:vl(t,e),xl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,_l(e,r)));break;case 30:break;case 21:break;default:vl(t,e),xl(e)}}function xl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(el(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;rl(e,tl(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Qt(o,``),n.flags&=-33),rl(e,tl(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;nl(e,tl(e),s);break;default:throw Error(i(161))}}catch(t){Y(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Sl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Cl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ll(e,t.alternate,t),t=t.sibling}function wl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:qc(4,t,t.return),wl(t);break;case 1:Zc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Yc(t,t.return,n),wl(t);break;case 27:hf(t.stateNode);case 26:case 5:Zc(t,t.return),wl(t);break;case 22:t.memoizedState===null&&wl(t);break;case 30:wl(t);break;default:wl(t)}e=e.sibling}}function Tl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Tl(i,a,n),Kc(4,a);break;case 1:if(Tl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Y(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)$a(c[i],s)}catch(e){Y(r,r.return,e)}}n&&o&64&&Jc(a),Xc(a,a.return);break;case 27:il(a);case 26:case 5:Tl(i,a,n),n&&r===null&&o&4&&Qc(a),Xc(a,a.return);break;case 12:Tl(i,a,n);break;case 31:Tl(i,a,n),n&&o&4&&ml(i,a);break;case 13:Tl(i,a,n),n&&o&4&&hl(i,a);break;case 22:a.memoizedState===null&&Tl(i,a,n),Xc(a,a.return);break;case 30:break;default:Tl(i,a,n)}t=t.sibling}}function El(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ma(n))}function U(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e))}function Dl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ol(e,t,n,r),t=t.sibling}function Ol(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Dl(e,t,n,r),i&2048&&Kc(9,t);break;case 1:Dl(e,t,n,r);break;case 3:Dl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e)));break;case 12:if(i&2048){Dl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Y(t,t.return,e)}}else Dl(e,t,n,r);break;case 31:Dl(e,t,n,r);break;case 13:Dl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Dl(e,t,n,r):(a._visibility|=2,kl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Dl(e,t,n,r):Al(e,t),i&2048&&El(o,t);break;case 24:Dl(e,t,n,r),i&2048&&U(t.alternate,t);break;default:Dl(e,t,n,r)}}function kl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:kl(a,o,s,c,i),Kc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,kl(a,o,s,c,i)):u._visibility&2?kl(a,o,s,c,i):Al(a,o),i&&l&2048&&El(o.alternate,o);break;case 24:kl(a,o,s,c,i),i&&l&2048&&U(o.alternate,o);break;default:kl(a,o,s,c,i)}t=t.sibling}}function Al(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Al(n,r),i&2048&&El(r.alternate,r);break;case 24:Al(n,r),i&2048&&U(r.alternate,r);break;default:Al(n,r)}t=t.sibling}}var jl=8192;function Ml(e,t,n){if(e.subtreeFlags&jl)for(e=e.child;e!==null;)Nl(e,t,n),e=e.sibling}function Nl(e,t,n){switch(e.tag){case 26:Ml(e,t,n),e.flags&jl&&e.memoizedState!==null&&qf(n,yl,e.memoizedState,e.memoizedProps);break;case 5:Ml(e,t,n);break;case 3:case 4:var r=yl;yl=vf(e.stateNode.containerInfo),Ml(e,t,n),yl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=jl,jl=16777216,Ml(e,t,n),jl=r):Ml(e,t,n));break;default:Ml(e,t,n)}}function Pl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];V=r,Rl(r,e)}Pl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Il(e),e=e.sibling}function Il(e){switch(e.tag){case 0:case 11:case 15:Fl(e),e.flags&2048&&qc(9,e,e.return);break;case 3:Fl(e);break;case 12:Fl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ll(e)):Fl(e);break;default:Fl(e)}}function Ll(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];V=r,Rl(r,e)}Pl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:qc(8,t,t.return),Ll(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ll(t));break;default:Ll(t)}e=e.sibling}}function Rl(e,t){for(;V!==null;){var n=V;switch(n.tag){case 0:case 11:case 15:qc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ma(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,V=r;else a:for(n=e;V!==null;){r=V;var i=r.sibling,a=r.return;if(ul(r),r===n){V=null;break a}if(i!==null){i.return=a,V=i;break a}V=a}}}var zl={getCacheForType:function(e){var t=oa(fa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return oa(fa).controller.signal}},Bl=typeof WeakMap==`function`?WeakMap:Map,W=0,Vl=null,G=null,K=0,Hl=0,Ul=null,Wl=!1,Gl=!1,Kl=!1,ql=0,Jl=0,Yl=0,Xl=0,Zl=0,Ql=0,$l=0,eu=null,tu=null,nu=!1,ru=0,iu=0,au=1/0,ou=null,su=null,cu=0,lu=null,uu=null,du=0,fu=0,q=null,pu=null,J=0,mu=null;function hu(){return W&2&&K!==0?K&-K:A.T===null?ut():pd()}function gu(){if(Ql===0)if(!(K&536870912)||P){var e=Ye;Ye<<=1,!(Ye&3932160)&&(Ye=262144),Ql=e}else Ql=536870912;return e=oo.current,e!==null&&(e.flags|=32),Ql}function _u(e,t,n){(e===Vl&&(Hl===2||Hl===9)||e.cancelPendingCommit!==null)&&(wu(e,0),xu(e,K,Ql,!1)),rt(e,n),(!(W&2)||e!==Vl)&&(e===Vl&&(!(W&2)&&(Xl|=n),Jl===4&&xu(e,K,Ql,!1)),ad(e))}function vu(e,t,n){if(W&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||$e(e,t),a=r?Mu(e,t):Au(e,t,!0),o=r;do{if(a===0){Gl&&!r&&xu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!bu(n)){a=Au(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=eu;var l=c.current.memoizedState.isDehydrated;if(l&&(wu(c,s).flags|=256),s=Au(c,s,!1),s!==2){if(Kl&&!l){c.errorRecoveryDisabledLanes|=o,Xl|=o,a=4;break a}o=tu,tu=a,o!==null&&(tu===null?tu=o:tu.push.apply(tu,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){wu(e,0),xu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:xu(r,t,Ql,!Wl);break a;case 2:tu=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=ru+300-Me(),10<a)){if(xu(r,t,Ql,!Wl),Qe(r,0,!0)!==0)break a;du=t,r.timeoutHandle=Jd(yu.bind(null,r,n,tu,ou,nu,t,Ql,Xl,$l,Wl,o,`Throttled`,-0,0),a);break a}yu(r,n,tu,ou,nu,t,Ql,Xl,$l,Wl,o,null,-0,0)}}break}while(1);ad(e)}function yu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:sn},Nl(t,a,d);var m=(a&62914560)===a?ru-Me():(a&4194048)===a?iu-Me():0;if(m=Yf(d,m),m!==null){du=a,e.cancelPendingCommit=m(zu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),xu(e,a,o,!l);return}}zu(e,t,a,n,r,i,o,s,c)}function bu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!kr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function xu(e,t,n,r){t&=~Zl,t&=~Xl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-We(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&at(e,n,t)}function Su(){return W&6?!0:(od(0,!1),!1)}function Cu(){if(G!==null){if(Hl===0)var e=G.return;else e=G,Qi=Zi=null,Po(e),La=null,Ra=0,e=G;for(;e!==null;)Gc(e.alternate,e),e=e.return;G=null}}function wu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Yd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),du=0,Cu(),Vl=e,G=n=hi(e.current,null),K=t,Hl=0,Ul=null,Wl=!1,Gl=$e(e,t),Kl=!1,$l=Ql=Zl=Xl=Yl=Jl=0,tu=eu=null,nu=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-We(r),a=1<<i;t|=e[i],r&=~a}return ql=t,ai(),n}function Tu(e,t){L=null,A.H=Hs,t===Da||t===ka?(t=Fa(),Hl=3):t===Oa?(t=Fa(),Hl=4):Hl=t===oc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ul=t,G===null&&(Jl=1,ec(e,Ci(t,e.current)))}function Eu(){var e=oo.current;return e===null?!0:(K&4194048)===K?so===null:(K&62914560)===K||K&536870912?e===so:!1}function Du(){var e=A.H;return A.H=Hs,e===null?Hs:e}function Ou(){var e=A.A;return A.A=zl,e}function ku(){Jl=4,Wl||(K&4194048)!==K&&oo.current!==null||(Gl=!0),!(Yl&134217727)&&!(Xl&134217727)||Vl===null||xu(Vl,K,Ql,!1)}function Au(e,t,n){var r=W;W|=2;var i=Du(),a=Ou();(Vl!==e||K!==t)&&(ou=null,wu(e,t)),t=!1;var o=Jl;a:do try{if(Hl!==0&&G!==null){var s=G,c=Ul;switch(Hl){case 8:Cu(),o=6;break a;case 3:case 2:case 9:case 6:oo.current===null&&(t=!0);var l=Hl;if(Hl=0,Ul=null,Iu(e,s,c,l),n&&Gl){o=0;break a}break;default:l=Hl,Hl=0,Ul=null,Iu(e,s,c,l)}}ju(),o=Jl;break}catch(t){Tu(e,t)}while(1);return t&&e.shellSuspendCounter++,Qi=Zi=null,W=r,A.H=i,A.A=a,G===null&&(Vl=null,K=0,ai()),o}function ju(){for(;G!==null;)Pu(G)}function Mu(e,t){var n=W;W|=2;var r=Du(),a=Ou();Vl!==e||K!==t?(ou=null,au=Me()+500,wu(e,t)):Gl=$e(e,t);a:do try{if(Hl!==0&&G!==null){t=G;var o=Ul;b:switch(Hl){case 1:Hl=0,Ul=null,Iu(e,t,o,1);break;case 2:case 9:if(ja(o)){Hl=0,Ul=null,Fu(t);break}t=function(){Hl!==2&&Hl!==9||Vl!==e||(Hl=7),ad(e)},o.then(t,t);break a;case 3:Hl=7;break a;case 4:Hl=5;break a;case 7:ja(o)?(Hl=0,Ul=null,Fu(t)):(Hl=0,Ul=null,Iu(e,t,o,7));break;case 5:var s=null;switch(G.tag){case 26:s=G.memoizedState;case 5:case 27:var c=G;if(s?Kf(s):c.stateNode.complete){Hl=0,Ul=null;var l=c.sibling;if(l!==null)G=l;else{var u=c.return;u===null?G=null:(G=u,Lu(u))}break b}}Hl=0,Ul=null,Iu(e,t,o,5);break;case 6:Hl=0,Ul=null,Iu(e,t,o,6);break;case 8:Cu(),Jl=6;break a;default:throw Error(i(462))}}Nu();break}catch(t){Tu(e,t)}while(1);return Qi=Zi=null,A.H=r,A.A=a,W=n,G===null?(Vl=null,K=0,ai(),Jl):0}function Nu(){for(;G!==null&&!Ae();)Pu(G)}function Pu(e){var t=Ic(e.alternate,e,ql);e.memoizedProps=e.pendingProps,t===null?Lu(e):G=t}function Fu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=bc(n,t,t.pendingProps,t.type,void 0,K);break;case 11:t=bc(n,t,t.pendingProps,t.type.render,t.ref,K);break;case 5:Po(t);default:Gc(n,t),t=G=gi(t,ql),t=Ic(n,t,ql)}e.memoizedProps=e.pendingProps,t===null?Lu(e):G=t}function Iu(e,t,n,r){Qi=Zi=null,Po(t),La=null,Ra=0;var i=t.return;try{if(ac(e,i,t,n,K)){Jl=1,ec(e,Ci(n,e.current)),G=null;return}}catch(t){if(i!==null)throw G=i,t;Jl=1,ec(e,Ci(n,e.current)),G=null;return}t.flags&32768?(P||r===1?e=!0:Gl||K&536870912?e=!1:(Wl=e=!0,(r===2||r===9||r===3||r===6)&&(r=oo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Ru(t,e)):Lu(t)}function Lu(e){var t=e;do{if(t.flags&32768){Ru(t,Wl);return}e=t.return;var n=Uc(t.alternate,t,ql);if(n!==null){G=n;return}if(t=t.sibling,t!==null){G=t;return}G=t=e}while(t!==null);Jl===0&&(Jl=5)}function Ru(e,t){do{var n=Wc(e.alternate,e);if(n!==null){n.flags&=32767,G=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){G=e;return}G=e=n}while(e!==null);Jl=6,G=null}function zu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Wu();while(cu!==0);if(W&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=N,it(e,n,o,s,c,l),e===Vl&&(G=Vl=null,K=0),uu=t,lu=e,du=n,fu=o,q=a,pu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Qu(Ie,function(){return Gu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=A.T,A.T=null,a=j.p,j.p=2,s=W,W|=4;try{cl(e,t,n)}finally{W=s,j.p=a,A.T=r}}cu=1,Bu(),Vu(),Hu()}}function Bu(){if(cu===1){cu=0;var e=lu,t=uu,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=W;W|=4;try{bl(t,e);var a=Vd,o=Pr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Nr(s.ownerDocument.documentElement,s)){if(c!==null&&Fr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Mr(s,h),v=Mr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}lp=!!Bd,Vd=Bd=null}finally{W=i,j.p=r,A.T=n}}e.current=t,cu=2}}function Vu(){if(cu===2){cu=0;var e=lu,t=uu,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=W;W|=4;try{ll(e,t.alternate,t)}finally{W=i,j.p=r,A.T=n}}cu=3}}function Hu(){if(cu===4||cu===3){cu=0,je();var e=lu,t=uu,n=du,r=pu;t.subtreeFlags&10256||t.flags&10256?cu=5:(cu=0,uu=lu=null,Uu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(su=null),lt(n),t=t.stateNode,He&&typeof He.onCommitFiberRoot==`function`)try{He.onCommitFiberRoot(Ve,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=A.T,i=j.p,j.p=2,A.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{A.T=t,j.p=i}}du&3&&Wu(),ad(e),i=e.pendingLanes,n&261930&&i&42?e===mu?J++:(J=0,mu=e):J=0,od(0,!1)}}function Uu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ma(t)))}function Wu(){return Bu(),Vu(),Hu(),Gu()}function Gu(){if(cu!==5)return!1;var e=lu,t=fu;fu=0;var n=lt(du),r=A.T,a=j.p;try{j.p=32>n?32:n,A.T=null,n=q,q=null;var o=lu,s=du;if(cu=0,uu=lu=null,du=0,W&6)throw Error(i(331));var c=W;if(W|=4,Il(o.current),Ol(o,o.current,s,n),W=c,od(0,!1),He&&typeof He.onPostCommitFiberRoot==`function`)try{He.onPostCommitFiberRoot(Ve,o)}catch{}return!0}finally{j.p=a,A.T=r,Uu(e,t)}}function Ku(e,t,n){t=Ci(n,t),t=nc(e.stateNode,t,2),e=qa(e,t,2),e!==null&&(rt(e,2),ad(e))}function Y(e,t,n){if(e.tag===3)Ku(e,e,n);else for(;t!==null;){if(t.tag===3){Ku(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(su===null||!su.has(r))){e=Ci(n,e),n=rc(2),r=qa(t,n,2),r!==null&&(ic(n,r,t,e),rt(r,2),ad(r));break}}t=t.return}}function qu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Kl=!0,i.add(n),e=Ju.bind(null,e,t,n),t.then(e,e))}function Ju(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Vl===e&&(K&n)===n&&(Jl===4||Jl===3&&(K&62914560)===K&&300>Me()-ru?!(W&2)&&wu(e,0):Zl|=n,$l===K&&($l=0)),ad(e)}function Yu(e,t){t===0&&(t=tt()),e=ci(e,t),e!==null&&(rt(e,t),ad(e))}function Xu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Yu(e,n)}function Zu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Yu(e,n)}function Qu(e,t){return Oe(e,t)}var $u=null,ed=null,td=!1,nd=!1,rd=!1,id=0;function ad(e){e!==ed&&e.next===null&&(ed===null?$u=ed=e:ed=ed.next=e),nd=!0,td||(td=!0,fd())}function od(e,t){if(!rd&&nd){rd=!0;do for(var n=!1,r=$u;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-We(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,dd(r,a))}else a=K,a=Qe(r,r===Vl?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||$e(r,a)||(n=!0,dd(r,a));r=r.next}while(n);rd=!1}}function sd(){cd()}function cd(){nd=td=!1;var e=0;id!==0&&qd()&&(e=id);for(var t=Me(),n=null,r=$u;r!==null;){var i=r.next,a=ld(r,t);a===0?(r.next=null,n===null?$u=i:n.next=i,i===null&&(ed=n)):(n=r,(e!==0||a&3)&&(nd=!0)),r=i}cu!==0&&cu!==5||od(e,!1),id!==0&&(id=0)}function ld(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-We(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=et(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Vl,n=K,n=Qe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Hl===2||Hl===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ke(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||$e(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ke(r),lt(n)){case 2:case 8:n=Fe;break;case 32:n=Ie;break;case 268435456:n=Re;break;default:n=Ie}return r=ud.bind(null,e),n=Oe(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ke(r),e.callbackPriority=2,e.callbackNode=null,2}function ud(e,t){if(cu!==0&&cu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Wu()&&e.callbackNode!==n)return null;var r=K;return r=Qe(e,e===Vl?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(vu(e,r,t),ld(e,Me()),e.callbackNode!=null&&e.callbackNode===n?ud.bind(null,e):null)}function dd(e,t){if(Wu())return null;vu(e,t,!0)}function fd(){Zd(function(){W&6?Oe(Pe,sd):cd()})}function pd(){if(id===0){var e=_a;e===0&&(e=Je,Je<<=1,!(Je&261888)&&(Je=256)),id=e}return id}function md(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:on(``+e)}function hd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function gd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=md((i[mt]||null).action),o=r.submitter;o&&(t=(t=o[mt]||null)?md(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new On(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(id!==0){var e=o?hd(i,o):new FormData(i);Os(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?hd(i,o):new FormData(i),Os(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var _d=0;_d<ti.length;_d++){var vd=ti[_d];ni(vd.toLowerCase(),`on`+(vd[0].toUpperCase()+vd.slice(1)))}ni(qr,`onAnimationEnd`),ni(Jr,`onAnimationIteration`),ni(Yr,`onAnimationStart`),ni(`dblclick`,`onDoubleClick`),ni(`focusin`,`onFocus`),ni(`focusout`,`onBlur`),ni(Xr,`onTransitionRun`),ni(Zr,`onTransitionStart`),ni(Qr,`onTransitionCancel`),ni($r,`onTransitionEnd`),At(`onMouseEnter`,[`mouseout`,`mouseover`]),At(`onMouseLeave`,[`mouseout`,`mouseover`]),At(`onPointerEnter`,[`pointerout`,`pointerover`]),At(`onPointerLeave`,[`pointerout`,`pointerover`]),kt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),kt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),kt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),kt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var yd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),bd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(yd));function xd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ri(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ri(e)}i.currentTarget=null,a=c}}}}function X(e,t){var n=t[gt];n===void 0&&(n=t[gt]=new Set);var r=e+`__bubble`;n.has(r)||(Td(t,e,2,!1),n.add(r))}function Sd(e,t,n){var r=0;t&&(r|=4),Td(n,e,r,t)}var Cd=`_reactListening`+Math.random().toString(36).slice(2);function wd(e){if(!e[Cd]){e[Cd]=!0,Dt.forEach(function(t){t!==`selectionchange`&&(bd.has(t)||Sd(t,!1,e),Sd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Cd]||(t[Cd]=!0,Sd(`selectionchange`,!1,t))}}function Td(e,t,n,r){switch(gp(t)){case 2:var i=up;break;case 8:i=dp;break;default:i=fp}n=i.bind(null,t,n,e),i=void 0,!_n||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Ed(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=St(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}mn(function(){var r=a,i=ln(n),s=[];a:{var c=ei.get(e);if(c!==void 0){var l=On,u=e;switch(e){case`keypress`:if(Cn(n)===0)break a;case`keydown`:case`keyup`:l=Kn;break;case`focusin`:u=`focus`,l=Ln;break;case`focusout`:u=`blur`,l=Ln;break;case`beforeblur`:case`afterblur`:l=Ln;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Fn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=In;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Jn;break;case qr:case Jr:case Yr:l=Rn;break;case $r:l=Yn;break;case`scroll`:case`scrollend`:l=An;break;case`wheel`:l=Xn;break;case`copy`:case`cut`:case`paste`:l=zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=qn;break;case`toggle`:case`beforetoggle`:l=Zn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=hn(m,p),g!=null&&d.push(Dd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==cn&&(u=n.relatedTarget||n.fromElement)&&(St(u)||u[ht]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?St(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Fn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=qn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:wt(l),h=u==null?c:wt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,St(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=kd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Ad(s,c,l,d,!1),u!==null&&f!==null&&Ad(s,f,u,d,!0)}}a:{if(c=r?wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=_r;else if(dr(c))if(vr)v=Dr;else{v=Tr;var y=wr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&nn(r.elementType)&&(v=_r):v=Er;if(v&&=v(e,r)){fr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Jt(c,`number`,c.value)}switch(y=r?wt(r):window,e){case`focusin`:(dr(y)||y.contentEditable===`true`)&&(Lr=y,Rr=r,zr=null);break;case`focusout`:zr=Rr=Lr=null;break;case`mousedown`:Br=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Br=!1,Vr(s,n,i);break;case`selectionchange`:if(Ir)break;case`keydown`:case`keyup`:Vr(s,n,i)}var b;if($n)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else sr?ar(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(nr&&n.locale!==`ko`&&(sr||x!==`onCompositionStart`?x===`onCompositionEnd`&&sr&&(b=Sn()):(yn=i,bn=`value`in yn?yn.value:yn.textContent,sr=!0)),y=Od(r,x),0<y.length&&(x=new Bn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=or(n),b!==null&&(x.data=b)))),(b=tr?cr(e,n):lr(e,n))&&(x=Od(r,`onBeforeInput`),0<x.length&&(y=new Bn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),gd(s,e,r,n,i)}xd(s,t)})}function Dd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Od(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=hn(e,n),i!=null&&r.unshift(Dd(e,i,a)),i=hn(e,t),i!=null&&r.push(Dd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function kd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Ad(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=hn(n,a),l!=null&&o.unshift(Dd(n,l,c))):i||(l=hn(n,a),l!=null&&o.push(Dd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var jd=/\r\n?/g,Md=/\u0000|\uFFFD/g;function Z(e){return(typeof e==`string`?e:``+e).replace(jd,`
`).replace(Md,``)}function Nd(e,t){return t=Z(t),Z(e)===t}function Pd(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Qt(e,``+r);break;case`className`:It(e,`class`,r);break;case`tabIndex`:It(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:It(e,n,r);break;case`style`:tn(e,r,o);break;case`data`:if(t!==`object`){It(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&Pd(e,t,`name`,a.name,a,null),Pd(e,t,`formEncType`,a.formEncType,a,null),Pd(e,t,`formMethod`,a.formMethod,a,null),Pd(e,t,`formTarget`,a.formTarget,a,null)):(Pd(e,t,`encType`,a.encType,a,null),Pd(e,t,`method`,a.method,a,null),Pd(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`onScroll`:r!=null&&X(`scroll`,e);break;case`onScrollEnd`:r!=null&&X(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=on(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:X(`beforetoggle`,e),X(`toggle`,e),Ft(e,`popover`,r);break;case`xlinkActuate`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ft(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=rn.get(n)||n,Ft(e,n,r))}}function Fd(e,t,n,r,a,o){switch(n){case`style`:tn(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Qt(e,``+r);break;case`onScroll`:r!=null&&X(`scroll`,e);break;case`onScrollEnd`:r!=null&&X(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Ot.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[mt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ft(e,n,r)}}}function Id(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:X(`error`,e),X(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Pd(e,t,o,s,n,null)}}a&&Pd(e,t,`srcSet`,n.srcSet,n,null),r&&Pd(e,t,`src`,n.src,n,null);return;case`input`:X(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Pd(e,t,r,d,n,null)}}qt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in X(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Pd(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Yt(e,!!r,n,!0):Yt(e,!!r,t,!1);return;case`textarea`:for(s in X(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Pd(e,t,s,c,n,null)}Zt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Pd(e,t,l,r,n,null)}return;case`dialog`:X(`beforetoggle`,e),X(`toggle`,e),X(`cancel`,e),X(`close`,e);break;case`iframe`:case`object`:X(`load`,e);break;case`video`:case`audio`:for(r=0;r<yd.length;r++)X(yd[r],e);break;case`image`:X(`error`,e),X(`load`,e);break;case`details`:X(`toggle`,e);break;case`embed`:case`source`:case`link`:X(`error`,e),X(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Pd(e,t,u,r,n,null)}return;default:if(nn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Fd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Pd(e,t,c,r,n,null))}function Ld(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Pd(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Pd(e,t,p,m,r,f)}}Kt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Pd(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Pd(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Yt(e,!!n,n?[]:``,!1):Yt(e,!!n,t,!0)):Yt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Pd(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Pd(e,t,s,a,r,o)}Xt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Pd(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Pd(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Pd(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Pd(e,t,u,p,r,m)}return;default:if(nn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Fd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Fd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Pd(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Pd(e,t,f,p,r,m)}function Rd(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function zd(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Rd(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Rd(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Bd=null,Vd=null;function Hd(e){return e.nodeType===9?e:e.ownerDocument}function Ud(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Wd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Gd(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Kd=null;function qd(){var e=window.event;return e&&e.type===`popstate`?e===Kd?!1:(Kd=e,!0):(Kd=null,!1)}var Jd=typeof setTimeout==`function`?setTimeout:void 0,Yd=typeof clearTimeout==`function`?clearTimeout:void 0,Xd=typeof Promise==`function`?Promise:void 0,Zd=typeof queueMicrotask==`function`?queueMicrotask:Xd===void 0?Jd:function(e){return Xd.resolve(null).then(e).catch(Qd)};function Qd(e){setTimeout(function(){throw e})}function $d(e){return e===`head`}function ef(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Fp(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)hf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,hf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[bt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&hf(e.ownerDocument.body);n=i}while(n);Fp(t)}function tf(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function nf(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nf(n),xt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[bt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=uf(e.nextSibling),e===null)break}return null}function af(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=uf(e.nextSibling),e===null))return null;return e}function of(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=uf(e.nextSibling),e===null))return null;return e}function sf(e){return e.data===`$?`||e.data===`$~`}function cf(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function lf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function uf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var df=null;function ff(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return uf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function pf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function mf(e,t,n){switch(t=Hd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function hf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xt(e)}var gf=new Map,_f=new Set;function vf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var yf=j.d;j.d={f:bf,r:xf,D:wf,C:Tf,L:Ef,m:Df,X:kf,S:Of,M:Af};function bf(){var e=yf.f(),t=Su();return e||t}function xf(e){var t=Ct(e);t!==null&&t.tag===5&&t.type===`form`?As(t):yf.r(e)}var Sf=typeof document>`u`?null:document;function Cf(e,t,n){var r=Sf;if(r&&typeof t==`string`&&t){var i=Gt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),_f.has(i)||(_f.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Id(t,`link`,e),Et(t),r.head.appendChild(t)))}}function wf(e){yf.D(e),Cf(`dns-prefetch`,e,null)}function Tf(e,t){yf.C(e,t),Cf(`preconnect`,e,t)}function Ef(e,t,n){yf.L(e,t,n);var r=Sf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Gt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Gt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Gt(n.imageSizes)+`"]`)):i+=`[href="`+Gt(e)+`"]`;var a=i;switch(t){case`style`:a=Mf(e);break;case`script`:a=If(e)}gf.has(a)||(e=m({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),gf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Nf(a))||t===`script`&&r.querySelector(Lf(a))||(t=r.createElement(`link`),Id(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Df(e,t){yf.m(e,t);var n=Sf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Gt(r)+`"][href="`+Gt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=If(e)}if(!gf.has(a)&&(e=m({rel:`modulepreload`,href:e},t),gf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Lf(a)))return}r=n.createElement(`link`),Id(r,`link`,e),Et(r),n.head.appendChild(r)}}}function Of(e,t,n){yf.S(e,t,n);var r=Sf;if(r&&e){var i=Tt(r).hoistableStyles,a=Mf(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Nf(a)))s.loading=5;else{e=m({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=gf.get(a))&&Bf(e,n);var c=o=r.createElement(`link`);Et(c),Id(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,zf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function kf(e,t){yf.X(e,t);var n=Sf;if(n&&e){var r=Tt(n).hoistableScripts,i=If(e),a=r.get(i);a||(a=n.querySelector(Lf(i)),a||(e=m({src:e,async:!0},t),(t=gf.get(i))&&Vf(e,t),a=n.createElement(`script`),Et(a),Id(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Af(e,t){yf.M(e,t);var n=Sf;if(n&&e){var r=Tt(n).hoistableScripts,i=If(e),a=r.get(i);a||(a=n.querySelector(Lf(i)),a||(e=m({src:e,async:!0,type:`module`},t),(t=gf.get(i))&&Vf(e,t),a=n.createElement(`script`),Et(a),Id(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function jf(e,t,n,r){var a=(a=me.current)?vf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Mf(n.href),n=Tt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Mf(n.href);var o=Tt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Nf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),gf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},gf.set(e,n),o||Ff(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=If(n),n=Tt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Mf(e){return`href="`+Gt(e)+`"`}function Nf(e){return`link[rel="stylesheet"][`+e+`]`}function Pf(e){return m({},e,{"data-precedence":e.precedence,precedence:null})}function Ff(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Id(t,`link`,n),Et(t),e.head.appendChild(t))}function If(e){return`[src="`+Gt(e)+`"]`}function Lf(e){return`script[async]`+e}function Rf(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Gt(n.href)+`"]`);if(r)return t.instance=r,Et(r),r;var a=m({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Et(r),Id(r,`style`,a),zf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Mf(n.href);var o=e.querySelector(Nf(a));if(o)return t.state.loading|=4,t.instance=o,Et(o),o;r=Pf(n),(a=gf.get(a))&&Bf(r,a),o=(e.ownerDocument||e).createElement(`link`),Et(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Id(o,`link`,r),t.state.loading|=4,zf(o,n.precedence,e),t.instance=o;case`script`:return o=If(n.src),(a=e.querySelector(Lf(o)))?(t.instance=a,Et(a),a):(r=n,(a=gf.get(o))&&(r=m({},n),Vf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Et(a),Id(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,zf(r,n.precedence,e));return t.instance}function zf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Bf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Vf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Hf=null;function Uf(e,t,n){if(Hf===null){var r=new Map,i=Hf=new Map;i.set(n,r)}else i=Hf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[bt]||a[pt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Wf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Gf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Kf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function qf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Mf(r.href),a=t.querySelector(Nf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Xf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Et(a);return}a=t.ownerDocument||t,r=Pf(r),(i=gf.get(i))&&Bf(r,i),a=a.createElement(`link`),Et(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Id(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Xf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Jf=0;function Yf(e,t){return e.stylesheets&&e.count===0&&Qf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Qf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Jf===0&&(Jf=62500*zd());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Qf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Jf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Xf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Qf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Zf=null;function Qf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Zf=new Map,t.forEach($f,e),Zf=null,Xf.call(e))}function $f(e,t){if(!(t.state.loading&4)){var n=Zf.get(e);if(n)var r=n.get(null);else{n=new Map,Zf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Xf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var ep={$$typeof:C,Provider:null,Consumer:null,_currentValue:oe,_currentValue2:oe,_threadCount:0};function tp(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nt(0),this.hiddenUpdates=nt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function np(e,t,n,r,i,a,o,s,c,l,u,d){return e=new tp(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=pi(3,null,null,t),e.current=a,a.stateNode=e,t=pa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},I(a),e}function rp(e){return e?(e=di,e):di}function ip(e,t,n,r,i,a){i=rp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ka(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=qa(e,r,t),n!==null&&(_u(n,e,t),Ja(n,e,t))}function ap(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function op(e,t){ap(e,t),(e=e.alternate)&&ap(e,t)}function sp(e){if(e.tag===13||e.tag===31){var t=ci(e,67108864);t!==null&&_u(t,e,67108864),op(e,67108864)}}function cp(e){if(e.tag===13||e.tag===31){var t=hu();t=ct(t);var n=ci(e,t);n!==null&&_u(n,e,t),op(e,t)}}var lp=!0;function up(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=2,fp(e,t,n,r)}finally{j.p=a,A.T=i}}function dp(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=8,fp(e,t,n,r)}finally{j.p=a,A.T=i}}function fp(e,t,n,r){if(lp){var i=pp(r);if(i===null)Ed(e,t,r,mp,n),Tp(e,r);else if(Dp(i,e,t,n,r))r.stopPropagation();else if(Tp(e,r),t&4&&-1<wp.indexOf(e)){for(;i!==null;){var a=Ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ze(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-We(o);s.entanglements[1]|=c,o&=~c}ad(a),!(W&6)&&(au=Me()+500,od(0,!1))}}break;case 31:case 13:s=ci(a,2),s!==null&&_u(s,a,2),Su(),op(a,2)}if(a=pp(r),a===null&&Ed(e,t,r,mp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Ed(e,t,r,null,n)}}function pp(e){return e=ln(e),hp(e)}var mp=null;function hp(e){if(mp=null,e=St(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return mp=e,null}function gp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ne()){case Pe:return 2;case Fe:return 8;case Ie:case Le:return 32;case Re:return 268435456;default:return 32}default:return 32}}var _p=!1,vp=null,yp=null,bp=null,xp=new Map,Sp=new Map,Cp=[],wp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Tp(e,t){switch(e){case`focusin`:case`focusout`:vp=null;break;case`dragenter`:case`dragleave`:yp=null;break;case`mouseover`:case`mouseout`:bp=null;break;case`pointerover`:case`pointerout`:xp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:Sp.delete(t.pointerId)}}function Ep(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ct(t),t!==null&&sp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Dp(e,t,n,r,i){switch(t){case`focusin`:return vp=Ep(vp,e,t,n,r,i),!0;case`dragenter`:return yp=Ep(yp,e,t,n,r,i),!0;case`mouseover`:return bp=Ep(bp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return xp.set(a,Ep(xp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,Sp.set(a,Ep(Sp.get(a)||null,e,t,n,r,i)),!0}return!1}function Op(e){var t=St(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,dt(e.priority,function(){cp(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,dt(e.priority,function(){cp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function kp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=pp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);cn=r,n.target.dispatchEvent(r),cn=null}else return t=Ct(n),t!==null&&sp(t),e.blockedOn=n,!1;t.shift()}return!0}function Ap(e,t,n){kp(e)&&n.delete(t)}function jp(){_p=!1,vp!==null&&kp(vp)&&(vp=null),yp!==null&&kp(yp)&&(yp=null),bp!==null&&kp(bp)&&(bp=null),xp.forEach(Ap),Sp.forEach(Ap)}function Mp(e,n){e.blockedOn===n&&(e.blockedOn=null,_p||(_p=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,jp)))}var Np=null;function Pp(e){Np!==e&&(Np=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Np===e&&(Np=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(hp(r||n)===null)continue;break}var a=Ct(n);a!==null&&(e.splice(t,3),t-=3,Os(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Fp(e){function t(t){return Mp(t,e)}vp!==null&&Mp(vp,e),yp!==null&&Mp(yp,e),bp!==null&&Mp(bp,e),xp.forEach(t),Sp.forEach(t);for(var n=0;n<Cp.length;n++){var r=Cp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Cp.length&&(n=Cp[0],n.blockedOn===null);)Op(n),n.blockedOn===null&&Cp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[mt]||null;if(typeof a==`function`)o||Pp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[mt]||null)s=o.formAction;else if(hp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Pp(n)}}}function Ip(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Lp(e){this._internalRoot=e}Rp.prototype.render=Lp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;ip(n,hu(),e,t,null,null)},Rp.prototype.unmount=Lp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ip(e.current,2,null,e,null,null),Su(),t[ht]=null}};function Rp(e){this._internalRoot=e}Rp.prototype.unstable_scheduleHydration=function(e){if(e){var t=ut();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Cp.length&&t!==0&&t<Cp[n].priority;n++);Cp.splice(n,0,e),n===0&&Op(e)}};var zp=n.version;if(zp!==`19.2.5`)throw Error(i(527,zp,`19.2.5`));j.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Bp={bundleType:0,version:`19.2.5`,rendererPackageName:`react-dom`,currentDispatcherRef:A,reconcilerVersion:`19.2.5`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Vp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vp.isDisabled&&Vp.supportsFiber)try{Ve=Vp.inject(Bp),He=Vp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Zs,s=Qs,c=$s;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=np(e,1,!1,null,null,n,r,null,o,s,c,Ip),e[ht]=t.current,wd(e),new Lp(t)}})),_=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=l(d(),1),y=l(_(),1),b=`modulepreload`,x=function(e){return`/`+e},S={},C=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=x(t,n),t in S)return;S[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:b,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},w=`popstate`;function T(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function E(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return te(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ne(t)}return ie(t,n,null,e)}function D(e,t){if(e===!1||e==null)throw Error(t)}function O(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function k(){return Math.random().toString(36).substring(2,10)}function ee(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function te(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?re(t):t,state:n,key:t&&t.key||r||k(),unstable_mask:i}}function ne({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function re(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ie(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=T(e)?e:te(h.location,e,t);n&&n(r,e),l=u()+1;let d=ee(r,l),f=h.createHref(r.unstable_mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=T(e)?e:te(h.location,e,t);n&&n(r,e),l=u();let i=ee(r,l),d=h.createHref(r.unstable_mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return ae(e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(w,d),c=e,()=>{i.removeEventListener(w,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function ae(e,t=!1){let n=`http://localhost`;typeof window<`u`&&(n=window.location.origin===`null`?window.location.href:window.location.origin),D(n,`No window.location.(origin|href) available to create URL`);let r=typeof e==`string`?e:ne(e);return r=r.replace(/ $/,`%20`),!t&&r.startsWith(`//`)&&(r=n+r),new URL(r,n)}function A(e,t,n=`/`){return j(e,t,n,!1)}function j(e,t,n,r){let i=Ce((typeof t==`string`?re(t):t).pathname||`/`,n);if(i==null)return null;let a=se(e);le(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=Se(i);o=ye(a[e],t,r)}return o}function oe(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function se(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;D(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Me([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(D(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),se(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:_e(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of ce(e.path))a(e,t,!0,n)}),t}function ce(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=ce(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function le(e){e.sort((e,t)=>e.score===t.score?ve(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ue=/^:[\w-]+$/,de=3,fe=2,pe=1,me=10,he=-2,ge=e=>e===`*`;function _e(e,t){let n=e.split(`/`),r=n.length;return n.some(ge)&&(r+=he),t&&(r+=fe),n.filter(e=>!ge(e)).reduce((e,t)=>e+(ue.test(t)?de:t===``?pe:me),r)}function ve(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function ye(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Me([a,u.pathname]),pathnameBase:Pe(Me([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Me([a,u.pathnameBase]))}return o}function be(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=xe(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function xe(e,t=!1,n=!0){O(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Se(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return O(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ce(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var we=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Te(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?re(e):e,a;return n?(n=je(n),a=n.startsWith(`/`)?Ee(n.substring(1),`/`):Ee(n,t)):a=t,{pathname:a,search:Fe(r),hash:Ie(i)}}function Ee(e,t){let n=Ne(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function De(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Oe(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ke(e){let t=Oe(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Ae(e,t,n,r=!1){let i;typeof e==`string`?i=re(e):(i={...e},D(!i.pathname||!i.pathname.includes(`?`),De(`?`,`pathname`,`search`,i)),D(!i.pathname||!i.pathname.includes(`#`),De(`#`,`pathname`,`hash`,i)),D(!i.search||!i.search.includes(`#`),De(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Te(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var je=e=>e.replace(/\/\/+/g,`/`),Me=e=>je(e.join(`/`)),Ne=e=>e.replace(/\/+$/,``),Pe=e=>Ne(e).replace(/^\/*/,`/`),Fe=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ie=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Le=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Re(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function ze(e){return Me(e.map(e=>e.route.path).filter(Boolean))||`/`}var Be=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ve(e,t){let n=e;if(typeof n!=`string`||!we.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Be)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=Ce(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{O(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var He=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(He);var Ue=[`GET`,...He];new Set(Ue);var We=v.createContext(null);We.displayName=`DataRouter`;var Ge=v.createContext(null);Ge.displayName=`DataRouterState`;var Ke=v.createContext(!1);function qe(){return v.useContext(Ke)}var Je=v.createContext({isTransitioning:!1});Je.displayName=`ViewTransition`;var Ye=v.createContext(new Map);Ye.displayName=`Fetchers`;var Xe=v.createContext(null);Xe.displayName=`Await`;var Ze=v.createContext(null);Ze.displayName=`Navigation`;var Qe=v.createContext(null);Qe.displayName=`Location`;var $e=v.createContext({outlet:null,matches:[],isDataRoute:!1});$e.displayName=`Route`;var et=v.createContext(null);et.displayName=`RouteError`;var tt=`REACT_ROUTER_ERROR`,nt=`REDIRECT`,rt=`ROUTE_ERROR_RESPONSE`;function it(e){if(e.startsWith(`${tt}:${nt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function at(e){if(e.startsWith(`${tt}:${rt}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Le(t.status,t.statusText,t.data)}catch{}}function ot(e,{relative:t}={}){D(st(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=v.useContext(Ze),{hash:i,pathname:a,search:o}=mt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Me([n,a])),r.createHref({pathname:s,search:o,hash:i})}function st(){return v.useContext(Qe)!=null}function ct(){return D(st(),`useLocation() may be used only in the context of a <Router> component.`),v.useContext(Qe).location}var lt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function ut(e){v.useContext(Ze).static||v.useLayoutEffect(e)}function dt(){let{isDataRoute:e}=v.useContext($e);return e?Nt():ft()}function ft(){D(st(),`useNavigate() may be used only in the context of a <Router> component.`);let e=v.useContext(We),{basename:t,navigator:n}=v.useContext(Ze),{matches:r}=v.useContext($e),{pathname:i}=ct(),a=JSON.stringify(ke(r)),o=v.useRef(!1);return ut(()=>{o.current=!0}),v.useCallback((r,s={})=>{if(O(o.current,lt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Ae(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Me([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}v.createContext(null);function pt(){let{matches:e}=v.useContext($e);return e[e.length-1]?.params??{}}function mt(e,{relative:t}={}){let{matches:n}=v.useContext($e),{pathname:r}=ct(),i=JSON.stringify(ke(n));return v.useMemo(()=>Ae(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function ht(e,t){return gt(e,t)}function gt(e,t,n){D(st(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=v.useContext(Ze),{matches:i}=v.useContext($e),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Ft(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=ct(),d;if(t){let e=typeof t==`string`?re(t):t;D(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=A(e,{pathname:p});O(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),O(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Ct(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Me([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Me([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?v.createElement(Qe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,unstable_mask:void 0,...d},navigationType:`POP`}},h):h}function _t(){let e=Mt(),t=Re(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=v.createElement(v.Fragment,null,v.createElement(`p`,null,`💿 Hey developer 👋`),v.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,v.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,v.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),v.createElement(v.Fragment,null,v.createElement(`h2`,null,`Unexpected Application Error!`),v.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?v.createElement(`pre`,{style:i},n):null,o)}var vt=v.createElement(_t,null),yt=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=at(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:v.createElement($e.Provider,{value:this.props.routeContext},v.createElement(et.Provider,{value:e,children:this.props.component}));return this.context?v.createElement(xt,{error:e},t):t}};yt.contextType=Ke;var bt=new WeakMap;function xt({children:e,error:t}){let{basename:n}=v.useContext(Ze);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=it(t.digest);if(e){let r=bt.get(t);if(r)throw r;let i=Ve(e.location,n);if(Be&&!bt.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bt.set(t,n),n}return v.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function St({routeContext:e,match:t,children:n}){let r=v.useContext(We);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),v.createElement($e.Provider,{value:e},n)}function Ct(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);D(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},unstable_pattern:ze(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||vt,o&&(s<0&&c===0?(Ft(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?v.createElement(n.route.Component,null):n.route.element?n.route.element:e,v.createElement(St,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?v.createElement(yt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function wt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Tt(e){let t=v.useContext(We);return D(t,wt(e)),t}function Et(e){let t=v.useContext(Ge);return D(t,wt(e)),t}function Dt(e){let t=v.useContext($e);return D(t,wt(e)),t}function Ot(e){let t=Dt(e),n=t.matches[t.matches.length-1];return D(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function kt(){return Ot(`useRouteId`)}function At(){return Et(`useNavigation`).navigation}function jt(){let{matches:e,loaderData:t}=Et(`useMatches`);return v.useMemo(()=>e.map(e=>oe(e,t)),[e,t])}function Mt(){let e=v.useContext(et),t=Et(`useRouteError`),n=Ot(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Nt(){let{router:e}=Tt(`useNavigate`),t=Ot(`useNavigate`),n=v.useRef(!1);return ut(()=>{n.current=!0}),v.useCallback(async(r,i={})=>{O(n.current,lt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Pt={};function Ft(e,t,n){!t&&!Pt[e]&&(Pt[e]=!0,O(!1,n))}v.memo(It);function It({routes:e,future:t,state:n,isStatic:r,onError:i}){return gt(e,void 0,{state:n,isStatic:r,onError:i,future:t})}function Lt(e){D(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Rt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,unstable_useTransitions:o}){D(!st(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=v.useMemo(()=>({basename:s,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=re(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,unstable_mask:m}=n,h=v.useMemo(()=>{let e=Ce(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,unstable_mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return O(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:v.createElement(Ze.Provider,{value:c},v.createElement(Qe.Provider,{children:t,value:h}))}function zt({children:e,location:t}){return ht(Bt(e),t)}v.Component;function Bt(e,t=[]){let n=[];return v.Children.forEach(e,(e,r)=>{if(!v.isValidElement(e))return;let i=[...t,r];if(e.type===v.Fragment){n.push.apply(n,Bt(e.props.children,i));return}D(e.type===Lt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),D(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Bt(e.props.children,i)),n.push(a)}),n}var Vt=`get`,Ht=`application/x-www-form-urlencoded`;function Ut(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Wt(e){return Ut(e)&&e.tagName.toLowerCase()===`button`}function Gt(e){return Ut(e)&&e.tagName.toLowerCase()===`form`}function Kt(e){return Ut(e)&&e.tagName.toLowerCase()===`input`}function qt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Jt(e,t){return e.button===0&&(!t||t===`_self`)&&!qt(e)}var Yt=null;function Xt(){if(Yt===null)try{new FormData(document.createElement(`form`),0),Yt=!1}catch{Yt=!0}return Yt}var Zt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Qt(e){return e!=null&&!Zt.has(e)?(O(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ht}"`),null):e}function $t(e,t){let n,r,i,a,o;if(Gt(e)){let o=e.getAttribute(`action`);r=o?Ce(o,t):null,n=e.getAttribute(`method`)||Vt,i=Qt(e.getAttribute(`enctype`))||Ht,a=new FormData(e)}else if(Wt(e)||Kt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?Ce(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Vt,i=Qt(e.getAttribute(`formenctype`))||Qt(o.getAttribute(`enctype`))||Ht,a=new FormData(o,e),!Xt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Ut(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Vt,r=null,i=Ht,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var en={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},tn=/[&><\u2028\u2029]/g;function nn(e){return e.replace(tn,e=>en[e])}function rn(e,t){if(e===!1||e==null)throw Error(t)}function an(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&Ce(i.pathname,t)===`/`?i.pathname=`${Ne(t)}/_root.${r}`:i.pathname=`${Ne(i.pathname)}.${r}`,i}async function on(e,t){if(e.id in t)return t[e.id];try{let n=await C(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function sn(e){return e!=null&&typeof e.page==`string`}function cn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function ln(e,t,n){return mn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await on(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(cn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function un(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function dn(e,t,{includeHydrateFallback:n}={}){return fn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function fn(e){return[...new Set(e)]}function pn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function mn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!sn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(pn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function hn(){let e=v.useContext(We);return rn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function gn(){let e=v.useContext(Ge);return rn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var _n=v.createContext(void 0);_n.displayName=`FrameworkContext`;function vn(){let e=v.useContext(_n);return rn(e,`You must render this element inside a <HydratedRouter> element`),e}function yn(e,t){let n=v.useContext(_n),[r,i]=v.useState(!1),[a,o]=v.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=v.useRef(null);v.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),v.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:bn(s,p),onBlur:bn(c,m),onMouseEnter:bn(l,p),onMouseLeave:bn(u,m),onTouchStart:bn(d,p)}]:[a,f,{}]:[!1,f,{}]}function bn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function xn({page:e,...t}){let n=qe(),{router:r}=hn(),i=v.useMemo(()=>A(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?v.createElement(Cn,{page:e,matches:i,...t}):v.createElement(wn,{page:e,matches:i,...t}):null}function Sn(e){let{manifest:t,routeModules:n}=vn(),[r,i]=v.useState([]);return v.useEffect(()=>{let r=!1;return ln(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Cn({page:e,matches:t,...n}){let r=ct(),{future:i}=vn(),{basename:a}=hn(),o=v.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=an(e,a,i.unstable_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.unstable_trailingSlashAwareDataRequests,e,r,t]);return v.createElement(v.Fragment,null,o.map(e=>v.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function wn({page:e,matches:t,...n}){let r=ct(),{future:i,manifest:a,routeModules:o}=vn(),{basename:s}=hn(),{loaderData:c,matches:l}=gn(),u=v.useMemo(()=>un(e,t,l,a,r,`data`),[e,t,l,a,r]),d=v.useMemo(()=>un(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=v.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=an(e,s,i.unstable_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.unstable_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=v.useMemo(()=>dn(d,a),[d,a]),m=Sn(d);return v.createElement(v.Fragment,null,f.map(e=>v.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>v.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>v.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Tn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}v.Component;var En=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{En&&(window.__reactRouterVersion=`7.14.2`)}catch{}function Dn({basename:e,children:t,unstable_useTransitions:n,window:r}){let i=v.useRef();i.current??=E({window:r,v5Compat:!0});let a=i.current,[o,s]=v.useState({action:a.action,location:a.location}),c=v.useCallback(e=>{n===!1?s(e):v.startTransition(()=>s(e))},[n]);return v.useLayoutEffect(()=>a.listen(c),[a,c]),v.createElement(Rt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,unstable_useTransitions:n})}function On({basename:e,children:t,history:n,unstable_useTransitions:r}){let[i,a]=v.useState({action:n.action,location:n.location}),o=v.useCallback(e=>{r===!1?a(e):v.startTransition(()=>a(e))},[r]);return v.useLayoutEffect(()=>n.listen(o),[n,o]),v.createElement(Rt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,unstable_useTransitions:r})}On.displayName=`unstable_HistoryRouter`;var kn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,An=v.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,unstable_mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,unstable_useTransitions:_}=v.useContext(Ze),y=typeof l==`string`&&kn.test(l),b=Ve(l,h);l=b.to;let x=ot(l,{relative:r}),S=ct(),C=null;if(o){let e=Ae(o,[],S.unstable_mask?S.unstable_mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Me([h,e.pathname])),C=g.createHref(e)}let[w,T,E]=yn(n,p),D=Ln(l,{replace:a,unstable_mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:f,unstable_useTransitions:_});function O(t){e&&e(t),t.defaultPrevented||D(t)}let k=!(b.isExternal||i),ee=v.createElement(`a`,{...p,...E,href:(k?C:void 0)||b.absoluteURL||x,onClick:k?O:e,ref:Tn(m,T),target:c,"data-discover":!y&&t===`render`?`true`:void 0});return w&&!y?v.createElement(v.Fragment,null,ee,v.createElement(xn,{page:x})):ee});An.displayName=`Link`;var jn=v.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=mt(a,{relative:c.relative}),d=ct(),f=v.useContext(Ge),{navigator:p,basename:m}=v.useContext(Ze),h=f!=null&&qn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),y=y?y.toLowerCase():null,g=g.toLowerCase()),y&&m&&(y=Ce(y,m)||y);let b=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,x=_===g||!r&&_.startsWith(g)&&_.charAt(b)===`/`,S=y!=null&&(y===g||!r&&y.startsWith(g)&&y.charAt(g.length)===`/`),C={isActive:x,isPending:S,isTransitioning:h},w=x?e:void 0,T;T=typeof n==`function`?n(C):[n,x?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let E=typeof i==`function`?i(C):i;return v.createElement(An,{...c,"aria-current":w,className:T,ref:l,style:E,to:a,viewTransition:o},typeof s==`function`?s(C):s)});jn.displayName=`NavLink`;var Mn=v.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Vt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m)=>{let{unstable_useTransitions:h}=v.useContext(Ze),g=Bn(),_=Vn(s,{relative:l}),y=o.toLowerCase()===`get`?`get`:`post`,b=typeof s==`string`&&kn.test(s);return v.createElement(`form`,{ref:m,method:y,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f});h&&n!==!1?v.startTransition(()=>p()):p()},...p,"data-discover":!b&&e===`render`?`true`:void 0})});Mn.displayName=`Form`;function Nn({getKey:e,storageKey:t,...n}){let r=v.useContext(_n),{basename:i}=v.useContext(Ze),a=ct(),o=jt();Gn({getKey:e,storageKey:t});let s=v.useMemo(()=>{if(!r||!e)return null;let t=Wn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return v.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${nn(JSON.stringify(t||Hn))}, ${nn(JSON.stringify(s))})`}})}Nn.displayName=`ScrollRestoration`;function Pn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Fn(e){let t=v.useContext(We);return D(t,Pn(e)),t}function In(e){let t=v.useContext(Ge);return D(t,Pn(e)),t}function Ln(e,{target:t,replace:n,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:l}={}){let u=dt(),d=ct(),f=mt(e,{relative:o});return v.useCallback(p=>{if(Jt(p,t)){p.preventDefault();let t=n===void 0?ne(d)===ne(f):n,m=()=>u(e,{replace:t,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c});l?v.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Rn=0,zn=()=>`__${String(++Rn)}__`;function Bn(){let{router:e}=Fn(`useSubmit`),{basename:t}=v.useContext(Ze),n=kt(),r=e.fetch,i=e.navigate;return v.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=$t(e,t);a.navigate===!1?await r(a.fetcherKey||zn(),n,a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Vn(e,{relative:t}={}){let{basename:n}=v.useContext(Ze),r=v.useContext($e);D(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...mt(e||`.`,{relative:t})},o=ct();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Me([n,a.pathname])),ne(a)}var Hn=`react-router-scroll-positions`,Un={};function Wn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:Ce(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Gn({getKey:e,storageKey:t}={}){let{router:n}=Fn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=In(`useScrollRestoration`),{basename:a}=v.useContext(Ze),o=ct(),s=jt(),c=At();v.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Kn(v.useCallback(()=>{if(c.state===`idle`){let t=Wn(o,s,a,e);Un[t]=window.scrollY}try{sessionStorage.setItem(t||Hn,JSON.stringify(Un))}catch(e){O(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(v.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Hn);e&&(Un=JSON.parse(e))}catch{}},[t]),v.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Un,()=>window.scrollY,e?(t,n)=>Wn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),v.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{O(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Kn(e,t){let{capture:n}=t||{};v.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function qn(e,{relative:t}={}){let n=v.useContext(Je);D(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Fn(`useViewTransitionState`),i=mt(e,{relative:t});if(!n.isTransitioning)return!1;let a=Ce(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Ce(n.nextLocation.pathname,r)||n.nextLocation.pathname;return be(i.pathname,o)!=null||be(i.pathname,a)!=null}function Jn(e,t){return function(){return e.apply(t,arguments)}}var{toString:Yn}=Object.prototype,{getPrototypeOf:Xn}=Object,{iterator:Zn,toStringTag:Qn}=Symbol,$n=(e=>t=>{let n=Yn.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),er=e=>(e=e.toLowerCase(),t=>$n(t)===e),tr=e=>t=>typeof t===e,{isArray:nr}=Array,rr=tr(`undefined`);function ir(e){return e!==null&&!rr(e)&&e.constructor!==null&&!rr(e.constructor)&&cr(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var ar=er(`ArrayBuffer`);function or(e){let t;return t=typeof ArrayBuffer<`u`&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&ar(e.buffer),t}var sr=tr(`string`),cr=tr(`function`),lr=tr(`number`),ur=e=>typeof e==`object`&&!!e,dr=e=>e===!0||e===!1,fr=e=>{if($n(e)!==`object`)return!1;let t=Xn(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Qn in e)&&!(Zn in e)},pr=e=>{if(!ur(e)||ir(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},mr=er(`Date`),hr=er(`File`),gr=e=>!!(e&&e.uri!==void 0),_r=e=>e&&e.getParts!==void 0,vr=er(`Blob`),yr=er(`FileList`),br=e=>ur(e)&&cr(e.pipe);function xr(){return typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}}var Sr=xr(),Cr=Sr.FormData===void 0?void 0:Sr.FormData,wr=e=>{if(!e)return!1;if(Cr&&e instanceof Cr)return!0;let t=Xn(e);if(!t||t===Object.prototype||!cr(e.append))return!1;let n=$n(e);return n===`formdata`||n===`object`&&cr(e.toString)&&e.toString()===`[object FormData]`},Tr=er(`URLSearchParams`),[Er,Dr,Or,kr]=[`ReadableStream`,`Request`,`Response`,`Headers`].map(er),Ar=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,``);function jr(e,t,{allOwnKeys:n=!1}={}){if(e==null)return;let r,i;if(typeof e!=`object`&&(e=[e]),nr(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(ir(e))return;let i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length,o;for(r=0;r<a;r++)o=i[r],t.call(null,e[o],o,e)}}function Mr(e,t){if(ir(e))return null;t=t.toLowerCase();let n=Object.keys(e),r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}var Nr=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:global,Pr=e=>!rr(e)&&e!==Nr;function Fr(){let{caseless:e,skipUndefined:t}=Pr(this)&&this||{},n={},r=(r,i)=>{if(i===`__proto__`||i===`constructor`||i===`prototype`)return;let a=e&&Mr(n,i)||i;fr(n[a])&&fr(r)?n[a]=Fr(n[a],r):fr(r)?n[a]=Fr({},r):nr(r)?n[a]=r.slice():(!t||!rr(r))&&(n[a]=r)};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&jr(arguments[e],r);return n}var Ir=(e,t,n,{allOwnKeys:r}={})=>(jr(t,(t,r)=>{n&&cr(t)?Object.defineProperty(e,r,{value:Jn(t,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{value:t,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),Lr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Rr=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,`constructor`,{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,`super`,{value:t.prototype}),n&&Object.assign(e.prototype,n)},zr=(e,t,n,r)=>{let i,a,o,s={};if(t||={},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-- >0;)o=i[a],(!r||r(o,e,t))&&!s[o]&&(t[o]=e[o],s[o]=!0);e=n!==!1&&Xn(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Br=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;let r=e.indexOf(t,n);return r!==-1&&r===n},Vr=e=>{if(!e)return null;if(nr(e))return e;let t=e.length;if(!lr(t))return null;let n=Array(t);for(;t-- >0;)n[t]=e[t];return n},Hr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<`u`&&Xn(Uint8Array)),Ur=(e,t)=>{let n=(e&&e[Zn]).call(e),r;for(;(r=n.next())&&!r.done;){let n=r.value;t.call(e,n[0],n[1])}},Wr=(e,t)=>{let n,r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Gr=er(`HTMLFormElement`),Kr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,n){return t.toUpperCase()+n}),qr=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Jr=er(`RegExp`),Yr=(e,t)=>{let n=Object.getOwnPropertyDescriptors(e),r={};jr(n,(n,i)=>{let a;(a=t(n,i,e))!==!1&&(r[i]=a||n)}),Object.defineProperties(e,r)},Xr=e=>{Yr(e,(t,n)=>{if(cr(e)&&[`arguments`,`caller`,`callee`].indexOf(n)!==-1)return!1;let r=e[n];if(cr(r)){if(t.enumerable=!1,`writable`in t){t.writable=!1;return}t.set||=()=>{throw Error(`Can not rewrite read-only method '`+n+`'`)}}})},Zr=(e,t)=>{let n={},r=e=>{e.forEach(e=>{n[e]=!0})};return nr(e)?r(e):r(String(e).split(t)),n},Qr=()=>{},$r=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function ei(e){return!!(e&&cr(e.append)&&e[Qn]===`FormData`&&e[Zn])}var ti=e=>{let t=Array(10),n=(e,r)=>{if(ur(e)){if(t.indexOf(e)>=0)return;if(ir(e))return e;if(!(`toJSON`in e)){t[r]=e;let i=nr(e)?[]:{};return jr(e,(e,t)=>{let a=n(e,r+1);!rr(a)&&(i[t]=a)}),t[r]=void 0,i}}return e};return n(e,0)},ni=er(`AsyncFunction`),ri=e=>e&&(ur(e)||cr(e))&&cr(e.then)&&cr(e.catch),ii=((e,t)=>e?setImmediate:t?((e,t)=>(Nr.addEventListener(`message`,({source:n,data:r})=>{n===Nr&&r===e&&t.length&&t.shift()()},!1),n=>{t.push(n),Nr.postMessage(e,`*`)}))(`axios@${Math.random()}`,[]):e=>setTimeout(e))(typeof setImmediate==`function`,cr(Nr.postMessage)),M={isArray:nr,isArrayBuffer:ar,isBuffer:ir,isFormData:wr,isArrayBufferView:or,isString:sr,isNumber:lr,isBoolean:dr,isObject:ur,isPlainObject:fr,isEmptyObject:pr,isReadableStream:Er,isRequest:Dr,isResponse:Or,isHeaders:kr,isUndefined:rr,isDate:mr,isFile:hr,isReactNativeBlob:gr,isReactNative:_r,isBlob:vr,isRegExp:Jr,isFunction:cr,isStream:br,isURLSearchParams:Tr,isTypedArray:Hr,isFileList:yr,forEach:jr,merge:Fr,extend:Ir,trim:Ar,stripBOM:Lr,inherits:Rr,toFlatObject:zr,kindOf:$n,kindOfTest:er,endsWith:Br,toArray:Vr,forEachEntry:Ur,matchAll:Wr,isHTMLForm:Gr,hasOwnProperty:qr,hasOwnProp:qr,reduceDescriptors:Yr,freezeMethods:Xr,toObjectSet:Zr,toCamelCase:Kr,noop:Qr,toFiniteNumber:$r,findKey:Mr,global:Nr,isContextDefined:Pr,isSpecCompliantForm:ei,toJSONObject:ti,isAsyncFn:ni,isThenable:ri,setImmediate:ii,asap:typeof queueMicrotask<`u`?queueMicrotask.bind(Nr):typeof process<`u`&&process.nextTick||ii,isIterable:e=>e!=null&&cr(e[Zn])},N=class e extends Error{static from(t,n,r,i,a,o){let s=new e(t.message,n||t.code,r,i,a);return s.cause=t,s.name=t.name,t.status!=null&&s.status==null&&(s.status=t.status),o&&Object.assign(s,o),s}constructor(e,t,n,r,i){super(e),Object.defineProperty(this,`message`,{value:e,enumerable:!0,writable:!0,configurable:!0}),this.name=`AxiosError`,this.isAxiosError=!0,t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:M.toJSONObject(this.config),code:this.code,status:this.status}}};N.ERR_BAD_OPTION_VALUE=`ERR_BAD_OPTION_VALUE`,N.ERR_BAD_OPTION=`ERR_BAD_OPTION`,N.ECONNABORTED=`ECONNABORTED`,N.ETIMEDOUT=`ETIMEDOUT`,N.ERR_NETWORK=`ERR_NETWORK`,N.ERR_FR_TOO_MANY_REDIRECTS=`ERR_FR_TOO_MANY_REDIRECTS`,N.ERR_DEPRECATED=`ERR_DEPRECATED`,N.ERR_BAD_RESPONSE=`ERR_BAD_RESPONSE`,N.ERR_BAD_REQUEST=`ERR_BAD_REQUEST`,N.ERR_CANCELED=`ERR_CANCELED`,N.ERR_NOT_SUPPORT=`ERR_NOT_SUPPORT`,N.ERR_INVALID_URL=`ERR_INVALID_URL`,N.ERR_FORM_DATA_DEPTH_EXCEEDED=`ERR_FORM_DATA_DEPTH_EXCEEDED`;function ai(e){return M.isPlainObject(e)||M.isArray(e)}function oi(e){return M.endsWith(e,`[]`)?e.slice(0,-2):e}function si(e,t,n){return e?e.concat(t).map(function(e,t){return e=oi(e),!n&&t?`[`+e+`]`:e}).join(n?`.`:``):t}function ci(e){return M.isArray(e)&&!e.some(ai)}var li=M.toFlatObject(M,{},null,function(e){return/^is[A-Z]/.test(e)});function ui(e,t,n){if(!M.isObject(e))throw TypeError(`target must be an object`);t||=new FormData,n=M.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!M.isUndefined(t[e])});let r=n.metaTokens,i=n.visitor||d,a=n.dots,o=n.indexes,s=n.Blob||typeof Blob<`u`&&Blob,c=n.maxDepth===void 0?100:n.maxDepth,l=s&&M.isSpecCompliantForm(t);if(!M.isFunction(i))throw TypeError(`visitor must be a function`);function u(e){if(e===null)return``;if(M.isDate(e))return e.toISOString();if(M.isBoolean(e))return e.toString();if(!l&&M.isBlob(e))throw new N(`Blob is not supported. Use a Buffer instead.`);return M.isArrayBuffer(e)||M.isTypedArray(e)?l&&typeof Blob==`function`?new Blob([e]):Buffer.from(e):e}function d(e,n,i){let s=e;if(M.isReactNative(t)&&M.isReactNativeBlob(e))return t.append(si(i,n,a),u(e)),!1;if(e&&!i&&typeof e==`object`){if(M.endsWith(n,`{}`))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(M.isArray(e)&&ci(e)||(M.isFileList(e)||M.endsWith(n,`[]`))&&(s=M.toArray(e)))return n=oi(n),s.forEach(function(e,r){!(M.isUndefined(e)||e===null)&&t.append(o===!0?si([n],r,a):o===null?n:n+`[]`,u(e))}),!1}return ai(e)?!0:(t.append(si(i,n,a),u(e)),!1)}let f=[],p=Object.assign(li,{defaultVisitor:d,convertValue:u,isVisitable:ai});function m(e,n,r=0){if(!M.isUndefined(e)){if(r>c)throw new N(`Object is too deeply nested (`+r+` levels). Max depth: `+c,N.ERR_FORM_DATA_DEPTH_EXCEEDED);if(f.indexOf(e)!==-1)throw Error(`Circular reference detected in `+n.join(`.`));f.push(e),M.forEach(e,function(e,a){(!(M.isUndefined(e)||e===null)&&i.call(t,e,M.isString(a)?a.trim():a,n,p))===!0&&m(e,n?n.concat(a):[a],r+1)}),f.pop()}}if(!M.isObject(e))throw TypeError(`data must be an object`);return m(e),t}function di(e){let t={"!":`%21`,"'":`%27`,"(":`%28`,")":`%29`,"~":`%7E`,"%20":`+`};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(e){return t[e]})}function fi(e,t){this._pairs=[],e&&ui(e,this,t)}var pi=fi.prototype;pi.append=function(e,t){this._pairs.push([e,t])},pi.toString=function(e){let t=e?function(t){return e.call(this,t,di)}:di;return this._pairs.map(function(e){return t(e[0])+`=`+t(e[1])},``).join(`&`)};function mi(e){return encodeURIComponent(e).replace(/%3A/gi,`:`).replace(/%24/g,`$`).replace(/%2C/gi,`,`).replace(/%20/g,`+`)}function hi(e,t,n){if(!t)return e;let r=n&&n.encode||mi,i=M.isFunction(n)?{serialize:n}:n,a=i&&i.serialize,o;if(o=a?a(t,i):M.isURLSearchParams(t)?t.toString():new fi(t,i).toString(r),o){let t=e.indexOf(`#`);t!==-1&&(e=e.slice(0,t)),e+=(e.indexOf(`?`)===-1?`?`:`&`)+o}return e}var gi=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&=[]}forEach(e){M.forEach(this.handlers,function(t){t!==null&&e(t)})}},_i={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},vi={isBrowser:!0,classes:{URLSearchParams:typeof URLSearchParams<`u`?URLSearchParams:fi,FormData:typeof FormData<`u`?FormData:null,Blob:typeof Blob<`u`?Blob:null},protocols:[`http`,`https`,`file`,`blob`,`url`,`data`]},yi=s({hasBrowserEnv:()=>bi,hasStandardBrowserEnv:()=>Si,hasStandardBrowserWebWorkerEnv:()=>Ci,navigator:()=>xi,origin:()=>wi}),bi=typeof window<`u`&&typeof document<`u`,xi=typeof navigator==`object`&&navigator||void 0,Si=bi&&(!xi||[`ReactNative`,`NativeScript`,`NS`].indexOf(xi.product)<0),Ci=typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope&&typeof self.importScripts==`function`,wi=bi&&window.location.href||`http://localhost`,Ti={...yi,...vi};function Ei(e,t){return ui(e,new Ti.classes.URLSearchParams,{visitor:function(e,t,n,r){return Ti.isNode&&M.isBuffer(e)?(this.append(t,e.toString(`base64`)),!1):r.defaultVisitor.apply(this,arguments)},...t})}function Di(e){return M.matchAll(/\w+|\[(\w*)]/g,e).map(e=>e[0]===`[]`?``:e[1]||e[0])}function Oi(e){let t={},n=Object.keys(e),r,i=n.length,a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function ki(e){function t(e,n,r,i){let a=e[i++];if(a===`__proto__`)return!0;let o=Number.isFinite(+a),s=i>=e.length;return a=!a&&M.isArray(r)?r.length:a,s?(M.hasOwnProp(r,a)?r[a]=M.isArray(r[a])?r[a].concat(n):[r[a],n]:r[a]=n,!o):((!r[a]||!M.isObject(r[a]))&&(r[a]=[]),t(e,n,r[a],i)&&M.isArray(r[a])&&(r[a]=Oi(r[a])),!o)}if(M.isFormData(e)&&M.isFunction(e.entries)){let n={};return M.forEachEntry(e,(e,r)=>{t(Di(e),r,n,0)}),n}return null}var Ai=(e,t)=>e!=null&&M.hasOwnProp(e,t)?e[t]:void 0;function ji(e,t,n){if(M.isString(e))try{return(t||JSON.parse)(e),M.trim(e)}catch(e){if(e.name!==`SyntaxError`)throw e}return(n||JSON.stringify)(e)}var Mi={transitional:_i,adapter:[`xhr`,`http`,`fetch`],transformRequest:[function(e,t){let n=t.getContentType()||``,r=n.indexOf(`application/json`)>-1,i=M.isObject(e);if(i&&M.isHTMLForm(e)&&(e=new FormData(e)),M.isFormData(e))return r?JSON.stringify(ki(e)):e;if(M.isArrayBuffer(e)||M.isBuffer(e)||M.isStream(e)||M.isFile(e)||M.isBlob(e)||M.isReadableStream(e))return e;if(M.isArrayBufferView(e))return e.buffer;if(M.isURLSearchParams(e))return t.setContentType(`application/x-www-form-urlencoded;charset=utf-8`,!1),e.toString();let a;if(i){let t=Ai(this,`formSerializer`);if(n.indexOf(`application/x-www-form-urlencoded`)>-1)return Ei(e,t).toString();if((a=M.isFileList(e))||n.indexOf(`multipart/form-data`)>-1){let n=Ai(this,`env`),r=n&&n.FormData;return ui(a?{"files[]":e}:e,r&&new r,t)}}return i||r?(t.setContentType(`application/json`,!1),ji(e)):e}],transformResponse:[function(e){let t=Ai(this,`transitional`)||Mi.transitional,n=t&&t.forcedJSONParsing,r=Ai(this,`responseType`),i=r===`json`;if(M.isResponse(e)||M.isReadableStream(e))return e;if(e&&M.isString(e)&&(n&&!r||i)){let n=!(t&&t.silentJSONParsing)&&i;try{return JSON.parse(e,Ai(this,`parseReviver`))}catch(e){if(n)throw e.name===`SyntaxError`?N.from(e,N.ERR_BAD_RESPONSE,this,null,Ai(this,`response`)):e}}return e}],timeout:0,xsrfCookieName:`XSRF-TOKEN`,xsrfHeaderName:`X-XSRF-TOKEN`,maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ti.classes.FormData,Blob:Ti.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:`application/json, text/plain, */*`,"Content-Type":void 0}}};M.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`],e=>{Mi.headers[e]={}});var Ni=M.toObjectSet([`age`,`authorization`,`content-length`,`content-type`,`etag`,`expires`,`from`,`host`,`if-modified-since`,`if-unmodified-since`,`last-modified`,`location`,`max-forwards`,`proxy-authorization`,`referer`,`retry-after`,`user-agent`]),Pi=e=>{let t={},n,r,i;return e&&e.split(`
`).forEach(function(e){i=e.indexOf(`:`),n=e.substring(0,i).trim().toLowerCase(),r=e.substring(i+1).trim(),!(!n||t[n]&&Ni[n])&&(n===`set-cookie`?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+`, `+r:r)}),t},Fi=Symbol(`internals`),Ii=/[^\x09\x20-\x7E\x80-\xFF]/g;function Li(e){let t=0,n=e.length;for(;t<n;){let n=e.charCodeAt(t);if(n!==9&&n!==32)break;t+=1}for(;n>t;){let t=e.charCodeAt(n-1);if(t!==9&&t!==32)break;--n}return t===0&&n===e.length?e:e.slice(t,n)}function Ri(e){return e&&String(e).trim().toLowerCase()}function zi(e){return Li(e.replace(Ii,``))}function P(e){return e===!1||e==null?e:M.isArray(e)?e.map(P):zi(String(e))}function Bi(e){let t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}var Vi=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Hi(e,t,n,r,i){if(M.isFunction(r))return r.call(this,t,n);if(i&&(t=n),M.isString(t)){if(M.isString(r))return t.indexOf(r)!==-1;if(M.isRegExp(r))return r.test(t)}}function Ui(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}function Wi(e,t){let n=M.toCamelCase(` `+t);[`get`,`set`,`has`].forEach(r=>{Object.defineProperty(e,r+n,{value:function(e,n,i){return this[r].call(this,t,e,n,i)},configurable:!0})})}var Gi=class{constructor(e){e&&this.set(e)}set(e,t,n){let r=this;function i(e,t,n){let i=Ri(t);if(!i)throw Error(`header name must be a non-empty string`);let a=M.findKey(r,i);(!a||r[a]===void 0||n===!0||n===void 0&&r[a]!==!1)&&(r[a||t]=P(e))}let a=(e,t)=>M.forEach(e,(e,n)=>i(e,n,t));if(M.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(M.isString(e)&&(e=e.trim())&&!Vi(e))a(Pi(e),t);else if(M.isObject(e)&&M.isIterable(e)){let n={},r,i;for(let t of e){if(!M.isArray(t))throw TypeError(`Object iterator must return a key-value pair`);n[i=t[0]]=(r=n[i])?M.isArray(r)?[...r,t[1]]:[r,t[1]]:t[1]}a(n,t)}else e!=null&&i(t,e,n);return this}get(e,t){if(e=Ri(e),e){let n=M.findKey(this,e);if(n){let e=this[n];if(!t)return e;if(t===!0)return Bi(e);if(M.isFunction(t))return t.call(this,e,n);if(M.isRegExp(t))return t.exec(e);throw TypeError(`parser must be boolean|regexp|function`)}}}has(e,t){if(e=Ri(e),e){let n=M.findKey(this,e);return!!(n&&this[n]!==void 0&&(!t||Hi(this,this[n],n,t)))}return!1}delete(e,t){let n=this,r=!1;function i(e){if(e=Ri(e),e){let i=M.findKey(n,e);i&&(!t||Hi(n,n[i],i,t))&&(delete n[i],r=!0)}}return M.isArray(e)?e.forEach(i):i(e),r}clear(e){let t=Object.keys(this),n=t.length,r=!1;for(;n--;){let i=t[n];(!e||Hi(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){let t=this,n={};return M.forEach(this,(r,i)=>{let a=M.findKey(n,i);if(a){t[a]=P(r),delete t[i];return}let o=e?Ui(i):String(i).trim();o!==i&&delete t[i],t[o]=P(r),n[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){let t=Object.create(null);return M.forEach(this,(n,r)=>{n!=null&&n!==!1&&(t[r]=e&&M.isArray(n)?n.join(`, `):n)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+`: `+t).join(`
`)}getSetCookie(){return this.get(`set-cookie`)||[]}get[Symbol.toStringTag](){return`AxiosHeaders`}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){let n=new this(e);return t.forEach(e=>n.set(e)),n}static accessor(e){let t=(this[Fi]=this[Fi]={accessors:{}}).accessors,n=this.prototype;function r(e){let r=Ri(e);t[r]||(Wi(n,e),t[r]=!0)}return M.isArray(e)?e.forEach(r):r(e),this}};Gi.accessor([`Content-Type`,`Content-Length`,`Accept`,`Accept-Encoding`,`User-Agent`,`Authorization`]),M.reduceDescriptors(Gi.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}}),M.freezeMethods(Gi);function Ki(e,t){let n=this||Mi,r=t||n,i=Gi.from(r.headers),a=r.data;return M.forEach(e,function(e){a=e.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function qi(e){return!!(e&&e.__CANCEL__)}var Ji=class extends N{constructor(e,t,n){super(e??`canceled`,N.ERR_CANCELED,t,n),this.name=`CanceledError`,this.__CANCEL__=!0}};function Yi(e,t,n){let r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new N(`Request failed with status code `+n.status,[N.ERR_BAD_REQUEST,N.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Xi(e){let t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||``}function Zi(e,t){e||=10;let n=Array(e),r=Array(e),i=0,a=0,o;return t=t===void 0?1e3:t,function(s){let c=Date.now(),l=r[a];o||=c,n[i]=s,r[i]=c;let u=a,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),c-o<t)return;let f=l&&c-l;return f?Math.round(d*1e3/f):void 0}}function Qi(e,t){let n=0,r=1e3/t,i,a,o=(t,r=Date.now())=>{n=r,i=null,a&&=(clearTimeout(a),null),e(...t)};return[(...e)=>{let t=Date.now(),s=t-n;s>=r?o(e,t):(i=e,a||=setTimeout(()=>{a=null,o(i)},r-s))},()=>i&&o(i)]}var $i=(e,t,n=3)=>{let r=0,i=Zi(50,250);return Qi(n=>{let a=n.loaded,o=n.lengthComputable?n.total:void 0,s=o==null?a:Math.min(a,o),c=Math.max(0,s-r),l=i(c);r=Math.max(r,s),e({loaded:s,total:o,progress:o?s/o:void 0,bytes:c,rate:l||void 0,estimated:l&&o?(o-s)/l:void 0,event:n,lengthComputable:o!=null,[t?`download`:`upload`]:!0})},n)},ea=(e,t)=>{let n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},ta=e=>(...t)=>M.asap(()=>e(...t)),na=Ti.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Ti.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Ti.origin),Ti.navigator&&/(msie|trident)/i.test(Ti.navigator.userAgent)):()=>!0,ra=Ti.hasStandardBrowserEnv?{write(e,t,n,r,i,a,o){if(typeof document>`u`)return;let s=[`${e}=${encodeURIComponent(t)}`];M.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),M.isString(r)&&s.push(`path=${r}`),M.isString(i)&&s.push(`domain=${i}`),a===!0&&s.push(`secure`),M.isString(o)&&s.push(`SameSite=${o}`),document.cookie=s.join(`; `)},read(e){if(typeof document>`u`)return null;let t=document.cookie.match(RegExp(`(?:^|; )`+e+`=([^;]*)`));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,``,Date.now()-864e5,`/`)}}:{write(){},read(){return null},remove(){}};function ia(e){return typeof e==`string`?/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e):!1}function aa(e,t){return t?e.replace(/\/?\/$/,``)+`/`+t.replace(/^\/+/,``):e}function oa(e,t,n){let r=!ia(t);return e&&(r||n===!1)?aa(e,t):t}var sa=e=>e instanceof Gi?{...e}:e;function ca(e,t){t||={};let n=Object.create(null);Object.defineProperty(n,`hasOwnProperty`,{value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(e,t,n,r){return M.isPlainObject(e)&&M.isPlainObject(t)?M.merge.call({caseless:r},e,t):M.isPlainObject(t)?M.merge({},t):M.isArray(t)?t.slice():t}function i(e,t,n,i){if(!M.isUndefined(t))return r(e,t,n,i);if(!M.isUndefined(e))return r(void 0,e,n,i)}function a(e,t){if(!M.isUndefined(t))return r(void 0,t)}function o(e,t){if(!M.isUndefined(t))return r(void 0,t);if(!M.isUndefined(e))return r(void 0,e)}function s(n,i,a){if(M.hasOwnProp(t,a))return r(n,i);if(M.hasOwnProp(e,a))return r(void 0,n)}let c={url:a,method:a,data:a,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:s,headers:(e,t,n)=>i(sa(e),sa(t),n,!0)};return M.forEach(Object.keys({...e,...t}),function(r){if(r===`__proto__`||r===`constructor`||r===`prototype`)return;let a=M.hasOwnProp(c,r)?c[r]:i,o=a(M.hasOwnProp(e,r)?e[r]:void 0,M.hasOwnProp(t,r)?t[r]:void 0,r);M.isUndefined(o)&&a!==s||(n[r]=o)}),n}var la=e=>{let t=ca({},e),n=e=>M.hasOwnProp(t,e)?t[e]:void 0,r=n(`data`),i=n(`withXSRFToken`),a=n(`xsrfHeaderName`),o=n(`xsrfCookieName`),s=n(`headers`),c=n(`auth`),l=n(`baseURL`),u=n(`allowAbsoluteUrls`),d=n(`url`);if(t.headers=s=Gi.from(s),t.url=hi(oa(l,d,u),e.params,e.paramsSerializer),c&&s.set(`Authorization`,`Basic `+btoa((c.username||``)+`:`+(c.password?unescape(encodeURIComponent(c.password)):``))),M.isFormData(r)){if(Ti.hasStandardBrowserEnv||Ti.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(M.isFunction(r.getHeaders)){let e=r.getHeaders(),t=[`content-type`,`content-length`];Object.entries(e).forEach(([e,n])=>{t.includes(e.toLowerCase())&&s.set(e,n)})}}if(Ti.hasStandardBrowserEnv&&(M.isFunction(i)&&(i=i(t)),i===!0||i==null&&na(t.url))){let e=a&&o&&ra.read(o);e&&s.set(a,e)}return t},ua=typeof XMLHttpRequest<`u`&&function(e){return new Promise(function(t,n){let r=la(e),i=r.data,a=Gi.from(r.headers).normalize(),{responseType:o,onUploadProgress:s,onDownloadProgress:c}=r,l,u,d,f,p;function m(){f&&f(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener(`abort`,l)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function g(){if(!h)return;let r=Gi.from(`getAllResponseHeaders`in h&&h.getAllResponseHeaders());Yi(function(e){t(e),m()},function(e){n(e),m()},{data:!o||o===`text`||o===`json`?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:r,config:e,request:h}),h=null}`onloadend`in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf(`file:`)===0)||setTimeout(g)},h.onabort=function(){h&&=(n(new N(`Request aborted`,N.ECONNABORTED,e,h)),null)},h.onerror=function(t){let r=new N(t&&t.message?t.message:`Network Error`,N.ERR_NETWORK,e,h);r.event=t||null,n(r),h=null},h.ontimeout=function(){let t=r.timeout?`timeout of `+r.timeout+`ms exceeded`:`timeout exceeded`,i=r.transitional||_i;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new N(t,i.clarifyTimeoutError?N.ETIMEDOUT:N.ECONNABORTED,e,h)),h=null},i===void 0&&a.setContentType(null),`setRequestHeader`in h&&M.forEach(a.toJSON(),function(e,t){h.setRequestHeader(t,e)}),M.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),o&&o!==`json`&&(h.responseType=r.responseType),c&&([d,p]=$i(c,!0),h.addEventListener(`progress`,d)),s&&h.upload&&([u,f]=$i(s),h.upload.addEventListener(`progress`,u),h.upload.addEventListener(`loadend`,f)),(r.cancelToken||r.signal)&&(l=t=>{h&&=(n(!t||t.type?new Ji(null,e,h):t),h.abort(),null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener(`abort`,l)));let _=Xi(r.url);if(_&&Ti.protocols.indexOf(_)===-1){n(new N(`Unsupported protocol `+_+`:`,N.ERR_BAD_REQUEST,e));return}h.send(i||null)})},da=(e,t)=>{let{length:n}=e=e?e.filter(Boolean):[];if(t||n){let n=new AbortController,r,i=function(e){if(!r){r=!0,o();let t=e instanceof Error?e:this.reason;n.abort(t instanceof N?t:new Ji(t instanceof Error?t.message:t))}},a=t&&setTimeout(()=>{a=null,i(new N(`timeout of ${t}ms exceeded`,N.ETIMEDOUT))},t),o=()=>{e&&=(a&&clearTimeout(a),a=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(i):e.removeEventListener(`abort`,i)}),null)};e.forEach(e=>e.addEventListener(`abort`,i));let{signal:s}=n;return s.unsubscribe=()=>M.asap(o),s}},fa=function*(e,t){let n=e.byteLength;if(!t||n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},pa=async function*(e,t){for await(let n of ma(e))yield*fa(n,t)},ma=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}let t=e.getReader();try{for(;;){let{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},ha=(e,t,n,r)=>{let i=pa(e,t),a=0,o,s=e=>{o||(o=!0,r&&r(e))};return new ReadableStream({async pull(e){try{let{done:t,value:r}=await i.next();if(t){s(),e.close();return}let o=r.byteLength;n&&n(a+=o),e.enqueue(new Uint8Array(r))}catch(e){throw s(e),e}},cancel(e){return s(e),i.return()}},{highWaterMark:2})},ga=64*1024,{isFunction:_a}=M,va=(({Request:e,Response:t})=>({Request:e,Response:t}))(M.global),{ReadableStream:ya,TextEncoder:ba}=M.global,xa=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Sa=e=>{e=M.merge.call({skipUndefined:!0},va,e);let{fetch:t,Request:n,Response:r}=e,i=t?_a(t):typeof fetch==`function`,a=_a(n),o=_a(r);if(!i)return!1;let s=i&&_a(ya),c=i&&(typeof ba==`function`?(e=>t=>e.encode(t))(new ba):async e=>new Uint8Array(await new n(e).arrayBuffer())),l=a&&s&&xa(()=>{let e=!1,t=new n(Ti.origin,{body:new ya,method:`POST`,get duplex(){return e=!0,`half`}}),r=t.headers.has(`Content-Type`);return t.body!=null&&t.body.cancel(),e&&!r}),u=o&&s&&xa(()=>M.isReadableStream(new r(``).body)),d={stream:u&&(e=>e.body)};i&&[`text`,`arrayBuffer`,`blob`,`formData`,`stream`].forEach(e=>{!d[e]&&(d[e]=(t,n)=>{let r=t&&t[e];if(r)return r.call(t);throw new N(`Response type '${e}' is not supported`,N.ERR_NOT_SUPPORT,n)})});let f=async e=>{if(e==null)return 0;if(M.isBlob(e))return e.size;if(M.isSpecCompliantForm(e))return(await new n(Ti.origin,{method:`POST`,body:e}).arrayBuffer()).byteLength;if(M.isArrayBufferView(e)||M.isArrayBuffer(e))return e.byteLength;if(M.isURLSearchParams(e)&&(e+=``),M.isString(e))return(await c(e)).byteLength},p=async(e,t)=>M.toFiniteNumber(e.getContentLength())??f(t);return async e=>{let{url:i,method:o,data:s,signal:c,cancelToken:f,timeout:m,onDownloadProgress:h,onUploadProgress:g,responseType:_,headers:v,withCredentials:y=`same-origin`,fetchOptions:b}=la(e),x=t||fetch;_=_?(_+``).toLowerCase():`text`;let S=da([c,f&&f.toAbortSignal()],m),C=null,w=S&&S.unsubscribe&&(()=>{S.unsubscribe()}),T;try{if(g&&l&&o!==`get`&&o!==`head`&&(T=await p(v,s))!==0){let e=new n(i,{method:`POST`,body:s,duplex:`half`}),t;if(M.isFormData(s)&&(t=e.headers.get(`content-type`))&&v.setContentType(t),e.body){let[t,n]=ea(T,$i(ta(g)));s=ha(e.body,ga,t,n)}}M.isString(y)||(y=y?`include`:`omit`);let t=a&&`credentials`in n.prototype;if(M.isFormData(s)){let e=v.getContentType();e&&/^multipart\/form-data/i.test(e)&&!/boundary=/i.test(e)&&v.delete(`content-type`)}let c={...b,signal:S,method:o.toUpperCase(),headers:v.normalize().toJSON(),body:s,duplex:`half`,credentials:t?y:void 0};C=a&&new n(i,c);let f=await(a?x(C,b):x(i,c)),m=u&&(_===`stream`||_===`response`);if(u&&(h||m&&w)){let e={};[`status`,`statusText`,`headers`].forEach(t=>{e[t]=f[t]});let t=M.toFiniteNumber(f.headers.get(`content-length`)),[n,i]=h&&ea(t,$i(ta(h),!0))||[];f=new r(ha(f.body,ga,n,()=>{i&&i(),w&&w()}),e)}_||=`text`;let E=await d[M.findKey(d,_)||`text`](f,e);return!m&&w&&w(),await new Promise((t,n)=>{Yi(t,n,{data:E,headers:Gi.from(f.headers),status:f.status,statusText:f.statusText,config:e,request:C})})}catch(t){throw w&&w(),t&&t.name===`TypeError`&&/Load failed|fetch/i.test(t.message)?Object.assign(new N(`Network Error`,N.ERR_NETWORK,e,C,t&&t.response),{cause:t.cause||t}):N.from(t,t&&t.code,e,C,t&&t.response)}}},Ca=new Map,wa=e=>{let t=e&&e.env||{},{fetch:n,Request:r,Response:i}=t,a=[r,i,n],o=a.length,s,c,l=Ca;for(;o--;)s=a[o],c=l.get(s),c===void 0&&l.set(s,c=o?new Map:Sa(t)),l=c;return c};wa();var Ta={http:null,xhr:ua,fetch:{get:wa}};M.forEach(Ta,(e,t)=>{if(e){try{Object.defineProperty(e,`name`,{value:t})}catch{}Object.defineProperty(e,`adapterName`,{value:t})}});var Ea=e=>`- ${e}`,Da=e=>M.isFunction(e)||e===null||e===!1;function Oa(e,t){e=M.isArray(e)?e:[e];let{length:n}=e,r,i,a={};for(let o=0;o<n;o++){r=e[o];let n;if(i=r,!Da(r)&&(i=Ta[(n=String(r)).toLowerCase()],i===void 0))throw new N(`Unknown adapter '${n}'`);if(i&&(M.isFunction(i)||(i=i.get(t))))break;a[n||`#`+o]=i}if(!i){let e=Object.entries(a).map(([e,t])=>`adapter ${e} `+(t===!1?`is not supported by the environment`:`is not available in the build`));throw new N(`There is no suitable adapter to dispatch the request `+(n?e.length>1?`since :
`+e.map(Ea).join(`
`):` `+Ea(e[0]):`as no adapter specified`),`ERR_NOT_SUPPORT`)}return i}var ka={getAdapter:Oa,adapters:Ta};function Aa(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ji(null,e)}function ja(e){return Aa(e),e.headers=Gi.from(e.headers),e.data=Ki.call(e,e.transformRequest),[`post`,`put`,`patch`].indexOf(e.method)!==-1&&e.headers.setContentType(`application/x-www-form-urlencoded`,!1),ka.getAdapter(e.adapter||Mi.adapter,e)(e).then(function(t){return Aa(e),t.data=Ki.call(e,e.transformResponse,t),t.headers=Gi.from(t.headers),t},function(t){return qi(t)||(Aa(e),t&&t.response&&(t.response.data=Ki.call(e,e.transformResponse,t.response),t.response.headers=Gi.from(t.response.headers))),Promise.reject(t)})}var Ma=`1.15.2`,Na={};[`object`,`boolean`,`number`,`function`,`string`,`symbol`].forEach((e,t)=>{Na[e]=function(n){return typeof n===e||`a`+(t<1?`n `:` `)+e}});var Pa={};Na.transitional=function(e,t,n){function r(e,t){return`[Axios v`+Ma+`] Transitional option '`+e+`'`+t+(n?`. `+n:``)}return(n,i,a)=>{if(e===!1)throw new N(r(i,` has been removed`+(t?` in `+t:``)),N.ERR_DEPRECATED);return t&&!Pa[i]&&(Pa[i]=!0,console.warn(r(i,` has been deprecated since v`+t+` and will be removed in the near future`))),e?e(n,i,a):!0}},Na.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function Fa(e,t,n){if(typeof e!=`object`)throw new N(`options must be an object`,N.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),i=r.length;for(;i-- >0;){let a=r[i],o=Object.prototype.hasOwnProperty.call(t,a)?t[a]:void 0;if(o){let t=e[a],n=t===void 0||o(t,a,e);if(n!==!0)throw new N(`option `+a+` must be `+n,N.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new N(`Unknown option `+a,N.ERR_BAD_OPTION)}}var Ia={assertOptions:Fa,validators:Na},La=Ia.validators,Ra=class{constructor(e){this.defaults=e||{},this.interceptors={request:new gi,response:new gi}}async request(e,t){try{return await this._request(e,t)}catch(e){if(e instanceof Error){let t={};Error.captureStackTrace?Error.captureStackTrace(t):t=Error();let n=(()=>{if(!t.stack)return``;let e=t.stack.indexOf(`
`);return e===-1?``:t.stack.slice(e+1)})();try{if(!e.stack)e.stack=n;else if(n){let t=n.indexOf(`
`),r=t===-1?-1:n.indexOf(`
`,t+1),i=r===-1?``:n.slice(r+1);String(e.stack).endsWith(i)||(e.stack+=`
`+n)}}catch{}}throw e}}_request(e,t){typeof e==`string`?(t||={},t.url=e):t=e||{},t=ca(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:i}=t;n!==void 0&&Ia.assertOptions(n,{silentJSONParsing:La.transitional(La.boolean),forcedJSONParsing:La.transitional(La.boolean),clarifyTimeoutError:La.transitional(La.boolean),legacyInterceptorReqResOrdering:La.transitional(La.boolean)},!1),r!=null&&(M.isFunction(r)?t.paramsSerializer={serialize:r}:Ia.assertOptions(r,{encode:La.function,serialize:La.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls===void 0?t.allowAbsoluteUrls=!0:t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls),Ia.assertOptions(t,{baseUrl:La.spelling(`baseURL`),withXsrfToken:La.spelling(`withXSRFToken`)},!0),t.method=(t.method||this.defaults.method||`get`).toLowerCase();let a=i&&M.merge(i.common,i[t.method]);i&&M.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`common`],e=>{delete i[e]}),t.headers=Gi.concat(a,i);let o=[],s=!0;this.interceptors.request.forEach(function(e){if(typeof e.runWhen==`function`&&e.runWhen(t)===!1)return;s&&=e.synchronous;let n=t.transitional||_i;n&&n.legacyInterceptorReqResOrdering?o.unshift(e.fulfilled,e.rejected):o.push(e.fulfilled,e.rejected)});let c=[];this.interceptors.response.forEach(function(e){c.push(e.fulfilled,e.rejected)});let l,u=0,d;if(!s){let e=[ja.bind(this),void 0];for(e.unshift(...o),e.push(...c),d=e.length,l=Promise.resolve(t);u<d;)l=l.then(e[u++],e[u++]);return l}d=o.length;let f=t;for(;u<d;){let e=o[u++],t=o[u++];try{f=e(f)}catch(e){t.call(this,e);break}}try{l=ja.call(this,f)}catch(e){return Promise.reject(e)}for(u=0,d=c.length;u<d;)l=l.then(c[u++],c[u++]);return l}getUri(e){return e=ca(this.defaults,e),hi(oa(e.baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}};M.forEach([`delete`,`get`,`head`,`options`],function(e){Ra.prototype[e]=function(t,n){return this.request(ca(n||{},{method:e,url:t,data:(n||{}).data}))}}),M.forEach([`post`,`put`,`patch`],function(e){function t(t){return function(n,r,i){return this.request(ca(i||{},{method:e,headers:t?{"Content-Type":`multipart/form-data`}:{},url:n,data:r}))}}Ra.prototype[e]=t(),Ra.prototype[e+`Form`]=t(!0)});var za=class e{constructor(e){if(typeof e!=`function`)throw TypeError(`executor must be a function.`);let t;this.promise=new Promise(function(e){t=e});let n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t,r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e(function(e,r,i){n.reason||(n.reason=new Ji(e,r,i),t(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){let e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let t;return{token:new e(function(e){t=e}),cancel:t}}};function Ba(e){return function(t){return e.apply(null,t)}}function Va(e){return M.isObject(e)&&e.isAxiosError===!0}var Ha={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ha).forEach(([e,t])=>{Ha[t]=e});function Ua(e){let t=new Ra(e),n=Jn(Ra.prototype.request,t);return M.extend(n,Ra.prototype,t,{allOwnKeys:!0}),M.extend(n,t,null,{allOwnKeys:!0}),n.create=function(t){return Ua(ca(e,t))},n}var F=Ua(Mi);F.Axios=Ra,F.CanceledError=Ji,F.CancelToken=za,F.isCancel=qi,F.VERSION=Ma,F.toFormData=ui,F.AxiosError=N,F.Cancel=F.CanceledError,F.all=function(e){return Promise.all(e)},F.spread=Ba,F.isAxiosError=Va,F.mergeConfig=ca,F.AxiosHeaders=Gi,F.formToJSON=e=>ki(M.isHTMLForm(e)?new FormData(e):e),F.getAdapter=ka.getAdapter,F.HttpStatusCode=Ha,F.default=F;var Wa=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),I=o(((e,t)=>{t.exports=Wa()}))(),Ga=`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --pc-ink:         #0E0E0C;
    --pc-cream:       #FAF8F5;
    --pc-sand:        #EDE9E1;
    --pc-white:       #FFFFFF;
    --pc-coral:       #EF776A;
    --pc-coral-dk:    #D35F52;
    --pc-gold:        #C9A96E;
    --pc-gold-lt:     #F0E2C4;
    --pc-muted:       #7A7770;
    --pc-border:      rgba(14,14,12,0.08);
    --pc-sans:        'Poppins', sans-serif;
    --pc-serif:       'Cormorant Garamond', Georgia, serif;
    --pc-ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --pc-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Keyframes ── */
  @keyframes pcAddPop   { 0%{transform:scale(1);}  40%{transform:scale(1.3);}  100%{transform:scale(1);} }
  @keyframes pcCheckIn  { from{stroke-dashoffset:24;} to{stroke-dashoffset:0;} }
  @keyframes pcRipple   { from{transform:scale(0);opacity:0.5;} to{transform:scale(4);opacity:0;} }
  @keyframes pcBadgeIn  { from{opacity:0;transform:translateY(-8px) scale(0.8);} to{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes pcSlideUp  { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
  @keyframes pcGlow     { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);}  50%{box-shadow:0 0 0 6px rgba(239,119,106,0.15);} }
  @keyframes pcShimmer  { from{background-position:200% 0;} to{background-position:-200% 0;} }
  @keyframes pcSpin     { to{transform:rotate(360deg);} }
  @keyframes pcFloat    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
  @keyframes pcWishHeart{ 0%{transform:scale(1);}  30%{transform:scale(1.4);}  60%{transform:scale(0.9);}  100%{transform:scale(1);} }

  /* ── Card Base ── */
  .pc-wrap {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    background: var(--pc-white);
    border: 1px solid var(--pc-border);
    transition:
      transform   0.45s var(--pc-spring),
      box-shadow  0.45s var(--pc-ease),
      border-color 0.3s;
    cursor: pointer;
    font-family: var(--pc-sans);
    will-change: transform;
  }
  .pc-wrap:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 28px 64px rgba(14,14,12,0.14), 0 4px 16px rgba(14,14,12,0.06);
    border-color: transparent;
  }
  .pc-wrap:active { transform: translateY(-6px) scale(0.995); }

  /* ── Image Block ── */
  .pc-img-block {
    position: relative;
    overflow: hidden;
    aspect-ratio: 3/4;
    background: var(--pc-cream);
    display: block;
    text-decoration: none;
  }

  .pc-img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.7s var(--pc-ease), filter 0.5s;
    display: block;
    filter: brightness(0.97);
  }
  .pc-wrap:hover .pc-img {
    transform: scale(1.08);
    filter: brightness(1.03);
  }

  /* Overlay gradient */
  .pc-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(14,14,12,0.55) 0%,
      rgba(14,14,12,0.15) 40%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s var(--pc-ease);
    pointer-events: none;
  }
  .pc-wrap:hover .pc-img-overlay { opacity: 1; }

  /* ── Top badges ── */
  .pc-badges {
    position: absolute;
    top: 12px; left: 12px;
    display: flex; flex-direction: column; gap: 6px;
    z-index: 3;
  }
  .pc-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: 999px;
    font-family: var(--pc-sans);
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    animation: pcBadgeIn 0.4s var(--pc-spring) both;
  }
  .pc-badge-low  { background: rgba(255,255,255,0.92); color: var(--pc-coral); border: 1px solid rgba(239,119,106,0.25); }
  .pc-badge-out  { background: var(--pc-ink); color: white; }
  .pc-badge-new  { background: linear-gradient(135deg, var(--pc-gold), #B8922A); color: white; box-shadow: 0 3px 10px rgba(201,169,110,0.4); }
  .pc-badge-dot  { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
  .pc-badge-low .pc-badge-dot  { background: var(--pc-coral); animation: pcGlow 1.5s ease infinite; }
  .pc-badge-new .pc-badge-dot  { background: rgba(255,255,255,0.8); }

  /* Wishlist btn */
  .pc-wish {
    position: absolute;
    top: 12px; right: 12px;
    z-index: 4;
    width: 36px; height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    color: var(--pc-muted);
    font-size: 1rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    transform: translateY(-4px) scale(0.85);
    transition: opacity 0.3s, transform 0.3s var(--pc-spring), color 0.2s, background 0.2s;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  .pc-wrap:hover .pc-wish { opacity: 1; transform: translateY(0) scale(1); }
  .pc-wish:hover { background: white; color: var(--pc-coral); transform: scale(1.1) !important; }
  .pc-wish.active { color: var(--pc-coral); background: #FFF0EE; }
  .pc-wish.active svg { animation: pcWishHeart 0.4s var(--pc-spring) both; }

  /* ── Quick-add overlay ── */
  .pc-quick-add {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 16px 14px 14px;
    background: linear-gradient(to top, rgba(14,14,12,0.6) 0%, transparent 100%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.38s var(--pc-spring), opacity 0.3s;
    z-index: 4;
  }
  .pc-wrap:hover .pc-quick-add {
    transform: translateY(0);
    opacity: 1;
  }

  .pc-quick-btn {
    width: 100%;
    padding: 11px 16px;
    border-radius: 999px;
    border: none;
    background: white;
    color: var(--pc-ink);
    font-family: var(--pc-sans);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s var(--pc-spring), box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  .pc-quick-btn:hover {
    background: var(--pc-coral);
    color: white;
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(239,119,106,0.4);
  }
  .pc-quick-btn.added {
    background: #1B5E20 !important;
    color: white !important;
  }
  .pc-quick-btn.added .pc-btn-check {
    animation: pcCheckIn 0.3s var(--pc-ease) both;
  }
  .pc-btn-check {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
  }

  /* Ripple on click */
  .pc-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    width: 10px; height: 10px;
    margin-top: -5px; margin-left: -5px;
    animation: pcRipple 0.5s var(--pc-ease) forwards;
    pointer-events: none;
  }

  /* ── Content Block ── */
  .pc-content { padding: 16px 16px 18px; }

  .pc-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .pc-category {
    font-family: var(--pc-sans);
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--pc-coral);
  }
  .pc-stars {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.6rem;
    color: var(--pc-gold);
    font-weight: 700;
  }
  .pc-stars span { color: var(--pc-muted); font-size: 0.58rem; font-weight: 500; }

  .pc-name {
    font-family: var(--pc-sans);
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--pc-ink);
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin-bottom: 6px;
    text-decoration: none;
    display: block;
    transition: color 0.2s;
  }
  .pc-name:hover { color: var(--pc-coral); }

  .pc-desc {
    font-family: var(--pc-sans);
    font-size: 0.72rem;
    font-weight: 400;
    color: var(--pc-muted);
    line-height: 1.6;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Scent tags */
  .pc-scent-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .pc-scent-tag {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    background: var(--pc-cream);
    border: 1px solid var(--pc-border);
    border-radius: 999px;
    padding: 3px 9px;
    font-family: var(--pc-sans);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--pc-muted);
    transition: border-color 0.2s, color 0.2s;
  }
  .pc-wrap:hover .pc-scent-tag { border-color: rgba(239,119,106,0.2); color: var(--pc-ink); }

  /* Footer: price + add btn */
  .pc-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .pc-price-block { display: flex; flex-direction: column; gap: 1px; }
  .pc-price {
    font-family: var(--pc-serif);
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--pc-ink);
    letter-spacing: -0.01em;
    line-height: 1;
  }
  .pc-price-currency {
    font-family: var(--pc-sans);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--pc-muted);
    margin-left: 3px;
  }
  .pc-price-sub {
    font-family: var(--pc-sans);
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--pc-muted);
    letter-spacing: 0.04em;
    opacity: 0.7;
  }

  /* Add button */
  .pc-add-btn {
    position: relative;
    width: 40px; height: 40px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--pc-coral), var(--pc-coral-dk));
    color: white;
    font-size: 1.3rem;
    font-weight: 300;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: transform 0.2s var(--pc-spring), box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(239,119,106,0.35);
    flex-shrink: 0;
    overflow: hidden;
    font-family: var(--pc-sans);
  }
  .pc-add-btn:hover {
    transform: scale(1.15) rotate(90deg);
    box-shadow: 0 8px 24px rgba(239,119,106,0.5);
  }
  .pc-add-btn:active { transform: scale(0.95) rotate(90deg); }
  .pc-add-btn.added {
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    box-shadow: 0 4px 14px rgba(46,125,50,0.35);
    animation: pcAddPop 0.4s var(--pc-spring) both;
  }
  .pc-add-btn.added:hover { transform: scale(1.1); }
  .pc-add-btn svg { pointer-events: none; }

  .pc-out-label {
    font-family: var(--pc-sans);
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--pc-muted);
    letter-spacing: 0.06em;
    font-style: italic;
  }

  /* ── Volume selector (size pills) ── */
  .pc-volumes {
    display: flex;
    gap: 5px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }
  .pc-vol-pill {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1.5px solid var(--pc-border);
    background: var(--pc-cream);
    font-family: var(--pc-sans);
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--pc-muted);
    cursor: pointer;
    transition: all 0.15s var(--pc-spring);
    letter-spacing: 0.04em;
  }
  .pc-vol-pill:hover { border-color: var(--pc-coral); color: var(--pc-coral); }
  .pc-vol-pill.selected {
    background: var(--pc-coral);
    border-color: var(--pc-coral);
    color: white;
    transform: scale(1.05);
  }

  /* ── Divider line (animated) ── */
  .pc-divider {
    height: 1px;
    background: var(--pc-border);
    margin: 12px 0;
    position: relative;
    overflow: hidden;
  }
  .pc-divider::after {
    content: '';
    position: absolute; top:0; left:0;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--pc-coral), var(--pc-gold));
    transition: width 0.5s var(--pc-ease);
  }
  .pc-wrap:hover .pc-divider::after { width: 100%; }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .pc-wrap { border-radius: 16px; }
    .pc-content { padding: 12px 12px 14px; }
    .pc-name { font-size: 0.82rem; }
    .pc-price { font-size: 1.1rem; }
    .pc-add-btn { width: 34px; height: 34px; }
    .pc-desc { display: none; }
    .pc-scent-tags { display: none; }
    .pc-volumes { display: none; }
  }
`;function Ka(){if(!(typeof document>`u`)&&!document.getElementById(`nahid-product-card-css`)){let e=document.createElement(`style`);e.id=`nahid-product-card-css`,e.textContent=Ga,document.head.appendChild(e)}}function qa(e){let t=e.scent_family||e.notes||e.description||``;return[`Floral`,`Boisé`,`Oriental`,`Frais`,`Musqué`,`Oud`,`Épicé`,`Citrus`,`Cuir`,`Ambre`].filter(e=>t.toLowerCase().includes(e.toLowerCase())).slice(0,3)}var Ja=({product:e,addToCart:t})=>{Ka();let[n,r]=(0,v.useState)(!1),[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(null),c=(0,v.useRef)(null),l=typeof e.price==`string`?parseFloat(e.price):e.price,u=e.stock>0&&e.stock<5,d=e.stock===0,f=e.is_new||e.created_at?.includes(`2025`)||!1,p=qa(e),m=n=>{if(n.preventDefault(),n.stopPropagation(),!d){if(c.current){let e=c.current.getBoundingClientRect(),t=document.createElement(`span`);t.className=`pc-ripple`,t.style.left=`${n.clientX-e.left}px`,t.style.top=`${n.clientY-e.top}px`,c.current.appendChild(t),setTimeout(()=>t.remove(),600)}t(e,1),r(!0),setTimeout(()=>r(!1),2200)}};return(0,I.jsxs)(`div`,{className:`pc-wrap`,children:[(0,I.jsxs)(An,{to:`/product/${e.id}`,className:`pc-img-block`,children:[(0,I.jsx)(`img`,{className:`pc-img`,src:e.image_url,alt:e.name,loading:`lazy`}),(0,I.jsx)(`div`,{className:`pc-img-overlay`}),(0,I.jsxs)(`div`,{className:`pc-badges`,children:[f&&!u&&!d&&(0,I.jsxs)(`span`,{className:`pc-badge pc-badge-new`,children:[(0,I.jsx)(`span`,{className:`pc-badge-dot`}),`Nouveau`]}),u&&(0,I.jsxs)(`span`,{className:`pc-badge pc-badge-low`,children:[(0,I.jsx)(`span`,{className:`pc-badge-dot`}),`Dernières pièces`]}),d&&(0,I.jsx)(`span`,{className:`pc-badge pc-badge-out`,children:`Épuisé`})]}),(0,I.jsx)(`button`,{className:`pc-wish${i?` active`:``}`,onClick:e=>{e.preventDefault(),e.stopPropagation(),a(e=>!e)},"aria-label":`Ajouter aux favoris`,children:(0,I.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:i?`currentColor`:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,I.jsx)(`path`,{d:`M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z`})})}),!d&&(0,I.jsx)(`div`,{className:`pc-quick-add`,children:(0,I.jsx)(`button`,{className:`pc-quick-btn${n?` added`:``}`,onClick:m,ref:c,children:n?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`3`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,I.jsx)(`polyline`,{className:`pc-btn-check`,points:`20 6 9 17 4 12`})}),`Ajouté !`]}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(`svg`,{width:`13`,height:`13`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,I.jsx)(`circle`,{cx:`9`,cy:`21`,r:`1`}),(0,I.jsx)(`circle`,{cx:`20`,cy:`21`,r:`1`}),(0,I.jsx)(`path`,{d:`M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6`})]}),`Ajouter au panier`]})})})]}),(0,I.jsxs)(`div`,{className:`pc-content`,children:[(0,I.jsxs)(`div`,{className:`pc-meta`,children:[e.category&&(0,I.jsx)(`span`,{className:`pc-category`,children:e.category}),(0,I.jsxs)(`div`,{className:`pc-stars`,children:[`★★★★★ `,(0,I.jsx)(`span`,{children:`(4.9)`})]})]}),(0,I.jsx)(An,{to:`/product/${e.id}`,className:`pc-name`,children:e.name}),e.description&&(0,I.jsxs)(`p`,{className:`pc-desc`,children:[e.description.substring(0,80),e.description.length>80?`…`:``]}),p.length>0&&(0,I.jsx)(`div`,{className:`pc-scent-tags`,children:p.map(e=>(0,I.jsx)(`span`,{className:`pc-scent-tag`,children:e},e))}),(0,I.jsx)(`div`,{className:`pc-divider`}),(0,I.jsxs)(`div`,{className:`pc-footer`,children:[(0,I.jsxs)(`div`,{className:`pc-price-block`,children:[(0,I.jsxs)(`span`,{className:`pc-price`,children:[Math.round(l).toLocaleString(`fr-MA`),(0,I.jsx)(`span`,{className:`pc-price-currency`,children:`MAD`})]}),(0,I.jsx)(`span`,{className:`pc-price-sub`,children:`Livraison offerte dès 500 MAD`})]}),d?(0,I.jsx)(`span`,{className:`pc-out-label`,children:`Épuisé`}):(0,I.jsx)(`button`,{className:`pc-add-btn${n?` added`:``}`,onClick:m,"aria-label":`Ajouter au panier`,children:n?(0,I.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`3`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,I.jsx)(`polyline`,{points:`20 6 9 17 4 12`})}):(0,I.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,I.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,I.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`})]})})]})]})]})},Ya=`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --bb-ink:      #0E0E0C;
    --bb-cream:    #FAF8F5;
    --bb-sand:     #EDE9E1;
    --bb-white:    #FFFFFF;
    --bb-coral:    #EF776A;
    --bb-coral-dk: #C9503F;
    --bb-gold:     #C9A96E;
    --bb-gold-lt:  #F5E9D0;
    --bb-muted:    #7A7770;
    --bb-border:   rgba(14,14,12,0.09);
    --bb-green:    #1B5E20;
    --bb-green-lt: #E8F5E9;
    --bb-sans:     'Poppins', sans-serif;
    --bb-serif:    'Cormorant Garamond', Georgia, serif;
    --bb-ease:     cubic-bezier(0.25,0.46,0.45,0.94);
    --bb-spring:   cubic-bezier(0.34,1.56,0.64,1);
  }

  /* ── Animations ── */
  @keyframes bbFadeUp  { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
  @keyframes bbScaleIn { from{opacity:0;transform:scale(0.85);}      to{opacity:1;transform:scale(1);} }
  @keyframes bbCheck   { from{stroke-dashoffset:30;} to{stroke-dashoffset:0;} }
  @keyframes bbPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);}  55%{box-shadow:0 0 0 8px rgba(239,119,106,0.15);} }
  @keyframes bbGoldPulse{ 0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,0);} 55%{box-shadow:0 0 0 8px rgba(201,169,110,0.2);} }
  @keyframes bbShake   { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-4px);} 40%{transform:translateX(4px);} 60%{transform:translateX(-3px);} 80%{transform:translateX(3px);} }
  @keyframes bbSlideUp { from{transform:translateY(100%);} to{transform:translateY(0);} }
  @keyframes bbBounce  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
  @keyframes bbSpin    { to{transform:rotate(360deg);} }
  @keyframes bbRipple  { from{transform:scale(0);opacity:0.5;} to{transform:scale(4);opacity:0;} }
  @keyframes bbFlicker { 0%,100%{opacity:1;} 50%{opacity:0.65;} }
  @keyframes bbBarFill { from{width:0;} }
  @keyframes bbGlow    { 0%,100%{opacity:0.4;} 50%{opacity:1;} }

  .bb-aos { opacity:0;transform:translateY(20px);transition:opacity 0.7s var(--bb-ease),transform 0.7s var(--bb-ease); }
  .bb-aos.bb-vis { opacity:1;transform:translateY(0); }
  .bb-d1{transition-delay:.06s}.bb-d2{transition-delay:.12s}.bb-d3{transition-delay:.18s}.bb-d4{transition-delay:.24s}

  /* ── Section ── */
  .bb-section {
    padding: clamp(80px,10vw,140px) 0 clamp(120px,14vw,180px);
    background: var(--bb-ink);
    position: relative;
    overflow: hidden;
    font-family: var(--bb-sans);
  }
  .bb-section * { box-sizing: border-box; }

  /* Orbs */
  .bb-orb {
    position: absolute; border-radius: 50%; pointer-events: none;
  }
  .bb-orb-1 { width:600px;height:600px;top:-200px;left:-200px;background:radial-gradient(circle,rgba(239,119,106,0.1),transparent 70%); }
  .bb-orb-2 { width:400px;height:400px;bottom:-100px;right:-100px;background:radial-gradient(circle,rgba(201,169,110,0.08),transparent 70%); }

  /* ── Header ── */
  .bb-header { text-align:center; margin-bottom: clamp(48px,6vw,80px); position:relative;z-index:1; }
  .bb-eyebrow {
    display:inline-flex;align-items:center;gap:10px;
    font-size:0.6rem;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;
    color:var(--bb-gold);margin-bottom:18px;
  }
  .bb-eyebrow::before,.bb-eyebrow::after { content:'';display:block;width:24px;height:1px;background:var(--bb-gold); }
  .bb-title {
    font-family:var(--bb-sans);
    font-size:clamp(2.2rem,6vw,4.5rem);
    font-weight:900;color:white;
    letter-spacing:-0.03em;line-height:1.0;margin-bottom:16px;
  }
  .bb-title em { font-style:italic;font-weight:300;font-family:var(--bb-serif);color:var(--bb-coral);font-size:1.08em; }
  .bb-subtitle { font-size:clamp(0.82rem,1.2vw,0.95rem);color:rgba(255,255,255,0.45);max-width:420px;margin:0 auto;line-height:1.75; }

  /* ── Pack Cards Grid ── */
  .bb-packs {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:14px;
    margin-bottom:clamp(48px,6vw,72px);
    position:relative;z-index:1;
  }

  .bb-pack {
    background:rgba(255,255,255,0.04);
    border:1.5px solid rgba(255,255,255,0.07);
    border-radius:24px;
    padding:clamp(22px,3vw,34px) clamp(18px,2.5vw,28px);
    cursor:pointer;
    position:relative;
    overflow:hidden;
    transition:transform 0.35s var(--bb-spring), box-shadow 0.35s, border-color 0.25s, background 0.25s;
  }
  .bb-pack:hover {
    transform:translateY(-6px) scale(1.015);
    border-color:rgba(255,255,255,0.15);
    background:rgba(255,255,255,0.07);
    box-shadow:0 24px 64px rgba(0,0,0,0.3);
  }
  .bb-pack.active {
    border-color:var(--bb-coral) !important;
    background:rgba(239,119,106,0.08) !important;
    box-shadow:0 0 0 1px var(--bb-coral), 0 20px 60px rgba(239,119,106,0.2) !important;
    transform:translateY(-8px) scale(1.02);
  }
  .bb-pack.best {
    border-color:var(--bb-gold);
    background:rgba(201,169,110,0.06);
  }
  .bb-pack.best:hover {
    border-color:var(--bb-gold);
    background:rgba(201,169,110,0.1);
    box-shadow:0 24px 64px rgba(201,169,110,0.15);
  }
  .bb-pack.best.active {
    border-color:var(--bb-gold) !important;
    background:rgba(201,169,110,0.12) !important;
    box-shadow:0 0 0 1px var(--bb-gold), 0 20px 60px rgba(201,169,110,0.25) !important;
    animation: bbGoldPulse 2s ease infinite;
  }
  .bb-pack.active:not(.best) { animation: bbPulse 2s ease infinite; }

  /* Pack badge */
  .bb-pack-badge {
    position:absolute;top:-1px;left:50%;transform:translateX(-50%);
    display:inline-flex;align-items:center;gap:5px;
    padding:5px 14px;border-radius:0 0 12px 12px;
    font-size:0.58rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;
  }
  .bb-pack-badge.coral { background:var(--bb-coral);color:white; }
  .bb-pack-badge.gold { background:linear-gradient(135deg,var(--bb-gold),#B8922A);color:white; }
  .bb-pack-badge.green { background:#2E7D32;color:white; }

  /* Pack content */
  .bb-pack-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px; }
  .bb-pack-name {
    font-size:0.65rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;
    color:rgba(255,255,255,0.45);margin-bottom:6px;
  }
  .bb-pack-qty {
    font-family:var(--bb-sans);
    font-size:clamp(2.2rem,4vw,3rem);font-weight:900;
    color:white;letter-spacing:-0.04em;line-height:1;
  }
  .bb-pack-qty sub { font-size:0.55em;font-weight:600;color:rgba(255,255,255,0.5);letter-spacing:0;vertical-align:baseline; }
  .bb-pack-check {
    width:28px;height:28px;border-radius:50%;
    border:2px solid rgba(255,255,255,0.15);
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;
    transition:all 0.3s var(--bb-spring);
    background:transparent;
  }
  .bb-pack.active .bb-pack-check { background:var(--bb-coral);border-color:var(--bb-coral); }
  .bb-pack.best.active .bb-pack-check { background:var(--bb-gold);border-color:var(--bb-gold); }
  .bb-pack-check svg .bb-chk { stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset 0.35s var(--bb-ease) 0.1s; }
  .bb-pack.active .bb-pack-check svg .bb-chk { stroke-dashoffset:0; }

  .bb-pack-price {
    font-family:var(--bb-serif);
    font-size:clamp(1.8rem,3vw,2.4rem);font-weight:600;
    color:white;letter-spacing:-0.01em;line-height:1;margin-bottom:4px;
  }
  .bb-pack-price-sub { font-family:var(--bb-sans);font-size:0.62rem;font-weight:600;color:rgba(255,255,255,0.35);margin-bottom:16px;letter-spacing:0.04em; }

  .bb-pack-tags { display:flex;flex-direction:column;gap:6px; }
  .bb-pack-tag {
    display:inline-flex;align-items:center;gap:6px;
    font-size:0.65rem;font-weight:700;color:rgba(255,255,255,0.5);
    letter-spacing:0.04em;
  }
  .bb-pack-tag .dot { width:5px;height:5px;border-radius:50%;flex-shrink:0; }
  .bb-pack-tag.green .dot { background:#4ADE80; }
  .bb-pack-tag.coral .dot { background:var(--bb-coral);animation:bbFlicker 1.5s ease infinite; }
  .bb-pack-tag.gold .dot { background:var(--bb-gold); }
  .bb-pack-tag.green { color:rgba(74,222,128,0.85); }
  .bb-pack-tag.coral { color:rgba(239,119,106,0.85); }
  .bb-pack-tag.gold  { color:rgba(201,169,110,0.85); }

  .bb-pack-savings {
    margin-top:16px;
    padding:8px 12px;border-radius:10px;
    background:rgba(74,222,128,0.08);
    border:1px solid rgba(74,222,128,0.15);
    font-size:0.62rem;font-weight:800;
    color:rgba(74,222,128,0.85);letter-spacing:0.08em;text-transform:uppercase;
    text-align:center;
  }

  /* ── Step Indicator ── */
  .bb-steps {
    display:flex;justify-content:center;align-items:center;gap:0;
    margin-bottom:clamp(36px,5vw,56px);position:relative;z-index:1;
  }
  .bb-step-item {
    display:flex;flex-direction:column;align-items:center;gap:8px;
    position:relative;z-index:1;
  }
  .bb-step-conn {
    width:clamp(40px,6vw,80px);height:2px;
    background:rgba(255,255,255,0.08);
    position:relative;overflow:hidden;margin-bottom:22px;
    border-radius:1px;
  }
  .bb-step-conn-fill {
    position:absolute;inset-y:0;left:0;
    background:linear-gradient(to right,var(--bb-coral),var(--bb-gold));
    transition:width 0.5s var(--bb-ease);
    border-radius:1px;
  }
  .bb-step-dot {
    width:36px;height:36px;border-radius:50%;
    border:2px solid rgba(255,255,255,0.12);
    background:rgba(255,255,255,0.04);
    display:flex;align-items:center;justify-content:center;
    font-family:var(--bb-sans);font-size:0.75rem;font-weight:800;color:rgba(255,255,255,0.3);
    transition:all 0.35s var(--bb-spring);
    position:relative;
  }
  .bb-step-dot.filled {
    background:var(--bb-coral);border-color:var(--bb-coral);
    color:white;box-shadow:0 4px 16px rgba(239,119,106,0.4);
    animation:bbScaleIn 0.4s var(--bb-spring) both;
  }
  .bb-step-dot.partial {
    border-color:rgba(239,119,106,0.5);
    color:rgba(239,119,106,0.7);
  }
  .bb-step-label {
    font-size:0.6rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
    color:rgba(255,255,255,0.25);white-space:nowrap;
    transition:color 0.25s;
  }
  .bb-step-label.active { color:rgba(255,255,255,0.7); }

  /* ── Product Grid ── */
  .bb-section-label {
    font-size:0.62rem;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;
    color:rgba(255,255,255,0.3);margin-bottom:20px;
    display:flex;align-items:center;gap:12px;
    position:relative;z-index:1;
  }
  .bb-section-label::after { content:'';flex:1;height:1px;background:rgba(255,255,255,0.06); }

  .bb-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(clamp(150px,18vw,200px),1fr));
    gap:14px;
    margin-bottom:clamp(40px,5vw,64px);
    position:relative;z-index:1;
  }

  /* Product card */
  .bb-card {
    border-radius:18px;overflow:hidden;cursor:pointer;
    background:rgba(255,255,255,0.04);
    border:1.5px solid rgba(255,255,255,0.06);
    transition:transform 0.35s var(--bb-spring),box-shadow 0.35s,border-color 0.25s,background 0.25s,opacity 0.25s;
    position:relative;
  }
  .bb-card:hover:not(.bb-card-disabled) {
    transform:translateY(-6px) scale(1.02);
    box-shadow:0 20px 50px rgba(0,0,0,0.35);
    border-color:rgba(255,255,255,0.14);
    background:rgba(255,255,255,0.07);
  }
  .bb-card.bb-card-selected {
    border-color:var(--bb-coral) !important;
    background:rgba(239,119,106,0.1) !important;
    box-shadow:0 0 0 1px var(--bb-coral), 0 16px 48px rgba(239,119,106,0.2) !important;
  }
  .bb-card.bb-card-disabled { opacity:0.28;cursor:not-allowed;filter:grayscale(0.3); }

  .bb-card-img-wrap {
    position:relative;overflow:hidden;aspect-ratio:1/1;background:rgba(255,255,255,0.03);
  }
  .bb-card-img {
    width:100%;height:100%;object-fit:cover;display:block;
    transition:transform 0.6s var(--bb-ease),filter 0.4s;
    filter:brightness(0.9);
  }
  .bb-card:hover:not(.bb-card-disabled) .bb-card-img { transform:scale(1.08);filter:brightness(1.0); }

  .bb-card-overlay {
    position:absolute;inset:0;
    background:linear-gradient(to top,rgba(14,14,12,0.6) 0%,transparent 55%);
    opacity:0;transition:opacity 0.35s;pointer-events:none;
  }
  .bb-card:hover:not(.bb-card-disabled) .bb-card-overlay { opacity:1; }

  /* Check badge */
  .bb-card-check-badge {
    position:absolute;top:10px;right:10px;
    width:30px;height:30px;border-radius:50%;
    background:var(--bb-coral);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 4px 12px rgba(239,119,106,0.5);
    animation:bbScaleIn 0.35s var(--bb-spring) both;
    z-index:2;
  }
  .bb-card-check-badge svg .bb-ck { stroke-dasharray:16;stroke-dashoffset:16;animation:bbCheck 0.3s var(--bb-ease) 0.1s forwards; }

  /* Number badge */
  .bb-card-num {
    position:absolute;top:10px;left:10px;
    width:24px;height:24px;border-radius:50%;
    background:var(--bb-coral);color:white;
    font-family:var(--bb-sans);font-size:0.65rem;font-weight:800;
    display:flex;align-items:center;justify-content:center;
    animation:bbScaleIn 0.35s var(--bb-spring) both;z-index:2;
  }

  .bb-card-body { padding:12px 13px 14px; }
  .bb-card-cat {
    font-size:0.55rem;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;
    color:var(--bb-coral);margin-bottom:4px;
  }
  .bb-card-name {
    font-family:var(--bb-sans);font-size:0.78rem;font-weight:700;
    color:white;letter-spacing:-0.01em;line-height:1.25;margin-bottom:8px;
  }
  .bb-card-footer { display:flex;justify-content:space-between;align-items:center; }
  .bb-card-price {
    font-family:var(--bb-serif);font-size:1rem;font-weight:600;
    color:rgba(255,255,255,0.85);
  }
  .bb-card-add {
    width:26px;height:26px;border-radius:50%;border:none;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all 0.2s var(--bb-spring);
    font-family:var(--bb-sans);font-size:0.9rem;line-height:1;font-weight:300;
  }
  .bb-card-add.plus { background:rgba(255,255,255,0.1);color:white; }
  .bb-card-add.plus:hover { background:var(--bb-coral);transform:scale(1.15) rotate(90deg); }
  .bb-card-add.minus { background:var(--bb-coral);color:white; }
  .bb-card-add.minus:hover { background:var(--bb-coral-dk);transform:scale(1.1); }

  /* ── Summary Panel ── */
  .bb-summary {
    position:relative;z-index:2;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:28px;padding:clamp(24px,3vw,36px);
    backdrop-filter:blur(20px);
  }
  .bb-summary-top {
    display:flex;align-items:flex-start;justify-content:space-between;
    gap:24px;flex-wrap:wrap;margin-bottom:24px;
  }

  /* Pills selected */
  .bb-pills-row { display:flex;gap:8px;flex-wrap:wrap;align-items:center; }
  .bb-pill {
    display:inline-flex;align-items:center;gap:6px;
    padding:6px 14px;border-radius:999px;
    background:rgba(239,119,106,0.12);
    border:1px solid rgba(239,119,106,0.25);
    color:rgba(255,255,255,0.8);font-size:0.7rem;font-weight:600;
    animation:bbFadeUp 0.3s var(--bb-spring) both;
  }
  .bb-pill-rm {
    width:16px;height:16px;border-radius:50%;
    background:rgba(255,255,255,0.1);border:none;color:rgba(255,255,255,0.5);
    font-size:0.6rem;display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all 0.15s;flex-shrink:0;font-family:var(--bb-sans);
  }
  .bb-pill-rm:hover { background:var(--bb-coral);color:white;transform:scale(1.15); }
  .bb-pill-empty {
    display:inline-flex;align-items:center;gap:6px;
    padding:6px 16px;border-radius:999px;
    border:1.5px dashed rgba(255,255,255,0.12);
    color:rgba(255,255,255,0.2);font-size:0.68rem;font-weight:500;font-style:italic;
  }

  /* Price block */
  .bb-price-block { text-align:right;flex-shrink:0; }
  .bb-price-original {
    font-size:0.8rem;color:rgba(255,255,255,0.3);
    text-decoration:line-through;margin-bottom:3px;
  }
  .bb-price-final {
    font-family:var(--bb-serif);
    font-size:clamp(1.8rem,3vw,2.6rem);font-weight:600;
    color:white;letter-spacing:-0.01em;line-height:1;
  }
  .bb-savings-tag {
    display:inline-flex;align-items:center;gap:5px;
    background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.2);
    border-radius:999px;padding:4px 12px;
    font-size:0.62rem;font-weight:800;color:rgba(74,222,128,0.9);
    letter-spacing:0.08em;text-transform:uppercase;margin-top:6px;
  }

  /* Progress bar */
  .bb-progress-wrap { margin-bottom:20px; }
  .bb-progress-label {
    display:flex;justify-content:space-between;align-items:center;
    margin-bottom:8px;
  }
  .bb-progress-text { font-size:0.68rem;font-weight:600;color:rgba(255,255,255,0.35);letter-spacing:0.04em; }
  .bb-progress-pct  { font-size:0.68rem;font-weight:700;color:var(--bb-coral); }
  .bb-progress-track {
    height:4px;background:rgba(255,255,255,0.06);border-radius:999px;overflow:hidden;
  }
  .bb-progress-fill {
    height:100%;background:linear-gradient(to right,var(--bb-coral),var(--bb-gold));
    border-radius:999px;transition:width 0.5s var(--bb-ease);
    animation:bbBarFill 0.5s var(--bb-ease);
  }

  /* CTA button */
  .bb-cta {
    width:100%;padding:18px 32px;border:none;border-radius:999px;
    font-family:var(--bb-sans);font-size:0.82rem;font-weight:800;
    letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:10px;
    transition:transform 0.25s var(--bb-spring),box-shadow 0.25s,background 0.2s;
    position:relative;overflow:hidden;
  }
  .bb-cta.ready {
    background:linear-gradient(135deg,var(--bb-coral),var(--bb-coral-dk));
    color:white;
    box-shadow:0 8px 28px rgba(239,119,106,0.45);
  }
  .bb-cta.ready:hover {
    transform:translateY(-3px) scale(1.01);
    box-shadow:0 16px 44px rgba(239,119,106,0.55);
  }
  .bb-cta.ready:active { transform:scale(0.98); }
  .bb-cta.success {
    background:linear-gradient(135deg,#1B5E20,#2E7D32) !important;
    box-shadow:0 8px 28px rgba(46,125,50,0.4) !important;
  }
  .bb-cta.disabled {
    background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.25);
    cursor:not-allowed;border:1px dashed rgba(255,255,255,0.1);
  }
  .bb-cta-ripple {
    position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);
    width:10px;height:10px;margin-top:-5px;margin-left:-5px;
    animation:bbRipple 0.5s var(--bb-ease) forwards;pointer-events:none;
  }

  /* Sticky bottom bar (mobile) */
  .bb-sticky {
    position:fixed;bottom:0;left:0;right:0;z-index:999;
    background:rgba(10,10,8,0.92);backdrop-filter:blur(20px);
    border-top:1px solid rgba(255,255,255,0.08);
    padding:14px 20px 20px;
    display:flex;align-items:center;gap:14px;
    transform:translateY(100%);
    transition:transform 0.4s var(--bb-spring);
    font-family:var(--bb-sans);
  }
  .bb-sticky.show { transform:translateY(0); }
  .bb-sticky-info { flex:1;min-width:0; }
  .bb-sticky-label { font-size:0.62rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:3px; }
  .bb-sticky-price {
    font-family:var(--bb-serif);font-size:1.5rem;font-weight:600;color:white;line-height:1;letter-spacing:-0.01em;
  }
  .bb-sticky-savings { font-size:0.62rem;font-weight:700;color:rgba(74,222,128,0.8);margin-top:2px; }
  .bb-sticky-cta {
    padding:14px 24px;border:none;border-radius:999px;
    background:linear-gradient(135deg,var(--bb-coral),var(--bb-coral-dk));
    color:white;font-family:var(--bb-sans);font-size:0.75rem;font-weight:800;
    letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;
    box-shadow:0 4px 16px rgba(239,119,106,0.4);
    transition:transform 0.2s var(--bb-spring);white-space:nowrap;flex-shrink:0;
  }
  .bb-sticky-cta:hover { transform:scale(1.03); }
  .bb-sticky-cta:disabled { background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.25);box-shadow:none;cursor:not-allowed;transform:none; }

  /* ── Responsive ── */
  @media (max-width:1100px) { .bb-packs { grid-template-columns:repeat(2,1fr);gap:12px; } }
  @media (max-width:768px) {
    .bb-packs { grid-template-columns:repeat(2,1fr); }
    .bb-steps .bb-step-conn { width:clamp(20px,5vw,50px); }
    .bb-grid { grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px; }
    .bb-summary-top { flex-direction:column; }
    .bb-price-block { text-align:left; }
  }
  @media (max-width:480px) {
    .bb-packs { grid-template-columns:1fr 1fr;gap:10px; }
    .bb-pack-qty { font-size:2rem; }
    .bb-pack-price { font-size:1.5rem; }
    .bb-grid { grid-template-columns:repeat(2,1fr);gap:8px; }
  }
`,Xa=[{id:`p1`,name:`Pack 1`,qty:4,price:160,label:`35ML × 4`,badge:null,tags:[{text:`Livraison gratuite 🚚`,cls:`green`},{text:`Idéal pour débuter`,cls:`gold`}],savings:null,origPrice:null},{id:`p2`,name:`Pack 2`,qty:8,price:290,label:`35ML × 8`,badge:{text:`Plus populaire`,cls:`coral`},tags:[{text:`Livraison gratuite 🚚`,cls:`green`},{text:`Best seller`,cls:`coral`}],savings:`Économie 30dh`,origPrice:320},{id:`p3`,name:`Pack 3`,qty:12,price:410,label:`35ML × 12`,badge:{text:`Meilleur rapport`,cls:`green`},tags:[{text:`Livraison gratuite 🚚`,cls:`green`},{text:`Stock limité ⚡`,cls:`coral`}],savings:`Économie 70dh`,origPrice:480},{id:`golden`,name:`Golden Offer`,qty:6,price:210,label:`35ML × 6`,badge:{text:`✦ Offre dorée`,cls:`gold`},tags:[{text:`Livraison gratuite 🚚`,cls:`green`},{text:`Édition limitée ✦`,cls:`gold`}],savings:`Économie 30dh`,origPrice:240,isBest:!0}];function Za(){if(!(typeof document>`u`)&&!document.getElementById(`nahid-bb-css`)){let e=document.createElement(`style`);e.id=`nahid-bb-css`,e.textContent=Ya,document.head.appendChild(e)}}var Qa=({products:e,addToCart:t})=>{Za();let[n,r]=(0,v.useState)([]),[i,a]=(0,v.useState)(!1),[o,s]=(0,v.useState)(Xa[1]),[c,l]=(0,v.useState)(!1),u=(0,v.useRef)(null),d=(0,v.useRef)(null);(0,v.useEffect)(()=>{let e=new IntersectionObserver(e=>e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`bb-vis`)}),{threshold:.1});return document.querySelectorAll(`.bb-aos`).forEach(t=>e.observe(t)),()=>e.disconnect()}),(0,v.useEffect)(()=>{if(!u.current)return;let e=new IntersectionObserver(([e])=>l(!e.isIntersecting&&n.length>0),{threshold:0});return e.observe(d.current??u.current),()=>e.disconnect()},[n.length]);let f=e=>{s(e),r([])},p=e.filter(e=>e.stock>0).slice(0,12),m=e=>{r(t=>t.some(t=>t.id===e.id)?t.filter(t=>t.id!==e.id):t.length>=o.qty?t:[...t,e])},h=e=>typeof e.price==`string`?parseFloat(e.price):e.price,g=o.price,_=o.origPrice??o.price,y=_-g,b=e=>Math.round(e).toLocaleString(`fr-MA`),x=(e,t)=>{let n=t.getBoundingClientRect(),r=document.createElement(`span`);r.className=`bb-cta-ripple`,r.style.left=`${e.clientX-n.left}px`,r.style.top=`${e.clientY-n.top}px`,t.appendChild(r),setTimeout(()=>r.remove(),600)},S=e=>{n.length===o.qty&&(e?.currentTarget&&x(e,e.currentTarget),n.forEach(e=>t(e,1)),a(!0),setTimeout(()=>{a(!1),r([])},2800))},C=Math.round(n.length/o.qty*100),w=n.length===o.qty;return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(`section`,{className:`bb-section`,ref:u,children:[(0,I.jsx)(`div`,{className:`bb-orb bb-orb-1`}),(0,I.jsx)(`div`,{className:`bb-orb bb-orb-2`}),(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{className:`bb-header`,children:[(0,I.jsx)(`div`,{className:`bb-eyebrow bb-aos`,children:`Offre exclusive`}),(0,I.jsxs)(`h2`,{className:`bb-title bb-aos`,children:[`Créez votre`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`Coffret Personnalisé`})]}),(0,I.jsx)(`p`,{className:`bb-subtitle bb-aos`,children:`Choisissez votre pack, sélectionnez vos fragrances préférées et profitez de la livraison gratuite partout au Maroc 🇲🇦`})]}),(0,I.jsx)(`div`,{className:`bb-packs`,children:Xa.map((e,t)=>(0,I.jsxs)(`div`,{className:`bb-pack bb-aos bb-d${t+1}${e.isBest?` best`:``}${o.id===e.id?` active`:``}`,onClick:()=>f(e),children:[e.badge&&(0,I.jsx)(`div`,{className:`bb-pack-badge ${e.badge.cls}`,children:e.badge.text}),(0,I.jsxs)(`div`,{className:`bb-pack-top`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`bb-pack-name`,children:e.name}),(0,I.jsxs)(`div`,{className:`bb-pack-qty`,children:[e.qty,(0,I.jsx)(`sub`,{children:`×`})]})]}),(0,I.jsx)(`div`,{className:`bb-pack-check`,children:(0,I.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`3`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,I.jsx)(`polyline`,{className:`bb-chk`,points:`20 6 9 17 4 12`})})})]}),(0,I.jsxs)(`div`,{className:`bb-pack-price`,children:[b(e.price),` `,(0,I.jsx)(`span`,{style:{fontSize:`0.5em`,fontFamily:`var(--bb-sans)`,fontWeight:700,color:`rgba(255,255,255,0.45)`},children:`MAD`})]}),(0,I.jsx)(`div`,{className:`bb-pack-price-sub`,children:e.label}),(0,I.jsx)(`div`,{className:`bb-pack-tags`,children:e.tags.map((e,t)=>(0,I.jsxs)(`span`,{className:`bb-pack-tag ${e.cls}`,children:[(0,I.jsx)(`span`,{className:`dot`}),e.text]},t))}),e.savings&&(0,I.jsxs)(`div`,{className:`bb-pack-savings`,children:[`🎉 `,e.savings]})]},e.id))}),(0,I.jsx)(`div`,{className:`bb-steps bb-aos`,children:Array.from({length:o.qty},(e,t)=>(0,I.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`},children:[(0,I.jsxs)(`div`,{className:`bb-step-item`,children:[(0,I.jsx)(`div`,{className:`bb-step-dot${t<n.length?` filled`:t===n.length?` partial`:``}`,children:t<n.length?(0,I.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`3`,strokeLinecap:`round`,children:(0,I.jsx)(`polyline`,{className:`bb-ck`,points:`20 6 9 17 4 12`})}):t+1}),(0,I.jsx)(`span`,{className:`bb-step-label${t<=n.length?` active`:``}`,children:t<n.length?n[t]?.name.substring(0,8)+`…`:`Parfum ${t+1}`})]}),t<o.qty-1&&(0,I.jsx)(`div`,{className:`bb-step-conn`,children:(0,I.jsx)(`div`,{className:`bb-step-conn-fill`,style:{width:t<n.length-1?`100%`:t===n.length-1?`50%`:`0%`}})})]},t))}),(0,I.jsxs)(`div`,{className:`bb-section-label bb-aos`,children:[`Choisissez vos `,o.qty,` fragrances`,n.length>0&&(0,I.jsxs)(`span`,{style:{color:`var(--bb-coral)`,fontStyle:`italic`,fontWeight:700},children:[`— `,n.length,`/`,o.qty,` sélectionné`,n.length>1?`s`:``]})]}),(0,I.jsx)(`div`,{className:`bb-grid`,children:p.map((e,t)=>{let r=n.some(t=>t.id===e.id),i=!r&&n.length>=o.qty,a=n.findIndex(t=>t.id===e.id),s=h(e);return(0,I.jsxs)(`div`,{className:`bb-card${r?` bb-card-selected`:``}${i?` bb-card-disabled`:``} bb-aos bb-d${t%4+1}`,onClick:()=>!i&&m(e),children:[(0,I.jsxs)(`div`,{className:`bb-card-img-wrap`,children:[(0,I.jsx)(`img`,{className:`bb-card-img`,src:e.image_url,alt:e.name,loading:`lazy`}),(0,I.jsx)(`div`,{className:`bb-card-overlay`}),r&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`div`,{className:`bb-card-check-badge`,children:(0,I.jsx)(`svg`,{width:`13`,height:`13`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`3`,strokeLinecap:`round`,children:(0,I.jsx)(`polyline`,{className:`bb-ck`,points:`20 6 9 17 4 12`})})}),(0,I.jsx)(`div`,{className:`bb-card-num`,children:a+1})]})]}),(0,I.jsxs)(`div`,{className:`bb-card-body`,children:[e.category&&(0,I.jsx)(`div`,{className:`bb-card-cat`,children:e.category}),(0,I.jsx)(`div`,{className:`bb-card-name`,children:e.name}),(0,I.jsxs)(`div`,{className:`bb-card-footer`,children:[(0,I.jsxs)(`span`,{className:`bb-card-price`,children:[b(s),` MAD`]}),(0,I.jsx)(`button`,{className:`bb-card-add ${r?`minus`:`plus`}`,onClick:t=>{t.stopPropagation(),!i&&m(e)},"aria-label":r?`Retirer`:`Ajouter`,children:r?`−`:`+`})]})]})]},e.id)})}),(0,I.jsxs)(`div`,{className:`bb-summary bb-aos`,ref:d,children:[(0,I.jsxs)(`div`,{className:`bb-progress-wrap`,children:[(0,I.jsxs)(`div`,{className:`bb-progress-label`,children:[(0,I.jsx)(`span`,{className:`bb-progress-text`,children:w?`✓ Sélection complète — Prêt à commander !`:`${n.length} / ${o.qty} fragrances sélectionnées`}),(0,I.jsxs)(`span`,{className:`bb-progress-pct`,children:[C,`%`]})]}),(0,I.jsx)(`div`,{className:`bb-progress-track`,children:(0,I.jsx)(`div`,{className:`bb-progress-fill`,style:{width:`${C}%`}})})]}),(0,I.jsxs)(`div`,{className:`bb-summary-top`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{style:{fontSize:`0.6rem`,fontWeight:`700`,letterSpacing:`0.12em`,textTransform:`uppercase`,color:`rgba(255,255,255,0.25)`,marginBottom:`10px`},children:`Vos fragrances`}),(0,I.jsxs)(`div`,{className:`bb-pills-row`,children:[n.map(e=>(0,I.jsxs)(`span`,{className:`bb-pill`,children:[e.name.substring(0,16),e.name.length>16?`…`:``,(0,I.jsx)(`button`,{className:`bb-pill-rm`,onClick:t=>{t.stopPropagation(),m(e)},"aria-label":`Retirer`,children:`✕`})]},e.id)),Array.from({length:o.qty-n.length}).map((e,t)=>(0,I.jsx)(`span`,{className:`bb-pill-empty`,children:`Choisir…`},`empty-${t}`))]})]}),n.length>0&&(0,I.jsxs)(`div`,{className:`bb-price-block`,children:[y>0&&(0,I.jsxs)(`div`,{className:`bb-price-original`,children:[b(_),` MAD`]}),(0,I.jsxs)(`div`,{className:`bb-price-final`,children:[b(g),` MAD`]}),y>0&&(0,I.jsx)(`div`,{children:(0,I.jsxs)(`span`,{className:`bb-savings-tag`,children:[`🎉 Économie `,b(y),` MAD`]})}),(0,I.jsx)(`div`,{style:{marginTop:`6px`,fontSize:`0.6rem`,fontWeight:`700`,color:`rgba(74,222,128,0.7)`,letterSpacing:`0.06em`},children:`✓ Livraison gratuite incluse`})]})]}),(0,I.jsx)(`button`,{className:`bb-cta${i?` success`:w?` ready`:` disabled`}`,onClick:S,disabled:!w&&!i,children:i?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`3`,strokeLinecap:`round`,children:(0,I.jsx)(`polyline`,{points:`20 6 9 17 4 12`})}),`Coffret ajouté avec succès !`]}):w?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,I.jsx)(`circle`,{cx:`9`,cy:`21`,r:`1`}),(0,I.jsx)(`circle`,{cx:`20`,cy:`21`,r:`1`}),(0,I.jsx)(`path`,{d:`M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6`})]}),`Ajouter le coffret — `,b(g),` MAD`]}):(0,I.jsxs)(I.Fragment,{children:[`Choisissez encore `,o.qty-n.length,` parfum`,o.qty-n.length>1?`s`:``]})}),(0,I.jsx)(`div`,{style:{display:`flex`,gap:`20px`,justifyContent:`center`,flexWrap:`wrap`,marginTop:`16px`},children:[`🚚 Livraison gratuite`,`↩️ Retours 30j`,`🔒 Paiement sécurisé`,`⭐ 4.9/5 clients`].map(e=>(0,I.jsx)(`span`,{style:{fontSize:`0.62rem`,fontWeight:`600`,color:`rgba(255,255,255,0.25)`,letterSpacing:`0.04em`},children:e},e))})]})]})]}),(0,I.jsxs)(`div`,{className:`bb-sticky${c&&n.length>0?` show`:``}`,children:[(0,I.jsxs)(`div`,{className:`bb-sticky-info`,children:[(0,I.jsxs)(`div`,{className:`bb-sticky-label`,children:[o.name,` · `,n.length,`/`,o.qty,` sélectionnés`]}),(0,I.jsxs)(`div`,{className:`bb-sticky-price`,children:[b(g),` MAD`]}),y>0&&(0,I.jsxs)(`div`,{className:`bb-sticky-savings`,children:[`🎉 Économie `,b(y),` MAD · Livraison gratuite`]})]}),(0,I.jsx)(`button`,{className:`bb-sticky-cta`,onClick:S,disabled:!w,children:w?`Commander →`:`Encore ${o.qty-n.length}`})]})]})},$a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},eo=v.createContext&&v.createContext($a),to=[`attr`,`size`,`title`];function no(e,t){if(e==null)return{};var n,r,i=ro(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function ro(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function io(){return io=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},io.apply(null,arguments)}function ao(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function oo(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ao(Object(n),!0).forEach(function(t){so(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ao(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function so(e,t,n){return(t=co(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function co(e){var t=lo(e,`string`);return typeof t==`symbol`?t:t+``}function lo(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function uo(e){return e&&e.map((e,t)=>v.createElement(e.tag,oo({key:t},e.attr),uo(e.child)))}function fo(e){return t=>v.createElement(po,io({attr:oo({},e.attr)},t),uo(e.child))}function po(e){var t=t=>{var{attr:n,size:r,title:i}=e,a=no(e,to),o=r||t.size||`1em`,s;return t.className&&(s=t.className),e.className&&(s=(s?s+` `:``)+e.className),v.createElement(`svg`,io({stroke:`currentColor`,fill:`currentColor`,strokeWidth:`0`},t.attr,n,a,{className:s,style:oo(oo({color:e.color||t.color},t.style),e.style),height:o,width:o,xmlns:`http://www.w3.org/2000/svg`}),i&&v.createElement(`title`,null,i),e.children)};return eo===void 0?t($a):v.createElement(eo.Consumer,null,e=>t(e))}function mo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`line`,attr:{x1:`18`,y1:`6`,x2:`6`,y2:`18`},child:[]},{tag:`line`,attr:{x1:`6`,y1:`6`,x2:`18`,y2:`18`},child:[]}]})(e)}function ho(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`},child:[]},{tag:`circle`,attr:{cx:`12`,cy:`7`,r:`4`},child:[]}]})(e)}function go(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`polygon`,attr:{points:`12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2`},child:[]}]})(e)}function L(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`circle`,attr:{cx:`9`,cy:`21`,r:`1`},child:[]},{tag:`circle`,attr:{cx:`20`,cy:`21`,r:`1`},child:[]},{tag:`path`,attr:{d:`M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6`},child:[]}]})(e)}function _o(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z`},child:[]},{tag:`line`,attr:{x1:`3`,y1:`6`,x2:`21`,y2:`6`},child:[]},{tag:`path`,attr:{d:`M16 10a4 4 0 0 1-8 0`},child:[]}]})(e)}function vo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`circle`,attr:{cx:`11`,cy:`11`,r:`8`},child:[]},{tag:`line`,attr:{x1:`21`,y1:`21`,x2:`16.65`,y2:`16.65`},child:[]}]})(e)}function yo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`line`,attr:{x1:`3`,y1:`12`,x2:`21`,y2:`12`},child:[]},{tag:`line`,attr:{x1:`3`,y1:`6`,x2:`21`,y2:`6`},child:[]},{tag:`line`,attr:{x1:`3`,y1:`18`,x2:`21`,y2:`18`},child:[]}]})(e)}function bo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`},child:[]},{tag:`polyline`,attr:{points:`16 17 21 12 16 7`},child:[]},{tag:`line`,attr:{x1:`21`,y1:`12`,x2:`9`,y2:`12`},child:[]}]})(e)}function xo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`rect`,attr:{x:`2`,y:`2`,width:`20`,height:`20`,rx:`5`,ry:`5`},child:[]},{tag:`path`,attr:{d:`M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z`},child:[]},{tag:`line`,attr:{x1:`17.5`,y1:`6.5`,x2:`17.51`,y2:`6.5`},child:[]}]})(e)}function So(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`},child:[]},{tag:`polyline`,attr:{points:`9 22 9 12 15 12 15 22`},child:[]}]})(e)}function Co(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z`},child:[]}]})(e)}function wo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`rect`,attr:{x:`3`,y:`3`,width:`7`,height:`7`},child:[]},{tag:`rect`,attr:{x:`14`,y:`3`,width:`7`,height:`7`},child:[]},{tag:`rect`,attr:{x:`14`,y:`14`,width:`7`,height:`7`},child:[]},{tag:`rect`,attr:{x:`3`,y:`14`,width:`7`,height:`7`},child:[]}]})(e)}function To(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z`},child:[]}]})(e)}function Eo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`polyline`,attr:{points:`9 18 15 12 9 6`},child:[]}]})(e)}function Do(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`polyline`,attr:{points:`15 18 9 12 15 6`},child:[]}]})(e)}function Oo(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`},child:[{tag:`path`,attr:{d:`M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z`},child:[]},{tag:`path`,attr:{d:`M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z`},child:[]}]})(e)}var ko=[{id:1,name:`Yasmine El Amrani`,city:`Casablanca`,avatar:`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80`,rating:5,date:`Mars 2025`,product:`Oud Mystique`,comment:`Un parfum absolument envoûtant. L'oud est profond sans être écrasant, avec une touche florale qui le rend unique. Je reçois des compliments à chaque fois que je le porte.`},{id:2,name:`Karim Bensaid`,city:`Marrakech`,avatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80`,rating:5,date:`Janvier 2025`,product:`Rose Mystique`,comment:`J'offre Nahid à toute ma famille maintenant. La qualité est exceptionnelle et les flacons sont magnifiques. La livraison était rapide et l'emballage très soigné.`},{id:3,name:`Salma Tazi`,city:`Rabat`,avatar:`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80`,rating:5,date:`Février 2025`,product:`Amber Noir`,comment:`Amber Noir est mon coup de cœur absolu. Il tient toute la journée et évolue magnifiquement. Le rapport qualité-prix est imbattable pour un parfum de cette qualité.`},{id:4,name:`Hassan Alaoui`,city:`Fès`,avatar:`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80`,rating:5,date:`Avril 2025`,product:`Oud Royal`,comment:`Enfin un parfum marocain qui rivalise avec les grandes maisons. Nahid a trouvé l'équilibre parfait entre tradition et modernité. Je suis client fidèle depuis le début.`},{id:5,name:`Nadia Berrada`,city:`Agadir`,avatar:`https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80`,rating:5,date:`Mars 2025`,product:`Rose Mystique`,comment:`J'ai commandé le coffret 3 parfums et je ne regrette absolument pas. Chaque fragrance est une découverte. Le service client est aux petits soins.`},{id:6,name:`Omar Chraibi`,city:`Tanger`,avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80`,rating:5,date:`Mai 2025`,product:`Amber Noir`,comment:`Ma femme et moi utilisons les parfums Nahid depuis 6 mois. Nous sommes conquis par la longueur en bouche et la sophistication des compositions. Bravo à l'équipe !`}],Ao=({count:e})=>(0,I.jsx)(`div`,{style:{display:`flex`,gap:`2px`},children:[1,2,3,4,5].map(t=>(0,I.jsx)(go,{size:14,fill:t<=e?`#EF776A`:`none`,color:t<=e?`#EF776A`:`#DDD`,strokeWidth:1.5},t))}),jo=()=>{let[e,t]=(0,v.useState)(0),n=Math.ceil(ko.length/3),r=ko.slice(e*3,e*3+3),i=(ko.reduce((e,t)=>e+t.rating,0)/ko.length).toFixed(1);return(0,I.jsx)(`section`,{style:Mo.section,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{style:Mo.header,children:[(0,I.jsx)(`span`,{style:Mo.eyebrow,children:`✦ TÉMOIGNAGES`}),(0,I.jsx)(`h2`,{style:Mo.title,children:`Ils ont trouvé leur signature`}),(0,I.jsxs)(`div`,{style:Mo.aggregate,children:[(0,I.jsx)(Ao,{count:5}),(0,I.jsx)(`span`,{style:Mo.score,children:i}),(0,I.jsxs)(`span`,{style:Mo.total,children:[`sur `,ko.length,` avis`]})]})]}),(0,I.jsx)(`div`,{className:`reviews-grid`,style:Mo.grid,children:r.map((e,t)=>(0,I.jsxs)(`div`,{style:{...Mo.card,animationDelay:`${t*.1}s`},children:[(0,I.jsx)(`div`,{style:Mo.quote,children:`"`}),(0,I.jsx)(`p`,{style:Mo.comment,children:e.comment}),(0,I.jsxs)(`div`,{style:Mo.cardFooter,children:[(0,I.jsx)(`img`,{src:e.avatar,alt:e.name,loading:`lazy`,style:Mo.avatar}),(0,I.jsxs)(`div`,{style:Mo.reviewer,children:[(0,I.jsxs)(`div`,{style:Mo.reviewerTop,children:[(0,I.jsx)(`span`,{style:Mo.reviewerName,children:e.name}),(0,I.jsx)(Ao,{count:e.rating})]}),(0,I.jsxs)(`span`,{style:Mo.reviewerMeta,children:[e.city,` · `,e.date,` · `,(0,I.jsx)(`em`,{children:e.product})]})]})]})]},e.id))}),(0,I.jsxs)(`div`,{style:Mo.pagination,children:[(0,I.jsx)(`button`,{onClick:()=>t(e=>Math.max(e-1,0)),disabled:e===0,style:{...Mo.pageBtn,opacity:e===0?.3:1},children:(0,I.jsx)(Do,{size:18})}),(0,I.jsx)(`div`,{style:Mo.dots,children:Array.from({length:n}).map((n,r)=>(0,I.jsx)(`button`,{onClick:()=>t(r),style:{...Mo.dot,backgroundColor:r===e?`#EF776A`:`#E0E0E0`,width:r===e?`24px`:`8px`}},r))}),(0,I.jsx)(`button`,{onClick:()=>t(e=>Math.min(e+1,n-1)),disabled:e===n-1,style:{...Mo.pageBtn,opacity:e===n-1?.3:1},children:(0,I.jsx)(Eo,{size:18})})]})]})})},Mo={section:{padding:`100px 0`,backgroundColor:`white`},header:{textAlign:`center`,marginBottom:`56px`},eyebrow:{display:`inline-block`,fontSize:`0.68rem`,fontWeight:`700`,letterSpacing:`0.2em`,textTransform:`uppercase`,color:`#EF776A`,marginBottom:`12px`},title:{fontFamily:`'Cormorant Garamond', Georgia, serif`,fontSize:`clamp(2rem, 4vw, 3rem)`,fontWeight:`400`,color:`#1A1A1A`,marginBottom:`16px`,lineHeight:`1.2`},aggregate:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`8px`},score:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`1.3rem`,fontWeight:`600`,color:`#1A1A1A`},total:{fontSize:`0.85rem`,color:`#9B9B9B`},grid:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(300px, 1fr))`,gap:`24px`,marginBottom:`40px`},card:{backgroundColor:`#FAFAFA`,borderRadius:`20px`,padding:`32px`,border:`1px solid #F0F0F0`,display:`flex`,flexDirection:`column`,gap:`16px`,position:`relative`,transition:`box-shadow 0.3s ease`},quote:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`4rem`,color:`#EF776A`,lineHeight:.8,opacity:.3,position:`absolute`,top:`24px`,left:`28px`,userSelect:`none`},comment:{fontSize:`0.9rem`,lineHeight:`1.7`,color:`#3A3A3A`,flex:1,paddingTop:`20px`},cardFooter:{display:`flex`,alignItems:`center`,gap:`14px`,paddingTop:`16px`,borderTop:`1px solid #EBEBEB`},avatar:{width:`48px`,height:`48px`,borderRadius:`50%`,objectFit:`cover`,flexShrink:0,border:`2px solid white`,boxShadow:`0 2px 8px rgba(0,0,0,0.1)`},reviewer:{display:`flex`,flexDirection:`column`,gap:`4px`},reviewerTop:{display:`flex`,alignItems:`center`,gap:`10px`},reviewerName:{fontSize:`0.88rem`,fontWeight:`600`,color:`#1A1A1A`},reviewerMeta:{fontSize:`0.72rem`,color:`#9B9B9B`},pagination:{display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`16px`},pageBtn:{background:`none`,border:`1.5px solid #E0E0E0`,width:`40px`,height:`40px`,borderRadius:`50%`,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#1A1A1A`,transition:`all 0.2s`},dots:{display:`flex`,gap:`6px`,alignItems:`center`},dot:{height:`8px`,borderRadius:`4px`,border:`none`,cursor:`pointer`,transition:`all 0.3s ease`}},No=`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --pk-ink:      #0E0E0C;
    --pk-cream:    #FAF8F5;
    --pk-sand:     #EDE9E1;
    --pk-white:    #FFFFFF;
    --pk-coral:    #EF776A;
    --pk-coral-dk: #C9503F;
    --pk-gold:     #C9A96E;
    --pk-gold-lt:  #F5E9D0;
    --pk-muted:    #7A7770;
    --pk-border:   rgba(14,14,12,0.09);
    --pk-sans:     'Poppins', sans-serif;
    --pk-serif:    'Cormorant Garamond', Georgia, serif;
    --pk-ease:     cubic-bezier(0.25,0.46,0.45,0.94);
    --pk-spring:   cubic-bezier(0.34,1.56,0.64,1);
  }

  /* ── Animations ── */
  @keyframes pkFadeUp   { from{opacity:0;transform:translateY(32px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes pkScaleIn  { from{opacity:0;transform:scale(0.88);}       to{opacity:1;transform:scale(1);} }
  @keyframes pkShimmer  { from{background-position:200% 0;} to{background-position:-200% 0;} }
  @keyframes pkGlow     { 0%,100%{box-shadow:0 0 30px rgba(239,119,106,0.2);}  50%{box-shadow:0 0 60px rgba(239,119,106,0.35);} }
  @keyframes pkGoldGlow { 0%,100%{box-shadow:0 0 30px rgba(201,169,110,0.2);}  50%{box-shadow:0 0 60px rgba(201,169,110,0.35);} }
  @keyframes pkFloat    { 0%,100%{transform:translateY(0);}   50%{transform:translateY(-6px);} }
  @keyframes pkPulse    { 0%,100%{opacity:1;transform:scale(1);}  50%{opacity:0.7;transform:scale(0.95);} }
  @keyframes pkStar     { 0%,100%{transform:rotate(0deg) scale(1);}  50%{transform:rotate(15deg) scale(1.15);} }
  @keyframes pkMarquee  { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes pkOrb      { 0%,100%{transform:translate(0,0);}  50%{transform:translate(20px,-20px);} }
  @keyframes pkReveal   { from{clip-path:inset(0 100% 0 0);} to{clip-path:inset(0 0% 0 0);} }

  .pk-aos { opacity:0;transform:translateY(28px);transition:opacity 0.8s var(--pk-ease),transform 0.8s var(--pk-ease); }
  .pk-aos.pk-vis { opacity:1;transform:translateY(0); }
  .pk-d1{transition-delay:.06s}.pk-d2{transition-delay:.13s}.pk-d3{transition-delay:.20s}.pk-d4{transition-delay:.27s}

  /* ─────────────────────────────────────────
     SECTION WRAPPER
  ───────────────────────────────────────── */
  .pk-section {
    padding: clamp(80px,10vw,140px) 0 clamp(100px,12vw,160px);
    background: var(--pk-ink);
    position: relative;
    overflow: hidden;
    font-family: var(--pk-sans);
  }
  .pk-section * { box-sizing:border-box; }

  /* Background decorative orbs */
  .pk-bg-orb {
    position:absolute;border-radius:50%;pointer-events:none;
  }
  .pk-bg-orb-1 {
    width:700px;height:700px;top:-250px;left:-250px;
    background:radial-gradient(circle,rgba(239,119,106,0.09),transparent 70%);
    animation:pkOrb 20s ease-in-out infinite;
  }
  .pk-bg-orb-2 {
    width:500px;height:500px;bottom:-150px;right:-150px;
    background:radial-gradient(circle,rgba(201,169,110,0.08),transparent 70%);
    animation:pkOrb 16s ease-in-out infinite reverse;
  }
  .pk-bg-orb-3 {
    width:300px;height:300px;top:40%;left:50%;
    background:radial-gradient(circle,rgba(239,119,106,0.04),transparent 70%);
    animation:pkOrb 24s ease-in-out infinite 3s;
  }

  /* Subtle grid lines */
  .pk-grid-bg {
    position:absolute;inset:0;pointer-events:none;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size:80px 80px;
    opacity:0.5;
  }

  /* ── Header ── */
  .pk-header {
    text-align:center;
    margin-bottom:clamp(48px,7vw,88px);
    position:relative;z-index:1;
  }
  .pk-eyebrow {
    display:inline-flex;align-items:center;gap:12px;
    font-size:0.6rem;font-weight:700;letter-spacing:0.35em;text-transform:uppercase;
    color:var(--pk-gold);margin-bottom:20px;
  }
  .pk-eyebrow::before,.pk-eyebrow::after {
    content:'';width:32px;height:1px;background:linear-gradient(to right,transparent,var(--pk-gold));
  }
  .pk-eyebrow::after { background:linear-gradient(to left,transparent,var(--pk-gold)); }

  .pk-title {
    font-family:var(--pk-sans);
    font-size:clamp(2.4rem,7vw,5.2rem);
    font-weight:900;color:white;
    letter-spacing:-0.04em;line-height:0.95;
    margin-bottom:20px;
  }
  .pk-title em {
    font-style:italic;font-weight:300;font-family:var(--pk-serif);
    color:var(--pk-coral);font-size:1.08em;display:block;
  }
  .pk-subtitle {
    font-size:clamp(0.82rem,1.2vw,0.95rem);
    color:rgba(255,255,255,0.4);max-width:440px;margin:0 auto;line-height:1.8;
  }

  /* Savings ribbon */
  .pk-savings-ribbon {
    display:inline-flex;align-items:center;gap:8px;
    margin-top:28px;
    padding:10px 24px;border-radius:999px;
    background:rgba(74,222,128,0.1);
    border:1px solid rgba(74,222,128,0.2);
    font-size:0.7rem;font-weight:800;
    color:rgba(74,222,128,0.9);letter-spacing:0.1em;text-transform:uppercase;
  }
  .pk-savings-dot { width:6px;height:6px;border-radius:50%;background:#4ADE80;animation:pkPulse 1.8s ease infinite; }

  /* ── Cards Grid ── */
  .pk-grid {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:16px;
    position:relative;z-index:1;
    align-items:stretch;
  }

  /* ── Single Card ── */
  .pk-card {
    border-radius:28px;
    padding:clamp(28px,3vw,40px) clamp(22px,2.5vw,32px) clamp(32px,4vw,44px);
    position:relative;overflow:hidden;
    cursor:pointer;
    border:1.5px solid rgba(255,255,255,0.07);
    background:rgba(255,255,255,0.03);
    display:flex;flex-direction:column;
    transition:transform 0.45s var(--pk-spring), box-shadow 0.45s, border-color 0.3s, background 0.3s;
  }
  .pk-card:hover {
    transform:translateY(-10px) scale(1.015);
    border-color:rgba(255,255,255,0.14);
    background:rgba(255,255,255,0.06);
    box-shadow:0 32px 80px rgba(0,0,0,0.4);
  }

  /* Highlighted card (Pack 3 / Best Value) */
  .pk-card.pk-featured {
    background:rgba(239,119,106,0.08);
    border-color:var(--pk-coral);
    box-shadow:0 0 40px rgba(239,119,106,0.15), 0 8px 40px rgba(0,0,0,0.3);
    animation:pkGlow 4s ease-in-out infinite;
    transform:scale(1.03);
  }
  .pk-card.pk-featured:hover {
    transform:translateY(-12px) scale(1.045);
    box-shadow:0 40px 100px rgba(239,119,106,0.25), 0 0 60px rgba(239,119,106,0.2);
  }

  /* Golden card */
  .pk-card.pk-golden {
    background:rgba(201,169,110,0.07);
    border-color:rgba(201,169,110,0.4);
    box-shadow:0 0 30px rgba(201,169,110,0.1), 0 8px 32px rgba(0,0,0,0.25);
    animation:pkGoldGlow 4s ease-in-out infinite;
  }
  .pk-card.pk-golden:hover {
    border-color:var(--pk-gold);
    box-shadow:0 40px 100px rgba(201,169,110,0.2), 0 0 60px rgba(201,169,110,0.15);
  }

  /* Inner shimmer on featured */
  .pk-card.pk-featured::before {
    content:'';position:absolute;inset:0;border-radius:26px;pointer-events:none;
    background:linear-gradient(135deg,rgba(239,119,106,0.08) 0%,transparent 60%);
  }
  .pk-card.pk-golden::before {
    content:'';position:absolute;inset:0;border-radius:26px;pointer-events:none;
    background:linear-gradient(135deg,rgba(201,169,110,0.08) 0%,transparent 60%);
  }

  /* Top badge */
  .pk-top-badge {
    position:absolute;top:-1px;left:50%;transform:translateX(-50%);
    padding:6px 18px;border-radius:0 0 14px 14px;
    font-family:var(--pk-sans);font-size:0.58rem;font-weight:800;
    letter-spacing:0.14em;text-transform:uppercase;
    display:inline-flex;align-items:center;gap:6px;
    white-space:nowrap;
    z-index:2;
  }
  .pk-top-badge.coral { background:var(--pk-coral);color:white;box-shadow:0 4px 16px rgba(239,119,106,0.4); }
  .pk-top-badge.gold  { background:linear-gradient(135deg,var(--pk-gold),#B8922A);color:white;box-shadow:0 4px 16px rgba(201,169,110,0.4); }
  .pk-top-badge.green { background:#1B5E20;color:white; }

  /* Card tag (top-left) */
  .pk-card-tag {
    font-size:0.58rem;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;
    color:rgba(255,255,255,0.3);margin-bottom:20px;
    display:flex;align-items:center;gap:8px;
    position:relative;z-index:1;
  }
  .pk-card.pk-featured .pk-card-tag { color:rgba(239,119,106,0.7); }
  .pk-card.pk-golden .pk-card-tag   { color:rgba(201,169,110,0.7); }

  /* Quantity display */
  .pk-qty-display {
    display:flex;align-items:baseline;gap:6px;
    margin-bottom:6px;
    position:relative;z-index:1;
  }
  .pk-qty-num {
    font-family:var(--pk-sans);
    font-size:clamp(3.5rem,7vw,5.5rem);
    font-weight:900;color:white;
    letter-spacing:-0.05em;line-height:1;
  }
  .pk-qty-label {
    font-size:clamp(0.75rem,1.2vw,0.9rem);font-weight:600;
    color:rgba(255,255,255,0.35);
    padding-bottom:8px;
  }

  .pk-volume-tag {
    display:inline-flex;align-items:center;gap:5px;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:999px;padding:5px 12px;
    font-size:0.62rem;font-weight:700;letter-spacing:0.1em;
    color:rgba(255,255,255,0.45);margin-bottom:24px;
    position:relative;z-index:1;
    width:fit-content;
  }

  /* Price */
  .pk-price-block { margin-bottom:24px;position:relative;z-index:1; }
  .pk-price-original {
    font-size:0.78rem;color:rgba(255,255,255,0.25);text-decoration:line-through;
    margin-bottom:3px;
  }
  .pk-price {
    font-family:var(--pk-serif);
    font-size:clamp(2.2rem,4vw,3rem);font-weight:600;
    color:white;letter-spacing:-0.02em;line-height:1;
  }
  .pk-price sub {
    font-family:var(--pk-sans);font-size:0.5em;font-weight:700;
    color:rgba(255,255,255,0.45);letter-spacing:0;vertical-align:baseline;
    margin-left:4px;
  }
  .pk-price-per {
    font-size:0.65rem;font-weight:600;color:rgba(255,255,255,0.3);
    margin-top:5px;letter-spacing:0.04em;
  }

  /* Perks list */
  .pk-perks {
    display:flex;flex-direction:column;gap:9px;
    margin-bottom:28px;flex:1;
    position:relative;z-index:1;
  }
  .pk-perk {
    display:flex;align-items:center;gap:9px;
    font-size:0.73rem;font-weight:500;color:rgba(255,255,255,0.5);
    line-height:1.3;
  }
  .pk-perk-icon {
    width:18px;height:18px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;font-size:0.6rem;
  }
  .pk-perk-icon.green { background:rgba(74,222,128,0.15);color:#4ADE80; }
  .pk-perk-icon.coral { background:rgba(239,119,106,0.15);color:var(--pk-coral); }
  .pk-perk-icon.gold  { background:rgba(201,169,110,0.15);color:var(--pk-gold); }
  .pk-perk.featured { color:rgba(255,255,255,0.75); }

  /* Savings badge */
  .pk-savings-badge {
    display:inline-flex;align-items:center;gap:5px;
    padding:5px 12px;border-radius:999px;
    font-size:0.6rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;
    margin-bottom:18px;width:fit-content;
    position:relative;z-index:1;
  }
  .pk-savings-badge.green {
    background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.2);
    color:rgba(74,222,128,0.9);
  }
  .pk-savings-badge.coral {
    background:rgba(239,119,106,0.12);border:1px solid rgba(239,119,106,0.25);
    color:rgba(239,119,106,0.9);
  }
  .pk-savings-badge.gold {
    background:rgba(201,169,110,0.12);border:1px solid rgba(201,169,110,0.25);
    color:rgba(201,169,110,0.9);
  }

  /* CTA Button */
  .pk-btn {
    width:100%;padding:15px 20px;
    border-radius:999px;border:none;cursor:pointer;
    font-family:var(--pk-sans);font-size:0.72rem;font-weight:800;
    letter-spacing:0.1em;text-transform:uppercase;
    display:flex;align-items:center;justify-content:center;gap:8px;
    transition:transform 0.25s var(--pk-spring), box-shadow 0.25s, background 0.2s;
    position:relative;z-index:1;
    text-decoration:none;
  }
  .pk-btn.default {
    background:rgba(255,255,255,0.07);
    border:1.5px solid rgba(255,255,255,0.12);
    color:rgba(255,255,255,0.7);
  }
  .pk-btn.default:hover {
    background:rgba(255,255,255,0.13);
    color:white;
    transform:translateY(-2px);
  }
  .pk-btn.coral {
    background:linear-gradient(135deg,var(--pk-coral),var(--pk-coral-dk));
    color:white;
    box-shadow:0 8px 28px rgba(239,119,106,0.4);
  }
  .pk-btn.coral:hover {
    transform:translateY(-3px) scale(1.02);
    box-shadow:0 16px 44px rgba(239,119,106,0.55);
  }
  .pk-btn.gold {
    background:linear-gradient(135deg,var(--pk-gold),#B8922A);
    color:white;
    box-shadow:0 8px 28px rgba(201,169,110,0.35);
  }
  .pk-btn.gold:hover {
    transform:translateY(-3px) scale(1.02);
    box-shadow:0 16px 44px rgba(201,169,110,0.45);
  }

  /* ── Comparison Strip ── */
  .pk-compare {
    margin-top:clamp(48px,6vw,80px);
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:24px;
    padding:clamp(28px,4vw,48px);
    position:relative;z-index:1;
  }
  .pk-compare-title {
    font-family:var(--pk-sans);font-size:0.68rem;font-weight:800;
    letter-spacing:0.2em;text-transform:uppercase;
    color:rgba(255,255,255,0.25);text-align:center;margin-bottom:28px;
  }
  .pk-compare-row {
    display:grid;grid-template-columns:1.5fr repeat(4,1fr);gap:0;
    border-radius:16px;overflow:hidden;
  }
  .pk-compare-head {
    display:contents;
  }
  .pk-compare-cell {
    padding:14px 16px;
    font-size:0.7rem;font-weight:600;color:rgba(255,255,255,0.4);
    border-bottom:1px solid rgba(255,255,255,0.05);
    border-right:1px solid rgba(255,255,255,0.04);
    text-align:center;
  }
  .pk-compare-cell:first-child { text-align:left; }
  .pk-compare-cell:last-child { border-right:none; }
  .pk-compare-cell.header {
    font-size:0.62rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;
    color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.02);
  }
  .pk-compare-cell.featured-col { color:var(--pk-coral);font-weight:700; }
  .pk-compare-cell.gold-col { color:var(--pk-gold);font-weight:700; }
  .pk-compare-cell.yes { color:#4ADE80; }
  .pk-compare-cell.no  { color:rgba(255,255,255,0.15); }
  .pk-compare-row-data:last-child .pk-compare-cell { border-bottom:none; }

  /* ── Trust Footer ── */
  .pk-trust {
    display:flex;gap:0;flex-wrap:wrap;
    justify-content:center;
    margin-top:clamp(40px,5vw,64px);
    padding-top:clamp(32px,4vw,52px);
    border-top:1px solid rgba(255,255,255,0.06);
    position:relative;z-index:1;
  }
  .pk-trust-item {
    display:flex;align-items:center;gap:10px;
    padding:0 clamp(20px,3vw,40px);
    border-right:1px solid rgba(255,255,255,0.06);
    font-size:0.72rem;font-weight:600;color:rgba(255,255,255,0.3);
    letter-spacing:0.02em;
  }
  .pk-trust-item:last-child { border-right:none; }
  .pk-trust-item:hover { color:rgba(255,255,255,0.6); }
  .pk-trust-icon { font-size:1rem; }

  /* ── Responsive ── */
  @media (max-width:1200px) { .pk-grid { grid-template-columns:repeat(2,1fr);gap:14px; } .pk-card.pk-featured { transform:none; } }
  @media (max-width:768px) {
    .pk-grid { grid-template-columns:1fr;gap:14px; }
    .pk-compare { display:none; }
    .pk-trust { flex-direction:column;align-items:center;gap:14px; }
    .pk-trust-item { border-right:none; }
    .pk-qty-num { font-size:3.5rem; }
    .pk-price { font-size:2.2rem; }
  }
  @media (max-width:480px) {
    .pk-grid { grid-template-columns:1fr; }
    .pk-card { padding:28px 22px 32px; }
    .pk-trust { gap:12px; }
  }
`;function Po(){if(!(typeof document>`u`)&&!document.getElementById(`nahid-pack-css`)){let e=document.createElement(`style`);e.id=`nahid-pack-css`,e.textContent=No,document.head.appendChild(e)}}var Fo=[{id:`p1`,name:`Pack 1`,qty:4,volume:`35ML × 4`,price:160,origPrice:null,savings:null,perUnit:`40 dh / flacon`,badge:null,topBadge:null,variant:`default`,btnVariant:`default`,perks:[{icon:`✓`,cls:`green`,text:`Livraison gratuite 🚚`},{icon:`✓`,cls:`green`,text:`Idéal pour débuter`},{icon:`✓`,cls:`green`,text:`Paiement à la livraison`}]},{id:`p2`,name:`Pack 2`,qty:8,volume:`35ML × 8`,price:290,origPrice:320,savings:`Économie 30 dh`,perUnit:`36 dh / flacon`,badge:{text:`Best Seller`,cls:`coral`},topBadge:{text:`🔥 Le plus populaire`,cls:`coral`},variant:`default`,btnVariant:`coral`,perks:[{icon:`✓`,cls:`green`,text:`Livraison gratuite 🚚`},{icon:`✓`,cls:`coral`,text:`🔥 Best Seller`},{icon:`✓`,cls:`green`,text:`Économie 30 dh`},{icon:`✓`,cls:`green`,text:`Paiement à la livraison`}]},{id:`p3`,name:`Pack 3`,qty:12,volume:`35ML × 12`,price:410,origPrice:480,savings:`Économie 70 dh`,perUnit:`34 dh / flacon`,badge:{text:`Meilleur rapport`,cls:`green`},topBadge:{text:`⚡ Meilleur rapport`,cls:`green`},variant:`featured`,btnVariant:`coral`,isFeatured:!0,perks:[{icon:`✓`,cls:`green`,text:`Livraison gratuite 🚚`},{icon:`✓`,cls:`coral`,text:`⚡ Stock limité`},{icon:`✓`,cls:`green`,text:`Économie 70 dh`},{icon:`✓`,cls:`green`,text:`Prix par flacon le plus bas`},{icon:`✓`,cls:`green`,text:`Paiement à la livraison`}]},{id:`golden`,name:`Golden Offer`,qty:6,volume:`35ML × 6`,price:210,origPrice:240,savings:`Économie 30 dh`,perUnit:`35 dh / flacon`,badge:{text:`✦ Édition limitée`,cls:`gold`},topBadge:{text:`✦ Offre dorée`,cls:`gold`},variant:`golden`,btnVariant:`gold`,perks:[{icon:`✓`,cls:`green`,text:`Livraison gratuite 🚚`},{icon:`✓`,cls:`gold`,text:`✦ Édition limitée`},{icon:`✓`,cls:`green`,text:`Économie 30 dh`},{icon:`✓`,cls:`green`,text:`Paiement à la livraison`}]}],Io=[{label:`Nombre de flacons`,p1:`4 ×`,p2:`8 ×`,p3:`12 ×`,golden:`6 ×`},{label:`Volume`,p1:`35ML`,p2:`35ML`,p3:`35ML`,golden:`35ML`},{label:`Prix total`,p1:`160 dh`,p2:`290 dh`,p3:`410 dh`,golden:`210 dh`,pFeat:`p3`,pGold:`golden`},{label:`Prix / flacon`,p1:`40 dh`,p2:`36 dh`,p3:`34 dh`,golden:`35 dh`,featClass:!0},{label:`Livraison gratuite`,p1:`yes`,p2:`yes`,p3:`yes`,golden:`yes`,isBool:!0},{label:`Économies`,p1:`no`,p2:`30 dh`,p3:`70 dh`,golden:`30 dh`}],Lo=({onSelectPack:e})=>{Po();let[t,n]=(0,v.useState)(null),r=(0,v.useRef)(null);(0,v.useEffect)(()=>{let e=new IntersectionObserver(e=>e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`pk-vis`)}),{threshold:.08});return r.current&&r.current.querySelectorAll(`.pk-aos`).forEach(t=>e.observe(t)),()=>e.disconnect()});let i=e=>Math.round(e).toLocaleString(`fr-MA`);return(0,I.jsxs)(`section`,{className:`pk-section`,ref:r,children:[(0,I.jsx)(`div`,{className:`pk-bg-orb pk-bg-orb-1`}),(0,I.jsx)(`div`,{className:`pk-bg-orb pk-bg-orb-2`}),(0,I.jsx)(`div`,{className:`pk-bg-orb pk-bg-orb-3`}),(0,I.jsx)(`div`,{className:`pk-grid-bg`}),(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{className:`pk-header`,children:[(0,I.jsx)(`div`,{className:`pk-eyebrow pk-aos`,children:`Nos offres exclusives`}),(0,I.jsxs)(`h2`,{className:`pk-title pk-aos`,children:[`Choisissez votre`,(0,I.jsx)(`em`,{children:`coffret idéal`})]}),(0,I.jsx)(`p`,{className:`pk-subtitle pk-aos`,children:`Plus vous commandez, plus vous économisez. Livraison gratuite incluse sur toutes les offres, partout au Maroc 🇲🇦`}),(0,I.jsxs)(`div`,{className:`pk-savings-ribbon pk-aos`,children:[(0,I.jsx)(`span`,{className:`pk-savings-dot`}),`Jusqu'à 70 dh d'économies sur le Pack 3`]})]}),(0,I.jsx)(`div`,{className:`pk-grid`,children:Fo.map((t,r)=>(0,I.jsxs)(`div`,{className:`pk-card${t.variant===`default`?``:` pk-${t.variant}`} pk-aos pk-d${r+1}`,onMouseEnter:()=>n(t.id),onMouseLeave:()=>n(null),children:[t.topBadge&&(0,I.jsx)(`div`,{className:`pk-top-badge ${t.topBadge.cls}`,children:t.topBadge.text}),(0,I.jsxs)(`div`,{className:`pk-card-tag`,children:[(0,I.jsx)(`span`,{style:{width:`16px`,height:`1px`,display:`block`,background:t.variant===`golden`?`rgba(201,169,110,0.4)`:t.variant===`featured`?`rgba(239,119,106,0.4)`:`rgba(255,255,255,0.12)`}}),t.name]}),(0,I.jsxs)(`div`,{className:`pk-qty-display`,children:[(0,I.jsx)(`div`,{className:`pk-qty-num`,children:t.qty}),(0,I.jsx)(`div`,{className:`pk-qty-label`,children:`flacons`})]}),(0,I.jsx)(`div`,{className:`pk-volume-tag`,children:t.volume}),t.savings&&(0,I.jsxs)(`div`,{className:`pk-savings-badge ${t.variant===`golden`?`gold`:t.isFeatured?`coral`:`green`}`,children:[`🎉 `,t.savings]}),(0,I.jsxs)(`div`,{className:`pk-price-block`,children:[t.origPrice&&(0,I.jsxs)(`div`,{className:`pk-price-original`,children:[i(t.origPrice),` dh`]}),(0,I.jsxs)(`div`,{className:`pk-price`,children:[i(t.price),(0,I.jsx)(`sub`,{children:`dh`})]}),(0,I.jsxs)(`div`,{className:`pk-price-per`,children:[`≈ `,t.perUnit]})]}),(0,I.jsx)(`div`,{className:`pk-perks`,children:t.perks.map((e,n)=>(0,I.jsxs)(`div`,{className:`pk-perk${t.isFeatured?` featured`:``}`,children:[(0,I.jsx)(`span`,{className:`pk-perk-icon ${e.cls}`,children:(0,I.jsx)(`svg`,{width:`9`,height:`9`,viewBox:`0 0 10 10`,fill:`none`,children:(0,I.jsx)(`path`,{d:`M1.5 5.5L3.5 7.5L8.5 2.5`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`})})}),e.text]},n))}),(0,I.jsxs)(`a`,{href:`#collection`,className:`pk-btn ${t.btnVariant}`,onClick:()=>e?.(t.id),children:[`Choisir cette offre`,(0,I.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,children:(0,I.jsx)(`path`,{d:`M5 12h14M12 5l7 7-7 7`})})]})]},t.id))}),(0,I.jsxs)(`div`,{className:`pk-compare pk-aos`,children:[(0,I.jsx)(`div`,{className:`pk-compare-title`,children:`Comparatif des offres`}),(0,I.jsxs)(`div`,{className:`pk-compare-row pk-compare-head`,children:[(0,I.jsx)(`div`,{className:`pk-compare-cell header`,children:`Offre`}),(0,I.jsx)(`div`,{className:`pk-compare-cell header`,children:`Pack 1`}),(0,I.jsx)(`div`,{className:`pk-compare-cell header`,children:`Pack 2`}),(0,I.jsx)(`div`,{className:`pk-compare-cell header featured-col`,children:`Pack 3 ⚡`}),(0,I.jsx)(`div`,{className:`pk-compare-cell header gold-col`,children:`Golden ✦`})]}),Io.map((e,t)=>(0,I.jsxs)(`div`,{className:`pk-compare-row pk-compare-row-data`,children:[(0,I.jsx)(`div`,{className:`pk-compare-cell`,style:{textAlign:`left`,color:`rgba(255,255,255,0.4)`},children:e.label}),[{val:e.p1,isPFeat:!1,isGold:!1},{val:e.p2,isPFeat:!1,isGold:!1},{val:e.p3,isPFeat:!0,isGold:!1},{val:e.golden,isPFeat:!1,isGold:!0}].map(({val:t,isPFeat:n,isGold:r},i)=>(0,I.jsx)(`div`,{className:`pk-compare-cell${n?` featured-col`:r?` gold-col`:``} ${e.isBool?t===`yes`?`yes`:`no`:``}`,children:e.isBool?t===`yes`?`✓`:`—`:t===`no`?`—`:t},i))]},t))]}),(0,I.jsx)(`div`,{className:`pk-trust pk-aos`,children:[{icon:`🚚`,text:`Livraison gratuite sur toutes les offres`},{icon:`💳`,text:`Paiement à la livraison`},{icon:`↩️`,text:`Retours gratuits 30 jours`},{icon:`🇲🇦`,text:`Livraison partout au Maroc`},{icon:`⭐`,text:`4.9/5 · 2 400 clients satisfaits`}].map(({icon:e,text:t})=>(0,I.jsxs)(`div`,{className:`pk-trust-item`,children:[(0,I.jsx)(`span`,{className:`pk-trust-icon`,children:e}),t]},t))})]})]})},Ro=`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:      #FAF8F4;
  --cream-2:    #F4F0E8;
  --white:      #FFFFFF;
  --ink:        #0E0D0B;
  --ink-2:      #3A3830;
  --muted:      #8A8478;
  --gold:       #C9A96E;
  --gold-l:     #E8D5A8;
  --coral:      #EF776A;
  --coral-d:    #D45F53;
  --coral-xl:   #FFF3F1;
  --border:     rgba(14,13,11,0.09);
  --border-2:   rgba(14,13,11,0.05);
  --serif:      'Fraunces', Georgia, serif;
  --sans:       'DM Sans', sans-serif;
  --ease:       cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --expo:       cubic-bezier(0.16, 1, 0.3, 1);
}

html { scroll-behavior: smooth; }
body { font-family: var(--sans); background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
img  { display: block; max-width: 100%; }
a    { text-decoration: none; color: inherit; }
button { font-family: var(--sans); cursor: pointer; border: none; background: none; }
.container { max-width: 1320px; margin: 0 auto; padding: 0 clamp(16px,5vw,80px); }

/* ── ANIMATIONS ─────────────────────────────────── */
@keyframes fadeUp    { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:none} }
@keyframes fadeLeft  { from{opacity:0;transform:translateX(48px)} to{opacity:1;transform:none} }
@keyframes scaleUp   { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:none} }
@keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes scrollPulse { 0%,100%{opacity:0.3;transform:scaleY(0.7)} 50%{opacity:1;transform:scaleY(1)} }
@keyframes rotateSlow  { from{transform:rotate(0)} to{transform:rotate(360deg)} }
@keyframes drawLine  { from{width:0} to{width:100%} }
@keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,30px) scale(0.95)} }

/* scroll reveal */
.sr {
  opacity:0;
  transform:translateY(50px);
  transition:opacity 0.85s var(--expo), transform 0.85s var(--expo);
}
.sr.visible { opacity:1; transform:none; }
.sr.sr-left  { transform:translateX(-50px); }
.sr.sr-right { transform:translateX(50px); }
.sr.sr-scale { transform:scale(0.9); }
.sr.visible.sr-left, .sr.visible.sr-right, .sr.visible.sr-scale { transform:none; }
.sr.d1 { transition-delay:0.1s; }
.sr.d2 { transition-delay:0.2s; }
.sr.d3 { transition-delay:0.3s; }
.sr.d4 { transition-delay:0.4s; }
.sr.d5 { transition-delay:0.5s; }

/* ── ANNOUNCEMENT BAR ────────────────────────────── */
.ann-bar {
  background: var(--ink);
  color: rgba(255,255,255,0.55);
  font-family: var(--sans);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 0;
  overflow: hidden;
  white-space: nowrap;
}
.ann-track {
  display: inline-flex;
  gap: 56px;
  animation: marquee 28s linear infinite;
}
.ann-track b { color: var(--gold); font-weight: 600; }

/* ── HERO ─────────────────────────────────────────── */
.hero {
  position: relative;
  height: 100vh;
  min-height: 620px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-video {
  position: absolute; inset: 0;
  width:100%; height:100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(14,13,11,0.80) 0%,
    rgba(14,13,11,0.40) 55%,
    rgba(14,13,11,0.10) 100%
  );
}

/* big decorative grain texture over hero */
.hero::after {
  content:'';
  position:absolute;inset:0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events:none;
  z-index:3;
  opacity:0.5;
}

.hero-content {
  position:relative;z-index:4;
  color:white;
  width:100%;
  padding: 0 clamp(24px,6vw,100px) clamp(56px,9vh,110px);
  display:grid;
  grid-template-columns:1.3fr 1fr;
  align-items:flex-end;
  gap:40px;
}
.hero-tag {
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-size:0.6rem;
  font-weight:700;
  letter-spacing:0.32em;
  text-transform:uppercase;
  color:var(--gold);
  margin-bottom:22px;
  animation:fadeUp 0.8s var(--expo) 0.15s both;
}
.hero-tag::before {
  content:'';width:36px;height:1px;background:var(--gold);
}
.hero-title {
  font-family: var(--serif);
  font-size: clamp(3rem,7.5vw,6.4rem);
  font-weight:700;
  line-height:0.97;
  letter-spacing:-0.02em;
  animation:fadeUp 0.9s var(--expo) 0.3s both;
}
.hero-title em {
  font-style:italic;
  font-weight:300;
  color:var(--gold);
}
.hero-right {
  display:flex;flex-direction:column;align-items:flex-start;gap:22px;
  padding-bottom:8px;
  animation:fadeLeft 0.9s var(--expo) 0.45s both;
}
.hero-sub {
  font-size:clamp(0.82rem,1.1vw,0.95rem);
  font-weight:400;
  line-height:1.82;
  color:rgba(255,255,255,0.62);
  max-width:360px;
}
.hero-actions { display:flex;gap:12px;flex-wrap:wrap; }

/* Primary button */
.btn-primary {
  display:inline-flex;align-items:center;gap:9px;
  background:var(--coral);
  color:white;
  padding:15px 36px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.72rem;font-weight:700;
  letter-spacing:0.1em;text-transform:uppercase;
  transition:transform 0.25s var(--spring), box-shadow 0.25s, background 0.2s;
  box-shadow:0 6px 28px rgba(239,119,106,0.45);
}
.btn-primary:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 12px 36px rgba(239,119,106,0.55); background:var(--coral-d); }

/* Ghost button */
.btn-ghost {
  display:inline-flex;align-items:center;gap:9px;
  background:rgba(255,255,255,0.08);
  color:white;
  padding:15px 28px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.72rem;font-weight:600;
  letter-spacing:0.06em;
  border:1px solid rgba(255,255,255,0.28);
  backdrop-filter:blur(10px);
  transition:background 0.2s, transform 0.2s;
}
.btn-ghost:hover { background:rgba(255,255,255,0.18); transform:translateY(-2px); }

.hero-badge {
  display:inline-flex;align-items:center;gap:10px;
  background:rgba(255,255,255,0.08);
  backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,0.18);
  border-radius:999px;
  padding:10px 20px;
  font-size:0.7rem;font-weight:600;
  color:rgba(255,255,255,0.9);
}
.live-dot {
  width:7px;height:7px;border-radius:50%;
  background:#4ADE80;
  animation:blink 2s ease-in-out infinite;
}

/* Scroll indicator */
.hero-scroll-hint {
  position:absolute;
  right:clamp(20px,4vw,60px);
  top:50%;
  transform:translateY(-50%);
  display:flex;flex-direction:column;align-items:center;gap:10px;
  z-index:4;
}
.scroll-line {
  width:1px;height:64px;
  background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.55),transparent);
  animation:scrollPulse 2.2s ease-in-out infinite;
}
.scroll-label {
  font-size:0.52rem;font-weight:700;letter-spacing:0.28em;
  text-transform:uppercase;color:rgba(255,255,255,0.4);
  writing-mode:vertical-rl;
}

/* ── TRUST STRIP ──────────────────────────────────── */
.trust-strip {
  background:var(--white);
  border-bottom:1px solid var(--border);
}
.trust-inner {
  display:flex;align-items:stretch;flex-wrap:wrap;
}
.trust-item {
  flex:1;min-width:160px;
  display:flex;align-items:center;justify-content:center;gap:14px;
  padding:22px 16px;
  border-right:1px solid var(--border);
  transition:background 0.2s;
  cursor:default;
}
.trust-item:last-child { border-right:none; }
.trust-item:hover { background:var(--cream); }
.trust-icon { font-size:18px;flex-shrink:0; }
.trust-text strong { display:block;font-size:0.74rem;font-weight:700;color:var(--ink); }
.trust-text span   { font-size:0.67rem;color:var(--muted); }

/* ── SECTION LABELS ───────────────────────────────── */
.eyebrow {
  display:inline-flex;align-items:center;gap:10px;
  font-size:0.6rem;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;
  color:var(--coral);margin-bottom:14px;
}
.eyebrow::before,.eyebrow::after { content:'';width:22px;height:1px;background:var(--coral); }
.eyebrow-gold { color:var(--gold); }
.eyebrow-gold::before,.eyebrow-gold::after { background:var(--gold); }

/* ── CATEGORY CARDS ───────────────────────────────── */
.cat-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--cream);
  position:relative;
  overflow:hidden;
}
/* Large decorative orbs — NO black background */
.cat-section::before {
  content:'';
  position:absolute;top:-200px;right:-200px;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(201,169,110,0.09) 0%,transparent 70%);
  pointer-events:none;
  animation:orb-drift 18s ease-in-out infinite;
}
.cat-section::after {
  content:'';
  position:absolute;bottom:-180px;left:-180px;
  width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(239,119,106,0.07) 0%,transparent 70%);
  pointer-events:none;
  animation:orb-drift 22s ease-in-out infinite reverse;
}

.cat-section-header {
  text-align:center;margin-bottom:52px;
  position:relative;z-index:1;
}
.cat-section-title {
  font-family:var(--serif);
  font-size:clamp(2.2rem,4.5vw,3.6rem);
  font-weight:700;
  color:var(--ink);
  letter-spacing:-0.02em;
  line-height:1.06;
}
.cat-section-title em { font-style:italic;font-weight:300;color:var(--coral); }

.cat-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
  position:relative;z-index:1;
}

/* Category card */
.cat-card {
  position:relative;overflow:hidden;
  border-radius:28px;
  cursor:pointer;
  aspect-ratio:3/4;
  background:#E8E3DC;
  border:1px solid rgba(14,13,11,0.06);
  transition:transform 0.55s var(--expo), box-shadow 0.55s;
  /* neumorphic ring on hover */
}
.cat-card:hover {
  transform:translateY(-10px) scale(1.01);
  box-shadow:0 40px 80px rgba(14,13,11,0.18), 0 0 0 2px rgba(239,119,106,0.25);
}

.cat-card-img {
  width:100%;height:100%;
  object-fit:cover;object-position:center top;
  transition:transform 0.8s var(--expo), filter 0.5s;
  filter:brightness(0.88) saturate(0.95);
}
.cat-card:hover .cat-card-img { transform:scale(1.09); filter:brightness(0.98) saturate(1.05); }

.cat-card-overlay {
  position:absolute;inset:0;
  background:linear-gradient(
    170deg,
    rgba(14,13,11,0.0) 30%,
    rgba(14,13,11,0.55) 70%,
    rgba(14,13,11,0.88) 100%
  );
  transition:opacity 0.4s;
}

.cat-card-top {
  position:absolute;top:20px;left:20px;right:20px;
  display:flex;justify-content:space-between;align-items:center;
  z-index:2;
}
.cat-card-tag {
  background:rgba(201,169,110,0.18);
  border:1px solid rgba(201,169,110,0.45);
  backdrop-filter:blur(10px);
  color:var(--gold);
  font-size:0.58rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;
  padding:7px 15px;border-radius:999px;
}
.cat-card-count-badge {
  background:rgba(255,255,255,0.1);
  backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,0.18);
  color:rgba(255,255,255,0.82);
  font-size:0.58rem;font-weight:600;
  padding:7px 13px;border-radius:999px;
}

.cat-card-body {
  position:absolute;bottom:0;left:0;right:0;
  padding:30px 26px;
  display:flex;flex-direction:column;gap:6px;
  z-index:2;
}
/* animated underline */
.cat-card-line {
  width:0;height:2px;
  background:linear-gradient(to right,var(--coral),var(--gold));
  border-radius:999px;
  transition:width 0.45s var(--expo);
  margin-bottom:4px;
}
.cat-card:hover .cat-card-line { width:52px; }

.cat-card-name {
  font-family:var(--serif);
  font-size:clamp(2rem,3.5vw,2.8rem);
  font-weight:700;
  color:white;
  letter-spacing:-0.02em;
  line-height:1;
}
.cat-card-sub {
  font-size:0.68rem;font-weight:500;
  color:rgba(255,255,255,0.52);
  letter-spacing:0.1em;text-transform:uppercase;
}
.cat-card-cta {
  display:inline-flex;align-items:center;gap:8px;
  background:var(--coral);
  color:white;
  font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  padding:11px 24px;border-radius:999px;
  width:fit-content;margin-top:10px;
  opacity:0;transform:translateY(14px);
  transition:opacity 0.3s, transform 0.35s var(--spring);
  box-shadow:0 4px 18px rgba(239,119,106,0.45);
}
.cat-card:hover .cat-card-cta { opacity:1; transform:none; }

/* ── STORY ────────────────────────────────────────── */
.story-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--white);
  position:relative;
  overflow:hidden;
}
/* subtle decorative element */
.story-section::before {
  content:'✦';
  position:absolute;right:6%;top:12%;
  font-size:120px;
  color:rgba(201,169,110,0.05);
  pointer-events:none;
  font-family:var(--serif);
  animation:rotateSlow 30s linear infinite;
}

.story-grid {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:80px;
  align-items:center;
}

.story-img-wrap { position:relative;z-index:1; }

.story-img {
  width:100%;border-radius:28px;
  aspect-ratio:4/5;object-fit:cover;
  box-shadow:0 40px 80px rgba(14,13,11,0.12);
  transition:transform 0.65s var(--expo);
}
.story-img-wrap:hover .story-img { transform:scale(1.025); }

/* offset gold border */
.story-img-frame {
  position:absolute;
  top:-18px;right:-18px;bottom:18px;left:18px;
  border:2px solid var(--gold);
  border-radius:28px;
  opacity:0.35;
  pointer-events:none;
  z-index:0;
}

.story-float {
  position:absolute;
  bottom:36px;left:-28px;
  background:white;
  border-radius:20px;
  padding:18px 22px;
  box-shadow:0 20px 60px rgba(14,13,11,0.12);
  display:flex;align-items:center;gap:14px;
  animation:floatY 5s ease-in-out infinite;
  z-index:3;
  border:1px solid var(--border);
}
.story-float-icon { font-size:28px; }
.story-float-num { font-family:var(--serif);font-size:1.6rem;font-weight:700;color:var(--ink);line-height:1; }
.story-float-label { font-size:0.65rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.07em; }

.story-content {}
.story-badge {
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,var(--gold-l),#f5e6c5);
  border-radius:999px;padding:8px 20px;
  font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  color:#7A5C1E;margin-bottom:26px;
}
.story-title {
  font-family:var(--serif);
  font-size:clamp(2rem,4vw,3.2rem);
  font-weight:700;
  color:var(--ink);
  line-height:1.05;
  letter-spacing:-0.02em;
  margin-bottom:26px;
}
.story-title em { font-style:italic;font-weight:300;color:var(--coral); }
.story-body { font-size:0.9rem;font-weight:400;line-height:1.9;color:var(--muted);margin-bottom:16px; }

.story-cta-link {
  display:inline-flex;align-items:center;gap:10px;
  margin-top:8px;
  color:var(--ink);font-size:0.78rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  transition:color 0.2s, gap 0.25s;
}
.story-cta-link::after { content:'→';transition:transform 0.2s; }
.story-cta-link:hover { color:var(--coral); gap:16px; }
.story-cta-link:hover::after { transform:translateX(6px); }

.story-stats {
  display:flex;gap:36px;flex-wrap:wrap;
  margin-top:40px;padding-top:32px;
  border-top:1px solid var(--border);
}
.stat-item strong {
  display:block;
  font-family:var(--serif);font-size:2.4rem;font-weight:700;
  color:var(--ink);line-height:1;letter-spacing:-0.03em;
}
.stat-item strong span { color:var(--coral); }
.stat-item p { font-size:0.65rem;font-weight:600;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-top:5px; }

/* ── INGREDIENTS ──────────────────────────────────── */
.ing-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--cream-2);
  position:relative;
  overflow:hidden;
}
/* wave top divider */
.ing-section::before {
  content:'';
  position:absolute;top:0;left:0;right:0;
  height:80px;
  background:var(--white);
  clip-path:ellipse(60% 100% at 50% 0%);
  pointer-events:none;
}

.ing-grid {
  display:grid;
  grid-template-columns:1fr 1.25fr;
  gap:80px;
  align-items:center;
}

.ing-title {
  font-family:var(--serif);
  font-size:clamp(1.9rem,4vw,3.2rem);
  font-weight:700;
  color:var(--ink);
  line-height:1.06;
  letter-spacing:-0.02em;
  margin-bottom:22px;
}
.ing-title em { font-style:italic;font-weight:300;color:var(--coral); }
.ing-body { font-size:0.9rem;line-height:1.88;color:var(--muted);margin-bottom:28px; }

.ing-tags { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px; }
.ing-tag {
  display:inline-block;
  background:white;
  border:1px solid var(--border);
  border-radius:999px;
  padding:7px 18px;
  font-size:0.67rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;
  color:var(--ink-2);
  transition:all 0.2s;
  cursor:default;
}
.ing-tag:hover { border-color:var(--coral);color:var(--coral);transform:translateY(-2px); }

.ing-link {
  display:inline-flex;align-items:center;gap:10px;
  color:var(--coral);font-weight:700;font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;
  transition:gap 0.2s;
}
.ing-link:hover { gap:16px; }

.ing-imgs {
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:auto auto;
  gap:14px;
}
.ing-tall {
  grid-row:span 2;
  border-radius:22px;overflow:hidden;
}
.ing-tall img { width:100%;height:100%;object-fit:cover;min-height:280px;transition:transform 0.7s var(--expo); }
.ing-tall:hover img { transform:scale(1.07); }
.ing-sm { border-radius:22px;overflow:hidden;aspect-ratio:1; }
.ing-sm img { width:100%;height:100%;object-fit:cover;transition:transform 0.7s var(--expo); }
.ing-sm:hover img { transform:scale(1.07); }

/* ── COLLECTION ───────────────────────────────────── */
.collection-section {
  padding:clamp(72px,9vw,120px) 0 clamp(90px,11vw,140px);
  background:var(--white);
  position:relative;
}
/* Decorative corner flower */
.collection-section::after {
  content:'✦';
  position:absolute;left:4%;bottom:6%;
  font-size:180px;
  color:rgba(239,119,106,0.04);
  pointer-events:none;
  font-family:var(--serif);
}

.collection-header {
  display:flex;justify-content:space-between;align-items:flex-end;
  margin-bottom:48px;flex-wrap:wrap;gap:20px;
}
.collection-title {
  font-family:var(--serif);
  font-size:clamp(2rem,4vw,3.2rem);
  font-weight:700;
  color:var(--ink);
  letter-spacing:-0.02em;
}
.collection-title em { font-style:italic;font-weight:300;color:var(--coral); }

/* Filter tabs — refined pill row */
.filters {
  display:flex;gap:6px;
  background:var(--cream);
  border:1px solid var(--border);
  border-radius:999px;
  padding:5px;
}
.filter-btn {
  padding:9px 24px;
  border-radius:999px;
  font-family:var(--sans);
  font-size:0.7rem;font-weight:700;
  cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;
  transition:all 0.25s var(--spring);
  border:none;background:none;color:var(--muted);
}
.filter-btn:hover { color:var(--coral); }
.filter-btn.active {
  background:var(--coral);color:white;
  box-shadow:0 4px 18px rgba(239,119,106,0.35);
  transform:scale(1.04);
}

.products-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
  gap:24px;
}
.skeleton {
  height:400px;border-radius:22px;
  background:linear-gradient(90deg,#ece9e4 25%,#f5f2ee 50%,#ece9e4 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
}

/* Empty state */
.empty-state {
  grid-column:1/-1;
  text-align:center;
  padding:80px 20px;
  color:var(--muted);
}
.empty-icon { font-size:48px;margin-bottom:16px;opacity:0.5; }
.empty-text { font-size:0.9rem; }

/* ── PROCESS ──────────────────────────────────────── */
.process-section {
  padding:clamp(72px,9vw,120px) 0;
  background:var(--cream);
  position:relative;
  overflow:hidden;
}
.process-section::before {
  content:'';
  position:absolute;top:-100px;right:-100px;
  width:400px;height:400px;border-radius:50%;
  background:radial-gradient(circle,rgba(201,169,110,0.1) 0%,transparent 70%);
  pointer-events:none;
}

.process-header { text-align:center;margin-bottom:52px; }
.process-header-title {
  font-family:var(--serif);
  font-size:clamp(1.9rem,4vw,3rem);
  font-weight:700;
  color:var(--ink);
  letter-spacing:-0.02em;
}
.process-header-title em { font-style:italic;font-weight:300;color:var(--gold); }

.process-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  border:1px solid var(--border);
  border-radius:28px;
  overflow:hidden;
  background:var(--white);
}
.process-step {
  padding:40px 28px;
  border-right:1px solid var(--border);
  position:relative;
  overflow:hidden;
  transition:background 0.3s;
}
.process-step:last-child { border-right:none; }
.process-step:hover { background:var(--cream); }
/* bottom bar animation */
.process-step::after {
  content:'';
  position:absolute;bottom:0;left:0;right:0;
  height:3px;
  background:linear-gradient(to right,var(--coral),var(--gold));
  transform:scaleX(0);transform-origin:left;
  transition:transform 0.45s var(--expo);
}
.process-step:hover::after { transform:scaleX(1); }

.process-num {
  font-family:var(--serif);
  font-size:4rem;font-weight:900;
  color:rgba(14,13,11,0.04);
  line-height:1;
  margin-bottom:14px;letter-spacing:-0.04em;
}
.process-icon { font-size:22px;margin-bottom:14px; }
.process-name { font-size:0.76rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink);margin-bottom:10px; }
.process-desc { font-size:0.8rem;line-height:1.72;color:var(--muted); }

/* ── PROMO BANNER ─────────────────────────────────── */
.promo-section {
  background:linear-gradient(135deg,var(--coral) 0%,#C25045 100%);
  position:relative;overflow:hidden;
}
.promo-section::before {
  content:'';position:absolute;
  top:-60%;left:-10%;
  width:600px;height:600px;border-radius:50%;
  background:rgba(255,255,255,0.05);pointer-events:none;
}
.promo-section::after {
  content:'✦';
  position:absolute;right:6%;top:50%;transform:translateY(-50%);
  font-size:200px;color:rgba(255,255,255,0.04);
  font-family:var(--serif);pointer-events:none;
}
.promo-inner {
  position:relative;z-index:1;
  display:flex;align-items:center;justify-content:space-between;
  padding:clamp(48px,7vw,80px) clamp(24px,6vw,100px);
  gap:32px;flex-wrap:wrap;
}
.promo-eyebrow { font-size:0.65rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:10px; }
.promo-title {
  font-family:var(--serif);
  font-size:clamp(1.6rem,3.5vw,2.8rem);font-weight:700;
  color:white;line-height:1.1;letter-spacing:-0.02em;
}
.btn-white {
  display:inline-flex;align-items:center;gap:10px;
  background:white;color:var(--coral);
  padding:16px 40px;border-radius:999px;
  font-family:var(--sans);font-size:0.72rem;font-weight:800;
  letter-spacing:0.1em;text-transform:uppercase;
  white-space:nowrap;flex-shrink:0;
  transition:transform 0.25s var(--spring), box-shadow 0.25s;
  box-shadow:0 8px 32px rgba(14,13,11,0.18);
}
.btn-white:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 16px 40px rgba(14,13,11,0.25); }

/* ── PRESS STRIP ──────────────────────────────────── */
.press-section {
  padding:44px 0;
  background:var(--white);
  border-bottom:1px solid var(--border);
}
.press-inner {
  display:flex;align-items:center;gap:48px;justify-content:center;flex-wrap:wrap;
}
.press-label {
  font-size:0.62rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
  color:var(--muted);flex-shrink:0;
}
.press-names { display:flex;gap:40px;align-items:center;flex-wrap:wrap;justify-content:center; }
.press-name {
  font-family:var(--serif);font-size:1.4rem;font-weight:400;
  color:rgba(14,13,11,0.18);letter-spacing:0.06em;white-space:nowrap;
  transition:color 0.3s, transform 0.3s;
}
.press-name:hover { color:var(--ink);transform:translateY(-3px); }

/* ── FOOTER BANNER ────────────────────────────────── */
.footer-banner {
  position:relative;
  padding:clamp(80px,12vw,140px) 0;
  background:var(--cream-2);
  text-align:center;overflow:hidden;
}
.footer-banner::before {
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 100%,rgba(239,119,106,0.12) 0%,transparent 70%);
  pointer-events:none;
}
.footer-banner-content { position:relative;z-index:2; }
.banner-eyebrow { display:inline-block;font-size:0.62rem;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:var(--coral);margin-bottom:18px; }
.banner-title {
  font-family:var(--serif);
  font-size:clamp(2rem,5vw,4rem);font-weight:700;
  color:var(--ink);line-height:1.07;letter-spacing:-0.02em;
  margin-bottom:36px;
}
.banner-actions { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }

/* Ghost dark */
.btn-ghost-dark {
  display:inline-flex;align-items:center;gap:9px;
  background:rgba(14,13,11,0.06);
  color:var(--ink);
  padding:15px 28px;border-radius:999px;
  font-family:var(--sans);font-size:0.72rem;font-weight:600;letter-spacing:0.06em;
  border:1px solid var(--border);
  transition:background 0.2s, transform 0.2s;
}
.btn-ghost-dark:hover { background:rgba(14,13,11,0.1); transform:translateY(-2px); }

/* ── FOOTER ───────────────────────────────────────── */
.footer { background:var(--ink);padding:clamp(52px,8vw,84px) 0 40px;color:rgba(255,255,255,0.45); }
.footer-top { display:grid;grid-template-columns:2fr 1fr 1fr 2fr;gap:48px;margin-bottom:56px; }
.footer-logo { font-family:var(--serif);font-size:1.7rem;font-weight:700;color:white;margin-bottom:10px;letter-spacing:-0.01em; }
.footer-logo span { color:var(--gold); }
.footer-tagline { font-size:0.8rem;line-height:1.75;color:rgba(255,255,255,0.3);margin-bottom:24px; }
.footer-social { display:flex;gap:10px; }
.social-btn {
  display:flex;align-items:center;justify-content:center;
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(255,255,255,0.1);
  color:rgba(255,255,255,0.35);
  font-size:0.62rem;font-weight:700;
  transition:all 0.2s;
}
.social-btn:hover { border-color:var(--gold);color:var(--gold);transform:translateY(-3px); }

.footer-heading { color:white;font-size:0.65rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:20px; }
.footer-link { display:block;font-size:0.8rem;color:rgba(255,255,255,0.32);margin-bottom:11px;transition:color 0.2s; }
.footer-link:hover { color:white; }

.email-form { display:flex;gap:8px;margin-top:4px; }
.email-input {
  flex:1;min-width:0;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:12px;padding:12px 16px;
  font-family:var(--sans);font-size:0.8rem;color:white;outline:none;
  transition:border-color 0.2s;
}
.email-input::placeholder { color:rgba(255,255,255,0.22); }
.email-input:focus { border-color:rgba(255,255,255,0.3); }
.email-btn {
  background:var(--coral);color:white;border-radius:12px;
  padding:12px 20px;font-family:var(--sans);font-size:0.73rem;font-weight:700;
  cursor:pointer;white-space:nowrap;transition:background 0.2s, transform 0.2s;
}
.email-btn:hover { background:var(--coral-d);transform:translateY(-1px); }

.footer-bottom {
  display:flex;justify-content:space-between;align-items:center;
  padding-top:28px;border-top:1px solid rgba(255,255,255,0.06);
  flex-wrap:wrap;gap:12px;
}
.footer-copy { font-size:0.7rem;color:rgba(255,255,255,0.18); }
.footer-bottom-links { display:flex;gap:24px;flex-wrap:wrap; }
.footer-bottom-link { font-size:0.7rem;color:rgba(255,255,255,0.2);transition:color 0.2s; }
.footer-bottom-link:hover { color:rgba(255,255,255,0.55); }

/* ══════════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════════ */
@media (max-width:1100px) {
  .hero-content { grid-template-columns:1fr; }
  .hero-right { display:none; }
  .story-grid,.ing-grid { grid-template-columns:1fr;gap:40px; }
  .story-img-frame { display:none; }
  .story-float { left:16px; }
  .process-grid { grid-template-columns:1fr 1fr; }
  .process-step:nth-child(2) { border-right:none; }
  .process-step:nth-child(1),
  .process-step:nth-child(2) { border-bottom:1px solid var(--border); }
  .footer-top { grid-template-columns:1fr 1fr;gap:36px; }
}
@media (max-width:768px) {
  .cat-grid { grid-template-columns:1fr;gap:16px; }
  .cat-card { aspect-ratio:4/3; }
  .trust-inner { flex-direction:column; }
  .trust-item { border-right:none;border-bottom:1px solid var(--border);justify-content:flex-start;padding:16px 20px;min-width:100%; }
  .trust-item:last-child { border-bottom:none; }
  .process-grid { grid-template-columns:1fr; }
  .process-step { border-right:none !important;border-bottom:1px solid var(--border); }
  .process-step:last-child { border-bottom:none; }
  .footer-top { grid-template-columns:1fr; }
  .story-stats { flex-direction:column;gap:20px; }
  .promo-inner { text-align:center;justify-content:center; }
  .hero-scroll-hint { display:none; }
  .story-float { display:none; }
  .collection-header { flex-direction:column;align-items:flex-start; }
  .products-grid { grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
}
@media (max-width:480px) {
  .hero-title { font-size:2.6rem; }
  .cat-card { aspect-ratio:16/9; }
  .products-grid { grid-template-columns:1fr 1fr;gap:12px; }
  .hero-actions { flex-direction:column; }
  .btn-primary,.btn-ghost { width:100%;justify-content:center; }
  .filters { flex-wrap:wrap;border-radius:16px; }
  .ing-imgs { grid-template-columns:1fr; }
  .ing-tall { grid-row:auto; }
}
`,zo=[`Tous`,`Femme`,`Homme`,`Unisex`];function Bo(){(0,v.useEffect)(()=>{let e=new IntersectionObserver(e=>e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`visible`)}),{threshold:.1});return document.querySelectorAll(`.sr`).forEach(t=>e.observe(t)),()=>e.disconnect()},[])}function Vo({addToCart:e}){let[t,n]=(0,v.useState)([]),[r,i]=(0,v.useState)(!0),[a,o]=(0,v.useState)(`Tous`);Bo(),(0,v.useEffect)(()=>{if(!document.getElementById(`nahid-global-styles`)){let e=document.createElement(`style`);e.id=`nahid-global-styles`,e.textContent=Ro,document.head.appendChild(e)}},[]),(0,v.useEffect)(()=>{F.get(`/api/products`).then(e=>n(e.data)).catch(()=>n([])).finally(()=>i(!1))},[]);let s=a===`Tous`?t:t.filter(e=>e.category===a),c=e=>{e&&o(e),document.getElementById(`collection`)?.scrollIntoView({behavior:`smooth`})};return(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`section`,{className:`hero`,children:[(0,I.jsx)(`video`,{className:`hero-video`,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,poster:`https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=80`,children:(0,I.jsx)(`source`,{src:`/videos/hero.mp4`,type:`video/mp4`})}),(0,I.jsx)(`div`,{className:`hero-overlay`}),(0,I.jsxs)(`div`,{className:`hero-content`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`span`,{className:`hero-tag`,children:`Maison de Parfums — Casablanca`}),(0,I.jsxs)(`h1`,{className:`hero-title`,style:{color:`white`},children:[`L'Art de`,(0,I.jsx)(`br`,{}),`la Séduction`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`Olfactive`})]}),(0,I.jsxs)(`div`,{className:`hero-actions`,style:{marginTop:`34px`},children:[(0,I.jsx)(`button`,{onClick:()=>c(null),className:`btn-primary`,children:`Explorer la Collection`}),(0,I.jsx)(An,{to:`/notre-histoire`,className:`btn-ghost`,children:`Notre Histoire →`})]})]}),(0,I.jsxs)(`div`,{className:`hero-right`,children:[(0,I.jsxs)(`div`,{className:`hero-badge`,children:[(0,I.jsx)(`span`,{className:`live-dot`}),`En stock — Expédition 24h`]}),(0,I.jsx)(`p`,{className:`hero-sub`,children:`Des fragrances d'exception, composées à partir des matières premières les plus nobles — oud, rose de Taif, ambre gris, iris de Florence.`})]})]}),(0,I.jsxs)(`div`,{className:`hero-scroll-hint`,children:[(0,I.jsx)(`div`,{className:`scroll-line`}),(0,I.jsx)(`span`,{className:`scroll-label`,children:`Défiler`})]})]}),(0,I.jsx)(`section`,{className:`trust-strip`,children:(0,I.jsx)(`div`,{className:`container`,children:(0,I.jsx)(`div`,{className:`trust-inner`,children:[{icon:`🚚`,title:`Livraison offerte`,sub:`Dès 500 MAD`},{icon:`🧪`,title:`Échantillon offert`,sub:`Avec chaque commande`},{icon:`⭐`,title:`4.9 / 5 · 2 400 avis`,sub:`Clients satisfaits`},{icon:`🌿`,title:`100% naturels`,sub:`Sélectionnés à la source`},{icon:`↩️`,title:`Retours gratuits`,sub:`30 jours sans questions`}].map(({icon:e,title:t,sub:n})=>(0,I.jsxs)(`div`,{className:`trust-item`,children:[(0,I.jsx)(`span`,{className:`trust-icon`,children:e}),(0,I.jsxs)(`div`,{className:`trust-text`,children:[(0,I.jsx)(`strong`,{children:t}),(0,I.jsx)(`span`,{children:n})]})]},t))})})}),(0,I.jsx)(`section`,{className:`cat-section`,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{className:`cat-section-header sr`,children:[(0,I.jsx)(`div`,{className:`eyebrow`,children:`Nos Collections`}),(0,I.jsxs)(`h2`,{className:`cat-section-title`,children:[`Choisissez votre `,(0,I.jsx)(`em`,{children:`univers`})]})]}),(0,I.jsx)(`div`,{className:`cat-grid`,children:[{label:`Femme`,count:`32 parfums`,img:`/femmeNahid.png`,fallback:`https://i.postimg.cc/dQTtHTgz/femme-Nahid.png`,path:`/collection/femme`,tag:`Féminin`,delay:`d1`},{label:`Homme`,count:`28 parfums`,img:`/hommeNahid.png`,fallback:`https://i.postimg.cc/WpJbWJxx/homme-Nahid.jpg`,path:`/collection/homme`,tag:`Masculin`,delay:`d2`},{label:`Unisex`,count:`18 parfums`,img:`/unisexNahid.png`,fallback:`https://i.postimg.cc/MZjKPjgN/unisex-Nahid.png`,path:`/collection/unisex`,tag:`Libre`,delay:`d3`}].map(({label:e,count:t,img:n,fallback:r,path:i,tag:a,delay:o})=>(0,I.jsxs)(An,{to:i,className:`cat-card sr sr-scale ${o}`,style:{textDecoration:`none`,display:`block`},children:[(0,I.jsx)(`img`,{className:`cat-card-img`,src:n,alt:e,loading:`lazy`,onError:e=>{e.currentTarget.src=r}}),(0,I.jsx)(`div`,{className:`cat-card-overlay`}),(0,I.jsxs)(`div`,{className:`cat-card-top`,children:[(0,I.jsx)(`span`,{className:`cat-card-tag`,children:a}),(0,I.jsx)(`span`,{className:`cat-card-count-badge`,children:t})]}),(0,I.jsxs)(`div`,{className:`cat-card-body`,children:[(0,I.jsx)(`div`,{className:`cat-card-line`}),(0,I.jsx)(`span`,{className:`cat-card-name`,children:e}),(0,I.jsx)(`span`,{className:`cat-card-sub`,children:t}),(0,I.jsx)(`span`,{className:`cat-card-cta`,children:`Explorer →`})]})]},e))})]})}),(0,I.jsx)(`section`,{className:`story-section`,children:(0,I.jsx)(`div`,{className:`container`,children:(0,I.jsxs)(`div`,{className:`story-grid`,children:[(0,I.jsx)(`div`,{className:`sr sr-left`,children:(0,I.jsxs)(`div`,{className:`story-img-wrap`,children:[(0,I.jsx)(`div`,{className:`story-img-frame`}),(0,I.jsx)(`img`,{className:`story-img`,src:`https://i.postimg.cc/26GdgKq8/Gemini-Generated-Image-k9jm4pk9jm4pk9jm.png`,alt:`Notre histoire`,loading:`lazy`}),(0,I.jsxs)(`div`,{className:`story-float`,children:[(0,I.jsx)(`span`,{className:`story-float-icon`,children:`🏆`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`story-float-num`,children:`12+`}),(0,I.jsx)(`div`,{className:`story-float-label`,children:`Ans d'expertise`})]})]})]})}),(0,I.jsxs)(`div`,{className:`sr sr-right d2`,children:[(0,I.jsx)(`div`,{className:`story-badge`,children:`Née à Casablanca`}),(0,I.jsxs)(`h2`,{className:`story-title`,children:[`Une Histoire`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`Olfactive`}),(0,I.jsx)(`br`,{}),`Authentique`]}),(0,I.jsx)(`p`,{className:`story-body`,children:`Nahid Perfume est née au cœur des médinas parfumées du Maroc — une ode à la beauté sensorielle, entre souks épicés et jardins andalous. Chaque flacon renferme une histoire.`}),(0,I.jsx)(`p`,{className:`story-body`,children:`Nous sélectionnons les matières premières les plus nobles : oud de Camboge, rose de Taif, ambre gris et iris de Florence. Chaque fragrance est composée pour durer et laisser une empreinte unique.`}),(0,I.jsx)(An,{to:`/notre-histoire`,className:`story-cta-link`,children:`Découvrir notre maison`}),(0,I.jsx)(`div`,{className:`story-stats`,children:[{n:`12+`,l:`Ans d'expertise`},{n:`78`,l:`Fragrances uniques`},{n:`2 400`,l:`Clients fidèles`}].map(({n:e,l:t})=>(0,I.jsxs)(`div`,{className:`stat-item`,children:[(0,I.jsxs)(`strong`,{children:[e,(0,I.jsx)(`span`,{children:`+`})]}),(0,I.jsx)(`p`,{children:t})]},t))})]})]})})}),(0,I.jsx)(`section`,{className:`ing-section`,children:(0,I.jsx)(`div`,{className:`container`,children:(0,I.jsxs)(`div`,{className:`ing-grid`,children:[(0,I.jsxs)(`div`,{className:`sr sr-left`,children:[(0,I.jsx)(`div`,{className:`eyebrow`,children:`Matières premières`}),(0,I.jsxs)(`h2`,{className:`ing-title`,children:[`Les ingrédients`,(0,I.jsx)(`br`,{}),`les plus précieux`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`du monde`})]}),(0,I.jsx)(`p`,{className:`ing-body`,children:`Nous ne faisons aucun compromis. Chaque ingrédient est sourcé directement chez les meilleurs producteurs mondiaux — du oud de Camboge à la rose de Taif en passant par l'iris de Florence.`}),(0,I.jsx)(`div`,{className:`ing-tags`,children:[`Oud de Camboge`,`Rose de Taif`,`Ambre Gris`,`Iris de Florence`,`Musc Blanc`,`Cèdre de l'Atlas`].map(e=>(0,I.jsx)(`span`,{className:`ing-tag`,children:e},e))}),(0,I.jsx)(`a`,{href:`#collection`,className:`ing-link`,children:`Explorer nos fragrances →`})]}),(0,I.jsxs)(`div`,{className:`ing-imgs sr sr-right d2`,children:[(0,I.jsx)(`div`,{className:`ing-tall`,children:(0,I.jsx)(`img`,{src:`https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80`,alt:`Oud`,loading:`lazy`})}),(0,I.jsx)(`div`,{className:`ing-sm`,children:(0,I.jsx)(`img`,{src:`https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=80`,alt:`Rose`,loading:`lazy`})}),(0,I.jsx)(`div`,{className:`ing-sm`,children:(0,I.jsx)(`img`,{src:`https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80`,alt:`Ambre`,loading:`lazy`})})]})]})})}),(0,I.jsx)(`section`,{id:`collection`,className:`collection-section`,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{className:`collection-header sr`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`eyebrow`,children:`Collection`}),(0,I.jsxs)(`h2`,{className:`collection-title`,children:[`Nos `,(0,I.jsx)(`em`,{children:`Parfums`})]})]}),(0,I.jsx)(`div`,{className:`filters`,children:zo.map(e=>(0,I.jsx)(`button`,{className:`filter-btn${a===e?` active`:``}`,onClick:()=>o(e),children:e},e))})]}),r?(0,I.jsx)(`div`,{className:`products-grid`,children:[1,2,3,4].map(e=>(0,I.jsx)(`div`,{className:`skeleton`},e))}):s.length===0?(0,I.jsx)(`div`,{className:`products-grid`,children:(0,I.jsxs)(`div`,{className:`empty-state`,children:[(0,I.jsx)(`div`,{className:`empty-icon`,children:`🌸`}),(0,I.jsx)(`p`,{className:`empty-text`,children:`Aucun produit dans cette catégorie.`})]})}):(0,I.jsx)(`div`,{className:`products-grid`,children:s.map(t=>(0,I.jsx)(Ja,{product:t,addToCart:e},t.id))})]})}),(0,I.jsx)(`section`,{className:`process-section`,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{className:`process-header sr`,children:[(0,I.jsx)(`div`,{className:`eyebrow`,children:`Notre savoir-faire`}),(0,I.jsxs)(`h2`,{className:`process-header-title`,children:[`Du terroir `,(0,I.jsx)(`em`,{children:`au flacon`})]})]}),(0,I.jsx)(`div`,{className:`process-grid`,children:[{n:`01`,icon:`🌍`,name:`Sourcing`,desc:`Nous sélectionnons les matières premières chez les meilleurs producteurs à travers le monde.`},{n:`02`,icon:`🔬`,name:`Création`,desc:`Nos parfumeurs assemblent chaque accord avec précision et sensibilité uniques.`},{n:`03`,icon:`🧪`,name:`Tests`,desc:`Chaque fragrance est testée pendant des mois avant validation pour notre collection.`},{n:`04`,icon:`📦`,name:`Livraison`,desc:`Votre parfum est emballé avec soin et livré directement chez vous en 24–48h.`}].map(({n:e,icon:t,name:n,desc:r})=>(0,I.jsxs)(`div`,{className:`process-step`,children:[(0,I.jsx)(`div`,{className:`process-num`,children:e}),(0,I.jsx)(`div`,{className:`process-icon`,children:t}),(0,I.jsx)(`div`,{className:`process-name`,children:n}),(0,I.jsx)(`p`,{className:`process-desc`,children:r})]},e))})]})}),(0,I.jsx)(Lo,{}),(0,I.jsx)(Qa,{products:t,addToCart:e}),(0,I.jsx)(jo,{}),(0,I.jsx)(`section`,{className:`press-section`,children:(0,I.jsx)(`div`,{className:`container`,children:(0,I.jsxs)(`div`,{className:`press-inner`,children:[(0,I.jsx)(`span`,{className:`press-label`,children:`Ils parlent de nous`}),(0,I.jsx)(`div`,{className:`press-names`,children:[`Vogue`,`Elle Maroc`,`L'Obs`,`Marie Claire`,`Grazia`].map(e=>(0,I.jsx)(`a`,{href:`#`,className:`press-name`,children:e},e))})]})})}),(0,I.jsx)(`section`,{className:`promo-section`,children:(0,I.jsxs)(`div`,{className:`promo-inner`,children:[(0,I.jsxs)(`div`,{className:`promo-text`,children:[(0,I.jsx)(`div`,{className:`promo-eyebrow`,children:`✦ Offre exclusive membres`}),(0,I.jsxs)(`h2`,{className:`promo-title`,children:[`Rejoignez Nahid Club`,(0,I.jsx)(`br`,{}),`& profitez de 20% de remise`]})]}),(0,I.jsx)(An,{to:`/inscription`,className:`btn-white`,children:`Rejoindre gratuitement →`})]})}),(0,I.jsx)(`section`,{className:`footer-banner`,children:(0,I.jsx)(`div`,{className:`footer-banner-content`,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsx)(`span`,{className:`banner-eyebrow`,children:`✦ Livraison offerte dès 500 MAD`}),(0,I.jsxs)(`h2`,{className:`banner-title`,children:[`Prêt à trouver`,(0,I.jsx)(`br`,{}),`votre signature ?`]}),(0,I.jsxs)(`div`,{className:`banner-actions`,children:[(0,I.jsx)(`a`,{href:`#collection`,className:`btn-primary`,children:`Explorer la Collection`}),(0,I.jsx)(An,{to:`/notre-histoire`,className:`btn-ghost-dark`,children:`Notre Histoire →`})]})]})})}),(0,I.jsx)(`footer`,{className:`footer`,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{className:`footer-top`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`h3`,{className:`footer-logo`,children:[`Nahid`,(0,I.jsx)(`span`,{children:`·`}),`Perfume`]}),(0,I.jsxs)(`p`,{className:`footer-tagline`,children:[`L'art de la parfumerie marocaine,`,(0,I.jsx)(`br`,{}),`composé avec passion à Casablanca.`]}),(0,I.jsx)(`div`,{className:`footer-social`,children:[`In`,`Tk`,`Fb`,`Yt`].map(e=>(0,I.jsx)(`a`,{href:`#`,className:`social-btn`,children:e},e))})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h4`,{className:`footer-heading`,children:`Découvrir`}),[`Nos Parfums`,`Notre Histoire`,`Scent Finder`,`Blog Olfactif`,`Gift Sets`].map(e=>(0,I.jsx)(`a`,{href:`#`,className:`footer-link`,children:e},e))]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h4`,{className:`footer-heading`,children:`Aide`}),[`Contact`,`FAQ`,`Livraison & Retours`,`Suivi commande`,`Mentions légales`].map(e=>(0,I.jsx)(`a`,{href:`#`,className:`footer-link`,children:e},e))]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h4`,{className:`footer-heading`,children:`Newsletter`}),(0,I.jsx)(`p`,{style:{fontSize:`0.8rem`,lineHeight:`1.75`,color:`rgba(255,255,255,0.3)`,marginBottom:`20px`},children:`Nouvelles fragrances et offres exclusives réservées à nos abonnés.`}),(0,I.jsxs)(`div`,{className:`email-form`,children:[(0,I.jsx)(`input`,{className:`email-input`,type:`email`,placeholder:`votre@email.com`}),(0,I.jsx)(`button`,{className:`email-btn`,children:`S'inscrire`})]})]})]}),(0,I.jsxs)(`div`,{className:`footer-bottom`,children:[(0,I.jsx)(`span`,{className:`footer-copy`,children:`© 2026 Nahid Perfume · Casablanca, Maroc`}),(0,I.jsx)(`div`,{className:`footer-bottom-links`,children:[`Mentions légales`,`Politique de confidentialité`,`CGV`].map(e=>(0,I.jsx)(`a`,{href:`#`,className:`footer-bottom-link`,children:e},e))})]})]})})]})}var Ho=({cart:e,removeFromCart:t,updateQuantity:n})=>{let r=e.reduce((e,t)=>e+(typeof t.price==`string`?parseFloat(t.price):t.price)*t.quantity,0),i=r>=500?0:30,a=r+i,o=e=>Math.round(e).toLocaleString(`fr-MA`);return e.length===0?(0,I.jsx)(`div`,{style:R.emptyPage,children:(0,I.jsxs)(`div`,{style:R.emptyContent,children:[(0,I.jsx)(`div`,{style:R.emptyIcon,children:`🛒`}),(0,I.jsx)(`h2`,{style:R.emptyTitle,children:`Votre panier est vide`}),(0,I.jsx)(`p`,{style:R.emptyText,children:`Découvrez notre sélection de parfums d'exception et trouvez votre signature olfactive.`}),(0,I.jsx)(An,{to:`/`,style:R.shopLink,children:`Explorer nos parfums →`})]})}):(0,I.jsx)(`div`,{style:R.page,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`div`,{style:R.header,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h1`,{style:R.title,children:`Mon Panier`}),(0,I.jsxs)(`p`,{style:R.subtitle,children:[e.length,` article`,e.length>1?`s`:``]})]}),(0,I.jsx)(An,{to:`/`,style:R.continueLink,children:`← Continuer les achats`})]}),(0,I.jsxs)(`div`,{className:`cart-container`,style:R.cartContainer,children:[(0,I.jsxs)(`div`,{style:R.itemsCol,children:[(0,I.jsxs)(`div`,{style:R.colHeaders,children:[(0,I.jsx)(`span`,{children:`Produit`}),(0,I.jsx)(`span`,{style:{textAlign:`center`},children:`Quantité`}),(0,I.jsx)(`span`,{className:`cart-item-total`,style:{textAlign:`right`},children:`Total`})]}),e.map(e=>{let r=typeof e.price==`string`?parseFloat(e.price):e.price,i=r*e.quantity;return(0,I.jsxs)(`div`,{className:`cart-item`,style:R.cartItem,children:[(0,I.jsxs)(`div`,{style:R.productCol,children:[(0,I.jsx)(`div`,{style:R.imgWrapper,children:(0,I.jsx)(`img`,{src:e.image_url,alt:e.name,style:R.itemImg})}),(0,I.jsxs)(`div`,{style:R.itemInfo,children:[(0,I.jsx)(An,{to:`/product/${e.id}`,style:R.itemName,children:e.name}),e.category&&(0,I.jsx)(`span`,{style:R.itemCategory,children:e.category}),(0,I.jsxs)(`span`,{style:R.itemUnitPrice,children:[o(r),` MAD / pièce`]}),(0,I.jsx)(`button`,{onClick:()=>t(e.id),style:R.removeBtn,children:`Supprimer`})]})]}),(0,I.jsx)(`div`,{style:R.qtyCol,children:(0,I.jsxs)(`div`,{style:R.qtyControls,children:[(0,I.jsx)(`button`,{onClick:()=>n(e.id,e.quantity-1),style:R.qtyBtn,children:`−`}),(0,I.jsx)(`span`,{style:R.qtyValue,children:e.quantity}),(0,I.jsx)(`button`,{onClick:()=>n(e.id,e.quantity+1),style:R.qtyBtn,children:`+`})]})}),(0,I.jsxs)(`div`,{className:`cart-item-total`,style:R.totalCol,children:[o(i),` MAD`]}),(0,I.jsx)(`button`,{className:`cart-item-remove`,onClick:()=>t(e.id),style:R.deleteBtnDesktop,title:`Supprimer`,children:`✕`})]},e.id)})]}),(0,I.jsx)(`div`,{style:R.summaryCol,children:(0,I.jsxs)(`div`,{style:R.summaryCard,children:[(0,I.jsx)(`h3`,{style:R.summaryTitle,children:`Récapitulatif`}),(0,I.jsxs)(`div`,{style:R.summaryRow,children:[(0,I.jsx)(`span`,{style:R.summaryLabel,children:`Sous-total`}),(0,I.jsxs)(`span`,{style:R.summaryValue,children:[o(r),` MAD`]})]}),(0,I.jsxs)(`div`,{style:R.summaryRow,children:[(0,I.jsx)(`span`,{style:R.summaryLabel,children:`Livraison`}),(0,I.jsx)(`span`,{style:{...R.summaryValue,color:i===0?`#2E7D32`:`#2D2D2D`},children:i===0?`Gratuite 🎉`:`${o(i)} MAD`})]}),r>0&&r<500&&(0,I.jsxs)(`div`,{style:R.shippingProgress,children:[(0,I.jsx)(`div`,{style:R.progressTrack,children:(0,I.jsx)(`div`,{style:{...R.progressFill,width:`${Math.min(r/500*100,100)}%`}})}),(0,I.jsxs)(`p`,{style:R.shippingNote,children:[`Encore `,o(500-r),` MAD pour la livraison gratuite`]})]}),(0,I.jsx)(`div`,{style:R.divider}),(0,I.jsxs)(`div`,{style:R.totalRow,children:[(0,I.jsx)(`span`,{style:R.totalLabel,children:`Total`}),(0,I.jsxs)(`span`,{style:R.totalValue,children:[o(a),` MAD`]})]}),(0,I.jsx)(An,{to:`/checkout`,style:{display:`block`},children:(0,I.jsx)(`button`,{style:R.checkoutBtn,children:`Procéder au paiement →`})}),(0,I.jsx)(`div`,{style:R.securityNote,children:`🔒 Paiement 100% sécurisé · Livraison partout au Maroc`})]})})]})]})})},R={page:{backgroundColor:`#FAFAFA`,minHeight:`70vh`,padding:`48px 0 80px`},header:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-end`,marginBottom:`40px`,flexWrap:`wrap`,gap:`16px`},title:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`clamp(2rem, 4vw, 2.8rem)`,fontWeight:`400`,color:`#1A1A1A`,marginBottom:`4px`},subtitle:{fontSize:`0.85rem`,color:`#9B9B9B`},continueLink:{fontSize:`0.82rem`,color:`#6B6B6B`,textDecoration:`none`,transition:`color 0.2s`},emptyPage:{minHeight:`70vh`,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:`40px`},emptyContent:{textAlign:`center`,maxWidth:`400px`},emptyIcon:{fontSize:`4rem`,marginBottom:`20px`,opacity:.4},emptyTitle:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`1.8rem`,fontWeight:`400`,color:`#1A1A1A`,marginBottom:`12px`},emptyText:{fontSize:`0.9rem`,color:`#9B9B9B`,lineHeight:`1.6`,marginBottom:`28px`},shopLink:{display:`inline-block`,backgroundColor:`#EF776A`,color:`white`,padding:`13px 28px`,borderRadius:`999px`,fontSize:`0.9rem`,fontWeight:`500`,textDecoration:`none`,transition:`background 0.2s`},cartContainer:{display:`grid`,gridTemplateColumns:`1fr 360px`,gap:`32px`,alignItems:`start`},itemsCol:{backgroundColor:`white`,borderRadius:`18px`,overflow:`hidden`,border:`1px solid #F2F2F2`},colHeaders:{display:`grid`,gridTemplateColumns:`1fr auto auto auto`,gap:`16px`,padding:`14px 24px`,borderBottom:`1px solid #F2F2F2`,fontSize:`0.72rem`,fontWeight:`600`,letterSpacing:`0.08em`,textTransform:`uppercase`,color:`#9B9B9B`},cartItem:{display:`grid`,gridTemplateColumns:`1fr auto 120px 36px`,gap:`16px`,padding:`20px 24px`,borderBottom:`1px solid #F2F2F2`,alignItems:`center`},productCol:{display:`flex`,gap:`16px`,alignItems:`center`},imgWrapper:{width:`80px`,height:`80px`,borderRadius:`12px`,overflow:`hidden`,flexShrink:0,backgroundColor:`#F7F7F7`},itemImg:{width:`100%`,height:`100%`,objectFit:`cover`},itemInfo:{display:`flex`,flexDirection:`column`,gap:`4px`},itemName:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`1.05rem`,fontWeight:`500`,color:`#1A1A1A`,textDecoration:`none`,transition:`color 0.2s`},itemCategory:{fontSize:`0.72rem`,color:`#EF776A`,fontWeight:`600`,letterSpacing:`0.06em`,textTransform:`uppercase`},itemUnitPrice:{fontSize:`0.8rem`,color:`#9B9B9B`},removeBtn:{background:`none`,border:`none`,fontSize:`0.75rem`,color:`#C62828`,cursor:`pointer`,padding:`0`,textAlign:`left`,marginTop:`4px`,fontFamily:`inherit`},qtyCol:{display:`flex`,justifyContent:`center`},qtyControls:{display:`flex`,alignItems:`center`,border:`1.5px solid #E8E8E8`,borderRadius:`999px`,overflow:`hidden`},qtyBtn:{width:`34px`,height:`34px`,background:`none`,border:`none`,fontSize:`1rem`,cursor:`pointer`,color:`#1A1A1A`,display:`flex`,alignItems:`center`,justifyContent:`center`,transition:`background 0.15s`,fontFamily:`inherit`},qtyValue:{width:`32px`,textAlign:`center`,fontSize:`0.9rem`,fontWeight:`600`,borderLeft:`1px solid #F2F2F2`,borderRight:`1px solid #F2F2F2`,lineHeight:`34px`},totalCol:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`1rem`,fontWeight:`600`,color:`#1A1A1A`,textAlign:`right`},deleteBtnDesktop:{background:`none`,border:`none`,fontSize:`0.9rem`,color:`#DDDDDD`,cursor:`pointer`,transition:`color 0.2s`,width:`28px`,height:`28px`,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:`50%`,fontFamily:`inherit`},summaryCol:{},summaryCard:{backgroundColor:`white`,borderRadius:`18px`,padding:`28px`,border:`1px solid #F2F2F2`,position:`sticky`,top:`88px`},summaryTitle:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`1.3rem`,fontWeight:`500`,color:`#1A1A1A`,marginBottom:`24px`},summaryRow:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`14px`},summaryLabel:{fontSize:`0.85rem`,color:`#6B6B6B`},summaryValue:{fontSize:`0.9rem`,fontWeight:`500`,color:`#1A1A1A`},shippingProgress:{marginTop:`8px`,marginBottom:`8px`},progressTrack:{height:`4px`,backgroundColor:`#F2F2F2`,borderRadius:`2px`,overflow:`hidden`,marginBottom:`8px`},progressFill:{height:`100%`,backgroundColor:`#EF776A`,borderRadius:`2px`,transition:`width 0.4s ease`},shippingNote:{fontSize:`0.75rem`,color:`#EF776A`,textAlign:`center`},divider:{height:`1px`,backgroundColor:`#F2F2F2`,margin:`20px 0`},totalRow:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`24px`},totalLabel:{fontSize:`0.9rem`,fontWeight:`600`,color:`#1A1A1A`},totalValue:{fontFamily:`'Cormorant Garamond', serif`,fontSize:`1.6rem`,fontWeight:`600`,color:`#1A1A1A`},checkoutBtn:{width:`100%`,padding:`15px`,backgroundColor:`#EF776A`,color:`white`,border:`none`,borderRadius:`999px`,fontSize:`0.92rem`,fontWeight:`500`,cursor:`pointer`,transition:`background 0.2s`,letterSpacing:`0.01em`,fontFamily:`inherit`},securityNote:{textAlign:`center`,fontSize:`0.68rem`,color:`#9B9B9B`,marginTop:`14px`,lineHeight:`1.5`}},Uo=[{label:`30 ml`,price:590,tag:null},{label:`50 ml`,price:890,tag:`Populaire`},{label:`Coffret 3×30ml`,price:1470,tag:`−15%`}],Wo=[{key:`femme`,label:`Femme`,desc:`Floral et délicat, avec des notes de rose de Taif, jasmin de Grasse et musc blanc. Une fragrance aérienne et féminine.`,color:`#FADADD`,accent:`#C9748A`,emoji:`🌸`},{key:`homme`,label:`Homme`,desc:`Boisé et intense, avec des accords de cèdre du Liban, vétiver de Java et fève tonka. Une signature masculine affirmée.`,color:`#D4C9B0`,accent:`#7A6443`,emoji:`🪵`},{key:`unisex`,label:`Unisex`,desc:`Équilibré et envoûtant, avec de l'oud de Camboge, de l'ambre gris et une touche de bergamote. Pour tous les esprits libres.`,color:`#C8D5CC`,accent:`#4A7A62`,emoji:`✦`}],Go=[{icon:`🚚`,text:`Livraison offerte dès 500 MAD`},{icon:`🔒`,text:`Paiement 100% sécurisé`},{icon:`🔄`,text:`Retours sous 14 jours`},{icon:`🇲🇦`,text:`Livraison partout au Maroc`}],Ko=[{icon:`🌿`,type:`Tête`,value:`Bergamote · Citron · Cardamome`},{icon:`🌸`,type:`Cœur`,value:`Rose · Jasmin · Géranium`},{icon:`🪵`,type:`Fond`,value:`Oud · Musc · Ambre · Cèdre`}],qo=({addToCart:e,onCartOpen:t})=>{let{id:n}=pt(),r=dt(),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(!0),[c,l]=(0,v.useState)(1),[u,d]=(0,v.useState)(0),[f,p]=(0,v.useState)(1),[m,h]=(0,v.useState)(!1),[g,_]=(0,v.useState)(!1),[y,b]=(0,v.useState)(!1),[x,S]=(0,v.useState)(!1),C=(0,v.useRef)(null);(0,v.useEffect)(()=>{F.get(`/api/products/${n}`).then(e=>a(e.data)).catch(()=>r(`/`)).finally(()=>{s(!1),setTimeout(()=>b(!0),60)})},[n,r]),(0,v.useEffect)(()=>{let e=()=>{C.current&&_(window.scrollY>C.current.offsetHeight+60)};return window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]);let w=e=>Math.round(e).toLocaleString(`fr-MA`),T=Uo[c].price,E=typeof i?.price==`string`?parseFloat(i.price):i?.price||0,D=()=>{i&&(e({...i,price:T,size:Uo[c].label,scentType:Wo[u].key},f),h(!0),t?.(),setTimeout(()=>h(!1),2500))},O=Wo[u];return o?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`style`,{children:Jo}),(0,I.jsxs)(`div`,{className:`pd-loader`,children:[(0,I.jsx)(`div`,{className:`pd-loader__ring`}),(0,I.jsx)(`p`,{className:`pd-loader__text`,children:`Chargement…`})]})]}):i?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`style`,{children:Jo}),(0,I.jsxs)(`div`,{className:`pd-page ${y?`pd-page--revealed`:``}`,children:[(0,I.jsx)(`div`,{className:`pd-ambient`,style:{"--ambient-color":O.color}}),(0,I.jsxs)(`button`,{className:`pd-back`,onClick:()=>r(-1),children:[(0,I.jsx)(Do,{size:16}),(0,I.jsx)(`span`,{children:`Retour`})]}),(0,I.jsxs)(`div`,{className:`pd-grid container`,ref:C,children:[(0,I.jsxs)(`div`,{className:`pd-img-col`,children:[(0,I.jsxs)(`div`,{className:`pd-img-frame`,children:[(0,I.jsx)(`div`,{className:`pd-img-ring pd-img-ring--1`}),(0,I.jsx)(`div`,{className:`pd-img-ring pd-img-ring--2`}),i.stock<5&&i.stock>0&&(0,I.jsxs)(`div`,{className:`pd-stock-badge`,children:[`Dernières `,i.stock,` pièces`]}),(0,I.jsx)(`div`,{className:`pd-img-wrap ${x?`pd-img-wrap--loaded`:``}`,children:(0,I.jsx)(`img`,{src:i.image_url,alt:i.name,loading:`lazy`,onLoad:()=>S(!0),className:`pd-img`})}),(0,I.jsx)(`div`,{className:`pd-img-halo`,style:{background:`radial-gradient(ellipse at 50% 80%, ${O.color}cc 0%, transparent 70%)`}})]}),(0,I.jsxs)(`div`,{className:`pd-rating-strip`,children:[(0,I.jsx)(`div`,{className:`pd-stars`,children:[1,2,3,4,5].map(e=>(0,I.jsx)(go,{size:13,fill:`#EF776A`,color:`#EF776A`,strokeWidth:0},e))}),(0,I.jsx)(`span`,{className:`pd-rating-label`,children:`4.9 · 48 avis`}),(0,I.jsx)(`span`,{className:`pd-rating-sep`,children:`|`}),(0,I.jsx)(`span`,{className:`pd-rating-label`,children:`Certifié authentique`})]})]}),(0,I.jsxs)(`div`,{className:`pd-details-col`,children:[i.category&&(0,I.jsx)(`span`,{className:`pd-category`,children:i.category}),(0,I.jsx)(`h1`,{className:`pd-name`,children:i.name}),(0,I.jsx)(`p`,{className:`pd-tagline`,children:`Une essence rare, née au croisement de l'Orient et du raffinement.`}),(0,I.jsxs)(`div`,{className:`pd-section`,children:[(0,I.jsx)(`p`,{className:`pd-section__label`,children:`Type de fragrance`}),(0,I.jsx)(`div`,{className:`pd-scents`,children:Wo.map((e,t)=>(0,I.jsxs)(`button`,{className:`pd-scent-btn ${u===t?`pd-scent-btn--active`:``}`,style:{"--scent-color":e.color,"--scent-accent":e.accent},onClick:()=>d(t),children:[(0,I.jsx)(`span`,{className:`pd-scent-btn__emoji`,children:e.emoji}),(0,I.jsx)(`span`,{className:`pd-scent-btn__label`,children:e.label})]},e.key))}),(0,I.jsxs)(`div`,{className:`pd-scent-desc`,style:{"--scent-accent":O.accent},children:[(0,I.jsx)(`span`,{className:`pd-scent-desc__emoji`,children:O.emoji}),(0,I.jsx)(`p`,{children:O.desc})]})]}),(0,I.jsxs)(`div`,{className:`pd-section`,children:[(0,I.jsx)(`p`,{className:`pd-section__label`,children:`Contenance`}),(0,I.jsx)(`div`,{className:`pd-sizes`,children:Uo.map((e,t)=>(0,I.jsxs)(`button`,{className:`pd-size-card ${c===t?`pd-size-card--active`:``}`,onClick:()=>l(t),children:[e.tag&&(0,I.jsx)(`span`,{className:`pd-size-card__tag ${c===t?`pd-size-card__tag--active`:``}`,children:e.tag}),(0,I.jsx)(`span`,{className:`pd-size-card__vol`,children:e.label}),(0,I.jsxs)(`span`,{className:`pd-size-card__price`,children:[w(e.price),` MAD`]}),t===2&&(0,I.jsxs)(`span`,{className:`pd-size-card__save`,children:[`Économisez `,w(Math.round(E*3*.15)),` MAD`]})]},e.label))})]}),(0,I.jsxs)(`div`,{className:`pd-buy-row`,children:[(0,I.jsxs)(`div`,{className:`pd-qty`,children:[(0,I.jsx)(`button`,{className:`pd-qty__btn`,onClick:()=>p(e=>Math.max(1,e-1)),children:`−`}),(0,I.jsx)(`span`,{className:`pd-qty__num`,children:f}),(0,I.jsx)(`button`,{className:`pd-qty__btn`,onClick:()=>p(e=>e+1),children:`+`})]}),(0,I.jsxs)(`button`,{className:`pd-add-btn ${m?`pd-add-btn--added`:``} ${i.stock===0?`pd-add-btn--oos`:``}`,onClick:D,disabled:i.stock===0,children:[(0,I.jsx)(`span`,{className:`pd-add-btn__inner`,children:i.stock===0?`Épuisé`:m?(0,I.jsx)(I.Fragment,{children:`✓ Ajouté au panier !`}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(_o,{size:16}),`Ajouter — `,w(T*f),` MAD`]})}),(0,I.jsx)(`span`,{className:`pd-add-btn__shine`})]})]}),(0,I.jsx)(`div`,{className:`pd-perks`,children:Go.map(e=>(0,I.jsxs)(`div`,{className:`pd-perk`,children:[(0,I.jsx)(`span`,{className:`pd-perk__icon`,children:e.icon}),(0,I.jsx)(`span`,{className:`pd-perk__text`,children:e.text})]},e.text))}),i.description&&(0,I.jsxs)(`div`,{className:`pd-desc pd-bordered-section`,children:[(0,I.jsx)(`h3`,{className:`pd-section-title`,children:`Description`}),(0,I.jsx)(`p`,{className:`pd-desc__text`,children:i.description})]}),(0,I.jsxs)(`div`,{className:`pd-notes pd-bordered-section`,children:[(0,I.jsx)(`h3`,{className:`pd-section-title`,children:`Pyramide olfactive`}),(0,I.jsx)(`div`,{className:`pd-notes__grid`,children:Ko.map(e=>(0,I.jsxs)(`div`,{className:`pd-note-card`,children:[(0,I.jsx)(`span`,{className:`pd-note-card__icon`,children:e.icon}),(0,I.jsx)(`p`,{className:`pd-note-card__type`,children:e.type}),(0,I.jsx)(`p`,{className:`pd-note-card__value`,children:e.value})]},e.type))})]})]})]}),(0,I.jsx)(`div`,{className:`pd-sticky ${g?`pd-sticky--visible`:``}`,children:(0,I.jsxs)(`div`,{className:`pd-sticky__content`,children:[(0,I.jsxs)(`div`,{className:`pd-sticky__info`,children:[(0,I.jsx)(`p`,{className:`pd-sticky__name`,children:i.name}),(0,I.jsxs)(`p`,{className:`pd-sticky__price`,children:[w(T),` MAD`]})]}),(0,I.jsx)(`button`,{className:`pd-sticky__btn ${m?`pd-sticky__btn--added`:``}`,onClick:D,disabled:i.stock===0,children:m?`✓ Ajouté !`:`Ajouter au panier`})]})})]})]}):null},Jo=`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* ── Tokens ──────────────────────────────────────────── */
  :root {
    --coral:   #EF776A;
    --coral-d: #D4574A;
    --coral-l: #FFF0EE;
    --ink:     #141414;
    --ink-2:   #3A3A3A;
    --gray:    #6B6B6B;
    --line:    #EBEBEB;
    --bg:      #FAF8F5;
    --white:   #FFFFFF;
    --gold:    #C9A96E;
    --radius:  20px;
    --ff-serif: 'Cormorant Garamond', Georgia, serif;
    --ff-sans:  'Jost', sans-serif;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── Reset ───────────────────────────────────────────── */
  .pd-page *, .pd-page *::before, .pd-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .pd-page button { font-family: var(--ff-sans); cursor: pointer; }
  .pd-page p, .pd-page span { font-family: var(--ff-sans); }

  /* ── Page ────────────────────────────────────────────── */
  .pd-page {
    position: relative;
    background: var(--bg);
    min-height: 100vh;
    padding: 100px 0 120px;
    overflow-x: hidden;
    font-family: var(--ff-sans);
  }

  /* ── Ambient glow ────────────────────────────────────── */
  .pd-ambient {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(ellipse 60% 50% at 80% 20%, var(--ambient-color, #FADADD) 0%, transparent 70%);
    opacity: 0.45;
    transition: background 0.8s ease;
  }

  /* ── Container ───────────────────────────────────────── */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* ── Reveal animation ────────────────────────────────── */
  .pd-page .pd-img-col,
  .pd-page .pd-details-col {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.9s var(--ease-out-expo), transform 0.9s var(--ease-out-expo);
  }
  .pd-page.pd-page--revealed .pd-img-col {
    opacity: 1; transform: none; transition-delay: 0.05s;
  }
  .pd-page.pd-page--revealed .pd-details-col {
    opacity: 1; transform: none; transition-delay: 0.18s;
  }

  /* ── Back button ─────────────────────────────────────── */
  .pd-back {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: var(--gray);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 0 40px 28px;
    transition: color 0.2s;
  }
  .pd-back:hover { color: var(--ink); }

  /* ── Grid ────────────────────────────────────────────── */
  .pd-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  /* ════════════════════════════════════════════════════════
     IMAGE COLUMN
  ════════════════════════════════════════════════════════ */
  .pd-img-col { position: sticky; top: 100px; }

  .pd-img-frame {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    background: linear-gradient(145deg, #F4F0EA 0%, #EDE8E0 100%);
    aspect-ratio: 3 / 4;
    box-shadow:
      0 4px 12px rgba(0,0,0,0.04),
      0 24px 60px rgba(0,0,0,0.10),
      inset 0 1px 0 rgba(255,255,255,0.7);
  }

  /* Decorative rings */
  .pd-img-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(239,119,106,0.15);
    pointer-events: none;
    animation: pd-ring-pulse 5s ease-in-out infinite;
  }
  .pd-img-ring--1 { width: 70%; height: 70%; top: -10%; right: -15%; animation-delay: 0s; }
  .pd-img-ring--2 { width: 50%; height: 50%; bottom: -10%; left: -10%; animation-delay: 2s; }
  @keyframes pd-ring-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.8; transform: scale(1.04); }
  }

  .pd-img-wrap {
    width: 100%; height: 100%;
    opacity: 0;
    transition: opacity 0.8s ease;
  }
  .pd-img-wrap--loaded { opacity: 1; }

  .pd-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.7s var(--ease-out-expo);
  }
  .pd-img-frame:hover .pd-img { transform: scale(1.035); }

  .pd-img-halo {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background 0.8s ease;
    mix-blend-mode: multiply;
    opacity: 0.5;
  }

  .pd-stock-badge {
    position: absolute;
    top: 18px; left: 18px;
    z-index: 2;
    background: white;
    color: var(--coral);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    box-shadow: 0 2px 12px rgba(239,119,106,0.2);
    animation: pd-badge-pulse 2s ease-in-out infinite;
  }
  @keyframes pd-badge-pulse {
    0%, 100% { box-shadow: 0 2px 12px rgba(239,119,106,0.2); }
    50%       { box-shadow: 0 2px 20px rgba(239,119,106,0.45); }
  }

  /* Rating strip */
  .pd-rating-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    padding: 14px 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.05);
  }
  .pd-stars { display: flex; gap: 3px; }
  .pd-rating-label { font-size: 0.78rem; color: var(--gray); }
  .pd-rating-sep { color: var(--line); }

  /* ════════════════════════════════════════════════════════
     DETAILS COLUMN
  ════════════════════════════════════════════════════════ */
  .pd-details-col { position: sticky; top: 100px; }

  .pd-category {
    display: inline-block;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--coral);
    margin-bottom: 12px;
    position: relative;
  }
  .pd-category::before {
    content: '';
    display: inline-block;
    width: 20px; height: 1px;
    background: var(--coral);
    vertical-align: middle;
    margin-right: 8px;
  }

  .pd-name {
    font-family: var(--ff-serif);
    font-size: clamp(2.4rem, 4.5vw, 3.4rem);
    font-weight: 400;
    color: var(--ink);
    line-height: 1.08;
    letter-spacing: -0.01em;
    margin-bottom: 14px;
  }

  .pd-tagline {
    font-size: 0.88rem;
    color: var(--gray);
    line-height: 1.7;
    font-style: italic;
    font-family: var(--ff-serif);
    margin-bottom: 32px;
    padding-left: 16px;
    border-left: 2px solid var(--line);
  }

  /* ── Sections ────────────────────────────────────────── */
  .pd-section { margin-bottom: 30px; }
  .pd-section__label {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ADADAD;
    margin-bottom: 14px;
  }

  /* ── Scent buttons ───────────────────────────────────── */
  .pd-scents { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }

  .pd-scent-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 22px;
    border-radius: 16px;
    border: 1.5px solid var(--line);
    background: white;
    color: var(--ink-2);
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.25s var(--ease-out-expo);
    position: relative;
    overflow: hidden;
  }
  .pd-scent-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--scent-color, #FADADD);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .pd-scent-btn--active::before { opacity: 1; }
  .pd-scent-btn--active {
    border-color: var(--scent-accent, #C9748A);
    color: var(--scent-accent, #C9748A);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--scent-color, #FADADD) 60%, transparent);
  }
  .pd-scent-btn__emoji { font-size: 1.1rem; position: relative; }
  .pd-scent-btn__label { position: relative; letter-spacing: 0.03em; }

  .pd-scent-desc {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 18px;
    background: white;
    border-radius: 16px;
    border-left: 3px solid var(--scent-accent, #C9748A);
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: border-color 0.4s;
  }
  .pd-scent-desc__emoji { font-size: 1.2rem; flex-shrink: 0; margin-top: 1px; }
  .pd-scent-desc p { font-size: 0.84rem; color: #555; line-height: 1.7; }

  /* ── Size cards ──────────────────────────────────────── */
  .pd-sizes { display: flex; flex-direction: column; gap: 10px; }

  .pd-size-card {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 16px 20px;
    border-radius: 16px;
    border: 1.5px solid var(--line);
    background: white;
    text-align: left;
    position: relative;
    overflow: hidden;
    transition: all 0.25s var(--ease-out-expo);
  }
  .pd-size-card--active {
    border-color: var(--coral);
    background: var(--coral-l);
    box-shadow: 0 0 0 3px rgba(239,119,106,0.12), 0 4px 20px rgba(239,119,106,0.12);
  }
  .pd-size-card:hover:not(.pd-size-card--active) {
    border-color: #CCC;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }

  .pd-size-card__vol {
    font-weight: 600;
    font-size: 0.88rem;
    color: var(--ink);
    flex: 1;
  }
  .pd-size-card__price {
    font-family: var(--ff-serif);
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--ink);
    margin-right: 14px;
  }
  .pd-size-card--active .pd-size-card__price { color: var(--coral); }

  .pd-size-card__tag {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 999px;
    background: #EBEBEB;
    color: #666;
    margin-right: 10px;
    transition: all 0.25s;
  }
  .pd-size-card__tag--active {
    background: var(--coral);
    color: white;
  }

  .pd-size-card__save {
    font-size: 0.7rem;
    color: #2E7D32;
    font-weight: 600;
    margin-left: auto;
  }

  /* ── Buy row ─────────────────────────────────────────── */
  .pd-buy-row {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 24px;
  }

  .pd-qty {
    display: flex;
    align-items: center;
    border: 1.5px solid var(--line);
    border-radius: 999px;
    background: white;
    overflow: hidden;
  }
  .pd-qty__btn {
    width: 44px; height: 52px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--ink);
    transition: background 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .pd-qty__btn:hover { background: var(--coral-l); }
  .pd-qty__num {
    min-width: 44px;
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    line-height: 52px;
    border-left: 1px solid var(--line);
    border-right: 1px solid var(--line);
    color: var(--ink);
  }

  /* Add to cart button */
  .pd-add-btn {
    flex: 1;
    height: 52px;
    border: none;
    border-radius: 999px;
    background: var(--coral);
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
    transition: background 0.3s, transform 0.15s, box-shadow 0.3s;
    box-shadow: 0 6px 28px rgba(239,119,106,0.35);
  }
  .pd-add-btn__inner {
    position: relative;
    z-index: 1;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 100%;
  }
  .pd-add-btn__shine {
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transform: skewX(-20deg);
    transition: none;
  }
  .pd-add-btn:hover:not(:disabled) {
    background: var(--coral-d);
    transform: translateY(-1px);
    box-shadow: 0 10px 36px rgba(239,119,106,0.45);
  }
  .pd-add-btn:hover .pd-add-btn__shine {
    animation: pd-shine 0.6s ease forwards;
  }
  @keyframes pd-shine {
    to { left: 150%; }
  }
  .pd-add-btn:active:not(:disabled) { transform: translateY(0); }
  .pd-add-btn--added { background: #2E7D32 !important; box-shadow: 0 6px 28px rgba(46,125,50,0.35) !important; }
  .pd-add-btn--oos { background: #DDD !important; box-shadow: none !important; cursor: not-allowed !important; }

  /* ── Perks ───────────────────────────────────────────── */
  .pd-perks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 28px;
    padding: 20px;
    background: white;
    border-radius: 18px;
    border: 1px solid var(--line);
  }
  .pd-perk {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.76rem;
    color: var(--ink-2);
    line-height: 1.4;
  }
  .pd-perk__icon { font-size: 1rem; flex-shrink: 0; }
  .pd-perk__text {}

  /* ── Bordered section ────────────────────────────────── */
  .pd-bordered-section {
    padding-top: 24px;
    margin-top: 4px;
    border-top: 1px solid var(--line);
    margin-bottom: 24px;
  }

  .pd-section-title {
    font-family: var(--ff-serif);
    font-size: 1.15rem;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.01em;
    margin-bottom: 14px;
  }

  .pd-desc__text {
    font-size: 0.87rem;
    line-height: 1.78;
    color: #555;
  }

  /* ── Olfactive notes ─────────────────────────────────── */
  .pd-notes__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .pd-note-card {
    background: white;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 18px 12px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .pd-note-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.07);
  }
  .pd-note-card__icon { font-size: 1.6rem; display: block; margin-bottom: 8px; }
  .pd-note-card__type {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ADADAD;
    margin-bottom: 6px;
  }
  .pd-note-card__value {
    font-size: 0.76rem;
    color: #444;
    line-height: 1.55;
  }

  /* ════════════════════════════════════════════════════════
     STICKY BAR
  ════════════════════════════════════════════════════════ */
  .pd-sticky {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 900;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-top: 1px solid var(--line);
    box-shadow: 0 -8px 32px rgba(0,0,0,0.08);
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.4s var(--ease-out-expo), opacity 0.4s ease;
    display: none;
  }
  .pd-sticky--visible { transform: translateY(0); opacity: 1; }

  .pd-sticky__content {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 40px;
    gap: 16px;
  }
  .pd-sticky__name {
    font-family: var(--ff-serif);
    font-size: 1.05rem;
    color: var(--ink);
    font-weight: 400;
  }
  .pd-sticky__price {
    font-size: 0.82rem;
    color: var(--coral);
    font-weight: 700;
    margin-top: 2px;
  }
  .pd-sticky__btn {
    background: var(--coral);
    color: white;
    border: none;
    border-radius: 999px;
    padding: 13px 28px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
    box-shadow: 0 4px 18px rgba(239,119,106,0.35);
  }
  .pd-sticky__btn:hover { background: var(--coral-d); transform: translateY(-1px); }
  .pd-sticky__btn--added { background: #2E7D32 !important; }

  /* ── Loader ──────────────────────────────────────────── */
  .pd-loader {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--bg);
  }
  .pd-loader__ring {
    width: 44px; height: 44px;
    border: 3px solid #F0F0F0;
    border-top-color: var(--coral, #EF776A);
    border-radius: 50%;
    animation: pd-spin 0.75s linear infinite;
  }
  .pd-loader__text {
    font-family: var(--ff-sans);
    font-size: 0.8rem;
    color: #999;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  @keyframes pd-spin { to { transform: rotate(360deg); } }

  /* ════════════════════════════════════════════════════════
     RESPONSIVE
  ════════════════════════════════════════════════════════ */

  /* Tablet */
  @media (max-width: 1024px) {
    .pd-grid { gap: 48px; }
    .pd-name { font-size: clamp(2rem, 5vw, 2.8rem); }
    .pd-sticky { display: block; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .container { padding: 0 20px; }
    .pd-back { padding: 0 20px 20px; }
    .pd-page { padding-top: 80px; padding-bottom: 100px; }

    .pd-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    /* Image col is no longer sticky on mobile */
    .pd-img-col { position: static; }
    .pd-details-col { position: static; }

    .pd-img-frame { aspect-ratio: 4 / 3; border-radius: 20px; }

    .pd-name { font-size: clamp(2rem, 8vw, 2.6rem); }
    .pd-tagline { margin-bottom: 24px; }

    .pd-notes__grid { grid-template-columns: repeat(3,1fr); gap: 8px; }
    .pd-note-card { padding: 14px 8px; }
    .pd-note-card__value { font-size: 0.7rem; }

    .pd-perks { grid-template-columns: 1fr; }

    .pd-sticky { display: block; }
    .pd-sticky__content { padding: 12px 20px; }

    .pd-add-btn { font-size: 0.84rem; }

    .pd-sizes { flex-direction: column; }

    .pd-scents { flex-wrap: wrap; }
    .pd-scent-btn { padding: 10px 18px; }

    /* Ambient less intense on mobile */
    .pd-ambient { opacity: 0.3; }
  }

  @media (max-width: 400px) {
    .pd-notes__grid { grid-template-columns: 1fr; }
    .pd-buy-row { flex-direction: column; }
    .pd-qty { width: 100%; justify-content: center; }
    .pd-add-btn { width: 100%; }
  }
`,Yo={};Yo.version=`0.18.5`;var Xo=1200,Zo=1252,Qo=[874,932,936,949,950,1250,1251,1252,1253,1254,1255,1256,1257,1258,1e4],$o={0:1252,1:65001,2:65001,77:1e4,128:932,129:949,130:1361,134:936,136:950,161:1253,162:1254,163:1258,177:1255,178:1256,186:1257,204:1251,222:874,238:1250,255:1252,69:6969},es=function(e){Qo.indexOf(e)!=-1&&(Zo=$o[0]=e)};function ts(){es(1252)}var ns=function(e){Xo=e,es(e)};function rs(){ns(1200),ts()}function is(e){for(var t=[],n=0;n<e.length>>1;++n)t[n]=String.fromCharCode(e.charCodeAt(2*n+1)+(e.charCodeAt(2*n)<<8));return t.join(``)}var as=function(e){return String.fromCharCode(e)},os=function(e){return String.fromCharCode(e)},ss,cs=null,ls=!0,us=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;function ds(e){for(var t=``,n=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0;l<e.length;)n=e.charCodeAt(l++),a=n>>2,r=e.charCodeAt(l++),o=(n&3)<<4|r>>4,i=e.charCodeAt(l++),s=(r&15)<<2|i>>6,c=i&63,isNaN(r)?s=c=64:isNaN(i)&&(c=64),t+=us.charAt(a)+us.charAt(o)+us.charAt(s)+us.charAt(c);return t}function fs(e){var t=``,n=0,r=0,i=0,a=0,o=0,s=0,c=0;e=e.replace(/[^\w\+\/\=]/g,``);for(var l=0;l<e.length;)a=us.indexOf(e.charAt(l++)),o=us.indexOf(e.charAt(l++)),n=a<<2|o>>4,t+=String.fromCharCode(n),s=us.indexOf(e.charAt(l++)),r=(o&15)<<4|s>>2,s!==64&&(t+=String.fromCharCode(r)),c=us.indexOf(e.charAt(l++)),i=(s&3)<<6|c,c!==64&&(t+=String.fromCharCode(i));return t}var z=(function(){return typeof Buffer<`u`&&typeof process<`u`&&process.versions!==void 0&&!!process.versions.node})(),ps=(function(){if(typeof Buffer<`u`){var e=!Buffer.from;if(!e)try{Buffer.from(`foo`,`utf8`)}catch{e=!0}return e?function(e,t){return t?new Buffer(e,t):new Buffer(e)}:Buffer.from.bind(Buffer)}return function(){}})();function ms(e){return z?Buffer.alloc?Buffer.alloc(e):new Buffer(e):typeof Uint8Array<`u`?new Uint8Array(e):Array(e)}function hs(e){return z?Buffer.allocUnsafe?Buffer.allocUnsafe(e):new Buffer(e):typeof Uint8Array<`u`?new Uint8Array(e):Array(e)}var gs=function(e){return z?ps(e,`binary`):e.split(``).map(function(e){return e.charCodeAt(0)&255})};function _s(e){if(typeof ArrayBuffer>`u`)return gs(e);for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0;r!=e.length;++r)n[r]=e.charCodeAt(r)&255;return t}function vs(e){if(Array.isArray(e))return e.map(function(e){return String.fromCharCode(e)}).join(``);for(var t=[],n=0;n<e.length;++n)t[n]=String.fromCharCode(e[n]);return t.join(``)}function ys(e){if(typeof Uint8Array>`u`)throw Error(`Unsupported`);return new Uint8Array(e)}var bs=z?function(e){return Buffer.concat(e.map(function(e){return Buffer.isBuffer(e)?e:ps(e)}))}:function(e){if(typeof Uint8Array<`u`){var t=0,n=0;for(t=0;t<e.length;++t)n+=e[t].length;var r=new Uint8Array(n),i=0;for(t=0,n=0;t<e.length;n+=i,++t)if(i=e[t].length,e[t]instanceof Uint8Array)r.set(e[t],n);else if(typeof e[t]==`string`)throw`wtf`;else r.set(new Uint8Array(e[t]),n);return r}return[].concat.apply([],e.map(function(e){return Array.isArray(e)?e:[].slice.call(e)}))};function xs(e){for(var t=[],n=0,r=e.length+250,i=ms(e.length+255),a=0;a<e.length;++a){var o=e.charCodeAt(a);if(o<128)i[n++]=o;else if(o<2048)i[n++]=192|o>>6&31,i[n++]=128|o&63;else if(o>=55296&&o<57344){o=(o&1023)+64;var s=e.charCodeAt(++a)&1023;i[n++]=240|o>>8&7,i[n++]=128|o>>2&63,i[n++]=128|s>>6&15|(o&3)<<4,i[n++]=128|s&63}else i[n++]=224|o>>12&15,i[n++]=128|o>>6&63,i[n++]=128|o&63;n>r&&(t.push(i.slice(0,n)),n=0,i=ms(65535),r=65530)}return t.push(i.slice(0,n)),bs(t)}var Ss=/\u0000/g,Cs=/[\u0001-\u0006]/g;function ws(e){for(var t=``,n=e.length-1;n>=0;)t+=e.charAt(n--);return t}function Ts(e,t){var n=``+e;return n.length>=t?n:rl(`0`,t-n.length)+n}function Es(e,t){var n=``+e;return n.length>=t?n:rl(` `,t-n.length)+n}function Ds(e,t){var n=``+e;return n.length>=t?n:n+rl(` `,t-n.length)}function Os(e,t){var n=``+Math.round(e);return n.length>=t?n:rl(`0`,t-n.length)+n}function ks(e,t){var n=``+e;return n.length>=t?n:rl(`0`,t-n.length)+n}var As=2**32;function js(e,t){return e>As||e<-As?Os(e,t):ks(Math.round(e),t)}function Ms(e,t){return t||=0,e.length>=7+t&&(e.charCodeAt(t)|32)==103&&(e.charCodeAt(t+1)|32)==101&&(e.charCodeAt(t+2)|32)==110&&(e.charCodeAt(t+3)|32)==101&&(e.charCodeAt(t+4)|32)==114&&(e.charCodeAt(t+5)|32)==97&&(e.charCodeAt(t+6)|32)==108}var Ns=[[`Sun`,`Sunday`],[`Mon`,`Monday`],[`Tue`,`Tuesday`],[`Wed`,`Wednesday`],[`Thu`,`Thursday`],[`Fri`,`Friday`],[`Sat`,`Saturday`]],Ps=[[`J`,`Jan`,`January`],[`F`,`Feb`,`February`],[`M`,`Mar`,`March`],[`A`,`Apr`,`April`],[`M`,`May`,`May`],[`J`,`Jun`,`June`],[`J`,`Jul`,`July`],[`A`,`Aug`,`August`],[`S`,`Sep`,`September`],[`O`,`Oct`,`October`],[`N`,`Nov`,`November`],[`D`,`Dec`,`December`]];function Fs(e){return e||={},e[0]=`General`,e[1]=`0`,e[2]=`0.00`,e[3]=`#,##0`,e[4]=`#,##0.00`,e[9]=`0%`,e[10]=`0.00%`,e[11]=`0.00E+00`,e[12]=`# ?/?`,e[13]=`# ??/??`,e[14]=`m/d/yy`,e[15]=`d-mmm-yy`,e[16]=`d-mmm`,e[17]=`mmm-yy`,e[18]=`h:mm AM/PM`,e[19]=`h:mm:ss AM/PM`,e[20]=`h:mm`,e[21]=`h:mm:ss`,e[22]=`m/d/yy h:mm`,e[37]=`#,##0 ;(#,##0)`,e[38]=`#,##0 ;[Red](#,##0)`,e[39]=`#,##0.00;(#,##0.00)`,e[40]=`#,##0.00;[Red](#,##0.00)`,e[45]=`mm:ss`,e[46]=`[h]:mm:ss`,e[47]=`mmss.0`,e[48]=`##0.0E+0`,e[49]=`@`,e[56]=`"上午/下午 "hh"時"mm"分"ss"秒 "`,e}var Is={0:`General`,1:`0`,2:`0.00`,3:`#,##0`,4:`#,##0.00`,9:`0%`,10:`0.00%`,11:`0.00E+00`,12:`# ?/?`,13:`# ??/??`,14:`m/d/yy`,15:`d-mmm-yy`,16:`d-mmm`,17:`mmm-yy`,18:`h:mm AM/PM`,19:`h:mm:ss AM/PM`,20:`h:mm`,21:`h:mm:ss`,22:`m/d/yy h:mm`,37:`#,##0 ;(#,##0)`,38:`#,##0 ;[Red](#,##0)`,39:`#,##0.00;(#,##0.00)`,40:`#,##0.00;[Red](#,##0.00)`,45:`mm:ss`,46:`[h]:mm:ss`,47:`mmss.0`,48:`##0.0E+0`,49:`@`,56:`"上午/下午 "hh"時"mm"分"ss"秒 "`},Ls={5:37,6:38,7:39,8:40,23:0,24:0,25:0,26:0,27:14,28:14,29:14,30:14,31:14,50:14,51:14,52:14,53:14,54:14,55:14,56:14,57:14,58:14,59:1,60:2,61:3,62:4,67:9,68:10,69:12,70:13,71:14,72:14,73:15,74:16,75:17,76:20,77:21,78:22,79:45,80:46,81:47,82:0},Rs={5:`"$"#,##0_);\\("$"#,##0\\)`,63:`"$"#,##0_);\\("$"#,##0\\)`,6:`"$"#,##0_);[Red]\\("$"#,##0\\)`,64:`"$"#,##0_);[Red]\\("$"#,##0\\)`,7:`"$"#,##0.00_);\\("$"#,##0.00\\)`,65:`"$"#,##0.00_);\\("$"#,##0.00\\)`,8:`"$"#,##0.00_);[Red]\\("$"#,##0.00\\)`,66:`"$"#,##0.00_);[Red]\\("$"#,##0.00\\)`,41:`_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)`,42:`_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)`,43:`_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)`,44:`_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)`};function zs(e,t,n){for(var r=e<0?-1:1,i=e*r,a=0,o=1,s=0,c=1,l=0,u=0,d=Math.floor(i);l<t&&(d=Math.floor(i),s=d*o+a,u=d*l+c,!(i-d<5e-8));)i=1/(i-d),a=o,o=s,c=l,l=u;if(u>t&&(l>t?(u=c,s=a):(u=l,s=o)),!n)return[0,r*s,u];var f=Math.floor(r*s/u);return[f,r*s-f*u,u]}function Bs(e,t,n){if(e>2958465||e<0)return null;var r=e|0,i=Math.floor(86400*(e-r)),a=0,o=[],s={D:r,T:i,u:86400*(e-r)-i,y:0,m:0,d:0,H:0,M:0,S:0,q:0};if(Math.abs(s.u)<1e-6&&(s.u=0),t&&t.date1904&&(r+=1462),s.u>.9999&&(s.u=0,++i==86400&&(s.T=i=0,++r,++s.D)),r===60)o=n?[1317,10,29]:[1900,2,29],a=3;else if(r===0)o=n?[1317,8,29]:[1900,1,0],a=6;else{r>60&&--r;var c=new Date(1900,0,1);c.setDate(c.getDate()+r-1),o=[c.getFullYear(),c.getMonth()+1,c.getDate()],a=c.getDay(),r<60&&(a=(a+6)%7),n&&(a=Zs(c,o))}return s.y=o[0],s.m=o[1],s.d=o[2],s.S=i%60,i=Math.floor(i/60),s.M=i%60,i=Math.floor(i/60),s.H=i,s.q=a,s}var Vs=new Date(1899,11,31,0,0,0),Hs=Vs.getTime(),Us=new Date(1900,2,1,0,0,0);function Ws(e,t){var n=e.getTime();return t?n-=1461*24*60*60*1e3:e>=Us&&(n+=1440*60*1e3),(n-(Hs+(e.getTimezoneOffset()-Vs.getTimezoneOffset())*6e4))/(1440*60*1e3)}function Gs(e){return e.indexOf(`.`)==-1?e:e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/,`$1`)}function Ks(e){return e.indexOf(`E`)==-1?e:e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/,`$1E`).replace(/(E[+-])(\d)$/,`$10$2`)}function qs(e){var t=e<0?12:11,n=Gs(e.toFixed(12));return n.length<=t||(n=e.toPrecision(10),n.length<=t)?n:e.toExponential(5)}function Js(e){var t=Gs(e.toFixed(11));return t.length>(e<0?12:11)||t===`0`||t===`-0`?e.toPrecision(6):t}function Ys(e){var t=Math.floor(Math.log(Math.abs(e))*Math.LOG10E);return Gs(Ks((t>=-4&&t<=-1?e.toPrecision(10+t):Math.abs(t)<=9?qs(e):t===10?e.toFixed(10).substr(0,12):Js(e)).toUpperCase()))}function Xs(e,t){switch(typeof e){case`string`:return e;case`boolean`:return e?`TRUE`:`FALSE`;case`number`:return(e|0)===e?e.toString(10):Ys(e);case`undefined`:return``;case`object`:if(e==null)return``;if(e instanceof Date)return Oc(14,Ws(e,t&&t.date1904),t)}throw Error(`unsupported value in General format: `+e)}function Zs(e,t){t[0]-=581;var n=e.getDay();return e<60&&(n=(n+6)%7),n}function Qs(e,t,n,r){var i=``,a=0,o=0,s=n.y,c,l=0;switch(e){case 98:s=n.y+543;case 121:switch(t.length){case 1:case 2:c=s%100,l=2;break;default:c=s%1e4,l=4;break}break;case 109:switch(t.length){case 1:case 2:c=n.m,l=t.length;break;case 3:return Ps[n.m-1][1];case 5:return Ps[n.m-1][0];default:return Ps[n.m-1][2]}break;case 100:switch(t.length){case 1:case 2:c=n.d,l=t.length;break;case 3:return Ns[n.q][0];default:return Ns[n.q][1]}break;case 104:switch(t.length){case 1:case 2:c=1+(n.H+11)%12,l=t.length;break;default:throw`bad hour format: `+t}break;case 72:switch(t.length){case 1:case 2:c=n.H,l=t.length;break;default:throw`bad hour format: `+t}break;case 77:switch(t.length){case 1:case 2:c=n.M,l=t.length;break;default:throw`bad minute format: `+t}break;case 115:if(t!=`s`&&t!=`ss`&&t!=`.0`&&t!=`.00`&&t!=`.000`)throw`bad second format: `+t;return n.u===0&&(t==`s`||t==`ss`)?Ts(n.S,t.length):(o=r>=2?r===3?1e3:100:r===1?10:1,a=Math.round(o*(n.S+n.u)),a>=60*o&&(a=0),t===`s`?a===0?`0`:``+a/o:(i=Ts(a,2+r),t===`ss`?i.substr(0,2):`.`+i.substr(2,t.length-1)));case 90:switch(t){case`[h]`:case`[hh]`:c=n.D*24+n.H;break;case`[m]`:case`[mm]`:c=(n.D*24+n.H)*60+n.M;break;case`[s]`:case`[ss]`:c=((n.D*24+n.H)*60+n.M)*60+Math.round(n.S+n.u);break;default:throw`bad abstime format: `+t}l=t.length===3?1:2;break;case 101:c=s,l=1;break}return l>0?Ts(c,l):``}function $s(e){var t=3;if(e.length<=t)return e;for(var n=e.length%t,r=e.substr(0,n);n!=e.length;n+=t)r+=(r.length>0?`,`:``)+e.substr(n,t);return r}var ec=/%/g;function tc(e,t,n){var r=t.replace(ec,``),i=t.length-r.length;return bc(e,r,n*10**(2*i))+rl(`%`,i)}function nc(e,t,n){for(var r=t.length-1;t.charCodeAt(r-1)===44;)--r;return bc(e,t.substr(0,r),n/10**(3*(t.length-r)))}function rc(e,t){var n,r=e.indexOf(`E`)-e.indexOf(`.`)-1;if(e.match(/^#+0.0E\+0$/)){if(t==0)return`0.0E+0`;if(t<0)return`-`+rc(e,-t);var i=e.indexOf(`.`);i===-1&&(i=e.indexOf(`E`));var a=Math.floor(Math.log(t)*Math.LOG10E)%i;if(a<0&&(a+=i),n=(t/10**a).toPrecision(r+1+(i+a)%i),n.indexOf(`e`)===-1){var o=Math.floor(Math.log(t)*Math.LOG10E);for(n.indexOf(`.`)===-1?n=n.charAt(0)+`.`+n.substr(1)+`E+`+(o-n.length+a):n+=`E+`+(o-a);n.substr(0,2)===`0.`;)n=n.charAt(0)+n.substr(2,i)+`.`+n.substr(2+i),n=n.replace(/^0+([1-9])/,`$1`).replace(/^0+\./,`0.`);n=n.replace(/\+-/,`-`)}n=n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,t,n,r){return t+n+r.substr(0,(i+a)%i)+`.`+r.substr(a)+`E`})}else n=t.toExponential(r);return e.match(/E\+00$/)&&n.match(/e[+-]\d$/)&&(n=n.substr(0,n.length-1)+`0`+n.charAt(n.length-1)),e.match(/E\-/)&&n.match(/e\+/)&&(n=n.replace(/e\+/,`e`)),n.replace(`e`,`E`)}var ic=/# (\?+)( ?)\/( ?)(\d+)/;function ac(e,t,n){var r=parseInt(e[4],10),i=Math.round(t*r),a=Math.floor(i/r),o=i-a*r,s=r;return n+(a===0?``:``+a)+` `+(o===0?rl(` `,e[1].length+1+e[4].length):Es(o,e[1].length)+e[2]+`/`+e[3]+Ts(s,e[4].length))}function oc(e,t,n){return n+(t===0?``:``+t)+rl(` `,e[1].length+2+e[4].length)}var sc=/^#*0*\.([0#]+)/,cc=/\).*[0#]/,lc=/\(###\) ###\\?-####/;function uc(e){for(var t=``,n,r=0;r!=e.length;++r)switch(n=e.charCodeAt(r)){case 35:break;case 63:t+=` `;break;case 48:t+=`0`;break;default:t+=String.fromCharCode(n)}return t}function dc(e,t){var n=10**t;return``+Math.round(e*n)/n}function fc(e,t){var n=e-Math.floor(e),r=10**t;return t<(``+Math.round(n*r)).length?0:Math.round(n*r)}function pc(e,t){return+(t<(``+Math.round((e-Math.floor(e))*10**t)).length)}function mc(e){return e<2147483647&&e>-2147483648?``+(e>=0?e|0:e-1|0):``+Math.floor(e)}function hc(e,t,n){if(e.charCodeAt(0)===40&&!t.match(cc)){var r=t.replace(/\( */,``).replace(/ \)/,``).replace(/\)/,``);return n>=0?hc(`n`,r,n):`(`+hc(`n`,r,-n)+`)`}if(t.charCodeAt(t.length-1)===44)return nc(e,t,n);if(t.indexOf(`%`)!==-1)return tc(e,t,n);if(t.indexOf(`E`)!==-1)return rc(t,n);if(t.charCodeAt(0)===36)return`$`+hc(e,t.substr(t.charAt(1)==` `?2:1),n);var i,a,o,s,c=Math.abs(n),l=n<0?`-`:``;if(t.match(/^00+$/))return l+js(c,t.length);if(t.match(/^[#?]+$/))return i=js(n,0),i===`0`&&(i=``),i.length>t.length?i:uc(t.substr(0,t.length-i.length))+i;if(a=t.match(ic))return ac(a,c,l);if(t.match(/^#+0+$/))return l+js(c,t.length-t.indexOf(`0`));if(a=t.match(sc))return i=dc(n,a[1].length).replace(/^([^\.]+)$/,`$1.`+uc(a[1])).replace(/\.$/,`.`+uc(a[1])).replace(/\.(\d*)$/,function(e,t){return`.`+t+rl(`0`,uc(a[1]).length-t.length)}),t.indexOf(`0.`)===-1?i.replace(/^0\./,`.`):i;if(t=t.replace(/^#+([0.])/,`$1`),a=t.match(/^(0*)\.(#*)$/))return l+dc(c,a[2].length).replace(/\.(\d*[1-9])0*$/,`.$1`).replace(/^(-?\d*)$/,`$1.`).replace(/^0\./,a[1].length?`0.`:`.`);if(a=t.match(/^#{1,3},##0(\.?)$/))return l+$s(js(c,0));if(a=t.match(/^#,##0\.([#0]*0)$/))return n<0?`-`+hc(e,t,-n):$s(``+(Math.floor(n)+pc(n,a[1].length)))+`.`+Ts(fc(n,a[1].length),a[1].length);if(a=t.match(/^#,#*,#0/))return hc(e,t.replace(/^#,#*,/,``),n);if(a=t.match(/^([0#]+)(\\?-([0#]+))+$/))return i=ws(hc(e,t.replace(/[\\-]/g,``),n)),o=0,ws(ws(t.replace(/\\/g,``)).replace(/[0#]/g,function(e){return o<i.length?i.charAt(o++):e===`0`?`0`:``}));if(t.match(lc))return i=hc(e,`##########`,n),`(`+i.substr(0,3)+`) `+i.substr(3,3)+`-`+i.substr(6);var u=``;if(a=t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(a[4].length,7),s=zs(c,10**o-1,!1),i=``+l,u=bc(`n`,a[1],s[1]),u.charAt(u.length-1)==` `&&(u=u.substr(0,u.length-1)+`0`),i+=u+a[2]+`/`+a[3],u=Ds(s[2],o),u.length<a[4].length&&(u=uc(a[4].substr(a[4].length-u.length))+u),i+=u,i;if(a=t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(Math.max(a[1].length,a[4].length),7),s=zs(c,10**o-1,!0),l+(s[0]||(s[1]?``:`0`))+` `+(s[1]?Es(s[1],o)+a[2]+`/`+a[3]+Ds(s[2],o):rl(` `,2*o+1+a[2].length+a[3].length));if(a=t.match(/^[#0?]+$/))return i=js(n,0),t.length<=i.length?i:uc(t.substr(0,t.length-i.length))+i;if(a=t.match(/^([#0?]+)\.([#0]+)$/)){i=``+n.toFixed(Math.min(a[2].length,10)).replace(/([^0])0+$/,`$1`),o=i.indexOf(`.`);var d=t.indexOf(`.`)-o,f=t.length-i.length-d;return uc(t.substr(0,d)+i+t.substr(t.length-f))}if(a=t.match(/^00,000\.([#0]*0)$/))return o=fc(n,a[1].length),n<0?`-`+hc(e,t,-n):$s(mc(n)).replace(/^\d,\d{3}$/,`0$&`).replace(/^\d*$/,function(e){return`00,`+(e.length<3?Ts(0,3-e.length):``)+e})+`.`+Ts(o,a[1].length);switch(t){case`###,##0.00`:return hc(e,`#,##0.00`,n);case`###,###`:case`##,###`:case`#,###`:var p=$s(js(c,0));return p===`0`?``:l+p;case`###,###.00`:return hc(e,`###,##0.00`,n).replace(/^0\./,`.`);case`#,###.00`:return hc(e,`#,##0.00`,n).replace(/^0\./,`.`);default:}throw Error(`unsupported format |`+t+`|`)}function gc(e,t,n){for(var r=t.length-1;t.charCodeAt(r-1)===44;)--r;return bc(e,t.substr(0,r),n/10**(3*(t.length-r)))}function _c(e,t,n){var r=t.replace(ec,``),i=t.length-r.length;return bc(e,r,n*10**(2*i))+rl(`%`,i)}function vc(e,t){var n,r=e.indexOf(`E`)-e.indexOf(`.`)-1;if(e.match(/^#+0.0E\+0$/)){if(t==0)return`0.0E+0`;if(t<0)return`-`+vc(e,-t);var i=e.indexOf(`.`);i===-1&&(i=e.indexOf(`E`));var a=Math.floor(Math.log(t)*Math.LOG10E)%i;if(a<0&&(a+=i),n=(t/10**a).toPrecision(r+1+(i+a)%i),!n.match(/[Ee]/)){var o=Math.floor(Math.log(t)*Math.LOG10E);n.indexOf(`.`)===-1?n=n.charAt(0)+`.`+n.substr(1)+`E+`+(o-n.length+a):n+=`E+`+(o-a),n=n.replace(/\+-/,`-`)}n=n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,t,n,r){return t+n+r.substr(0,(i+a)%i)+`.`+r.substr(a)+`E`})}else n=t.toExponential(r);return e.match(/E\+00$/)&&n.match(/e[+-]\d$/)&&(n=n.substr(0,n.length-1)+`0`+n.charAt(n.length-1)),e.match(/E\-/)&&n.match(/e\+/)&&(n=n.replace(/e\+/,`e`)),n.replace(`e`,`E`)}function yc(e,t,n){if(e.charCodeAt(0)===40&&!t.match(cc)){var r=t.replace(/\( */,``).replace(/ \)/,``).replace(/\)/,``);return n>=0?yc(`n`,r,n):`(`+yc(`n`,r,-n)+`)`}if(t.charCodeAt(t.length-1)===44)return gc(e,t,n);if(t.indexOf(`%`)!==-1)return _c(e,t,n);if(t.indexOf(`E`)!==-1)return vc(t,n);if(t.charCodeAt(0)===36)return`$`+yc(e,t.substr(t.charAt(1)==` `?2:1),n);var i,a,o,s,c=Math.abs(n),l=n<0?`-`:``;if(t.match(/^00+$/))return l+Ts(c,t.length);if(t.match(/^[#?]+$/))return i=``+n,n===0&&(i=``),i.length>t.length?i:uc(t.substr(0,t.length-i.length))+i;if(a=t.match(ic))return oc(a,c,l);if(t.match(/^#+0+$/))return l+Ts(c,t.length-t.indexOf(`0`));if(a=t.match(sc))return i=(``+n).replace(/^([^\.]+)$/,`$1.`+uc(a[1])).replace(/\.$/,`.`+uc(a[1])),i=i.replace(/\.(\d*)$/,function(e,t){return`.`+t+rl(`0`,uc(a[1]).length-t.length)}),t.indexOf(`0.`)===-1?i.replace(/^0\./,`.`):i;if(t=t.replace(/^#+([0.])/,`$1`),a=t.match(/^(0*)\.(#*)$/))return l+(``+c).replace(/\.(\d*[1-9])0*$/,`.$1`).replace(/^(-?\d*)$/,`$1.`).replace(/^0\./,a[1].length?`0.`:`.`);if(a=t.match(/^#{1,3},##0(\.?)$/))return l+$s(``+c);if(a=t.match(/^#,##0\.([#0]*0)$/))return n<0?`-`+yc(e,t,-n):$s(``+n)+`.`+rl(`0`,a[1].length);if(a=t.match(/^#,#*,#0/))return yc(e,t.replace(/^#,#*,/,``),n);if(a=t.match(/^([0#]+)(\\?-([0#]+))+$/))return i=ws(yc(e,t.replace(/[\\-]/g,``),n)),o=0,ws(ws(t.replace(/\\/g,``)).replace(/[0#]/g,function(e){return o<i.length?i.charAt(o++):e===`0`?`0`:``}));if(t.match(lc))return i=yc(e,`##########`,n),`(`+i.substr(0,3)+`) `+i.substr(3,3)+`-`+i.substr(6);var u=``;if(a=t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(a[4].length,7),s=zs(c,10**o-1,!1),i=``+l,u=bc(`n`,a[1],s[1]),u.charAt(u.length-1)==` `&&(u=u.substr(0,u.length-1)+`0`),i+=u+a[2]+`/`+a[3],u=Ds(s[2],o),u.length<a[4].length&&(u=uc(a[4].substr(a[4].length-u.length))+u),i+=u,i;if(a=t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(Math.max(a[1].length,a[4].length),7),s=zs(c,10**o-1,!0),l+(s[0]||(s[1]?``:`0`))+` `+(s[1]?Es(s[1],o)+a[2]+`/`+a[3]+Ds(s[2],o):rl(` `,2*o+1+a[2].length+a[3].length));if(a=t.match(/^[#0?]+$/))return i=``+n,t.length<=i.length?i:uc(t.substr(0,t.length-i.length))+i;if(a=t.match(/^([#0]+)\.([#0]+)$/)){i=``+n.toFixed(Math.min(a[2].length,10)).replace(/([^0])0+$/,`$1`),o=i.indexOf(`.`);var d=t.indexOf(`.`)-o,f=t.length-i.length-d;return uc(t.substr(0,d)+i+t.substr(t.length-f))}if(a=t.match(/^00,000\.([#0]*0)$/))return n<0?`-`+yc(e,t,-n):$s(``+n).replace(/^\d,\d{3}$/,`0$&`).replace(/^\d*$/,function(e){return`00,`+(e.length<3?Ts(0,3-e.length):``)+e})+`.`+Ts(0,a[1].length);switch(t){case`###,###`:case`##,###`:case`#,###`:var p=$s(``+c);return p===`0`?``:l+p;default:if(t.match(/\.[0#?]*$/))return yc(e,t.slice(0,t.lastIndexOf(`.`)),n)+uc(t.slice(t.lastIndexOf(`.`)))}throw Error(`unsupported format |`+t+`|`)}function bc(e,t,n){return(n|0)===n?yc(e,t,n):hc(e,t,n)}function xc(e){for(var t=[],n=!1,r=0,i=0;r<e.length;++r)switch(e.charCodeAt(r)){case 34:n=!n;break;case 95:case 42:case 92:++r;break;case 59:t[t.length]=e.substr(i,r-i),i=r+1}if(t[t.length]=e.substr(i),n===!0)throw Error(`Format |`+e+`| unterminated string `);return t}var Sc=/\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;function Cc(e){for(var t=0,n=``,r=``;t<e.length;)switch(n=e.charAt(t)){case`G`:Ms(e,t)&&(t+=6),t++;break;case`"`:for(;e.charCodeAt(++t)!==34&&t<e.length;);++t;break;case`\\`:t+=2;break;case`_`:t+=2;break;case`@`:++t;break;case`B`:case`b`:if(e.charAt(t+1)===`1`||e.charAt(t+1)===`2`)return!0;case`M`:case`D`:case`Y`:case`H`:case`S`:case`E`:case`m`:case`d`:case`y`:case`h`:case`s`:case`e`:case`g`:return!0;case`A`:case`a`:case`上`:if(e.substr(t,3).toUpperCase()===`A/P`||e.substr(t,5).toUpperCase()===`AM/PM`||e.substr(t,5).toUpperCase()===`上午/下午`)return!0;++t;break;case`[`:for(r=n;e.charAt(t++)!==`]`&&t<e.length;)r+=e.charAt(t);if(r.match(Sc))return!0;break;case`.`:case`0`:case`#`:for(;t<e.length&&(`0#?.,E+-%`.indexOf(n=e.charAt(++t))>-1||n==`\\`&&e.charAt(t+1)==`-`&&`0#`.indexOf(e.charAt(t+2))>-1););break;case`?`:for(;e.charAt(++t)===n;);break;case`*`:++t,(e.charAt(t)==` `||e.charAt(t)==`*`)&&++t;break;case`(`:case`)`:++t;break;case`1`:case`2`:case`3`:case`4`:case`5`:case`6`:case`7`:case`8`:case`9`:for(;t<e.length&&`0123456789`.indexOf(e.charAt(++t))>-1;);break;case` `:++t;break;default:++t;break}return!1}function wc(e,t,n,r){for(var i=[],a=``,o=0,s=``,c=`t`,l,u,d,f=`H`;o<e.length;)switch(s=e.charAt(o)){case`G`:if(!Ms(e,o))throw Error(`unrecognized character `+s+` in `+e);i[i.length]={t:`G`,v:`General`},o+=7;break;case`"`:for(a=``;(d=e.charCodeAt(++o))!==34&&o<e.length;)a+=String.fromCharCode(d);i[i.length]={t:`t`,v:a},++o;break;case`\\`:var p=e.charAt(++o),m=p===`(`||p===`)`?p:`t`;i[i.length]={t:m,v:p},++o;break;case`_`:i[i.length]={t:`t`,v:` `},o+=2;break;case`@`:i[i.length]={t:`T`,v:t},++o;break;case`B`:case`b`:if(e.charAt(o+1)===`1`||e.charAt(o+1)===`2`){if(l==null&&(l=Bs(t,n,e.charAt(o+1)===`2`),l==null))return``;i[i.length]={t:`X`,v:e.substr(o,2)},c=s,o+=2;break}case`M`:case`D`:case`Y`:case`H`:case`S`:case`E`:s=s.toLowerCase();case`m`:case`d`:case`y`:case`h`:case`s`:case`e`:case`g`:if(t<0||l==null&&(l=Bs(t,n),l==null))return``;for(a=s;++o<e.length&&e.charAt(o).toLowerCase()===s;)a+=s;s===`m`&&c.toLowerCase()===`h`&&(s=`M`),s===`h`&&(s=f),i[i.length]={t:s,v:a},c=s;break;case`A`:case`a`:case`上`:var h={t:s,v:s};if(l??=Bs(t,n),e.substr(o,3).toUpperCase()===`A/P`?(l!=null&&(h.v=l.H>=12?`P`:`A`),h.t=`T`,f=`h`,o+=3):e.substr(o,5).toUpperCase()===`AM/PM`?(l!=null&&(h.v=l.H>=12?`PM`:`AM`),h.t=`T`,o+=5,f=`h`):e.substr(o,5).toUpperCase()===`上午/下午`?(l!=null&&(h.v=l.H>=12?`下午`:`上午`),h.t=`T`,o+=5,f=`h`):(h.t=`t`,++o),l==null&&h.t===`T`)return``;i[i.length]=h,c=s;break;case`[`:for(a=s;e.charAt(o++)!==`]`&&o<e.length;)a+=e.charAt(o);if(a.slice(-1)!==`]`)throw`unterminated "[" block: |`+a+`|`;if(a.match(Sc)){if(l==null&&(l=Bs(t,n),l==null))return``;i[i.length]={t:`Z`,v:a.toLowerCase()},c=a.charAt(1)}else a.indexOf(`$`)>-1&&(a=(a.match(/\$([^-\[\]]*)/)||[])[1]||`$`,Cc(e)||(i[i.length]={t:`t`,v:a}));break;case`.`:if(l!=null){for(a=s;++o<e.length&&(s=e.charAt(o))===`0`;)a+=s;i[i.length]={t:`s`,v:a};break}case`0`:case`#`:for(a=s;++o<e.length&&`0#?.,E+-%`.indexOf(s=e.charAt(o))>-1;)a+=s;i[i.length]={t:`n`,v:a};break;case`?`:for(a=s;e.charAt(++o)===s;)a+=s;i[i.length]={t:s,v:a},c=s;break;case`*`:++o,(e.charAt(o)==` `||e.charAt(o)==`*`)&&++o;break;case`(`:case`)`:i[i.length]={t:r===1?`t`:s,v:s},++o;break;case`1`:case`2`:case`3`:case`4`:case`5`:case`6`:case`7`:case`8`:case`9`:for(a=s;o<e.length&&`0123456789`.indexOf(e.charAt(++o))>-1;)a+=e.charAt(o);i[i.length]={t:`D`,v:a};break;case` `:i[i.length]={t:s,v:s},++o;break;case`$`:i[i.length]={t:`t`,v:`$`},++o;break;default:if(`,$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP`.indexOf(s)===-1)throw Error(`unrecognized character `+s+` in `+e);i[i.length]={t:`t`,v:s},++o;break}var g=0,_=0,v;for(o=i.length-1,c=`t`;o>=0;--o)switch(i[o].t){case`h`:case`H`:i[o].t=f,c=`h`,g<1&&(g=1);break;case`s`:(v=i[o].v.match(/\.0+$/))&&(_=Math.max(_,v[0].length-1)),g<3&&(g=3);case`d`:case`y`:case`M`:case`e`:c=i[o].t;break;case`m`:c===`s`&&(i[o].t=`M`,g<2&&(g=2));break;case`X`:break;case`Z`:g<1&&i[o].v.match(/[Hh]/)&&(g=1),g<2&&i[o].v.match(/[Mm]/)&&(g=2),g<3&&i[o].v.match(/[Ss]/)&&(g=3)}switch(g){case 0:break;case 1:l.u>=.5&&(l.u=0,++l.S),l.S>=60&&(l.S=0,++l.M),l.M>=60&&(l.M=0,++l.H);break;case 2:l.u>=.5&&(l.u=0,++l.S),l.S>=60&&(l.S=0,++l.M);break}var y=``,b;for(o=0;o<i.length;++o)switch(i[o].t){case`t`:case`T`:case` `:case`D`:break;case`X`:i[o].v=``,i[o].t=`;`;break;case`d`:case`m`:case`y`:case`h`:case`H`:case`M`:case`s`:case`e`:case`b`:case`Z`:i[o].v=Qs(i[o].t.charCodeAt(0),i[o].v,l,_),i[o].t=`t`;break;case`n`:case`?`:for(b=o+1;i[b]!=null&&((s=i[b].t)===`?`||s===`D`||(s===` `||s===`t`)&&i[b+1]!=null&&(i[b+1].t===`?`||i[b+1].t===`t`&&i[b+1].v===`/`)||i[o].t===`(`&&(s===` `||s===`n`||s===`)`)||s===`t`&&(i[b].v===`/`||i[b].v===` `&&i[b+1]!=null&&i[b+1].t==`?`));)i[o].v+=i[b].v,i[b]={v:``,t:`;`},++b;y+=i[o].v,o=b-1;break;case`G`:i[o].t=`t`,i[o].v=Xs(t,n);break}var x=``,S,C;if(y.length>0){y.charCodeAt(0)==40?(S=t<0&&y.charCodeAt(0)===45?-t:t,C=bc(`n`,y,S)):(S=t<0&&r>1?-t:t,C=bc(`n`,y,S),S<0&&i[0]&&i[0].t==`t`&&(C=C.substr(1),i[0].v=`-`+i[0].v)),b=C.length-1;var w=i.length;for(o=0;o<i.length;++o)if(i[o]!=null&&i[o].t!=`t`&&i[o].v.indexOf(`.`)>-1){w=o;break}var T=i.length;if(w===i.length&&C.indexOf(`E`)===-1){for(o=i.length-1;o>=0;--o)i[o]==null||`n?`.indexOf(i[o].t)===-1||(b>=i[o].v.length-1?(b-=i[o].v.length,i[o].v=C.substr(b+1,i[o].v.length)):b<0?i[o].v=``:(i[o].v=C.substr(0,b+1),b=-1),i[o].t=`t`,T=o);b>=0&&T<i.length&&(i[T].v=C.substr(0,b+1)+i[T].v)}else if(w!==i.length&&C.indexOf(`E`)===-1){for(b=C.indexOf(`.`)-1,o=w;o>=0;--o)if(!(i[o]==null||`n?`.indexOf(i[o].t)===-1)){for(u=i[o].v.indexOf(`.`)>-1&&o===w?i[o].v.indexOf(`.`)-1:i[o].v.length-1,x=i[o].v.substr(u+1);u>=0;--u)b>=0&&(i[o].v.charAt(u)===`0`||i[o].v.charAt(u)===`#`)&&(x=C.charAt(b--)+x);i[o].v=x,i[o].t=`t`,T=o}for(b>=0&&T<i.length&&(i[T].v=C.substr(0,b+1)+i[T].v),b=C.indexOf(`.`)+1,o=w;o<i.length;++o)if(!(i[o]==null||`n?(`.indexOf(i[o].t)===-1&&o!==w)){for(u=i[o].v.indexOf(`.`)>-1&&o===w?i[o].v.indexOf(`.`)+1:0,x=i[o].v.substr(0,u);u<i[o].v.length;++u)b<C.length&&(x+=C.charAt(b++));i[o].v=x,i[o].t=`t`,T=o}}}for(o=0;o<i.length;++o)i[o]!=null&&`n?`.indexOf(i[o].t)>-1&&(S=r>1&&t<0&&o>0&&i[o-1].v===`-`?-t:t,i[o].v=bc(i[o].t,i[o].v,S),i[o].t=`t`);var E=``;for(o=0;o!==i.length;++o)i[o]!=null&&(E+=i[o].v);return E}var Tc=/\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;function Ec(e,t){if(t==null)return!1;var n=parseFloat(t[2]);switch(t[1]){case`=`:if(e==n)return!0;break;case`>`:if(e>n)return!0;break;case`<`:if(e<n)return!0;break;case`<>`:if(e!=n)return!0;break;case`>=`:if(e>=n)return!0;break;case`<=`:if(e<=n)return!0;break}return!1}function Dc(e,t){var n=xc(e),r=n.length,i=n[r-1].indexOf(`@`);if(r<4&&i>-1&&--r,n.length>4)throw Error(`cannot find right format for |`+n.join(`|`)+`|`);if(typeof t!=`number`)return[4,n.length===4||i>-1?n[n.length-1]:`@`];switch(n.length){case 1:n=i>-1?[`General`,`General`,`General`,n[0]]:[n[0],n[0],n[0],`@`];break;case 2:n=i>-1?[n[0],n[0],n[0],n[1]]:[n[0],n[1],n[0],`@`];break;case 3:n=i>-1?[n[0],n[1],n[0],n[2]]:[n[0],n[1],n[2],`@`];break;case 4:break}var a=t>0?n[0]:t<0?n[1]:n[2];if(n[0].indexOf(`[`)===-1&&n[1].indexOf(`[`)===-1)return[r,a];if(n[0].match(/\[[=<>]/)!=null||n[1].match(/\[[=<>]/)!=null){var o=n[0].match(Tc),s=n[1].match(Tc);return Ec(t,o)?[r,n[0]]:Ec(t,s)?[r,n[1]]:[r,n[o!=null&&s!=null?2:1]]}return[r,a]}function Oc(e,t,n){n??={};var r=``;switch(typeof e){case`string`:r=e==`m/d/yy`&&n.dateNF?n.dateNF:e;break;case`number`:r=e==14&&n.dateNF?n.dateNF:(n.table==null?Is:n.table)[e],r??=n.table&&n.table[Ls[e]]||Is[Ls[e]],r??=Rs[e]||`General`;break}if(Ms(r,0))return Xs(t,n);t instanceof Date&&(t=Ws(t,n.date1904));var i=Dc(r,t);if(Ms(i[1]))return Xs(t,n);if(t===!0)t=`TRUE`;else if(t===!1)t=`FALSE`;else if(t===``||t==null)return``;return wc(i[1],t,n,i[0])}function kc(e,t){if(typeof t!=`number`){t=+t||-1;for(var n=0;n<392;++n){if(Is[n]==null){t<0&&(t=n);continue}if(Is[n]==e){t=n;break}}t<0&&(t=391)}return Is[t]=e,t}function Ac(e){for(var t=0;t!=392;++t)e[t]!==void 0&&kc(e[t],t)}function jc(){Is=Fs()}var Mc=/[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;function Nc(e){var t=typeof e==`number`?Is[e]:e;return t=t.replace(Mc,`(\\d+)`),RegExp(`^`+t+`$`)}function Pc(e,t,n){var r=-1,i=-1,a=-1,o=-1,s=-1,c=-1;(t.match(Mc)||[]).forEach(function(e,t){var l=parseInt(n[t+1],10);switch(e.toLowerCase().charAt(0)){case`y`:r=l;break;case`d`:a=l;break;case`h`:o=l;break;case`s`:c=l;break;case`m`:o>=0?s=l:i=l;break}}),c>=0&&s==-1&&i>=0&&(s=i,i=-1);var l=(``+(r>=0?r:new Date().getFullYear())).slice(-4)+`-`+(`00`+(i>=1?i:1)).slice(-2)+`-`+(`00`+(a>=1?a:1)).slice(-2);l.length==7&&(l=`0`+l),l.length==8&&(l=`20`+l);var u=(`00`+(o>=0?o:0)).slice(-2)+`:`+(`00`+(s>=0?s:0)).slice(-2)+`:`+(`00`+(c>=0?c:0)).slice(-2);return o==-1&&s==-1&&c==-1?l:r==-1&&i==-1&&a==-1?u:l+`T`+u}var Fc=(function(){var e={};e.version=`1.2.0`;function t(){for(var e=0,t=Array(256),n=0;n!=256;++n)e=n,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,t[n]=e;return typeof Int32Array<`u`?new Int32Array(t):t}var n=t();function r(e){var t=0,n=0,r=0,i=typeof Int32Array<`u`?new Int32Array(4096):Array(4096);for(r=0;r!=256;++r)i[r]=e[r];for(r=0;r!=256;++r)for(n=e[r],t=256+r;t<4096;t+=256)n=i[t]=n>>>8^e[n&255];var a=[];for(r=1;r!=16;++r)a[r-1]=typeof Int32Array<`u`?i.subarray(r*256,r*256+256):i.slice(r*256,r*256+256);return a}var i=r(n),a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14];function b(e,t){for(var r=t^-1,i=0,a=e.length;i<a;)r=r>>>8^n[(r^e.charCodeAt(i++))&255];return~r}function x(e,t){for(var r=t^-1,i=e.length-15,b=0;b<i;)r=y[e[b++]^r&255]^v[e[b++]^r>>8&255]^_[e[b++]^r>>16&255]^g[e[b++]^r>>>24]^h[e[b++]]^m[e[b++]]^p[e[b++]]^f[e[b++]]^d[e[b++]]^u[e[b++]]^l[e[b++]]^c[e[b++]]^s[e[b++]]^o[e[b++]]^a[e[b++]]^n[e[b++]];for(i+=15;b<i;)r=r>>>8^n[(r^e[b++])&255];return~r}function S(e,t){for(var r=t^-1,i=0,a=e.length,o=0,s=0;i<a;)o=e.charCodeAt(i++),o<128?r=r>>>8^n[(r^o)&255]:o<2048?(r=r>>>8^n[(r^(192|o>>6&31))&255],r=r>>>8^n[(r^(128|o&63))&255]):o>=55296&&o<57344?(o=(o&1023)+64,s=e.charCodeAt(i++)&1023,r=r>>>8^n[(r^(240|o>>8&7))&255],r=r>>>8^n[(r^(128|o>>2&63))&255],r=r>>>8^n[(r^(128|s>>6&15|(o&3)<<4))&255],r=r>>>8^n[(r^(128|s&63))&255]):(r=r>>>8^n[(r^(224|o>>12&15))&255],r=r>>>8^n[(r^(128|o>>6&63))&255],r=r>>>8^n[(r^(128|o&63))&255]);return~r}return e.table=n,e.bstr=b,e.buf=x,e.str=S,e})(),Ic=(function(){var e={};e.version=`1.2.1`;function t(e,t){for(var n=e.split(`/`),r=t.split(`/`),i=0,a=0,o=Math.min(n.length,r.length);i<o;++i){if(a=n[i].length-r[i].length)return a;if(n[i]!=r[i])return n[i]<r[i]?-1:1}return n.length-r.length}function n(e){if(e.charAt(e.length-1)==`/`)return e.slice(0,-1).indexOf(`/`)===-1?e:n(e.slice(0,-1));var t=e.lastIndexOf(`/`);return t===-1?e:e.slice(0,t+1)}function r(e){if(e.charAt(e.length-1)==`/`)return r(e.slice(0,-1));var t=e.lastIndexOf(`/`);return t===-1?e:e.slice(t+1)}function i(e,t){typeof t==`string`&&(t=new Date(t));var n=t.getHours();n=n<<6|t.getMinutes(),n=n<<5|t.getSeconds()>>>1,e.write_shift(2,n);var r=t.getFullYear()-1980;r=r<<4|t.getMonth()+1,r=r<<5|t.getDate(),e.write_shift(2,r)}function a(e){var t=e.read_shift(2)&65535,n=e.read_shift(2)&65535,r=new Date,i=n&31;n>>>=5;var a=n&15;n>>>=4,r.setMilliseconds(0),r.setFullYear(n+1980),r.setMonth(a-1),r.setDate(i);var o=t&31;t>>>=5;var s=t&63;return t>>>=6,r.setHours(t),r.setMinutes(s),r.setSeconds(o<<1),r}function o(e){du(e,0);for(var t={},n=0;e.l<=e.length-4;){var r=e.read_shift(2),i=e.read_shift(2),a=e.l+i,o={};switch(r){case 21589:n=e.read_shift(1),n&1&&(o.mtime=e.read_shift(4)),i>5&&(n&2&&(o.atime=e.read_shift(4)),n&4&&(o.ctime=e.read_shift(4))),o.mtime&&(o.mt=new Date(o.mtime*1e3));break}e.l=a,t[r]=o}return t}var s;function c(){return s||={}}function l(e,t){if(e[0]==80&&e[1]==75)return Ue(e,t);if((e[0]|32)==109&&(e[1]|32)==105)return Qe(e,t);if(e.length<512)throw Error(`CFB file size `+e.length+` < 512`);var n=3,r=512,i=0,a=0,o=0,s=0,c=0,l=[],m=e.slice(0,512);du(m,0);var g=u(m);switch(n=g[0],n){case 3:r=512;break;case 4:r=4096;break;case 0:if(g[1]==0)return Ue(e,t);default:throw Error(`Major Version: Expected 3 or 4 saw `+n)}r!==512&&(m=e.slice(0,r),du(m,28));var y=e.slice(0,r);d(m,n);var b=m.read_shift(4,`i`);if(n===3&&b!==0)throw Error(`# Directory Sectors: Expected 0 saw `+b);m.l+=4,o=m.read_shift(4,`i`),m.l+=4,m.chk(`00100000`,`Mini Stream Cutoff Size: `),s=m.read_shift(4,`i`),i=m.read_shift(4,`i`),c=m.read_shift(4,`i`),a=m.read_shift(4,`i`);for(var x=-1,S=0;S<109&&(x=m.read_shift(4,`i`),!(x<0));++S)l[S]=x;var C=f(e,r);h(c,a,C,r,l);var w=_(C,o,l,r);w[o].name=`!Directory`,i>0&&s!==O&&(w[s].name=`!MiniFAT`),w[l[0]].name=`!FAT`,w.fat_addrs=l,w.ssz=r;var T={},E=[],D=[],k=[];v(o,w,C,E,i,T,D,s),p(D,k,E),E.shift();var ee={FileIndex:D,FullPaths:k};return t&&t.raw&&(ee.raw={header:y,sectors:C}),ee}function u(e){if(e[e.l]==80&&e[e.l+1]==75)return[0,0];e.chk(k,`Header Signature: `),e.l+=16;var t=e.read_shift(2,`u`);return[e.read_shift(2,`u`),t]}function d(e,t){var n=9;switch(e.l+=2,n=e.read_shift(2)){case 9:if(t!=3)throw Error(`Sector Shift: Expected 9 saw `+n);break;case 12:if(t!=4)throw Error(`Sector Shift: Expected 12 saw `+n);break;default:throw Error(`Sector Shift: Expected 9 or 12 saw `+n)}e.chk(`0600`,`Mini Sector Shift: `),e.chk(`000000000000`,`Reserved: `)}function f(e,t){for(var n=Math.ceil(e.length/t)-1,r=[],i=1;i<n;++i)r[i-1]=e.slice(i*t,(i+1)*t);return r[n-1]=e.slice(n*t),r}function p(e,t,n){for(var r=0,i=0,a=0,o=0,s=0,c=n.length,l=[],u=[];r<c;++r)l[r]=u[r]=r,t[r]=n[r];for(;s<u.length;++s)r=u[s],i=e[r].L,a=e[r].R,o=e[r].C,l[r]===r&&(i!==-1&&l[i]!==i&&(l[r]=l[i]),a!==-1&&l[a]!==a&&(l[r]=l[a])),o!==-1&&(l[o]=r),i!==-1&&r!=l[r]&&(l[i]=l[r],u.lastIndexOf(i)<s&&u.push(i)),a!==-1&&r!=l[r]&&(l[a]=l[r],u.lastIndexOf(a)<s&&u.push(a));for(r=1;r<c;++r)l[r]===r&&(a!==-1&&l[a]!==a?l[r]=l[a]:i!==-1&&l[i]!==i&&(l[r]=l[i]));for(r=1;r<c;++r)if(e[r].type!==0){if(s=r,s!=l[s])do s=l[s],t[r]=t[s]+`/`+t[r];while(s!==0&&l[s]!==-1&&s!=l[s]);l[r]=-1}for(t[0]+=`/`,r=1;r<c;++r)e[r].type!==2&&(t[r]+=`/`)}function m(e,t,n){for(var r=e.start,i=e.size,a=[],o=r;n&&i>0&&o>=0;)a.push(t.slice(o*D,o*D+D)),i-=D,o=ru(n,o*4);return a.length===0?q(0):bs(a).slice(0,e.size)}function h(e,t,n,r,i){var a=O;if(e===O){if(t!==0)throw Error(`DIFAT chain shorter than expected`)}else if(e!==-1){var o=n[e],s=(r>>>2)-1;if(!o)return;for(var c=0;c<s&&(a=ru(o,c*4))!==O;++c)i.push(a);h(ru(o,r-4),t-1,n,r,i)}}function g(e,t,n,r,i){var a=[],o=[];i||=[];var s=r-1,c=0,l=0;for(c=t;c>=0;){i[c]=!0,a[a.length]=c,o.push(e[c]);var u=n[Math.floor(c*4/r)];if(l=c*4&s,r<4+l)throw Error(`FAT boundary crossed: `+c+` 4 `+r);if(!e[u])break;c=ru(e[u],l)}return{nodes:a,data:Fl([o])}}function _(e,t,n,r){var i=e.length,a=[],o=[],s=[],c=[],l=r-1,u=0,d=0,f=0,p=0;for(u=0;u<i;++u)if(s=[],f=u+t,f>=i&&(f-=i),!o[f]){c=[];var m=[];for(d=f;d>=0;){m[d]=!0,o[d]=!0,s[s.length]=d,c.push(e[d]);var h=n[Math.floor(d*4/r)];if(p=d*4&l,r<4+p)throw Error(`FAT boundary crossed: `+d+` 4 `+r);if(!e[h]||(d=ru(e[h],p),m[d]))break}a[f]={nodes:s,data:Fl([c])}}return a}function v(e,t,n,r,i,a,o,s){for(var c=0,l=r.length?2:0,u=t[e].data,d=0,f=0,p;d<u.length;d+=128){var h=u.slice(d,d+128);du(h,64),f=h.read_shift(2),p=Ll(h,0,f-l),r.push(p);var _={name:p,type:h.read_shift(1),color:h.read_shift(1),L:h.read_shift(4,`i`),R:h.read_shift(4,`i`),C:h.read_shift(4,`i`),clsid:h.read_shift(16),state:h.read_shift(4,`i`),start:0,size:0};h.read_shift(2)+h.read_shift(2)+h.read_shift(2)+h.read_shift(2)!==0&&(_.ct=y(h,h.l-8)),h.read_shift(2)+h.read_shift(2)+h.read_shift(2)+h.read_shift(2)!==0&&(_.mt=y(h,h.l-8)),_.start=h.read_shift(4,`i`),_.size=h.read_shift(4,`i`),_.size<0&&_.start<0&&(_.size=_.type=0,_.start=O,_.name=``),_.type===5?(c=_.start,i>0&&c!==O&&(t[c].name=`!StreamData`)):_.size>=4096?(_.storage=`fat`,t[_.start]===void 0&&(t[_.start]=g(n,_.start,t.fat_addrs,t.ssz)),t[_.start].name=_.name,_.content=t[_.start].data.slice(0,_.size)):(_.storage=`minifat`,_.size<0?_.size=0:c!==O&&_.start!==O&&t[c]&&(_.content=m(_,t[c].data,(t[s]||{}).data))),_.content&&du(_.content,0),a[p]=_,o.push(_)}}function y(e,t){return new Date((nu(e,t+4)/1e7*2**32+nu(e,t)/1e7-11644473600)*1e3)}function b(e,t){return c(),l(s.readFileSync(e),t)}function x(e,t){var n=t&&t.type;switch(n||z&&Buffer.isBuffer(e)&&(n=`buffer`),n||`base64`){case`file`:return b(e,t);case`base64`:return l(gs(fs(e)),t);case`binary`:return l(gs(e),t)}return l(e,t)}function S(e,t){var n=t||{},r=n.root||`Root Entry`;if(e.FullPaths||=[],e.FileIndex||=[],e.FullPaths.length!==e.FileIndex.length)throw Error(`inconsistent CFB structure`);e.FullPaths.length===0&&(e.FullPaths[0]=r+`/`,e.FileIndex[0]={name:r,type:5}),n.CLSID&&(e.FileIndex[0].clsid=n.CLSID),C(e)}function C(e){var t=`Sh33tJ5`;if(!Ic.find(e,`/`+t)){var n=q(4);n[0]=55,n[1]=n[3]=50,n[2]=54,e.FileIndex.push({name:t,type:2,content:n,size:4,L:69,R:69,C:69}),e.FullPaths.push(e.FullPaths[0]+t),w(e)}}function w(e,i){S(e);for(var a=!1,o=!1,s=e.FullPaths.length-1;s>=0;--s){var c=e.FileIndex[s];switch(c.type){case 0:o?a=!0:(e.FileIndex.pop(),e.FullPaths.pop());break;case 1:case 2:case 5:o=!0,isNaN(c.R*c.L*c.C)&&(a=!0),c.R>-1&&c.L>-1&&c.R==c.L&&(a=!0);break;default:a=!0;break}}if(!(!a&&!i)){var l=new Date(1987,1,19),u=0,d=Object.create?Object.create(null):{},f=[];for(s=0;s<e.FullPaths.length;++s)d[e.FullPaths[s]]=!0,e.FileIndex[s].type!==0&&f.push([e.FullPaths[s],e.FileIndex[s]]);for(s=0;s<f.length;++s){var p=n(f[s][0]);o=d[p],o||(f.push([p,{name:r(p).replace(`/`,``),type:1,clsid:te,ct:l,mt:l,content:null}]),d[p]=!0)}for(f.sort(function(e,n){return t(e[0],n[0])}),e.FullPaths=[],e.FileIndex=[],s=0;s<f.length;++s)e.FullPaths[s]=f[s][0],e.FileIndex[s]=f[s][1];for(s=0;s<f.length;++s){var m=e.FileIndex[s],h=e.FullPaths[s];if(m.name=r(h).replace(`/`,``),m.L=m.R=m.C=-(m.color=1),m.size=m.content?m.content.length:0,m.start=0,m.clsid=m.clsid||te,s===0)m.C=f.length>1?1:-1,m.size=0,m.type=5;else if(h.slice(-1)==`/`){for(u=s+1;u<f.length&&n(e.FullPaths[u])!=h;++u);for(m.C=u>=f.length?-1:u,u=s+1;u<f.length&&n(e.FullPaths[u])!=n(h);++u);m.R=u>=f.length?-1:u,m.type=1}else n(e.FullPaths[s+1]||``)==n(h)&&(m.R=s+1),m.type=2}}}function T(e,t){var n=t||{};if(n.fileType==`mad`)return $e(e,n);switch(w(e),n.fileType){case`zip`:return Ge(e,n)}var r=(function(e){for(var t=0,n=0,r=0;r<e.FileIndex.length;++r){var i=e.FileIndex[r];if(i.content){var a=i.content.length;a>0&&(a<4096?t+=a+63>>6:n+=a+511>>9)}}for(var o=e.FullPaths.length+3>>2,s=t+7>>3,c=t+127>>7,l=s+n+o+c,u=l+127>>7,d=u<=109?0:Math.ceil((u-109)/127);l+u+d+127>>7>u;)d=++u<=109?0:Math.ceil((u-109)/127);var f=[1,d,u,c,o,n,t,0];return e.FileIndex[0].size=t<<6,f[7]=(e.FileIndex[0].start=f[0]+f[1]+f[2]+f[3]+f[4]+f[5])+(f[6]+7>>3),f})(e),i=q(r[7]<<9),a=0,o=0;for(a=0;a<8;++a)i.write_shift(1,ee[a]);for(a=0;a<8;++a)i.write_shift(2,0);for(i.write_shift(2,62),i.write_shift(2,3),i.write_shift(2,65534),i.write_shift(2,9),i.write_shift(2,6),a=0;a<3;++a)i.write_shift(2,0);for(i.write_shift(4,0),i.write_shift(4,r[2]),i.write_shift(4,r[0]+r[1]+r[2]+r[3]-1),i.write_shift(4,0),i.write_shift(4,4096),i.write_shift(4,r[3]?r[0]+r[1]+r[2]-1:O),i.write_shift(4,r[3]),i.write_shift(-4,r[1]?r[0]-1:O),i.write_shift(4,r[1]),a=0;a<109;++a)i.write_shift(-4,a<r[2]?r[1]+a:-1);if(r[1])for(o=0;o<r[1];++o){for(;a<236+o*127;++a)i.write_shift(-4,a<r[2]?r[1]+a:-1);i.write_shift(-4,o===r[1]-1?O:o+1)}var s=function(e){for(o+=e;a<o-1;++a)i.write_shift(-4,a+1);e&&(++a,i.write_shift(-4,O))};for(o=a=0,o+=r[1];a<o;++a)i.write_shift(-4,ne.DIFSECT);for(o+=r[2];a<o;++a)i.write_shift(-4,ne.FATSECT);s(r[3]),s(r[4]);for(var c=0,l=0,u=e.FileIndex[0];c<e.FileIndex.length;++c)u=e.FileIndex[c],u.content&&(l=u.content.length,!(l<4096)&&(u.start=o,s(l+511>>9)));for(s(r[6]+7>>3);i.l&511;)i.write_shift(-4,ne.ENDOFCHAIN);for(o=a=0,c=0;c<e.FileIndex.length;++c)u=e.FileIndex[c],u.content&&(l=u.content.length,!(!l||l>=4096)&&(u.start=o,s(l+63>>6)));for(;i.l&511;)i.write_shift(-4,ne.ENDOFCHAIN);for(a=0;a<r[4]<<2;++a){var d=e.FullPaths[a];if(!d||d.length===0){for(c=0;c<17;++c)i.write_shift(4,0);for(c=0;c<3;++c)i.write_shift(4,-1);for(c=0;c<12;++c)i.write_shift(4,0);continue}u=e.FileIndex[a],a===0&&(u.start=u.size?u.start-1:O);var f=a===0&&n.root||u.name;if(l=2*(f.length+1),i.write_shift(64,f,`utf16le`),i.write_shift(2,l),i.write_shift(1,u.type),i.write_shift(1,u.color),i.write_shift(-4,u.L),i.write_shift(-4,u.R),i.write_shift(-4,u.C),u.clsid)i.write_shift(16,u.clsid,`hex`);else for(c=0;c<4;++c)i.write_shift(4,0);i.write_shift(4,u.state||0),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(4,u.start),i.write_shift(4,u.size),i.write_shift(4,0)}for(a=1;a<e.FileIndex.length;++a)if(u=e.FileIndex[a],u.size>=4096)if(i.l=u.start+1<<9,z&&Buffer.isBuffer(u.content))u.content.copy(i,i.l,0,u.size),i.l+=u.size+511&-512;else{for(c=0;c<u.size;++c)i.write_shift(1,u.content[c]);for(;c&511;++c)i.write_shift(1,0)}for(a=1;a<e.FileIndex.length;++a)if(u=e.FileIndex[a],u.size>0&&u.size<4096)if(z&&Buffer.isBuffer(u.content))u.content.copy(i,i.l,0,u.size),i.l+=u.size+63&-64;else{for(c=0;c<u.size;++c)i.write_shift(1,u.content[c]);for(;c&63;++c)i.write_shift(1,0)}if(z)i.l=i.length;else for(;i.l<i.length;)i.write_shift(1,0);return i}function E(e,t){var n=e.FullPaths.map(function(e){return e.toUpperCase()}),r=n.map(function(e){var t=e.split(`/`);return t[t.length-(e.slice(-1)==`/`?2:1)]}),i=!1;t.charCodeAt(0)===47?(i=!0,t=n[0].slice(0,-1)+t):i=t.indexOf(`/`)!==-1;var a=t.toUpperCase(),o=i===!0?n.indexOf(a):r.indexOf(a);if(o!==-1)return e.FileIndex[o];var s=!a.match(Cs);for(a=a.replace(Ss,``),s&&(a=a.replace(Cs,`!`)),o=0;o<n.length;++o)if((s?n[o].replace(Cs,`!`):n[o]).replace(Ss,``)==a||(s?r[o].replace(Cs,`!`):r[o]).replace(Ss,``)==a)return e.FileIndex[o];return null}var D=64,O=-2,k=`d0cf11e0a1b11ae1`,ee=[208,207,17,224,161,177,26,225],te=`00000000000000000000000000000000`,ne={MAXREGSECT:-6,DIFSECT:-4,FATSECT:-3,ENDOFCHAIN:O,FREESECT:-1,HEADER_SIGNATURE:k,HEADER_MINOR_VERSION:`3e00`,MAXREGSID:-6,NOSTREAM:-1,HEADER_CLSID:te,EntryTypes:[`unknown`,`storage`,`stream`,`lockbytes`,`property`,`root`]};function re(e,t,n){c();var r=T(e,n);s.writeFileSync(t,r)}function ie(e){for(var t=Array(e.length),n=0;n<e.length;++n)t[n]=String.fromCharCode(e[n]);return t.join(``)}function ae(e,t){var n=T(e,t);switch(t&&t.type||`buffer`){case`file`:return c(),s.writeFileSync(t.filename,n),n;case`binary`:return typeof n==`string`?n:ie(n);case`base64`:return ds(typeof n==`string`?n:ie(n));case`buffer`:if(z)return Buffer.isBuffer(n)?n:ps(n);case`array`:return typeof n==`string`?gs(n):n}return n}var A;function j(e){try{var t=e.InflateRaw,n=new t;if(n._processChunk(new Uint8Array([3,0]),n._finishFlushFlag),n.bytesRead)A=e;else throw Error(`zlib does not expose bytesRead`)}catch(e){console.error(`cannot use native zlib: `+(e.message||e))}}function oe(e,t){if(!A)return Ve(e,t);var n=A.InflateRaw,r=new n,i=r._processChunk(e.slice(e.l),r._finishFlushFlag);return e.l+=r.bytesRead,i}function se(e){return A?A.deflateRawSync(e):Ne(e)}var ce=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],le=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],ue=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];function de(e){var t=(e<<1|e<<11)&139536|(e<<5|e<<15)&558144;return(t>>16|t>>8|t)&255}for(var fe=typeof Uint8Array<`u`,pe=fe?new Uint8Array(256):[],me=0;me<256;++me)pe[me]=de(me);function he(e,t){var n=pe[e&255];return t<=8?n>>>8-t:(n=n<<8|pe[e>>8&255],t<=16?n>>>16-t:(n=n<<8|pe[e>>16&255],n>>>24-t))}function ge(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=6?0:e[r+1]<<8))>>>n&3}function _e(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=5?0:e[r+1]<<8))>>>n&7}function ve(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=4?0:e[r+1]<<8))>>>n&15}function ye(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=3?0:e[r+1]<<8))>>>n&31}function be(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=1?0:e[r+1]<<8))>>>n&127}function xe(e,t,n){var r=t&7,i=t>>>3,a=(1<<n)-1,o=e[i]>>>r;return n<8-r||(o|=e[i+1]<<8-r,n<16-r)||(o|=e[i+2]<<16-r,n<24-r)||(o|=e[i+3]<<24-r),o&a}function Se(e,t,n){var r=t&7,i=t>>>3;return r<=5?e[i]|=(n&7)<<r:(e[i]|=n<<r&255,e[i+1]=(n&7)>>8-r),t+3}function Ce(e,t,n){var r=t&7,i=t>>>3;return n=(n&1)<<r,e[i]|=n,t+1}function we(e,t,n){var r=t&7,i=t>>>3;return n<<=r,e[i]|=n&255,n>>>=8,e[i+1]=n,t+8}function Te(e,t,n){var r=t&7,i=t>>>3;return n<<=r,e[i]|=n&255,n>>>=8,e[i+1]=n&255,e[i+2]=n>>>8,t+16}function Ee(e,t){var n=e.length,r=2*n>t?2*n:t+5,i=0;if(n>=t)return e;if(z){var a=hs(r);if(e.copy)e.copy(a);else for(;i<e.length;++i)a[i]=e[i];return a}else if(fe){var o=new Uint8Array(r);if(o.set)o.set(e);else for(;i<n;++i)o[i]=e[i];return o}return e.length=r,e}function De(e){for(var t=Array(e),n=0;n<e;++n)t[n]=0;return t}function Oe(e,t,n){var r=1,i=0,a=0,o=0,s=0,c=e.length,l=fe?new Uint16Array(32):De(32);for(a=0;a<32;++a)l[a]=0;for(a=c;a<n;++a)e[a]=0;c=e.length;var u=fe?new Uint16Array(c):De(c);for(a=0;a<c;++a)l[i=e[a]]++,r<i&&(r=i),u[a]=0;for(l[0]=0,a=1;a<=r;++a)l[a+16]=s=s+l[a-1]<<1;for(a=0;a<c;++a)s=e[a],s!=0&&(u[a]=l[s+16]++);var d=0;for(a=0;a<c;++a)if(d=e[a],d!=0)for(s=he(u[a],r)>>r-d,o=(1<<r+4-d)-1;o>=0;--o)t[s|o<<d]=d&15|a<<4;return r}var ke=fe?new Uint16Array(512):De(512),Ae=fe?new Uint16Array(32):De(32);if(!fe){for(var je=0;je<512;++je)ke[je]=0;for(je=0;je<32;++je)Ae[je]=0}(function(){for(var e=[],t=0;t<32;t++)e.push(5);Oe(e,Ae,32);var n=[];for(t=0;t<=143;t++)n.push(8);for(;t<=255;t++)n.push(9);for(;t<=279;t++)n.push(7);for(;t<=287;t++)n.push(8);Oe(n,ke,288)})();var Me=(function(){for(var e=fe?new Uint8Array(32768):[],t=0,n=0;t<ue.length-1;++t)for(;n<ue[t+1];++n)e[n]=t;for(;n<32768;++n)e[n]=29;var r=fe?new Uint8Array(259):[];for(t=0,n=0;t<le.length-1;++t)for(;n<le[t+1];++n)r[n]=t;function i(e,t){for(var n=0;n<e.length;){var r=Math.min(65535,e.length-n),i=n+r==e.length;for(t.write_shift(1,+i),t.write_shift(2,r),t.write_shift(2,~r&65535);r-- >0;)t[t.l++]=e[n++]}return t.l}function a(t,n){for(var i=0,a=0,o=fe?new Uint16Array(32768):[];a<t.length;){var s=Math.min(65535,t.length-a);if(s<10){for(i=Se(n,i,+(a+s==t.length)),i&7&&(i+=8-(i&7)),n.l=i/8|0,n.write_shift(2,s),n.write_shift(2,~s&65535);s-- >0;)n[n.l++]=t[a++];i=n.l*8;continue}i=Se(n,i,+(a+s==t.length)+2);for(var c=0;s-- >0;){var l=t[a];c=(c<<5^l)&32767;var u=-1,d=0;if((u=o[c])&&(u|=a&-32768,u>a&&(u-=32768),u<a))for(;t[u+d]==t[a+d]&&d<250;)++d;if(d>2){l=r[d],l<=22?i=we(n,i,pe[l+1]>>1)-1:(we(n,i,3),i+=5,we(n,i,pe[l-23]>>5),i+=3);var f=l<8?0:l-4>>2;f>0&&(Te(n,i,d-le[l]),i+=f),l=e[a-u],i=we(n,i,pe[l]>>3),i-=3;var p=l<4?0:l-2>>1;p>0&&(Te(n,i,a-u-ue[l]),i+=p);for(var m=0;m<d;++m)o[c]=a&32767,c=(c<<5^t[a])&32767,++a;s-=d-1}else l<=143?l+=48:i=Ce(n,i,1),i=we(n,i,pe[l]),o[c]=a&32767,++a}i=we(n,i,0)-1}return n.l=(i+7)/8|0,n.l}return function(e,t){return e.length<8?i(e,t):a(e,t)}})();function Ne(e){var t=q(50+Math.floor(e.length*1.1)),n=Me(e,t);return t.slice(0,n)}var Pe=fe?new Uint16Array(32768):De(32768),Fe=fe?new Uint16Array(32768):De(32768),Ie=fe?new Uint16Array(128):De(128),Le=1,Re=1;function ze(e,t){var n=ye(e,t)+257;t+=5;var r=ye(e,t)+1;t+=5;var i=ve(e,t)+4;t+=4;for(var a=0,o=fe?new Uint8Array(19):De(19),s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],c=1,l=fe?new Uint8Array(8):De(8),u=fe?new Uint8Array(8):De(8),d=o.length,f=0;f<i;++f)o[ce[f]]=a=_e(e,t),c<a&&(c=a),l[a]++,t+=3;var p=0;for(l[0]=0,f=1;f<=c;++f)u[f]=p=p+l[f-1]<<1;for(f=0;f<d;++f)(p=o[f])!=0&&(s[f]=u[p]++);var m=0;for(f=0;f<d;++f)if(m=o[f],m!=0){p=pe[s[f]]>>8-m;for(var h=(1<<7-m)-1;h>=0;--h)Ie[p|h<<m]=m&7|f<<3}var g=[];for(c=1;g.length<n+r;)switch(p=Ie[be(e,t)],t+=p&7,p>>>=3){case 16:for(a=3+ge(e,t),t+=2,p=g[g.length-1];a-- >0;)g.push(p);break;case 17:for(a=3+_e(e,t),t+=3;a-- >0;)g.push(0);break;case 18:for(a=11+be(e,t),t+=7;a-- >0;)g.push(0);break;default:g.push(p),c<p&&(c=p);break}var _=g.slice(0,n),v=g.slice(n);for(f=n;f<286;++f)_[f]=0;for(f=r;f<30;++f)v[f]=0;return Le=Oe(_,Pe,286),Re=Oe(v,Fe,30),t}function Be(e,t){if(e[0]==3&&!(e[1]&3))return[ms(t),2];for(var n=0,r=0,i=hs(t||1<<18),a=0,o=i.length>>>0,s=0,c=0;!(r&1);){if(r=_e(e,n),n+=3,r>>>1)r>>1==1?(s=9,c=5):(n=ze(e,n),s=Le,c=Re);else{n&7&&(n+=8-(n&7));var l=e[n>>>3]|e[(n>>>3)+1]<<8;if(n+=32,l>0)for(!t&&o<a+l&&(i=Ee(i,a+l),o=i.length);l-- >0;)i[a++]=e[n>>>3],n+=8;continue}for(;;){!t&&o<a+32767&&(i=Ee(i,a+32767),o=i.length);var u=xe(e,n,s),d=r>>>1==1?ke[u]:Pe[u];if(n+=d&15,d>>>=4,!(d>>>8&255))i[a++]=d;else if(d==256)break;else{d-=257;var f=d<8?0:d-4>>2;f>5&&(f=0);var p=a+le[d];f>0&&(p+=xe(e,n,f),n+=f),u=xe(e,n,c),d=r>>>1==1?Ae[u]:Fe[u],n+=d&15,d>>>=4;var m=d<4?0:d-2>>1,h=ue[d];for(m>0&&(h+=xe(e,n,m),n+=m),!t&&o<p&&(i=Ee(i,p+100),o=i.length);a<p;)i[a]=i[a-h],++a}}}return t?[i,n+7>>>3]:[i.slice(0,a),n+7>>>3]}function Ve(e,t){var n=Be(e.slice(e.l||0),t);return e.l+=n[1],n[0]}function He(e,t){if(e)typeof console<`u`&&console.error(t);else throw Error(t)}function Ue(e,t){var n=e;du(n,0);var r={FileIndex:[],FullPaths:[]};S(r,{root:t.root});for(var i=n.length-4;(n[i]!=80||n[i+1]!=75||n[i+2]!=5||n[i+3]!=6)&&i>=0;)--i;n.l=i+4,n.l+=4;var a=n.read_shift(2);for(n.l+=6,n.l=n.read_shift(4),i=0;i<a;++i){n.l+=20;var s=n.read_shift(4),c=n.read_shift(4),l=n.read_shift(2),u=n.read_shift(2),d=n.read_shift(2);n.l+=8;var f=n.read_shift(4),p=o(n.slice(n.l+l,n.l+l+u));n.l+=l+u+d;var m=n.l;n.l=f+4,We(n,s,c,r,p),n.l=m}return r}function We(e,t,n,r,i){e.l+=2;var s=e.read_shift(2),c=e.read_shift(2),l=a(e);if(s&8257)throw Error(`Unsupported ZIP encryption`);for(var u=e.read_shift(4),d=e.read_shift(4),f=e.read_shift(4),p=e.read_shift(2),m=e.read_shift(2),h=``,g=0;g<p;++g)h+=String.fromCharCode(e[e.l++]);if(m){var _=o(e.slice(e.l,e.l+m));(_[21589]||{}).mt&&(l=_[21589].mt),((i||{})[21589]||{}).mt&&(l=i[21589].mt)}e.l+=m;var v=e.slice(e.l,e.l+d);switch(c){case 8:v=oe(e,f);break;case 0:break;default:throw Error(`Unsupported ZIP Compression method `+c)}var y=!1;s&8&&(u=e.read_shift(4),u==134695760&&(u=e.read_shift(4),y=!0),d=e.read_shift(4),f=e.read_shift(4)),d!=t&&He(y,`Bad compressed size: `+t+` != `+d),f!=n&&He(y,`Bad uncompressed size: `+n+` != `+f),tt(r,h,v,{unsafe:!0,mt:l})}function Ge(e,t){var n=t||{},r=[],a=[],o=q(1),s=n.compression?8:0,c=0,l=0,u=0,d=0,f=0,p=e.FullPaths[0],m=p,h=e.FileIndex[0],g=[],_=0;for(l=1;l<e.FullPaths.length;++l)if(m=e.FullPaths[l].slice(p.length),h=e.FileIndex[l],!(!h.size||!h.content||m==`Sh33tJ5`)){var v=d,y=q(m.length);for(u=0;u<m.length;++u)y.write_shift(1,m.charCodeAt(u)&127);y=y.slice(0,y.l),g[f]=Fc.buf(h.content,0);var b=h.content;s==8&&(b=se(b)),o=q(30),o.write_shift(4,67324752),o.write_shift(2,20),o.write_shift(2,c),o.write_shift(2,s),h.mt?i(o,h.mt):o.write_shift(4,0),o.write_shift(-4,c&8?0:g[f]),o.write_shift(4,c&8?0:b.length),o.write_shift(4,c&8?0:h.content.length),o.write_shift(2,y.length),o.write_shift(2,0),d+=o.length,r.push(o),d+=y.length,r.push(y),d+=b.length,r.push(b),c&8&&(o=q(12),o.write_shift(-4,g[f]),o.write_shift(4,b.length),o.write_shift(4,h.content.length),d+=o.l,r.push(o)),o=q(46),o.write_shift(4,33639248),o.write_shift(2,0),o.write_shift(2,20),o.write_shift(2,c),o.write_shift(2,s),o.write_shift(4,0),o.write_shift(-4,g[f]),o.write_shift(4,b.length),o.write_shift(4,h.content.length),o.write_shift(2,y.length),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(4,0),o.write_shift(4,v),_+=o.l,a.push(o),_+=y.length,a.push(y),++f}return o=q(22),o.write_shift(4,101010256),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(2,f),o.write_shift(2,f),o.write_shift(4,_),o.write_shift(4,d),o.write_shift(2,0),bs([bs(r),bs(a),o])}var Ke={htm:`text/html`,xml:`text/xml`,gif:`image/gif`,jpg:`image/jpeg`,png:`image/png`,mso:`application/x-mso`,thmx:`application/vnd.ms-officetheme`,sh33tj5:`application/octet-stream`};function qe(e,t){if(e.ctype)return e.ctype;var n=e.name||``,r=n.match(/\.([^\.]+)$/);return r&&Ke[r[1]]||t&&(r=(n=t).match(/[\.\\]([^\.\\])+$/),r&&Ke[r[1]])?Ke[r[1]]:`application/octet-stream`}function Je(e){for(var t=ds(e),n=[],r=0;r<t.length;r+=76)n.push(t.slice(r,r+76));return n.join(`\r
`)+`\r
`}function Ye(e){var t=e.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g,function(e){var t=e.charCodeAt(0).toString(16).toUpperCase();return`=`+(t.length==1?`0`+t:t)});t=t.replace(/ $/gm,`=20`).replace(/\t$/gm,`=09`),t.charAt(0)==`
`&&(t=`=0D`+t.slice(1)),t=t.replace(/\r(?!\n)/gm,`=0D`).replace(/\n\n/gm,`
=0A`).replace(/([^\r\n])\n/gm,`$1=0A`);for(var n=[],r=t.split(`\r
`),i=0;i<r.length;++i){var a=r[i];if(a.length==0){n.push(``);continue}for(var o=0;o<a.length;){var s=76,c=a.slice(o,o+s);c.charAt(s-1)==`=`?s--:c.charAt(s-2)==`=`?s-=2:c.charAt(s-3)==`=`&&(s-=3),c=a.slice(o,o+s),o+=s,o<a.length&&(c+=`=`),n.push(c)}}return n.join(`\r
`)}function Xe(e){for(var t=[],n=0;n<e.length;++n){for(var r=e[n];n<=e.length&&r.charAt(r.length-1)==`=`;)r=r.slice(0,r.length-1)+e[++n];t.push(r)}for(var i=0;i<t.length;++i)t[i]=t[i].replace(/[=][0-9A-Fa-f]{2}/g,function(e){return String.fromCharCode(parseInt(e.slice(1),16))});return gs(t.join(`\r
`))}function Ze(e,t,n){for(var r=``,i=``,a=``,o,s=0;s<10;++s){var c=t[s];if(!c||c.match(/^\s*$/))break;var l=c.match(/^(.*?):\s*([^\s].*)$/);if(l)switch(l[1].toLowerCase()){case`content-location`:r=l[2].trim();break;case`content-type`:a=l[2].trim();break;case`content-transfer-encoding`:i=l[2].trim();break}}switch(++s,i.toLowerCase()){case`base64`:o=gs(fs(t.slice(s).join(``)));break;case`quoted-printable`:o=Xe(t.slice(s));break;default:throw Error(`Unsupported Content-Transfer-Encoding `+i)}var u=tt(e,r.slice(n.length),o,{unsafe:!0});a&&(u.ctype=a)}function Qe(e,t){if(ie(e.slice(0,13)).toLowerCase()!=`mime-version:`)throw Error(`Unsupported MAD header`);var n=t&&t.root||``,r=(z&&Buffer.isBuffer(e)?e.toString(`binary`):ie(e)).split(`\r
`),i=0,a=``;for(i=0;i<r.length;++i)if(a=r[i],/^Content-Location:/i.test(a)&&(a=a.slice(a.indexOf(`file`)),n||=a.slice(0,a.lastIndexOf(`/`)+1),a.slice(0,n.length)!=n))for(;n.length>0&&(n=n.slice(0,n.length-1),n=n.slice(0,n.lastIndexOf(`/`)+1),a.slice(0,n.length)!=n););var o=(r[1]||``).match(/boundary="(.*?)"/);if(!o)throw Error(`MAD cannot find boundary`);var s=`--`+(o[1]||``),c={FileIndex:[],FullPaths:[]};S(c);var l,u=0;for(i=0;i<r.length;++i){var d=r[i];d!==s&&d!==s+`--`||(u++&&Ze(c,r.slice(l,i),n),l=i)}return c}function $e(e,t){var n=t||{},r=n.boundary||`SheetJS`;r=`------=`+r;for(var i=[`MIME-Version: 1.0`,`Content-Type: multipart/related; boundary="`+r.slice(2)+`"`,``,``,``],a=e.FullPaths[0],o=a,s=e.FileIndex[0],c=1;c<e.FullPaths.length;++c)if(o=e.FullPaths[c].slice(a.length),s=e.FileIndex[c],!(!s.size||!s.content||o==`Sh33tJ5`)){o=o.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g,function(e){return`_x`+e.charCodeAt(0).toString(16)+`_`}).replace(/[\u0080-\uFFFF]/g,function(e){return`_u`+e.charCodeAt(0).toString(16)+`_`});for(var l=s.content,u=z&&Buffer.isBuffer(l)?l.toString(`binary`):ie(l),d=0,f=Math.min(1024,u.length),p=0,m=0;m<=f;++m)(p=u.charCodeAt(m))>=32&&p<128&&++d;var h=d>=f*4/5;i.push(r),i.push(`Content-Location: `+(n.root||`file:///C:/SheetJS/`)+o),i.push(`Content-Transfer-Encoding: `+(h?`quoted-printable`:`base64`)),i.push(`Content-Type: `+qe(s,o)),i.push(``),i.push(h?Ye(u):Je(u))}return i.push(r+`--\r
`),i.join(`\r
`)}function et(e){var t={};return S(t,e),t}function tt(e,t,n,i){var a=i&&i.unsafe;a||S(e);var o=!a&&Ic.find(e,t);if(!o){var s=e.FullPaths[0];t.slice(0,s.length)==s?s=t:(s.slice(-1)!=`/`&&(s+=`/`),s=(s+t).replace(`//`,`/`)),o={name:r(t),type:2},e.FileIndex.push(o),e.FullPaths.push(s),a||Ic.utils.cfb_gc(e)}return o.content=n,o.size=n?n.length:0,i&&(i.CLSID&&(o.clsid=i.CLSID),i.mt&&(o.mt=i.mt),i.ct&&(o.ct=i.ct)),o}function nt(e,t){S(e);var n=Ic.find(e,t);if(n){for(var r=0;r<e.FileIndex.length;++r)if(e.FileIndex[r]==n)return e.FileIndex.splice(r,1),e.FullPaths.splice(r,1),!0}return!1}function rt(e,t,n){S(e);var i=Ic.find(e,t);if(i){for(var a=0;a<e.FileIndex.length;++a)if(e.FileIndex[a]==i)return e.FileIndex[a].name=r(n),e.FullPaths[a]=n,!0}return!1}function it(e){w(e,!0)}return e.find=E,e.read=x,e.parse=l,e.write=ae,e.writeFile=re,e.utils={cfb_new:et,cfb_add:tt,cfb_del:nt,cfb_mov:rt,cfb_gc:it,ReadShift:au,CheckField:uu,prep_blob:du,bconcat:bs,use_zlib:j,_deflateRaw:Ne,_inflateRaw:Ve,consts:ne},e})(),Lc=void 0;function Rc(e){return typeof e==`string`?_s(e):Array.isArray(e)?ys(e):e}function zc(e,t,n){if(Lc!==void 0&&Lc.writeFileSync)return n?Lc.writeFileSync(e,t,n):Lc.writeFileSync(e,t);if(typeof Deno<`u`){if(n&&typeof t==`string`)switch(n){case`utf8`:t=new TextEncoder(n).encode(t);break;case`binary`:t=_s(t);break;default:throw Error(`Unsupported encoding `+n)}return Deno.writeFileSync(e,t)}var r=n==`utf8`?Sl(t):t;if(typeof IE_SaveFile<`u`)return IE_SaveFile(r,e);if(typeof Blob<`u`){var i=new Blob([Rc(r)],{type:`application/octet-stream`});if(typeof navigator<`u`&&navigator.msSaveBlob)return navigator.msSaveBlob(i,e);if(typeof saveAs<`u`)return saveAs(i,e);if(typeof URL<`u`&&typeof document<`u`&&document.createElement&&URL.createObjectURL){var a=URL.createObjectURL(i);if(typeof chrome==`object`&&typeof(chrome.downloads||{}).download==`function`)return URL.revokeObjectURL&&typeof setTimeout<`u`&&setTimeout(function(){URL.revokeObjectURL(a)},6e4),chrome.downloads.download({url:a,filename:e,saveAs:!0});var o=document.createElement(`a`);if(o.download!=null)return o.download=e,o.href=a,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL&&typeof setTimeout<`u`&&setTimeout(function(){URL.revokeObjectURL(a)},6e4),a}}if(typeof $<`u`&&typeof File<`u`&&typeof Folder<`u`)try{var s=File(e);return s.open(`w`),s.encoding=`binary`,Array.isArray(t)&&(t=vs(t)),s.write(t),s.close(),t}catch(e){if(!e.message||!e.message.match(/onstruct/))throw e}throw Error(`cannot save file `+e)}function Bc(e){for(var t=Object.keys(e),n=[],r=0;r<t.length;++r)Object.prototype.hasOwnProperty.call(e,t[r])&&n.push(t[r]);return n}function Vc(e,t){for(var n=[],r=Bc(e),i=0;i!==r.length;++i)n[e[r[i]][t]]??(n[e[r[i]][t]]=r[i]);return n}function Hc(e){for(var t=[],n=Bc(e),r=0;r!==n.length;++r)t[e[n[r]]]=n[r];return t}function Uc(e){for(var t=[],n=Bc(e),r=0;r!==n.length;++r)t[e[n[r]]]=parseInt(n[r],10);return t}function Wc(e){for(var t=[],n=Bc(e),r=0;r!==n.length;++r)t[e[n[r]]]??(t[e[n[r]]]=[]),t[e[n[r]]].push(n[r]);return t}var Gc=new Date(1899,11,30,0,0,0);function Kc(e,t){var n=e.getTime();t&&(n-=1462*24*60*60*1e3);var r=Gc.getTime()+(e.getTimezoneOffset()-Gc.getTimezoneOffset())*6e4;return(n-r)/(1440*60*1e3)}var qc=new Date,Jc=Gc.getTime()+(qc.getTimezoneOffset()-Gc.getTimezoneOffset())*6e4,Yc=qc.getTimezoneOffset();function Xc(e){var t=new Date;return t.setTime(e*24*60*60*1e3+Jc),t.getTimezoneOffset()!==Yc&&t.setTime(t.getTime()+(t.getTimezoneOffset()-Yc)*6e4),t}var Zc=new Date(`2017-02-19T19:06:09.000Z`),Qc=isNaN(Zc.getFullYear())?new Date(`2/19/17`):Zc,$c=Qc.getFullYear()==2017;function el(e,t){var n=new Date(e);if($c)return t>0?n.setTime(n.getTime()+n.getTimezoneOffset()*60*1e3):t<0&&n.setTime(n.getTime()-n.getTimezoneOffset()*60*1e3),n;if(e instanceof Date)return e;if(Qc.getFullYear()==1917&&!isNaN(n.getFullYear())){var r=n.getFullYear();return e.indexOf(``+r)>-1||n.setFullYear(n.getFullYear()+100),n}var i=e.match(/\d+/g)||[`2017`,`2`,`19`,`0`,`0`,`0`],a=new Date(+i[0],i[1]-1,+i[2],+i[3]||0,+i[4]||0,+i[5]||0);return e.indexOf(`Z`)>-1&&(a=new Date(a.getTime()-a.getTimezoneOffset()*60*1e3)),a}function tl(e,t){if(z&&Buffer.isBuffer(e)){if(t){if(e[0]==255&&e[1]==254)return Sl(e.slice(2).toString(`utf16le`));if(e[1]==254&&e[2]==255)return Sl(is(e.slice(2).toString(`binary`)))}return e.toString(`binary`)}if(typeof TextDecoder<`u`)try{if(t){if(e[0]==255&&e[1]==254)return Sl(new TextDecoder(`utf-16le`).decode(e.slice(2)));if(e[0]==254&&e[1]==255)return Sl(new TextDecoder(`utf-16be`).decode(e.slice(2)))}var n={"€":``,"‚":``,ƒ:``,"„":``,"…":``,"†":``,"‡":``,ˆ:``,"‰":``,Š:``,"‹":``,Œ:``,Ž:``,"‘":``,"’":``,"“":``,"”":``,"•":``,"–":``,"—":``,"˜":``,"™":``,š:``,"›":``,œ:``,ž:``,Ÿ:``};return Array.isArray(e)&&(e=new Uint8Array(e)),new TextDecoder(`latin1`).decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g,function(e){return n[e]||e})}catch{}for(var r=[],i=0;i!=e.length;++i)r.push(String.fromCharCode(e[i]));return r.join(``)}function nl(e){if(typeof JSON<`u`&&!Array.isArray(e))return JSON.parse(JSON.stringify(e));if(typeof e!=`object`||!e)return e;if(e instanceof Date)return new Date(e.getTime());var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=nl(e[n]));return t}function rl(e,t){for(var n=``;n.length<t;)n+=e;return n}function il(e){var t=Number(e);if(!isNaN(t))return isFinite(t)?t:NaN;if(!/\d/.test(e))return t;var n=1,r=e.replace(/([\d]),([\d])/g,`$1$2`).replace(/[$]/g,``).replace(/[%]/g,function(){return n*=100,``});return!isNaN(t=Number(r))||(r=r.replace(/[(](.*)[)]/,function(e,t){return n=-n,t}),!isNaN(t=Number(r)))?t/n:t}var al=[`january`,`february`,`march`,`april`,`may`,`june`,`july`,`august`,`september`,`october`,`november`,`december`];function ol(e){var t=new Date(e),n=new Date(NaN),r=t.getYear(),i=t.getMonth(),a=t.getDate();if(isNaN(a))return n;var o=e.toLowerCase();if(o.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)){if(o=o.replace(/[^a-z]/g,``).replace(/([^a-z]|^)[ap]m?([^a-z]|$)/,``),o.length>3&&al.indexOf(o)==-1)return n}else if(o.match(/[a-z]/))return n;return r<0||r>8099?n:(i>0||a>1)&&r!=101?t:e.match(/[^-0-9:,\/\\]/)?n:t}function B(e,t,n){if(e.FullPaths){if(typeof n==`string`){var r=z?ps(n):xs(n);return Ic.utils.cfb_add(e,t,r)}Ic.utils.cfb_add(e,t,n)}else e.file(t,n)}function sl(){return Ic.utils.cfb_new()}var V=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`,cl=Hc({"&quot;":`"`,"&apos;":`'`,"&gt;":`>`,"&lt;":`<`,"&amp;":`&`}),ll=/[&<>'"]/g,ul=/[\u0000-\u0008\u000b-\u001f]/g;function H(e){return(e+``).replace(ll,function(e){return cl[e]}).replace(ul,function(e){return`_x`+(`000`+e.charCodeAt(0).toString(16)).slice(-4)+`_`})}function dl(e){return H(e).replace(/ /g,`_x0020_`)}var fl=/[\u0000-\u001f]/g;function pl(e){return(e+``).replace(ll,function(e){return cl[e]}).replace(/\n/g,`<br/>`).replace(fl,function(e){return`&#x`+(`000`+e.charCodeAt(0).toString(16)).slice(-4)+`;`})}function ml(e){return(e+``).replace(ll,function(e){return cl[e]}).replace(fl,function(e){return`&#x`+e.charCodeAt(0).toString(16).toUpperCase()+`;`})}function hl(e){return e.replace(/(\r\n|[\r\n])/g,`&#10;`)}function gl(e){switch(e){case 1:case!0:case`1`:case`true`:case`TRUE`:return!0;default:return!1}}function _l(e){for(var t=``,n=0,r=0,i=0,a=0,o=0,s=0;n<e.length;){if(r=e.charCodeAt(n++),r<128){t+=String.fromCharCode(r);continue}if(i=e.charCodeAt(n++),r>191&&r<224){o=(r&31)<<6,o|=i&63,t+=String.fromCharCode(o);continue}if(a=e.charCodeAt(n++),r<240){t+=String.fromCharCode((r&15)<<12|(i&63)<<6|a&63);continue}o=e.charCodeAt(n++),s=((r&7)<<18|(i&63)<<12|(a&63)<<6|o&63)-65536,t+=String.fromCharCode(55296+(s>>>10&1023)),t+=String.fromCharCode(56320+(s&1023))}return t}function vl(e){var t=ms(2*e.length),n,r,i=1,a=0,o=0,s;for(r=0;r<e.length;r+=i)i=1,(s=e.charCodeAt(r))<128?n=s:s<224?(n=(s&31)*64+(e.charCodeAt(r+1)&63),i=2):s<240?(n=(s&15)*4096+(e.charCodeAt(r+1)&63)*64+(e.charCodeAt(r+2)&63),i=3):(i=4,n=(s&7)*262144+(e.charCodeAt(r+1)&63)*4096+(e.charCodeAt(r+2)&63)*64+(e.charCodeAt(r+3)&63),n-=65536,o=55296+(n>>>10&1023),n=56320+(n&1023)),o!==0&&(t[a++]=o&255,t[a++]=o>>>8,o=0),t[a++]=n%256,t[a++]=n>>>8;return t.slice(0,a).toString(`ucs2`)}function yl(e){return ps(e,`binary`).toString(`utf8`)}var bl=`foo bar bazâð£`,xl=z&&(yl(bl)==_l(bl)&&yl||vl(bl)==_l(bl)&&vl)||_l,Sl=z?function(e){return ps(e,`utf8`).toString(`binary`)}:function(e){for(var t=[],n=0,r=0,i=0;n<e.length;)switch(r=e.charCodeAt(n++),!0){case r<128:t.push(String.fromCharCode(r));break;case r<2048:t.push(String.fromCharCode(192+(r>>6))),t.push(String.fromCharCode(128+(r&63)));break;case r>=55296&&r<57344:r-=55296,i=e.charCodeAt(n++)-56320+(r<<10),t.push(String.fromCharCode(240+(i>>18&7))),t.push(String.fromCharCode(144+(i>>12&63))),t.push(String.fromCharCode(128+(i>>6&63))),t.push(String.fromCharCode(128+(i&63)));break;default:t.push(String.fromCharCode(224+(r>>12))),t.push(String.fromCharCode(128+(r>>6&63))),t.push(String.fromCharCode(128+(r&63)))}return t.join(``)},Cl=(function(){var e=[[`nbsp`,` `],[`middot`,`·`],[`quot`,`"`],[`apos`,`'`],[`gt`,`>`],[`lt`,`<`],[`amp`,`&`]].map(function(e){return[RegExp(`&`+e[0]+`;`,`ig`),e[1]]});return function(t){for(var n=t.replace(/^[\t\n\r ]+/,``).replace(/[\t\n\r ]+$/,``).replace(/>\s+/g,`>`).replace(/\s+</g,`<`).replace(/[\t\n\r ]+/g,` `).replace(/<\s*[bB][rR]\s*\/?>/g,`
`).replace(/<[^>]*>/g,``),r=0;r<e.length;++r)n=n.replace(e[r][0],e[r][1]);return n}})(),wl=/(^\s|\s$|\n)/;function Tl(e,t){return`<`+e+(t.match(wl)?` xml:space="preserve"`:``)+`>`+t+`</`+e+`>`}function El(e){return Bc(e).map(function(t){return` `+t+`="`+e[t]+`"`}).join(``)}function U(e,t,n){return`<`+e+(n==null?``:El(n))+(t==null?`/`:(t.match(wl)?` xml:space="preserve"`:``)+`>`+t+`</`+e)+`>`}function Dl(e,t){try{return e.toISOString().replace(/\.\d*/,``)}catch(e){if(t)throw e}return``}function Ol(e,t){switch(typeof e){case`string`:var n=U(`vt:lpwstr`,H(e));return t&&(n=n.replace(/&quot;/g,`_x0022_`)),n;case`number`:return U((e|0)==e?`vt:i4`:`vt:r8`,H(String(e)));case`boolean`:return U(`vt:bool`,e?`true`:`false`)}if(e instanceof Date)return U(`vt:filetime`,Dl(e));throw Error(`Unable to serialize `+e)}var kl={CORE_PROPS:`http://schemas.openxmlformats.org/package/2006/metadata/core-properties`,CUST_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/custom-properties`,EXT_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/extended-properties`,CT:`http://schemas.openxmlformats.org/package/2006/content-types`,RELS:`http://schemas.openxmlformats.org/package/2006/relationships`,TCMNT:`http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments`,dc:`http://purl.org/dc/elements/1.1/`,dcterms:`http://purl.org/dc/terms/`,dcmitype:`http://purl.org/dc/dcmitype/`,mx:`http://schemas.microsoft.com/office/mac/excel/2008/main`,r:`http://schemas.openxmlformats.org/officeDocument/2006/relationships`,sjs:`http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties`,vt:`http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes`,xsi:`http://www.w3.org/2001/XMLSchema-instance`,xsd:`http://www.w3.org/2001/XMLSchema`},Al=[`http://schemas.openxmlformats.org/spreadsheetml/2006/main`,`http://purl.oclc.org/ooxml/spreadsheetml/main`,`http://schemas.microsoft.com/office/excel/2006/main`,`http://schemas.microsoft.com/office/excel/2006/2`],jl={o:`urn:schemas-microsoft-com:office:office`,x:`urn:schemas-microsoft-com:office:excel`,ss:`urn:schemas-microsoft-com:office:spreadsheet`,dt:`uuid:C2F41010-65B3-11d1-A29F-00AA00C14882`,mv:`http://macVmlSchemaUri`,v:`urn:schemas-microsoft-com:vml`,html:`http://www.w3.org/TR/REC-html40`};function Ml(e,t){for(var n=1-2*(e[t+7]>>>7),r=((e[t+7]&127)<<4)+(e[t+6]>>>4&15),i=e[t+6]&15,a=5;a>=0;--a)i=i*256+e[t+a];return r==2047?i==0?n*(1/0):NaN:(r==0?r=-1022:(r-=1023,i+=2**52),n*2**(r-52)*i)}function Nl(e,t,n){var r=(t<0||1/t==-1/0)<<7,i=0,a=0,o=r?-t:t;isFinite(o)?o==0?i=a=0:(i=Math.floor(Math.log(o)/Math.LN2),a=o*2**(52-i),i<=-1023&&(!isFinite(a)||a<2**52)?i=-1022:(a-=2**52,i+=1023)):(i=2047,a=isNaN(t)?26985:0);for(var s=0;s<=5;++s,a/=256)e[n+s]=a&255;e[n+6]=(i&15)<<4|a&15,e[n+7]=i>>4|r}var Pl=function(e){for(var t=[],n=10240,r=0;r<e[0].length;++r)if(e[0][r])for(var i=0,a=e[0][r].length;i<a;i+=n)t.push.apply(t,e[0][r].slice(i,i+n));return t},Fl=z?function(e){return e[0].length>0&&Buffer.isBuffer(e[0][0])?Buffer.concat(e[0].map(function(e){return Buffer.isBuffer(e)?e:ps(e)})):Pl(e)}:Pl,Il=function(e,t,n){for(var r=[],i=t;i<n;i+=2)r.push(String.fromCharCode(eu(e,i)));return r.join(``).replace(Ss,``)},Ll=z?function(e,t,n){return Buffer.isBuffer(e)?e.toString(`utf16le`,t,n).replace(Ss,``):Il(e,t,n)}:Il,Rl=function(e,t,n){for(var r=[],i=t;i<t+n;++i)r.push((`0`+e[i].toString(16)).slice(-2));return r.join(``)},zl=z?function(e,t,n){return Buffer.isBuffer(e)?e.toString(`hex`,t,t+n):Rl(e,t,n)}:Rl,Bl=function(e,t,n){for(var r=[],i=t;i<n;i++)r.push(String.fromCharCode($l(e,i)));return r.join(``)},W=z?function(e,t,n){return Buffer.isBuffer(e)?e.toString(`utf8`,t,n):Bl(e,t,n)}:Bl,Vl=function(e,t){var n=nu(e,t);return n>0?W(e,t+4,t+4+n-1):``},G=Vl,K=function(e,t){var n=nu(e,t);return n>0?W(e,t+4,t+4+n-1):``},Hl=K,Ul=function(e,t){var n=2*nu(e,t);return n>0?W(e,t+4,t+4+n-1):``},Wl=Ul,Gl=function(e,t){var n=nu(e,t);return n>0?Ll(e,t+4,t+4+n):``},Kl=Gl,ql=function(e,t){var n=nu(e,t);return n>0?W(e,t+4,t+4+n):``},Jl=ql,Yl=function(e,t){return Ml(e,t)},Xl=Yl,Zl=function(e){return Array.isArray(e)||typeof Uint8Array<`u`&&e instanceof Uint8Array};z&&(G=function(e,t){if(!Buffer.isBuffer(e))return Vl(e,t);var n=e.readUInt32LE(t);return n>0?e.toString(`utf8`,t+4,t+4+n-1):``},Hl=function(e,t){if(!Buffer.isBuffer(e))return K(e,t);var n=e.readUInt32LE(t);return n>0?e.toString(`utf8`,t+4,t+4+n-1):``},Wl=function(e,t){if(!Buffer.isBuffer(e))return Ul(e,t);var n=2*e.readUInt32LE(t);return e.toString(`utf16le`,t+4,t+4+n-1)},Kl=function(e,t){if(!Buffer.isBuffer(e))return Gl(e,t);var n=e.readUInt32LE(t);return e.toString(`utf16le`,t+4,t+4+n)},Jl=function(e,t){if(!Buffer.isBuffer(e))return ql(e,t);var n=e.readUInt32LE(t);return e.toString(`utf8`,t+4,t+4+n)},Xl=function(e,t){return Buffer.isBuffer(e)?e.readDoubleLE(t):Yl(e,t)},Zl=function(e){return Buffer.isBuffer(e)||Array.isArray(e)||typeof Uint8Array<`u`&&e instanceof Uint8Array});function Ql(){Ll=function(e,t,n){return ss.utils.decode(1200,e.slice(t,n)).replace(Ss,``)},W=function(e,t,n){return ss.utils.decode(65001,e.slice(t,n))},G=function(e,t){var n=nu(e,t);return n>0?ss.utils.decode(Zo,e.slice(t+4,t+4+n-1)):``},Hl=function(e,t){var n=nu(e,t);return n>0?ss.utils.decode(Xo,e.slice(t+4,t+4+n-1)):``},Wl=function(e,t){var n=2*nu(e,t);return n>0?ss.utils.decode(1200,e.slice(t+4,t+4+n-1)):``},Kl=function(e,t){var n=nu(e,t);return n>0?ss.utils.decode(1200,e.slice(t+4,t+4+n)):``},Jl=function(e,t){var n=nu(e,t);return n>0?ss.utils.decode(65001,e.slice(t+4,t+4+n)):``}}ss!==void 0&&Ql();var $l=function(e,t){return e[t]},eu=function(e,t){return e[t+1]*256+e[t]},tu=function(e,t){var n=e[t+1]*256+e[t];return n<32768?n:(65535-n+1)*-1},nu=function(e,t){return e[t+3]*(1<<24)+(e[t+2]<<16)+(e[t+1]<<8)+e[t]},ru=function(e,t){return e[t+3]<<24|e[t+2]<<16|e[t+1]<<8|e[t]},iu=function(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]};function au(e,t){var n=``,r,i,a=[],o,s,c,l;switch(t){case`dbcs`:if(l=this.l,z&&Buffer.isBuffer(this))n=this.slice(this.l,this.l+2*e).toString(`utf16le`);else for(c=0;c<e;++c)n+=String.fromCharCode(eu(this,l)),l+=2;e*=2;break;case`utf8`:n=W(this,this.l,this.l+e);break;case`utf16le`:e*=2,n=Ll(this,this.l,this.l+e);break;case`wstr`:if(ss!==void 0)n=ss.utils.decode(Xo,this.slice(this.l,this.l+2*e));else return au.call(this,e,`dbcs`);e=2*e;break;case`lpstr-ansi`:n=G(this,this.l),e=4+nu(this,this.l);break;case`lpstr-cp`:n=Hl(this,this.l),e=4+nu(this,this.l);break;case`lpwstr`:n=Wl(this,this.l),e=4+2*nu(this,this.l);break;case`lpp4`:e=4+nu(this,this.l),n=Kl(this,this.l),e&2&&(e+=2);break;case`8lpp4`:e=4+nu(this,this.l),n=Jl(this,this.l),e&3&&(e+=4-(e&3));break;case`cstr`:for(e=0,n=``;(o=$l(this,this.l+ e++))!==0;)a.push(as(o));n=a.join(``);break;case`_wstr`:for(e=0,n=``;(o=eu(this,this.l+e))!==0;)a.push(as(o)),e+=2;e+=2,n=a.join(``);break;case`dbcs-cont`:for(n=``,l=this.l,c=0;c<e;++c){if(this.lens&&this.lens.indexOf(l)!==-1)return o=$l(this,l),this.l=l+1,s=au.call(this,e-c,o?`dbcs-cont`:`sbcs-cont`),a.join(``)+s;a.push(as(eu(this,l))),l+=2}n=a.join(``),e*=2;break;case`cpstr`:if(ss!==void 0){n=ss.utils.decode(Xo,this.slice(this.l,this.l+e));break}case`sbcs-cont`:for(n=``,l=this.l,c=0;c!=e;++c){if(this.lens&&this.lens.indexOf(l)!==-1)return o=$l(this,l),this.l=l+1,s=au.call(this,e-c,o?`dbcs-cont`:`sbcs-cont`),a.join(``)+s;a.push(as($l(this,l))),l+=1}n=a.join(``);break;default:switch(e){case 1:return r=$l(this,this.l),this.l++,r;case 2:return r=(t===`i`?tu:eu)(this,this.l),this.l+=2,r;case 4:case-4:return t===`i`||!(this[this.l+3]&128)?(r=(e>0?ru:iu)(this,this.l),this.l+=4,r):(i=nu(this,this.l),this.l+=4,i);case 8:case-8:if(t===`f`)return i=e==8?Xl(this,this.l):Xl([this[this.l+7],this[this.l+6],this[this.l+5],this[this.l+4],this[this.l+3],this[this.l+2],this[this.l+1],this[this.l+0]],0),this.l+=8,i;e=8;case 16:n=zl(this,this.l,e);break}}return this.l+=e,n}var ou=function(e,t,n){e[n]=t&255,e[n+1]=t>>>8&255,e[n+2]=t>>>16&255,e[n+3]=t>>>24&255},su=function(e,t,n){e[n]=t&255,e[n+1]=t>>8&255,e[n+2]=t>>16&255,e[n+3]=t>>24&255},cu=function(e,t,n){e[n]=t&255,e[n+1]=t>>>8&255};function lu(e,t,n){var r=0,i=0;if(n===`dbcs`){for(i=0;i!=t.length;++i)cu(this,t.charCodeAt(i),this.l+2*i);r=2*t.length}else if(n===`sbcs`){if(ss!==void 0&&Zo==874)for(i=0;i!=t.length;++i){var a=ss.utils.encode(Zo,t.charAt(i));this[this.l+i]=a[0]}else for(t=t.replace(/[^\x00-\x7F]/g,`_`),i=0;i!=t.length;++i)this[this.l+i]=t.charCodeAt(i)&255;r=t.length}else if(n===`hex`){for(;i<e;++i)this[this.l++]=parseInt(t.slice(2*i,2*i+2),16)||0;return this}else if(n===`utf16le`){var o=Math.min(this.l+e,this.length);for(i=0;i<Math.min(t.length,e);++i){var s=t.charCodeAt(i);this[this.l++]=s&255,this[this.l++]=s>>8}for(;this.l<o;)this[this.l++]=0;return this}else switch(e){case 1:r=1,this[this.l]=t&255;break;case 2:r=2,this[this.l]=t&255,t>>>=8,this[this.l+1]=t&255;break;case 3:r=3,this[this.l]=t&255,t>>>=8,this[this.l+1]=t&255,t>>>=8,this[this.l+2]=t&255;break;case 4:r=4,ou(this,t,this.l);break;case 8:if(r=8,n===`f`){Nl(this,t,this.l);break}case 16:break;case-4:r=4,su(this,t,this.l);break}return this.l+=r,this}function uu(e,t){var n=zl(this,this.l,e.length>>1);if(n!==e)throw Error(t+`Expected `+e+` saw `+n);this.l+=e.length>>1}function du(e,t){e.l=t,e.read_shift=au,e.chk=uu,e.write_shift=lu}function fu(e,t){e.l+=t}function q(e){var t=ms(e);return du(t,0),t}function pu(){var e=[],t=z?256:2048,n=function(e){var t=q(e);return du(t,0),t},r=n(t),i=function(){r&&=(r.length>r.l&&(r=r.slice(0,r.l),r.l=r.length),r.length>0&&e.push(r),null)},a=function(e){return r&&e<r.length-r.l?r:(i(),r=n(Math.max(e+1,t)))};return{next:a,push:function(e){i(),r=e,r.l??=r.length,a(t)},end:function(){return i(),bs(e)},_bufs:e}}function J(e,t,n,r){var i=+t,a;if(!isNaN(i)){r||=Dv[i].p||(n||[]).length||0,a=1+ +(i>=128)+1,r>=128&&++a,r>=16384&&++a,r>=2097152&&++a;var o=e.next(a);i<=127?o.write_shift(1,i):(o.write_shift(1,(i&127)+128),o.write_shift(1,i>>7));for(var s=0;s!=4;++s)if(r>=128)o.write_shift(1,(r&127)+128),r>>=7;else{o.write_shift(1,r);break}r>0&&Zl(n)&&e.push(n)}}function mu(e,t,n){var r=nl(e);if(t.s?(r.cRel&&(r.c+=t.s.c),r.rRel&&(r.r+=t.s.r)):(r.cRel&&(r.c+=t.c),r.rRel&&(r.r+=t.r)),!n||n.biff<12){for(;r.c>=256;)r.c-=256;for(;r.r>=65536;)r.r-=65536}return r}function hu(e,t,n){var r=nl(e);return r.s=mu(r.s,t.s,n),r.e=mu(r.e,t.s,n),r}function gu(e,t){if(e.cRel&&e.c<0)for(e=nl(e);e.c<0;)e.c+=t>8?16384:256;if(e.rRel&&e.r<0)for(e=nl(e);e.r<0;)e.r+=t>8?1048576:t>5?65536:16384;var n=Ou(e);return!e.cRel&&e.cRel!=null&&(n=wu(n)),!e.rRel&&e.rRel!=null&&(n=bu(n)),n}function _u(e,t){return e.s.r==0&&!e.s.rRel&&e.e.r==(t.biff>=12?1048575:t.biff>=8?65536:16384)&&!e.e.rRel?(e.s.cRel?``:`$`)+Cu(e.s.c)+`:`+(e.e.cRel?``:`$`)+Cu(e.e.c):e.s.c==0&&!e.s.cRel&&e.e.c==(t.biff>=12?16383:255)&&!e.e.cRel?(e.s.rRel?``:`$`)+yu(e.s.r)+`:`+(e.e.rRel?``:`$`)+yu(e.e.r):gu(e.s,t.biff)+`:`+gu(e.e,t.biff)}function vu(e){return parseInt(xu(e),10)-1}function yu(e){return``+(e+1)}function bu(e){return e.replace(/([A-Z]|^)(\d+)$/,`$1$$$2`)}function xu(e){return e.replace(/\$(\d+)$/,`$1`)}function Su(e){for(var t=Tu(e),n=0,r=0;r!==t.length;++r)n=26*n+t.charCodeAt(r)-64;return n-1}function Cu(e){if(e<0)throw Error(`invalid column `+e);var t=``;for(++e;e;e=Math.floor((e-1)/26))t=String.fromCharCode((e-1)%26+65)+t;return t}function wu(e){return e.replace(/^([A-Z])/,`$$$1`)}function Tu(e){return e.replace(/^\$([A-Z])/,`$1`)}function Eu(e){return e.replace(/(\$?[A-Z]*)(\$?\d*)/,`$1,$2`).split(`,`)}function Du(e){for(var t=0,n=0,r=0;r<e.length;++r){var i=e.charCodeAt(r);i>=48&&i<=57?t=10*t+(i-48):i>=65&&i<=90&&(n=26*n+(i-64))}return{c:n-1,r:t-1}}function Ou(e){for(var t=e.c+1,n=``;t;t=(t-1)/26|0)n=String.fromCharCode((t-1)%26+65)+n;return n+(e.r+1)}function ku(e){var t=e.indexOf(`:`);return t==-1?{s:Du(e),e:Du(e)}:{s:Du(e.slice(0,t)),e:Du(e.slice(t+1))}}function Au(e,t){return t===void 0||typeof t==`number`?Au(e.s,e.e):(typeof e!=`string`&&(e=Ou(e)),typeof t!=`string`&&(t=Ou(t)),e==t?e:e+`:`+t)}function ju(e){var t={s:{c:0,r:0},e:{c:0,r:0}},n=0,r=0,i=0,a=e.length;for(n=0;r<a&&!((i=e.charCodeAt(r)-64)<1||i>26);++r)n=26*n+i;for(t.s.c=--n,n=0;r<a&&!((i=e.charCodeAt(r)-48)<0||i>9);++r)n=10*n+i;if(t.s.r=--n,r===a||i!=10)return t.e.c=t.s.c,t.e.r=t.s.r,t;for(++r,n=0;r!=a&&!((i=e.charCodeAt(r)-64)<1||i>26);++r)n=26*n+i;for(t.e.c=--n,n=0;r!=a&&!((i=e.charCodeAt(r)-48)<0||i>9);++r)n=10*n+i;return t.e.r=--n,t}function Mu(e,t){var n=e.t==`d`&&t instanceof Date;if(e.z!=null)try{return e.w=Oc(e.z,n?Kc(t):t)}catch{}try{return e.w=Oc((e.XF||{}).numFmtId||(n?14:0),n?Kc(t):t)}catch{return``+t}}function Nu(e,t,n){return e==null||e.t==null||e.t==`z`?``:e.w===void 0?(e.t==`d`&&!e.z&&n&&n.dateNF&&(e.z=n.dateNF),e.t==`e`?Od[e.v]||e.v:t==null?Mu(e,e.v):Mu(e,t)):e.w}function Pu(e,t){var n=t&&t.sheet?t.sheet:`Sheet1`,r={};return r[n]=e,{SheetNames:[n],Sheets:r}}function Fu(e,t,n){var r=n||{},i=e?Array.isArray(e):r.dense;cs!=null&&i==null&&(i=cs);var a=e||(i?[]:{}),o=0,s=0;if(a&&r.origin!=null){if(typeof r.origin==`number`)o=r.origin;else{var c=typeof r.origin==`string`?Du(r.origin):r.origin;o=c.r,s=c.c}a[`!ref`]||=`A1:A1`}var l={s:{c:1e7,r:1e7},e:{c:0,r:0}};if(a[`!ref`]){var u=ju(a[`!ref`]);l.s.c=u.s.c,l.s.r=u.s.r,l.e.c=Math.max(l.e.c,u.e.c),l.e.r=Math.max(l.e.r,u.e.r),o==-1&&(l.e.r=o=u.e.r+1)}for(var d=0;d!=t.length;++d)if(t[d]){if(!Array.isArray(t[d]))throw Error(`aoa_to_sheet expects an array of arrays`);for(var f=0;f!=t[d].length;++f)if(t[d][f]!==void 0){var p={v:t[d][f]},m=o+d,h=s+f;if(l.s.r>m&&(l.s.r=m),l.s.c>h&&(l.s.c=h),l.e.r<m&&(l.e.r=m),l.e.c<h&&(l.e.c=h),t[d][f]&&typeof t[d][f]==`object`&&!Array.isArray(t[d][f])&&!(t[d][f]instanceof Date))p=t[d][f];else if(Array.isArray(p.v)&&(p.f=t[d][f][1],p.v=p.v[0]),p.v===null)if(p.f)p.t=`n`;else if(r.nullError)p.t=`e`,p.v=0;else if(r.sheetStubs)p.t=`z`;else continue;else typeof p.v==`number`?p.t=`n`:typeof p.v==`boolean`?p.t=`b`:p.v instanceof Date?(p.z=r.dateNF||Is[14],r.cellDates?(p.t=`d`,p.w=Oc(p.z,Kc(p.v))):(p.t=`n`,p.v=Kc(p.v),p.w=Oc(p.z,p.v))):p.t=`s`;if(i)a[m]||(a[m]=[]),a[m][h]&&a[m][h].z&&(p.z=a[m][h].z),a[m][h]=p;else{var g=Ou({c:h,r:m});a[g]&&a[g].z&&(p.z=a[g].z),a[g]=p}}}return l.s.c<1e7&&(a[`!ref`]=Au(l)),a}function Iu(e,t){return Fu(null,e,t)}function Lu(e){return e.read_shift(4,`i`)}function Ru(e,t){return t||=q(4),t.write_shift(4,e),t}function zu(e){var t=e.read_shift(4);return t===0?``:e.read_shift(t,`dbcs`)}function Bu(e,t){var n=!1;return t??=(n=!0,q(4+2*e.length)),t.write_shift(4,e.length),e.length>0&&t.write_shift(0,e,`dbcs`),n?t.slice(0,t.l):t}function Vu(e){return{ich:e.read_shift(2),ifnt:e.read_shift(2)}}function Hu(e,t){return t||=q(4),t.write_shift(2,e.ich||0),t.write_shift(2,e.ifnt||0),t}function Uu(e,t){var n=e.l,r=e.read_shift(1),i=zu(e),a=[],o={t:i,h:i};if(r&1){for(var s=e.read_shift(4),c=0;c!=s;++c)a.push(Vu(e));o.r=a}else o.r=[{ich:0,ifnt:0}];return e.l=n+t,o}function Wu(e,t){var n=!1;return t??=(n=!0,q(15+4*e.t.length)),t.write_shift(1,0),Bu(e.t,t),n?t.slice(0,t.l):t}var Gu=Uu;function Ku(e,t){var n=!1;return t??=(n=!0,q(23+4*e.t.length)),t.write_shift(1,1),Bu(e.t,t),t.write_shift(4,1),Hu({ich:0,ifnt:0},t),n?t.slice(0,t.l):t}function Y(e){var t=e.read_shift(4),n=e.read_shift(2);return n+=e.read_shift(1)<<16,e.l++,{c:t,iStyleRef:n}}function qu(e,t){return t??=q(8),t.write_shift(-4,e.c),t.write_shift(3,e.iStyleRef||e.s),t.write_shift(1,0),t}function Ju(e){var t=e.read_shift(2);return t+=e.read_shift(1)<<16,e.l++,{c:-1,iStyleRef:t}}function Yu(e,t){return t??=q(4),t.write_shift(3,e.iStyleRef||e.s),t.write_shift(1,0),t}var Xu=zu,Zu=Bu;function Qu(e){var t=e.read_shift(4);return t===0||t===4294967295?``:e.read_shift(t,`dbcs`)}function $u(e,t){var n=!1;return t??=(n=!0,q(127)),t.write_shift(4,e.length>0?e.length:4294967295),e.length>0&&t.write_shift(0,e,`dbcs`),n?t.slice(0,t.l):t}var ed=zu,td=Qu,nd=$u;function rd(e){var t=e.slice(e.l,e.l+4),n=t[0]&1,r=t[0]&2;e.l+=4;var i=r===0?Xl([0,0,0,0,t[0]&252,t[1],t[2],t[3]],0):ru(t,0)>>2;return n?i/100:i}function id(e,t){t??=q(4);var n=0,r=0,i=e*100;if(e==(e|0)&&e>=-536870912&&e<1<<29?r=1:i==(i|0)&&i>=-536870912&&i<1<<29&&(r=1,n=1),r)t.write_shift(-4,((n?i:e)<<2)+(n+2));else throw Error(`unsupported RkNumber `+e)}function ad(e){var t={s:{},e:{}};return t.s.r=e.read_shift(4),t.e.r=e.read_shift(4),t.s.c=e.read_shift(4),t.e.c=e.read_shift(4),t}function od(e,t){return t||=q(16),t.write_shift(4,e.s.r),t.write_shift(4,e.e.r),t.write_shift(4,e.s.c),t.write_shift(4,e.e.c),t}var sd=ad,cd=od;function ld(e){if(e.length-e.l<8)throw`XLS Xnum Buffer underflow`;return e.read_shift(8,`f`)}function ud(e,t){return(t||q(8)).write_shift(8,e,`f`)}function dd(e){var t={},n=e.read_shift(1)>>>1,r=e.read_shift(1),i=e.read_shift(2,`i`),a=e.read_shift(1),o=e.read_shift(1),s=e.read_shift(1);switch(e.l++,n){case 0:t.auto=1;break;case 1:t.index=r;var c=Dd[r];c&&(t.rgb=lp(c));break;case 2:t.rgb=lp([a,o,s]);break;case 3:t.theme=r;break}return i!=0&&(t.tint=i>0?i/32767:i/32768),t}function fd(e,t){if(t||=q(8),!e||e.auto)return t.write_shift(4,0),t.write_shift(4,0),t;e.index==null?e.theme==null?(t.write_shift(1,5),t.write_shift(1,0)):(t.write_shift(1,6),t.write_shift(1,e.theme)):(t.write_shift(1,2),t.write_shift(1,e.index));var n=e.tint||0;if(n>0?n*=32767:n<0&&(n*=32768),t.write_shift(2,n),!e.rgb||e.theme!=null)t.write_shift(2,0),t.write_shift(1,0),t.write_shift(1,0);else{var r=e.rgb||`FFFFFF`;typeof r==`number`&&(r=(`000000`+r.toString(16)).slice(-6)),t.write_shift(1,parseInt(r.slice(0,2),16)),t.write_shift(1,parseInt(r.slice(2,4),16)),t.write_shift(1,parseInt(r.slice(4,6),16)),t.write_shift(1,255)}return t}function pd(e){var t=e.read_shift(1);return e.l++,{fBold:t&1,fItalic:t&2,fUnderline:t&4,fStrikeout:t&8,fOutline:t&16,fShadow:t&32,fCondense:t&64,fExtend:t&128}}function md(e,t){t||=q(2);var n=(e.italic?2:0)|(e.strike?8:0)|(e.outline?16:0)|(e.shadow?32:0)|(e.condense?64:0)|(e.extend?128:0);return t.write_shift(1,n),t.write_shift(1,0),t}var hd=2,gd=3,_d=11,vd=19,yd=64,bd=65,xd=71,X=4108,Sd=4126,Cd=80,wd={1:{n:`CodePage`,t:hd},2:{n:`Category`,t:Cd},3:{n:`PresentationFormat`,t:Cd},4:{n:`ByteCount`,t:gd},5:{n:`LineCount`,t:gd},6:{n:`ParagraphCount`,t:gd},7:{n:`SlideCount`,t:gd},8:{n:`NoteCount`,t:gd},9:{n:`HiddenCount`,t:gd},10:{n:`MultimediaClipCount`,t:gd},11:{n:`ScaleCrop`,t:_d},12:{n:`HeadingPairs`,t:X},13:{n:`TitlesOfParts`,t:Sd},14:{n:`Manager`,t:Cd},15:{n:`Company`,t:Cd},16:{n:`LinksUpToDate`,t:_d},17:{n:`CharacterCount`,t:gd},19:{n:`SharedDoc`,t:_d},22:{n:`HyperlinksChanged`,t:_d},23:{n:`AppVersion`,t:gd,p:`version`},24:{n:`DigSig`,t:bd},26:{n:`ContentType`,t:Cd},27:{n:`ContentStatus`,t:Cd},28:{n:`Language`,t:Cd},29:{n:`Version`,t:Cd},255:{},2147483648:{n:`Locale`,t:vd},2147483651:{n:`Behavior`,t:vd},1919054434:{}},Td={1:{n:`CodePage`,t:hd},2:{n:`Title`,t:Cd},3:{n:`Subject`,t:Cd},4:{n:`Author`,t:Cd},5:{n:`Keywords`,t:Cd},6:{n:`Comments`,t:Cd},7:{n:`Template`,t:Cd},8:{n:`LastAuthor`,t:Cd},9:{n:`RevNumber`,t:Cd},10:{n:`EditTime`,t:yd},11:{n:`LastPrinted`,t:yd},12:{n:`CreatedDate`,t:yd},13:{n:`ModifiedDate`,t:yd},14:{n:`PageCount`,t:gd},15:{n:`WordCount`,t:gd},16:{n:`CharCount`,t:gd},17:{n:`Thumbnail`,t:xd},18:{n:`Application`,t:Cd},19:{n:`DocSecurity`,t:gd},255:{},2147483648:{n:`Locale`,t:vd},2147483651:{n:`Behavior`,t:vd},1919054434:{}};function Ed(e){return e.map(function(e){return[e>>16&255,e>>8&255,e&255]})}var Dd=nl(Ed([0,16777215,16711680,65280,255,16776960,16711935,65535,0,16777215,16711680,65280,255,16776960,16711935,65535,8388608,32768,128,8421376,8388736,32896,12632256,8421504,10066431,10040166,16777164,13434879,6684774,16744576,26316,13421823,128,16711935,16776960,65535,8388736,8388608,32896,255,52479,13434879,13434828,16777113,10079487,16751052,13408767,16764057,3368703,3394764,10079232,16763904,16750848,16737792,6710937,9868950,13158,3381606,13056,3355392,10040064,10040166,3355545,3355443,16777215,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])),Od={0:`#NULL!`,7:`#DIV/0!`,15:`#VALUE!`,23:`#REF!`,29:`#NAME?`,36:`#NUM!`,42:`#N/A`,43:`#GETTING_DATA`,255:`#WTF?`},kd={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":`workbooks`,"application/vnd.ms-excel.sheet.macroEnabled.main+xml":`workbooks`,"application/vnd.ms-excel.sheet.binary.macroEnabled.main":`workbooks`,"application/vnd.ms-excel.addin.macroEnabled.main+xml":`workbooks`,"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":`workbooks`,"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":`sheets`,"application/vnd.ms-excel.worksheet":`sheets`,"application/vnd.ms-excel.binIndexWs":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":`charts`,"application/vnd.ms-excel.chartsheet":`charts`,"application/vnd.ms-excel.macrosheet+xml":`macros`,"application/vnd.ms-excel.macrosheet":`macros`,"application/vnd.ms-excel.intlmacrosheet":`TODO`,"application/vnd.ms-excel.binIndexMs":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":`dialogs`,"application/vnd.ms-excel.dialogsheet":`dialogs`,"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml":`strs`,"application/vnd.ms-excel.sharedStrings":`strs`,"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":`styles`,"application/vnd.ms-excel.styles":`styles`,"application/vnd.openxmlformats-package.core-properties+xml":`coreprops`,"application/vnd.openxmlformats-officedocument.custom-properties+xml":`custprops`,"application/vnd.openxmlformats-officedocument.extended-properties+xml":`extprops`,"application/vnd.openxmlformats-officedocument.customXmlProperties+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":`comments`,"application/vnd.ms-excel.comments":`comments`,"application/vnd.ms-excel.threadedcomments+xml":`threadedcomments`,"application/vnd.ms-excel.person+xml":`people`,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml":`metadata`,"application/vnd.ms-excel.sheetMetadata":`metadata`,"application/vnd.ms-excel.pivotTable":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":`TODO`,"application/vnd.ms-office.chartcolorstyle+xml":`TODO`,"application/vnd.ms-office.chartstyle+xml":`TODO`,"application/vnd.ms-office.chartex+xml":`TODO`,"application/vnd.ms-excel.calcChain":`calcchains`,"application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml":`calcchains`,"application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings":`TODO`,"application/vnd.ms-office.activeX":`TODO`,"application/vnd.ms-office.activeX+xml":`TODO`,"application/vnd.ms-excel.attachedToolbars":`TODO`,"application/vnd.ms-excel.connections":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":`TODO`,"application/vnd.ms-excel.externalLink":`links`,"application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml":`links`,"application/vnd.ms-excel.pivotCacheDefinition":`TODO`,"application/vnd.ms-excel.pivotCacheRecords":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml":`TODO`,"application/vnd.ms-excel.queryTable":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml":`TODO`,"application/vnd.ms-excel.userNames":`TODO`,"application/vnd.ms-excel.revisionHeaders":`TODO`,"application/vnd.ms-excel.revisionLog":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml":`TODO`,"application/vnd.ms-excel.tableSingleCells":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml":`TODO`,"application/vnd.ms-excel.slicer":`TODO`,"application/vnd.ms-excel.slicerCache":`TODO`,"application/vnd.ms-excel.slicer+xml":`TODO`,"application/vnd.ms-excel.slicerCache+xml":`TODO`,"application/vnd.ms-excel.wsSortMap":`TODO`,"application/vnd.ms-excel.table":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":`TODO`,"application/vnd.openxmlformats-officedocument.theme+xml":`themes`,"application/vnd.openxmlformats-officedocument.themeOverride+xml":`TODO`,"application/vnd.ms-excel.Timeline+xml":`TODO`,"application/vnd.ms-excel.TimelineCache+xml":`TODO`,"application/vnd.ms-office.vbaProject":`vba`,"application/vnd.ms-office.vbaProjectSignature":`TODO`,"application/vnd.ms-office.volatileDependencies":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml":`TODO`,"application/vnd.ms-excel.controlproperties+xml":`TODO`,"application/vnd.openxmlformats-officedocument.model+data":`TODO`,"application/vnd.ms-excel.Survey+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawing+xml":`drawings`,"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml":`TODO`,"application/vnd.openxmlformats-officedocument.vmlDrawing":`TODO`,"application/vnd.openxmlformats-package.relationships+xml":`rels`,"application/vnd.openxmlformats-officedocument.oleObject":`TODO`,"image/png":`TODO`,sheet:`js`},Ad={workbooks:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml`,xlsm:`application/vnd.ms-excel.sheet.macroEnabled.main+xml`,xlsb:`application/vnd.ms-excel.sheet.binary.macroEnabled.main`,xlam:`application/vnd.ms-excel.addin.macroEnabled.main+xml`,xltx:`application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml`},strs:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml`,xlsb:`application/vnd.ms-excel.sharedStrings`},comments:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml`,xlsb:`application/vnd.ms-excel.comments`},sheets:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml`,xlsb:`application/vnd.ms-excel.worksheet`},charts:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml`,xlsb:`application/vnd.ms-excel.chartsheet`},dialogs:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml`,xlsb:`application/vnd.ms-excel.dialogsheet`},macros:{xlsx:`application/vnd.ms-excel.macrosheet+xml`,xlsb:`application/vnd.ms-excel.macrosheet`},metadata:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml`,xlsb:`application/vnd.ms-excel.sheetMetadata`},styles:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml`,xlsb:`application/vnd.ms-excel.styles`}};function jd(){return{workbooks:[],sheets:[],charts:[],dialogs:[],macros:[],rels:[],strs:[],comments:[],threadedcomments:[],links:[],coreprops:[],extprops:[],custprops:[],themes:[],styles:[],calcchains:[],vba:[],drawings:[],metadata:[],people:[],TODO:[],xmlns:``}}function Md(e,t){var n=Wc(kd),r=[],i;r[r.length]=V,r[r.length]=U(`Types`,null,{xmlns:kl.CT,"xmlns:xsd":kl.xsd,"xmlns:xsi":kl.xsi}),r=r.concat([[`xml`,`application/xml`],[`bin`,`application/vnd.ms-excel.sheet.binary.macroEnabled.main`],[`vml`,`application/vnd.openxmlformats-officedocument.vmlDrawing`],[`data`,`application/vnd.openxmlformats-officedocument.model+data`],[`bmp`,`image/bmp`],[`png`,`image/png`],[`gif`,`image/gif`],[`emf`,`image/x-emf`],[`wmf`,`image/x-wmf`],[`jpg`,`image/jpeg`],[`jpeg`,`image/jpeg`],[`tif`,`image/tiff`],[`tiff`,`image/tiff`],[`pdf`,`application/pdf`],[`rels`,`application/vnd.openxmlformats-package.relationships+xml`]].map(function(e){return U(`Default`,null,{Extension:e[0],ContentType:e[1]})}));var a=function(n){e[n]&&e[n].length>0&&(i=e[n][0],r[r.length]=U(`Override`,null,{PartName:(i[0]==`/`?``:`/`)+i,ContentType:Ad[n][t.bookType]||Ad[n].xlsx}))},o=function(n){(e[n]||[]).forEach(function(e){r[r.length]=U(`Override`,null,{PartName:(e[0]==`/`?``:`/`)+e,ContentType:Ad[n][t.bookType]||Ad[n].xlsx})})},s=function(t){(e[t]||[]).forEach(function(e){r[r.length]=U(`Override`,null,{PartName:(e[0]==`/`?``:`/`)+e,ContentType:n[t][0]})})};return a(`workbooks`),o(`sheets`),o(`charts`),s(`themes`),[`strs`,`styles`].forEach(a),[`coreprops`,`extprops`,`custprops`].forEach(s),s(`vba`),s(`comments`),s(`threadedcomments`),s(`drawings`),o(`metadata`),s(`people`),r.length>2&&(r[r.length]=`</Types>`,r[1]=r[1].replace(`/>`,`>`)),r.join(``)}var Z={WB:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument`,SHEET:`http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument`,HLINK:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink`,VML:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing`,XPATH:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath`,XMISS:`http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing`,XLINK:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink`,CXML:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml`,CXMLP:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps`,CMNT:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments`,CORE_PROPS:`http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties`,EXT_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties`,CUST_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties`,SST:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings`,STY:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles`,THEME:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme`,CHART:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart`,CHARTEX:`http://schemas.microsoft.com/office/2014/relationships/chartEx`,CS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet`,WS:[`http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet`,`http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet`],DS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet`,MS:`http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet`,IMG:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/image`,DRAW:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing`,XLMETA:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata`,TCMNT:`http://schemas.microsoft.com/office/2017/10/relationships/threadedComment`,PEOPLE:`http://schemas.microsoft.com/office/2017/10/relationships/person`,VBA:`http://schemas.microsoft.com/office/2006/relationships/vbaProject`};function Nd(e){var t=e.lastIndexOf(`/`);return e.slice(0,t+1)+`_rels/`+e.slice(t+1)+`.rels`}function Pd(e){var t=[V,U(`Relationships`,null,{xmlns:kl.RELS})];return Bc(e[`!id`]).forEach(function(n){t[t.length]=U(`Relationship`,null,e[`!id`][n])}),t.length>2&&(t[t.length]=`</Relationships>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}function Fd(e,t,n,r,i,a){if(i||={},e[`!id`]||={},e[`!idx`]||=1,t<0)for(t=e[`!idx`];e[`!id`][`rId`+t];++t);if(e[`!idx`]=t+1,i.Id=`rId`+t,i.Type=r,i.Target=n,a?i.TargetMode=a:[Z.HLINK,Z.XPATH,Z.XMISS].indexOf(i.Type)>-1&&(i.TargetMode=`External`),e[`!id`][i.Id])throw Error(`Cannot rewrite rId `+t);return e[`!id`][i.Id]=i,e[(`/`+i.Target).replace(`//`,`/`)]=i,t}function Id(e){var t=[V];t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`),t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);for(var n=0;n<e.length;++n)t.push(`  <manifest:file-entry manifest:full-path="`+e[n][0]+`" manifest:media-type="`+e[n][1]+`"/>
`);return t.push(`</manifest:manifest>`),t.join(``)}function Ld(e,t,n){return[`  <rdf:Description rdf:about="`+e+`">
`,`    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/`+(n||`odf`)+`#`+t+`"/>
`,`  </rdf:Description>
`].join(``)}function Rd(e,t){return[`  <rdf:Description rdf:about="`+e+`">
`,`    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="`+t+`"/>
`,`  </rdf:Description>
`].join(``)}function zd(e){var t=[V];t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);for(var n=0;n!=e.length;++n)t.push(Ld(e[n][0],e[n][1])),t.push(Rd(``,e[n][0]));return t.push(Ld(``,`Document`,`pkg`)),t.push(`</rdf:RDF>`),t.join(``)}function Bd(){return`<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS `+Yo.version+`</meta:generator></office:meta></office:document-meta>`}var Vd=[[`cp:category`,`Category`],[`cp:contentStatus`,`ContentStatus`],[`cp:keywords`,`Keywords`],[`cp:lastModifiedBy`,`LastAuthor`],[`cp:lastPrinted`,`LastPrinted`],[`cp:revision`,`RevNumber`],[`cp:version`,`Version`],[`dc:creator`,`Author`],[`dc:description`,`Comments`],[`dc:identifier`,`Identifier`],[`dc:language`,`Language`],[`dc:subject`,`Subject`],[`dc:title`,`Title`],[`dcterms:created`,`CreatedDate`,`date`],[`dcterms:modified`,`ModifiedDate`,`date`]];function Hd(e,t,n,r,i){i[e]!=null||t==null||t===``||(i[e]=t,t=H(t),r[r.length]=n?U(e,t,n):Tl(e,t))}function Ud(e,t){var n=t||{},r=[V,U(`cp:coreProperties`,null,{"xmlns:cp":kl.CORE_PROPS,"xmlns:dc":kl.dc,"xmlns:dcterms":kl.dcterms,"xmlns:dcmitype":kl.dcmitype,"xmlns:xsi":kl.xsi})],i={};if(!e&&!n.Props)return r.join(``);e&&(e.CreatedDate!=null&&Hd(`dcterms:created`,typeof e.CreatedDate==`string`?e.CreatedDate:Dl(e.CreatedDate,n.WTF),{"xsi:type":`dcterms:W3CDTF`},r,i),e.ModifiedDate!=null&&Hd(`dcterms:modified`,typeof e.ModifiedDate==`string`?e.ModifiedDate:Dl(e.ModifiedDate,n.WTF),{"xsi:type":`dcterms:W3CDTF`},r,i));for(var a=0;a!=Vd.length;++a){var o=Vd[a],s=n.Props&&n.Props[o[1]]!=null?n.Props[o[1]]:e?e[o[1]]:null;s===!0?s=`1`:s===!1?s=`0`:typeof s==`number`&&(s=String(s)),s!=null&&Hd(o[0],s,null,r,i)}return r.length>2&&(r[r.length]=`</cp:coreProperties>`,r[1]=r[1].replace(`/>`,`>`)),r.join(``)}var Wd=[[`Application`,`Application`,`string`],[`AppVersion`,`AppVersion`,`string`],[`Company`,`Company`,`string`],[`DocSecurity`,`DocSecurity`,`string`],[`Manager`,`Manager`,`string`],[`HyperlinksChanged`,`HyperlinksChanged`,`bool`],[`SharedDoc`,`SharedDoc`,`bool`],[`LinksUpToDate`,`LinksUpToDate`,`bool`],[`ScaleCrop`,`ScaleCrop`,`bool`],[`HeadingPairs`,`HeadingPairs`,`raw`],[`TitlesOfParts`,`TitlesOfParts`,`raw`]],Gd=[`Worksheets`,`SheetNames`,`NamedRanges`,`DefinedNames`,`Chartsheets`,`ChartNames`];function Kd(e){var t=[],n=U;return e||={},e.Application=`SheetJS`,t[t.length]=V,t[t.length]=U(`Properties`,null,{xmlns:kl.EXT_PROPS,"xmlns:vt":kl.vt}),Wd.forEach(function(r){if(e[r[1]]!==void 0){var i;switch(r[2]){case`string`:i=H(String(e[r[1]]));break;case`bool`:i=e[r[1]]?`true`:`false`;break}i!==void 0&&(t[t.length]=n(r[0],i))}}),t[t.length]=n(`HeadingPairs`,n(`vt:vector`,n(`vt:variant`,`<vt:lpstr>Worksheets</vt:lpstr>`)+n(`vt:variant`,n(`vt:i4`,String(e.Worksheets))),{size:2,baseType:`variant`})),t[t.length]=n(`TitlesOfParts`,n(`vt:vector`,e.SheetNames.map(function(e){return`<vt:lpstr>`+H(e)+`</vt:lpstr>`}).join(``),{size:e.Worksheets,baseType:`lpstr`})),t.length>2&&(t[t.length]=`</Properties>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}function qd(e){var t=[V,U(`Properties`,null,{xmlns:kl.CUST_PROPS,"xmlns:vt":kl.vt})];if(!e)return t.join(``);var n=1;return Bc(e).forEach(function(r){++n,t[t.length]=U(`property`,Ol(e[r],!0),{fmtid:`{D5CDD505-2E9C-101B-9397-08002B2CF9AE}`,pid:n,name:H(r)})}),t.length>2&&(t[t.length]=`</Properties>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}var Jd={Title:`Title`,Subject:`Subject`,Author:`Author`,Keywords:`Keywords`,Comments:`Description`,LastAuthor:`LastAuthor`,RevNumber:`Revision`,Application:`AppName`,LastPrinted:`LastPrinted`,CreatedDate:`Created`,ModifiedDate:`LastSaved`,Category:`Category`,Manager:`Manager`,Company:`Company`,AppVersion:`Version`,ContentStatus:`ContentStatus`,Identifier:`Identifier`,Language:`Language`};function Yd(e,t){var n=[];return Bc(Jd).map(function(e){for(var t=0;t<Vd.length;++t)if(Vd[t][1]==e)return Vd[t];for(t=0;t<Wd.length;++t)if(Wd[t][1]==e)return Wd[t];throw e}).forEach(function(r){if(e[r[1]]!=null){var i=t&&t.Props&&t.Props[r[1]]!=null?t.Props[r[1]]:e[r[1]];switch(r[2]){case`date`:i=new Date(i).toISOString().replace(/\.\d*Z/,`Z`);break}typeof i==`number`?i=String(i):i===!0||i===!1?i=i?`1`:`0`:i instanceof Date&&(i=new Date(i).toISOString().replace(/\.\d*Z/,``)),n.push(Tl(Jd[r[1]]||r[1],i))}}),U(`DocumentProperties`,n.join(``),{xmlns:jl.o})}function Xd(e,t){var n=[`Worksheets`,`SheetNames`],r=`CustomDocumentProperties`,i=[];return e&&Bc(e).forEach(function(t){if(Object.prototype.hasOwnProperty.call(e,t)){for(var r=0;r<Vd.length;++r)if(t==Vd[r][1])return;for(r=0;r<Wd.length;++r)if(t==Wd[r][1])return;for(r=0;r<n.length;++r)if(t==n[r])return;var a=e[t],o=`string`;typeof a==`number`?(o=`float`,a=String(a)):a===!0||a===!1?(o=`boolean`,a=a?`1`:`0`):a=String(a),i.push(U(dl(t),a,{"dt:dt":o}))}}),t&&Bc(t).forEach(function(n){if(Object.prototype.hasOwnProperty.call(t,n)&&!(e&&Object.prototype.hasOwnProperty.call(e,n))){var r=t[n],a=`string`;typeof r==`number`?(a=`float`,r=String(r)):r===!0||r===!1?(a=`boolean`,r=r?`1`:`0`):r instanceof Date?(a=`dateTime.tz`,r=r.toISOString()):r=String(r),i.push(U(dl(n),r,{"dt:dt":a}))}}),`<`+r+` xmlns="`+jl.o+`">`+i.join(``)+`</`+r+`>`}function Zd(e){var t=(typeof e==`string`?new Date(Date.parse(e)):e).getTime()/1e3+11644473600,n=t%2**32,r=(t-n)/2**32;n*=1e7,r*=1e7;var i=n/2**32|0;i>0&&(n%=2**32,r+=i);var a=q(8);return a.write_shift(4,n),a.write_shift(4,r),a}function Qd(e,t){var n=q(4),r=q(4);switch(n.write_shift(4,e==80?31:e),e){case 3:r.write_shift(-4,t);break;case 5:r=q(8),r.write_shift(8,t,`f`);break;case 11:r.write_shift(4,+!!t);break;case 64:r=Zd(t);break;case 31:case 80:for(r=q(4+2*(t.length+1)+(t.length%2?0:2)),r.write_shift(4,t.length+1),r.write_shift(0,t,`dbcs`);r.l!=r.length;)r.write_shift(1,0);break;default:throw Error(`TypedPropertyValue unrecognized type `+e+` `+t)}return bs([n,r])}var $d=[`CodePage`,`Thumbnail`,`_PID_LINKBASE`,`_PID_HLINKS`,`SystemIdentifier`,`FMTID`];function ef(e){switch(typeof e){case`boolean`:return 11;case`number`:return(e|0)==e?3:5;case`string`:return 31;case`object`:if(e instanceof Date)return 64;break}return-1}function tf(e,t,n){var r=q(8),i=[],a=[],o=8,s=0,c=q(8),l=q(8);if(c.write_shift(4,2),c.write_shift(4,1200),l.write_shift(4,1),a.push(c),i.push(l),o+=8+c.length,!t){l=q(8),l.write_shift(4,0),i.unshift(l);var u=[q(4)];for(u[0].write_shift(4,e.length),s=0;s<e.length;++s){var d=e[s][0];for(c=q(8+2*(d.length+1)+(d.length%2?0:2)),c.write_shift(4,s+2),c.write_shift(4,d.length+1),c.write_shift(0,d,`dbcs`);c.l!=c.length;)c.write_shift(1,0);u.push(c)}c=bs(u),a.unshift(c),o+=8+c.length}for(s=0;s<e.length;++s)if(!(t&&!t[e[s][0]])&&!($d.indexOf(e[s][0])>-1||Gd.indexOf(e[s][0])>-1)&&e[s][1]!=null){var f=e[s][1],p=0;if(t){p=+t[e[s][0]];var m=n[p];if(m.p==`version`&&typeof f==`string`){var h=f.split(`.`);f=(h[0]<<16)+(+h[1]||0)}c=Qd(m.t,f)}else{var g=ef(f);g==-1&&(g=31,f=String(f)),c=Qd(g,f)}a.push(c),l=q(8),l.write_shift(4,t?p:2+s),i.push(l),o+=8+c.length}var _=8*(a.length+1);for(s=0;s<a.length;++s)i[s].write_shift(4,_),_+=a[s].length;return r.write_shift(4,o),r.write_shift(4,a.length),bs([r].concat(i,a))}function nf(e,t,n,r,i,a){var o=q(i?68:48),s=[o];o.write_shift(2,65534),o.write_shift(2,0),o.write_shift(4,842412599),o.write_shift(16,Ic.utils.consts.HEADER_CLSID,`hex`),o.write_shift(4,i?2:1),o.write_shift(16,t,`hex`),o.write_shift(4,i?68:48);var c=tf(e,n,r);if(s.push(c),i){var l=tf(i,null,null);o.write_shift(16,a,`hex`),o.write_shift(4,68+c.length),s.push(l)}return bs(s)}function rf(e,t){t||=q(e);for(var n=0;n<e;++n)t.write_shift(1,0);return t}function af(e,t){return e.read_shift(t)===1}function of(e,t){return t||=q(2),t.write_shift(2,+!!e),t}function sf(e){return e.read_shift(2,`u`)}function cf(e,t){return t||=q(2),t.write_shift(2,e),t}function lf(e,t,n){return n||=q(2),n.write_shift(1,t==`e`?+e:+!!e),n.write_shift(1,+(t==`e`)),n}function uf(e,t,n){var r=e.read_shift(n&&n.biff>=12?2:1),i=`sbcs-cont`,a=Xo;n&&n.biff>=8&&(Xo=1200),!n||n.biff==8?e.read_shift(1)&&(i=`dbcs-cont`):n.biff==12&&(i=`wstr`),n.biff>=2&&n.biff<=5&&(i=`cpstr`);var o=r?e.read_shift(r,i):``;return Xo=a,o}function df(e){var t=e.t||``,n=1,r=q(3+(n>1?2:0));r.write_shift(2,t.length),r.write_shift(1,(n>1?8:0)|1),n>1&&r.write_shift(2,n);var i=q(2*t.length);return i.write_shift(2*t.length,t,`utf16le`),bs([r,i])}function ff(e,t,n){var r;if(n){if(n.biff>=2&&n.biff<=5)return e.read_shift(t,`cpstr`);if(n.biff>=12)return e.read_shift(t,`dbcs-cont`)}return r=e.read_shift(1)===0?e.read_shift(t,`sbcs-cont`):e.read_shift(t,`dbcs-cont`),r}function pf(e,t,n){var r=e.read_shift(n&&n.biff==2?1:2);return r===0?(e.l++,``):ff(e,r,n)}function mf(e,t,n){if(n.biff>5)return pf(e,t,n);var r=e.read_shift(1);return r===0?(e.l++,``):e.read_shift(r,n.biff<=4||!e.lens?`cpstr`:`sbcs-cont`)}function hf(e,t,n){return n||=q(3+2*e.length),n.write_shift(2,e.length),n.write_shift(1,1),n.write_shift(31,e,`utf16le`),n}function gf(e,t){t||=q(6+e.length*2),t.write_shift(4,1+e.length);for(var n=0;n<e.length;++n)t.write_shift(2,e.charCodeAt(n));return t.write_shift(2,0),t}function _f(e){var t=q(512),n=0,r=e.Target;r.slice(0,7)==`file://`&&(r=r.slice(7));var i=r.indexOf(`#`),a=i>-1?31:23;switch(r.charAt(0)){case`#`:a=28;break;case`.`:a&=-3;break}t.write_shift(4,2),t.write_shift(4,a);var o=[8,6815827,6619237,4849780,83];for(n=0;n<o.length;++n)t.write_shift(4,o[n]);if(a==28)r=r.slice(1),gf(r,t);else if(a&2){for(o=`e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b`.split(` `),n=0;n<o.length;++n)t.write_shift(1,parseInt(o[n],16));var s=i>-1?r.slice(0,i):r;for(t.write_shift(4,2*(s.length+1)),n=0;n<s.length;++n)t.write_shift(2,s.charCodeAt(n));t.write_shift(2,0),a&8&&gf(i>-1?r.slice(i+1):``,t)}else{for(o=`03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46`.split(` `),n=0;n<o.length;++n)t.write_shift(1,parseInt(o[n],16));for(var c=0;r.slice(c*3,c*3+3)==`../`||r.slice(c*3,c*3+3)==`..\\`;)++c;for(t.write_shift(2,c),t.write_shift(4,r.length-3*c+1),n=0;n<r.length-3*c;++n)t.write_shift(1,r.charCodeAt(n+3*c)&255);for(t.write_shift(1,0),t.write_shift(2,65535),t.write_shift(2,57005),n=0;n<6;++n)t.write_shift(4,0)}return t.slice(0,t.l)}function vf(e,t,n,r){return r||=q(6),r.write_shift(2,e),r.write_shift(2,t),r.write_shift(2,n||0),r}function yf(e,t,n){var r=n.biff>8?4:2;return[e.read_shift(r),e.read_shift(r,`i`),e.read_shift(r,`i`)]}function bf(e){var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(2),i=e.read_shift(2);return{s:{c:r,r:t},e:{c:i,r:n}}}function xf(e,t){return t||=q(8),t.write_shift(2,e.s.r),t.write_shift(2,e.e.r),t.write_shift(2,e.s.c),t.write_shift(2,e.e.c),t}function Sf(e,t,n){var r=1536,i=16;switch(n.bookType){case`biff8`:break;case`biff5`:r=1280,i=8;break;case`biff4`:r=4,i=6;break;case`biff3`:r=3,i=6;break;case`biff2`:r=2,i=4;break;case`xla`:break;default:throw Error(`unsupported BIFF version`)}var a=q(i);return a.write_shift(2,r),a.write_shift(2,t),i>4&&a.write_shift(2,29282),i>6&&a.write_shift(2,1997),i>8&&(a.write_shift(2,49161),a.write_shift(2,1),a.write_shift(2,1798),a.write_shift(2,0)),a}function Cf(e,t){var n=!t||t.biff==8,r=q(n?112:54);for(r.write_shift(t.biff==8?2:1,7),n&&r.write_shift(1,0),r.write_shift(4,859007059),r.write_shift(4,5458548|(n?0:536870912));r.l<r.length;)r.write_shift(1,n?0:32);return r}function wf(e,t){var n=!t||t.biff>=8?2:1,r=q(8+n*e.name.length);r.write_shift(4,e.pos),r.write_shift(1,e.hs||0),r.write_shift(1,e.dt),r.write_shift(1,e.name.length),t.biff>=8&&r.write_shift(1,1),r.write_shift(n*e.name.length,e.name,t.biff<8?`sbcs`:`utf16le`);var i=r.slice(0,r.l);return i.l=r.l,i}function Tf(e,t){var n=q(8);n.write_shift(4,e.Count),n.write_shift(4,e.Unique);for(var r=[],i=0;i<e.length;++i)r[i]=df(e[i],t);var a=bs([n].concat(r));return a.parts=[n.length].concat(r.map(function(e){return e.length})),a}function Ef(){var e=q(18);return e.write_shift(2,0),e.write_shift(2,0),e.write_shift(2,29280),e.write_shift(2,17600),e.write_shift(2,56),e.write_shift(2,0),e.write_shift(2,0),e.write_shift(2,1),e.write_shift(2,500),e}function Df(e){var t=q(18),n=1718;return e&&e.RTL&&(n|=64),t.write_shift(2,n),t.write_shift(4,0),t.write_shift(4,64),t.write_shift(4,0),t.write_shift(4,0),t}function Of(e,t){var n=e.name||`Arial`,r=t&&t.biff==5,i=q(r?15+n.length:16+2*n.length);return i.write_shift(2,(e.sz||12)*20),i.write_shift(4,0),i.write_shift(2,400),i.write_shift(4,0),i.write_shift(2,0),i.write_shift(1,n.length),r||i.write_shift(1,1),i.write_shift((r?1:2)*n.length,n,r?`sbcs`:`utf16le`),i}function kf(e,t,n,r){var i=q(10);return vf(e,t,r,i),i.write_shift(4,n),i}function Af(e,t,n,r,i){var a=!i||i.biff==8,o=q(8+ +a+(1+a)*n.length);return vf(e,t,r,o),o.write_shift(2,n.length),a&&o.write_shift(1,1),o.write_shift((1+a)*n.length,n,a?`utf16le`:`sbcs`),o}function jf(e,t,n,r){var i=n&&n.biff==5;r||=q(i?3+t.length:5+2*t.length),r.write_shift(2,e),r.write_shift(i?1:2,t.length),i||r.write_shift(1,1),r.write_shift((i?1:2)*t.length,t,i?`sbcs`:`utf16le`);var a=r.length>r.l?r.slice(0,r.l):r;return a.l??=a.length,a}function Mf(e,t){var n=t.biff==8||!t.biff?4:2,r=q(2*n+6);return r.write_shift(n,e.s.r),r.write_shift(n,e.e.r+1),r.write_shift(2,e.s.c),r.write_shift(2,e.e.c+1),r.write_shift(2,0),r}function Nf(e,t,n,r){var i=n&&n.biff==5;r||=q(i?16:20),r.write_shift(2,0),e.style?(r.write_shift(2,e.numFmtId||0),r.write_shift(2,65524)):(r.write_shift(2,e.numFmtId||0),r.write_shift(2,t<<4));var a=0;return e.numFmtId>0&&i&&(a|=1024),r.write_shift(4,a),r.write_shift(4,0),i||r.write_shift(4,0),r.write_shift(2,0),r}function Pf(e){var t=q(8);return t.write_shift(4,0),t.write_shift(2,e[0]?e[0]+1:0),t.write_shift(2,e[1]?e[1]+1:0),t}function Ff(e,t,n,r,i,a){var o=q(8);return vf(e,t,r,o),lf(n,a,o),o}function If(e,t,n,r){var i=q(14);return vf(e,t,r,i),ud(n,i),i}function Lf(e,t,n){if(n.biff<8)return Rf(e,t,n);for(var r=[],i=e.l+t,a=e.read_shift(n.biff>8?4:2);a--!==0;)r.push(yf(e,n.biff>8?12:6,n));if(e.l!=i)throw Error(`Bad ExternSheet: `+e.l+` != `+i);return r}function Rf(e,t,n){e[e.l+1]==3&&e[e.l]++;var r=uf(e,t,n);return r.charCodeAt(0)==3?r.slice(1):r}function zf(e){var t=q(2+e.length*8);t.write_shift(2,e.length);for(var n=0;n<e.length;++n)xf(e[n],t);return t}function Bf(e){var t=q(24),n=Du(e[0]);t.write_shift(2,n.r),t.write_shift(2,n.r),t.write_shift(2,n.c),t.write_shift(2,n.c);for(var r=`d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b`.split(` `),i=0;i<16;++i)t.write_shift(1,parseInt(r[i],16));return bs([t,_f(e[1])])}function Vf(e){var t=e[1].Tooltip,n=q(10+2*(t.length+1));n.write_shift(2,2048);var r=Du(e[0]);n.write_shift(2,r.r),n.write_shift(2,r.r),n.write_shift(2,r.c),n.write_shift(2,r.c);for(var i=0;i<t.length;++i)n.write_shift(2,t.charCodeAt(i));return n.write_shift(2,0),n}function Hf(e){return e||=q(4),e.write_shift(2,1),e.write_shift(2,1),e}function Uf(e,t,n){if(!n.cellStyles)return fu(e,t);var r=n&&n.biff>=12?4:2,i=e.read_shift(r),a=e.read_shift(r),o=e.read_shift(r),s=e.read_shift(r),c=e.read_shift(2);r==2&&(e.l+=2);var l={s:i,e:a,w:o,ixfe:s,flags:c};return(n.biff>=5||!n.biff)&&(l.level=c>>8&7),l}function Wf(e,t){var n=q(12);n.write_shift(2,t),n.write_shift(2,t),n.write_shift(2,e.width*256),n.write_shift(2,0);var r=0;return e.hidden&&(r|=1),n.write_shift(1,r),r=e.level||0,n.write_shift(1,r),n.write_shift(2,0),n}function Gf(e){for(var t=q(2*e),n=0;n<e;++n)t.write_shift(2,n+1);return t}function Kf(e,t,n){var r=q(15);return kv(r,e,t),r.write_shift(8,n,`f`),r}function qf(e,t,n){var r=q(9);return kv(r,e,t),r.write_shift(2,n),r}var Jf=(function(){var e={1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127,8:865,9:437,10:850,11:437,13:437,14:850,15:437,16:850,17:437,18:850,19:932,20:850,21:437,22:850,23:865,24:437,25:437,26:850,27:437,28:863,29:850,31:852,34:852,35:852,36:860,37:850,38:866,55:850,64:852,77:936,78:949,79:950,80:874,87:1252,88:1252,89:1252,108:863,134:737,135:852,136:857,204:1257,255:16969},t=Hc({1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127});function n(t,n){var r=[],i=ms(1);switch(n.type){case`base64`:i=gs(fs(t));break;case`binary`:i=gs(t);break;case`buffer`:case`array`:i=t;break}du(i,0);var a=i.read_shift(1),o=!!(a&136),s=!1,c=!1;switch(a){case 2:break;case 3:break;case 48:s=!0,o=!0;break;case 49:s=!0,o=!0;break;case 131:break;case 139:break;case 140:c=!0;break;case 245:break;default:throw Error(`DBF Unsupported Version: `+a.toString(16))}var l=0,u=521;a==2&&(l=i.read_shift(2)),i.l+=3,a!=2&&(l=i.read_shift(4)),l>1048576&&(l=1e6),a!=2&&(u=i.read_shift(2));var d=i.read_shift(2),f=n.codepage||1252;a!=2&&(i.l+=16,i.read_shift(1),i[i.l]!==0&&(f=e[i[i.l]]),i.l+=1,i.l+=2),c&&(i.l+=36);for(var p=[],m={},h=Math.min(i.length,a==2?521:u-10-(s?264:0)),g=c?32:11;i.l<h&&i[i.l]!=13;)switch(m={},m.name=ss.utils.decode(f,i.slice(i.l,i.l+g)).replace(/[\u0000\r\n].*$/g,``),i.l+=g,m.type=String.fromCharCode(i.read_shift(1)),a!=2&&!c&&(m.offset=i.read_shift(4)),m.len=i.read_shift(1),a==2&&(m.offset=i.read_shift(2)),m.dec=i.read_shift(1),m.name.length&&p.push(m),a!=2&&(i.l+=c?13:14),m.type){case`B`:(!s||m.len!=8)&&n.WTF&&console.log(`Skipping `+m.name+`:`+m.type);break;case`G`:case`P`:n.WTF&&console.log(`Skipping `+m.name+`:`+m.type);break;case`+`:case`0`:case`@`:case`C`:case`D`:case`F`:case`I`:case`L`:case`M`:case`N`:case`O`:case`T`:case`Y`:break;default:throw Error(`Unknown Field Type: `+m.type)}if(i[i.l]!==13&&(i.l=u-1),i.read_shift(1)!==13)throw Error(`DBF Terminator not found `+i.l+` `+i[i.l]);i.l=u;var _=0,v=0;for(r[0]=[],v=0;v!=p.length;++v)r[0][v]=p[v].name;for(;l-- >0;){if(i[i.l]===42){i.l+=d;continue}for(++i.l,r[++_]=[],v=0,v=0;v!=p.length;++v){var y=i.slice(i.l,i.l+p[v].len);i.l+=p[v].len,du(y,0);var b=ss.utils.decode(f,y);switch(p[v].type){case`C`:b.trim().length&&(r[_][v]=b.replace(/\s+$/,``));break;case`D`:b.length===8?r[_][v]=new Date(+b.slice(0,4),b.slice(4,6)-1,+b.slice(6,8)):r[_][v]=b;break;case`F`:r[_][v]=parseFloat(b.trim());break;case`+`:case`I`:r[_][v]=c?y.read_shift(-4,`i`)^2147483648:y.read_shift(4,`i`);break;case`L`:switch(b.trim().toUpperCase()){case`Y`:case`T`:r[_][v]=!0;break;case`N`:case`F`:r[_][v]=!1;break;case``:case`?`:break;default:throw Error(`DBF Unrecognized L:|`+b+`|`)}break;case`M`:if(!o)throw Error(`DBF Unexpected MEMO for type `+a.toString(16));r[_][v]=`##MEMO##`+(c?parseInt(b.trim(),10):y.read_shift(4));break;case`N`:b=b.replace(/\u0000/g,``).trim(),b&&b!=`.`&&(r[_][v]=+b||0);break;case`@`:r[_][v]=new Date(y.read_shift(-8,`f`)-621356832e5);break;case`T`:r[_][v]=new Date((y.read_shift(4)-2440588)*864e5+y.read_shift(4));break;case`Y`:r[_][v]=y.read_shift(4,`i`)/1e4+y.read_shift(4,`i`)/1e4*2**32;break;case`O`:r[_][v]=-y.read_shift(-8,`f`);break;case`B`:if(s&&p[v].len==8){r[_][v]=y.read_shift(8,`f`);break}case`G`:case`P`:y.l+=p[v].len;break;case`0`:if(p[v].name===`_NullFlags`)break;default:throw Error(`DBF Unsupported data type `+p[v].type)}}}if(a!=2&&i.l<i.length&&i[i.l++]!=26)throw Error(`DBF EOF Marker missing `+(i.l-1)+` of `+i.length+` `+i[i.l-1].toString(16));return n&&n.sheetRows&&(r=r.slice(0,n.sheetRows)),n.DBF=p,r}function r(e,t){var r=t||{};r.dateNF||=`yyyymmdd`;var i=Iu(n(e,r),r);return i[`!cols`]=r.DBF.map(function(e){return{wch:e.len,DBF:e}}),delete r.DBF,i}function i(e,t){try{return Pu(r(e,t),t)}catch(e){if(t&&t.WTF)throw e}return{SheetNames:[],Sheets:{}}}var a={B:8,C:250,L:1,D:8,"?":0,"":0};function o(e,n){var r=n||{};if(+r.codepage>=0&&ns(+r.codepage),r.type==`string`)throw Error(`Cannot write DBF to JS string`);var i=pu(),o=By(e,{header:1,raw:!0,cellDates:!0}),s=o[0],c=o.slice(1),l=e[`!cols`]||[],u=0,d=0,f=0,p=1;for(u=0;u<s.length;++u){if(((l[u]||{}).DBF||{}).name){s[u]=l[u].DBF.name,++f;continue}if(s[u]!=null){if(++f,typeof s[u]==`number`&&(s[u]=s[u].toString(10)),typeof s[u]!=`string`)throw Error(`DBF Invalid column name `+s[u]+` |`+typeof s[u]+`|`);if(s.indexOf(s[u])!==u){for(d=0;d<1024;++d)if(s.indexOf(s[u]+`_`+d)==-1){s[u]+=`_`+d;break}}}}var m=ju(e[`!ref`]),h=[],g=[],_=[];for(u=0;u<=m.e.c-m.s.c;++u){var v=``,y=``,b=0,x=[];for(d=0;d<c.length;++d)c[d][u]!=null&&x.push(c[d][u]);if(x.length==0||s[u]==null){h[u]=`?`;continue}for(d=0;d<x.length;++d){switch(typeof x[d]){case`number`:y=`B`;break;case`string`:y=`C`;break;case`boolean`:y=`L`;break;case`object`:y=x[d]instanceof Date?`D`:`C`;break;default:y=`C`}b=Math.max(b,String(x[d]).length),v=v&&v!=y?`C`:y}b>250&&(b=250),y=((l[u]||{}).DBF||{}).type,y==`C`&&l[u].DBF.len>b&&(b=l[u].DBF.len),v==`B`&&y==`N`&&(v=`N`,_[u]=l[u].DBF.dec,b=l[u].DBF.len),g[u]=v==`C`||y==`N`?b:a[v]||0,p+=g[u],h[u]=v}var S=i.next(32);for(S.write_shift(4,318902576),S.write_shift(4,c.length),S.write_shift(2,296+32*f),S.write_shift(2,p),u=0;u<4;++u)S.write_shift(4,0);for(S.write_shift(4,0|(+t[Zo]||3)<<8),u=0,d=0;u<s.length;++u)if(s[u]!=null){var C=i.next(32),w=(s[u].slice(-10)+`\0\0\0\0\0\0\0\0\0\0\0`).slice(0,11);C.write_shift(1,w,`sbcs`),C.write_shift(1,h[u]==`?`?`C`:h[u],`sbcs`),C.write_shift(4,d),C.write_shift(1,g[u]||a[h[u]]||0),C.write_shift(1,_[u]||0),C.write_shift(1,2),C.write_shift(4,0),C.write_shift(1,0),C.write_shift(4,0),C.write_shift(4,0),d+=g[u]||a[h[u]]||0}var T=i.next(264);for(T.write_shift(4,13),u=0;u<65;++u)T.write_shift(4,0);for(u=0;u<c.length;++u){var E=i.next(p);for(E.write_shift(1,0),d=0;d<s.length;++d)if(s[d]!=null)switch(h[d]){case`L`:E.write_shift(1,c[u][d]==null?63:c[u][d]?84:70);break;case`B`:E.write_shift(8,c[u][d]||0,`f`);break;case`N`:var D=`0`;for(typeof c[u][d]==`number`&&(D=c[u][d].toFixed(_[d]||0)),f=0;f<g[d]-D.length;++f)E.write_shift(1,32);E.write_shift(1,D,`sbcs`);break;case`D`:c[u][d]?(E.write_shift(4,(`0000`+c[u][d].getFullYear()).slice(-4),`sbcs`),E.write_shift(2,(`00`+(c[u][d].getMonth()+1)).slice(-2),`sbcs`),E.write_shift(2,(`00`+c[u][d].getDate()).slice(-2),`sbcs`)):E.write_shift(8,`00000000`,`sbcs`);break;case`C`:var O=String(c[u][d]==null?``:c[u][d]).slice(0,g[d]);for(E.write_shift(1,O,`sbcs`),f=0;f<g[d]-O.length;++f)E.write_shift(1,32);break}}return i.next(1).write_shift(1,26),i.end()}return{to_workbook:i,to_sheet:r,from_sheet:o}})(),Yf=(function(){var e={AA:`À`,BA:`Á`,CA:`Â`,DA:195,HA:`Ä`,JA:197,AE:`È`,BE:`É`,CE:`Ê`,HE:`Ë`,AI:`Ì`,BI:`Í`,CI:`Î`,HI:`Ï`,AO:`Ò`,BO:`Ó`,CO:`Ô`,DO:213,HO:`Ö`,AU:`Ù`,BU:`Ú`,CU:`Û`,HU:`Ü`,Aa:`à`,Ba:`á`,Ca:`â`,Da:227,Ha:`ä`,Ja:229,Ae:`è`,Be:`é`,Ce:`ê`,He:`ë`,Ai:`ì`,Bi:`í`,Ci:`î`,Hi:`ï`,Ao:`ò`,Bo:`ó`,Co:`ô`,Do:245,Ho:`ö`,Au:`ù`,Bu:`ú`,Cu:`û`,Hu:`ü`,KC:`Ç`,Kc:`ç`,q:`æ`,z:`œ`,a:`Æ`,j:`Œ`,DN:209,Dn:241,Hy:255,S:169,c:170,R:174,"B ":180,0:176,1:177,2:178,3:179,5:181,6:182,7:183,Q:185,k:186,b:208,i:216,l:222,s:240,y:248,"!":161,'"':162,"#":163,"(":164,"%":165,"'":167,"H ":168,"+":171,";":187,"<":188,"=":189,">":190,"?":191,"{":223},t=RegExp(`\x1BN(`+Bc(e).join(`|`).replace(/\|\|\|/,`|\\||`).replace(/([?()+])/g,`\\$1`)+`|\\|)`,`gm`),n=function(t,n){var r=e[n];return typeof r==`number`?os(r):r},r=function(e,t,n){var r=t.charCodeAt(0)-32<<4|n.charCodeAt(0)-48;return r==59?e:os(r)};e[`|`]=254;function i(e,t){switch(t.type){case`base64`:return a(fs(e),t);case`binary`:return a(e,t);case`buffer`:return a(z&&Buffer.isBuffer(e)?e.toString(`binary`):vs(e),t);case`array`:return a(tl(e),t)}throw Error(`Unrecognized type `+t.type)}function a(e,i){var a=e.split(/[\n\r]+/),o=-1,s=-1,c=0,l=0,u=[],d=[],f=null,p={},m=[],h=[],g=[],_=0,v;for(+i.codepage>=0&&ns(+i.codepage);c!==a.length;++c){_=0;var y=a[c].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g,r).replace(t,n),b=y.replace(/;;/g,`\0`).split(`;`).map(function(e){return e.replace(/\u0000/g,`;`)}),x=b[0],S;if(y.length>0)switch(x){case`ID`:break;case`E`:break;case`B`:break;case`O`:break;case`W`:break;case`P`:b[1].charAt(0)==`P`&&d.push(y.slice(3).replace(/;;/g,`;`));break;case`C`:var C=!1,w=!1,T=!1,E=!1,D=-1,O=-1;for(l=1;l<b.length;++l)switch(b[l].charAt(0)){case`A`:break;case`X`:s=parseInt(b[l].slice(1))-1,w=!0;break;case`Y`:for(o=parseInt(b[l].slice(1))-1,w||(s=0),v=u.length;v<=o;++v)u[v]=[];break;case`K`:S=b[l].slice(1),S.charAt(0)===`"`?S=S.slice(1,S.length-1):S===`TRUE`?S=!0:S===`FALSE`?S=!1:isNaN(il(S))?isNaN(ol(S).getDate())||(S=el(S)):(S=il(S),f!==null&&Cc(f)&&(S=Xc(S))),ss!==void 0&&typeof S==`string`&&(i||{}).type!=`string`&&(i||{}).codepage&&(S=ss.utils.decode(i.codepage,S)),C=!0;break;case`E`:E=!0;var k=hm(b[l].slice(1),{r:o,c:s});u[o][s]=[u[o][s],k];break;case`S`:T=!0,u[o][s]=[u[o][s],`S5S`];break;case`G`:break;case`R`:D=parseInt(b[l].slice(1))-1;break;case`C`:O=parseInt(b[l].slice(1))-1;break;default:if(i&&i.WTF)throw Error(`SYLK bad record `+y)}if(C&&(u[o][s]&&u[o][s].length==2?u[o][s][0]=S:u[o][s]=S,f=null),T){if(E)throw Error(`SYLK shared formula cannot have own formula`);var ee=D>-1&&u[D][O];if(!ee||!ee[1])throw Error(`SYLK shared formula cannot find base`);u[o][s][1]=vm(ee[1],{r:o-D,c:s-O})}break;case`F`:var te=0;for(l=1;l<b.length;++l)switch(b[l].charAt(0)){case`X`:s=parseInt(b[l].slice(1))-1,++te;break;case`Y`:for(o=parseInt(b[l].slice(1))-1,v=u.length;v<=o;++v)u[v]=[];break;case`M`:_=parseInt(b[l].slice(1))/20;break;case`F`:break;case`G`:break;case`P`:f=d[parseInt(b[l].slice(1))];break;case`S`:break;case`D`:break;case`N`:break;case`W`:for(g=b[l].slice(1).split(` `),v=parseInt(g[0],10);v<=parseInt(g[1],10);++v)_=parseInt(g[2],10),h[v-1]=_===0?{hidden:!0}:{wch:_},mp(h[v-1]);break;case`C`:s=parseInt(b[l].slice(1))-1,h[s]||(h[s]={});break;case`R`:o=parseInt(b[l].slice(1))-1,m[o]||(m[o]={}),_>0?(m[o].hpt=_,m[o].hpx=_p(_)):_===0&&(m[o].hidden=!0);break;default:if(i&&i.WTF)throw Error(`SYLK bad record `+y)}te<1&&(f=null);break;default:if(i&&i.WTF)throw Error(`SYLK bad record `+y)}}return m.length>0&&(p[`!rows`]=m),h.length>0&&(p[`!cols`]=h),i&&i.sheetRows&&(u=u.slice(0,i.sheetRows)),[u,p]}function o(e,t){var n=i(e,t),r=n[0],a=n[1],o=Iu(r,t);return Bc(a).forEach(function(e){o[e]=a[e]}),o}function s(e,t){return Pu(o(e,t),t)}function c(e,t,n,r){var i=`C;Y`+(n+1)+`;X`+(r+1)+`;K`;switch(e.t){case`n`:i+=e.v||0,e.f&&!e.F&&(i+=`;E`+_m(e.f,{r:n,c:r}));break;case`b`:i+=e.v?`TRUE`:`FALSE`;break;case`e`:i+=e.w||e.v;break;case`d`:i+=`"`+(e.w||e.v)+`"`;break;case`s`:i+=`"`+e.v.replace(/"/g,``).replace(/;/g,`;;`)+`"`;break}return i}function l(e,t){t.forEach(function(t,n){var r=`F;W`+(n+1)+` `+(n+1)+` `;t.hidden?r+=`0`:(typeof t.width==`number`&&!t.wpx&&(t.wpx=dp(t.width)),typeof t.wpx==`number`&&!t.wch&&(t.wch=fp(t.wpx)),typeof t.wch==`number`&&(r+=Math.round(t.wch))),r.charAt(r.length-1)!=` `&&e.push(r)})}function u(e,t){t.forEach(function(t,n){var r=`F;`;t.hidden?r+=`M0;`:t.hpt?r+=`M`+20*t.hpt+`;`:t.hpx&&(r+=`M`+20*gp(t.hpx)+`;`),r.length>2&&e.push(r+`R`+(n+1))})}function d(e,t){var n=[`ID;PWXL;N;E`],r=[],i=ju(e[`!ref`]),a,o=Array.isArray(e),s=`\r
`;n.push(`P;PGeneral`),n.push(`F;P0;DG0G8;M255`),e[`!cols`]&&l(n,e[`!cols`]),e[`!rows`]&&u(n,e[`!rows`]),n.push(`B;Y`+(i.e.r-i.s.r+1)+`;X`+(i.e.c-i.s.c+1)+`;D`+[i.s.c,i.s.r,i.e.c,i.e.r].join(` `));for(var d=i.s.r;d<=i.e.r;++d)for(var f=i.s.c;f<=i.e.c;++f){var p=Ou({r:d,c:f});a=o?(e[d]||[])[f]:e[p],!(!a||a.v==null&&(!a.f||a.F))&&r.push(c(a,e,d,f,t))}return n.join(s)+s+r.join(s)+s+`E`+s}return{to_workbook:s,to_sheet:o,from_sheet:d}})(),Xf=(function(){function e(e,n){switch(n.type){case`base64`:return t(fs(e),n);case`binary`:return t(e,n);case`buffer`:return t(z&&Buffer.isBuffer(e)?e.toString(`binary`):vs(e),n);case`array`:return t(tl(e),n)}throw Error(`Unrecognized type `+n.type)}function t(e,t){for(var n=e.split(`
`),r=-1,i=-1,a=0,o=[];a!==n.length;++a){if(n[a].trim()===`BOT`){o[++r]=[],i=0;continue}if(!(r<0)){var s=n[a].trim().split(`,`),c=s[0],l=s[1];++a;for(var u=n[a]||``;(u.match(/["]/g)||[]).length&1&&a<n.length-1;)u+=`
`+n[++a];switch(u=u.trim(),+c){case-1:if(u===`BOT`){o[++r]=[],i=0;continue}else if(u!==`EOD`)throw Error(`Unrecognized DIF special command `+u);break;case 0:u===`TRUE`?o[r][i]=!0:u===`FALSE`?o[r][i]=!1:isNaN(il(l))?isNaN(ol(l).getDate())?o[r][i]=l:o[r][i]=el(l):o[r][i]=il(l),++i;break;case 1:u=u.slice(1,u.length-1),u=u.replace(/""/g,`"`),ls&&u&&u.match(/^=".*"$/)&&(u=u.slice(2,-1)),o[r][i++]=u===``?null:u;break}if(u===`EOD`)break}}return t&&t.sheetRows&&(o=o.slice(0,t.sheetRows)),o}function n(t,n){return Iu(e(t,n),n)}function r(e,t){return Pu(n(e,t),t)}return{to_workbook:r,to_sheet:n,from_sheet:(function(){var e=function(e,t,n,r,i){e.push(t),e.push(n+`,`+r),e.push(`"`+i.replace(/"/g,`""`)+`"`)},t=function(e,t,n,r){e.push(t+`,`+n),e.push(t==1?`"`+r.replace(/"/g,`""`)+`"`:r)};return function(n){var r=[],i=ju(n[`!ref`]),a,o=Array.isArray(n);e(r,`TABLE`,0,1,`sheetjs`),e(r,`VECTORS`,0,i.e.r-i.s.r+1,``),e(r,`TUPLES`,0,i.e.c-i.s.c+1,``),e(r,`DATA`,0,0,``);for(var s=i.s.r;s<=i.e.r;++s){t(r,-1,0,`BOT`);for(var c=i.s.c;c<=i.e.c;++c){var l=Ou({r:s,c});if(a=o?(n[s]||[])[c]:n[l],!a){t(r,1,0,``);continue}switch(a.t){case`n`:var u=ls?a.w:a.v;!u&&a.v!=null&&(u=a.v),u==null?ls&&a.f&&!a.F?t(r,1,0,`=`+a.f):t(r,1,0,``):t(r,0,u,`V`);break;case`b`:t(r,0,+!!a.v,a.v?`TRUE`:`FALSE`);break;case`s`:t(r,1,0,!ls||isNaN(a.v)?a.v:`="`+a.v+`"`);break;case`d`:a.w||=Oc(a.z||Is[14],Kc(el(a.v))),ls?t(r,0,a.w,`V`):t(r,1,0,a.w);break;default:t(r,1,0,``)}}}return t(r,-1,0,`EOD`),r.join(`\r
`)}})()}})(),Zf=(function(){function e(e){return e.replace(/\\b/g,`\\`).replace(/\\c/g,`:`).replace(/\\n/g,`
`)}function t(e){return e.replace(/\\/g,`\\b`).replace(/:/g,`\\c`).replace(/\n/g,`\\n`)}function n(t,n){for(var r=t.split(`
`),i=-1,a=-1,o=0,s=[];o!==r.length;++o){var c=r[o].trim().split(`:`);if(c[0]===`cell`){var l=Du(c[1]);if(s.length<=l.r)for(i=s.length;i<=l.r;++i)s[i]||(s[i]=[]);switch(i=l.r,a=l.c,c[2]){case`t`:s[i][a]=e(c[3]);break;case`v`:s[i][a]=+c[3];break;case`vtf`:var u=c[c.length-1];case`vtc`:switch(c[3]){case`nl`:s[i][a]=!!+c[4];break;default:s[i][a]=+c[4];break}c[2]==`vtf`&&(s[i][a]=[s[i][a],u])}}}return n&&n.sheetRows&&(s=s.slice(0,n.sheetRows)),s}function r(e,t){return Iu(n(e,t),t)}function i(e,t){return Pu(r(e,t),t)}var a=[`socialcalc:version:1.5`,`MIME-Version: 1.0`,`Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave`].join(`
`),o=[`--SocialCalcSpreadsheetControlSave`,`Content-type: text/plain; charset=UTF-8`].join(`
`)+`
`,s=[`# SocialCalc Spreadsheet Control Save`,`part:sheet`].join(`
`),c=`--SocialCalcSpreadsheetControlSave--`;function l(e){if(!e||!e[`!ref`])return``;for(var n=[],r=[],i,a=``,o=ku(e[`!ref`]),s=Array.isArray(e),c=o.s.r;c<=o.e.r;++c)for(var l=o.s.c;l<=o.e.c;++l)if(a=Ou({r:c,c:l}),i=s?(e[c]||[])[l]:e[a],!(!i||i.v==null||i.t===`z`)){switch(r=[`cell`,a,`t`],i.t){case`s`:case`str`:r.push(t(i.v));break;case`n`:i.f?(r[2]=`vtf`,r[3]=`n`,r[4]=i.v,r[5]=t(i.f)):(r[2]=`v`,r[3]=i.v);break;case`b`:r[2]=`vt`+(i.f?`f`:`c`),r[3]=`nl`,r[4]=i.v?`1`:`0`,r[5]=t(i.f||(i.v?`TRUE`:`FALSE`));break;case`d`:var u=Kc(el(i.v));r[2]=`vtc`,r[3]=`nd`,r[4]=``+u,r[5]=i.w||Oc(i.z||Is[14],u);break;case`e`:continue}n.push(r.join(`:`))}return n.push(`sheet:c:`+(o.e.c-o.s.c+1)+`:r:`+(o.e.r-o.s.r+1)+`:tvf:1`),n.push(`valueformat:1:text-wiki`),n.join(`
`)}function u(e){return[a,o,s,o,l(e),c].join(`
`)}return{to_workbook:i,to_sheet:r,from_sheet:u}})(),Qf=(function(){function e(e,t,n,r,i){i.raw?t[n][r]=e:e===``||(e===`TRUE`?t[n][r]=!0:e===`FALSE`?t[n][r]=!1:isNaN(il(e))?isNaN(ol(e).getDate())?t[n][r]=e:t[n][r]=el(e):t[n][r]=il(e))}function t(t,n){var r=n||{},i=[];if(!t||t.length===0)return i;for(var a=t.split(/[\r\n]/),o=a.length-1;o>=0&&a[o].length===0;)--o;for(var s=10,c=0,l=0;l<=o;++l)c=a[l].indexOf(` `),c==-1?c=a[l].length:c++,s=Math.max(s,c);for(l=0;l<=o;++l){i[l]=[];var u=0;for(e(a[l].slice(0,s).trim(),i,l,u,r),u=1;u<=(a[l].length-s)/10+1;++u)e(a[l].slice(s+(u-1)*10,s+u*10).trim(),i,l,u,r)}return r.sheetRows&&(i=i.slice(0,r.sheetRows)),i}var n={44:`,`,9:`	`,59:`;`,124:`|`},r={44:3,9:2,59:1,124:0};function i(e){for(var t={},i=!1,a=0,o=0;a<e.length;++a)(o=e.charCodeAt(a))==34?i=!i:!i&&o in n&&(t[o]=(t[o]||0)+1);for(a in o=[],t)Object.prototype.hasOwnProperty.call(t,a)&&o.push([t[a],a]);if(!o.length)for(a in t=r,t)Object.prototype.hasOwnProperty.call(t,a)&&o.push([t[a],a]);return o.sort(function(e,t){return e[0]-t[0]||r[e[1]]-r[t[1]]}),n[o.pop()[1]]||44}function a(e,t){var n=t||{},r=``;cs!=null&&n.dense==null&&(n.dense=cs);var a=n.dense?[]:{},o={s:{c:0,r:0},e:{c:0,r:0}};e.slice(0,4)==`sep=`?e.charCodeAt(5)==13&&e.charCodeAt(6)==10?(r=e.charAt(4),e=e.slice(7)):e.charCodeAt(5)==13||e.charCodeAt(5)==10?(r=e.charAt(4),e=e.slice(6)):r=i(e.slice(0,1024)):r=n&&n.FS?n.FS:i(e.slice(0,1024));var s=0,c=0,l=0,u=0,d=0,f=r.charCodeAt(0),p=!1,m=0,h=e.charCodeAt(0);e=e.replace(/\r\n/gm,`
`);var g=n.dateNF==null?null:Nc(n.dateNF);function _(){var t=e.slice(u,d),r={};if(t.charAt(0)==`"`&&t.charAt(t.length-1)==`"`&&(t=t.slice(1,-1).replace(/""/g,`"`)),t.length===0)r.t=`z`;else if(n.raw)r.t=`s`,r.v=t;else if(t.trim().length===0)r.t=`s`,r.v=t;else if(t.charCodeAt(0)==61)t.charCodeAt(1)==34&&t.charCodeAt(t.length-1)==34?(r.t=`s`,r.v=t.slice(2,-1).replace(/""/g,`"`)):ym(t)?(r.t=`n`,r.f=t.slice(1)):(r.t=`s`,r.v=t);else if(t==`TRUE`)r.t=`b`,r.v=!0;else if(t==`FALSE`)r.t=`b`,r.v=!1;else if(!isNaN(l=il(t)))r.t=`n`,n.cellText!==!1&&(r.w=t),r.v=l;else if(!isNaN(ol(t).getDate())||g&&t.match(g)){r.z=n.dateNF||Is[14];var i=0;g&&t.match(g)&&(t=Pc(t,n.dateNF,t.match(g)||[]),i=1),n.cellDates?(r.t=`d`,r.v=el(t,i)):(r.t=`n`,r.v=Kc(el(t,i))),n.cellText!==!1&&(r.w=Oc(r.z,r.v instanceof Date?Kc(r.v):r.v)),n.cellNF||delete r.z}else r.t=`s`,r.v=t;if(r.t==`z`||(n.dense?(a[s]||(a[s]=[]),a[s][c]=r):a[Ou({c,r:s})]=r),u=d+1,h=e.charCodeAt(u),o.e.c<c&&(o.e.c=c),o.e.r<s&&(o.e.r=s),m==f)++c;else if(c=0,++s,n.sheetRows&&n.sheetRows<=s)return!0}outer:for(;d<e.length;++d)switch(m=e.charCodeAt(d)){case 34:h===34&&(p=!p);break;case f:case 10:case 13:if(!p&&_())break outer;break;default:break}return d-u>0&&_(),a[`!ref`]=Au(o),a}function o(e,n){return!(n&&n.PRN)||n.FS||e.slice(0,4)==`sep=`||e.indexOf(`	`)>=0||e.indexOf(`,`)>=0||e.indexOf(`;`)>=0?a(e,n):Iu(t(e,n),n)}function s(e,t){var n=``,r=t.type==`string`?[0,0,0,0]:Ay(e,t);switch(t.type){case`base64`:n=fs(e);break;case`binary`:n=e;break;case`buffer`:n=t.codepage==65001?e.toString(`utf8`):t.codepage&&ss!==void 0?ss.utils.decode(t.codepage,e):z&&Buffer.isBuffer(e)?e.toString(`binary`):vs(e);break;case`array`:n=tl(e);break;case`string`:n=e;break;default:throw Error(`Unrecognized type `+t.type)}return r[0]==239&&r[1]==187&&r[2]==191?n=xl(n.slice(3)):t.type!=`string`&&t.type!=`buffer`&&t.codepage==65001?n=xl(n):t.type==`binary`&&ss!==void 0&&t.codepage&&(n=ss.utils.decode(t.codepage,ss.utils.encode(28591,n))),n.slice(0,19)==`socialcalc:version:`?Zf.to_sheet(t.type==`string`?n:xl(n),t):o(n,t)}function c(e,t){return Pu(s(e,t),t)}function l(e){for(var t=[],n=ju(e[`!ref`]),r,i=Array.isArray(e),a=n.s.r;a<=n.e.r;++a){for(var o=[],s=n.s.c;s<=n.e.c;++s){var c=Ou({r:a,c:s});if(r=i?(e[a]||[])[s]:e[c],!r||r.v==null){o.push(`          `);continue}for(var l=(r.w||(Nu(r),r.w)||``).slice(0,10);l.length<10;)l+=` `;o.push(l+(s===0?` `:``))}t.push(o.join(``))}return t.join(`
`)}return{to_workbook:c,to_sheet:s,from_sheet:l}})(),$f=(function(){function e(e,t,n){if(e){du(e,e.l||0);for(var r=n.Enum||A;e.l<e.length;){var i=e.read_shift(2),a=r[i]||r[65535],o=e.read_shift(2),s=e.l+o,c=a.f&&a.f(e,o,n);if(e.l=s,t(c,a,i))return}}}function t(e,t){switch(t.type){case`base64`:return n(gs(fs(e)),t);case`binary`:return n(gs(e),t);case`buffer`:case`array`:return n(e,t)}throw`Unsupported type `+t.type}function n(t,n){if(!t)return t;var r=n||{};cs!=null&&r.dense==null&&(r.dense=cs);var i=r.dense?[]:{},a=`Sheet1`,o=``,s=0,c={},l=[],u=[],d={s:{r:0,c:0},e:{r:0,c:0}},f=r.sheetRows||0;if(t[2]==0&&(t[3]==8||t[3]==9)&&t.length>=16&&t[14]==5&&t[15]===108)throw Error(`Unsupported Works 3 for Mac file`);if(t[2]==2)r.Enum=A,e(t,function(e,t,n){switch(n){case 0:r.vers=e,e>=4096&&(r.qpro=!0);break;case 6:d=e;break;case 204:e&&(o=e);break;case 222:o=e;break;case 15:case 51:r.qpro||(e[1].v=e[1].v.slice(1));case 13:case 14:case 16:n==14&&(e[2]&112)==112&&(e[2]&15)>1&&(e[2]&15)<15&&(e[1].z=r.dateNF||Is[14],r.cellDates&&(e[1].t=`d`,e[1].v=Xc(e[1].v))),r.qpro&&e[3]>s&&(i[`!ref`]=Au(d),c[a]=i,l.push(a),i=r.dense?[]:{},d={s:{r:0,c:0},e:{r:0,c:0}},s=e[3],a=o||`Sheet`+(s+1),o=``);var u=r.dense?(i[e[0].r]||[])[e[0].c]:i[Ou(e[0])];if(u){u.t=e[1].t,u.v=e[1].v,e[1].z!=null&&(u.z=e[1].z),e[1].f!=null&&(u.f=e[1].f);break}r.dense?(i[e[0].r]||(i[e[0].r]=[]),i[e[0].r][e[0].c]=e[1]):i[Ou(e[0])]=e[1];break;default:}},r);else if(t[2]==26||t[2]==14)r.Enum=j,t[2]==14&&(r.qpro=!0,t.l=0),e(t,function(e,t,n){switch(n){case 204:a=e;break;case 22:e[1].v=e[1].v.slice(1);case 23:case 24:case 25:case 37:case 39:case 40:if(e[3]>s&&(i[`!ref`]=Au(d),c[a]=i,l.push(a),i=r.dense?[]:{},d={s:{r:0,c:0},e:{r:0,c:0}},s=e[3],a=`Sheet`+(s+1)),f>0&&e[0].r>=f)break;r.dense?(i[e[0].r]||(i[e[0].r]=[]),i[e[0].r][e[0].c]=e[1]):i[Ou(e[0])]=e[1],d.e.c<e[0].c&&(d.e.c=e[0].c),d.e.r<e[0].r&&(d.e.r=e[0].r);break;case 27:e[14e3]&&(u[e[14e3][0]]=e[14e3][1]);break;case 1537:u[e[0]]=e[1],e[0]==s&&(a=e[1]);break;default:break}},r);else throw Error(`Unrecognized LOTUS BOF `+t[2]);if(i[`!ref`]=Au(d),c[o||a]=i,l.push(o||a),!u.length)return{SheetNames:l,Sheets:c};for(var p={},m=[],h=0;h<u.length;++h)c[l[h]]?(m.push(u[h]||l[h]),p[u[h]]=c[u[h]]||c[l[h]]):(m.push(u[h]),p[u[h]]={"!ref":`A1`});return{SheetNames:m,Sheets:p}}function r(e,t){var n=t||{};if(+n.codepage>=0&&ns(+n.codepage),n.type==`string`)throw Error(`Cannot write WK1 to JS string`);var r=pu(),i=ju(e[`!ref`]),o=Array.isArray(e),s=[];Q(r,0,a(1030)),Q(r,6,c(i));for(var l=Math.min(i.e.r,8191),u=i.s.r;u<=l;++u)for(var f=yu(u),m=i.s.c;m<=i.e.c;++m){u===i.s.r&&(s[m]=Cu(m));var g=s[m]+f,_=o?(e[u]||[])[m]:e[g];if(!(!_||_.t==`z`))if(_.t==`n`)(_.v|0)==_.v&&_.v>=-32768&&_.v<=32767?Q(r,13,p(u,m,_.v)):Q(r,14,h(u,m,_.v));else{var v=Nu(_);Q(r,15,d(u,m,v.slice(0,239)))}}return Q(r,1),r.end()}function i(e,t){var n=t||{};if(+n.codepage>=0&&ns(+n.codepage),n.type==`string`)throw Error(`Cannot write WK3 to JS string`);var r=pu();Q(r,0,o(e));for(var i=0,a=0;i<e.SheetNames.length;++i)(e.Sheets[e.SheetNames[i]]||{})[`!ref`]&&Q(r,27,ae(e.SheetNames[i],a++));var s=0;for(i=0;i<e.SheetNames.length;++i){var c=e.Sheets[e.SheetNames[i]];if(!(!c||!c[`!ref`])){for(var l=ju(c[`!ref`]),u=Array.isArray(c),d=[],f=Math.min(l.e.r,8191),p=l.s.r;p<=f;++p)for(var m=yu(p),h=l.s.c;h<=l.e.c;++h){p===l.s.r&&(d[h]=Cu(h));var g=d[h]+m,_=u?(c[p]||[])[h]:c[g];if(!(!_||_.t==`z`))if(_.t==`n`)Q(r,23,E(p,h,s,_.v));else{var v=Nu(_);Q(r,22,C(p,h,s,v.slice(0,239)))}}++s}}return Q(r,1),r.end()}function a(e){var t=q(2);return t.write_shift(2,e),t}function o(e){var t=q(26);t.write_shift(2,4096),t.write_shift(2,4),t.write_shift(4,0);for(var n=0,r=0,i=0,a=0;a<e.SheetNames.length;++a){var o=e.SheetNames[a],s=e.Sheets[o];if(!(!s||!s[`!ref`])){++i;var c=ku(s[`!ref`]);n<c.e.r&&(n=c.e.r),r<c.e.c&&(r=c.e.c)}}return n>8191&&(n=8191),t.write_shift(2,n),t.write_shift(1,i),t.write_shift(1,r),t.write_shift(2,0),t.write_shift(2,0),t.write_shift(1,1),t.write_shift(1,2),t.write_shift(4,0),t.write_shift(4,0),t}function s(e,t,n){var r={s:{c:0,r:0},e:{c:0,r:0}};return t==8&&n.qpro?(r.s.c=e.read_shift(1),e.l++,r.s.r=e.read_shift(2),r.e.c=e.read_shift(1),e.l++,r.e.r=e.read_shift(2),r):(r.s.c=e.read_shift(2),r.s.r=e.read_shift(2),t==12&&n.qpro&&(e.l+=2),r.e.c=e.read_shift(2),r.e.r=e.read_shift(2),t==12&&n.qpro&&(e.l+=2),r.s.c==65535&&(r.s.c=r.e.c=r.s.r=r.e.r=0),r)}function c(e){var t=q(8);return t.write_shift(2,e.s.c),t.write_shift(2,e.s.r),t.write_shift(2,e.e.c),t.write_shift(2,e.e.r),t}function l(e,t,n){var r=[{c:0,r:0},{t:`n`,v:0},0,0];return n.qpro&&n.vers!=20768?(r[0].c=e.read_shift(1),r[3]=e.read_shift(1),r[0].r=e.read_shift(2),e.l+=2):(r[2]=e.read_shift(1),r[0].c=e.read_shift(2),r[0].r=e.read_shift(2)),r}function u(e,t,n){var r=e.l+t,i=l(e,t,n);if(i[1].t=`s`,n.vers==20768){e.l++;var a=e.read_shift(1);return i[1].v=e.read_shift(a,`utf8`),i}return n.qpro&&e.l++,i[1].v=e.read_shift(r-e.l,`cstr`),i}function d(e,t,n){var r=q(7+n.length);r.write_shift(1,255),r.write_shift(2,t),r.write_shift(2,e),r.write_shift(1,39);for(var i=0;i<r.length;++i){var a=n.charCodeAt(i);r.write_shift(1,a>=128?95:a)}return r.write_shift(1,0),r}function f(e,t,n){var r=l(e,t,n);return r[1].v=e.read_shift(2,`i`),r}function p(e,t,n){var r=q(7);return r.write_shift(1,255),r.write_shift(2,t),r.write_shift(2,e),r.write_shift(2,n,`i`),r}function m(e,t,n){var r=l(e,t,n);return r[1].v=e.read_shift(8,`f`),r}function h(e,t,n){var r=q(13);return r.write_shift(1,255),r.write_shift(2,t),r.write_shift(2,e),r.write_shift(8,n,`f`),r}function g(e,t,n){var r=e.l+t,i=l(e,t,n);if(i[1].v=e.read_shift(8,`f`),n.qpro)e.l=r;else{var a=e.read_shift(2);b(e.slice(e.l,e.l+a),i),e.l+=a}return i}function _(e,t,n){var r=t&32768;return t&=-32769,t=(r?e:0)+(t>=8192?t-16384:t),(r?``:`$`)+(n?Cu(t):yu(t))}var v={51:[`FALSE`,0],52:[`TRUE`,0],70:[`LEN`,1],80:[`SUM`,69],81:[`AVERAGEA`,69],82:[`COUNTA`,69],83:[`MINA`,69],84:[`MAXA`,69],111:[`T`,1]},y=`.........+.-.*./.^.=.<>.<=.>=.<.>.....&.......`.split(`.`);function b(e,t){du(e,0);for(var n=[],r=0,i=``,a=``,o=``,s=``;e.l<e.length;){var c=e[e.l++];switch(c){case 0:n.push(e.read_shift(8,`f`));break;case 1:a=_(t[0].c,e.read_shift(2),!0),i=_(t[0].r,e.read_shift(2),!1),n.push(a+i);break;case 2:var l=_(t[0].c,e.read_shift(2),!0),u=_(t[0].r,e.read_shift(2),!1);a=_(t[0].c,e.read_shift(2),!0),i=_(t[0].r,e.read_shift(2),!1),n.push(l+u+`:`+a+i);break;case 3:if(e.l<e.length){console.error(`WK1 premature formula end`);return}break;case 4:n.push(`(`+n.pop()+`)`);break;case 5:n.push(e.read_shift(2));break;case 6:for(var d=``;c=e[e.l++];)d+=String.fromCharCode(c);n.push(`"`+d.replace(/"/g,`""`)+`"`);break;case 8:n.push(`-`+n.pop());break;case 23:n.push(`+`+n.pop());break;case 22:n.push(`NOT(`+n.pop()+`)`);break;case 20:case 21:s=n.pop(),o=n.pop(),n.push([`AND`,`OR`][c-20]+`(`+o+`,`+s+`)`);break;default:if(c<32&&y[c])s=n.pop(),o=n.pop(),n.push(o+y[c]+s);else if(v[c]){if(r=v[c][1],r==69&&(r=e[e.l++]),r>n.length){console.error(`WK1 bad formula parse 0x`+c.toString(16)+`:|`+n.join(`|`)+`|`);return}var f=n.slice(-r);n.length-=r,n.push(v[c][0]+`(`+f.join(`,`)+`)`)}else if(c<=7)return console.error(`WK1 invalid opcode `+c.toString(16));else if(c<=24)return console.error(`WK1 unsupported op `+c.toString(16));else if(c<=30)return console.error(`WK1 invalid opcode `+c.toString(16));else if(c<=115)return console.error(`WK1 unsupported function opcode `+c.toString(16));else return console.error(`WK1 unrecognized opcode `+c.toString(16))}}n.length==1?t[1].f=``+n[0]:console.error(`WK1 bad formula parse |`+n.join(`|`)+`|`)}function x(e){var t=[{c:0,r:0},{t:`n`,v:0},0];return t[0].r=e.read_shift(2),t[3]=e[e.l++],t[0].c=e[e.l++],t}function S(e,t){var n=x(e,t);return n[1].t=`s`,n[1].v=e.read_shift(t-4,`cstr`),n}function C(e,t,n,r){var i=q(6+r.length);i.write_shift(2,e),i.write_shift(1,n),i.write_shift(1,t),i.write_shift(1,39);for(var a=0;a<r.length;++a){var o=r.charCodeAt(a);i.write_shift(1,o>=128?95:o)}return i.write_shift(1,0),i}function w(e,t){var n=x(e,t);n[1].v=e.read_shift(2);var r=n[1].v>>1;if(n[1].v&1)switch(r&7){case 0:r=(r>>3)*5e3;break;case 1:r=(r>>3)*500;break;case 2:r=(r>>3)/20;break;case 3:r=(r>>3)/200;break;case 4:r=(r>>3)/2e3;break;case 5:r=(r>>3)/2e4;break;case 6:r=(r>>3)/16;break;case 7:r=(r>>3)/64;break}return n[1].v=r,n}function T(e,t){var n=x(e,t),r=e.read_shift(4),i=e.read_shift(4),a=e.read_shift(2);if(a==65535)return r===0&&i===3221225472?(n[1].t=`e`,n[1].v=15):r===0&&i===3489660928?(n[1].t=`e`,n[1].v=42):n[1].v=0,n;var o=a&32768;return a=(a&32767)-16446,n[1].v=(1-o*2)*(i*2**(a+32)+r*2**a),n}function E(e,t,n,r){var i=q(14);if(i.write_shift(2,e),i.write_shift(1,n),i.write_shift(1,t),r==0)return i.write_shift(4,0),i.write_shift(4,0),i.write_shift(2,65535),i;var a=0,o=0,s=0,c=0;return r<0&&(a=1,r=-r),o=Math.log2(r)|0,r/=2**(o-31),c=r>>>0,c&2147483648||(r/=2,++o,c=r>>>0),r-=c,c|=2147483648,c>>>=0,r*=2**32,s=r>>>0,i.write_shift(4,s),i.write_shift(4,c),o+=16383+(a?32768:0),i.write_shift(2,o),i}function D(e,t){var n=T(e,14);return e.l+=t-14,n}function O(e,t){var n=x(e,t),r=e.read_shift(4);return n[1].v=r>>6,n}function k(e,t){var n=x(e,t),r=e.read_shift(8,`f`);return n[1].v=r,n}function ee(e,t){var n=k(e,14);return e.l+=t-10,n}function te(e,t){return e[e.l+t-1]==0?e.read_shift(t,`cstr`):``}function ne(e,t){var n=e[e.l++];n>t-1&&(n=t-1);for(var r=``;r.length<n;)r+=String.fromCharCode(e[e.l++]);return r}function re(e,t,n){if(!(!n.qpro||t<21)){var r=e.read_shift(1);return e.l+=17,e.l+=1,e.l+=2,[r,e.read_shift(t-21,`cstr`)]}}function ie(e,t){for(var n={},r=e.l+t;e.l<r;){var i=e.read_shift(2);if(i==14e3){for(n[i]=[0,``],n[i][0]=e.read_shift(2);e[e.l];)n[i][1]+=String.fromCharCode(e[e.l]),e.l++;e.l++}}return n}function ae(e,t){var n=q(5+e.length);n.write_shift(2,14e3),n.write_shift(2,t);for(var r=0;r<e.length;++r){var i=e.charCodeAt(r);n[n.l++]=i>127?95:i}return n[n.l++]=0,n}var A={0:{n:`BOF`,f:sf},1:{n:`EOF`},2:{n:`CALCMODE`},3:{n:`CALCORDER`},4:{n:`SPLIT`},5:{n:`SYNC`},6:{n:`RANGE`,f:s},7:{n:`WINDOW1`},8:{n:`COLW1`},9:{n:`WINTWO`},10:{n:`COLW2`},11:{n:`NAME`},12:{n:`BLANK`},13:{n:`INTEGER`,f},14:{n:`NUMBER`,f:m},15:{n:`LABEL`,f:u},16:{n:`FORMULA`,f:g},24:{n:`TABLE`},25:{n:`ORANGE`},26:{n:`PRANGE`},27:{n:`SRANGE`},28:{n:`FRANGE`},29:{n:`KRANGE1`},32:{n:`HRANGE`},35:{n:`KRANGE2`},36:{n:`PROTEC`},37:{n:`FOOTER`},38:{n:`HEADER`},39:{n:`SETUP`},40:{n:`MARGINS`},41:{n:`LABELFMT`},42:{n:`TITLES`},43:{n:`SHEETJS`},45:{n:`GRAPH`},46:{n:`NGRAPH`},47:{n:`CALCCOUNT`},48:{n:`UNFORMATTED`},49:{n:`CURSORW12`},50:{n:`WINDOW`},51:{n:`STRING`,f:u},55:{n:`PASSWORD`},56:{n:`LOCKED`},60:{n:`QUERY`},61:{n:`QUERYNAME`},62:{n:`PRINT`},63:{n:`PRINTNAME`},64:{n:`GRAPH2`},65:{n:`GRAPHNAME`},66:{n:`ZOOM`},67:{n:`SYMSPLIT`},68:{n:`NSROWS`},69:{n:`NSCOLS`},70:{n:`RULER`},71:{n:`NNAME`},72:{n:`ACOMM`},73:{n:`AMACRO`},74:{n:`PARSE`},102:{n:`PRANGES??`},103:{n:`RRANGES??`},104:{n:`FNAME??`},105:{n:`MRANGES??`},204:{n:`SHEETNAMECS`,f:te},222:{n:`SHEETNAMELP`,f:ne},65535:{n:``}},j={0:{n:`BOF`},1:{n:`EOF`},2:{n:`PASSWORD`},3:{n:`CALCSET`},4:{n:`WINDOWSET`},5:{n:`SHEETCELLPTR`},6:{n:`SHEETLAYOUT`},7:{n:`COLUMNWIDTH`},8:{n:`HIDDENCOLUMN`},9:{n:`USERRANGE`},10:{n:`SYSTEMRANGE`},11:{n:`ZEROFORCE`},12:{n:`SORTKEYDIR`},13:{n:`FILESEAL`},14:{n:`DATAFILLNUMS`},15:{n:`PRINTMAIN`},16:{n:`PRINTSTRING`},17:{n:`GRAPHMAIN`},18:{n:`GRAPHSTRING`},19:{n:`??`},20:{n:`ERRCELL`},21:{n:`NACELL`},22:{n:`LABEL16`,f:S},23:{n:`NUMBER17`,f:T},24:{n:`NUMBER18`,f:w},25:{n:`FORMULA19`,f:D},26:{n:`FORMULA1A`},27:{n:`XFORMAT`,f:ie},28:{n:`DTLABELMISC`},29:{n:`DTLABELCELL`},30:{n:`GRAPHWINDOW`},31:{n:`CPA`},32:{n:`LPLAUTO`},33:{n:`QUERY`},34:{n:`HIDDENSHEET`},35:{n:`??`},37:{n:`NUMBER25`,f:O},38:{n:`??`},39:{n:`NUMBER27`,f:k},40:{n:`FORMULA28`,f:ee},142:{n:`??`},147:{n:`??`},150:{n:`??`},151:{n:`??`},152:{n:`??`},153:{n:`??`},154:{n:`??`},155:{n:`??`},156:{n:`??`},163:{n:`??`},174:{n:`??`},175:{n:`??`},176:{n:`??`},177:{n:`??`},184:{n:`??`},185:{n:`??`},186:{n:`??`},187:{n:`??`},188:{n:`??`},195:{n:`??`},201:{n:`??`},204:{n:`SHEETNAMECS`,f:te},205:{n:`??`},206:{n:`??`},207:{n:`??`},208:{n:`??`},256:{n:`??`},259:{n:`??`},260:{n:`??`},261:{n:`??`},262:{n:`??`},263:{n:`??`},265:{n:`??`},266:{n:`??`},267:{n:`??`},268:{n:`??`},270:{n:`??`},271:{n:`??`},384:{n:`??`},389:{n:`??`},390:{n:`??`},393:{n:`??`},396:{n:`??`},512:{n:`??`},514:{n:`??`},513:{n:`??`},516:{n:`??`},517:{n:`??`},640:{n:`??`},641:{n:`??`},642:{n:`??`},643:{n:`??`},644:{n:`??`},645:{n:`??`},646:{n:`??`},647:{n:`??`},648:{n:`??`},658:{n:`??`},659:{n:`??`},660:{n:`??`},661:{n:`??`},662:{n:`??`},665:{n:`??`},666:{n:`??`},768:{n:`??`},772:{n:`??`},1537:{n:`SHEETINFOQP`,f:re},1600:{n:`??`},1602:{n:`??`},1793:{n:`??`},1794:{n:`??`},1795:{n:`??`},1796:{n:`??`},1920:{n:`??`},2048:{n:`??`},2049:{n:`??`},2052:{n:`??`},2688:{n:`??`},10998:{n:`??`},12849:{n:`??`},28233:{n:`??`},28484:{n:`??`},65535:{n:``}};return{sheet_to_wk1:r,book_to_wk3:i,to_workbook:t}})(),ep=/^\s|\s$|[\t\n\r]/;function tp(e,t){if(!t.bookSST)return``;var n=[V];n[n.length]=U(`sst`,null,{xmlns:Al[0],count:e.Count,uniqueCount:e.Unique});for(var r=0;r!=e.length;++r)if(e[r]!=null){var i=e[r],a=`<si>`;i.r?a+=i.r:(a+=`<t`,i.t||=``,i.t.match(ep)&&(a+=` xml:space="preserve"`),a+=`>`+H(i.t)+`</t>`),a+=`</si>`,n[n.length]=a}return n.length>2&&(n[n.length]=`</sst>`,n[1]=n[1].replace(`/>`,`>`)),n.join(``)}function np(e){return[e.read_shift(4),e.read_shift(4)]}function rp(e,t){return t||=q(8),t.write_shift(4,e.Count),t.write_shift(4,e.Unique),t}var ip=Wu;function ap(e){var t=pu();J(t,159,rp(e));for(var n=0;n<e.length;++n)J(t,19,ip(e[n]));return J(t,160),t.end()}function op(e){if(ss!==void 0)return ss.utils.encode(Zo,e);for(var t=[],n=e.split(``),r=0;r<n.length;++r)t[r]=n[r].charCodeAt(0);return t}function sp(e){var t=0,n,r=op(e),i=r.length+1,a,o,s,c,l;for(n=ms(i),n[0]=r.length,a=1;a!=i;++a)n[a]=r[a-1];for(a=i-1;a>=0;--a)o=n[a],s=t&16384?1:0,c=t<<1&32767,l=s|c,t=l^o;return t^52811}var cp=(function(){function e(e,n){switch(n.type){case`base64`:return t(fs(e),n);case`binary`:return t(e,n);case`buffer`:return t(z&&Buffer.isBuffer(e)?e.toString(`binary`):vs(e),n);case`array`:return t(tl(e),n)}throw Error(`Unrecognized type `+n.type)}function t(e,t){var n=(t||{}).dense?[]:{},r=e.match(/\\trowd.*?\\row\b/g);if(!r.length)throw Error(`RTF missing table`);var i={s:{c:0,r:0},e:{c:0,r:r.length-1}};return r.forEach(function(e,t){Array.isArray(n)&&(n[t]=[]);for(var r=/\\\w+\b/g,a=0,o,s=-1;o=r.exec(e);){switch(o[0]){case`\\cell`:var c=e.slice(a,r.lastIndex-o[0].length);if(c[0]==` `&&(c=c.slice(1)),++s,c.length){var l={v:c,t:`s`};Array.isArray(n)?n[t][s]=l:n[Ou({r:t,c:s})]=l}break}a=r.lastIndex}s>i.e.c&&(i.e.c=s)}),n[`!ref`]=Au(i),n}function n(t,n){return Pu(e(t,n),n)}function r(e){for(var t=[`{\\rtf1\\ansi`],n=ju(e[`!ref`]),r,i=Array.isArray(e),a=n.s.r;a<=n.e.r;++a){t.push(`\\trowd\\trautofit1`);for(var o=n.s.c;o<=n.e.c;++o)t.push(`\\cellx`+(o+1));for(t.push(`\\pard\\intbl`),o=n.s.c;o<=n.e.c;++o){var s=Ou({r:a,c:o});r=i?(e[a]||[])[o]:e[s],!(!r||r.v==null&&(!r.f||r.F))&&(t.push(` `+(r.w||(Nu(r),r.w))),t.push(`\\cell`))}t.push(`\\pard\\intbl\\row`)}return t.join(``)+`}`}return{to_workbook:n,to_sheet:e,from_sheet:r}})();function lp(e){for(var t=0,n=1;t!=3;++t)n=n*256+(e[t]>255?255:e[t]<0?0:e[t]);return n.toString(16).toUpperCase().slice(1)}var up=6;function dp(e){return Math.floor((e+Math.round(128/up)/256)*up)}function fp(e){return Math.floor((e-5)/up*100+.5)/100}function pp(e){return Math.round((e*up+5)/up*256)/256}function mp(e){e.width?(e.wpx=dp(e.width),e.wch=fp(e.wpx),e.MDW=up):e.wpx?(e.wch=fp(e.wpx),e.width=pp(e.wch),e.MDW=up):typeof e.wch==`number`&&(e.width=pp(e.wch),e.wpx=dp(e.width),e.MDW=up),e.customWidth&&delete e.customWidth}var hp=96;function gp(e){return e*96/hp}function _p(e){return e*hp/96}function vp(e){var t=[`<numFmts>`];return[[5,8],[23,26],[41,44],[50,392]].forEach(function(n){for(var r=n[0];r<=n[1];++r)e[r]!=null&&(t[t.length]=U(`numFmt`,null,{numFmtId:r,formatCode:H(e[r])}))}),t.length===1?``:(t[t.length]=`</numFmts>`,t[0]=U(`numFmts`,null,{count:t.length-2}).replace(`/>`,`>`),t.join(``))}function yp(e){var t=[];return t[t.length]=U(`cellXfs`,null),e.forEach(function(e){t[t.length]=U(`xf`,null,e)}),t[t.length]=`</cellXfs>`,t.length===2?``:(t[0]=U(`cellXfs`,null,{count:t.length-2}).replace(`/>`,`>`),t.join(``))}function bp(e,t){var n=[V,U(`styleSheet`,null,{xmlns:Al[0],"xmlns:vt":kl.vt})],r;return e.SSF&&(r=vp(e.SSF))!=null&&(n[n.length]=r),n[n.length]=`<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>`,n[n.length]=`<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>`,n[n.length]=`<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>`,n[n.length]=`<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>`,(r=yp(t.cellXfs))&&(n[n.length]=r),n[n.length]=`<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>`,n[n.length]=`<dxfs count="0"/>`,n[n.length]=`<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>`,n.length>2&&(n[n.length]=`</styleSheet>`,n[1]=n[1].replace(`/>`,`>`)),n.join(``)}function xp(e,t){return[e.read_shift(2),zu(e,t-2)]}function Sp(e,t,n){n||=q(6+4*t.length),n.write_shift(2,e),Bu(t,n);var r=n.length>n.l?n.slice(0,n.l):n;return n.l??=n.length,r}function Cp(e,t,n){var r={};r.sz=e.read_shift(2)/20;var i=pd(e,2,n);switch(i.fItalic&&(r.italic=1),i.fCondense&&(r.condense=1),i.fExtend&&(r.extend=1),i.fShadow&&(r.shadow=1),i.fOutline&&(r.outline=1),i.fStrikeout&&(r.strike=1),e.read_shift(2)===700&&(r.bold=1),e.read_shift(2)){case 1:r.vertAlign=`superscript`;break;case 2:r.vertAlign=`subscript`;break}var a=e.read_shift(1);a!=0&&(r.underline=a);var o=e.read_shift(1);o>0&&(r.family=o);var s=e.read_shift(1);switch(s>0&&(r.charset=s),e.l++,r.color=dd(e,8),e.read_shift(1)){case 1:r.scheme=`major`;break;case 2:r.scheme=`minor`;break}return r.name=zu(e,t-21),r}function wp(e,t){t||=q(153),t.write_shift(2,e.sz*20),md(e,t),t.write_shift(2,e.bold?700:400);var n=0;e.vertAlign==`superscript`?n=1:e.vertAlign==`subscript`&&(n=2),t.write_shift(2,n),t.write_shift(1,e.underline||0),t.write_shift(1,e.family||0),t.write_shift(1,e.charset||0),t.write_shift(1,0),fd(e.color,t);var r=0;return e.scheme==`major`&&(r=1),e.scheme==`minor`&&(r=2),t.write_shift(1,r),Bu(e.name,t),t.length>t.l?t.slice(0,t.l):t}var Tp=[`none`,`solid`,`mediumGray`,`darkGray`,`lightGray`,`darkHorizontal`,`darkVertical`,`darkDown`,`darkUp`,`darkGrid`,`darkTrellis`,`lightHorizontal`,`lightVertical`,`lightDown`,`lightUp`,`lightGrid`,`lightTrellis`,`gray125`,`gray0625`],Ep,Dp=fu;function Op(e,t){t||=q(84),Ep||=Hc(Tp);var n=Ep[e.patternType];n??=40,t.write_shift(4,n);var r=0;if(n!=40)for(fd({auto:1},t),fd({auto:1},t);r<12;++r)t.write_shift(4,0);else{for(;r<4;++r)t.write_shift(4,0);for(;r<12;++r)t.write_shift(4,0)}return t.length>t.l?t.slice(0,t.l):t}function kp(e,t){var n=e.l+t,r=e.read_shift(2),i=e.read_shift(2);return e.l=n,{ixfe:r,numFmtId:i}}function Ap(e,t,n){return n||=q(16),n.write_shift(2,t||0),n.write_shift(2,e.numFmtId||0),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n}function jp(e,t){return t||=q(10),t.write_shift(1,0),t.write_shift(1,0),t.write_shift(4,0),t.write_shift(4,0),t}var Mp=fu;function Np(e,t){return t||=q(51),t.write_shift(1,0),jp(null,t),jp(null,t),jp(null,t),jp(null,t),jp(null,t),t.length>t.l?t.slice(0,t.l):t}function Pp(e,t){return t||=q(52),t.write_shift(4,e.xfId),t.write_shift(2,1),t.write_shift(1,+e.builtinId),t.write_shift(1,0),$u(e.name||``,t),t.length>t.l?t.slice(0,t.l):t}function Fp(e,t,n){var r=q(2052);return r.write_shift(4,e),$u(t,r),$u(n,r),r.length>r.l?r.slice(0,r.l):r}function Ip(e,t){if(t){var n=0;[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var r=e[0];r<=e[1];++r)t[r]!=null&&++n}),n!=0&&(J(e,615,Ru(n)),[[5,8],[23,26],[41,44],[50,392]].forEach(function(n){for(var r=n[0];r<=n[1];++r)t[r]!=null&&J(e,44,Sp(r,t[r]))}),J(e,616))}}function Lp(e){var t=1;t!=0&&(J(e,611,Ru(t)),J(e,43,wp({sz:12,color:{theme:1},name:`Calibri`,family:2,scheme:`minor`})),J(e,612))}function Rp(e){var t=2;t!=0&&(J(e,603,Ru(t)),J(e,45,Op({patternType:`none`})),J(e,45,Op({patternType:`gray125`})),J(e,604))}function zp(e){var t=1;t!=0&&(J(e,613,Ru(t)),J(e,46,Np({})),J(e,614))}function Bp(e){J(e,626,Ru(1)),J(e,47,Ap({numFmtId:0,fontId:0,fillId:0,borderId:0},65535)),J(e,627)}function Vp(e,t){J(e,617,Ru(t.length)),t.forEach(function(t){J(e,47,Ap(t,0))}),J(e,618)}function Hp(e){J(e,619,Ru(1)),J(e,48,Pp({xfId:0,builtinId:0,name:`Normal`})),J(e,620)}function Up(e){J(e,505,Ru(0)),J(e,506)}function Wp(e){J(e,508,Fp(0,`TableStyleMedium9`,`PivotStyleMedium4`)),J(e,509)}function Gp(e,t){var n=pu();return J(n,278),Ip(n,e.SSF),Lp(n,e),Rp(n,e),zp(n,e),Bp(n,e),Vp(n,t.cellXfs),Hp(n,e),Up(n,e),Wp(n,e),J(n,279),n.end()}function Kp(e,t){if(t&&t.themeXLSX)return t.themeXLSX;if(e&&typeof e.raw==`string`)return e.raw;var n=[V];return n[n.length]=`<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">`,n[n.length]=`<a:themeElements>`,n[n.length]=`<a:clrScheme name="Office">`,n[n.length]=`<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>`,n[n.length]=`<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>`,n[n.length]=`<a:dk2><a:srgbClr val="1F497D"/></a:dk2>`,n[n.length]=`<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>`,n[n.length]=`<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>`,n[n.length]=`<a:accent2><a:srgbClr val="C0504D"/></a:accent2>`,n[n.length]=`<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>`,n[n.length]=`<a:accent4><a:srgbClr val="8064A2"/></a:accent4>`,n[n.length]=`<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>`,n[n.length]=`<a:accent6><a:srgbClr val="F79646"/></a:accent6>`,n[n.length]=`<a:hlink><a:srgbClr val="0000FF"/></a:hlink>`,n[n.length]=`<a:folHlink><a:srgbClr val="800080"/></a:folHlink>`,n[n.length]=`</a:clrScheme>`,n[n.length]=`<a:fontScheme name="Office">`,n[n.length]=`<a:majorFont>`,n[n.length]=`<a:latin typeface="Cambria"/>`,n[n.length]=`<a:ea typeface=""/>`,n[n.length]=`<a:cs typeface=""/>`,n[n.length]=`<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>`,n[n.length]=`<a:font script="Hang" typeface="맑은 고딕"/>`,n[n.length]=`<a:font script="Hans" typeface="宋体"/>`,n[n.length]=`<a:font script="Hant" typeface="新細明體"/>`,n[n.length]=`<a:font script="Arab" typeface="Times New Roman"/>`,n[n.length]=`<a:font script="Hebr" typeface="Times New Roman"/>`,n[n.length]=`<a:font script="Thai" typeface="Tahoma"/>`,n[n.length]=`<a:font script="Ethi" typeface="Nyala"/>`,n[n.length]=`<a:font script="Beng" typeface="Vrinda"/>`,n[n.length]=`<a:font script="Gujr" typeface="Shruti"/>`,n[n.length]=`<a:font script="Khmr" typeface="MoolBoran"/>`,n[n.length]=`<a:font script="Knda" typeface="Tunga"/>`,n[n.length]=`<a:font script="Guru" typeface="Raavi"/>`,n[n.length]=`<a:font script="Cans" typeface="Euphemia"/>`,n[n.length]=`<a:font script="Cher" typeface="Plantagenet Cherokee"/>`,n[n.length]=`<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>`,n[n.length]=`<a:font script="Tibt" typeface="Microsoft Himalaya"/>`,n[n.length]=`<a:font script="Thaa" typeface="MV Boli"/>`,n[n.length]=`<a:font script="Deva" typeface="Mangal"/>`,n[n.length]=`<a:font script="Telu" typeface="Gautami"/>`,n[n.length]=`<a:font script="Taml" typeface="Latha"/>`,n[n.length]=`<a:font script="Syrc" typeface="Estrangelo Edessa"/>`,n[n.length]=`<a:font script="Orya" typeface="Kalinga"/>`,n[n.length]=`<a:font script="Mlym" typeface="Kartika"/>`,n[n.length]=`<a:font script="Laoo" typeface="DokChampa"/>`,n[n.length]=`<a:font script="Sinh" typeface="Iskoola Pota"/>`,n[n.length]=`<a:font script="Mong" typeface="Mongolian Baiti"/>`,n[n.length]=`<a:font script="Viet" typeface="Times New Roman"/>`,n[n.length]=`<a:font script="Uigh" typeface="Microsoft Uighur"/>`,n[n.length]=`<a:font script="Geor" typeface="Sylfaen"/>`,n[n.length]=`</a:majorFont>`,n[n.length]=`<a:minorFont>`,n[n.length]=`<a:latin typeface="Calibri"/>`,n[n.length]=`<a:ea typeface=""/>`,n[n.length]=`<a:cs typeface=""/>`,n[n.length]=`<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>`,n[n.length]=`<a:font script="Hang" typeface="맑은 고딕"/>`,n[n.length]=`<a:font script="Hans" typeface="宋体"/>`,n[n.length]=`<a:font script="Hant" typeface="新細明體"/>`,n[n.length]=`<a:font script="Arab" typeface="Arial"/>`,n[n.length]=`<a:font script="Hebr" typeface="Arial"/>`,n[n.length]=`<a:font script="Thai" typeface="Tahoma"/>`,n[n.length]=`<a:font script="Ethi" typeface="Nyala"/>`,n[n.length]=`<a:font script="Beng" typeface="Vrinda"/>`,n[n.length]=`<a:font script="Gujr" typeface="Shruti"/>`,n[n.length]=`<a:font script="Khmr" typeface="DaunPenh"/>`,n[n.length]=`<a:font script="Knda" typeface="Tunga"/>`,n[n.length]=`<a:font script="Guru" typeface="Raavi"/>`,n[n.length]=`<a:font script="Cans" typeface="Euphemia"/>`,n[n.length]=`<a:font script="Cher" typeface="Plantagenet Cherokee"/>`,n[n.length]=`<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>`,n[n.length]=`<a:font script="Tibt" typeface="Microsoft Himalaya"/>`,n[n.length]=`<a:font script="Thaa" typeface="MV Boli"/>`,n[n.length]=`<a:font script="Deva" typeface="Mangal"/>`,n[n.length]=`<a:font script="Telu" typeface="Gautami"/>`,n[n.length]=`<a:font script="Taml" typeface="Latha"/>`,n[n.length]=`<a:font script="Syrc" typeface="Estrangelo Edessa"/>`,n[n.length]=`<a:font script="Orya" typeface="Kalinga"/>`,n[n.length]=`<a:font script="Mlym" typeface="Kartika"/>`,n[n.length]=`<a:font script="Laoo" typeface="DokChampa"/>`,n[n.length]=`<a:font script="Sinh" typeface="Iskoola Pota"/>`,n[n.length]=`<a:font script="Mong" typeface="Mongolian Baiti"/>`,n[n.length]=`<a:font script="Viet" typeface="Arial"/>`,n[n.length]=`<a:font script="Uigh" typeface="Microsoft Uighur"/>`,n[n.length]=`<a:font script="Geor" typeface="Sylfaen"/>`,n[n.length]=`</a:minorFont>`,n[n.length]=`</a:fontScheme>`,n[n.length]=`<a:fmtScheme name="Office">`,n[n.length]=`<a:fillStyleLst>`,n[n.length]=`<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:lin ang="16200000" scaled="1"/>`,n[n.length]=`</a:gradFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:lin ang="16200000" scaled="0"/>`,n[n.length]=`</a:gradFill>`,n[n.length]=`</a:fillStyleLst>`,n[n.length]=`<a:lnStyleLst>`,n[n.length]=`<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>`,n[n.length]=`<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>`,n[n.length]=`<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>`,n[n.length]=`</a:lnStyleLst>`,n[n.length]=`<a:effectStyleLst>`,n[n.length]=`<a:effectStyle>`,n[n.length]=`<a:effectLst>`,n[n.length]=`<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>`,n[n.length]=`</a:effectLst>`,n[n.length]=`</a:effectStyle>`,n[n.length]=`<a:effectStyle>`,n[n.length]=`<a:effectLst>`,n[n.length]=`<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>`,n[n.length]=`</a:effectLst>`,n[n.length]=`</a:effectStyle>`,n[n.length]=`<a:effectStyle>`,n[n.length]=`<a:effectLst>`,n[n.length]=`<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>`,n[n.length]=`</a:effectLst>`,n[n.length]=`<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>`,n[n.length]=`<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>`,n[n.length]=`</a:effectStyle>`,n[n.length]=`</a:effectStyleLst>`,n[n.length]=`<a:bgFillStyleLst>`,n[n.length]=`<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>`,n[n.length]=`</a:gradFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>`,n[n.length]=`</a:gradFill>`,n[n.length]=`</a:bgFillStyleLst>`,n[n.length]=`</a:fmtScheme>`,n[n.length]=`</a:themeElements>`,n[n.length]=`<a:objectDefaults>`,n[n.length]=`<a:spDef>`,n[n.length]=`<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>`,n[n.length]=`</a:spDef>`,n[n.length]=`<a:lnDef>`,n[n.length]=`<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>`,n[n.length]=`</a:lnDef>`,n[n.length]=`</a:objectDefaults>`,n[n.length]=`<a:extraClrSchemeLst/>`,n[n.length]=`</a:theme>`,n.join(``)}function qp(e,t){return{flags:e.read_shift(4),version:e.read_shift(4),name:zu(e,t-8)}}function Jp(e){var t=q(12+2*e.name.length);return t.write_shift(4,e.flags),t.write_shift(4,e.version),Bu(e.name,t),t.slice(0,t.l)}function Yp(e){for(var t=[],n=e.read_shift(4);n-- >0;)t.push([e.read_shift(4),e.read_shift(4)]);return t}function Xp(e){var t=q(4+8*e.length);t.write_shift(4,e.length);for(var n=0;n<e.length;++n)t.write_shift(4,e[n][0]),t.write_shift(4,e[n][1]);return t}function Zp(e,t){var n=q(8+2*t.length);return n.write_shift(4,e),Bu(t,n),n.slice(0,n.l)}function Qp(e){return e.l+=4,e.read_shift(4)!=0}function $p(e,t){var n=q(8);return n.write_shift(4,e),n.write_shift(4,+!!t),n}function em(){var e=pu();return J(e,332),J(e,334,Ru(1)),J(e,335,Jp({name:`XLDAPR`,version:12e4,flags:3496657072})),J(e,336),J(e,339,Zp(1,`XLDAPR`)),J(e,52),J(e,35,Ru(514)),J(e,4096,Ru(0)),J(e,4097,cf(1)),J(e,36),J(e,53),J(e,340),J(e,337,$p(1,!0)),J(e,51,Xp([[1,0]])),J(e,338),J(e,333),e.end()}function tm(){var e=[V];return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`),e.join(``)}function nm(e){var t={};t.i=e.read_shift(4);var n={};n.r=e.read_shift(4),n.c=e.read_shift(4),t.r=Ou(n);var r=e.read_shift(1);return r&2&&(t.l=`1`),r&8&&(t.a=`1`),t}var rm=1024;function im(e,t){for(var n=[21600,21600],r=[`m0,0l0`,n[1],n[0],n[1],n[0],`0xe`].join(`,`),i=[U(`xml`,null,{"xmlns:v":jl.v,"xmlns:o":jl.o,"xmlns:x":jl.x,"xmlns:mv":jl.mv}).replace(/\/>/,`>`),U(`o:shapelayout`,U(`o:idmap`,null,{"v:ext":`edit`,data:e}),{"v:ext":`edit`}),U(`v:shapetype`,[U(`v:stroke`,null,{joinstyle:`miter`}),U(`v:path`,null,{gradientshapeok:`t`,"o:connecttype":`rect`})].join(``),{id:`_x0000_t202`,"o:spt":202,coordsize:n.join(`,`),path:r})];rm<e*1e3;)rm+=1e3;return t.forEach(function(e){var t=Du(e[0]),n={color2:`#BEFF82`,type:`gradient`};n.type==`gradient`&&(n.angle=`-180`);var r=U(`v:fill`,n.type==`gradient`?U(`o:fill`,null,{type:`gradientUnscaled`,"v:ext":`view`}):null,n);++rm,i=i.concat([`<v:shape`+El({id:`_x0000_s`+rm,type:`#_x0000_t202`,style:`position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10`+(e[1].hidden?`;visibility:hidden`:``),fillcolor:`#ECFAD4`,strokecolor:`#edeaa1`})+`>`,r,U(`v:shadow`,null,{on:`t`,obscured:`t`}),U(`v:path`,null,{"o:connecttype":`none`}),`<v:textbox><div style="text-align:left"></div></v:textbox>`,`<x:ClientData ObjectType="Note">`,`<x:MoveWithCells/>`,`<x:SizeWithCells/>`,Tl(`x:Anchor`,[t.c+1,0,t.r+1,0,t.c+3,20,t.r+5,20].join(`,`)),Tl(`x:AutoFill`,`False`),Tl(`x:Row`,String(t.r)),Tl(`x:Column`,String(t.c)),e[1].hidden?``:`<x:Visible/>`,`</x:ClientData>`,`</v:shape>`])}),i.push(`</xml>`),i.join(``)}function am(e){var t=[V,U(`comments`,null,{xmlns:Al[0]})],n=[];return t.push(`<authors>`),e.forEach(function(e){e[1].forEach(function(e){var r=H(e.a);n.indexOf(r)==-1&&(n.push(r),t.push(`<author>`+r+`</author>`)),e.T&&e.ID&&n.indexOf(`tc=`+e.ID)==-1&&(n.push(`tc=`+e.ID),t.push(`<author>tc=`+e.ID+`</author>`))})}),n.length==0&&(n.push(`SheetJ5`),t.push(`<author>SheetJ5</author>`)),t.push(`</authors>`),t.push(`<commentList>`),e.forEach(function(e){var r=0,i=[];if(e[1][0]&&e[1][0].T&&e[1][0].ID?r=n.indexOf(`tc=`+e[1][0].ID):e[1].forEach(function(e){e.a&&(r=n.indexOf(H(e.a))),i.push(e.t||``)}),t.push(`<comment ref="`+e[0]+`" authorId="`+r+`"><text>`),i.length<=1)t.push(Tl(`t`,H(i[0]||``)));else{for(var a=`Comment:
    `+i[0]+`
`,o=1;o<i.length;++o)a+=`Reply:
    `+i[o]+`
`;t.push(Tl(`t`,H(a)))}t.push(`</text></comment>`)}),t.push(`</commentList>`),t.length>2&&(t[t.length]=`</comments>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}function om(e,t,n){var r=[V,U(`ThreadedComments`,null,{xmlns:kl.TCMNT}).replace(/[\/]>/,`>`)];return e.forEach(function(e){var i=``;(e[1]||[]).forEach(function(a,o){if(!a.T){delete a.ID;return}a.a&&t.indexOf(a.a)==-1&&t.push(a.a);var s={ref:e[0],id:`{54EE7951-7262-4200-6969-`+(`000000000000`+ n.tcid++).slice(-12)+`}`};o==0?i=s.id:s.parentId=i,a.ID=s.id,a.a&&(s.personId=`{54EE7950-7262-4200-6969-`+(`000000000000`+t.indexOf(a.a)).slice(-12)+`}`),r.push(U(`threadedComment`,Tl(`text`,a.t||``),s))})}),r.push(`</ThreadedComments>`),r.join(``)}function sm(e){var t=[V,U(`personList`,null,{xmlns:kl.TCMNT,"xmlns:x":Al[0]}).replace(/[\/]>/,`>`)];return e.forEach(function(e,n){t.push(U(`person`,null,{displayName:e,id:`{54EE7950-7262-4200-6969-`+(`000000000000`+n).slice(-12)+`}`,userId:e,providerId:`None`}))}),t.push(`</personList>`),t.join(``)}function cm(e){var t={};t.iauthor=e.read_shift(4);var n=sd(e,16);return t.rfx=n.s,t.ref=Ou(n.s),e.l+=16,t}function lm(e,t){return t??=q(36),t.write_shift(4,e[1].iauthor),cd(e[0],t),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(4,0),t}var um=zu;function dm(e){return Bu(e.slice(0,54))}function fm(e){var t=pu(),n=[];return J(t,628),J(t,630),e.forEach(function(e){e[1].forEach(function(e){n.indexOf(e.a)>-1||(n.push(e.a.slice(0,54)),J(t,632,dm(e.a)))})}),J(t,631),J(t,633),e.forEach(function(e){e[1].forEach(function(r){r.iauthor=n.indexOf(r.a),J(t,635,lm([{s:Du(e[0]),e:Du(e[0])},r])),r.t&&r.t.length>0&&J(t,637,Ku(r)),J(t,636),delete r.iauthor})}),J(t,634),J(t,629),t.end()}function pm(e,t){t.FullPaths.forEach(function(n,r){if(r!=0){var i=n.replace(/[^\/]*[\/]/,`/_VBA_PROJECT_CUR/`);i.slice(-1)!==`/`&&Ic.utils.cfb_add(e,i,t.FileIndex[r].content)}})}var mm=[`xlsb`,`xlsm`,`xlam`,`biff8`,`xla`],hm=(function(){var e=/(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g,t={r:0,c:0};function n(e,n,r,i){var a=!1,o=!1;r.length==0?o=!0:r.charAt(0)==`[`&&(o=!0,r=r.slice(1,-1)),i.length==0?a=!0:i.charAt(0)==`[`&&(a=!0,i=i.slice(1,-1));var s=r.length>0?parseInt(r,10)|0:0,c=i.length>0?parseInt(i,10)|0:0;return a?c+=t.c:--c,o?s+=t.r:--s,n+(a?``:`$`)+Cu(c)+(o?``:`$`)+yu(s)}return function(r,i){return t=i,r.replace(e,n)}})(),gm=/(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g,_m=(function(){return function(e,t){return e.replace(gm,function(e,n,r,i,a,o){var s=Su(i)-(r?0:t.c),c=vu(o)-(a?0:t.r),l=c==0?``:a?c+1:`[`+c+`]`,u=s==0?``:r?s+1:`[`+s+`]`;return n+`R`+l+`C`+u})}})();function vm(e,t){return e.replace(gm,function(e,n,r,i,a,o){return n+(r==`$`?r+i:Cu(Su(i)+t.c))+(a==`$`?a+o:yu(vu(o)+t.r))})}function ym(e){return e.length!=1}function bm(e){e.l+=1}function xm(e,t){var n=e.read_shift(t==1?1:2);return[n&16383,n>>14&1,n>>15&1]}function Sm(e,t,n){var r=2;if(n){if(n.biff>=2&&n.biff<=5)return Cm(e,t,n);n.biff==12&&(r=4)}var i=e.read_shift(r),a=e.read_shift(r),o=xm(e,2),s=xm(e,2);return{s:{r:i,c:o[0],cRel:o[1],rRel:o[2]},e:{r:a,c:s[0],cRel:s[1],rRel:s[2]}}}function Cm(e){var t=xm(e,2),n=xm(e,2),r=e.read_shift(1),i=e.read_shift(1);return{s:{r:t[0],c:r,cRel:t[1],rRel:t[2]},e:{r:n[0],c:i,cRel:n[1],rRel:n[2]}}}function wm(e,t,n){if(n.biff<8)return Cm(e,t,n);var r=e.read_shift(n.biff==12?4:2),i=e.read_shift(n.biff==12?4:2),a=xm(e,2),o=xm(e,2);return{s:{r,c:a[0],cRel:a[1],rRel:a[2]},e:{r:i,c:o[0],cRel:o[1],rRel:o[2]}}}function Tm(e,t,n){if(n&&n.biff>=2&&n.biff<=5)return Em(e,t,n);var r=e.read_shift(n&&n.biff==12?4:2),i=xm(e,2);return{r,c:i[0],cRel:i[1],rRel:i[2]}}function Em(e){var t=xm(e,2),n=e.read_shift(1);return{r:t[0],c:n,cRel:t[1],rRel:t[2]}}function Dm(e){var t=e.read_shift(2),n=e.read_shift(2);return{r:t,c:n&255,fQuoted:!!(n&16384),cRel:n>>15,rRel:n>>15}}function Om(e,t,n){var r=n&&n.biff?n.biff:8;if(r>=2&&r<=5)return km(e,t,n);var i=e.read_shift(r>=12?4:2),a=e.read_shift(2),o=(a&16384)>>14,s=(a&32768)>>15;if(a&=16383,s==1)for(;i>524287;)i-=1048576;if(o==1)for(;a>8191;)a-=16384;return{r:i,c:a,cRel:o,rRel:s}}function km(e){var t=e.read_shift(2),n=e.read_shift(1),r=(t&32768)>>15,i=(t&16384)>>14;return t&=16383,r==1&&t>=8192&&(t-=16384),i==1&&n>=128&&(n-=256),{r:t,c:n,cRel:i,rRel:r}}function Am(e,t,n){return[(e[e.l++]&96)>>5,Sm(e,n.biff>=2&&n.biff<=5?6:8,n)]}function jm(e,t,n){var r=(e[e.l++]&96)>>5,i=e.read_shift(2,`i`),a=8;if(n)switch(n.biff){case 5:e.l+=12,a=6;break;case 12:a=12;break}return[r,i,Sm(e,a,n)]}function Mm(e,t,n){var r=(e[e.l++]&96)>>5;return e.l+=n&&n.biff>8?12:n.biff<8?6:8,[r]}function Nm(e,t,n){var r=(e[e.l++]&96)>>5,i=e.read_shift(2),a=8;if(n)switch(n.biff){case 5:e.l+=12,a=6;break;case 12:a=12;break}return e.l+=a,[r,i]}function Pm(e,t,n){return[(e[e.l++]&96)>>5,wm(e,t-1,n)]}function Fm(e,t,n){var r=(e[e.l++]&96)>>5;return e.l+=n.biff==2?6:n.biff==12?14:7,[r]}function Im(e){var t=e[e.l+1]&1;return e.l+=4,[t,1]}function Lm(e,t,n){e.l+=2;for(var r=e.read_shift(n&&n.biff==2?1:2),i=[],a=0;a<=r;++a)i.push(e.read_shift(n&&n.biff==2?1:2));return i}function Rm(e,t,n){var r=e[e.l+1]&255?1:0;return e.l+=2,[r,e.read_shift(n&&n.biff==2?1:2)]}function zm(e,t,n){var r=e[e.l+1]&255?1:0;return e.l+=2,[r,e.read_shift(n&&n.biff==2?1:2)]}function Bm(e){var t=e[e.l+1]&255?1:0;return e.l+=2,[t,e.read_shift(2)]}function Vm(e,t,n){var r=e[e.l+1]&255?1:0;return e.l+=n&&n.biff==2?3:4,[r]}function Hm(e){return[e.read_shift(1),e.read_shift(1)]}function Um(e){return e.read_shift(2),Hm(e,2)}function Wm(e){return e.read_shift(2),Hm(e,2)}function Gm(e,t,n){var r=(e[e.l]&96)>>5;return e.l+=1,[r,Tm(e,0,n)]}function Km(e,t,n){var r=(e[e.l]&96)>>5;return e.l+=1,[r,Om(e,0,n)]}function qm(e,t,n){var r=(e[e.l]&96)>>5;e.l+=1;var i=e.read_shift(2);return n&&n.biff==5&&(e.l+=12),[r,i,Tm(e,0,n)]}function Jm(e,t,n){var r=(e[e.l]&96)>>5;e.l+=1;var i=e.read_shift(n&&n.biff<=3?1:2);return[ig[i],rg[i],r]}function Ym(e,t,n){var r=e[e.l++],i=e.read_shift(1),a=n&&n.biff<=3?[r==88?-1:0,e.read_shift(1)]:Xm(e);return[i,(a[0]===0?rg:ng)[a[1]]]}function Xm(e){return[e[e.l+1]>>7,e.read_shift(2)&32767]}function Zm(e,t,n){e.l+=n&&n.biff==2?3:4}function Qm(e,t,n){return e.l++,n&&n.biff==12?[e.read_shift(4,`i`),0]:[e.read_shift(2),e.read_shift(n&&n.biff==2?1:2)]}function $m(e){return e.l++,Od[e.read_shift(1)]}function eh(e){return e.l++,e.read_shift(2)}function th(e){return e.l++,e.read_shift(1)!==0}function nh(e){return e.l++,ld(e,8)}function rh(e,t,n){return e.l++,uf(e,t-1,n)}function ih(e,t){var n=[e.read_shift(1)];if(t==12)switch(n[0]){case 2:n[0]=4;break;case 4:n[0]=16;break;case 0:n[0]=1;break;case 1:n[0]=2;break}switch(n[0]){case 4:n[1]=af(e,1)?`TRUE`:`FALSE`,t!=12&&(e.l+=7);break;case 37:case 16:n[1]=Od[e[e.l]],e.l+=t==12?4:8;break;case 0:e.l+=8;break;case 1:n[1]=ld(e,8);break;case 2:n[1]=mf(e,0,{biff:t>0&&t<8?2:t});break;default:throw Error(`Bad SerAr: `+n[0])}return n}function ah(e,t,n){for(var r=e.read_shift(n.biff==12?4:2),i=[],a=0;a!=r;++a)i.push((n.biff==12?sd:bf)(e,8));return i}function oh(e,t,n){var r=0,i=0;n.biff==12?(r=e.read_shift(4),i=e.read_shift(4)):(i=1+e.read_shift(1),r=1+e.read_shift(2)),n.biff>=2&&n.biff<8&&(--r,--i==0&&(i=256));for(var a=0,o=[];a!=r&&(o[a]=[]);++a)for(var s=0;s!=i;++s)o[a][s]=ih(e,n.biff);return o}function sh(e,t,n){var r=e.read_shift(1)>>>5&3,i=!n||n.biff>=8?4:2,a=e.read_shift(i);switch(n.biff){case 2:e.l+=5;break;case 3:case 4:e.l+=8;break;case 5:e.l+=12;break}return[r,0,a]}function ch(e,t,n){return n.biff==5?lh(e,t,n):[e.read_shift(1)>>>5&3,e.read_shift(2),e.read_shift(4)]}function lh(e){var t=e.read_shift(1)>>>5&3,n=e.read_shift(2,`i`);e.l+=8;var r=e.read_shift(2);return e.l+=12,[t,n,r]}function uh(e,t,n){var r=e.read_shift(1)>>>5&3;return e.l+=n&&n.biff==2?3:4,[r,e.read_shift(n&&n.biff==2?1:2)]}function dh(e,t,n){return[e.read_shift(1)>>>5&3,e.read_shift(n&&n.biff==2?1:2)]}function fh(e,t,n){var r=e.read_shift(1)>>>5&3;return e.l+=4,n.biff<8&&e.l--,n.biff==12&&(e.l+=2),[r]}function ph(e,t,n){var r=(e[e.l++]&96)>>5,i=e.read_shift(2),a=4;if(n)switch(n.biff){case 5:a=15;break;case 12:a=6;break}return e.l+=a,[r,i]}var mh=fu,hh=fu,gh=fu;function _h(e,t,n){return e.l+=2,[Dm(e,4,n)]}function vh(e){return e.l+=6,[]}var yh=_h,bh=vh,xh=vh,Sh=_h;function Ch(e){return e.l+=2,[sf(e),e.read_shift(2)&1]}var wh=_h,Th=Ch,Eh=vh,Dh=_h,Oh=_h,kh=[`Data`,`All`,`Headers`,`??`,`?Data2`,`??`,`?DataHeaders`,`??`,`Totals`,`??`,`??`,`??`,`?DataTotals`,`??`,`??`,`??`,`?Current`];function Ah(e){e.l+=2;var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(4),i=e.read_shift(2),a=e.read_shift(2),o=kh[n>>2&31];return{ixti:t,coltype:n&3,rt:o,idx:r,c:i,C:a}}function jh(e){return e.l+=2,[e.read_shift(4)]}function Mh(e,t,n){return e.l+=5,e.l+=2,e.l+=n.biff==2?1:4,[`PTGSHEET`]}function Nh(e,t,n){return e.l+=n.biff==2?4:5,[`PTGENDSHEET`]}function Ph(e){return[e.read_shift(1)>>>5&3,e.read_shift(2)]}function Fh(e){return[e.read_shift(1)>>>5&3,e.read_shift(2)]}function Ih(e){return e.l+=4,[0,0]}var Lh={1:{n:`PtgExp`,f:Qm},2:{n:`PtgTbl`,f:gh},3:{n:`PtgAdd`,f:bm},4:{n:`PtgSub`,f:bm},5:{n:`PtgMul`,f:bm},6:{n:`PtgDiv`,f:bm},7:{n:`PtgPower`,f:bm},8:{n:`PtgConcat`,f:bm},9:{n:`PtgLt`,f:bm},10:{n:`PtgLe`,f:bm},11:{n:`PtgEq`,f:bm},12:{n:`PtgGe`,f:bm},13:{n:`PtgGt`,f:bm},14:{n:`PtgNe`,f:bm},15:{n:`PtgIsect`,f:bm},16:{n:`PtgUnion`,f:bm},17:{n:`PtgRange`,f:bm},18:{n:`PtgUplus`,f:bm},19:{n:`PtgUminus`,f:bm},20:{n:`PtgPercent`,f:bm},21:{n:`PtgParen`,f:bm},22:{n:`PtgMissArg`,f:bm},23:{n:`PtgStr`,f:rh},26:{n:`PtgSheet`,f:Mh},27:{n:`PtgEndSheet`,f:Nh},28:{n:`PtgErr`,f:$m},29:{n:`PtgBool`,f:th},30:{n:`PtgInt`,f:eh},31:{n:`PtgNum`,f:nh},32:{n:`PtgArray`,f:Fm},33:{n:`PtgFunc`,f:Jm},34:{n:`PtgFuncVar`,f:Ym},35:{n:`PtgName`,f:sh},36:{n:`PtgRef`,f:Gm},37:{n:`PtgArea`,f:Am},38:{n:`PtgMemArea`,f:uh},39:{n:`PtgMemErr`,f:mh},40:{n:`PtgMemNoMem`,f:hh},41:{n:`PtgMemFunc`,f:dh},42:{n:`PtgRefErr`,f:fh},43:{n:`PtgAreaErr`,f:Mm},44:{n:`PtgRefN`,f:Km},45:{n:`PtgAreaN`,f:Pm},46:{n:`PtgMemAreaN`,f:Ph},47:{n:`PtgMemNoMemN`,f:Fh},57:{n:`PtgNameX`,f:ch},58:{n:`PtgRef3d`,f:qm},59:{n:`PtgArea3d`,f:jm},60:{n:`PtgRefErr3d`,f:ph},61:{n:`PtgAreaErr3d`,f:Nm},255:{}},Rh={64:32,96:32,65:33,97:33,66:34,98:34,67:35,99:35,68:36,100:36,69:37,101:37,70:38,102:38,71:39,103:39,72:40,104:40,73:41,105:41,74:42,106:42,75:43,107:43,76:44,108:44,77:45,109:45,78:46,110:46,79:47,111:47,88:34,120:34,89:57,121:57,90:58,122:58,91:59,123:59,92:60,124:60,93:61,125:61},zh={1:{n:`PtgElfLel`,f:Ch},2:{n:`PtgElfRw`,f:Dh},3:{n:`PtgElfCol`,f:yh},6:{n:`PtgElfRwV`,f:Oh},7:{n:`PtgElfColV`,f:Sh},10:{n:`PtgElfRadical`,f:wh},11:{n:`PtgElfRadicalS`,f:Eh},13:{n:`PtgElfColS`,f:bh},15:{n:`PtgElfColSV`,f:xh},16:{n:`PtgElfRadicalLel`,f:Th},25:{n:`PtgList`,f:Ah},29:{n:`PtgSxName`,f:jh},255:{}},Bh={0:{n:`PtgAttrNoop`,f:Ih},1:{n:`PtgAttrSemi`,f:Vm},2:{n:`PtgAttrIf`,f:zm},4:{n:`PtgAttrChoose`,f:Lm},8:{n:`PtgAttrGoto`,f:Rm},16:{n:`PtgAttrSum`,f:Zm},32:{n:`PtgAttrBaxcel`,f:Im},33:{n:`PtgAttrBaxcel`,f:Im},64:{n:`PtgAttrSpace`,f:Um},65:{n:`PtgAttrSpaceSemi`,f:Wm},128:{n:`PtgAttrIfError`,f:Bm},255:{}};function Vh(e,t,n,r){if(r.biff<8)return fu(e,t);for(var i=e.l+t,a=[],o=0;o!==n.length;++o)switch(n[o][0]){case`PtgArray`:n[o][1]=oh(e,0,r),a.push(n[o][1]);break;case`PtgMemArea`:n[o][2]=ah(e,n[o][1],r),a.push(n[o][2]);break;case`PtgExp`:r&&r.biff==12&&(n[o][1][1]=e.read_shift(4),a.push(n[o][1]));break;case`PtgList`:case`PtgElfRadicalS`:case`PtgElfColS`:case`PtgElfColSV`:throw`Unsupported `+n[o][0];default:break}return t=i-e.l,t!==0&&a.push(fu(e,t)),a}function Hh(e,t,n){for(var r=e.l+t,i,a,o=[];r!=e.l;)t=r-e.l,a=e[e.l],i=Lh[a]||Lh[Rh[a]],(a===24||a===25)&&(i=(a===24?zh:Bh)[e[e.l+1]]),!i||!i.f?fu(e,t):o.push([i.n,i.f(e,t,n)]);return o}function Uh(e){for(var t=[],n=0;n<e.length;++n){for(var r=e[n],i=[],a=0;a<r.length;++a){var o=r[a];if(o)switch(o[0]){case 2:i.push(`"`+o[1].replace(/"/g,`""`)+`"`);break;default:i.push(o[1])}else i.push(``)}t.push(i.join(`,`))}return t.join(`;`)}var Wh={PtgAdd:`+`,PtgConcat:`&`,PtgDiv:`/`,PtgEq:`=`,PtgGe:`>=`,PtgGt:`>`,PtgLe:`<=`,PtgLt:`<`,PtgMul:`*`,PtgNe:`<>`,PtgPower:`^`,PtgSub:`-`};function Gh(e,t){if(!e&&!(t&&t.biff<=5&&t.biff>=2))throw Error(`empty sheet name`);return/[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e)?`'`+e+`'`:e}function Kh(e,t,n){if(!e)return`SH33TJSERR0`;if(n.biff>8&&(!e.XTI||!e.XTI[t]))return e.SheetNames[t];if(!e.XTI)return`SH33TJSERR6`;var r=e.XTI[t];if(n.biff<8)return t>1e4&&(t-=65536),t<0&&(t=-t),t==0?``:e.XTI[t-1];if(!r)return`SH33TJSERR1`;var i=``;if(n.biff>8)switch(e[r[0]][0]){case 357:return i=r[1]==-1?`#REF`:e.SheetNames[r[1]],r[1]==r[2]?i:i+`:`+e.SheetNames[r[2]];case 358:return n.SID==null?`SH33TJSSAME`+e[r[0]][0]:e.SheetNames[n.SID];case 355:default:return`SH33TJSSRC`+e[r[0]][0]}switch(e[r[0]][0][0]){case 1025:return i=r[1]==-1?`#REF`:e.SheetNames[r[1]]||`SH33TJSERR3`,r[1]==r[2]?i:i+`:`+e.SheetNames[r[2]];case 14849:return e[r[0]].slice(1).map(function(e){return e.Name}).join(`;;`);default:return e[r[0]][0][3]?(i=r[1]==-1?`#REF`:e[r[0]][0][3][r[1]]||`SH33TJSERR4`,r[1]==r[2]?i:i+`:`+e[r[0]][0][3][r[2]]):`SH33TJSERR2`}}function qh(e,t,n){var r=Kh(e,t,n);return r==`#REF`?r:Gh(r,n)}function Jh(e,t,n,r,i){var a=i&&i.biff||8,o={s:{c:0,r:0},e:{c:0,r:0}},s=[],c,l,u,d=0,f=0,p,m=``;if(!e[0]||!e[0][0])return``;for(var h=-1,g=``,_=0,v=e[0].length;_<v;++_){var y=e[0][_];switch(y[0]){case`PtgUminus`:s.push(`-`+s.pop());break;case`PtgUplus`:s.push(`+`+s.pop());break;case`PtgPercent`:s.push(s.pop()+`%`);break;case`PtgAdd`:case`PtgConcat`:case`PtgDiv`:case`PtgEq`:case`PtgGe`:case`PtgGt`:case`PtgLe`:case`PtgLt`:case`PtgMul`:case`PtgNe`:case`PtgPower`:case`PtgSub`:if(c=s.pop(),l=s.pop(),h>=0){switch(e[0][h][1][0]){case 0:g=rl(` `,e[0][h][1][1]);break;case 1:g=rl(`\r`,e[0][h][1][1]);break;default:if(g=``,i.WTF)throw Error(`Unexpected PtgAttrSpaceType `+e[0][h][1][0])}l+=g,h=-1}s.push(l+Wh[y[0]]+c);break;case`PtgIsect`:c=s.pop(),l=s.pop(),s.push(l+` `+c);break;case`PtgUnion`:c=s.pop(),l=s.pop(),s.push(l+`,`+c);break;case`PtgRange`:c=s.pop(),l=s.pop(),s.push(l+`:`+c);break;case`PtgAttrChoose`:break;case`PtgAttrGoto`:break;case`PtgAttrIf`:break;case`PtgAttrIfError`:break;case`PtgRef`:u=mu(y[1][1],o,i),s.push(gu(u,a));break;case`PtgRefN`:u=n?mu(y[1][1],n,i):y[1][1],s.push(gu(u,a));break;case`PtgRef3d`:d=y[1][1],u=mu(y[1][2],o,i),m=qh(r,d,i),s.push(m+`!`+gu(u,a));break;case`PtgFunc`:case`PtgFuncVar`:var b=y[1][0],x=y[1][1];b||=0,b&=127;var S=b==0?[]:s.slice(-b);s.length-=b,x===`User`&&(x=S.shift()),s.push(x+`(`+S.join(`,`)+`)`);break;case`PtgBool`:s.push(y[1]?`TRUE`:`FALSE`);break;case`PtgInt`:s.push(y[1]);break;case`PtgNum`:s.push(String(y[1]));break;case`PtgStr`:s.push(`"`+y[1].replace(/"/g,`""`)+`"`);break;case`PtgErr`:s.push(y[1]);break;case`PtgAreaN`:p=hu(y[1][1],n?{s:n}:o,i),s.push(_u(p,i));break;case`PtgArea`:p=hu(y[1][1],o,i),s.push(_u(p,i));break;case`PtgArea3d`:d=y[1][1],p=y[1][2],m=qh(r,d,i),s.push(m+`!`+_u(p,i));break;case`PtgAttrSum`:s.push(`SUM(`+s.pop()+`)`);break;case`PtgAttrBaxcel`:case`PtgAttrSemi`:break;case`PtgName`:f=y[1][2];var C=(r.names||[])[f-1]||(r[0]||[])[f],w=C?C.Name:`SH33TJSNAME`+String(f);w&&w.slice(0,6)==`_xlfn.`&&!i.xlfn&&(w=w.slice(6)),s.push(w);break;case`PtgNameX`:var T=y[1][1];f=y[1][2];var E;if(i.biff<=5)T<0&&(T=-T),r[T]&&(E=r[T][f]);else{var D=``;if(((r[T]||[])[0]||[])[0]==14849||(((r[T]||[])[0]||[])[0]==1025?r[T][f]&&r[T][f].itab>0&&(D=r.SheetNames[r[T][f].itab-1]+`!`):D=r.SheetNames[f-1]+`!`),r[T]&&r[T][f])D+=r[T][f].Name;else if(r[0]&&r[0][f])D+=r[0][f].Name;else{var O=(Kh(r,T,i)||``).split(`;;`);O[f-1]?D=O[f-1]:D+=`SH33TJSERRX`}s.push(D);break}E||={Name:`SH33TJSERRY`},s.push(E.Name);break;case`PtgParen`:var k=`(`,ee=`)`;if(h>=0){switch(g=``,e[0][h][1][0]){case 2:k=rl(` `,e[0][h][1][1])+k;break;case 3:k=rl(`\r`,e[0][h][1][1])+k;break;case 4:ee=rl(` `,e[0][h][1][1])+ee;break;case 5:ee=rl(`\r`,e[0][h][1][1])+ee;break;default:if(i.WTF)throw Error(`Unexpected PtgAttrSpaceType `+e[0][h][1][0])}h=-1}s.push(k+s.pop()+ee);break;case`PtgRefErr`:s.push(`#REF!`);break;case`PtgRefErr3d`:s.push(`#REF!`);break;case`PtgExp`:u={c:y[1][1],r:y[1][0]};var te={c:n.c,r:n.r};if(r.sharedf[Ou(u)]){var ne=r.sharedf[Ou(u)];s.push(Jh(ne,o,te,r,i))}else{var re=!1;for(c=0;c!=r.arrayf.length;++c)if(l=r.arrayf[c],!(u.c<l[0].s.c||u.c>l[0].e.c)&&!(u.r<l[0].s.r||u.r>l[0].e.r)){s.push(Jh(l[1],o,te,r,i)),re=!0;break}re||s.push(y[1])}break;case`PtgArray`:s.push(`{`+Uh(y[1])+`}`);break;case`PtgMemArea`:break;case`PtgAttrSpace`:case`PtgAttrSpaceSemi`:h=_;break;case`PtgTbl`:break;case`PtgMemErr`:break;case`PtgMissArg`:s.push(``);break;case`PtgAreaErr`:s.push(`#REF!`);break;case`PtgAreaErr3d`:s.push(`#REF!`);break;case`PtgList`:s.push(`Table`+y[1].idx+`[#`+y[1].rt+`]`);break;case`PtgMemAreaN`:case`PtgMemNoMemN`:case`PtgAttrNoop`:case`PtgSheet`:case`PtgEndSheet`:break;case`PtgMemFunc`:break;case`PtgMemNoMem`:break;case`PtgElfCol`:case`PtgElfColS`:case`PtgElfColSV`:case`PtgElfColV`:case`PtgElfLel`:case`PtgElfRadical`:case`PtgElfRadicalLel`:case`PtgElfRadicalS`:case`PtgElfRw`:case`PtgElfRwV`:throw Error(`Unsupported ELFs`);case`PtgSxName`:throw Error(`Unrecognized Formula Token: `+String(y));default:throw Error(`Unrecognized Formula Token: `+String(y))}if(i.biff!=3&&h>=0&&[`PtgAttrSpace`,`PtgAttrSpaceSemi`,`PtgAttrGoto`].indexOf(e[0][_][0])==-1){y=e[0][h];var ie=!0;switch(y[1][0]){case 4:ie=!1;case 0:g=rl(` `,y[1][1]);break;case 5:ie=!1;case 1:g=rl(`\r`,y[1][1]);break;default:if(g=``,i.WTF)throw Error(`Unexpected PtgAttrSpaceType `+y[1][0])}s.push((ie?g:``)+s.pop()+(ie?``:g)),h=-1}}if(s.length>1&&i.WTF)throw Error(`bad formula stack`);return s[0]}function Yh(e){if(e==null){var t=q(8);return t.write_shift(1,3),t.write_shift(1,0),t.write_shift(2,0),t.write_shift(2,0),t.write_shift(2,65535),t}else if(typeof e==`number`)return ud(e);return ud(0)}function Xh(e,t,n,r,i){var a=vf(t,n,i),o=Yh(e.v),s=q(6);s.write_shift(2,33),s.write_shift(4,0);for(var c=q(e.bf.length),l=0;l<e.bf.length;++l)c[l]=e.bf[l];return bs([a,o,s,c])}function Zh(e,t,n){var r=Hh(e,e.read_shift(4),n),i=e.read_shift(4);return[r,i>0?Vh(e,i,r,n):null]}var Qh=Zh,$h=Zh,eg=Zh,tg=Zh,ng={0:`BEEP`,1:`OPEN`,2:`OPEN.LINKS`,3:`CLOSE.ALL`,4:`SAVE`,5:`SAVE.AS`,6:`FILE.DELETE`,7:`PAGE.SETUP`,8:`PRINT`,9:`PRINTER.SETUP`,10:`QUIT`,11:`NEW.WINDOW`,12:`ARRANGE.ALL`,13:`WINDOW.SIZE`,14:`WINDOW.MOVE`,15:`FULL`,16:`CLOSE`,17:`RUN`,22:`SET.PRINT.AREA`,23:`SET.PRINT.TITLES`,24:`SET.PAGE.BREAK`,25:`REMOVE.PAGE.BREAK`,26:`FONT`,27:`DISPLAY`,28:`PROTECT.DOCUMENT`,29:`PRECISION`,30:`A1.R1C1`,31:`CALCULATE.NOW`,32:`CALCULATION`,34:`DATA.FIND`,35:`EXTRACT`,36:`DATA.DELETE`,37:`SET.DATABASE`,38:`SET.CRITERIA`,39:`SORT`,40:`DATA.SERIES`,41:`TABLE`,42:`FORMAT.NUMBER`,43:`ALIGNMENT`,44:`STYLE`,45:`BORDER`,46:`CELL.PROTECTION`,47:`COLUMN.WIDTH`,48:`UNDO`,49:`CUT`,50:`COPY`,51:`PASTE`,52:`CLEAR`,53:`PASTE.SPECIAL`,54:`EDIT.DELETE`,55:`INSERT`,56:`FILL.RIGHT`,57:`FILL.DOWN`,61:`DEFINE.NAME`,62:`CREATE.NAMES`,63:`FORMULA.GOTO`,64:`FORMULA.FIND`,65:`SELECT.LAST.CELL`,66:`SHOW.ACTIVE.CELL`,67:`GALLERY.AREA`,68:`GALLERY.BAR`,69:`GALLERY.COLUMN`,70:`GALLERY.LINE`,71:`GALLERY.PIE`,72:`GALLERY.SCATTER`,73:`COMBINATION`,74:`PREFERRED`,75:`ADD.OVERLAY`,76:`GRIDLINES`,77:`SET.PREFERRED`,78:`AXES`,79:`LEGEND`,80:`ATTACH.TEXT`,81:`ADD.ARROW`,82:`SELECT.CHART`,83:`SELECT.PLOT.AREA`,84:`PATTERNS`,85:`MAIN.CHART`,86:`OVERLAY`,87:`SCALE`,88:`FORMAT.LEGEND`,89:`FORMAT.TEXT`,90:`EDIT.REPEAT`,91:`PARSE`,92:`JUSTIFY`,93:`HIDE`,94:`UNHIDE`,95:`WORKSPACE`,96:`FORMULA`,97:`FORMULA.FILL`,98:`FORMULA.ARRAY`,99:`DATA.FIND.NEXT`,100:`DATA.FIND.PREV`,101:`FORMULA.FIND.NEXT`,102:`FORMULA.FIND.PREV`,103:`ACTIVATE`,104:`ACTIVATE.NEXT`,105:`ACTIVATE.PREV`,106:`UNLOCKED.NEXT`,107:`UNLOCKED.PREV`,108:`COPY.PICTURE`,109:`SELECT`,110:`DELETE.NAME`,111:`DELETE.FORMAT`,112:`VLINE`,113:`HLINE`,114:`VPAGE`,115:`HPAGE`,116:`VSCROLL`,117:`HSCROLL`,118:`ALERT`,119:`NEW`,120:`CANCEL.COPY`,121:`SHOW.CLIPBOARD`,122:`MESSAGE`,124:`PASTE.LINK`,125:`APP.ACTIVATE`,126:`DELETE.ARROW`,127:`ROW.HEIGHT`,128:`FORMAT.MOVE`,129:`FORMAT.SIZE`,130:`FORMULA.REPLACE`,131:`SEND.KEYS`,132:`SELECT.SPECIAL`,133:`APPLY.NAMES`,134:`REPLACE.FONT`,135:`FREEZE.PANES`,136:`SHOW.INFO`,137:`SPLIT`,138:`ON.WINDOW`,139:`ON.DATA`,140:`DISABLE.INPUT`,142:`OUTLINE`,143:`LIST.NAMES`,144:`FILE.CLOSE`,145:`SAVE.WORKBOOK`,146:`DATA.FORM`,147:`COPY.CHART`,148:`ON.TIME`,149:`WAIT`,150:`FORMAT.FONT`,151:`FILL.UP`,152:`FILL.LEFT`,153:`DELETE.OVERLAY`,155:`SHORT.MENUS`,159:`SET.UPDATE.STATUS`,161:`COLOR.PALETTE`,162:`DELETE.STYLE`,163:`WINDOW.RESTORE`,164:`WINDOW.MAXIMIZE`,166:`CHANGE.LINK`,167:`CALCULATE.DOCUMENT`,168:`ON.KEY`,169:`APP.RESTORE`,170:`APP.MOVE`,171:`APP.SIZE`,172:`APP.MINIMIZE`,173:`APP.MAXIMIZE`,174:`BRING.TO.FRONT`,175:`SEND.TO.BACK`,185:`MAIN.CHART.TYPE`,186:`OVERLAY.CHART.TYPE`,187:`SELECT.END`,188:`OPEN.MAIL`,189:`SEND.MAIL`,190:`STANDARD.FONT`,191:`CONSOLIDATE`,192:`SORT.SPECIAL`,193:`GALLERY.3D.AREA`,194:`GALLERY.3D.COLUMN`,195:`GALLERY.3D.LINE`,196:`GALLERY.3D.PIE`,197:`VIEW.3D`,198:`GOAL.SEEK`,199:`WORKGROUP`,200:`FILL.GROUP`,201:`UPDATE.LINK`,202:`PROMOTE`,203:`DEMOTE`,204:`SHOW.DETAIL`,206:`UNGROUP`,207:`OBJECT.PROPERTIES`,208:`SAVE.NEW.OBJECT`,209:`SHARE`,210:`SHARE.NAME`,211:`DUPLICATE`,212:`APPLY.STYLE`,213:`ASSIGN.TO.OBJECT`,214:`OBJECT.PROTECTION`,215:`HIDE.OBJECT`,216:`SET.EXTRACT`,217:`CREATE.PUBLISHER`,218:`SUBSCRIBE.TO`,219:`ATTRIBUTES`,220:`SHOW.TOOLBAR`,222:`PRINT.PREVIEW`,223:`EDIT.COLOR`,224:`SHOW.LEVELS`,225:`FORMAT.MAIN`,226:`FORMAT.OVERLAY`,227:`ON.RECALC`,228:`EDIT.SERIES`,229:`DEFINE.STYLE`,240:`LINE.PRINT`,243:`ENTER.DATA`,249:`GALLERY.RADAR`,250:`MERGE.STYLES`,251:`EDITION.OPTIONS`,252:`PASTE.PICTURE`,253:`PASTE.PICTURE.LINK`,254:`SPELLING`,256:`ZOOM`,259:`INSERT.OBJECT`,260:`WINDOW.MINIMIZE`,265:`SOUND.NOTE`,266:`SOUND.PLAY`,267:`FORMAT.SHAPE`,268:`EXTEND.POLYGON`,269:`FORMAT.AUTO`,272:`GALLERY.3D.BAR`,273:`GALLERY.3D.SURFACE`,274:`FILL.AUTO`,276:`CUSTOMIZE.TOOLBAR`,277:`ADD.TOOL`,278:`EDIT.OBJECT`,279:`ON.DOUBLECLICK`,280:`ON.ENTRY`,281:`WORKBOOK.ADD`,282:`WORKBOOK.MOVE`,283:`WORKBOOK.COPY`,284:`WORKBOOK.OPTIONS`,285:`SAVE.WORKSPACE`,288:`CHART.WIZARD`,289:`DELETE.TOOL`,290:`MOVE.TOOL`,291:`WORKBOOK.SELECT`,292:`WORKBOOK.ACTIVATE`,293:`ASSIGN.TO.TOOL`,295:`COPY.TOOL`,296:`RESET.TOOL`,297:`CONSTRAIN.NUMERIC`,298:`PASTE.TOOL`,302:`WORKBOOK.NEW`,305:`SCENARIO.CELLS`,306:`SCENARIO.DELETE`,307:`SCENARIO.ADD`,308:`SCENARIO.EDIT`,309:`SCENARIO.SHOW`,310:`SCENARIO.SHOW.NEXT`,311:`SCENARIO.SUMMARY`,312:`PIVOT.TABLE.WIZARD`,313:`PIVOT.FIELD.PROPERTIES`,314:`PIVOT.FIELD`,315:`PIVOT.ITEM`,316:`PIVOT.ADD.FIELDS`,318:`OPTIONS.CALCULATION`,319:`OPTIONS.EDIT`,320:`OPTIONS.VIEW`,321:`ADDIN.MANAGER`,322:`MENU.EDITOR`,323:`ATTACH.TOOLBARS`,324:`VBAActivate`,325:`OPTIONS.CHART`,328:`VBA.INSERT.FILE`,330:`VBA.PROCEDURE.DEFINITION`,336:`ROUTING.SLIP`,338:`ROUTE.DOCUMENT`,339:`MAIL.LOGON`,342:`INSERT.PICTURE`,343:`EDIT.TOOL`,344:`GALLERY.DOUGHNUT`,350:`CHART.TREND`,352:`PIVOT.ITEM.PROPERTIES`,354:`WORKBOOK.INSERT`,355:`OPTIONS.TRANSITION`,356:`OPTIONS.GENERAL`,370:`FILTER.ADVANCED`,373:`MAIL.ADD.MAILER`,374:`MAIL.DELETE.MAILER`,375:`MAIL.REPLY`,376:`MAIL.REPLY.ALL`,377:`MAIL.FORWARD`,378:`MAIL.NEXT.LETTER`,379:`DATA.LABEL`,380:`INSERT.TITLE`,381:`FONT.PROPERTIES`,382:`MACRO.OPTIONS`,383:`WORKBOOK.HIDE`,384:`WORKBOOK.UNHIDE`,385:`WORKBOOK.DELETE`,386:`WORKBOOK.NAME`,388:`GALLERY.CUSTOM`,390:`ADD.CHART.AUTOFORMAT`,391:`DELETE.CHART.AUTOFORMAT`,392:`CHART.ADD.DATA`,393:`AUTO.OUTLINE`,394:`TAB.ORDER`,395:`SHOW.DIALOG`,396:`SELECT.ALL`,397:`UNGROUP.SHEETS`,398:`SUBTOTAL.CREATE`,399:`SUBTOTAL.REMOVE`,400:`RENAME.OBJECT`,412:`WORKBOOK.SCROLL`,413:`WORKBOOK.NEXT`,414:`WORKBOOK.PREV`,415:`WORKBOOK.TAB.SPLIT`,416:`FULL.SCREEN`,417:`WORKBOOK.PROTECT`,420:`SCROLLBAR.PROPERTIES`,421:`PIVOT.SHOW.PAGES`,422:`TEXT.TO.COLUMNS`,423:`FORMAT.CHARTTYPE`,424:`LINK.FORMAT`,425:`TRACER.DISPLAY`,430:`TRACER.NAVIGATE`,431:`TRACER.CLEAR`,432:`TRACER.ERROR`,433:`PIVOT.FIELD.GROUP`,434:`PIVOT.FIELD.UNGROUP`,435:`CHECKBOX.PROPERTIES`,436:`LABEL.PROPERTIES`,437:`LISTBOX.PROPERTIES`,438:`EDITBOX.PROPERTIES`,439:`PIVOT.REFRESH`,440:`LINK.COMBO`,441:`OPEN.TEXT`,442:`HIDE.DIALOG`,443:`SET.DIALOG.FOCUS`,444:`ENABLE.OBJECT`,445:`PUSHBUTTON.PROPERTIES`,446:`SET.DIALOG.DEFAULT`,447:`FILTER`,448:`FILTER.SHOW.ALL`,449:`CLEAR.OUTLINE`,450:`FUNCTION.WIZARD`,451:`ADD.LIST.ITEM`,452:`SET.LIST.ITEM`,453:`REMOVE.LIST.ITEM`,454:`SELECT.LIST.ITEM`,455:`SET.CONTROL.VALUE`,456:`SAVE.COPY.AS`,458:`OPTIONS.LISTS.ADD`,459:`OPTIONS.LISTS.DELETE`,460:`SERIES.AXES`,461:`SERIES.X`,462:`SERIES.Y`,463:`ERRORBAR.X`,464:`ERRORBAR.Y`,465:`FORMAT.CHART`,466:`SERIES.ORDER`,467:`MAIL.LOGOFF`,468:`CLEAR.ROUTING.SLIP`,469:`APP.ACTIVATE.MICROSOFT`,470:`MAIL.EDIT.MAILER`,471:`ON.SHEET`,472:`STANDARD.WIDTH`,473:`SCENARIO.MERGE`,474:`SUMMARY.INFO`,475:`FIND.FILE`,476:`ACTIVE.CELL.FONT`,477:`ENABLE.TIPWIZARD`,478:`VBA.MAKE.ADDIN`,480:`INSERTDATATABLE`,481:`WORKGROUP.OPTIONS`,482:`MAIL.SEND.MAILER`,485:`AUTOCORRECT`,489:`POST.DOCUMENT`,491:`PICKLIST`,493:`VIEW.SHOW`,494:`VIEW.DEFINE`,495:`VIEW.DELETE`,509:`SHEET.BACKGROUND`,510:`INSERT.MAP.OBJECT`,511:`OPTIONS.MENONO`,517:`MSOCHECKS`,518:`NORMAL`,519:`LAYOUT`,520:`RM.PRINT.AREA`,521:`CLEAR.PRINT.AREA`,522:`ADD.PRINT.AREA`,523:`MOVE.BRK`,545:`HIDECURR.NOTE`,546:`HIDEALL.NOTES`,547:`DELETE.NOTE`,548:`TRAVERSE.NOTES`,549:`ACTIVATE.NOTES`,620:`PROTECT.REVISIONS`,621:`UNPROTECT.REVISIONS`,647:`OPTIONS.ME`,653:`WEB.PUBLISH`,667:`NEWWEBQUERY`,673:`PIVOT.TABLE.CHART`,753:`OPTIONS.SAVE`,755:`OPTIONS.SPELL`,808:`HIDEALL.INKANNOTS`},rg={0:`COUNT`,1:`IF`,2:`ISNA`,3:`ISERROR`,4:`SUM`,5:`AVERAGE`,6:`MIN`,7:`MAX`,8:`ROW`,9:`COLUMN`,10:`NA`,11:`NPV`,12:`STDEV`,13:`DOLLAR`,14:`FIXED`,15:`SIN`,16:`COS`,17:`TAN`,18:`ATAN`,19:`PI`,20:`SQRT`,21:`EXP`,22:`LN`,23:`LOG10`,24:`ABS`,25:`INT`,26:`SIGN`,27:`ROUND`,28:`LOOKUP`,29:`INDEX`,30:`REPT`,31:`MID`,32:`LEN`,33:`VALUE`,34:`TRUE`,35:`FALSE`,36:`AND`,37:`OR`,38:`NOT`,39:`MOD`,40:`DCOUNT`,41:`DSUM`,42:`DAVERAGE`,43:`DMIN`,44:`DMAX`,45:`DSTDEV`,46:`VAR`,47:`DVAR`,48:`TEXT`,49:`LINEST`,50:`TREND`,51:`LOGEST`,52:`GROWTH`,53:`GOTO`,54:`HALT`,55:`RETURN`,56:`PV`,57:`FV`,58:`NPER`,59:`PMT`,60:`RATE`,61:`MIRR`,62:`IRR`,63:`RAND`,64:`MATCH`,65:`DATE`,66:`TIME`,67:`DAY`,68:`MONTH`,69:`YEAR`,70:`WEEKDAY`,71:`HOUR`,72:`MINUTE`,73:`SECOND`,74:`NOW`,75:`AREAS`,76:`ROWS`,77:`COLUMNS`,78:`OFFSET`,79:`ABSREF`,80:`RELREF`,81:`ARGUMENT`,82:`SEARCH`,83:`TRANSPOSE`,84:`ERROR`,85:`STEP`,86:`TYPE`,87:`ECHO`,88:`SET.NAME`,89:`CALLER`,90:`DEREF`,91:`WINDOWS`,92:`SERIES`,93:`DOCUMENTS`,94:`ACTIVE.CELL`,95:`SELECTION`,96:`RESULT`,97:`ATAN2`,98:`ASIN`,99:`ACOS`,100:`CHOOSE`,101:`HLOOKUP`,102:`VLOOKUP`,103:`LINKS`,104:`INPUT`,105:`ISREF`,106:`GET.FORMULA`,107:`GET.NAME`,108:`SET.VALUE`,109:`LOG`,110:`EXEC`,111:`CHAR`,112:`LOWER`,113:`UPPER`,114:`PROPER`,115:`LEFT`,116:`RIGHT`,117:`EXACT`,118:`TRIM`,119:`REPLACE`,120:`SUBSTITUTE`,121:`CODE`,122:`NAMES`,123:`DIRECTORY`,124:`FIND`,125:`CELL`,126:`ISERR`,127:`ISTEXT`,128:`ISNUMBER`,129:`ISBLANK`,130:`T`,131:`N`,132:`FOPEN`,133:`FCLOSE`,134:`FSIZE`,135:`FREADLN`,136:`FREAD`,137:`FWRITELN`,138:`FWRITE`,139:`FPOS`,140:`DATEVALUE`,141:`TIMEVALUE`,142:`SLN`,143:`SYD`,144:`DDB`,145:`GET.DEF`,146:`REFTEXT`,147:`TEXTREF`,148:`INDIRECT`,149:`REGISTER`,150:`CALL`,151:`ADD.BAR`,152:`ADD.MENU`,153:`ADD.COMMAND`,154:`ENABLE.COMMAND`,155:`CHECK.COMMAND`,156:`RENAME.COMMAND`,157:`SHOW.BAR`,158:`DELETE.MENU`,159:`DELETE.COMMAND`,160:`GET.CHART.ITEM`,161:`DIALOG.BOX`,162:`CLEAN`,163:`MDETERM`,164:`MINVERSE`,165:`MMULT`,166:`FILES`,167:`IPMT`,168:`PPMT`,169:`COUNTA`,170:`CANCEL.KEY`,171:`FOR`,172:`WHILE`,173:`BREAK`,174:`NEXT`,175:`INITIATE`,176:`REQUEST`,177:`POKE`,178:`EXECUTE`,179:`TERMINATE`,180:`RESTART`,181:`HELP`,182:`GET.BAR`,183:`PRODUCT`,184:`FACT`,185:`GET.CELL`,186:`GET.WORKSPACE`,187:`GET.WINDOW`,188:`GET.DOCUMENT`,189:`DPRODUCT`,190:`ISNONTEXT`,191:`GET.NOTE`,192:`NOTE`,193:`STDEVP`,194:`VARP`,195:`DSTDEVP`,196:`DVARP`,197:`TRUNC`,198:`ISLOGICAL`,199:`DCOUNTA`,200:`DELETE.BAR`,201:`UNREGISTER`,204:`USDOLLAR`,205:`FINDB`,206:`SEARCHB`,207:`REPLACEB`,208:`LEFTB`,209:`RIGHTB`,210:`MIDB`,211:`LENB`,212:`ROUNDUP`,213:`ROUNDDOWN`,214:`ASC`,215:`DBCS`,216:`RANK`,219:`ADDRESS`,220:`DAYS360`,221:`TODAY`,222:`VDB`,223:`ELSE`,224:`ELSE.IF`,225:`END.IF`,226:`FOR.CELL`,227:`MEDIAN`,228:`SUMPRODUCT`,229:`SINH`,230:`COSH`,231:`TANH`,232:`ASINH`,233:`ACOSH`,234:`ATANH`,235:`DGET`,236:`CREATE.OBJECT`,237:`VOLATILE`,238:`LAST.ERROR`,239:`CUSTOM.UNDO`,240:`CUSTOM.REPEAT`,241:`FORMULA.CONVERT`,242:`GET.LINK.INFO`,243:`TEXT.BOX`,244:`INFO`,245:`GROUP`,246:`GET.OBJECT`,247:`DB`,248:`PAUSE`,251:`RESUME`,252:`FREQUENCY`,253:`ADD.TOOLBAR`,254:`DELETE.TOOLBAR`,255:`User`,256:`RESET.TOOLBAR`,257:`EVALUATE`,258:`GET.TOOLBAR`,259:`GET.TOOL`,260:`SPELLING.CHECK`,261:`ERROR.TYPE`,262:`APP.TITLE`,263:`WINDOW.TITLE`,264:`SAVE.TOOLBAR`,265:`ENABLE.TOOL`,266:`PRESS.TOOL`,267:`REGISTER.ID`,268:`GET.WORKBOOK`,269:`AVEDEV`,270:`BETADIST`,271:`GAMMALN`,272:`BETAINV`,273:`BINOMDIST`,274:`CHIDIST`,275:`CHIINV`,276:`COMBIN`,277:`CONFIDENCE`,278:`CRITBINOM`,279:`EVEN`,280:`EXPONDIST`,281:`FDIST`,282:`FINV`,283:`FISHER`,284:`FISHERINV`,285:`FLOOR`,286:`GAMMADIST`,287:`GAMMAINV`,288:`CEILING`,289:`HYPGEOMDIST`,290:`LOGNORMDIST`,291:`LOGINV`,292:`NEGBINOMDIST`,293:`NORMDIST`,294:`NORMSDIST`,295:`NORMINV`,296:`NORMSINV`,297:`STANDARDIZE`,298:`ODD`,299:`PERMUT`,300:`POISSON`,301:`TDIST`,302:`WEIBULL`,303:`SUMXMY2`,304:`SUMX2MY2`,305:`SUMX2PY2`,306:`CHITEST`,307:`CORREL`,308:`COVAR`,309:`FORECAST`,310:`FTEST`,311:`INTERCEPT`,312:`PEARSON`,313:`RSQ`,314:`STEYX`,315:`SLOPE`,316:`TTEST`,317:`PROB`,318:`DEVSQ`,319:`GEOMEAN`,320:`HARMEAN`,321:`SUMSQ`,322:`KURT`,323:`SKEW`,324:`ZTEST`,325:`LARGE`,326:`SMALL`,327:`QUARTILE`,328:`PERCENTILE`,329:`PERCENTRANK`,330:`MODE`,331:`TRIMMEAN`,332:`TINV`,334:`MOVIE.COMMAND`,335:`GET.MOVIE`,336:`CONCATENATE`,337:`POWER`,338:`PIVOT.ADD.DATA`,339:`GET.PIVOT.TABLE`,340:`GET.PIVOT.FIELD`,341:`GET.PIVOT.ITEM`,342:`RADIANS`,343:`DEGREES`,344:`SUBTOTAL`,345:`SUMIF`,346:`COUNTIF`,347:`COUNTBLANK`,348:`SCENARIO.GET`,349:`OPTIONS.LISTS.GET`,350:`ISPMT`,351:`DATEDIF`,352:`DATESTRING`,353:`NUMBERSTRING`,354:`ROMAN`,355:`OPEN.DIALOG`,356:`SAVE.DIALOG`,357:`VIEW.GET`,358:`GETPIVOTDATA`,359:`HYPERLINK`,360:`PHONETIC`,361:`AVERAGEA`,362:`MAXA`,363:`MINA`,364:`STDEVPA`,365:`VARPA`,366:`STDEVA`,367:`VARA`,368:`BAHTTEXT`,369:`THAIDAYOFWEEK`,370:`THAIDIGIT`,371:`THAIMONTHOFYEAR`,372:`THAINUMSOUND`,373:`THAINUMSTRING`,374:`THAISTRINGLENGTH`,375:`ISTHAIDIGIT`,376:`ROUNDBAHTDOWN`,377:`ROUNDBAHTUP`,378:`THAIYEAR`,379:`RTD`,380:`CUBEVALUE`,381:`CUBEMEMBER`,382:`CUBEMEMBERPROPERTY`,383:`CUBERANKEDMEMBER`,384:`HEX2BIN`,385:`HEX2DEC`,386:`HEX2OCT`,387:`DEC2BIN`,388:`DEC2HEX`,389:`DEC2OCT`,390:`OCT2BIN`,391:`OCT2HEX`,392:`OCT2DEC`,393:`BIN2DEC`,394:`BIN2OCT`,395:`BIN2HEX`,396:`IMSUB`,397:`IMDIV`,398:`IMPOWER`,399:`IMABS`,400:`IMSQRT`,401:`IMLN`,402:`IMLOG2`,403:`IMLOG10`,404:`IMSIN`,405:`IMCOS`,406:`IMEXP`,407:`IMARGUMENT`,408:`IMCONJUGATE`,409:`IMAGINARY`,410:`IMREAL`,411:`COMPLEX`,412:`IMSUM`,413:`IMPRODUCT`,414:`SERIESSUM`,415:`FACTDOUBLE`,416:`SQRTPI`,417:`QUOTIENT`,418:`DELTA`,419:`GESTEP`,420:`ISEVEN`,421:`ISODD`,422:`MROUND`,423:`ERF`,424:`ERFC`,425:`BESSELJ`,426:`BESSELK`,427:`BESSELY`,428:`BESSELI`,429:`XIRR`,430:`XNPV`,431:`PRICEMAT`,432:`YIELDMAT`,433:`INTRATE`,434:`RECEIVED`,435:`DISC`,436:`PRICEDISC`,437:`YIELDDISC`,438:`TBILLEQ`,439:`TBILLPRICE`,440:`TBILLYIELD`,441:`PRICE`,442:`YIELD`,443:`DOLLARDE`,444:`DOLLARFR`,445:`NOMINAL`,446:`EFFECT`,447:`CUMPRINC`,448:`CUMIPMT`,449:`EDATE`,450:`EOMONTH`,451:`YEARFRAC`,452:`COUPDAYBS`,453:`COUPDAYS`,454:`COUPDAYSNC`,455:`COUPNCD`,456:`COUPNUM`,457:`COUPPCD`,458:`DURATION`,459:`MDURATION`,460:`ODDLPRICE`,461:`ODDLYIELD`,462:`ODDFPRICE`,463:`ODDFYIELD`,464:`RANDBETWEEN`,465:`WEEKNUM`,466:`AMORDEGRC`,467:`AMORLINC`,468:`CONVERT`,724:`SHEETJS`,469:`ACCRINT`,470:`ACCRINTM`,471:`WORKDAY`,472:`NETWORKDAYS`,473:`GCD`,474:`MULTINOMIAL`,475:`LCM`,476:`FVSCHEDULE`,477:`CUBEKPIMEMBER`,478:`CUBESET`,479:`CUBESETCOUNT`,480:`IFERROR`,481:`COUNTIFS`,482:`SUMIFS`,483:`AVERAGEIF`,484:`AVERAGEIFS`},ig={2:1,3:1,10:0,15:1,16:1,17:1,18:1,19:0,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:2,30:2,31:3,32:1,33:1,34:0,35:0,38:1,39:2,40:3,41:3,42:3,43:3,44:3,45:3,47:3,48:2,53:1,61:3,63:0,65:3,66:3,67:1,68:1,69:1,70:1,71:1,72:1,73:1,74:0,75:1,76:1,77:1,79:2,80:2,83:1,85:0,86:1,89:0,90:1,94:0,95:0,97:2,98:1,99:1,101:3,102:3,105:1,106:1,108:2,111:1,112:1,113:1,114:1,117:2,118:1,119:4,121:1,126:1,127:1,128:1,129:1,130:1,131:1,133:1,134:1,135:1,136:2,137:2,138:2,140:1,141:1,142:3,143:4,144:4,161:1,162:1,163:1,164:1,165:2,172:1,175:2,176:2,177:3,178:2,179:1,184:1,186:1,189:3,190:1,195:3,196:3,197:1,198:1,199:3,201:1,207:4,210:3,211:1,212:2,213:2,214:1,215:1,225:0,229:1,230:1,231:1,232:1,233:1,234:1,235:3,244:1,247:4,252:2,257:1,261:1,271:1,273:4,274:2,275:2,276:2,277:3,278:3,279:1,280:3,281:3,282:3,283:1,284:1,285:2,286:4,287:3,288:2,289:4,290:3,291:3,292:3,293:4,294:1,295:3,296:1,297:3,298:1,299:2,300:3,301:3,302:4,303:2,304:2,305:2,306:2,307:2,308:2,309:3,310:2,311:2,312:2,313:2,314:2,315:2,316:4,325:2,326:2,327:2,328:2,331:2,332:2,337:2,342:1,343:1,346:2,347:1,350:4,351:3,352:1,353:2,360:1,368:1,369:1,370:1,371:1,372:1,373:1,374:1,375:1,376:1,377:1,378:1,382:3,385:1,392:1,393:1,396:2,397:2,398:2,399:1,400:1,401:1,402:1,403:1,404:1,405:1,406:1,407:1,408:1,409:1,410:1,414:4,415:1,416:1,417:2,420:1,421:1,422:2,424:1,425:2,426:2,427:2,428:2,430:3,438:3,439:3,440:3,443:2,444:2,445:2,446:2,447:6,448:6,449:2,450:2,464:2,468:3,476:2,479:1,480:2,65535:0};function ag(e){return(`of:=`+e.replace(gm,`$1[.$2$3$4$5]`).replace(/\]:\[/g,`:`)).replace(/;/g,`|`).replace(/,/g,`;`)}function og(e){return e.replace(/\./,`!`)}var sg=typeof Map<`u`;function cg(e,t,n){var r=0,i=e.length;if(n){if(sg?n.has(t):Object.prototype.hasOwnProperty.call(n,t)){for(var a=sg?n.get(t):n[t];r<a.length;++r)if(e[a[r]].t===t)return e.Count++,a[r]}}else for(;r<i;++r)if(e[r].t===t)return e.Count++,r;return e[i]={t},e.Count++,e.Unique++,n&&(sg?(n.has(t)||n.set(t,[]),n.get(t).push(i)):(Object.prototype.hasOwnProperty.call(n,t)||(n[t]=[]),n[t].push(i))),i}function lg(e,t){var n={min:e+1,max:e+1},r=-1;return t.MDW&&(up=t.MDW),t.width==null?t.wpx==null?t.wch!=null&&(r=t.wch):r=fp(t.wpx):n.customWidth=1,r>-1?(n.width=pp(r),n.customWidth=1):t.width!=null&&(n.width=t.width),t.hidden&&(n.hidden=!0),t.level!=null&&(n.outlineLevel=n.level=t.level),n}function ug(e,t){if(e){var n=[.7,.7,.75,.75,.3,.3];t==`xlml`&&(n=[1,1,1,1,.5,.5]),e.left??=n[0],e.right??=n[1],e.top??=n[2],e.bottom??=n[3],e.header??=n[4],e.footer??=n[5]}}function dg(e,t,n){var r=n.revssf[t.z==null?`General`:t.z],i=60,a=e.length;if(r==null&&n.ssf){for(;i<392;++i)if(n.ssf[i]==null){kc(t.z,i),n.ssf[i]=t.z,n.revssf[t.z]=r=i;break}}for(i=0;i!=a;++i)if(e[i].numFmtId===r)return i;return e[a]={numFmtId:r,fontId:0,fillId:0,borderId:0,xfId:0,applyNumberFormat:1},a}function fg(e,t,n){if(e&&e[`!ref`]){var r=ju(e[`!ref`]);if(r.e.c<r.s.c||r.e.r<r.s.r)throw Error(`Bad range (`+n+`): `+e[`!ref`])}}function pg(e){if(e.length===0)return``;for(var t=`<mergeCells count="`+e.length+`">`,n=0;n!=e.length;++n)t+=`<mergeCell ref="`+Au(e[n])+`"/>`;return t+`</mergeCells>`}function mg(e,t,n,r,i){var a=!1,o={},s=null;if(r.bookType!==`xlsx`&&t.vbaraw){var c=t.SheetNames[n];try{t.Workbook&&(c=t.Workbook.Sheets[n].CodeName||c)}catch{}a=!0,o.codeName=Sl(H(c))}if(e&&e[`!outline`]){var l={summaryBelow:1,summaryRight:1};e[`!outline`].above&&(l.summaryBelow=0),e[`!outline`].left&&(l.summaryRight=0),s=(s||``)+U(`outlinePr`,null,l)}!a&&!s||(i[i.length]=U(`sheetPr`,s,o))}var hg=[`objects`,`scenarios`,`selectLockedCells`,`selectUnlockedCells`],gg=[`formatColumns`,`formatRows`,`formatCells`,`insertColumns`,`insertRows`,`insertHyperlinks`,`deleteColumns`,`deleteRows`,`sort`,`autoFilter`,`pivotTables`];function _g(e){var t={sheet:1};return hg.forEach(function(n){e[n]!=null&&e[n]&&(t[n]=`1`)}),gg.forEach(function(n){e[n]!=null&&!e[n]&&(t[n]=`0`)}),e.password&&(t.password=sp(e.password).toString(16).toUpperCase()),U(`sheetProtection`,null,t)}function vg(e){return ug(e),U(`pageMargins`,null,e)}function yg(e,t){for(var n=[`<cols>`],r,i=0;i!=t.length;++i)(r=t[i])&&(n[n.length]=U(`col`,null,lg(i,r)));return n[n.length]=`</cols>`,n.join(``)}function bg(e,t,n,r){var i=typeof e.ref==`string`?e.ref:Au(e.ref);n.Workbook||={Sheets:[]},n.Workbook.Names||(n.Workbook.Names=[]);var a=n.Workbook.Names,o=ku(i);o.s.r==o.e.r&&(o.e.r=ku(t[`!ref`]).e.r,i=Au(o));for(var s=0;s<a.length;++s){var c=a[s];if(c.Name==`_xlnm._FilterDatabase`&&c.Sheet==r){c.Ref=`'`+n.SheetNames[r]+`'!`+i;break}}return s==a.length&&a.push({Name:`_xlnm._FilterDatabase`,Sheet:r,Ref:`'`+n.SheetNames[r]+`'!`+i}),U(`autoFilter`,null,{ref:i})}function xg(e,t,n,r){var i={workbookViewId:`0`};return(((r||{}).Workbook||{}).Views||[])[0]&&(i.rightToLeft=r.Workbook.Views[0].RTL?`1`:`0`),U(`sheetViews`,U(`sheetView`,null,i),{})}function Sg(e,t,n,r){if(e.c&&n[`!comments`].push([t,e.c]),e.v===void 0&&typeof e.f!=`string`||e.t===`z`&&!e.f)return``;var i=``,a=e.t,o=e.v;if(e.t!==`z`)switch(e.t){case`b`:i=e.v?`1`:`0`;break;case`n`:i=``+e.v;break;case`e`:i=Od[e.v];break;case`d`:r&&r.cellDates?i=el(e.v,-1).toISOString():(e=nl(e),e.t=`n`,i=``+(e.v=Kc(el(e.v)))),e.z===void 0&&(e.z=Is[14]);break;default:i=e.v;break}var s=Tl(`v`,H(i)),c={r:t},l=dg(r.cellXfs,e,r);switch(l!==0&&(c.s=l),e.t){case`n`:break;case`d`:c.t=`d`;break;case`b`:c.t=`b`;break;case`e`:c.t=`e`;break;case`z`:break;default:if(e.v==null){delete e.t;break}if(e.v.length>32767)throw Error(`Text length must not exceed 32767 characters`);if(r&&r.bookSST){s=Tl(`v`,``+cg(r.Strings,e.v,r.revStrings)),c.t=`s`;break}c.t=`str`;break}if(e.t!=a&&(e.t=a,e.v=o),typeof e.f==`string`&&e.f){var u=e.F&&e.F.slice(0,t.length)==t?{t:`array`,ref:e.F}:null;s=U(`f`,H(e.f),u)+(e.v==null?``:s)}return e.l&&n[`!links`].push([t,e.l]),e.D&&(c.cm=1),U(`c`,s,c)}function Cg(e,t,n,r){var i=[],a=[],o=ju(e[`!ref`]),s=``,c,l=``,u=[],d=0,f=0,p=e[`!rows`],m=Array.isArray(e),h={r:l},g,_=-1;for(f=o.s.c;f<=o.e.c;++f)u[f]=Cu(f);for(d=o.s.r;d<=o.e.r;++d){for(a=[],l=yu(d),f=o.s.c;f<=o.e.c;++f){c=u[f]+l;var v=m?(e[d]||[])[f]:e[c];v!==void 0&&(s=Sg(v,c,e,t,n,r))!=null&&a.push(s)}(a.length>0||p&&p[d])&&(h={r:l},p&&p[d]&&(g=p[d],g.hidden&&(h.hidden=1),_=-1,g.hpx?_=gp(g.hpx):g.hpt&&(_=g.hpt),_>-1&&(h.ht=_,h.customHeight=1),g.level&&(h.outlineLevel=g.level)),i[i.length]=U(`row`,a.join(``),h))}if(p)for(;d<p.length;++d)p&&p[d]&&(h={r:d+1},g=p[d],g.hidden&&(h.hidden=1),_=-1,g.hpx?_=gp(g.hpx):g.hpt&&(_=g.hpt),_>-1&&(h.ht=_,h.customHeight=1),g.level&&(h.outlineLevel=g.level),i[i.length]=U(`row`,``,h));return i.join(``)}function wg(e,t,n,r){var i=[V,U(`worksheet`,null,{xmlns:Al[0],"xmlns:r":kl.r})],a=n.SheetNames[e],o=0,s=``,c=n.Sheets[a];c??={};var l=c[`!ref`]||`A1`,u=ju(l);if(u.e.c>16383||u.e.r>1048575){if(t.WTF)throw Error(`Range `+l+` exceeds format limit A1:XFD1048576`);u.e.c=Math.min(u.e.c,16383),u.e.r=Math.min(u.e.c,1048575),l=Au(u)}r||={},c[`!comments`]=[];var d=[];mg(c,n,e,t,i),i[i.length]=U(`dimension`,null,{ref:l}),i[i.length]=xg(c,t,e,n),t.sheetFormat&&(i[i.length]=U(`sheetFormatPr`,null,{defaultRowHeight:t.sheetFormat.defaultRowHeight||`16`,baseColWidth:t.sheetFormat.baseColWidth||`10`,outlineLevelRow:t.sheetFormat.outlineLevelRow||`7`})),c[`!cols`]!=null&&c[`!cols`].length>0&&(i[i.length]=yg(c,c[`!cols`])),i[o=i.length]=`<sheetData/>`,c[`!links`]=[],c[`!ref`]!=null&&(s=Cg(c,t,e,n,r),s.length>0&&(i[i.length]=s)),i.length>o+1&&(i[i.length]=`</sheetData>`,i[o]=i[o].replace(`/>`,`>`)),c[`!protect`]&&(i[i.length]=_g(c[`!protect`])),c[`!autofilter`]!=null&&(i[i.length]=bg(c[`!autofilter`],c,n,e)),c[`!merges`]!=null&&c[`!merges`].length>0&&(i[i.length]=pg(c[`!merges`]));var f=-1,p,m=-1;return c[`!links`].length>0&&(i[i.length]=`<hyperlinks>`,c[`!links`].forEach(function(e){e[1].Target&&(p={ref:e[0]},e[1].Target.charAt(0)!=`#`&&(m=Fd(r,-1,H(e[1].Target).replace(/#.*$/,``),Z.HLINK),p[`r:id`]=`rId`+m),(f=e[1].Target.indexOf(`#`))>-1&&(p.location=H(e[1].Target.slice(f+1))),e[1].Tooltip&&(p.tooltip=H(e[1].Tooltip)),i[i.length]=U(`hyperlink`,null,p))}),i[i.length]=`</hyperlinks>`),delete c[`!links`],c[`!margins`]!=null&&(i[i.length]=vg(c[`!margins`])),(!t||t.ignoreEC||t.ignoreEC==null)&&(i[i.length]=Tl(`ignoredErrors`,U(`ignoredError`,null,{numberStoredAsText:1,sqref:l}))),d.length>0&&(m=Fd(r,-1,`../drawings/drawing`+(e+1)+`.xml`,Z.DRAW),i[i.length]=U(`drawing`,null,{"r:id":`rId`+m}),c[`!drawing`]=d),c[`!comments`].length>0&&(m=Fd(r,-1,`../drawings/vmlDrawing`+(e+1)+`.vml`,Z.VML),i[i.length]=U(`legacyDrawing`,null,{"r:id":`rId`+m}),c[`!legacy`]=m),i.length>1&&(i[i.length]=`</worksheet>`,i[1]=i[1].replace(`/>`,`>`)),i.join(``)}function Tg(e,t){var n={},r=e.l+t;n.r=e.read_shift(4),e.l+=4;var i=e.read_shift(2);e.l+=1;var a=e.read_shift(1);return e.l=r,a&7&&(n.level=a&7),a&16&&(n.hidden=!0),a&32&&(n.hpt=i/20),n}function Eg(e,t,n){var r=q(145),i=(n[`!rows`]||[])[e]||{};r.write_shift(4,e),r.write_shift(4,0);var a=320;i.hpx?a=gp(i.hpx)*20:i.hpt&&(a=i.hpt*20),r.write_shift(2,a),r.write_shift(1,0);var o=0;i.level&&(o|=i.level),i.hidden&&(o|=16),(i.hpx||i.hpt)&&(o|=32),r.write_shift(1,o),r.write_shift(1,0);var s=0,c=r.l;r.l+=4;for(var l={r:e,c:0},u=0;u<16;++u)if(!(t.s.c>u+1<<10||t.e.c<u<<10)){for(var d=-1,f=-1,p=u<<10;p<u+1<<10;++p)l.c=p,(Array.isArray(n)?(n[l.r]||[])[l.c]:n[Ou(l)])&&(d<0&&(d=p),f=p);d<0||(++s,r.write_shift(4,d),r.write_shift(4,f))}var m=r.l;return r.l=c,r.write_shift(4,s),r.l=m,r.length>r.l?r.slice(0,r.l):r}function Dg(e,t,n,r){var i=Eg(r,n,t);(i.length>17||(t[`!rows`]||[])[r])&&J(e,0,i)}var Og=sd,kg=cd;function Ag(){}function jg(e,t){var n={},r=e[e.l];return++e.l,n.above=!(r&64),n.left=!(r&128),e.l+=18,n.name=Xu(e,t-19),n}function Mg(e,t,n){n??=q(84+4*e.length);var r=192;t&&(t.above&&(r&=-65),t.left&&(r&=-129)),n.write_shift(1,r);for(var i=1;i<3;++i)n.write_shift(1,0);return fd({auto:1},n),n.write_shift(-4,-1),n.write_shift(-4,-1),Zu(e,n),n.slice(0,n.l)}function Ng(e){return[Y(e)]}function Pg(e,t,n){return n??=q(8),qu(t,n)}function Fg(e){return[Ju(e)]}function Ig(e,t,n){return n??=q(4),Yu(t,n)}function Lg(e){return[Y(e),e.read_shift(1),`b`]}function Rg(e,t,n){return n??=q(9),qu(t,n),n.write_shift(1,+!!e.v),n}function zg(e){return[Ju(e),e.read_shift(1),`b`]}function Bg(e,t,n){return n??=q(5),Yu(t,n),n.write_shift(1,+!!e.v),n}function Vg(e){return[Y(e),e.read_shift(1),`e`]}function Hg(e,t,n){return n??=q(9),qu(t,n),n.write_shift(1,e.v),n}function Ug(e){return[Ju(e),e.read_shift(1),`e`]}function Wg(e,t,n){return n??=q(8),Yu(t,n),n.write_shift(1,e.v),n.write_shift(2,0),n.write_shift(1,0),n}function Gg(e){return[Y(e),e.read_shift(4),`s`]}function Kg(e,t,n){return n??=q(12),qu(t,n),n.write_shift(4,t.v),n}function qg(e){return[Ju(e),e.read_shift(4),`s`]}function Jg(e,t,n){return n??=q(8),Yu(t,n),n.write_shift(4,t.v),n}function Yg(e){return[Y(e),ld(e),`n`]}function Xg(e,t,n){return n??=q(16),qu(t,n),ud(e.v,n),n}function Zg(e){return[Ju(e),ld(e),`n`]}function Qg(e,t,n){return n??=q(12),Yu(t,n),ud(e.v,n),n}function $g(e){return[Y(e),rd(e),`n`]}function e_(e,t,n){return n??=q(12),qu(t,n),id(e.v,n),n}function t_(e){return[Ju(e),rd(e),`n`]}function n_(e,t,n){return n??=q(8),Yu(t,n),id(e.v,n),n}function r_(e){return[Y(e),Uu(e),`is`]}function i_(e){return[Y(e),zu(e),`str`]}function a_(e,t,n){return n??=q(12+4*e.v.length),qu(t,n),Bu(e.v,n),n.length>n.l?n.slice(0,n.l):n}function o_(e){return[Ju(e),zu(e),`str`]}function s_(e,t,n){return n??=q(8+4*e.v.length),Yu(t,n),Bu(e.v,n),n.length>n.l?n.slice(0,n.l):n}function c_(e,t,n){var r=e.l+t,i=Y(e);i.r=n[`!row`];var a=[i,e.read_shift(1),`b`];return n.cellFormula?(e.l+=2,a[3]=Jh($h(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}function l_(e,t,n){var r=e.l+t,i=Y(e);i.r=n[`!row`];var a=[i,e.read_shift(1),`e`];return n.cellFormula?(e.l+=2,a[3]=Jh($h(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}function u_(e,t,n){var r=e.l+t,i=Y(e);i.r=n[`!row`];var a=[i,ld(e),`n`];return n.cellFormula?(e.l+=2,a[3]=Jh($h(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}function d_(e,t,n){var r=e.l+t,i=Y(e);i.r=n[`!row`];var a=[i,zu(e),`str`];return n.cellFormula?(e.l+=2,a[3]=Jh($h(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}var f_=sd,p_=cd;function m_(e,t){return t??=q(4),t.write_shift(4,e),t}function h_(e,t){var n=e.l+t,r=sd(e,16),i=Qu(e),a=zu(e),o=zu(e),s=zu(e);e.l=n;var c={rfx:r,relId:i,loc:a,display:s};return o&&(c.Tooltip=o),c}function g_(e,t){var n=q(50+4*(e[1].Target.length+(e[1].Tooltip||``).length));cd({s:Du(e[0]),e:Du(e[0])},n),nd(`rId`+t,n);var r=e[1].Target.indexOf(`#`);return Bu((r==-1?``:e[1].Target.slice(r+1))||``,n),Bu(e[1].Tooltip||``,n),Bu(``,n),n.slice(0,n.l)}function __(){}function v_(e,t,n){var r=e.l+t,i=ad(e,16),a=e.read_shift(1),o=[i];return o[2]=a,n.cellFormula?o[1]=Qh(e,r-e.l,n):e.l=r,o}function y_(e,t,n){var r=e.l+t,i=[sd(e,16)];return n.cellFormula&&(i[1]=tg(e,r-e.l,n)),e.l=r,i}function b_(e,t,n){n??=q(18);var r=lg(e,t);n.write_shift(-4,e),n.write_shift(-4,e),n.write_shift(4,(r.width||10)*256),n.write_shift(4,0);var i=0;return t.hidden&&(i|=1),typeof r.width==`number`&&(i|=2),t.level&&(i|=t.level<<8),n.write_shift(2,i),n}var x_=[`left`,`right`,`top`,`bottom`,`header`,`footer`];function S_(e){var t={};return x_.forEach(function(n){t[n]=ld(e,8)}),t}function C_(e,t){return t??=q(48),ug(e),x_.forEach(function(n){ud(e[n],t)}),t}function w_(e){var t=e.read_shift(2);return e.l+=28,{RTL:t&32}}function T_(e,t,n){n??=q(30);var r=924;return(((t||{}).Views||[])[0]||{}).RTL&&(r|=32),n.write_shift(2,r),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(2,0),n.write_shift(2,100),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(4,0),n}function E_(e){var t=q(24);return t.write_shift(4,4),t.write_shift(4,1),cd(e,t),t}function D_(e,t){return t??=q(66),t.write_shift(2,e.password?sp(e.password):0),t.write_shift(4,1),[[`objects`,!1],[`scenarios`,!1],[`formatCells`,!0],[`formatColumns`,!0],[`formatRows`,!0],[`insertColumns`,!0],[`insertRows`,!0],[`insertHyperlinks`,!0],[`deleteColumns`,!0],[`deleteRows`,!0],[`selectLockedCells`,!1],[`sort`,!0],[`autoFilter`,!0],[`pivotTables`,!0],[`selectUnlockedCells`,!1]].forEach(function(n){n[1]?t.write_shift(4,+(e[n[0]]!=null&&!e[n[0]])):t.write_shift(4,e[n[0]]!=null&&e[n[0]]?0:1)}),t}function O_(){}function k_(){}function A_(e,t,n,r,i,a,o){if(t.v===void 0)return!1;var s=``;switch(t.t){case`b`:s=t.v?`1`:`0`;break;case`d`:t=nl(t),t.z=t.z||Is[14],t.v=Kc(el(t.v)),t.t=`n`;break;case`n`:case`e`:s=``+t.v;break;default:s=t.v;break}var c={r:n,c:r};switch(c.s=dg(i.cellXfs,t,i),t.l&&a[`!links`].push([Ou(c),t.l]),t.c&&a[`!comments`].push([Ou(c),t.c]),t.t){case`s`:case`str`:return i.bookSST?(s=cg(i.Strings,t.v,i.revStrings),c.t=`s`,c.v=s,o?J(e,18,Jg(t,c)):J(e,7,Kg(t,c))):(c.t=`str`,o?J(e,17,s_(t,c)):J(e,6,a_(t,c))),!0;case`n`:return t.v==(t.v|0)&&t.v>-1e3&&t.v<1e3?o?J(e,13,n_(t,c)):J(e,2,e_(t,c)):o?J(e,16,Qg(t,c)):J(e,5,Xg(t,c)),!0;case`b`:return c.t=`b`,o?J(e,15,Bg(t,c)):J(e,4,Rg(t,c)),!0;case`e`:return c.t=`e`,o?J(e,14,Wg(t,c)):J(e,3,Hg(t,c)),!0}return o?J(e,12,Ig(t,c)):J(e,1,Pg(t,c)),!0}function j_(e,t,n,r){var i=ju(t[`!ref`]||`A1`),a,o=``,s=[];J(e,145);var c=Array.isArray(t),l=i.e.r;t[`!rows`]&&(l=Math.max(i.e.r,t[`!rows`].length-1));for(var u=i.s.r;u<=l;++u){o=yu(u),Dg(e,t,i,u);var d=!1;if(u<=i.e.r)for(var f=i.s.c;f<=i.e.c;++f){u===i.s.r&&(s[f]=Cu(f)),a=s[f]+o;var p=c?(t[u]||[])[f]:t[a];if(!p){d=!1;continue}d=A_(e,p,u,f,r,t,d)}}J(e,146)}function M_(e,t){!t||!t[`!merges`]||(J(e,177,m_(t[`!merges`].length)),t[`!merges`].forEach(function(t){J(e,176,p_(t))}),J(e,178))}function N_(e,t){!t||!t[`!cols`]||(J(e,390),t[`!cols`].forEach(function(t,n){t&&J(e,60,b_(n,t))}),J(e,391))}function P_(e,t){!t||!t[`!ref`]||(J(e,648),J(e,649,E_(ju(t[`!ref`]))),J(e,650))}function F_(e,t,n){t[`!links`].forEach(function(t){t[1].Target&&J(e,494,g_(t,Fd(n,-1,t[1].Target.replace(/#.*$/,``),Z.HLINK)))}),delete t[`!links`]}function I_(e,t,n,r){if(t[`!comments`].length>0){var i=Fd(r,-1,`../drawings/vmlDrawing`+(n+1)+`.vml`,Z.VML);J(e,551,nd(`rId`+i)),t[`!legacy`]=i}}function L_(e,t,n,r){if(t[`!autofilter`]){var i=t[`!autofilter`],a=typeof i.ref==`string`?i.ref:Au(i.ref);n.Workbook||={Sheets:[]},n.Workbook.Names||(n.Workbook.Names=[]);var o=n.Workbook.Names,s=ku(a);s.s.r==s.e.r&&(s.e.r=ku(t[`!ref`]).e.r,a=Au(s));for(var c=0;c<o.length;++c){var l=o[c];if(l.Name==`_xlnm._FilterDatabase`&&l.Sheet==r){l.Ref=`'`+n.SheetNames[r]+`'!`+a;break}}c==o.length&&o.push({Name:`_xlnm._FilterDatabase`,Sheet:r,Ref:`'`+n.SheetNames[r]+`'!`+a}),J(e,161,cd(ju(a))),J(e,162)}}function R_(e,t,n){J(e,133),J(e,137,T_(t,n)),J(e,138),J(e,134)}function z_(e,t){t[`!protect`]&&J(e,535,D_(t[`!protect`]))}function B_(e,t,n,r){var i=pu(),a=n.SheetNames[e],o=n.Sheets[a]||{},s=a;try{n&&n.Workbook&&(s=n.Workbook.Sheets[e].CodeName||s)}catch{}var c=ju(o[`!ref`]||`A1`);if(c.e.c>16383||c.e.r>1048575){if(t.WTF)throw Error(`Range `+(o[`!ref`]||`A1`)+` exceeds format limit A1:XFD1048576`);c.e.c=Math.min(c.e.c,16383),c.e.r=Math.min(c.e.c,1048575)}return o[`!links`]=[],o[`!comments`]=[],J(i,129),(n.vbaraw||o[`!outline`])&&J(i,147,Mg(s,o[`!outline`])),J(i,148,kg(c)),R_(i,o,n.Workbook),N_(i,o,e,t,n),j_(i,o,e,t,n),z_(i,o),L_(i,o,n,e),M_(i,o),F_(i,o,r),o[`!margins`]&&J(i,476,C_(o[`!margins`])),(!t||t.ignoreEC||t.ignoreEC==null)&&P_(i,o),I_(i,o,e,r),J(i,130),i.end()}function V_(e,t){return e.l+=10,{name:zu(e,t-10)}}var H_=[[`allowRefreshQuery`,!1,`bool`],[`autoCompressPictures`,!0,`bool`],[`backupFile`,!1,`bool`],[`checkCompatibility`,!1,`bool`],[`CodeName`,``],[`date1904`,!1,`bool`],[`defaultThemeVersion`,0,`int`],[`filterPrivacy`,!1,`bool`],[`hidePivotFieldList`,!1,`bool`],[`promptedSolutions`,!1,`bool`],[`publishItems`,!1,`bool`],[`refreshAllConnections`,!1,`bool`],[`saveExternalLinkValues`,!0,`bool`],[`showBorderUnselectedTables`,!0,`bool`],[`showInkAnnotation`,!0,`bool`],[`showObjects`,`all`],[`showPivotChartFilter`,!1,`bool`],[`updateLinks`,`userSet`]];function U_(e){return!e.Workbook||!e.Workbook.WBProps?`false`:gl(e.Workbook.WBProps.date1904)?`true`:`false`}var W_=`][*?/\\`.split(``);function G_(e,t){if(e.length>31){if(t)return!1;throw Error(`Sheet names cannot exceed 31 chars`)}var n=!0;return W_.forEach(function(r){if(e.indexOf(r)!=-1){if(!t)throw Error(`Sheet name cannot contain : \\ / ? * [ ]`);n=!1}}),n}function K_(e,t,n){e.forEach(function(r,i){G_(r);for(var a=0;a<i;++a)if(r==e[a])throw Error(`Duplicate Sheet Name: `+r);if(n){var o=t&&t[i]&&t[i].CodeName||r;if(o.charCodeAt(0)==95&&o.length>22)throw Error(`Bad Code Name: Worksheet`+o)}})}function q_(e){if(!e||!e.SheetNames||!e.Sheets)throw Error(`Invalid Workbook`);if(!e.SheetNames.length)throw Error(`Workbook is empty`);var t=e.Workbook&&e.Workbook.Sheets||[];K_(e.SheetNames,t,!!e.vbaraw);for(var n=0;n<e.SheetNames.length;++n)fg(e.Sheets[e.SheetNames[n]],e.SheetNames[n],n)}function J_(e){var t=[V];t[t.length]=U(`workbook`,null,{xmlns:Al[0],"xmlns:r":kl.r});var n=e.Workbook&&(e.Workbook.Names||[]).length>0,r={codeName:`ThisWorkbook`};e.Workbook&&e.Workbook.WBProps&&(H_.forEach(function(t){e.Workbook.WBProps[t[0]]!=null&&e.Workbook.WBProps[t[0]]!=t[1]&&(r[t[0]]=e.Workbook.WBProps[t[0]])}),e.Workbook.WBProps.CodeName&&(r.codeName=e.Workbook.WBProps.CodeName,delete r.CodeName)),t[t.length]=U(`workbookPr`,null,r);var i=e.Workbook&&e.Workbook.Sheets||[],a=0;if(i&&i[0]&&i[0].Hidden){for(t[t.length]=`<bookViews>`,a=0;a!=e.SheetNames.length&&!(!i[a]||!i[a].Hidden);++a);a==e.SheetNames.length&&(a=0),t[t.length]=`<workbookView firstSheet="`+a+`" activeTab="`+a+`"/>`,t[t.length]=`</bookViews>`}for(t[t.length]=`<sheets>`,a=0;a!=e.SheetNames.length;++a){var o={name:H(e.SheetNames[a].slice(0,31))};if(o.sheetId=``+(a+1),o[`r:id`]=`rId`+(a+1),i[a])switch(i[a].Hidden){case 1:o.state=`hidden`;break;case 2:o.state=`veryHidden`;break}t[t.length]=U(`sheet`,null,o)}return t[t.length]=`</sheets>`,n&&(t[t.length]=`<definedNames>`,e.Workbook&&e.Workbook.Names&&e.Workbook.Names.forEach(function(e){var n={name:e.Name};e.Comment&&(n.comment=e.Comment),e.Sheet!=null&&(n.localSheetId=``+e.Sheet),e.Hidden&&(n.hidden=`1`),e.Ref&&(t[t.length]=U(`definedName`,H(e.Ref),n))}),t[t.length]=`</definedNames>`),t.length>2&&(t[t.length]=`</workbook>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}function Y_(e,t){var n={};return n.Hidden=e.read_shift(4),n.iTabID=e.read_shift(4),n.strRelID=td(e,t-8),n.name=zu(e),n}function X_(e,t){return t||=q(127),t.write_shift(4,e.Hidden),t.write_shift(4,e.iTabID),nd(e.strRelID,t),Bu(e.name.slice(0,31),t),t.length>t.l?t.slice(0,t.l):t}function Z_(e,t){var n={},r=e.read_shift(4);n.defaultThemeVersion=e.read_shift(4);var i=t>8?zu(e):``;return i.length>0&&(n.CodeName=i),n.autoCompressPictures=!!(r&65536),n.backupFile=!!(r&64),n.checkCompatibility=!!(r&4096),n.date1904=!!(r&1),n.filterPrivacy=!!(r&8),n.hidePivotFieldList=!!(r&1024),n.promptedSolutions=!!(r&16),n.publishItems=!!(r&2048),n.refreshAllConnections=!!(r&262144),n.saveExternalLinkValues=!!(r&128),n.showBorderUnselectedTables=!!(r&4),n.showInkAnnotation=!!(r&32),n.showObjects=[`all`,`placeholders`,`none`][r>>13&3],n.showPivotChartFilter=!!(r&32768),n.updateLinks=[`userSet`,`never`,`always`][r>>8&3],n}function Q_(e,t){t||=q(72);var n=0;return e&&e.filterPrivacy&&(n|=8),t.write_shift(4,n),t.write_shift(4,0),Zu(e&&e.CodeName||`ThisWorkbook`,t),t.slice(0,t.l)}function $_(e,t,n){var r=e.l+t;e.l+=4,e.l+=1;var i=e.read_shift(4),a=ed(e),o=eg(e,0,n),s=Qu(e);e.l=r;var c={Name:a,Ptg:o};return i<268435455&&(c.Sheet=i),s&&(c.Comment=s),c}function ev(e,t){J(e,143);for(var n=0;n!=t.SheetNames.length;++n)J(e,156,X_({Hidden:t.Workbook&&t.Workbook.Sheets&&t.Workbook.Sheets[n]&&t.Workbook.Sheets[n].Hidden||0,iTabID:n+1,strRelID:`rId`+(n+1),name:t.SheetNames[n]}));J(e,144)}function tv(e,t){t||=q(127);for(var n=0;n!=4;++n)t.write_shift(4,0);return Bu(`SheetJS`,t),Bu(Yo.version,t),Bu(Yo.version,t),Bu(`7262`,t),t.length>t.l?t.slice(0,t.l):t}function nv(e,t){return t||=q(29),t.write_shift(-4,0),t.write_shift(-4,460),t.write_shift(4,28800),t.write_shift(4,17600),t.write_shift(4,500),t.write_shift(4,e),t.write_shift(4,e),t.write_shift(1,120),t.length>t.l?t.slice(0,t.l):t}function rv(e,t){if(!(!t.Workbook||!t.Workbook.Sheets)){for(var n=t.Workbook.Sheets,r=0,i=-1,a=-1;r<n.length;++r)!n[r]||!n[r].Hidden&&i==-1?i=r:n[r].Hidden==1&&a==-1&&(a=r);a>i||(J(e,135),J(e,158,nv(i)),J(e,136))}}function iv(e,t){var n=pu();return J(n,131),J(n,128,tv()),J(n,153,Q_(e.Workbook&&e.Workbook.WBProps||null)),rv(n,e,t),ev(n,e,t),J(n,132),n.end()}function av(e,t,n){return(t.slice(-4)===`.bin`?iv:J_)(e,n)}function ov(e,t,n,r,i){return(t.slice(-4)===`.bin`?B_:wg)(e,n,r,i)}function sv(e,t,n){return(t.slice(-4)===`.bin`?Gp:bp)(e,n)}function cv(e,t,n){return(t.slice(-4)===`.bin`?ap:tp)(e,n)}function lv(e,t,n){return(t.slice(-4)===`.bin`?fm:am)(e,n)}function uv(e){return(e.slice(-4)===`.bin`?em:tm)()}function dv(e,t){var n=[];return e.Props&&n.push(Yd(e.Props,t)),e.Custprops&&n.push(Xd(e.Props,e.Custprops,t)),n.join(``)}function fv(){return``}function pv(e,t){var n=[`<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>`];return t.cellXfs.forEach(function(e,t){var r=[];r.push(U(`NumberFormat`,null,{"ss:Format":H(Is[e.numFmtId])}));var i={"ss:ID":`s`+(21+t)};n.push(U(`Style`,r.join(``),i))}),U(`Styles`,n.join(``))}function mv(e){return U(`NamedRange`,null,{"ss:Name":e.Name,"ss:RefersTo":`=`+_m(e.Ref,{r:0,c:0})})}function hv(e){if(!((e||{}).Workbook||{}).Names)return``;for(var t=e.Workbook.Names,n=[],r=0;r<t.length;++r){var i=t[r];i.Sheet??(i.Name.match(/^_xlfn\./)||n.push(mv(i)))}return U(`Names`,n.join(``))}function gv(e,t,n,r){if(!e||!((r||{}).Workbook||{}).Names)return``;for(var i=r.Workbook.Names,a=[],o=0;o<i.length;++o){var s=i[o];s.Sheet==n&&(s.Name.match(/^_xlfn\./)||a.push(mv(s)))}return a.join(``)}function _v(e,t,n,r){if(!e)return``;var i=[];if(e[`!margins`]&&(i.push(`<PageSetup>`),e[`!margins`].header&&i.push(U(`Header`,null,{"x:Margin":e[`!margins`].header})),e[`!margins`].footer&&i.push(U(`Footer`,null,{"x:Margin":e[`!margins`].footer})),i.push(U(`PageMargins`,null,{"x:Bottom":e[`!margins`].bottom||`0.75`,"x:Left":e[`!margins`].left||`0.7`,"x:Right":e[`!margins`].right||`0.7`,"x:Top":e[`!margins`].top||`0.75`})),i.push(`</PageSetup>`)),r&&r.Workbook&&r.Workbook.Sheets&&r.Workbook.Sheets[n])if(r.Workbook.Sheets[n].Hidden)i.push(U(`Visible`,r.Workbook.Sheets[n].Hidden==1?`SheetHidden`:`SheetVeryHidden`,{}));else{for(var a=0;a<n&&!(r.Workbook.Sheets[a]&&!r.Workbook.Sheets[a].Hidden);++a);a==n&&i.push(`<Selected/>`)}return((((r||{}).Workbook||{}).Views||[])[0]||{}).RTL&&i.push(`<DisplayRightToLeft/>`),e[`!protect`]&&(i.push(Tl(`ProtectContents`,`True`)),e[`!protect`].objects&&i.push(Tl(`ProtectObjects`,`True`)),e[`!protect`].scenarios&&i.push(Tl(`ProtectScenarios`,`True`)),e[`!protect`].selectLockedCells!=null&&!e[`!protect`].selectLockedCells?i.push(Tl(`EnableSelection`,`NoSelection`)):e[`!protect`].selectUnlockedCells!=null&&!e[`!protect`].selectUnlockedCells&&i.push(Tl(`EnableSelection`,`UnlockedCells`)),[[`formatCells`,`AllowFormatCells`],[`formatColumns`,`AllowSizeCols`],[`formatRows`,`AllowSizeRows`],[`insertColumns`,`AllowInsertCols`],[`insertRows`,`AllowInsertRows`],[`insertHyperlinks`,`AllowInsertHyperlinks`],[`deleteColumns`,`AllowDeleteCols`],[`deleteRows`,`AllowDeleteRows`],[`sort`,`AllowSort`],[`autoFilter`,`AllowFilter`],[`pivotTables`,`AllowUsePivotTables`]].forEach(function(t){e[`!protect`][t[0]]&&i.push(`<`+t[1]+`/>`)})),i.length==0?``:U(`WorksheetOptions`,i.join(``),{xmlns:jl.x})}function vv(e){return e.map(function(e){return U(`Comment`,U(`ss:Data`,hl(e.t||``),{xmlns:`http://www.w3.org/TR/REC-html40`}),{"ss:Author":e.a})}).join(``)}function yv(e,t,n,r,i,a,o){if(!e||e.v==null&&e.f==null)return``;var s={};if(e.f&&(s[`ss:Formula`]=`=`+H(_m(e.f,o))),e.F&&e.F.slice(0,t.length)==t){var c=Du(e.F.slice(t.length+1));s[`ss:ArrayRange`]=`RC:R`+(c.r==o.r?``:`[`+(c.r-o.r)+`]`)+`C`+(c.c==o.c?``:`[`+(c.c-o.c)+`]`)}if(e.l&&e.l.Target&&(s[`ss:HRef`]=H(e.l.Target),e.l.Tooltip&&(s[`x:HRefScreenTip`]=H(e.l.Tooltip))),n[`!merges`])for(var l=n[`!merges`],u=0;u!=l.length;++u)l[u].s.c!=o.c||l[u].s.r!=o.r||(l[u].e.c>l[u].s.c&&(s[`ss:MergeAcross`]=l[u].e.c-l[u].s.c),l[u].e.r>l[u].s.r&&(s[`ss:MergeDown`]=l[u].e.r-l[u].s.r));var d=``,f=``;switch(e.t){case`z`:if(!r.sheetStubs)return``;break;case`n`:d=`Number`,f=String(e.v);break;case`b`:d=`Boolean`,f=e.v?`1`:`0`;break;case`e`:d=`Error`,f=Od[e.v];break;case`d`:d=`DateTime`,f=new Date(e.v).toISOString(),e.z??=e.z||Is[14];break;case`s`:d=`String`,f=ml(e.v||``);break}s[`ss:StyleID`]=`s`+(21+dg(r.cellXfs,e,r)),s[`ss:Index`]=o.c+1;var p=e.v==null?``:f,m=e.t==`z`?``:`<Data ss:Type="`+d+`">`+p+`</Data>`;return(e.c||[]).length>0&&(m+=vv(e.c)),U(`Cell`,m,s)}function bv(e,t){var n=`<Row ss:Index="`+(e+1)+`"`;return t&&(t.hpt&&!t.hpx&&(t.hpx=_p(t.hpt)),t.hpx&&(n+=` ss:AutoFitHeight="0" ss:Height="`+t.hpx+`"`),t.hidden&&(n+=` ss:Hidden="1"`)),n+`>`}function xv(e,t,n,r){if(!e[`!ref`])return``;var i=ju(e[`!ref`]),a=e[`!merges`]||[],o=0,s=[];e[`!cols`]&&e[`!cols`].forEach(function(e,t){mp(e);var n=!!e.width,r=lg(t,e),i={"ss:Index":t+1};n&&(i[`ss:Width`]=dp(r.width)),e.hidden&&(i[`ss:Hidden`]=`1`),s.push(U(`Column`,null,i))});for(var c=Array.isArray(e),l=i.s.r;l<=i.e.r;++l){for(var u=[bv(l,(e[`!rows`]||[])[l])],d=i.s.c;d<=i.e.c;++d){var f=!1;for(o=0;o!=a.length;++o)if(!(a[o].s.c>d)&&!(a[o].s.r>l)&&!(a[o].e.c<d)&&!(a[o].e.r<l)){(a[o].s.c!=d||a[o].s.r!=l)&&(f=!0);break}if(!f){var p={r:l,c:d},m=Ou(p),h=c?(e[l]||[])[d]:e[m];u.push(yv(h,m,e,t,n,r,p))}}u.push(`</Row>`),u.length>2&&s.push(u.join(``))}return s.join(``)}function Sv(e,t,n){var r=[],i=n.SheetNames[e],a=n.Sheets[i],o=a?gv(a,t,e,n):``;return o.length>0&&r.push(`<Names>`+o+`</Names>`),o=a?xv(a,t,e,n):``,o.length>0&&r.push(`<Table>`+o+`</Table>`),r.push(_v(a,t,e,n)),r.join(``)}function Cv(e,t){t||={},e.SSF||=nl(Is),e.SSF&&(jc(),Ac(e.SSF),t.revssf=Uc(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF,t.cellXfs=[],dg(t.cellXfs,{},{revssf:{General:0}}));var n=[];n.push(dv(e,t)),n.push(fv(e,t)),n.push(``),n.push(``);for(var r=0;r<e.SheetNames.length;++r)n.push(U(`Worksheet`,Sv(r,t,e),{"ss:Name":H(e.SheetNames[r])}));return n[2]=pv(e,t),n[3]=hv(e,t),V+U(`Workbook`,n.join(``),{xmlns:jl.ss,"xmlns:o":jl.o,"xmlns:x":jl.x,"xmlns:ss":jl.ss,"xmlns:dt":jl.dt,"xmlns:html":jl.html})}var wv={SI:`e0859ff2f94f6810ab9108002b27b3d9`,DSI:`02d5cdd59c2e1b10939708002b2cf9ae`,UDI:`05d5cdd59c2e1b10939708002b2cf9ae`};function Tv(e,t){var n=[],r=[],i=[],a=0,o,s=Vc(wd,`n`),c=Vc(Td,`n`);if(e.Props)for(o=Bc(e.Props),a=0;a<o.length;++a)(Object.prototype.hasOwnProperty.call(s,o[a])?n:Object.prototype.hasOwnProperty.call(c,o[a])?r:i).push([o[a],e.Props[o[a]]]);if(e.Custprops)for(o=Bc(e.Custprops),a=0;a<o.length;++a)Object.prototype.hasOwnProperty.call(e.Props||{},o[a])||(Object.prototype.hasOwnProperty.call(s,o[a])?n:Object.prototype.hasOwnProperty.call(c,o[a])?r:i).push([o[a],e.Custprops[o[a]]]);var l=[];for(a=0;a<i.length;++a)$d.indexOf(i[a][0])>-1||Gd.indexOf(i[a][0])>-1||i[a][1]!=null&&l.push(i[a]);r.length&&Ic.utils.cfb_add(t,`/SummaryInformation`,nf(r,wv.SI,c,Td)),(n.length||l.length)&&Ic.utils.cfb_add(t,`/DocumentSummaryInformation`,nf(n,wv.DSI,s,wd,l.length?l:null,wv.UDI))}function Ev(e,t){var n=t||{},r=Ic.utils.cfb_new({root:`R`}),i=`/Workbook`;switch(n.bookType||`xls`){case`xls`:n.bookType=`biff8`;case`xla`:n.bookType||=`xla`;case`biff8`:i=`/Workbook`,n.biff=8;break;case`biff5`:i=`/Book`,n.biff=5;break;default:throw Error(`invalid type `+n.bookType+` for XLS CFB`)}return Ic.utils.cfb_add(r,i,Gv(e,n)),n.biff==8&&(e.Props||e.Custprops)&&Tv(e,r),n.biff==8&&e.vbaraw&&pm(r,Ic.read(e.vbaraw,{type:typeof e.vbaraw==`string`?`binary`:`buffer`})),r}var Dv={0:{f:Tg},1:{f:Ng},2:{f:$g},3:{f:Vg},4:{f:Lg},5:{f:Yg},6:{f:i_},7:{f:Gg},8:{f:d_},9:{f:u_},10:{f:c_},11:{f:l_},12:{f:Fg},13:{f:t_},14:{f:Ug},15:{f:zg},16:{f:Zg},17:{f:o_},18:{f:qg},19:{f:Uu},20:{},21:{},22:{},23:{},24:{},25:{},26:{},27:{},28:{},29:{},30:{},31:{},32:{},33:{},34:{},35:{T:1},36:{T:-1},37:{T:1},38:{T:-1},39:{f:$_},40:{},42:{},43:{f:Cp},44:{f:xp},45:{f:Dp},46:{f:Mp},47:{f:kp},48:{},49:{f:Lu},50:{},51:{f:Yp},52:{T:1},53:{T:-1},54:{T:1},55:{T:-1},56:{T:1},57:{T:-1},58:{},59:{},60:{f:Uf},62:{f:r_},63:{f:nm},64:{f:O_},65:{},66:{},67:{},68:{},69:{},70:{},128:{},129:{T:1},130:{T:-1},131:{T:1,f:fu,p:0},132:{T:-1},133:{T:1},134:{T:-1},135:{T:1},136:{T:-1},137:{T:1,f:w_},138:{T:-1},139:{T:1},140:{T:-1},141:{T:1},142:{T:-1},143:{T:1},144:{T:-1},145:{T:1},146:{T:-1},147:{f:jg},148:{f:Og,p:16},151:{f:__},152:{},153:{f:Z_},154:{},155:{},156:{f:Y_},157:{},158:{},159:{T:1,f:np},160:{T:-1},161:{T:1,f:sd},162:{T:-1},163:{T:1},164:{T:-1},165:{T:1},166:{T:-1},167:{},168:{},169:{},170:{},171:{},172:{T:1},173:{T:-1},174:{},175:{},176:{f:f_},177:{T:1},178:{T:-1},179:{T:1},180:{T:-1},181:{T:1},182:{T:-1},183:{T:1},184:{T:-1},185:{T:1},186:{T:-1},187:{T:1},188:{T:-1},189:{T:1},190:{T:-1},191:{T:1},192:{T:-1},193:{T:1},194:{T:-1},195:{T:1},196:{T:-1},197:{T:1},198:{T:-1},199:{T:1},200:{T:-1},201:{T:1},202:{T:-1},203:{T:1},204:{T:-1},205:{T:1},206:{T:-1},207:{T:1},208:{T:-1},209:{T:1},210:{T:-1},211:{T:1},212:{T:-1},213:{T:1},214:{T:-1},215:{T:1},216:{T:-1},217:{T:1},218:{T:-1},219:{T:1},220:{T:-1},221:{T:1},222:{T:-1},223:{T:1},224:{T:-1},225:{T:1},226:{T:-1},227:{T:1},228:{T:-1},229:{T:1},230:{T:-1},231:{T:1},232:{T:-1},233:{T:1},234:{T:-1},235:{T:1},236:{T:-1},237:{T:1},238:{T:-1},239:{T:1},240:{T:-1},241:{T:1},242:{T:-1},243:{T:1},244:{T:-1},245:{T:1},246:{T:-1},247:{T:1},248:{T:-1},249:{T:1},250:{T:-1},251:{T:1},252:{T:-1},253:{T:1},254:{T:-1},255:{T:1},256:{T:-1},257:{T:1},258:{T:-1},259:{T:1},260:{T:-1},261:{T:1},262:{T:-1},263:{T:1},264:{T:-1},265:{T:1},266:{T:-1},267:{T:1},268:{T:-1},269:{T:1},270:{T:-1},271:{T:1},272:{T:-1},273:{T:1},274:{T:-1},275:{T:1},276:{T:-1},277:{},278:{T:1},279:{T:-1},280:{T:1},281:{T:-1},282:{T:1},283:{T:1},284:{T:-1},285:{T:1},286:{T:-1},287:{T:1},288:{T:-1},289:{T:1},290:{T:-1},291:{T:1},292:{T:-1},293:{T:1},294:{T:-1},295:{T:1},296:{T:-1},297:{T:1},298:{T:-1},299:{T:1},300:{T:-1},301:{T:1},302:{T:-1},303:{T:1},304:{T:-1},305:{T:1},306:{T:-1},307:{T:1},308:{T:-1},309:{T:1},310:{T:-1},311:{T:1},312:{T:-1},313:{T:-1},314:{T:1},315:{T:-1},316:{T:1},317:{T:-1},318:{T:1},319:{T:-1},320:{T:1},321:{T:-1},322:{T:1},323:{T:-1},324:{T:1},325:{T:-1},326:{T:1},327:{T:-1},328:{T:1},329:{T:-1},330:{T:1},331:{T:-1},332:{T:1},333:{T:-1},334:{T:1},335:{f:qp},336:{T:-1},337:{f:Qp,T:1},338:{T:-1},339:{T:1},340:{T:-1},341:{T:1},342:{T:-1},343:{T:1},344:{T:-1},345:{T:1},346:{T:-1},347:{T:1},348:{T:-1},349:{T:1},350:{T:-1},351:{},352:{},353:{T:1},354:{T:-1},355:{f:td},357:{},358:{},359:{},360:{T:1},361:{},362:{f:Lf},363:{},364:{},366:{},367:{},368:{},369:{},370:{},371:{},372:{T:1},373:{T:-1},374:{T:1},375:{T:-1},376:{T:1},377:{T:-1},378:{T:1},379:{T:-1},380:{T:1},381:{T:-1},382:{T:1},383:{T:-1},384:{T:1},385:{T:-1},386:{T:1},387:{T:-1},388:{T:1},389:{T:-1},390:{T:1},391:{T:-1},392:{T:1},393:{T:-1},394:{T:1},395:{T:-1},396:{},397:{},398:{},399:{},400:{},401:{T:1},403:{},404:{},405:{},406:{},407:{},408:{},409:{},410:{},411:{},412:{},413:{},414:{},415:{},416:{},417:{},418:{},419:{},420:{},421:{},422:{T:1},423:{T:1},424:{T:-1},425:{T:-1},426:{f:v_},427:{f:y_},428:{},429:{T:1},430:{T:-1},431:{T:1},432:{T:-1},433:{T:1},434:{T:-1},435:{T:1},436:{T:-1},437:{T:1},438:{T:-1},439:{T:1},440:{T:-1},441:{T:1},442:{T:-1},443:{T:1},444:{T:-1},445:{T:1},446:{T:-1},447:{T:1},448:{T:-1},449:{T:1},450:{T:-1},451:{T:1},452:{T:-1},453:{T:1},454:{T:-1},455:{T:1},456:{T:-1},457:{T:1},458:{T:-1},459:{T:1},460:{T:-1},461:{T:1},462:{T:-1},463:{T:1},464:{T:-1},465:{T:1},466:{T:-1},467:{T:1},468:{T:-1},469:{T:1},470:{T:-1},471:{},472:{},473:{T:1},474:{T:-1},475:{},476:{f:S_},477:{},478:{},479:{T:1},480:{T:-1},481:{T:1},482:{T:-1},483:{T:1},484:{T:-1},485:{f:Ag},486:{T:1},487:{T:-1},488:{T:1},489:{T:-1},490:{T:1},491:{T:-1},492:{T:1},493:{T:-1},494:{f:h_},495:{T:1},496:{T:-1},497:{T:1},498:{T:-1},499:{},500:{T:1},501:{T:-1},502:{T:1},503:{T:-1},504:{},505:{T:1},506:{T:-1},507:{},508:{T:1},509:{T:-1},510:{T:1},511:{T:-1},512:{},513:{},514:{T:1},515:{T:-1},516:{T:1},517:{T:-1},518:{T:1},519:{T:-1},520:{T:1},521:{T:-1},522:{},523:{},524:{},525:{},526:{},527:{},528:{T:1},529:{T:-1},530:{T:1},531:{T:-1},532:{T:1},533:{T:-1},534:{},535:{},536:{},537:{},538:{T:1},539:{T:-1},540:{T:1},541:{T:-1},542:{T:1},548:{},549:{},550:{f:td},551:{},552:{},553:{},554:{T:1},555:{T:-1},556:{T:1},557:{T:-1},558:{T:1},559:{T:-1},560:{T:1},561:{T:-1},562:{},564:{},565:{T:1},566:{T:-1},569:{T:1},570:{T:-1},572:{},573:{T:1},574:{T:-1},577:{},578:{},579:{},580:{},581:{},582:{},583:{},584:{},585:{},586:{},587:{},588:{T:-1},589:{},590:{T:1},591:{T:-1},592:{T:1},593:{T:-1},594:{T:1},595:{T:-1},596:{},597:{T:1},598:{T:-1},599:{T:1},600:{T:-1},601:{T:1},602:{T:-1},603:{T:1},604:{T:-1},605:{T:1},606:{T:-1},607:{},608:{T:1},609:{T:-1},610:{},611:{T:1},612:{T:-1},613:{T:1},614:{T:-1},615:{T:1},616:{T:-1},617:{T:1},618:{T:-1},619:{T:1},620:{T:-1},625:{},626:{T:1},627:{T:-1},628:{T:1},629:{T:-1},630:{T:1},631:{T:-1},632:{f:um},633:{T:1},634:{T:-1},635:{T:1,f:cm},636:{T:-1},637:{f:Gu},638:{T:1},639:{},640:{T:-1},641:{T:1},642:{T:-1},643:{T:1},644:{},645:{T:-1},646:{T:1},648:{T:1},649:{},650:{T:-1},651:{f:V_},652:{},653:{T:1},654:{T:-1},655:{T:1},656:{T:-1},657:{T:1},658:{T:-1},659:{},660:{T:1},661:{},662:{T:-1},663:{},664:{T:1},665:{},666:{T:-1},667:{},668:{},669:{},671:{T:1},672:{T:-1},673:{T:1},674:{T:-1},675:{},676:{},677:{},678:{},679:{},680:{},681:{},1024:{},1025:{},1026:{T:1},1027:{T:-1},1028:{T:1},1029:{T:-1},1030:{},1031:{T:1},1032:{T:-1},1033:{T:1},1034:{T:-1},1035:{},1036:{},1037:{},1038:{T:1},1039:{T:-1},1040:{},1041:{T:1},1042:{T:-1},1043:{},1044:{},1045:{},1046:{T:1},1047:{T:-1},1048:{T:1},1049:{T:-1},1050:{},1051:{T:1},1052:{T:1},1053:{f:k_},1054:{T:1},1055:{},1056:{T:1},1057:{T:-1},1058:{T:1},1059:{T:-1},1061:{},1062:{T:1},1063:{T:-1},1064:{T:1},1065:{T:-1},1066:{T:1},1067:{T:-1},1068:{T:1},1069:{T:-1},1070:{T:1},1071:{T:-1},1072:{T:1},1073:{T:-1},1075:{T:1},1076:{T:-1},1077:{T:1},1078:{T:-1},1079:{T:1},1080:{T:-1},1081:{T:1},1082:{T:-1},1083:{T:1},1084:{T:-1},1085:{},1086:{T:1},1087:{T:-1},1088:{T:1},1089:{T:-1},1090:{T:1},1091:{T:-1},1092:{T:1},1093:{T:-1},1094:{T:1},1095:{T:-1},1096:{},1097:{T:1},1098:{},1099:{T:-1},1100:{T:1},1101:{T:-1},1102:{},1103:{},1104:{},1105:{},1111:{},1112:{},1113:{T:1},1114:{T:-1},1115:{T:1},1116:{T:-1},1117:{},1118:{T:1},1119:{T:-1},1120:{T:1},1121:{T:-1},1122:{T:1},1123:{T:-1},1124:{T:1},1125:{T:-1},1126:{},1128:{T:1},1129:{T:-1},1130:{},1131:{T:1},1132:{T:-1},1133:{T:1},1134:{T:-1},1135:{T:1},1136:{T:-1},1137:{T:1},1138:{T:-1},1139:{T:1},1140:{T:-1},1141:{},1142:{T:1},1143:{T:-1},1144:{T:1},1145:{T:-1},1146:{},1147:{T:1},1148:{T:-1},1149:{T:1},1150:{T:-1},1152:{T:1},1153:{T:-1},1154:{T:-1},1155:{T:-1},1156:{T:-1},1157:{T:1},1158:{T:-1},1159:{T:1},1160:{T:-1},1161:{T:1},1162:{T:-1},1163:{T:1},1164:{T:-1},1165:{T:1},1166:{T:-1},1167:{T:1},1168:{T:-1},1169:{T:1},1170:{T:-1},1171:{},1172:{T:1},1173:{T:-1},1177:{},1178:{T:1},1180:{},1181:{},1182:{},2048:{T:1},2049:{T:-1},2050:{},2051:{T:1},2052:{T:-1},2053:{},2054:{},2055:{T:1},2056:{T:-1},2057:{T:1},2058:{T:-1},2060:{},2067:{},2068:{T:1},2069:{T:-1},2070:{},2071:{},2072:{T:1},2073:{T:-1},2075:{},2076:{},2077:{T:1},2078:{T:-1},2079:{},2080:{T:1},2081:{T:-1},2082:{},2083:{T:1},2084:{T:-1},2085:{T:1},2086:{T:-1},2087:{T:1},2088:{T:-1},2089:{T:1},2090:{T:-1},2091:{},2092:{},2093:{T:1},2094:{T:-1},2095:{},2096:{T:1},2097:{T:-1},2098:{T:1},2099:{T:-1},2100:{T:1},2101:{T:-1},2102:{},2103:{T:1},2104:{T:-1},2105:{},2106:{T:1},2107:{T:-1},2108:{},2109:{T:1},2110:{T:-1},2111:{T:1},2112:{T:-1},2113:{T:1},2114:{T:-1},2115:{},2116:{},2117:{},2118:{T:1},2119:{T:-1},2120:{},2121:{T:1},2122:{T:-1},2123:{T:1},2124:{T:-1},2125:{},2126:{T:1},2127:{T:-1},2128:{},2129:{T:1},2130:{T:-1},2131:{T:1},2132:{T:-1},2133:{T:1},2134:{},2135:{},2136:{},2137:{T:1},2138:{T:-1},2139:{T:1},2140:{T:-1},2141:{},3072:{},3073:{},4096:{T:1},4097:{T:-1},5002:{T:1},5003:{T:-1},5081:{T:1},5082:{T:-1},5083:{},5084:{T:1},5085:{T:-1},5086:{T:1},5087:{T:-1},5088:{},5089:{},5090:{},5092:{T:1},5093:{T:-1},5094:{},5095:{T:1},5096:{T:-1},5097:{},5099:{},65535:{n:``}};function Q(e,t,n,r){var i=t;if(!isNaN(i)){var a=r||(n||[]).length||0,o=e.next(4);o.write_shift(2,i),o.write_shift(2,a),a>0&&Zl(n)&&e.push(n)}}function Ov(e,t,n,r){var i=r||(n||[]).length||0;if(i<=8224)return Q(e,t,n,i);var a=t;if(!isNaN(a)){for(var o=n.parts||[],s=0,c=0,l=0;l+(o[s]||8224)<=8224;)l+=o[s]||8224,s++;var u=e.next(4);for(u.write_shift(2,a),u.write_shift(2,l),e.push(n.slice(c,c+l)),c+=l;c<i;){for(u=e.next(4),u.write_shift(2,60),l=0;l+(o[s]||8224)<=8224;)l+=o[s]||8224,s++;u.write_shift(2,l),e.push(n.slice(c,c+l)),c+=l}}}function kv(e,t,n){return e||=q(7),e.write_shift(2,t),e.write_shift(2,n),e.write_shift(2,0),e.write_shift(1,0),e}function Av(e,t,n,r){var i=q(9);return kv(i,e,t),lf(n,r||`b`,i),i}function jv(e,t,n){var r=q(8+2*n.length);return kv(r,e,t),r.write_shift(1,n.length),r.write_shift(n.length,n,`sbcs`),r.l<r.length?r.slice(0,r.l):r}function Mv(e,t,n,r){if(t.v!=null)switch(t.t){case`d`:case`n`:var i=t.t==`d`?Kc(el(t.v)):t.v;i==(i|0)&&i>=0&&i<65536?Q(e,2,qf(n,r,i)):Q(e,3,Kf(n,r,i));return;case`b`:case`e`:Q(e,5,Av(n,r,t.v,t.t));return;case`s`:case`str`:Q(e,4,jv(n,r,(t.v||``).slice(0,255)));return}Q(e,1,kv(null,n,r))}function Nv(e,t,n,r){var i=Array.isArray(t),a=ju(t[`!ref`]||`A1`),o,s=``,c=[];if(a.e.c>255||a.e.r>16383){if(r.WTF)throw Error(`Range `+(t[`!ref`]||`A1`)+` exceeds format limit A1:IV16384`);a.e.c=Math.min(a.e.c,255),a.e.r=Math.min(a.e.c,16383),o=Au(a)}for(var l=a.s.r;l<=a.e.r;++l){s=yu(l);for(var u=a.s.c;u<=a.e.c;++u){l===a.s.r&&(c[u]=Cu(u)),o=c[u]+s;var d=i?(t[l]||[])[u]:t[o];d&&Mv(e,d,l,u,r)}}}function Pv(e,t){var n=t||{};cs!=null&&n.dense==null&&(n.dense=cs);for(var r=pu(),i=0,a=0;a<e.SheetNames.length;++a)e.SheetNames[a]==n.sheet&&(i=a);if(i==0&&n.sheet&&e.SheetNames[0]!=n.sheet)throw Error(`Sheet not found: `+n.sheet);return Q(r,n.biff==4?1033:n.biff==3?521:9,Sf(e,16,n)),Nv(r,e.Sheets[e.SheetNames[i]],i,n,e),Q(r,10),r.end()}function Fv(e,t,n){Q(e,49,Of({sz:12,color:{theme:1},name:`Arial`,family:2,scheme:`minor`},n))}function Iv(e,t,n){t&&[[5,8],[23,26],[41,44],[50,392]].forEach(function(r){for(var i=r[0];i<=r[1];++i)t[i]!=null&&Q(e,1054,jf(i,t[i],n))})}function Lv(e,t){var n=q(19);n.write_shift(4,2151),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(2,3),n.write_shift(1,1),n.write_shift(4,0),Q(e,2151,n),n=q(39),n.write_shift(4,2152),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(2,3),n.write_shift(1,0),n.write_shift(4,0),n.write_shift(2,1),n.write_shift(4,4),n.write_shift(2,0),xf(ju(t[`!ref`]||`A1`),n),n.write_shift(4,4),Q(e,2152,n)}function Rv(e,t){for(var n=0;n<16;++n)Q(e,224,Nf({numFmtId:0,style:!0},0,t));t.cellXfs.forEach(function(n){Q(e,224,Nf(n,0,t))})}function zv(e,t){for(var n=0;n<t[`!links`].length;++n){var r=t[`!links`][n];Q(e,440,Bf(r)),r[1].Tooltip&&Q(e,2048,Vf(r))}delete t[`!links`]}function Bv(e,t){if(t){var n=0;t.forEach(function(t,r){++n<=256&&t&&Q(e,125,Wf(lg(r,t),r))})}}function Vv(e,t,n,r,i){var a=16+dg(i.cellXfs,t,i);if(t.v==null&&!t.bf){Q(e,513,vf(n,r,a));return}if(t.bf)Q(e,6,Xh(t,n,r,i,a));else switch(t.t){case`d`:case`n`:Q(e,515,If(n,r,t.t==`d`?Kc(el(t.v)):t.v,a,i));break;case`b`:case`e`:Q(e,517,Ff(n,r,t.v,a,i,t.t));break;case`s`:case`str`:i.bookSST?Q(e,253,kf(n,r,cg(i.Strings,t.v,i.revStrings),a,i)):Q(e,516,Af(n,r,(t.v||``).slice(0,255),a,i));break;default:Q(e,513,vf(n,r,a))}}function Hv(e,t,n){var r=pu(),i=n.SheetNames[e],a=n.Sheets[i]||{},o=(n||{}).Workbook||{},s=(o.Sheets||[])[e]||{},c=Array.isArray(a),l=t.biff==8,u,d=``,f=[],p=ju(a[`!ref`]||`A1`),m=l?65536:16384;if(p.e.c>255||p.e.r>=m){if(t.WTF)throw Error(`Range `+(a[`!ref`]||`A1`)+` exceeds format limit A1:IV16384`);p.e.c=Math.min(p.e.c,255),p.e.r=Math.min(p.e.c,m-1)}Q(r,2057,Sf(n,16,t)),Q(r,13,cf(1)),Q(r,12,cf(100)),Q(r,15,of(!0)),Q(r,17,of(!1)),Q(r,16,ud(.001)),Q(r,95,of(!0)),Q(r,42,of(!1)),Q(r,43,of(!1)),Q(r,130,cf(1)),Q(r,128,Pf([0,0])),Q(r,131,of(!1)),Q(r,132,of(!1)),l&&Bv(r,a[`!cols`]),Q(r,512,Mf(p,t)),l&&(a[`!links`]=[]);for(var h=p.s.r;h<=p.e.r;++h){d=yu(h);for(var g=p.s.c;g<=p.e.c;++g){h===p.s.r&&(f[g]=Cu(g)),u=f[g]+d;var _=c?(a[h]||[])[g]:a[u];_&&(Vv(r,_,h,g,t),l&&_.l&&a[`!links`].push([u,_.l]))}}var v=s.CodeName||s.name||i;return l&&Q(r,574,Df((o.Views||[])[0])),l&&(a[`!merges`]||[]).length&&Q(r,229,zf(a[`!merges`])),l&&zv(r,a),Q(r,442,hf(v,t)),l&&Lv(r,a),Q(r,10),r.end()}function Uv(e,t,n){var r=pu(),i=(e||{}).Workbook||{},a=i.Sheets||[],o=i.WBProps||{},s=n.biff==8,c=n.biff==5;Q(r,2057,Sf(e,5,n)),n.bookType==`xla`&&Q(r,135),Q(r,225,s?cf(1200):null),Q(r,193,rf(2)),c&&Q(r,191),c&&Q(r,192),Q(r,226),Q(r,92,Cf(`SheetJS`,n)),Q(r,66,cf(s?1200:1252)),s&&Q(r,353,cf(0)),s&&Q(r,448),Q(r,317,Gf(e.SheetNames.length)),s&&e.vbaraw&&Q(r,211),s&&e.vbaraw&&Q(r,442,hf(o.CodeName||`ThisWorkbook`,n)),Q(r,156,cf(17)),Q(r,25,of(!1)),Q(r,18,of(!1)),Q(r,19,cf(0)),s&&Q(r,431,of(!1)),s&&Q(r,444,cf(0)),Q(r,61,Ef(n)),Q(r,64,of(!1)),Q(r,141,cf(0)),Q(r,34,of(U_(e)==`true`)),Q(r,14,of(!0)),s&&Q(r,439,of(!1)),Q(r,218,cf(0)),Fv(r,e,n),Iv(r,e.SSF,n),Rv(r,n),s&&Q(r,352,of(!1));var l=r.end(),u=pu();s&&Q(u,140,Hf()),s&&n.Strings&&Ov(u,252,Tf(n.Strings,n)),Q(u,10);var d=u.end(),f=pu(),p=0,m=0;for(m=0;m<e.SheetNames.length;++m)p+=(s?12:11)+(s?2:1)*e.SheetNames[m].length;var h=l.length+p+d.length;for(m=0;m<e.SheetNames.length;++m){var g=a[m]||{};Q(f,133,wf({pos:h,hs:g.Hidden||0,dt:0,name:e.SheetNames[m]},n)),h+=t[m].length}var _=f.end();if(p!=_.length)throw Error(`BS8 `+p+` != `+_.length);var v=[];return l.length&&v.push(l),_.length&&v.push(_),d.length&&v.push(d),bs(v)}function Wv(e,t){var n=t||{},r=[];e&&!e.SSF&&(e.SSF=nl(Is)),e&&e.SSF&&(jc(),Ac(e.SSF),n.revssf=Uc(e.SSF),n.revssf[e.SSF[65535]]=0,n.ssf=e.SSF),n.Strings=[],n.Strings.Count=0,n.Strings.Unique=0,Ey(n),n.cellXfs=[],dg(n.cellXfs,{},{revssf:{General:0}}),e.Props||={};for(var i=0;i<e.SheetNames.length;++i)r[r.length]=Hv(i,n,e);return r.unshift(Uv(e,r,n)),bs(r)}function Gv(e,t){for(var n=0;n<=e.SheetNames.length;++n){var r=e.Sheets[e.SheetNames[n]];!r||!r[`!ref`]||ku(r[`!ref`]).e.c>255&&typeof console<`u`&&console.error&&console.error(`Worksheet '`+e.SheetNames[n]+`' extends beyond column IV (255).  Data may be lost.`)}var i=t||{};switch(i.biff||2){case 8:case 5:return Wv(e,t);case 4:case 3:case 2:return Pv(e,t)}throw Error(`invalid type `+i.bookType+` for BIFF`)}function Kv(e,t,n,r){for(var i=e[`!merges`]||[],a=[],o=t.s.c;o<=t.e.c;++o){for(var s=0,c=0,l=0;l<i.length;++l)if(!(i[l].s.r>n||i[l].s.c>o)&&!(i[l].e.r<n||i[l].e.c<o)){if(i[l].s.r<n||i[l].s.c<o){s=-1;break}s=i[l].e.r-i[l].s.r+1,c=i[l].e.c-i[l].s.c+1;break}if(!(s<0)){var u=Ou({r:n,c:o}),d=r.dense?(e[n]||[])[o]:e[u],f=d&&d.v!=null&&(d.h||pl(d.w||(Nu(d),d.w)||``))||``,p={};s>1&&(p.rowspan=s),c>1&&(p.colspan=c),r.editable?f=`<span contenteditable="true">`+f+`</span>`:d&&(p[`data-t`]=d&&d.t||`z`,d.v!=null&&(p[`data-v`]=d.v),d.z!=null&&(p[`data-z`]=d.z),d.l&&(d.l.Target||`#`).charAt(0)!=`#`&&(f=`<a href="`+d.l.Target+`">`+f+`</a>`)),p.id=(r.id||`sjs`)+`-`+u,a.push(U(`td`,f,p))}}return`<tr>`+a.join(``)+`</tr>`}var qv=`<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>`,Jv=`</body></html>`;function Yv(e,t,n){return[].join(``)+`<table`+(n&&n.id?` id="`+n.id+`"`:``)+`>`}function Xv(e,t){var n=t||{},r=n.header==null?qv:n.header,i=n.footer==null?Jv:n.footer,a=[r],o=ku(e[`!ref`]);n.dense=Array.isArray(e),a.push(Yv(e,o,n));for(var s=o.s.r;s<=o.e.r;++s)a.push(Kv(e,o,s,n));return a.push(`</table>`+i),a.join(``)}function Zv(e,t,n){var r=n||{};cs!=null&&(r.dense=cs);var i=0,a=0;if(r.origin!=null)if(typeof r.origin==`number`)i=r.origin;else{var o=typeof r.origin==`string`?Du(r.origin):r.origin;i=o.r,a=o.c}var s=t.getElementsByTagName(`tr`),c=Math.min(r.sheetRows||1e7,s.length),l={s:{r:0,c:0},e:{r:i,c:a}};if(e[`!ref`]){var u=ku(e[`!ref`]);l.s.r=Math.min(l.s.r,u.s.r),l.s.c=Math.min(l.s.c,u.s.c),l.e.r=Math.max(l.e.r,u.e.r),l.e.c=Math.max(l.e.c,u.e.c),i==-1&&(l.e.r=i=u.e.r+1)}var d=[],f=0,p=e[`!rows`]||=[],m=0,h=0,g=0,_=0,v=0,y=0;for(e[`!cols`]||=[];m<s.length&&h<c;++m){var b=s[m];if(ey(b)){if(r.display)continue;p[h]={hidden:!0}}var x=b.children;for(g=_=0;g<x.length;++g){var S=x[g];if(!(r.display&&ey(S))){var C=S.hasAttribute(`data-v`)?S.getAttribute(`data-v`):S.hasAttribute(`v`)?S.getAttribute(`v`):Cl(S.innerHTML),w=S.getAttribute(`data-z`)||S.getAttribute(`z`);for(f=0;f<d.length;++f){var T=d[f];T.s.c==_+a&&T.s.r<h+i&&h+i<=T.e.r&&(_=T.e.c+1-a,f=-1)}y=+S.getAttribute(`colspan`)||1,((v=+S.getAttribute(`rowspan`)||1)>1||y>1)&&d.push({s:{r:h+i,c:_+a},e:{r:h+i+(v||1)-1,c:_+a+(y||1)-1}});var E={t:`s`,v:C},D=S.getAttribute(`data-t`)||S.getAttribute(`t`)||``;C!=null&&(C.length==0?E.t=D||`z`:r.raw||C.trim().length==0||D==`s`||(C===`TRUE`?E={t:`b`,v:!0}:C===`FALSE`?E={t:`b`,v:!1}:isNaN(il(C))?isNaN(ol(C).getDate())||(E={t:`d`,v:el(C)},r.cellDates||(E={t:`n`,v:Kc(E.v)}),E.z=r.dateNF||Is[14]):E={t:`n`,v:il(C)})),E.z===void 0&&w!=null&&(E.z=w);var O=``,k=S.getElementsByTagName(`A`);if(k&&k.length)for(var ee=0;ee<k.length&&!(k[ee].hasAttribute(`href`)&&(O=k[ee].getAttribute(`href`),O.charAt(0)!=`#`));++ee);O&&O.charAt(0)!=`#`&&(E.l={Target:O}),r.dense?(e[h+i]||(e[h+i]=[]),e[h+i][_+a]=E):e[Ou({c:_+a,r:h+i})]=E,l.e.c<_+a&&(l.e.c=_+a),_+=y}}++h}return d.length&&(e[`!merges`]=(e[`!merges`]||[]).concat(d)),l.e.r=Math.max(l.e.r,h-1+i),e[`!ref`]=Au(l),h>=c&&(e[`!fullref`]=Au((l.e.r=s.length-m+h-1+i,l))),e}function Qv(e,t){return Zv((t||{}).dense?[]:{},e,t)}function $v(e,t){return Pu(Qv(e,t),t)}function ey(e){var t=``,n=ty(e);return n&&(t=n(e).getPropertyValue(`display`)),t||=e.style&&e.style.display,t===`none`}function ty(e){return e.ownerDocument.defaultView&&typeof e.ownerDocument.defaultView.getComputedStyle==`function`?e.ownerDocument.defaultView.getComputedStyle:typeof getComputedStyle==`function`?getComputedStyle:null}var ny=(function(){var e=[`<office:master-styles>`,`<style:master-page style:name="mp1" style:page-layout-name="mp1">`,`<style:header/>`,`<style:header-left style:display="false"/>`,`<style:footer/>`,`<style:footer-left style:display="false"/>`,`</style:master-page>`,`</office:master-styles>`].join(``),t=`<office:document-styles `+El({"xmlns:office":`urn:oasis:names:tc:opendocument:xmlns:office:1.0`,"xmlns:table":`urn:oasis:names:tc:opendocument:xmlns:table:1.0`,"xmlns:style":`urn:oasis:names:tc:opendocument:xmlns:style:1.0`,"xmlns:text":`urn:oasis:names:tc:opendocument:xmlns:text:1.0`,"xmlns:draw":`urn:oasis:names:tc:opendocument:xmlns:drawing:1.0`,"xmlns:fo":`urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,"xmlns:dc":`http://purl.org/dc/elements/1.1/`,"xmlns:number":`urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0`,"xmlns:svg":`urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0`,"xmlns:of":`urn:oasis:names:tc:opendocument:xmlns:of:1.2`,"office:version":`1.2`})+`>`+e+`</office:document-styles>`;return function(){return V+t}})(),ry=(function(){var e=function(e){return H(e).replace(/  +/g,function(e){return`<text:s text:c="`+e.length+`"/>`}).replace(/\t/g,`<text:tab/>`).replace(/\n/g,`</text:p><text:p>`).replace(/^ /,`<text:s/>`).replace(/ $/,`<text:s/>`)},t=`          <table:table-cell />
`,n=`          <table:covered-table-cell/>
`,r=function(r,i,a){var o=[];o.push(`      <table:table table:name="`+H(i.SheetNames[a])+`" table:style-name="ta1">
`);var s=0,c=0,l=ku(r[`!ref`]||`A1`),u=r[`!merges`]||[],d=0,f=Array.isArray(r);if(r[`!cols`])for(c=0;c<=l.e.c;++c)o.push(`        <table:table-column`+(r[`!cols`][c]?` table:style-name="co`+r[`!cols`][c].ods+`"`:``)+`></table:table-column>
`);var p=``,m=r[`!rows`]||[];for(s=0;s<l.s.r;++s)p=m[s]?` table:style-name="ro`+m[s].ods+`"`:``,o.push(`        <table:table-row`+p+`></table:table-row>
`);for(;s<=l.e.r;++s){for(p=m[s]?` table:style-name="ro`+m[s].ods+`"`:``,o.push(`        <table:table-row`+p+`>
`),c=0;c<l.s.c;++c)o.push(t);for(;c<=l.e.c;++c){var h=!1,g={},_=``;for(d=0;d!=u.length;++d)if(!(u[d].s.c>c)&&!(u[d].s.r>s)&&!(u[d].e.c<c)&&!(u[d].e.r<s)){(u[d].s.c!=c||u[d].s.r!=s)&&(h=!0),g[`table:number-columns-spanned`]=u[d].e.c-u[d].s.c+1,g[`table:number-rows-spanned`]=u[d].e.r-u[d].s.r+1;break}if(h){o.push(n);continue}var v=Ou({r:s,c}),y=f?(r[s]||[])[c]:r[v];if(y&&y.f&&(g[`table:formula`]=H(ag(y.f)),y.F&&y.F.slice(0,v.length)==v)){var b=ku(y.F);g[`table:number-matrix-columns-spanned`]=b.e.c-b.s.c+1,g[`table:number-matrix-rows-spanned`]=b.e.r-b.s.r+1}if(!y){o.push(t);continue}switch(y.t){case`b`:_=y.v?`TRUE`:`FALSE`,g[`office:value-type`]=`boolean`,g[`office:boolean-value`]=y.v?`true`:`false`;break;case`n`:_=y.w||String(y.v||0),g[`office:value-type`]=`float`,g[`office:value`]=y.v||0;break;case`s`:case`str`:_=y.v==null?``:y.v,g[`office:value-type`]=`string`;break;case`d`:_=y.w||el(y.v).toISOString(),g[`office:value-type`]=`date`,g[`office:date-value`]=el(y.v).toISOString(),g[`table:style-name`]=`ce1`;break;default:o.push(t);continue}var x=e(_);if(y.l&&y.l.Target){var S=y.l.Target;S=S.charAt(0)==`#`?`#`+og(S.slice(1)):S,S.charAt(0)!=`#`&&!S.match(/^\w+:/)&&(S=`../`+S),x=U(`text:a`,x,{"xlink:href":S.replace(/&/g,`&amp;`)})}o.push(`          `+U(`table:table-cell`,U(`text:p`,x,{}),g)+`
`)}o.push(`        </table:table-row>
`)}return o.push(`      </table:table>
`),o.join(``)},i=function(e,t){e.push(` <office:automatic-styles>
`),e.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`),e.push(`   <number:month number:style="long"/>
`),e.push(`   <number:text>/</number:text>
`),e.push(`   <number:day number:style="long"/>
`),e.push(`   <number:text>/</number:text>
`),e.push(`   <number:year/>
`),e.push(`  </number:date-style>
`);var n=0;t.SheetNames.map(function(e){return t.Sheets[e]}).forEach(function(t){if(t&&t[`!cols`]){for(var r=0;r<t[`!cols`].length;++r)if(t[`!cols`][r]){var i=t[`!cols`][r];if(i.width==null&&i.wpx==null&&i.wch==null)continue;mp(i),i.ods=n;var a=t[`!cols`][r].wpx+`px`;e.push(`  <style:style style:name="co`+n+`" style:family="table-column">
`),e.push(`   <style:table-column-properties fo:break-before="auto" style:column-width="`+a+`"/>
`),e.push(`  </style:style>
`),++n}}});var r=0;t.SheetNames.map(function(e){return t.Sheets[e]}).forEach(function(t){if(t&&t[`!rows`]){for(var n=0;n<t[`!rows`].length;++n)if(t[`!rows`][n]){t[`!rows`][n].ods=r;var i=t[`!rows`][n].hpx+`px`;e.push(`  <style:style style:name="ro`+r+`" style:family="table-row">
`),e.push(`   <style:table-row-properties fo:break-before="auto" style:row-height="`+i+`"/>
`),e.push(`  </style:style>
`),++r}}}),e.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`),e.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`),e.push(`  </style:style>
`),e.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`),e.push(` </office:automatic-styles>
`)};return function(e,t){var n=[V],a=El({"xmlns:office":`urn:oasis:names:tc:opendocument:xmlns:office:1.0`,"xmlns:table":`urn:oasis:names:tc:opendocument:xmlns:table:1.0`,"xmlns:style":`urn:oasis:names:tc:opendocument:xmlns:style:1.0`,"xmlns:text":`urn:oasis:names:tc:opendocument:xmlns:text:1.0`,"xmlns:draw":`urn:oasis:names:tc:opendocument:xmlns:drawing:1.0`,"xmlns:fo":`urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,"xmlns:dc":`http://purl.org/dc/elements/1.1/`,"xmlns:meta":`urn:oasis:names:tc:opendocument:xmlns:meta:1.0`,"xmlns:number":`urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0`,"xmlns:presentation":`urn:oasis:names:tc:opendocument:xmlns:presentation:1.0`,"xmlns:svg":`urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0`,"xmlns:chart":`urn:oasis:names:tc:opendocument:xmlns:chart:1.0`,"xmlns:dr3d":`urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0`,"xmlns:math":`http://www.w3.org/1998/Math/MathML`,"xmlns:form":`urn:oasis:names:tc:opendocument:xmlns:form:1.0`,"xmlns:script":`urn:oasis:names:tc:opendocument:xmlns:script:1.0`,"xmlns:ooo":`http://openoffice.org/2004/office`,"xmlns:ooow":`http://openoffice.org/2004/writer`,"xmlns:oooc":`http://openoffice.org/2004/calc`,"xmlns:dom":`http://www.w3.org/2001/xml-events`,"xmlns:xforms":`http://www.w3.org/2002/xforms`,"xmlns:xsd":`http://www.w3.org/2001/XMLSchema`,"xmlns:xsi":`http://www.w3.org/2001/XMLSchema-instance`,"xmlns:sheet":`urn:oasis:names:tc:opendocument:sh33tjs:1.0`,"xmlns:rpt":`http://openoffice.org/2005/report`,"xmlns:of":`urn:oasis:names:tc:opendocument:xmlns:of:1.2`,"xmlns:xhtml":`http://www.w3.org/1999/xhtml`,"xmlns:grddl":`http://www.w3.org/2003/g/data-view#`,"xmlns:tableooo":`http://openoffice.org/2009/table`,"xmlns:drawooo":`http://openoffice.org/2010/draw`,"xmlns:calcext":`urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0`,"xmlns:loext":`urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0`,"xmlns:field":`urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0`,"xmlns:formx":`urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0`,"xmlns:css3t":`http://www.w3.org/TR/css3-text/`,"office:version":`1.2`}),o=El({"xmlns:config":`urn:oasis:names:tc:opendocument:xmlns:config:1.0`,"office:mimetype":`application/vnd.oasis.opendocument.spreadsheet`});t.bookType==`fods`?(n.push(`<office:document`+a+o+`>
`),n.push(Bd().replace(/office:document-meta/g,`office:meta`))):n.push(`<office:document-content`+a+`>
`),i(n,e),n.push(`  <office:body>
`),n.push(`    <office:spreadsheet>
`);for(var s=0;s!=e.SheetNames.length;++s)n.push(r(e.Sheets[e.SheetNames[s]],e,s,t));return n.push(`    </office:spreadsheet>
`),n.push(`  </office:body>
`),t.bookType==`fods`?n.push(`</office:document>`):n.push(`</office:document-content>`),n.join(``)}})();function iy(e,t){if(t.bookType==`fods`)return ry(e,t);var n=sl(),r=``,i=[],a=[];return r=`mimetype`,B(n,r,`application/vnd.oasis.opendocument.spreadsheet`),r=`content.xml`,B(n,r,ry(e,t)),i.push([r,`text/xml`]),a.push([r,`ContentFile`]),r=`styles.xml`,B(n,r,ny(e,t)),i.push([r,`text/xml`]),a.push([r,`StylesFile`]),r=`meta.xml`,B(n,r,V+Bd()),i.push([r,`text/xml`]),a.push([r,`MetadataFile`]),r=`manifest.rdf`,B(n,r,zd(a)),i.push([r,`application/rdf+xml`]),r=`META-INF/manifest.xml`,B(n,r,Id(i)),n}function ay(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function oy(e){return typeof TextEncoder<`u`?new TextEncoder().encode(e):gs(Sl(e))}function sy(e,t){outer:for(var n=0;n<=e.length-t.length;++n){for(var r=0;r<t.length;++r)if(e[n+r]!=t[r])continue outer;return!0}return!1}function cy(e){var t=e.reduce(function(e,t){return e+t.length},0),n=new Uint8Array(t),r=0;return e.forEach(function(e){n.set(e,r),r+=e.length}),n}function ly(e,t,n){var r=Math.floor(n==0?0:Math.LOG10E*Math.log(Math.abs(n)))+6176-20,i=n/10**(r-6176);e[t+15]|=r>>7,e[t+14]|=(r&127)<<1;for(var a=0;i>=1;++a,i/=256)e[t+a]=i&255;e[t+15]|=n>=0?0:128}function uy(e,t){var n=t?t[0]:0,r=e[n]&127;varint:if(e[n++]>=128&&(r|=(e[n]&127)<<7,e[n++]<128||(r|=(e[n]&127)<<14,e[n++]<128)||(r|=(e[n]&127)<<21,e[n++]<128)||(r+=(e[n]&127)*2**28,++n,e[n++]<128)||(r+=(e[n]&127)*2**35,++n,e[n++]<128)||(r+=(e[n]&127)*2**42,++n,e[n++]<128)))break varint;return t&&(t[0]=n),r}function dy(e){var t=new Uint8Array(7);t[0]=e&127;var n=1;sz:if(e>127){if(t[n-1]|=128,t[n]=e>>7&127,++n,e<=16383||(t[n-1]|=128,t[n]=e>>14&127,++n,e<=2097151)||(t[n-1]|=128,t[n]=e>>21&127,++n,e<=268435455)||(t[n-1]|=128,t[n]=e/256>>>21&127,++n,e<=34359738367)||(t[n-1]|=128,t[n]=e/65536>>>21&127,++n,e<=4398046511103))break sz;t[n-1]|=128,t[n]=e/16777216>>>21&127,++n}return t.slice(0,n)}function fy(e){var t=0,n=e[t]&127;varint:if(e[t++]>=128){if(n|=(e[t]&127)<<7,e[t++]<128||(n|=(e[t]&127)<<14,e[t++]<128)||(n|=(e[t]&127)<<21,e[t++]<128))break varint;n|=(e[t]&127)<<28}return n}function py(e){for(var t=[],n=[0];n[0]<e.length;){var r=n[0],i=uy(e,n),a=i&7;i=Math.floor(i/8);var o=0,s;if(i==0)break;switch(a){case 0:for(var c=n[0];e[n[0]++]>=128;);s=e.slice(c,n[0]);break;case 5:o=4,s=e.slice(n[0],n[0]+o),n[0]+=o;break;case 1:o=8,s=e.slice(n[0],n[0]+o),n[0]+=o;break;case 2:o=uy(e,n),s=e.slice(n[0],n[0]+o),n[0]+=o;break;default:throw Error(`PB Type ${a} for Field ${i} at offset ${r}`)}var l={data:s,type:a};t[i]==null?t[i]=[l]:t[i].push(l)}return t}function my(e){var t=[];return e.forEach(function(e,n){e.forEach(function(e){e.data&&(t.push(dy(n*8+e.type)),e.type==2&&t.push(dy(e.data.length)),t.push(e.data))})}),cy(t)}function hy(e){for(var t=[],n=[0];n[0]<e.length;){var r=uy(e,n),i=py(e.slice(n[0],n[0]+r));n[0]+=r;var a={id:fy(i[1][0].data),messages:[]};i[2].forEach(function(t){var r=py(t.data),i=fy(r[3][0].data);a.messages.push({meta:r,data:e.slice(n[0],n[0]+i)}),n[0]+=i}),i[3]?.[0]&&(a.merge=fy(i[3][0].data)>>>0>0),t.push(a)}return t}function gy(e){var t=[];return e.forEach(function(e){var n=[];n[1]=[{data:dy(e.id),type:0}],n[2]=[],e.merge!=null&&(n[3]=[{data:dy(+!!e.merge),type:0}]);var r=[];e.messages.forEach(function(e){r.push(e.data),e.meta[3]=[{type:0,data:dy(e.data.length)}],n[2].push({data:my(e.meta),type:2})});var i=my(n);t.push(dy(i.length)),t.push(i),r.forEach(function(e){return t.push(e)})}),cy(t)}function _y(e,t){if(e!=0)throw Error(`Unexpected Snappy chunk type ${e}`);for(var n=[0],r=uy(t,n),i=[];n[0]<t.length;){var a=t[n[0]]&3;if(a==0){var o=t[n[0]++]>>2;if(o<60)++o;else{var s=o-59;o=t[n[0]],s>1&&(o|=t[n[0]+1]<<8),s>2&&(o|=t[n[0]+2]<<16),s>3&&(o|=t[n[0]+3]<<24),o>>>=0,o++,n[0]+=s}i.push(t.slice(n[0],n[0]+o)),n[0]+=o;continue}else{var c=0,l=0;if(a==1?(l=(t[n[0]]>>2&7)+4,c=(t[n[0]++]&224)<<3,c|=t[n[0]++]):(l=(t[n[0]++]>>2)+1,a==2?(c=t[n[0]]|t[n[0]+1]<<8,n[0]+=2):(c=(t[n[0]]|t[n[0]+1]<<8|t[n[0]+2]<<16|t[n[0]+3]<<24)>>>0,n[0]+=4)),i=[cy(i)],c==0)throw Error(`Invalid offset 0`);if(c>i[0].length)throw Error(`Invalid offset beyond length`);if(l>=c)for(i.push(i[0].slice(-c)),l-=c;l>=i[i.length-1].length;)i.push(i[i.length-1]),l-=i[i.length-1].length;i.push(i[0].slice(-c,-c+l))}}var u=cy(i);if(u.length!=r)throw Error(`Unexpected length: ${u.length} != ${r}`);return u}function vy(e){for(var t=[],n=0;n<e.length;){var r=e[n++],i=e[n]|e[n+1]<<8|e[n+2]<<16;n+=3,t.push(_y(r,e.slice(n,n+i))),n+=i}if(n!==e.length)throw Error(`data is not a valid framed stream!`);return cy(t)}function yy(e){for(var t=[],n=0;n<e.length;){var r=Math.min(e.length-n,268435455),i=new Uint8Array(4);t.push(i);var a=dy(r),o=a.length;t.push(a),r<=60?(o++,t.push(new Uint8Array([r-1<<2]))):r<=256?(o+=2,t.push(new Uint8Array([240,r-1&255]))):r<=65536?(o+=3,t.push(new Uint8Array([244,r-1&255,r-1>>8&255]))):r<=16777216?(o+=4,t.push(new Uint8Array([248,r-1&255,r-1>>8&255,r-1>>16&255]))):r<=4294967296&&(o+=5,t.push(new Uint8Array([252,r-1&255,r-1>>8&255,r-1>>16&255,r-1>>>24&255]))),t.push(e.slice(n,n+r)),o+=r,i[0]=0,i[1]=o&255,i[2]=o>>8&255,i[3]=o>>16&255,n+=r}return cy(t)}function by(e,t){var n=new Uint8Array(32),r=ay(n),i=12,a=0;switch(n[0]=5,e.t){case`n`:n[1]=2,ly(n,i,e.v),a|=1,i+=16;break;case`b`:n[1]=6,r.setFloat64(i,+!!e.v,!0),a|=2,i+=8;break;case`s`:if(t.indexOf(e.v)==-1)throw Error(`Value ${e.v} missing from SST!`);n[1]=3,r.setUint32(i,t.indexOf(e.v),!0),a|=8,i+=4;break;default:throw`unsupported cell type `+e.t}return r.setUint32(8,a,!0),n.slice(0,i)}function xy(e,t){var n=new Uint8Array(32),r=ay(n),i=12,a=0;switch(n[0]=3,e.t){case`n`:n[2]=2,r.setFloat64(i,e.v,!0),a|=32,i+=8;break;case`b`:n[2]=6,r.setFloat64(i,+!!e.v,!0),a|=32,i+=8;break;case`s`:if(t.indexOf(e.v)==-1)throw Error(`Value ${e.v} missing from SST!`);n[2]=3,r.setUint32(i,t.indexOf(e.v),!0),a|=16,i+=4;break;default:throw`unsupported cell type `+e.t}return r.setUint32(4,a,!0),n.slice(0,i)}function Sy(e){return uy(py(e)[1][0].data)}function Cy(e,t,n){if(!e[6]?.[0]||!e[7]?.[0])throw`Mutation only works on post-BNC storages!`;if(e[8]?.[0]?.data&&fy(e[8][0].data)>0)throw`Math only works with normal offsets`;for(var r=0,i=ay(e[7][0].data),a=0,o=[],s=ay(e[4][0].data),c=0,l=[],u=0;u<t.length;++u){if(t[u]==null){i.setUint16(u*2,65535,!0),s.setUint16(u*2,65535);continue}i.setUint16(u*2,a,!0),s.setUint16(u*2,c,!0);var d,f;switch(typeof t[u]){case`string`:d=by({t:`s`,v:t[u]},n),f=xy({t:`s`,v:t[u]},n);break;case`number`:d=by({t:`n`,v:t[u]},n),f=xy({t:`n`,v:t[u]},n);break;case`boolean`:d=by({t:`b`,v:t[u]},n),f=xy({t:`b`,v:t[u]},n);break;default:throw Error(`Unsupported value `+t[u])}o.push(d),a+=d.length,l.push(f),c+=f.length,++r}for(e[2][0].data=dy(r);u<e[7][0].data.length/2;++u)i.setUint16(u*2,65535,!0),s.setUint16(u*2,65535,!0);return e[6][0].data=cy(o),e[3][0].data=cy(l),r}function wy(e,t){if(!t||!t.numbers)throw Error("Must pass a `numbers` option -- check the README");var n=e.Sheets[e.SheetNames[0]];e.SheetNames.length>1&&console.error(`The Numbers writer currently writes only the first table`);var r=ku(n[`!ref`]);r.s.r=r.s.c=0;var i=!1;r.e.c>9&&(i=!0,r.e.c=9),r.e.r>49&&(i=!0,r.e.r=49),i&&console.error(`The Numbers writer is currently limited to ${Au(r)}`);var a=By(n,{range:r,header:1}),o=[`~Sh33tJ5~`];a.forEach(function(e){return e.forEach(function(e){typeof e==`string`&&o.push(e)})});var s={},c=[],l=Ic.read(t.numbers,{type:`base64`});l.FileIndex.map(function(e,t){return[e,l.FullPaths[t]]}).forEach(function(e){var t=e[0],n=e[1];if(t.type==2&&t.name.match(/\.iwa/)){var r=t.content;hy(vy(r)).forEach(function(e){c.push(e.id),s[e.id]={deps:[],location:n,type:fy(e.messages[0].meta[1][0].data)}})}}),c.sort(function(e,t){return e-t});var u=c.filter(function(e){return e>1}).map(function(e){return[e,dy(e)]});l.FileIndex.map(function(e,t){return[e,l.FullPaths[t]]}).forEach(function(e){var t=e[0];e[1],t.name.match(/\.iwa/)&&hy(vy(t.content)).forEach(function(e){e.messages.forEach(function(t){u.forEach(function(t){e.messages.some(function(e){return fy(e.meta[1][0].data)!=11006&&sy(e.data,t[1])})&&s[t[0]].deps.push(e.id)})})})});for(var d=Ic.find(l,s[1].location),f=hy(vy(d.content)),p,m=0;m<f.length;++m){var h=f[m];h.id==1&&(p=h)}var g=Sy(py(p.messages[0].data)[1][0].data);for(d=Ic.find(l,s[g].location),f=hy(vy(d.content)),m=0;m<f.length;++m)h=f[m],h.id==g&&(p=h);for(g=Sy(py(p.messages[0].data)[2][0].data),d=Ic.find(l,s[g].location),f=hy(vy(d.content)),m=0;m<f.length;++m)h=f[m],h.id==g&&(p=h);for(g=Sy(py(p.messages[0].data)[2][0].data),d=Ic.find(l,s[g].location),f=hy(vy(d.content)),m=0;m<f.length;++m)h=f[m],h.id==g&&(p=h);var _=py(p.messages[0].data);_[6][0].data=dy(r.e.r+1),_[7][0].data=dy(r.e.c+1);for(var v=Sy(_[46][0].data),y=Ic.find(l,s[v].location),b=hy(vy(y.content)),x=0;x<b.length&&b[x].id!=v;++x);if(b[x].id!=v)throw`Bad ColumnRowUIDMapArchive`;var S=py(b[x].messages[0].data);S[1]=[],S[2]=[],S[3]=[];for(var C=0;C<=r.e.c;++C){var w=[];w[1]=w[2]=[{type:0,data:dy(C+420690)}],S[1].push({type:2,data:my(w)}),S[2].push({type:0,data:dy(C)}),S[3].push({type:0,data:dy(C)})}S[4]=[],S[5]=[],S[6]=[];for(var T=0;T<=r.e.r;++T)w=[],w[1]=w[2]=[{type:0,data:dy(T+726270)}],S[4].push({type:2,data:my(w)}),S[5].push({type:0,data:dy(T)}),S[6].push({type:0,data:dy(T)});b[x].messages[0].data=my(S),y.content=yy(gy(b)),y.size=y.content.length,delete _[46];var E=py(_[4][0].data);E[7][0].data=dy(r.e.r+1);var D=Sy(py(E[1][0].data)[2][0].data);if(y=Ic.find(l,s[D].location),b=hy(vy(y.content)),b[0].id!=D)throw`Bad HeaderStorageBucket`;var O=py(b[0].messages[0].data);for(T=0;T<a.length;++T){var k=py(O[2][0].data);k[1][0].data=dy(T),k[4][0].data=dy(a[T].length),O[2][T]={type:O[2][0].type,data:my(k)}}b[0].messages[0].data=my(O),y.content=yy(gy(b)),y.size=y.content.length;var ee=Sy(E[2][0].data);if(y=Ic.find(l,s[ee].location),b=hy(vy(y.content)),b[0].id!=ee)throw`Bad HeaderStorageBucket`;for(O=py(b[0].messages[0].data),C=0;C<=r.e.c;++C)k=py(O[2][0].data),k[1][0].data=dy(C),k[4][0].data=dy(r.e.r+1),O[2][C]={type:O[2][0].type,data:my(k)};b[0].messages[0].data=my(O),y.content=yy(gy(b)),y.size=y.content.length;var te=Sy(E[4][0].data);(function(){for(var e=Ic.find(l,s[te].location),t=hy(vy(e.content)),n,r=0;r<t.length;++r){var i=t[r];i.id==te&&(n=i)}var a=py(n.messages[0].data);a[3]=[];var c=[];o.forEach(function(e,t){c[1]=[{type:0,data:dy(t)}],c[2]=[{type:0,data:dy(1)}],c[3]=[{type:2,data:oy(e)}],a[3].push({type:2,data:my(c)})}),n.messages[0].data=my(a),e.content=yy(gy(t)),e.size=e.content.length})();var ne=py(E[3][0].data),re=ne[1][0];delete ne[2];var ie=py(re.data),ae=Sy(ie[2][0].data);(function(){for(var e=Ic.find(l,s[ae].location),t=hy(vy(e.content)),n,i=0;i<t.length;++i){var c=t[i];c.id==ae&&(n=c)}var u=py(n.messages[0].data);delete u[6],delete ne[7];var d=new Uint8Array(u[5][0].data);u[5]=[];for(var f=0,p=0;p<=r.e.r;++p){var m=py(d);f+=Cy(m,a[p],o),m[1][0].data=dy(p),u[5].push({data:my(m),type:2})}u[1]=[{type:0,data:dy(r.e.c+1)}],u[2]=[{type:0,data:dy(r.e.r+1)}],u[3]=[{type:0,data:dy(f)}],u[4]=[{type:0,data:dy(r.e.r+1)}],n.messages[0].data=my(u),e.content=yy(gy(t)),e.size=e.content.length})(),re.data=my(ie),E[3][0].data=my(ne),_[4][0].data=my(E),p.messages[0].data=my(_);var A=yy(gy(f));return d.content=A,d.size=d.content.length,l}function Ty(e){return function(t){for(var n=0;n!=e.length;++n){var r=e[n];t[r[0]]===void 0&&(t[r[0]]=r[1]),r[2]===`n`&&(t[r[0]]=Number(t[r[0]]))}}}function Ey(e){Ty([[`cellDates`,!1],[`bookSST`,!1],[`bookType`,`xlsx`],[`compression`,!1],[`WTF`,!1]])(e)}function Dy(e,t){return t.bookType==`ods`?iy(e,t):t.bookType==`numbers`?wy(e,t):t.bookType==`xlsb`?Oy(e,t):ky(e,t)}function Oy(e,t){rm=1024,e&&!e.SSF&&(e.SSF=nl(Is)),e&&e.SSF&&(jc(),Ac(e.SSF),t.revssf=Uc(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF),t.rels={},t.wbrels={},t.Strings=[],t.Strings.Count=0,t.Strings.Unique=0,sg?t.revStrings=new Map:(t.revStrings={},t.revStrings.foo=[],delete t.revStrings.foo);var n=t.bookType==`xlsb`?`bin`:`xml`,r=mm.indexOf(t.bookType)>-1,i=jd();Ey(t||={});var a=sl(),o=``,s=0;if(t.cellXfs=[],dg(t.cellXfs,{},{revssf:{General:0}}),e.Props||={},o=`docProps/core.xml`,B(a,o,Ud(e.Props,t)),i.coreprops.push(o),Fd(t.rels,2,o,Z.CORE_PROPS),o=`docProps/app.xml`,!(e.Props&&e.Props.SheetNames))if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{for(var c=[],l=0;l<e.SheetNames.length;++l)(e.Workbook.Sheets[l]||{}).Hidden!=2&&c.push(e.SheetNames[l]);e.Props.SheetNames=c}for(e.Props.Worksheets=e.Props.SheetNames.length,B(a,o,Kd(e.Props,t)),i.extprops.push(o),Fd(t.rels,3,o,Z.EXT_PROPS),e.Custprops!==e.Props&&Bc(e.Custprops||{}).length>0&&(o=`docProps/custom.xml`,B(a,o,qd(e.Custprops,t)),i.custprops.push(o),Fd(t.rels,4,o,Z.CUST_PROPS)),s=1;s<=e.SheetNames.length;++s){var u={"!id":{}},d=e.Sheets[e.SheetNames[s-1]];switch((d||{})[`!type`]||`sheet`){default:o=`xl/worksheets/sheet`+s+`.`+n,B(a,o,ov(s-1,o,t,e,u)),i.sheets.push(o),Fd(t.wbrels,-1,`worksheets/sheet`+s+`.`+n,Z.WS[0])}if(d){var f=d[`!comments`],p=!1,m=``;f&&f.length>0&&(m=`xl/comments`+s+`.`+n,B(a,m,lv(f,m,t)),i.comments.push(m),Fd(u,-1,`../comments`+s+`.`+n,Z.CMNT),p=!0),d[`!legacy`]&&p&&B(a,`xl/drawings/vmlDrawing`+s+`.vml`,im(s,d[`!comments`])),delete d[`!comments`],delete d[`!legacy`]}u[`!id`].rId1&&B(a,Nd(o),Pd(u))}return t.Strings!=null&&t.Strings.length>0&&(o=`xl/sharedStrings.`+n,B(a,o,cv(t.Strings,o,t)),i.strs.push(o),Fd(t.wbrels,-1,`sharedStrings.`+n,Z.SST)),o=`xl/workbook.`+n,B(a,o,av(e,o,t)),i.workbooks.push(o),Fd(t.rels,1,o,Z.WB),o=`xl/theme/theme1.xml`,B(a,o,Kp(e.Themes,t)),i.themes.push(o),Fd(t.wbrels,-1,`theme/theme1.xml`,Z.THEME),o=`xl/styles.`+n,B(a,o,sv(e,o,t)),i.styles.push(o),Fd(t.wbrels,-1,`styles.`+n,Z.STY),e.vbaraw&&r&&(o=`xl/vbaProject.bin`,B(a,o,e.vbaraw),i.vba.push(o),Fd(t.wbrels,-1,`vbaProject.bin`,Z.VBA)),o=`xl/metadata.`+n,B(a,o,uv(o)),i.metadata.push(o),Fd(t.wbrels,-1,`metadata.`+n,Z.XLMETA),B(a,`[Content_Types].xml`,Md(i,t)),B(a,`_rels/.rels`,Pd(t.rels)),B(a,`xl/_rels/workbook.`+n+`.rels`,Pd(t.wbrels)),delete t.revssf,delete t.ssf,a}function ky(e,t){rm=1024,e&&!e.SSF&&(e.SSF=nl(Is)),e&&e.SSF&&(jc(),Ac(e.SSF),t.revssf=Uc(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF),t.rels={},t.wbrels={},t.Strings=[],t.Strings.Count=0,t.Strings.Unique=0,sg?t.revStrings=new Map:(t.revStrings={},t.revStrings.foo=[],delete t.revStrings.foo);var n=`xml`,r=mm.indexOf(t.bookType)>-1,i=jd();Ey(t||={});var a=sl(),o=``,s=0;if(t.cellXfs=[],dg(t.cellXfs,{},{revssf:{General:0}}),e.Props||={},o=`docProps/core.xml`,B(a,o,Ud(e.Props,t)),i.coreprops.push(o),Fd(t.rels,2,o,Z.CORE_PROPS),o=`docProps/app.xml`,!(e.Props&&e.Props.SheetNames))if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{for(var c=[],l=0;l<e.SheetNames.length;++l)(e.Workbook.Sheets[l]||{}).Hidden!=2&&c.push(e.SheetNames[l]);e.Props.SheetNames=c}e.Props.Worksheets=e.Props.SheetNames.length,B(a,o,Kd(e.Props,t)),i.extprops.push(o),Fd(t.rels,3,o,Z.EXT_PROPS),e.Custprops!==e.Props&&Bc(e.Custprops||{}).length>0&&(o=`docProps/custom.xml`,B(a,o,qd(e.Custprops,t)),i.custprops.push(o),Fd(t.rels,4,o,Z.CUST_PROPS));var u=[`SheetJ5`];for(t.tcid=0,s=1;s<=e.SheetNames.length;++s){var d={"!id":{}},f=e.Sheets[e.SheetNames[s-1]];switch((f||{})[`!type`]||`sheet`){default:o=`xl/worksheets/sheet`+s+`.`+n,B(a,o,wg(s-1,t,e,d)),i.sheets.push(o),Fd(t.wbrels,-1,`worksheets/sheet`+s+`.`+n,Z.WS[0])}if(f){var p=f[`!comments`],m=!1,h=``;if(p&&p.length>0){var g=!1;p.forEach(function(e){e[1].forEach(function(e){e.T==1&&(g=!0)})}),g&&(h=`xl/threadedComments/threadedComment`+s+`.`+n,B(a,h,om(p,u,t)),i.threadedcomments.push(h),Fd(d,-1,`../threadedComments/threadedComment`+s+`.`+n,Z.TCMNT)),h=`xl/comments`+s+`.`+n,B(a,h,am(p,t)),i.comments.push(h),Fd(d,-1,`../comments`+s+`.`+n,Z.CMNT),m=!0}f[`!legacy`]&&m&&B(a,`xl/drawings/vmlDrawing`+s+`.vml`,im(s,f[`!comments`])),delete f[`!comments`],delete f[`!legacy`]}d[`!id`].rId1&&B(a,Nd(o),Pd(d))}return t.Strings!=null&&t.Strings.length>0&&(o=`xl/sharedStrings.`+n,B(a,o,tp(t.Strings,t)),i.strs.push(o),Fd(t.wbrels,-1,`sharedStrings.`+n,Z.SST)),o=`xl/workbook.`+n,B(a,o,J_(e,t)),i.workbooks.push(o),Fd(t.rels,1,o,Z.WB),o=`xl/theme/theme1.xml`,B(a,o,Kp(e.Themes,t)),i.themes.push(o),Fd(t.wbrels,-1,`theme/theme1.xml`,Z.THEME),o=`xl/styles.`+n,B(a,o,bp(e,t)),i.styles.push(o),Fd(t.wbrels,-1,`styles.`+n,Z.STY),e.vbaraw&&r&&(o=`xl/vbaProject.bin`,B(a,o,e.vbaraw),i.vba.push(o),Fd(t.wbrels,-1,`vbaProject.bin`,Z.VBA)),o=`xl/metadata.`+n,B(a,o,tm()),i.metadata.push(o),Fd(t.wbrels,-1,`metadata.`+n,Z.XLMETA),u.length>1&&(o=`xl/persons/person.xml`,B(a,o,sm(u,t)),i.people.push(o),Fd(t.wbrels,-1,`persons/person.xml`,Z.PEOPLE)),B(a,`[Content_Types].xml`,Md(i,t)),B(a,`_rels/.rels`,Pd(t.rels)),B(a,`xl/_rels/workbook.`+n+`.rels`,Pd(t.wbrels)),delete t.revssf,delete t.ssf,a}function Ay(e,t){var n=``;switch((t||{}).type||`base64`){case`buffer`:return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];case`base64`:n=fs(e.slice(0,12));break;case`binary`:n=e;break;case`array`:return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];default:throw Error(`Unrecognized type `+(t&&t.type||`undefined`))}return[n.charCodeAt(0),n.charCodeAt(1),n.charCodeAt(2),n.charCodeAt(3),n.charCodeAt(4),n.charCodeAt(5),n.charCodeAt(6),n.charCodeAt(7)]}function jy(e,t){switch(t.type){case`base64`:case`binary`:break;case`buffer`:case`array`:t.type=``;break;case`file`:return zc(t.file,Ic.write(e,{type:z?`buffer`:``}));case`string`:throw Error(`'string' output type invalid for '`+t.bookType+`' files`);default:throw Error(`Unrecognized type `+t.type)}return Ic.write(e,t)}function My(e,t){var n=nl(t||{});return Ny(Dy(e,n),n)}function Ny(e,t){var n={},r=z?`nodebuffer`:typeof Uint8Array<`u`?`array`:`string`;if(t.compression&&(n.compression=`DEFLATE`),t.password)n.type=r;else switch(t.type){case`base64`:n.type=`base64`;break;case`binary`:n.type=`string`;break;case`string`:throw Error(`'string' output type invalid for '`+t.bookType+`' files`);case`buffer`:case`file`:n.type=r;break;default:throw Error(`Unrecognized type `+t.type)}var i=e.FullPaths?Ic.write(e,{fileType:`zip`,type:{nodebuffer:`buffer`,string:`binary`}[n.type]||n.type,compression:!!t.compression}):e.generate(n);if(typeof Deno<`u`&&typeof i==`string`){if(t.type==`binary`||t.type==`base64`)return i;i=new Uint8Array(_s(i))}return t.password&&typeof encrypt_agile<`u`?jy(encrypt_agile(i,t.password),t):t.type===`file`?zc(t.file,i):t.type==`string`?xl(i):i}function Py(e,t){var n=t||{};return jy(Ev(e,n),n)}function Fy(e,t,n){n||=``;var r=n+e;switch(t.type){case`base64`:return ds(Sl(r));case`binary`:return Sl(r);case`string`:return e;case`file`:return zc(t.file,r,`utf8`);case`buffer`:return z?ps(r,`utf8`):typeof TextEncoder<`u`?new TextEncoder().encode(r):Fy(r,{type:`binary`}).split(``).map(function(e){return e.charCodeAt(0)})}throw Error(`Unrecognized type `+t.type)}function Iy(e,t){switch(t.type){case`base64`:return ds(e);case`binary`:return e;case`string`:return e;case`file`:return zc(t.file,e,`binary`);case`buffer`:return z?ps(e,`binary`):e.split(``).map(function(e){return e.charCodeAt(0)})}throw Error(`Unrecognized type `+t.type)}function Ly(e,t){switch(t.type){case`string`:case`base64`:case`binary`:for(var n=``,r=0;r<e.length;++r)n+=String.fromCharCode(e[r]);return t.type==`base64`?ds(n):t.type==`string`?xl(n):n;case`file`:return zc(t.file,e);case`buffer`:return e;default:throw Error(`Unrecognized type `+t.type)}}function Ry(e,t){rs(),q_(e);var n=nl(t||{});if(n.cellStyles&&(n.cellNF=!0,n.sheetStubs=!0),n.type==`array`){n.type=`binary`;var r=Ry(e,n);return n.type=`array`,_s(r)}var i=0;if(n.sheet&&(i=typeof n.sheet==`number`?n.sheet:e.SheetNames.indexOf(n.sheet),!e.SheetNames[i]))throw Error(`Sheet not found: `+n.sheet+` : `+typeof n.sheet);switch(n.bookType||`xlsb`){case`xml`:case`xlml`:return Fy(Cv(e,n),n);case`slk`:case`sylk`:return Fy(Yf.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`htm`:case`html`:return Fy(Xv(e.Sheets[e.SheetNames[i]],n),n);case`txt`:return Iy(Wy(e.Sheets[e.SheetNames[i]],n),n);case`csv`:return Fy(Uy(e.Sheets[e.SheetNames[i]],n),n,`﻿`);case`dif`:return Fy(Xf.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`dbf`:return Ly(Jf.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`prn`:return Fy(Qf.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`rtf`:return Fy(cp.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`eth`:return Fy(Zf.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`fods`:return Fy(iy(e,n),n);case`wk1`:return Ly($f.sheet_to_wk1(e.Sheets[e.SheetNames[i]],n),n);case`wk3`:return Ly($f.book_to_wk3(e,n),n);case`biff2`:n.biff||=2;case`biff3`:n.biff||=3;case`biff4`:return n.biff||=4,Ly(Gv(e,n),n);case`biff5`:n.biff||=5;case`biff8`:case`xla`:case`xls`:return n.biff||=8,Py(e,n);case`xlsx`:case`xlsm`:case`xlam`:case`xlsb`:case`numbers`:case`ods`:return My(e,n);default:throw Error(`Unrecognized bookType |`+n.bookType+`|`)}}function zy(e,t,n,r,i,a,o,s){var c=yu(n),l=s.defval,u=s.raw||!Object.prototype.hasOwnProperty.call(s,`raw`),d=!0,f=i===1?[]:{};if(i!==1)if(Object.defineProperty)try{Object.defineProperty(f,`__rowNum__`,{value:n,enumerable:!1})}catch{f.__rowNum__=n}else f.__rowNum__=n;if(!o||e[n])for(var p=t.s.c;p<=t.e.c;++p){var m=o?e[n][p]:e[r[p]+c];if(m===void 0||m.t===void 0){if(l===void 0)continue;a[p]!=null&&(f[a[p]]=l);continue}var h=m.v;switch(m.t){case`z`:if(h==null)break;continue;case`e`:h=h==0?null:void 0;break;case`s`:case`d`:case`b`:case`n`:break;default:throw Error(`unrecognized type `+m.t)}if(a[p]!=null){if(h==null)if(m.t==`e`&&h===null)f[a[p]]=null;else if(l!==void 0)f[a[p]]=l;else if(u&&h===null)f[a[p]]=null;else continue;else f[a[p]]=u&&(m.t!==`n`||m.t===`n`&&s.rawNumbers!==!1)?h:Nu(m,h,s);h!=null&&(d=!1)}}return{row:f,isempty:d}}function By(e,t){if(e==null||e[`!ref`]==null)return[];var n={t:`n`,v:0},r=0,i=1,a=[],o=0,s=``,c={s:{r:0,c:0},e:{r:0,c:0}},l=t||{},u=l.range==null?e[`!ref`]:l.range;switch(l.header===1?r=1:l.header===`A`?r=2:Array.isArray(l.header)?r=3:l.header??(r=0),typeof u){case`string`:c=ju(u);break;case`number`:c=ju(e[`!ref`]),c.s.r=u;break;default:c=u}r>0&&(i=0);var d=yu(c.s.r),f=[],p=[],m=0,h=0,g=Array.isArray(e),_=c.s.r,v=0,y={};g&&!e[_]&&(e[_]=[]);var b=l.skipHidden&&e[`!cols`]||[],x=l.skipHidden&&e[`!rows`]||[];for(v=c.s.c;v<=c.e.c;++v)if(!(b[v]||{}).hidden)switch(f[v]=Cu(v),n=g?e[_][v]:e[f[v]+d],r){case 1:a[v]=v-c.s.c;break;case 2:a[v]=f[v];break;case 3:a[v]=l.header[v-c.s.c];break;default:if(n??={w:`__EMPTY`,t:`s`},s=o=Nu(n,null,l),h=y[o]||0,!h)y[o]=1;else{do s=o+`_`+ h++;while(y[s]);y[o]=h,y[s]=1}a[v]=s}for(_=c.s.r+i;_<=c.e.r;++_)if(!(x[_]||{}).hidden){var S=zy(e,c,_,f,r,a,g,l);(S.isempty===!1||(r===1?l.blankrows!==!1:l.blankrows))&&(p[m++]=S.row)}return p.length=m,p}var Vy=/"/g;function Hy(e,t,n,r,i,a,o,s){for(var c=!0,l=[],u=``,d=yu(n),f=t.s.c;f<=t.e.c;++f)if(r[f]){var p=s.dense?(e[n]||[])[f]:e[r[f]+d];if(p==null)u=``;else if(p.v!=null){c=!1,u=``+(s.rawNumbers&&p.t==`n`?p.v:Nu(p,null,s));for(var m=0,h=0;m!==u.length;++m)if((h=u.charCodeAt(m))===i||h===a||h===34||s.forceQuotes){u=`"`+u.replace(Vy,`""`)+`"`;break}u==`ID`&&(u=`"ID"`)}else p.f!=null&&!p.F?(c=!1,u=`=`+p.f,u.indexOf(`,`)>=0&&(u=`"`+u.replace(Vy,`""`)+`"`)):u=``;l.push(u)}return s.blankrows===!1&&c?null:l.join(o)}function Uy(e,t){var n=[],r=t??{};if(e==null||e[`!ref`]==null)return``;var i=ju(e[`!ref`]),a=r.FS===void 0?`,`:r.FS,o=a.charCodeAt(0),s=r.RS===void 0?`
`:r.RS,c=s.charCodeAt(0),l=RegExp((a==`|`?`\\|`:a)+`+$`),u=``,d=[];r.dense=Array.isArray(e);for(var f=r.skipHidden&&e[`!cols`]||[],p=r.skipHidden&&e[`!rows`]||[],m=i.s.c;m<=i.e.c;++m)(f[m]||{}).hidden||(d[m]=Cu(m));for(var h=0,g=i.s.r;g<=i.e.r;++g)(p[g]||{}).hidden||(u=Hy(e,i,g,d,o,c,a,r),u!=null&&(r.strip&&(u=u.replace(l,``)),(u||r.blankrows!==!1)&&n.push((h++?s:``)+u)));return delete r.dense,n.join(``)}function Wy(e,t){t||={},t.FS=`	`,t.RS=`
`;var n=Uy(e,t);return ss===void 0||t.type==`string`?n:`ÿþ`+ss.utils.encode(1200,n,`str`)}function Gy(e){var t=``,n,r=``;if(e==null||e[`!ref`]==null)return[];var i=ju(e[`!ref`]),a=``,o=[],s,c=[],l=Array.isArray(e);for(s=i.s.c;s<=i.e.c;++s)o[s]=Cu(s);for(var u=i.s.r;u<=i.e.r;++u)for(a=yu(u),s=i.s.c;s<=i.e.c;++s)if(t=o[s]+a,n=l?(e[u]||[])[s]:e[t],r=``,n!==void 0){if(n.F!=null){if(t=n.F,!n.f)continue;r=n.f,t.indexOf(`:`)==-1&&(t=t+`:`+t)}if(n.f!=null)r=n.f;else if(n.t==`z`)continue;else if(n.t==`n`&&n.v!=null)r=``+n.v;else if(n.t==`b`)r=n.v?`TRUE`:`FALSE`;else if(n.w!==void 0)r=`'`+n.w;else if(n.v===void 0)continue;else r=n.t==`s`?`'`+n.v:``+n.v;c[c.length]=t+`=`+r}return c}function Ky(e,t,n){var r=n||{},i=+!r.skipHeader,a=e||{},o=0,s=0;if(a&&r.origin!=null)if(typeof r.origin==`number`)o=r.origin;else{var c=typeof r.origin==`string`?Du(r.origin):r.origin;o=c.r,s=c.c}var l,u={s:{c:0,r:0},e:{c:s,r:o+t.length-1+i}};if(a[`!ref`]){var d=ju(a[`!ref`]);u.e.c=Math.max(u.e.c,d.e.c),u.e.r=Math.max(u.e.r,d.e.r),o==-1&&(o=d.e.r+1,u.e.r=o+t.length-1+i)}else o==-1&&(o=0,u.e.r=t.length-1+i);var f=r.header||[],p=0;t.forEach(function(e,t){Bc(e).forEach(function(n){(p=f.indexOf(n))==-1&&(f[p=f.length]=n);var c=e[n],u=`z`,d=``,m=Ou({c:s+p,r:o+t+i});l=Jy(a,m),c&&typeof c==`object`&&!(c instanceof Date)?a[m]=c:(typeof c==`number`?u=`n`:typeof c==`boolean`?u=`b`:typeof c==`string`?u=`s`:c instanceof Date?(u=`d`,r.cellDates||(u=`n`,c=Kc(c)),d=r.dateNF||Is[14]):c===null&&r.nullError&&(u=`e`,c=0),l?(l.t=u,l.v=c,delete l.w,delete l.R,d&&(l.z=d)):a[m]=l={t:u,v:c},d&&(l.z=d))})}),u.e.c=Math.max(u.e.c,s+f.length-1);var m=yu(o);if(i)for(p=0;p<f.length;++p)a[Cu(p+s)+m]={t:`s`,v:f[p]};return a[`!ref`]=Au(u),a}function qy(e,t){return Ky(null,e,t)}function Jy(e,t,n){if(typeof t==`string`){if(Array.isArray(e)){var r=Du(t);return e[r.r]||(e[r.r]=[]),e[r.r][r.c]||(e[r.r][r.c]={t:`z`})}return e[t]||(e[t]={t:`z`})}return typeof t==`number`?Jy(e,Ou({r:t,c:n||0})):Jy(e,Ou(t))}function Yy(e,t){if(typeof t==`number`){if(t>=0&&e.SheetNames.length>t)return t;throw Error(`Cannot find sheet # `+t)}else if(typeof t==`string`){var n=e.SheetNames.indexOf(t);if(n>-1)return n;throw Error(`Cannot find sheet name |`+t+`|`)}else throw Error(`Cannot find sheet |`+t+`|`)}function Xy(){return{SheetNames:[],Sheets:{}}}function Zy(e,t,n,r){var i=1;if(!n)for(;i<=65535&&e.SheetNames.indexOf(n=`Sheet`+i)!=-1;++i,n=void 0);if(!n||e.SheetNames.length>=65535)throw Error(`Too many worksheets`);if(r&&e.SheetNames.indexOf(n)>=0){var a=n.match(/(^.*?)(\d+)$/);i=a&&+a[2]||0;var o=a&&a[1]||n;for(++i;i<=65535&&e.SheetNames.indexOf(n=o+i)!=-1;++i);}if(G_(n),e.SheetNames.indexOf(n)>=0)throw Error(`Worksheet with name |`+n+`| already exists!`);return e.SheetNames.push(n),e.Sheets[n]=t,n}function Qy(e,t,n){e.Workbook||={},e.Workbook.Sheets||(e.Workbook.Sheets=[]);var r=Yy(e,t);switch(e.Workbook.Sheets[r]||(e.Workbook.Sheets[r]={}),n){case 0:case 1:case 2:break;default:throw Error(`Bad sheet visibility setting `+n)}e.Workbook.Sheets[r].Hidden=n}function $y(e,t){return e.z=t,e}function eb(e,t,n){return t?(e.l={Target:t},n&&(e.l.Tooltip=n)):delete e.l,e}function tb(e,t,n){return eb(e,`#`+t,n)}function nb(e,t,n){e.c||=[],e.c.push({t,a:n||`SheetJS`})}function rb(e,t,n,r){for(var i=typeof t==`string`?ju(t):t,a=typeof t==`string`?t:Au(t),o=i.s.r;o<=i.e.r;++o)for(var s=i.s.c;s<=i.e.c;++s){var c=Jy(e,o,s);c.t=`n`,c.F=a,delete c.v,o==i.s.r&&s==i.s.c&&(c.f=n,r&&(c.D=!0))}return e}var ib={encode_col:Cu,encode_row:yu,encode_cell:Ou,encode_range:Au,decode_col:Su,decode_row:vu,split_cell:Eu,decode_cell:Du,decode_range:ku,format_cell:Nu,sheet_add_aoa:Fu,sheet_add_json:Ky,sheet_add_dom:Zv,aoa_to_sheet:Iu,json_to_sheet:qy,table_to_sheet:Qv,table_to_book:$v,sheet_to_csv:Uy,sheet_to_txt:Wy,sheet_to_json:By,sheet_to_html:Xv,sheet_to_formulae:Gy,sheet_to_row_object_array:By,sheet_get_cell:Jy,book_new:Xy,book_append_sheet:Zy,book_set_sheet_visibility:Qy,cell_set_number_format:$y,cell_set_hyperlink:eb,cell_set_internal_link:tb,cell_add_comment:nb,sheet_set_array_formula:rb,consts:{SHEET_VISIBLE:0,SHEET_HIDDEN:1,SHEET_VERY_HIDDEN:2}};Yo.version;var ab=o(((e,t)=>{(function(t,n){typeof define==`function`&&define.amd?define([],n):e===void 0?(n(),t.FileSaver={exports:{}}.exports):n()})(e,function(){function e(e,t){return t===void 0?t={autoBom:!1}:typeof t!=`object`&&(console.warn(`Deprecated: Expected third argument to be a object`),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([`﻿`,e],{type:e.type}):e}function n(e,t,n){var r=new XMLHttpRequest;r.open(`GET`,e),r.responseType=`blob`,r.onload=function(){s(r.response,t,n)},r.onerror=function(){console.error(`could not download file`)},r.send()}function r(e){var t=new XMLHttpRequest;t.open(`HEAD`,e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function i(e){try{e.dispatchEvent(new MouseEvent(`click`))}catch{var t=document.createEvent(`MouseEvents`);t.initMouseEvent(`click`,!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var a=typeof window==`object`&&window.window===window?window:typeof self==`object`&&self.self===self?self:typeof global==`object`&&global.global===global?global:void 0,o=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=a.saveAs||(typeof window!=`object`||window!==a?function(){}:`download`in HTMLAnchorElement.prototype&&!o?function(e,t,o){var s=a.URL||a.webkitURL,c=document.createElement(`a`);t=t||e.name||`download`,c.download=t,c.rel=`noopener`,typeof e==`string`?(c.href=e,c.origin===location.origin?i(c):r(c.href)?n(e,t,o):i(c,c.target=`_blank`)):(c.href=s.createObjectURL(e),setTimeout(function(){s.revokeObjectURL(c.href)},4e4),setTimeout(function(){i(c)},0))}:`msSaveOrOpenBlob`in navigator?function(t,a,o){if(a=a||t.name||`download`,typeof t!=`string`)navigator.msSaveOrOpenBlob(e(t,o),a);else if(r(t))n(t,a,o);else{var s=document.createElement(`a`);s.href=t,s.target=`_blank`,setTimeout(function(){i(s)})}}:function(e,t,r,i){if(i||=open(``,`_blank`),i&&(i.document.title=i.document.body.innerText=`downloading...`),typeof e==`string`)return n(e,t,r);var s=e.type===`application/octet-stream`,c=/constructor/i.test(a.HTMLElement)||a.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||s&&c||o)&&typeof FileReader<`u`){var u=new FileReader;u.onloadend=function(){var e=u.result;e=l?e:e.replace(/^data:[^;]*;/,`data:attachment/file;`),i?i.location.href=e:location=e,i=null},u.readAsDataURL(e)}else{var d=a.URL||a.webkitURL,f=d.createObjectURL(e);i?i.location=f:location.href=f,i=null,setTimeout(function(){d.revokeObjectURL(f)},4e4)}});a.saveAs=s.saveAs=s,t!==void 0&&(t.exports=s)})}))(),ob={pending:{label:`En attente`,bg:`#FFF7ED`,color:`#C2410C`,dot:`#FB923C`},processing:{label:`En cours`,bg:`#EFF6FF`,color:`#1D4ED8`,dot:`#60A5FA`},shipped:{label:`Expédiée`,bg:`#F5F3FF`,color:`#6D28D9`,dot:`#A78BFA`},delivered:{label:`Livrée`,bg:`#F0FDF4`,color:`#166534`,dot:`#4ADE80`},cancelled:{label:`Annulée`,bg:`#FEF2F2`,color:`#991B1B`,dot:`#F87171`}},sb=[{id:`dashboard`,label:`Vue d'ensemble`,icon:`◈`},{id:`products`,label:`Produits`,icon:`✦`},{id:`orders`,label:`Commandes`,icon:`◫`},{id:`customers`,label:`Clients`,icon:`◉`},{id:`delivery`,label:`Livraison`,icon:`◎`},{id:`settings`,label:`Paramètres`,icon:`◬`}],cb=({isAdminLoggedIn:e,setIsAdminLoggedIn:t})=>{let[n,r]=(0,v.useState)(`dashboard`),[i,a]=(0,v.useState)(!0),[o,s]=(0,v.useState)(!1),[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(``),[f,p]=(0,v.useState)(``),[m,h]=(0,v.useState)(!1),[g,_]=(0,v.useState)([]),[y,b]=(0,v.useState)([]),[x,S]=(0,v.useState)([]),[C,w]=(0,v.useState)({totalProducts:0,totalOrders:0,revenue:0}),[T,E]=(0,v.useState)(null),[D,O]=(0,v.useState)({name:``,description:``,price:``,image_url:``,category:``,stock:``}),[k,ee]=(0,v.useState)({text:``,type:``}),[te,ne]=(0,v.useState)(``),[re,ie]=(0,v.useState)(``),[ae,A]=(0,v.useState)(1),[j,oe]=(0,v.useState)(``),[se,ce]=(0,v.useState)(!1),le=localStorage.getItem(`adminToken`),ue=!!le||e,de=()=>({headers:{Authorization:`Bearer ${localStorage.getItem(`adminToken`)}`}}),fe=e=>Math.round(Number(e)).toLocaleString(`fr-MA`),pe=(e,t=`success`)=>{ee({text:e,type:t}),setTimeout(()=>ee({text:``,type:``}),3500)},me=async()=>{let e=localStorage.getItem(`adminToken`);if(e)try{let t={headers:{Authorization:`Bearer ${e}`}},[n,r,i]=await Promise.all([F.get(`/api/products`),F.get(`/api/orders`,t),F.get(`/api/admin/stats`,t)]);_(n.data),b(r.data),w(i.data),S([...new Map(r.data.map(e=>[e.customer_email,e])).values()])}catch(e){e.response?.status===401&&ge()}};(0,v.useEffect)(()=>{ue&&le&&me()},[ue]),(0,v.useEffect)(()=>{let e=()=>a(window.innerWidth>=1024);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let he=async e=>{e.preventDefault(),h(!0),p(``);try{let e=await F.post(`/api/admin/login`,{username:c,password:u});e.data.token&&(localStorage.setItem(`adminToken`,e.data.token),t?.(!0),setTimeout(me,100))}catch(e){p(e.response?.data?.error||`Identifiants invalides`)}finally{h(!1)}},ge=()=>{localStorage.removeItem(`adminToken`),t?.(!1),_([]),b([])},_e=async e=>{if(e.preventDefault(),!D.name||!D.price){pe(`Nom et prix sont requis`,`error`);return}h(!0);try{let e={name:D.name,description:D.description||``,price:parseFloat(D.price),image_url:D.image_url||`https://images.unsplash.com/photo-1541643600914-78b084683601?w=400`,category:D.category||`Autre`,stock:parseInt(D.stock)||10};T?(await F.put(`/api/products/${T.id}`,e,de()),pe(`"${D.name}" modifié avec succès`)):(await F.post(`/api/products`,e,de()),pe(`"${D.name}" ajouté avec succès`)),E(null),O({name:``,description:``,price:``,image_url:``,category:``,stock:``}),oe(``),ce(!1),await me()}catch(e){e.response?.status===401?(pe(`Session expirée`,`error`),ge()):pe(e.response?.data?.error||`Erreur serveur`,`error`)}finally{h(!1)}},ve=async(e,t)=>{if(window.confirm(`Supprimer "${t}" ?`))try{await F.delete(`/api/products/${e}`,de()),pe(`"${t}" supprimé`),me()}catch(e){pe(e.response?.data?.error||`Impossible de supprimer`,`error`)}},ye=e=>{E(e),O({name:e.name,description:e.description||``,price:e.price,image_url:e.image_url||``,category:e.category||``,stock:e.stock}),oe(e.image_url),ce(!0),r(`products`)},be=async(e,t)=>{try{await F.put(`/api/orders/${e}/status`,{status:t},de()),pe(`Statut mis à jour`),me()}catch{pe(`Erreur lors de la mise à jour`,`error`)}},xe=()=>{let e=y.map(e=>({ID:e.id,Client:e.customer_name,Email:e.customer_email,Téléphone:e.customer_phone||`-`,Adresse:e.customer_address||`-`,"Total (MAD)":e.total_amount,Statut:e.status,Date:new Date(e.created_at).toLocaleDateString(`fr-FR`),Articles:e.items?.map(e=>`${e.product_name} (x${e.quantity})`).join(`, `)||`-`})),t=ib.json_to_sheet(e),n=ib.book_new();ib.book_append_sheet(n,t,`Commandes`),(0,ab.saveAs)(new Blob([Ry(n,{bookType:`xlsx`,type:`array`})],{type:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`}),`commandes_${new Date().toISOString().split(`T`)[0]}.xlsx`),pe(`Export Excel réussi !`)},Se=g.filter(e=>e.name.toLowerCase().includes(te.toLowerCase())||(e.category||``).toLowerCase().includes(te.toLowerCase())),Ce=Math.ceil(Se.length/8),we=Se.slice((ae-1)*8,ae*8),Te=y.filter(e=>e.customer_name?.toLowerCase().includes(re.toLowerCase())||e.customer_email?.toLowerCase().includes(re.toLowerCase())||String(e.id).includes(re));return ue?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`style`,{children:db}),(0,I.jsxs)(`div`,{className:`a-root`,children:[o&&(0,I.jsx)(`div`,{className:`a-overlay`,onClick:()=>s(!1)}),(0,I.jsxs)(`aside`,{className:`a-sidebar ${i||o?`a-sidebar--open`:`a-sidebar--closed`}`,children:[(0,I.jsx)(`div`,{className:`a-sidebar-accent`}),(0,I.jsxs)(`div`,{className:`a-sidebar-top`,children:[(0,I.jsxs)(`div`,{className:`a-sidebar-logo`,children:[(0,I.jsx)(`div`,{className:`a-logo-mark`,children:`N`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`a-logo-name`,children:`Nahid Perfume`}),(0,I.jsx)(`div`,{className:`a-logo-sub`,children:`Administration`})]})]}),(0,I.jsx)(`button`,{className:`a-sidebar-close`,onClick:()=>{a(!1),s(!1)},children:`✕`})]}),(0,I.jsxs)(`nav`,{className:`a-nav`,children:[(0,I.jsx)(`div`,{className:`a-nav-group-label`,children:`Navigation`}),sb.map(e=>(0,I.jsxs)(`button`,{className:`a-nav-item ${n===e.id?`a-nav-item--active`:``}`,onClick:()=>{r(e.id),window.innerWidth<1024&&s(!1)},children:[(0,I.jsx)(`span`,{className:`a-nav-icon`,children:e.icon}),(0,I.jsx)(`span`,{children:e.label}),e.id===`orders`&&y.filter(e=>e.status===`pending`).length>0&&(0,I.jsx)(`span`,{className:`a-nav-badge`,children:y.filter(e=>e.status===`pending`).length})]},e.id))]}),(0,I.jsx)(`div`,{className:`a-sidebar-foot`,children:(0,I.jsxs)(`button`,{className:`a-logout`,onClick:ge,children:[(0,I.jsx)(`span`,{children:`⎋`}),` Déconnexion`]})})]}),(0,I.jsxs)(`main`,{className:`a-main ${i&&window.innerWidth>=1024?`a-main--pushed`:``}`,children:[(0,I.jsxs)(`div`,{className:`a-topbar`,children:[(0,I.jsxs)(`button`,{className:`a-menu-btn`,onClick:()=>window.innerWidth<1024?s(!o):a(!i),children:[(0,I.jsx)(`span`,{}),(0,I.jsx)(`span`,{}),(0,I.jsx)(`span`,{})]}),(0,I.jsx)(`h2`,{className:`a-topbar-title`,children:{dashboard:`Vue d'ensemble`,products:`Produits`,orders:`Commandes`,customers:`Clients`,delivery:`Livraison`,settings:`Paramètres`}[n]}),(0,I.jsx)(`div`,{className:`a-topbar-right`,children:(0,I.jsx)(`div`,{className:`a-topbar-avatar`,children:`A`})})]}),k.text&&(0,I.jsxs)(`div`,{className:`a-notif ${k.type===`error`?`a-notif--err`:`a-notif--ok`}`,children:[(0,I.jsx)(`span`,{children:k.type===`error`?`⚠`:`✓`}),k.text]}),(0,I.jsxs)(`div`,{className:`a-content`,children:[n===`dashboard`&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(`div`,{className:`a-page-head`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h1`,{className:`a-page-title`,children:`Tableau de bord`}),(0,I.jsx)(`p`,{className:`a-page-sub`,children:`Bienvenue dans votre espace Nahid Perfume`})]}),(0,I.jsx)(`button`,{className:`a-btn-coral`,onClick:()=>{r(`products`),ce(!0),E(null),O({name:``,description:``,price:``,image_url:``,category:``,stock:``}),oe(``)},children:`+ Nouveau produit`})]}),(0,I.jsx)(`div`,{className:`a-kpi-grid`,children:[{icon:`📦`,label:`Produits`,value:C.totalProducts,color:`#FFF4F2`,border:`#FFD7D2`},{icon:`🛒`,label:`Commandes`,value:C.totalOrders,color:`#F0F4FF`,border:`#C7D5FF`},{icon:`💰`,label:`Chiffre d'affaires`,value:fe(C.revenue)+` MAD`,color:`#F2FDF6`,border:`#B5EDCA`},{icon:`👥`,label:`Clients`,value:x.length,color:`#FFF9F0`,border:`#FFE4AC`}].map((e,t)=>(0,I.jsxs)(`div`,{className:`a-kpi`,style:{"--kpi-bg":e.color,"--kpi-border":e.border,animationDelay:`${t*.07}s`},children:[(0,I.jsx)(`div`,{className:`a-kpi-icon`,children:e.icon}),(0,I.jsx)(`div`,{className:`a-kpi-value`,children:e.value}),(0,I.jsx)(`div`,{className:`a-kpi-label`,children:e.label})]},t))}),(0,I.jsx)(`div`,{className:`a-status-strip`,children:Object.entries(ob).map(([e,t])=>(0,I.jsxs)(`div`,{className:`a-status-pill`,style:{"--s-bg":t.bg,"--s-color":t.color},children:[(0,I.jsx)(`span`,{className:`a-status-dot`,style:{background:t.dot}}),t.label,` · `,(0,I.jsx)(`strong`,{children:y.filter(t=>t.status===e).length})]},e))}),(0,I.jsxs)(`div`,{className:`a-card`,children:[(0,I.jsxs)(`div`,{className:`a-card-head`,children:[(0,I.jsx)(`div`,{className:`a-card-title`,children:`Dernières commandes`}),(0,I.jsx)(`button`,{className:`a-btn-ghost`,onClick:()=>r(`orders`),children:`Voir tout →`})]}),(0,I.jsx)(ub,{cols:[`#`,`Client`,`Total`,`Statut`,`Date`],empty:{icon:`📋`,text:`Aucune commande`},rows:y.slice(0,5).map(e=>{let t=ob[e.status]||ob.pending;return[(0,I.jsxs)(`span`,{className:`a-id`,children:[`#`,e.id]}),(0,I.jsx)(`span`,{className:`a-fw5`,children:e.customer_name}),(0,I.jsxs)(`span`,{className:`a-coral-fw`,children:[fe(e.total_amount),` MAD`]}),(0,I.jsx)(lb,{cfg:t}),(0,I.jsx)(`span`,{className:`a-date`,children:new Date(e.created_at).toLocaleDateString(`fr-FR`)})]})})]})]}),n===`products`&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(`div`,{className:`a-page-head`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h1`,{className:`a-page-title`,children:`Produits`}),(0,I.jsxs)(`p`,{className:`a-page-sub`,children:[g.length,` produits au catalogue`]})]}),(0,I.jsx)(`button`,{className:`a-btn-coral`,onClick:()=>{ce(!se),se&&(E(null),O({name:``,description:``,price:``,image_url:``,category:``,stock:``}),oe(``))},children:se?`✕ Fermer`:`+ Nouveau produit`})]}),se&&(0,I.jsxs)(`div`,{className:`a-form-card`,children:[(0,I.jsxs)(`div`,{className:`a-form-title`,children:[(0,I.jsx)(`div`,{className:`a-form-title-dot`}),T?`Modifier le produit`:`Ajouter un produit`]}),(0,I.jsxs)(`form`,{onSubmit:_e,children:[(0,I.jsxs)(`div`,{className:`a-form-grid`,children:[(0,I.jsxs)(`div`,{className:`a-field a-span2`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Nom du produit *`}),(0,I.jsx)(`input`,{className:`a-field-input`,type:`text`,placeholder:`Ex: Parfum Oud Royal 100ml`,value:D.name,onChange:e=>O({...D,name:e.target.value}),required:!0})]}),(0,I.jsxs)(`div`,{className:`a-field`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Catégorie`}),(0,I.jsxs)(`select`,{className:`a-field-input`,value:D.category,onChange:e=>O({...D,category:e.target.value}),children:[(0,I.jsx)(`option`,{value:``,children:`Sélectionner…`}),[`Homme`,`Femme`,`Unisex`,`Oud`].map(e=>(0,I.jsx)(`option`,{children:e},e))]})]}),(0,I.jsxs)(`div`,{className:`a-field`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Prix (MAD) *`}),(0,I.jsx)(`input`,{className:`a-field-input`,type:`number`,step:`1`,min:`0`,placeholder:`299`,value:D.price,onChange:e=>O({...D,price:e.target.value}),required:!0})]}),(0,I.jsxs)(`div`,{className:`a-field`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Stock`}),(0,I.jsx)(`input`,{className:`a-field-input`,type:`number`,min:`0`,placeholder:`50`,value:D.stock,onChange:e=>O({...D,stock:e.target.value})})]}),(0,I.jsxs)(`div`,{className:`a-field a-span3`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`URL image`}),(0,I.jsx)(`input`,{className:`a-field-input`,type:`text`,placeholder:`https://…`,value:D.image_url,onChange:e=>{O({...D,image_url:e.target.value}),oe(e.target.value)}}),j&&(0,I.jsx)(`img`,{src:j,alt:``,className:`a-img-preview`,onError:e=>e.target.style.display=`none`})]}),(0,I.jsxs)(`div`,{className:`a-field a-span3`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Description`}),(0,I.jsx)(`textarea`,{className:`a-field-input a-field-textarea`,placeholder:`Description du produit…`,value:D.description,onChange:e=>O({...D,description:e.target.value})})]})]}),(0,I.jsxs)(`div`,{className:`a-form-actions`,children:[(0,I.jsx)(`button`,{type:`submit`,className:`a-btn-coral`,disabled:m,children:m?(0,I.jsx)(`span`,{className:`a-spin`}):T?`💾 Enregistrer`:`+ Ajouter`}),(0,I.jsx)(`button`,{type:`button`,className:`a-btn-ghost`,onClick:()=>{ce(!1),E(null)},children:`Annuler`})]})]})]}),(0,I.jsxs)(`div`,{className:`a-card`,children:[(0,I.jsxs)(`div`,{className:`a-card-head`,children:[(0,I.jsxs)(`div`,{className:`a-card-title`,children:[`Catalogue (`,Se.length,`)`]}),(0,I.jsxs)(`div`,{className:`a-search`,children:[(0,I.jsx)(`span`,{className:`a-search-icon`,children:`⌕`}),(0,I.jsx)(`input`,{type:`text`,placeholder:`Rechercher…`,value:te,onChange:e=>{ne(e.target.value),A(1)}})]})]}),(0,I.jsx)(ub,{cols:[`Produit`,`Catégorie`,`Prix`,`Stock`,`Actions`],empty:{icon:`📦`,text:`Aucun produit`},rows:we.map(e=>[(0,I.jsxs)(`div`,{className:`a-prod-cell`,children:[e.image_url?(0,I.jsx)(`img`,{src:e.image_url,alt:e.name,className:`a-thumb`,onError:e=>e.target.style.display=`none`}):(0,I.jsx)(`div`,{className:`a-thumb-ph`,children:`🌸`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`a-fw5`,children:e.name}),e.description&&(0,I.jsxs)(`div`,{className:`a-text-sm`,children:[e.description.substring(0,42),`…`]})]})]}),(0,I.jsx)(`span`,{className:`a-cat-badge`,children:e.category||`Parfum`}),(0,I.jsxs)(`span`,{className:`a-coral-fw`,children:[fe(e.price),` MAD`]}),(0,I.jsxs)(`span`,{className:`a-stock-badge ${e.stock<5?`a-stock-low`:`a-stock-ok`}`,children:[(0,I.jsx)(`span`,{className:`a-status-dot`,style:{background:e.stock<5?`#F87171`:`#4ADE80`}}),e.stock,` unités`]}),(0,I.jsxs)(`div`,{className:`a-actions`,children:[(0,I.jsx)(`button`,{className:`a-icon-btn a-icon-edit`,onClick:()=>ye(e),children:`✎`}),(0,I.jsx)(`button`,{className:`a-icon-btn a-icon-del`,onClick:()=>ve(e.id,e.name),children:`🗑`})]})])}),Ce>1&&(0,I.jsxs)(`div`,{className:`a-pagination`,children:[(0,I.jsxs)(`span`,{className:`a-pagination-info`,children:[`Affichage `,(ae-1)*8+1,`–`,Math.min(ae*8,Se.length),` / `,Se.length]}),(0,I.jsxs)(`div`,{className:`a-pagination-btns`,children:[(0,I.jsx)(`button`,{className:`a-page-btn`,onClick:()=>A(e=>Math.max(1,e-1)),disabled:ae===1,children:`‹`}),Array.from({length:Math.min(5,Ce)},(e,t)=>{let n=ae<=3?t+1:ae-2+t;return n<1||n>Ce?null:(0,I.jsx)(`button`,{className:`a-page-btn ${n===ae?`a-page-btn--active`:``}`,onClick:()=>A(n),children:n},n)}),(0,I.jsx)(`button`,{className:`a-page-btn`,onClick:()=>A(e=>Math.min(Ce,e+1)),disabled:ae===Ce,children:`›`})]})]})]})]}),n===`orders`&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(`div`,{className:`a-page-head`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h1`,{className:`a-page-title`,children:`Commandes`}),(0,I.jsxs)(`p`,{className:`a-page-sub`,children:[y.length,` commandes au total`]})]}),(0,I.jsx)(`button`,{className:`a-btn-coral`,onClick:xe,children:`⬇ Exporter Excel`})]}),(0,I.jsx)(`div`,{className:`a-status-strip`,children:Object.entries(ob).map(([e,t])=>(0,I.jsxs)(`div`,{className:`a-status-pill`,style:{"--s-bg":t.bg,"--s-color":t.color},children:[(0,I.jsx)(`span`,{className:`a-status-dot`,style:{background:t.dot}}),t.label,` · `,(0,I.jsx)(`strong`,{children:y.filter(t=>t.status===e).length})]},e))}),(0,I.jsxs)(`div`,{className:`a-card`,children:[(0,I.jsxs)(`div`,{className:`a-card-head`,children:[(0,I.jsxs)(`div`,{className:`a-card-title`,children:[`Toutes les commandes (`,Te.length,`)`]}),(0,I.jsxs)(`div`,{className:`a-search`,children:[(0,I.jsx)(`span`,{className:`a-search-icon`,children:`⌕`}),(0,I.jsx)(`input`,{type:`text`,placeholder:`Rechercher…`,value:re,onChange:e=>ie(e.target.value)})]})]}),(0,I.jsx)(ub,{cols:[`Commande`,`Client`,`Articles`,`Total`,`Statut`,`Date`],empty:{icon:`📋`,text:`Aucune commande`},rows:Te.map(e=>{let t=ob[e.status]||ob.pending;return[(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`div`,{className:`a-id`,children:[`#`,e.id]}),e.customer_phone&&(0,I.jsxs)(`div`,{className:`a-text-xs`,children:[`📞 `,e.customer_phone]})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`a-fw5`,children:e.customer_name}),(0,I.jsx)(`div`,{className:`a-text-xs`,children:e.customer_email}),e.customer_address&&(0,I.jsxs)(`div`,{className:`a-text-xs`,children:[`📍 `,e.customer_address]})]}),(0,I.jsxs)(`div`,{className:`a-items-cell`,children:[e.items?.slice(0,2).map((e,t)=>(0,I.jsxs)(`div`,{className:`a-text-sm`,children:[e.product_name,` `,(0,I.jsxs)(`span`,{className:`a-gray`,children:[`×`,e.quantity]})]},t)),e.items?.length>2&&(0,I.jsxs)(`span`,{className:`a-more`,children:[`+`,e.items.length-2,` autres`]})]}),(0,I.jsxs)(`span`,{className:`a-coral-fw`,children:[fe(e.total_amount),` MAD`]}),(0,I.jsx)(`select`,{className:`a-status-select`,value:e.status,onChange:t=>be(e.id,t.target.value),style:{background:t.bg,color:t.color},children:Object.entries(ob).map(([e,t])=>(0,I.jsx)(`option`,{value:e,children:t.label},e))}),(0,I.jsx)(`span`,{className:`a-date`,children:new Date(e.created_at).toLocaleDateString(`fr-FR`)})]})})]})]}),n===`customers`&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`div`,{className:`a-page-head`,children:(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`h1`,{className:`a-page-title`,children:`Clients`}),(0,I.jsxs)(`p`,{className:`a-page-sub`,children:[x.length,` clients enregistrés`]})]})}),(0,I.jsxs)(`div`,{className:`a-card`,children:[(0,I.jsx)(`div`,{className:`a-card-head`,children:(0,I.jsx)(`div`,{className:`a-card-title`,children:`Base clients`})}),(0,I.jsx)(ub,{cols:[`Client`,`Email`,`Téléphone`,`Commandes`,`Total dépensé`],empty:{icon:`👥`,text:`Aucun client`},rows:x.map((e,t)=>{let n=y.filter(t=>t.customer_email===e.customer_email),r=n.reduce((e,t)=>e+Number(t.total_amount),0);return[(0,I.jsxs)(`div`,{className:`a-cust-cell`,children:[(0,I.jsx)(`div`,{className:`a-cust-avatar`,children:e.customer_name?.charAt(0)?.toUpperCase()}),(0,I.jsx)(`span`,{className:`a-fw5`,children:e.customer_name})]}),(0,I.jsx)(`span`,{className:`a-text-sm`,children:e.customer_email}),(0,I.jsx)(`span`,{className:`a-text-sm`,children:e.customer_phone||`—`}),(0,I.jsxs)(`span`,{className:`a-count-badge`,children:[n.length,` cmd`]}),(0,I.jsxs)(`span`,{className:`a-coral-fw`,children:[fe(r),` MAD`]})]})})]})]}),n===`delivery`&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`div`,{className:`a-page-head`,children:(0,I.jsx)(`h1`,{className:`a-page-title`,children:`Livraison`})}),(0,I.jsxs)(`div`,{className:`a-delivery-banner`,children:[(0,I.jsx)(`div`,{className:`a-delivery-icon-wrap`,children:`🚚`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`a-delivery-title`,children:`Livraison partout au Maroc`}),(0,I.jsx)(`div`,{className:`a-delivery-sub`,children:`Offerte dès 500 MAD · Délai 24-48h · Suivi en temps réel`})]}),(0,I.jsx)(`div`,{className:`a-delivery-active`,children:`● Actif`})]}),(0,I.jsxs)(`div`,{className:`a-card`,children:[(0,I.jsx)(`div`,{className:`a-card-head`,children:(0,I.jsx)(`div`,{className:`a-card-title`,children:`En cours de livraison`})}),(0,I.jsx)(ub,{cols:[`Commande`,`Client`,`Adresse`,`Statut`],empty:{icon:`🚚`,text:`Aucune livraison en cours`},rows:y.filter(e=>[`shipped`,`processing`].includes(e.status)).map(e=>{let t=ob[e.status];return[(0,I.jsxs)(`span`,{className:`a-id`,children:[`#`,e.id]}),(0,I.jsx)(`span`,{className:`a-fw5`,children:e.customer_name}),(0,I.jsx)(`span`,{className:`a-text-sm`,children:e.customer_address||`—`}),(0,I.jsx)(lb,{cfg:t})]})})]}),(0,I.jsxs)(`div`,{className:`a-card`,style:{marginTop:18,padding:24},children:[(0,I.jsx)(`div`,{className:`a-card-title`,style:{marginBottom:14},children:`🇲🇦 Zones desservies`}),(0,I.jsx)(`div`,{className:`a-zones`,children:[`Casablanca`,`Rabat`,`Marrakech`,`Fès`,`Tanger`,`Agadir`,`Tétouan`,`Meknès`,`Oujda`,`El Jadida`,`Settat`,`Khouribga`,`Béni Mellal`,`Kénitra`,`Laâyoune`].map(e=>(0,I.jsx)(`span`,{className:`a-zone-chip`,children:e},e))})]})]}),n===`settings`&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`div`,{className:`a-page-head`,children:(0,I.jsx)(`h1`,{className:`a-page-title`,children:`Paramètres`})}),(0,I.jsxs)(`div`,{className:`a-form-card`,style:{maxWidth:560},children:[(0,I.jsxs)(`div`,{className:`a-form-title`,children:[(0,I.jsx)(`div`,{className:`a-form-title-dot`}),`Informations de la boutique`]}),(0,I.jsxs)(`div`,{className:`a-form-grid`,style:{gridTemplateColumns:`1fr 1fr`},children:[[{label:`Nom de la boutique`,type:`text`,value:`Nahid Perfume`,span:2},{label:`Email admin`,type:`email`,value:`admin@nahidperfume.com`,span:1},{label:`Téléphone`,type:`text`,value:`+212 6 00 00 00 00`,span:1},{label:`Ville`,type:`text`,value:`Casablanca, Maroc`,span:1}].map((e,t)=>(0,I.jsxs)(`div`,{className:`a-field ${e.span===2?`a-span2`:``}`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:e.label}),(0,I.jsx)(`input`,{className:`a-field-input`,type:e.type,defaultValue:e.value})]},t)),(0,I.jsxs)(`div`,{className:`a-field`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Devise`}),(0,I.jsxs)(`select`,{className:`a-field-input`,defaultValue:`MAD`,children:[(0,I.jsx)(`option`,{children:`MAD`}),(0,I.jsx)(`option`,{children:`EUR`}),(0,I.jsx)(`option`,{children:`USD`})]})]})]}),(0,I.jsx)(`div`,{className:`a-form-actions`,children:(0,I.jsx)(`button`,{className:`a-btn-coral`,children:`💾 Sauvegarder`})})]})]})]})]})]})]}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`style`,{children:db}),(0,I.jsxs)(`div`,{className:`a-login`,children:[(0,I.jsx)(`div`,{className:`a-petal a-petal-1`}),(0,I.jsx)(`div`,{className:`a-petal a-petal-2`}),(0,I.jsx)(`div`,{className:`a-petal a-petal-3`}),(0,I.jsxs)(`div`,{className:`a-login-card`,children:[(0,I.jsx)(`div`,{className:`a-login-mark`,children:`N`}),(0,I.jsx)(`h1`,{className:`a-login-title`,children:`Espace Admin`}),(0,I.jsx)(`p`,{className:`a-login-sub`,children:`Nahid Perfume · Tableau de bord`}),(0,I.jsxs)(`form`,{onSubmit:he,className:`a-login-form`,children:[(0,I.jsxs)(`div`,{className:`a-field`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Identifiant`}),(0,I.jsx)(`input`,{className:`a-field-input`,type:`text`,placeholder:`admin`,value:c,onChange:e=>l(e.target.value),required:!0})]}),(0,I.jsxs)(`div`,{className:`a-field`,children:[(0,I.jsx)(`label`,{className:`a-field-label`,children:`Mot de passe`}),(0,I.jsx)(`input`,{className:`a-field-input`,type:`password`,placeholder:`••••••••`,value:u,onChange:e=>d(e.target.value),required:!0})]}),f&&(0,I.jsx)(`div`,{className:`a-login-err`,children:f}),(0,I.jsx)(`button`,{className:`a-btn-coral a-btn-full`,type:`submit`,disabled:m,children:m?(0,I.jsx)(`span`,{className:`a-spin`}):`Se connecter →`})]})]})]})]})},lb=({cfg:e})=>(0,I.jsxs)(`span`,{className:`a-status-badge`,style:{"--s-bg":e.bg,"--s-color":e.color},children:[(0,I.jsx)(`span`,{className:`a-status-dot`,style:{background:e.dot}}),e.label]}),ub=({cols:e,rows:t,empty:n})=>(0,I.jsx)(`div`,{className:`a-table-wrap`,children:t.length===0?(0,I.jsxs)(`div`,{className:`a-empty`,children:[(0,I.jsx)(`div`,{className:`a-empty-icon`,children:n.icon}),(0,I.jsx)(`p`,{children:n.text})]}):(0,I.jsxs)(`table`,{className:`a-table`,children:[(0,I.jsx)(`thead`,{children:(0,I.jsx)(`tr`,{children:e.map(e=>(0,I.jsx)(`th`,{children:e},e))})}),(0,I.jsx)(`tbody`,{children:t.map((e,t)=>(0,I.jsx)(`tr`,{style:{animationDelay:`${t*.03}s`},children:e.map((e,t)=>(0,I.jsx)(`td`,{children:e},t))},t))})]})}),db=`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500&display=swap');

/* ── Tokens ──────────────────────────────── */
:root {
  --coral:    #EF776A;
  --coral-d:  #D4574A;
  --coral-xl: #FFF4F2;
  --coral-l:  #FFE8E5;
  --white:    #FFFFFF;
  --bg:       #F8F5F3;
  --border:   #EDE8E5;
  --ink:      #1C1917;
  --ink2:     #57534E;
  --ink3:     #A8A29E;
  --sidebar:  260px;
  --radius:   16px;
  --ease:     cubic-bezier(0.16,1,0.3,1);
  --ff:       'DM Sans', sans-serif;
  --ff-d:     'Playfair Display', serif;
  --shadow:   0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.05);
  --shadow-h: 0 4px 16px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.07);
}

/* ── Reset ───────────────────────────────── */
.a-root *, .a-root *::before, .a-root *::after,
.a-login *, .a-login *::before, .a-login *::after { box-sizing:border-box; margin:0; padding:0; }
.a-root, .a-login { font-family: var(--ff); color: var(--ink); }
button { font-family: var(--ff); cursor: pointer; }
input, select, textarea { font-family: var(--ff); }

/* ══════════════════════════════════════════
   LOGIN
══════════════════════════════════════════ */
.a-login {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Decorative petals */
.a-petal {
  position: absolute;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%;
  background: var(--coral);
  opacity: 0.06;
  pointer-events: none;
  animation: a-petal-drift 12s ease-in-out infinite;
}
.a-petal-1 { width:420px;height:420px; top:-160px;right:-120px; animation-delay:0s; }
.a-petal-2 { width:280px;height:280px; bottom:-80px;left:-80px; animation-delay:-5s; opacity:0.04; }
.a-petal-3 { width:160px;height:160px; top:40%;left:60%; animation-delay:-9s; opacity:0.05; }
@keyframes a-petal-drift { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(12deg) scale(1.05)} }

.a-login-card {
  position: relative;
  z-index: 2;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 52px 44px;
  width: 100%;
  max-width: 420px;
  margin: 24px;
  box-shadow: var(--shadow-h);
  animation: a-slide-up 0.6s var(--ease);
}
@keyframes a-slide-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

.a-login-mark {
  width: 60px; height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--coral), var(--coral-d));
  color: white;
  font-size: 26px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 22px;
  box-shadow: 0 8px 24px rgba(239,119,106,0.35);
}
.a-login-title { font-family: var(--ff-d); font-size: 26px; text-align:center; color:var(--ink); font-weight:500; margin-bottom:6px; }
.a-login-sub   { font-size:13px; color:var(--ink3); text-align:center; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:32px; }
.a-login-form  { display:flex; flex-direction:column; gap:14px; }
.a-login-err   { background:#FEF2F2; border:1px solid #FECACA; color:#991B1B; padding:11px 14px; border-radius:10px; font-size:13px; text-align:center; }
.a-login-hint  { font-size:11px; color:var(--ink3); text-align:center; margin-top:20px; letter-spacing:0.04em; }

/* ══════════════════════════════════════════
   ROOT LAYOUT
══════════════════════════════════════════ */
.a-root   { display:flex; min-height:100vh; background:var(--bg); }
.a-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.25);z-index:49;backdrop-filter:blur(3px); }

/* ══════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════ */
.a-sidebar {
  position: fixed;
  top:0; left:0;
  width: var(--sidebar);
  height: 100vh;
  background: var(--white);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s var(--ease);
  overflow: hidden;
}
.a-sidebar--closed { transform: translateX(-100%); }

/* Thin coral accent bar on the right edge */
.a-sidebar-accent {
  position: absolute;
  top: 0; right: 0;
  width: 3px; height: 100%;
  background: linear-gradient(to bottom, var(--coral) 0%, transparent 100%);
  opacity: 0.35;
  pointer-events: none;
}

.a-sidebar-top {
  padding: 22px 18px 18px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 12px;
}
.a-sidebar-logo { display:flex;align-items:center;gap:12px;flex:1;min-width:0; }
.a-logo-mark {
  width:36px;height:36px;border-radius:11px;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white;font-size:16px;font-weight:700;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
  box-shadow:0 4px 12px rgba(239,119,106,0.3);
}
.a-logo-name { font-size:14px;font-weight:600;color:var(--ink);line-height:1.2; }
.a-logo-sub  { font-size:10px;color:var(--ink3);letter-spacing:0.05em;text-transform:uppercase; }
.a-sidebar-close {
  background:none;border:none;color:var(--ink3);font-size:14px;padding:4px;
  border-radius:6px;transition:all 0.15s;display:none;
}
.a-sidebar-close:hover { background:var(--bg);color:var(--ink); }

.a-nav { flex:1;padding:12px 10px;overflow-y:auto;display:flex;flex-direction:column;gap:2px; }
.a-nav-group-label { font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--ink3);padding:10px 10px 6px; }

.a-nav-item {
  display:flex;align-items:center;gap:10px;
  padding:10px 14px;border-radius:12px;
  border:none;background:none;
  font-size:13.5px;font-weight:500;color:var(--ink2);
  width:100%;text-align:left;
  transition:all 0.18s;position:relative;
  cursor:pointer;
}
.a-nav-item:hover { background:var(--coral-xl);color:var(--coral); }
.a-nav-item--active {
  background: var(--coral-l);
  color: var(--coral);
  font-weight: 600;
}
.a-nav-item--active::before {
  content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:3px;height:20px;background:var(--coral);border-radius:0 3px 3px 0;
}
.a-nav-icon { font-size:15px;width:18px;text-align:center;flex-shrink:0; }
.a-nav-badge {
  margin-left:auto;background:var(--coral);color:white;
  border-radius:20px;font-size:10px;padding:2px 7px;font-weight:700;
}
.a-sidebar-foot { padding:14px 10px;border-top:1px solid var(--border); }
.a-logout {
  display:flex;align-items:center;gap:10px;
  padding:10px 14px;border-radius:12px;
  border:none;background:none;
  font-size:13px;font-weight:500;color:#C0897E;
  width:100%;cursor:pointer;transition:all 0.18s;
}
.a-logout:hover { background:#FEF2F2;color:#B91C1C; }

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
.a-main {
  flex:1;
  transition:margin-left 0.3s var(--ease);
  min-width:0;
}
.a-main--pushed { margin-left:var(--sidebar); }

/* ── Topbar ──────────────────────────────── */
.a-topbar {
  position:sticky;top:0;z-index:40;
  background:rgba(255,255,255,0.88);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
  height:60px;padding:0 24px;
  display:flex;align-items:center;gap:14px;
}
.a-menu-btn {
  width:36px;height:36px;border:none;background:none;
  border-radius:10px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:4px;
  transition:background 0.15s;flex-shrink:0;
}
.a-menu-btn:hover { background:var(--bg); }
.a-menu-btn span { display:block;width:16px;height:1.5px;background:var(--ink2);border-radius:2px;transition:all 0.2s; }
.a-topbar-title { font-family:var(--ff-d);font-size:17px;font-weight:500;color:var(--ink); }
.a-topbar-right { margin-left:auto;display:flex;align-items:center;gap:10px; }
.a-topbar-avatar {
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white;font-size:12px;font-weight:700;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
}

/* ── Content ─────────────────────────────── */
.a-content { padding:28px;max-width:1400px; }

/* ── Notification ────────────────────────── */
.a-notif {
  position:fixed;top:72px;right:24px;z-index:9999;
  display:flex;align-items:center;gap:10px;
  padding:13px 20px;border-radius:14px;
  font-size:14px;font-weight:500;
  box-shadow:var(--shadow-h);
  animation:a-notif-in 0.35s var(--ease);
  max-width:340px;
}
@keyframes a-notif-in { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
.a-notif--ok  { background:#F0FDF4;color:#166534;border:1px solid #BBF7D0; }
.a-notif--err { background:#FEF2F2;color:#991B1B;border:1px solid #FECACA; }

/* ── Page header ─────────────────────────── */
.a-page-head { display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;flex-wrap:wrap;gap:12px; }
.a-page-title { font-family:var(--ff-d);font-size:26px;font-weight:500;color:var(--ink);line-height:1.2; }
.a-page-sub   { font-size:13px;color:var(--ink3);margin-top:4px; }

/* ── KPI Cards ───────────────────────────── */
.a-kpi-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px; }
.a-kpi {
  background:var(--white);
  border:1px solid var(--kpi-border);
  border-radius:var(--radius);
  padding:22px 20px;
  box-shadow:var(--shadow);
  cursor:default;
  animation:a-kpi-in 0.5s var(--ease) both;
  position:relative;
  overflow:hidden;
  transition:transform 0.2s var(--ease), box-shadow 0.2s;
}
.a-kpi::before {
  content:'';position:absolute;top:-30px;right:-30px;
  width:80px;height:80px;border-radius:50%;
  background:var(--kpi-bg);
  opacity:0.8;
  pointer-events:none;
}
.a-kpi:hover { transform:translateY(-3px);box-shadow:var(--shadow-h); }
@keyframes a-kpi-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.a-kpi-icon  { font-size:22px;margin-bottom:12px; }
.a-kpi-value { font-family:var(--ff-d);font-size:26px;font-weight:400;color:var(--ink);line-height:1;margin-bottom:6px; }
.a-kpi-label { font-size:12px;font-weight:500;color:var(--ink3);letter-spacing:0.03em; }

/* ── Status strip ────────────────────────── */
.a-status-strip { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px; }
.a-status-pill {
  display:flex;align-items:center;gap:6px;
  padding:7px 14px;border-radius:999px;
  background:var(--s-bg);color:var(--s-color);
  font-size:12px;font-weight:500;
  border:1px solid color-mix(in srgb, var(--s-color) 15%, transparent);
}
.a-status-dot { width:7px;height:7px;border-radius:50%;flex-shrink:0; }

/* ── Card ────────────────────────────────── */
.a-card {
  background:var(--white);
  border:1px solid var(--border);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  overflow:hidden;
  margin-bottom:20px;
  transition:box-shadow 0.2s;
}
.a-card-head {
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 22px;
  border-bottom:1px solid var(--border);
  flex-wrap:wrap;gap:12px;
}
.a-card-title { font-size:15px;font-weight:600;color:var(--ink); }

/* ── Table ───────────────────────────────── */
.a-table-wrap { overflow-x:auto; }
.a-table { width:100%;border-collapse:collapse;font-size:14px; }
.a-table thead tr { background:#FDFCFC; }
.a-table thead th {
  padding:12px 20px;text-align:left;
  font-size:10px;font-weight:700;color:var(--ink3);
  letter-spacing:0.1em;text-transform:uppercase;
  border-bottom:1px solid var(--border);white-space:nowrap;
}
.a-table tbody tr {
  border-bottom:1px solid #F5F2F0;
  transition:background 0.15s;
  animation:a-row-in 0.35s var(--ease) both;
}
@keyframes a-row-in { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
.a-table tbody tr:last-child { border-bottom:none; }
.a-table tbody tr:hover { background:#FDFAF8; }
.a-table tbody td { padding:14px 20px;vertical-align:middle; }

/* ── Table cell helpers ──────────────────── */
.a-id        { font-weight:600;color:var(--ink3);font-size:13px; }
.a-fw5       { font-weight:500; }
.a-coral-fw  { font-weight:600;color:var(--coral); }
.a-date      { font-size:12px;color:var(--ink3);white-space:nowrap; }
.a-text-sm   { font-size:12px;color:var(--ink3);margin-top:2px; }
.a-text-xs   { font-size:11px;color:var(--ink3);margin-top:2px; }
.a-gray      { color:var(--ink3); }
.a-more      { font-size:11px;color:var(--coral); }
.a-items-cell { max-width:180px; }

.a-prod-cell { display:flex;align-items:center;gap:12px; }
.a-thumb { width:44px;height:44px;border-radius:10px;object-fit:cover;border:1px solid var(--border); }
.a-thumb-ph { width:44px;height:44px;border-radius:10px;background:var(--coral-xl);display:flex;align-items:center;justify-content:center;font-size:18px;border:1px solid var(--coral-l); }

.a-cust-cell { display:flex;align-items:center;gap:10px; }
.a-cust-avatar {
  width:36px;height:36px;border-radius:50%;
  background:linear-gradient(135deg,var(--coral),var(--coral-d));
  color:white;font-weight:700;font-size:14px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}

/* ── Badges ──────────────────────────────── */
.a-status-badge {
  display:inline-flex;align-items:center;gap:5px;
  padding:4px 11px;border-radius:20px;
  background:var(--s-bg);color:var(--s-color);
  font-size:12px;font-weight:500;white-space:nowrap;
}
.a-cat-badge    { background:var(--coral-xl);color:var(--coral);padding:4px 11px;border-radius:20px;font-size:12px;font-weight:500; }
.a-count-badge  { background:#F0F4FF;color:#4F46E5;padding:4px 11px;border-radius:20px;font-size:12px;font-weight:500; }
.a-stock-badge  { display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:20px;font-size:12px;font-weight:500; }
.a-stock-ok  { background:#F0FDF4;color:#166534; }
.a-stock-low { background:#FEF2F2;color:#991B1B; }

/* ── Status select ───────────────────────── */
.a-status-select {
  padding:5px 12px;border-radius:20px;
  border:none;cursor:pointer;outline:none;
  font-size:12px;font-weight:500;
  font-family:var(--ff);transition:all 0.15s;
}

/* ── Actions ─────────────────────────────── */
.a-actions { display:flex;gap:6px; }
.a-icon-btn {
  width:32px;height:32px;border-radius:9px;
  border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:13px;transition:all 0.15s;
}
.a-icon-edit { background:#EFF6FF;color:#3B82F6; }
.a-icon-edit:hover { background:#DBEAFE;transform:scale(1.1); }
.a-icon-del  { background:#FEF2F2;color:#EF4444; }
.a-icon-del:hover  { background:#FEE2E2;transform:scale(1.1); }

/* ── Pagination ──────────────────────────── */
.a-pagination { display:flex;align-items:center;justify-content:space-between;padding:14px 22px;border-top:1px solid var(--border);flex-wrap:wrap;gap:10px; }
.a-pagination-info { font-size:12px;color:var(--ink3); }
.a-pagination-btns { display:flex;gap:6px; }
.a-page-btn {
  width:32px;height:32px;border-radius:9px;
  border:1px solid var(--border);background:white;
  cursor:pointer;font-size:13px;font-weight:500;color:var(--ink2);
  transition:all 0.15s;display:flex;align-items:center;justify-content:center;
  font-family:var(--ff);
}
.a-page-btn:hover:not(:disabled) { background:var(--coral-xl);border-color:var(--coral-l);color:var(--coral); }
.a-page-btn--active { background:var(--coral);border-color:var(--coral);color:white; }
.a-page-btn:disabled { opacity:0.35;cursor:not-allowed; }

/* ── Empty state ─────────────────────────── */
.a-empty { text-align:center;padding:56px 20px;color:var(--ink3); }
.a-empty-icon { font-size:36px;margin-bottom:12px;opacity:0.5; }

/* ── Search ──────────────────────────────── */
.a-search {
  display:flex;align-items:center;gap:8px;
  background:var(--bg);border:1px solid var(--border);
  border-radius:40px;padding:8px 16px;
  transition:border-color 0.15s;
}
.a-search:focus-within { border-color:var(--coral); }
.a-search-icon { font-size:14px;color:var(--ink3); }
.a-search input { border:none;background:none;outline:none;font-size:13px;color:var(--ink);font-family:var(--ff);min-width:160px; }
.a-search input::placeholder { color:var(--ink3); }

/* ── Buttons ─────────────────────────────── */
.a-btn-coral {
  display:inline-flex;align-items:center;justify-content:center;gap:7px;
  background:var(--coral);color:white;border:none;
  padding:10px 22px;border-radius:40px;
  font-size:13.5px;font-weight:600;
  cursor:pointer;transition:all 0.2s var(--ease);
  box-shadow:0 4px 16px rgba(239,119,106,0.3);
  white-space:nowrap;
}
.a-btn-coral:hover:not(:disabled) { background:var(--coral-d);transform:translateY(-1px);box-shadow:0 6px 22px rgba(239,119,106,0.4); }
.a-btn-coral:active { transform:none; }
.a-btn-coral:disabled { opacity:0.6;cursor:not-allowed; }
.a-btn-full { width:100%;margin-top:4px; }

.a-btn-ghost {
  background:none;border:1px solid var(--border);color:var(--ink2);
  padding:9px 18px;border-radius:40px;font-size:13px;font-weight:500;
  cursor:pointer;transition:all 0.15s;white-space:nowrap;
}
.a-btn-ghost:hover { background:var(--bg);border-color:var(--coral-l);color:var(--coral); }

/* ── Form card ───────────────────────────── */
.a-form-card {
  background:var(--white);border:1px solid var(--border);
  border-radius:var(--radius);padding:26px 28px;
  box-shadow:var(--shadow);margin-bottom:20px;
  animation:a-form-in 0.4s var(--ease);
}
@keyframes a-form-in { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

.a-form-title {
  display:flex;align-items:center;gap:10px;
  font-size:15px;font-weight:600;color:var(--ink);
  margin-bottom:22px;
}
.a-form-title-dot {
  width:10px;height:10px;border-radius:50%;
  background:var(--coral);flex-shrink:0;
  box-shadow:0 0 0 3px rgba(239,119,106,0.2);
  animation:a-dot-pulse 2.5s ease-in-out infinite;
}
@keyframes a-dot-pulse { 0%,100%{box-shadow:0 0 0 3px rgba(239,119,106,0.2)} 50%{box-shadow:0 0 0 6px rgba(239,119,106,0.1)} }

.a-form-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px; }
.a-span2 { grid-column:span 2; }
.a-span3 { grid-column:span 3; }

/* ── Fields ──────────────────────────────── */
.a-field { display:flex;flex-direction:column;gap:6px; }
.a-field-label { font-size:11.5px;font-weight:600;color:var(--ink2);letter-spacing:0.04em; }
.a-field-input {
  padding:11px 14px;
  border:1.5px solid var(--border);
  border-radius:12px;font-size:14px;color:var(--ink);
  background:white;outline:none;
  transition:border-color 0.2s,box-shadow 0.2s;
  width:100%;
}
.a-field-input:focus {
  border-color:var(--coral);
  box-shadow:0 0 0 3px rgba(239,119,106,0.12);
}
.a-field-input::placeholder { color:var(--ink3); }
.a-field-textarea { min-height:90px;resize:vertical; }
.a-img-preview { width:72px;height:72px;object-fit:cover;border-radius:10px;border:1px solid var(--border);margin-top:10px; }

.a-form-actions { display:flex;gap:10px;padding-top:4px; }

/* ── Delivery ────────────────────────────── */
.a-delivery-banner {
  background:linear-gradient(135deg,var(--coral-xl),white);
  border:1px solid var(--coral-l);
  border-radius:var(--radius);padding:24px 28px;
  display:flex;align-items:center;gap:20px;
  margin-bottom:20px;flex-wrap:wrap;
  position:relative;overflow:hidden;
}
.a-delivery-banner::after {
  content:'✦';position:absolute;right:28px;bottom:-8px;
  font-size:80px;color:var(--coral);opacity:0.06;
  pointer-events:none;
}
.a-delivery-icon-wrap { font-size:32px;flex-shrink:0; }
.a-delivery-title { font-family:var(--ff-d);font-size:18px;font-weight:500;color:var(--ink); }
.a-delivery-sub   { font-size:13px;color:var(--ink3);margin-top:3px; }
.a-delivery-active {
  margin-left:auto;background:white;color:#166534;
  border:1px solid #BBF7D0;padding:7px 16px;
  border-radius:40px;font-size:12px;font-weight:600;flex-shrink:0;
}

.a-zones { display:flex;flex-wrap:wrap;gap:8px; }
.a-zone-chip {
  background:var(--coral-xl);color:var(--coral);
  border:1px solid var(--coral-l);
  padding:6px 14px;border-radius:40px;font-size:12px;font-weight:500;
  transition:all 0.15s;cursor:default;
}
.a-zone-chip:hover { background:var(--coral-l);transform:translateY(-1px); }

/* ── Spinner ─────────────────────────────── */
.a-spin {
  display:inline-block;width:16px;height:16px;
  border:2px solid rgba(255,255,255,0.4);
  border-top-color:white;border-radius:50%;
  animation:a-spin 0.7s linear infinite;
}
@keyframes a-spin { to{transform:rotate(360deg)} }

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width:1280px) {
  .a-kpi-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:1024px) {
  .a-main--pushed { margin-left:0 !important; }
  .a-sidebar-close { display:flex !important; }
  .a-content { padding:18px; }
  .a-form-grid { grid-template-columns:1fr 1fr; }
  .a-span3 { grid-column:span 2; }
}
@media (max-width:768px) {
  .a-kpi-grid { grid-template-columns:1fr 1fr;gap:12px; }
  .a-form-grid { grid-template-columns:1fr; }
  .a-span2,.a-span3 { grid-column:span 1; }
  .a-content { padding:14px; }
  .a-topbar { padding:0 14px; }
  .a-page-head { flex-direction:column;align-items:flex-start; }
  .a-card-head { flex-direction:column;align-items:flex-start; }
  .a-table thead th:nth-child(n+4) { display:none; }
  .a-table tbody td:nth-child(n+4) { display:none; }
}
@media (max-width:480px) {
  .a-kpi-grid { grid-template-columns:1fr 1fr;gap:10px; }
  .a-kpi { padding:16px 14px; }
  .a-kpi-value { font-size:20px; }
  .a-status-strip { gap:6px; }
  .a-status-pill { font-size:11px;padding:5px 10px; }
  .a-login-card { padding:36px 24px; }
  .a-btn-coral { padding:9px 18px;font-size:13px; }
}
`,fb=`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --ink:         #0E0E0C;
    --cream:       #FAF8F5;
    --sand:        #EDE9E1;
    --white:       #FFFFFF;
    --coral:       #EF776A;
    --coral-dark:  #D35F52;
    --gold:        #C9A96E;
    --gold-light:  #F0E2C4;
    --muted:       #7A7770;
    --border:      rgba(14,14,12,0.09);
    --border-focus:rgba(239,119,106,0.5);
    --sans:        'Poppins', sans-serif;
    --serif:       'Cormorant Garamond', Georgia, serif;
    --ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --r-lg:        18px;
    --r-xl:        26px;
  }

  /* ── Animations ── */
  @keyframes coFadeUp   { from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);} }
  @keyframes coSlideIn  { from{opacity:0;transform:translateX(-24px);} to{opacity:1;transform:translateX(0);} }
  @keyframes coSlideR   { from{opacity:0;transform:translateX(24px);} to{opacity:1;transform:translateX(0);} }
  @keyframes coPop      { from{opacity:0;transform:scale(0.8);} to{opacity:1;transform:scale(1);} }
  @keyframes coShimmer  { 0%{opacity:0.6;} 50%{opacity:1;} 100%{opacity:0.6;} }
  @keyframes coSpin     { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes coSuccess  { 0%{transform:scale(0);opacity:0;} 60%{transform:scale(1.15);} 100%{transform:scale(1);opacity:1;} }
  @keyframes coCheckmark{ to{stroke-dashoffset:0;} }
  @keyframes coFloat    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  @keyframes coPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);} 50%{box-shadow:0 0 0 10px rgba(239,119,106,0.12);} }
  @keyframes coBarFill  { from{width:0;} }
  @keyframes coItemIn   { from{opacity:0;transform:translateX(16px);} to{opacity:1;transform:translateX(0);} }
  @keyframes coBadgePop { from{transform:scale(0) rotate(-10deg);} to{transform:scale(1) rotate(0deg);} }

  /* ── Page ── */
  .co-page {
    background: var(--cream);
    min-height: 100vh;
    padding: clamp(40px, 7vw, 90px) 0 clamp(60px, 8vw, 120px);
    font-family: var(--sans);
    position: relative;
    overflow: hidden;
  }
  .co-page::before {
    content: '';
    position: absolute;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(239,119,106,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .co-page::after {
    content: '';
    position: absolute;
    bottom: -150px; left: -150px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Breadcrumb ── */
  .co-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 36px;
    animation: coFadeUp 0.5s var(--ease) both;
  }
  .co-breadcrumb a {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .co-breadcrumb a:hover { color: var(--coral); }
  .co-breadcrumb span { font-size: 0.72rem; color: var(--border); }
  .co-breadcrumb .active {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--coral);
  }

  /* ── Page Header ── */
  .co-header {
    margin-bottom: clamp(32px, 5vw, 52px);
    animation: coFadeUp 0.6s var(--ease) 0.05s both;
  }
  .co-header-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .co-header-eyebrow::before {
    content: '';
    display: block;
    width: 28px; height: 1px;
    background: var(--gold);
  }
  .co-title {
    font-family: var(--sans);
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 8px;
  }
  .co-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    color: var(--coral);
    font-size: 1.1em;
  }
  .co-subtitle {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.02em;
  }

  /* ── Steps Indicator ── */
  .co-steps {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: clamp(32px, 5vw, 52px);
    animation: coFadeUp 0.6s var(--ease) 0.1s both;
  }
  .co-step {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  .co-step-circle {
    width: 34px; height: 34px;
    border-radius: 50%;
    border: 2px solid var(--border);
    background: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--muted);
    transition: all 0.3s var(--ease-spring);
    flex-shrink: 0;
  }
  .co-step.done .co-step-circle {
    background: var(--coral);
    border-color: var(--coral);
    color: white;
  }
  .co-step.active .co-step-circle {
    background: var(--ink);
    border-color: var(--ink);
    color: white;
    animation: coPulse 2s ease infinite;
  }
  .co-step-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
  }
  .co-step.active .co-step-label { color: var(--ink); }
  .co-step.done .co-step-label { color: var(--coral); }
  .co-step-line {
    flex: 1;
    height: 2px;
    background: var(--border);
    margin: 0 16px;
    position: relative;
    overflow: hidden;
    border-radius: 1px;
  }
  .co-step-line.filled::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, var(--coral), var(--gold));
    animation: coBarFill 0.6s var(--ease) both;
  }

  /* ── Main Layout ── */
  .co-layout {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: clamp(20px, 3vw, 40px);
    align-items: start;
    position: relative;
    z-index: 1;
  }

  /* ── Form Panel ── */
  .co-form-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .co-card {
    background: var(--white);
    border-radius: var(--r-xl);
    border: 1px solid var(--border);
    overflow: hidden;
    transition: box-shadow 0.3s;
  }
  .co-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.06); }

  .co-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 22px 28px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(to right, var(--cream), white);
  }
  .co-card-icon {
    width: 38px; height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--coral), var(--coral-dark));
    color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(239,119,106,0.3);
  }
  .co-card-title {
    font-family: var(--sans);
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .co-card-sub {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted);
    margin-top: 1px;
  }
  .co-card-body { padding: 28px; }

  /* ── Form Fields ── */
  .co-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .co-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .co-field:last-child { margin-bottom: 0; }

  .co-label {
    font-family: var(--sans);
    font-size: 0.67rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .co-label span { color: var(--coral); margin-left: 2px; }

  .co-input-wrap { position: relative; }
  .co-input-icon {
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    font-size: 0.95rem;
    pointer-events: none;
    opacity: 0.5;
  }
  .co-input, .co-textarea {
    width: 100%;
    padding: 14px 16px 14px 42px;
    border: 1.5px solid var(--border);
    border-radius: 14px;
    font-family: var(--sans);
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--ink);
    background: var(--cream);
    outline: none;
    transition: border-color 0.2s var(--ease), background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    -webkit-appearance: none;
  }
  .co-input:focus, .co-textarea:focus {
    border-color: var(--coral);
    background: white;
    box-shadow: 0 0 0 4px rgba(239,119,106,0.1);
  }
  .co-input::placeholder, .co-textarea::placeholder {
    color: rgba(14,14,12,0.3);
    font-weight: 400;
  }
  .co-textarea {
    resize: vertical;
    min-height: 110px;
    padding-top: 14px;
    line-height: 1.6;
  }
  /* textarea icon at top */
  .co-textarea-wrap .co-input-icon { top: 18px; transform: none; }

  /* floating label effect */
  .co-input:not(:placeholder-shown) + .co-input-valid,
  .co-textarea:not(:placeholder-shown) + .co-input-valid {
    opacity: 1;
  }
  .co-input-valid {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    color: #2E7D32;
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  /* ── Secure Badge ── */
  .co-secure-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    background: linear-gradient(135deg, rgba(46,125,50,0.06), rgba(46,125,50,0.03));
    border: 1px solid rgba(46,125,50,0.15);
    border-radius: 12px;
    margin-bottom: 20px;
  }
  .co-secure-badge span:first-child { font-size: 1.1rem; }
  .co-secure-text {
    font-size: 0.72rem;
    font-weight: 600;
    color: #2E7D32;
    letter-spacing: 0.02em;
  }

  /* ── Submit Button ── */
  .co-submit {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, var(--coral) 0%, var(--coral-dark) 100%);
    color: white;
    border: none;
    border-radius: 999px;
    font-family: var(--sans);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s var(--ease-spring), box-shadow 0.2s;
    box-shadow: 0 8px 28px rgba(239,119,106,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
  }
  .co-submit::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .co-submit:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 16px 40px rgba(239,119,106,0.5);
  }
  .co-submit:hover::before { opacity: 1; }
  .co-submit:active:not(:disabled) { transform: scale(0.98); }
  .co-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  .co-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: coSpin 0.7s linear infinite;
  }

  /* ── Summary Panel ── */
  .co-summary-panel {
    position: sticky;
    top: 88px;
    animation: coSlideR 0.7s var(--ease) 0.2s both;
  }

  .co-summary-card {
    background: var(--white);
    border-radius: var(--r-xl);
    border: 1px solid var(--border);
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  }

  .co-summary-head {
    padding: 22px 26px 18px;
    border-bottom: 1px solid var(--border);
    background: var(--ink);
  }
  .co-summary-head-title {
    font-family: var(--sans);
    font-size: 0.82rem;
    font-weight: 800;
    color: white;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .co-summary-head-count {
    font-size: 0.68rem;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.06em;
  }

  /* Items list */
  .co-summary-items {
    padding: 16px 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 280px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }
  .co-summary-items::-webkit-scrollbar { width: 3px; }
  .co-summary-items::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .co-summary-item {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: coItemIn 0.3s var(--ease) both;
  }
  .co-si-img-wrap {
    position: relative;
    flex-shrink: 0;
    width: 50px; height: 50px;
  }
  .co-si-img {
    width: 50px; height: 50px;
    border-radius: 12px;
    object-fit: cover;
    background: var(--sand);
    display: block;
  }
  .co-si-qty {
    position: absolute;
    top: -5px; right: -5px;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--coral);
    color: white;
    font-size: 0.6rem;
    font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    animation: coBadgePop 0.3s var(--ease-spring) both;
  }
  .co-si-info {
    flex: 1;
    min-width: 0;
  }
  .co-si-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.01em;
  }
  .co-si-cat {
    font-size: 0.62rem;
    font-weight: 600;
    color: var(--coral);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 2px;
  }
  .co-si-price {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--ink);
    flex-shrink: 0;
    letter-spacing: -0.01em;
  }

  /* Totals area */
  .co-totals {
    padding: 16px 26px 24px;
    border-top: 1px solid var(--border);
    background: var(--cream);
  }
  .co-totals-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .co-totals-label {
    font-size: 0.76rem;
    font-weight: 500;
    color: var(--muted);
  }
  .co-totals-val {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--ink);
  }
  .co-totals-val.free { color: #2E7D32; }
  .co-totals-hint {
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--coral);
    text-align: center;
    padding: 8px 0 2px;
    animation: coShimmer 2s ease infinite;
  }
  .co-totals-divider {
    height: 1px;
    background: var(--border);
    margin: 14px 0;
  }
  .co-grand-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }
  .co-grand-label {
    font-family: var(--sans);
    font-size: 0.8rem;
    font-weight: 900;
    color: var(--ink);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .co-grand-val {
    font-family: var(--serif);
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  /* Trust badges */
  .co-trust-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 16px 26px;
    border-top: 1px solid var(--border);
  }
  .co-trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: var(--white);
    border-radius: 10px;
    border: 1px solid var(--border);
  }
  .co-trust-item span:first-child { font-size: 0.9rem; flex-shrink: 0; }
  .co-trust-text {
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  /* ── Empty State ── */
  .co-empty {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px 32px;
    font-family: var(--sans);
    gap: 16px;
  }
  .co-empty-icon { font-size: 4rem; opacity: 0.2; animation: coFloat 3s ease-in-out infinite; }
  .co-empty-title {
    font-size: 1.4rem;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .co-empty-text { font-size: 0.85rem; color: var(--muted); line-height: 1.7; max-width: 300px; }

  /* ── Success State ── */
  .co-success {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px 32px;
    font-family: var(--sans);
    gap: 0;
    background: var(--cream);
    position: relative;
    overflow: hidden;
  }
  .co-success::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,125,50,0.06), transparent 70%);
    pointer-events: none;
  }
  .co-success-ring {
    position: relative;
    width: 100px; height: 100px;
    margin-bottom: 32px;
    animation: coSuccess 0.6s var(--ease-spring) both;
  }
  .co-success-ring svg {
    width: 100%; height: 100%;
    transform: rotate(-90deg);
  }
  .co-success-ring .ring-bg { fill: none; stroke: rgba(46,125,50,0.1); stroke-width: 3; }
  .co-success-ring .ring-fill {
    fill: none;
    stroke: #2E7D32;
    stroke-width: 3;
    stroke-dasharray: 283;
    stroke-dashoffset: 283;
    animation: coCheckmark 0.8s var(--ease) 0.3s forwards;
    stroke-linecap: round;
  }
  .co-success-check {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.4rem;
    animation: coPop 0.4s var(--ease-spring) 0.5s both;
  }
  .co-success-title {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    margin-bottom: 12px;
    animation: coFadeUp 0.5s var(--ease) 0.4s both;
    opacity: 0;
    animation-fill-mode: both;
  }
  .co-success-sub {
    font-size: 0.88rem;
    font-weight: 400;
    color: var(--muted);
    line-height: 1.75;
    max-width: 380px;
    margin-bottom: 36px;
    animation: coFadeUp 0.5s var(--ease) 0.5s both;
    opacity: 0;
    animation-fill-mode: both;
  }
  .co-success-id {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.08em;
    margin-bottom: 32px;
    animation: coFadeUp 0.5s var(--ease) 0.6s both;
    opacity: 0;
    animation-fill-mode: both;
  }
  .co-success-id span { color: var(--coral); font-family: monospace; font-size: 0.8rem; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .co-layout { grid-template-columns: 1fr; }
    .co-summary-panel { position: static; order: -1; }
    .co-summary-items { max-height: 200px; }
  }
  @media (max-width: 640px) {
    .co-card-body { padding: 20px; }
    .co-row { grid-template-columns: 1fr; }
    .co-steps .co-step-label { display: none; }
    .co-trust-grid { grid-template-columns: 1fr; }
    .co-grand-val { font-size: 1.5rem; }
    .co-title { font-size: 1.8rem; }
  }
  @media (max-width: 400px) {
    .co-card-header { padding: 18px 20px; }
    .co-totals, .co-trust-grid, .co-summary-items { padding-left: 18px; padding-right: 18px; }
  }
`,pb=({cart:e,clearCart:t})=>{let n=dt(),r=(0,v.useRef)(null),[i,a]=(0,v.useState)({customer_name:``,customer_email:``,customer_phone:``,customer_address:``}),[o,s]=(0,v.useState)(!1),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)([]),[f,p]=(0,v.useState)(null);(0,v.useEffect)(()=>{if(!document.getElementById(`nahid-checkout-styles`)){let e=document.createElement(`style`);e.id=`nahid-checkout-styles`,e.textContent=fb,document.head.appendChild(e)}},[]),(0,v.useEffect)(()=>{let t=e;if(!t||t.length===0){let e=localStorage.getItem(`nahid_cart`);if(e)try{t=JSON.parse(e),d(t)}catch{}}else d(t)},[e]);let m=u.length>0?u:e,h=m.reduce((e,t)=>e+(typeof t.price==`string`?parseFloat(t.price):t.price)*(t.quantity||1),0),g=h>=500?0:30,_=h+g,y=e=>Math.round(e).toLocaleString(`fr-MA`),b=e=>a({...i,[e.target.name]:e.target.value}),x=async r=>{r.preventDefault();let a=u.length>0?u:e;if(!a||a.length===0){alert(`Votre panier est vide.`),n(`/`);return}s(!0);try{let e=a.map(e=>({id:e.id,name:e.name,quantity:e.quantity||1,price:typeof e.price==`string`?parseFloat(e.price):e.price}));await F.post(`/api/orders`,{...i,items:e,total_amount:_}),l(!0),t(),localStorage.removeItem(`nahid_cart`),setTimeout(()=>n(`/`),5e3)}catch(e){alert(`Erreur : `+(e.response?.data?.error||`Erreur serveur`))}finally{s(!1)}};if(m.length===0&&!c)return(0,I.jsxs)(`div`,{className:`co-empty co-page`,children:[(0,I.jsx)(`div`,{className:`co-empty-icon`,children:`🛒`}),(0,I.jsx)(`h2`,{className:`co-empty-title`,children:`Votre panier est vide`}),(0,I.jsx)(`p`,{className:`co-empty-text`,children:`Découvrez notre sélection de parfums d'exception et trouvez votre signature olfactive.`}),(0,I.jsx)(`button`,{onClick:()=>n(`/`),style:{marginTop:`8px`,padding:`15px 34px`,background:`linear-gradient(135deg,#EF776A,#D35F52)`,color:`white`,border:`none`,borderRadius:`999px`,fontFamily:`var(--sans)`,fontSize:`0.8rem`,fontWeight:`800`,letterSpacing:`0.1em`,textTransform:`uppercase`,cursor:`pointer`,boxShadow:`0 8px 24px rgba(239,119,106,0.35)`},children:`Découvrir nos parfums →`})]});if(c){let e=`NHD-`+Math.random().toString(36).substring(2,8).toUpperCase();return(0,I.jsxs)(`div`,{className:`co-success co-page`,children:[(0,I.jsxs)(`div`,{className:`co-success-ring`,children:[(0,I.jsxs)(`svg`,{viewBox:`0 0 100 100`,children:[(0,I.jsx)(`circle`,{className:`ring-bg`,cx:`50`,cy:`50`,r:`45`}),(0,I.jsx)(`circle`,{className:`ring-fill`,cx:`50`,cy:`50`,r:`45`})]}),(0,I.jsx)(`div`,{className:`co-success-check`,children:`✓`})]}),(0,I.jsx)(`h2`,{className:`co-success-title`,children:`Commande confirmée !`}),(0,I.jsx)(`p`,{className:`co-success-sub`,children:`Merci pour votre commande. Vous recevrez une confirmation par email sous peu. Notre équipe prépare votre colis avec soin 🇲🇦`}),(0,I.jsxs)(`div`,{className:`co-success-id`,children:[`Référence commande : `,(0,I.jsx)(`span`,{children:e})]}),(0,I.jsx)(`button`,{onClick:()=>n(`/`),style:{padding:`15px 34px`,background:`linear-gradient(135deg,#EF776A,#D35F52)`,color:`white`,border:`none`,borderRadius:`999px`,fontFamily:`var(--sans)`,fontSize:`0.8rem`,fontWeight:`800`,letterSpacing:`0.1em`,textTransform:`uppercase`,cursor:`pointer`,boxShadow:`0 8px 24px rgba(239,119,106,0.35)`,animation:`coFadeUp 0.5s ease 0.7s both`,opacity:0,animationFillMode:`both`},children:`Retour à l'accueil →`}),(0,I.jsx)(`p`,{style:{marginTop:`16px`,fontSize:`0.7rem`,color:`var(--muted)`,animation:`coFadeUp 0.5s ease 0.8s both`,opacity:0,animationFillMode:`both`},children:`Redirection automatique dans 5 secondes…`})]})}return(0,I.jsx)(`div`,{className:`co-page`,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsxs)(`nav`,{className:`co-breadcrumb`,children:[(0,I.jsx)(`a`,{href:`/`,children:`Accueil`}),(0,I.jsx)(`span`,{children:`›`}),(0,I.jsx)(`a`,{href:`/`,children:`Panier`}),(0,I.jsx)(`span`,{children:`›`}),(0,I.jsx)(`span`,{className:`active`,children:`Commande`})]}),(0,I.jsxs)(`div`,{className:`co-header`,children:[(0,I.jsx)(`div`,{className:`co-header-eyebrow`,children:`Finalisation`}),(0,I.jsxs)(`h1`,{className:`co-title`,children:[`Votre `,(0,I.jsx)(`em`,{children:`Commande`})]}),(0,I.jsxs)(`p`,{className:`co-subtitle`,children:[m.length,` article`,m.length>1?`s`:``,` · Livraison `,g===0?`offerte 🎉`:`${y(g)} MAD`]})]}),(0,I.jsxs)(`div`,{className:`co-steps`,children:[(0,I.jsxs)(`div`,{className:`co-step done`,children:[(0,I.jsx)(`div`,{className:`co-step-circle`,children:`✓`}),(0,I.jsx)(`span`,{className:`co-step-label`,children:`Panier`})]}),(0,I.jsx)(`div`,{className:`co-step-line filled`}),(0,I.jsxs)(`div`,{className:`co-step active`,children:[(0,I.jsx)(`div`,{className:`co-step-circle`,children:`2`}),(0,I.jsx)(`span`,{className:`co-step-label`,children:`Livraison`})]}),(0,I.jsx)(`div`,{className:`co-step-line`}),(0,I.jsxs)(`div`,{className:`co-step`,children:[(0,I.jsx)(`div`,{className:`co-step-circle`,children:`3`}),(0,I.jsx)(`span`,{className:`co-step-label`,children:`Confirmation`})]})]}),(0,I.jsxs)(`div`,{className:`co-layout`,children:[(0,I.jsxs)(`div`,{className:`co-form-panel`,children:[(0,I.jsxs)(`div`,{className:`co-card`,style:{animation:`coSlideIn 0.6s var(--ease) 0.1s both`},children:[(0,I.jsxs)(`div`,{className:`co-card-header`,children:[(0,I.jsx)(`div`,{className:`co-card-icon`,children:`👤`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`co-card-title`,children:`Informations personnelles`}),(0,I.jsx)(`div`,{className:`co-card-sub`,children:`Vos coordonnées de contact`})]})]}),(0,I.jsxs)(`div`,{className:`co-card-body`,children:[(0,I.jsxs)(`div`,{className:`co-row`,children:[(0,I.jsxs)(`div`,{className:`co-field`,children:[(0,I.jsxs)(`label`,{className:`co-label`,children:[`Nom complet `,(0,I.jsx)(`span`,{children:`*`})]}),(0,I.jsxs)(`div`,{className:`co-input-wrap`,children:[(0,I.jsx)(`span`,{className:`co-input-icon`,children:`👤`}),(0,I.jsx)(`input`,{className:`co-input`,type:`text`,name:`customer_name`,value:i.customer_name,onChange:b,onFocus:()=>p(`name`),onBlur:()=>p(null),required:!0,placeholder:`Prénom Nom`})]})]}),(0,I.jsxs)(`div`,{className:`co-field`,children:[(0,I.jsxs)(`label`,{className:`co-label`,children:[`Adresse email `,(0,I.jsx)(`span`,{children:`*`})]}),(0,I.jsxs)(`div`,{className:`co-input-wrap`,children:[(0,I.jsx)(`span`,{className:`co-input-icon`,children:`✉️`}),(0,I.jsx)(`input`,{className:`co-input`,type:`email`,name:`customer_email`,value:i.customer_email,onChange:b,onFocus:()=>p(`email`),onBlur:()=>p(null),required:!0,placeholder:`votre@email.com`})]})]})]}),(0,I.jsxs)(`div`,{className:`co-field`,children:[(0,I.jsxs)(`label`,{className:`co-label`,children:[`Téléphone `,(0,I.jsx)(`span`,{children:`*`})]}),(0,I.jsxs)(`div`,{className:`co-input-wrap`,children:[(0,I.jsx)(`span`,{className:`co-input-icon`,children:`📱`}),(0,I.jsx)(`input`,{className:`co-input`,type:`tel`,name:`customer_phone`,value:i.customer_phone,onChange:b,onFocus:()=>p(`phone`),onBlur:()=>p(null),required:!0,placeholder:`+212 6 00 00 00 00`})]})]})]})]}),(0,I.jsxs)(`div`,{className:`co-card`,style:{animation:`coSlideIn 0.6s var(--ease) 0.2s both`},children:[(0,I.jsxs)(`div`,{className:`co-card-header`,children:[(0,I.jsx)(`div`,{className:`co-card-icon`,style:{background:`linear-gradient(135deg,var(--gold),#B8922A)`},children:`📦`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`co-card-title`,children:`Adresse de livraison`}),(0,I.jsx)(`div`,{className:`co-card-sub`,children:`Livraison partout au Maroc en 24–48h`})]})]}),(0,I.jsxs)(`div`,{className:`co-card-body`,children:[(0,I.jsxs)(`div`,{className:`co-field`,children:[(0,I.jsxs)(`label`,{className:`co-label`,children:[`Adresse complète `,(0,I.jsx)(`span`,{children:`*`})]}),(0,I.jsxs)(`div`,{className:`co-input-wrap co-textarea-wrap`,children:[(0,I.jsx)(`span`,{className:`co-input-icon`,children:`📍`}),(0,I.jsx)(`textarea`,{className:`co-textarea`,name:`customer_address`,value:i.customer_address,onChange:b,onFocus:()=>p(`address`),onBlur:()=>p(null),required:!0,placeholder:`Numéro, rue, quartier, ville, code postal…`,rows:4})]})]}),(0,I.jsx)(`div`,{style:{display:`flex`,gap:`8px`,flexWrap:`wrap`,marginTop:`8px`},children:[`🚚 Livraison 24–48h`,`📍 Tout le Maroc`,`📦 Suivi en temps réel`].map(e=>(0,I.jsx)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,background:`var(--cream)`,border:`1px solid var(--border)`,borderRadius:`999px`,padding:`5px 12px`,fontSize:`0.65rem`,fontWeight:`700`,color:`var(--muted)`,letterSpacing:`0.04em`},children:e},e))})]})]}),(0,I.jsxs)(`div`,{className:`co-card`,style:{animation:`coSlideIn 0.6s var(--ease) 0.3s both`},children:[(0,I.jsxs)(`div`,{className:`co-card-header`,children:[(0,I.jsx)(`div`,{className:`co-card-icon`,style:{background:`linear-gradient(135deg,#2E7D32,#1B5E20)`},children:`💳`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`co-card-title`,children:`Paiement`}),(0,I.jsx)(`div`,{className:`co-card-sub`,children:`Paiement à la livraison — 100% sécurisé`})]})]}),(0,I.jsx)(`div`,{className:`co-card-body`,children:(0,I.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`14px`,padding:`16px 18px`,background:`linear-gradient(135deg,rgba(46,125,50,0.07),rgba(46,125,50,0.03))`,border:`1.5px solid rgba(46,125,50,0.18)`,borderRadius:`14px`},children:[(0,I.jsx)(`span`,{style:{fontSize:`1.6rem`},children:`💵`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{style:{fontSize:`0.82rem`,fontWeight:`800`,color:`#2E7D32`,marginBottom:`3px`},children:`Paiement à la livraison`}),(0,I.jsx)(`div`,{style:{fontSize:`0.72rem`,fontWeight:`500`,color:`var(--muted)`,lineHeight:`1.5`},children:`Payez en cash à la réception de votre colis. Aucune information bancaire requise.`})]})]})})]}),(0,I.jsxs)(`div`,{style:{animation:`coSlideIn 0.6s var(--ease) 0.4s both`},children:[(0,I.jsxs)(`div`,{className:`co-secure-badge`,children:[(0,I.jsx)(`span`,{children:`🔒`}),(0,I.jsx)(`span`,{className:`co-secure-text`,children:`Vos données sont protégées par un chiffrement SSL 256-bit`})]}),(0,I.jsx)(`form`,{onSubmit:x,ref:r,children:(0,I.jsx)(`button`,{type:`submit`,className:`co-submit`,disabled:o,onClick:x,children:o?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`div`,{className:`co-spinner`}),` Traitement en cours…`]}):(0,I.jsxs)(I.Fragment,{children:[`Confirmer la commande — `,y(_),` MAD →`]})})})]})]}),(0,I.jsx)(`aside`,{className:`co-summary-panel`,children:(0,I.jsxs)(`div`,{className:`co-summary-card`,children:[(0,I.jsxs)(`div`,{className:`co-summary-head`,children:[(0,I.jsx)(`div`,{className:`co-summary-head-title`,children:`Récapitulatif`}),(0,I.jsxs)(`div`,{className:`co-summary-head-count`,children:[m.length,` article`,m.length>1?`s`:``]})]}),(0,I.jsx)(`div`,{className:`co-summary-items`,children:m.map((e,t)=>{let n=typeof e.price==`string`?parseFloat(e.price):e.price,r=e.quantity||1;return(0,I.jsxs)(`div`,{className:`co-summary-item`,style:{animationDelay:`${t*.06}s`},children:[(0,I.jsxs)(`div`,{className:`co-si-img-wrap`,children:[(0,I.jsx)(`img`,{className:`co-si-img`,src:e.image_url,alt:e.name,loading:`lazy`}),(0,I.jsx)(`span`,{className:`co-si-qty`,children:r})]}),(0,I.jsxs)(`div`,{className:`co-si-info`,children:[(0,I.jsx)(`div`,{className:`co-si-name`,children:e.name}),e.category&&(0,I.jsx)(`div`,{className:`co-si-cat`,children:e.category})]}),(0,I.jsxs)(`span`,{className:`co-si-price`,children:[y(n*r),` MAD`]})]},e.id)})}),(0,I.jsxs)(`div`,{className:`co-totals`,children:[(0,I.jsxs)(`div`,{className:`co-totals-row`,children:[(0,I.jsx)(`span`,{className:`co-totals-label`,children:`Sous-total`}),(0,I.jsxs)(`span`,{className:`co-totals-val`,children:[y(h),` MAD`]})]}),(0,I.jsxs)(`div`,{className:`co-totals-row`,children:[(0,I.jsx)(`span`,{className:`co-totals-label`,children:`Livraison`}),(0,I.jsx)(`span`,{className:`co-totals-val${g===0?` free`:``}`,children:g===0?`🎉 Gratuite`:`${y(g)} MAD`})]}),h>0&&h<500&&(0,I.jsxs)(`p`,{className:`co-totals-hint`,children:[`+ `,y(500-h),` MAD pour la livraison gratuite`]}),(0,I.jsx)(`div`,{className:`co-totals-divider`}),(0,I.jsxs)(`div`,{className:`co-grand-row`,children:[(0,I.jsx)(`span`,{className:`co-grand-label`,children:`Total`}),(0,I.jsxs)(`span`,{className:`co-grand-val`,children:[y(_),` MAD`]})]})]}),(0,I.jsx)(`div`,{className:`co-trust-grid`,children:[{icon:`🔒`,text:`Paiement sécurisé`},{icon:`🚚`,text:`Livraison 24–48h`},{icon:`↩️`,text:`Retours 30 jours`},{icon:`⭐`,text:`4.9/5 — 2400 avis`}].map(({icon:e,text:t})=>(0,I.jsxs)(`div`,{className:`co-trust-item`,children:[(0,I.jsx)(`span`,{children:e}),(0,I.jsx)(`span`,{className:`co-trust-text`,children:t})]},t))})]})})]})]})})},mb=`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');

  :root {
    --coral:      #EF776A;
    --coral-dk:   #C9503F;
    --coral-lt:   #FFF3F1;
    --gold:       #C9A96E;
    --gold-lt:    #F5E9D0;
    --ink:        #0E0E0C;
    --cream:      #FAF8F5;
    --sand:       #EDE9E1;
    --muted:      #7A7770;
    --white:      #FFFFFF;
    --border:     rgba(14,14,12,0.08);
    --sans:       'Poppins', sans-serif;
    --serif:      'Cormorant Garamond', Georgia, serif;
    --ease:       cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Animations ── */
  @keyframes nhFadeUp     { from{opacity:0;transform:translateY(40px);}  to{opacity:1;transform:translateY(0);} }
  @keyframes nhFadeLeft   { from{opacity:0;transform:translateX(-50px);} to{opacity:1;transform:translateX(0);} }
  @keyframes nhFadeRight  { from{opacity:0;transform:translateX(50px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes nhScaleIn    { from{opacity:0;transform:scale(0.85);}        to{opacity:1;transform:scale(1);} }
  @keyframes nhRotateSlow { from{transform:rotate(0deg);}   to{transform:rotate(360deg);} }
  @keyframes nhFloat      { 0%,100%{transform:translateY(0);}    50%{transform:translateY(-14px);} }
  @keyframes nhFloatR     { 0%,100%{transform:translateY(0) rotate(3deg);} 50%{transform:translateY(-10px) rotate(-3deg);} }
  @keyframes nhPulse      { 0%,100%{opacity:0.6;transform:scale(1);}  50%{opacity:1;transform:scale(1.05);} }
  @keyframes nhShimmer    { from{background-position:200% 0;} to{background-position:-200% 0;} }
  @keyframes nhCountUp    { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
  @keyframes nhLineGrow   { from{width:0;} to{width:100%;} }
  @keyframes nhStar       { 0%,100%{transform:scale(1) rotate(0deg);} 50%{transform:scale(1.2) rotate(10deg);} }
  @keyframes nhGrain      { 0%,100%{transform:translate(0,0);}  20%{transform:translate(-2px,2px);}  40%{transform:translate(2px,-2px);}  60%{transform:translate(-1px,3px);}  80%{transform:translate(3px,-1px);} }
  @keyframes nhOrb        { 0%,100%{transform:translate(0,0) scale(1);}  33%{transform:translate(40px,-30px) scale(1.1);}  66%{transform:translate(-20px,20px) scale(0.95);} }
  @keyframes nhMarquee    { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes nhReveal     { from{clip-path:inset(0 100% 0 0);} to{clip-path:inset(0 0% 0 0);} }
  @keyframes nhBorderRot  { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

  /* AOS utility */
  .nh-aos { opacity:0; transform:translateY(36px); transition:opacity 0.85s var(--ease), transform 0.85s var(--ease); }
  .nh-aos.nh-visible { opacity:1; transform:translateY(0); }
  .nh-aos-l { opacity:0; transform:translateX(-40px); transition:opacity 0.8s var(--ease), transform 0.8s var(--ease); }
  .nh-aos-l.nh-visible { opacity:1; transform:translateX(0); }
  .nh-aos-r { opacity:0; transform:translateX(40px); transition:opacity 0.8s var(--ease), transform 0.8s var(--ease); }
  .nh-aos-r.nh-visible { opacity:1; transform:translateX(0); }
  .nh-aos-s { opacity:0; transform:scale(0.88); transition:opacity 0.7s var(--ease), transform 0.7s var(--ease); }
  .nh-aos-s.nh-visible { opacity:1; transform:scale(1); }
  .nh-d1{transition-delay:.08s} .nh-d2{transition-delay:.16s} .nh-d3{transition-delay:.24s}
  .nh-d4{transition-delay:.32s} .nh-d5{transition-delay:.40s} .nh-d6{transition-delay:.48s}

  /* ─────────────────────────────────────────
     PAGE WRAPPER
  ───────────────────────────────────────── */
  .nh-page {
    font-family: var(--sans);
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .nh-page * { box-sizing: border-box; }

  /* ─────────────────────────────────────────
     CINEMATIC HERO
  ───────────────────────────────────────── */
  .nh-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--ink);
    padding: clamp(100px,14vh,160px) 20px clamp(80px,10vh,120px);
  }

  /* Orbs */
  .nh-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .nh-orb-1 {
    width: 700px; height: 700px;
    top: -200px; left: -200px;
    background: radial-gradient(circle, rgba(239,119,106,0.18) 0%, transparent 70%);
    animation: nhOrb 18s ease-in-out infinite;
  }
  .nh-orb-2 {
    width: 500px; height: 500px;
    bottom: -150px; right: -100px;
    background: radial-gradient(circle, rgba(201,169,110,0.14) 0%, transparent 70%);
    animation: nhOrb 14s ease-in-out infinite reverse;
  }
  .nh-orb-3 {
    width: 300px; height: 300px;
    top: 40%; left: 60%;
    background: radial-gradient(circle, rgba(239,119,106,0.08) 0%, transparent 70%);
    animation: nhOrb 22s ease-in-out infinite 4s;
  }

  /* Grain */
  .nh-grain {
    position: absolute; inset: -50%;
    width: 200%; height: 200%;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px;
    animation: nhGrain 6s steps(1) infinite;
    pointer-events: none;
  }

  /* Decorative rings */
  .nh-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.05);
    pointer-events: none;
  }
  .nh-ring-1 { width:500px;height:500px; top:50%;left:50%;transform:translate(-50%,-50%); }
  .nh-ring-2 { width:750px;height:750px; top:50%;left:50%;transform:translate(-50%,-50%); }
  .nh-ring-3 { width:1050px;height:1050px; top:50%;left:50%;transform:translate(-50%,-50%); animation:nhBorderRot 60s linear infinite; border-color:rgba(239,119,106,0.04); }

  /* Hero logo */
  .nh-hero-logo {
    position: relative; z-index: 2;
    width: clamp(70px, 10vw, 100px);
    height: clamp(70px, 10vw, 100px);
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid rgba(255,255,255,0.12);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(239,119,106,0.2);
    margin-bottom: 32px;
    animation: nhScaleIn 0.8s var(--spring) 0.2s both, nhFloat 6s ease-in-out 1.5s infinite;
  }
  .nh-hero-logo img { width:100%; height:100%; object-fit:cover; display:block; }
  .nh-hero-logo-fallback {
    width:100%; height:100%;
    background: linear-gradient(135deg, var(--coral), var(--coral-dk));
    display: flex; align-items: center; justify-content: center;
    font-family: var(--serif);
    font-size: clamp(28px,5vw,42px);
    font-weight: 600;
    color: white;
    letter-spacing: -0.02em;
  }

  .nh-hero-eyebrow {
    position: relative; z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
    animation: nhFadeUp 0.8s var(--ease) 0.4s both;
  }
  .nh-hero-eyebrow::before, .nh-hero-eyebrow::after {
    content: '';
    display: block;
    width: 40px; height: 1px;
    background: linear-gradient(to right, transparent, var(--gold));
  }
  .nh-hero-eyebrow::after { background: linear-gradient(to left, transparent, var(--gold)); }

  .nh-hero-title {
    position: relative; z-index: 2;
    font-family: var(--sans);
    font-size: clamp(3.2rem, 10vw, 8rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.04em;
    line-height: 0.9;
    text-align: center;
    margin-bottom: 16px;
    animation: nhFadeUp 0.9s var(--ease) 0.5s both;
  }
  .nh-hero-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    color: var(--coral);
    font-size: 1.1em;
    display: block;
  }

  .nh-hero-sub {
    position: relative; z-index: 2;
    font-size: clamp(0.85rem, 1.5vw, 1.05rem);
    font-weight: 400;
    color: rgba(255,255,255,0.55);
    text-align: center;
    max-width: 520px;
    line-height: 1.85;
    margin-bottom: 48px;
    animation: nhFadeUp 0.9s var(--ease) 0.65s both;
  }

  .nh-hero-badges {
    position: relative; z-index: 2;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    animation: nhFadeUp 0.9s var(--ease) 0.75s both;
  }
  .nh-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(12px);
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    letter-spacing: 0.04em;
  }
  .nh-hero-badge-dot { width:6px;height:6px;border-radius:50%;background:var(--coral);animation:nhPulse 2s ease infinite;flex-shrink:0; }
  .nh-hero-badge-dot.gold { background: var(--gold); }

  /* Scroll cue */
  .nh-hero-scroll {
    position: absolute;
    bottom: 32px; left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    animation: nhFadeUp 0.8s var(--ease) 1.2s both;
  }
  .nh-scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
    animation: nhPulse 2s ease-in-out infinite;
  }
  .nh-scroll-txt {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }

  /* ─────────────────────────────────────────
     MARQUEE STRIP
  ───────────────────────────────────────── */
  .nh-marquee {
    background: var(--coral);
    padding: 14px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .nh-marquee-track {
    display: inline-flex;
    gap: 48px;
    animation: nhMarquee 30s linear infinite;
  }
  .nh-marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: white;
    white-space: nowrap;
  }
  .nh-marquee-sep { opacity: 0.5; font-size: 0.5rem; }

  /* ─────────────────────────────────────────
     STATS SECTION
  ───────────────────────────────────────── */
  .nh-stats {
    background: white;
    padding: clamp(60px,8vw,100px) 0;
  }
  .nh-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 80px);
  }
  .nh-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 28px;
    overflow: hidden;
  }
  .nh-stat-item {
    padding: clamp(28px,4vw,48px) clamp(20px,3vw,36px);
    border-right: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
  }
  .nh-stat-item:hover { background: var(--cream); }
  .nh-stat-item:last-child { border-right: none; }
  .nh-stat-item::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--coral), var(--gold));
    transform: scaleX(0);
    transition: transform 0.4s var(--ease);
    transform-origin: left;
  }
  .nh-stat-item:hover::after { transform: scaleX(1); }
  .nh-stat-num {
    font-family: var(--sans);
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 8px;
  }
  .nh-stat-num span { color: var(--coral); }
  .nh-stat-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* ─────────────────────────────────────────
     SECTION COMMONS
  ───────────────────────────────────────── */
  .nh-section { padding: clamp(80px,10vw,140px) 0; }
  .nh-section-alt { background: white; }

  .nh-section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--coral);
    margin-bottom: 18px;
  }
  .nh-section-eyebrow::before {
    content: '';
    width: 28px; height: 1px;
    background: var(--coral);
    display: block;
  }

  .nh-section-title {
    font-family: var(--sans);
    font-size: clamp(2rem, 5vw, 3.8rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 24px;
  }
  .nh-section-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    color: var(--coral);
    font-size: 1.08em;
  }
  .nh-section-body {
    font-size: clamp(0.9rem, 1.3vw, 1.05rem);
    font-weight: 400;
    line-height: 1.9;
    color: var(--muted);
    max-width: 560px;
  }

  /* ─────────────────────────────────────────
     FOUNDER SECTION
  ───────────────────────────────────────── */
  .nh-founder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 100px);
    align-items: center;
  }
  .nh-founder-img-wrap {
    position: relative;
  }
  .nh-founder-img-frame {
    position: absolute;
    top: -20px; right: -20px;
    bottom: 20px; left: 20px;
    border: 2px solid rgba(239,119,106,0.25);
    border-radius: 32px;
    pointer-events: none;
  }
  .nh-founder-img {
    width: 100%;
    aspect-ratio: 4/5;
    object-fit: cover;
    border-radius: 28px;
    display: block;
    box-shadow: 0 40px 80px rgba(0,0,0,0.12);
    position: relative; z-index: 1;
  }
  .nh-founder-badge {
    position: absolute;
    bottom: 28px; left: -24px;
    z-index: 2;
    background: white;
    border-radius: 20px;
    padding: 18px 24px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    gap: 14px;
    animation: nhFloat 4s ease-in-out infinite;
  }
  .nh-founder-badge-icon { font-size: 2rem; }
  .nh-founder-badge-num {
    font-family: var(--sans);
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .nh-founder-badge-txt {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .nh-founder-signature {
    font-family: var(--serif);
    font-size: 2.2rem;
    font-weight: 400;
    font-style: italic;
    color: var(--coral);
    margin: 24px 0 8px;
    line-height: 1;
  }
  .nh-founder-role {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 28px;
  }

  .nh-founder-quote {
    position: relative;
    padding: 24px 28px;
    background: var(--cream);
    border-left: 3px solid var(--coral);
    border-radius: 0 16px 16px 0;
    margin: 32px 0;
  }
  .nh-founder-quote p {
    font-family: var(--serif);
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-style: italic;
    font-weight: 400;
    color: var(--ink);
    line-height: 1.65;
  }
  .nh-founder-quote::before {
    content: '"';
    position: absolute;
    top: -10px; left: 20px;
    font-family: var(--serif);
    font-size: 5rem;
    color: var(--coral);
    opacity: 0.2;
    line-height: 1;
    pointer-events: none;
  }

  /* ─────────────────────────────────────────
     VALUES GRID
  ───────────────────────────────────────── */
  .nh-values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 60px;
  }
  .nh-value-card {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: clamp(28px,4vw,44px) clamp(24px,3vw,36px);
    position: relative;
    overflow: hidden;
    transition: transform 0.4s var(--spring), box-shadow 0.4s, border-color 0.3s;
  }
  .nh-value-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(239,119,106,0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .nh-value-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 24px 60px rgba(0,0,0,0.1); border-color: rgba(239,119,106,0.2); }
  .nh-value-card:hover::before { opacity: 1; }
  .nh-value-num {
    position: absolute;
    top: 16px; right: 20px;
    font-family: var(--sans);
    font-size: 4rem;
    font-weight: 900;
    color: rgba(14,14,12,0.04);
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .nh-value-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .nh-value-title {
    font-family: var(--sans);
    font-size: 1rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 10px;
    position: relative; z-index: 1;
  }
  .nh-value-text {
    font-size: 0.82rem;
    font-weight: 400;
    line-height: 1.7;
    color: var(--muted);
    position: relative; z-index: 1;
  }

  /* ─────────────────────────────────────────
     STORY TIMELINE
  ───────────────────────────────────────── */
  .nh-timeline {
    position: relative;
    padding-left: 40px;
    margin-top: 60px;
  }
  .nh-timeline::before {
    content: '';
    position: absolute;
    left: 12px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--coral), var(--gold), transparent);
  }
  .nh-timeline-item {
    position: relative;
    margin-bottom: 48px;
  }
  .nh-timeline-item:last-child { margin-bottom: 0; }
  .nh-timeline-dot {
    position: absolute;
    left: -34px; top: 6px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--coral);
    border: 3px solid var(--cream);
    box-shadow: 0 0 0 3px rgba(239,119,106,0.25);
  }
  .nh-timeline-year {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--coral);
    margin-bottom: 6px;
  }
  .nh-timeline-title {
    font-family: var(--sans);
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 8px;
  }
  .nh-timeline-body {
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.75;
    color: var(--muted);
  }

  /* ─────────────────────────────────────────
     INGREDIENTS SECTION
  ───────────────────────────────────────── */
  .nh-ingredients {
    background: var(--ink);
    padding: clamp(80px,10vw,140px) 0;
    position: relative;
    overflow: hidden;
  }
  .nh-ingredients::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 60% at 70% 50%, rgba(239,119,106,0.08), transparent);
    pointer-events: none;
  }
  .nh-ing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px,6vw,100px);
    align-items: center;
  }
  .nh-ing-title {
    font-family: var(--sans);
    font-size: clamp(2rem, 5vw, 3.8rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.03em;
    line-height: 1.0;
    margin-bottom: 24px;
  }
  .nh-ing-title em {
    font-style: italic; font-weight: 300;
    font-family: var(--serif);
    color: var(--gold); font-size: 1.08em;
  }
  .nh-ing-body {
    font-size: 0.9rem;
    line-height: 1.85;
    color: rgba(255,255,255,0.5);
    margin-bottom: 32px;
  }
  .nh-ing-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .nh-ing-tag {
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid rgba(201,169,110,0.25);
    background: rgba(201,169,110,0.08);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
  }
  .nh-ing-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .nh-ing-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 24px 20px;
    transition: background 0.3s, transform 0.3s;
  }
  .nh-ing-card:hover { background: rgba(255,255,255,0.07); transform: translateY(-4px); }
  .nh-ing-card-icon { font-size: 1.8rem; margin-bottom: 12px; }
  .nh-ing-card-name {
    font-family: var(--sans);
    font-size: 0.85rem;
    font-weight: 800;
    color: white;
    margin-bottom: 5px;
    letter-spacing: -0.01em;
  }
  .nh-ing-card-origin {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  /* ─────────────────────────────────────────
     DELIVERY SECTION
  ───────────────────────────────────────── */
  .nh-delivery {
    padding: clamp(80px,10vw,120px) 0;
    background: white;
  }
  .nh-delivery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px,6vw,80px);
    align-items: center;
  }
  .nh-cities {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .nh-city-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 999px;
    background: var(--cream);
    border: 1.5px solid var(--border);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.02em;
    transition: all 0.2s var(--spring);
  }
  .nh-city-chip:hover { background: var(--coral); color: white; border-color: var(--coral); transform: translateY(-3px); }
  .nh-delivery-card {
    background: var(--ink);
    border-radius: 28px;
    padding: clamp(32px,4vw,52px);
    position: relative;
    overflow: hidden;
  }
  .nh-delivery-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(239,119,106,0.1);
    pointer-events: none;
  }
  .nh-delivery-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 28px;
    position: relative; z-index: 1;
  }
  .nh-delivery-item:last-child { margin-bottom: 0; }
  .nh-delivery-icon {
    width: 44px; height: 44px;
    border-radius: 14px;
    background: rgba(239,119,106,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .nh-delivery-item-title {
    font-size: 0.82rem;
    font-weight: 800;
    color: white;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }
  .nh-delivery-item-body {
    font-size: 0.75rem;
    font-weight: 400;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
  }

  /* ─────────────────────────────────────────
     INSPIRATION SECTION
  ───────────────────────────────────────── */
  .nh-inspiration {
    padding: clamp(80px,10vw,120px) 0;
    background: var(--cream);
  }
  .nh-insp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 52px;
  }
  .nh-insp-card {
    border-radius: 24px;
    padding: clamp(28px,3vw,40px);
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border);
    transition: transform 0.4s var(--spring), box-shadow 0.4s;
  }
  .nh-insp-card:hover { transform: translateY(-8px); box-shadow: 0 28px 64px rgba(0,0,0,0.1); }
  .nh-insp-card-tag {
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .nh-insp-card-num {
    font-family: var(--sans);
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 8px;
  }
  .nh-insp-card-title {
    font-family: var(--sans);
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .nh-insp-card-body {
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.7;
    opacity: 0.7;
  }
  .nh-insp-card-deco {
    position: absolute;
    bottom: -20px; right: -20px;
    font-size: 6rem;
    opacity: 0.07;
    pointer-events: none;
    transform: rotate(-15deg);
  }

  /* ─────────────────────────────────────────
     CTA SECTION
  ───────────────────────────────────────── */
  .nh-cta {
    padding: clamp(100px,12vw,160px) 0;
    background: var(--ink);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .nh-cta-orb-1 { position:absolute; top:-100px;left:-100px; width:400px;height:400px; border-radius:50%; background:radial-gradient(circle,rgba(239,119,106,0.12),transparent 70%); pointer-events:none; }
  .nh-cta-orb-2 { position:absolute; bottom:-100px;right:-100px; width:400px;height:400px; border-radius:50%; background:radial-gradient(circle,rgba(201,169,110,0.1),transparent 70%); pointer-events:none; }
  .nh-cta-title {
    font-family: var(--sans);
    font-size: clamp(2.4rem, 6vw, 5rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.04em;
    line-height: 1.0;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .nh-cta-title em {
    font-style: italic; font-weight: 300;
    font-family: var(--serif);
    color: var(--coral); font-size: 1.1em;
  }
  .nh-cta-sub {
    font-size: clamp(0.85rem,1.3vw,1rem);
    color: rgba(255,255,255,0.45);
    line-height: 1.8;
    max-width: 440px;
    margin: 0 auto 40px;
    position: relative; z-index: 1;
  }
  .nh-cta-btns {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
    position: relative; z-index: 1;
  }
  .nh-btn-coral {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 36px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--coral), var(--coral-dk));
    color: white;
    font-family: var(--sans);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 0.25s var(--spring), box-shadow 0.25s;
    box-shadow: 0 8px 28px rgba(239,119,106,0.4);
  }
  .nh-btn-coral:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 16px 40px rgba(239,119,106,0.5); }
  .nh-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 32px;
    border-radius: 999px;
    background: rgba(255,255,255,0.07);
    color: white;
    font-family: var(--sans);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .nh-btn-ghost:hover { background: rgba(255,255,255,0.14); transform: translateY(-2px); }

  /* ─────────────────────────────────────────
     RESPONSIVE
  ───────────────────────────────────────── */
  @media (max-width: 1024px) {
    .nh-founder { grid-template-columns: 1fr; }
    .nh-founder-img-frame { display: none; }
    .nh-ing-grid { grid-template-columns: 1fr; }
    .nh-delivery-grid { grid-template-columns: 1fr; }
    .nh-stats-grid { grid-template-columns: 1fr 1fr; }
    .nh-stat-item:nth-child(2) { border-right: none; }
    .nh-stat-item:nth-child(1),
    .nh-stat-item:nth-child(2) { border-bottom: 1px solid var(--border); }
  }
  @media (max-width: 768px) {
    .nh-values-grid { grid-template-columns: 1fr; }
    .nh-insp-grid { grid-template-columns: 1fr; }
    .nh-ing-cards { grid-template-columns: 1fr 1fr; }
    .nh-founder-badge { left: 10px; }
  }
  @media (max-width: 600px) {
    .nh-stats-grid { grid-template-columns: 1fr 1fr; border-radius: 20px; }
    .nh-stat-item { padding: 20px 16px; }
    .nh-ing-cards { grid-template-columns: 1fr; }
    .nh-hero-title { letter-spacing: -0.03em; }
    .nh-values-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 400px) {
    .nh-values-grid { grid-template-columns: 1fr; }
    .nh-stats-grid { grid-template-columns: 1fr; }
    .nh-stat-item { border-right: none !important; border-bottom: 1px solid var(--border); }
    .nh-stat-item:last-child { border-bottom: none; }
  }
`;function hb(){if(!(typeof document>`u`)&&!document.getElementById(`nh-styles`)){let e=document.createElement(`style`);e.id=`nh-styles`,e.textContent=mb,document.head.appendChild(e)}}function gb(e,t=2e3,n=!1){let[r,i]=(0,v.useState)(0);return(0,v.useEffect)(()=>{if(!n)return;let r=null,a=n=>{r||=n;let o=Math.min((n-r)/t,1),s=1-(1-o)**3;i(Math.floor(s*e)),o<1&&requestAnimationFrame(a)};requestAnimationFrame(a)},[n,e,t]),r}function _b({num:e,suffix:t=``,prefix:n=``,label:r,delay:i=0}){let a=(0,v.useRef)(null),[o,s]=(0,v.useState)(!1),c=gb(e,1800,o);return(0,v.useEffect)(()=>{let e=new IntersectionObserver(([e])=>{e.isIntersecting&&s(!0)},{threshold:.5});return a.current&&e.observe(a.current),()=>e.disconnect()},[]),(0,I.jsxs)(`div`,{className:`nh-stat-item nh-aos`,ref:a,style:{transitionDelay:`${i}s`},children:[(0,I.jsxs)(`div`,{className:`nh-stat-num`,children:[n,c,t,(0,I.jsx)(`span`,{children:`+`})]}),(0,I.jsx)(`div`,{className:`nh-stat-label`,children:r})]})}var vb=()=>{hb();let[e,t]=(0,v.useState)(!1);return(0,v.useEffect)(()=>{let e=new IntersectionObserver(e=>e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`nh-visible`)}),{threshold:.1});return document.querySelectorAll(`.nh-aos,.nh-aos-l,.nh-aos-r,.nh-aos-s`).forEach(t=>e.observe(t)),()=>e.disconnect()}),(0,I.jsxs)(`div`,{className:`nh-page`,children:[(0,I.jsxs)(`section`,{className:`nh-hero`,children:[(0,I.jsx)(`div`,{className:`nh-orb nh-orb-1`}),(0,I.jsx)(`div`,{className:`nh-orb nh-orb-2`}),(0,I.jsx)(`div`,{className:`nh-orb nh-orb-3`}),(0,I.jsx)(`div`,{className:`nh-ring nh-ring-1`}),(0,I.jsx)(`div`,{className:`nh-ring nh-ring-2`}),(0,I.jsx)(`div`,{className:`nh-ring nh-ring-3`}),(0,I.jsx)(`div`,{className:`nh-grain`}),(0,I.jsx)(`div`,{className:`nh-hero-logo`,children:e?(0,I.jsx)(`div`,{className:`nh-hero-logo-fallback`,children:`N`}):(0,I.jsx)(`img`,{src:`/nahid1.png`,alt:`Nahid Perfume`,onError:()=>t(!0)})}),(0,I.jsx)(`div`,{className:`nh-hero-eyebrow`,children:`Fondée en 2020 — Casablanca, Maroc`}),(0,I.jsxs)(`h1`,{className:`nh-hero-title`,children:[`Notre`,(0,I.jsx)(`em`,{children:`Histoire`})]}),(0,I.jsx)(`p`,{className:`nh-hero-sub`,children:`De la passion d'un homme, Yassine, est née une maison de parfums d'exception — inspirée des plus grands noms mondiaux, enracinée dans l'âme du Maroc.`}),(0,I.jsxs)(`div`,{className:`nh-hero-badges`,children:[(0,I.jsxs)(`span`,{className:`nh-hero-badge`,children:[(0,I.jsx)(`span`,{className:`nh-hero-badge-dot`}),`100% Maroc 🇲🇦`]}),(0,I.jsxs)(`span`,{className:`nh-hero-badge`,children:[(0,I.jsx)(`span`,{className:`nh-hero-badge-dot gold`}),`Livraison nationale`]}),(0,I.jsxs)(`span`,{className:`nh-hero-badge`,children:[(0,I.jsx)(`span`,{className:`nh-hero-badge-dot`}),`4.9★ · 2 400 clients`]})]}),(0,I.jsxs)(`div`,{className:`nh-hero-scroll`,children:[(0,I.jsx)(`div`,{className:`nh-scroll-line`}),(0,I.jsx)(`span`,{className:`nh-scroll-txt`,children:`Découvrir`})]})]}),(0,I.jsx)(`div`,{className:`nh-marquee`,"aria-hidden":`true`,children:(0,I.jsx)(`div`,{className:`nh-marquee-track`,children:[`✦ Livraison partout au Maroc 🇲🇦`,`✦ Inspiré des meilleurs parfums mondiaux`,`✦ Fondé par Yassine en 2020`,`✦ Ingrédients 100% naturels`,`✦ Fragrances uniques & exclusives`,`✦ Livraison partout au Maroc 🇲🇦`,`✦ Inspiré des meilleurs parfums mondiaux`,`✦ Fondé par Yassine en 2020`,`✦ Ingrédients 100% naturels`,`✦ Fragrances uniques & exclusives`].map((e,t)=>(0,I.jsx)(`span`,{className:`nh-marquee-item`,children:e},t))})}),(0,I.jsx)(`section`,{className:`nh-stats`,children:(0,I.jsx)(`div`,{className:`nh-container`,children:(0,I.jsxs)(`div`,{className:`nh-stats-grid`,children:[(0,I.jsx)(_b,{num:4,suffix:`ans`,label:`D'excellence parfumée`,delay:0}),(0,I.jsx)(_b,{num:78,suffix:``,label:`Fragrances créées`,delay:.08}),(0,I.jsx)(_b,{num:2400,suffix:``,label:`Clients satisfaits`,delay:.16}),(0,I.jsx)(_b,{num:19,suffix:``,label:`Villes desservies`,delay:.24})]})})}),(0,I.jsx)(`section`,{className:`nh-section nh-section-alt`,children:(0,I.jsx)(`div`,{className:`nh-container`,children:(0,I.jsxs)(`div`,{className:`nh-founder`,children:[(0,I.jsxs)(`div`,{className:`nh-founder-img-wrap nh-aos-l`,children:[(0,I.jsx)(`div`,{className:`nh-founder-img-frame`}),(0,I.jsx)(`img`,{className:`nh-founder-img`,src:`https://i.postimg.cc/DfpGr62w/540935792-122260831478147069-8458687735403437790-n.jpg`,alt:`Yassine — Fondateur Nahid Perfume`}),(0,I.jsxs)(`div`,{className:`nh-founder-badge`,children:[(0,I.jsx)(`span`,{className:`nh-founder-badge-icon`,children:`🏆`}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`nh-founder-badge-num`,children:`2020`}),(0,I.jsx)(`div`,{className:`nh-founder-badge-txt`,children:`Fondation`})]})]})]}),(0,I.jsxs)(`div`,{className:`nh-aos-r`,children:[(0,I.jsx)(`div`,{className:`nh-section-eyebrow`,children:`Le fondateur`}),(0,I.jsxs)(`h2`,{className:`nh-section-title`,children:[`Yassine,`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`l'artisan`}),(0,I.jsx)(`br`,{}),`des sens`]}),(0,I.jsx)(`div`,{className:`nh-founder-signature`,children:`Yassine`}),(0,I.jsx)(`div`,{className:`nh-founder-role`,children:`Fondateur & Maître Parfumeur · Nahid Perfume`}),(0,I.jsx)(`p`,{className:`nh-section-body`,children:`Passionné par l'univers olfactif depuis son enfance dans les ruelles parfumées de Casablanca, Yassine a fondé Nahid Perfume en 2020 avec une vision claire : rendre accessible la haute parfumerie mondiale aux Marocains, sans compromis sur la qualité.`}),(0,I.jsx)(`div`,{className:`nh-founder-quote`,children:(0,I.jsx)(`p`,{children:`« Je voulais créer des parfums qui racontent l'histoire de notre Maroc — sa chaleur, sa générosité, sa beauté — tout en s'inspirant des plus grands noms mondiaux. Nahid, c'est cette rencontre entre Orient et modernité. »`})}),(0,I.jsx)(`p`,{className:`nh-section-body`,children:`Formé aux techniques des maîtres parfumeurs de Grasse et du Golfe, Yassine sélectionne personnellement chaque matière première et supervise la création de chaque fragrance. Une exigence absolue, un amour inconditionnel pour l'art des odeurs.`})]})]})})}),(0,I.jsx)(`section`,{className:`nh-section`,children:(0,I.jsx)(`div`,{className:`nh-container`,children:(0,I.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`clamp(40px,6vw,100px)`,alignItems:`start`},children:[(0,I.jsxs)(`div`,{className:`nh-aos-l`,children:[(0,I.jsx)(`div`,{className:`nh-section-eyebrow`,children:`Notre parcours`}),(0,I.jsxs)(`h2`,{className:`nh-section-title`,style:{marginBottom:`40px`},children:[`De la vision`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`à la réalité`})]}),(0,I.jsx)(`div`,{className:`nh-timeline`,children:[{year:`2020`,title:`La naissance de Nahid`,body:`Yassine lance Nahid Perfume depuis Casablanca avec 5 fragrances signatures, une passion et un rêve : démocratiser la haute parfumerie au Maroc.`},{year:`2021`,title:`Les premières collections`,body:`Lancement des collections Femme, Homme et Unisex. Plus de 200 clients les deux premiers mois. Le bouche-à-oreille fait le reste.`},{year:`2022`,title:`Expansion nationale`,body:`Livraison étendue à 15 villes marocaines. Partenariats avec des fournisseurs exclusifs d'oud au Cambodge et de roses en Arabie Saoudite.`},{year:`2023`,title:`78 fragrances au catalogue`,body:`Nahid devient l'une des marques de parfumerie artisanale les plus reconnues au Maroc avec plus de 1 500 clients fidèles.`},{year:`2024`,title:`2 400 clients & croissance`,body:`Note moyenne de 4.9/5. Extension à toutes les villes du Royaume et lancement de la collection Oud Royale, sold-out en 48h.`},{year:`2025+`,title:`L'avenir de Nahid`,body:`Ouverture de notre premier atelier-boutique à Casablanca, et lancement d'une collection capsule en collaboration avec des artisans marocains.`,dot:`gold`}].map((e,t)=>(0,I.jsxs)(`div`,{className:`nh-timeline-item`,children:[(0,I.jsx)(`div`,{className:`nh-timeline-dot`,style:e.dot===`gold`?{background:`var(--gold)`,boxShadow:`0 0 0 3px rgba(201,169,110,0.25)`}:{}}),(0,I.jsx)(`div`,{className:`nh-timeline-year`,children:e.year}),(0,I.jsx)(`div`,{className:`nh-timeline-title`,children:e.title}),(0,I.jsx)(`div`,{className:`nh-timeline-body`,children:e.body})]},t))})]}),(0,I.jsxs)(`div`,{className:`nh-aos-r`,children:[(0,I.jsx)(`div`,{className:`nh-section-eyebrow`,children:`Nos valeurs`}),(0,I.jsxs)(`h2`,{className:`nh-section-title`,style:{marginBottom:`0`},children:[`Ce qui nous`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`définit`})]}),(0,I.jsx)(`div`,{className:`nh-values-grid`,style:{gridTemplateColumns:`1fr 1fr`,marginTop:`32px`},children:[{icon:`🌹`,bg:`#FFF0EE`,iconBg:`#FFE4E0`,title:`Ingrédients nobles`,text:`Nous sourcions les matières premières les plus précieuses : oud de Camboge, rose de Taif, ambre gris et iris de Florence.`,num:`01`},{icon:`✋`,bg:`#FFF9EE`,iconBg:`#FFF0C8`,title:`Création artisanale`,text:`Chaque fragrance est assemblée à la main par nos maîtres parfumeurs, avec une attention absolue aux moindres détails.`,num:`02`},{icon:`🌿`,bg:`#F0FDF4`,iconBg:`#D1FAE5`,title:`Éco-responsable`,text:`Nos emballages sont recyclables à 100% et nous veillons à réduire notre empreinte carbone à chaque étape de production.`,num:`03`},{icon:`🔬`,bg:`#F0F4FF`,iconBg:`#DBEAFE`,title:`Formules exclusives`,text:`Développées dans notre laboratoire privé, nos formules sont uniques, protégées et ne contiennent aucun allergène commun.`,num:`04`},{icon:`🏆`,bg:`#F5F0FF`,iconBg:`#EDE9FE`,title:`Qualité premium`,text:`Chaque flacon passe par 18 contrôles qualité stricts avant d'arriver entre vos mains. Zéro compromis.`,num:`05`},{icon:`❤️`,bg:`#FFF0F4`,iconBg:`#FFE4EE`,title:`Passion pure`,text:`Nahid n'est pas une marque, c'est un amour profond pour l'art des fragrances, transmis depuis les marchés de Casablanca.`,num:`06`}].map((e,t)=>(0,I.jsxs)(`div`,{className:`nh-value-card nh-aos nh-d${Math.min(t+1,6)}`,style:{background:e.bg},children:[(0,I.jsx)(`div`,{className:`nh-value-num`,children:e.num}),(0,I.jsx)(`div`,{className:`nh-value-icon-wrap`,style:{background:e.iconBg},children:e.icon}),(0,I.jsx)(`div`,{className:`nh-value-title`,children:e.title}),(0,I.jsx)(`div`,{className:`nh-value-text`,children:e.text})]},t))})]})]})})}),(0,I.jsx)(`section`,{className:`nh-ingredients`,children:(0,I.jsx)(`div`,{className:`nh-container`,children:(0,I.jsxs)(`div`,{className:`nh-ing-grid`,children:[(0,I.jsxs)(`div`,{className:`nh-aos-l`,children:[(0,I.jsxs)(`div`,{className:`nh-section-eyebrow`,style:{color:`var(--gold)`},children:[(0,I.jsx)(`span`,{style:{width:`28px`,height:`1px`,background:`var(--gold)`,display:`block`}}),`Matières premières`]}),(0,I.jsxs)(`h2`,{className:`nh-ing-title`,children:[`Les trésors`,(0,I.jsx)(`br`,{}),`les plus précieux`,(0,I.jsx)(`br`,{}),(0,I.jsx)(`em`,{children:`du monde`})]}),(0,I.jsx)(`p`,{className:`nh-ing-body`,children:`Nous ne faisons aucun compromis sur la qualité de nos ingrédients. Chaque matière première est sourcée directement auprès des meilleurs producteurs, soigneusement sélectionnée par Yassine lors de ses voyages à travers le monde.`}),(0,I.jsx)(`div`,{className:`nh-ing-tags`,children:[`Naturel`,`Éthique`,`Traçable`,`Premium`,`Sans allergènes`,`Éco-sourcé`].map(e=>(0,I.jsx)(`span`,{className:`nh-ing-tag`,children:e},e))})]}),(0,I.jsx)(`div`,{className:`nh-ing-cards nh-aos-r`,children:[{icon:`🪵`,name:`Oud de Camboge`,origin:`Cambodge`},{icon:`🌹`,name:`Rose de Taif`,origin:`Arabie Saoudite`},{icon:`🌊`,name:`Ambre Gris`,origin:`Océan Indien`},{icon:`🌸`,name:`Iris de Florence`,origin:`Italie`},{icon:`🌲`,name:`Cèdre de l'Atlas`,origin:`Maroc`},{icon:`🍋`,name:`Bergamote`,origin:`Calabre, Italie`}].map((e,t)=>(0,I.jsxs)(`div`,{className:`nh-ing-card nh-aos nh-d${Math.min(t+1,6)}`,children:[(0,I.jsx)(`div`,{className:`nh-ing-card-icon`,children:e.icon}),(0,I.jsx)(`div`,{className:`nh-ing-card-name`,children:e.name}),(0,I.jsxs)(`div`,{className:`nh-ing-card-origin`,children:[`📍 `,e.origin]})]},t))})]})})}),(0,I.jsx)(`section`,{className:`nh-inspiration`,children:(0,I.jsxs)(`div`,{className:`nh-container`,children:[(0,I.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,I.jsxs)(`div`,{className:`nh-section-eyebrow`,style:{justifyContent:`center`},children:[(0,I.jsx)(`span`,{style:{width:`24px`,height:`1px`,background:`var(--coral)`,display:`block`}}),`Sources d'inspiration`,(0,I.jsx)(`span`,{style:{width:`24px`,height:`1px`,background:`var(--coral)`,display:`block`}})]}),(0,I.jsxs)(`h2`,{className:`nh-section-title nh-aos`,style:{marginBottom:`8px`},children:[`Inspiré par `,(0,I.jsx)(`em`,{children:`l'excellence`})]}),(0,I.jsx)(`p`,{className:`nh-aos`,style:{fontSize:`0.9rem`,color:`var(--muted)`,maxWidth:`520px`,margin:`0 auto`,lineHeight:`1.8`},children:`أشهر العطور العالمية — Nous puisons notre inspiration dans les plus grandes maisons de parfumerie mondiales pour créer des fragrances d'exception accessibles au Maroc.`})]}),(0,I.jsx)(`div`,{className:`nh-aos`,style:{display:`flex`,gap:`0`,flexWrap:`wrap`,justifyContent:`center`,margin:`48px 0 0`,border:`1px solid var(--border)`,borderRadius:`20px`,overflow:`hidden`,background:`white`},children:[`Chanel`,`Dior`,`Tom Ford`,`Creed`,`Amouage`,`Bvlgari`,`YSL`,`Guerlain`].map((e,t,n)=>(0,I.jsx)(`div`,{style:{flex:`1`,minWidth:`120px`,padding:`20px 16px`,textAlign:`center`,borderRight:t<n.length-1?`1px solid var(--border)`:`none`,fontFamily:`var(--serif)`,fontSize:`1.1rem`,color:`rgba(14,14,12,0.25)`,letterSpacing:`0.04em`,transition:`color 0.2s`,cursor:`default`},onMouseEnter:e=>e.currentTarget.style.color=`var(--ink)`,onMouseLeave:e=>e.currentTarget.style.color=`rgba(14,14,12,0.25)`,children:e},e))}),(0,I.jsx)(`div`,{className:`nh-insp-grid`,children:[{bg:`#0E0E0C`,color:`white`,tag:`Monde arabe`,tagColor:`#C9A96E`,num:`01`,title:`Héritage Oriental`,body:`Inspirés par les grands maîtres du Golfe — Amouage, Bvlgari, Al Haramain — nous avons traduit cette richesse olfactive en fragrances accessibles au Maroc.`,deco:`🕌`},{bg:`#FFF3F1`,color:`#0E0E0C`,tag:`Haute parfumerie`,tagColor:`#EF776A`,num:`02`,title:`Tradition Française`,body:`L'élégance de Chanel, Dior, Guerlain nous inspire. Leur approche du luxe discret et de la sophistication guide notre philosophie de création.`,deco:`🗼`},{bg:`#FAF8F5`,color:`#0E0E0C`,tag:`Art & nature`,tagColor:`#7A7770`,num:`03`,title:`Maroc Authentique`,body:`Les souks de Marrakech, les roses du Kelâa M'Gouna, les cèdres du Moyen Atlas — notre terre est notre plus grande source d'inspiration.`,deco:`🇲🇦`}].map((e,t)=>(0,I.jsxs)(`div`,{className:`nh-insp-card nh-aos nh-d${t+1}`,style:{background:e.bg,color:e.color},children:[(0,I.jsx)(`div`,{className:`nh-insp-card-deco`,children:e.deco}),(0,I.jsxs)(`div`,{className:`nh-insp-card-tag`,style:{color:e.tagColor},children:[(0,I.jsx)(`span`,{style:{width:`16px`,height:`1px`,background:e.tagColor,display:`inline-block`}}),e.tag]}),(0,I.jsx)(`div`,{className:`nh-insp-card-num`,style:{color:e.tagColor},children:e.num}),(0,I.jsx)(`div`,{className:`nh-insp-card-title`,children:e.title}),(0,I.jsx)(`div`,{className:`nh-insp-card-body`,children:e.body})]},t))})]})}),(0,I.jsx)(`section`,{className:`nh-delivery`,children:(0,I.jsx)(`div`,{className:`nh-container`,children:(0,I.jsxs)(`div`,{className:`nh-delivery-grid`,children:[(0,I.jsxs)(`div`,{className:`nh-aos-l`,children:[(0,I.jsx)(`div`,{className:`nh-section-eyebrow`,children:`Livraison nationale`}),(0,I.jsxs)(`h2`,{className:`nh-section-title`,children:[`Partout`,(0,I.jsx)(`br`,{}),`au `,(0,I.jsx)(`em`,{children:`Maroc 🇲🇦`})]}),(0,I.jsx)(`p`,{className:`nh-section-body`,style:{marginBottom:`28px`},children:`توصيل لجميع مدن المغرب — Nous livrons dans les 19 principales villes du Royaume, avec un délai de 24 à 48h et un suivi en temps réel.`}),(0,I.jsx)(`div`,{className:`nh-cities`,children:[`Casablanca`,`Rabat`,`Marrakech`,`Fès`,`Tanger`,`Agadir`,`Tétouan`,`Meknès`,`Oujda`,`El Jadida`,`Settat`,`Khouribga`,`Béni Mellal`,`Kénitra`,`Laâyoune`,`Dakhla`,`Safi`,`Mohammedia`,`Nador`].map(e=>(0,I.jsxs)(`span`,{className:`nh-city-chip`,children:[`📍 `,e]},e))})]}),(0,I.jsx)(`div`,{className:`nh-aos-r`,children:(0,I.jsx)(`div`,{className:`nh-delivery-card`,children:[{icon:`🚚`,title:`Livraison 24–48h`,body:`Partout au Maroc. Suivi en temps réel par SMS et email dès l'expédition de votre colis.`},{icon:`📦`,title:`Emballage luxe`,body:`Chaque commande est emballée dans notre coffret signature, avec papier de soie et carte personnalisée.`},{icon:`🎁`,title:`Échantillon offert`,body:`Un échantillon exclusif est glissé dans chaque commande pour vous faire découvrir une nouvelle fragrance.`},{icon:`↩️`,title:`Retours gratuits 30j`,body:`Pas satisfait ? Nous prenons en charge le retour sans frais et vous remboursons intégralement.`},{icon:`💳`,title:`Paiement à la livraison`,body:`Payez en cash à la réception. Aucune carte bancaire requise. 100% sécurisé et transparent.`}].map((e,t)=>(0,I.jsxs)(`div`,{className:`nh-delivery-item nh-aos nh-d${Math.min(t+1,6)}`,children:[(0,I.jsx)(`div`,{className:`nh-delivery-icon`,children:e.icon}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`nh-delivery-item-title`,children:e.title}),(0,I.jsx)(`div`,{className:`nh-delivery-item-body`,children:e.body})]})]},t))})})]})})}),(0,I.jsxs)(`section`,{className:`nh-cta`,children:[(0,I.jsx)(`div`,{className:`nh-cta-orb-1`}),(0,I.jsx)(`div`,{className:`nh-cta-orb-2`}),(0,I.jsxs)(`div`,{className:`nh-container`,style:{textAlign:`center`},children:[(0,I.jsxs)(`div`,{className:`nh-section-eyebrow nh-aos`,style:{justifyContent:`center`,color:`var(--gold)`},children:[(0,I.jsx)(`span`,{style:{width:`24px`,height:`1px`,background:`var(--gold)`,display:`block`}}),`Votre signature olfactive`,(0,I.jsx)(`span`,{style:{width:`24px`,height:`1px`,background:`var(--gold)`,display:`block`}})]}),(0,I.jsxs)(`h2`,{className:`nh-cta-title nh-aos`,children:[`Prêt à trouver`,(0,I.jsx)(`br`,{}),`votre `,(0,I.jsx)(`em`,{children:`parfum idéal ?`})]}),(0,I.jsx)(`p`,{className:`nh-cta-sub nh-aos`,children:`Rejoignez 2 400 clients qui ont déjà trouvé leur signature olfactive avec Nahid Perfume. Livraison offerte dès 500 MAD partout au Maroc.`}),(0,I.jsxs)(`div`,{className:`nh-cta-btns nh-aos`,children:[(0,I.jsx)(`a`,{href:`/`,className:`nh-btn-coral`,children:`Explorer nos parfums →`}),(0,I.jsx)(`a`,{href:`/collections/femme`,className:`nh-btn-ghost`,children:`Voir les collections`})]}),(0,I.jsx)(`div`,{className:`nh-aos`,style:{display:`flex`,gap:`24px`,justifyContent:`center`,flexWrap:`wrap`,marginTop:`52px`,paddingTop:`40px`,borderTop:`1px solid rgba(255,255,255,0.07)`},children:[{icon:`⭐`,text:`4.9/5 satisfaction`},{icon:`🇲🇦`,text:`19 villes marocaines`},{icon:`🌿`,text:`100% naturels`},{icon:`🔒`,text:`Paiement sécurisé`},{icon:`↩️`,text:`30j satisfait ou remboursé`}].map(({icon:e,text:t})=>(0,I.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,fontSize:`0.72rem`,fontWeight:`600`,color:`rgba(255,255,255,0.4)`,letterSpacing:`0.04em`},children:[(0,I.jsx)(`span`,{children:e}),t]},t))})]})]})]})};function yb(e){return fo({tag:`svg`,attr:{viewBox:`0 0 640 512`},child:[{tag:`path`,attr:{d:`M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z`},child:[]}]})(e)}function bb(e){return fo({tag:`svg`,attr:{viewBox:`0 0 24 24`,fill:`currentColor`},child:[{tag:`path`,attr:{d:`M11.0004 2V8.41396C10.5947 8.33909 10.1768 8.3 9.75039 8.3C5.96724 8.3 2.90039 11.3668 2.90039 15.15C2.90039 18.9332 5.96724 22 9.75039 22C13.5335 22 16.6004 18.9332 16.6004 15.15V11.4136C17.6366 11.8539 18.7662 12.1 20.0005 12.1H21.0005V6.5H20.0005C18.0966 6.5 16.6004 4.96259 16.6004 3V2H11.0004ZM13.0004 4H14.688C15.0818 6.22009 16.7673 7.99607 19.0005 8.4091V10.0282C17.9624 9.87602 17.0253 9.48645 16.1567 8.905L14.6004 7.86327V15.15C14.6004 17.8286 12.429 20 9.75039 20C7.07181 20 4.90039 17.8286 4.90039 15.15C4.90039 12.4714 7.07181 10.3 9.75039 10.3C9.83431 10.3 9.91769 10.3021 10.0005 10.3063V11.9095C9.91795 11.9032 9.83454 11.9 9.75039 11.9C7.95547 11.9 6.50039 13.3551 6.50039 15.15C6.50039 16.9449 7.95547 18.4 9.75039 18.4C11.5453 18.4 13.0004 16.9449 13.0004 15.15C13.0004 11.4334 12.9992 7.71665 13.0004 4ZM8.50039 15.15C8.50039 14.4596 9.06003 13.9 9.75039 13.9C10.4407 13.9 11.0004 14.4596 11.0004 15.15C11.0004 15.8404 10.4407 16.4 9.75039 16.4C9.06003 16.4 8.50039 15.8404 8.50039 15.15Z`},child:[]}]})(e)}var xb=[`✦ Livraison offerte dès 500 MAD`,`✦ Échantillon gratuit avec chaque commande`,`✦ Nouveauté — Collection Oud de Camboge`,`✦ Retours 100% gratuits sous 30 jours`,`✦ Paiement sécurisé — CB · PayPal · Virement`];function Sb({cartCount:e=0,isAdminLoggedIn:t,setIsAdminLoggedIn:n}){let r=dt(),i=ct(),[a,o]=(0,v.useState)(!1),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(!1),[d,f]=(0,v.useState)(``),[p,m]=(0,v.useState)(0),[h,g]=(0,v.useState)(!1),_=(0,v.useRef)(null),y=(0,v.useRef)(null),b=!!localStorage.getItem(`adminToken`)||t;i.pathname,(0,v.useEffect)(()=>{let e=()=>{c(window.scrollY>30);let e=document.documentElement,t=e.scrollHeight-e.clientHeight;m(t>0?Math.min(100,window.scrollY/t*100):0)};return e(),window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]),(0,v.useEffect)(()=>{o(!1),u(!1)},[i]),(0,v.useEffect)(()=>{let e=e=>{_.current&&!_.current.contains(e.target)&&u(!1)};return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[]),(0,v.useEffect)(()=>(document.body.style.overflow=a?`hidden`:``,()=>{document.body.style.overflow=``}),[a]),(0,v.useEffect)(()=>{l&&y.current&&setTimeout(()=>y.current?.focus(),50)},[l]);let x=()=>{localStorage.removeItem(`adminToken`),n&&n(!1),r(`/`),window.location.reload()},S=e=>{e?.preventDefault();let t=document.getElementById(`collection`)||document.getElementById(`products`);t?t.scrollIntoView({behavior:`smooth`}):(r(`/`),setTimeout(()=>{document.getElementById(`collection`)?.scrollIntoView({behavior:`smooth`})},120)),o(!1)},C=e=>{e.preventDefault(),d.trim()&&(r(`/?search=${encodeURIComponent(d.trim())}`),u(!1),f(``))},w=[{to:`/`,label:`Accueil`,icon:(0,I.jsx)(So,{size:13}),exact:!0},{to:`/notre-histoire`,label:`Notre Histoire`,icon:(0,I.jsx)(Oo,{size:13}),exact:!1},{isAction:!0,label:`Collection`,icon:(0,I.jsx)(wo,{size:13})}],T=e=>e.isAction?!1:e.exact?i.pathname===e.to:i.pathname.startsWith(e.to)&&e.to!==`/`,E=[...xb,...xb];return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --nb-ink: #0E0E0C;
          --nb-cream: #FAF8F5;
          --nb-sand: #EDE9E1;
          --nb-coral: #C8956C;
          --nb-coral-d: #B07A55;
          --nb-gold: #C9A96E;
          --nb-gold-l: #E8D5B0;
          --nb-muted: #8A8680;
          --nb-border: rgba(14,14,12,0.09);
          --nb-serif: 'Cormorant Garamond', Georgia, serif;
          --nb-sans: 'Jost', sans-serif;
          --nb-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          --nb-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
          --nb-h: 72px;
        }

        .nb-ann {
          background: linear-gradient(90deg, #0E0E0C 0%, #1a1814 50%, #0E0E0C 100%);
          height: 36px;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }
        .nb-ann::before, .nb-ann::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .nb-ann::before {
          left: 0;
          background: linear-gradient(90deg, #0E0E0C, transparent);
        }
        .nb-ann::after {
          right: 0;
          background: linear-gradient(-90deg, #0E0E0C, transparent);
        }
        .nb-ann-track {
          display: flex;
          white-space: nowrap;
          animation: annScroll 36s linear infinite;
          will-change: transform;
          align-items: center;
        }
        .nb-ann-track:hover { animation-play-state: paused; }
        @keyframes annScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nb-ann-item {
          font-family: var(--nb-sans);
          font-size: 0.64rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          display: inline-flex;
          align-items: center;
          padding: 0 36px;
          flex-shrink: 0;
          gap: 8px;
        }
        .nb-ann-item span.star {
          color: var(--nb-gold);
          font-size: 0.5rem;
        }
        .nb-ann-sep {
          width: 1px;
          height: 10px;
          background: rgba(201,169,110,0.3);
          flex-shrink: 0;
        }

        .nb-root {
          position: sticky;
          top: 0;
          z-index: 999;
          font-family: var(--nb-sans);
          background: var(--nb-cream);
          transition: box-shadow 0.4s var(--nb-ease), background 0.5s var(--nb-ease), border-color 0.4s var(--nb-ease);
        }
        .nb-root::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--nb-gold-l), transparent);
          opacity: 0.6;
          transition: opacity 0.4s;
        }
        .nb-root.scrolled {
          background: rgba(250,248,245,0.96);
          backdrop-filter: blur(24px) saturate(1.4);
          box-shadow: 0 1px 0 rgba(201,169,110,0.15), 0 8px 32px rgba(14,14,12,0.07), 0 2px 8px rgba(14,14,12,0.04);
        }
        .nb-root.scrolled::after { opacity: 0.9; }
        
        .nb-root.hero-mode { background: var(--nb-cream) !important; }
        .nb-root.hero-mode::after { opacity: 0.6 !important; }
        
        .nb-logo-name { color: var(--nb-ink) !important; }
        .nb-logo-sub { color: var(--nb-muted) !important; }
        .nb-link { color: var(--nb-muted) !important; }
        .nb-link:hover { color: var(--nb-ink) !important; background: var(--nb-sand) !important; }
        .nb-link.active { color: var(--nb-ink) !important; }
        .nb-icon-btn { color: var(--nb-ink) !important; }
        .nb-icon-btn:hover { color: var(--nb-coral) !important; background: var(--nb-sand) !important; }
        .nb-pill-ghost { color: var(--nb-ink) !important; border-color: var(--nb-border) !important; }
        .nb-pill-ghost:hover { color: var(--nb-gold) !important; border-color: var(--nb-gold) !important; }

        .nb-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--nb-gold), var(--nb-coral), var(--nb-gold));
          background-size: 200% 100%;
          animation: progressShimmer 3s linear infinite;
          transition: width 0.1s linear;
          z-index: 10;
        }
        @keyframes progressShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .nb-bar {
          height: var(--nb-h);
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 clamp(18px, 4vw, 72px);
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 24px;
        }

        /* ===== NOUVEAU STYLE LOGO AVEC IMAGE ===== */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 13px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb-logo-img {
          height: 42px;
          width: auto;
          max-width: 140px;
          object-fit: contain;
          transition: transform 0.3s var(--nb-spring);
        }
        .nb-logo:hover .nb-logo-img {
          transform: scale(1.02);
        }
        .nb-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .nb-logo-name {
          font-family: var(--nb-serif);
          font-size: 1.12rem;
          font-weight: 600;
          color: var(--nb-ink);
          letter-spacing: 0.01em;
        }
        .nb-logo-sub {
          font-size: 0.57rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--nb-muted);
          margin-top: 3px;
        }
        @media (max-width: 640px) {
          .nb-logo-img {
            height: 32px;
          }
          .nb-logo-sub {
            display: none;
          }
        }

        .nb-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        .nb-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--nb-muted);
          border-radius: 999px;
          transition: color 0.25s var(--nb-ease), background 0.25s var(--nb-ease);
          white-space: nowrap;
        }
        .nb-link svg { transition: transform 0.25s var(--nb-spring), opacity 0.2s; opacity: 0.5; flex-shrink: 0; }
        .nb-link:hover { color: var(--nb-ink); background: var(--nb-sand); }
        .nb-link:hover svg { opacity: 1; transform: translateY(-1px); }
        .nb-link.active { color: var(--nb-ink); font-weight: 600; }
        .nb-link.active::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 1.5px;
          background: linear-gradient(90deg, var(--nb-gold), var(--nb-coral));
          border-radius: 999px;
        }
        .nb-link.active svg { opacity: 1; color: var(--nb-gold); }

        .nb-actions {
          display: flex;
          align-items: center;
          gap: 3px;
          flex-shrink: 0;
        }
        .nb-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-ink);
          cursor: pointer;
          transition: background 0.22s, color 0.22s, transform 0.25s var(--nb-spring);
          position: relative;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nb-icon-btn:hover {
          background: var(--nb-sand);
          color: var(--nb-coral);
          transform: translateY(-2px);
        }
        .nb-icon-btn:active { transform: scale(0.94); }

        .nb-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          min-width: 17px;
          height: 17px;
          background: linear-gradient(135deg, var(--nb-coral), #b07a55);
          color: white;
          font-size: 0.55rem;
          font-weight: 700;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          line-height: 1;
          border: 2px solid var(--nb-cream);
          box-shadow: 0 2px 8px rgba(200,149,108,0.4);
        }

        .nb-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s var(--nb-ease);
          white-space: nowrap;
          flex-shrink: 0;
          font-family: var(--nb-sans);
          line-height: 1;
          border: none;
        }
        .nb-pill-gold {
          background: linear-gradient(135deg, var(--nb-gold), var(--nb-coral));
          color: white;
          box-shadow: 0 4px 16px rgba(201,169,110,0.25);
        }
        .nb-pill-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,169,110,0.38);
          filter: brightness(1.05);
        }
        .nb-pill-ghost {
          background: transparent;
          color: var(--nb-ink);
          border: 1.5px solid var(--nb-border);
        }
        .nb-pill-ghost:hover {
          border-color: var(--nb-gold);
          color: var(--nb-gold);
          transform: translateY(-2px);
          background: rgba(201,169,110,0.05);
        }

        .nb-vline {
          width: 1px;
          height: 22px;
          background: var(--nb-border);
          margin: 0 6px;
          flex-shrink: 0;
          transition: background 0.3s;
        }

        .nb-search-wrap { position: relative; }
        .nb-search-box {
          position: absolute;
          top: calc(100% + 14px);
          right: -14px;
          width: 320px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(14,14,12,0.12), 0 0 0 1px rgba(201,169,110,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
          padding: 10px;
          z-index: 300;
          transform-origin: top right;
          animation: searchIn 0.25s var(--nb-spring);
        }
        @keyframes searchIn {
          0% { opacity: 0; transform: scale(0.88) translateY(-12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .nb-search-inner {
          display: flex;
          align-items: center;
          background: var(--nb-sand);
          border-radius: 12px;
          padding: 0 14px;
          gap: 10px;
          transition: box-shadow 0.22s, background 0.22s;
        }
        .nb-search-inner.focused {
          background: white;
          box-shadow: 0 0 0 2px var(--nb-gold), 0 4px 16px rgba(201,169,110,0.15);
        }
        .nb-search-inner input {
          flex: 1;
          border: none;
          background: none;
          font-family: var(--nb-sans);
          font-size: 0.86rem;
          color: var(--nb-ink);
          padding: 13px 0;
          outline: none;
        }
        .nb-search-inner input::placeholder { color: var(--nb-muted); }
        .nb-search-submit {
          background: none;
          border: none;
          color: var(--nb-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.2s, transform 0.2s var(--nb-spring);
          border-radius: 8px;
        }
        .nb-search-submit:hover { color: var(--nb-coral); transform: scale(1.15); }
        .nb-search-hint {
          font-family: var(--nb-sans);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--nb-muted);
          padding: 8px 14px 2px;
          text-transform: uppercase;
        }

        .nb-mobile-actions { display: none; align-items: center; gap: 2px; }

        .nb-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(14,14,12,0.55);
          backdrop-filter: blur(10px) saturate(0.8);
          z-index: 1000;
          animation: bkIn 0.3s ease;
        }
        @keyframes bkIn { from { opacity: 0; } to { opacity: 1; } }

        .nb-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 360px;
          max-width: 95vw;
          height: 100dvh;
          background: #FDFBF8;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
          box-shadow: -32px 0 80px rgba(14,14,12,0.16), -1px 0 0 rgba(201,169,110,0.1);
        }
        .nb-drawer.open { transform: translateX(0); }
        .nb-drawer.close { transform: translateX(110%); }

        .nb-drawer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--nb-gold), var(--nb-coral), var(--nb-gold), transparent);
        }

        .nb-drawer-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 24px 20px;
          border-bottom: 1px solid var(--nb-border);
          flex-shrink: 0;
          background: white;
        }
        .nb-drawer-logo { display: flex; align-items: center; gap: 11px; text-decoration: none; }
        .nb-drawer-gem {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--nb-ink);
          border: 1px solid rgba(201,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--nb-serif);
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }
        .nb-drawer-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
        .nb-drawer-logo-name {
          font-family: var(--nb-serif);
          font-size: 1.02rem;
          font-weight: 600;
          color: var(--nb-ink);
        }
        .nb-drawer-logo-sub {
          font-size: 0.54rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--nb-muted);
          margin-top: 3px;
        }
        .nb-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--nb-border);
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-muted);
          transition: background 0.2s, color 0.2s, transform 0.25s var(--nb-spring), border-color 0.2s;
          flex-shrink: 0;
        }
        .nb-close-btn:hover {
          background: var(--nb-ink);
          color: white;
          border-color: var(--nb-ink);
          transform: rotate(90deg);
        }

        .nb-drawer-search {
          margin: 16px 20px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          background: var(--nb-sand);
          padding: 0 16px;
          gap: 10px;
          flex-shrink: 0;
          transition: box-shadow 0.22s, background 0.22s;
        }
        .nb-drawer-search:focus-within {
          background: white;
          box-shadow: 0 0 0 2px var(--nb-gold), 0 4px 16px rgba(201,169,110,0.12);
        }
        .nb-drawer-search input {
          flex: 1;
          border: none;
          background: none;
          font-family: var(--nb-sans);
          font-size: 0.85rem;
          color: var(--nb-ink);
          padding: 13px 0;
          outline: none;
        }
        .nb-drawer-search input::placeholder { color: var(--nb-muted); }

        .nb-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 6px 0 16px;
          overscroll-behavior: contain;
        }
        .nb-drawer-body::-webkit-scrollbar { width: 4px; }
        .nb-drawer-body::-webkit-scrollbar-track { background: transparent; }
        .nb-drawer-body::-webkit-scrollbar-thumb { background: var(--nb-sand); border-radius: 2px; }

        .nb-m-section-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--nb-muted);
          padding: 16px 24px 6px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nb-m-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--nb-border), transparent);
        }

        .nb-m-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 13px 24px;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          color: var(--nb-ink);
          letter-spacing: 0.025em;
          transition: background 0.18s, padding-left 0.22s var(--nb-ease);
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: var(--nb-sans);
        }
        .nb-m-link:hover { background: var(--nb-sand); padding-left: 32px; }
        .nb-m-link.active { color: var(--nb-coral); }
        .nb-m-link.active .nb-m-icon { color: var(--nb-coral); }
        .nb-m-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: var(--nb-sand);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-muted);
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .nb-m-link:hover .nb-m-icon { background: white; color: var(--nb-coral); }
        .nb-m-link-text { flex: 1; }
        .nb-m-chevron { color: var(--nb-muted); opacity: 0.4; transition: opacity 0.18s, transform 0.18s; }
        .nb-m-link:hover .nb-m-chevron { opacity: 0.7; transform: translateX(3px); }
        .nb-m-tag {
          background: linear-gradient(135deg, var(--nb-gold), var(--nb-coral));
          color: white;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          border-radius: 999px;
          padding: 2px 8px;
          line-height: 1.5;
          flex-shrink: 0;
        }

        .nb-drawer-foot {
          border-top: 1px solid var(--nb-border);
          padding: 18px 20px 22px;
          flex-shrink: 0;
          background: white;
        }
        .nb-drawer-foot-cta { display: flex; gap: 10px; margin-bottom: 16px; }
        .nb-social-row {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .nb-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--nb-border);
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nb-muted);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.25s var(--nb-spring);
        }
        .nb-social-btn:hover {
          background: var(--nb-ink);
          color: white;
          border-color: var(--nb-ink);
          transform: translateY(-3px);
        }
        .nb-social-divider {
          height: 1px;
          background: var(--nb-border);
          margin: 14px 0;
        }
        .nb-foot-legal {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nb-foot-legal a {
          font-size: 0.65rem;
          color: var(--nb-muted);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .nb-foot-legal a:hover { color: var(--nb-coral); }

        @media (max-width: 960px) {
          .nb-links { display: none !important; }
          .nb-actions { display: none !important; }
          .nb-mobile-actions { display: flex !important; }
          .nb-bar {
            grid-template-columns: auto auto;
            justify-content: space-between;
            gap: 0;
          }
        }
        @media (max-width: 640px) {
          :root { --nb-h: 64px; }
          .nb-logo-sub { display: none; }
          .nb-ann { height: 32px; }
          .nb-ann-item { font-size: 0.6rem; padding: 0 24px; }
        }
        @media (max-width: 480px) {
          .nb-drawer { max-width: 100vw; width: 100%; }
        }
        @media (max-width: 360px) {
          .nb-logo-text { display: none; }
        }
      `}),(0,I.jsx)(`div`,{className:`nb-ann`,"aria-label":`Informations promotionnelles`,children:(0,I.jsx)(`div`,{className:`nb-ann-track`,"aria-hidden":`true`,children:E.map((e,t)=>(0,I.jsxs)(`span`,{className:`nb-ann-item`,children:[t>0&&(0,I.jsx)(`span`,{className:`nb-ann-sep`}),(0,I.jsx)(`span`,{className:`star`,children:`✦`}),e.replace(`✦ `,``)]},t))})}),(0,I.jsxs)(`nav`,{className:[`nb-root`,s?`scrolled`:``,``].filter(Boolean).join(` `),role:`navigation`,"aria-label":`Navigation principale`,children:[(0,I.jsx)(`div`,{className:`nb-progress`,style:{width:`${p}%`},"aria-hidden":`true`}),(0,I.jsxs)(`div`,{className:`nb-bar`,children:[(0,I.jsx)(An,{to:`/`,className:`nb-logo`,"aria-label":`Nahid Perfume — Retour à l'accueil`,children:(0,I.jsx)(`img`,{src:`/nahid.png`,alt:`Nahid Perfume`,className:`nb-logo-img`,onError:e=>{e.target.onerror=null,e.target.src=`https://placehold.co/120x40/EF776A/white?text=Nahid`}})}),(0,I.jsx)(`div`,{className:`nb-links`,role:`menubar`,children:w.map((e,t)=>e.isAction?(0,I.jsxs)(`a`,{href:`#collection`,onClick:S,className:`nb-link`,role:`menuitem`,children:[e.icon,` `,e.label]},t):(0,I.jsxs)(An,{to:e.to,className:`nb-link${T(e)?` active`:``}`,role:`menuitem`,"aria-current":T(e)?`page`:void 0,children:[e.icon,` `,e.label]},e.to))}),(0,I.jsxs)(`div`,{className:`nb-actions`,children:[(0,I.jsxs)(`div`,{className:`nb-search-wrap`,ref:_,children:[(0,I.jsx)(`button`,{className:`nb-icon-btn`,onClick:()=>u(e=>!e),"aria-label":`Rechercher`,"aria-expanded":l,children:(0,I.jsx)(vo,{size:16})}),l&&(0,I.jsxs)(`div`,{className:`nb-search-box`,role:`dialog`,"aria-label":`Recherche`,children:[(0,I.jsx)(`p`,{className:`nb-search-hint`,children:`Rechercher`}),(0,I.jsxs)(`form`,{onSubmit:C,className:`nb-search-inner${h?` focused`:``}`,children:[(0,I.jsx)(vo,{size:14,style:{color:`var(--nb-muted)`,flexShrink:0}}),(0,I.jsx)(`input`,{ref:y,type:`search`,placeholder:`Rechercher un parfum…`,value:d,onChange:e=>f(e.target.value),onFocus:()=>g(!0),onBlur:()=>g(!1),"aria-label":`Terme de recherche`}),(0,I.jsx)(`button`,{type:`submit`,className:`nb-search-submit`,"aria-label":`Lancer la recherche`,children:(0,I.jsx)(Eo,{size:16})})]})]})]}),(0,I.jsx)(An,{to:`/wishlist`,className:`nb-icon-btn`,"aria-label":`Liste de souhaits`,children:(0,I.jsx)(Co,{size:16})}),(0,I.jsx)(`div`,{className:`nb-vline`,"aria-hidden":`true`}),b?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(An,{to:`/admin`,className:`nb-pill nb-pill-gold`,style:{padding:`8px 16px`,fontSize:`0.67rem`},children:[(0,I.jsx)(yb,{size:10}),` Dashboard`]}),(0,I.jsxs)(`button`,{onClick:x,className:`nb-pill nb-pill-ghost`,style:{padding:`8px 15px`,fontSize:`0.67rem`},children:[(0,I.jsx)(bo,{size:11}),` Déconnexion`]})]}):(0,I.jsxs)(An,{to:`/admin`,className:`nb-pill nb-pill-ghost`,style:{padding:`8px 16px`,fontSize:`0.7rem`},children:[(0,I.jsx)(ho,{size:12}),` Espace Pro`]}),(0,I.jsx)(`div`,{className:`nb-vline`,"aria-hidden":`true`}),(0,I.jsxs)(An,{to:`/cart`,className:`nb-icon-btn`,"aria-label":`Panier — ${e} article${e===1?``:`s`}`,children:[(0,I.jsx)(L,{size:17}),e>0&&(0,I.jsx)(`span`,{className:`nb-badge`,"aria-hidden":`true`,children:e>99?`99+`:e})]})]}),(0,I.jsxs)(`div`,{className:`nb-mobile-actions`,children:[(0,I.jsxs)(An,{to:`/cart`,className:`nb-icon-btn`,"aria-label":`Panier`,children:[(0,I.jsx)(L,{size:19}),e>0&&(0,I.jsx)(`span`,{className:`nb-badge`,"aria-hidden":`true`,children:e>99?`99+`:e})]}),(0,I.jsx)(`button`,{className:`nb-icon-btn`,onClick:()=>o(!0),"aria-label":`Ouvrir le menu`,"aria-expanded":a,children:(0,I.jsx)(yo,{size:21})})]})]})]}),a&&(0,I.jsx)(`div`,{className:`nb-backdrop`,onClick:()=>o(!1),"aria-hidden":`true`}),(0,I.jsxs)(`aside`,{className:`nb-drawer ${a?`open`:`close`}`,role:`dialog`,"aria-modal":`true`,"aria-label":`Menu de navigation mobile`,children:[(0,I.jsxs)(`div`,{className:`nb-drawer-head`,children:[(0,I.jsxs)(An,{to:`/`,className:`nb-drawer-logo`,onClick:()=>o(!1),children:[(0,I.jsx)(`div`,{className:`nb-drawer-gem`,children:`N`}),(0,I.jsxs)(`div`,{className:`nb-drawer-logo-text`,children:[(0,I.jsx)(`span`,{className:`nb-drawer-logo-name`,children:`Nahid Perfume`}),(0,I.jsx)(`span`,{className:`nb-drawer-logo-sub`,children:`Maison de Parfums · Casablanca`})]})]}),(0,I.jsx)(`button`,{className:`nb-close-btn`,onClick:()=>o(!1),"aria-label":`Fermer`,children:(0,I.jsx)(mo,{size:16})})]}),(0,I.jsxs)(`form`,{onSubmit:C,className:`nb-drawer-search`,children:[(0,I.jsx)(vo,{size:15,style:{color:`var(--nb-muted)`,flexShrink:0}}),(0,I.jsx)(`input`,{type:`search`,placeholder:`Rechercher un parfum…`,value:d,onChange:e=>f(e.target.value),"aria-label":`Recherche`})]}),(0,I.jsxs)(`nav`,{className:`nb-drawer-body`,children:[(0,I.jsx)(`div`,{className:`nb-m-section-label`,children:`Navigation`}),w.map((e,t)=>e.isAction?(0,I.jsxs)(`a`,{href:`#collection`,onClick:S,className:`nb-m-link`,children:[(0,I.jsx)(`div`,{className:`nb-m-icon`,children:e.icon}),(0,I.jsx)(`span`,{className:`nb-m-link-text`,children:e.label}),(0,I.jsx)(Eo,{size:14,className:`nb-m-chevron`})]},t):(0,I.jsxs)(An,{to:e.to,className:`nb-m-link${T(e)?` active`:``}`,onClick:()=>o(!1),"aria-current":T(e)?`page`:void 0,children:[(0,I.jsx)(`div`,{className:`nb-m-icon`,children:e.icon}),(0,I.jsx)(`span`,{className:`nb-m-link-text`,children:e.label}),(0,I.jsx)(Eo,{size:14,className:`nb-m-chevron`})]},e.to)),(0,I.jsxs)(An,{to:`/wishlist`,className:`nb-m-link`,onClick:()=>o(!1),children:[(0,I.jsx)(`div`,{className:`nb-m-icon`,children:(0,I.jsx)(Co,{size:14})}),(0,I.jsx)(`span`,{className:`nb-m-link-text`,children:`Liste de souhaits`}),(0,I.jsx)(Eo,{size:14,className:`nb-m-chevron`})]}),(0,I.jsx)(`div`,{className:`nb-m-section-label`,children:`Mon compte`}),b?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(An,{to:`/admin`,className:`nb-m-link`,onClick:()=>o(!1),children:[(0,I.jsx)(`div`,{className:`nb-m-icon`,children:(0,I.jsx)(yb,{size:13})}),(0,I.jsx)(`span`,{className:`nb-m-link-text`,children:`Dashboard`}),(0,I.jsx)(`span`,{className:`nb-m-tag`,children:`Admin`})]}),(0,I.jsxs)(`button`,{className:`nb-m-link`,onClick:x,style:{color:`var(--nb-muted)`},children:[(0,I.jsx)(`div`,{className:`nb-m-icon`,children:(0,I.jsx)(bo,{size:14})}),(0,I.jsx)(`span`,{className:`nb-m-link-text`,children:`Déconnexion`})]})]}):(0,I.jsxs)(An,{to:`/admin`,className:`nb-m-link`,onClick:()=>o(!1),style:{color:`var(--nb-coral)`},children:[(0,I.jsx)(`div`,{className:`nb-m-icon`,children:(0,I.jsx)(ho,{size:14})}),(0,I.jsx)(`span`,{className:`nb-m-link-text`,children:`Espace Pro`}),(0,I.jsx)(Eo,{size:14,className:`nb-m-chevron`})]}),(0,I.jsx)(`div`,{className:`nb-m-section-label`,children:`Aide & Infos`}),[{label:`Livraison & Retours`,to:`/livraison`},{label:`FAQ`,to:`/faq`},{label:`Contact`,to:`/contact`}].map(({label:e,to:t})=>(0,I.jsxs)(An,{to:t,className:`nb-m-link`,onClick:()=>o(!1),children:[(0,I.jsx)(`div`,{className:`nb-m-icon`,style:{background:`transparent`}}),(0,I.jsx)(`span`,{className:`nb-m-link-text`,style:{color:`var(--nb-muted)`,fontSize:`0.84rem`},children:e}),(0,I.jsx)(Eo,{size:14,className:`nb-m-chevron`})]},t))]}),(0,I.jsxs)(`div`,{className:`nb-drawer-foot`,children:[(0,I.jsxs)(`div`,{className:`nb-drawer-foot-cta`,children:[(0,I.jsx)(`a`,{href:`#collection`,onClick:e=>{S(e),o(!1)},className:`nb-pill nb-pill-gold`,style:{flex:1,justifyContent:`center`,padding:`12px 16px`},children:`Explorer la collection`}),(0,I.jsxs)(An,{to:`/cart`,className:`nb-pill nb-pill-ghost`,style:{padding:`12px 16px`},onClick:()=>o(!1),"aria-label":`Panier`,children:[(0,I.jsx)(L,{size:16}),e>0&&(0,I.jsx)(`span`,{className:`nb-m-tag`,children:e})]})]}),(0,I.jsx)(`div`,{className:`nb-social-divider`}),(0,I.jsxs)(`div`,{className:`nb-social-row`,children:[(0,I.jsx)(`a`,{href:`#`,className:`nb-social-btn`,"aria-label":`Instagram`,children:(0,I.jsx)(xo,{size:15})}),(0,I.jsx)(`a`,{href:`#`,className:`nb-social-btn`,"aria-label":`TikTok`,children:(0,I.jsx)(bb,{size:15})}),(0,I.jsx)(`a`,{href:`#`,className:`nb-social-btn`,"aria-label":`Facebook`,children:(0,I.jsx)(To,{size:15})})]}),(0,I.jsx)(`div`,{className:`nb-social-divider`}),(0,I.jsxs)(`div`,{className:`nb-foot-legal`,children:[(0,I.jsx)(`a`,{href:`#`,children:`Mentions légales`}),(0,I.jsx)(`a`,{href:`#`,children:`Confidentialité`}),(0,I.jsx)(`a`,{href:`#`,children:`CGV`})]})]})]})]})}var Cb=`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  :root {
    --ink:          #0E0E0C;
    --cream:        #FAF8F5;
    --sand:         #EDE9E1;
    --white:        #FFFFFF;
    --coral:        #EF776A;
    --coral-dark:   #D35F52;
    --gold:         #C9A96E;
    --gold-light:   #F0E2C4;
    --muted:        #7A7770;
    --border:       rgba(14,14,12,0.09);
    --sans:         'Poppins', sans-serif;
    --serif:        'Cormorant Garamond', Georgia, serif;
    --ease:         cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Global resets for collection pages ── */
  .coll-page * { box-sizing: border-box; }
  .coll-page { font-family: var(--sans); }

  /* ── Animations ── */
  @keyframes collFadeUp  { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
  @keyframes collSlideL  { from{opacity:0;transform:translateX(-32px);} to{opacity:1;transform:translateX(0);} }
  @keyframes collSlideR  { from{opacity:0;transform:translateX(32px);}  to{opacity:1;transform:translateX(0);} }
  @keyframes collScale   { from{opacity:0;transform:scale(0.94);}       to{opacity:1;transform:scale(1);} }
  @keyframes collSpin    { to{transform:rotate(360deg);} }
  @keyframes collShimmer { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
  @keyframes collLine    { from{transform:scaleX(0);} to{transform:scaleX(1);} }
  @keyframes collFloat   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
  @keyframes collGrain   { 0%,100%{transform:translate(0,0);}
    10%{transform:translate(-2%,-3%);} 30%{transform:translate(3%,-1%);}
    50%{transform:translate(-1%,3%);} 70%{transform:translate(2%,1%);} }
  @keyframes collItemIn  { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
  @keyframes collPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(239,119,106,0);} 60%{box-shadow:0 0 0 8px rgba(239,119,106,0.12);} }

  /* ── Scroll animation utility ── */
  .coll-aos { opacity:0; transform:translateY(24px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
  .coll-aos.coll-visible { opacity:1; transform:translateY(0); }
  .coll-aos.d1 { transition-delay:0.08s; }
  .coll-aos.d2 { transition-delay:0.16s; }
  .coll-aos.d3 { transition-delay:0.24s; }
  .coll-aos.d4 { transition-delay:0.32s; }

  /* ─────────────────────────────────────────
     PAGE
  ───────────────────────────────────────── */
  .coll-page {
    background: var(--cream);
    min-height: 100vh;
    padding-top: 80px;
    position: relative;
    overflow-x: hidden;
  }

  /* ─────────────────────────────────────────
     HERO
  ───────────────────────────────────────── */
  .coll-hero {
    position: relative;
    min-height: clamp(480px, 60vh, 680px);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    margin-bottom: 0;
  }

  /* Background image fills hero */
  .coll-hero-bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 8s ease;
    transform-origin: center;
  }
  .coll-hero:hover .coll-hero-bg { transform: scale(1.04); }

  .coll-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(10,10,8,0.88) 0%,
      rgba(10,10,8,0.45) 45%,
      rgba(10,10,8,0.12) 100%
    );
  }

  /* Grain texture overlay */
  .coll-hero-grain {
    position: absolute; inset: -50%;
    width: 200%; height: 200%;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    animation: collGrain 8s steps(1) infinite;
    pointer-events: none;
  }

  .coll-hero-content {
    position: relative; z-index: 3;
    padding: 0 clamp(20px,6vw,96px) clamp(48px,7vh,96px);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-end;
    gap: 40px;
  }

  .coll-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 18px;
    animation: collFadeUp 0.7s var(--ease) 0.1s both;
  }
  .coll-hero-eyebrow::before {
    content:'';
    display:block;
    width:28px; height:1px;
    background: var(--gold);
  }

  .coll-hero-title {
    font-family: var(--sans);
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 900;
    color: white;
    letter-spacing: -0.03em;
    line-height: 0.95;
    margin-bottom: 0;
    animation: collSlideL 0.8s var(--ease) 0.2s both;
  }
  .coll-hero-title em {
    font-style: italic;
    font-weight: 300;
    font-family: var(--serif);
    font-size: 1.08em;
  }

  .coll-hero-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    animation: collSlideR 0.8s var(--ease) 0.3s both;
  }
  .coll-hero-desc {
    font-size: clamp(0.82rem, 1.1vw, 0.95rem);
    font-weight: 400;
    line-height: 1.85;
    color: rgba(255,255,255,0.65);
    max-width: 340px;
  }
  .coll-hero-stats {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
  }
  .coll-hero-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .coll-hero-stat strong {
    font-family: var(--sans);
    font-size: 1.5rem;
    font-weight: 900;
    color: white;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .coll-hero-stat span {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  /* Scroll hint */
  .coll-hero-scroll {
    position: absolute;
    bottom: 32px; right: clamp(20px,4vw,60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 4;
    animation: collFadeUp 0.8s var(--ease) 0.6s both;
  }
  .coll-hero-scroll-line {
    width:1px; height:48px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
    animation: collShimmer 2s ease-in-out infinite;
  }
  .coll-hero-scroll-label {
    font-size:0.55rem; font-weight:700; letter-spacing:0.22em;
    text-transform:uppercase; color:rgba(255,255,255,0.4);
    writing-mode:vertical-rl;
  }

  /* Category badge pill */
  .coll-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 999px;
    padding: 9px 20px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    animation: collFadeUp 0.7s var(--ease) 0.45s both;
    width: fit-content;
  }
  .coll-hero-badge .badge-dot {
    width:6px; height:6px; border-radius:50%; flex-shrink:0;
  }

  /* ─────────────────────────────────────────
     FILTER BAR
  ───────────────────────────────────────── */
  .coll-filter-section {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(16px);
    background: rgba(255,255,255,0.92);
  }
  .coll-filter-inner {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 clamp(16px,5vw,80px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    min-height: 64px;
  }

  .coll-filter-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .coll-filter-label {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-right: 4px;
    white-space: nowrap;
  }

  /* Filter chips */
  .coll-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 999px;
    border: 1.5px solid var(--border);
    background: var(--cream);
    font-family: var(--sans);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s var(--ease-spring);
    white-space: nowrap;
  }
  .coll-chip:hover {
    border-color: var(--coral);
    color: var(--coral);
    transform: translateY(-1px);
  }
  .coll-chip.active {
    background: var(--coral);
    border-color: var(--coral);
    color: white;
    box-shadow: 0 4px 14px rgba(239,119,106,0.3);
    transform: translateY(-1px);
  }

  .coll-filter-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .coll-count-badge {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .coll-count-badge strong { color: var(--ink); }

  /* Sort select */
  .coll-sort {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    background: var(--cream);
    font-family: var(--sans);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A7770' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
    transition: border-color 0.2s;
  }
  .coll-sort:focus { border-color: var(--coral); }

  /* View toggle */
  .coll-view-btns {
    display: flex;
    gap: 4px;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 3px;
  }
  .coll-view-btn {
    width: 32px; height: 32px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-size: 0.85rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
    font-family: var(--sans);
  }
  .coll-view-btn.active {
    background: var(--white);
    color: var(--ink);
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }

  /* ─────────────────────────────────────────
     PRODUCTS SECTION
  ───────────────────────────────────────── */
  .coll-products-section {
    max-width: 1320px;
    margin: 0 auto;
    padding: clamp(40px,5vw,72px) clamp(16px,5vw,80px) clamp(60px,8vw,120px);
  }

  /* Grid view */
  .coll-grid {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .coll-grid.cols-2 { grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); }
  .coll-grid.cols-4 { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }

  /* Product card wrapper for animation */
  .coll-card-wrap {
    animation: collItemIn 0.5s var(--ease) both;
  }

  /* ── Loading skeletons ── */
  .coll-skeleton {
    border-radius: 20px;
    height: 380px;
    background: linear-gradient(90deg, #eeece8 25%, #f5f3f0 50%, #eeece8 75%);
    background-size: 200% 100%;
    animation: collSpin 0s, collShimmer 1.5s ease-in-out infinite;
  }
  @keyframes collSkeletonMove {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .coll-skeleton { animation: collSkeletonMove 1.5s ease-in-out infinite; }

  /* ── Empty state ── */
  .coll-empty {
    text-align: center;
    padding: 80px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .coll-empty-icon { font-size:3.5rem; opacity:0.2; animation: collFloat 3s ease-in-out infinite; }
  .coll-empty-title {
    font-family: var(--sans);
    font-size: 1.2rem; font-weight: 800;
    color: var(--ink); letter-spacing:-0.02em;
  }
  .coll-empty-text { font-size:0.85rem; color:var(--muted); line-height:1.7; max-width:280px; }

  /* ── Section header (between filter and grid) ── */
  .coll-section-intro {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }
  .coll-section-title {
    font-family: var(--sans);
    font-size: clamp(1.4rem,3vw,2rem);
    font-weight: 900;
    color: var(--ink);
    letter-spacing:-0.03em;
    line-height:1.1;
  }
  .coll-section-title em {
    font-style:italic; font-weight:300; font-family:var(--serif);
    color:var(--coral); font-size:1.08em;
  }
  .coll-active-filter-tag {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(239,119,106,0.1); border:1px solid rgba(239,119,106,0.25);
    border-radius:999px; padding:5px 12px;
    font-size:0.65rem; font-weight:700; color:var(--coral);
    letter-spacing:0.08em; text-transform:uppercase;
  }

  /* ─────────────────────────────────────────
     RESPONSIVE
  ───────────────────────────────────────── */
  @media (max-width: 1024px) {
    .coll-hero-content { grid-template-columns:1fr; }
    .coll-hero-right { display:none; }
    .coll-hero-title { font-size: clamp(2.6rem,9vw,4.5rem); }
  }
  @media (max-width: 768px) {
    .coll-hero { min-height: 420px; }
    .coll-hero-content { padding:0 20px clamp(36px,8vh,60px); }
    .coll-hero-title { font-size: clamp(2.2rem,10vw,3.5rem); }
    .coll-filter-inner { gap:12px; min-height:auto; padding:12px 16px; }
    .coll-filter-label { display:none; }
    .coll-view-btns { display:none; }
    .coll-grid { grid-template-columns: repeat(2, 1fr); gap:14px; }
    .coll-grid.cols-2 { grid-template-columns: 1fr; }
    .coll-grid.cols-4 { grid-template-columns: repeat(2, 1fr); }
    .coll-products-section { padding:28px 16px 60px; }
    .coll-hero-scroll { display:none; }
  }
  @media (max-width: 480px) {
    .coll-grid { grid-template-columns: 1fr 1fr; gap:10px; }
    .coll-section-intro { flex-direction:column; align-items:flex-start; gap:10px; }
  }
  @media (max-width: 360px) {
    .coll-grid { grid-template-columns: 1fr; }
  }
`;function wb(){if(!(typeof document>`u`)&&!document.getElementById(`nahid-collection-css`)){let e=document.createElement(`style`);e.id=`nahid-collection-css`,e.textContent=Cb,document.head.appendChild(e)}}var Tb={category:`Femme`,apiFilter:e=>e.category===`Femme`,heroImage:`https://i.postimg.cc/dQTtHTgz/femme-Nahid.png`,heroFallback:`https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1400&q=80`,accentColor:`#EF776A`,accentDark:`#D35F52`,badgeDot:`#FF8FA3`,eyebrow:`Collection Exclusive`,title:(0,I.jsxs)(I.Fragment,{children:[`Parfums `,(0,I.jsx)(`em`,{children:`Femme`})]}),desc:`Des fragrances florales et envoûtantes, créées pour révéler votre féminité et votre élégance naturelle. De la rose de Taif à l'iris de Florence.`,badgeText:`Pour elle`,scents:[`Tous`,`Floral`,`Oriental`,`Boisé`,`Frais`,`Musqué`]};function Eb({addToCart:e}){let[t,n]=(0,v.useState)([]),[r,i]=(0,v.useState)(!0),[a,o]=(0,v.useState)(`default`),[s,c]=(0,v.useState)(`Tous`),[l,u]=(0,v.useState)(`3`),d=(0,v.useRef)(null),[f,p]=(0,v.useState)(!1);wb(),(0,v.useEffect)(()=>{let e=new IntersectionObserver(e=>e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`coll-visible`)}),{threshold:.1});return document.querySelectorAll(`.coll-aos`).forEach(t=>e.observe(t)),()=>e.disconnect()}),(0,v.useEffect)(()=>{let e=()=>{d.current&&p(window.scrollY>d.current.offsetTop-80)};return window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]),(0,v.useEffect)(()=>{F.get(`/api/products`).then(e=>{n(e.data.filter(Tb.apiFilter))}).catch(()=>n([])).finally(()=>i(!1))},[]);let m=[...t];s!==`Tous`&&(m=m.filter(e=>(e.scent_family||e.notes||``).includes(s))),a===`price-asc`&&m.sort((e,t)=>parseFloat(e.price)-parseFloat(t.price)),a===`price-desc`&&m.sort((e,t)=>parseFloat(t.price)-parseFloat(e.price)),a===`name-asc`&&m.sort((e,t)=>e.name.localeCompare(t.name));let h=l===`2`?`coll-grid cols-2`:l===`4`?`coll-grid cols-4`:`coll-grid`;return(0,I.jsxs)(`div`,{className:`coll-page`,children:[(0,I.jsxs)(`section`,{className:`coll-hero`,children:[(0,I.jsx)(`img`,{className:`coll-hero-bg`,src:Tb.heroImage,alt:`Collection Femme`,onError:e=>{e.currentTarget.src=Tb.heroFallback}}),(0,I.jsx)(`div`,{className:`coll-hero-grain`}),(0,I.jsx)(`div`,{className:`coll-hero-overlay`}),(0,I.jsxs)(`div`,{className:`coll-hero-content`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:`coll-hero-eyebrow`,children:Tb.eyebrow}),(0,I.jsx)(`h1`,{className:`coll-hero-title`,children:Tb.title}),(0,I.jsxs)(`div`,{className:`coll-hero-badge`,style:{marginTop:`24px`},children:[(0,I.jsx)(`span`,{className:`badge-dot`,style:{background:Tb.badgeDot}}),Tb.badgeText]})]}),(0,I.jsxs)(`div`,{className:`coll-hero-right`,children:[(0,I.jsx)(`p`,{className:`coll-hero-desc`,children:Tb.desc}),(0,I.jsxs)(`div`,{className:`coll-hero-stats`,children:[(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:t.length||`32`}),(0,I.jsx)(`span`,{children:`Fragrances`})]}),(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:`100%`}),(0,I.jsx)(`span`,{children:`Naturels`})]}),(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:`4.9★`}),(0,I.jsx)(`span`,{children:`Satisfaction`})]})]})]})]}),(0,I.jsxs)(`div`,{className:`coll-hero-scroll`,children:[(0,I.jsx)(`div`,{className:`coll-hero-scroll-line`}),(0,I.jsx)(`span`,{className:`coll-hero-scroll-label`,children:`Défiler`})]})]}),(0,I.jsx)(`div`,{className:`coll-filter-section`,ref:d,children:(0,I.jsxs)(`div`,{className:`coll-filter-inner`,children:[(0,I.jsxs)(`div`,{className:`coll-filter-left`,children:[(0,I.jsx)(`span`,{className:`coll-filter-label`,children:`Famille :`}),Tb.scents.map(e=>(0,I.jsx)(`button`,{className:`coll-chip${s===e?` active`:``}`,onClick:()=>c(e),children:e},e))]}),(0,I.jsxs)(`div`,{className:`coll-filter-right`,children:[(0,I.jsxs)(`span`,{className:`coll-count-badge`,children:[(0,I.jsx)(`strong`,{children:m.length}),` produit`,m.length===1?``:`s`]}),(0,I.jsxs)(`select`,{className:`coll-sort`,value:a,onChange:e=>o(e.target.value),children:[(0,I.jsx)(`option`,{value:`default`,children:`Pertinence`}),(0,I.jsx)(`option`,{value:`price-asc`,children:`Prix croissant`}),(0,I.jsx)(`option`,{value:`price-desc`,children:`Prix décroissant`}),(0,I.jsx)(`option`,{value:`name-asc`,children:`Nom A–Z`})]}),(0,I.jsx)(`div`,{className:`coll-view-btns`,children:[[`2`,`▬`],[`3`,`⊞`],[`4`,`⊟`]].map(([e,t])=>(0,I.jsx)(`button`,{className:`coll-view-btn${l===e?` active`:``}`,onClick:()=>u(e),title:`${e} colonnes`,children:t},e))})]})]})}),(0,I.jsxs)(`section`,{className:`coll-products-section`,children:[(0,I.jsxs)(`div`,{className:`coll-section-intro coll-aos`,children:[(0,I.jsxs)(`h2`,{className:`coll-section-title`,children:[`Nos parfums `,(0,I.jsx)(`em`,{children:`Femme`})]}),s!==`Tous`&&(0,I.jsxs)(`span`,{className:`coll-active-filter-tag`,children:[`✦ `,s,(0,I.jsx)(`button`,{onClick:()=>c(`Tous`),style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--coral)`,fontWeight:800,padding:`0 0 0 4px`,fontFamily:`inherit`,fontSize:`0.8rem`},children:`×`})]})]}),r?(0,I.jsx)(`div`,{className:h,children:[1,2,3,4,5,6].map(e=>(0,I.jsx)(`div`,{className:`coll-skeleton`,style:{animationDelay:`${e*.08}s`}},e))}):m.length===0?(0,I.jsxs)(`div`,{className:`coll-empty`,children:[(0,I.jsx)(`div`,{className:`coll-empty-icon`,children:`🌸`}),(0,I.jsx)(`h3`,{className:`coll-empty-title`,children:`Aucun parfum trouvé`}),(0,I.jsx)(`p`,{className:`coll-empty-text`,children:`Essayez une autre famille olfactive ou réinitialisez les filtres.`}),(0,I.jsx)(`button`,{onClick:()=>c(`Tous`),style:{marginTop:`8px`,padding:`12px 28px`,background:`var(--coral)`,color:`white`,border:`none`,borderRadius:`999px`,fontFamily:`var(--sans)`,fontSize:`0.75rem`,fontWeight:`800`,letterSpacing:`0.08em`,textTransform:`uppercase`,cursor:`pointer`},children:`Voir tous les parfums`})]}):(0,I.jsx)(`div`,{className:h,children:m.map((t,n)=>(0,I.jsx)(`div`,{className:`coll-card-wrap coll-aos`,style:{animationDelay:`${n%12*.06}s`},children:(0,I.jsx)(Ja,{product:t,addToCart:e})},t.id))})]})]})}var Db={category:`Homme`,apiFilter:e=>e.category===`Homme`,heroImage:`https://i.postimg.cc/WpJbWJxx/homme-Nahid.jpg`,heroFallback:`https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1400&q=80`,accentColor:`#C9A96E`,accentDark:`#A8863A`,badgeDot:`#C9A96E`,eyebrow:`Collection Prestige`,title:(0,I.jsxs)(I.Fragment,{children:[`Parfums `,(0,I.jsx)(`em`,{children:`Homme`})]}),desc:`Des fragrances boisées, épicées et fumées, conçues pour l'homme qui ose affirmer sa personnalité. Oud, cèdre, cuir et ambre.`,badgeText:`Pour lui`,scents:[`Tous`,`Boisé`,`Oud`,`Épicé`,`Oriental`,`Cuir`,`Frais`]},Ob=`
  .coll-page.homme .coll-chip.active {
    background: var(--gold) !important;
    border-color: var(--gold) !important;
    box-shadow: 0 4px 14px rgba(201,169,110,0.35) !important;
  }
  .coll-page.homme .coll-chip:hover {
    border-color: var(--gold) !important;
    color: var(--gold) !important;
  }
  .coll-page.homme .coll-hero-eyebrow { color: var(--gold) !important; }
  .coll-page.homme .coll-hero-eyebrow::before { background: var(--gold) !important; }
  .coll-page.homme .coll-section-title em { color: var(--gold) !important; }
  .coll-page.homme .coll-active-filter-tag {
    background: rgba(201,169,110,0.1) !important;
    border-color: rgba(201,169,110,0.25) !important;
    color: var(--gold) !important;
  }
`;function kb({addToCart:e}){let[t,n]=(0,v.useState)([]),[r,i]=(0,v.useState)(!0),[a,o]=(0,v.useState)(`default`),[s,c]=(0,v.useState)(`Tous`),[l,u]=(0,v.useState)(`3`),d=(0,v.useRef)(null);wb(),(0,v.useEffect)(()=>{if(!document.getElementById(`nahid-homme-css`)){let e=document.createElement(`style`);e.id=`nahid-homme-css`,e.textContent=Ob,document.head.appendChild(e)}},[]),(0,v.useEffect)(()=>{let e=new IntersectionObserver(e=>e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`coll-visible`)}),{threshold:.1});return document.querySelectorAll(`.coll-aos`).forEach(t=>e.observe(t)),()=>e.disconnect()}),(0,v.useEffect)(()=>{F.get(`/api/products`).then(e=>{n(e.data.filter(Db.apiFilter))}).catch(()=>n([])).finally(()=>i(!1))},[]);let f=[...t];s!==`Tous`&&(f=f.filter(e=>(e.scent_family||e.notes||``).includes(s))),a===`price-asc`&&f.sort((e,t)=>parseFloat(e.price)-parseFloat(t.price)),a===`price-desc`&&f.sort((e,t)=>parseFloat(t.price)-parseFloat(e.price)),a===`name-asc`&&f.sort((e,t)=>e.name.localeCompare(t.name));let p=l===`2`?`coll-grid cols-2`:l===`4`?`coll-grid cols-4`:`coll-grid`;return(0,I.jsxs)(`div`,{className:`coll-page homme`,children:[(0,I.jsxs)(`section`,{className:`coll-hero`,style:{minHeight:`clamp(500px,65vh,720px)`},children:[(0,I.jsx)(`img`,{className:`coll-hero-bg`,src:Db.heroImage,alt:`Collection Homme`,onError:e=>{e.currentTarget.src=Db.heroFallback},style:{objectPosition:`center 20%`}}),(0,I.jsx)(`div`,{className:`coll-hero-grain`}),(0,I.jsx)(`div`,{className:`coll-hero-overlay`,style:{background:`linear-gradient(to top,rgba(6,6,4,0.92) 0%,rgba(6,6,4,0.5) 50%,rgba(6,6,4,0.15) 100%)`}}),(0,I.jsxs)(`div`,{className:`coll-hero-content`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`div`,{className:`coll-hero-eyebrow`,style:{color:`var(--gold)`},children:[(0,I.jsx)(`span`,{style:{width:`28px`,height:`1px`,background:`var(--gold)`,display:`block`}}),Db.eyebrow]}),(0,I.jsx)(`h1`,{className:`coll-hero-title`,children:Db.title}),(0,I.jsxs)(`div`,{className:`coll-hero-badge`,style:{marginTop:`24px`,borderColor:`rgba(201,169,110,0.3)`},children:[(0,I.jsx)(`span`,{className:`badge-dot`,style:{background:Db.badgeDot}}),Db.badgeText]})]}),(0,I.jsxs)(`div`,{className:`coll-hero-right`,children:[(0,I.jsx)(`p`,{className:`coll-hero-desc`,children:Db.desc}),(0,I.jsxs)(`div`,{className:`coll-hero-stats`,children:[(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:t.length||`28`}),(0,I.jsx)(`span`,{children:`Fragrances`})]}),(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:`12+`}),(0,I.jsx)(`span`,{children:`Années expertise`})]}),(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:`4.9★`}),(0,I.jsx)(`span`,{children:`Satisfaction`})]})]})]})]}),(0,I.jsxs)(`div`,{className:`coll-hero-scroll`,children:[(0,I.jsx)(`div`,{className:`coll-hero-scroll-line`}),(0,I.jsx)(`span`,{className:`coll-hero-scroll-label`,children:`Défiler`})]})]}),(0,I.jsx)(`div`,{className:`coll-filter-section`,ref:d,children:(0,I.jsxs)(`div`,{className:`coll-filter-inner`,children:[(0,I.jsxs)(`div`,{className:`coll-filter-left`,children:[(0,I.jsx)(`span`,{className:`coll-filter-label`,children:`Famille :`}),Db.scents.map(e=>(0,I.jsx)(`button`,{className:`coll-chip${s===e?` active`:``}`,onClick:()=>c(e),children:e},e))]}),(0,I.jsxs)(`div`,{className:`coll-filter-right`,children:[(0,I.jsxs)(`span`,{className:`coll-count-badge`,children:[(0,I.jsx)(`strong`,{children:f.length}),` produit`,f.length===1?``:`s`]}),(0,I.jsxs)(`select`,{className:`coll-sort`,value:a,onChange:e=>o(e.target.value),children:[(0,I.jsx)(`option`,{value:`default`,children:`Pertinence`}),(0,I.jsx)(`option`,{value:`price-asc`,children:`Prix croissant`}),(0,I.jsx)(`option`,{value:`price-desc`,children:`Prix décroissant`}),(0,I.jsx)(`option`,{value:`name-asc`,children:`Nom A–Z`})]}),(0,I.jsx)(`div`,{className:`coll-view-btns`,children:[[`2`,`▬`],[`3`,`⊞`],[`4`,`⊟`]].map(([e,t])=>(0,I.jsx)(`button`,{className:`coll-view-btn${l===e?` active`:``}`,onClick:()=>u(e),children:t},e))})]})]})}),(0,I.jsxs)(`section`,{className:`coll-products-section`,children:[(0,I.jsxs)(`div`,{className:`coll-section-intro coll-aos`,children:[(0,I.jsxs)(`h2`,{className:`coll-section-title`,children:[`Nos parfums `,(0,I.jsx)(`em`,{children:`Homme`})]}),s!==`Tous`&&(0,I.jsxs)(`span`,{className:`coll-active-filter-tag`,children:[`✦ `,s,(0,I.jsx)(`button`,{onClick:()=>c(`Tous`),style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--gold)`,fontWeight:800,padding:`0 0 0 4px`,fontFamily:`inherit`,fontSize:`0.8rem`},children:`×`})]})]}),r?(0,I.jsx)(`div`,{className:p,children:[1,2,3,4,5,6].map(e=>(0,I.jsx)(`div`,{className:`coll-skeleton`,style:{animationDelay:`${e*.08}s`}},e))}):f.length===0?(0,I.jsxs)(`div`,{className:`coll-empty`,children:[(0,I.jsx)(`div`,{className:`coll-empty-icon`,children:`🪵`}),(0,I.jsx)(`h3`,{className:`coll-empty-title`,children:`Aucun parfum trouvé`}),(0,I.jsx)(`p`,{className:`coll-empty-text`,children:`Essayez une autre famille olfactive ou réinitialisez les filtres.`}),(0,I.jsx)(`button`,{onClick:()=>c(`Tous`),style:{marginTop:`8px`,padding:`12px 28px`,background:`var(--gold)`,color:`white`,border:`none`,borderRadius:`999px`,fontFamily:`var(--sans)`,fontSize:`0.75rem`,fontWeight:`800`,letterSpacing:`0.08em`,textTransform:`uppercase`,cursor:`pointer`},children:`Voir tous les parfums`})]}):(0,I.jsx)(`div`,{className:p,children:f.map((t,n)=>(0,I.jsx)(`div`,{className:`coll-card-wrap coll-aos`,style:{animationDelay:`${n%12*.06}s`},children:(0,I.jsx)(Ja,{product:t,addToCart:e})},t.id))})]})]})}var Ab={category:`Unisex`,apiFilter:e=>e.category===`Unisex`,heroImage:`https://i.postimg.cc/MZjKPjgN/unisex-Nahid.png`,heroFallback:`https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1400&q=80`,accentColor:`#7B68EE`,badgeDot:`#A0C4FF`,eyebrow:`Collection Sans Frontières`,title:(0,I.jsxs)(I.Fragment,{children:[`Parfums `,(0,I.jsx)(`em`,{children:`Unisex`})]}),desc:`Des fragrances universelles qui transcendent les genres, pour celles et ceux qui cherchent l'équilibre parfait entre douceur et caractère.`,badgeText:`Pour toutes & tous`,scents:[`Tous`,`Floral`,`Boisé`,`Frais`,`Oriental`,`Musqué`,`Citrus`,`Oud`]},jb=`
  .coll-page.unisex {
    --coll-accent: #8B7CF6;
    --coll-accent-dark: #6D5CE8;
  }
  .coll-page.unisex .coll-chip.active {
    background: linear-gradient(135deg, #8B7CF6, #6D5CE8) !important;
    border-color: #8B7CF6 !important;
    box-shadow: 0 4px 14px rgba(139,124,246,0.35) !important;
  }
  .coll-page.unisex .coll-chip:hover {
    border-color: #8B7CF6 !important;
    color: #8B7CF6 !important;
  }
  .coll-page.unisex .coll-hero-eyebrow {
    color: #B8A9FF !important;
  }
  .coll-page.unisex .coll-hero-eyebrow::before {
    background: #B8A9FF !important;
  }
  .coll-page.unisex .coll-section-title em {
    color: #8B7CF6 !important;
  }
  .coll-page.unisex .coll-active-filter-tag {
    background: rgba(139,124,246,0.1) !important;
    border-color: rgba(139,124,246,0.25) !important;
    color: #8B7CF6 !important;
  }
`;function Mb({addToCart:e}){let[t,n]=(0,v.useState)([]),[r,i]=(0,v.useState)(!0),[a,o]=(0,v.useState)(`default`),[s,c]=(0,v.useState)(`Tous`),[l,u]=(0,v.useState)(`3`),d=(0,v.useRef)(null);wb(),(0,v.useEffect)(()=>{if(!document.getElementById(`nahid-unisex-css`)){let e=document.createElement(`style`);e.id=`nahid-unisex-css`,e.textContent=jb,document.head.appendChild(e)}},[]),(0,v.useEffect)(()=>{let e=new IntersectionObserver(e=>e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`coll-visible`)}),{threshold:.1});return document.querySelectorAll(`.coll-aos`).forEach(t=>e.observe(t)),()=>e.disconnect()}),(0,v.useEffect)(()=>{F.get(`/api/products`).then(e=>{n(e.data.filter(Ab.apiFilter))}).catch(()=>n([])).finally(()=>i(!1))},[]);let f=[...t];s!==`Tous`&&(f=f.filter(e=>(e.scent_family||e.notes||``).includes(s))),a===`price-asc`&&f.sort((e,t)=>parseFloat(e.price)-parseFloat(t.price)),a===`price-desc`&&f.sort((e,t)=>parseFloat(t.price)-parseFloat(e.price)),a===`name-asc`&&f.sort((e,t)=>e.name.localeCompare(t.name));let p=l===`2`?`coll-grid cols-2`:l===`4`?`coll-grid cols-4`:`coll-grid`;return(0,I.jsxs)(`div`,{className:`coll-page unisex`,children:[(0,I.jsxs)(`section`,{className:`coll-hero`,style:{minHeight:`clamp(480px,62vh,700px)`},children:[(0,I.jsx)(`img`,{className:`coll-hero-bg`,src:Ab.heroImage,alt:`Collection Unisex`,onError:e=>{e.currentTarget.src=Ab.heroFallback},style:{objectPosition:`center center`}}),(0,I.jsx)(`div`,{className:`coll-hero-grain`}),(0,I.jsx)(`div`,{className:`coll-hero-overlay`,style:{background:`linear-gradient(135deg,rgba(30,10,60,0.75) 0%,rgba(10,10,20,0.5) 60%,rgba(0,0,0,0.1) 100%)`}}),(0,I.jsxs)(`div`,{className:`coll-hero-content`,children:[(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`div`,{className:`coll-hero-eyebrow`,style:{color:`#B8A9FF`},children:[(0,I.jsx)(`span`,{style:{width:`28px`,height:`1px`,background:`#B8A9FF`,display:`block`}}),Ab.eyebrow]}),(0,I.jsx)(`h1`,{className:`coll-hero-title`,children:Ab.title}),(0,I.jsxs)(`div`,{className:`coll-hero-badge`,style:{marginTop:`24px`,borderColor:`rgba(180,160,255,0.3)`},children:[(0,I.jsx)(`span`,{className:`badge-dot`,style:{background:Ab.badgeDot}}),Ab.badgeText]})]}),(0,I.jsxs)(`div`,{className:`coll-hero-right`,children:[(0,I.jsx)(`p`,{className:`coll-hero-desc`,children:Ab.desc}),(0,I.jsxs)(`div`,{className:`coll-hero-stats`,children:[(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:t.length||`18`}),(0,I.jsx)(`span`,{children:`Fragrances`})]}),(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:`∞`}),(0,I.jsx)(`span`,{children:`Sans genre`})]}),(0,I.jsxs)(`div`,{className:`coll-hero-stat`,children:[(0,I.jsx)(`strong`,{children:`4.9★`}),(0,I.jsx)(`span`,{children:`Satisfaction`})]})]})]})]}),(0,I.jsxs)(`div`,{className:`coll-hero-scroll`,children:[(0,I.jsx)(`div`,{className:`coll-hero-scroll-line`}),(0,I.jsx)(`span`,{className:`coll-hero-scroll-label`,children:`Défiler`})]})]}),(0,I.jsx)(`div`,{className:`coll-filter-section`,ref:d,children:(0,I.jsxs)(`div`,{className:`coll-filter-inner`,children:[(0,I.jsxs)(`div`,{className:`coll-filter-left`,children:[(0,I.jsx)(`span`,{className:`coll-filter-label`,children:`Famille :`}),Ab.scents.map(e=>(0,I.jsx)(`button`,{className:`coll-chip${s===e?` active`:``}`,onClick:()=>c(e),children:e},e))]}),(0,I.jsxs)(`div`,{className:`coll-filter-right`,children:[(0,I.jsxs)(`span`,{className:`coll-count-badge`,children:[(0,I.jsx)(`strong`,{children:f.length}),` produit`,f.length===1?``:`s`]}),(0,I.jsxs)(`select`,{className:`coll-sort`,value:a,onChange:e=>o(e.target.value),children:[(0,I.jsx)(`option`,{value:`default`,children:`Pertinence`}),(0,I.jsx)(`option`,{value:`price-asc`,children:`Prix croissant`}),(0,I.jsx)(`option`,{value:`price-desc`,children:`Prix décroissant`}),(0,I.jsx)(`option`,{value:`name-asc`,children:`Nom A–Z`})]}),(0,I.jsx)(`div`,{className:`coll-view-btns`,children:[[`2`,`▬`],[`3`,`⊞`],[`4`,`⊟`]].map(([e,t])=>(0,I.jsx)(`button`,{className:`coll-view-btn${l===e?` active`:``}`,onClick:()=>u(e),children:t},e))})]})]})}),(0,I.jsxs)(`section`,{className:`coll-products-section`,children:[(0,I.jsxs)(`div`,{className:`coll-section-intro coll-aos`,children:[(0,I.jsxs)(`h2`,{className:`coll-section-title`,children:[`Nos parfums `,(0,I.jsx)(`em`,{children:`Unisex`})]}),s!==`Tous`&&(0,I.jsxs)(`span`,{className:`coll-active-filter-tag`,children:[`✦ `,s,(0,I.jsx)(`button`,{onClick:()=>c(`Tous`),style:{background:`none`,border:`none`,cursor:`pointer`,color:`#8B7CF6`,fontWeight:800,padding:`0 0 0 4px`,fontFamily:`inherit`,fontSize:`0.8rem`},children:`×`})]})]}),r?(0,I.jsx)(`div`,{className:p,children:[1,2,3,4,5,6].map(e=>(0,I.jsx)(`div`,{className:`coll-skeleton`,style:{animationDelay:`${e*.08}s`}},e))}):f.length===0?(0,I.jsxs)(`div`,{className:`coll-empty`,children:[(0,I.jsx)(`div`,{className:`coll-empty-icon`,children:`🫧`}),(0,I.jsx)(`h3`,{className:`coll-empty-title`,children:`Aucun parfum trouvé`}),(0,I.jsx)(`p`,{className:`coll-empty-text`,children:`Essayez une autre famille olfactive ou réinitialisez les filtres.`}),(0,I.jsx)(`button`,{onClick:()=>c(`Tous`),style:{marginTop:`8px`,padding:`12px 28px`,background:`linear-gradient(135deg,#8B7CF6,#6D5CE8)`,color:`white`,border:`none`,borderRadius:`999px`,fontFamily:`var(--sans)`,fontSize:`0.75rem`,fontWeight:`800`,letterSpacing:`0.08em`,textTransform:`uppercase`,cursor:`pointer`},children:`Voir tous les parfums`})]}):(0,I.jsx)(`div`,{className:p,children:f.map((t,n)=>(0,I.jsx)(`div`,{className:`coll-card-wrap coll-aos`,style:{animationDelay:`${n%12*.06}s`},children:(0,I.jsx)(Ja,{product:t,addToCart:e})},t.id))})]})]})}F.defaults.baseURL=`http://localhost:5000`;function Nb(){let[e,t]=(0,v.useState)([]),[n,r]=(0,v.useState)(!1);(0,v.useEffect)(()=>{i(),localStorage.getItem(`adminToken`)&&r(!0)},[]);let i=()=>{let e=localStorage.getItem(`nahid_cart`);if(e)try{t(JSON.parse(e))}catch(e){console.error(`Erreur chargement panier:`,e),t([])}},a=(e,n=1)=>{t(t=>{let r=t.find(t=>t.id===e.id),i;return i=r?t.map(t=>t.id===e.id?{...t,quantity:t.quantity+n}:t):[...t,{...e,quantity:n}],localStorage.setItem(`nahid_cart`,JSON.stringify(i)),i})},o=e=>{t(t=>{let n=t.filter(t=>t.id!==e);return localStorage.setItem(`nahid_cart`,JSON.stringify(n)),n})};return(0,I.jsxs)(Dn,{children:[(0,I.jsx)(Sb,{cartCount:e.reduce((e,t)=>e+(t.quantity||1),0),isAdminLoggedIn:n,setIsAdminLoggedIn:r}),(0,I.jsxs)(zt,{children:[(0,I.jsx)(Lt,{path:`/`,element:(0,I.jsx)(Vo,{addToCart:a})}),(0,I.jsx)(Lt,{path:`/notre-histoire`,element:(0,I.jsx)(vb,{})}),(0,I.jsx)(Lt,{path:`/cart`,element:(0,I.jsx)(Ho,{cart:e,removeFromCart:o,updateQuantity:(e,n)=>{if(n<=0){o(e);return}t(t=>{let r=t.map(t=>t.id===e?{...t,quantity:n}:t);return localStorage.setItem(`nahid_cart`,JSON.stringify(r)),r})}})}),(0,I.jsx)(Lt,{path:`/product/:id`,element:(0,I.jsx)(qo,{addToCart:a})}),(0,I.jsx)(Lt,{path:`/checkout`,element:(0,I.jsx)(pb,{cart:e,clearCart:()=>{t([]),localStorage.removeItem(`nahid_cart`)}})}),(0,I.jsx)(Lt,{path:`/admin`,element:(0,I.jsx)(cb,{isAdminLoggedIn:n,setIsAdminLoggedIn:r})}),(0,I.jsx)(Lt,{path:`/collection/femme`,element:(0,I.jsx)(Eb,{addToCart:a})}),(0,I.jsx)(Lt,{path:`/collection/homme`,element:(0,I.jsx)(kb,{addToCart:a})}),(0,I.jsx)(Lt,{path:`/collection/unisex`,element:(0,I.jsx)(Mb,{addToCart:a})})]})]})}y.createRoot(document.getElementById(`root`)).render((0,I.jsx)(v.StrictMode,{children:(0,I.jsx)(Nb,{})}));