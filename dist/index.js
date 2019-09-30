(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.Meditor = factory(global.React));
}(this, function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js
  function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
  }

  function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
  }

  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;

  if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
  }

  if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      //normal enviroments in sane situations
      return setTimeout(fun, 0);
    } // if setTimeout wasn't available but was latter defined


    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }

    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }

  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      //normal enviroments in sane situations
      return clearTimeout(marker);
    } // if clearTimeout wasn't available but was latter defined


    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }

    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
        return cachedClearTimeout.call(null, marker);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
        return cachedClearTimeout.call(this, marker);
      }
    }
  }

  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }

    draining = false;

    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }

    if (queue.length) {
      drainQueue();
    }
  }

  function drainQueue() {
    if (draining) {
      return;
    }

    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;

    while (len) {
      currentQueue = queue;
      queue = [];

      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }

      queueIndex = -1;
      len = queue.length;
    }

    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }

  function nextTick(fun) {
    var args = new Array(arguments.length - 1);

    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }

    queue.push(new Item(fun, args));

    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  } // v8 likes predictible objects

  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }

  Item.prototype.run = function () {
    this.fun.apply(null, this.array);
  };

  var title = 'browser';
  var platform = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues

  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;
  function binding(name) {
    throw new Error('process.binding is not supported');
  }
  function cwd() {
    return '/';
  }
  function chdir(dir) {
    throw new Error('process.chdir is not supported');
  }
  function umask() {
    return 0;
  } // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

  var performance = global$1.performance || {};

  var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
  }; // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime


  function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);

    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];

      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }

    return [seconds, nanoseconds];
  }
  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }
  var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var reactIs_production_min = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var b = "function" === typeof Symbol && Symbol.for,
      c = b ? Symbol.for("react.element") : 60103,
      d = b ? Symbol.for("react.portal") : 60106,
      e = b ? Symbol.for("react.fragment") : 60107,
      f = b ? Symbol.for("react.strict_mode") : 60108,
      g = b ? Symbol.for("react.profiler") : 60114,
      h = b ? Symbol.for("react.provider") : 60109,
      k = b ? Symbol.for("react.context") : 60110,
      l = b ? Symbol.for("react.async_mode") : 60111,
      m = b ? Symbol.for("react.concurrent_mode") : 60111,
      n = b ? Symbol.for("react.forward_ref") : 60112,
      p = b ? Symbol.for("react.suspense") : 60113,
      q = b ? Symbol.for("react.suspense_list") : 60120,
      r = b ? Symbol.for("react.memo") : 60115,
      t = b ? Symbol.for("react.lazy") : 60116,
      v = b ? Symbol.for("react.fundamental") : 60117,
      w = b ? Symbol.for("react.responder") : 60118;

  function x(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;

      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;

            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case h:
                  return a;

                default:
                  return u;
              }

          }

        case t:
        case r:
        case d:
          return u;
      }
    }
  }

  function y(a) {
    return x(a) === m;
  }

  exports.typeOf = x;
  exports.AsyncMode = l;
  exports.ConcurrentMode = m;
  exports.ContextConsumer = k;
  exports.ContextProvider = h;
  exports.Element = c;
  exports.ForwardRef = n;
  exports.Fragment = e;
  exports.Lazy = t;
  exports.Memo = r;
  exports.Portal = d;
  exports.Profiler = g;
  exports.StrictMode = f;
  exports.Suspense = p;

  exports.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === v || a.$$typeof === w);
  };

  exports.isAsyncMode = function (a) {
    return y(a) || x(a) === l;
  };

  exports.isConcurrentMode = y;

  exports.isContextConsumer = function (a) {
    return x(a) === k;
  };

  exports.isContextProvider = function (a) {
    return x(a) === h;
  };

  exports.isElement = function (a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };

  exports.isForwardRef = function (a) {
    return x(a) === n;
  };

  exports.isFragment = function (a) {
    return x(a) === e;
  };

  exports.isLazy = function (a) {
    return x(a) === t;
  };

  exports.isMemo = function (a) {
    return x(a) === r;
  };

  exports.isPortal = function (a) {
    return x(a) === d;
  };

  exports.isProfiler = function (a) {
    return x(a) === g;
  };

  exports.isStrictMode = function (a) {
    return x(a) === f;
  };

  exports.isSuspense = function (a) {
    return x(a) === p;
  };
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
  var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_6 = reactIs_production_min.Element;
  var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_8 = reactIs_production_min.Fragment;
  var reactIs_production_min_9 = reactIs_production_min.Lazy;
  var reactIs_production_min_10 = reactIs_production_min.Memo;
  var reactIs_production_min_11 = reactIs_production_min.Portal;
  var reactIs_production_min_12 = reactIs_production_min.Profiler;
  var reactIs_production_min_13 = reactIs_production_min.StrictMode;
  var reactIs_production_min_14 = reactIs_production_min.Suspense;
  var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
  var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_20 = reactIs_production_min.isElement;
  var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_22 = reactIs_production_min.isFragment;
  var reactIs_production_min_23 = reactIs_production_min.isLazy;
  var reactIs_production_min_24 = reactIs_production_min.isMemo;
  var reactIs_production_min_25 = reactIs_production_min.isPortal;
  var reactIs_production_min_26 = reactIs_production_min.isProfiler;
  var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
  var reactIs_production_min_28 = reactIs_production_min.isSuspense;

  var reactIs_development = createCommonjsModule(function (module, exports) {

  {
    (function () {

      Object.defineProperty(exports, '__esModule', {
        value: true
      }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE);
      }
      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarning = function () {};

      {
        var printWarning = function (format) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarning = function (condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(undefined, [format].concat(args));
          }
        };
      }
      var lowPriorityWarning$1 = lowPriorityWarning;

      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_LAZY_TYPE:
            case REACT_MEMO_TYPE:
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.typeOf = typeOf;
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isValidElementType = isValidElementType;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
    })();
  }
  });

  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ConcurrentMode;
  var reactIs_development_4 = reactIs_development.ContextConsumer;
  var reactIs_development_5 = reactIs_development.ContextProvider;
  var reactIs_development_6 = reactIs_development.Element;
  var reactIs_development_7 = reactIs_development.ForwardRef;
  var reactIs_development_8 = reactIs_development.Fragment;
  var reactIs_development_9 = reactIs_development.Lazy;
  var reactIs_development_10 = reactIs_development.Memo;
  var reactIs_development_11 = reactIs_development.Portal;
  var reactIs_development_12 = reactIs_development.Profiler;
  var reactIs_development_13 = reactIs_development.StrictMode;
  var reactIs_development_14 = reactIs_development.Suspense;
  var reactIs_development_15 = reactIs_development.isValidElementType;
  var reactIs_development_16 = reactIs_development.isAsyncMode;
  var reactIs_development_17 = reactIs_development.isConcurrentMode;
  var reactIs_development_18 = reactIs_development.isContextConsumer;
  var reactIs_development_19 = reactIs_development.isContextProvider;
  var reactIs_development_20 = reactIs_development.isElement;
  var reactIs_development_21 = reactIs_development.isForwardRef;
  var reactIs_development_22 = reactIs_development.isFragment;
  var reactIs_development_23 = reactIs_development.isLazy;
  var reactIs_development_24 = reactIs_development.isMemo;
  var reactIs_development_25 = reactIs_development.isPortal;
  var reactIs_development_26 = reactIs_development.isProfiler;
  var reactIs_development_27 = reactIs_development.isStrictMode;
  var reactIs_development_28 = reactIs_development.isSuspense;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */

  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      } // Detect buggy property enumeration order in older V8 versions.
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118


      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

      test1[5] = 'de';

      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test2 = {};

      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }

      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });

      if (order2.join('') !== '0123456789') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });

      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);

        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function () {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning = function (text) {
      var message = 'Warning: ' + text;

      if (typeof console !== 'undefined') {
        console.error(message);
      }

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }
  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */


  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error; // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.

          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
              err.name = 'Invariant Violation';
              throw err;
            }

            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }

          if (error && !(error instanceof Error)) {
            printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
          }

          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : '';
            printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
          }
        }
      }
    }
  }
  /**
   * Resets warning cache when testing.
   *
   * @private
   */


  checkPropTypes.resetWarningCache = function () {
    {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes;

  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  var printWarning$1 = function () {};

  {
    printWarning$1 = function (text) {
      var message = 'Warning: ' + text;

      if (typeof console !== 'undefined') {
        console.error(message);
      }

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */

    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }
    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */


    var ANONYMOUS = '<<anonymous>>'; // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),
      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker
    };
    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */

    /*eslint-disable no-self-compare*/

    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */


    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    } // Make `instanceof Error` still work for returned errors.


    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }

      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
            err.name = 'Invariant Violation';
            throw err;
          } else if ( typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;

            if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3) {
              printWarning$1('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }

        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }

            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }

          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);

        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }

        var propValue = props[propName];

        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }

        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);

          if (error instanceof Error) {
            return error;
          }
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];

        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];

        if (!reactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        {
          if (arguments.length > 1) {
            printWarning$1('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
          } else {
            printWarning$1('Invalid argument supplied to oneOf, expected an array.');
          }
        }

        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];

        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);

          if (type === 'symbol') {
            return String(value);
          }

          return value;
        });
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }

      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }

        var propValue = props[propName];
        var propType = getPropType(propValue);

        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }

        for (var key in propValue) {
          if (has$1(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

            if (error instanceof Error) {
              return error;
            }
          }
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
         printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') ;
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (typeof checker !== 'function') {
          printWarning$1('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];

          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }

      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);

        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }

        for (var key in shapeTypes) {
          var checker = shapeTypes[key];

          if (!checker) {
            continue;
          }

          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

          if (error) {
            return error;
          }
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);

        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        } // We need to check all keys in case some are required but missing from
        // props.


        var allKeys = objectAssign({}, props[propName], shapeTypes);

        for (var key in allKeys) {
          var checker = shapeTypes[key];

          if (!checker) {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
          }

          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

          if (error) {
            return error;
          }
        }

        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;

        case 'boolean':
          return !propValue;

        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }

          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);

          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;

            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;

                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;

        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      } // falsy value can't be a Symbol


      if (!propValue) {
        return false;
      } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      } // Fallback for non-spec compliant Symbols which are polyfilled.


      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    } // Equivalent of `typeof` but with special handling for array and regexp.


    function getPropType(propValue) {
      var propType = typeof propValue;

      if (Array.isArray(propValue)) {
        return 'array';
      }

      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }

      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }

      return propType;
    } // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.


    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }

      var propType = getPropType(propValue);

      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }

      return propType;
    } // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"


    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);

      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;

        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;

        default:
          return type;
      }
    } // Returns class name of the object, if any.


    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }

      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1;
    ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  {
    var ReactIs = reactIs; // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod


    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }
  });

  var immutable = extend;
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (hasOwnProperty$1.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }

  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually


  function isBuffer(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
  }

  function isFastBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
  } // For Node v0.10 support. Remove this eventually.


  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
  }

  var inherits;

  if (typeof Object.create === 'function') {
    inherits = function inherits(ctor, superCtor) {
      // implementation from standard node.js 'util' module
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;

      var TempCtor = function () {};

      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }

  var inherits$1 = inherits;

  var formatRegExp = /%[sdj%]/g;
  function format(f) {
    if (!isString(f)) {
      var objects = [];

      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }

      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') return '%';
      if (i >= len) return x;

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

        default:
          return x;
      }
    });

    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }

    return str;
  }
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.

  function deprecate(fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined(global$1.process)) {
      return function () {
        return deprecate(fn, msg).apply(this, arguments);
      };
    }

    var warned = false;

    function deprecated() {
      if (!warned) {
        {
          console.error(msg);
        }

        warned = true;
      }

      return fn.apply(this, arguments);
    }

    return deprecated;
  }
  var debugs = {};
  var debugEnviron;
  function debuglog(set) {
    if (isUndefined(debugEnviron)) debugEnviron =  '';
    set = set.toUpperCase();

    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = 0;

        debugs[set] = function () {
          var msg = format.apply(null, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function () {};
      }
    }

    return debugs[set];
  }
  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */

  /* legacy: obj, showHidden, depth, colors*/

  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    }; // legacy...

    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];

    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    } // set default options


    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  } // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

  inspect.colors = {
    'bold': [1, 22],
    'italic': [3, 23],
    'underline': [4, 24],
    'inverse': [7, 27],
    'white': [37, 39],
    'grey': [90, 39],
    'black': [30, 39],
    'blue': [34, 39],
    'cyan': [36, 39],
    'green': [32, 39],
    'magenta': [35, 39],
    'red': [31, 39],
    'yellow': [33, 39]
  }; // Don't use 'blue' not visible on cmd.exe

  inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };

  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }

  function stylizeNoColor(str, styleType) {
    return str;
  }

  function arrayToHash(array) {
    var hash = {};
    array.forEach(function (val, idx) {
      hash[val] = true;
    });
    return hash;
  }

  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);

      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }

      return ret;
    } // Primitive types cannot have properties


    var primitive = formatPrimitive(ctx, value);

    if (primitive) {
      return primitive;
    } // Look up the keys of the object.


    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    } // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


    if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    } // Some type of object without properties can be shortcutted.


    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }

      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }

      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }

      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '',
        array = false,
        braces = ['{', '}']; // Make Array say that they are Array

    if (isArray(value)) {
      array = true;
      braces = ['[', ']'];
    } // Make functions say that they are functions


    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    } // Make RegExps say that they are RegExps


    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    } // Make dates with properties first say the date


    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    } // Make error with message first say the error


    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);
    var output;

    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function (key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }

  function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }

    if (isNumber(value)) return ctx.stylize('' + value, 'number');
    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

    if (isNull(value)) return ctx.stylize('null', 'null');
  }

  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }

  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];

    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty$2(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
      } else {
        output.push('');
      }
    }

    keys.forEach(function (key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
      }
    });
    return output;
  }

  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {
      value: value[key]
    };

    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }

    if (!hasOwnProperty$2(visibleKeys, key)) {
      name = '[' + key + ']';
    }

    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }

        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function (line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function (line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }

    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }

      name = JSON.stringify('' + key);

      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }

  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function (prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  } // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.


  function isArray(ar) {
    return Array.isArray(ar);
  }
  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }
  function isNull(arg) {
    return arg === null;
  }
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  function isNumber(arg) {
    return typeof arg === 'number';
  }
  function isString(arg) {
    return typeof arg === 'string';
  }
  function isSymbol(arg) {
    return typeof arg === 'symbol';
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }
  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }
  function isError(e) {
    return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
  }
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  function isPrimitive(arg) {
    return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined';
  }
  function isBuffer$1(maybeBuf) {
    return isBuffer(maybeBuf);
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

  function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  } // log is just a thin wrapper to console.log that prepends a timestamp


  function log() {
    console.log('%s - %s', timestamp(), format.apply(null, arguments));
  }
  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;

    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }

    return origin;
  }

  function hasOwnProperty$2(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var require$$0 = {
    inherits: inherits$1,
    _extend: _extend,
    log: log,
    isBuffer: isBuffer$1,
    isPrimitive: isPrimitive,
    isFunction: isFunction,
    isError: isError,
    isDate: isDate,
    isObject: isObject,
    isRegExp: isRegExp,
    isUndefined: isUndefined,
    isSymbol: isSymbol,
    isString: isString,
    isNumber: isNumber,
    isNullOrUndefined: isNullOrUndefined,
    isNull: isNull,
    isBoolean: isBoolean,
    isArray: isArray,
    inspect: inspect,
    deprecate: deprecate,
    format: format,
    debuglog: debuglog
  };

  var inherits_browser = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;

        var TempCtor = function () {};

        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  });

  var inherits$2 = createCommonjsModule(function (module) {
  try {
    var util = require$$0;
    /* istanbul ignore next */


    if (typeof util.inherits !== 'function') throw '';
    module.exports = util.inherits;
  } catch (e) {
    /* istanbul ignore next */
    module.exports = inherits_browser;
  }
  });

  var unherit_1 = unherit; // Create a custom constructor which can be modified without affecting the
  // original class.

  function unherit(Super) {
    var result;
    var key;
    var value;
    inherits$2(Of, Super);
    inherits$2(From, Of); // Clone values.

    result = Of.prototype;

    for (key in result) {
      value = result[key];

      if (value && typeof value === 'object') {
        result[key] = 'concat' in value ? value.concat() : immutable(value);
      }
    }

    return Of; // Constructor accepting a single argument, which itself is an `arguments`
    // object.

    function From(parameters) {
      return Super.apply(this, parameters);
    } // Constructor accepting variadic arguments.


    function Of() {
      if (!(this instanceof Of)) {
        return new From(arguments);
      }

      return Super.apply(this, arguments);
    }
  }

  var stateToggle = factory; // Construct a state `toggler`: a function which inverses `property` in context
  // based on its current value.
  // The by `toggler` returned function restores that value.

  function factory(key, state, ctx) {
    return enter;

    function enter() {
      var context = ctx || this;
      var current = context[key];
      context[key] = !state;
      return exit;

      function exit() {
        context[key] = current;
      }
    }
  }

  var vfileLocation = factory$1;

  function factory$1(file) {
    var contents = indices(String(file));
    return {
      toPosition: offsetToPositionFactory(contents),
      toOffset: positionToOffsetFactory(contents)
    };
  } // Factory to get the line and column-based `position` for `offset` in the bound
  // indices.


  function offsetToPositionFactory(indices) {
    return offsetToPosition; // Get the line and column-based `position` for `offset` in the bound indices.

    function offsetToPosition(offset) {
      var index = -1;
      var length = indices.length;

      if (offset < 0) {
        return {};
      }

      while (++index < length) {
        if (indices[index] > offset) {
          return {
            line: index + 1,
            column: offset - (indices[index - 1] || 0) + 1,
            offset: offset
          };
        }
      }

      return {};
    }
  } // Factory to get the `offset` for a line and column-based `position` in the
  // bound indices.


  function positionToOffsetFactory(indices) {
    return positionToOffset; // Get the `offset` for a line and column-based `position` in the bound
    // indices.

    function positionToOffset(position) {
      var line = position && position.line;
      var column = position && position.column;

      if (!isNaN(line) && !isNaN(column) && line - 1 in indices) {
        return (indices[line - 2] || 0) + column - 1 || 0;
      }

      return -1;
    }
  } // Get indices of line-breaks in `value`.


  function indices(value) {
    var result = [];
    var index = value.indexOf('\n');

    while (index !== -1) {
      result.push(index + 1);
      index = value.indexOf('\n', index + 1);
    }

    result.push(value.length + 1);
    return result;
  }

  var _unescape = factory$2;
  var backslash = '\\'; // Factory to de-escape a value, based on a list at `key` in `ctx`.

  function factory$2(ctx, key) {
    return unescape; // De-escape a string using the expression at `key` in `ctx`.

    function unescape(value) {
      var prev = 0;
      var index = value.indexOf(backslash);
      var escape = ctx[key];
      var queue = [];
      var character;

      while (index !== -1) {
        queue.push(value.slice(prev, index));
        prev = index + 1;
        character = value.charAt(prev); // If the following character is not a valid escape, add the slash.

        if (!character || escape.indexOf(character) === -1) {
          queue.push(backslash);
        }

        index = value.indexOf(backslash, prev + 1);
      }

      queue.push(value.slice(prev));
      return queue.join('');
    }
  }

  var AElig = "Æ";
  var AMP = "&";
  var Aacute = "Á";
  var Acirc = "Â";
  var Agrave = "À";
  var Aring = "Å";
  var Atilde = "Ã";
  var Auml = "Ä";
  var COPY = "©";
  var Ccedil = "Ç";
  var ETH = "Ð";
  var Eacute = "É";
  var Ecirc = "Ê";
  var Egrave = "È";
  var Euml = "Ë";
  var GT = ">";
  var Iacute = "Í";
  var Icirc = "Î";
  var Igrave = "Ì";
  var Iuml = "Ï";
  var LT = "<";
  var Ntilde = "Ñ";
  var Oacute = "Ó";
  var Ocirc = "Ô";
  var Ograve = "Ò";
  var Oslash = "Ø";
  var Otilde = "Õ";
  var Ouml = "Ö";
  var QUOT = "\"";
  var REG = "®";
  var THORN = "Þ";
  var Uacute = "Ú";
  var Ucirc = "Û";
  var Ugrave = "Ù";
  var Uuml = "Ü";
  var Yacute = "Ý";
  var aacute = "á";
  var acirc = "â";
  var acute = "´";
  var aelig = "æ";
  var agrave = "à";
  var amp = "&";
  var aring = "å";
  var atilde = "ã";
  var auml = "ä";
  var brvbar = "¦";
  var ccedil = "ç";
  var cedil = "¸";
  var cent = "¢";
  var copy = "©";
  var curren = "¤";
  var deg = "°";
  var divide = "÷";
  var eacute = "é";
  var ecirc = "ê";
  var egrave = "è";
  var eth = "ð";
  var euml = "ë";
  var frac12 = "½";
  var frac14 = "¼";
  var frac34 = "¾";
  var gt = ">";
  var iacute = "í";
  var icirc = "î";
  var iexcl = "¡";
  var igrave = "ì";
  var iquest = "¿";
  var iuml = "ï";
  var laquo = "«";
  var lt = "<";
  var macr = "¯";
  var micro = "µ";
  var middot = "·";
  var nbsp = " ";
  var not = "¬";
  var ntilde = "ñ";
  var oacute = "ó";
  var ocirc = "ô";
  var ograve = "ò";
  var ordf = "ª";
  var ordm = "º";
  var oslash = "ø";
  var otilde = "õ";
  var ouml = "ö";
  var para = "¶";
  var plusmn = "±";
  var pound = "£";
  var quot = "\"";
  var raquo = "»";
  var reg = "®";
  var sect = "§";
  var shy = "­";
  var sup1 = "¹";
  var sup2 = "²";
  var sup3 = "³";
  var szlig = "ß";
  var thorn = "þ";
  var times = "×";
  var uacute = "ú";
  var ucirc = "û";
  var ugrave = "ù";
  var uml = "¨";
  var uuml = "ü";
  var yacute = "ý";
  var yen = "¥";
  var yuml = "ÿ";
  var index = {
  	AElig: AElig,
  	AMP: AMP,
  	Aacute: Aacute,
  	Acirc: Acirc,
  	Agrave: Agrave,
  	Aring: Aring,
  	Atilde: Atilde,
  	Auml: Auml,
  	COPY: COPY,
  	Ccedil: Ccedil,
  	ETH: ETH,
  	Eacute: Eacute,
  	Ecirc: Ecirc,
  	Egrave: Egrave,
  	Euml: Euml,
  	GT: GT,
  	Iacute: Iacute,
  	Icirc: Icirc,
  	Igrave: Igrave,
  	Iuml: Iuml,
  	LT: LT,
  	Ntilde: Ntilde,
  	Oacute: Oacute,
  	Ocirc: Ocirc,
  	Ograve: Ograve,
  	Oslash: Oslash,
  	Otilde: Otilde,
  	Ouml: Ouml,
  	QUOT: QUOT,
  	REG: REG,
  	THORN: THORN,
  	Uacute: Uacute,
  	Ucirc: Ucirc,
  	Ugrave: Ugrave,
  	Uuml: Uuml,
  	Yacute: Yacute,
  	aacute: aacute,
  	acirc: acirc,
  	acute: acute,
  	aelig: aelig,
  	agrave: agrave,
  	amp: amp,
  	aring: aring,
  	atilde: atilde,
  	auml: auml,
  	brvbar: brvbar,
  	ccedil: ccedil,
  	cedil: cedil,
  	cent: cent,
  	copy: copy,
  	curren: curren,
  	deg: deg,
  	divide: divide,
  	eacute: eacute,
  	ecirc: ecirc,
  	egrave: egrave,
  	eth: eth,
  	euml: euml,
  	frac12: frac12,
  	frac14: frac14,
  	frac34: frac34,
  	gt: gt,
  	iacute: iacute,
  	icirc: icirc,
  	iexcl: iexcl,
  	igrave: igrave,
  	iquest: iquest,
  	iuml: iuml,
  	laquo: laquo,
  	lt: lt,
  	macr: macr,
  	micro: micro,
  	middot: middot,
  	nbsp: nbsp,
  	not: not,
  	ntilde: ntilde,
  	oacute: oacute,
  	ocirc: ocirc,
  	ograve: ograve,
  	ordf: ordf,
  	ordm: ordm,
  	oslash: oslash,
  	otilde: otilde,
  	ouml: ouml,
  	para: para,
  	plusmn: plusmn,
  	pound: pound,
  	quot: quot,
  	raquo: raquo,
  	reg: reg,
  	sect: sect,
  	shy: shy,
  	sup1: sup1,
  	sup2: sup2,
  	sup3: sup3,
  	szlig: szlig,
  	thorn: thorn,
  	times: times,
  	uacute: uacute,
  	ucirc: ucirc,
  	ugrave: ugrave,
  	uml: uml,
  	uuml: uuml,
  	yacute: yacute,
  	yen: yen,
  	yuml: yuml
  };

  var characterEntitiesLegacy = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AElig: AElig,
    AMP: AMP,
    Aacute: Aacute,
    Acirc: Acirc,
    Agrave: Agrave,
    Aring: Aring,
    Atilde: Atilde,
    Auml: Auml,
    COPY: COPY,
    Ccedil: Ccedil,
    ETH: ETH,
    Eacute: Eacute,
    Ecirc: Ecirc,
    Egrave: Egrave,
    Euml: Euml,
    GT: GT,
    Iacute: Iacute,
    Icirc: Icirc,
    Igrave: Igrave,
    Iuml: Iuml,
    LT: LT,
    Ntilde: Ntilde,
    Oacute: Oacute,
    Ocirc: Ocirc,
    Ograve: Ograve,
    Oslash: Oslash,
    Otilde: Otilde,
    Ouml: Ouml,
    QUOT: QUOT,
    REG: REG,
    THORN: THORN,
    Uacute: Uacute,
    Ucirc: Ucirc,
    Ugrave: Ugrave,
    Uuml: Uuml,
    Yacute: Yacute,
    aacute: aacute,
    acirc: acirc,
    acute: acute,
    aelig: aelig,
    agrave: agrave,
    amp: amp,
    aring: aring,
    atilde: atilde,
    auml: auml,
    brvbar: brvbar,
    ccedil: ccedil,
    cedil: cedil,
    cent: cent,
    copy: copy,
    curren: curren,
    deg: deg,
    divide: divide,
    eacute: eacute,
    ecirc: ecirc,
    egrave: egrave,
    eth: eth,
    euml: euml,
    frac12: frac12,
    frac14: frac14,
    frac34: frac34,
    gt: gt,
    iacute: iacute,
    icirc: icirc,
    iexcl: iexcl,
    igrave: igrave,
    iquest: iquest,
    iuml: iuml,
    laquo: laquo,
    lt: lt,
    macr: macr,
    micro: micro,
    middot: middot,
    nbsp: nbsp,
    not: not,
    ntilde: ntilde,
    oacute: oacute,
    ocirc: ocirc,
    ograve: ograve,
    ordf: ordf,
    ordm: ordm,
    oslash: oslash,
    otilde: otilde,
    ouml: ouml,
    para: para,
    plusmn: plusmn,
    pound: pound,
    quot: quot,
    raquo: raquo,
    reg: reg,
    sect: sect,
    shy: shy,
    sup1: sup1,
    sup2: sup2,
    sup3: sup3,
    szlig: szlig,
    thorn: thorn,
    times: times,
    uacute: uacute,
    ucirc: ucirc,
    ugrave: ugrave,
    uml: uml,
    uuml: uuml,
    yacute: yacute,
    yen: yen,
    yuml: yuml,
    'default': index
  });

  var index$1 = {
  	"0": "�",
  	"128": "€",
  	"130": "‚",
  	"131": "ƒ",
  	"132": "„",
  	"133": "…",
  	"134": "†",
  	"135": "‡",
  	"136": "ˆ",
  	"137": "‰",
  	"138": "Š",
  	"139": "‹",
  	"140": "Œ",
  	"142": "Ž",
  	"145": "‘",
  	"146": "’",
  	"147": "“",
  	"148": "”",
  	"149": "•",
  	"150": "–",
  	"151": "—",
  	"152": "˜",
  	"153": "™",
  	"154": "š",
  	"155": "›",
  	"156": "œ",
  	"158": "ž",
  	"159": "Ÿ"
  };

  var characterReferenceInvalid = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': index$1
  });

  var isDecimal = decimal; // Check if the given character code, or the character code at the first
  // character, is decimal.

  function decimal(character) {
    var code = typeof character === 'string' ? character.charCodeAt(0) : character;
    return code >= 48 && code <= 57;
    /* 0-9 */
  }

  var isHexadecimal = hexadecimal; // Check if the given character code, or the character code at the first
  // character, is hexadecimal.

  function hexadecimal(character) {
    var code = typeof character === 'string' ? character.charCodeAt(0) : character;
    return code >= 97
    /* a */
    && code <= 102 ||
    /* z */
    code >= 65
    /* A */
    && code <= 70
    /* Z */
    || code >= 48
    /* A */
    && code <= 57
    /* Z */
    ;
  }

  var isAlphabetical = alphabetical; // Check if the given character code, or the character code at the first
  // character, is alphabetical.

  function alphabetical(character) {
    var code = typeof character === 'string' ? character.charCodeAt(0) : character;
    return code >= 97 && code <= 122 ||
    /* a-z */
    code >= 65 && code <= 90
    /* A-Z */
    ;
  }

  var isAlphanumerical = alphanumerical; // Check if the given character code, or the character code at the first
  // character, is alphanumerical.

  function alphanumerical(character) {
    return isAlphabetical(character) || isDecimal(character);
  }

  var AEli = "Æ";
  var AElig$1 = "Æ";
  var AM = "&";
  var AMP$1 = "&";
  var Aacut = "Á";
  var Aacute$1 = "Á";
  var Abreve = "Ă";
  var Acir = "Â";
  var Acirc$1 = "Â";
  var Acy = "А";
  var Afr = "𝔄";
  var Agrav = "À";
  var Agrave$1 = "À";
  var Alpha = "Α";
  var Amacr = "Ā";
  var And = "⩓";
  var Aogon = "Ą";
  var Aopf = "𝔸";
  var ApplyFunction = "⁡";
  var Arin = "Å";
  var Aring$1 = "Å";
  var Ascr = "𝒜";
  var Assign = "≔";
  var Atild = "Ã";
  var Atilde$1 = "Ã";
  var Aum = "Ä";
  var Auml$1 = "Ä";
  var Backslash = "∖";
  var Barv = "⫧";
  var Barwed = "⌆";
  var Bcy = "Б";
  var Because = "∵";
  var Bernoullis = "ℬ";
  var Beta = "Β";
  var Bfr = "𝔅";
  var Bopf = "𝔹";
  var Breve = "˘";
  var Bscr = "ℬ";
  var Bumpeq = "≎";
  var CHcy = "Ч";
  var COP = "©";
  var COPY$1 = "©";
  var Cacute = "Ć";
  var Cap = "⋒";
  var CapitalDifferentialD = "ⅅ";
  var Cayleys = "ℭ";
  var Ccaron = "Č";
  var Ccedi = "Ç";
  var Ccedil$1 = "Ç";
  var Ccirc = "Ĉ";
  var Cconint = "∰";
  var Cdot = "Ċ";
  var Cedilla = "¸";
  var CenterDot = "·";
  var Cfr = "ℭ";
  var Chi = "Χ";
  var CircleDot = "⊙";
  var CircleMinus = "⊖";
  var CirclePlus = "⊕";
  var CircleTimes = "⊗";
  var ClockwiseContourIntegral = "∲";
  var CloseCurlyDoubleQuote = "”";
  var CloseCurlyQuote = "’";
  var Colon = "∷";
  var Colone = "⩴";
  var Congruent = "≡";
  var Conint = "∯";
  var ContourIntegral = "∮";
  var Copf = "ℂ";
  var Coproduct = "∐";
  var CounterClockwiseContourIntegral = "∳";
  var Cross = "⨯";
  var Cscr = "𝒞";
  var Cup = "⋓";
  var CupCap = "≍";
  var DD = "ⅅ";
  var DDotrahd = "⤑";
  var DJcy = "Ђ";
  var DScy = "Ѕ";
  var DZcy = "Џ";
  var Dagger = "‡";
  var Darr = "↡";
  var Dashv = "⫤";
  var Dcaron = "Ď";
  var Dcy = "Д";
  var Del = "∇";
  var Delta = "Δ";
  var Dfr = "𝔇";
  var DiacriticalAcute = "´";
  var DiacriticalDot = "˙";
  var DiacriticalDoubleAcute = "˝";
  var DiacriticalGrave = "`";
  var DiacriticalTilde = "˜";
  var Diamond = "⋄";
  var DifferentialD = "ⅆ";
  var Dopf = "𝔻";
  var Dot = "¨";
  var DotDot = "⃜";
  var DotEqual = "≐";
  var DoubleContourIntegral = "∯";
  var DoubleDot = "¨";
  var DoubleDownArrow = "⇓";
  var DoubleLeftArrow = "⇐";
  var DoubleLeftRightArrow = "⇔";
  var DoubleLeftTee = "⫤";
  var DoubleLongLeftArrow = "⟸";
  var DoubleLongLeftRightArrow = "⟺";
  var DoubleLongRightArrow = "⟹";
  var DoubleRightArrow = "⇒";
  var DoubleRightTee = "⊨";
  var DoubleUpArrow = "⇑";
  var DoubleUpDownArrow = "⇕";
  var DoubleVerticalBar = "∥";
  var DownArrow = "↓";
  var DownArrowBar = "⤓";
  var DownArrowUpArrow = "⇵";
  var DownBreve = "̑";
  var DownLeftRightVector = "⥐";
  var DownLeftTeeVector = "⥞";
  var DownLeftVector = "↽";
  var DownLeftVectorBar = "⥖";
  var DownRightTeeVector = "⥟";
  var DownRightVector = "⇁";
  var DownRightVectorBar = "⥗";
  var DownTee = "⊤";
  var DownTeeArrow = "↧";
  var Downarrow = "⇓";
  var Dscr = "𝒟";
  var Dstrok = "Đ";
  var ENG = "Ŋ";
  var ET = "Ð";
  var ETH$1 = "Ð";
  var Eacut = "É";
  var Eacute$1 = "É";
  var Ecaron = "Ě";
  var Ecir = "Ê";
  var Ecirc$1 = "Ê";
  var Ecy = "Э";
  var Edot = "Ė";
  var Efr = "𝔈";
  var Egrav = "È";
  var Egrave$1 = "È";
  var Element = "∈";
  var Emacr = "Ē";
  var EmptySmallSquare = "◻";
  var EmptyVerySmallSquare = "▫";
  var Eogon = "Ę";
  var Eopf = "𝔼";
  var Epsilon = "Ε";
  var Equal = "⩵";
  var EqualTilde = "≂";
  var Equilibrium = "⇌";
  var Escr = "ℰ";
  var Esim = "⩳";
  var Eta = "Η";
  var Eum = "Ë";
  var Euml$1 = "Ë";
  var Exists = "∃";
  var ExponentialE = "ⅇ";
  var Fcy = "Ф";
  var Ffr = "𝔉";
  var FilledSmallSquare = "◼";
  var FilledVerySmallSquare = "▪";
  var Fopf = "𝔽";
  var ForAll = "∀";
  var Fouriertrf = "ℱ";
  var Fscr = "ℱ";
  var GJcy = "Ѓ";
  var G = ">";
  var GT$1 = ">";
  var Gamma = "Γ";
  var Gammad = "Ϝ";
  var Gbreve = "Ğ";
  var Gcedil = "Ģ";
  var Gcirc = "Ĝ";
  var Gcy = "Г";
  var Gdot = "Ġ";
  var Gfr = "𝔊";
  var Gg = "⋙";
  var Gopf = "𝔾";
  var GreaterEqual = "≥";
  var GreaterEqualLess = "⋛";
  var GreaterFullEqual = "≧";
  var GreaterGreater = "⪢";
  var GreaterLess = "≷";
  var GreaterSlantEqual = "⩾";
  var GreaterTilde = "≳";
  var Gscr = "𝒢";
  var Gt = "≫";
  var HARDcy = "Ъ";
  var Hacek = "ˇ";
  var Hat = "^";
  var Hcirc = "Ĥ";
  var Hfr = "ℌ";
  var HilbertSpace = "ℋ";
  var Hopf = "ℍ";
  var HorizontalLine = "─";
  var Hscr = "ℋ";
  var Hstrok = "Ħ";
  var HumpDownHump = "≎";
  var HumpEqual = "≏";
  var IEcy = "Е";
  var IJlig = "Ĳ";
  var IOcy = "Ё";
  var Iacut = "Í";
  var Iacute$1 = "Í";
  var Icir = "Î";
  var Icirc$1 = "Î";
  var Icy = "И";
  var Idot = "İ";
  var Ifr = "ℑ";
  var Igrav = "Ì";
  var Igrave$1 = "Ì";
  var Im = "ℑ";
  var Imacr = "Ī";
  var ImaginaryI = "ⅈ";
  var Implies = "⇒";
  var Int = "∬";
  var Integral = "∫";
  var Intersection = "⋂";
  var InvisibleComma = "⁣";
  var InvisibleTimes = "⁢";
  var Iogon = "Į";
  var Iopf = "𝕀";
  var Iota = "Ι";
  var Iscr = "ℐ";
  var Itilde = "Ĩ";
  var Iukcy = "І";
  var Ium = "Ï";
  var Iuml$1 = "Ï";
  var Jcirc = "Ĵ";
  var Jcy = "Й";
  var Jfr = "𝔍";
  var Jopf = "𝕁";
  var Jscr = "𝒥";
  var Jsercy = "Ј";
  var Jukcy = "Є";
  var KHcy = "Х";
  var KJcy = "Ќ";
  var Kappa = "Κ";
  var Kcedil = "Ķ";
  var Kcy = "К";
  var Kfr = "𝔎";
  var Kopf = "𝕂";
  var Kscr = "𝒦";
  var LJcy = "Љ";
  var L = "<";
  var LT$1 = "<";
  var Lacute = "Ĺ";
  var Lambda = "Λ";
  var Lang = "⟪";
  var Laplacetrf = "ℒ";
  var Larr = "↞";
  var Lcaron = "Ľ";
  var Lcedil = "Ļ";
  var Lcy = "Л";
  var LeftAngleBracket = "⟨";
  var LeftArrow = "←";
  var LeftArrowBar = "⇤";
  var LeftArrowRightArrow = "⇆";
  var LeftCeiling = "⌈";
  var LeftDoubleBracket = "⟦";
  var LeftDownTeeVector = "⥡";
  var LeftDownVector = "⇃";
  var LeftDownVectorBar = "⥙";
  var LeftFloor = "⌊";
  var LeftRightArrow = "↔";
  var LeftRightVector = "⥎";
  var LeftTee = "⊣";
  var LeftTeeArrow = "↤";
  var LeftTeeVector = "⥚";
  var LeftTriangle = "⊲";
  var LeftTriangleBar = "⧏";
  var LeftTriangleEqual = "⊴";
  var LeftUpDownVector = "⥑";
  var LeftUpTeeVector = "⥠";
  var LeftUpVector = "↿";
  var LeftUpVectorBar = "⥘";
  var LeftVector = "↼";
  var LeftVectorBar = "⥒";
  var Leftarrow = "⇐";
  var Leftrightarrow = "⇔";
  var LessEqualGreater = "⋚";
  var LessFullEqual = "≦";
  var LessGreater = "≶";
  var LessLess = "⪡";
  var LessSlantEqual = "⩽";
  var LessTilde = "≲";
  var Lfr = "𝔏";
  var Ll = "⋘";
  var Lleftarrow = "⇚";
  var Lmidot = "Ŀ";
  var LongLeftArrow = "⟵";
  var LongLeftRightArrow = "⟷";
  var LongRightArrow = "⟶";
  var Longleftarrow = "⟸";
  var Longleftrightarrow = "⟺";
  var Longrightarrow = "⟹";
  var Lopf = "𝕃";
  var LowerLeftArrow = "↙";
  var LowerRightArrow = "↘";
  var Lscr = "ℒ";
  var Lsh = "↰";
  var Lstrok = "Ł";
  var Lt = "≪";
  var Mcy = "М";
  var MediumSpace = " ";
  var Mellintrf = "ℳ";
  var Mfr = "𝔐";
  var MinusPlus = "∓";
  var Mopf = "𝕄";
  var Mscr = "ℳ";
  var Mu = "Μ";
  var NJcy = "Њ";
  var Nacute = "Ń";
  var Ncaron = "Ň";
  var Ncedil = "Ņ";
  var Ncy = "Н";
  var NegativeMediumSpace = "​";
  var NegativeThickSpace = "​";
  var NegativeThinSpace = "​";
  var NegativeVeryThinSpace = "​";
  var NestedGreaterGreater = "≫";
  var NestedLessLess = "≪";
  var NewLine = "\n";
  var Nfr = "𝔑";
  var NoBreak = "⁠";
  var NonBreakingSpace = " ";
  var Nopf = "ℕ";
  var Not = "⫬";
  var NotCongruent = "≢";
  var NotCupCap = "≭";
  var NotDoubleVerticalBar = "∦";
  var NotElement = "∉";
  var NotEqual = "≠";
  var NotEqualTilde = "≂̸";
  var NotExists = "∄";
  var NotGreater = "≯";
  var NotGreaterEqual = "≱";
  var NotGreaterFullEqual = "≧̸";
  var NotGreaterGreater = "≫̸";
  var NotGreaterLess = "≹";
  var NotGreaterSlantEqual = "⩾̸";
  var NotGreaterTilde = "≵";
  var NotHumpDownHump = "≎̸";
  var NotHumpEqual = "≏̸";
  var NotLeftTriangle = "⋪";
  var NotLeftTriangleBar = "⧏̸";
  var NotLeftTriangleEqual = "⋬";
  var NotLess = "≮";
  var NotLessEqual = "≰";
  var NotLessGreater = "≸";
  var NotLessLess = "≪̸";
  var NotLessSlantEqual = "⩽̸";
  var NotLessTilde = "≴";
  var NotNestedGreaterGreater = "⪢̸";
  var NotNestedLessLess = "⪡̸";
  var NotPrecedes = "⊀";
  var NotPrecedesEqual = "⪯̸";
  var NotPrecedesSlantEqual = "⋠";
  var NotReverseElement = "∌";
  var NotRightTriangle = "⋫";
  var NotRightTriangleBar = "⧐̸";
  var NotRightTriangleEqual = "⋭";
  var NotSquareSubset = "⊏̸";
  var NotSquareSubsetEqual = "⋢";
  var NotSquareSuperset = "⊐̸";
  var NotSquareSupersetEqual = "⋣";
  var NotSubset = "⊂⃒";
  var NotSubsetEqual = "⊈";
  var NotSucceeds = "⊁";
  var NotSucceedsEqual = "⪰̸";
  var NotSucceedsSlantEqual = "⋡";
  var NotSucceedsTilde = "≿̸";
  var NotSuperset = "⊃⃒";
  var NotSupersetEqual = "⊉";
  var NotTilde = "≁";
  var NotTildeEqual = "≄";
  var NotTildeFullEqual = "≇";
  var NotTildeTilde = "≉";
  var NotVerticalBar = "∤";
  var Nscr = "𝒩";
  var Ntild = "Ñ";
  var Ntilde$1 = "Ñ";
  var Nu = "Ν";
  var OElig = "Œ";
  var Oacut = "Ó";
  var Oacute$1 = "Ó";
  var Ocir = "Ô";
  var Ocirc$1 = "Ô";
  var Ocy = "О";
  var Odblac = "Ő";
  var Ofr = "𝔒";
  var Ograv = "Ò";
  var Ograve$1 = "Ò";
  var Omacr = "Ō";
  var Omega = "Ω";
  var Omicron = "Ο";
  var Oopf = "𝕆";
  var OpenCurlyDoubleQuote = "“";
  var OpenCurlyQuote = "‘";
  var Or = "⩔";
  var Oscr = "𝒪";
  var Oslas = "Ø";
  var Oslash$1 = "Ø";
  var Otild = "Õ";
  var Otilde$1 = "Õ";
  var Otimes = "⨷";
  var Oum = "Ö";
  var Ouml$1 = "Ö";
  var OverBar = "‾";
  var OverBrace = "⏞";
  var OverBracket = "⎴";
  var OverParenthesis = "⏜";
  var PartialD = "∂";
  var Pcy = "П";
  var Pfr = "𝔓";
  var Phi = "Φ";
  var Pi = "Π";
  var PlusMinus = "±";
  var Poincareplane = "ℌ";
  var Popf = "ℙ";
  var Pr = "⪻";
  var Precedes = "≺";
  var PrecedesEqual = "⪯";
  var PrecedesSlantEqual = "≼";
  var PrecedesTilde = "≾";
  var Prime = "″";
  var Product = "∏";
  var Proportion = "∷";
  var Proportional = "∝";
  var Pscr = "𝒫";
  var Psi = "Ψ";
  var QUO = "\"";
  var QUOT$1 = "\"";
  var Qfr = "𝔔";
  var Qopf = "ℚ";
  var Qscr = "𝒬";
  var RBarr = "⤐";
  var RE = "®";
  var REG$1 = "®";
  var Racute = "Ŕ";
  var Rang = "⟫";
  var Rarr = "↠";
  var Rarrtl = "⤖";
  var Rcaron = "Ř";
  var Rcedil = "Ŗ";
  var Rcy = "Р";
  var Re = "ℜ";
  var ReverseElement = "∋";
  var ReverseEquilibrium = "⇋";
  var ReverseUpEquilibrium = "⥯";
  var Rfr = "ℜ";
  var Rho = "Ρ";
  var RightAngleBracket = "⟩";
  var RightArrow = "→";
  var RightArrowBar = "⇥";
  var RightArrowLeftArrow = "⇄";
  var RightCeiling = "⌉";
  var RightDoubleBracket = "⟧";
  var RightDownTeeVector = "⥝";
  var RightDownVector = "⇂";
  var RightDownVectorBar = "⥕";
  var RightFloor = "⌋";
  var RightTee = "⊢";
  var RightTeeArrow = "↦";
  var RightTeeVector = "⥛";
  var RightTriangle = "⊳";
  var RightTriangleBar = "⧐";
  var RightTriangleEqual = "⊵";
  var RightUpDownVector = "⥏";
  var RightUpTeeVector = "⥜";
  var RightUpVector = "↾";
  var RightUpVectorBar = "⥔";
  var RightVector = "⇀";
  var RightVectorBar = "⥓";
  var Rightarrow = "⇒";
  var Ropf = "ℝ";
  var RoundImplies = "⥰";
  var Rrightarrow = "⇛";
  var Rscr = "ℛ";
  var Rsh = "↱";
  var RuleDelayed = "⧴";
  var SHCHcy = "Щ";
  var SHcy = "Ш";
  var SOFTcy = "Ь";
  var Sacute = "Ś";
  var Sc = "⪼";
  var Scaron = "Š";
  var Scedil = "Ş";
  var Scirc = "Ŝ";
  var Scy = "С";
  var Sfr = "𝔖";
  var ShortDownArrow = "↓";
  var ShortLeftArrow = "←";
  var ShortRightArrow = "→";
  var ShortUpArrow = "↑";
  var Sigma = "Σ";
  var SmallCircle = "∘";
  var Sopf = "𝕊";
  var Sqrt = "√";
  var Square = "□";
  var SquareIntersection = "⊓";
  var SquareSubset = "⊏";
  var SquareSubsetEqual = "⊑";
  var SquareSuperset = "⊐";
  var SquareSupersetEqual = "⊒";
  var SquareUnion = "⊔";
  var Sscr = "𝒮";
  var Star = "⋆";
  var Sub = "⋐";
  var Subset = "⋐";
  var SubsetEqual = "⊆";
  var Succeeds = "≻";
  var SucceedsEqual = "⪰";
  var SucceedsSlantEqual = "≽";
  var SucceedsTilde = "≿";
  var SuchThat = "∋";
  var Sum = "∑";
  var Sup = "⋑";
  var Superset = "⊃";
  var SupersetEqual = "⊇";
  var Supset = "⋑";
  var THOR = "Þ";
  var THORN$1 = "Þ";
  var TRADE = "™";
  var TSHcy = "Ћ";
  var TScy = "Ц";
  var Tab = "\t";
  var Tau = "Τ";
  var Tcaron = "Ť";
  var Tcedil = "Ţ";
  var Tcy = "Т";
  var Tfr = "𝔗";
  var Therefore = "∴";
  var Theta = "Θ";
  var ThickSpace = "  ";
  var ThinSpace = " ";
  var Tilde = "∼";
  var TildeEqual = "≃";
  var TildeFullEqual = "≅";
  var TildeTilde = "≈";
  var Topf = "𝕋";
  var TripleDot = "⃛";
  var Tscr = "𝒯";
  var Tstrok = "Ŧ";
  var Uacut = "Ú";
  var Uacute$1 = "Ú";
  var Uarr = "↟";
  var Uarrocir = "⥉";
  var Ubrcy = "Ў";
  var Ubreve = "Ŭ";
  var Ucir = "Û";
  var Ucirc$1 = "Û";
  var Ucy = "У";
  var Udblac = "Ű";
  var Ufr = "𝔘";
  var Ugrav = "Ù";
  var Ugrave$1 = "Ù";
  var Umacr = "Ū";
  var UnderBar = "_";
  var UnderBrace = "⏟";
  var UnderBracket = "⎵";
  var UnderParenthesis = "⏝";
  var Union = "⋃";
  var UnionPlus = "⊎";
  var Uogon = "Ų";
  var Uopf = "𝕌";
  var UpArrow = "↑";
  var UpArrowBar = "⤒";
  var UpArrowDownArrow = "⇅";
  var UpDownArrow = "↕";
  var UpEquilibrium = "⥮";
  var UpTee = "⊥";
  var UpTeeArrow = "↥";
  var Uparrow = "⇑";
  var Updownarrow = "⇕";
  var UpperLeftArrow = "↖";
  var UpperRightArrow = "↗";
  var Upsi = "ϒ";
  var Upsilon = "Υ";
  var Uring = "Ů";
  var Uscr = "𝒰";
  var Utilde = "Ũ";
  var Uum = "Ü";
  var Uuml$1 = "Ü";
  var VDash = "⊫";
  var Vbar = "⫫";
  var Vcy = "В";
  var Vdash = "⊩";
  var Vdashl = "⫦";
  var Vee = "⋁";
  var Verbar = "‖";
  var Vert = "‖";
  var VerticalBar = "∣";
  var VerticalLine = "|";
  var VerticalSeparator = "❘";
  var VerticalTilde = "≀";
  var VeryThinSpace = " ";
  var Vfr = "𝔙";
  var Vopf = "𝕍";
  var Vscr = "𝒱";
  var Vvdash = "⊪";
  var Wcirc = "Ŵ";
  var Wedge = "⋀";
  var Wfr = "𝔚";
  var Wopf = "𝕎";
  var Wscr = "𝒲";
  var Xfr = "𝔛";
  var Xi = "Ξ";
  var Xopf = "𝕏";
  var Xscr = "𝒳";
  var YAcy = "Я";
  var YIcy = "Ї";
  var YUcy = "Ю";
  var Yacut = "Ý";
  var Yacute$1 = "Ý";
  var Ycirc = "Ŷ";
  var Ycy = "Ы";
  var Yfr = "𝔜";
  var Yopf = "𝕐";
  var Yscr = "𝒴";
  var Yuml = "Ÿ";
  var ZHcy = "Ж";
  var Zacute = "Ź";
  var Zcaron = "Ž";
  var Zcy = "З";
  var Zdot = "Ż";
  var ZeroWidthSpace = "​";
  var Zeta = "Ζ";
  var Zfr = "ℨ";
  var Zopf = "ℤ";
  var Zscr = "𝒵";
  var aacut = "á";
  var aacute$1 = "á";
  var abreve = "ă";
  var ac = "∾";
  var acE = "∾̳";
  var acd = "∿";
  var acir = "â";
  var acirc$1 = "â";
  var acut = "´";
  var acute$1 = "´";
  var acy = "а";
  var aeli = "æ";
  var aelig$1 = "æ";
  var af = "⁡";
  var afr = "𝔞";
  var agrav = "à";
  var agrave$1 = "à";
  var alefsym = "ℵ";
  var aleph = "ℵ";
  var alpha = "α";
  var amacr = "ā";
  var amalg = "⨿";
  var am = "&";
  var amp$1 = "&";
  var and = "∧";
  var andand = "⩕";
  var andd = "⩜";
  var andslope = "⩘";
  var andv = "⩚";
  var ang = "∠";
  var ange = "⦤";
  var angle = "∠";
  var angmsd = "∡";
  var angmsdaa = "⦨";
  var angmsdab = "⦩";
  var angmsdac = "⦪";
  var angmsdad = "⦫";
  var angmsdae = "⦬";
  var angmsdaf = "⦭";
  var angmsdag = "⦮";
  var angmsdah = "⦯";
  var angrt = "∟";
  var angrtvb = "⊾";
  var angrtvbd = "⦝";
  var angsph = "∢";
  var angst = "Å";
  var angzarr = "⍼";
  var aogon = "ą";
  var aopf = "𝕒";
  var ap = "≈";
  var apE = "⩰";
  var apacir = "⩯";
  var ape = "≊";
  var apid = "≋";
  var apos = "'";
  var approx = "≈";
  var approxeq = "≊";
  var arin = "å";
  var aring$1 = "å";
  var ascr = "𝒶";
  var ast = "*";
  var asymp = "≈";
  var asympeq = "≍";
  var atild = "ã";
  var atilde$1 = "ã";
  var aum = "ä";
  var auml$1 = "ä";
  var awconint = "∳";
  var awint = "⨑";
  var bNot = "⫭";
  var backcong = "≌";
  var backepsilon = "϶";
  var backprime = "‵";
  var backsim = "∽";
  var backsimeq = "⋍";
  var barvee = "⊽";
  var barwed = "⌅";
  var barwedge = "⌅";
  var bbrk = "⎵";
  var bbrktbrk = "⎶";
  var bcong = "≌";
  var bcy = "б";
  var bdquo = "„";
  var becaus = "∵";
  var because = "∵";
  var bemptyv = "⦰";
  var bepsi = "϶";
  var bernou = "ℬ";
  var beta = "β";
  var beth = "ℶ";
  var between = "≬";
  var bfr = "𝔟";
  var bigcap = "⋂";
  var bigcirc = "◯";
  var bigcup = "⋃";
  var bigodot = "⨀";
  var bigoplus = "⨁";
  var bigotimes = "⨂";
  var bigsqcup = "⨆";
  var bigstar = "★";
  var bigtriangledown = "▽";
  var bigtriangleup = "△";
  var biguplus = "⨄";
  var bigvee = "⋁";
  var bigwedge = "⋀";
  var bkarow = "⤍";
  var blacklozenge = "⧫";
  var blacksquare = "▪";
  var blacktriangle = "▴";
  var blacktriangledown = "▾";
  var blacktriangleleft = "◂";
  var blacktriangleright = "▸";
  var blank = "␣";
  var blk12 = "▒";
  var blk14 = "░";
  var blk34 = "▓";
  var block = "█";
  var bne = "=⃥";
  var bnequiv = "≡⃥";
  var bnot = "⌐";
  var bopf = "𝕓";
  var bot = "⊥";
  var bottom = "⊥";
  var bowtie = "⋈";
  var boxDL = "╗";
  var boxDR = "╔";
  var boxDl = "╖";
  var boxDr = "╓";
  var boxH = "═";
  var boxHD = "╦";
  var boxHU = "╩";
  var boxHd = "╤";
  var boxHu = "╧";
  var boxUL = "╝";
  var boxUR = "╚";
  var boxUl = "╜";
  var boxUr = "╙";
  var boxV = "║";
  var boxVH = "╬";
  var boxVL = "╣";
  var boxVR = "╠";
  var boxVh = "╫";
  var boxVl = "╢";
  var boxVr = "╟";
  var boxbox = "⧉";
  var boxdL = "╕";
  var boxdR = "╒";
  var boxdl = "┐";
  var boxdr = "┌";
  var boxh = "─";
  var boxhD = "╥";
  var boxhU = "╨";
  var boxhd = "┬";
  var boxhu = "┴";
  var boxminus = "⊟";
  var boxplus = "⊞";
  var boxtimes = "⊠";
  var boxuL = "╛";
  var boxuR = "╘";
  var boxul = "┘";
  var boxur = "└";
  var boxv = "│";
  var boxvH = "╪";
  var boxvL = "╡";
  var boxvR = "╞";
  var boxvh = "┼";
  var boxvl = "┤";
  var boxvr = "├";
  var bprime = "‵";
  var breve = "˘";
  var brvba = "¦";
  var brvbar$1 = "¦";
  var bscr = "𝒷";
  var bsemi = "⁏";
  var bsim = "∽";
  var bsime = "⋍";
  var bsol = "\\";
  var bsolb = "⧅";
  var bsolhsub = "⟈";
  var bull = "•";
  var bullet = "•";
  var bump = "≎";
  var bumpE = "⪮";
  var bumpe = "≏";
  var bumpeq = "≏";
  var cacute = "ć";
  var cap = "∩";
  var capand = "⩄";
  var capbrcup = "⩉";
  var capcap = "⩋";
  var capcup = "⩇";
  var capdot = "⩀";
  var caps = "∩︀";
  var caret = "⁁";
  var caron = "ˇ";
  var ccaps = "⩍";
  var ccaron = "č";
  var ccedi = "ç";
  var ccedil$1 = "ç";
  var ccirc = "ĉ";
  var ccups = "⩌";
  var ccupssm = "⩐";
  var cdot = "ċ";
  var cedi = "¸";
  var cedil$1 = "¸";
  var cemptyv = "⦲";
  var cen = "¢";
  var cent$1 = "¢";
  var centerdot = "·";
  var cfr = "𝔠";
  var chcy = "ч";
  var check = "✓";
  var checkmark = "✓";
  var chi = "χ";
  var cir = "○";
  var cirE = "⧃";
  var circ = "ˆ";
  var circeq = "≗";
  var circlearrowleft = "↺";
  var circlearrowright = "↻";
  var circledR = "®";
  var circledS = "Ⓢ";
  var circledast = "⊛";
  var circledcirc = "⊚";
  var circleddash = "⊝";
  var cire = "≗";
  var cirfnint = "⨐";
  var cirmid = "⫯";
  var cirscir = "⧂";
  var clubs = "♣";
  var clubsuit = "♣";
  var colon = ":";
  var colone = "≔";
  var coloneq = "≔";
  var comma = ",";
  var commat = "@";
  var comp = "∁";
  var compfn = "∘";
  var complement = "∁";
  var complexes = "ℂ";
  var cong = "≅";
  var congdot = "⩭";
  var conint = "∮";
  var copf = "𝕔";
  var coprod = "∐";
  var cop = "©";
  var copy$1 = "©";
  var copysr = "℗";
  var crarr = "↵";
  var cross = "✗";
  var cscr = "𝒸";
  var csub = "⫏";
  var csube = "⫑";
  var csup = "⫐";
  var csupe = "⫒";
  var ctdot = "⋯";
  var cudarrl = "⤸";
  var cudarrr = "⤵";
  var cuepr = "⋞";
  var cuesc = "⋟";
  var cularr = "↶";
  var cularrp = "⤽";
  var cup = "∪";
  var cupbrcap = "⩈";
  var cupcap = "⩆";
  var cupcup = "⩊";
  var cupdot = "⊍";
  var cupor = "⩅";
  var cups = "∪︀";
  var curarr = "↷";
  var curarrm = "⤼";
  var curlyeqprec = "⋞";
  var curlyeqsucc = "⋟";
  var curlyvee = "⋎";
  var curlywedge = "⋏";
  var curre = "¤";
  var curren$1 = "¤";
  var curvearrowleft = "↶";
  var curvearrowright = "↷";
  var cuvee = "⋎";
  var cuwed = "⋏";
  var cwconint = "∲";
  var cwint = "∱";
  var cylcty = "⌭";
  var dArr = "⇓";
  var dHar = "⥥";
  var dagger = "†";
  var daleth = "ℸ";
  var darr = "↓";
  var dash = "‐";
  var dashv = "⊣";
  var dbkarow = "⤏";
  var dblac = "˝";
  var dcaron = "ď";
  var dcy = "д";
  var dd = "ⅆ";
  var ddagger = "‡";
  var ddarr = "⇊";
  var ddotseq = "⩷";
  var de = "°";
  var deg$1 = "°";
  var delta = "δ";
  var demptyv = "⦱";
  var dfisht = "⥿";
  var dfr = "𝔡";
  var dharl = "⇃";
  var dharr = "⇂";
  var diam = "⋄";
  var diamond = "⋄";
  var diamondsuit = "♦";
  var diams = "♦";
  var die = "¨";
  var digamma = "ϝ";
  var disin = "⋲";
  var div = "÷";
  var divid = "÷";
  var divide$1 = "÷";
  var divideontimes = "⋇";
  var divonx = "⋇";
  var djcy = "ђ";
  var dlcorn = "⌞";
  var dlcrop = "⌍";
  var dollar = "$";
  var dopf = "𝕕";
  var dot = "˙";
  var doteq = "≐";
  var doteqdot = "≑";
  var dotminus = "∸";
  var dotplus = "∔";
  var dotsquare = "⊡";
  var doublebarwedge = "⌆";
  var downarrow = "↓";
  var downdownarrows = "⇊";
  var downharpoonleft = "⇃";
  var downharpoonright = "⇂";
  var drbkarow = "⤐";
  var drcorn = "⌟";
  var drcrop = "⌌";
  var dscr = "𝒹";
  var dscy = "ѕ";
  var dsol = "⧶";
  var dstrok = "đ";
  var dtdot = "⋱";
  var dtri = "▿";
  var dtrif = "▾";
  var duarr = "⇵";
  var duhar = "⥯";
  var dwangle = "⦦";
  var dzcy = "џ";
  var dzigrarr = "⟿";
  var eDDot = "⩷";
  var eDot = "≑";
  var eacut = "é";
  var eacute$1 = "é";
  var easter = "⩮";
  var ecaron = "ě";
  var ecir = "ê";
  var ecirc$1 = "ê";
  var ecolon = "≕";
  var ecy = "э";
  var edot = "ė";
  var ee = "ⅇ";
  var efDot = "≒";
  var efr = "𝔢";
  var eg = "⪚";
  var egrav = "è";
  var egrave$1 = "è";
  var egs = "⪖";
  var egsdot = "⪘";
  var el = "⪙";
  var elinters = "⏧";
  var ell = "ℓ";
  var els = "⪕";
  var elsdot = "⪗";
  var emacr = "ē";
  var empty = "∅";
  var emptyset = "∅";
  var emptyv = "∅";
  var emsp13 = " ";
  var emsp14 = " ";
  var emsp = " ";
  var eng = "ŋ";
  var ensp = " ";
  var eogon = "ę";
  var eopf = "𝕖";
  var epar = "⋕";
  var eparsl = "⧣";
  var eplus = "⩱";
  var epsi = "ε";
  var epsilon = "ε";
  var epsiv = "ϵ";
  var eqcirc = "≖";
  var eqcolon = "≕";
  var eqsim = "≂";
  var eqslantgtr = "⪖";
  var eqslantless = "⪕";
  var equals = "=";
  var equest = "≟";
  var equiv = "≡";
  var equivDD = "⩸";
  var eqvparsl = "⧥";
  var erDot = "≓";
  var erarr = "⥱";
  var escr = "ℯ";
  var esdot = "≐";
  var esim = "≂";
  var eta = "η";
  var et = "ð";
  var eth$1 = "ð";
  var eum = "ë";
  var euml$1 = "ë";
  var euro = "€";
  var excl = "!";
  var exist = "∃";
  var expectation = "ℰ";
  var exponentiale = "ⅇ";
  var fallingdotseq = "≒";
  var fcy = "ф";
  var female = "♀";
  var ffilig = "ﬃ";
  var fflig = "ﬀ";
  var ffllig = "ﬄ";
  var ffr = "𝔣";
  var filig = "ﬁ";
  var fjlig = "fj";
  var flat = "♭";
  var fllig = "ﬂ";
  var fltns = "▱";
  var fnof = "ƒ";
  var fopf = "𝕗";
  var forall = "∀";
  var fork = "⋔";
  var forkv = "⫙";
  var fpartint = "⨍";
  var frac1 = "¼";
  var frac12$1 = "½";
  var frac13 = "⅓";
  var frac14$1 = "¼";
  var frac15 = "⅕";
  var frac16 = "⅙";
  var frac18 = "⅛";
  var frac23 = "⅔";
  var frac25 = "⅖";
  var frac3 = "¾";
  var frac34$1 = "¾";
  var frac35 = "⅗";
  var frac38 = "⅜";
  var frac45 = "⅘";
  var frac56 = "⅚";
  var frac58 = "⅝";
  var frac78 = "⅞";
  var frasl = "⁄";
  var frown = "⌢";
  var fscr = "𝒻";
  var gE = "≧";
  var gEl = "⪌";
  var gacute = "ǵ";
  var gamma = "γ";
  var gammad = "ϝ";
  var gap = "⪆";
  var gbreve = "ğ";
  var gcirc = "ĝ";
  var gcy = "г";
  var gdot = "ġ";
  var ge = "≥";
  var gel = "⋛";
  var geq = "≥";
  var geqq = "≧";
  var geqslant = "⩾";
  var ges = "⩾";
  var gescc = "⪩";
  var gesdot = "⪀";
  var gesdoto = "⪂";
  var gesdotol = "⪄";
  var gesl = "⋛︀";
  var gesles = "⪔";
  var gfr = "𝔤";
  var gg = "≫";
  var ggg = "⋙";
  var gimel = "ℷ";
  var gjcy = "ѓ";
  var gl = "≷";
  var glE = "⪒";
  var gla = "⪥";
  var glj = "⪤";
  var gnE = "≩";
  var gnap = "⪊";
  var gnapprox = "⪊";
  var gne = "⪈";
  var gneq = "⪈";
  var gneqq = "≩";
  var gnsim = "⋧";
  var gopf = "𝕘";
  var grave = "`";
  var gscr = "ℊ";
  var gsim = "≳";
  var gsime = "⪎";
  var gsiml = "⪐";
  var g = ">";
  var gt$1 = ">";
  var gtcc = "⪧";
  var gtcir = "⩺";
  var gtdot = "⋗";
  var gtlPar = "⦕";
  var gtquest = "⩼";
  var gtrapprox = "⪆";
  var gtrarr = "⥸";
  var gtrdot = "⋗";
  var gtreqless = "⋛";
  var gtreqqless = "⪌";
  var gtrless = "≷";
  var gtrsim = "≳";
  var gvertneqq = "≩︀";
  var gvnE = "≩︀";
  var hArr = "⇔";
  var hairsp = " ";
  var half = "½";
  var hamilt = "ℋ";
  var hardcy = "ъ";
  var harr = "↔";
  var harrcir = "⥈";
  var harrw = "↭";
  var hbar = "ℏ";
  var hcirc = "ĥ";
  var hearts = "♥";
  var heartsuit = "♥";
  var hellip = "…";
  var hercon = "⊹";
  var hfr = "𝔥";
  var hksearow = "⤥";
  var hkswarow = "⤦";
  var hoarr = "⇿";
  var homtht = "∻";
  var hookleftarrow = "↩";
  var hookrightarrow = "↪";
  var hopf = "𝕙";
  var horbar = "―";
  var hscr = "𝒽";
  var hslash = "ℏ";
  var hstrok = "ħ";
  var hybull = "⁃";
  var hyphen = "‐";
  var iacut = "í";
  var iacute$1 = "í";
  var ic = "⁣";
  var icir = "î";
  var icirc$1 = "î";
  var icy = "и";
  var iecy = "е";
  var iexc = "¡";
  var iexcl$1 = "¡";
  var iff = "⇔";
  var ifr = "𝔦";
  var igrav = "ì";
  var igrave$1 = "ì";
  var ii = "ⅈ";
  var iiiint = "⨌";
  var iiint = "∭";
  var iinfin = "⧜";
  var iiota = "℩";
  var ijlig = "ĳ";
  var imacr = "ī";
  var image = "ℑ";
  var imagline = "ℐ";
  var imagpart = "ℑ";
  var imath = "ı";
  var imof = "⊷";
  var imped = "Ƶ";
  var incare = "℅";
  var infin = "∞";
  var infintie = "⧝";
  var inodot = "ı";
  var int = "∫";
  var intcal = "⊺";
  var integers = "ℤ";
  var intercal = "⊺";
  var intlarhk = "⨗";
  var intprod = "⨼";
  var iocy = "ё";
  var iogon = "į";
  var iopf = "𝕚";
  var iota = "ι";
  var iprod = "⨼";
  var iques = "¿";
  var iquest$1 = "¿";
  var iscr = "𝒾";
  var isin = "∈";
  var isinE = "⋹";
  var isindot = "⋵";
  var isins = "⋴";
  var isinsv = "⋳";
  var isinv = "∈";
  var it = "⁢";
  var itilde = "ĩ";
  var iukcy = "і";
  var ium = "ï";
  var iuml$1 = "ï";
  var jcirc = "ĵ";
  var jcy = "й";
  var jfr = "𝔧";
  var jmath = "ȷ";
  var jopf = "𝕛";
  var jscr = "𝒿";
  var jsercy = "ј";
  var jukcy = "є";
  var kappa = "κ";
  var kappav = "ϰ";
  var kcedil = "ķ";
  var kcy = "к";
  var kfr = "𝔨";
  var kgreen = "ĸ";
  var khcy = "х";
  var kjcy = "ќ";
  var kopf = "𝕜";
  var kscr = "𝓀";
  var lAarr = "⇚";
  var lArr = "⇐";
  var lAtail = "⤛";
  var lBarr = "⤎";
  var lE = "≦";
  var lEg = "⪋";
  var lHar = "⥢";
  var lacute = "ĺ";
  var laemptyv = "⦴";
  var lagran = "ℒ";
  var lambda = "λ";
  var lang = "⟨";
  var langd = "⦑";
  var langle = "⟨";
  var lap = "⪅";
  var laqu = "«";
  var laquo$1 = "«";
  var larr = "←";
  var larrb = "⇤";
  var larrbfs = "⤟";
  var larrfs = "⤝";
  var larrhk = "↩";
  var larrlp = "↫";
  var larrpl = "⤹";
  var larrsim = "⥳";
  var larrtl = "↢";
  var lat = "⪫";
  var latail = "⤙";
  var late = "⪭";
  var lates = "⪭︀";
  var lbarr = "⤌";
  var lbbrk = "❲";
  var lbrace = "{";
  var lbrack = "[";
  var lbrke = "⦋";
  var lbrksld = "⦏";
  var lbrkslu = "⦍";
  var lcaron = "ľ";
  var lcedil = "ļ";
  var lceil = "⌈";
  var lcub = "{";
  var lcy = "л";
  var ldca = "⤶";
  var ldquo = "“";
  var ldquor = "„";
  var ldrdhar = "⥧";
  var ldrushar = "⥋";
  var ldsh = "↲";
  var le = "≤";
  var leftarrow = "←";
  var leftarrowtail = "↢";
  var leftharpoondown = "↽";
  var leftharpoonup = "↼";
  var leftleftarrows = "⇇";
  var leftrightarrow = "↔";
  var leftrightarrows = "⇆";
  var leftrightharpoons = "⇋";
  var leftrightsquigarrow = "↭";
  var leftthreetimes = "⋋";
  var leg = "⋚";
  var leq = "≤";
  var leqq = "≦";
  var leqslant = "⩽";
  var les = "⩽";
  var lescc = "⪨";
  var lesdot = "⩿";
  var lesdoto = "⪁";
  var lesdotor = "⪃";
  var lesg = "⋚︀";
  var lesges = "⪓";
  var lessapprox = "⪅";
  var lessdot = "⋖";
  var lesseqgtr = "⋚";
  var lesseqqgtr = "⪋";
  var lessgtr = "≶";
  var lesssim = "≲";
  var lfisht = "⥼";
  var lfloor = "⌊";
  var lfr = "𝔩";
  var lg = "≶";
  var lgE = "⪑";
  var lhard = "↽";
  var lharu = "↼";
  var lharul = "⥪";
  var lhblk = "▄";
  var ljcy = "љ";
  var ll = "≪";
  var llarr = "⇇";
  var llcorner = "⌞";
  var llhard = "⥫";
  var lltri = "◺";
  var lmidot = "ŀ";
  var lmoust = "⎰";
  var lmoustache = "⎰";
  var lnE = "≨";
  var lnap = "⪉";
  var lnapprox = "⪉";
  var lne = "⪇";
  var lneq = "⪇";
  var lneqq = "≨";
  var lnsim = "⋦";
  var loang = "⟬";
  var loarr = "⇽";
  var lobrk = "⟦";
  var longleftarrow = "⟵";
  var longleftrightarrow = "⟷";
  var longmapsto = "⟼";
  var longrightarrow = "⟶";
  var looparrowleft = "↫";
  var looparrowright = "↬";
  var lopar = "⦅";
  var lopf = "𝕝";
  var loplus = "⨭";
  var lotimes = "⨴";
  var lowast = "∗";
  var lowbar = "_";
  var loz = "◊";
  var lozenge = "◊";
  var lozf = "⧫";
  var lpar = "(";
  var lparlt = "⦓";
  var lrarr = "⇆";
  var lrcorner = "⌟";
  var lrhar = "⇋";
  var lrhard = "⥭";
  var lrm = "‎";
  var lrtri = "⊿";
  var lsaquo = "‹";
  var lscr = "𝓁";
  var lsh = "↰";
  var lsim = "≲";
  var lsime = "⪍";
  var lsimg = "⪏";
  var lsqb = "[";
  var lsquo = "‘";
  var lsquor = "‚";
  var lstrok = "ł";
  var l = "<";
  var lt$1 = "<";
  var ltcc = "⪦";
  var ltcir = "⩹";
  var ltdot = "⋖";
  var lthree = "⋋";
  var ltimes = "⋉";
  var ltlarr = "⥶";
  var ltquest = "⩻";
  var ltrPar = "⦖";
  var ltri = "◃";
  var ltrie = "⊴";
  var ltrif = "◂";
  var lurdshar = "⥊";
  var luruhar = "⥦";
  var lvertneqq = "≨︀";
  var lvnE = "≨︀";
  var mDDot = "∺";
  var mac = "¯";
  var macr$1 = "¯";
  var male = "♂";
  var malt = "✠";
  var maltese = "✠";
  var map = "↦";
  var mapsto = "↦";
  var mapstodown = "↧";
  var mapstoleft = "↤";
  var mapstoup = "↥";
  var marker = "▮";
  var mcomma = "⨩";
  var mcy = "м";
  var mdash = "—";
  var measuredangle = "∡";
  var mfr = "𝔪";
  var mho = "℧";
  var micr = "µ";
  var micro$1 = "µ";
  var mid = "∣";
  var midast = "*";
  var midcir = "⫰";
  var middo = "·";
  var middot$1 = "·";
  var minus = "−";
  var minusb = "⊟";
  var minusd = "∸";
  var minusdu = "⨪";
  var mlcp = "⫛";
  var mldr = "…";
  var mnplus = "∓";
  var models = "⊧";
  var mopf = "𝕞";
  var mp = "∓";
  var mscr = "𝓂";
  var mstpos = "∾";
  var mu = "μ";
  var multimap = "⊸";
  var mumap = "⊸";
  var nGg = "⋙̸";
  var nGt = "≫⃒";
  var nGtv = "≫̸";
  var nLeftarrow = "⇍";
  var nLeftrightarrow = "⇎";
  var nLl = "⋘̸";
  var nLt = "≪⃒";
  var nLtv = "≪̸";
  var nRightarrow = "⇏";
  var nVDash = "⊯";
  var nVdash = "⊮";
  var nabla = "∇";
  var nacute = "ń";
  var nang = "∠⃒";
  var nap = "≉";
  var napE = "⩰̸";
  var napid = "≋̸";
  var napos = "ŉ";
  var napprox = "≉";
  var natur = "♮";
  var natural = "♮";
  var naturals = "ℕ";
  var nbs = " ";
  var nbsp$1 = " ";
  var nbump = "≎̸";
  var nbumpe = "≏̸";
  var ncap = "⩃";
  var ncaron = "ň";
  var ncedil = "ņ";
  var ncong = "≇";
  var ncongdot = "⩭̸";
  var ncup = "⩂";
  var ncy = "н";
  var ndash = "–";
  var ne = "≠";
  var neArr = "⇗";
  var nearhk = "⤤";
  var nearr = "↗";
  var nearrow = "↗";
  var nedot = "≐̸";
  var nequiv = "≢";
  var nesear = "⤨";
  var nesim = "≂̸";
  var nexist = "∄";
  var nexists = "∄";
  var nfr = "𝔫";
  var ngE = "≧̸";
  var nge = "≱";
  var ngeq = "≱";
  var ngeqq = "≧̸";
  var ngeqslant = "⩾̸";
  var nges = "⩾̸";
  var ngsim = "≵";
  var ngt = "≯";
  var ngtr = "≯";
  var nhArr = "⇎";
  var nharr = "↮";
  var nhpar = "⫲";
  var ni = "∋";
  var nis = "⋼";
  var nisd = "⋺";
  var niv = "∋";
  var njcy = "њ";
  var nlArr = "⇍";
  var nlE = "≦̸";
  var nlarr = "↚";
  var nldr = "‥";
  var nle = "≰";
  var nleftarrow = "↚";
  var nleftrightarrow = "↮";
  var nleq = "≰";
  var nleqq = "≦̸";
  var nleqslant = "⩽̸";
  var nles = "⩽̸";
  var nless = "≮";
  var nlsim = "≴";
  var nlt = "≮";
  var nltri = "⋪";
  var nltrie = "⋬";
  var nmid = "∤";
  var nopf = "𝕟";
  var no = "¬";
  var not$1 = "¬";
  var notin = "∉";
  var notinE = "⋹̸";
  var notindot = "⋵̸";
  var notinva = "∉";
  var notinvb = "⋷";
  var notinvc = "⋶";
  var notni = "∌";
  var notniva = "∌";
  var notnivb = "⋾";
  var notnivc = "⋽";
  var npar = "∦";
  var nparallel = "∦";
  var nparsl = "⫽⃥";
  var npart = "∂̸";
  var npolint = "⨔";
  var npr = "⊀";
  var nprcue = "⋠";
  var npre = "⪯̸";
  var nprec = "⊀";
  var npreceq = "⪯̸";
  var nrArr = "⇏";
  var nrarr = "↛";
  var nrarrc = "⤳̸";
  var nrarrw = "↝̸";
  var nrightarrow = "↛";
  var nrtri = "⋫";
  var nrtrie = "⋭";
  var nsc = "⊁";
  var nsccue = "⋡";
  var nsce = "⪰̸";
  var nscr = "𝓃";
  var nshortmid = "∤";
  var nshortparallel = "∦";
  var nsim = "≁";
  var nsime = "≄";
  var nsimeq = "≄";
  var nsmid = "∤";
  var nspar = "∦";
  var nsqsube = "⋢";
  var nsqsupe = "⋣";
  var nsub = "⊄";
  var nsubE = "⫅̸";
  var nsube = "⊈";
  var nsubset = "⊂⃒";
  var nsubseteq = "⊈";
  var nsubseteqq = "⫅̸";
  var nsucc = "⊁";
  var nsucceq = "⪰̸";
  var nsup = "⊅";
  var nsupE = "⫆̸";
  var nsupe = "⊉";
  var nsupset = "⊃⃒";
  var nsupseteq = "⊉";
  var nsupseteqq = "⫆̸";
  var ntgl = "≹";
  var ntild = "ñ";
  var ntilde$1 = "ñ";
  var ntlg = "≸";
  var ntriangleleft = "⋪";
  var ntrianglelefteq = "⋬";
  var ntriangleright = "⋫";
  var ntrianglerighteq = "⋭";
  var nu = "ν";
  var num = "#";
  var numero = "№";
  var numsp = " ";
  var nvDash = "⊭";
  var nvHarr = "⤄";
  var nvap = "≍⃒";
  var nvdash = "⊬";
  var nvge = "≥⃒";
  var nvgt = ">⃒";
  var nvinfin = "⧞";
  var nvlArr = "⤂";
  var nvle = "≤⃒";
  var nvlt = "<⃒";
  var nvltrie = "⊴⃒";
  var nvrArr = "⤃";
  var nvrtrie = "⊵⃒";
  var nvsim = "∼⃒";
  var nwArr = "⇖";
  var nwarhk = "⤣";
  var nwarr = "↖";
  var nwarrow = "↖";
  var nwnear = "⤧";
  var oS = "Ⓢ";
  var oacut = "ó";
  var oacute$1 = "ó";
  var oast = "⊛";
  var ocir = "ô";
  var ocirc$1 = "ô";
  var ocy = "о";
  var odash = "⊝";
  var odblac = "ő";
  var odiv = "⨸";
  var odot = "⊙";
  var odsold = "⦼";
  var oelig = "œ";
  var ofcir = "⦿";
  var ofr = "𝔬";
  var ogon = "˛";
  var ograv = "ò";
  var ograve$1 = "ò";
  var ogt = "⧁";
  var ohbar = "⦵";
  var ohm = "Ω";
  var oint = "∮";
  var olarr = "↺";
  var olcir = "⦾";
  var olcross = "⦻";
  var oline = "‾";
  var olt = "⧀";
  var omacr = "ō";
  var omega = "ω";
  var omicron = "ο";
  var omid = "⦶";
  var ominus = "⊖";
  var oopf = "𝕠";
  var opar = "⦷";
  var operp = "⦹";
  var oplus = "⊕";
  var or = "∨";
  var orarr = "↻";
  var ord = "º";
  var order = "ℴ";
  var orderof = "ℴ";
  var ordf$1 = "ª";
  var ordm$1 = "º";
  var origof = "⊶";
  var oror = "⩖";
  var orslope = "⩗";
  var orv = "⩛";
  var oscr = "ℴ";
  var oslas = "ø";
  var oslash$1 = "ø";
  var osol = "⊘";
  var otild = "õ";
  var otilde$1 = "õ";
  var otimes = "⊗";
  var otimesas = "⨶";
  var oum = "ö";
  var ouml$1 = "ö";
  var ovbar = "⌽";
  var par = "¶";
  var para$1 = "¶";
  var parallel = "∥";
  var parsim = "⫳";
  var parsl = "⫽";
  var part = "∂";
  var pcy = "п";
  var percnt = "%";
  var period = ".";
  var permil = "‰";
  var perp = "⊥";
  var pertenk = "‱";
  var pfr = "𝔭";
  var phi = "φ";
  var phiv = "ϕ";
  var phmmat = "ℳ";
  var phone = "☎";
  var pi = "π";
  var pitchfork = "⋔";
  var piv = "ϖ";
  var planck = "ℏ";
  var planckh = "ℎ";
  var plankv = "ℏ";
  var plus = "+";
  var plusacir = "⨣";
  var plusb = "⊞";
  var pluscir = "⨢";
  var plusdo = "∔";
  var plusdu = "⨥";
  var pluse = "⩲";
  var plusm = "±";
  var plusmn$1 = "±";
  var plussim = "⨦";
  var plustwo = "⨧";
  var pm = "±";
  var pointint = "⨕";
  var popf = "𝕡";
  var poun = "£";
  var pound$1 = "£";
  var pr = "≺";
  var prE = "⪳";
  var prap = "⪷";
  var prcue = "≼";
  var pre = "⪯";
  var prec = "≺";
  var precapprox = "⪷";
  var preccurlyeq = "≼";
  var preceq = "⪯";
  var precnapprox = "⪹";
  var precneqq = "⪵";
  var precnsim = "⋨";
  var precsim = "≾";
  var prime = "′";
  var primes = "ℙ";
  var prnE = "⪵";
  var prnap = "⪹";
  var prnsim = "⋨";
  var prod = "∏";
  var profalar = "⌮";
  var profline = "⌒";
  var profsurf = "⌓";
  var prop = "∝";
  var propto = "∝";
  var prsim = "≾";
  var prurel = "⊰";
  var pscr = "𝓅";
  var psi = "ψ";
  var puncsp = " ";
  var qfr = "𝔮";
  var qint = "⨌";
  var qopf = "𝕢";
  var qprime = "⁗";
  var qscr = "𝓆";
  var quaternions = "ℍ";
  var quatint = "⨖";
  var quest = "?";
  var questeq = "≟";
  var quo = "\"";
  var quot$1 = "\"";
  var rAarr = "⇛";
  var rArr = "⇒";
  var rAtail = "⤜";
  var rBarr = "⤏";
  var rHar = "⥤";
  var race = "∽̱";
  var racute = "ŕ";
  var radic = "√";
  var raemptyv = "⦳";
  var rang = "⟩";
  var rangd = "⦒";
  var range = "⦥";
  var rangle = "⟩";
  var raqu = "»";
  var raquo$1 = "»";
  var rarr = "→";
  var rarrap = "⥵";
  var rarrb = "⇥";
  var rarrbfs = "⤠";
  var rarrc = "⤳";
  var rarrfs = "⤞";
  var rarrhk = "↪";
  var rarrlp = "↬";
  var rarrpl = "⥅";
  var rarrsim = "⥴";
  var rarrtl = "↣";
  var rarrw = "↝";
  var ratail = "⤚";
  var ratio = "∶";
  var rationals = "ℚ";
  var rbarr = "⤍";
  var rbbrk = "❳";
  var rbrace = "}";
  var rbrack = "]";
  var rbrke = "⦌";
  var rbrksld = "⦎";
  var rbrkslu = "⦐";
  var rcaron = "ř";
  var rcedil = "ŗ";
  var rceil = "⌉";
  var rcub = "}";
  var rcy = "р";
  var rdca = "⤷";
  var rdldhar = "⥩";
  var rdquo = "”";
  var rdquor = "”";
  var rdsh = "↳";
  var real = "ℜ";
  var realine = "ℛ";
  var realpart = "ℜ";
  var reals = "ℝ";
  var rect = "▭";
  var re = "®";
  var reg$1 = "®";
  var rfisht = "⥽";
  var rfloor = "⌋";
  var rfr = "𝔯";
  var rhard = "⇁";
  var rharu = "⇀";
  var rharul = "⥬";
  var rho = "ρ";
  var rhov = "ϱ";
  var rightarrow = "→";
  var rightarrowtail = "↣";
  var rightharpoondown = "⇁";
  var rightharpoonup = "⇀";
  var rightleftarrows = "⇄";
  var rightleftharpoons = "⇌";
  var rightrightarrows = "⇉";
  var rightsquigarrow = "↝";
  var rightthreetimes = "⋌";
  var ring = "˚";
  var risingdotseq = "≓";
  var rlarr = "⇄";
  var rlhar = "⇌";
  var rlm = "‏";
  var rmoust = "⎱";
  var rmoustache = "⎱";
  var rnmid = "⫮";
  var roang = "⟭";
  var roarr = "⇾";
  var robrk = "⟧";
  var ropar = "⦆";
  var ropf = "𝕣";
  var roplus = "⨮";
  var rotimes = "⨵";
  var rpar = ")";
  var rpargt = "⦔";
  var rppolint = "⨒";
  var rrarr = "⇉";
  var rsaquo = "›";
  var rscr = "𝓇";
  var rsh = "↱";
  var rsqb = "]";
  var rsquo = "’";
  var rsquor = "’";
  var rthree = "⋌";
  var rtimes = "⋊";
  var rtri = "▹";
  var rtrie = "⊵";
  var rtrif = "▸";
  var rtriltri = "⧎";
  var ruluhar = "⥨";
  var rx = "℞";
  var sacute = "ś";
  var sbquo = "‚";
  var sc = "≻";
  var scE = "⪴";
  var scap = "⪸";
  var scaron = "š";
  var sccue = "≽";
  var sce = "⪰";
  var scedil = "ş";
  var scirc = "ŝ";
  var scnE = "⪶";
  var scnap = "⪺";
  var scnsim = "⋩";
  var scpolint = "⨓";
  var scsim = "≿";
  var scy = "с";
  var sdot = "⋅";
  var sdotb = "⊡";
  var sdote = "⩦";
  var seArr = "⇘";
  var searhk = "⤥";
  var searr = "↘";
  var searrow = "↘";
  var sec = "§";
  var sect$1 = "§";
  var semi = ";";
  var seswar = "⤩";
  var setminus = "∖";
  var setmn = "∖";
  var sext = "✶";
  var sfr = "𝔰";
  var sfrown = "⌢";
  var sharp = "♯";
  var shchcy = "щ";
  var shcy = "ш";
  var shortmid = "∣";
  var shortparallel = "∥";
  var sh = "­";
  var shy$1 = "­";
  var sigma = "σ";
  var sigmaf = "ς";
  var sigmav = "ς";
  var sim = "∼";
  var simdot = "⩪";
  var sime = "≃";
  var simeq = "≃";
  var simg = "⪞";
  var simgE = "⪠";
  var siml = "⪝";
  var simlE = "⪟";
  var simne = "≆";
  var simplus = "⨤";
  var simrarr = "⥲";
  var slarr = "←";
  var smallsetminus = "∖";
  var smashp = "⨳";
  var smeparsl = "⧤";
  var smid = "∣";
  var smile = "⌣";
  var smt = "⪪";
  var smte = "⪬";
  var smtes = "⪬︀";
  var softcy = "ь";
  var sol = "/";
  var solb = "⧄";
  var solbar = "⌿";
  var sopf = "𝕤";
  var spades = "♠";
  var spadesuit = "♠";
  var spar = "∥";
  var sqcap = "⊓";
  var sqcaps = "⊓︀";
  var sqcup = "⊔";
  var sqcups = "⊔︀";
  var sqsub = "⊏";
  var sqsube = "⊑";
  var sqsubset = "⊏";
  var sqsubseteq = "⊑";
  var sqsup = "⊐";
  var sqsupe = "⊒";
  var sqsupset = "⊐";
  var sqsupseteq = "⊒";
  var squ = "□";
  var square = "□";
  var squarf = "▪";
  var squf = "▪";
  var srarr = "→";
  var sscr = "𝓈";
  var ssetmn = "∖";
  var ssmile = "⌣";
  var sstarf = "⋆";
  var star = "☆";
  var starf = "★";
  var straightepsilon = "ϵ";
  var straightphi = "ϕ";
  var strns = "¯";
  var sub = "⊂";
  var subE = "⫅";
  var subdot = "⪽";
  var sube = "⊆";
  var subedot = "⫃";
  var submult = "⫁";
  var subnE = "⫋";
  var subne = "⊊";
  var subplus = "⪿";
  var subrarr = "⥹";
  var subset = "⊂";
  var subseteq = "⊆";
  var subseteqq = "⫅";
  var subsetneq = "⊊";
  var subsetneqq = "⫋";
  var subsim = "⫇";
  var subsub = "⫕";
  var subsup = "⫓";
  var succ = "≻";
  var succapprox = "⪸";
  var succcurlyeq = "≽";
  var succeq = "⪰";
  var succnapprox = "⪺";
  var succneqq = "⪶";
  var succnsim = "⋩";
  var succsim = "≿";
  var sum = "∑";
  var sung = "♪";
  var sup = "⊃";
  var sup1$1 = "¹";
  var sup2$1 = "²";
  var sup3$1 = "³";
  var supE = "⫆";
  var supdot = "⪾";
  var supdsub = "⫘";
  var supe = "⊇";
  var supedot = "⫄";
  var suphsol = "⟉";
  var suphsub = "⫗";
  var suplarr = "⥻";
  var supmult = "⫂";
  var supnE = "⫌";
  var supne = "⊋";
  var supplus = "⫀";
  var supset = "⊃";
  var supseteq = "⊇";
  var supseteqq = "⫆";
  var supsetneq = "⊋";
  var supsetneqq = "⫌";
  var supsim = "⫈";
  var supsub = "⫔";
  var supsup = "⫖";
  var swArr = "⇙";
  var swarhk = "⤦";
  var swarr = "↙";
  var swarrow = "↙";
  var swnwar = "⤪";
  var szli = "ß";
  var szlig$1 = "ß";
  var target = "⌖";
  var tau = "τ";
  var tbrk = "⎴";
  var tcaron = "ť";
  var tcedil = "ţ";
  var tcy = "т";
  var tdot = "⃛";
  var telrec = "⌕";
  var tfr = "𝔱";
  var there4 = "∴";
  var therefore = "∴";
  var theta = "θ";
  var thetasym = "ϑ";
  var thetav = "ϑ";
  var thickapprox = "≈";
  var thicksim = "∼";
  var thinsp = " ";
  var thkap = "≈";
  var thksim = "∼";
  var thor = "þ";
  var thorn$1 = "þ";
  var tilde = "˜";
  var time = "×";
  var times$1 = "×";
  var timesb = "⊠";
  var timesbar = "⨱";
  var timesd = "⨰";
  var tint = "∭";
  var toea = "⤨";
  var top = "⊤";
  var topbot = "⌶";
  var topcir = "⫱";
  var topf = "𝕥";
  var topfork = "⫚";
  var tosa = "⤩";
  var tprime = "‴";
  var trade = "™";
  var triangle = "▵";
  var triangledown = "▿";
  var triangleleft = "◃";
  var trianglelefteq = "⊴";
  var triangleq = "≜";
  var triangleright = "▹";
  var trianglerighteq = "⊵";
  var tridot = "◬";
  var trie = "≜";
  var triminus = "⨺";
  var triplus = "⨹";
  var trisb = "⧍";
  var tritime = "⨻";
  var trpezium = "⏢";
  var tscr = "𝓉";
  var tscy = "ц";
  var tshcy = "ћ";
  var tstrok = "ŧ";
  var twixt = "≬";
  var twoheadleftarrow = "↞";
  var twoheadrightarrow = "↠";
  var uArr = "⇑";
  var uHar = "⥣";
  var uacut = "ú";
  var uacute$1 = "ú";
  var uarr = "↑";
  var ubrcy = "ў";
  var ubreve = "ŭ";
  var ucir = "û";
  var ucirc$1 = "û";
  var ucy = "у";
  var udarr = "⇅";
  var udblac = "ű";
  var udhar = "⥮";
  var ufisht = "⥾";
  var ufr = "𝔲";
  var ugrav = "ù";
  var ugrave$1 = "ù";
  var uharl = "↿";
  var uharr = "↾";
  var uhblk = "▀";
  var ulcorn = "⌜";
  var ulcorner = "⌜";
  var ulcrop = "⌏";
  var ultri = "◸";
  var umacr = "ū";
  var um = "¨";
  var uml$1 = "¨";
  var uogon = "ų";
  var uopf = "𝕦";
  var uparrow = "↑";
  var updownarrow = "↕";
  var upharpoonleft = "↿";
  var upharpoonright = "↾";
  var uplus = "⊎";
  var upsi = "υ";
  var upsih = "ϒ";
  var upsilon = "υ";
  var upuparrows = "⇈";
  var urcorn = "⌝";
  var urcorner = "⌝";
  var urcrop = "⌎";
  var uring = "ů";
  var urtri = "◹";
  var uscr = "𝓊";
  var utdot = "⋰";
  var utilde = "ũ";
  var utri = "▵";
  var utrif = "▴";
  var uuarr = "⇈";
  var uum = "ü";
  var uuml$1 = "ü";
  var uwangle = "⦧";
  var vArr = "⇕";
  var vBar = "⫨";
  var vBarv = "⫩";
  var vDash = "⊨";
  var vangrt = "⦜";
  var varepsilon = "ϵ";
  var varkappa = "ϰ";
  var varnothing = "∅";
  var varphi = "ϕ";
  var varpi = "ϖ";
  var varpropto = "∝";
  var varr = "↕";
  var varrho = "ϱ";
  var varsigma = "ς";
  var varsubsetneq = "⊊︀";
  var varsubsetneqq = "⫋︀";
  var varsupsetneq = "⊋︀";
  var varsupsetneqq = "⫌︀";
  var vartheta = "ϑ";
  var vartriangleleft = "⊲";
  var vartriangleright = "⊳";
  var vcy = "в";
  var vdash = "⊢";
  var vee = "∨";
  var veebar = "⊻";
  var veeeq = "≚";
  var vellip = "⋮";
  var verbar = "|";
  var vert = "|";
  var vfr = "𝔳";
  var vltri = "⊲";
  var vnsub = "⊂⃒";
  var vnsup = "⊃⃒";
  var vopf = "𝕧";
  var vprop = "∝";
  var vrtri = "⊳";
  var vscr = "𝓋";
  var vsubnE = "⫋︀";
  var vsubne = "⊊︀";
  var vsupnE = "⫌︀";
  var vsupne = "⊋︀";
  var vzigzag = "⦚";
  var wcirc = "ŵ";
  var wedbar = "⩟";
  var wedge = "∧";
  var wedgeq = "≙";
  var weierp = "℘";
  var wfr = "𝔴";
  var wopf = "𝕨";
  var wp = "℘";
  var wr = "≀";
  var wreath = "≀";
  var wscr = "𝓌";
  var xcap = "⋂";
  var xcirc = "◯";
  var xcup = "⋃";
  var xdtri = "▽";
  var xfr = "𝔵";
  var xhArr = "⟺";
  var xharr = "⟷";
  var xi = "ξ";
  var xlArr = "⟸";
  var xlarr = "⟵";
  var xmap = "⟼";
  var xnis = "⋻";
  var xodot = "⨀";
  var xopf = "𝕩";
  var xoplus = "⨁";
  var xotime = "⨂";
  var xrArr = "⟹";
  var xrarr = "⟶";
  var xscr = "𝓍";
  var xsqcup = "⨆";
  var xuplus = "⨄";
  var xutri = "△";
  var xvee = "⋁";
  var xwedge = "⋀";
  var yacut = "ý";
  var yacute$1 = "ý";
  var yacy = "я";
  var ycirc = "ŷ";
  var ycy = "ы";
  var ye = "¥";
  var yen$1 = "¥";
  var yfr = "𝔶";
  var yicy = "ї";
  var yopf = "𝕪";
  var yscr = "𝓎";
  var yucy = "ю";
  var yum = "ÿ";
  var yuml$1 = "ÿ";
  var zacute = "ź";
  var zcaron = "ž";
  var zcy = "з";
  var zdot = "ż";
  var zeetrf = "ℨ";
  var zeta = "ζ";
  var zfr = "𝔷";
  var zhcy = "ж";
  var zigrarr = "⇝";
  var zopf = "𝕫";
  var zscr = "𝓏";
  var zwj = "‍";
  var zwnj = "‌";
  var index$2 = {
  	AEli: AEli,
  	AElig: AElig$1,
  	AM: AM,
  	AMP: AMP$1,
  	Aacut: Aacut,
  	Aacute: Aacute$1,
  	Abreve: Abreve,
  	Acir: Acir,
  	Acirc: Acirc$1,
  	Acy: Acy,
  	Afr: Afr,
  	Agrav: Agrav,
  	Agrave: Agrave$1,
  	Alpha: Alpha,
  	Amacr: Amacr,
  	And: And,
  	Aogon: Aogon,
  	Aopf: Aopf,
  	ApplyFunction: ApplyFunction,
  	Arin: Arin,
  	Aring: Aring$1,
  	Ascr: Ascr,
  	Assign: Assign,
  	Atild: Atild,
  	Atilde: Atilde$1,
  	Aum: Aum,
  	Auml: Auml$1,
  	Backslash: Backslash,
  	Barv: Barv,
  	Barwed: Barwed,
  	Bcy: Bcy,
  	Because: Because,
  	Bernoullis: Bernoullis,
  	Beta: Beta,
  	Bfr: Bfr,
  	Bopf: Bopf,
  	Breve: Breve,
  	Bscr: Bscr,
  	Bumpeq: Bumpeq,
  	CHcy: CHcy,
  	COP: COP,
  	COPY: COPY$1,
  	Cacute: Cacute,
  	Cap: Cap,
  	CapitalDifferentialD: CapitalDifferentialD,
  	Cayleys: Cayleys,
  	Ccaron: Ccaron,
  	Ccedi: Ccedi,
  	Ccedil: Ccedil$1,
  	Ccirc: Ccirc,
  	Cconint: Cconint,
  	Cdot: Cdot,
  	Cedilla: Cedilla,
  	CenterDot: CenterDot,
  	Cfr: Cfr,
  	Chi: Chi,
  	CircleDot: CircleDot,
  	CircleMinus: CircleMinus,
  	CirclePlus: CirclePlus,
  	CircleTimes: CircleTimes,
  	ClockwiseContourIntegral: ClockwiseContourIntegral,
  	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
  	CloseCurlyQuote: CloseCurlyQuote,
  	Colon: Colon,
  	Colone: Colone,
  	Congruent: Congruent,
  	Conint: Conint,
  	ContourIntegral: ContourIntegral,
  	Copf: Copf,
  	Coproduct: Coproduct,
  	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
  	Cross: Cross,
  	Cscr: Cscr,
  	Cup: Cup,
  	CupCap: CupCap,
  	DD: DD,
  	DDotrahd: DDotrahd,
  	DJcy: DJcy,
  	DScy: DScy,
  	DZcy: DZcy,
  	Dagger: Dagger,
  	Darr: Darr,
  	Dashv: Dashv,
  	Dcaron: Dcaron,
  	Dcy: Dcy,
  	Del: Del,
  	Delta: Delta,
  	Dfr: Dfr,
  	DiacriticalAcute: DiacriticalAcute,
  	DiacriticalDot: DiacriticalDot,
  	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
  	DiacriticalGrave: DiacriticalGrave,
  	DiacriticalTilde: DiacriticalTilde,
  	Diamond: Diamond,
  	DifferentialD: DifferentialD,
  	Dopf: Dopf,
  	Dot: Dot,
  	DotDot: DotDot,
  	DotEqual: DotEqual,
  	DoubleContourIntegral: DoubleContourIntegral,
  	DoubleDot: DoubleDot,
  	DoubleDownArrow: DoubleDownArrow,
  	DoubleLeftArrow: DoubleLeftArrow,
  	DoubleLeftRightArrow: DoubleLeftRightArrow,
  	DoubleLeftTee: DoubleLeftTee,
  	DoubleLongLeftArrow: DoubleLongLeftArrow,
  	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
  	DoubleLongRightArrow: DoubleLongRightArrow,
  	DoubleRightArrow: DoubleRightArrow,
  	DoubleRightTee: DoubleRightTee,
  	DoubleUpArrow: DoubleUpArrow,
  	DoubleUpDownArrow: DoubleUpDownArrow,
  	DoubleVerticalBar: DoubleVerticalBar,
  	DownArrow: DownArrow,
  	DownArrowBar: DownArrowBar,
  	DownArrowUpArrow: DownArrowUpArrow,
  	DownBreve: DownBreve,
  	DownLeftRightVector: DownLeftRightVector,
  	DownLeftTeeVector: DownLeftTeeVector,
  	DownLeftVector: DownLeftVector,
  	DownLeftVectorBar: DownLeftVectorBar,
  	DownRightTeeVector: DownRightTeeVector,
  	DownRightVector: DownRightVector,
  	DownRightVectorBar: DownRightVectorBar,
  	DownTee: DownTee,
  	DownTeeArrow: DownTeeArrow,
  	Downarrow: Downarrow,
  	Dscr: Dscr,
  	Dstrok: Dstrok,
  	ENG: ENG,
  	ET: ET,
  	ETH: ETH$1,
  	Eacut: Eacut,
  	Eacute: Eacute$1,
  	Ecaron: Ecaron,
  	Ecir: Ecir,
  	Ecirc: Ecirc$1,
  	Ecy: Ecy,
  	Edot: Edot,
  	Efr: Efr,
  	Egrav: Egrav,
  	Egrave: Egrave$1,
  	Element: Element,
  	Emacr: Emacr,
  	EmptySmallSquare: EmptySmallSquare,
  	EmptyVerySmallSquare: EmptyVerySmallSquare,
  	Eogon: Eogon,
  	Eopf: Eopf,
  	Epsilon: Epsilon,
  	Equal: Equal,
  	EqualTilde: EqualTilde,
  	Equilibrium: Equilibrium,
  	Escr: Escr,
  	Esim: Esim,
  	Eta: Eta,
  	Eum: Eum,
  	Euml: Euml$1,
  	Exists: Exists,
  	ExponentialE: ExponentialE,
  	Fcy: Fcy,
  	Ffr: Ffr,
  	FilledSmallSquare: FilledSmallSquare,
  	FilledVerySmallSquare: FilledVerySmallSquare,
  	Fopf: Fopf,
  	ForAll: ForAll,
  	Fouriertrf: Fouriertrf,
  	Fscr: Fscr,
  	GJcy: GJcy,
  	G: G,
  	GT: GT$1,
  	Gamma: Gamma,
  	Gammad: Gammad,
  	Gbreve: Gbreve,
  	Gcedil: Gcedil,
  	Gcirc: Gcirc,
  	Gcy: Gcy,
  	Gdot: Gdot,
  	Gfr: Gfr,
  	Gg: Gg,
  	Gopf: Gopf,
  	GreaterEqual: GreaterEqual,
  	GreaterEqualLess: GreaterEqualLess,
  	GreaterFullEqual: GreaterFullEqual,
  	GreaterGreater: GreaterGreater,
  	GreaterLess: GreaterLess,
  	GreaterSlantEqual: GreaterSlantEqual,
  	GreaterTilde: GreaterTilde,
  	Gscr: Gscr,
  	Gt: Gt,
  	HARDcy: HARDcy,
  	Hacek: Hacek,
  	Hat: Hat,
  	Hcirc: Hcirc,
  	Hfr: Hfr,
  	HilbertSpace: HilbertSpace,
  	Hopf: Hopf,
  	HorizontalLine: HorizontalLine,
  	Hscr: Hscr,
  	Hstrok: Hstrok,
  	HumpDownHump: HumpDownHump,
  	HumpEqual: HumpEqual,
  	IEcy: IEcy,
  	IJlig: IJlig,
  	IOcy: IOcy,
  	Iacut: Iacut,
  	Iacute: Iacute$1,
  	Icir: Icir,
  	Icirc: Icirc$1,
  	Icy: Icy,
  	Idot: Idot,
  	Ifr: Ifr,
  	Igrav: Igrav,
  	Igrave: Igrave$1,
  	Im: Im,
  	Imacr: Imacr,
  	ImaginaryI: ImaginaryI,
  	Implies: Implies,
  	Int: Int,
  	Integral: Integral,
  	Intersection: Intersection,
  	InvisibleComma: InvisibleComma,
  	InvisibleTimes: InvisibleTimes,
  	Iogon: Iogon,
  	Iopf: Iopf,
  	Iota: Iota,
  	Iscr: Iscr,
  	Itilde: Itilde,
  	Iukcy: Iukcy,
  	Ium: Ium,
  	Iuml: Iuml$1,
  	Jcirc: Jcirc,
  	Jcy: Jcy,
  	Jfr: Jfr,
  	Jopf: Jopf,
  	Jscr: Jscr,
  	Jsercy: Jsercy,
  	Jukcy: Jukcy,
  	KHcy: KHcy,
  	KJcy: KJcy,
  	Kappa: Kappa,
  	Kcedil: Kcedil,
  	Kcy: Kcy,
  	Kfr: Kfr,
  	Kopf: Kopf,
  	Kscr: Kscr,
  	LJcy: LJcy,
  	L: L,
  	LT: LT$1,
  	Lacute: Lacute,
  	Lambda: Lambda,
  	Lang: Lang,
  	Laplacetrf: Laplacetrf,
  	Larr: Larr,
  	Lcaron: Lcaron,
  	Lcedil: Lcedil,
  	Lcy: Lcy,
  	LeftAngleBracket: LeftAngleBracket,
  	LeftArrow: LeftArrow,
  	LeftArrowBar: LeftArrowBar,
  	LeftArrowRightArrow: LeftArrowRightArrow,
  	LeftCeiling: LeftCeiling,
  	LeftDoubleBracket: LeftDoubleBracket,
  	LeftDownTeeVector: LeftDownTeeVector,
  	LeftDownVector: LeftDownVector,
  	LeftDownVectorBar: LeftDownVectorBar,
  	LeftFloor: LeftFloor,
  	LeftRightArrow: LeftRightArrow,
  	LeftRightVector: LeftRightVector,
  	LeftTee: LeftTee,
  	LeftTeeArrow: LeftTeeArrow,
  	LeftTeeVector: LeftTeeVector,
  	LeftTriangle: LeftTriangle,
  	LeftTriangleBar: LeftTriangleBar,
  	LeftTriangleEqual: LeftTriangleEqual,
  	LeftUpDownVector: LeftUpDownVector,
  	LeftUpTeeVector: LeftUpTeeVector,
  	LeftUpVector: LeftUpVector,
  	LeftUpVectorBar: LeftUpVectorBar,
  	LeftVector: LeftVector,
  	LeftVectorBar: LeftVectorBar,
  	Leftarrow: Leftarrow,
  	Leftrightarrow: Leftrightarrow,
  	LessEqualGreater: LessEqualGreater,
  	LessFullEqual: LessFullEqual,
  	LessGreater: LessGreater,
  	LessLess: LessLess,
  	LessSlantEqual: LessSlantEqual,
  	LessTilde: LessTilde,
  	Lfr: Lfr,
  	Ll: Ll,
  	Lleftarrow: Lleftarrow,
  	Lmidot: Lmidot,
  	LongLeftArrow: LongLeftArrow,
  	LongLeftRightArrow: LongLeftRightArrow,
  	LongRightArrow: LongRightArrow,
  	Longleftarrow: Longleftarrow,
  	Longleftrightarrow: Longleftrightarrow,
  	Longrightarrow: Longrightarrow,
  	Lopf: Lopf,
  	LowerLeftArrow: LowerLeftArrow,
  	LowerRightArrow: LowerRightArrow,
  	Lscr: Lscr,
  	Lsh: Lsh,
  	Lstrok: Lstrok,
  	Lt: Lt,
  	"Map": "⤅",
  	Mcy: Mcy,
  	MediumSpace: MediumSpace,
  	Mellintrf: Mellintrf,
  	Mfr: Mfr,
  	MinusPlus: MinusPlus,
  	Mopf: Mopf,
  	Mscr: Mscr,
  	Mu: Mu,
  	NJcy: NJcy,
  	Nacute: Nacute,
  	Ncaron: Ncaron,
  	Ncedil: Ncedil,
  	Ncy: Ncy,
  	NegativeMediumSpace: NegativeMediumSpace,
  	NegativeThickSpace: NegativeThickSpace,
  	NegativeThinSpace: NegativeThinSpace,
  	NegativeVeryThinSpace: NegativeVeryThinSpace,
  	NestedGreaterGreater: NestedGreaterGreater,
  	NestedLessLess: NestedLessLess,
  	NewLine: NewLine,
  	Nfr: Nfr,
  	NoBreak: NoBreak,
  	NonBreakingSpace: NonBreakingSpace,
  	Nopf: Nopf,
  	Not: Not,
  	NotCongruent: NotCongruent,
  	NotCupCap: NotCupCap,
  	NotDoubleVerticalBar: NotDoubleVerticalBar,
  	NotElement: NotElement,
  	NotEqual: NotEqual,
  	NotEqualTilde: NotEqualTilde,
  	NotExists: NotExists,
  	NotGreater: NotGreater,
  	NotGreaterEqual: NotGreaterEqual,
  	NotGreaterFullEqual: NotGreaterFullEqual,
  	NotGreaterGreater: NotGreaterGreater,
  	NotGreaterLess: NotGreaterLess,
  	NotGreaterSlantEqual: NotGreaterSlantEqual,
  	NotGreaterTilde: NotGreaterTilde,
  	NotHumpDownHump: NotHumpDownHump,
  	NotHumpEqual: NotHumpEqual,
  	NotLeftTriangle: NotLeftTriangle,
  	NotLeftTriangleBar: NotLeftTriangleBar,
  	NotLeftTriangleEqual: NotLeftTriangleEqual,
  	NotLess: NotLess,
  	NotLessEqual: NotLessEqual,
  	NotLessGreater: NotLessGreater,
  	NotLessLess: NotLessLess,
  	NotLessSlantEqual: NotLessSlantEqual,
  	NotLessTilde: NotLessTilde,
  	NotNestedGreaterGreater: NotNestedGreaterGreater,
  	NotNestedLessLess: NotNestedLessLess,
  	NotPrecedes: NotPrecedes,
  	NotPrecedesEqual: NotPrecedesEqual,
  	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
  	NotReverseElement: NotReverseElement,
  	NotRightTriangle: NotRightTriangle,
  	NotRightTriangleBar: NotRightTriangleBar,
  	NotRightTriangleEqual: NotRightTriangleEqual,
  	NotSquareSubset: NotSquareSubset,
  	NotSquareSubsetEqual: NotSquareSubsetEqual,
  	NotSquareSuperset: NotSquareSuperset,
  	NotSquareSupersetEqual: NotSquareSupersetEqual,
  	NotSubset: NotSubset,
  	NotSubsetEqual: NotSubsetEqual,
  	NotSucceeds: NotSucceeds,
  	NotSucceedsEqual: NotSucceedsEqual,
  	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
  	NotSucceedsTilde: NotSucceedsTilde,
  	NotSuperset: NotSuperset,
  	NotSupersetEqual: NotSupersetEqual,
  	NotTilde: NotTilde,
  	NotTildeEqual: NotTildeEqual,
  	NotTildeFullEqual: NotTildeFullEqual,
  	NotTildeTilde: NotTildeTilde,
  	NotVerticalBar: NotVerticalBar,
  	Nscr: Nscr,
  	Ntild: Ntild,
  	Ntilde: Ntilde$1,
  	Nu: Nu,
  	OElig: OElig,
  	Oacut: Oacut,
  	Oacute: Oacute$1,
  	Ocir: Ocir,
  	Ocirc: Ocirc$1,
  	Ocy: Ocy,
  	Odblac: Odblac,
  	Ofr: Ofr,
  	Ograv: Ograv,
  	Ograve: Ograve$1,
  	Omacr: Omacr,
  	Omega: Omega,
  	Omicron: Omicron,
  	Oopf: Oopf,
  	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
  	OpenCurlyQuote: OpenCurlyQuote,
  	Or: Or,
  	Oscr: Oscr,
  	Oslas: Oslas,
  	Oslash: Oslash$1,
  	Otild: Otild,
  	Otilde: Otilde$1,
  	Otimes: Otimes,
  	Oum: Oum,
  	Ouml: Ouml$1,
  	OverBar: OverBar,
  	OverBrace: OverBrace,
  	OverBracket: OverBracket,
  	OverParenthesis: OverParenthesis,
  	PartialD: PartialD,
  	Pcy: Pcy,
  	Pfr: Pfr,
  	Phi: Phi,
  	Pi: Pi,
  	PlusMinus: PlusMinus,
  	Poincareplane: Poincareplane,
  	Popf: Popf,
  	Pr: Pr,
  	Precedes: Precedes,
  	PrecedesEqual: PrecedesEqual,
  	PrecedesSlantEqual: PrecedesSlantEqual,
  	PrecedesTilde: PrecedesTilde,
  	Prime: Prime,
  	Product: Product,
  	Proportion: Proportion,
  	Proportional: Proportional,
  	Pscr: Pscr,
  	Psi: Psi,
  	QUO: QUO,
  	QUOT: QUOT$1,
  	Qfr: Qfr,
  	Qopf: Qopf,
  	Qscr: Qscr,
  	RBarr: RBarr,
  	RE: RE,
  	REG: REG$1,
  	Racute: Racute,
  	Rang: Rang,
  	Rarr: Rarr,
  	Rarrtl: Rarrtl,
  	Rcaron: Rcaron,
  	Rcedil: Rcedil,
  	Rcy: Rcy,
  	Re: Re,
  	ReverseElement: ReverseElement,
  	ReverseEquilibrium: ReverseEquilibrium,
  	ReverseUpEquilibrium: ReverseUpEquilibrium,
  	Rfr: Rfr,
  	Rho: Rho,
  	RightAngleBracket: RightAngleBracket,
  	RightArrow: RightArrow,
  	RightArrowBar: RightArrowBar,
  	RightArrowLeftArrow: RightArrowLeftArrow,
  	RightCeiling: RightCeiling,
  	RightDoubleBracket: RightDoubleBracket,
  	RightDownTeeVector: RightDownTeeVector,
  	RightDownVector: RightDownVector,
  	RightDownVectorBar: RightDownVectorBar,
  	RightFloor: RightFloor,
  	RightTee: RightTee,
  	RightTeeArrow: RightTeeArrow,
  	RightTeeVector: RightTeeVector,
  	RightTriangle: RightTriangle,
  	RightTriangleBar: RightTriangleBar,
  	RightTriangleEqual: RightTriangleEqual,
  	RightUpDownVector: RightUpDownVector,
  	RightUpTeeVector: RightUpTeeVector,
  	RightUpVector: RightUpVector,
  	RightUpVectorBar: RightUpVectorBar,
  	RightVector: RightVector,
  	RightVectorBar: RightVectorBar,
  	Rightarrow: Rightarrow,
  	Ropf: Ropf,
  	RoundImplies: RoundImplies,
  	Rrightarrow: Rrightarrow,
  	Rscr: Rscr,
  	Rsh: Rsh,
  	RuleDelayed: RuleDelayed,
  	SHCHcy: SHCHcy,
  	SHcy: SHcy,
  	SOFTcy: SOFTcy,
  	Sacute: Sacute,
  	Sc: Sc,
  	Scaron: Scaron,
  	Scedil: Scedil,
  	Scirc: Scirc,
  	Scy: Scy,
  	Sfr: Sfr,
  	ShortDownArrow: ShortDownArrow,
  	ShortLeftArrow: ShortLeftArrow,
  	ShortRightArrow: ShortRightArrow,
  	ShortUpArrow: ShortUpArrow,
  	Sigma: Sigma,
  	SmallCircle: SmallCircle,
  	Sopf: Sopf,
  	Sqrt: Sqrt,
  	Square: Square,
  	SquareIntersection: SquareIntersection,
  	SquareSubset: SquareSubset,
  	SquareSubsetEqual: SquareSubsetEqual,
  	SquareSuperset: SquareSuperset,
  	SquareSupersetEqual: SquareSupersetEqual,
  	SquareUnion: SquareUnion,
  	Sscr: Sscr,
  	Star: Star,
  	Sub: Sub,
  	Subset: Subset,
  	SubsetEqual: SubsetEqual,
  	Succeeds: Succeeds,
  	SucceedsEqual: SucceedsEqual,
  	SucceedsSlantEqual: SucceedsSlantEqual,
  	SucceedsTilde: SucceedsTilde,
  	SuchThat: SuchThat,
  	Sum: Sum,
  	Sup: Sup,
  	Superset: Superset,
  	SupersetEqual: SupersetEqual,
  	Supset: Supset,
  	THOR: THOR,
  	THORN: THORN$1,
  	TRADE: TRADE,
  	TSHcy: TSHcy,
  	TScy: TScy,
  	Tab: Tab,
  	Tau: Tau,
  	Tcaron: Tcaron,
  	Tcedil: Tcedil,
  	Tcy: Tcy,
  	Tfr: Tfr,
  	Therefore: Therefore,
  	Theta: Theta,
  	ThickSpace: ThickSpace,
  	ThinSpace: ThinSpace,
  	Tilde: Tilde,
  	TildeEqual: TildeEqual,
  	TildeFullEqual: TildeFullEqual,
  	TildeTilde: TildeTilde,
  	Topf: Topf,
  	TripleDot: TripleDot,
  	Tscr: Tscr,
  	Tstrok: Tstrok,
  	Uacut: Uacut,
  	Uacute: Uacute$1,
  	Uarr: Uarr,
  	Uarrocir: Uarrocir,
  	Ubrcy: Ubrcy,
  	Ubreve: Ubreve,
  	Ucir: Ucir,
  	Ucirc: Ucirc$1,
  	Ucy: Ucy,
  	Udblac: Udblac,
  	Ufr: Ufr,
  	Ugrav: Ugrav,
  	Ugrave: Ugrave$1,
  	Umacr: Umacr,
  	UnderBar: UnderBar,
  	UnderBrace: UnderBrace,
  	UnderBracket: UnderBracket,
  	UnderParenthesis: UnderParenthesis,
  	Union: Union,
  	UnionPlus: UnionPlus,
  	Uogon: Uogon,
  	Uopf: Uopf,
  	UpArrow: UpArrow,
  	UpArrowBar: UpArrowBar,
  	UpArrowDownArrow: UpArrowDownArrow,
  	UpDownArrow: UpDownArrow,
  	UpEquilibrium: UpEquilibrium,
  	UpTee: UpTee,
  	UpTeeArrow: UpTeeArrow,
  	Uparrow: Uparrow,
  	Updownarrow: Updownarrow,
  	UpperLeftArrow: UpperLeftArrow,
  	UpperRightArrow: UpperRightArrow,
  	Upsi: Upsi,
  	Upsilon: Upsilon,
  	Uring: Uring,
  	Uscr: Uscr,
  	Utilde: Utilde,
  	Uum: Uum,
  	Uuml: Uuml$1,
  	VDash: VDash,
  	Vbar: Vbar,
  	Vcy: Vcy,
  	Vdash: Vdash,
  	Vdashl: Vdashl,
  	Vee: Vee,
  	Verbar: Verbar,
  	Vert: Vert,
  	VerticalBar: VerticalBar,
  	VerticalLine: VerticalLine,
  	VerticalSeparator: VerticalSeparator,
  	VerticalTilde: VerticalTilde,
  	VeryThinSpace: VeryThinSpace,
  	Vfr: Vfr,
  	Vopf: Vopf,
  	Vscr: Vscr,
  	Vvdash: Vvdash,
  	Wcirc: Wcirc,
  	Wedge: Wedge,
  	Wfr: Wfr,
  	Wopf: Wopf,
  	Wscr: Wscr,
  	Xfr: Xfr,
  	Xi: Xi,
  	Xopf: Xopf,
  	Xscr: Xscr,
  	YAcy: YAcy,
  	YIcy: YIcy,
  	YUcy: YUcy,
  	Yacut: Yacut,
  	Yacute: Yacute$1,
  	Ycirc: Ycirc,
  	Ycy: Ycy,
  	Yfr: Yfr,
  	Yopf: Yopf,
  	Yscr: Yscr,
  	Yuml: Yuml,
  	ZHcy: ZHcy,
  	Zacute: Zacute,
  	Zcaron: Zcaron,
  	Zcy: Zcy,
  	Zdot: Zdot,
  	ZeroWidthSpace: ZeroWidthSpace,
  	Zeta: Zeta,
  	Zfr: Zfr,
  	Zopf: Zopf,
  	Zscr: Zscr,
  	aacut: aacut,
  	aacute: aacute$1,
  	abreve: abreve,
  	ac: ac,
  	acE: acE,
  	acd: acd,
  	acir: acir,
  	acirc: acirc$1,
  	acut: acut,
  	acute: acute$1,
  	acy: acy,
  	aeli: aeli,
  	aelig: aelig$1,
  	af: af,
  	afr: afr,
  	agrav: agrav,
  	agrave: agrave$1,
  	alefsym: alefsym,
  	aleph: aleph,
  	alpha: alpha,
  	amacr: amacr,
  	amalg: amalg,
  	am: am,
  	amp: amp$1,
  	and: and,
  	andand: andand,
  	andd: andd,
  	andslope: andslope,
  	andv: andv,
  	ang: ang,
  	ange: ange,
  	angle: angle,
  	angmsd: angmsd,
  	angmsdaa: angmsdaa,
  	angmsdab: angmsdab,
  	angmsdac: angmsdac,
  	angmsdad: angmsdad,
  	angmsdae: angmsdae,
  	angmsdaf: angmsdaf,
  	angmsdag: angmsdag,
  	angmsdah: angmsdah,
  	angrt: angrt,
  	angrtvb: angrtvb,
  	angrtvbd: angrtvbd,
  	angsph: angsph,
  	angst: angst,
  	angzarr: angzarr,
  	aogon: aogon,
  	aopf: aopf,
  	ap: ap,
  	apE: apE,
  	apacir: apacir,
  	ape: ape,
  	apid: apid,
  	apos: apos,
  	approx: approx,
  	approxeq: approxeq,
  	arin: arin,
  	aring: aring$1,
  	ascr: ascr,
  	ast: ast,
  	asymp: asymp,
  	asympeq: asympeq,
  	atild: atild,
  	atilde: atilde$1,
  	aum: aum,
  	auml: auml$1,
  	awconint: awconint,
  	awint: awint,
  	bNot: bNot,
  	backcong: backcong,
  	backepsilon: backepsilon,
  	backprime: backprime,
  	backsim: backsim,
  	backsimeq: backsimeq,
  	barvee: barvee,
  	barwed: barwed,
  	barwedge: barwedge,
  	bbrk: bbrk,
  	bbrktbrk: bbrktbrk,
  	bcong: bcong,
  	bcy: bcy,
  	bdquo: bdquo,
  	becaus: becaus,
  	because: because,
  	bemptyv: bemptyv,
  	bepsi: bepsi,
  	bernou: bernou,
  	beta: beta,
  	beth: beth,
  	between: between,
  	bfr: bfr,
  	bigcap: bigcap,
  	bigcirc: bigcirc,
  	bigcup: bigcup,
  	bigodot: bigodot,
  	bigoplus: bigoplus,
  	bigotimes: bigotimes,
  	bigsqcup: bigsqcup,
  	bigstar: bigstar,
  	bigtriangledown: bigtriangledown,
  	bigtriangleup: bigtriangleup,
  	biguplus: biguplus,
  	bigvee: bigvee,
  	bigwedge: bigwedge,
  	bkarow: bkarow,
  	blacklozenge: blacklozenge,
  	blacksquare: blacksquare,
  	blacktriangle: blacktriangle,
  	blacktriangledown: blacktriangledown,
  	blacktriangleleft: blacktriangleleft,
  	blacktriangleright: blacktriangleright,
  	blank: blank,
  	blk12: blk12,
  	blk14: blk14,
  	blk34: blk34,
  	block: block,
  	bne: bne,
  	bnequiv: bnequiv,
  	bnot: bnot,
  	bopf: bopf,
  	bot: bot,
  	bottom: bottom,
  	bowtie: bowtie,
  	boxDL: boxDL,
  	boxDR: boxDR,
  	boxDl: boxDl,
  	boxDr: boxDr,
  	boxH: boxH,
  	boxHD: boxHD,
  	boxHU: boxHU,
  	boxHd: boxHd,
  	boxHu: boxHu,
  	boxUL: boxUL,
  	boxUR: boxUR,
  	boxUl: boxUl,
  	boxUr: boxUr,
  	boxV: boxV,
  	boxVH: boxVH,
  	boxVL: boxVL,
  	boxVR: boxVR,
  	boxVh: boxVh,
  	boxVl: boxVl,
  	boxVr: boxVr,
  	boxbox: boxbox,
  	boxdL: boxdL,
  	boxdR: boxdR,
  	boxdl: boxdl,
  	boxdr: boxdr,
  	boxh: boxh,
  	boxhD: boxhD,
  	boxhU: boxhU,
  	boxhd: boxhd,
  	boxhu: boxhu,
  	boxminus: boxminus,
  	boxplus: boxplus,
  	boxtimes: boxtimes,
  	boxuL: boxuL,
  	boxuR: boxuR,
  	boxul: boxul,
  	boxur: boxur,
  	boxv: boxv,
  	boxvH: boxvH,
  	boxvL: boxvL,
  	boxvR: boxvR,
  	boxvh: boxvh,
  	boxvl: boxvl,
  	boxvr: boxvr,
  	bprime: bprime,
  	breve: breve,
  	brvba: brvba,
  	brvbar: brvbar$1,
  	bscr: bscr,
  	bsemi: bsemi,
  	bsim: bsim,
  	bsime: bsime,
  	bsol: bsol,
  	bsolb: bsolb,
  	bsolhsub: bsolhsub,
  	bull: bull,
  	bullet: bullet,
  	bump: bump,
  	bumpE: bumpE,
  	bumpe: bumpe,
  	bumpeq: bumpeq,
  	cacute: cacute,
  	cap: cap,
  	capand: capand,
  	capbrcup: capbrcup,
  	capcap: capcap,
  	capcup: capcup,
  	capdot: capdot,
  	caps: caps,
  	caret: caret,
  	caron: caron,
  	ccaps: ccaps,
  	ccaron: ccaron,
  	ccedi: ccedi,
  	ccedil: ccedil$1,
  	ccirc: ccirc,
  	ccups: ccups,
  	ccupssm: ccupssm,
  	cdot: cdot,
  	cedi: cedi,
  	cedil: cedil$1,
  	cemptyv: cemptyv,
  	cen: cen,
  	cent: cent$1,
  	centerdot: centerdot,
  	cfr: cfr,
  	chcy: chcy,
  	check: check,
  	checkmark: checkmark,
  	chi: chi,
  	cir: cir,
  	cirE: cirE,
  	circ: circ,
  	circeq: circeq,
  	circlearrowleft: circlearrowleft,
  	circlearrowright: circlearrowright,
  	circledR: circledR,
  	circledS: circledS,
  	circledast: circledast,
  	circledcirc: circledcirc,
  	circleddash: circleddash,
  	cire: cire,
  	cirfnint: cirfnint,
  	cirmid: cirmid,
  	cirscir: cirscir,
  	clubs: clubs,
  	clubsuit: clubsuit,
  	colon: colon,
  	colone: colone,
  	coloneq: coloneq,
  	comma: comma,
  	commat: commat,
  	comp: comp,
  	compfn: compfn,
  	complement: complement,
  	complexes: complexes,
  	cong: cong,
  	congdot: congdot,
  	conint: conint,
  	copf: copf,
  	coprod: coprod,
  	cop: cop,
  	copy: copy$1,
  	copysr: copysr,
  	crarr: crarr,
  	cross: cross,
  	cscr: cscr,
  	csub: csub,
  	csube: csube,
  	csup: csup,
  	csupe: csupe,
  	ctdot: ctdot,
  	cudarrl: cudarrl,
  	cudarrr: cudarrr,
  	cuepr: cuepr,
  	cuesc: cuesc,
  	cularr: cularr,
  	cularrp: cularrp,
  	cup: cup,
  	cupbrcap: cupbrcap,
  	cupcap: cupcap,
  	cupcup: cupcup,
  	cupdot: cupdot,
  	cupor: cupor,
  	cups: cups,
  	curarr: curarr,
  	curarrm: curarrm,
  	curlyeqprec: curlyeqprec,
  	curlyeqsucc: curlyeqsucc,
  	curlyvee: curlyvee,
  	curlywedge: curlywedge,
  	curre: curre,
  	curren: curren$1,
  	curvearrowleft: curvearrowleft,
  	curvearrowright: curvearrowright,
  	cuvee: cuvee,
  	cuwed: cuwed,
  	cwconint: cwconint,
  	cwint: cwint,
  	cylcty: cylcty,
  	dArr: dArr,
  	dHar: dHar,
  	dagger: dagger,
  	daleth: daleth,
  	darr: darr,
  	dash: dash,
  	dashv: dashv,
  	dbkarow: dbkarow,
  	dblac: dblac,
  	dcaron: dcaron,
  	dcy: dcy,
  	dd: dd,
  	ddagger: ddagger,
  	ddarr: ddarr,
  	ddotseq: ddotseq,
  	de: de,
  	deg: deg$1,
  	delta: delta,
  	demptyv: demptyv,
  	dfisht: dfisht,
  	dfr: dfr,
  	dharl: dharl,
  	dharr: dharr,
  	diam: diam,
  	diamond: diamond,
  	diamondsuit: diamondsuit,
  	diams: diams,
  	die: die,
  	digamma: digamma,
  	disin: disin,
  	div: div,
  	divid: divid,
  	divide: divide$1,
  	divideontimes: divideontimes,
  	divonx: divonx,
  	djcy: djcy,
  	dlcorn: dlcorn,
  	dlcrop: dlcrop,
  	dollar: dollar,
  	dopf: dopf,
  	dot: dot,
  	doteq: doteq,
  	doteqdot: doteqdot,
  	dotminus: dotminus,
  	dotplus: dotplus,
  	dotsquare: dotsquare,
  	doublebarwedge: doublebarwedge,
  	downarrow: downarrow,
  	downdownarrows: downdownarrows,
  	downharpoonleft: downharpoonleft,
  	downharpoonright: downharpoonright,
  	drbkarow: drbkarow,
  	drcorn: drcorn,
  	drcrop: drcrop,
  	dscr: dscr,
  	dscy: dscy,
  	dsol: dsol,
  	dstrok: dstrok,
  	dtdot: dtdot,
  	dtri: dtri,
  	dtrif: dtrif,
  	duarr: duarr,
  	duhar: duhar,
  	dwangle: dwangle,
  	dzcy: dzcy,
  	dzigrarr: dzigrarr,
  	eDDot: eDDot,
  	eDot: eDot,
  	eacut: eacut,
  	eacute: eacute$1,
  	easter: easter,
  	ecaron: ecaron,
  	ecir: ecir,
  	ecirc: ecirc$1,
  	ecolon: ecolon,
  	ecy: ecy,
  	edot: edot,
  	ee: ee,
  	efDot: efDot,
  	efr: efr,
  	eg: eg,
  	egrav: egrav,
  	egrave: egrave$1,
  	egs: egs,
  	egsdot: egsdot,
  	el: el,
  	elinters: elinters,
  	ell: ell,
  	els: els,
  	elsdot: elsdot,
  	emacr: emacr,
  	empty: empty,
  	emptyset: emptyset,
  	emptyv: emptyv,
  	emsp13: emsp13,
  	emsp14: emsp14,
  	emsp: emsp,
  	eng: eng,
  	ensp: ensp,
  	eogon: eogon,
  	eopf: eopf,
  	epar: epar,
  	eparsl: eparsl,
  	eplus: eplus,
  	epsi: epsi,
  	epsilon: epsilon,
  	epsiv: epsiv,
  	eqcirc: eqcirc,
  	eqcolon: eqcolon,
  	eqsim: eqsim,
  	eqslantgtr: eqslantgtr,
  	eqslantless: eqslantless,
  	equals: equals,
  	equest: equest,
  	equiv: equiv,
  	equivDD: equivDD,
  	eqvparsl: eqvparsl,
  	erDot: erDot,
  	erarr: erarr,
  	escr: escr,
  	esdot: esdot,
  	esim: esim,
  	eta: eta,
  	et: et,
  	eth: eth$1,
  	eum: eum,
  	euml: euml$1,
  	euro: euro,
  	excl: excl,
  	exist: exist,
  	expectation: expectation,
  	exponentiale: exponentiale,
  	fallingdotseq: fallingdotseq,
  	fcy: fcy,
  	female: female,
  	ffilig: ffilig,
  	fflig: fflig,
  	ffllig: ffllig,
  	ffr: ffr,
  	filig: filig,
  	fjlig: fjlig,
  	flat: flat,
  	fllig: fllig,
  	fltns: fltns,
  	fnof: fnof,
  	fopf: fopf,
  	forall: forall,
  	fork: fork,
  	forkv: forkv,
  	fpartint: fpartint,
  	frac1: frac1,
  	frac12: frac12$1,
  	frac13: frac13,
  	frac14: frac14$1,
  	frac15: frac15,
  	frac16: frac16,
  	frac18: frac18,
  	frac23: frac23,
  	frac25: frac25,
  	frac3: frac3,
  	frac34: frac34$1,
  	frac35: frac35,
  	frac38: frac38,
  	frac45: frac45,
  	frac56: frac56,
  	frac58: frac58,
  	frac78: frac78,
  	frasl: frasl,
  	frown: frown,
  	fscr: fscr,
  	gE: gE,
  	gEl: gEl,
  	gacute: gacute,
  	gamma: gamma,
  	gammad: gammad,
  	gap: gap,
  	gbreve: gbreve,
  	gcirc: gcirc,
  	gcy: gcy,
  	gdot: gdot,
  	ge: ge,
  	gel: gel,
  	geq: geq,
  	geqq: geqq,
  	geqslant: geqslant,
  	ges: ges,
  	gescc: gescc,
  	gesdot: gesdot,
  	gesdoto: gesdoto,
  	gesdotol: gesdotol,
  	gesl: gesl,
  	gesles: gesles,
  	gfr: gfr,
  	gg: gg,
  	ggg: ggg,
  	gimel: gimel,
  	gjcy: gjcy,
  	gl: gl,
  	glE: glE,
  	gla: gla,
  	glj: glj,
  	gnE: gnE,
  	gnap: gnap,
  	gnapprox: gnapprox,
  	gne: gne,
  	gneq: gneq,
  	gneqq: gneqq,
  	gnsim: gnsim,
  	gopf: gopf,
  	grave: grave,
  	gscr: gscr,
  	gsim: gsim,
  	gsime: gsime,
  	gsiml: gsiml,
  	g: g,
  	gt: gt$1,
  	gtcc: gtcc,
  	gtcir: gtcir,
  	gtdot: gtdot,
  	gtlPar: gtlPar,
  	gtquest: gtquest,
  	gtrapprox: gtrapprox,
  	gtrarr: gtrarr,
  	gtrdot: gtrdot,
  	gtreqless: gtreqless,
  	gtreqqless: gtreqqless,
  	gtrless: gtrless,
  	gtrsim: gtrsim,
  	gvertneqq: gvertneqq,
  	gvnE: gvnE,
  	hArr: hArr,
  	hairsp: hairsp,
  	half: half,
  	hamilt: hamilt,
  	hardcy: hardcy,
  	harr: harr,
  	harrcir: harrcir,
  	harrw: harrw,
  	hbar: hbar,
  	hcirc: hcirc,
  	hearts: hearts,
  	heartsuit: heartsuit,
  	hellip: hellip,
  	hercon: hercon,
  	hfr: hfr,
  	hksearow: hksearow,
  	hkswarow: hkswarow,
  	hoarr: hoarr,
  	homtht: homtht,
  	hookleftarrow: hookleftarrow,
  	hookrightarrow: hookrightarrow,
  	hopf: hopf,
  	horbar: horbar,
  	hscr: hscr,
  	hslash: hslash,
  	hstrok: hstrok,
  	hybull: hybull,
  	hyphen: hyphen,
  	iacut: iacut,
  	iacute: iacute$1,
  	ic: ic,
  	icir: icir,
  	icirc: icirc$1,
  	icy: icy,
  	iecy: iecy,
  	iexc: iexc,
  	iexcl: iexcl$1,
  	iff: iff,
  	ifr: ifr,
  	igrav: igrav,
  	igrave: igrave$1,
  	ii: ii,
  	iiiint: iiiint,
  	iiint: iiint,
  	iinfin: iinfin,
  	iiota: iiota,
  	ijlig: ijlig,
  	imacr: imacr,
  	image: image,
  	imagline: imagline,
  	imagpart: imagpart,
  	imath: imath,
  	imof: imof,
  	imped: imped,
  	"in": "∈",
  	incare: incare,
  	infin: infin,
  	infintie: infintie,
  	inodot: inodot,
  	int: int,
  	intcal: intcal,
  	integers: integers,
  	intercal: intercal,
  	intlarhk: intlarhk,
  	intprod: intprod,
  	iocy: iocy,
  	iogon: iogon,
  	iopf: iopf,
  	iota: iota,
  	iprod: iprod,
  	iques: iques,
  	iquest: iquest$1,
  	iscr: iscr,
  	isin: isin,
  	isinE: isinE,
  	isindot: isindot,
  	isins: isins,
  	isinsv: isinsv,
  	isinv: isinv,
  	it: it,
  	itilde: itilde,
  	iukcy: iukcy,
  	ium: ium,
  	iuml: iuml$1,
  	jcirc: jcirc,
  	jcy: jcy,
  	jfr: jfr,
  	jmath: jmath,
  	jopf: jopf,
  	jscr: jscr,
  	jsercy: jsercy,
  	jukcy: jukcy,
  	kappa: kappa,
  	kappav: kappav,
  	kcedil: kcedil,
  	kcy: kcy,
  	kfr: kfr,
  	kgreen: kgreen,
  	khcy: khcy,
  	kjcy: kjcy,
  	kopf: kopf,
  	kscr: kscr,
  	lAarr: lAarr,
  	lArr: lArr,
  	lAtail: lAtail,
  	lBarr: lBarr,
  	lE: lE,
  	lEg: lEg,
  	lHar: lHar,
  	lacute: lacute,
  	laemptyv: laemptyv,
  	lagran: lagran,
  	lambda: lambda,
  	lang: lang,
  	langd: langd,
  	langle: langle,
  	lap: lap,
  	laqu: laqu,
  	laquo: laquo$1,
  	larr: larr,
  	larrb: larrb,
  	larrbfs: larrbfs,
  	larrfs: larrfs,
  	larrhk: larrhk,
  	larrlp: larrlp,
  	larrpl: larrpl,
  	larrsim: larrsim,
  	larrtl: larrtl,
  	lat: lat,
  	latail: latail,
  	late: late,
  	lates: lates,
  	lbarr: lbarr,
  	lbbrk: lbbrk,
  	lbrace: lbrace,
  	lbrack: lbrack,
  	lbrke: lbrke,
  	lbrksld: lbrksld,
  	lbrkslu: lbrkslu,
  	lcaron: lcaron,
  	lcedil: lcedil,
  	lceil: lceil,
  	lcub: lcub,
  	lcy: lcy,
  	ldca: ldca,
  	ldquo: ldquo,
  	ldquor: ldquor,
  	ldrdhar: ldrdhar,
  	ldrushar: ldrushar,
  	ldsh: ldsh,
  	le: le,
  	leftarrow: leftarrow,
  	leftarrowtail: leftarrowtail,
  	leftharpoondown: leftharpoondown,
  	leftharpoonup: leftharpoonup,
  	leftleftarrows: leftleftarrows,
  	leftrightarrow: leftrightarrow,
  	leftrightarrows: leftrightarrows,
  	leftrightharpoons: leftrightharpoons,
  	leftrightsquigarrow: leftrightsquigarrow,
  	leftthreetimes: leftthreetimes,
  	leg: leg,
  	leq: leq,
  	leqq: leqq,
  	leqslant: leqslant,
  	les: les,
  	lescc: lescc,
  	lesdot: lesdot,
  	lesdoto: lesdoto,
  	lesdotor: lesdotor,
  	lesg: lesg,
  	lesges: lesges,
  	lessapprox: lessapprox,
  	lessdot: lessdot,
  	lesseqgtr: lesseqgtr,
  	lesseqqgtr: lesseqqgtr,
  	lessgtr: lessgtr,
  	lesssim: lesssim,
  	lfisht: lfisht,
  	lfloor: lfloor,
  	lfr: lfr,
  	lg: lg,
  	lgE: lgE,
  	lhard: lhard,
  	lharu: lharu,
  	lharul: lharul,
  	lhblk: lhblk,
  	ljcy: ljcy,
  	ll: ll,
  	llarr: llarr,
  	llcorner: llcorner,
  	llhard: llhard,
  	lltri: lltri,
  	lmidot: lmidot,
  	lmoust: lmoust,
  	lmoustache: lmoustache,
  	lnE: lnE,
  	lnap: lnap,
  	lnapprox: lnapprox,
  	lne: lne,
  	lneq: lneq,
  	lneqq: lneqq,
  	lnsim: lnsim,
  	loang: loang,
  	loarr: loarr,
  	lobrk: lobrk,
  	longleftarrow: longleftarrow,
  	longleftrightarrow: longleftrightarrow,
  	longmapsto: longmapsto,
  	longrightarrow: longrightarrow,
  	looparrowleft: looparrowleft,
  	looparrowright: looparrowright,
  	lopar: lopar,
  	lopf: lopf,
  	loplus: loplus,
  	lotimes: lotimes,
  	lowast: lowast,
  	lowbar: lowbar,
  	loz: loz,
  	lozenge: lozenge,
  	lozf: lozf,
  	lpar: lpar,
  	lparlt: lparlt,
  	lrarr: lrarr,
  	lrcorner: lrcorner,
  	lrhar: lrhar,
  	lrhard: lrhard,
  	lrm: lrm,
  	lrtri: lrtri,
  	lsaquo: lsaquo,
  	lscr: lscr,
  	lsh: lsh,
  	lsim: lsim,
  	lsime: lsime,
  	lsimg: lsimg,
  	lsqb: lsqb,
  	lsquo: lsquo,
  	lsquor: lsquor,
  	lstrok: lstrok,
  	l: l,
  	lt: lt$1,
  	ltcc: ltcc,
  	ltcir: ltcir,
  	ltdot: ltdot,
  	lthree: lthree,
  	ltimes: ltimes,
  	ltlarr: ltlarr,
  	ltquest: ltquest,
  	ltrPar: ltrPar,
  	ltri: ltri,
  	ltrie: ltrie,
  	ltrif: ltrif,
  	lurdshar: lurdshar,
  	luruhar: luruhar,
  	lvertneqq: lvertneqq,
  	lvnE: lvnE,
  	mDDot: mDDot,
  	mac: mac,
  	macr: macr$1,
  	male: male,
  	malt: malt,
  	maltese: maltese,
  	map: map,
  	mapsto: mapsto,
  	mapstodown: mapstodown,
  	mapstoleft: mapstoleft,
  	mapstoup: mapstoup,
  	marker: marker,
  	mcomma: mcomma,
  	mcy: mcy,
  	mdash: mdash,
  	measuredangle: measuredangle,
  	mfr: mfr,
  	mho: mho,
  	micr: micr,
  	micro: micro$1,
  	mid: mid,
  	midast: midast,
  	midcir: midcir,
  	middo: middo,
  	middot: middot$1,
  	minus: minus,
  	minusb: minusb,
  	minusd: minusd,
  	minusdu: minusdu,
  	mlcp: mlcp,
  	mldr: mldr,
  	mnplus: mnplus,
  	models: models,
  	mopf: mopf,
  	mp: mp,
  	mscr: mscr,
  	mstpos: mstpos,
  	mu: mu,
  	multimap: multimap,
  	mumap: mumap,
  	nGg: nGg,
  	nGt: nGt,
  	nGtv: nGtv,
  	nLeftarrow: nLeftarrow,
  	nLeftrightarrow: nLeftrightarrow,
  	nLl: nLl,
  	nLt: nLt,
  	nLtv: nLtv,
  	nRightarrow: nRightarrow,
  	nVDash: nVDash,
  	nVdash: nVdash,
  	nabla: nabla,
  	nacute: nacute,
  	nang: nang,
  	nap: nap,
  	napE: napE,
  	napid: napid,
  	napos: napos,
  	napprox: napprox,
  	natur: natur,
  	natural: natural,
  	naturals: naturals,
  	nbs: nbs,
  	nbsp: nbsp$1,
  	nbump: nbump,
  	nbumpe: nbumpe,
  	ncap: ncap,
  	ncaron: ncaron,
  	ncedil: ncedil,
  	ncong: ncong,
  	ncongdot: ncongdot,
  	ncup: ncup,
  	ncy: ncy,
  	ndash: ndash,
  	ne: ne,
  	neArr: neArr,
  	nearhk: nearhk,
  	nearr: nearr,
  	nearrow: nearrow,
  	nedot: nedot,
  	nequiv: nequiv,
  	nesear: nesear,
  	nesim: nesim,
  	nexist: nexist,
  	nexists: nexists,
  	nfr: nfr,
  	ngE: ngE,
  	nge: nge,
  	ngeq: ngeq,
  	ngeqq: ngeqq,
  	ngeqslant: ngeqslant,
  	nges: nges,
  	ngsim: ngsim,
  	ngt: ngt,
  	ngtr: ngtr,
  	nhArr: nhArr,
  	nharr: nharr,
  	nhpar: nhpar,
  	ni: ni,
  	nis: nis,
  	nisd: nisd,
  	niv: niv,
  	njcy: njcy,
  	nlArr: nlArr,
  	nlE: nlE,
  	nlarr: nlarr,
  	nldr: nldr,
  	nle: nle,
  	nleftarrow: nleftarrow,
  	nleftrightarrow: nleftrightarrow,
  	nleq: nleq,
  	nleqq: nleqq,
  	nleqslant: nleqslant,
  	nles: nles,
  	nless: nless,
  	nlsim: nlsim,
  	nlt: nlt,
  	nltri: nltri,
  	nltrie: nltrie,
  	nmid: nmid,
  	nopf: nopf,
  	no: no,
  	not: not$1,
  	notin: notin,
  	notinE: notinE,
  	notindot: notindot,
  	notinva: notinva,
  	notinvb: notinvb,
  	notinvc: notinvc,
  	notni: notni,
  	notniva: notniva,
  	notnivb: notnivb,
  	notnivc: notnivc,
  	npar: npar,
  	nparallel: nparallel,
  	nparsl: nparsl,
  	npart: npart,
  	npolint: npolint,
  	npr: npr,
  	nprcue: nprcue,
  	npre: npre,
  	nprec: nprec,
  	npreceq: npreceq,
  	nrArr: nrArr,
  	nrarr: nrarr,
  	nrarrc: nrarrc,
  	nrarrw: nrarrw,
  	nrightarrow: nrightarrow,
  	nrtri: nrtri,
  	nrtrie: nrtrie,
  	nsc: nsc,
  	nsccue: nsccue,
  	nsce: nsce,
  	nscr: nscr,
  	nshortmid: nshortmid,
  	nshortparallel: nshortparallel,
  	nsim: nsim,
  	nsime: nsime,
  	nsimeq: nsimeq,
  	nsmid: nsmid,
  	nspar: nspar,
  	nsqsube: nsqsube,
  	nsqsupe: nsqsupe,
  	nsub: nsub,
  	nsubE: nsubE,
  	nsube: nsube,
  	nsubset: nsubset,
  	nsubseteq: nsubseteq,
  	nsubseteqq: nsubseteqq,
  	nsucc: nsucc,
  	nsucceq: nsucceq,
  	nsup: nsup,
  	nsupE: nsupE,
  	nsupe: nsupe,
  	nsupset: nsupset,
  	nsupseteq: nsupseteq,
  	nsupseteqq: nsupseteqq,
  	ntgl: ntgl,
  	ntild: ntild,
  	ntilde: ntilde$1,
  	ntlg: ntlg,
  	ntriangleleft: ntriangleleft,
  	ntrianglelefteq: ntrianglelefteq,
  	ntriangleright: ntriangleright,
  	ntrianglerighteq: ntrianglerighteq,
  	nu: nu,
  	num: num,
  	numero: numero,
  	numsp: numsp,
  	nvDash: nvDash,
  	nvHarr: nvHarr,
  	nvap: nvap,
  	nvdash: nvdash,
  	nvge: nvge,
  	nvgt: nvgt,
  	nvinfin: nvinfin,
  	nvlArr: nvlArr,
  	nvle: nvle,
  	nvlt: nvlt,
  	nvltrie: nvltrie,
  	nvrArr: nvrArr,
  	nvrtrie: nvrtrie,
  	nvsim: nvsim,
  	nwArr: nwArr,
  	nwarhk: nwarhk,
  	nwarr: nwarr,
  	nwarrow: nwarrow,
  	nwnear: nwnear,
  	oS: oS,
  	oacut: oacut,
  	oacute: oacute$1,
  	oast: oast,
  	ocir: ocir,
  	ocirc: ocirc$1,
  	ocy: ocy,
  	odash: odash,
  	odblac: odblac,
  	odiv: odiv,
  	odot: odot,
  	odsold: odsold,
  	oelig: oelig,
  	ofcir: ofcir,
  	ofr: ofr,
  	ogon: ogon,
  	ograv: ograv,
  	ograve: ograve$1,
  	ogt: ogt,
  	ohbar: ohbar,
  	ohm: ohm,
  	oint: oint,
  	olarr: olarr,
  	olcir: olcir,
  	olcross: olcross,
  	oline: oline,
  	olt: olt,
  	omacr: omacr,
  	omega: omega,
  	omicron: omicron,
  	omid: omid,
  	ominus: ominus,
  	oopf: oopf,
  	opar: opar,
  	operp: operp,
  	oplus: oplus,
  	or: or,
  	orarr: orarr,
  	ord: ord,
  	order: order,
  	orderof: orderof,
  	ordf: ordf$1,
  	ordm: ordm$1,
  	origof: origof,
  	oror: oror,
  	orslope: orslope,
  	orv: orv,
  	oscr: oscr,
  	oslas: oslas,
  	oslash: oslash$1,
  	osol: osol,
  	otild: otild,
  	otilde: otilde$1,
  	otimes: otimes,
  	otimesas: otimesas,
  	oum: oum,
  	ouml: ouml$1,
  	ovbar: ovbar,
  	par: par,
  	para: para$1,
  	parallel: parallel,
  	parsim: parsim,
  	parsl: parsl,
  	part: part,
  	pcy: pcy,
  	percnt: percnt,
  	period: period,
  	permil: permil,
  	perp: perp,
  	pertenk: pertenk,
  	pfr: pfr,
  	phi: phi,
  	phiv: phiv,
  	phmmat: phmmat,
  	phone: phone,
  	pi: pi,
  	pitchfork: pitchfork,
  	piv: piv,
  	planck: planck,
  	planckh: planckh,
  	plankv: plankv,
  	plus: plus,
  	plusacir: plusacir,
  	plusb: plusb,
  	pluscir: pluscir,
  	plusdo: plusdo,
  	plusdu: plusdu,
  	pluse: pluse,
  	plusm: plusm,
  	plusmn: plusmn$1,
  	plussim: plussim,
  	plustwo: plustwo,
  	pm: pm,
  	pointint: pointint,
  	popf: popf,
  	poun: poun,
  	pound: pound$1,
  	pr: pr,
  	prE: prE,
  	prap: prap,
  	prcue: prcue,
  	pre: pre,
  	prec: prec,
  	precapprox: precapprox,
  	preccurlyeq: preccurlyeq,
  	preceq: preceq,
  	precnapprox: precnapprox,
  	precneqq: precneqq,
  	precnsim: precnsim,
  	precsim: precsim,
  	prime: prime,
  	primes: primes,
  	prnE: prnE,
  	prnap: prnap,
  	prnsim: prnsim,
  	prod: prod,
  	profalar: profalar,
  	profline: profline,
  	profsurf: profsurf,
  	prop: prop,
  	propto: propto,
  	prsim: prsim,
  	prurel: prurel,
  	pscr: pscr,
  	psi: psi,
  	puncsp: puncsp,
  	qfr: qfr,
  	qint: qint,
  	qopf: qopf,
  	qprime: qprime,
  	qscr: qscr,
  	quaternions: quaternions,
  	quatint: quatint,
  	quest: quest,
  	questeq: questeq,
  	quo: quo,
  	quot: quot$1,
  	rAarr: rAarr,
  	rArr: rArr,
  	rAtail: rAtail,
  	rBarr: rBarr,
  	rHar: rHar,
  	race: race,
  	racute: racute,
  	radic: radic,
  	raemptyv: raemptyv,
  	rang: rang,
  	rangd: rangd,
  	range: range,
  	rangle: rangle,
  	raqu: raqu,
  	raquo: raquo$1,
  	rarr: rarr,
  	rarrap: rarrap,
  	rarrb: rarrb,
  	rarrbfs: rarrbfs,
  	rarrc: rarrc,
  	rarrfs: rarrfs,
  	rarrhk: rarrhk,
  	rarrlp: rarrlp,
  	rarrpl: rarrpl,
  	rarrsim: rarrsim,
  	rarrtl: rarrtl,
  	rarrw: rarrw,
  	ratail: ratail,
  	ratio: ratio,
  	rationals: rationals,
  	rbarr: rbarr,
  	rbbrk: rbbrk,
  	rbrace: rbrace,
  	rbrack: rbrack,
  	rbrke: rbrke,
  	rbrksld: rbrksld,
  	rbrkslu: rbrkslu,
  	rcaron: rcaron,
  	rcedil: rcedil,
  	rceil: rceil,
  	rcub: rcub,
  	rcy: rcy,
  	rdca: rdca,
  	rdldhar: rdldhar,
  	rdquo: rdquo,
  	rdquor: rdquor,
  	rdsh: rdsh,
  	real: real,
  	realine: realine,
  	realpart: realpart,
  	reals: reals,
  	rect: rect,
  	re: re,
  	reg: reg$1,
  	rfisht: rfisht,
  	rfloor: rfloor,
  	rfr: rfr,
  	rhard: rhard,
  	rharu: rharu,
  	rharul: rharul,
  	rho: rho,
  	rhov: rhov,
  	rightarrow: rightarrow,
  	rightarrowtail: rightarrowtail,
  	rightharpoondown: rightharpoondown,
  	rightharpoonup: rightharpoonup,
  	rightleftarrows: rightleftarrows,
  	rightleftharpoons: rightleftharpoons,
  	rightrightarrows: rightrightarrows,
  	rightsquigarrow: rightsquigarrow,
  	rightthreetimes: rightthreetimes,
  	ring: ring,
  	risingdotseq: risingdotseq,
  	rlarr: rlarr,
  	rlhar: rlhar,
  	rlm: rlm,
  	rmoust: rmoust,
  	rmoustache: rmoustache,
  	rnmid: rnmid,
  	roang: roang,
  	roarr: roarr,
  	robrk: robrk,
  	ropar: ropar,
  	ropf: ropf,
  	roplus: roplus,
  	rotimes: rotimes,
  	rpar: rpar,
  	rpargt: rpargt,
  	rppolint: rppolint,
  	rrarr: rrarr,
  	rsaquo: rsaquo,
  	rscr: rscr,
  	rsh: rsh,
  	rsqb: rsqb,
  	rsquo: rsquo,
  	rsquor: rsquor,
  	rthree: rthree,
  	rtimes: rtimes,
  	rtri: rtri,
  	rtrie: rtrie,
  	rtrif: rtrif,
  	rtriltri: rtriltri,
  	ruluhar: ruluhar,
  	rx: rx,
  	sacute: sacute,
  	sbquo: sbquo,
  	sc: sc,
  	scE: scE,
  	scap: scap,
  	scaron: scaron,
  	sccue: sccue,
  	sce: sce,
  	scedil: scedil,
  	scirc: scirc,
  	scnE: scnE,
  	scnap: scnap,
  	scnsim: scnsim,
  	scpolint: scpolint,
  	scsim: scsim,
  	scy: scy,
  	sdot: sdot,
  	sdotb: sdotb,
  	sdote: sdote,
  	seArr: seArr,
  	searhk: searhk,
  	searr: searr,
  	searrow: searrow,
  	sec: sec,
  	sect: sect$1,
  	semi: semi,
  	seswar: seswar,
  	setminus: setminus,
  	setmn: setmn,
  	sext: sext,
  	sfr: sfr,
  	sfrown: sfrown,
  	sharp: sharp,
  	shchcy: shchcy,
  	shcy: shcy,
  	shortmid: shortmid,
  	shortparallel: shortparallel,
  	sh: sh,
  	shy: shy$1,
  	sigma: sigma,
  	sigmaf: sigmaf,
  	sigmav: sigmav,
  	sim: sim,
  	simdot: simdot,
  	sime: sime,
  	simeq: simeq,
  	simg: simg,
  	simgE: simgE,
  	siml: siml,
  	simlE: simlE,
  	simne: simne,
  	simplus: simplus,
  	simrarr: simrarr,
  	slarr: slarr,
  	smallsetminus: smallsetminus,
  	smashp: smashp,
  	smeparsl: smeparsl,
  	smid: smid,
  	smile: smile,
  	smt: smt,
  	smte: smte,
  	smtes: smtes,
  	softcy: softcy,
  	sol: sol,
  	solb: solb,
  	solbar: solbar,
  	sopf: sopf,
  	spades: spades,
  	spadesuit: spadesuit,
  	spar: spar,
  	sqcap: sqcap,
  	sqcaps: sqcaps,
  	sqcup: sqcup,
  	sqcups: sqcups,
  	sqsub: sqsub,
  	sqsube: sqsube,
  	sqsubset: sqsubset,
  	sqsubseteq: sqsubseteq,
  	sqsup: sqsup,
  	sqsupe: sqsupe,
  	sqsupset: sqsupset,
  	sqsupseteq: sqsupseteq,
  	squ: squ,
  	square: square,
  	squarf: squarf,
  	squf: squf,
  	srarr: srarr,
  	sscr: sscr,
  	ssetmn: ssetmn,
  	ssmile: ssmile,
  	sstarf: sstarf,
  	star: star,
  	starf: starf,
  	straightepsilon: straightepsilon,
  	straightphi: straightphi,
  	strns: strns,
  	sub: sub,
  	subE: subE,
  	subdot: subdot,
  	sube: sube,
  	subedot: subedot,
  	submult: submult,
  	subnE: subnE,
  	subne: subne,
  	subplus: subplus,
  	subrarr: subrarr,
  	subset: subset,
  	subseteq: subseteq,
  	subseteqq: subseteqq,
  	subsetneq: subsetneq,
  	subsetneqq: subsetneqq,
  	subsim: subsim,
  	subsub: subsub,
  	subsup: subsup,
  	succ: succ,
  	succapprox: succapprox,
  	succcurlyeq: succcurlyeq,
  	succeq: succeq,
  	succnapprox: succnapprox,
  	succneqq: succneqq,
  	succnsim: succnsim,
  	succsim: succsim,
  	sum: sum,
  	sung: sung,
  	sup: sup,
  	sup1: sup1$1,
  	sup2: sup2$1,
  	sup3: sup3$1,
  	supE: supE,
  	supdot: supdot,
  	supdsub: supdsub,
  	supe: supe,
  	supedot: supedot,
  	suphsol: suphsol,
  	suphsub: suphsub,
  	suplarr: suplarr,
  	supmult: supmult,
  	supnE: supnE,
  	supne: supne,
  	supplus: supplus,
  	supset: supset,
  	supseteq: supseteq,
  	supseteqq: supseteqq,
  	supsetneq: supsetneq,
  	supsetneqq: supsetneqq,
  	supsim: supsim,
  	supsub: supsub,
  	supsup: supsup,
  	swArr: swArr,
  	swarhk: swarhk,
  	swarr: swarr,
  	swarrow: swarrow,
  	swnwar: swnwar,
  	szli: szli,
  	szlig: szlig$1,
  	target: target,
  	tau: tau,
  	tbrk: tbrk,
  	tcaron: tcaron,
  	tcedil: tcedil,
  	tcy: tcy,
  	tdot: tdot,
  	telrec: telrec,
  	tfr: tfr,
  	there4: there4,
  	therefore: therefore,
  	theta: theta,
  	thetasym: thetasym,
  	thetav: thetav,
  	thickapprox: thickapprox,
  	thicksim: thicksim,
  	thinsp: thinsp,
  	thkap: thkap,
  	thksim: thksim,
  	thor: thor,
  	thorn: thorn$1,
  	tilde: tilde,
  	time: time,
  	times: times$1,
  	timesb: timesb,
  	timesbar: timesbar,
  	timesd: timesd,
  	tint: tint,
  	toea: toea,
  	top: top,
  	topbot: topbot,
  	topcir: topcir,
  	topf: topf,
  	topfork: topfork,
  	tosa: tosa,
  	tprime: tprime,
  	trade: trade,
  	triangle: triangle,
  	triangledown: triangledown,
  	triangleleft: triangleleft,
  	trianglelefteq: trianglelefteq,
  	triangleq: triangleq,
  	triangleright: triangleright,
  	trianglerighteq: trianglerighteq,
  	tridot: tridot,
  	trie: trie,
  	triminus: triminus,
  	triplus: triplus,
  	trisb: trisb,
  	tritime: tritime,
  	trpezium: trpezium,
  	tscr: tscr,
  	tscy: tscy,
  	tshcy: tshcy,
  	tstrok: tstrok,
  	twixt: twixt,
  	twoheadleftarrow: twoheadleftarrow,
  	twoheadrightarrow: twoheadrightarrow,
  	uArr: uArr,
  	uHar: uHar,
  	uacut: uacut,
  	uacute: uacute$1,
  	uarr: uarr,
  	ubrcy: ubrcy,
  	ubreve: ubreve,
  	ucir: ucir,
  	ucirc: ucirc$1,
  	ucy: ucy,
  	udarr: udarr,
  	udblac: udblac,
  	udhar: udhar,
  	ufisht: ufisht,
  	ufr: ufr,
  	ugrav: ugrav,
  	ugrave: ugrave$1,
  	uharl: uharl,
  	uharr: uharr,
  	uhblk: uhblk,
  	ulcorn: ulcorn,
  	ulcorner: ulcorner,
  	ulcrop: ulcrop,
  	ultri: ultri,
  	umacr: umacr,
  	um: um,
  	uml: uml$1,
  	uogon: uogon,
  	uopf: uopf,
  	uparrow: uparrow,
  	updownarrow: updownarrow,
  	upharpoonleft: upharpoonleft,
  	upharpoonright: upharpoonright,
  	uplus: uplus,
  	upsi: upsi,
  	upsih: upsih,
  	upsilon: upsilon,
  	upuparrows: upuparrows,
  	urcorn: urcorn,
  	urcorner: urcorner,
  	urcrop: urcrop,
  	uring: uring,
  	urtri: urtri,
  	uscr: uscr,
  	utdot: utdot,
  	utilde: utilde,
  	utri: utri,
  	utrif: utrif,
  	uuarr: uuarr,
  	uum: uum,
  	uuml: uuml$1,
  	uwangle: uwangle,
  	vArr: vArr,
  	vBar: vBar,
  	vBarv: vBarv,
  	vDash: vDash,
  	vangrt: vangrt,
  	varepsilon: varepsilon,
  	varkappa: varkappa,
  	varnothing: varnothing,
  	varphi: varphi,
  	varpi: varpi,
  	varpropto: varpropto,
  	varr: varr,
  	varrho: varrho,
  	varsigma: varsigma,
  	varsubsetneq: varsubsetneq,
  	varsubsetneqq: varsubsetneqq,
  	varsupsetneq: varsupsetneq,
  	varsupsetneqq: varsupsetneqq,
  	vartheta: vartheta,
  	vartriangleleft: vartriangleleft,
  	vartriangleright: vartriangleright,
  	vcy: vcy,
  	vdash: vdash,
  	vee: vee,
  	veebar: veebar,
  	veeeq: veeeq,
  	vellip: vellip,
  	verbar: verbar,
  	vert: vert,
  	vfr: vfr,
  	vltri: vltri,
  	vnsub: vnsub,
  	vnsup: vnsup,
  	vopf: vopf,
  	vprop: vprop,
  	vrtri: vrtri,
  	vscr: vscr,
  	vsubnE: vsubnE,
  	vsubne: vsubne,
  	vsupnE: vsupnE,
  	vsupne: vsupne,
  	vzigzag: vzigzag,
  	wcirc: wcirc,
  	wedbar: wedbar,
  	wedge: wedge,
  	wedgeq: wedgeq,
  	weierp: weierp,
  	wfr: wfr,
  	wopf: wopf,
  	wp: wp,
  	wr: wr,
  	wreath: wreath,
  	wscr: wscr,
  	xcap: xcap,
  	xcirc: xcirc,
  	xcup: xcup,
  	xdtri: xdtri,
  	xfr: xfr,
  	xhArr: xhArr,
  	xharr: xharr,
  	xi: xi,
  	xlArr: xlArr,
  	xlarr: xlarr,
  	xmap: xmap,
  	xnis: xnis,
  	xodot: xodot,
  	xopf: xopf,
  	xoplus: xoplus,
  	xotime: xotime,
  	xrArr: xrArr,
  	xrarr: xrarr,
  	xscr: xscr,
  	xsqcup: xsqcup,
  	xuplus: xuplus,
  	xutri: xutri,
  	xvee: xvee,
  	xwedge: xwedge,
  	yacut: yacut,
  	yacute: yacute$1,
  	yacy: yacy,
  	ycirc: ycirc,
  	ycy: ycy,
  	ye: ye,
  	yen: yen$1,
  	yfr: yfr,
  	yicy: yicy,
  	yopf: yopf,
  	yscr: yscr,
  	yucy: yucy,
  	yum: yum,
  	yuml: yuml$1,
  	zacute: zacute,
  	zcaron: zcaron,
  	zcy: zcy,
  	zdot: zdot,
  	zeetrf: zeetrf,
  	zeta: zeta,
  	zfr: zfr,
  	zhcy: zhcy,
  	zigrarr: zigrarr,
  	zopf: zopf,
  	zscr: zscr,
  	zwj: zwj,
  	zwnj: zwnj
  };

  var characterEntities = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AEli: AEli,
    AElig: AElig$1,
    AM: AM,
    AMP: AMP$1,
    Aacut: Aacut,
    Aacute: Aacute$1,
    Abreve: Abreve,
    Acir: Acir,
    Acirc: Acirc$1,
    Acy: Acy,
    Afr: Afr,
    Agrav: Agrav,
    Agrave: Agrave$1,
    Alpha: Alpha,
    Amacr: Amacr,
    And: And,
    Aogon: Aogon,
    Aopf: Aopf,
    ApplyFunction: ApplyFunction,
    Arin: Arin,
    Aring: Aring$1,
    Ascr: Ascr,
    Assign: Assign,
    Atild: Atild,
    Atilde: Atilde$1,
    Aum: Aum,
    Auml: Auml$1,
    Backslash: Backslash,
    Barv: Barv,
    Barwed: Barwed,
    Bcy: Bcy,
    Because: Because,
    Bernoullis: Bernoullis,
    Beta: Beta,
    Bfr: Bfr,
    Bopf: Bopf,
    Breve: Breve,
    Bscr: Bscr,
    Bumpeq: Bumpeq,
    CHcy: CHcy,
    COP: COP,
    COPY: COPY$1,
    Cacute: Cacute,
    Cap: Cap,
    CapitalDifferentialD: CapitalDifferentialD,
    Cayleys: Cayleys,
    Ccaron: Ccaron,
    Ccedi: Ccedi,
    Ccedil: Ccedil$1,
    Ccirc: Ccirc,
    Cconint: Cconint,
    Cdot: Cdot,
    Cedilla: Cedilla,
    CenterDot: CenterDot,
    Cfr: Cfr,
    Chi: Chi,
    CircleDot: CircleDot,
    CircleMinus: CircleMinus,
    CirclePlus: CirclePlus,
    CircleTimes: CircleTimes,
    ClockwiseContourIntegral: ClockwiseContourIntegral,
    CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
    CloseCurlyQuote: CloseCurlyQuote,
    Colon: Colon,
    Colone: Colone,
    Congruent: Congruent,
    Conint: Conint,
    ContourIntegral: ContourIntegral,
    Copf: Copf,
    Coproduct: Coproduct,
    CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
    Cross: Cross,
    Cscr: Cscr,
    Cup: Cup,
    CupCap: CupCap,
    DD: DD,
    DDotrahd: DDotrahd,
    DJcy: DJcy,
    DScy: DScy,
    DZcy: DZcy,
    Dagger: Dagger,
    Darr: Darr,
    Dashv: Dashv,
    Dcaron: Dcaron,
    Dcy: Dcy,
    Del: Del,
    Delta: Delta,
    Dfr: Dfr,
    DiacriticalAcute: DiacriticalAcute,
    DiacriticalDot: DiacriticalDot,
    DiacriticalDoubleAcute: DiacriticalDoubleAcute,
    DiacriticalGrave: DiacriticalGrave,
    DiacriticalTilde: DiacriticalTilde,
    Diamond: Diamond,
    DifferentialD: DifferentialD,
    Dopf: Dopf,
    Dot: Dot,
    DotDot: DotDot,
    DotEqual: DotEqual,
    DoubleContourIntegral: DoubleContourIntegral,
    DoubleDot: DoubleDot,
    DoubleDownArrow: DoubleDownArrow,
    DoubleLeftArrow: DoubleLeftArrow,
    DoubleLeftRightArrow: DoubleLeftRightArrow,
    DoubleLeftTee: DoubleLeftTee,
    DoubleLongLeftArrow: DoubleLongLeftArrow,
    DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
    DoubleLongRightArrow: DoubleLongRightArrow,
    DoubleRightArrow: DoubleRightArrow,
    DoubleRightTee: DoubleRightTee,
    DoubleUpArrow: DoubleUpArrow,
    DoubleUpDownArrow: DoubleUpDownArrow,
    DoubleVerticalBar: DoubleVerticalBar,
    DownArrow: DownArrow,
    DownArrowBar: DownArrowBar,
    DownArrowUpArrow: DownArrowUpArrow,
    DownBreve: DownBreve,
    DownLeftRightVector: DownLeftRightVector,
    DownLeftTeeVector: DownLeftTeeVector,
    DownLeftVector: DownLeftVector,
    DownLeftVectorBar: DownLeftVectorBar,
    DownRightTeeVector: DownRightTeeVector,
    DownRightVector: DownRightVector,
    DownRightVectorBar: DownRightVectorBar,
    DownTee: DownTee,
    DownTeeArrow: DownTeeArrow,
    Downarrow: Downarrow,
    Dscr: Dscr,
    Dstrok: Dstrok,
    ENG: ENG,
    ET: ET,
    ETH: ETH$1,
    Eacut: Eacut,
    Eacute: Eacute$1,
    Ecaron: Ecaron,
    Ecir: Ecir,
    Ecirc: Ecirc$1,
    Ecy: Ecy,
    Edot: Edot,
    Efr: Efr,
    Egrav: Egrav,
    Egrave: Egrave$1,
    Element: Element,
    Emacr: Emacr,
    EmptySmallSquare: EmptySmallSquare,
    EmptyVerySmallSquare: EmptyVerySmallSquare,
    Eogon: Eogon,
    Eopf: Eopf,
    Epsilon: Epsilon,
    Equal: Equal,
    EqualTilde: EqualTilde,
    Equilibrium: Equilibrium,
    Escr: Escr,
    Esim: Esim,
    Eta: Eta,
    Eum: Eum,
    Euml: Euml$1,
    Exists: Exists,
    ExponentialE: ExponentialE,
    Fcy: Fcy,
    Ffr: Ffr,
    FilledSmallSquare: FilledSmallSquare,
    FilledVerySmallSquare: FilledVerySmallSquare,
    Fopf: Fopf,
    ForAll: ForAll,
    Fouriertrf: Fouriertrf,
    Fscr: Fscr,
    GJcy: GJcy,
    G: G,
    GT: GT$1,
    Gamma: Gamma,
    Gammad: Gammad,
    Gbreve: Gbreve,
    Gcedil: Gcedil,
    Gcirc: Gcirc,
    Gcy: Gcy,
    Gdot: Gdot,
    Gfr: Gfr,
    Gg: Gg,
    Gopf: Gopf,
    GreaterEqual: GreaterEqual,
    GreaterEqualLess: GreaterEqualLess,
    GreaterFullEqual: GreaterFullEqual,
    GreaterGreater: GreaterGreater,
    GreaterLess: GreaterLess,
    GreaterSlantEqual: GreaterSlantEqual,
    GreaterTilde: GreaterTilde,
    Gscr: Gscr,
    Gt: Gt,
    HARDcy: HARDcy,
    Hacek: Hacek,
    Hat: Hat,
    Hcirc: Hcirc,
    Hfr: Hfr,
    HilbertSpace: HilbertSpace,
    Hopf: Hopf,
    HorizontalLine: HorizontalLine,
    Hscr: Hscr,
    Hstrok: Hstrok,
    HumpDownHump: HumpDownHump,
    HumpEqual: HumpEqual,
    IEcy: IEcy,
    IJlig: IJlig,
    IOcy: IOcy,
    Iacut: Iacut,
    Iacute: Iacute$1,
    Icir: Icir,
    Icirc: Icirc$1,
    Icy: Icy,
    Idot: Idot,
    Ifr: Ifr,
    Igrav: Igrav,
    Igrave: Igrave$1,
    Im: Im,
    Imacr: Imacr,
    ImaginaryI: ImaginaryI,
    Implies: Implies,
    Int: Int,
    Integral: Integral,
    Intersection: Intersection,
    InvisibleComma: InvisibleComma,
    InvisibleTimes: InvisibleTimes,
    Iogon: Iogon,
    Iopf: Iopf,
    Iota: Iota,
    Iscr: Iscr,
    Itilde: Itilde,
    Iukcy: Iukcy,
    Ium: Ium,
    Iuml: Iuml$1,
    Jcirc: Jcirc,
    Jcy: Jcy,
    Jfr: Jfr,
    Jopf: Jopf,
    Jscr: Jscr,
    Jsercy: Jsercy,
    Jukcy: Jukcy,
    KHcy: KHcy,
    KJcy: KJcy,
    Kappa: Kappa,
    Kcedil: Kcedil,
    Kcy: Kcy,
    Kfr: Kfr,
    Kopf: Kopf,
    Kscr: Kscr,
    LJcy: LJcy,
    L: L,
    LT: LT$1,
    Lacute: Lacute,
    Lambda: Lambda,
    Lang: Lang,
    Laplacetrf: Laplacetrf,
    Larr: Larr,
    Lcaron: Lcaron,
    Lcedil: Lcedil,
    Lcy: Lcy,
    LeftAngleBracket: LeftAngleBracket,
    LeftArrow: LeftArrow,
    LeftArrowBar: LeftArrowBar,
    LeftArrowRightArrow: LeftArrowRightArrow,
    LeftCeiling: LeftCeiling,
    LeftDoubleBracket: LeftDoubleBracket,
    LeftDownTeeVector: LeftDownTeeVector,
    LeftDownVector: LeftDownVector,
    LeftDownVectorBar: LeftDownVectorBar,
    LeftFloor: LeftFloor,
    LeftRightArrow: LeftRightArrow,
    LeftRightVector: LeftRightVector,
    LeftTee: LeftTee,
    LeftTeeArrow: LeftTeeArrow,
    LeftTeeVector: LeftTeeVector,
    LeftTriangle: LeftTriangle,
    LeftTriangleBar: LeftTriangleBar,
    LeftTriangleEqual: LeftTriangleEqual,
    LeftUpDownVector: LeftUpDownVector,
    LeftUpTeeVector: LeftUpTeeVector,
    LeftUpVector: LeftUpVector,
    LeftUpVectorBar: LeftUpVectorBar,
    LeftVector: LeftVector,
    LeftVectorBar: LeftVectorBar,
    Leftarrow: Leftarrow,
    Leftrightarrow: Leftrightarrow,
    LessEqualGreater: LessEqualGreater,
    LessFullEqual: LessFullEqual,
    LessGreater: LessGreater,
    LessLess: LessLess,
    LessSlantEqual: LessSlantEqual,
    LessTilde: LessTilde,
    Lfr: Lfr,
    Ll: Ll,
    Lleftarrow: Lleftarrow,
    Lmidot: Lmidot,
    LongLeftArrow: LongLeftArrow,
    LongLeftRightArrow: LongLeftRightArrow,
    LongRightArrow: LongRightArrow,
    Longleftarrow: Longleftarrow,
    Longleftrightarrow: Longleftrightarrow,
    Longrightarrow: Longrightarrow,
    Lopf: Lopf,
    LowerLeftArrow: LowerLeftArrow,
    LowerRightArrow: LowerRightArrow,
    Lscr: Lscr,
    Lsh: Lsh,
    Lstrok: Lstrok,
    Lt: Lt,
    Mcy: Mcy,
    MediumSpace: MediumSpace,
    Mellintrf: Mellintrf,
    Mfr: Mfr,
    MinusPlus: MinusPlus,
    Mopf: Mopf,
    Mscr: Mscr,
    Mu: Mu,
    NJcy: NJcy,
    Nacute: Nacute,
    Ncaron: Ncaron,
    Ncedil: Ncedil,
    Ncy: Ncy,
    NegativeMediumSpace: NegativeMediumSpace,
    NegativeThickSpace: NegativeThickSpace,
    NegativeThinSpace: NegativeThinSpace,
    NegativeVeryThinSpace: NegativeVeryThinSpace,
    NestedGreaterGreater: NestedGreaterGreater,
    NestedLessLess: NestedLessLess,
    NewLine: NewLine,
    Nfr: Nfr,
    NoBreak: NoBreak,
    NonBreakingSpace: NonBreakingSpace,
    Nopf: Nopf,
    Not: Not,
    NotCongruent: NotCongruent,
    NotCupCap: NotCupCap,
    NotDoubleVerticalBar: NotDoubleVerticalBar,
    NotElement: NotElement,
    NotEqual: NotEqual,
    NotEqualTilde: NotEqualTilde,
    NotExists: NotExists,
    NotGreater: NotGreater,
    NotGreaterEqual: NotGreaterEqual,
    NotGreaterFullEqual: NotGreaterFullEqual,
    NotGreaterGreater: NotGreaterGreater,
    NotGreaterLess: NotGreaterLess,
    NotGreaterSlantEqual: NotGreaterSlantEqual,
    NotGreaterTilde: NotGreaterTilde,
    NotHumpDownHump: NotHumpDownHump,
    NotHumpEqual: NotHumpEqual,
    NotLeftTriangle: NotLeftTriangle,
    NotLeftTriangleBar: NotLeftTriangleBar,
    NotLeftTriangleEqual: NotLeftTriangleEqual,
    NotLess: NotLess,
    NotLessEqual: NotLessEqual,
    NotLessGreater: NotLessGreater,
    NotLessLess: NotLessLess,
    NotLessSlantEqual: NotLessSlantEqual,
    NotLessTilde: NotLessTilde,
    NotNestedGreaterGreater: NotNestedGreaterGreater,
    NotNestedLessLess: NotNestedLessLess,
    NotPrecedes: NotPrecedes,
    NotPrecedesEqual: NotPrecedesEqual,
    NotPrecedesSlantEqual: NotPrecedesSlantEqual,
    NotReverseElement: NotReverseElement,
    NotRightTriangle: NotRightTriangle,
    NotRightTriangleBar: NotRightTriangleBar,
    NotRightTriangleEqual: NotRightTriangleEqual,
    NotSquareSubset: NotSquareSubset,
    NotSquareSubsetEqual: NotSquareSubsetEqual,
    NotSquareSuperset: NotSquareSuperset,
    NotSquareSupersetEqual: NotSquareSupersetEqual,
    NotSubset: NotSubset,
    NotSubsetEqual: NotSubsetEqual,
    NotSucceeds: NotSucceeds,
    NotSucceedsEqual: NotSucceedsEqual,
    NotSucceedsSlantEqual: NotSucceedsSlantEqual,
    NotSucceedsTilde: NotSucceedsTilde,
    NotSuperset: NotSuperset,
    NotSupersetEqual: NotSupersetEqual,
    NotTilde: NotTilde,
    NotTildeEqual: NotTildeEqual,
    NotTildeFullEqual: NotTildeFullEqual,
    NotTildeTilde: NotTildeTilde,
    NotVerticalBar: NotVerticalBar,
    Nscr: Nscr,
    Ntild: Ntild,
    Ntilde: Ntilde$1,
    Nu: Nu,
    OElig: OElig,
    Oacut: Oacut,
    Oacute: Oacute$1,
    Ocir: Ocir,
    Ocirc: Ocirc$1,
    Ocy: Ocy,
    Odblac: Odblac,
    Ofr: Ofr,
    Ograv: Ograv,
    Ograve: Ograve$1,
    Omacr: Omacr,
    Omega: Omega,
    Omicron: Omicron,
    Oopf: Oopf,
    OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
    OpenCurlyQuote: OpenCurlyQuote,
    Or: Or,
    Oscr: Oscr,
    Oslas: Oslas,
    Oslash: Oslash$1,
    Otild: Otild,
    Otilde: Otilde$1,
    Otimes: Otimes,
    Oum: Oum,
    Ouml: Ouml$1,
    OverBar: OverBar,
    OverBrace: OverBrace,
    OverBracket: OverBracket,
    OverParenthesis: OverParenthesis,
    PartialD: PartialD,
    Pcy: Pcy,
    Pfr: Pfr,
    Phi: Phi,
    Pi: Pi,
    PlusMinus: PlusMinus,
    Poincareplane: Poincareplane,
    Popf: Popf,
    Pr: Pr,
    Precedes: Precedes,
    PrecedesEqual: PrecedesEqual,
    PrecedesSlantEqual: PrecedesSlantEqual,
    PrecedesTilde: PrecedesTilde,
    Prime: Prime,
    Product: Product,
    Proportion: Proportion,
    Proportional: Proportional,
    Pscr: Pscr,
    Psi: Psi,
    QUO: QUO,
    QUOT: QUOT$1,
    Qfr: Qfr,
    Qopf: Qopf,
    Qscr: Qscr,
    RBarr: RBarr,
    RE: RE,
    REG: REG$1,
    Racute: Racute,
    Rang: Rang,
    Rarr: Rarr,
    Rarrtl: Rarrtl,
    Rcaron: Rcaron,
    Rcedil: Rcedil,
    Rcy: Rcy,
    Re: Re,
    ReverseElement: ReverseElement,
    ReverseEquilibrium: ReverseEquilibrium,
    ReverseUpEquilibrium: ReverseUpEquilibrium,
    Rfr: Rfr,
    Rho: Rho,
    RightAngleBracket: RightAngleBracket,
    RightArrow: RightArrow,
    RightArrowBar: RightArrowBar,
    RightArrowLeftArrow: RightArrowLeftArrow,
    RightCeiling: RightCeiling,
    RightDoubleBracket: RightDoubleBracket,
    RightDownTeeVector: RightDownTeeVector,
    RightDownVector: RightDownVector,
    RightDownVectorBar: RightDownVectorBar,
    RightFloor: RightFloor,
    RightTee: RightTee,
    RightTeeArrow: RightTeeArrow,
    RightTeeVector: RightTeeVector,
    RightTriangle: RightTriangle,
    RightTriangleBar: RightTriangleBar,
    RightTriangleEqual: RightTriangleEqual,
    RightUpDownVector: RightUpDownVector,
    RightUpTeeVector: RightUpTeeVector,
    RightUpVector: RightUpVector,
    RightUpVectorBar: RightUpVectorBar,
    RightVector: RightVector,
    RightVectorBar: RightVectorBar,
    Rightarrow: Rightarrow,
    Ropf: Ropf,
    RoundImplies: RoundImplies,
    Rrightarrow: Rrightarrow,
    Rscr: Rscr,
    Rsh: Rsh,
    RuleDelayed: RuleDelayed,
    SHCHcy: SHCHcy,
    SHcy: SHcy,
    SOFTcy: SOFTcy,
    Sacute: Sacute,
    Sc: Sc,
    Scaron: Scaron,
    Scedil: Scedil,
    Scirc: Scirc,
    Scy: Scy,
    Sfr: Sfr,
    ShortDownArrow: ShortDownArrow,
    ShortLeftArrow: ShortLeftArrow,
    ShortRightArrow: ShortRightArrow,
    ShortUpArrow: ShortUpArrow,
    Sigma: Sigma,
    SmallCircle: SmallCircle,
    Sopf: Sopf,
    Sqrt: Sqrt,
    Square: Square,
    SquareIntersection: SquareIntersection,
    SquareSubset: SquareSubset,
    SquareSubsetEqual: SquareSubsetEqual,
    SquareSuperset: SquareSuperset,
    SquareSupersetEqual: SquareSupersetEqual,
    SquareUnion: SquareUnion,
    Sscr: Sscr,
    Star: Star,
    Sub: Sub,
    Subset: Subset,
    SubsetEqual: SubsetEqual,
    Succeeds: Succeeds,
    SucceedsEqual: SucceedsEqual,
    SucceedsSlantEqual: SucceedsSlantEqual,
    SucceedsTilde: SucceedsTilde,
    SuchThat: SuchThat,
    Sum: Sum,
    Sup: Sup,
    Superset: Superset,
    SupersetEqual: SupersetEqual,
    Supset: Supset,
    THOR: THOR,
    THORN: THORN$1,
    TRADE: TRADE,
    TSHcy: TSHcy,
    TScy: TScy,
    Tab: Tab,
    Tau: Tau,
    Tcaron: Tcaron,
    Tcedil: Tcedil,
    Tcy: Tcy,
    Tfr: Tfr,
    Therefore: Therefore,
    Theta: Theta,
    ThickSpace: ThickSpace,
    ThinSpace: ThinSpace,
    Tilde: Tilde,
    TildeEqual: TildeEqual,
    TildeFullEqual: TildeFullEqual,
    TildeTilde: TildeTilde,
    Topf: Topf,
    TripleDot: TripleDot,
    Tscr: Tscr,
    Tstrok: Tstrok,
    Uacut: Uacut,
    Uacute: Uacute$1,
    Uarr: Uarr,
    Uarrocir: Uarrocir,
    Ubrcy: Ubrcy,
    Ubreve: Ubreve,
    Ucir: Ucir,
    Ucirc: Ucirc$1,
    Ucy: Ucy,
    Udblac: Udblac,
    Ufr: Ufr,
    Ugrav: Ugrav,
    Ugrave: Ugrave$1,
    Umacr: Umacr,
    UnderBar: UnderBar,
    UnderBrace: UnderBrace,
    UnderBracket: UnderBracket,
    UnderParenthesis: UnderParenthesis,
    Union: Union,
    UnionPlus: UnionPlus,
    Uogon: Uogon,
    Uopf: Uopf,
    UpArrow: UpArrow,
    UpArrowBar: UpArrowBar,
    UpArrowDownArrow: UpArrowDownArrow,
    UpDownArrow: UpDownArrow,
    UpEquilibrium: UpEquilibrium,
    UpTee: UpTee,
    UpTeeArrow: UpTeeArrow,
    Uparrow: Uparrow,
    Updownarrow: Updownarrow,
    UpperLeftArrow: UpperLeftArrow,
    UpperRightArrow: UpperRightArrow,
    Upsi: Upsi,
    Upsilon: Upsilon,
    Uring: Uring,
    Uscr: Uscr,
    Utilde: Utilde,
    Uum: Uum,
    Uuml: Uuml$1,
    VDash: VDash,
    Vbar: Vbar,
    Vcy: Vcy,
    Vdash: Vdash,
    Vdashl: Vdashl,
    Vee: Vee,
    Verbar: Verbar,
    Vert: Vert,
    VerticalBar: VerticalBar,
    VerticalLine: VerticalLine,
    VerticalSeparator: VerticalSeparator,
    VerticalTilde: VerticalTilde,
    VeryThinSpace: VeryThinSpace,
    Vfr: Vfr,
    Vopf: Vopf,
    Vscr: Vscr,
    Vvdash: Vvdash,
    Wcirc: Wcirc,
    Wedge: Wedge,
    Wfr: Wfr,
    Wopf: Wopf,
    Wscr: Wscr,
    Xfr: Xfr,
    Xi: Xi,
    Xopf: Xopf,
    Xscr: Xscr,
    YAcy: YAcy,
    YIcy: YIcy,
    YUcy: YUcy,
    Yacut: Yacut,
    Yacute: Yacute$1,
    Ycirc: Ycirc,
    Ycy: Ycy,
    Yfr: Yfr,
    Yopf: Yopf,
    Yscr: Yscr,
    Yuml: Yuml,
    ZHcy: ZHcy,
    Zacute: Zacute,
    Zcaron: Zcaron,
    Zcy: Zcy,
    Zdot: Zdot,
    ZeroWidthSpace: ZeroWidthSpace,
    Zeta: Zeta,
    Zfr: Zfr,
    Zopf: Zopf,
    Zscr: Zscr,
    aacut: aacut,
    aacute: aacute$1,
    abreve: abreve,
    ac: ac,
    acE: acE,
    acd: acd,
    acir: acir,
    acirc: acirc$1,
    acut: acut,
    acute: acute$1,
    acy: acy,
    aeli: aeli,
    aelig: aelig$1,
    af: af,
    afr: afr,
    agrav: agrav,
    agrave: agrave$1,
    alefsym: alefsym,
    aleph: aleph,
    alpha: alpha,
    amacr: amacr,
    amalg: amalg,
    am: am,
    amp: amp$1,
    and: and,
    andand: andand,
    andd: andd,
    andslope: andslope,
    andv: andv,
    ang: ang,
    ange: ange,
    angle: angle,
    angmsd: angmsd,
    angmsdaa: angmsdaa,
    angmsdab: angmsdab,
    angmsdac: angmsdac,
    angmsdad: angmsdad,
    angmsdae: angmsdae,
    angmsdaf: angmsdaf,
    angmsdag: angmsdag,
    angmsdah: angmsdah,
    angrt: angrt,
    angrtvb: angrtvb,
    angrtvbd: angrtvbd,
    angsph: angsph,
    angst: angst,
    angzarr: angzarr,
    aogon: aogon,
    aopf: aopf,
    ap: ap,
    apE: apE,
    apacir: apacir,
    ape: ape,
    apid: apid,
    apos: apos,
    approx: approx,
    approxeq: approxeq,
    arin: arin,
    aring: aring$1,
    ascr: ascr,
    ast: ast,
    asymp: asymp,
    asympeq: asympeq,
    atild: atild,
    atilde: atilde$1,
    aum: aum,
    auml: auml$1,
    awconint: awconint,
    awint: awint,
    bNot: bNot,
    backcong: backcong,
    backepsilon: backepsilon,
    backprime: backprime,
    backsim: backsim,
    backsimeq: backsimeq,
    barvee: barvee,
    barwed: barwed,
    barwedge: barwedge,
    bbrk: bbrk,
    bbrktbrk: bbrktbrk,
    bcong: bcong,
    bcy: bcy,
    bdquo: bdquo,
    becaus: becaus,
    because: because,
    bemptyv: bemptyv,
    bepsi: bepsi,
    bernou: bernou,
    beta: beta,
    beth: beth,
    between: between,
    bfr: bfr,
    bigcap: bigcap,
    bigcirc: bigcirc,
    bigcup: bigcup,
    bigodot: bigodot,
    bigoplus: bigoplus,
    bigotimes: bigotimes,
    bigsqcup: bigsqcup,
    bigstar: bigstar,
    bigtriangledown: bigtriangledown,
    bigtriangleup: bigtriangleup,
    biguplus: biguplus,
    bigvee: bigvee,
    bigwedge: bigwedge,
    bkarow: bkarow,
    blacklozenge: blacklozenge,
    blacksquare: blacksquare,
    blacktriangle: blacktriangle,
    blacktriangledown: blacktriangledown,
    blacktriangleleft: blacktriangleleft,
    blacktriangleright: blacktriangleright,
    blank: blank,
    blk12: blk12,
    blk14: blk14,
    blk34: blk34,
    block: block,
    bne: bne,
    bnequiv: bnequiv,
    bnot: bnot,
    bopf: bopf,
    bot: bot,
    bottom: bottom,
    bowtie: bowtie,
    boxDL: boxDL,
    boxDR: boxDR,
    boxDl: boxDl,
    boxDr: boxDr,
    boxH: boxH,
    boxHD: boxHD,
    boxHU: boxHU,
    boxHd: boxHd,
    boxHu: boxHu,
    boxUL: boxUL,
    boxUR: boxUR,
    boxUl: boxUl,
    boxUr: boxUr,
    boxV: boxV,
    boxVH: boxVH,
    boxVL: boxVL,
    boxVR: boxVR,
    boxVh: boxVh,
    boxVl: boxVl,
    boxVr: boxVr,
    boxbox: boxbox,
    boxdL: boxdL,
    boxdR: boxdR,
    boxdl: boxdl,
    boxdr: boxdr,
    boxh: boxh,
    boxhD: boxhD,
    boxhU: boxhU,
    boxhd: boxhd,
    boxhu: boxhu,
    boxminus: boxminus,
    boxplus: boxplus,
    boxtimes: boxtimes,
    boxuL: boxuL,
    boxuR: boxuR,
    boxul: boxul,
    boxur: boxur,
    boxv: boxv,
    boxvH: boxvH,
    boxvL: boxvL,
    boxvR: boxvR,
    boxvh: boxvh,
    boxvl: boxvl,
    boxvr: boxvr,
    bprime: bprime,
    breve: breve,
    brvba: brvba,
    brvbar: brvbar$1,
    bscr: bscr,
    bsemi: bsemi,
    bsim: bsim,
    bsime: bsime,
    bsol: bsol,
    bsolb: bsolb,
    bsolhsub: bsolhsub,
    bull: bull,
    bullet: bullet,
    bump: bump,
    bumpE: bumpE,
    bumpe: bumpe,
    bumpeq: bumpeq,
    cacute: cacute,
    cap: cap,
    capand: capand,
    capbrcup: capbrcup,
    capcap: capcap,
    capcup: capcup,
    capdot: capdot,
    caps: caps,
    caret: caret,
    caron: caron,
    ccaps: ccaps,
    ccaron: ccaron,
    ccedi: ccedi,
    ccedil: ccedil$1,
    ccirc: ccirc,
    ccups: ccups,
    ccupssm: ccupssm,
    cdot: cdot,
    cedi: cedi,
    cedil: cedil$1,
    cemptyv: cemptyv,
    cen: cen,
    cent: cent$1,
    centerdot: centerdot,
    cfr: cfr,
    chcy: chcy,
    check: check,
    checkmark: checkmark,
    chi: chi,
    cir: cir,
    cirE: cirE,
    circ: circ,
    circeq: circeq,
    circlearrowleft: circlearrowleft,
    circlearrowright: circlearrowright,
    circledR: circledR,
    circledS: circledS,
    circledast: circledast,
    circledcirc: circledcirc,
    circleddash: circleddash,
    cire: cire,
    cirfnint: cirfnint,
    cirmid: cirmid,
    cirscir: cirscir,
    clubs: clubs,
    clubsuit: clubsuit,
    colon: colon,
    colone: colone,
    coloneq: coloneq,
    comma: comma,
    commat: commat,
    comp: comp,
    compfn: compfn,
    complement: complement,
    complexes: complexes,
    cong: cong,
    congdot: congdot,
    conint: conint,
    copf: copf,
    coprod: coprod,
    cop: cop,
    copy: copy$1,
    copysr: copysr,
    crarr: crarr,
    cross: cross,
    cscr: cscr,
    csub: csub,
    csube: csube,
    csup: csup,
    csupe: csupe,
    ctdot: ctdot,
    cudarrl: cudarrl,
    cudarrr: cudarrr,
    cuepr: cuepr,
    cuesc: cuesc,
    cularr: cularr,
    cularrp: cularrp,
    cup: cup,
    cupbrcap: cupbrcap,
    cupcap: cupcap,
    cupcup: cupcup,
    cupdot: cupdot,
    cupor: cupor,
    cups: cups,
    curarr: curarr,
    curarrm: curarrm,
    curlyeqprec: curlyeqprec,
    curlyeqsucc: curlyeqsucc,
    curlyvee: curlyvee,
    curlywedge: curlywedge,
    curre: curre,
    curren: curren$1,
    curvearrowleft: curvearrowleft,
    curvearrowright: curvearrowright,
    cuvee: cuvee,
    cuwed: cuwed,
    cwconint: cwconint,
    cwint: cwint,
    cylcty: cylcty,
    dArr: dArr,
    dHar: dHar,
    dagger: dagger,
    daleth: daleth,
    darr: darr,
    dash: dash,
    dashv: dashv,
    dbkarow: dbkarow,
    dblac: dblac,
    dcaron: dcaron,
    dcy: dcy,
    dd: dd,
    ddagger: ddagger,
    ddarr: ddarr,
    ddotseq: ddotseq,
    de: de,
    deg: deg$1,
    delta: delta,
    demptyv: demptyv,
    dfisht: dfisht,
    dfr: dfr,
    dharl: dharl,
    dharr: dharr,
    diam: diam,
    diamond: diamond,
    diamondsuit: diamondsuit,
    diams: diams,
    die: die,
    digamma: digamma,
    disin: disin,
    div: div,
    divid: divid,
    divide: divide$1,
    divideontimes: divideontimes,
    divonx: divonx,
    djcy: djcy,
    dlcorn: dlcorn,
    dlcrop: dlcrop,
    dollar: dollar,
    dopf: dopf,
    dot: dot,
    doteq: doteq,
    doteqdot: doteqdot,
    dotminus: dotminus,
    dotplus: dotplus,
    dotsquare: dotsquare,
    doublebarwedge: doublebarwedge,
    downarrow: downarrow,
    downdownarrows: downdownarrows,
    downharpoonleft: downharpoonleft,
    downharpoonright: downharpoonright,
    drbkarow: drbkarow,
    drcorn: drcorn,
    drcrop: drcrop,
    dscr: dscr,
    dscy: dscy,
    dsol: dsol,
    dstrok: dstrok,
    dtdot: dtdot,
    dtri: dtri,
    dtrif: dtrif,
    duarr: duarr,
    duhar: duhar,
    dwangle: dwangle,
    dzcy: dzcy,
    dzigrarr: dzigrarr,
    eDDot: eDDot,
    eDot: eDot,
    eacut: eacut,
    eacute: eacute$1,
    easter: easter,
    ecaron: ecaron,
    ecir: ecir,
    ecirc: ecirc$1,
    ecolon: ecolon,
    ecy: ecy,
    edot: edot,
    ee: ee,
    efDot: efDot,
    efr: efr,
    eg: eg,
    egrav: egrav,
    egrave: egrave$1,
    egs: egs,
    egsdot: egsdot,
    el: el,
    elinters: elinters,
    ell: ell,
    els: els,
    elsdot: elsdot,
    emacr: emacr,
    empty: empty,
    emptyset: emptyset,
    emptyv: emptyv,
    emsp13: emsp13,
    emsp14: emsp14,
    emsp: emsp,
    eng: eng,
    ensp: ensp,
    eogon: eogon,
    eopf: eopf,
    epar: epar,
    eparsl: eparsl,
    eplus: eplus,
    epsi: epsi,
    epsilon: epsilon,
    epsiv: epsiv,
    eqcirc: eqcirc,
    eqcolon: eqcolon,
    eqsim: eqsim,
    eqslantgtr: eqslantgtr,
    eqslantless: eqslantless,
    equals: equals,
    equest: equest,
    equiv: equiv,
    equivDD: equivDD,
    eqvparsl: eqvparsl,
    erDot: erDot,
    erarr: erarr,
    escr: escr,
    esdot: esdot,
    esim: esim,
    eta: eta,
    et: et,
    eth: eth$1,
    eum: eum,
    euml: euml$1,
    euro: euro,
    excl: excl,
    exist: exist,
    expectation: expectation,
    exponentiale: exponentiale,
    fallingdotseq: fallingdotseq,
    fcy: fcy,
    female: female,
    ffilig: ffilig,
    fflig: fflig,
    ffllig: ffllig,
    ffr: ffr,
    filig: filig,
    fjlig: fjlig,
    flat: flat,
    fllig: fllig,
    fltns: fltns,
    fnof: fnof,
    fopf: fopf,
    forall: forall,
    fork: fork,
    forkv: forkv,
    fpartint: fpartint,
    frac1: frac1,
    frac12: frac12$1,
    frac13: frac13,
    frac14: frac14$1,
    frac15: frac15,
    frac16: frac16,
    frac18: frac18,
    frac23: frac23,
    frac25: frac25,
    frac3: frac3,
    frac34: frac34$1,
    frac35: frac35,
    frac38: frac38,
    frac45: frac45,
    frac56: frac56,
    frac58: frac58,
    frac78: frac78,
    frasl: frasl,
    frown: frown,
    fscr: fscr,
    gE: gE,
    gEl: gEl,
    gacute: gacute,
    gamma: gamma,
    gammad: gammad,
    gap: gap,
    gbreve: gbreve,
    gcirc: gcirc,
    gcy: gcy,
    gdot: gdot,
    ge: ge,
    gel: gel,
    geq: geq,
    geqq: geqq,
    geqslant: geqslant,
    ges: ges,
    gescc: gescc,
    gesdot: gesdot,
    gesdoto: gesdoto,
    gesdotol: gesdotol,
    gesl: gesl,
    gesles: gesles,
    gfr: gfr,
    gg: gg,
    ggg: ggg,
    gimel: gimel,
    gjcy: gjcy,
    gl: gl,
    glE: glE,
    gla: gla,
    glj: glj,
    gnE: gnE,
    gnap: gnap,
    gnapprox: gnapprox,
    gne: gne,
    gneq: gneq,
    gneqq: gneqq,
    gnsim: gnsim,
    gopf: gopf,
    grave: grave,
    gscr: gscr,
    gsim: gsim,
    gsime: gsime,
    gsiml: gsiml,
    g: g,
    gt: gt$1,
    gtcc: gtcc,
    gtcir: gtcir,
    gtdot: gtdot,
    gtlPar: gtlPar,
    gtquest: gtquest,
    gtrapprox: gtrapprox,
    gtrarr: gtrarr,
    gtrdot: gtrdot,
    gtreqless: gtreqless,
    gtreqqless: gtreqqless,
    gtrless: gtrless,
    gtrsim: gtrsim,
    gvertneqq: gvertneqq,
    gvnE: gvnE,
    hArr: hArr,
    hairsp: hairsp,
    half: half,
    hamilt: hamilt,
    hardcy: hardcy,
    harr: harr,
    harrcir: harrcir,
    harrw: harrw,
    hbar: hbar,
    hcirc: hcirc,
    hearts: hearts,
    heartsuit: heartsuit,
    hellip: hellip,
    hercon: hercon,
    hfr: hfr,
    hksearow: hksearow,
    hkswarow: hkswarow,
    hoarr: hoarr,
    homtht: homtht,
    hookleftarrow: hookleftarrow,
    hookrightarrow: hookrightarrow,
    hopf: hopf,
    horbar: horbar,
    hscr: hscr,
    hslash: hslash,
    hstrok: hstrok,
    hybull: hybull,
    hyphen: hyphen,
    iacut: iacut,
    iacute: iacute$1,
    ic: ic,
    icir: icir,
    icirc: icirc$1,
    icy: icy,
    iecy: iecy,
    iexc: iexc,
    iexcl: iexcl$1,
    iff: iff,
    ifr: ifr,
    igrav: igrav,
    igrave: igrave$1,
    ii: ii,
    iiiint: iiiint,
    iiint: iiint,
    iinfin: iinfin,
    iiota: iiota,
    ijlig: ijlig,
    imacr: imacr,
    image: image,
    imagline: imagline,
    imagpart: imagpart,
    imath: imath,
    imof: imof,
    imped: imped,
    incare: incare,
    infin: infin,
    infintie: infintie,
    inodot: inodot,
    int: int,
    intcal: intcal,
    integers: integers,
    intercal: intercal,
    intlarhk: intlarhk,
    intprod: intprod,
    iocy: iocy,
    iogon: iogon,
    iopf: iopf,
    iota: iota,
    iprod: iprod,
    iques: iques,
    iquest: iquest$1,
    iscr: iscr,
    isin: isin,
    isinE: isinE,
    isindot: isindot,
    isins: isins,
    isinsv: isinsv,
    isinv: isinv,
    it: it,
    itilde: itilde,
    iukcy: iukcy,
    ium: ium,
    iuml: iuml$1,
    jcirc: jcirc,
    jcy: jcy,
    jfr: jfr,
    jmath: jmath,
    jopf: jopf,
    jscr: jscr,
    jsercy: jsercy,
    jukcy: jukcy,
    kappa: kappa,
    kappav: kappav,
    kcedil: kcedil,
    kcy: kcy,
    kfr: kfr,
    kgreen: kgreen,
    khcy: khcy,
    kjcy: kjcy,
    kopf: kopf,
    kscr: kscr,
    lAarr: lAarr,
    lArr: lArr,
    lAtail: lAtail,
    lBarr: lBarr,
    lE: lE,
    lEg: lEg,
    lHar: lHar,
    lacute: lacute,
    laemptyv: laemptyv,
    lagran: lagran,
    lambda: lambda,
    lang: lang,
    langd: langd,
    langle: langle,
    lap: lap,
    laqu: laqu,
    laquo: laquo$1,
    larr: larr,
    larrb: larrb,
    larrbfs: larrbfs,
    larrfs: larrfs,
    larrhk: larrhk,
    larrlp: larrlp,
    larrpl: larrpl,
    larrsim: larrsim,
    larrtl: larrtl,
    lat: lat,
    latail: latail,
    late: late,
    lates: lates,
    lbarr: lbarr,
    lbbrk: lbbrk,
    lbrace: lbrace,
    lbrack: lbrack,
    lbrke: lbrke,
    lbrksld: lbrksld,
    lbrkslu: lbrkslu,
    lcaron: lcaron,
    lcedil: lcedil,
    lceil: lceil,
    lcub: lcub,
    lcy: lcy,
    ldca: ldca,
    ldquo: ldquo,
    ldquor: ldquor,
    ldrdhar: ldrdhar,
    ldrushar: ldrushar,
    ldsh: ldsh,
    le: le,
    leftarrow: leftarrow,
    leftarrowtail: leftarrowtail,
    leftharpoondown: leftharpoondown,
    leftharpoonup: leftharpoonup,
    leftleftarrows: leftleftarrows,
    leftrightarrow: leftrightarrow,
    leftrightarrows: leftrightarrows,
    leftrightharpoons: leftrightharpoons,
    leftrightsquigarrow: leftrightsquigarrow,
    leftthreetimes: leftthreetimes,
    leg: leg,
    leq: leq,
    leqq: leqq,
    leqslant: leqslant,
    les: les,
    lescc: lescc,
    lesdot: lesdot,
    lesdoto: lesdoto,
    lesdotor: lesdotor,
    lesg: lesg,
    lesges: lesges,
    lessapprox: lessapprox,
    lessdot: lessdot,
    lesseqgtr: lesseqgtr,
    lesseqqgtr: lesseqqgtr,
    lessgtr: lessgtr,
    lesssim: lesssim,
    lfisht: lfisht,
    lfloor: lfloor,
    lfr: lfr,
    lg: lg,
    lgE: lgE,
    lhard: lhard,
    lharu: lharu,
    lharul: lharul,
    lhblk: lhblk,
    ljcy: ljcy,
    ll: ll,
    llarr: llarr,
    llcorner: llcorner,
    llhard: llhard,
    lltri: lltri,
    lmidot: lmidot,
    lmoust: lmoust,
    lmoustache: lmoustache,
    lnE: lnE,
    lnap: lnap,
    lnapprox: lnapprox,
    lne: lne,
    lneq: lneq,
    lneqq: lneqq,
    lnsim: lnsim,
    loang: loang,
    loarr: loarr,
    lobrk: lobrk,
    longleftarrow: longleftarrow,
    longleftrightarrow: longleftrightarrow,
    longmapsto: longmapsto,
    longrightarrow: longrightarrow,
    looparrowleft: looparrowleft,
    looparrowright: looparrowright,
    lopar: lopar,
    lopf: lopf,
    loplus: loplus,
    lotimes: lotimes,
    lowast: lowast,
    lowbar: lowbar,
    loz: loz,
    lozenge: lozenge,
    lozf: lozf,
    lpar: lpar,
    lparlt: lparlt,
    lrarr: lrarr,
    lrcorner: lrcorner,
    lrhar: lrhar,
    lrhard: lrhard,
    lrm: lrm,
    lrtri: lrtri,
    lsaquo: lsaquo,
    lscr: lscr,
    lsh: lsh,
    lsim: lsim,
    lsime: lsime,
    lsimg: lsimg,
    lsqb: lsqb,
    lsquo: lsquo,
    lsquor: lsquor,
    lstrok: lstrok,
    l: l,
    lt: lt$1,
    ltcc: ltcc,
    ltcir: ltcir,
    ltdot: ltdot,
    lthree: lthree,
    ltimes: ltimes,
    ltlarr: ltlarr,
    ltquest: ltquest,
    ltrPar: ltrPar,
    ltri: ltri,
    ltrie: ltrie,
    ltrif: ltrif,
    lurdshar: lurdshar,
    luruhar: luruhar,
    lvertneqq: lvertneqq,
    lvnE: lvnE,
    mDDot: mDDot,
    mac: mac,
    macr: macr$1,
    male: male,
    malt: malt,
    maltese: maltese,
    map: map,
    mapsto: mapsto,
    mapstodown: mapstodown,
    mapstoleft: mapstoleft,
    mapstoup: mapstoup,
    marker: marker,
    mcomma: mcomma,
    mcy: mcy,
    mdash: mdash,
    measuredangle: measuredangle,
    mfr: mfr,
    mho: mho,
    micr: micr,
    micro: micro$1,
    mid: mid,
    midast: midast,
    midcir: midcir,
    middo: middo,
    middot: middot$1,
    minus: minus,
    minusb: minusb,
    minusd: minusd,
    minusdu: minusdu,
    mlcp: mlcp,
    mldr: mldr,
    mnplus: mnplus,
    models: models,
    mopf: mopf,
    mp: mp,
    mscr: mscr,
    mstpos: mstpos,
    mu: mu,
    multimap: multimap,
    mumap: mumap,
    nGg: nGg,
    nGt: nGt,
    nGtv: nGtv,
    nLeftarrow: nLeftarrow,
    nLeftrightarrow: nLeftrightarrow,
    nLl: nLl,
    nLt: nLt,
    nLtv: nLtv,
    nRightarrow: nRightarrow,
    nVDash: nVDash,
    nVdash: nVdash,
    nabla: nabla,
    nacute: nacute,
    nang: nang,
    nap: nap,
    napE: napE,
    napid: napid,
    napos: napos,
    napprox: napprox,
    natur: natur,
    natural: natural,
    naturals: naturals,
    nbs: nbs,
    nbsp: nbsp$1,
    nbump: nbump,
    nbumpe: nbumpe,
    ncap: ncap,
    ncaron: ncaron,
    ncedil: ncedil,
    ncong: ncong,
    ncongdot: ncongdot,
    ncup: ncup,
    ncy: ncy,
    ndash: ndash,
    ne: ne,
    neArr: neArr,
    nearhk: nearhk,
    nearr: nearr,
    nearrow: nearrow,
    nedot: nedot,
    nequiv: nequiv,
    nesear: nesear,
    nesim: nesim,
    nexist: nexist,
    nexists: nexists,
    nfr: nfr,
    ngE: ngE,
    nge: nge,
    ngeq: ngeq,
    ngeqq: ngeqq,
    ngeqslant: ngeqslant,
    nges: nges,
    ngsim: ngsim,
    ngt: ngt,
    ngtr: ngtr,
    nhArr: nhArr,
    nharr: nharr,
    nhpar: nhpar,
    ni: ni,
    nis: nis,
    nisd: nisd,
    niv: niv,
    njcy: njcy,
    nlArr: nlArr,
    nlE: nlE,
    nlarr: nlarr,
    nldr: nldr,
    nle: nle,
    nleftarrow: nleftarrow,
    nleftrightarrow: nleftrightarrow,
    nleq: nleq,
    nleqq: nleqq,
    nleqslant: nleqslant,
    nles: nles,
    nless: nless,
    nlsim: nlsim,
    nlt: nlt,
    nltri: nltri,
    nltrie: nltrie,
    nmid: nmid,
    nopf: nopf,
    no: no,
    not: not$1,
    notin: notin,
    notinE: notinE,
    notindot: notindot,
    notinva: notinva,
    notinvb: notinvb,
    notinvc: notinvc,
    notni: notni,
    notniva: notniva,
    notnivb: notnivb,
    notnivc: notnivc,
    npar: npar,
    nparallel: nparallel,
    nparsl: nparsl,
    npart: npart,
    npolint: npolint,
    npr: npr,
    nprcue: nprcue,
    npre: npre,
    nprec: nprec,
    npreceq: npreceq,
    nrArr: nrArr,
    nrarr: nrarr,
    nrarrc: nrarrc,
    nrarrw: nrarrw,
    nrightarrow: nrightarrow,
    nrtri: nrtri,
    nrtrie: nrtrie,
    nsc: nsc,
    nsccue: nsccue,
    nsce: nsce,
    nscr: nscr,
    nshortmid: nshortmid,
    nshortparallel: nshortparallel,
    nsim: nsim,
    nsime: nsime,
    nsimeq: nsimeq,
    nsmid: nsmid,
    nspar: nspar,
    nsqsube: nsqsube,
    nsqsupe: nsqsupe,
    nsub: nsub,
    nsubE: nsubE,
    nsube: nsube,
    nsubset: nsubset,
    nsubseteq: nsubseteq,
    nsubseteqq: nsubseteqq,
    nsucc: nsucc,
    nsucceq: nsucceq,
    nsup: nsup,
    nsupE: nsupE,
    nsupe: nsupe,
    nsupset: nsupset,
    nsupseteq: nsupseteq,
    nsupseteqq: nsupseteqq,
    ntgl: ntgl,
    ntild: ntild,
    ntilde: ntilde$1,
    ntlg: ntlg,
    ntriangleleft: ntriangleleft,
    ntrianglelefteq: ntrianglelefteq,
    ntriangleright: ntriangleright,
    ntrianglerighteq: ntrianglerighteq,
    nu: nu,
    num: num,
    numero: numero,
    numsp: numsp,
    nvDash: nvDash,
    nvHarr: nvHarr,
    nvap: nvap,
    nvdash: nvdash,
    nvge: nvge,
    nvgt: nvgt,
    nvinfin: nvinfin,
    nvlArr: nvlArr,
    nvle: nvle,
    nvlt: nvlt,
    nvltrie: nvltrie,
    nvrArr: nvrArr,
    nvrtrie: nvrtrie,
    nvsim: nvsim,
    nwArr: nwArr,
    nwarhk: nwarhk,
    nwarr: nwarr,
    nwarrow: nwarrow,
    nwnear: nwnear,
    oS: oS,
    oacut: oacut,
    oacute: oacute$1,
    oast: oast,
    ocir: ocir,
    ocirc: ocirc$1,
    ocy: ocy,
    odash: odash,
    odblac: odblac,
    odiv: odiv,
    odot: odot,
    odsold: odsold,
    oelig: oelig,
    ofcir: ofcir,
    ofr: ofr,
    ogon: ogon,
    ograv: ograv,
    ograve: ograve$1,
    ogt: ogt,
    ohbar: ohbar,
    ohm: ohm,
    oint: oint,
    olarr: olarr,
    olcir: olcir,
    olcross: olcross,
    oline: oline,
    olt: olt,
    omacr: omacr,
    omega: omega,
    omicron: omicron,
    omid: omid,
    ominus: ominus,
    oopf: oopf,
    opar: opar,
    operp: operp,
    oplus: oplus,
    or: or,
    orarr: orarr,
    ord: ord,
    order: order,
    orderof: orderof,
    ordf: ordf$1,
    ordm: ordm$1,
    origof: origof,
    oror: oror,
    orslope: orslope,
    orv: orv,
    oscr: oscr,
    oslas: oslas,
    oslash: oslash$1,
    osol: osol,
    otild: otild,
    otilde: otilde$1,
    otimes: otimes,
    otimesas: otimesas,
    oum: oum,
    ouml: ouml$1,
    ovbar: ovbar,
    par: par,
    para: para$1,
    parallel: parallel,
    parsim: parsim,
    parsl: parsl,
    part: part,
    pcy: pcy,
    percnt: percnt,
    period: period,
    permil: permil,
    perp: perp,
    pertenk: pertenk,
    pfr: pfr,
    phi: phi,
    phiv: phiv,
    phmmat: phmmat,
    phone: phone,
    pi: pi,
    pitchfork: pitchfork,
    piv: piv,
    planck: planck,
    planckh: planckh,
    plankv: plankv,
    plus: plus,
    plusacir: plusacir,
    plusb: plusb,
    pluscir: pluscir,
    plusdo: plusdo,
    plusdu: plusdu,
    pluse: pluse,
    plusm: plusm,
    plusmn: plusmn$1,
    plussim: plussim,
    plustwo: plustwo,
    pm: pm,
    pointint: pointint,
    popf: popf,
    poun: poun,
    pound: pound$1,
    pr: pr,
    prE: prE,
    prap: prap,
    prcue: prcue,
    pre: pre,
    prec: prec,
    precapprox: precapprox,
    preccurlyeq: preccurlyeq,
    preceq: preceq,
    precnapprox: precnapprox,
    precneqq: precneqq,
    precnsim: precnsim,
    precsim: precsim,
    prime: prime,
    primes: primes,
    prnE: prnE,
    prnap: prnap,
    prnsim: prnsim,
    prod: prod,
    profalar: profalar,
    profline: profline,
    profsurf: profsurf,
    prop: prop,
    propto: propto,
    prsim: prsim,
    prurel: prurel,
    pscr: pscr,
    psi: psi,
    puncsp: puncsp,
    qfr: qfr,
    qint: qint,
    qopf: qopf,
    qprime: qprime,
    qscr: qscr,
    quaternions: quaternions,
    quatint: quatint,
    quest: quest,
    questeq: questeq,
    quo: quo,
    quot: quot$1,
    rAarr: rAarr,
    rArr: rArr,
    rAtail: rAtail,
    rBarr: rBarr,
    rHar: rHar,
    race: race,
    racute: racute,
    radic: radic,
    raemptyv: raemptyv,
    rang: rang,
    rangd: rangd,
    range: range,
    rangle: rangle,
    raqu: raqu,
    raquo: raquo$1,
    rarr: rarr,
    rarrap: rarrap,
    rarrb: rarrb,
    rarrbfs: rarrbfs,
    rarrc: rarrc,
    rarrfs: rarrfs,
    rarrhk: rarrhk,
    rarrlp: rarrlp,
    rarrpl: rarrpl,
    rarrsim: rarrsim,
    rarrtl: rarrtl,
    rarrw: rarrw,
    ratail: ratail,
    ratio: ratio,
    rationals: rationals,
    rbarr: rbarr,
    rbbrk: rbbrk,
    rbrace: rbrace,
    rbrack: rbrack,
    rbrke: rbrke,
    rbrksld: rbrksld,
    rbrkslu: rbrkslu,
    rcaron: rcaron,
    rcedil: rcedil,
    rceil: rceil,
    rcub: rcub,
    rcy: rcy,
    rdca: rdca,
    rdldhar: rdldhar,
    rdquo: rdquo,
    rdquor: rdquor,
    rdsh: rdsh,
    real: real,
    realine: realine,
    realpart: realpart,
    reals: reals,
    rect: rect,
    re: re,
    reg: reg$1,
    rfisht: rfisht,
    rfloor: rfloor,
    rfr: rfr,
    rhard: rhard,
    rharu: rharu,
    rharul: rharul,
    rho: rho,
    rhov: rhov,
    rightarrow: rightarrow,
    rightarrowtail: rightarrowtail,
    rightharpoondown: rightharpoondown,
    rightharpoonup: rightharpoonup,
    rightleftarrows: rightleftarrows,
    rightleftharpoons: rightleftharpoons,
    rightrightarrows: rightrightarrows,
    rightsquigarrow: rightsquigarrow,
    rightthreetimes: rightthreetimes,
    ring: ring,
    risingdotseq: risingdotseq,
    rlarr: rlarr,
    rlhar: rlhar,
    rlm: rlm,
    rmoust: rmoust,
    rmoustache: rmoustache,
    rnmid: rnmid,
    roang: roang,
    roarr: roarr,
    robrk: robrk,
    ropar: ropar,
    ropf: ropf,
    roplus: roplus,
    rotimes: rotimes,
    rpar: rpar,
    rpargt: rpargt,
    rppolint: rppolint,
    rrarr: rrarr,
    rsaquo: rsaquo,
    rscr: rscr,
    rsh: rsh,
    rsqb: rsqb,
    rsquo: rsquo,
    rsquor: rsquor,
    rthree: rthree,
    rtimes: rtimes,
    rtri: rtri,
    rtrie: rtrie,
    rtrif: rtrif,
    rtriltri: rtriltri,
    ruluhar: ruluhar,
    rx: rx,
    sacute: sacute,
    sbquo: sbquo,
    sc: sc,
    scE: scE,
    scap: scap,
    scaron: scaron,
    sccue: sccue,
    sce: sce,
    scedil: scedil,
    scirc: scirc,
    scnE: scnE,
    scnap: scnap,
    scnsim: scnsim,
    scpolint: scpolint,
    scsim: scsim,
    scy: scy,
    sdot: sdot,
    sdotb: sdotb,
    sdote: sdote,
    seArr: seArr,
    searhk: searhk,
    searr: searr,
    searrow: searrow,
    sec: sec,
    sect: sect$1,
    semi: semi,
    seswar: seswar,
    setminus: setminus,
    setmn: setmn,
    sext: sext,
    sfr: sfr,
    sfrown: sfrown,
    sharp: sharp,
    shchcy: shchcy,
    shcy: shcy,
    shortmid: shortmid,
    shortparallel: shortparallel,
    sh: sh,
    shy: shy$1,
    sigma: sigma,
    sigmaf: sigmaf,
    sigmav: sigmav,
    sim: sim,
    simdot: simdot,
    sime: sime,
    simeq: simeq,
    simg: simg,
    simgE: simgE,
    siml: siml,
    simlE: simlE,
    simne: simne,
    simplus: simplus,
    simrarr: simrarr,
    slarr: slarr,
    smallsetminus: smallsetminus,
    smashp: smashp,
    smeparsl: smeparsl,
    smid: smid,
    smile: smile,
    smt: smt,
    smte: smte,
    smtes: smtes,
    softcy: softcy,
    sol: sol,
    solb: solb,
    solbar: solbar,
    sopf: sopf,
    spades: spades,
    spadesuit: spadesuit,
    spar: spar,
    sqcap: sqcap,
    sqcaps: sqcaps,
    sqcup: sqcup,
    sqcups: sqcups,
    sqsub: sqsub,
    sqsube: sqsube,
    sqsubset: sqsubset,
    sqsubseteq: sqsubseteq,
    sqsup: sqsup,
    sqsupe: sqsupe,
    sqsupset: sqsupset,
    sqsupseteq: sqsupseteq,
    squ: squ,
    square: square,
    squarf: squarf,
    squf: squf,
    srarr: srarr,
    sscr: sscr,
    ssetmn: ssetmn,
    ssmile: ssmile,
    sstarf: sstarf,
    star: star,
    starf: starf,
    straightepsilon: straightepsilon,
    straightphi: straightphi,
    strns: strns,
    sub: sub,
    subE: subE,
    subdot: subdot,
    sube: sube,
    subedot: subedot,
    submult: submult,
    subnE: subnE,
    subne: subne,
    subplus: subplus,
    subrarr: subrarr,
    subset: subset,
    subseteq: subseteq,
    subseteqq: subseteqq,
    subsetneq: subsetneq,
    subsetneqq: subsetneqq,
    subsim: subsim,
    subsub: subsub,
    subsup: subsup,
    succ: succ,
    succapprox: succapprox,
    succcurlyeq: succcurlyeq,
    succeq: succeq,
    succnapprox: succnapprox,
    succneqq: succneqq,
    succnsim: succnsim,
    succsim: succsim,
    sum: sum,
    sung: sung,
    sup: sup,
    sup1: sup1$1,
    sup2: sup2$1,
    sup3: sup3$1,
    supE: supE,
    supdot: supdot,
    supdsub: supdsub,
    supe: supe,
    supedot: supedot,
    suphsol: suphsol,
    suphsub: suphsub,
    suplarr: suplarr,
    supmult: supmult,
    supnE: supnE,
    supne: supne,
    supplus: supplus,
    supset: supset,
    supseteq: supseteq,
    supseteqq: supseteqq,
    supsetneq: supsetneq,
    supsetneqq: supsetneqq,
    supsim: supsim,
    supsub: supsub,
    supsup: supsup,
    swArr: swArr,
    swarhk: swarhk,
    swarr: swarr,
    swarrow: swarrow,
    swnwar: swnwar,
    szli: szli,
    szlig: szlig$1,
    target: target,
    tau: tau,
    tbrk: tbrk,
    tcaron: tcaron,
    tcedil: tcedil,
    tcy: tcy,
    tdot: tdot,
    telrec: telrec,
    tfr: tfr,
    there4: there4,
    therefore: therefore,
    theta: theta,
    thetasym: thetasym,
    thetav: thetav,
    thickapprox: thickapprox,
    thicksim: thicksim,
    thinsp: thinsp,
    thkap: thkap,
    thksim: thksim,
    thor: thor,
    thorn: thorn$1,
    tilde: tilde,
    time: time,
    times: times$1,
    timesb: timesb,
    timesbar: timesbar,
    timesd: timesd,
    tint: tint,
    toea: toea,
    top: top,
    topbot: topbot,
    topcir: topcir,
    topf: topf,
    topfork: topfork,
    tosa: tosa,
    tprime: tprime,
    trade: trade,
    triangle: triangle,
    triangledown: triangledown,
    triangleleft: triangleleft,
    trianglelefteq: trianglelefteq,
    triangleq: triangleq,
    triangleright: triangleright,
    trianglerighteq: trianglerighteq,
    tridot: tridot,
    trie: trie,
    triminus: triminus,
    triplus: triplus,
    trisb: trisb,
    tritime: tritime,
    trpezium: trpezium,
    tscr: tscr,
    tscy: tscy,
    tshcy: tshcy,
    tstrok: tstrok,
    twixt: twixt,
    twoheadleftarrow: twoheadleftarrow,
    twoheadrightarrow: twoheadrightarrow,
    uArr: uArr,
    uHar: uHar,
    uacut: uacut,
    uacute: uacute$1,
    uarr: uarr,
    ubrcy: ubrcy,
    ubreve: ubreve,
    ucir: ucir,
    ucirc: ucirc$1,
    ucy: ucy,
    udarr: udarr,
    udblac: udblac,
    udhar: udhar,
    ufisht: ufisht,
    ufr: ufr,
    ugrav: ugrav,
    ugrave: ugrave$1,
    uharl: uharl,
    uharr: uharr,
    uhblk: uhblk,
    ulcorn: ulcorn,
    ulcorner: ulcorner,
    ulcrop: ulcrop,
    ultri: ultri,
    umacr: umacr,
    um: um,
    uml: uml$1,
    uogon: uogon,
    uopf: uopf,
    uparrow: uparrow,
    updownarrow: updownarrow,
    upharpoonleft: upharpoonleft,
    upharpoonright: upharpoonright,
    uplus: uplus,
    upsi: upsi,
    upsih: upsih,
    upsilon: upsilon,
    upuparrows: upuparrows,
    urcorn: urcorn,
    urcorner: urcorner,
    urcrop: urcrop,
    uring: uring,
    urtri: urtri,
    uscr: uscr,
    utdot: utdot,
    utilde: utilde,
    utri: utri,
    utrif: utrif,
    uuarr: uuarr,
    uum: uum,
    uuml: uuml$1,
    uwangle: uwangle,
    vArr: vArr,
    vBar: vBar,
    vBarv: vBarv,
    vDash: vDash,
    vangrt: vangrt,
    varepsilon: varepsilon,
    varkappa: varkappa,
    varnothing: varnothing,
    varphi: varphi,
    varpi: varpi,
    varpropto: varpropto,
    varr: varr,
    varrho: varrho,
    varsigma: varsigma,
    varsubsetneq: varsubsetneq,
    varsubsetneqq: varsubsetneqq,
    varsupsetneq: varsupsetneq,
    varsupsetneqq: varsupsetneqq,
    vartheta: vartheta,
    vartriangleleft: vartriangleleft,
    vartriangleright: vartriangleright,
    vcy: vcy,
    vdash: vdash,
    vee: vee,
    veebar: veebar,
    veeeq: veeeq,
    vellip: vellip,
    verbar: verbar,
    vert: vert,
    vfr: vfr,
    vltri: vltri,
    vnsub: vnsub,
    vnsup: vnsup,
    vopf: vopf,
    vprop: vprop,
    vrtri: vrtri,
    vscr: vscr,
    vsubnE: vsubnE,
    vsubne: vsubne,
    vsupnE: vsupnE,
    vsupne: vsupne,
    vzigzag: vzigzag,
    wcirc: wcirc,
    wedbar: wedbar,
    wedge: wedge,
    wedgeq: wedgeq,
    weierp: weierp,
    wfr: wfr,
    wopf: wopf,
    wp: wp,
    wr: wr,
    wreath: wreath,
    wscr: wscr,
    xcap: xcap,
    xcirc: xcirc,
    xcup: xcup,
    xdtri: xdtri,
    xfr: xfr,
    xhArr: xhArr,
    xharr: xharr,
    xi: xi,
    xlArr: xlArr,
    xlarr: xlarr,
    xmap: xmap,
    xnis: xnis,
    xodot: xodot,
    xopf: xopf,
    xoplus: xoplus,
    xotime: xotime,
    xrArr: xrArr,
    xrarr: xrarr,
    xscr: xscr,
    xsqcup: xsqcup,
    xuplus: xuplus,
    xutri: xutri,
    xvee: xvee,
    xwedge: xwedge,
    yacut: yacut,
    yacute: yacute$1,
    yacy: yacy,
    ycirc: ycirc,
    ycy: ycy,
    ye: ye,
    yen: yen$1,
    yfr: yfr,
    yicy: yicy,
    yopf: yopf,
    yscr: yscr,
    yucy: yucy,
    yum: yum,
    yuml: yuml$1,
    zacute: zacute,
    zcaron: zcaron,
    zcy: zcy,
    zdot: zdot,
    zeetrf: zeetrf,
    zeta: zeta,
    zfr: zfr,
    zhcy: zhcy,
    zigrarr: zigrarr,
    zopf: zopf,
    zscr: zscr,
    zwj: zwj,
    zwnj: zwnj,
    'default': index$2
  });

  var characterEntities$1 = getCjsExportFromNamespace(characterEntities);

  var decodeEntity_1 = decodeEntity;
  var own = {}.hasOwnProperty;

  function decodeEntity(characters) {
    return own.call(characterEntities$1, characters) ? characterEntities$1[characters] : false;
  }

  var legacy = getCjsExportFromNamespace(characterEntitiesLegacy);

  var invalid = getCjsExportFromNamespace(characterReferenceInvalid);

  var parseEntities_1 = parseEntities;
  var own$1 = {}.hasOwnProperty;
  var fromCharCode = String.fromCharCode;
  var noop$1 = Function.prototype; // Default settings.

  var defaults = {
    warning: null,
    reference: null,
    text: null,
    warningContext: null,
    referenceContext: null,
    textContext: null,
    position: {},
    additional: null,
    attribute: false,
    nonTerminated: true
  }; // Characters.

  var tab = 9; // '\t'

  var lineFeed = 10; // '\n'

  var formFeed = 12; //  '\f'

  var space = 32; // ' '

  var ampersand = 38; //  '&'

  var semicolon = 59; //  ';'

  var lessThan = 60; //  '<'

  var equalsTo = 61; //  '='

  var numberSign = 35; //  '#'

  var uppercaseX = 88; //  'X'

  var lowercaseX = 120; //  'x'

  var replacementCharacter = 65533; // '�'
  // Reference types.

  var name = 'named';
  var hexa = 'hexadecimal';
  var deci = 'decimal'; // Map of bases.

  var bases = {};
  bases[hexa] = 16;
  bases[deci] = 10; // Map of types to tests.
  // Each type of character reference accepts different characters.
  // This test is used to detect whether a reference has ended (as the semicolon
  // is not strictly needed).

  var tests = {};
  tests[name] = isAlphanumerical;
  tests[deci] = isDecimal;
  tests[hexa] = isHexadecimal; // Warning types.

  var namedNotTerminated = 1;
  var numericNotTerminated = 2;
  var namedEmpty = 3;
  var numericEmpty = 4;
  var namedUnknown = 5;
  var numericDisallowed = 6;
  var numericProhibited = 7; // Warning messages.

  var messages = {};
  messages[namedNotTerminated] = 'Named character references must be terminated by a semicolon';
  messages[numericNotTerminated] = 'Numeric character references must be terminated by a semicolon';
  messages[namedEmpty] = 'Named character references cannot be empty';
  messages[numericEmpty] = 'Numeric character references cannot be empty';
  messages[namedUnknown] = 'Named character references must be known';
  messages[numericDisallowed] = 'Numeric character references cannot be disallowed';
  messages[numericProhibited] = 'Numeric character references cannot be outside the permissible Unicode range'; // Wrap to ensure clean parameters are given to `parse`.

  function parseEntities(value, options) {
    var settings = {};
    var option;
    var key;

    if (!options) {
      options = {};
    }

    for (key in defaults) {
      option = options[key];
      settings[key] = option === null || option === undefined ? defaults[key] : option;
    }

    if (settings.position.indent || settings.position.start) {
      settings.indent = settings.position.indent || [];
      settings.position = settings.position.start;
    }

    return parse(value, settings);
  } // Parse entities.
  // eslint-disable-next-line complexity


  function parse(value, settings) {
    var additional = settings.additional;
    var nonTerminated = settings.nonTerminated;
    var handleText = settings.text;
    var handleReference = settings.reference;
    var handleWarning = settings.warning;
    var textContext = settings.textContext;
    var referenceContext = settings.referenceContext;
    var warningContext = settings.warningContext;
    var pos = settings.position;
    var indent = settings.indent || [];
    var length = value.length;
    var index = 0;
    var lines = -1;
    var column = pos.column || 1;
    var line = pos.line || 1;
    var queue = '';
    var result = [];
    var entityCharacters;
    var namedEntity;
    var terminated;
    var characters;
    var character;
    var reference;
    var following;
    var warning;
    var reason;
    var output;
    var entity;
    var begin;
    var start;
    var type;
    var test;
    var prev;
    var next;
    var diff;
    var end;

    if (typeof additional === 'string') {
      additional = additional.charCodeAt(0);
    } // Cache the current point.


    prev = now(); // Wrap `handleWarning`.

    warning = handleWarning ? parseError : noop$1; // Ensure the algorithm walks over the first character and the end (inclusive).

    index--;
    length++;

    while (++index < length) {
      // If the previous character was a newline.
      if (character === lineFeed) {
        column = indent[lines] || 1;
      }

      character = value.charCodeAt(index);

      if (character === ampersand) {
        following = value.charCodeAt(index + 1); // The behaviour depends on the identity of the next character.

        if (following === tab || following === lineFeed || following === formFeed || following === space || following === ampersand || following === lessThan || following !== following || additional && following === additional) {
          // Not a character reference.
          // No characters are consumed, and nothing is returned.
          // This is not an error, either.
          queue += fromCharCode(character);
          column++;
          continue;
        }

        start = index + 1;
        begin = start;
        end = start;

        if (following === numberSign) {
          // Numerical entity.
          end = ++begin; // The behaviour further depends on the next character.

          following = value.charCodeAt(end);

          if (following === uppercaseX || following === lowercaseX) {
            // ASCII hex digits.
            type = hexa;
            end = ++begin;
          } else {
            // ASCII digits.
            type = deci;
          }
        } else {
          // Named entity.
          type = name;
        }

        entityCharacters = '';
        entity = '';
        characters = '';
        test = tests[type];
        end--;

        while (++end < length) {
          following = value.charCodeAt(end);

          if (!test(following)) {
            break;
          }

          characters += fromCharCode(following); // Check if we can match a legacy named reference.
          // If so, we cache that as the last viable named reference.
          // This ensures we do not need to walk backwards later.

          if (type === name && own$1.call(legacy, characters)) {
            entityCharacters = characters;
            entity = legacy[characters];
          }
        }

        terminated = value.charCodeAt(end) === semicolon;

        if (terminated) {
          end++;
          namedEntity = type === name ? decodeEntity_1(characters) : false;

          if (namedEntity) {
            entityCharacters = characters;
            entity = namedEntity;
          }
        }

        diff = 1 + end - start;

        if (!terminated && !nonTerminated) ; else if (!characters) {
          // An empty (possible) entity is valid, unless it’s numeric (thus an
          // ampersand followed by an octothorp).
          if (type !== name) {
            warning(numericEmpty, diff);
          }
        } else if (type === name) {
          // An ampersand followed by anything unknown, and not terminated, is
          // invalid.
          if (terminated && !entity) {
            warning(namedUnknown, 1);
          } else {
            // If theres something after an entity name which is not known, cap
            // the reference.
            if (entityCharacters !== characters) {
              end = begin + entityCharacters.length;
              diff = 1 + end - begin;
              terminated = false;
            } // If the reference is not terminated, warn.


            if (!terminated) {
              reason = entityCharacters ? namedNotTerminated : namedEmpty;

              if (settings.attribute) {
                following = value.charCodeAt(end);

                if (following === equalsTo) {
                  warning(reason, diff);
                  entity = null;
                } else if (isAlphanumerical(following)) {
                  entity = null;
                } else {
                  warning(reason, diff);
                }
              } else {
                warning(reason, diff);
              }
            }
          }

          reference = entity;
        } else {
          if (!terminated) {
            // All non-terminated numeric entities are not rendered, and trigger a
            // warning.
            warning(numericNotTerminated, diff);
          } // When terminated and number, parse as either hexadecimal or decimal.


          reference = parseInt(characters, bases[type]); // Trigger a warning when the parsed number is prohibited, and replace
          // with replacement character.

          if (prohibited(reference)) {
            warning(numericProhibited, diff);
            reference = fromCharCode(replacementCharacter);
          } else if (reference in invalid) {
            // Trigger a warning when the parsed number is disallowed, and replace
            // by an alternative.
            warning(numericDisallowed, diff);
            reference = invalid[reference];
          } else {
            // Parse the number.
            output = ''; // Trigger a warning when the parsed number should not be used.

            if (disallowed(reference)) {
              warning(numericDisallowed, diff);
            } // Stringify the number.


            if (reference > 0xffff) {
              reference -= 0x10000;
              output += fromCharCode(reference >>> (10 & 0x3ff) | 0xd800);
              reference = 0xdc00 | reference & 0x3ff;
            }

            reference = output + fromCharCode(reference);
          }
        } // Found it!
        // First eat the queued characters as normal text, then eat an entity.


        if (reference) {
          flush();
          prev = now();
          index = end - 1;
          column += end - start + 1;
          result.push(reference);
          next = now();
          next.offset++;

          if (handleReference) {
            handleReference.call(referenceContext, reference, {
              start: prev,
              end: next
            }, value.slice(start - 1, end));
          }

          prev = next;
        } else {
          // If we could not find a reference, queue the checked characters (as
          // normal characters), and move the pointer to their end.
          // This is possible because we can be certain neither newlines nor
          // ampersands are included.
          characters = value.slice(start - 1, end);
          queue += characters;
          column += characters.length;
          index = end - 1;
        }
      } else {
        // Handle anything other than an ampersand, including newlines and EOF.
        if (character === 10 // Line feed
        ) {
            line++;
            lines++;
            column = 0;
          }

        if (character === character) {
          queue += fromCharCode(character);
          column++;
        } else {
          flush();
        }
      }
    } // Return the reduced nodes, and any possible warnings.


    return result.join(''); // Get current position.

    function now() {
      return {
        line: line,
        column: column,
        offset: index + (pos.offset || 0)
      };
    } // “Throw” a parse-error: a warning.


    function parseError(code, offset) {
      var position = now();
      position.column += offset;
      position.offset += offset;
      handleWarning.call(warningContext, messages[code], position, code);
    } // Flush `queue` (normal text).
    // Macro invoked before each entity and at the end of `value`.
    // Does nothing when `queue` is empty.


    function flush() {
      if (queue) {
        result.push(queue);

        if (handleText) {
          handleText.call(textContext, queue, {
            start: prev,
            end: now()
          });
        }

        queue = '';
      }
    }
  } // Check if `character` is outside the permissible unicode range.


  function prohibited(code) {
    return code >= 0xd800 && code <= 0xdfff || code > 0x10ffff;
  } // Check if `character` is disallowed.


  function disallowed(code) {
    return code >= 0x0001 && code <= 0x0008 || code === 0x000b || code >= 0x000d && code <= 0x001f || code >= 0x007f && code <= 0x009f || code >= 0xfdd0 && code <= 0xfdef || (code & 0xffff) === 0xffff || (code & 0xffff) === 0xfffe;
  }

  var decode = factory$3; // Factory to create an entity decoder.

  function factory$3(ctx) {
    decoder.raw = decodeRaw;
    return decoder; // Normalize `position` to add an `indent`.

    function normalize(position) {
      var offsets = ctx.offset;
      var line = position.line;
      var result = [];

      while (++line) {
        if (!(line in offsets)) {
          break;
        }

        result.push((offsets[line] || 0) + 1);
      }

      return {
        start: position,
        indent: result
      };
    } // Decode `value` (at `position`) into text-nodes.


    function decoder(value, position, handler) {
      parseEntities_1(value, {
        position: normalize(position),
        warning: handleWarning,
        text: handler,
        reference: handler,
        textContext: ctx,
        referenceContext: ctx
      });
    } // Decode `value` (at `position`) into a string.


    function decodeRaw(value, position, options) {
      return parseEntities_1(value, immutable(options, {
        position: normalize(position),
        warning: handleWarning
      }));
    } // Handle a warning.
    // See <https://github.com/wooorm/parse-entities> for the warnings.


    function handleWarning(reason, position, code) {
      if (code !== 3) {
        ctx.file.message(reason, position);
      }
    }
  }

  var tokenizer = factory$4; // Construct a tokenizer.  This creates both `tokenizeInline` and `tokenizeBlock`.

  function factory$4(type) {
    return tokenize; // Tokenizer for a bound `type`.

    function tokenize(value, location) {
      var self = this;
      var offset = self.offset;
      var tokens = [];
      var methods = self[type + 'Methods'];
      var tokenizers = self[type + 'Tokenizers'];
      var line = location.line;
      var column = location.column;
      var index;
      var length;
      var method;
      var name;
      var matched;
      var valueLength; // Trim white space only lines.

      if (!value) {
        return tokens;
      } // Expose on `eat`.


      eat.now = now;
      eat.file = self.file; // Sync initial offset.

      updatePosition(''); // Iterate over `value`, and iterate over all tokenizers.  When one eats
      // something, re-iterate with the remaining value.  If no tokenizer eats,
      // something failed (should not happen) and an exception is thrown.

      while (value) {
        index = -1;
        length = methods.length;
        matched = false;

        while (++index < length) {
          name = methods[index];
          method = tokenizers[name];

          if (method && (
          /* istanbul ignore next */
          !method.onlyAtStart || self.atStart) && (!method.notInList || !self.inList) && (!method.notInBlock || !self.inBlock) && (!method.notInLink || !self.inLink)) {
            valueLength = value.length;
            method.apply(self, [eat, value]);
            matched = valueLength !== value.length;

            if (matched) {
              break;
            }
          }
        }
        /* istanbul ignore if */


        if (!matched) {
          self.file.fail(new Error('Infinite loop'), eat.now());
        }
      }

      self.eof = now();
      return tokens; // Update line, column, and offset based on `value`.

      function updatePosition(subvalue) {
        var lastIndex = -1;
        var index = subvalue.indexOf('\n');

        while (index !== -1) {
          line++;
          lastIndex = index;
          index = subvalue.indexOf('\n', index + 1);
        }

        if (lastIndex === -1) {
          column += subvalue.length;
        } else {
          column = subvalue.length - lastIndex;
        }

        if (line in offset) {
          if (lastIndex !== -1) {
            column += offset[line];
          } else if (column <= offset[line]) {
            column = offset[line] + 1;
          }
        }
      } // Get offset.  Called before the first character is eaten to retrieve the
      // range’s offsets.


      function getOffset() {
        var indentation = [];
        var pos = line + 1; // Done.  Called when the last character is eaten to retrieve the range’s
        // offsets.

        return function () {
          var last = line + 1;

          while (pos < last) {
            indentation.push((offset[pos] || 0) + 1);
            pos++;
          }

          return indentation;
        };
      } // Get the current position.


      function now() {
        var pos = {
          line: line,
          column: column
        };
        pos.offset = self.toOffset(pos);
        return pos;
      } // Store position information for a node.


      function Position(start) {
        this.start = start;
        this.end = now();
      } // Throw when a value is incorrectly eaten.  This shouldn’t happen but will
      // throw on new, incorrect rules.


      function validateEat(subvalue) {
        /* istanbul ignore if */
        if (value.substring(0, subvalue.length) !== subvalue) {
          // Capture stack-trace.
          self.file.fail(new Error('Incorrectly eaten value: please report this warning on https://git.io/vg5Ft'), now());
        }
      } // Mark position and patch `node.position`.


      function position() {
        var before = now();
        return update; // Add the position to a node.

        function update(node, indent) {
          var prev = node.position;
          var start = prev ? prev.start : before;
          var combined = [];
          var n = prev && prev.end.line;
          var l = before.line;
          node.position = new Position(start); // If there was already a `position`, this node was merged.  Fixing
          // `start` wasn’t hard, but the indent is different.  Especially
          // because some information, the indent between `n` and `l` wasn’t
          // tracked.  Luckily, that space is (should be?) empty, so we can
          // safely check for it now.

          if (prev && indent && prev.indent) {
            combined = prev.indent;

            if (n < l) {
              while (++n < l) {
                combined.push((offset[n] || 0) + 1);
              }

              combined.push(before.column);
            }

            indent = combined.concat(indent);
          }

          node.position.indent = indent || [];
          return node;
        }
      } // Add `node` to `parent`s children or to `tokens`.  Performs merges where
      // possible.


      function add(node, parent) {
        var children = parent ? parent.children : tokens;
        var prev = children[children.length - 1];
        var fn;

        if (prev && node.type === prev.type && (node.type === 'text' || node.type === 'blockquote') && mergeable(prev) && mergeable(node)) {
          fn = node.type === 'text' ? mergeText : mergeBlockquote;
          node = fn.call(self, prev, node);
        }

        if (node !== prev) {
          children.push(node);
        }

        if (self.atStart && tokens.length !== 0) {
          self.exitStart();
        }

        return node;
      } // Remove `subvalue` from `value`.  `subvalue` must be at the start of
      // `value`.


      function eat(subvalue) {
        var indent = getOffset();
        var pos = position();
        var current = now();
        validateEat(subvalue);
        apply.reset = reset;
        reset.test = test;
        apply.test = test;
        value = value.substring(subvalue.length);
        updatePosition(subvalue);
        indent = indent();
        return apply; // Add the given arguments, add `position` to the returned node, and
        // return the node.

        function apply(node, parent) {
          return pos(add(pos(node), parent), indent);
        } // Functions just like apply, but resets the content: the line and
        // column are reversed, and the eaten value is re-added.   This is
        // useful for nodes with a single type of content, such as lists and
        // tables.  See `apply` above for what parameters are expected.


        function reset() {
          var node = apply.apply(null, arguments);
          line = current.line;
          column = current.column;
          value = subvalue + value;
          return node;
        } // Test the position, after eating, and reverse to a not-eaten state.


        function test() {
          var result = pos({});
          line = current.line;
          column = current.column;
          value = subvalue + value;
          return result.position;
        }
      }
    }
  } // Check whether a node is mergeable with adjacent nodes.


  function mergeable(node) {
    var start;
    var end;

    if (node.type !== 'text' || !node.position) {
      return true;
    }

    start = node.position.start;
    end = node.position.end; // Only merge nodes which occupy the same size as their `value`.

    return start.line !== end.line || end.column - start.column === node.value.length;
  } // Merge two text nodes: `node` into `prev`.


  function mergeText(prev, node) {
    prev.value += node.value;
    return prev;
  } // Merge two blockquotes: `node` into `prev`, unless in CommonMark or gfm modes.


  function mergeBlockquote(prev, node) {
    if (this.options.commonmark || this.options.gfm) {
      return node;
    }

    prev.children = prev.children.concat(node.children);
    return prev;
  }

  var markdownEscapes = escapes;
  var defaults$1 = ['\\', '`', '*', '{', '}', '[', ']', '(', ')', '#', '+', '-', '.', '!', '_', '>'];
  var gfm = defaults$1.concat(['~', '|']);
  var commonmark = gfm.concat(['\n', '"', '$', '%', '&', "'", ',', '/', ':', ';', '<', '=', '?', '@', '^']);
  escapes.default = defaults$1;
  escapes.gfm = gfm;
  escapes.commonmark = commonmark; // Get markdown escapes.

  function escapes(options) {
    var settings = options || {};

    if (settings.commonmark) {
      return commonmark;
    }

    return settings.gfm ? gfm : defaults$1;
  }

  var blockElements = ['address', 'article', 'aside', 'base', 'basefont', 'blockquote', 'body', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dialog', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'legend', 'li', 'link', 'main', 'menu', 'menuitem', 'meta', 'nav', 'noframes', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'section', 'source', 'title', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul'];

  var defaults$2 = {
    position: true,
    gfm: true,
    commonmark: false,
    footnotes: false,
    pedantic: false,
    blocks: blockElements
  };

  var setOptions_1 = setOptions;

  function setOptions(options) {
    var self = this;
    var current = self.options;
    var key;
    var value;

    if (options == null) {
      options = {};
    } else if (typeof options === 'object') {
      options = immutable(options);
    } else {
      throw new Error('Invalid value `' + options + '` for setting `options`');
    }

    for (key in defaults$2) {
      value = options[key];

      if (value == null) {
        value = current[key];
      }

      if (key !== 'blocks' && typeof value !== 'boolean' || key === 'blocks' && typeof value !== 'object') {
        throw new Error('Invalid value `' + value + '` for setting `options.' + key + '`');
      }

      options[key] = value;
    }

    self.options = options;
    self.escape = markdownEscapes(options);
    return self;
  }

  var convert_1 = convert;

  function convert(test) {
    if (typeof test === 'string') {
      return typeFactory(test);
    }

    if (test === null || test === undefined) {
      return ok;
    }

    if (typeof test === 'object') {
      return ('length' in test ? anyFactory : matchesFactory)(test);
    }

    if (typeof test === 'function') {
      return test;
    }

    throw new Error('Expected function, string, or object as test');
  }

  function convertAll(tests) {
    var results = [];
    var length = tests.length;
    var index = -1;

    while (++index < length) {
      results[index] = convert(tests[index]);
    }

    return results;
  } // Utility assert each property in `test` is represented in `node`, and each
  // values are strictly equal.


  function matchesFactory(test) {
    return matches;

    function matches(node) {
      var key;

      for (key in test) {
        if (node[key] !== test[key]) {
          return false;
        }
      }

      return true;
    }
  }

  function anyFactory(tests) {
    var checks = convertAll(tests);
    var length = checks.length;
    return matches;

    function matches() {
      var index = -1;

      while (++index < length) {
        if (checks[index].apply(this, arguments)) {
          return true;
        }
      }

      return false;
    }
  } // Utility to convert a string into a function which checks a given node’s type
  // for said string.


  function typeFactory(test) {
    return type;

    function type(node) {
      return Boolean(node && node.type === test);
    }
  } // Utility to return true.


  function ok() {
    return true;
  }

  var unistUtilVisitParents = visitParents;



  var CONTINUE = true;
  var SKIP = 'skip';
  var EXIT = false;
  visitParents.CONTINUE = CONTINUE;
  visitParents.SKIP = SKIP;
  visitParents.EXIT = EXIT;

  function visitParents(tree, test, visitor, reverse) {
    var is;

    if (typeof test === 'function' && typeof visitor !== 'function') {
      reverse = visitor;
      visitor = test;
      test = null;
    }

    is = convert_1(test);
    one(tree, null, []); // Visit a single node.

    function one(node, index, parents) {
      var result = [];
      var subresult;

      if (!test || is(node, index, parents[parents.length - 1] || null)) {
        result = toResult(visitor(node, parents));

        if (result[0] === EXIT) {
          return result;
        }
      }

      if (node.children && result[0] !== SKIP) {
        subresult = toResult(all(node.children, parents.concat(node)));
        return subresult[0] === EXIT ? subresult : result;
      }

      return result;
    } // Visit children in `parent`.


    function all(children, parents) {
      var min = -1;
      var step = reverse ? -1 : 1;
      var index = (reverse ? children.length : min) + step;
      var result;

      while (index > min && index < children.length) {
        result = one(children[index], index, parents);

        if (result[0] === EXIT) {
          return result;
        }

        index = typeof result[1] === 'number' ? result[1] : index + step;
      }
    }
  }

  function toResult(value) {
    if (value !== null && typeof value === 'object' && 'length' in value) {
      return value;
    }

    if (typeof value === 'number') {
      return [CONTINUE, value];
    }

    return [value];
  }

  var unistUtilVisit = visit;



  var CONTINUE$1 = unistUtilVisitParents.CONTINUE;
  var SKIP$1 = unistUtilVisitParents.SKIP;
  var EXIT$1 = unistUtilVisitParents.EXIT;
  visit.CONTINUE = CONTINUE$1;
  visit.SKIP = SKIP$1;
  visit.EXIT = EXIT$1;

  function visit(tree, test, visitor, reverse) {
    if (typeof test === 'function' && typeof visitor !== 'function') {
      reverse = visitor;
      visitor = test;
      test = null;
    }

    unistUtilVisitParents(tree, test, overload, reverse);

    function overload(node, parents) {
      var parent = parents[parents.length - 1];
      var index = parent ? parent.children.indexOf(node) : null;
      return visitor(node, index, parent);
    }
  }

  var unistUtilRemovePosition = removePosition;

  function removePosition(node, force) {
    unistUtilVisit(node, force ? hard : soft);
    return node;
  }

  function hard(node) {
    delete node.position;
  }

  function soft(node) {
    node.position = undefined;
  }

  var parse_1 = parse$1;
  var lineFeed$1 = '\n';
  var lineBreaksExpression = /\r\n|\r/g; // Parse the bound file.

  function parse$1() {
    var self = this;
    var value = String(self.file);
    var start = {
      line: 1,
      column: 1,
      offset: 0
    };
    var content = immutable(start);
    var node; // Clean non-unix newlines: `\r\n` and `\r` are all changed to `\n`.
    // This should not affect positional information.

    value = value.replace(lineBreaksExpression, lineFeed$1); // BOM.

    if (value.charCodeAt(0) === 0xfeff) {
      value = value.slice(1);
      content.column++;
      content.offset++;
    }

    node = {
      type: 'root',
      children: self.tokenizeBlock(value, content),
      position: {
        start: start,
        end: self.eof || immutable(start)
      }
    };

    if (!self.options.position) {
      unistUtilRemovePosition(node, true);
    }

    return node;
  }

  var isWhitespaceCharacter = whitespace;
  var fromCode = String.fromCharCode;
  var re$1 = /\s/; // Check if the given character code, or the character code at the first
  // character, is a whitespace character.

  function whitespace(character) {
    return re$1.test(typeof character === 'number' ? fromCode(character) : character.charAt(0));
  }

  var newline_1 = newline;
  var lineFeed$2 = '\n';

  function newline(eat, value, silent) {
    var character = value.charAt(0);
    var length;
    var subvalue;
    var queue;
    var index;

    if (character !== lineFeed$2) {
      return;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    index = 1;
    length = value.length;
    subvalue = character;
    queue = '';

    while (index < length) {
      character = value.charAt(index);

      if (!isWhitespaceCharacter(character)) {
        break;
      }

      queue += character;

      if (character === lineFeed$2) {
        subvalue += queue;
        queue = '';
      }

      index++;
    }

    eat(subvalue);
  }

  /*!
   * repeat-string <https://github.com/jonschlinkert/repeat-string>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  /**
   * Results cache
   */

  var res = '';
  var cache;
  /**
   * Expose `repeat`
   */

  var repeatString = repeat;
  /**
   * Repeat the given `string` the specified `number`
   * of times.
   *
   * **Example:**
   *
   * ```js
   * var repeat = require('repeat-string');
   * repeat('A', 5);
   * //=> AAAAA
   * ```
   *
   * @param {String} `string` The string to repeat
   * @param {Number} `number` The number of times to repeat the string
   * @return {String} Repeated string
   * @api public
   */

  function repeat(str, num) {
    if (typeof str !== 'string') {
      throw new TypeError('expected a string');
    } // cover common, quick use cases


    if (num === 1) return str;
    if (num === 2) return str + str;
    var max = str.length * num;

    if (cache !== str || typeof cache === 'undefined') {
      cache = str;
      res = '';
    } else if (res.length >= max) {
      return res.substr(0, max);
    }

    while (max > res.length && num > 1) {
      if (num & 1) {
        res += str;
      }

      num >>= 1;
      str += str;
    }

    res += str;
    res = res.substr(0, max);
    return res;
  }

  var trimTrailingLines_1 = trimTrailingLines;
  var line = '\n'; // Remove final newline characters from `value`.

  function trimTrailingLines(value) {
    var val = String(value);
    var index = val.length;

    while (val.charAt(--index) === line) {// Empty
    }

    return val.slice(0, index + 1);
  }

  var codeIndented = indentedCode;
  var lineFeed$3 = '\n';
  var tab$1 = '\t';
  var space$1 = ' ';
  var tabSize = 4;
  var codeIndent = repeatString(space$1, tabSize);

  function indentedCode(eat, value, silent) {
    var index = -1;
    var length = value.length;
    var subvalue = '';
    var content = '';
    var subvalueQueue = '';
    var contentQueue = '';
    var character;
    var blankQueue;
    var indent;

    while (++index < length) {
      character = value.charAt(index);

      if (indent) {
        indent = false;
        subvalue += subvalueQueue;
        content += contentQueue;
        subvalueQueue = '';
        contentQueue = '';

        if (character === lineFeed$3) {
          subvalueQueue = character;
          contentQueue = character;
        } else {
          subvalue += character;
          content += character;

          while (++index < length) {
            character = value.charAt(index);

            if (!character || character === lineFeed$3) {
              contentQueue = character;
              subvalueQueue = character;
              break;
            }

            subvalue += character;
            content += character;
          }
        }
      } else if (character === space$1 && value.charAt(index + 1) === character && value.charAt(index + 2) === character && value.charAt(index + 3) === character) {
        subvalueQueue += codeIndent;
        index += 3;
        indent = true;
      } else if (character === tab$1) {
        subvalueQueue += character;
        indent = true;
      } else {
        blankQueue = '';

        while (character === tab$1 || character === space$1) {
          blankQueue += character;
          character = value.charAt(++index);
        }

        if (character !== lineFeed$3) {
          break;
        }

        subvalueQueue += blankQueue + character;
        contentQueue += character;
      }
    }

    if (content) {
      if (silent) {
        return true;
      }

      return eat(subvalue)({
        type: 'code',
        lang: null,
        meta: null,
        value: trimTrailingLines_1(content)
      });
    }
  }

  var codeFenced = fencedCode;
  var lineFeed$4 = '\n';
  var tab$2 = '\t';
  var space$2 = ' ';
  var tilde$1 = '~';
  var graveAccent = '`';
  var minFenceCount = 3;
  var tabSize$1 = 4;

  function fencedCode(eat, value, silent) {
    var self = this;
    var gfm = self.options.gfm;
    var length = value.length + 1;
    var index = 0;
    var subvalue = '';
    var fenceCount;
    var marker;
    var character;
    var flag;
    var lang;
    var meta;
    var queue;
    var content;
    var exdentedContent;
    var closing;
    var exdentedClosing;
    var indent;
    var now;

    if (!gfm) {
      return;
    } // Eat initial spacing.


    while (index < length) {
      character = value.charAt(index);

      if (character !== space$2 && character !== tab$2) {
        break;
      }

      subvalue += character;
      index++;
    }

    indent = index; // Eat the fence.

    character = value.charAt(index);

    if (character !== tilde$1 && character !== graveAccent) {
      return;
    }

    index++;
    marker = character;
    fenceCount = 1;
    subvalue += character;

    while (index < length) {
      character = value.charAt(index);

      if (character !== marker) {
        break;
      }

      subvalue += character;
      fenceCount++;
      index++;
    }

    if (fenceCount < minFenceCount) {
      return;
    } // Eat spacing before flag.


    while (index < length) {
      character = value.charAt(index);

      if (character !== space$2 && character !== tab$2) {
        break;
      }

      subvalue += character;
      index++;
    } // Eat flag.


    flag = '';
    queue = '';

    while (index < length) {
      character = value.charAt(index);

      if (character === lineFeed$4 || marker === graveAccent && character === marker) {
        break;
      }

      if (character === space$2 || character === tab$2) {
        queue += character;
      } else {
        flag += queue + character;
        queue = '';
      }

      index++;
    }

    character = value.charAt(index);

    if (character && character !== lineFeed$4) {
      return;
    }

    if (silent) {
      return true;
    }

    now = eat.now();
    now.column += subvalue.length;
    now.offset += subvalue.length;
    subvalue += flag;
    flag = self.decode.raw(self.unescape(flag), now);

    if (queue) {
      subvalue += queue;
    }

    queue = '';
    closing = '';
    exdentedClosing = '';
    content = '';
    exdentedContent = '';
    var skip = true; // Eat content.

    while (index < length) {
      character = value.charAt(index);
      content += closing;
      exdentedContent += exdentedClosing;
      closing = '';
      exdentedClosing = '';

      if (character !== lineFeed$4) {
        content += character;
        exdentedClosing += character;
        index++;
        continue;
      } // The first line feed is ignored. Others aren’t.


      if (skip) {
        subvalue += character;
        skip = false;
      } else {
        closing += character;
        exdentedClosing += character;
      }

      queue = '';
      index++;

      while (index < length) {
        character = value.charAt(index);

        if (character !== space$2) {
          break;
        }

        queue += character;
        index++;
      }

      closing += queue;
      exdentedClosing += queue.slice(indent);

      if (queue.length >= tabSize$1) {
        continue;
      }

      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (character !== marker) {
          break;
        }

        queue += character;
        index++;
      }

      closing += queue;
      exdentedClosing += queue;

      if (queue.length < fenceCount) {
        continue;
      }

      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (character !== space$2 && character !== tab$2) {
          break;
        }

        closing += character;
        exdentedClosing += character;
        index++;
      }

      if (!character || character === lineFeed$4) {
        break;
      }
    }

    subvalue += content + closing; // Get lang and meta from the flag.

    index = -1;
    length = flag.length;

    while (++index < length) {
      character = flag.charAt(index);

      if (character === space$2 || character === tab$2) {
        if (!lang) {
          lang = flag.slice(0, index);
        }
      } else if (lang) {
        meta = flag.slice(index);
        break;
      }
    }

    return eat(subvalue)({
      type: 'code',
      lang: lang || flag || null,
      meta: meta || null,
      value: exdentedContent
    });
  }

  var trim_1 = createCommonjsModule(function (module, exports) {
  exports = module.exports = trim;

  function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
  }

  exports.left = function (str) {
    return str.replace(/^\s*/, '');
  };

  exports.right = function (str) {
    return str.replace(/\s*$/, '');
  };
  });
  var trim_2 = trim_1.left;
  var trim_3 = trim_1.right;

  var interrupt_1 = interrupt;

  function interrupt(interruptors, tokenizers, ctx, params) {
    var length = interruptors.length;
    var index = -1;
    var interruptor;
    var config;

    while (++index < length) {
      interruptor = interruptors[index];
      config = interruptor[1] || {};

      if (config.pedantic !== undefined && config.pedantic !== ctx.options.pedantic) {
        continue;
      }

      if (config.commonmark !== undefined && config.commonmark !== ctx.options.commonmark) {
        continue;
      }

      if (tokenizers[interruptor[0]].apply(ctx, params)) {
        return true;
      }
    }

    return false;
  }

  var blockquote_1 = blockquote;
  var lineFeed$5 = '\n';
  var tab$3 = '\t';
  var space$3 = ' ';
  var greaterThan = '>';

  function blockquote(eat, value, silent) {
    var self = this;
    var offsets = self.offset;
    var tokenizers = self.blockTokenizers;
    var interruptors = self.interruptBlockquote;
    var now = eat.now();
    var currentLine = now.line;
    var length = value.length;
    var values = [];
    var contents = [];
    var indents = [];
    var add;
    var index = 0;
    var character;
    var rest;
    var nextIndex;
    var content;
    var line;
    var startIndex;
    var prefixed;
    var exit;

    while (index < length) {
      character = value.charAt(index);

      if (character !== space$3 && character !== tab$3) {
        break;
      }

      index++;
    }

    if (value.charAt(index) !== greaterThan) {
      return;
    }

    if (silent) {
      return true;
    }

    index = 0;

    while (index < length) {
      nextIndex = value.indexOf(lineFeed$5, index);
      startIndex = index;
      prefixed = false;

      if (nextIndex === -1) {
        nextIndex = length;
      }

      while (index < length) {
        character = value.charAt(index);

        if (character !== space$3 && character !== tab$3) {
          break;
        }

        index++;
      }

      if (value.charAt(index) === greaterThan) {
        index++;
        prefixed = true;

        if (value.charAt(index) === space$3) {
          index++;
        }
      } else {
        index = startIndex;
      }

      content = value.slice(index, nextIndex);

      if (!prefixed && !trim_1(content)) {
        index = startIndex;
        break;
      }

      if (!prefixed) {
        rest = value.slice(index); // Check if the following code contains a possible block.

        if (interrupt_1(interruptors, tokenizers, self, [eat, rest, true])) {
          break;
        }
      }

      line = startIndex === index ? content : value.slice(startIndex, nextIndex);
      indents.push(index - startIndex);
      values.push(line);
      contents.push(content);
      index = nextIndex + 1;
    }

    index = -1;
    length = indents.length;
    add = eat(values.join(lineFeed$5));

    while (++index < length) {
      offsets[currentLine] = (offsets[currentLine] || 0) + indents[index];
      currentLine++;
    }

    exit = self.enterBlock();
    contents = self.tokenizeBlock(contents.join(lineFeed$5), now);
    exit();
    return add({
      type: 'blockquote',
      children: contents
    });
  }

  var headingAtx = atxHeading;
  var lineFeed$6 = '\n';
  var tab$4 = '\t';
  var space$4 = ' ';
  var numberSign$1 = '#';
  var maxFenceCount = 6;

  function atxHeading(eat, value, silent) {
    var self = this;
    var pedantic = self.options.pedantic;
    var length = value.length + 1;
    var index = -1;
    var now = eat.now();
    var subvalue = '';
    var content = '';
    var character;
    var queue;
    var depth; // Eat initial spacing.

    while (++index < length) {
      character = value.charAt(index);

      if (character !== space$4 && character !== tab$4) {
        index--;
        break;
      }

      subvalue += character;
    } // Eat hashes.


    depth = 0;

    while (++index <= length) {
      character = value.charAt(index);

      if (character !== numberSign$1) {
        index--;
        break;
      }

      subvalue += character;
      depth++;
    }

    if (depth > maxFenceCount) {
      return;
    }

    if (!depth || !pedantic && value.charAt(index + 1) === numberSign$1) {
      return;
    }

    length = value.length + 1; // Eat intermediate white-space.

    queue = '';

    while (++index < length) {
      character = value.charAt(index);

      if (character !== space$4 && character !== tab$4) {
        index--;
        break;
      }

      queue += character;
    } // Exit when not in pedantic mode without spacing.


    if (!pedantic && queue.length === 0 && character && character !== lineFeed$6) {
      return;
    }

    if (silent) {
      return true;
    } // Eat content.


    subvalue += queue;
    queue = '';
    content = '';

    while (++index < length) {
      character = value.charAt(index);

      if (!character || character === lineFeed$6) {
        break;
      }

      if (character !== space$4 && character !== tab$4 && character !== numberSign$1) {
        content += queue + character;
        queue = '';
        continue;
      }

      while (character === space$4 || character === tab$4) {
        queue += character;
        character = value.charAt(++index);
      } // `#` without a queue is part of the content.


      if (!pedantic && content && !queue && character === numberSign$1) {
        content += character;
        continue;
      }

      while (character === numberSign$1) {
        queue += character;
        character = value.charAt(++index);
      }

      while (character === space$4 || character === tab$4) {
        queue += character;
        character = value.charAt(++index);
      }

      index--;
    }

    now.column += subvalue.length;
    now.offset += subvalue.length;
    subvalue += content + queue;
    return eat(subvalue)({
      type: 'heading',
      depth: depth,
      children: self.tokenizeInline(content, now)
    });
  }

  var thematicBreak_1 = thematicBreak;
  var tab$5 = '\t';
  var lineFeed$7 = '\n';
  var space$5 = ' ';
  var asterisk = '*';
  var dash$1 = '-';
  var underscore = '_';
  var maxCount = 3;

  function thematicBreak(eat, value, silent) {
    var index = -1;
    var length = value.length + 1;
    var subvalue = '';
    var character;
    var marker;
    var markerCount;
    var queue;

    while (++index < length) {
      character = value.charAt(index);

      if (character !== tab$5 && character !== space$5) {
        break;
      }

      subvalue += character;
    }

    if (character !== asterisk && character !== dash$1 && character !== underscore) {
      return;
    }

    marker = character;
    subvalue += character;
    markerCount = 1;
    queue = '';

    while (++index < length) {
      character = value.charAt(index);

      if (character === marker) {
        markerCount++;
        subvalue += queue + marker;
        queue = '';
      } else if (character === space$5) {
        queue += character;
      } else if (markerCount >= maxCount && (!character || character === lineFeed$7)) {
        subvalue += queue;

        if (silent) {
          return true;
        }

        return eat(subvalue)({
          type: 'thematicBreak'
        });
      } else {
        return;
      }
    }
  }

  var getIndentation = indentation;
  var tab$6 = '\t';
  var space$6 = ' ';
  var spaceSize = 1;
  var tabSize$2 = 4; // Gets indentation information for a line.

  function indentation(value) {
    var index = 0;
    var indent = 0;
    var character = value.charAt(index);
    var stops = {};
    var size;

    while (character === tab$6 || character === space$6) {
      size = character === tab$6 ? tabSize$2 : spaceSize;
      indent += size;

      if (size > 1) {
        indent = Math.floor(indent / size) * size;
      }

      stops[indent] = index;
      character = value.charAt(++index);
    }

    return {
      indent: indent,
      stops: stops
    };
  }

  var removeIndentation = indentation$1;
  var tab$7 = '\t';
  var lineFeed$8 = '\n';
  var space$7 = ' ';
  var exclamationMark = '!'; // Remove the minimum indent from every line in `value`.  Supports both tab,
  // spaced, and mixed indentation (as well as possible).

  function indentation$1(value, maximum) {
    var values = value.split(lineFeed$8);
    var position = values.length + 1;
    var minIndent = Infinity;
    var matrix = [];
    var index;
    var indentation;
    var stops;
    var padding;
    values.unshift(repeatString(space$7, maximum) + exclamationMark);

    while (position--) {
      indentation = getIndentation(values[position]);
      matrix[position] = indentation.stops;

      if (trim_1(values[position]).length === 0) {
        continue;
      }

      if (indentation.indent) {
        if (indentation.indent > 0 && indentation.indent < minIndent) {
          minIndent = indentation.indent;
        }
      } else {
        minIndent = Infinity;
        break;
      }
    }

    if (minIndent !== Infinity) {
      position = values.length;

      while (position--) {
        stops = matrix[position];
        index = minIndent;

        while (index && !(index in stops)) {
          index--;
        }

        if (trim_1(values[position]).length !== 0 && minIndent && index !== minIndent) {
          padding = tab$7;
        } else {
          padding = '';
        }

        values[position] = padding + values[position].slice(index in stops ? stops[index] + 1 : 0);
      }
    }

    values.shift();
    return values.join(lineFeed$8);
  }

  var list_1 = list;
  var asterisk$1 = '*';
  var underscore$1 = '_';
  var plusSign = '+';
  var dash$2 = '-';
  var dot$1 = '.';
  var space$8 = ' ';
  var lineFeed$9 = '\n';
  var tab$8 = '\t';
  var rightParenthesis = ')';
  var lowercaseX$1 = 'x';
  var tabSize$3 = 4;
  var looseListItemExpression = /\n\n(?!\s*$)/;
  var taskItemExpression = /^\[([ \t]|x|X)][ \t]/;
  var bulletExpression = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/;
  var pedanticBulletExpression = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/;
  var initialIndentExpression = /^( {1,4}|\t)?/gm;

  function list(eat, value, silent) {
    var self = this;
    var commonmark = self.options.commonmark;
    var pedantic = self.options.pedantic;
    var tokenizers = self.blockTokenizers;
    var interuptors = self.interruptList;
    var index = 0;
    var length = value.length;
    var start = null;
    var size = 0;
    var queue;
    var ordered;
    var character;
    var marker;
    var nextIndex;
    var startIndex;
    var prefixed;
    var currentMarker;
    var content;
    var line;
    var prevEmpty;
    var empty;
    var items;
    var allLines;
    var emptyLines;
    var item;
    var enterTop;
    var exitBlockquote;
    var spread = false;
    var node;
    var now;
    var end;
    var indented;

    while (index < length) {
      character = value.charAt(index);

      if (character === tab$8) {
        size += tabSize$3 - size % tabSize$3;
      } else if (character === space$8) {
        size++;
      } else {
        break;
      }

      index++;
    }

    if (size >= tabSize$3) {
      return;
    }

    character = value.charAt(index);

    if (character === asterisk$1 || character === plusSign || character === dash$2) {
      marker = character;
      ordered = false;
    } else {
      ordered = true;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (!isDecimal(character)) {
          break;
        }

        queue += character;
        index++;
      }

      character = value.charAt(index);

      if (!queue || !(character === dot$1 || commonmark && character === rightParenthesis)) {
        return;
      }

      start = parseInt(queue, 10);
      marker = character;
    }

    character = value.charAt(++index);

    if (character !== space$8 && character !== tab$8 && (pedantic || character !== lineFeed$9 && character !== '')) {
      return;
    }

    if (silent) {
      return true;
    }

    index = 0;
    items = [];
    allLines = [];
    emptyLines = [];

    while (index < length) {
      nextIndex = value.indexOf(lineFeed$9, index);
      startIndex = index;
      prefixed = false;
      indented = false;

      if (nextIndex === -1) {
        nextIndex = length;
      }

      end = index + tabSize$3;
      size = 0;

      while (index < length) {
        character = value.charAt(index);

        if (character === tab$8) {
          size += tabSize$3 - size % tabSize$3;
        } else if (character === space$8) {
          size++;
        } else {
          break;
        }

        index++;
      }

      if (size >= tabSize$3) {
        indented = true;
      }

      if (item && size >= item.indent) {
        indented = true;
      }

      character = value.charAt(index);
      currentMarker = null;

      if (!indented) {
        if (character === asterisk$1 || character === plusSign || character === dash$2) {
          currentMarker = character;
          index++;
          size++;
        } else {
          queue = '';

          while (index < length) {
            character = value.charAt(index);

            if (!isDecimal(character)) {
              break;
            }

            queue += character;
            index++;
          }

          character = value.charAt(index);
          index++;

          if (queue && (character === dot$1 || commonmark && character === rightParenthesis)) {
            currentMarker = character;
            size += queue.length + 1;
          }
        }

        if (currentMarker) {
          character = value.charAt(index);

          if (character === tab$8) {
            size += tabSize$3 - size % tabSize$3;
            index++;
          } else if (character === space$8) {
            end = index + tabSize$3;

            while (index < end) {
              if (value.charAt(index) !== space$8) {
                break;
              }

              index++;
              size++;
            }

            if (index === end && value.charAt(index) === space$8) {
              index -= tabSize$3 - 1;
              size -= tabSize$3 - 1;
            }
          } else if (character !== lineFeed$9 && character !== '') {
            currentMarker = null;
          }
        }
      }

      if (currentMarker) {
        if (!pedantic && marker !== currentMarker) {
          break;
        }

        prefixed = true;
      } else {
        if (!commonmark && !indented && value.charAt(startIndex) === space$8) {
          indented = true;
        } else if (commonmark && item) {
          indented = size >= item.indent || size > tabSize$3;
        }

        prefixed = false;
        index = startIndex;
      }

      line = value.slice(startIndex, nextIndex);
      content = startIndex === index ? line : value.slice(index, nextIndex);

      if (currentMarker === asterisk$1 || currentMarker === underscore$1 || currentMarker === dash$2) {
        if (tokenizers.thematicBreak.call(self, eat, line, true)) {
          break;
        }
      }

      prevEmpty = empty;
      empty = !prefixed && !trim_1(content).length;

      if (indented && item) {
        item.value = item.value.concat(emptyLines, line);
        allLines = allLines.concat(emptyLines, line);
        emptyLines = [];
      } else if (prefixed) {
        if (emptyLines.length !== 0) {
          spread = true;
          item.value.push('');
          item.trail = emptyLines.concat();
        }

        item = {
          value: [line],
          indent: size,
          trail: []
        };
        items.push(item);
        allLines = allLines.concat(emptyLines, line);
        emptyLines = [];
      } else if (empty) {
        if (prevEmpty && !commonmark) {
          break;
        }

        emptyLines.push(line);
      } else {
        if (prevEmpty) {
          break;
        }

        if (interrupt_1(interuptors, tokenizers, self, [eat, line, true])) {
          break;
        }

        item.value = item.value.concat(emptyLines, line);
        allLines = allLines.concat(emptyLines, line);
        emptyLines = [];
      }

      index = nextIndex + 1;
    }

    node = eat(allLines.join(lineFeed$9)).reset({
      type: 'list',
      ordered: ordered,
      start: start,
      spread: spread,
      children: []
    });
    enterTop = self.enterList();
    exitBlockquote = self.enterBlock();
    index = -1;
    length = items.length;

    while (++index < length) {
      item = items[index].value.join(lineFeed$9);
      now = eat.now();
      eat(item)(listItem(self, item, now), node);
      item = items[index].trail.join(lineFeed$9);

      if (index !== length - 1) {
        item += lineFeed$9;
      }

      eat(item);
    }

    enterTop();
    exitBlockquote();
    return node;
  }

  function listItem(ctx, value, position) {
    var offsets = ctx.offset;
    var fn = ctx.options.pedantic ? pedanticListItem : normalListItem;
    var checked = null;
    var task;
    var indent;
    value = fn.apply(null, arguments);

    if (ctx.options.gfm) {
      task = value.match(taskItemExpression);

      if (task) {
        indent = task[0].length;
        checked = task[1].toLowerCase() === lowercaseX$1;
        offsets[position.line] += indent;
        value = value.slice(indent);
      }
    }

    return {
      type: 'listItem',
      spread: looseListItemExpression.test(value),
      checked: checked,
      children: ctx.tokenizeBlock(value, position)
    };
  } // Create a list-item using overly simple mechanics.


  function pedanticListItem(ctx, value, position) {
    var offsets = ctx.offset;
    var line = position.line; // Remove the list-item’s bullet.

    value = value.replace(pedanticBulletExpression, replacer); // The initial line was also matched by the below, so we reset the `line`.

    line = position.line;
    return value.replace(initialIndentExpression, replacer); // A simple replacer which removed all matches, and adds their length to
    // `offset`.

    function replacer($0) {
      offsets[line] = (offsets[line] || 0) + $0.length;
      line++;
      return '';
    }
  } // Create a list-item using sane mechanics.


  function normalListItem(ctx, value, position) {
    var offsets = ctx.offset;
    var line = position.line;
    var max;
    var bullet;
    var rest;
    var lines;
    var trimmedLines;
    var index;
    var length; // Remove the list-item’s bullet.

    value = value.replace(bulletExpression, replacer);
    lines = value.split(lineFeed$9);
    trimmedLines = removeIndentation(value, getIndentation(max).indent).split(lineFeed$9); // We replaced the initial bullet with something else above, which was used
    // to trick `removeIndentation` into removing some more characters when
    // possible.  However, that could result in the initial line to be stripped
    // more than it should be.

    trimmedLines[0] = rest;
    offsets[line] = (offsets[line] || 0) + bullet.length;
    line++;
    index = 0;
    length = lines.length;

    while (++index < length) {
      offsets[line] = (offsets[line] || 0) + lines[index].length - trimmedLines[index].length;
      line++;
    }

    return trimmedLines.join(lineFeed$9);
    /* eslint-disable-next-line max-params */

    function replacer($0, $1, $2, $3, $4) {
      bullet = $1 + $2 + $3;
      rest = $4; // Make sure that the first nine numbered list items can indent with an
      // extra space.  That is, when the bullet did not receive an extra final
      // space.

      if (Number($2) < 10 && bullet.length % 2 === 1) {
        $2 = space$8 + $2;
      }

      max = $1 + repeatString(space$8, $2.length) + $3;
      return max + rest;
    }
  }

  var headingSetext = setextHeading;
  var lineFeed$a = '\n';
  var tab$9 = '\t';
  var space$9 = ' ';
  var equalsTo$1 = '=';
  var dash$3 = '-';
  var maxIndent = 3;
  var equalsToDepth = 1;
  var dashDepth = 2;

  function setextHeading(eat, value, silent) {
    var self = this;
    var now = eat.now();
    var length = value.length;
    var index = -1;
    var subvalue = '';
    var content;
    var queue;
    var character;
    var marker;
    var depth; // Eat initial indentation.

    while (++index < length) {
      character = value.charAt(index);

      if (character !== space$9 || index >= maxIndent) {
        index--;
        break;
      }

      subvalue += character;
    } // Eat content.


    content = '';
    queue = '';

    while (++index < length) {
      character = value.charAt(index);

      if (character === lineFeed$a) {
        index--;
        break;
      }

      if (character === space$9 || character === tab$9) {
        queue += character;
      } else {
        content += queue + character;
        queue = '';
      }
    }

    now.column += subvalue.length;
    now.offset += subvalue.length;
    subvalue += content + queue; // Ensure the content is followed by a newline and a valid marker.

    character = value.charAt(++index);
    marker = value.charAt(++index);

    if (character !== lineFeed$a || marker !== equalsTo$1 && marker !== dash$3) {
      return;
    }

    subvalue += character; // Eat Setext-line.

    queue = marker;
    depth = marker === equalsTo$1 ? equalsToDepth : dashDepth;

    while (++index < length) {
      character = value.charAt(index);

      if (character !== marker) {
        if (character !== lineFeed$a) {
          return;
        }

        index--;
        break;
      }

      queue += character;
    }

    if (silent) {
      return true;
    }

    return eat(subvalue + queue)({
      type: 'heading',
      depth: depth,
      children: self.tokenizeInline(content, now)
    });
  }

  var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
  var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
  var singleQuoted = "'[^']*'";
  var doubleQuoted = '"[^"]*"';
  var attributeValue = '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + ')';
  var attribute = '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
  var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
  var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
  var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
  var processing = '<[?].*?[?]>';
  var declaration = '<![A-Za-z]+\\s+[^>]*>';
  var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
  var openCloseTag = new RegExp('^(?:' + openTag + '|' + closeTag + ')');
  var tag = new RegExp('^(?:' + openTag + '|' + closeTag + '|' + comment + '|' + processing + '|' + declaration + '|' + cdata + ')');

  var html = {
  	openCloseTag: openCloseTag,
  	tag: tag
  };

  var openCloseTag$1 = html.openCloseTag;

  var htmlBlock = blockHtml;
  var tab$a = '\t';
  var space$a = ' ';
  var lineFeed$b = '\n';
  var lessThan$1 = '<';
  var rawOpenExpression = /^<(script|pre|style)(?=(\s|>|$))/i;
  var rawCloseExpression = /<\/(script|pre|style)>/i;
  var commentOpenExpression = /^<!--/;
  var commentCloseExpression = /-->/;
  var instructionOpenExpression = /^<\?/;
  var instructionCloseExpression = /\?>/;
  var directiveOpenExpression = /^<![A-Za-z]/;
  var directiveCloseExpression = />/;
  var cdataOpenExpression = /^<!\[CDATA\[/;
  var cdataCloseExpression = /\]\]>/;
  var elementCloseExpression = /^$/;
  var otherElementOpenExpression = new RegExp(openCloseTag$1.source + '\\s*$');

  function blockHtml(eat, value, silent) {
    var self = this;
    var blocks = self.options.blocks.join('|');
    var elementOpenExpression = new RegExp('^</?(' + blocks + ')(?=(\\s|/?>|$))', 'i');
    var length = value.length;
    var index = 0;
    var next;
    var line;
    var offset;
    var character;
    var count;
    var sequence;
    var subvalue;
    var sequences = [[rawOpenExpression, rawCloseExpression, true], [commentOpenExpression, commentCloseExpression, true], [instructionOpenExpression, instructionCloseExpression, true], [directiveOpenExpression, directiveCloseExpression, true], [cdataOpenExpression, cdataCloseExpression, true], [elementOpenExpression, elementCloseExpression, true], [otherElementOpenExpression, elementCloseExpression, false]]; // Eat initial spacing.

    while (index < length) {
      character = value.charAt(index);

      if (character !== tab$a && character !== space$a) {
        break;
      }

      index++;
    }

    if (value.charAt(index) !== lessThan$1) {
      return;
    }

    next = value.indexOf(lineFeed$b, index + 1);
    next = next === -1 ? length : next;
    line = value.slice(index, next);
    offset = -1;
    count = sequences.length;

    while (++offset < count) {
      if (sequences[offset][0].test(line)) {
        sequence = sequences[offset];
        break;
      }
    }

    if (!sequence) {
      return;
    }

    if (silent) {
      return sequence[2];
    }

    index = next;

    if (!sequence[1].test(line)) {
      while (index < length) {
        next = value.indexOf(lineFeed$b, index + 1);
        next = next === -1 ? length : next;
        line = value.slice(index + 1, next);

        if (sequence[1].test(line)) {
          if (line) {
            index = next;
          }

          break;
        }

        index = next;
      }
    }

    subvalue = value.slice(0, index);
    return eat(subvalue)({
      type: 'html',
      value: subvalue
    });
  }

  var collapseWhiteSpace = collapse; // `collapse(' \t\nbar \nbaz\t') // ' bar baz '`

  function collapse(value) {
    return String(value).replace(/\s+/g, ' ');
  }

  var normalize_1 = normalize; // Normalize an identifier.  Collapses multiple white space characters into a
  // single space, and removes casing.

  function normalize(value) {
    return collapseWhiteSpace(value).toLowerCase();
  }

  var footnoteDefinition_1 = footnoteDefinition;
  footnoteDefinition.notInList = true;
  footnoteDefinition.notInBlock = true;
  var backslash$1 = '\\';
  var lineFeed$c = '\n';
  var tab$b = '\t';
  var space$b = ' ';
  var leftSquareBracket = '[';
  var rightSquareBracket = ']';
  var caret$1 = '^';
  var colon$1 = ':';
  var EXPRESSION_INITIAL_TAB = /^( {4}|\t)?/gm;

  function footnoteDefinition(eat, value, silent) {
    var self = this;
    var offsets = self.offset;
    var index;
    var length;
    var subvalue;
    var now;
    var currentLine;
    var content;
    var queue;
    var subqueue;
    var character;
    var identifier;
    var add;
    var exit;

    if (!self.options.footnotes) {
      return;
    }

    index = 0;
    length = value.length;
    subvalue = '';
    now = eat.now();
    currentLine = now.line;

    while (index < length) {
      character = value.charAt(index);

      if (!isWhitespaceCharacter(character)) {
        break;
      }

      subvalue += character;
      index++;
    }

    if (value.charAt(index) !== leftSquareBracket || value.charAt(index + 1) !== caret$1) {
      return;
    }

    subvalue += leftSquareBracket + caret$1;
    index = subvalue.length;
    queue = '';

    while (index < length) {
      character = value.charAt(index);

      if (character === rightSquareBracket) {
        break;
      } else if (character === backslash$1) {
        queue += character;
        index++;
        character = value.charAt(index);
      }

      queue += character;
      index++;
    }

    if (!queue || value.charAt(index) !== rightSquareBracket || value.charAt(index + 1) !== colon$1) {
      return;
    }

    if (silent) {
      return true;
    }

    identifier = queue;
    subvalue += queue + rightSquareBracket + colon$1;
    index = subvalue.length;

    while (index < length) {
      character = value.charAt(index);

      if (character !== tab$b && character !== space$b) {
        break;
      }

      subvalue += character;
      index++;
    }

    now.column += subvalue.length;
    now.offset += subvalue.length;
    queue = '';
    content = '';
    subqueue = '';

    while (index < length) {
      character = value.charAt(index);

      if (character === lineFeed$c) {
        subqueue = character;
        index++;

        while (index < length) {
          character = value.charAt(index);

          if (character !== lineFeed$c) {
            break;
          }

          subqueue += character;
          index++;
        }

        queue += subqueue;
        subqueue = '';

        while (index < length) {
          character = value.charAt(index);

          if (character !== space$b) {
            break;
          }

          subqueue += character;
          index++;
        }

        if (subqueue.length === 0) {
          break;
        }

        queue += subqueue;
      }

      if (queue) {
        content += queue;
        queue = '';
      }

      content += character;
      index++;
    }

    subvalue += content;
    content = content.replace(EXPRESSION_INITIAL_TAB, function (line) {
      offsets[currentLine] = (offsets[currentLine] || 0) + line.length;
      currentLine++;
      return '';
    });
    add = eat(subvalue);
    exit = self.enterBlock();
    content = self.tokenizeBlock(content, now);
    exit();
    return add({
      type: 'footnoteDefinition',
      identifier: normalize_1(identifier),
      label: identifier,
      children: content
    });
  }

  var definition_1 = definition;
  var quotationMark = '"';
  var apostrophe = "'";
  var backslash$2 = '\\';
  var lineFeed$d = '\n';
  var tab$c = '\t';
  var space$c = ' ';
  var leftSquareBracket$1 = '[';
  var rightSquareBracket$1 = ']';
  var leftParenthesis = '(';
  var rightParenthesis$1 = ')';
  var colon$2 = ':';
  var lessThan$2 = '<';
  var greaterThan$1 = '>';

  function definition(eat, value, silent) {
    var self = this;
    var commonmark = self.options.commonmark;
    var index = 0;
    var length = value.length;
    var subvalue = '';
    var beforeURL;
    var beforeTitle;
    var queue;
    var character;
    var test;
    var identifier;
    var url;
    var title;

    while (index < length) {
      character = value.charAt(index);

      if (character !== space$c && character !== tab$c) {
        break;
      }

      subvalue += character;
      index++;
    }

    character = value.charAt(index);

    if (character !== leftSquareBracket$1) {
      return;
    }

    index++;
    subvalue += character;
    queue = '';

    while (index < length) {
      character = value.charAt(index);

      if (character === rightSquareBracket$1) {
        break;
      } else if (character === backslash$2) {
        queue += character;
        index++;
        character = value.charAt(index);
      }

      queue += character;
      index++;
    }

    if (!queue || value.charAt(index) !== rightSquareBracket$1 || value.charAt(index + 1) !== colon$2) {
      return;
    }

    identifier = queue;
    subvalue += queue + rightSquareBracket$1 + colon$2;
    index = subvalue.length;
    queue = '';

    while (index < length) {
      character = value.charAt(index);

      if (character !== tab$c && character !== space$c && character !== lineFeed$d) {
        break;
      }

      subvalue += character;
      index++;
    }

    character = value.charAt(index);
    queue = '';
    beforeURL = subvalue;

    if (character === lessThan$2) {
      index++;

      while (index < length) {
        character = value.charAt(index);

        if (!isEnclosedURLCharacter(character)) {
          break;
        }

        queue += character;
        index++;
      }

      character = value.charAt(index);

      if (character === isEnclosedURLCharacter.delimiter) {
        subvalue += lessThan$2 + queue + character;
        index++;
      } else {
        if (commonmark) {
          return;
        }

        index -= queue.length + 1;
        queue = '';
      }
    }

    if (!queue) {
      while (index < length) {
        character = value.charAt(index);

        if (!isUnclosedURLCharacter(character)) {
          break;
        }

        queue += character;
        index++;
      }

      subvalue += queue;
    }

    if (!queue) {
      return;
    }

    url = queue;
    queue = '';

    while (index < length) {
      character = value.charAt(index);

      if (character !== tab$c && character !== space$c && character !== lineFeed$d) {
        break;
      }

      queue += character;
      index++;
    }

    character = value.charAt(index);
    test = null;

    if (character === quotationMark) {
      test = quotationMark;
    } else if (character === apostrophe) {
      test = apostrophe;
    } else if (character === leftParenthesis) {
      test = rightParenthesis$1;
    }

    if (!test) {
      queue = '';
      index = subvalue.length;
    } else if (queue) {
      subvalue += queue + character;
      index = subvalue.length;
      queue = '';

      while (index < length) {
        character = value.charAt(index);

        if (character === test) {
          break;
        }

        if (character === lineFeed$d) {
          index++;
          character = value.charAt(index);

          if (character === lineFeed$d || character === test) {
            return;
          }

          queue += lineFeed$d;
        }

        queue += character;
        index++;
      }

      character = value.charAt(index);

      if (character !== test) {
        return;
      }

      beforeTitle = subvalue;
      subvalue += queue + character;
      index++;
      title = queue;
      queue = '';
    } else {
      return;
    }

    while (index < length) {
      character = value.charAt(index);

      if (character !== tab$c && character !== space$c) {
        break;
      }

      subvalue += character;
      index++;
    }

    character = value.charAt(index);

    if (!character || character === lineFeed$d) {
      if (silent) {
        return true;
      }

      beforeURL = eat(beforeURL).test().end;
      url = self.decode.raw(self.unescape(url), beforeURL, {
        nonTerminated: false
      });

      if (title) {
        beforeTitle = eat(beforeTitle).test().end;
        title = self.decode.raw(self.unescape(title), beforeTitle);
      }

      return eat(subvalue)({
        type: 'definition',
        identifier: normalize_1(identifier),
        label: identifier,
        title: title || null,
        url: url
      });
    }
  } // Check if `character` can be inside an enclosed URI.


  function isEnclosedURLCharacter(character) {
    return character !== greaterThan$1 && character !== leftSquareBracket$1 && character !== rightSquareBracket$1;
  }

  isEnclosedURLCharacter.delimiter = greaterThan$1; // Check if `character` can be inside an unclosed URI.

  function isUnclosedURLCharacter(character) {
    return character !== leftSquareBracket$1 && character !== rightSquareBracket$1 && !isWhitespaceCharacter(character);
  }

  var table_1 = table;
  var tab$d = '\t';
  var lineFeed$e = '\n';
  var space$d = ' ';
  var dash$4 = '-';
  var colon$3 = ':';
  var backslash$3 = '\\';
  var verticalBar = '|';
  var minColumns = 1;
  var minRows = 2;
  var left = 'left';
  var center = 'center';
  var right = 'right';

  function table(eat, value, silent) {
    var self = this;
    var index;
    var alignments;
    var alignment;
    var subvalue;
    var row;
    var length;
    var lines;
    var queue;
    var character;
    var hasDash;
    var align;
    var cell;
    var preamble;
    var now;
    var position;
    var lineCount;
    var line;
    var rows;
    var table;
    var lineIndex;
    var pipeIndex;
    var first; // Exit when not in gfm-mode.

    if (!self.options.gfm) {
      return;
    } // Get the rows.
    // Detecting tables soon is hard, so there are some checks for performance
    // here, such as the minimum number of rows, and allowed characters in the
    // alignment row.


    index = 0;
    lineCount = 0;
    length = value.length + 1;
    lines = [];

    while (index < length) {
      lineIndex = value.indexOf(lineFeed$e, index);
      pipeIndex = value.indexOf(verticalBar, index + 1);

      if (lineIndex === -1) {
        lineIndex = value.length;
      }

      if (pipeIndex === -1 || pipeIndex > lineIndex) {
        if (lineCount < minRows) {
          return;
        }

        break;
      }

      lines.push(value.slice(index, lineIndex));
      lineCount++;
      index = lineIndex + 1;
    } // Parse the alignment row.


    subvalue = lines.join(lineFeed$e);
    alignments = lines.splice(1, 1)[0] || [];
    index = 0;
    length = alignments.length;
    lineCount--;
    alignment = false;
    align = [];

    while (index < length) {
      character = alignments.charAt(index);

      if (character === verticalBar) {
        hasDash = null;

        if (alignment === false) {
          if (first === false) {
            return;
          }
        } else {
          align.push(alignment);
          alignment = false;
        }

        first = false;
      } else if (character === dash$4) {
        hasDash = true;
        alignment = alignment || null;
      } else if (character === colon$3) {
        if (alignment === left) {
          alignment = center;
        } else if (hasDash && alignment === null) {
          alignment = right;
        } else {
          alignment = left;
        }
      } else if (!isWhitespaceCharacter(character)) {
        return;
      }

      index++;
    }

    if (alignment !== false) {
      align.push(alignment);
    } // Exit when without enough columns.


    if (align.length < minColumns) {
      return;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    } // Parse the rows.


    position = -1;
    rows = [];
    table = eat(subvalue).reset({
      type: 'table',
      align: align,
      children: rows
    });

    while (++position < lineCount) {
      line = lines[position];
      row = {
        type: 'tableRow',
        children: []
      }; // Eat a newline character when this is not the first row.

      if (position) {
        eat(lineFeed$e);
      } // Eat the row.


      eat(line).reset(row, table);
      length = line.length + 1;
      index = 0;
      queue = '';
      cell = '';
      preamble = true;

      while (index < length) {
        character = line.charAt(index);

        if (character === tab$d || character === space$d) {
          if (cell) {
            queue += character;
          } else {
            eat(character);
          }

          index++;
          continue;
        }

        if (character === '' || character === verticalBar) {
          if (preamble) {
            eat(character);
          } else {
            if ((cell || character) && !preamble) {
              subvalue = cell;

              if (queue.length > 1) {
                if (character) {
                  subvalue += queue.slice(0, queue.length - 1);
                  queue = queue.charAt(queue.length - 1);
                } else {
                  subvalue += queue;
                  queue = '';
                }
              }

              now = eat.now();
              eat(subvalue)({
                type: 'tableCell',
                children: self.tokenizeInline(cell, now)
              }, row);
            }

            eat(queue + character);
            queue = '';
            cell = '';
          }
        } else {
          if (queue) {
            cell += queue;
            queue = '';
          }

          cell += character;

          if (character === backslash$3 && index !== length - 2) {
            cell += line.charAt(index + 1);
            index++;
          }
        }

        preamble = false;
        index++;
      } // Eat the alignment row.


      if (!position) {
        eat(lineFeed$e + alignments);
      }
    }

    return table;
  }

  var paragraph_1 = paragraph;
  var tab$e = '\t';
  var lineFeed$f = '\n';
  var space$e = ' ';
  var tabSize$4 = 4; // Tokenise paragraph.

  function paragraph(eat, value, silent) {
    var self = this;
    var settings = self.options;
    var commonmark = settings.commonmark;
    var gfm = settings.gfm;
    var tokenizers = self.blockTokenizers;
    var interruptors = self.interruptParagraph;
    var index = value.indexOf(lineFeed$f);
    var length = value.length;
    var position;
    var subvalue;
    var character;
    var size;
    var now;

    while (index < length) {
      // Eat everything if there’s no following newline.
      if (index === -1) {
        index = length;
        break;
      } // Stop if the next character is NEWLINE.


      if (value.charAt(index + 1) === lineFeed$f) {
        break;
      } // In commonmark-mode, following indented lines are part of the paragraph.


      if (commonmark) {
        size = 0;
        position = index + 1;

        while (position < length) {
          character = value.charAt(position);

          if (character === tab$e) {
            size = tabSize$4;
            break;
          } else if (character === space$e) {
            size++;
          } else {
            break;
          }

          position++;
        }

        if (size >= tabSize$4 && character !== lineFeed$f) {
          index = value.indexOf(lineFeed$f, index + 1);
          continue;
        }
      }

      subvalue = value.slice(index + 1); // Check if the following code contains a possible block.

      if (interrupt_1(interruptors, tokenizers, self, [eat, subvalue, true])) {
        break;
      } // Break if the following line starts a list, when already in a list, or
      // when in commonmark, or when in gfm mode and the bullet is *not* numeric.


      if (tokenizers.list.call(self, eat, subvalue, true) && (self.inList || commonmark || gfm && !isDecimal(trim_1.left(subvalue).charAt(0)))) {
        break;
      }

      position = index;
      index = value.indexOf(lineFeed$f, index + 1);

      if (index !== -1 && trim_1(value.slice(position, index)) === '') {
        index = position;
        break;
      }
    }

    subvalue = value.slice(0, index);

    if (trim_1(subvalue) === '') {
      eat(subvalue);
      return null;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    now = eat.now();
    subvalue = trimTrailingLines_1(subvalue);
    return eat(subvalue)({
      type: 'paragraph',
      children: self.tokenizeInline(subvalue, now)
    });
  }

  var _escape = locate;

  function locate(value, fromIndex) {
    return value.indexOf('\\', fromIndex);
  }

  var _escape$1 = escape;
  escape.locator = _escape;
  var lineFeed$g = '\n';
  var backslash$4 = '\\';

  function escape(eat, value, silent) {
    var self = this;
    var character;
    var node;

    if (value.charAt(0) === backslash$4) {
      character = value.charAt(1);

      if (self.escape.indexOf(character) !== -1) {
        /* istanbul ignore if - never used (yet) */
        if (silent) {
          return true;
        }

        if (character === lineFeed$g) {
          node = {
            type: 'break'
          };
        } else {
          node = {
            type: 'text',
            value: character
          };
        }

        return eat(backslash$4 + character)(node);
      }
    }
  }

  var tag$1 = locate$1;

  function locate$1(value, fromIndex) {
    return value.indexOf('<', fromIndex);
  }

  var autoLink_1 = autoLink;
  autoLink.locator = tag$1;
  autoLink.notInLink = true;
  var lessThan$3 = '<';
  var greaterThan$2 = '>';
  var atSign = '@';
  var slash = '/';
  var mailto = 'mailto:';
  var mailtoLength = mailto.length;

  function autoLink(eat, value, silent) {
    var self = this;
    var subvalue = '';
    var length = value.length;
    var index = 0;
    var queue = '';
    var hasAtCharacter = false;
    var link = '';
    var character;
    var now;
    var content;
    var tokenizers;
    var exit;

    if (value.charAt(0) !== lessThan$3) {
      return;
    }

    index++;
    subvalue = lessThan$3;

    while (index < length) {
      character = value.charAt(index);

      if (isWhitespaceCharacter(character) || character === greaterThan$2 || character === atSign || character === ':' && value.charAt(index + 1) === slash) {
        break;
      }

      queue += character;
      index++;
    }

    if (!queue) {
      return;
    }

    link += queue;
    queue = '';
    character = value.charAt(index);
    link += character;
    index++;

    if (character === atSign) {
      hasAtCharacter = true;
    } else {
      if (character !== ':' || value.charAt(index + 1) !== slash) {
        return;
      }

      link += slash;
      index++;
    }

    while (index < length) {
      character = value.charAt(index);

      if (isWhitespaceCharacter(character) || character === greaterThan$2) {
        break;
      }

      queue += character;
      index++;
    }

    character = value.charAt(index);

    if (!queue || character !== greaterThan$2) {
      return;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    link += queue;
    content = link;
    subvalue += link + character;
    now = eat.now();
    now.column++;
    now.offset++;

    if (hasAtCharacter) {
      if (link.slice(0, mailtoLength).toLowerCase() === mailto) {
        content = content.substr(mailtoLength);
        now.column += mailtoLength;
        now.offset += mailtoLength;
      } else {
        link = mailto + link;
      }
    } // Temporarily remove all tokenizers except text in autolinks.


    tokenizers = self.inlineTokenizers;
    self.inlineTokenizers = {
      text: tokenizers.text
    };
    exit = self.enterLink();
    content = self.tokenizeInline(content, now);
    self.inlineTokenizers = tokenizers;
    exit();
    return eat(subvalue)({
      type: 'link',
      title: null,
      url: parseEntities_1(link, {
        nonTerminated: false
      }),
      children: content
    });
  }

  var url = locate$2;
  var protocols = ['https://', 'http://', 'mailto:'];

  function locate$2(value, fromIndex) {
    var length = protocols.length;
    var index = -1;
    var min = -1;
    var position;

    if (!this.options.gfm) {
      return -1;
    }

    while (++index < length) {
      position = value.indexOf(protocols[index], fromIndex);

      if (position !== -1 && (position < min || min === -1)) {
        min = position;
      }
    }

    return min;
  }

  var url_1 = url$1;
  url$1.locator = url;
  url$1.notInLink = true;
  var quotationMark$1 = '"';
  var apostrophe$1 = "'";
  var leftParenthesis$1 = '(';
  var rightParenthesis$2 = ')';
  var comma$1 = ',';
  var dot$2 = '.';
  var colon$4 = ':';
  var semicolon$1 = ';';
  var lessThan$4 = '<';
  var atSign$1 = '@';
  var leftSquareBracket$2 = '[';
  var rightSquareBracket$2 = ']';
  var http = 'http://';
  var https = 'https://';
  var mailto$1 = 'mailto:';
  var protocols$1 = [http, https, mailto$1];
  var protocolsLength = protocols$1.length;

  function url$1(eat, value, silent) {
    var self = this;
    var subvalue;
    var content;
    var character;
    var index;
    var position;
    var protocol;
    var match;
    var length;
    var queue;
    var parenCount;
    var nextCharacter;
    var tokenizers;
    var exit;

    if (!self.options.gfm) {
      return;
    }

    subvalue = '';
    index = -1;

    while (++index < protocolsLength) {
      protocol = protocols$1[index];
      match = value.slice(0, protocol.length);

      if (match.toLowerCase() === protocol) {
        subvalue = match;
        break;
      }
    }

    if (!subvalue) {
      return;
    }

    index = subvalue.length;
    length = value.length;
    queue = '';
    parenCount = 0;

    while (index < length) {
      character = value.charAt(index);

      if (isWhitespaceCharacter(character) || character === lessThan$4) {
        break;
      }

      if (character === dot$2 || character === comma$1 || character === colon$4 || character === semicolon$1 || character === quotationMark$1 || character === apostrophe$1 || character === rightParenthesis$2 || character === rightSquareBracket$2) {
        nextCharacter = value.charAt(index + 1);

        if (!nextCharacter || isWhitespaceCharacter(nextCharacter)) {
          break;
        }
      }

      if (character === leftParenthesis$1 || character === leftSquareBracket$2) {
        parenCount++;
      }

      if (character === rightParenthesis$2 || character === rightSquareBracket$2) {
        parenCount--;

        if (parenCount < 0) {
          break;
        }
      }

      queue += character;
      index++;
    }

    if (!queue) {
      return;
    }

    subvalue += queue;
    content = subvalue;

    if (protocol === mailto$1) {
      position = queue.indexOf(atSign$1);

      if (position === -1 || position === length - 1) {
        return;
      }

      content = content.substr(mailto$1.length);
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    exit = self.enterLink(); // Temporarily remove all tokenizers except text in url.

    tokenizers = self.inlineTokenizers;
    self.inlineTokenizers = {
      text: tokenizers.text
    };
    content = self.tokenizeInline(content, eat.now());
    self.inlineTokenizers = tokenizers;
    exit();
    return eat(subvalue)({
      type: 'link',
      title: null,
      url: parseEntities_1(subvalue, {
        nonTerminated: false
      }),
      children: content
    });
  }

  var tag$2 = html.tag;

  var htmlInline = inlineHTML;
  inlineHTML.locator = tag$1;
  var lessThan$5 = '<';
  var questionMark = '?';
  var exclamationMark$1 = '!';
  var slash$1 = '/';
  var htmlLinkOpenExpression = /^<a /i;
  var htmlLinkCloseExpression = /^<\/a>/i;

  function inlineHTML(eat, value, silent) {
    var self = this;
    var length = value.length;
    var character;
    var subvalue;

    if (value.charAt(0) !== lessThan$5 || length < 3) {
      return;
    }

    character = value.charAt(1);

    if (!isAlphabetical(character) && character !== questionMark && character !== exclamationMark$1 && character !== slash$1) {
      return;
    }

    subvalue = value.match(tag$2);

    if (!subvalue) {
      return;
    }
    /* istanbul ignore if - not used yet. */


    if (silent) {
      return true;
    }

    subvalue = subvalue[0];

    if (!self.inLink && htmlLinkOpenExpression.test(subvalue)) {
      self.inLink = true;
    } else if (self.inLink && htmlLinkCloseExpression.test(subvalue)) {
      self.inLink = false;
    }

    return eat(subvalue)({
      type: 'html',
      value: subvalue
    });
  }

  var link = locate$3;

  function locate$3(value, fromIndex) {
    var link = value.indexOf('[', fromIndex);
    var image = value.indexOf('![', fromIndex);

    if (image === -1) {
      return link;
    } // Link can never be `-1` if an image is found, so we don’t need to check
    // for that :)


    return link < image ? link : image;
  }

  var link_1 = link$1;
  link$1.locator = link;
  var lineFeed$h = '\n';
  var exclamationMark$2 = '!';
  var quotationMark$2 = '"';
  var apostrophe$2 = "'";
  var leftParenthesis$2 = '(';
  var rightParenthesis$3 = ')';
  var lessThan$6 = '<';
  var greaterThan$3 = '>';
  var leftSquareBracket$3 = '[';
  var backslash$5 = '\\';
  var rightSquareBracket$3 = ']';
  var graveAccent$1 = '`';

  function link$1(eat, value, silent) {
    var self = this;
    var subvalue = '';
    var index = 0;
    var character = value.charAt(0);
    var pedantic = self.options.pedantic;
    var commonmark = self.options.commonmark;
    var gfm = self.options.gfm;
    var closed;
    var count;
    var opening;
    var beforeURL;
    var beforeTitle;
    var subqueue;
    var hasMarker;
    var isImage;
    var content;
    var marker;
    var length;
    var title;
    var depth;
    var queue;
    var url;
    var now;
    var exit;
    var node; // Detect whether this is an image.

    if (character === exclamationMark$2) {
      isImage = true;
      subvalue = character;
      character = value.charAt(++index);
    } // Eat the opening.


    if (character !== leftSquareBracket$3) {
      return;
    } // Exit when this is a link and we’re already inside a link.


    if (!isImage && self.inLink) {
      return;
    }

    subvalue += character;
    queue = '';
    index++; // Eat the content.

    length = value.length;
    now = eat.now();
    depth = 0;
    now.column += index;
    now.offset += index;

    while (index < length) {
      character = value.charAt(index);
      subqueue = character;

      if (character === graveAccent$1) {
        // Inline-code in link content.
        count = 1;

        while (value.charAt(index + 1) === graveAccent$1) {
          subqueue += character;
          index++;
          count++;
        }

        if (!opening) {
          opening = count;
        } else if (count >= opening) {
          opening = 0;
        }
      } else if (character === backslash$5) {
        // Allow brackets to be escaped.
        index++;
        subqueue += value.charAt(index);
      } else if ((!opening || gfm) && character === leftSquareBracket$3) {
        // In GFM mode, brackets in code still count.  In all other modes,
        // they don’t.
        depth++;
      } else if ((!opening || gfm) && character === rightSquareBracket$3) {
        if (depth) {
          depth--;
        } else {
          // Allow white-space between content and url in GFM mode.
          if (!pedantic) {
            while (index < length) {
              character = value.charAt(index + 1);

              if (!isWhitespaceCharacter(character)) {
                break;
              }

              subqueue += character;
              index++;
            }
          }

          if (value.charAt(index + 1) !== leftParenthesis$2) {
            return;
          }

          subqueue += leftParenthesis$2;
          closed = true;
          index++;
          break;
        }
      }

      queue += subqueue;
      subqueue = '';
      index++;
    } // Eat the content closing.


    if (!closed) {
      return;
    }

    content = queue;
    subvalue += queue + subqueue;
    index++; // Eat white-space.

    while (index < length) {
      character = value.charAt(index);

      if (!isWhitespaceCharacter(character)) {
        break;
      }

      subvalue += character;
      index++;
    } // Eat the URL.


    character = value.charAt(index);
    queue = '';
    beforeURL = subvalue;

    if (character === lessThan$6) {
      index++;
      beforeURL += lessThan$6;

      while (index < length) {
        character = value.charAt(index);

        if (character === greaterThan$3) {
          break;
        }

        if (commonmark && character === lineFeed$h) {
          return;
        }

        queue += character;
        index++;
      }

      if (value.charAt(index) !== greaterThan$3) {
        return;
      }

      subvalue += lessThan$6 + queue + greaterThan$3;
      url = queue;
      index++;
    } else {
      character = null;
      subqueue = '';

      while (index < length) {
        character = value.charAt(index);

        if (subqueue && (character === quotationMark$2 || character === apostrophe$2 || commonmark && character === leftParenthesis$2)) {
          break;
        }

        if (isWhitespaceCharacter(character)) {
          if (!pedantic) {
            break;
          }

          subqueue += character;
        } else {
          if (character === leftParenthesis$2) {
            depth++;
          } else if (character === rightParenthesis$3) {
            if (depth === 0) {
              break;
            }

            depth--;
          }

          queue += subqueue;
          subqueue = '';

          if (character === backslash$5) {
            queue += backslash$5;
            character = value.charAt(++index);
          }

          queue += character;
        }

        index++;
      }

      subvalue += queue;
      url = queue;
      index = subvalue.length;
    } // Eat white-space.


    queue = '';

    while (index < length) {
      character = value.charAt(index);

      if (!isWhitespaceCharacter(character)) {
        break;
      }

      queue += character;
      index++;
    }

    character = value.charAt(index);
    subvalue += queue; // Eat the title.

    if (queue && (character === quotationMark$2 || character === apostrophe$2 || commonmark && character === leftParenthesis$2)) {
      index++;
      subvalue += character;
      queue = '';
      marker = character === leftParenthesis$2 ? rightParenthesis$3 : character;
      beforeTitle = subvalue; // In commonmark-mode, things are pretty easy: the marker cannot occur
      // inside the title.  Non-commonmark does, however, support nested
      // delimiters.

      if (commonmark) {
        while (index < length) {
          character = value.charAt(index);

          if (character === marker) {
            break;
          }

          if (character === backslash$5) {
            queue += backslash$5;
            character = value.charAt(++index);
          }

          index++;
          queue += character;
        }

        character = value.charAt(index);

        if (character !== marker) {
          return;
        }

        title = queue;
        subvalue += queue + character;
        index++;

        while (index < length) {
          character = value.charAt(index);

          if (!isWhitespaceCharacter(character)) {
            break;
          }

          subvalue += character;
          index++;
        }
      } else {
        subqueue = '';

        while (index < length) {
          character = value.charAt(index);

          if (character === marker) {
            if (hasMarker) {
              queue += marker + subqueue;
              subqueue = '';
            }

            hasMarker = true;
          } else if (!hasMarker) {
            queue += character;
          } else if (character === rightParenthesis$3) {
            subvalue += queue + marker + subqueue;
            title = queue;
            break;
          } else if (isWhitespaceCharacter(character)) {
            subqueue += character;
          } else {
            queue += marker + subqueue + character;
            subqueue = '';
            hasMarker = false;
          }

          index++;
        }
      }
    }

    if (value.charAt(index) !== rightParenthesis$3) {
      return;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    subvalue += rightParenthesis$3;
    url = self.decode.raw(self.unescape(url), eat(beforeURL).test().end, {
      nonTerminated: false
    });

    if (title) {
      beforeTitle = eat(beforeTitle).test().end;
      title = self.decode.raw(self.unescape(title), beforeTitle);
    }

    node = {
      type: isImage ? 'image' : 'link',
      title: title || null,
      url: url
    };

    if (isImage) {
      node.alt = self.decode.raw(self.unescape(content), now) || null;
    } else {
      exit = self.enterLink();
      node.children = self.tokenizeInline(content, now);
      exit();
    }

    return eat(subvalue)(node);
  }

  var reference_1 = reference;
  reference.locator = link;
  var link$2 = 'link';
  var image$1 = 'image';
  var footnote = 'footnote';
  var shortcut = 'shortcut';
  var collapsed = 'collapsed';
  var full = 'full';
  var space$f = ' ';
  var exclamationMark$3 = '!';
  var leftSquareBracket$4 = '[';
  var backslash$6 = '\\';
  var rightSquareBracket$4 = ']';
  var caret$2 = '^';

  function reference(eat, value, silent) {
    var self = this;
    var commonmark = self.options.commonmark;
    var footnotes = self.options.footnotes;
    var character = value.charAt(0);
    var index = 0;
    var length = value.length;
    var subvalue = '';
    var intro = '';
    var type = link$2;
    var referenceType = shortcut;
    var content;
    var identifier;
    var now;
    var node;
    var exit;
    var queue;
    var bracketed;
    var depth; // Check whether we’re eating an image.

    if (character === exclamationMark$3) {
      type = image$1;
      intro = character;
      character = value.charAt(++index);
    }

    if (character !== leftSquareBracket$4) {
      return;
    }

    index++;
    intro += character;
    queue = ''; // Check whether we’re eating a footnote.

    if (footnotes && value.charAt(index) === caret$2) {
      // Exit if `![^` is found, so the `!` will be seen as text after this,
      // and we’ll enter this function again when `[^` is found.
      if (type === image$1) {
        return;
      }

      intro += caret$2;
      index++;
      type = footnote;
    } // Eat the text.


    depth = 0;

    while (index < length) {
      character = value.charAt(index);

      if (character === leftSquareBracket$4) {
        bracketed = true;
        depth++;
      } else if (character === rightSquareBracket$4) {
        if (!depth) {
          break;
        }

        depth--;
      }

      if (character === backslash$6) {
        queue += backslash$6;
        character = value.charAt(++index);
      }

      queue += character;
      index++;
    }

    subvalue = queue;
    content = queue;
    character = value.charAt(index);

    if (character !== rightSquareBracket$4) {
      return;
    }

    index++;
    subvalue += character;
    queue = '';

    if (!commonmark) {
      // The original markdown syntax definition explicitly allows for whitespace
      // between the link text and link label; commonmark departs from this, in
      // part to improve support for shortcut reference links
      while (index < length) {
        character = value.charAt(index);

        if (!isWhitespaceCharacter(character)) {
          break;
        }

        queue += character;
        index++;
      }
    }

    character = value.charAt(index); // Inline footnotes cannot have a label.
    // If footnotes are enabled, link labels cannot start with a caret.

    if (type !== footnote && character === leftSquareBracket$4 && (!footnotes || value.charAt(index + 1) !== caret$2)) {
      identifier = '';
      queue += character;
      index++;

      while (index < length) {
        character = value.charAt(index);

        if (character === leftSquareBracket$4 || character === rightSquareBracket$4) {
          break;
        }

        if (character === backslash$6) {
          identifier += backslash$6;
          character = value.charAt(++index);
        }

        identifier += character;
        index++;
      }

      character = value.charAt(index);

      if (character === rightSquareBracket$4) {
        referenceType = identifier ? full : collapsed;
        queue += identifier + character;
        index++;
      } else {
        identifier = '';
      }

      subvalue += queue;
      queue = '';
    } else {
      if (!content) {
        return;
      }

      identifier = content;
    } // Brackets cannot be inside the identifier.


    if (referenceType !== full && bracketed) {
      return;
    }

    subvalue = intro + subvalue;

    if (type === link$2 && self.inLink) {
      return null;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    if (type === footnote && content.indexOf(space$f) !== -1) {
      return eat(subvalue)({
        type: footnote,
        children: this.tokenizeInline(content, eat.now())
      });
    }

    now = eat.now();
    now.column += intro.length;
    now.offset += intro.length;
    identifier = referenceType === full ? identifier : content;
    node = {
      type: type + 'Reference',
      identifier: normalize_1(identifier),
      label: identifier
    };

    if (type === link$2 || type === image$1) {
      node.referenceType = referenceType;
    }

    if (type === link$2) {
      exit = self.enterLink();
      node.children = self.tokenizeInline(content, now);
      exit();
    } else if (type === image$1) {
      node.alt = self.decode.raw(self.unescape(content), now) || null;
    }

    return eat(subvalue)(node);
  }

  var strong = locate$4;

  function locate$4(value, fromIndex) {
    var asterisk = value.indexOf('**', fromIndex);
    var underscore = value.indexOf('__', fromIndex);

    if (underscore === -1) {
      return asterisk;
    }

    if (asterisk === -1) {
      return underscore;
    }

    return underscore < asterisk ? underscore : asterisk;
  }

  var strong_1 = strong$1;
  strong$1.locator = strong;
  var backslash$7 = '\\';
  var asterisk$2 = '*';
  var underscore$2 = '_';

  function strong$1(eat, value, silent) {
    var self = this;
    var index = 0;
    var character = value.charAt(index);
    var now;
    var pedantic;
    var marker;
    var queue;
    var subvalue;
    var length;
    var prev;

    if (character !== asterisk$2 && character !== underscore$2 || value.charAt(++index) !== character) {
      return;
    }

    pedantic = self.options.pedantic;
    marker = character;
    subvalue = marker + marker;
    length = value.length;
    index++;
    queue = '';
    character = '';

    if (pedantic && isWhitespaceCharacter(value.charAt(index))) {
      return;
    }

    while (index < length) {
      prev = character;
      character = value.charAt(index);

      if (character === marker && value.charAt(index + 1) === marker && (!pedantic || !isWhitespaceCharacter(prev))) {
        character = value.charAt(index + 2);

        if (character !== marker) {
          if (!trim_1(queue)) {
            return;
          }
          /* istanbul ignore if - never used (yet) */


          if (silent) {
            return true;
          }

          now = eat.now();
          now.column += 2;
          now.offset += 2;
          return eat(subvalue + queue + subvalue)({
            type: 'strong',
            children: self.tokenizeInline(queue, now)
          });
        }
      }

      if (!pedantic && character === backslash$7) {
        queue += character;
        character = value.charAt(++index);
      }

      queue += character;
      index++;
    }
  }

  var isWordCharacter = wordCharacter;
  var fromCode$1 = String.fromCharCode;
  var re$2 = /\w/; // Check if the given character code, or the character code at the first
  // character, is a word character.

  function wordCharacter(character) {
    return re$2.test(typeof character === 'number' ? fromCode$1(character) : character.charAt(0));
  }

  var emphasis = locate$5;

  function locate$5(value, fromIndex) {
    var asterisk = value.indexOf('*', fromIndex);
    var underscore = value.indexOf('_', fromIndex);

    if (underscore === -1) {
      return asterisk;
    }

    if (asterisk === -1) {
      return underscore;
    }

    return underscore < asterisk ? underscore : asterisk;
  }

  var emphasis_1 = emphasis$1;
  emphasis$1.locator = emphasis;
  var asterisk$3 = '*';
  var underscore$3 = '_';
  var backslash$8 = '\\';

  function emphasis$1(eat, value, silent) {
    var self = this;
    var index = 0;
    var character = value.charAt(index);
    var now;
    var pedantic;
    var marker;
    var queue;
    var subvalue;
    var length;
    var prev;

    if (character !== asterisk$3 && character !== underscore$3) {
      return;
    }

    pedantic = self.options.pedantic;
    subvalue = character;
    marker = character;
    length = value.length;
    index++;
    queue = '';
    character = '';

    if (pedantic && isWhitespaceCharacter(value.charAt(index))) {
      return;
    }

    while (index < length) {
      prev = character;
      character = value.charAt(index);

      if (character === marker && (!pedantic || !isWhitespaceCharacter(prev))) {
        character = value.charAt(++index);

        if (character !== marker) {
          if (!trim_1(queue) || prev === marker) {
            return;
          }

          if (!pedantic && marker === underscore$3 && isWordCharacter(character)) {
            queue += marker;
            continue;
          }
          /* istanbul ignore if - never used (yet) */


          if (silent) {
            return true;
          }

          now = eat.now();
          now.column++;
          now.offset++;
          return eat(subvalue + queue + marker)({
            type: 'emphasis',
            children: self.tokenizeInline(queue, now)
          });
        }

        queue += marker;
      }

      if (!pedantic && character === backslash$8) {
        queue += character;
        character = value.charAt(++index);
      }

      queue += character;
      index++;
    }
  }

  var _delete = locate$6;

  function locate$6(value, fromIndex) {
    return value.indexOf('~~', fromIndex);
  }

  var _delete$1 = strikethrough;
  strikethrough.locator = _delete;
  var tilde$2 = '~';
  var fence = '~~';

  function strikethrough(eat, value, silent) {
    var self = this;
    var character = '';
    var previous = '';
    var preceding = '';
    var subvalue = '';
    var index;
    var length;
    var now;

    if (!self.options.gfm || value.charAt(0) !== tilde$2 || value.charAt(1) !== tilde$2 || isWhitespaceCharacter(value.charAt(2))) {
      return;
    }

    index = 1;
    length = value.length;
    now = eat.now();
    now.column += 2;
    now.offset += 2;

    while (++index < length) {
      character = value.charAt(index);

      if (character === tilde$2 && previous === tilde$2 && (!preceding || !isWhitespaceCharacter(preceding))) {
        /* istanbul ignore if - never used (yet) */
        if (silent) {
          return true;
        }

        return eat(fence + subvalue + fence)({
          type: 'delete',
          children: self.tokenizeInline(subvalue, now)
        });
      }

      subvalue += previous;
      preceding = previous;
      previous = character;
    }
  }

  var codeInline = locate$7;

  function locate$7(value, fromIndex) {
    return value.indexOf('`', fromIndex);
  }

  var codeInline$1 = inlineCode;
  inlineCode.locator = codeInline;
  var lineFeed$i = 10; //  '\n'

  var space$g = 32; // ' '

  var graveAccent$2 = 96; //  '`'

  function inlineCode(eat, value, silent) {
    var length = value.length;
    var index = 0;
    var openingFenceEnd;
    var closingFenceStart;
    var closingFenceEnd;
    var code;
    var next;
    var found;

    while (index < length) {
      if (value.charCodeAt(index) !== graveAccent$2) {
        break;
      }

      index++;
    }

    if (index === 0 || index === length) {
      return;
    }

    openingFenceEnd = index;
    next = value.charCodeAt(index);

    while (index < length) {
      code = next;
      next = value.charCodeAt(index + 1);

      if (code === graveAccent$2) {
        if (closingFenceStart === undefined) {
          closingFenceStart = index;
        }

        closingFenceEnd = index + 1;

        if (next !== graveAccent$2 && closingFenceEnd - closingFenceStart === openingFenceEnd) {
          found = true;
          break;
        }
      } else if (closingFenceStart !== undefined) {
        closingFenceStart = undefined;
        closingFenceEnd = undefined;
      }

      index++;
    }

    if (!found) {
      return;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    } // Remove the initial and final space (or line feed), iff they exist and there
    // are non-space characters in the content.


    index = openingFenceEnd;
    length = closingFenceStart;
    code = value.charCodeAt(index);
    next = value.charCodeAt(length - 1);
    found = false;

    if (length - index > 2 && (code === space$g || code === lineFeed$i) && (next === space$g || next === lineFeed$i)) {
      index++;
      length--;

      while (index < length) {
        code = value.charCodeAt(index);

        if (code !== space$g && code !== lineFeed$i) {
          found = true;
          break;
        }

        index++;
      }

      if (found === true) {
        openingFenceEnd++;
        closingFenceStart--;
      }
    }

    return eat(value.slice(0, closingFenceEnd))({
      type: 'inlineCode',
      value: value.slice(openingFenceEnd, closingFenceStart)
    });
  }

  var _break = locate$8;

  function locate$8(value, fromIndex) {
    var index = value.indexOf('\n', fromIndex);

    while (index > fromIndex) {
      if (value.charAt(index - 1) !== ' ') {
        break;
      }

      index--;
    }

    return index;
  }

  var _break$1 = hardBreak;
  hardBreak.locator = _break;
  var space$h = ' ';
  var lineFeed$j = '\n';
  var minBreakLength = 2;

  function hardBreak(eat, value, silent) {
    var length = value.length;
    var index = -1;
    var queue = '';
    var character;

    while (++index < length) {
      character = value.charAt(index);

      if (character === lineFeed$j) {
        if (index < minBreakLength) {
          return;
        }
        /* istanbul ignore if - never used (yet) */


        if (silent) {
          return true;
        }

        queue += character;
        return eat(queue)({
          type: 'break'
        });
      }

      if (character !== space$h) {
        return;
      }

      queue += character;
    }
  }

  var text_1 = text;

  function text(eat, value, silent) {
    var self = this;
    var methods;
    var tokenizers;
    var index;
    var length;
    var subvalue;
    var position;
    var tokenizer;
    var name;
    var min;
    var now;
    /* istanbul ignore if - never used (yet) */

    if (silent) {
      return true;
    }

    methods = self.inlineMethods;
    length = methods.length;
    tokenizers = self.inlineTokenizers;
    index = -1;
    min = value.length;

    while (++index < length) {
      name = methods[index];

      if (name === 'text' || !tokenizers[name]) {
        continue;
      }

      tokenizer = tokenizers[name].locator;

      if (!tokenizer) {
        eat.file.fail('Missing locator: `' + name + '`');
      }

      position = tokenizer.call(self, value, 1);

      if (position !== -1 && position < min) {
        min = position;
      }
    }

    subvalue = value.slice(0, min);
    now = eat.now();
    self.decode(subvalue, now, handler);

    function handler(content, position, source) {
      eat(source || content)({
        type: 'text',
        value: content
      });
    }
  }

  var parser = Parser;

  function Parser(doc, file) {
    this.file = file;
    this.offset = {};
    this.options = immutable(this.options);
    this.setOptions({});
    this.inList = false;
    this.inBlock = false;
    this.inLink = false;
    this.atStart = true;
    this.toOffset = vfileLocation(file).toOffset;
    this.unescape = _unescape(this, 'escape');
    this.decode = decode(this);
  }

  var proto = Parser.prototype; // Expose core.

  proto.setOptions = setOptions_1;
  proto.parse = parse_1; // Expose `defaults`.

  proto.options = defaults$2; // Enter and exit helpers.

  proto.exitStart = stateToggle('atStart', true);
  proto.enterList = stateToggle('inList', false);
  proto.enterLink = stateToggle('inLink', false);
  proto.enterBlock = stateToggle('inBlock', false); // Nodes that can interupt a paragraph:
  //
  // ```markdown
  // A paragraph, followed by a thematic break.
  // ___
  // ```
  //
  // In the above example, the thematic break “interupts” the paragraph.

  proto.interruptParagraph = [['thematicBreak'], ['atxHeading'], ['fencedCode'], ['blockquote'], ['html'], ['setextHeading', {
    commonmark: false
  }], ['definition', {
    commonmark: false
  }], ['footnote', {
    commonmark: false
  }]]; // Nodes that can interupt a list:
  //
  // ```markdown
  // - One
  // ___
  // ```
  //
  // In the above example, the thematic break “interupts” the list.

  proto.interruptList = [['atxHeading', {
    pedantic: false
  }], ['fencedCode', {
    pedantic: false
  }], ['thematicBreak', {
    pedantic: false
  }], ['definition', {
    commonmark: false
  }], ['footnote', {
    commonmark: false
  }]]; // Nodes that can interupt a blockquote:
  //
  // ```markdown
  // > A paragraph.
  // ___
  // ```
  //
  // In the above example, the thematic break “interupts” the blockquote.

  proto.interruptBlockquote = [['indentedCode', {
    commonmark: true
  }], ['fencedCode', {
    commonmark: true
  }], ['atxHeading', {
    commonmark: true
  }], ['setextHeading', {
    commonmark: true
  }], ['thematicBreak', {
    commonmark: true
  }], ['html', {
    commonmark: true
  }], ['list', {
    commonmark: true
  }], ['definition', {
    commonmark: false
  }], ['footnote', {
    commonmark: false
  }]]; // Handlers.

  proto.blockTokenizers = {
    newline: newline_1,
    indentedCode: codeIndented,
    fencedCode: codeFenced,
    blockquote: blockquote_1,
    atxHeading: headingAtx,
    thematicBreak: thematicBreak_1,
    list: list_1,
    setextHeading: headingSetext,
    html: htmlBlock,
    footnote: footnoteDefinition_1,
    definition: definition_1,
    table: table_1,
    paragraph: paragraph_1
  };
  proto.inlineTokenizers = {
    escape: _escape$1,
    autoLink: autoLink_1,
    url: url_1,
    html: htmlInline,
    link: link_1,
    reference: reference_1,
    strong: strong_1,
    emphasis: emphasis_1,
    deletion: _delete$1,
    code: codeInline$1,
    break: _break$1,
    text: text_1
  }; // Expose precedence.

  proto.blockMethods = keys(proto.blockTokenizers);
  proto.inlineMethods = keys(proto.inlineTokenizers); // Tokenizers.

  proto.tokenizeBlock = tokenizer('block');
  proto.tokenizeInline = tokenizer('inline');
  proto.tokenizeFactory = tokenizer; // Get all keys in `value`.

  function keys(value) {
    var result = [];
    var key;

    for (key in value) {
      result.push(key);
    }

    return result;
  }

  var remarkParse = parse$2;
  parse$2.Parser = parser;

  function parse$2(options) {
    var settings = this.data('settings');
    var Local = unherit_1(parser);
    Local.prototype.options = immutable(Local.prototype.options, settings, options);
    this.Parser = Local;
  }

  var unistBuilder = u;

  function u(type, props, value) {
    var node;

    if ((value === null || value === undefined) && (typeof props !== 'object' || Array.isArray(props))) {
      value = props;
      props = {};
    }

    node = objectAssign({
      type: String(type)
    }, props);

    if (Array.isArray(value)) {
      node.children = value;
    } else if (value !== null && value !== undefined) {
      node.value = String(value);
    }

    return node;
  }

  var unistUtilPosition = createCommonjsModule(function (module, exports) {

  var position = exports;
  position.start = factory('start');
  position.end = factory('end');

  function factory(type) {
    point.displayName = type;
    return point;

    function point(node) {
      var point = node && node.position && node.position[type] || {};
      return {
        line: point.line || null,
        column: point.column || null,
        offset: isNaN(point.offset) ? null : point.offset
      };
    }
  }
  });

  var unistUtilGenerated = generated;

  function generated(node) {
    var position = optional(optional(node).position);
    var start = optional(position.start);
    var end = optional(position.end);
    return !start.line || !start.column || !end.line || !end.column;
  }

  function optional(value) {
    return value && typeof value === 'object' ? value : {};
  }

  var mdastUtilDefinitions = getDefinitionFactory;
  var own$2 = {}.hasOwnProperty; // Get a definition in `node` by `identifier`.

  function getDefinitionFactory(node, options) {
    return getterFactory(gather(node, options));
  } // Gather all definitions in `node`


  function gather(node, options) {
    var cache = {};

    if (!node || !node.type) {
      throw new Error('mdast-util-definitions expected node');
    }

    unistUtilVisit(node, 'definition', options && options.commonmark ? commonmark : normal);
    return cache;

    function commonmark(definition) {
      var id = normalise(definition.identifier);

      if (!own$2.call(cache, id)) {
        cache[id] = definition;
      }
    }

    function normal(definition) {
      cache[normalise(definition.identifier)] = definition;
    }
  } // Factory to get a node from the given definition-cache.


  function getterFactory(cache) {
    return getter; // Get a node from the bound definition-cache.

    function getter(identifier) {
      var id = identifier && normalise(identifier);
      return id && own$2.call(cache, id) ? cache[id] : null;
    }
  }

  function normalise(identifier) {
    return identifier.toUpperCase();
  }

  var all_1 = all;





  function all(h, parent) {
    var nodes = parent.children || [];
    var length = nodes.length;
    var values = [];
    var index = -1;
    var result;
    var head;

    while (++index < length) {
      result = one_1(h, nodes[index], parent);

      if (result) {
        if (index && nodes[index - 1].type === 'break') {
          if (result.value) {
            result.value = trim_1.left(result.value);
          }

          head = result.children && result.children[0];

          if (head && head.value) {
            head.value = trim_1.left(head.value);
          }
        }

        values = values.concat(result);
      }
    }

    return values;
  }

  var one_1 = one;





  var own$3 = {}.hasOwnProperty; // Transform an unknown node.

  function unknown(h, node) {
    if (text$1(node)) {
      return h.augment(node, unistBuilder('text', node.value));
    }

    return h(node, 'div', all_1(h, node));
  } // Visit a node.


  function one(h, node, parent) {
    var type = node && node.type;
    var fn = own$3.call(h.handlers, type) ? h.handlers[type] : null; // Fail on non-nodes.

    if (!type) {
      throw new Error('Expected node, got `' + node + '`');
    }

    return (typeof fn === 'function' ? fn : unknown)(h, node, parent);
  } // Check if the node should be renderered as a text node.


  function text$1(node) {
    var data = node.data || {};

    if (own$3.call(data, 'hName') || own$3.call(data, 'hProperties') || own$3.call(data, 'hChildren')) {
      return false;
    }

    return 'value' in node;
  }

  var thematicBreak_1$1 = thematicBreak$1;

  function thematicBreak$1(h, node) {
    return h(node, 'hr');
  }

  var wrap_1 = wrap;

   // Wrap `nodes` with line feeds between each entry.
  // Optionally adds line feeds at the start and end.


  function wrap(nodes, loose) {
    var result = [];
    var index = -1;
    var length = nodes.length;

    if (loose) {
      result.push(unistBuilder('text', '\n'));
    }

    while (++index < length) {
      if (index) {
        result.push(unistBuilder('text', '\n'));
      }

      result.push(nodes[index]);
    }

    if (loose && nodes.length !== 0) {
      result.push(unistBuilder('text', '\n'));
    }

    return result;
  }

  var list_1$1 = list$1;





  function list$1(h, node) {
    var props = {};
    var name = node.ordered ? 'ol' : 'ul';
    var items;
    var index = -1;
    var length;

    if (typeof node.start === 'number' && node.start !== 1) {
      props.start = node.start;
    }

    items = all_1(h, node);
    length = items.length; // Like GitHub, add a class for custom styling.

    while (++index < length) {
      if (items[index].properties.className && items[index].properties.className.indexOf('task-list-item') !== -1) {
        props.className = ['contains-task-list'];
        break;
      }
    }

    return h(node, name, props, wrap_1(items, true));
  }

  var footer = generateFootnotes;







  function generateFootnotes(h) {
    var footnoteById = h.footnoteById;
    var footnoteOrder = h.footnoteOrder;
    var length = footnoteOrder.length;
    var index = -1;
    var listItems = [];
    var def;
    var backReference;
    var content;
    var tail;

    while (++index < length) {
      def = footnoteById[footnoteOrder[index].toUpperCase()];

      if (!def) {
        continue;
      }

      content = def.children.concat();
      tail = content[content.length - 1];
      backReference = {
        type: 'link',
        url: '#fnref-' + def.identifier,
        data: {
          hProperties: {
            className: ['footnote-backref']
          }
        },
        children: [{
          type: 'text',
          value: '↩'
        }]
      };

      if (!tail || tail.type !== 'paragraph') {
        tail = {
          type: 'paragraph',
          children: []
        };
        content.push(tail);
      }

      tail.children.push(backReference);
      listItems.push({
        type: 'listItem',
        data: {
          hProperties: {
            id: 'fn-' + def.identifier
          }
        },
        children: content,
        position: def.position
      });
    }

    if (listItems.length === 0) {
      return null;
    }

    return h(null, 'div', {
      className: ['footnotes']
    }, wrap_1([thematicBreak_1$1(h), list_1$1(h, {
      type: 'list',
      ordered: true,
      children: listItems
    })], true));
  }

  var blockquote_1$1 = blockquote$1;





  function blockquote$1(h, node) {
    return h(node, 'blockquote', wrap_1(all_1(h, node), true));
  }

  var _break$2 = hardBreak$1;



  function hardBreak$1(h, node) {
    return [h(node, 'br'), unistBuilder('text', '\n')];
  }

  var detab_1 = detab;



  var tab$f = 0x09;
  var lineFeed$k = 0x0a;
  var carriageReturn = 0x0d; // Replace tabs with spaces, being smart about which column the tab is at and
  // which size should be used.

  function detab(value, size) {
    var string = typeof value === 'string';
    var length = string && value.length;
    var start = 0;
    var index = -1;
    var column = -1;
    var tabSize = size || 4;
    var results = [];
    var code;
    var add;

    if (!string) {
      throw new Error('detab expected string');
    }

    while (++index < length) {
      code = value.charCodeAt(index);

      if (code === tab$f) {
        add = tabSize - (column + 1) % tabSize;
        column += add;
        results.push(value.slice(start, index) + repeatString(' ', add));
        start = index + 1;
      } else if (code === lineFeed$k || code === carriageReturn) {
        column = -1;
      } else {
        column++;
      }
    }

    results.push(value.slice(start));
    return results.join('');
  }

  var code_1 = code;





  function code(h, node) {
    var value = node.value ? detab_1(node.value + '\n') : '';
    var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
    var props = {};

    if (lang) {
      props.className = ['language-' + lang];
    }

    return h(node.position, 'pre', [h(node, 'code', props, [unistBuilder('text', value)])]);
  }

  var _delete$2 = strikethrough$1;



  function strikethrough$1(h, node) {
    return h(node, 'del', all_1(h, node));
  }

  var emphasis_1$1 = emphasis$2;



  function emphasis$2(h, node) {
    return h(node, 'em', all_1(h, node));
  }

  var footnoteReference_1 = footnoteReference;



  function footnoteReference(h, node) {
    var footnoteOrder = h.footnoteOrder;
    var identifier = node.identifier;

    if (footnoteOrder.indexOf(identifier) === -1) {
      footnoteOrder.push(identifier);
    }

    return h(node.position, 'sup', {
      id: 'fnref-' + identifier
    }, [h(node, 'a', {
      href: '#fn-' + identifier,
      className: ['footnote-ref']
    }, [unistBuilder('text', node.label || identifier)])]);
  }

  var footnote_1 = footnote$1;



  function footnote$1(h, node) {
    var footnoteById = h.footnoteById;
    var footnoteOrder = h.footnoteOrder;
    var identifier = 1;

    while (identifier in footnoteById) {
      identifier++;
    }

    identifier = String(identifier); // No need to check if `identifier` exists in `footnoteOrder`, it’s guaranteed
    // to not exist because we just generated it.

    footnoteOrder.push(identifier);
    footnoteById[identifier] = {
      type: 'footnoteDefinition',
      identifier: identifier,
      children: [{
        type: 'paragraph',
        children: node.children
      }],
      position: node.position
    };
    return footnoteReference_1(h, {
      type: 'footnoteReference',
      identifier: identifier,
      position: node.position
    });
  }

  var heading_1 = heading;



  function heading(h, node) {
    return h(node, 'h' + node.depth, all_1(h, node));
  }

  var html_1 = html$1;

   // Return either a `raw` node in dangerous mode, otherwise nothing.


  function html$1(h, node) {
    return h.dangerous ? h.augment(node, unistBuilder('raw', node.value)) : null;
  }

  var encodeCache = {}; // Create a lookup array where anything but characters in `chars` string
  // and alphanumeric chars is percent-encoded.
  //

  function getEncodeCache(exclude) {
    var i,
        ch,
        cache = encodeCache[exclude];

    if (cache) {
      return cache;
    }

    cache = encodeCache[exclude] = [];

    for (i = 0; i < 128; i++) {
      ch = String.fromCharCode(i);

      if (/^[0-9a-z]$/i.test(ch)) {
        // always allow unencoded alphanumeric characters
        cache.push(ch);
      } else {
        cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
      }
    }

    for (i = 0; i < exclude.length; i++) {
      cache[exclude.charCodeAt(i)] = exclude[i];
    }

    return cache;
  } // Encode unsafe characters with percent-encoding, skipping already
  // encoded sequences.
  //
  //  - string       - string to encode
  //  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
  //  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
  //


  function encode(string, exclude, keepEscaped) {
    var i,
        l,
        code,
        nextCode,
        cache,
        result = '';

    if (typeof exclude !== 'string') {
      // encode(string, keepEscaped)
      keepEscaped = exclude;
      exclude = encode.defaultChars;
    }

    if (typeof keepEscaped === 'undefined') {
      keepEscaped = true;
    }

    cache = getEncodeCache(exclude);

    for (i = 0, l = string.length; i < l; i++) {
      code = string.charCodeAt(i);

      if (keepEscaped && code === 0x25
      /* % */
      && i + 2 < l) {
        if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
          result += string.slice(i, i + 3);
          i += 2;
          continue;
        }
      }

      if (code < 128) {
        result += cache[code];
        continue;
      }

      if (code >= 0xD800 && code <= 0xDFFF) {
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
          nextCode = string.charCodeAt(i + 1);

          if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
            result += encodeURIComponent(string[i] + string[i + 1]);
            i++;
            continue;
          }
        }

        result += '%EF%BF%BD';
        continue;
      }

      result += encodeURIComponent(string[i]);
    }

    return result;
  }

  encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
  encode.componentChars = "-_.!~*'()";
  var encode_1 = encode;

  var revert_1 = revert;



   // Return the content of a reference without definition as Markdown.


  function revert(h, node) {
    var subtype = node.referenceType;
    var suffix = ']';
    var contents;
    var head;
    var tail;

    if (subtype === 'collapsed') {
      suffix += '[]';
    } else if (subtype === 'full') {
      suffix += '[' + (node.label || node.identifier) + ']';
    }

    if (node.type === 'imageReference') {
      return unistBuilder('text', '![' + node.alt + suffix);
    }

    contents = all_1(h, node);
    head = contents[0];

    if (head && head.type === 'text') {
      head.value = '[' + head.value;
    } else {
      contents.unshift(unistBuilder('text', '['));
    }

    tail = contents[contents.length - 1];

    if (tail && tail.type === 'text') {
      tail.value += suffix;
    } else {
      contents.push(unistBuilder('text', suffix));
    }

    return contents;
  }

  var imageReference_1 = imageReference;





  function imageReference(h, node) {
    var def = h.definition(node.identifier);
    var props;

    if (!def) {
      return revert_1(h, node);
    }

    props = {
      src: encode_1(def.url || ''),
      alt: node.alt
    };

    if (def.title !== null && def.title !== undefined) {
      props.title = def.title;
    }

    return h(node, 'img', props);
  }

  var image_1 = image$2;

  function image$2(h, node) {
    var props = {
      src: encode_1(node.url),
      alt: node.alt
    };

    if (node.title !== null && node.title !== undefined) {
      props.title = node.title;
    }

    return h(node, 'img', props);
  }

  var inlineCode_1 = inlineCode$1;





  function inlineCode$1(h, node) {
    return h(node, 'code', [unistBuilder('text', collapseWhiteSpace(node.value))]);
  }

  var linkReference_1 = linkReference;







  function linkReference(h, node) {
    var def = h.definition(node.identifier);
    var props;

    if (!def) {
      return revert_1(h, node);
    }

    props = {
      href: encode_1(def.url || '')
    };

    if (def.title !== null && def.title !== undefined) {
      props.title = def.title;
    }

    return h(node, 'a', props, all_1(h, node));
  }

  var link_1$1 = link$3;

  function link$3(h, node) {
    var props = {
      href: encode_1(node.url)
    };

    if (node.title !== null && node.title !== undefined) {
      props.title = node.title;
    }

    return h(node, 'a', props, all_1(h, node));
  }

  var listItem_1 = listItem$1;







  function listItem$1(h, node, parent) {
    var children = node.children;
    var head = children[0];
    var raw = all_1(h, node);
    var loose = parent ? listLoose(parent) : listItemLoose(node);
    var props = {};
    var result;
    var container;
    var index;
    var length;
    var child; // Tight lists should not render `paragraph` nodes as `p` elements.

    if (loose) {
      result = raw;
    } else {
      result = [];
      length = raw.length;
      index = -1;

      while (++index < length) {
        child = raw[index];

        if (child.tagName === 'p') {
          result = result.concat(child.children);
        } else {
          result.push(child);
        }
      }
    }

    if (typeof node.checked === 'boolean') {
      if (loose && (!head || head.type !== 'paragraph')) {
        result.unshift(h(null, 'p', []));
      }

      container = loose ? result[0].children : result;

      if (container.length !== 0) {
        container.unshift(unistBuilder('text', ' '));
      }

      container.unshift(h(null, 'input', {
        type: 'checkbox',
        checked: node.checked,
        disabled: true
      })); // According to github-markdown-css, this class hides bullet.
      // See: <https://github.com/sindresorhus/github-markdown-css>.

      props.className = ['task-list-item'];
    }

    if (loose && result.length !== 0) {
      result = wrap_1(result, true);
    }

    return h(node, 'li', props, result);
  }

  function listLoose(node) {
    var loose = node.spread;
    var children = node.children;
    var length = children.length;
    var index = -1;

    while (!loose && ++index < length) {
      loose = listItemLoose(children[index]);
    }

    return loose;
  }

  function listItemLoose(node) {
    var spread = node.spread;
    return spread === undefined || spread === null ? node.children.length > 1 : spread;
  }

  var paragraph_1$1 = paragraph$1;



  function paragraph$1(h, node) {
    return h(node, 'p', all_1(h, node));
  }

  var root_1 = root;







  function root(h, node) {
    return h.augment(node, unistBuilder('root', wrap_1(all_1(h, node))));
  }

  var strong_1$1 = strong$2;



  function strong$2(h, node) {
    return h(node, 'strong', all_1(h, node));
  }

  var table_1$1 = table$1;







  function table$1(h, node) {
    var rows = node.children;
    var index = rows.length;
    var align = node.align;
    var alignLength = align.length;
    var result = [];
    var pos;
    var row;
    var out;
    var name;
    var cell;

    while (index--) {
      row = rows[index].children;
      name = index === 0 ? 'th' : 'td';
      pos = alignLength;
      out = [];

      while (pos--) {
        cell = row[pos];
        out[pos] = h(cell, name, {
          align: align[pos]
        }, cell ? all_1(h, cell) : []);
      }

      result[index] = h(rows[index], 'tr', wrap_1(out, true));
    }

    return h(node, 'table', wrap_1([h(result[0].position, 'thead', wrap_1([result[0]], true)), h({
      start: unistUtilPosition.start(result[1]),
      end: unistUtilPosition.end(result[result.length - 1])
    }, 'tbody', wrap_1(result.slice(1), true))], true));
  }

  var trimLines_1 = trimLines;
  var ws = /[ \t]*\n+[ \t]*/g;
  var newline$1 = '\n';

  function trimLines(value) {
    return String(value).replace(ws, newline$1);
  }

  var text_1$1 = text$2;





  function text$2(h, node) {
    return h.augment(node, unistBuilder('text', trimLines_1(node.value)));
  }

  var handlers = {
    blockquote: blockquote_1$1,
    break: _break$2,
    code: code_1,
    delete: _delete$2,
    emphasis: emphasis_1$1,
    footnoteReference: footnoteReference_1,
    footnote: footnote_1,
    heading: heading_1,
    html: html_1,
    imageReference: imageReference_1,
    image: image_1,
    inlineCode: inlineCode_1,
    linkReference: linkReference_1,
    link: link_1$1,
    listItem: listItem_1,
    list: list_1$1,
    paragraph: paragraph_1$1,
    root: root_1,
    strong: strong_1$1,
    table: table_1$1,
    text: text_1$1,
    thematicBreak: thematicBreak_1$1,
    toml: ignore,
    yaml: ignore,
    definition: ignore,
    footnoteDefinition: ignore
  }; // Return nothing for nodes that are ignored.

  function ignore() {
    return null;
  }

  var lib = toHast;



















  var own$4 = {}.hasOwnProperty; // Factory to transform.

  function factory$5(tree, options) {
    var settings = options || {};
    var dangerous = settings.allowDangerousHTML;
    var footnoteById = {};
    h.dangerous = dangerous;
    h.definition = mdastUtilDefinitions(tree, settings);
    h.footnoteById = footnoteById;
    h.footnoteOrder = [];
    h.augment = augment;
    h.handlers = immutable(handlers, settings.handlers || {});
    unistUtilVisit(tree, 'footnoteDefinition', onfootnotedefinition);
    return h; // Finalise the created `right`, a hast node, from `left`, an mdast node.

    function augment(left, right) {
      var data;
      var ctx; // Handle `data.hName`, `data.hProperties, `data.hChildren`.

      if (left && 'data' in left) {
        data = left.data;

        if (right.type === 'element' && data.hName) {
          right.tagName = data.hName;
        }

        if (right.type === 'element' && data.hProperties) {
          right.properties = immutable(right.properties, data.hProperties);
        }

        if (right.children && data.hChildren) {
          right.children = data.hChildren;
        }
      }

      ctx = left && left.position ? left : {
        position: left
      };

      if (!unistUtilGenerated(ctx)) {
        right.position = {
          start: unistUtilPosition.start(ctx),
          end: unistUtilPosition.end(ctx)
        };
      }

      return right;
    } // Create an element for `node`.


    function h(node, tagName, props, children) {
      if ((children === undefined || children === null) && typeof props === 'object' && 'length' in props) {
        children = props;
        props = {};
      }

      return augment(node, {
        type: 'element',
        tagName: tagName,
        properties: props || {},
        children: children || []
      });
    }

    function onfootnotedefinition(definition) {
      var id = definition.identifier.toUpperCase(); // Mimick CM behavior of link definitions.
      // See: <https://github.com/syntax-tree/mdast-util-definitions/blob/8d48e57/index.js#L26>.

      if (!own$4.call(footnoteById, id)) {
        footnoteById[id] = definition;
      }
    }
  } // Transform `tree`, which is an mdast node, to a hast node.


  function toHast(tree, options) {
    var h = factory$5(tree, options);
    var node = one_1(h, tree);
    var foot = footer(h);

    if (foot) {
      node.children = node.children.concat(unistBuilder('text', '\n'), foot);
    }

    return node;
  }

  var mdastUtilToHast = lib;

  var strip = [
  	"script"
  ];
  var clobberPrefix = "user-content-";
  var clobber = [
  	"name",
  	"id"
  ];
  var ancestors = {
  	li: [
  		"ol",
  		"ul"
  	],
  	tbody: [
  		"table"
  	],
  	tfoot: [
  		"table"
  	],
  	thead: [
  		"table"
  	],
  	td: [
  		"table"
  	],
  	th: [
  		"table"
  	],
  	tr: [
  		"table"
  	]
  };
  var protocols$2 = {
  	href: [
  		"http",
  		"https",
  		"mailto",
  		"xmpp",
  		"irc",
  		"ircs"
  	],
  	cite: [
  		"http",
  		"https"
  	],
  	src: [
  		"http",
  		"https"
  	],
  	longDesc: [
  		"http",
  		"https"
  	]
  };
  var tagNames = [
  	"h1",
  	"h2",
  	"h3",
  	"h4",
  	"h5",
  	"h6",
  	"h7",
  	"h8",
  	"br",
  	"b",
  	"i",
  	"strong",
  	"em",
  	"a",
  	"pre",
  	"code",
  	"img",
  	"tt",
  	"div",
  	"ins",
  	"del",
  	"sup",
  	"sub",
  	"p",
  	"ol",
  	"ul",
  	"table",
  	"thead",
  	"tbody",
  	"tfoot",
  	"blockquote",
  	"dl",
  	"dt",
  	"dd",
  	"kbd",
  	"q",
  	"samp",
  	"var",
  	"hr",
  	"ruby",
  	"rt",
  	"rp",
  	"li",
  	"tr",
  	"td",
  	"th",
  	"s",
  	"strike",
  	"summary",
  	"details",
  	"caption",
  	"figure",
  	"figcaption",
  	"abbr",
  	"bdo",
  	"cite",
  	"dfn",
  	"mark",
  	"small",
  	"span",
  	"time",
  	"wbr",
  	"input"
  ];
  var attributes = {
  	a: [
  		"href"
  	],
  	img: [
  		"src",
  		"longDesc"
  	],
  	input: [
  		[
  			"type",
  			"checkbox"
  		],
  		[
  			"disabled",
  			true
  		]
  	],
  	li: [
  		[
  			"className",
  			"task-list-item"
  		]
  	],
  	div: [
  		"itemScope",
  		"itemType"
  	],
  	blockquote: [
  		"cite"
  	],
  	del: [
  		"cite"
  	],
  	ins: [
  		"cite"
  	],
  	q: [
  		"cite"
  	],
  	"*": [
  		"abbr",
  		"accept",
  		"acceptCharset",
  		"accessKey",
  		"action",
  		"align",
  		"alt",
  		"ariaDescribedBy",
  		"ariaHidden",
  		"ariaLabel",
  		"ariaLabelledBy",
  		"axis",
  		"border",
  		"cellPadding",
  		"cellSpacing",
  		"char",
  		"charOff",
  		"charSet",
  		"checked",
  		"clear",
  		"cols",
  		"colSpan",
  		"color",
  		"compact",
  		"coords",
  		"dateTime",
  		"dir",
  		"disabled",
  		"encType",
  		"htmlFor",
  		"frame",
  		"headers",
  		"height",
  		"hrefLang",
  		"hSpace",
  		"isMap",
  		"id",
  		"label",
  		"lang",
  		"maxLength",
  		"media",
  		"method",
  		"multiple",
  		"name",
  		"noHref",
  		"noShade",
  		"noWrap",
  		"open",
  		"prompt",
  		"readOnly",
  		"rel",
  		"rev",
  		"rows",
  		"rowSpan",
  		"rules",
  		"scope",
  		"selected",
  		"shape",
  		"size",
  		"span",
  		"start",
  		"summary",
  		"tabIndex",
  		"target",
  		"title",
  		"type",
  		"useMap",
  		"vAlign",
  		"value",
  		"vSpace",
  		"width",
  		"itemProp"
  	]
  };
  var required = {
  	input: {
  		type: "checkbox",
  		disabled: true
  	}
  };
  var github = {
  	strip: strip,
  	clobberPrefix: clobberPrefix,
  	clobber: clobber,
  	ancestors: ancestors,
  	protocols: protocols$2,
  	tagNames: tagNames,
  	attributes: attributes,
  	required: required
  };

  var github$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    strip: strip,
    clobberPrefix: clobberPrefix,
    clobber: clobber,
    ancestors: ancestors,
    protocols: protocols$2,
    tagNames: tagNames,
    attributes: attributes,
    required: required,
    'default': github
  });

  var defaults$3 = getCjsExportFromNamespace(github$1);

  var lib$1 = wrapper;
  var own$5 = {}.hasOwnProperty;
  var allData = 'data*';
  var commentEnd = '-->';
  var nodeSchema = {
    root: {
      children: all$1
    },
    doctype: handleDoctype,
    comment: handleComment,
    element: {
      tagName: handleTagName,
      properties: handleProperties,
      children: all$1
    },
    text: {
      value: handleValue
    },
    '*': {
      data: allow,
      position: allow
    }
  }; // Sanitize `node`, according to `schema`.

  function wrapper(node, schema) {
    var ctx = {
      type: 'root',
      children: []
    };
    var replace;

    if (!node || typeof node !== 'object' || !node.type) {
      return ctx;
    }

    replace = one$1(immutable(defaults$3, schema || {}), node, []);

    if (!replace) {
      return ctx;
    }

    if ('length' in replace) {
      if (replace.length === 1) {
        return replace[0];
      }

      ctx.children = replace;
      return ctx;
    }

    return replace;
  } // Sanitize `node`.


  function one$1(schema, node, stack) {
    var type = node && node.type;
    var replacement = {
      type: node.type
    };
    var replace = true;
    var definition;
    var allowed;
    var result;
    var key;

    if (!own$5.call(nodeSchema, type)) {
      replace = false;
    } else {
      definition = nodeSchema[type];

      if (typeof definition === 'function') {
        definition = definition(schema, node);
      }

      if (!definition) {
        replace = false;
      } else {
        allowed = immutable(definition, nodeSchema['*']);

        for (key in allowed) {
          result = allowed[key](schema, node[key], node, stack);

          if (result === false) {
            replace = false; // Set the non-safe value.

            replacement[key] = node[key];
          } else if (result !== null && result !== undefined) {
            replacement[key] = result;
          }
        }
      }
    }

    if (!replace) {
      if (!replacement.children || replacement.children.length === 0 || schema.strip.indexOf(replacement.tagName) !== -1) {
        return null;
      }

      return replacement.children;
    }

    return replacement;
  } // Sanitize `children`.


  function all$1(schema, children, node, stack) {
    var nodes = children || [];
    var length = nodes.length || 0;
    var results = [];
    var index = -1;
    var result;
    stack = stack.concat(node.tagName);

    while (++index < length) {
      result = one$1(schema, nodes[index], stack);

      if (result) {
        if ('length' in result) {
          results = results.concat(result);
        } else {
          results.push(result);
        }
      }
    }

    return results;
  } // Sanitize `properties`.


  function handleProperties(schema, properties, node, stack) {
    var name = handleTagName(schema, node.tagName, node, stack);
    var attrs = schema.attributes;
    var reqs = schema.required ||
    /* istanbul ignore next */
    {};
    var props = properties || {};
    var result = {};
    var allowed;
    var required;
    var definition;
    var prop;
    var value;
    allowed = immutable(toPropertyValueMap(attrs['*']), toPropertyValueMap(own$5.call(attrs, name) ? attrs[name] : []));

    for (prop in props) {
      value = props[prop];

      if (own$5.call(allowed, prop)) {
        definition = allowed[prop];
      } else if (data(prop) && own$5.call(allowed, allData)) {
        definition = allowed[allData];
      } else {
        continue;
      }

      if (value && typeof value === 'object' && 'length' in value) {
        value = handlePropertyValues(schema, value, prop, definition);
      } else {
        value = handlePropertyValue(schema, value, prop, definition);
      }

      if (value !== null && value !== undefined) {
        result[prop] = value;
      }
    }

    required = own$5.call(reqs, name) ? reqs[name] : {};

    for (prop in required) {
      if (!own$5.call(result, prop)) {
        result[prop] = required[prop];
      }
    }

    return result;
  } // Sanitize a property value which is a list.


  function handlePropertyValues(schema, values, prop, definition) {
    var length = values.length;
    var result = [];
    var index = -1;
    var value;

    while (++index < length) {
      value = handlePropertyValue(schema, values[index], prop, definition);

      if (value !== null && value !== undefined) {
        result.push(value);
      }
    }

    return result;
  } // Sanitize a property value.


  function handlePropertyValue(schema, value, prop, definition) {
    if (typeof value !== 'boolean' && typeof value !== 'number' && typeof value !== 'string') {
      return null;
    }

    if (!handleProtocol(schema, value, prop)) {
      return null;
    }

    if (definition.length !== 0 && definition.indexOf(value) === -1) {
      return null;
    }

    if (schema.clobber.indexOf(prop) !== -1) {
      value = schema.clobberPrefix + value;
    }

    return value;
  } // Check whether `value` is a safe URL.


  function handleProtocol(schema, value, prop) {
    var protocols = schema.protocols;
    var protocol;
    var first;
    var colon;
    var length;
    var index;
    protocols = own$5.call(protocols, prop) ? protocols[prop].concat() : [];

    if (protocols.length === 0) {
      return true;
    }

    value = String(value);
    first = value.charAt(0);

    if (first === '#' || first === '/') {
      return true;
    }

    colon = value.indexOf(':');

    if (colon === -1) {
      return true;
    }

    length = protocols.length;
    index = -1;

    while (++index < length) {
      protocol = protocols[index];

      if (colon === protocol.length && value.slice(0, protocol.length) === protocol) {
        return true;
      }
    }

    index = value.indexOf('?');

    if (index !== -1 && colon > index) {
      return true;
    }

    index = value.indexOf('#');

    if (index !== -1 && colon > index) {
      return true;
    }

    return false;
  } // Always return a valid HTML5 doctype.


  function handleDoctypeName() {
    return 'html';
  } // Sanitize `tagName`.


  function handleTagName(schema, tagName, node, stack) {
    var name = typeof tagName === 'string' ? tagName : null;
    var ancestors = schema.ancestors;
    var length;
    var index;

    if (!name || name === '*' || schema.tagNames.indexOf(name) === -1) {
      return false;
    }

    ancestors = own$5.call(ancestors, name) ? ancestors[name] : []; // Some nodes can break out of their context if they don’t have a certain
    // ancestor.

    if (ancestors.length !== 0) {
      length = ancestors.length + 1;
      index = -1;

      while (++index < length) {
        if (!ancestors[index]) {
          return false;
        }

        if (stack.indexOf(ancestors[index]) !== -1) {
          break;
        }
      }
    }

    return name;
  }

  function handleDoctype(schema) {
    return schema.allowDoctypes ? {
      name: handleDoctypeName
    } : null;
  }

  function handleComment(schema) {
    return schema.allowComments ? {
      value: handleCommentValue
    } : null;
  } // See <https://html.spec.whatwg.org/multipage/parsing.html#serialising-html-fragments>


  function handleCommentValue(schema, value) {
    var val = typeof value === 'string' ? value : '';
    var index = val.indexOf(commentEnd);
    return index === -1 ? val : val.slice(0, index);
  } // Sanitize `value`.


  function handleValue(schema, value) {
    return typeof value === 'string' ? value : '';
  } // Create a map from a list of props or a list of properties and values.


  function toPropertyValueMap(values) {
    var result = {};
    var length = values.length;
    var index = -1;
    var value;

    while (++index < length) {
      value = values[index];

      if (value && typeof value === 'object' && 'length' in value) {
        result[value[0]] = value.slice(1);
      } else {
        result[value] = [];
      }
    }

    return result;
  } // Allow `value`.


  function allow(schema, value) {
    return value;
  } // Check if `prop` is a data property.


  function data(prop) {
    return prop.length > 4 && prop.slice(0, 4).toLowerCase() === 'data';
  }

  var hastUtilSanitize = lib$1;

  var schema = Schema;
  var proto$1 = Schema.prototype;
  proto$1.space = null;
  proto$1.normal = {};
  proto$1.property = {};

  function Schema(property, normal, space) {
    this.property = property;
    this.normal = normal;

    if (space) {
      this.space = space;
    }
  }

  var merge_1 = merge;

  function merge(definitions) {
    var length = definitions.length;
    var property = [];
    var normal = [];
    var index = -1;
    var info;
    var space;

    while (++index < length) {
      info = definitions[index];
      property.push(info.property);
      normal.push(info.normal);
      space = info.space;
    }

    return new schema(immutable.apply(null, property), immutable.apply(null, normal), space);
  }

  var normalize_1$1 = normalize$1;

  function normalize$1(value) {
    return value.toLowerCase();
  }

  var info = Info;
  var proto$2 = Info.prototype;
  proto$2.space = null;
  proto$2.attribute = null;
  proto$2.property = null;
  proto$2.boolean = false;
  proto$2.booleanish = false;
  proto$2.overloadedBoolean = false;
  proto$2.number = false;
  proto$2.commaSeparated = false;
  proto$2.spaceSeparated = false;
  proto$2.commaOrSpaceSeparated = false;
  proto$2.mustUseProperty = false;
  proto$2.defined = false;

  function Info(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }

  var powers = 0;
  var boolean_1 = increment();
  var booleanish = increment();
  var overloadedBoolean = increment();
  var number = increment();
  var spaceSeparated = increment();
  var commaSeparated = increment();
  var commaOrSpaceSeparated = increment();

  function increment() {
    return Math.pow(2, ++powers);
  }

  var types = {
  	boolean: boolean_1,
  	booleanish: booleanish,
  	overloadedBoolean: overloadedBoolean,
  	number: number,
  	spaceSeparated: spaceSeparated,
  	commaSeparated: commaSeparated,
  	commaOrSpaceSeparated: commaOrSpaceSeparated
  };

  var definedInfo = DefinedInfo;
  DefinedInfo.prototype = new info();
  DefinedInfo.prototype.defined = true;
  var checks = ['boolean', 'booleanish', 'overloadedBoolean', 'number', 'commaSeparated', 'spaceSeparated', 'commaOrSpaceSeparated'];
  var checksLength = checks.length;

  function DefinedInfo(property, attribute, mask, space) {
    var index = -1;
    var check;
    mark(this, 'space', space);
    info.call(this, property, attribute);

    while (++index < checksLength) {
      check = checks[index];
      mark(this, check, (mask & types[check]) === types[check]);
    }
  }

  function mark(values, key, value) {
    if (value) {
      values[key] = value;
    }
  }

  var create_1 = create;

  function create(definition) {
    var space = definition.space;
    var mustUseProperty = definition.mustUseProperty || [];
    var attributes = definition.attributes || {};
    var props = definition.properties;
    var transform = definition.transform;
    var property = {};
    var normal = {};
    var prop;
    var info;

    for (prop in props) {
      info = new definedInfo(prop, transform(attributes, prop), props[prop], space);

      if (mustUseProperty.indexOf(prop) !== -1) {
        info.mustUseProperty = true;
      }

      property[prop] = info;
      normal[normalize_1$1(prop)] = prop;
      normal[normalize_1$1(info.attribute)] = prop;
    }

    return new schema(property, normal, space);
  }

  var xlink = create_1({
    space: 'xlink',
    transform: xlinkTransform,
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null
    }
  });

  function xlinkTransform(_, prop) {
    return 'xlink:' + prop.slice(5).toLowerCase();
  }

  var xml = create_1({
    space: 'xml',
    transform: xmlTransform,
    properties: {
      xmlLang: null,
      xmlBase: null,
      xmlSpace: null
    }
  });

  function xmlTransform(_, prop) {
    return 'xml:' + prop.slice(3).toLowerCase();
  }

  var caseSensitiveTransform_1 = caseSensitiveTransform;

  function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute;
  }

  var caseInsensitiveTransform_1 = caseInsensitiveTransform;

  function caseInsensitiveTransform(attributes, property) {
    return caseSensitiveTransform_1(attributes, property.toLowerCase());
  }

  var xmlns = create_1({
    space: 'xmlns',
    attributes: {
      xmlnsxlink: 'xmlns:xlink'
    },
    transform: caseInsensitiveTransform_1,
    properties: {
      xmlns: null,
      xmlnsXLink: null
    }
  });

  var booleanish$1 = types.booleanish;
  var number$1 = types.number;
  var spaceSeparated$1 = types.spaceSeparated;
  var aria = create_1({
    transform: ariaTransform,
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: booleanish$1,
      ariaAutoComplete: null,
      ariaBusy: booleanish$1,
      ariaChecked: booleanish$1,
      ariaColCount: number$1,
      ariaColIndex: number$1,
      ariaColSpan: number$1,
      ariaControls: spaceSeparated$1,
      ariaCurrent: null,
      ariaDescribedBy: spaceSeparated$1,
      ariaDetails: null,
      ariaDisabled: booleanish$1,
      ariaDropEffect: spaceSeparated$1,
      ariaErrorMessage: null,
      ariaExpanded: booleanish$1,
      ariaFlowTo: spaceSeparated$1,
      ariaGrabbed: booleanish$1,
      ariaHasPopup: null,
      ariaHidden: booleanish$1,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: spaceSeparated$1,
      ariaLevel: number$1,
      ariaLive: null,
      ariaModal: booleanish$1,
      ariaMultiLine: booleanish$1,
      ariaMultiSelectable: booleanish$1,
      ariaOrientation: null,
      ariaOwns: spaceSeparated$1,
      ariaPlaceholder: null,
      ariaPosInSet: number$1,
      ariaPressed: booleanish$1,
      ariaReadOnly: booleanish$1,
      ariaRelevant: null,
      ariaRequired: booleanish$1,
      ariaRoleDescription: spaceSeparated$1,
      ariaRowCount: number$1,
      ariaRowIndex: number$1,
      ariaRowSpan: number$1,
      ariaSelected: booleanish$1,
      ariaSetSize: number$1,
      ariaSort: null,
      ariaValueMax: number$1,
      ariaValueMin: number$1,
      ariaValueNow: number$1,
      ariaValueText: null,
      role: null
    }
  });

  function ariaTransform(_, prop) {
    return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase();
  }

  var boolean = types.boolean;
  var overloadedBoolean$1 = types.overloadedBoolean;
  var booleanish$2 = types.booleanish;
  var number$2 = types.number;
  var spaceSeparated$2 = types.spaceSeparated;
  var commaSeparated$1 = types.commaSeparated;
  var html$2 = create_1({
    space: 'html',
    attributes: {
      acceptcharset: 'accept-charset',
      classname: 'class',
      htmlfor: 'for',
      httpequiv: 'http-equiv'
    },
    transform: caseInsensitiveTransform_1,
    mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
    properties: {
      // Standard Properties.
      abbr: null,
      accept: commaSeparated$1,
      acceptCharset: spaceSeparated$2,
      accessKey: spaceSeparated$2,
      action: null,
      allow: null,
      allowFullScreen: boolean,
      allowPaymentRequest: boolean,
      allowUserMedia: boolean,
      alt: null,
      as: null,
      async: boolean,
      autoCapitalize: null,
      autoComplete: spaceSeparated$2,
      autoFocus: boolean,
      autoPlay: boolean,
      capture: boolean,
      charSet: null,
      checked: boolean,
      cite: null,
      className: spaceSeparated$2,
      cols: number$2,
      colSpan: null,
      content: null,
      contentEditable: booleanish$2,
      controls: boolean,
      controlsList: spaceSeparated$2,
      coords: number$2 | commaSeparated$1,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: boolean,
      defer: boolean,
      dir: null,
      dirName: null,
      disabled: boolean,
      download: overloadedBoolean$1,
      draggable: booleanish$2,
      encType: null,
      enterKeyHint: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: boolean,
      formTarget: null,
      headers: spaceSeparated$2,
      height: number$2,
      hidden: boolean,
      high: number$2,
      href: null,
      hrefLang: null,
      htmlFor: spaceSeparated$2,
      httpEquiv: spaceSeparated$2,
      id: null,
      imageSizes: null,
      imageSrcSet: commaSeparated$1,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: boolean,
      itemId: null,
      itemProp: spaceSeparated$2,
      itemRef: spaceSeparated$2,
      itemScope: boolean,
      itemType: spaceSeparated$2,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loop: boolean,
      low: number$2,
      manifest: null,
      max: null,
      maxLength: number$2,
      media: null,
      method: null,
      min: null,
      minLength: number$2,
      multiple: boolean,
      muted: boolean,
      name: null,
      nonce: null,
      noModule: boolean,
      noValidate: boolean,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforePrint: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextMenu: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: boolean,
      optimum: number$2,
      pattern: null,
      ping: spaceSeparated$2,
      placeholder: null,
      playsInline: boolean,
      poster: null,
      preload: null,
      readOnly: boolean,
      referrerPolicy: null,
      rel: spaceSeparated$2,
      required: boolean,
      reversed: boolean,
      rows: number$2,
      rowSpan: number$2,
      sandbox: spaceSeparated$2,
      scope: null,
      scoped: boolean,
      seamless: boolean,
      selected: boolean,
      shape: null,
      size: number$2,
      sizes: null,
      slot: null,
      span: number$2,
      spellCheck: booleanish$2,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: commaSeparated$1,
      start: number$2,
      step: null,
      style: null,
      tabIndex: number$2,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: boolean,
      useMap: null,
      value: booleanish$2,
      width: number$2,
      wrap: null,
      // Legacy.
      // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
      align: null,
      // Several. Use CSS `text-align` instead,
      aLink: null,
      // `<body>`. Use CSS `a:active {color}` instead
      archive: spaceSeparated$2,
      // `<object>`. List of URIs to archives
      axis: null,
      // `<td>` and `<th>`. Use `scope` on `<th>`
      background: null,
      // `<body>`. Use CSS `background-image` instead
      bgColor: null,
      // `<body>` and table elements. Use CSS `background-color` instead
      border: number$2,
      // `<table>`. Use CSS `border-width` instead,
      borderColor: null,
      // `<table>`. Use CSS `border-color` instead,
      bottomMargin: number$2,
      // `<body>`
      cellPadding: null,
      // `<table>`
      cellSpacing: null,
      // `<table>`
      char: null,
      // Several table elements. When `align=char`, sets the character to align on
      charOff: null,
      // Several table elements. When `char`, offsets the alignment
      classId: null,
      // `<object>`
      clear: null,
      // `<br>`. Use CSS `clear` instead
      code: null,
      // `<object>`
      codeBase: null,
      // `<object>`
      codeType: null,
      // `<object>`
      color: null,
      // `<font>` and `<hr>`. Use CSS instead
      compact: boolean,
      // Lists. Use CSS to reduce space between items instead
      declare: boolean,
      // `<object>`
      event: null,
      // `<script>`
      face: null,
      // `<font>`. Use CSS instead
      frame: null,
      // `<table>`
      frameBorder: null,
      // `<iframe>`. Use CSS `border` instead
      hSpace: number$2,
      // `<img>` and `<object>`
      leftMargin: number$2,
      // `<body>`
      link: null,
      // `<body>`. Use CSS `a:link {color: *}` instead
      longDesc: null,
      // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
      lowSrc: null,
      // `<img>`. Use a `<picture>`
      marginHeight: number$2,
      // `<body>`
      marginWidth: number$2,
      // `<body>`
      noResize: boolean,
      // `<frame>`
      noHref: boolean,
      // `<area>`. Use no href instead of an explicit `nohref`
      noShade: boolean,
      // `<hr>`. Use background-color and height instead of borders
      noWrap: boolean,
      // `<td>` and `<th>`
      object: null,
      // `<applet>`
      profile: null,
      // `<head>`
      prompt: null,
      // `<isindex>`
      rev: null,
      // `<link>`
      rightMargin: number$2,
      // `<body>`
      rules: null,
      // `<table>`
      scheme: null,
      // `<meta>`
      scrolling: booleanish$2,
      // `<frame>`. Use overflow in the child context
      standby: null,
      // `<object>`
      summary: null,
      // `<table>`
      text: null,
      // `<body>`. Use CSS `color` instead
      topMargin: number$2,
      // `<body>`
      valueType: null,
      // `<param>`
      version: null,
      // `<html>`. Use a doctype.
      vAlign: null,
      // Several. Use CSS `vertical-align` instead
      vLink: null,
      // `<body>`. Use CSS `a:visited {color}` instead
      vSpace: number$2,
      // `<img>` and `<object>`
      // Non-standard Properties.
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      prefix: null,
      property: null,
      results: number$2,
      security: null,
      unselectable: null
    }
  });

  var html_1$1 = merge_1([xml, xlink, xmlns, aria, html$2]);

  var boolean$1 = types.boolean;
  var number$3 = types.number;
  var spaceSeparated$3 = types.spaceSeparated;
  var commaSeparated$2 = types.commaSeparated;
  var commaOrSpaceSeparated$1 = types.commaOrSpaceSeparated;
  var svg = create_1({
    space: 'svg',
    attributes: {
      accentHeight: 'accent-height',
      alignmentBaseline: 'alignment-baseline',
      arabicForm: 'arabic-form',
      baselineShift: 'baseline-shift',
      capHeight: 'cap-height',
      className: 'class',
      clipPath: 'clip-path',
      clipRule: 'clip-rule',
      colorInterpolation: 'color-interpolation',
      colorInterpolationFilters: 'color-interpolation-filters',
      colorProfile: 'color-profile',
      colorRendering: 'color-rendering',
      crossOrigin: 'crossorigin',
      dataType: 'datatype',
      dominantBaseline: 'dominant-baseline',
      enableBackground: 'enable-background',
      fillOpacity: 'fill-opacity',
      fillRule: 'fill-rule',
      floodColor: 'flood-color',
      floodOpacity: 'flood-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      fontSizeAdjust: 'font-size-adjust',
      fontStretch: 'font-stretch',
      fontStyle: 'font-style',
      fontVariant: 'font-variant',
      fontWeight: 'font-weight',
      glyphName: 'glyph-name',
      glyphOrientationHorizontal: 'glyph-orientation-horizontal',
      glyphOrientationVertical: 'glyph-orientation-vertical',
      hrefLang: 'hreflang',
      horizAdvX: 'horiz-adv-x',
      horizOriginX: 'horiz-origin-x',
      horizOriginY: 'horiz-origin-y',
      imageRendering: 'image-rendering',
      letterSpacing: 'letter-spacing',
      lightingColor: 'lighting-color',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      navDown: 'nav-down',
      navDownLeft: 'nav-down-left',
      navDownRight: 'nav-down-right',
      navLeft: 'nav-left',
      navNext: 'nav-next',
      navPrev: 'nav-prev',
      navRight: 'nav-right',
      navUp: 'nav-up',
      navUpLeft: 'nav-up-left',
      navUpRight: 'nav-up-right',
      onAbort: 'onabort',
      onActivate: 'onactivate',
      onAfterPrint: 'onafterprint',
      onBeforePrint: 'onbeforeprint',
      onBegin: 'onbegin',
      onCancel: 'oncancel',
      onCanPlay: 'oncanplay',
      onCanPlayThrough: 'oncanplaythrough',
      onChange: 'onchange',
      onClick: 'onclick',
      onClose: 'onclose',
      onCopy: 'oncopy',
      onCueChange: 'oncuechange',
      onCut: 'oncut',
      onDblClick: 'ondblclick',
      onDrag: 'ondrag',
      onDragEnd: 'ondragend',
      onDragEnter: 'ondragenter',
      onDragExit: 'ondragexit',
      onDragLeave: 'ondragleave',
      onDragOver: 'ondragover',
      onDragStart: 'ondragstart',
      onDrop: 'ondrop',
      onDurationChange: 'ondurationchange',
      onEmptied: 'onemptied',
      onEnd: 'onend',
      onEnded: 'onended',
      onError: 'onerror',
      onFocus: 'onfocus',
      onFocusIn: 'onfocusin',
      onFocusOut: 'onfocusout',
      onHashChange: 'onhashchange',
      onInput: 'oninput',
      onInvalid: 'oninvalid',
      onKeyDown: 'onkeydown',
      onKeyPress: 'onkeypress',
      onKeyUp: 'onkeyup',
      onLoad: 'onload',
      onLoadedData: 'onloadeddata',
      onLoadedMetadata: 'onloadedmetadata',
      onLoadStart: 'onloadstart',
      onMessage: 'onmessage',
      onMouseDown: 'onmousedown',
      onMouseEnter: 'onmouseenter',
      onMouseLeave: 'onmouseleave',
      onMouseMove: 'onmousemove',
      onMouseOut: 'onmouseout',
      onMouseOver: 'onmouseover',
      onMouseUp: 'onmouseup',
      onMouseWheel: 'onmousewheel',
      onOffline: 'onoffline',
      onOnline: 'ononline',
      onPageHide: 'onpagehide',
      onPageShow: 'onpageshow',
      onPaste: 'onpaste',
      onPause: 'onpause',
      onPlay: 'onplay',
      onPlaying: 'onplaying',
      onPopState: 'onpopstate',
      onProgress: 'onprogress',
      onRateChange: 'onratechange',
      onRepeat: 'onrepeat',
      onReset: 'onreset',
      onResize: 'onresize',
      onScroll: 'onscroll',
      onSeeked: 'onseeked',
      onSeeking: 'onseeking',
      onSelect: 'onselect',
      onShow: 'onshow',
      onStalled: 'onstalled',
      onStorage: 'onstorage',
      onSubmit: 'onsubmit',
      onSuspend: 'onsuspend',
      onTimeUpdate: 'ontimeupdate',
      onToggle: 'ontoggle',
      onUnload: 'onunload',
      onVolumeChange: 'onvolumechange',
      onWaiting: 'onwaiting',
      onZoom: 'onzoom',
      overlinePosition: 'overline-position',
      overlineThickness: 'overline-thickness',
      paintOrder: 'paint-order',
      panose1: 'panose-1',
      pointerEvents: 'pointer-events',
      referrerPolicy: 'referrerpolicy',
      renderingIntent: 'rendering-intent',
      shapeRendering: 'shape-rendering',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strikethroughPosition: 'strikethrough-position',
      strikethroughThickness: 'strikethrough-thickness',
      strokeDashArray: 'stroke-dasharray',
      strokeDashOffset: 'stroke-dashoffset',
      strokeLineCap: 'stroke-linecap',
      strokeLineJoin: 'stroke-linejoin',
      strokeMiterLimit: 'stroke-miterlimit',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      tabIndex: 'tabindex',
      textAnchor: 'text-anchor',
      textDecoration: 'text-decoration',
      textRendering: 'text-rendering',
      typeOf: 'typeof',
      underlinePosition: 'underline-position',
      underlineThickness: 'underline-thickness',
      unicodeBidi: 'unicode-bidi',
      unicodeRange: 'unicode-range',
      unitsPerEm: 'units-per-em',
      vAlphabetic: 'v-alphabetic',
      vHanging: 'v-hanging',
      vIdeographic: 'v-ideographic',
      vMathematical: 'v-mathematical',
      vectorEffect: 'vector-effect',
      vertAdvY: 'vert-adv-y',
      vertOriginX: 'vert-origin-x',
      vertOriginY: 'vert-origin-y',
      wordSpacing: 'word-spacing',
      writingMode: 'writing-mode',
      xHeight: 'x-height',
      // These were camelcased in Tiny. Now lowercased in SVG 2
      playbackOrder: 'playbackorder',
      timelineBegin: 'timelinebegin'
    },
    transform: caseSensitiveTransform_1,
    properties: {
      about: commaOrSpaceSeparated$1,
      accentHeight: number$3,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: number$3,
      amplitude: number$3,
      arabicForm: null,
      ascent: number$3,
      attributeName: null,
      attributeType: null,
      azimuth: number$3,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: number$3,
      by: null,
      calcMode: null,
      capHeight: number$3,
      className: spaceSeparated$3,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: number$3,
      diffuseConstant: number$3,
      direction: null,
      display: null,
      dur: null,
      divisor: number$3,
      dominantBaseline: null,
      download: boolean$1,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: number$3,
      enableBackground: null,
      end: null,
      event: null,
      exponent: number$3,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: number$3,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: commaSeparated$2,
      g2: commaSeparated$2,
      glyphName: commaSeparated$2,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: number$3,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: number$3,
      horizOriginX: number$3,
      horizOriginY: number$3,
      id: null,
      ideographic: number$3,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: number$3,
      k: number$3,
      k1: number$3,
      k2: number$3,
      k3: number$3,
      k4: number$3,
      kernelMatrix: commaOrSpaceSeparated$1,
      kernelUnitLength: null,
      keyPoints: null,
      // SEMI_COLON_SEPARATED
      keySplines: null,
      // SEMI_COLON_SEPARATED
      keyTimes: null,
      // SEMI_COLON_SEPARATED
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: number$3,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: number$3,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: number$3,
      overlineThickness: number$3,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: number$3,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: spaceSeparated$3,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: number$3,
      pointsAtY: number$3,
      pointsAtZ: number$3,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: commaOrSpaceSeparated$1,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: commaOrSpaceSeparated$1,
      rev: commaOrSpaceSeparated$1,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: commaOrSpaceSeparated$1,
      requiredFeatures: commaOrSpaceSeparated$1,
      requiredFonts: commaOrSpaceSeparated$1,
      requiredFormats: commaOrSpaceSeparated$1,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: number$3,
      specularExponent: number$3,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: number$3,
      strikethroughThickness: number$3,
      string: null,
      stroke: null,
      strokeDashArray: commaOrSpaceSeparated$1,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: number$3,
      strokeOpacity: number$3,
      strokeWidth: null,
      style: null,
      surfaceScale: number$3,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: commaOrSpaceSeparated$1,
      tabIndex: number$3,
      tableValues: null,
      target: null,
      targetX: number$3,
      targetY: number$3,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: commaOrSpaceSeparated$1,
      to: null,
      transform: null,
      u1: null,
      u2: null,
      underlinePosition: number$3,
      underlineThickness: number$3,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: number$3,
      values: null,
      vAlphabetic: number$3,
      vMathematical: number$3,
      vectorEffect: null,
      vHanging: number$3,
      vIdeographic: number$3,
      version: null,
      vertAdvY: number$3,
      vertOriginX: number$3,
      vertOriginY: number$3,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: number$3,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null
    }
  });

  var svg_1 = merge_1([xml, xlink, xmlns, aria, svg]);

  var data$1 = 'data';
  var find_1 = find;
  var valid = /^data[-a-z0-9.:_]+$/i;
  var dash$5 = /-[a-z]/g;
  var cap$1 = /[A-Z]/g;

  function find(schema, value) {
    var normal = normalize_1$1(value);
    var prop = value;
    var Type = info;

    if (normal in schema.normal) {
      return schema.property[schema.normal[normal]];
    }

    if (normal.length > 4 && normal.slice(0, 4) === data$1 && valid.test(value)) {
      // Attribute or property.
      if (value.charAt(4) === '-') {
        prop = datasetToProperty(value);
      } else {
        value = datasetToAttribute(value);
      }

      Type = definedInfo;
    }

    return new Type(prop, value);
  }

  function datasetToProperty(attribute) {
    var value = attribute.slice(5).replace(dash$5, camelcase);
    return data$1 + value.charAt(0).toUpperCase() + value.slice(1);
  }

  function datasetToAttribute(property) {
    var value = property.slice(4);

    if (dash$5.test(value)) {
      return property;
    }

    value = value.replace(cap$1, kebab);

    if (value.charAt(0) !== '-') {
      value = '-' + value;
    }

    return data$1 + value;
  }

  function kebab($0) {
    return '-' + $0.toLowerCase();
  }

  function camelcase($0) {
    return $0.charAt(1).toUpperCase();
  }

  var parse_1$1 = parse$3;
  var stringify_1 = stringify;
  var empty$1 = '';
  var space$i = ' ';
  var whiteSpace = /[ \t\n\r\f]+/g;

  function parse$3(value) {
    var input = String(value || empty$1).trim();
    return input === empty$1 ? [] : input.split(whiteSpace);
  }

  function stringify(values) {
    return values.join(space$i).trim();
  }

  var spaceSeparatedTokens = {
  	parse: parse_1$1,
  	stringify: stringify_1
  };

  var parse_1$2 = parse$4;
  var stringify_1$1 = stringify$1;
  var comma$2 = ',';
  var space$j = ' ';
  var empty$2 = ''; // Parse comma-separated tokens to an array.

  function parse$4(value) {
    var values = [];
    var input = String(value || empty$2);
    var index = input.indexOf(comma$2);
    var lastIndex = 0;
    var end = false;
    var val;

    while (!end) {
      if (index === -1) {
        index = input.length;
        end = true;
      }

      val = input.slice(lastIndex, index).trim();

      if (val || !end) {
        values.push(val);
      }

      lastIndex = index + 1;
      index = input.indexOf(comma$2, lastIndex);
    }

    return values;
  } // Compile an array to comma-separated tokens.
  // `options.padLeft` (default: `true`) pads a space left of each token, and
  // `options.padRight` (default: `false`) pads a space to the right of each token.


  function stringify$1(values, options) {
    var settings = options || {};
    var left = settings.padLeft === false ? empty$2 : space$j;
    var right = settings.padRight ? space$j : empty$2; // Ensure the last empty entry is seen.

    if (values[values.length - 1] === empty$2) {
      values = values.concat(empty$2);
    }

    return values.join(right + comma$2 + left).trim();
  }

  var commaSeparatedTokens = {
  	parse: parse_1$2,
  	stringify: stringify_1$1
  };

  // http://www.w3.org/TR/CSS21/grammar.html
  // https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
  var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
  var NEWLINE_REGEX = /\n/g;
  var WHITESPACE_REGEX = /^\s*/; // declaration

  var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
  var COLON_REGEX = /^:\s*/;
  var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
  var SEMICOLON_REGEX = /^[;\s]*/; // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill

  var TRIM_REGEX = /^\s+|\s+$/g; // strings

  var NEWLINE = '\n';
  var FORWARD_SLASH = '/';
  var ASTERISK = '*';
  var EMPTY_STRING = ''; // types

  var TYPE_COMMENT = 'comment';
  var TYPE_DECLARATION = 'declaration';
  /**
   * @param {String} style
   * @param {Object} [options]
   * @return {Object[]}
   * @throws {TypeError}
   * @throws {Error}
   */

  var inlineStyleParser = function (style, options) {
    if (typeof style !== 'string') {
      throw new TypeError('First argument must be a string');
    }

    if (!style) return [];
    options = options || {};
    /**
     * Positional.
     */

    var lineno = 1;
    var column = 1;
    /**
     * Update lineno and column based on `str`.
     *
     * @param {String} str
     */

    function updatePosition(str) {
      var lines = str.match(NEWLINE_REGEX);
      if (lines) lineno += lines.length;
      var i = str.lastIndexOf(NEWLINE);
      column = ~i ? str.length - i : column + str.length;
    }
    /**
     * Mark position and patch `node.position`.
     *
     * @return {Function}
     */


    function position() {
      var start = {
        line: lineno,
        column: column
      };
      return function (node) {
        node.position = new Position(start);
        whitespace();
        return node;
      };
    }
    /**
     * Store position information for a node.
     *
     * @constructor
     * @property {Object} start
     * @property {Object} end
     * @property {undefined|String} source
     */


    function Position(start) {
      this.start = start;
      this.end = {
        line: lineno,
        column: column
      };
      this.source = options.source;
    }
    /**
     * Non-enumerable source string.
     */


    Position.prototype.content = style;
    /**
     * Error `msg`.
     *
     * @param {String} msg
     * @throws {Error}
     */

    function error(msg) {
      var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
      err.reason = msg;
      err.filename = options.source;
      err.line = lineno;
      err.column = column;
      err.source = style;

      if (options.silent) ; else {
        throw err;
      }
    }
    /**
     * Match `re` and return captures.
     *
     * @param {RegExp} re
     * @return {undefined|Array}
     */


    function match(re) {
      var m = re.exec(style);
      if (!m) return;
      var str = m[0];
      updatePosition(str);
      style = style.slice(str.length);
      return m;
    }
    /**
     * Parse whitespace.
     */


    function whitespace() {
      match(WHITESPACE_REGEX);
    }
    /**
     * Parse comments.
     *
     * @param {Object[]} [rules]
     * @return {Object[]}
     */


    function comments(rules) {
      var c;
      rules = rules || [];

      while (c = comment()) {
        if (c !== false) {
          rules.push(c);
        }
      }

      return rules;
    }
    /**
     * Parse comment.
     *
     * @return {Object}
     * @throws {Error}
     */


    function comment() {
      var pos = position();
      if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
      var i = 2;

      while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
        ++i;
      }

      i += 2;

      if (EMPTY_STRING === style.charAt(i - 1)) {
        return error('End of comment missing');
      }

      var str = style.slice(2, i - 2);
      column += 2;
      updatePosition(str);
      style = style.slice(i);
      column += 2;
      return pos({
        type: TYPE_COMMENT,
        comment: str
      });
    }
    /**
     * Parse declaration.
     *
     * @return {Object}
     * @throws {Error}
     */


    function declaration() {
      var pos = position(); // prop

      var prop = match(PROPERTY_REGEX);
      if (!prop) return;
      comment(); // :

      if (!match(COLON_REGEX)) return error("property missing ':'"); // val

      var val = match(VALUE_REGEX);
      var ret = pos({
        type: TYPE_DECLARATION,
        property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
        value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
      }); // ;

      match(SEMICOLON_REGEX);
      return ret;
    }
    /**
     * Parse declarations.
     *
     * @return {Object[]}
     */


    function declarations() {
      var decls = [];
      comments(decls); // declarations

      var decl;

      while (decl = declaration()) {
        if (decl !== false) {
          decls.push(decl);
          comments(decls);
        }
      }

      return decls;
    }

    whitespace();
    return declarations();
  };
  /**
   * Trim `str`.
   *
   * @param {String} str
   * @return {String}
   */


  function trim(str) {
    return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
  }

  /**
   * Parses inline style to object.
   *
   * @example
   * // returns { 'line-height': '42' }
   * StyleToObject('line-height: 42;');
   *
   * @param  {String}      style      - The inline style.
   * @param  {Function}    [iterator] - The iterator function.
   * @return {null|Object}
   */


  function StyleToObject(style, iterator) {
    var output = null;

    if (!style || typeof style !== 'string') {
      return output;
    }

    var declaration;
    var declarations = inlineStyleParser(style);
    var hasIterator = typeof iterator === 'function';
    var property;
    var value;

    for (var i = 0, len = declarations.length; i < len; i++) {
      declaration = declarations[i];
      property = declaration.property;
      value = declaration.value;

      if (hasIterator) {
        iterator(property, value, declaration);
      } else if (value) {
        output || (output = {});
        output[property] = value;
      }
    }

    return output;
  }

  var styleToObject = StyleToObject;

  var html$3 = "http://www.w3.org/1999/xhtml";
  var mathml = "http://www.w3.org/1998/Math/MathML";
  var svg$1 = "http://www.w3.org/2000/svg";
  var xlink$1 = "http://www.w3.org/1999/xlink";
  var xml$1 = "http://www.w3.org/XML/1998/namespace";
  var xmlns$1 = "http://www.w3.org/2000/xmlns/";
  var index$3 = {
  	html: html$3,
  	mathml: mathml,
  	svg: svg$1,
  	xlink: xlink$1,
  	xml: xml$1,
  	xmlns: xmlns$1
  };

  var webNamespaces = /*#__PURE__*/Object.freeze({
    __proto__: null,
    html: html$3,
    mathml: mathml,
    svg: svg$1,
    xlink: xlink$1,
    xml: xml$1,
    xmlns: xmlns$1,
    'default': index$3
  });

  var ns = getCjsExportFromNamespace(webNamespaces);

  var root$1 = convert_1('root');
  var element = convert_1('element');
  var text$3 = convert_1('text');
  var dashes = /-([a-z])/g;
  var hastToHyperscript = wrapper$1;

  function wrapper$1(h, node, options) {
    var settings = options || {};
    var prefix;
    var r;
    var v;
    var vd;

    if (typeof h !== 'function') {
      throw new Error('h is not a function');
    }

    if (typeof settings === 'string' || typeof settings === 'boolean') {
      prefix = settings;
      settings = {};
    } else {
      prefix = settings.prefix;
    }

    r = react(h);
    v = vue(h);
    vd = vdom(h);

    if (prefix === null || prefix === undefined) {
      prefix = r === true || v === true || vd === true ? 'h-' : false;
    }

    if (root$1(node)) {
      if (node.children.length === 1 && element(node.children[0])) {
        node = node.children[0];
      } else {
        node = {
          type: 'element',
          tagName: 'div',
          properties: {},
          children: node.children
        };
      }
    } else if (!element(node)) {
      throw new Error('Expected root or element, not `' + (node && node.type || node) + '`');
    }

    return toH(h, node, {
      schema: settings.space === 'svg' ? svg_1 : html_1$1,
      prefix: prefix,
      key: 0,
      react: r,
      vue: v,
      vdom: vd,
      hyperscript: hyperscript(h)
    });
  } // Transform a hast node through a hyperscript interface to *anything*!


  function toH(h, node, ctx) {
    var parentSchema = ctx.schema;
    var schema = parentSchema;
    var name = node.tagName;
    var properties;
    var attributes;
    var children;
    var property;
    var elements;
    var length;
    var index;
    var value;
    var result;

    if (parentSchema.space === 'html' && name.toLowerCase() === 'svg') {
      schema = svg_1;
      ctx.schema = schema;
    }

    if (ctx.vdom === true && schema.space === 'html') {
      name = name.toUpperCase();
    }

    properties = node.properties;
    attributes = {};

    for (property in properties) {
      addAttribute(attributes, property, properties[property], ctx);
    }

    if (typeof attributes.style === 'string' && (ctx.vdom === true || ctx.vue === true || ctx.react === true)) {
      // VDOM, Vue, and React accept `style` as object.
      attributes.style = parseStyle(attributes.style, name);
    }

    if (ctx.prefix) {
      ctx.key++;
      attributes.key = ctx.prefix + ctx.key;
    }

    if (ctx.vdom && schema.space !== 'html') {
      attributes.namespace = ns[schema.space];
    }

    elements = [];
    children = node.children;
    length = children ? children.length : 0;
    index = -1;

    while (++index < length) {
      value = children[index];

      if (element(value)) {
        elements.push(toH(h, value, ctx));
      } else if (text$3(value)) {
        elements.push(value.value);
      }
    } // Ensure no React warnings are triggered for void elements having children
    // passed in.


    result = elements.length === 0 ? h(name, attributes) : h(name, attributes, elements); // Restore parent schema.

    ctx.schema = parentSchema;
    return result;
  }

  function addAttribute(props, prop, value, ctx) {
    var hyperlike = ctx.hyperscript || ctx.vdom || ctx.vue;
    var schema = ctx.schema;
    var info = find_1(schema, prop);
    var subprop; // Ignore nully and `NaN` values.
    // Ignore `false` and falsey known booleans for hyperlike DSLs.

    if (value === null || value === undefined || value !== value || hyperlike && value === false || hyperlike && info.boolean && !value) {
      return;
    }

    if (value !== null && typeof value === 'object' && 'length' in value) {
      // Accept `array`.
      // Most props are space-separated.
      value = (info.commaSeparated ? commaSeparatedTokens : spaceSeparatedTokens).stringify(value);
    } // Treat `true` and truthy known booleans.


    if (info.boolean && ctx.hyperscript === true) {
      value = '';
    }

    if (ctx.vue) {
      if (prop !== 'style') {
        subprop = 'attrs';
      }
    } else if (!info.mustUseProperty) {
      if (ctx.vdom === true) {
        subprop = 'attributes';
      } else if (ctx.hyperscript === true) {
        subprop = 'attrs';
      }
    }

    if (subprop) {
      if (props[subprop] === undefined) {
        props[subprop] = {};
      }

      props[subprop][info.attribute] = value;
    } else {
      props[ctx.react && info.space ? info.property : info.attribute] = value;
    }
  } // Check if `h` is `react.createElement`.


  function react(h) {
    var node = h && h('div');
    return Boolean(node && ('_owner' in node || '_store' in node) && node.key === null);
  } // Check if `h` is `hyperscript`.


  function hyperscript(h) {
    return Boolean(h && h.context && h.cleanup);
  } // Check if `h` is `virtual-dom/h`.


  function vdom(h) {
    return h && h('div').type === 'VirtualNode';
  }

  function vue(h) {
    var node = h && h('div');
    return Boolean(node && node.context && node.context._isVue);
  }

  function parseStyle(value, tagName) {
    var result = {};

    try {
      styleToObject(value, iterator);
    } catch (error) {
      error.message = tagName + '[style]' + error.message.slice('undefined'.length);
      throw error;
    }

    return result;

    function iterator(name, value) {
      result[styleCase(name)] = value;
    }
  }

  function styleCase(val) {
    if (val.slice(0, 4) === '-ms-') {
      val = 'ms-' + val.slice(4);
    }

    return val.replace(dashes, styleReplacer);
  }

  function styleReplacer($0, $1) {
    return $1.toUpperCase();
  }

  var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  var hastCssPropertyMap = {
    align: 'text-align',
    valign: 'vertical-align',
    height: 'height',
    width: 'width'
  };

  var hastUtilTableCellStyle = function tableCellStyle(node) {
    unistUtilVisit(node, 'element', visitor);
    return node;
  };

  function visitor(node) {
    if (node.tagName !== 'tr' && node.tagName !== 'td' && node.tagName !== 'th') {
      return;
    }

    var hastName;
    var cssName;

    for (hastName in hastCssPropertyMap) {
      if (!hasOwnProperty$3.call(hastCssPropertyMap, hastName) || node.properties[hastName] === undefined) {
        continue;
      }

      cssName = hastCssPropertyMap[hastName];
      appendStyle(node, cssName, node.properties[hastName]);
      delete node.properties[hastName];
    }
  }

  function appendStyle(node, property, value) {
    var prevStyle = (node.properties.style || '').trim();

    if (prevStyle && !/;\s*/.test(prevStyle)) {
      prevStyle += ';';
    }

    if (prevStyle) {
      prevStyle += ' ';
    }

    var nextStyle = prevStyle + property + ': ' + value + ';';
    node.properties.style = nextStyle;
  }

  var remarkReact = react$1;









  var globalReact;
  var globalCreateElement;
  var globalFragment;
  /* istanbul ignore next - Hard to test */

  try {
    globalReact = React;
    globalCreateElement = globalReact.createElement;
    globalFragment = globalReact.Fragment;
  } catch (error) {}

  var own$6 = {}.hasOwnProperty;
  var tableElements = ['table', 'thead', 'tbody', 'tfoot', 'tr'];

  function react$1(options) {
    var settings = options || {};
    var createElement = settings.createElement || globalCreateElement;
    var Fragment = settings.fragment || globalFragment;
    var clean = settings.sanitize !== false;
    var scheme = clean && typeof settings.sanitize !== 'boolean' ? settings.sanitize : null;
    var toHastOptions = settings.toHast || {};
    var components = settings.remarkReactComponents || {};
    this.Compiler = compile; // Wrapper around `createElement` to pass components in.

    function h(name, props, children) {
      // Currently, a warning is triggered by react for *any* white space in
      // tables.
      // So we remove the pretty lines for now.
      // See: <https://github.com/facebook/react/pull/7081>.
      // See: <https://github.com/facebook/react/pull/7515>.
      // See: <https://github.com/remarkjs/remark-react/issues/64>.
      if (children && tableElements.indexOf(name) !== -1) {
        children = children.filter(function (child) {
          return child !== '\n';
        });
      }

      return createElement(own$6.call(components, name) ? components[name] : name, props, children);
    } // Compile mdast to React.


    function compile(node) {
      var tree = mdastUtilToHast(node, toHastOptions);
      var root;

      if (clean) {
        tree = hastUtilSanitize(tree, scheme);
      }

      root = hastToHyperscript(h, hastUtilTableCellStyle(tree), settings.prefix); // If this compiled to a `<div>`, but fragment are possible, use those.

      if (root.type === 'div' && Fragment) {
        root = createElement(Fragment, {}, root.props.children);
      }

      return root;
    }
  }

  var showdown = createCommonjsModule(function (module) {
  /*! showdown v 1.9.0 - 10-11-2018 */

  (function () {
    /**
     * Created by Tivie on 13-07-2015.
     */
    function getDefaultOpts(simple) {

      var defaultOptions = {
        omitExtraWLInCodeBlocks: {
          defaultValue: false,
          describe: 'Omit the default extra whiteline added to code blocks',
          type: 'boolean'
        },
        noHeaderId: {
          defaultValue: false,
          describe: 'Turn on/off generated header id',
          type: 'boolean'
        },
        prefixHeaderId: {
          defaultValue: false,
          describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
          type: 'string'
        },
        rawPrefixHeaderId: {
          defaultValue: false,
          describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
          type: 'boolean'
        },
        ghCompatibleHeaderId: {
          defaultValue: false,
          describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
          type: 'boolean'
        },
        rawHeaderId: {
          defaultValue: false,
          describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
          type: 'boolean'
        },
        headerLevelStart: {
          defaultValue: false,
          describe: 'The header blocks level start',
          type: 'integer'
        },
        parseImgDimensions: {
          defaultValue: false,
          describe: 'Turn on/off image dimension parsing',
          type: 'boolean'
        },
        simplifiedAutoLink: {
          defaultValue: false,
          describe: 'Turn on/off GFM autolink style',
          type: 'boolean'
        },
        excludeTrailingPunctuationFromURLs: {
          defaultValue: false,
          describe: 'Excludes trailing punctuation from links generated with autoLinking',
          type: 'boolean'
        },
        literalMidWordUnderscores: {
          defaultValue: false,
          describe: 'Parse midword underscores as literal underscores',
          type: 'boolean'
        },
        literalMidWordAsterisks: {
          defaultValue: false,
          describe: 'Parse midword asterisks as literal asterisks',
          type: 'boolean'
        },
        strikethrough: {
          defaultValue: false,
          describe: 'Turn on/off strikethrough support',
          type: 'boolean'
        },
        tables: {
          defaultValue: false,
          describe: 'Turn on/off tables support',
          type: 'boolean'
        },
        tablesHeaderId: {
          defaultValue: false,
          describe: 'Add an id to table headers',
          type: 'boolean'
        },
        ghCodeBlocks: {
          defaultValue: true,
          describe: 'Turn on/off GFM fenced code blocks support',
          type: 'boolean'
        },
        tasklists: {
          defaultValue: false,
          describe: 'Turn on/off GFM tasklist support',
          type: 'boolean'
        },
        smoothLivePreview: {
          defaultValue: false,
          describe: 'Prevents weird effects in live previews due to incomplete input',
          type: 'boolean'
        },
        smartIndentationFix: {
          defaultValue: false,
          description: 'Tries to smartly fix indentation in es6 strings',
          type: 'boolean'
        },
        disableForced4SpacesIndentedSublists: {
          defaultValue: false,
          description: 'Disables the requirement of indenting nested sublists by 4 spaces',
          type: 'boolean'
        },
        simpleLineBreaks: {
          defaultValue: false,
          description: 'Parses simple line breaks as <br> (GFM Style)',
          type: 'boolean'
        },
        requireSpaceBeforeHeadingText: {
          defaultValue: false,
          description: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
          type: 'boolean'
        },
        ghMentions: {
          defaultValue: false,
          description: 'Enables github @mentions',
          type: 'boolean'
        },
        ghMentionsLink: {
          defaultValue: 'https://github.com/{u}',
          description: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
          type: 'string'
        },
        encodeEmails: {
          defaultValue: true,
          description: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
          type: 'boolean'
        },
        openLinksInNewWindow: {
          defaultValue: false,
          description: 'Open all links in new windows',
          type: 'boolean'
        },
        backslashEscapesHTMLTags: {
          defaultValue: false,
          description: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
          type: 'boolean'
        },
        emoji: {
          defaultValue: false,
          description: 'Enable emoji support. Ex: `this is a :smile: emoji`',
          type: 'boolean'
        },
        underline: {
          defaultValue: false,
          description: 'Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`',
          type: 'boolean'
        },
        completeHTMLDocument: {
          defaultValue: false,
          description: 'Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags',
          type: 'boolean'
        },
        metadata: {
          defaultValue: false,
          description: 'Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).',
          type: 'boolean'
        },
        splitAdjacentBlockquotes: {
          defaultValue: false,
          description: 'Split adjacent blockquote blocks',
          type: 'boolean'
        }
      };

      if (simple === false) {
        return JSON.parse(JSON.stringify(defaultOptions));
      }

      var ret = {};

      for (var opt in defaultOptions) {
        if (defaultOptions.hasOwnProperty(opt)) {
          ret[opt] = defaultOptions[opt].defaultValue;
        }
      }

      return ret;
    }

    function allOptionsOn() {

      var options = getDefaultOpts(true),
          ret = {};

      for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
          ret[opt] = true;
        }
      }

      return ret;
    }
    /**
     * Created by Tivie on 06-01-2015.
     */
    // Private properties


    var showdown = {},
        parsers = {},
        extensions = {},
        globalOptions = getDefaultOpts(true),
        setFlavor = 'vanilla',
        flavor = {
      github: {
        omitExtraWLInCodeBlocks: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghCompatibleHeaderId: true,
        ghMentions: true,
        backslashEscapesHTMLTags: true,
        emoji: true,
        splitAdjacentBlockquotes: true
      },
      original: {
        noHeaderId: true,
        ghCodeBlocks: false
      },
      ghost: {
        omitExtraWLInCodeBlocks: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghMentions: false,
        encodeEmails: true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };
    /**
     * helper namespace
     * @type {{}}
     */

    showdown.helper = {};
    /**
     * TODO LEGACY SUPPORT CODE
     * @type {{}}
     */

    showdown.extensions = {};
    /**
     * Set a global option
     * @static
     * @param {string} key
     * @param {*} value
     * @returns {showdown}
     */

    showdown.setOption = function (key, value) {

      globalOptions[key] = value;
      return this;
    };
    /**
     * Get a global option
     * @static
     * @param {string} key
     * @returns {*}
     */


    showdown.getOption = function (key) {

      return globalOptions[key];
    };
    /**
     * Get the global options
     * @static
     * @returns {{}}
     */


    showdown.getOptions = function () {

      return globalOptions;
    };
    /**
     * Reset global options to the default values
     * @static
     */


    showdown.resetOptions = function () {

      globalOptions = getDefaultOpts(true);
    };
    /**
     * Set the flavor showdown should use as default
     * @param {string} name
     */


    showdown.setFlavor = function (name) {

      if (!flavor.hasOwnProperty(name)) {
        throw Error(name + ' flavor was not found');
      }

      showdown.resetOptions();
      var preset = flavor[name];
      setFlavor = name;

      for (var option in preset) {
        if (preset.hasOwnProperty(option)) {
          globalOptions[option] = preset[option];
        }
      }
    };
    /**
     * Get the currently set flavor
     * @returns {string}
     */


    showdown.getFlavor = function () {

      return setFlavor;
    };
    /**
     * Get the options of a specified flavor. Returns undefined if the flavor was not found
     * @param {string} name Name of the flavor
     * @returns {{}|undefined}
     */


    showdown.getFlavorOptions = function (name) {

      if (flavor.hasOwnProperty(name)) {
        return flavor[name];
      }
    };
    /**
     * Get the default options
     * @static
     * @param {boolean} [simple=true]
     * @returns {{}}
     */


    showdown.getDefaultOptions = function (simple) {

      return getDefaultOpts(simple);
    };
    /**
     * Get or set a subParser
     *
     * subParser(name)       - Get a registered subParser
     * subParser(name, func) - Register a subParser
     * @static
     * @param {string} name
     * @param {function} [func]
     * @returns {*}
     */


    showdown.subParser = function (name, func) {

      if (showdown.helper.isString(name)) {
        if (typeof func !== 'undefined') {
          parsers[name] = func;
        } else {
          if (parsers.hasOwnProperty(name)) {
            return parsers[name];
          } else {
            throw Error('SubParser named ' + name + ' not registered!');
          }
        }
      }
    };
    /**
     * Gets or registers an extension
     * @static
     * @param {string} name
     * @param {object|function=} ext
     * @returns {*}
     */


    showdown.extension = function (name, ext) {

      if (!showdown.helper.isString(name)) {
        throw Error('Extension \'name\' must be a string');
      }

      name = showdown.helper.stdExtName(name); // Getter

      if (showdown.helper.isUndefined(ext)) {
        if (!extensions.hasOwnProperty(name)) {
          throw Error('Extension named ' + name + ' is not registered!');
        }

        return extensions[name]; // Setter
      } else {
        // Expand extension if it's wrapped in a function
        if (typeof ext === 'function') {
          ext = ext();
        } // Ensure extension is an array


        if (!showdown.helper.isArray(ext)) {
          ext = [ext];
        }

        var validExtension = validate(ext, name);

        if (validExtension.valid) {
          extensions[name] = ext;
        } else {
          throw Error(validExtension.error);
        }
      }
    };
    /**
     * Gets all extensions registered
     * @returns {{}}
     */


    showdown.getAllExtensions = function () {

      return extensions;
    };
    /**
     * Remove an extension
     * @param {string} name
     */


    showdown.removeExtension = function (name) {

      delete extensions[name];
    };
    /**
     * Removes all extensions
     */


    showdown.resetExtensions = function () {

      extensions = {};
    };
    /**
     * Validate extension
     * @param {array} extension
     * @param {string} name
     * @returns {{valid: boolean, error: string}}
     */


    function validate(extension, name) {

      var errMsg = name ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
          ret = {
        valid: true,
        error: ''
      };

      if (!showdown.helper.isArray(extension)) {
        extension = [extension];
      }

      for (var i = 0; i < extension.length; ++i) {
        var baseMsg = errMsg + ' sub-extension ' + i + ': ',
            ext = extension[i];

        if (typeof ext !== 'object') {
          ret.valid = false;
          ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
          return ret;
        }

        if (!showdown.helper.isString(ext.type)) {
          ret.valid = false;
          ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
          return ret;
        }

        var type = ext.type = ext.type.toLowerCase(); // normalize extension type

        if (type === 'language') {
          type = ext.type = 'lang';
        }

        if (type === 'html') {
          type = ext.type = 'output';
        }

        if (type !== 'lang' && type !== 'output' && type !== 'listener') {
          ret.valid = false;
          ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
          return ret;
        }

        if (type === 'listener') {
          if (showdown.helper.isUndefined(ext.listeners)) {
            ret.valid = false;
            ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
            return ret;
          }
        } else {
          if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
            ret.valid = false;
            ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
            return ret;
          }
        }

        if (ext.listeners) {
          if (typeof ext.listeners !== 'object') {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
            return ret;
          }

          for (var ln in ext.listeners) {
            if (ext.listeners.hasOwnProperty(ln)) {
              if (typeof ext.listeners[ln] !== 'function') {
                ret.valid = false;
                ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + ' must be a function but ' + typeof ext.listeners[ln] + ' given';
                return ret;
              }
            }
          }
        }

        if (ext.filter) {
          if (typeof ext.filter !== 'function') {
            ret.valid = false;
            ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
            return ret;
          }
        } else if (ext.regex) {
          if (showdown.helper.isString(ext.regex)) {
            ext.regex = new RegExp(ext.regex, 'g');
          }

          if (!(ext.regex instanceof RegExp)) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
            return ret;
          }

          if (showdown.helper.isUndefined(ext.replace)) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
            return ret;
          }
        }
      }

      return ret;
    }
    /**
     * Validate extension
     * @param {object} ext
     * @returns {boolean}
     */


    showdown.validateExtension = function (ext) {

      var validateExtension = validate(ext, null);

      if (!validateExtension.valid) {
        console.warn(validateExtension.error);
        return false;
      }

      return true;
    };
    /**
     * showdownjs helper functions
     */


    if (!showdown.hasOwnProperty('helper')) {
      showdown.helper = {};
    }
    /**
     * Check if var is string
     * @static
     * @param {string} a
     * @returns {boolean}
     */


    showdown.helper.isString = function (a) {

      return typeof a === 'string' || a instanceof String;
    };
    /**
     * Check if var is a function
     * @static
     * @param {*} a
     * @returns {boolean}
     */


    showdown.helper.isFunction = function (a) {

      var getType = {};
      return a && getType.toString.call(a) === '[object Function]';
    };
    /**
     * isArray helper function
     * @static
     * @param {*} a
     * @returns {boolean}
     */


    showdown.helper.isArray = function (a) {

      return Array.isArray(a);
    };
    /**
     * Check if value is undefined
     * @static
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     */


    showdown.helper.isUndefined = function (value) {

      return typeof value === 'undefined';
    };
    /**
     * ForEach helper function
     * Iterates over Arrays and Objects (own properties only)
     * @static
     * @param {*} obj
     * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
     */


    showdown.helper.forEach = function (obj, callback) {

      if (showdown.helper.isUndefined(obj)) {
        throw new Error('obj param is required');
      }

      if (showdown.helper.isUndefined(callback)) {
        throw new Error('callback param is required');
      }

      if (!showdown.helper.isFunction(callback)) {
        throw new Error('callback param must be a function/closure');
      }

      if (typeof obj.forEach === 'function') {
        obj.forEach(callback);
      } else if (showdown.helper.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          callback(obj[i], i, obj);
        }
      } else if (typeof obj === 'object') {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            callback(obj[prop], prop, obj);
          }
        }
      } else {
        throw new Error('obj does not seem to be an array or an iterable object');
      }
    };
    /**
     * Standardidize extension name
     * @static
     * @param {string} s extension name
     * @returns {string}
     */


    showdown.helper.stdExtName = function (s) {

      return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
    };

    function escapeCharactersCallback(wholeMatch, m1) {

      var charCodeToEscape = m1.charCodeAt(0);
      return '¨E' + charCodeToEscape + 'E';
    }
    /**
     * Callback used to escape characters when passing through String.replace
     * @static
     * @param {string} wholeMatch
     * @param {string} m1
     * @returns {string}
     */


    showdown.helper.escapeCharactersCallback = escapeCharactersCallback;
    /**
     * Escape characters in a string
     * @static
     * @param {string} text
     * @param {string} charsToEscape
     * @param {boolean} afterBackslash
     * @returns {XML|string|void|*}
     */

    showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
      // we can build a character class out of them

      var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

      if (afterBackslash) {
        regexString = '\\\\' + regexString;
      }

      var regex = new RegExp(regexString, 'g');
      text = text.replace(regex, escapeCharactersCallback);
      return text;
    };
    /**
     * Unescape HTML entities
     * @param txt
     * @returns {string}
     */


    showdown.helper.unescapeHTMLEntities = function (txt) {

      return txt.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    };

    var rgxFindMatchPos = function (str, left, right, flags) {

      var f = flags || '',
          g = f.indexOf('g') > -1,
          x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
          l = new RegExp(left, f.replace(/g/g, '')),
          pos = [],
          t,
          s,
          m,
          start,
          end;

      do {
        t = 0;

        while (m = x.exec(str)) {
          if (l.test(m[0])) {
            if (!t++) {
              s = x.lastIndex;
              start = s - m[0].length;
            }
          } else if (t) {
            if (! --t) {
              end = m.index + m[0].length;
              var obj = {
                left: {
                  start: start,
                  end: s
                },
                match: {
                  start: s,
                  end: m.index
                },
                right: {
                  start: m.index,
                  end: end
                },
                wholeMatch: {
                  start: start,
                  end: end
                }
              };
              pos.push(obj);

              if (!g) {
                return pos;
              }
            }
          }
        }
      } while (t && (x.lastIndex = s));

      return pos;
    };
    /**
     * matchRecursiveRegExp
     *
     * (c) 2007 Steven Levithan <stevenlevithan.com>
     * MIT License
     *
     * Accepts a string to search, a left and right format delimiter
     * as regex patterns, and optional regex flags. Returns an array
     * of matches, allowing nested instances of left/right delimiters.
     * Use the "g" flag to return all matches, otherwise only the
     * first is returned. Be careful to ensure that the left and
     * right format delimiters produce mutually exclusive matches.
     * Backreferences are not supported within the right delimiter
     * due to how it is internally combined with the left delimiter.
     * When matching strings whose format delimiters are unbalanced
     * to the left or right, the output is intentionally as a
     * conventional regex library with recursion support would
     * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
     * "<" and ">" as the delimiters (both strings contain a single,
     * balanced instance of "<x>").
     *
     * examples:
     * matchRecursiveRegExp("test", "\\(", "\\)")
     * returns: []
     * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
     * returns: ["t<<e>><s>", ""]
     * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
     * returns: ["test"]
     */


    showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {

      var matchPos = rgxFindMatchPos(str, left, right, flags),
          results = [];

      for (var i = 0; i < matchPos.length; ++i) {
        results.push([str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)]);
      }

      return results;
    };
    /**
     *
     * @param {string} str
     * @param {string|function} replacement
     * @param {string} left
     * @param {string} right
     * @param {string} flags
     * @returns {string}
     */


    showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {

      if (!showdown.helper.isFunction(replacement)) {
        var repStr = replacement;

        replacement = function () {
          return repStr;
        };
      }

      var matchPos = rgxFindMatchPos(str, left, right, flags),
          finalStr = str,
          lng = matchPos.length;

      if (lng > 0) {
        var bits = [];

        if (matchPos[0].wholeMatch.start !== 0) {
          bits.push(str.slice(0, matchPos[0].wholeMatch.start));
        }

        for (var i = 0; i < lng; ++i) {
          bits.push(replacement(str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)));

          if (i < lng - 1) {
            bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
          }
        }

        if (matchPos[lng - 1].wholeMatch.end < str.length) {
          bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
        }

        finalStr = bits.join('');
      }

      return finalStr;
    };
    /**
     * Returns the index within the passed String object of the first occurrence of the specified regex,
     * starting the search at fromIndex. Returns -1 if the value is not found.
     *
     * @param {string} str string to search
     * @param {RegExp} regex Regular expression to search
     * @param {int} [fromIndex = 0] Index to start the search
     * @returns {Number}
     * @throws InvalidArgumentError
     */


    showdown.helper.regexIndexOf = function (str, regex, fromIndex) {

      if (!showdown.helper.isString(str)) {
        throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
      }

      if (regex instanceof RegExp === false) {
        throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
      }

      var indexOf = str.substring(fromIndex || 0).search(regex);
      return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
    };
    /**
     * Splits the passed string object at the defined index, and returns an array composed of the two substrings
     * @param {string} str string to split
     * @param {int} index index to split string at
     * @returns {[string,string]}
     * @throws InvalidArgumentError
     */


    showdown.helper.splitAtIndex = function (str, index) {

      if (!showdown.helper.isString(str)) {
        throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
      }

      return [str.substring(0, index), str.substring(index)];
    };
    /**
     * Obfuscate an e-mail address through the use of Character Entities,
     * transforming ASCII characters into their equivalent decimal or hex entities.
     *
     * Since it has a random component, subsequent calls to this function produce different results
     *
     * @param {string} mail
     * @returns {string}
     */


    showdown.helper.encodeEmailAddress = function (mail) {

      var encode = [function (ch) {
        return '&#' + ch.charCodeAt(0) + ';';
      }, function (ch) {
        return '&#x' + ch.charCodeAt(0).toString(16) + ';';
      }, function (ch) {
        return ch;
      }];
      mail = mail.replace(/./g, function (ch) {
        if (ch === '@') {
          // this *must* be encoded. I insist.
          ch = encode[Math.floor(Math.random() * 2)](ch);
        } else {
          var r = Math.random(); // roughly 10% raw, 45% hex, 45% dec

          ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
        }

        return ch;
      });
      return mail;
    };
    /**
     *
     * @param str
     * @param targetLength
     * @param padString
     * @returns {string}
     */


    showdown.helper.padEnd = function padEnd(str, targetLength, padString) {
      /*jshint bitwise: false*/
      // eslint-disable-next-line space-infix-ops

      targetLength = targetLength >> 0; //floor if number or convert non-number to 0;

      /*jshint bitwise: true*/

      padString = String(padString || ' ');

      if (str.length > targetLength) {
        return String(str);
      } else {
        targetLength = targetLength - str.length;

        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }

        return String(str) + padString.slice(0, targetLength);
      }
    };
    /**
     * POLYFILLS
     */
    // use this instead of builtin is undefined for IE8 compatibility


    if (typeof console === 'undefined') {
      console = {
        warn: function (msg) {

          alert(msg);
        },
        log: function (msg) {

          alert(msg);
        },
        error: function (msg) {

          throw msg;
        }
      };
    }
    /**
     * Common regexes.
     * We declare some common regexes to improve performance
     */


    showdown.helper.regexes = {
      asteriskDashAndColon: /([*_:~])/g
    };
    /**
     * EMOJIS LIST
     */

    showdown.helper.emojis = {
      '+1': '\ud83d\udc4d',
      '-1': '\ud83d\udc4e',
      '100': '\ud83d\udcaf',
      '1234': '\ud83d\udd22',
      '1st_place_medal': '\ud83e\udd47',
      '2nd_place_medal': '\ud83e\udd48',
      '3rd_place_medal': '\ud83e\udd49',
      '8ball': '\ud83c\udfb1',
      'a': '\ud83c\udd70\ufe0f',
      'ab': '\ud83c\udd8e',
      'abc': '\ud83d\udd24',
      'abcd': '\ud83d\udd21',
      'accept': '\ud83c\ude51',
      'aerial_tramway': '\ud83d\udea1',
      'airplane': '\u2708\ufe0f',
      'alarm_clock': '\u23f0',
      'alembic': '\u2697\ufe0f',
      'alien': '\ud83d\udc7d',
      'ambulance': '\ud83d\ude91',
      'amphora': '\ud83c\udffa',
      'anchor': '\u2693\ufe0f',
      'angel': '\ud83d\udc7c',
      'anger': '\ud83d\udca2',
      'angry': '\ud83d\ude20',
      'anguished': '\ud83d\ude27',
      'ant': '\ud83d\udc1c',
      'apple': '\ud83c\udf4e',
      'aquarius': '\u2652\ufe0f',
      'aries': '\u2648\ufe0f',
      'arrow_backward': '\u25c0\ufe0f',
      'arrow_double_down': '\u23ec',
      'arrow_double_up': '\u23eb',
      'arrow_down': '\u2b07\ufe0f',
      'arrow_down_small': '\ud83d\udd3d',
      'arrow_forward': '\u25b6\ufe0f',
      'arrow_heading_down': '\u2935\ufe0f',
      'arrow_heading_up': '\u2934\ufe0f',
      'arrow_left': '\u2b05\ufe0f',
      'arrow_lower_left': '\u2199\ufe0f',
      'arrow_lower_right': '\u2198\ufe0f',
      'arrow_right': '\u27a1\ufe0f',
      'arrow_right_hook': '\u21aa\ufe0f',
      'arrow_up': '\u2b06\ufe0f',
      'arrow_up_down': '\u2195\ufe0f',
      'arrow_up_small': '\ud83d\udd3c',
      'arrow_upper_left': '\u2196\ufe0f',
      'arrow_upper_right': '\u2197\ufe0f',
      'arrows_clockwise': '\ud83d\udd03',
      'arrows_counterclockwise': '\ud83d\udd04',
      'art': '\ud83c\udfa8',
      'articulated_lorry': '\ud83d\ude9b',
      'artificial_satellite': '\ud83d\udef0',
      'astonished': '\ud83d\ude32',
      'athletic_shoe': '\ud83d\udc5f',
      'atm': '\ud83c\udfe7',
      'atom_symbol': '\u269b\ufe0f',
      'avocado': '\ud83e\udd51',
      'b': '\ud83c\udd71\ufe0f',
      'baby': '\ud83d\udc76',
      'baby_bottle': '\ud83c\udf7c',
      'baby_chick': '\ud83d\udc24',
      'baby_symbol': '\ud83d\udebc',
      'back': '\ud83d\udd19',
      'bacon': '\ud83e\udd53',
      'badminton': '\ud83c\udff8',
      'baggage_claim': '\ud83d\udec4',
      'baguette_bread': '\ud83e\udd56',
      'balance_scale': '\u2696\ufe0f',
      'balloon': '\ud83c\udf88',
      'ballot_box': '\ud83d\uddf3',
      'ballot_box_with_check': '\u2611\ufe0f',
      'bamboo': '\ud83c\udf8d',
      'banana': '\ud83c\udf4c',
      'bangbang': '\u203c\ufe0f',
      'bank': '\ud83c\udfe6',
      'bar_chart': '\ud83d\udcca',
      'barber': '\ud83d\udc88',
      'baseball': '\u26be\ufe0f',
      'basketball': '\ud83c\udfc0',
      'basketball_man': '\u26f9\ufe0f',
      'basketball_woman': '\u26f9\ufe0f&zwj;\u2640\ufe0f',
      'bat': '\ud83e\udd87',
      'bath': '\ud83d\udec0',
      'bathtub': '\ud83d\udec1',
      'battery': '\ud83d\udd0b',
      'beach_umbrella': '\ud83c\udfd6',
      'bear': '\ud83d\udc3b',
      'bed': '\ud83d\udecf',
      'bee': '\ud83d\udc1d',
      'beer': '\ud83c\udf7a',
      'beers': '\ud83c\udf7b',
      'beetle': '\ud83d\udc1e',
      'beginner': '\ud83d\udd30',
      'bell': '\ud83d\udd14',
      'bellhop_bell': '\ud83d\udece',
      'bento': '\ud83c\udf71',
      'biking_man': '\ud83d\udeb4',
      'bike': '\ud83d\udeb2',
      'biking_woman': '\ud83d\udeb4&zwj;\u2640\ufe0f',
      'bikini': '\ud83d\udc59',
      'biohazard': '\u2623\ufe0f',
      'bird': '\ud83d\udc26',
      'birthday': '\ud83c\udf82',
      'black_circle': '\u26ab\ufe0f',
      'black_flag': '\ud83c\udff4',
      'black_heart': '\ud83d\udda4',
      'black_joker': '\ud83c\udccf',
      'black_large_square': '\u2b1b\ufe0f',
      'black_medium_small_square': '\u25fe\ufe0f',
      'black_medium_square': '\u25fc\ufe0f',
      'black_nib': '\u2712\ufe0f',
      'black_small_square': '\u25aa\ufe0f',
      'black_square_button': '\ud83d\udd32',
      'blonde_man': '\ud83d\udc71',
      'blonde_woman': '\ud83d\udc71&zwj;\u2640\ufe0f',
      'blossom': '\ud83c\udf3c',
      'blowfish': '\ud83d\udc21',
      'blue_book': '\ud83d\udcd8',
      'blue_car': '\ud83d\ude99',
      'blue_heart': '\ud83d\udc99',
      'blush': '\ud83d\ude0a',
      'boar': '\ud83d\udc17',
      'boat': '\u26f5\ufe0f',
      'bomb': '\ud83d\udca3',
      'book': '\ud83d\udcd6',
      'bookmark': '\ud83d\udd16',
      'bookmark_tabs': '\ud83d\udcd1',
      'books': '\ud83d\udcda',
      'boom': '\ud83d\udca5',
      'boot': '\ud83d\udc62',
      'bouquet': '\ud83d\udc90',
      'bowing_man': '\ud83d\ude47',
      'bow_and_arrow': '\ud83c\udff9',
      'bowing_woman': '\ud83d\ude47&zwj;\u2640\ufe0f',
      'bowling': '\ud83c\udfb3',
      'boxing_glove': '\ud83e\udd4a',
      'boy': '\ud83d\udc66',
      'bread': '\ud83c\udf5e',
      'bride_with_veil': '\ud83d\udc70',
      'bridge_at_night': '\ud83c\udf09',
      'briefcase': '\ud83d\udcbc',
      'broken_heart': '\ud83d\udc94',
      'bug': '\ud83d\udc1b',
      'building_construction': '\ud83c\udfd7',
      'bulb': '\ud83d\udca1',
      'bullettrain_front': '\ud83d\ude85',
      'bullettrain_side': '\ud83d\ude84',
      'burrito': '\ud83c\udf2f',
      'bus': '\ud83d\ude8c',
      'business_suit_levitating': '\ud83d\udd74',
      'busstop': '\ud83d\ude8f',
      'bust_in_silhouette': '\ud83d\udc64',
      'busts_in_silhouette': '\ud83d\udc65',
      'butterfly': '\ud83e\udd8b',
      'cactus': '\ud83c\udf35',
      'cake': '\ud83c\udf70',
      'calendar': '\ud83d\udcc6',
      'call_me_hand': '\ud83e\udd19',
      'calling': '\ud83d\udcf2',
      'camel': '\ud83d\udc2b',
      'camera': '\ud83d\udcf7',
      'camera_flash': '\ud83d\udcf8',
      'camping': '\ud83c\udfd5',
      'cancer': '\u264b\ufe0f',
      'candle': '\ud83d\udd6f',
      'candy': '\ud83c\udf6c',
      'canoe': '\ud83d\udef6',
      'capital_abcd': '\ud83d\udd20',
      'capricorn': '\u2651\ufe0f',
      'car': '\ud83d\ude97',
      'card_file_box': '\ud83d\uddc3',
      'card_index': '\ud83d\udcc7',
      'card_index_dividers': '\ud83d\uddc2',
      'carousel_horse': '\ud83c\udfa0',
      'carrot': '\ud83e\udd55',
      'cat': '\ud83d\udc31',
      'cat2': '\ud83d\udc08',
      'cd': '\ud83d\udcbf',
      'chains': '\u26d3',
      'champagne': '\ud83c\udf7e',
      'chart': '\ud83d\udcb9',
      'chart_with_downwards_trend': '\ud83d\udcc9',
      'chart_with_upwards_trend': '\ud83d\udcc8',
      'checkered_flag': '\ud83c\udfc1',
      'cheese': '\ud83e\uddc0',
      'cherries': '\ud83c\udf52',
      'cherry_blossom': '\ud83c\udf38',
      'chestnut': '\ud83c\udf30',
      'chicken': '\ud83d\udc14',
      'children_crossing': '\ud83d\udeb8',
      'chipmunk': '\ud83d\udc3f',
      'chocolate_bar': '\ud83c\udf6b',
      'christmas_tree': '\ud83c\udf84',
      'church': '\u26ea\ufe0f',
      'cinema': '\ud83c\udfa6',
      'circus_tent': '\ud83c\udfaa',
      'city_sunrise': '\ud83c\udf07',
      'city_sunset': '\ud83c\udf06',
      'cityscape': '\ud83c\udfd9',
      'cl': '\ud83c\udd91',
      'clamp': '\ud83d\udddc',
      'clap': '\ud83d\udc4f',
      'clapper': '\ud83c\udfac',
      'classical_building': '\ud83c\udfdb',
      'clinking_glasses': '\ud83e\udd42',
      'clipboard': '\ud83d\udccb',
      'clock1': '\ud83d\udd50',
      'clock10': '\ud83d\udd59',
      'clock1030': '\ud83d\udd65',
      'clock11': '\ud83d\udd5a',
      'clock1130': '\ud83d\udd66',
      'clock12': '\ud83d\udd5b',
      'clock1230': '\ud83d\udd67',
      'clock130': '\ud83d\udd5c',
      'clock2': '\ud83d\udd51',
      'clock230': '\ud83d\udd5d',
      'clock3': '\ud83d\udd52',
      'clock330': '\ud83d\udd5e',
      'clock4': '\ud83d\udd53',
      'clock430': '\ud83d\udd5f',
      'clock5': '\ud83d\udd54',
      'clock530': '\ud83d\udd60',
      'clock6': '\ud83d\udd55',
      'clock630': '\ud83d\udd61',
      'clock7': '\ud83d\udd56',
      'clock730': '\ud83d\udd62',
      'clock8': '\ud83d\udd57',
      'clock830': '\ud83d\udd63',
      'clock9': '\ud83d\udd58',
      'clock930': '\ud83d\udd64',
      'closed_book': '\ud83d\udcd5',
      'closed_lock_with_key': '\ud83d\udd10',
      'closed_umbrella': '\ud83c\udf02',
      'cloud': '\u2601\ufe0f',
      'cloud_with_lightning': '\ud83c\udf29',
      'cloud_with_lightning_and_rain': '\u26c8',
      'cloud_with_rain': '\ud83c\udf27',
      'cloud_with_snow': '\ud83c\udf28',
      'clown_face': '\ud83e\udd21',
      'clubs': '\u2663\ufe0f',
      'cocktail': '\ud83c\udf78',
      'coffee': '\u2615\ufe0f',
      'coffin': '\u26b0\ufe0f',
      'cold_sweat': '\ud83d\ude30',
      'comet': '\u2604\ufe0f',
      'computer': '\ud83d\udcbb',
      'computer_mouse': '\ud83d\uddb1',
      'confetti_ball': '\ud83c\udf8a',
      'confounded': '\ud83d\ude16',
      'confused': '\ud83d\ude15',
      'congratulations': '\u3297\ufe0f',
      'construction': '\ud83d\udea7',
      'construction_worker_man': '\ud83d\udc77',
      'construction_worker_woman': '\ud83d\udc77&zwj;\u2640\ufe0f',
      'control_knobs': '\ud83c\udf9b',
      'convenience_store': '\ud83c\udfea',
      'cookie': '\ud83c\udf6a',
      'cool': '\ud83c\udd92',
      'policeman': '\ud83d\udc6e',
      'copyright': '\u00a9\ufe0f',
      'corn': '\ud83c\udf3d',
      'couch_and_lamp': '\ud83d\udecb',
      'couple': '\ud83d\udc6b',
      'couple_with_heart_woman_man': '\ud83d\udc91',
      'couple_with_heart_man_man': '\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc68',
      'couple_with_heart_woman_woman': '\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc69',
      'couplekiss_man_man': '\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc68',
      'couplekiss_man_woman': '\ud83d\udc8f',
      'couplekiss_woman_woman': '\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc69',
      'cow': '\ud83d\udc2e',
      'cow2': '\ud83d\udc04',
      'cowboy_hat_face': '\ud83e\udd20',
      'crab': '\ud83e\udd80',
      'crayon': '\ud83d\udd8d',
      'credit_card': '\ud83d\udcb3',
      'crescent_moon': '\ud83c\udf19',
      'cricket': '\ud83c\udfcf',
      'crocodile': '\ud83d\udc0a',
      'croissant': '\ud83e\udd50',
      'crossed_fingers': '\ud83e\udd1e',
      'crossed_flags': '\ud83c\udf8c',
      'crossed_swords': '\u2694\ufe0f',
      'crown': '\ud83d\udc51',
      'cry': '\ud83d\ude22',
      'crying_cat_face': '\ud83d\ude3f',
      'crystal_ball': '\ud83d\udd2e',
      'cucumber': '\ud83e\udd52',
      'cupid': '\ud83d\udc98',
      'curly_loop': '\u27b0',
      'currency_exchange': '\ud83d\udcb1',
      'curry': '\ud83c\udf5b',
      'custard': '\ud83c\udf6e',
      'customs': '\ud83d\udec3',
      'cyclone': '\ud83c\udf00',
      'dagger': '\ud83d\udde1',
      'dancer': '\ud83d\udc83',
      'dancing_women': '\ud83d\udc6f',
      'dancing_men': '\ud83d\udc6f&zwj;\u2642\ufe0f',
      'dango': '\ud83c\udf61',
      'dark_sunglasses': '\ud83d\udd76',
      'dart': '\ud83c\udfaf',
      'dash': '\ud83d\udca8',
      'date': '\ud83d\udcc5',
      'deciduous_tree': '\ud83c\udf33',
      'deer': '\ud83e\udd8c',
      'department_store': '\ud83c\udfec',
      'derelict_house': '\ud83c\udfda',
      'desert': '\ud83c\udfdc',
      'desert_island': '\ud83c\udfdd',
      'desktop_computer': '\ud83d\udda5',
      'male_detective': '\ud83d\udd75\ufe0f',
      'diamond_shape_with_a_dot_inside': '\ud83d\udca0',
      'diamonds': '\u2666\ufe0f',
      'disappointed': '\ud83d\ude1e',
      'disappointed_relieved': '\ud83d\ude25',
      'dizzy': '\ud83d\udcab',
      'dizzy_face': '\ud83d\ude35',
      'do_not_litter': '\ud83d\udeaf',
      'dog': '\ud83d\udc36',
      'dog2': '\ud83d\udc15',
      'dollar': '\ud83d\udcb5',
      'dolls': '\ud83c\udf8e',
      'dolphin': '\ud83d\udc2c',
      'door': '\ud83d\udeaa',
      'doughnut': '\ud83c\udf69',
      'dove': '\ud83d\udd4a',
      'dragon': '\ud83d\udc09',
      'dragon_face': '\ud83d\udc32',
      'dress': '\ud83d\udc57',
      'dromedary_camel': '\ud83d\udc2a',
      'drooling_face': '\ud83e\udd24',
      'droplet': '\ud83d\udca7',
      'drum': '\ud83e\udd41',
      'duck': '\ud83e\udd86',
      'dvd': '\ud83d\udcc0',
      'e-mail': '\ud83d\udce7',
      'eagle': '\ud83e\udd85',
      'ear': '\ud83d\udc42',
      'ear_of_rice': '\ud83c\udf3e',
      'earth_africa': '\ud83c\udf0d',
      'earth_americas': '\ud83c\udf0e',
      'earth_asia': '\ud83c\udf0f',
      'egg': '\ud83e\udd5a',
      'eggplant': '\ud83c\udf46',
      'eight_pointed_black_star': '\u2734\ufe0f',
      'eight_spoked_asterisk': '\u2733\ufe0f',
      'electric_plug': '\ud83d\udd0c',
      'elephant': '\ud83d\udc18',
      'email': '\u2709\ufe0f',
      'end': '\ud83d\udd1a',
      'envelope_with_arrow': '\ud83d\udce9',
      'euro': '\ud83d\udcb6',
      'european_castle': '\ud83c\udff0',
      'european_post_office': '\ud83c\udfe4',
      'evergreen_tree': '\ud83c\udf32',
      'exclamation': '\u2757\ufe0f',
      'expressionless': '\ud83d\ude11',
      'eye': '\ud83d\udc41',
      'eye_speech_bubble': '\ud83d\udc41&zwj;\ud83d\udde8',
      'eyeglasses': '\ud83d\udc53',
      'eyes': '\ud83d\udc40',
      'face_with_head_bandage': '\ud83e\udd15',
      'face_with_thermometer': '\ud83e\udd12',
      'fist_oncoming': '\ud83d\udc4a',
      'factory': '\ud83c\udfed',
      'fallen_leaf': '\ud83c\udf42',
      'family_man_woman_boy': '\ud83d\udc6a',
      'family_man_boy': '\ud83d\udc68&zwj;\ud83d\udc66',
      'family_man_boy_boy': '\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
      'family_man_girl': '\ud83d\udc68&zwj;\ud83d\udc67',
      'family_man_girl_boy': '\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
      'family_man_girl_girl': '\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
      'family_man_man_boy': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66',
      'family_man_man_boy_boy': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
      'family_man_man_girl': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67',
      'family_man_man_girl_boy': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
      'family_man_man_girl_girl': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
      'family_man_woman_boy_boy': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
      'family_man_woman_girl': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
      'family_man_woman_girl_boy': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
      'family_man_woman_girl_girl': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
      'family_woman_boy': '\ud83d\udc69&zwj;\ud83d\udc66',
      'family_woman_boy_boy': '\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
      'family_woman_girl': '\ud83d\udc69&zwj;\ud83d\udc67',
      'family_woman_girl_boy': '\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
      'family_woman_girl_girl': '\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
      'family_woman_woman_boy': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66',
      'family_woman_woman_boy_boy': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
      'family_woman_woman_girl': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
      'family_woman_woman_girl_boy': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
      'family_woman_woman_girl_girl': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
      'fast_forward': '\u23e9',
      'fax': '\ud83d\udce0',
      'fearful': '\ud83d\ude28',
      'feet': '\ud83d\udc3e',
      'female_detective': '\ud83d\udd75\ufe0f&zwj;\u2640\ufe0f',
      'ferris_wheel': '\ud83c\udfa1',
      'ferry': '\u26f4',
      'field_hockey': '\ud83c\udfd1',
      'file_cabinet': '\ud83d\uddc4',
      'file_folder': '\ud83d\udcc1',
      'film_projector': '\ud83d\udcfd',
      'film_strip': '\ud83c\udf9e',
      'fire': '\ud83d\udd25',
      'fire_engine': '\ud83d\ude92',
      'fireworks': '\ud83c\udf86',
      'first_quarter_moon': '\ud83c\udf13',
      'first_quarter_moon_with_face': '\ud83c\udf1b',
      'fish': '\ud83d\udc1f',
      'fish_cake': '\ud83c\udf65',
      'fishing_pole_and_fish': '\ud83c\udfa3',
      'fist_raised': '\u270a',
      'fist_left': '\ud83e\udd1b',
      'fist_right': '\ud83e\udd1c',
      'flags': '\ud83c\udf8f',
      'flashlight': '\ud83d\udd26',
      'fleur_de_lis': '\u269c\ufe0f',
      'flight_arrival': '\ud83d\udeec',
      'flight_departure': '\ud83d\udeeb',
      'floppy_disk': '\ud83d\udcbe',
      'flower_playing_cards': '\ud83c\udfb4',
      'flushed': '\ud83d\ude33',
      'fog': '\ud83c\udf2b',
      'foggy': '\ud83c\udf01',
      'football': '\ud83c\udfc8',
      'footprints': '\ud83d\udc63',
      'fork_and_knife': '\ud83c\udf74',
      'fountain': '\u26f2\ufe0f',
      'fountain_pen': '\ud83d\udd8b',
      'four_leaf_clover': '\ud83c\udf40',
      'fox_face': '\ud83e\udd8a',
      'framed_picture': '\ud83d\uddbc',
      'free': '\ud83c\udd93',
      'fried_egg': '\ud83c\udf73',
      'fried_shrimp': '\ud83c\udf64',
      'fries': '\ud83c\udf5f',
      'frog': '\ud83d\udc38',
      'frowning': '\ud83d\ude26',
      'frowning_face': '\u2639\ufe0f',
      'frowning_man': '\ud83d\ude4d&zwj;\u2642\ufe0f',
      'frowning_woman': '\ud83d\ude4d',
      'middle_finger': '\ud83d\udd95',
      'fuelpump': '\u26fd\ufe0f',
      'full_moon': '\ud83c\udf15',
      'full_moon_with_face': '\ud83c\udf1d',
      'funeral_urn': '\u26b1\ufe0f',
      'game_die': '\ud83c\udfb2',
      'gear': '\u2699\ufe0f',
      'gem': '\ud83d\udc8e',
      'gemini': '\u264a\ufe0f',
      'ghost': '\ud83d\udc7b',
      'gift': '\ud83c\udf81',
      'gift_heart': '\ud83d\udc9d',
      'girl': '\ud83d\udc67',
      'globe_with_meridians': '\ud83c\udf10',
      'goal_net': '\ud83e\udd45',
      'goat': '\ud83d\udc10',
      'golf': '\u26f3\ufe0f',
      'golfing_man': '\ud83c\udfcc\ufe0f',
      'golfing_woman': '\ud83c\udfcc\ufe0f&zwj;\u2640\ufe0f',
      'gorilla': '\ud83e\udd8d',
      'grapes': '\ud83c\udf47',
      'green_apple': '\ud83c\udf4f',
      'green_book': '\ud83d\udcd7',
      'green_heart': '\ud83d\udc9a',
      'green_salad': '\ud83e\udd57',
      'grey_exclamation': '\u2755',
      'grey_question': '\u2754',
      'grimacing': '\ud83d\ude2c',
      'grin': '\ud83d\ude01',
      'grinning': '\ud83d\ude00',
      'guardsman': '\ud83d\udc82',
      'guardswoman': '\ud83d\udc82&zwj;\u2640\ufe0f',
      'guitar': '\ud83c\udfb8',
      'gun': '\ud83d\udd2b',
      'haircut_woman': '\ud83d\udc87',
      'haircut_man': '\ud83d\udc87&zwj;\u2642\ufe0f',
      'hamburger': '\ud83c\udf54',
      'hammer': '\ud83d\udd28',
      'hammer_and_pick': '\u2692',
      'hammer_and_wrench': '\ud83d\udee0',
      'hamster': '\ud83d\udc39',
      'hand': '\u270b',
      'handbag': '\ud83d\udc5c',
      'handshake': '\ud83e\udd1d',
      'hankey': '\ud83d\udca9',
      'hatched_chick': '\ud83d\udc25',
      'hatching_chick': '\ud83d\udc23',
      'headphones': '\ud83c\udfa7',
      'hear_no_evil': '\ud83d\ude49',
      'heart': '\u2764\ufe0f',
      'heart_decoration': '\ud83d\udc9f',
      'heart_eyes': '\ud83d\ude0d',
      'heart_eyes_cat': '\ud83d\ude3b',
      'heartbeat': '\ud83d\udc93',
      'heartpulse': '\ud83d\udc97',
      'hearts': '\u2665\ufe0f',
      'heavy_check_mark': '\u2714\ufe0f',
      'heavy_division_sign': '\u2797',
      'heavy_dollar_sign': '\ud83d\udcb2',
      'heavy_heart_exclamation': '\u2763\ufe0f',
      'heavy_minus_sign': '\u2796',
      'heavy_multiplication_x': '\u2716\ufe0f',
      'heavy_plus_sign': '\u2795',
      'helicopter': '\ud83d\ude81',
      'herb': '\ud83c\udf3f',
      'hibiscus': '\ud83c\udf3a',
      'high_brightness': '\ud83d\udd06',
      'high_heel': '\ud83d\udc60',
      'hocho': '\ud83d\udd2a',
      'hole': '\ud83d\udd73',
      'honey_pot': '\ud83c\udf6f',
      'horse': '\ud83d\udc34',
      'horse_racing': '\ud83c\udfc7',
      'hospital': '\ud83c\udfe5',
      'hot_pepper': '\ud83c\udf36',
      'hotdog': '\ud83c\udf2d',
      'hotel': '\ud83c\udfe8',
      'hotsprings': '\u2668\ufe0f',
      'hourglass': '\u231b\ufe0f',
      'hourglass_flowing_sand': '\u23f3',
      'house': '\ud83c\udfe0',
      'house_with_garden': '\ud83c\udfe1',
      'houses': '\ud83c\udfd8',
      'hugs': '\ud83e\udd17',
      'hushed': '\ud83d\ude2f',
      'ice_cream': '\ud83c\udf68',
      'ice_hockey': '\ud83c\udfd2',
      'ice_skate': '\u26f8',
      'icecream': '\ud83c\udf66',
      'id': '\ud83c\udd94',
      'ideograph_advantage': '\ud83c\ude50',
      'imp': '\ud83d\udc7f',
      'inbox_tray': '\ud83d\udce5',
      'incoming_envelope': '\ud83d\udce8',
      'tipping_hand_woman': '\ud83d\udc81',
      'information_source': '\u2139\ufe0f',
      'innocent': '\ud83d\ude07',
      'interrobang': '\u2049\ufe0f',
      'iphone': '\ud83d\udcf1',
      'izakaya_lantern': '\ud83c\udfee',
      'jack_o_lantern': '\ud83c\udf83',
      'japan': '\ud83d\uddfe',
      'japanese_castle': '\ud83c\udfef',
      'japanese_goblin': '\ud83d\udc7a',
      'japanese_ogre': '\ud83d\udc79',
      'jeans': '\ud83d\udc56',
      'joy': '\ud83d\ude02',
      'joy_cat': '\ud83d\ude39',
      'joystick': '\ud83d\udd79',
      'kaaba': '\ud83d\udd4b',
      'key': '\ud83d\udd11',
      'keyboard': '\u2328\ufe0f',
      'keycap_ten': '\ud83d\udd1f',
      'kick_scooter': '\ud83d\udef4',
      'kimono': '\ud83d\udc58',
      'kiss': '\ud83d\udc8b',
      'kissing': '\ud83d\ude17',
      'kissing_cat': '\ud83d\ude3d',
      'kissing_closed_eyes': '\ud83d\ude1a',
      'kissing_heart': '\ud83d\ude18',
      'kissing_smiling_eyes': '\ud83d\ude19',
      'kiwi_fruit': '\ud83e\udd5d',
      'koala': '\ud83d\udc28',
      'koko': '\ud83c\ude01',
      'label': '\ud83c\udff7',
      'large_blue_circle': '\ud83d\udd35',
      'large_blue_diamond': '\ud83d\udd37',
      'large_orange_diamond': '\ud83d\udd36',
      'last_quarter_moon': '\ud83c\udf17',
      'last_quarter_moon_with_face': '\ud83c\udf1c',
      'latin_cross': '\u271d\ufe0f',
      'laughing': '\ud83d\ude06',
      'leaves': '\ud83c\udf43',
      'ledger': '\ud83d\udcd2',
      'left_luggage': '\ud83d\udec5',
      'left_right_arrow': '\u2194\ufe0f',
      'leftwards_arrow_with_hook': '\u21a9\ufe0f',
      'lemon': '\ud83c\udf4b',
      'leo': '\u264c\ufe0f',
      'leopard': '\ud83d\udc06',
      'level_slider': '\ud83c\udf9a',
      'libra': '\u264e\ufe0f',
      'light_rail': '\ud83d\ude88',
      'link': '\ud83d\udd17',
      'lion': '\ud83e\udd81',
      'lips': '\ud83d\udc44',
      'lipstick': '\ud83d\udc84',
      'lizard': '\ud83e\udd8e',
      'lock': '\ud83d\udd12',
      'lock_with_ink_pen': '\ud83d\udd0f',
      'lollipop': '\ud83c\udf6d',
      'loop': '\u27bf',
      'loud_sound': '\ud83d\udd0a',
      'loudspeaker': '\ud83d\udce2',
      'love_hotel': '\ud83c\udfe9',
      'love_letter': '\ud83d\udc8c',
      'low_brightness': '\ud83d\udd05',
      'lying_face': '\ud83e\udd25',
      'm': '\u24c2\ufe0f',
      'mag': '\ud83d\udd0d',
      'mag_right': '\ud83d\udd0e',
      'mahjong': '\ud83c\udc04\ufe0f',
      'mailbox': '\ud83d\udceb',
      'mailbox_closed': '\ud83d\udcea',
      'mailbox_with_mail': '\ud83d\udcec',
      'mailbox_with_no_mail': '\ud83d\udced',
      'man': '\ud83d\udc68',
      'man_artist': '\ud83d\udc68&zwj;\ud83c\udfa8',
      'man_astronaut': '\ud83d\udc68&zwj;\ud83d\ude80',
      'man_cartwheeling': '\ud83e\udd38&zwj;\u2642\ufe0f',
      'man_cook': '\ud83d\udc68&zwj;\ud83c\udf73',
      'man_dancing': '\ud83d\udd7a',
      'man_facepalming': '\ud83e\udd26&zwj;\u2642\ufe0f',
      'man_factory_worker': '\ud83d\udc68&zwj;\ud83c\udfed',
      'man_farmer': '\ud83d\udc68&zwj;\ud83c\udf3e',
      'man_firefighter': '\ud83d\udc68&zwj;\ud83d\ude92',
      'man_health_worker': '\ud83d\udc68&zwj;\u2695\ufe0f',
      'man_in_tuxedo': '\ud83e\udd35',
      'man_judge': '\ud83d\udc68&zwj;\u2696\ufe0f',
      'man_juggling': '\ud83e\udd39&zwj;\u2642\ufe0f',
      'man_mechanic': '\ud83d\udc68&zwj;\ud83d\udd27',
      'man_office_worker': '\ud83d\udc68&zwj;\ud83d\udcbc',
      'man_pilot': '\ud83d\udc68&zwj;\u2708\ufe0f',
      'man_playing_handball': '\ud83e\udd3e&zwj;\u2642\ufe0f',
      'man_playing_water_polo': '\ud83e\udd3d&zwj;\u2642\ufe0f',
      'man_scientist': '\ud83d\udc68&zwj;\ud83d\udd2c',
      'man_shrugging': '\ud83e\udd37&zwj;\u2642\ufe0f',
      'man_singer': '\ud83d\udc68&zwj;\ud83c\udfa4',
      'man_student': '\ud83d\udc68&zwj;\ud83c\udf93',
      'man_teacher': '\ud83d\udc68&zwj;\ud83c\udfeb',
      'man_technologist': '\ud83d\udc68&zwj;\ud83d\udcbb',
      'man_with_gua_pi_mao': '\ud83d\udc72',
      'man_with_turban': '\ud83d\udc73',
      'tangerine': '\ud83c\udf4a',
      'mans_shoe': '\ud83d\udc5e',
      'mantelpiece_clock': '\ud83d\udd70',
      'maple_leaf': '\ud83c\udf41',
      'martial_arts_uniform': '\ud83e\udd4b',
      'mask': '\ud83d\ude37',
      'massage_woman': '\ud83d\udc86',
      'massage_man': '\ud83d\udc86&zwj;\u2642\ufe0f',
      'meat_on_bone': '\ud83c\udf56',
      'medal_military': '\ud83c\udf96',
      'medal_sports': '\ud83c\udfc5',
      'mega': '\ud83d\udce3',
      'melon': '\ud83c\udf48',
      'memo': '\ud83d\udcdd',
      'men_wrestling': '\ud83e\udd3c&zwj;\u2642\ufe0f',
      'menorah': '\ud83d\udd4e',
      'mens': '\ud83d\udeb9',
      'metal': '\ud83e\udd18',
      'metro': '\ud83d\ude87',
      'microphone': '\ud83c\udfa4',
      'microscope': '\ud83d\udd2c',
      'milk_glass': '\ud83e\udd5b',
      'milky_way': '\ud83c\udf0c',
      'minibus': '\ud83d\ude90',
      'minidisc': '\ud83d\udcbd',
      'mobile_phone_off': '\ud83d\udcf4',
      'money_mouth_face': '\ud83e\udd11',
      'money_with_wings': '\ud83d\udcb8',
      'moneybag': '\ud83d\udcb0',
      'monkey': '\ud83d\udc12',
      'monkey_face': '\ud83d\udc35',
      'monorail': '\ud83d\ude9d',
      'moon': '\ud83c\udf14',
      'mortar_board': '\ud83c\udf93',
      'mosque': '\ud83d\udd4c',
      'motor_boat': '\ud83d\udee5',
      'motor_scooter': '\ud83d\udef5',
      'motorcycle': '\ud83c\udfcd',
      'motorway': '\ud83d\udee3',
      'mount_fuji': '\ud83d\uddfb',
      'mountain': '\u26f0',
      'mountain_biking_man': '\ud83d\udeb5',
      'mountain_biking_woman': '\ud83d\udeb5&zwj;\u2640\ufe0f',
      'mountain_cableway': '\ud83d\udea0',
      'mountain_railway': '\ud83d\ude9e',
      'mountain_snow': '\ud83c\udfd4',
      'mouse': '\ud83d\udc2d',
      'mouse2': '\ud83d\udc01',
      'movie_camera': '\ud83c\udfa5',
      'moyai': '\ud83d\uddff',
      'mrs_claus': '\ud83e\udd36',
      'muscle': '\ud83d\udcaa',
      'mushroom': '\ud83c\udf44',
      'musical_keyboard': '\ud83c\udfb9',
      'musical_note': '\ud83c\udfb5',
      'musical_score': '\ud83c\udfbc',
      'mute': '\ud83d\udd07',
      'nail_care': '\ud83d\udc85',
      'name_badge': '\ud83d\udcdb',
      'national_park': '\ud83c\udfde',
      'nauseated_face': '\ud83e\udd22',
      'necktie': '\ud83d\udc54',
      'negative_squared_cross_mark': '\u274e',
      'nerd_face': '\ud83e\udd13',
      'neutral_face': '\ud83d\ude10',
      'new': '\ud83c\udd95',
      'new_moon': '\ud83c\udf11',
      'new_moon_with_face': '\ud83c\udf1a',
      'newspaper': '\ud83d\udcf0',
      'newspaper_roll': '\ud83d\uddde',
      'next_track_button': '\u23ed',
      'ng': '\ud83c\udd96',
      'no_good_man': '\ud83d\ude45&zwj;\u2642\ufe0f',
      'no_good_woman': '\ud83d\ude45',
      'night_with_stars': '\ud83c\udf03',
      'no_bell': '\ud83d\udd15',
      'no_bicycles': '\ud83d\udeb3',
      'no_entry': '\u26d4\ufe0f',
      'no_entry_sign': '\ud83d\udeab',
      'no_mobile_phones': '\ud83d\udcf5',
      'no_mouth': '\ud83d\ude36',
      'no_pedestrians': '\ud83d\udeb7',
      'no_smoking': '\ud83d\udead',
      'non-potable_water': '\ud83d\udeb1',
      'nose': '\ud83d\udc43',
      'notebook': '\ud83d\udcd3',
      'notebook_with_decorative_cover': '\ud83d\udcd4',
      'notes': '\ud83c\udfb6',
      'nut_and_bolt': '\ud83d\udd29',
      'o': '\u2b55\ufe0f',
      'o2': '\ud83c\udd7e\ufe0f',
      'ocean': '\ud83c\udf0a',
      'octopus': '\ud83d\udc19',
      'oden': '\ud83c\udf62',
      'office': '\ud83c\udfe2',
      'oil_drum': '\ud83d\udee2',
      'ok': '\ud83c\udd97',
      'ok_hand': '\ud83d\udc4c',
      'ok_man': '\ud83d\ude46&zwj;\u2642\ufe0f',
      'ok_woman': '\ud83d\ude46',
      'old_key': '\ud83d\udddd',
      'older_man': '\ud83d\udc74',
      'older_woman': '\ud83d\udc75',
      'om': '\ud83d\udd49',
      'on': '\ud83d\udd1b',
      'oncoming_automobile': '\ud83d\ude98',
      'oncoming_bus': '\ud83d\ude8d',
      'oncoming_police_car': '\ud83d\ude94',
      'oncoming_taxi': '\ud83d\ude96',
      'open_file_folder': '\ud83d\udcc2',
      'open_hands': '\ud83d\udc50',
      'open_mouth': '\ud83d\ude2e',
      'open_umbrella': '\u2602\ufe0f',
      'ophiuchus': '\u26ce',
      'orange_book': '\ud83d\udcd9',
      'orthodox_cross': '\u2626\ufe0f',
      'outbox_tray': '\ud83d\udce4',
      'owl': '\ud83e\udd89',
      'ox': '\ud83d\udc02',
      'package': '\ud83d\udce6',
      'page_facing_up': '\ud83d\udcc4',
      'page_with_curl': '\ud83d\udcc3',
      'pager': '\ud83d\udcdf',
      'paintbrush': '\ud83d\udd8c',
      'palm_tree': '\ud83c\udf34',
      'pancakes': '\ud83e\udd5e',
      'panda_face': '\ud83d\udc3c',
      'paperclip': '\ud83d\udcce',
      'paperclips': '\ud83d\udd87',
      'parasol_on_ground': '\u26f1',
      'parking': '\ud83c\udd7f\ufe0f',
      'part_alternation_mark': '\u303d\ufe0f',
      'partly_sunny': '\u26c5\ufe0f',
      'passenger_ship': '\ud83d\udef3',
      'passport_control': '\ud83d\udec2',
      'pause_button': '\u23f8',
      'peace_symbol': '\u262e\ufe0f',
      'peach': '\ud83c\udf51',
      'peanuts': '\ud83e\udd5c',
      'pear': '\ud83c\udf50',
      'pen': '\ud83d\udd8a',
      'pencil2': '\u270f\ufe0f',
      'penguin': '\ud83d\udc27',
      'pensive': '\ud83d\ude14',
      'performing_arts': '\ud83c\udfad',
      'persevere': '\ud83d\ude23',
      'person_fencing': '\ud83e\udd3a',
      'pouting_woman': '\ud83d\ude4e',
      'phone': '\u260e\ufe0f',
      'pick': '\u26cf',
      'pig': '\ud83d\udc37',
      'pig2': '\ud83d\udc16',
      'pig_nose': '\ud83d\udc3d',
      'pill': '\ud83d\udc8a',
      'pineapple': '\ud83c\udf4d',
      'ping_pong': '\ud83c\udfd3',
      'pisces': '\u2653\ufe0f',
      'pizza': '\ud83c\udf55',
      'place_of_worship': '\ud83d\uded0',
      'plate_with_cutlery': '\ud83c\udf7d',
      'play_or_pause_button': '\u23ef',
      'point_down': '\ud83d\udc47',
      'point_left': '\ud83d\udc48',
      'point_right': '\ud83d\udc49',
      'point_up': '\u261d\ufe0f',
      'point_up_2': '\ud83d\udc46',
      'police_car': '\ud83d\ude93',
      'policewoman': '\ud83d\udc6e&zwj;\u2640\ufe0f',
      'poodle': '\ud83d\udc29',
      'popcorn': '\ud83c\udf7f',
      'post_office': '\ud83c\udfe3',
      'postal_horn': '\ud83d\udcef',
      'postbox': '\ud83d\udcee',
      'potable_water': '\ud83d\udeb0',
      'potato': '\ud83e\udd54',
      'pouch': '\ud83d\udc5d',
      'poultry_leg': '\ud83c\udf57',
      'pound': '\ud83d\udcb7',
      'rage': '\ud83d\ude21',
      'pouting_cat': '\ud83d\ude3e',
      'pouting_man': '\ud83d\ude4e&zwj;\u2642\ufe0f',
      'pray': '\ud83d\ude4f',
      'prayer_beads': '\ud83d\udcff',
      'pregnant_woman': '\ud83e\udd30',
      'previous_track_button': '\u23ee',
      'prince': '\ud83e\udd34',
      'princess': '\ud83d\udc78',
      'printer': '\ud83d\udda8',
      'purple_heart': '\ud83d\udc9c',
      'purse': '\ud83d\udc5b',
      'pushpin': '\ud83d\udccc',
      'put_litter_in_its_place': '\ud83d\udeae',
      'question': '\u2753',
      'rabbit': '\ud83d\udc30',
      'rabbit2': '\ud83d\udc07',
      'racehorse': '\ud83d\udc0e',
      'racing_car': '\ud83c\udfce',
      'radio': '\ud83d\udcfb',
      'radio_button': '\ud83d\udd18',
      'radioactive': '\u2622\ufe0f',
      'railway_car': '\ud83d\ude83',
      'railway_track': '\ud83d\udee4',
      'rainbow': '\ud83c\udf08',
      'rainbow_flag': '\ud83c\udff3\ufe0f&zwj;\ud83c\udf08',
      'raised_back_of_hand': '\ud83e\udd1a',
      'raised_hand_with_fingers_splayed': '\ud83d\udd90',
      'raised_hands': '\ud83d\ude4c',
      'raising_hand_woman': '\ud83d\ude4b',
      'raising_hand_man': '\ud83d\ude4b&zwj;\u2642\ufe0f',
      'ram': '\ud83d\udc0f',
      'ramen': '\ud83c\udf5c',
      'rat': '\ud83d\udc00',
      'record_button': '\u23fa',
      'recycle': '\u267b\ufe0f',
      'red_circle': '\ud83d\udd34',
      'registered': '\u00ae\ufe0f',
      'relaxed': '\u263a\ufe0f',
      'relieved': '\ud83d\ude0c',
      'reminder_ribbon': '\ud83c\udf97',
      'repeat': '\ud83d\udd01',
      'repeat_one': '\ud83d\udd02',
      'rescue_worker_helmet': '\u26d1',
      'restroom': '\ud83d\udebb',
      'revolving_hearts': '\ud83d\udc9e',
      'rewind': '\u23ea',
      'rhinoceros': '\ud83e\udd8f',
      'ribbon': '\ud83c\udf80',
      'rice': '\ud83c\udf5a',
      'rice_ball': '\ud83c\udf59',
      'rice_cracker': '\ud83c\udf58',
      'rice_scene': '\ud83c\udf91',
      'right_anger_bubble': '\ud83d\uddef',
      'ring': '\ud83d\udc8d',
      'robot': '\ud83e\udd16',
      'rocket': '\ud83d\ude80',
      'rofl': '\ud83e\udd23',
      'roll_eyes': '\ud83d\ude44',
      'roller_coaster': '\ud83c\udfa2',
      'rooster': '\ud83d\udc13',
      'rose': '\ud83c\udf39',
      'rosette': '\ud83c\udff5',
      'rotating_light': '\ud83d\udea8',
      'round_pushpin': '\ud83d\udccd',
      'rowing_man': '\ud83d\udea3',
      'rowing_woman': '\ud83d\udea3&zwj;\u2640\ufe0f',
      'rugby_football': '\ud83c\udfc9',
      'running_man': '\ud83c\udfc3',
      'running_shirt_with_sash': '\ud83c\udfbd',
      'running_woman': '\ud83c\udfc3&zwj;\u2640\ufe0f',
      'sa': '\ud83c\ude02\ufe0f',
      'sagittarius': '\u2650\ufe0f',
      'sake': '\ud83c\udf76',
      'sandal': '\ud83d\udc61',
      'santa': '\ud83c\udf85',
      'satellite': '\ud83d\udce1',
      'saxophone': '\ud83c\udfb7',
      'school': '\ud83c\udfeb',
      'school_satchel': '\ud83c\udf92',
      'scissors': '\u2702\ufe0f',
      'scorpion': '\ud83e\udd82',
      'scorpius': '\u264f\ufe0f',
      'scream': '\ud83d\ude31',
      'scream_cat': '\ud83d\ude40',
      'scroll': '\ud83d\udcdc',
      'seat': '\ud83d\udcba',
      'secret': '\u3299\ufe0f',
      'see_no_evil': '\ud83d\ude48',
      'seedling': '\ud83c\udf31',
      'selfie': '\ud83e\udd33',
      'shallow_pan_of_food': '\ud83e\udd58',
      'shamrock': '\u2618\ufe0f',
      'shark': '\ud83e\udd88',
      'shaved_ice': '\ud83c\udf67',
      'sheep': '\ud83d\udc11',
      'shell': '\ud83d\udc1a',
      'shield': '\ud83d\udee1',
      'shinto_shrine': '\u26e9',
      'ship': '\ud83d\udea2',
      'shirt': '\ud83d\udc55',
      'shopping': '\ud83d\udecd',
      'shopping_cart': '\ud83d\uded2',
      'shower': '\ud83d\udebf',
      'shrimp': '\ud83e\udd90',
      'signal_strength': '\ud83d\udcf6',
      'six_pointed_star': '\ud83d\udd2f',
      'ski': '\ud83c\udfbf',
      'skier': '\u26f7',
      'skull': '\ud83d\udc80',
      'skull_and_crossbones': '\u2620\ufe0f',
      'sleeping': '\ud83d\ude34',
      'sleeping_bed': '\ud83d\udecc',
      'sleepy': '\ud83d\ude2a',
      'slightly_frowning_face': '\ud83d\ude41',
      'slightly_smiling_face': '\ud83d\ude42',
      'slot_machine': '\ud83c\udfb0',
      'small_airplane': '\ud83d\udee9',
      'small_blue_diamond': '\ud83d\udd39',
      'small_orange_diamond': '\ud83d\udd38',
      'small_red_triangle': '\ud83d\udd3a',
      'small_red_triangle_down': '\ud83d\udd3b',
      'smile': '\ud83d\ude04',
      'smile_cat': '\ud83d\ude38',
      'smiley': '\ud83d\ude03',
      'smiley_cat': '\ud83d\ude3a',
      'smiling_imp': '\ud83d\ude08',
      'smirk': '\ud83d\ude0f',
      'smirk_cat': '\ud83d\ude3c',
      'smoking': '\ud83d\udeac',
      'snail': '\ud83d\udc0c',
      'snake': '\ud83d\udc0d',
      'sneezing_face': '\ud83e\udd27',
      'snowboarder': '\ud83c\udfc2',
      'snowflake': '\u2744\ufe0f',
      'snowman': '\u26c4\ufe0f',
      'snowman_with_snow': '\u2603\ufe0f',
      'sob': '\ud83d\ude2d',
      'soccer': '\u26bd\ufe0f',
      'soon': '\ud83d\udd1c',
      'sos': '\ud83c\udd98',
      'sound': '\ud83d\udd09',
      'space_invader': '\ud83d\udc7e',
      'spades': '\u2660\ufe0f',
      'spaghetti': '\ud83c\udf5d',
      'sparkle': '\u2747\ufe0f',
      'sparkler': '\ud83c\udf87',
      'sparkles': '\u2728',
      'sparkling_heart': '\ud83d\udc96',
      'speak_no_evil': '\ud83d\ude4a',
      'speaker': '\ud83d\udd08',
      'speaking_head': '\ud83d\udde3',
      'speech_balloon': '\ud83d\udcac',
      'speedboat': '\ud83d\udea4',
      'spider': '\ud83d\udd77',
      'spider_web': '\ud83d\udd78',
      'spiral_calendar': '\ud83d\uddd3',
      'spiral_notepad': '\ud83d\uddd2',
      'spoon': '\ud83e\udd44',
      'squid': '\ud83e\udd91',
      'stadium': '\ud83c\udfdf',
      'star': '\u2b50\ufe0f',
      'star2': '\ud83c\udf1f',
      'star_and_crescent': '\u262a\ufe0f',
      'star_of_david': '\u2721\ufe0f',
      'stars': '\ud83c\udf20',
      'station': '\ud83d\ude89',
      'statue_of_liberty': '\ud83d\uddfd',
      'steam_locomotive': '\ud83d\ude82',
      'stew': '\ud83c\udf72',
      'stop_button': '\u23f9',
      'stop_sign': '\ud83d\uded1',
      'stopwatch': '\u23f1',
      'straight_ruler': '\ud83d\udccf',
      'strawberry': '\ud83c\udf53',
      'stuck_out_tongue': '\ud83d\ude1b',
      'stuck_out_tongue_closed_eyes': '\ud83d\ude1d',
      'stuck_out_tongue_winking_eye': '\ud83d\ude1c',
      'studio_microphone': '\ud83c\udf99',
      'stuffed_flatbread': '\ud83e\udd59',
      'sun_behind_large_cloud': '\ud83c\udf25',
      'sun_behind_rain_cloud': '\ud83c\udf26',
      'sun_behind_small_cloud': '\ud83c\udf24',
      'sun_with_face': '\ud83c\udf1e',
      'sunflower': '\ud83c\udf3b',
      'sunglasses': '\ud83d\ude0e',
      'sunny': '\u2600\ufe0f',
      'sunrise': '\ud83c\udf05',
      'sunrise_over_mountains': '\ud83c\udf04',
      'surfing_man': '\ud83c\udfc4',
      'surfing_woman': '\ud83c\udfc4&zwj;\u2640\ufe0f',
      'sushi': '\ud83c\udf63',
      'suspension_railway': '\ud83d\ude9f',
      'sweat': '\ud83d\ude13',
      'sweat_drops': '\ud83d\udca6',
      'sweat_smile': '\ud83d\ude05',
      'sweet_potato': '\ud83c\udf60',
      'swimming_man': '\ud83c\udfca',
      'swimming_woman': '\ud83c\udfca&zwj;\u2640\ufe0f',
      'symbols': '\ud83d\udd23',
      'synagogue': '\ud83d\udd4d',
      'syringe': '\ud83d\udc89',
      'taco': '\ud83c\udf2e',
      'tada': '\ud83c\udf89',
      'tanabata_tree': '\ud83c\udf8b',
      'taurus': '\u2649\ufe0f',
      'taxi': '\ud83d\ude95',
      'tea': '\ud83c\udf75',
      'telephone_receiver': '\ud83d\udcde',
      'telescope': '\ud83d\udd2d',
      'tennis': '\ud83c\udfbe',
      'tent': '\u26fa\ufe0f',
      'thermometer': '\ud83c\udf21',
      'thinking': '\ud83e\udd14',
      'thought_balloon': '\ud83d\udcad',
      'ticket': '\ud83c\udfab',
      'tickets': '\ud83c\udf9f',
      'tiger': '\ud83d\udc2f',
      'tiger2': '\ud83d\udc05',
      'timer_clock': '\u23f2',
      'tipping_hand_man': '\ud83d\udc81&zwj;\u2642\ufe0f',
      'tired_face': '\ud83d\ude2b',
      'tm': '\u2122\ufe0f',
      'toilet': '\ud83d\udebd',
      'tokyo_tower': '\ud83d\uddfc',
      'tomato': '\ud83c\udf45',
      'tongue': '\ud83d\udc45',
      'top': '\ud83d\udd1d',
      'tophat': '\ud83c\udfa9',
      'tornado': '\ud83c\udf2a',
      'trackball': '\ud83d\uddb2',
      'tractor': '\ud83d\ude9c',
      'traffic_light': '\ud83d\udea5',
      'train': '\ud83d\ude8b',
      'train2': '\ud83d\ude86',
      'tram': '\ud83d\ude8a',
      'triangular_flag_on_post': '\ud83d\udea9',
      'triangular_ruler': '\ud83d\udcd0',
      'trident': '\ud83d\udd31',
      'triumph': '\ud83d\ude24',
      'trolleybus': '\ud83d\ude8e',
      'trophy': '\ud83c\udfc6',
      'tropical_drink': '\ud83c\udf79',
      'tropical_fish': '\ud83d\udc20',
      'truck': '\ud83d\ude9a',
      'trumpet': '\ud83c\udfba',
      'tulip': '\ud83c\udf37',
      'tumbler_glass': '\ud83e\udd43',
      'turkey': '\ud83e\udd83',
      'turtle': '\ud83d\udc22',
      'tv': '\ud83d\udcfa',
      'twisted_rightwards_arrows': '\ud83d\udd00',
      'two_hearts': '\ud83d\udc95',
      'two_men_holding_hands': '\ud83d\udc6c',
      'two_women_holding_hands': '\ud83d\udc6d',
      'u5272': '\ud83c\ude39',
      'u5408': '\ud83c\ude34',
      'u55b6': '\ud83c\ude3a',
      'u6307': '\ud83c\ude2f\ufe0f',
      'u6708': '\ud83c\ude37\ufe0f',
      'u6709': '\ud83c\ude36',
      'u6e80': '\ud83c\ude35',
      'u7121': '\ud83c\ude1a\ufe0f',
      'u7533': '\ud83c\ude38',
      'u7981': '\ud83c\ude32',
      'u7a7a': '\ud83c\ude33',
      'umbrella': '\u2614\ufe0f',
      'unamused': '\ud83d\ude12',
      'underage': '\ud83d\udd1e',
      'unicorn': '\ud83e\udd84',
      'unlock': '\ud83d\udd13',
      'up': '\ud83c\udd99',
      'upside_down_face': '\ud83d\ude43',
      'v': '\u270c\ufe0f',
      'vertical_traffic_light': '\ud83d\udea6',
      'vhs': '\ud83d\udcfc',
      'vibration_mode': '\ud83d\udcf3',
      'video_camera': '\ud83d\udcf9',
      'video_game': '\ud83c\udfae',
      'violin': '\ud83c\udfbb',
      'virgo': '\u264d\ufe0f',
      'volcano': '\ud83c\udf0b',
      'volleyball': '\ud83c\udfd0',
      'vs': '\ud83c\udd9a',
      'vulcan_salute': '\ud83d\udd96',
      'walking_man': '\ud83d\udeb6',
      'walking_woman': '\ud83d\udeb6&zwj;\u2640\ufe0f',
      'waning_crescent_moon': '\ud83c\udf18',
      'waning_gibbous_moon': '\ud83c\udf16',
      'warning': '\u26a0\ufe0f',
      'wastebasket': '\ud83d\uddd1',
      'watch': '\u231a\ufe0f',
      'water_buffalo': '\ud83d\udc03',
      'watermelon': '\ud83c\udf49',
      'wave': '\ud83d\udc4b',
      'wavy_dash': '\u3030\ufe0f',
      'waxing_crescent_moon': '\ud83c\udf12',
      'wc': '\ud83d\udebe',
      'weary': '\ud83d\ude29',
      'wedding': '\ud83d\udc92',
      'weight_lifting_man': '\ud83c\udfcb\ufe0f',
      'weight_lifting_woman': '\ud83c\udfcb\ufe0f&zwj;\u2640\ufe0f',
      'whale': '\ud83d\udc33',
      'whale2': '\ud83d\udc0b',
      'wheel_of_dharma': '\u2638\ufe0f',
      'wheelchair': '\u267f\ufe0f',
      'white_check_mark': '\u2705',
      'white_circle': '\u26aa\ufe0f',
      'white_flag': '\ud83c\udff3\ufe0f',
      'white_flower': '\ud83d\udcae',
      'white_large_square': '\u2b1c\ufe0f',
      'white_medium_small_square': '\u25fd\ufe0f',
      'white_medium_square': '\u25fb\ufe0f',
      'white_small_square': '\u25ab\ufe0f',
      'white_square_button': '\ud83d\udd33',
      'wilted_flower': '\ud83e\udd40',
      'wind_chime': '\ud83c\udf90',
      'wind_face': '\ud83c\udf2c',
      'wine_glass': '\ud83c\udf77',
      'wink': '\ud83d\ude09',
      'wolf': '\ud83d\udc3a',
      'woman': '\ud83d\udc69',
      'woman_artist': '\ud83d\udc69&zwj;\ud83c\udfa8',
      'woman_astronaut': '\ud83d\udc69&zwj;\ud83d\ude80',
      'woman_cartwheeling': '\ud83e\udd38&zwj;\u2640\ufe0f',
      'woman_cook': '\ud83d\udc69&zwj;\ud83c\udf73',
      'woman_facepalming': '\ud83e\udd26&zwj;\u2640\ufe0f',
      'woman_factory_worker': '\ud83d\udc69&zwj;\ud83c\udfed',
      'woman_farmer': '\ud83d\udc69&zwj;\ud83c\udf3e',
      'woman_firefighter': '\ud83d\udc69&zwj;\ud83d\ude92',
      'woman_health_worker': '\ud83d\udc69&zwj;\u2695\ufe0f',
      'woman_judge': '\ud83d\udc69&zwj;\u2696\ufe0f',
      'woman_juggling': '\ud83e\udd39&zwj;\u2640\ufe0f',
      'woman_mechanic': '\ud83d\udc69&zwj;\ud83d\udd27',
      'woman_office_worker': '\ud83d\udc69&zwj;\ud83d\udcbc',
      'woman_pilot': '\ud83d\udc69&zwj;\u2708\ufe0f',
      'woman_playing_handball': '\ud83e\udd3e&zwj;\u2640\ufe0f',
      'woman_playing_water_polo': '\ud83e\udd3d&zwj;\u2640\ufe0f',
      'woman_scientist': '\ud83d\udc69&zwj;\ud83d\udd2c',
      'woman_shrugging': '\ud83e\udd37&zwj;\u2640\ufe0f',
      'woman_singer': '\ud83d\udc69&zwj;\ud83c\udfa4',
      'woman_student': '\ud83d\udc69&zwj;\ud83c\udf93',
      'woman_teacher': '\ud83d\udc69&zwj;\ud83c\udfeb',
      'woman_technologist': '\ud83d\udc69&zwj;\ud83d\udcbb',
      'woman_with_turban': '\ud83d\udc73&zwj;\u2640\ufe0f',
      'womans_clothes': '\ud83d\udc5a',
      'womans_hat': '\ud83d\udc52',
      'women_wrestling': '\ud83e\udd3c&zwj;\u2640\ufe0f',
      'womens': '\ud83d\udeba',
      'world_map': '\ud83d\uddfa',
      'worried': '\ud83d\ude1f',
      'wrench': '\ud83d\udd27',
      'writing_hand': '\u270d\ufe0f',
      'x': '\u274c',
      'yellow_heart': '\ud83d\udc9b',
      'yen': '\ud83d\udcb4',
      'yin_yang': '\u262f\ufe0f',
      'yum': '\ud83d\ude0b',
      'zap': '\u26a1\ufe0f',
      'zipper_mouth_face': '\ud83e\udd10',
      'zzz': '\ud83d\udca4',

      /* special emojis :P */
      'octocat': '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
      'showdown': '<span style="font-family: \'Anonymous Pro\', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>'
    };
    /**
     * Created by Estevao on 31-05-2015.
     */

    /**
     * Showdown Converter class
     * @class
     * @param {object} [converterOptions]
     * @returns {Converter}
     */

    showdown.Converter = function (converterOptions) {

      var
      /**
       * Options used by this converter
       * @private
       * @type {{}}
       */
      options = {},

      /**
       * Language extensions used by this converter
       * @private
       * @type {Array}
       */
      langExtensions = [],

      /**
       * Output modifiers extensions used by this converter
       * @private
       * @type {Array}
       */
      outputModifiers = [],

      /**
       * Event listeners
       * @private
       * @type {{}}
       */
      listeners = {},

      /**
       * The flavor set in this converter
       */
      setConvFlavor = setFlavor,

      /**
       * Metadata of the document
       * @type {{parsed: {}, raw: string, format: string}}
       */
      metadata = {
        parsed: {},
        raw: '',
        format: ''
      };

      _constructor();
      /**
       * Converter constructor
       * @private
       */


      function _constructor() {
        converterOptions = converterOptions || {};

        for (var gOpt in globalOptions) {
          if (globalOptions.hasOwnProperty(gOpt)) {
            options[gOpt] = globalOptions[gOpt];
          }
        } // Merge options


        if (typeof converterOptions === 'object') {
          for (var opt in converterOptions) {
            if (converterOptions.hasOwnProperty(opt)) {
              options[opt] = converterOptions[opt];
            }
          }
        } else {
          throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions + ' was passed instead.');
        }

        if (options.extensions) {
          showdown.helper.forEach(options.extensions, _parseExtension);
        }
      }
      /**
       * Parse extension
       * @param {*} ext
       * @param {string} [name='']
       * @private
       */


      function _parseExtension(ext, name) {
        name = name || null; // If it's a string, the extension was previously loaded

        if (showdown.helper.isString(ext)) {
          ext = showdown.helper.stdExtName(ext);
          name = ext; // LEGACY_SUPPORT CODE

          if (showdown.extensions[ext]) {
            console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' + 'Please inform the developer that the extension should be updated!');
            legacyExtensionLoading(showdown.extensions[ext], ext);
            return; // END LEGACY SUPPORT CODE
          } else if (!showdown.helper.isUndefined(extensions[ext])) {
            ext = extensions[ext];
          } else {
            throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
          }
        }

        if (typeof ext === 'function') {
          ext = ext();
        }

        if (!showdown.helper.isArray(ext)) {
          ext = [ext];
        }

        var validExt = validate(ext, name);

        if (!validExt.valid) {
          throw Error(validExt.error);
        }

        for (var i = 0; i < ext.length; ++i) {
          switch (ext[i].type) {
            case 'lang':
              langExtensions.push(ext[i]);
              break;

            case 'output':
              outputModifiers.push(ext[i]);
              break;
          }

          if (ext[i].hasOwnProperty('listeners')) {
            for (var ln in ext[i].listeners) {
              if (ext[i].listeners.hasOwnProperty(ln)) {
                listen(ln, ext[i].listeners[ln]);
              }
            }
          }
        }
      }
      /**
       * LEGACY_SUPPORT
       * @param {*} ext
       * @param {string} name
       */


      function legacyExtensionLoading(ext, name) {
        if (typeof ext === 'function') {
          ext = ext(new showdown.Converter());
        }

        if (!showdown.helper.isArray(ext)) {
          ext = [ext];
        }

        var valid = validate(ext, name);

        if (!valid.valid) {
          throw Error(valid.error);
        }

        for (var i = 0; i < ext.length; ++i) {
          switch (ext[i].type) {
            case 'lang':
              langExtensions.push(ext[i]);
              break;

            case 'output':
              outputModifiers.push(ext[i]);
              break;

            default:
              // should never reach here
              throw Error('Extension loader error: Type unrecognized!!!');
          }
        }
      }
      /**
       * Listen to an event
       * @param {string} name
       * @param {function} callback
       */


      function listen(name, callback) {
        if (!showdown.helper.isString(name)) {
          throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
        }

        if (typeof callback !== 'function') {
          throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
        }

        if (!listeners.hasOwnProperty(name)) {
          listeners[name] = [];
        }

        listeners[name].push(callback);
      }

      function rTrimInputText(text) {
        var rsp = text.match(/^\s*/)[0].length,
            rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
        return text.replace(rgx, '');
      }
      /**
       * Dispatch an event
       * @private
       * @param {string} evtName Event name
       * @param {string} text Text
       * @param {{}} options Converter Options
       * @param {{}} globals
       * @returns {string}
       */


      this._dispatch = function dispatch(evtName, text, options, globals) {
        if (listeners.hasOwnProperty(evtName)) {
          for (var ei = 0; ei < listeners[evtName].length; ++ei) {
            var nText = listeners[evtName][ei](evtName, text, this, options, globals);

            if (nText && typeof nText !== 'undefined') {
              text = nText;
            }
          }
        }

        return text;
      };
      /**
       * Listen to an event
       * @param {string} name
       * @param {function} callback
       * @returns {showdown.Converter}
       */


      this.listen = function (name, callback) {
        listen(name, callback);
        return this;
      };
      /**
       * Converts a markdown string into HTML
       * @param {string} text
       * @returns {*}
       */


      this.makeHtml = function (text) {
        //check if text is not falsy
        if (!text) {
          return text;
        }

        var globals = {
          gHtmlBlocks: [],
          gHtmlMdBlocks: [],
          gHtmlSpans: [],
          gUrls: {},
          gTitles: {},
          gDimensions: {},
          gListLevel: 0,
          hashLinkCounts: {},
          langExtensions: langExtensions,
          outputModifiers: outputModifiers,
          converter: this,
          ghCodeBlocks: [],
          metadata: {
            parsed: {},
            raw: '',
            format: ''
          }
        }; // This lets us use ¨ trema as an escape char to avoid md5 hashes
        // The choice of character is arbitrary; anything that isn't
        // magic in Markdown will work.

        text = text.replace(/¨/g, '¨T'); // Replace $ with ¨D
        // RegExp interprets $ as a special character
        // when it's in a replacement string

        text = text.replace(/\$/g, '¨D'); // Standardize line endings

        text = text.replace(/\r\n/g, '\n'); // DOS to Unix

        text = text.replace(/\r/g, '\n'); // Mac to Unix
        // Stardardize line spaces

        text = text.replace(/\u00A0/g, '&nbsp;');

        if (options.smartIndentationFix) {
          text = rTrimInputText(text);
        } // Make sure text begins and ends with a couple of newlines:


        text = '\n\n' + text + '\n\n'; // detab

        text = showdown.subParser('detab')(text, options, globals);
        /**
         * Strip any lines consisting only of spaces and tabs.
         * This makes subsequent regexs easier to write, because we can
         * match consecutive blank lines with /\n+/ instead of something
         * contorted like /[ \t]*\n+/
         */

        text = text.replace(/^[ \t]+$/mg, ''); //run languageExtensions

        showdown.helper.forEach(langExtensions, function (ext) {
          text = showdown.subParser('runExtension')(ext, text, options, globals);
        }); // run the sub parsers

        text = showdown.subParser('metadata')(text, options, globals);
        text = showdown.subParser('hashPreCodeTags')(text, options, globals);
        text = showdown.subParser('githubCodeBlocks')(text, options, globals);
        text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
        text = showdown.subParser('hashCodeTags')(text, options, globals);
        text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
        text = showdown.subParser('blockGamut')(text, options, globals);
        text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
        text = showdown.subParser('unescapeSpecialChars')(text, options, globals); // attacklab: Restore dollar signs

        text = text.replace(/¨D/g, '$$'); // attacklab: Restore tremas

        text = text.replace(/¨T/g, '¨'); // render a complete html document instead of a partial if the option is enabled

        text = showdown.subParser('completeHTMLDocument')(text, options, globals); // Run output modifiers

        showdown.helper.forEach(outputModifiers, function (ext) {
          text = showdown.subParser('runExtension')(ext, text, options, globals);
        }); // update metadata

        metadata = globals.metadata;
        return text;
      };
      /**
       * Converts an HTML string into a markdown string
       * @param src
       * @param [HTMLParser] A WHATWG DOM and HTML parser, such as JSDOM. If none is supplied, window.document will be used.
       * @returns {string}
       */


      this.makeMarkdown = this.makeMd = function (src, HTMLParser) {
        // replace \r\n with \n
        src = src.replace(/\r\n/g, '\n');
        src = src.replace(/\r/g, '\n'); // old macs
        // due to an edge case, we need to find this: > <
        // to prevent removing of non silent white spaces
        // ex: <em>this is</em> <strong>sparta</strong>

        src = src.replace(/>[ \t]+</, '>¨NBSP;<');

        if (!HTMLParser) {
          if (window && window.document) {
            HTMLParser = window.document;
          } else {
            throw new Error('HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM');
          }
        }

        var doc = HTMLParser.createElement('div');
        doc.innerHTML = src;
        var globals = {
          preList: substitutePreCodeTags(doc)
        }; // remove all newlines and collapse spaces

        clean(doc); // some stuff, like accidental reference links must now be escaped
        // TODO
        // doc.innerHTML = doc.innerHTML.replace(/\[[\S\t ]]/);

        var nodes = doc.childNodes,
            mdDoc = '';

        for (var i = 0; i < nodes.length; i++) {
          mdDoc += showdown.subParser('makeMarkdown.node')(nodes[i], globals);
        }

        function clean(node) {
          for (var n = 0; n < node.childNodes.length; ++n) {
            var child = node.childNodes[n];

            if (child.nodeType === 3) {
              if (!/\S/.test(child.nodeValue)) {
                node.removeChild(child);
                --n;
              } else {
                child.nodeValue = child.nodeValue.split('\n').join(' ');
                child.nodeValue = child.nodeValue.replace(/(\s)+/g, '$1');
              }
            } else if (child.nodeType === 1) {
              clean(child);
            }
          }
        } // find all pre tags and replace contents with placeholder
        // we need this so that we can remove all indentation from html
        // to ease up parsing


        function substitutePreCodeTags(doc) {
          var pres = doc.querySelectorAll('pre'),
              presPH = [];

          for (var i = 0; i < pres.length; ++i) {
            if (pres[i].childElementCount === 1 && pres[i].firstChild.tagName.toLowerCase() === 'code') {
              var content = pres[i].firstChild.innerHTML.trim(),
                  language = pres[i].firstChild.getAttribute('data-language') || ''; // if data-language attribute is not defined, then we look for class language-*

              if (language === '') {
                var classes = pres[i].firstChild.className.split(' ');

                for (var c = 0; c < classes.length; ++c) {
                  var matches = classes[c].match(/^language-(.+)$/);

                  if (matches !== null) {
                    language = matches[1];
                    break;
                  }
                }
              } // unescape html entities in content


              content = showdown.helper.unescapeHTMLEntities(content);
              presPH.push(content);
              pres[i].outerHTML = '<precode language="' + language + '" precodenum="' + i.toString() + '"></precode>';
            } else {
              presPH.push(pres[i].innerHTML);
              pres[i].innerHTML = '';
              pres[i].setAttribute('prenum', i.toString());
            }
          }

          return presPH;
        }

        return mdDoc;
      };
      /**
       * Set an option of this Converter instance
       * @param {string} key
       * @param {*} value
       */


      this.setOption = function (key, value) {
        options[key] = value;
      };
      /**
       * Get the option of this Converter instance
       * @param {string} key
       * @returns {*}
       */


      this.getOption = function (key) {
        return options[key];
      };
      /**
       * Get the options of this Converter instance
       * @returns {{}}
       */


      this.getOptions = function () {
        return options;
      };
      /**
       * Add extension to THIS converter
       * @param {{}} extension
       * @param {string} [name=null]
       */


      this.addExtension = function (extension, name) {
        name = name || null;

        _parseExtension(extension, name);
      };
      /**
       * Use a global registered extension with THIS converter
       * @param {string} extensionName Name of the previously registered extension
       */


      this.useExtension = function (extensionName) {
        _parseExtension(extensionName);
      };
      /**
       * Set the flavor THIS converter should use
       * @param {string} name
       */


      this.setFlavor = function (name) {
        if (!flavor.hasOwnProperty(name)) {
          throw Error(name + ' flavor was not found');
        }

        var preset = flavor[name];
        setConvFlavor = name;

        for (var option in preset) {
          if (preset.hasOwnProperty(option)) {
            options[option] = preset[option];
          }
        }
      };
      /**
       * Get the currently set flavor of this converter
       * @returns {string}
       */


      this.getFlavor = function () {
        return setConvFlavor;
      };
      /**
       * Remove an extension from THIS converter.
       * Note: This is a costly operation. It's better to initialize a new converter
       * and specify the extensions you wish to use
       * @param {Array} extension
       */


      this.removeExtension = function (extension) {
        if (!showdown.helper.isArray(extension)) {
          extension = [extension];
        }

        for (var a = 0; a < extension.length; ++a) {
          var ext = extension[a];

          for (var i = 0; i < langExtensions.length; ++i) {
            if (langExtensions[i] === ext) {
              langExtensions[i].splice(i, 1);
            }
          }

          for (var ii = 0; ii < outputModifiers.length; ++i) {
            if (outputModifiers[ii] === ext) {
              outputModifiers[ii].splice(i, 1);
            }
          }
        }
      };
      /**
       * Get all extension of THIS converter
       * @returns {{language: Array, output: Array}}
       */


      this.getAllExtensions = function () {
        return {
          language: langExtensions,
          output: outputModifiers
        };
      };
      /**
       * Get the metadata of the previously parsed document
       * @param raw
       * @returns {string|{}}
       */


      this.getMetadata = function (raw) {
        if (raw) {
          return metadata.raw;
        } else {
          return metadata.parsed;
        }
      };
      /**
       * Get the metadata format of the previously parsed document
       * @returns {string}
       */


      this.getMetadataFormat = function () {
        return metadata.format;
      };
      /**
       * Private: set a single key, value metadata pair
       * @param {string} key
       * @param {string} value
       */


      this._setMetadataPair = function (key, value) {
        metadata.parsed[key] = value;
      };
      /**
       * Private: set metadata format
       * @param {string} format
       */


      this._setMetadataFormat = function (format) {
        metadata.format = format;
      };
      /**
       * Private: set metadata raw text
       * @param {string} raw
       */


      this._setMetadataRaw = function (raw) {
        metadata.raw = raw;
      };
    };
    /**
     * Turn Markdown link shortcuts into XHTML <a> tags.
     */


    showdown.subParser('anchors', function (text, options, globals) {

      text = globals.converter._dispatch('anchors.before', text, options, globals);

      var writeAnchorTag = function (wholeMatch, linkText, linkId, url, m5, m6, title) {
        if (showdown.helper.isUndefined(title)) {
          title = '';
        }

        linkId = linkId.toLowerCase(); // Special case for explicit empty url

        if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
          url = '';
        } else if (!url) {
          if (!linkId) {
            // lower-case and turn embedded newlines into spaces
            linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
          }

          url = '#' + linkId;

          if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
            url = globals.gUrls[linkId];

            if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
              title = globals.gTitles[linkId];
            }
          } else {
            return wholeMatch;
          }
        } //url = showdown.helper.escapeCharacters(url, '*_', false); // replaced line to improve performance


        url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
        var result = '<a href="' + url + '"';

        if (title !== '' && title !== null) {
          title = title.replace(/"/g, '&quot;'); //title = showdown.helper.escapeCharacters(title, '*_', false); // replaced line to improve performance

          title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
          result += ' title="' + title + '"';
        } // optionLinksInNewWindow only applies
        // to external links. Hash links (#) open in same page


        if (options.openLinksInNewWindow && !/^#/.test(url)) {
          // escaped _
          result += ' target="¨E95Eblank"';
        }

        result += '>' + linkText + '</a>';
        return result;
      }; // First, handle reference-style links: [link text] [id]


      text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag); // Next, inline-style links: [link text](url "optional title")
      // cases with crazy urls like ./image/cat1).png

      text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag); // normal cases

      text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag); // handle reference-style shortcuts: [link text]
      // These must come last in case you've also got [link test][1]
      // or [link test](/foo)

      text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag); // Lastly handle GithubMentions if option is enabled

      if (options.ghMentions) {
        text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function (wm, st, escape, mentions, username) {
          if (escape === '\\') {
            return st + mentions;
          } //check if options.ghMentionsLink is a string


          if (!showdown.helper.isString(options.ghMentionsLink)) {
            throw new Error('ghMentionsLink option must be a string');
          }

          var lnk = options.ghMentionsLink.replace(/\{u}/g, username),
              target = '';

          if (options.openLinksInNewWindow) {
            target = ' target="¨E95Eblank"';
          }

          return st + '<a href="' + lnk + '"' + target + '>' + mentions + '</a>';
        });
      }

      text = globals.converter._dispatch('anchors.after', text, options, globals);
      return text;
    }); // url allowed chars [a-z\d_.~:/?#[]@!$&'()*+,;=-]

    var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
        simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
        delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
        simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
        delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
        replaceLink = function (options) {

      return function (wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
        link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
        var lnkTxt = link,
            append = '',
            target = '',
            lmc = leadingMagicChars || '',
            tmc = trailingMagicChars || '';

        if (/^www\./i.test(link)) {
          link = link.replace(/^www\./i, 'http://www.');
        }

        if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
          append = trailingPunctuation;
        }

        if (options.openLinksInNewWindow) {
          target = ' target="¨E95Eblank"';
        }

        return lmc + '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append + tmc;
      };
    },
        replaceMail = function (options, globals) {

      return function (wholeMatch, b, mail) {
        var href = 'mailto:';
        b = b || '';
        mail = showdown.subParser('unescapeSpecialChars')(mail, options, globals);

        if (options.encodeEmails) {
          href = showdown.helper.encodeEmailAddress(href + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          href = href + mail;
        }

        return b + '<a href="' + href + '">' + mail + '</a>';
      };
    };

    showdown.subParser('autoLinks', function (text, options, globals) {

      text = globals.converter._dispatch('autoLinks.before', text, options, globals);
      text = text.replace(delimUrlRegex, replaceLink(options));
      text = text.replace(delimMailRegex, replaceMail(options, globals));
      text = globals.converter._dispatch('autoLinks.after', text, options, globals);
      return text;
    });
    showdown.subParser('simplifiedAutoLinks', function (text, options, globals) {

      if (!options.simplifiedAutoLink) {
        return text;
      }

      text = globals.converter._dispatch('simplifiedAutoLinks.before', text, options, globals);

      if (options.excludeTrailingPunctuationFromURLs) {
        text = text.replace(simpleURLRegex2, replaceLink(options));
      } else {
        text = text.replace(simpleURLRegex, replaceLink(options));
      }

      text = text.replace(simpleMailRegex, replaceMail(options, globals));
      text = globals.converter._dispatch('simplifiedAutoLinks.after', text, options, globals);
      return text;
    });
    /**
     * These are all the transformations that form block-level
     * tags like paragraphs, headers, and list items.
     */

    showdown.subParser('blockGamut', function (text, options, globals) {

      text = globals.converter._dispatch('blockGamut.before', text, options, globals); // we parse blockquotes first so that we can have headings and hrs
      // inside blockquotes

      text = showdown.subParser('blockQuotes')(text, options, globals);
      text = showdown.subParser('headers')(text, options, globals); // Do Horizontal Rules:

      text = showdown.subParser('horizontalRule')(text, options, globals);
      text = showdown.subParser('lists')(text, options, globals);
      text = showdown.subParser('codeBlocks')(text, options, globals);
      text = showdown.subParser('tables')(text, options, globals); // We already ran _HashHTMLBlocks() before, in Markdown(), but that
      // was to escape raw HTML in the original Markdown source. This time,
      // we're escaping the markup we've just created, so that we don't wrap
      // <p> tags around block-level tags.

      text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
      text = showdown.subParser('paragraphs')(text, options, globals);
      text = globals.converter._dispatch('blockGamut.after', text, options, globals);
      return text;
    });
    showdown.subParser('blockQuotes', function (text, options, globals) {

      text = globals.converter._dispatch('blockQuotes.before', text, options, globals); // add a couple extra lines after the text and endtext mark

      text = text + '\n\n';
      var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;

      if (options.splitAdjacentBlockquotes) {
        rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
      }

      text = text.replace(rgx, function (bq) {
        // attacklab: hack around Konqueror 3.5.4 bug:
        // "----------bug".replace(/^-/g,"") == "bug"
        bq = bq.replace(/^[ \t]*>[ \t]?/gm, ''); // trim one level of quoting
        // attacklab: clean up hack

        bq = bq.replace(/¨0/g, '');
        bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines

        bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
        bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

        bq = bq.replace(/(^|\n)/g, '$1  '); // These leading spaces screw with <pre> content, so we need to fix that:

        bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
          var pre = m1; // attacklab: hack around Konqueror 3.5.4 bug:

          pre = pre.replace(/^  /mg, '¨0');
          pre = pre.replace(/¨0/g, '');
          return pre;
        });
        return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
      });
      text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
      return text;
    });
    /**
     * Process Markdown `<pre><code>` blocks.
     */

    showdown.subParser('codeBlocks', function (text, options, globals) {

      text = globals.converter._dispatch('codeBlocks.before', text, options, globals); // sentinel workarounds for lack of \A and \Z, safari\khtml bug

      text += '¨0';
      var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      text = text.replace(pattern, function (wholeMatch, m1, m2) {
        var codeblock = m1,
            nextChar = m2,
            end = '\n';
        codeblock = showdown.subParser('outdent')(codeblock, options, globals);
        codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
        codeblock = showdown.subParser('detab')(codeblock, options, globals);
        codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines

        codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

        if (options.omitExtraWLInCodeBlocks) {
          end = '';
        }

        codeblock = '<pre><code>' + codeblock + end + '</code></pre>';
        return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
      }); // strip sentinel

      text = text.replace(/¨0/, '');
      text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
      return text;
    });
    /**
     *
     *   *  Backtick quotes are used for <code></code> spans.
     *
     *   *  You can use multiple backticks as the delimiters if you want to
     *     include literal backticks in the code span. So, this input:
     *
     *         Just type ``foo `bar` baz`` at the prompt.
     *
     *       Will translate to:
     *
     *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
     *
     *    There's no arbitrary limit to the number of backticks you
     *    can use as delimters. If you need three consecutive backticks
     *    in your code, use four for delimiters, etc.
     *
     *  *  You can use spaces to get literal backticks at the edges:
     *
     *         ... type `` `bar` `` ...
     *
     *       Turns to:
     *
     *         ... type <code>`bar`</code> ...
     */

    showdown.subParser('codeSpans', function (text, options, globals) {

      text = globals.converter._dispatch('codeSpans.before', text, options, globals);

      if (typeof text === 'undefined') {
        text = '';
      }

      text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (wholeMatch, m1, m2, m3) {
        var c = m3;
        c = c.replace(/^([ \t]*)/g, ''); // leading whitespace

        c = c.replace(/[ \t]*$/g, ''); // trailing whitespace

        c = showdown.subParser('encodeCode')(c, options, globals);
        c = m1 + '<code>' + c + '</code>';
        c = showdown.subParser('hashHTMLSpans')(c, options, globals);
        return c;
      });
      text = globals.converter._dispatch('codeSpans.after', text, options, globals);
      return text;
    });
    /**
     * Create a full HTML document from the processed markdown
     */

    showdown.subParser('completeHTMLDocument', function (text, options, globals) {

      if (!options.completeHTMLDocument) {
        return text;
      }

      text = globals.converter._dispatch('completeHTMLDocument.before', text, options, globals);
      var doctype = 'html',
          doctypeParsed = '<!DOCTYPE HTML>\n',
          title = '',
          charset = '<meta charset="utf-8">\n',
          lang = '',
          metadata = '';

      if (typeof globals.metadata.parsed.doctype !== 'undefined') {
        doctypeParsed = '<!DOCTYPE ' + globals.metadata.parsed.doctype + '>\n';
        doctype = globals.metadata.parsed.doctype.toString().toLowerCase();

        if (doctype === 'html' || doctype === 'html5') {
          charset = '<meta charset="utf-8">';
        }
      }

      for (var meta in globals.metadata.parsed) {
        if (globals.metadata.parsed.hasOwnProperty(meta)) {
          switch (meta.toLowerCase()) {
            case 'doctype':
              break;

            case 'title':
              title = '<title>' + globals.metadata.parsed.title + '</title>\n';
              break;

            case 'charset':
              if (doctype === 'html' || doctype === 'html5') {
                charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
              } else {
                charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
              }

              break;

            case 'language':
            case 'lang':
              lang = ' lang="' + globals.metadata.parsed[meta] + '"';
              metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
              break;

            default:
              metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
          }
        }
      }

      text = doctypeParsed + '<html' + lang + '>\n<head>\n' + title + charset + metadata + '</head>\n<body>\n' + text.trim() + '\n</body>\n</html>';
      text = globals.converter._dispatch('completeHTMLDocument.after', text, options, globals);
      return text;
    });
    /**
     * Convert all tabs to spaces
     */

    showdown.subParser('detab', function (text, options, globals) {

      text = globals.converter._dispatch('detab.before', text, options, globals); // expand first n-1 tabs

      text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width
      // replace the nth with two sentinels

      text = text.replace(/\t/g, '¨A¨B'); // use the sentinel to anchor our regex so it doesn't explode

      text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
        var leadingText = m1,
            numSpaces = 4 - leadingText.length % 4; // g_tab_width
        // there *must* be a better way to do this:

        for (var i = 0; i < numSpaces; i++) {
          leadingText += ' ';
        }

        return leadingText;
      }); // clean up sentinels

      text = text.replace(/¨A/g, '    '); // g_tab_width

      text = text.replace(/¨B/g, '');
      text = globals.converter._dispatch('detab.after', text, options, globals);
      return text;
    });
    showdown.subParser('ellipsis', function (text, options, globals) {

      text = globals.converter._dispatch('ellipsis.before', text, options, globals);
      text = text.replace(/\.\.\./g, '…');
      text = globals.converter._dispatch('ellipsis.after', text, options, globals);
      return text;
    });
    /**
     * Turn emoji codes into emojis
     *
     * List of supported emojis: https://github.com/showdownjs/showdown/wiki/Emojis
     */

    showdown.subParser('emoji', function (text, options, globals) {

      if (!options.emoji) {
        return text;
      }

      text = globals.converter._dispatch('emoji.before', text, options, globals);
      var emojiRgx = /:([\S]+?):/g;
      text = text.replace(emojiRgx, function (wm, emojiCode) {
        if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
          return showdown.helper.emojis[emojiCode];
        }

        return wm;
      });
      text = globals.converter._dispatch('emoji.after', text, options, globals);
      return text;
    });
    /**
     * Smart processing for ampersands and angle brackets that need to be encoded.
     */

    showdown.subParser('encodeAmpsAndAngles', function (text, options, globals) {

      text = globals.converter._dispatch('encodeAmpsAndAngles.before', text, options, globals); // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
      // http://bumppo.net/projects/amputator/

      text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;'); // Encode naked <'s

      text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;'); // Encode <

      text = text.replace(/</g, '&lt;'); // Encode >

      text = text.replace(/>/g, '&gt;');
      text = globals.converter._dispatch('encodeAmpsAndAngles.after', text, options, globals);
      return text;
    });
    /**
     * Returns the string, with after processing the following backslash escape sequences.
     *
     * attacklab: The polite way to do this is with the new escapeCharacters() function:
     *
     *    text = escapeCharacters(text,"\\",true);
     *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
     *
     * ...but we're sidestepping its use of the (slow) RegExp constructor
     * as an optimization for Firefox.  This function gets called a LOT.
     */

    showdown.subParser('encodeBackslashEscapes', function (text, options, globals) {

      text = globals.converter._dispatch('encodeBackslashEscapes.before', text, options, globals);
      text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
      text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown.helper.escapeCharactersCallback);
      text = globals.converter._dispatch('encodeBackslashEscapes.after', text, options, globals);
      return text;
    });
    /**
     * Encode/escape certain characters inside Markdown code runs.
     * The point is that in code, these characters are literals,
     * and lose their special Markdown meanings.
     */

    showdown.subParser('encodeCode', function (text, options, globals) {

      text = globals.converter._dispatch('encodeCode.before', text, options, globals); // Encode all ampersands; HTML entities are not
      // entities within a Markdown code span.

      text = text.replace(/&/g, '&amp;') // Do the angle bracket song and dance:
      .replace(/</g, '&lt;').replace(/>/g, '&gt;') // Now, escape characters that are magic in Markdown:
      .replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);
      text = globals.converter._dispatch('encodeCode.after', text, options, globals);
      return text;
    });
    /**
     * Within tags -- meaning between < and > -- encode [\ ` * _ ~ =] so they
     * don't conflict with their use in Markdown for code, italics and strong.
     */

    showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text, options, globals) {

      text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.before', text, options, globals); // Build a regex to find HTML tags.

      var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
          comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      text = text.replace(tags, function (wholeMatch) {
        return wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`').replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
      });
      text = text.replace(comments, function (wholeMatch) {
        return wholeMatch.replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
      });
      text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.after', text, options, globals);
      return text;
    });
    /**
     * Handle github codeblocks prior to running HashHTML so that
     * HTML contained within the codeblock gets escaped properly
     * Example:
     * ```ruby
     *     def hello_world(x)
     *       puts "Hello, #{x}"
     *     end
     * ```
     */

    showdown.subParser('githubCodeBlocks', function (text, options, globals) {

      if (!options.ghCodeBlocks) {
        return text;
      }

      text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);
      text += '¨0';
      text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (wholeMatch, delim, language, codeblock) {
        var end = options.omitExtraWLInCodeBlocks ? '' : '\n'; // First parse the github code block

        codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
        codeblock = showdown.subParser('detab')(codeblock, options, globals);
        codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines

        codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

        codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';
        codeblock = showdown.subParser('hashBlock')(codeblock, options, globals); // Since GHCodeblocks can be false positives, we need to
        // store the primitive text and the parsed text in a global var,
        // and then return a token

        return '\n\n¨G' + (globals.ghCodeBlocks.push({
          text: wholeMatch,
          codeblock: codeblock
        }) - 1) + 'G\n\n';
      }); // attacklab: strip sentinel

      text = text.replace(/¨0/, '');
      return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
    });
    showdown.subParser('hashBlock', function (text, options, globals) {

      text = globals.converter._dispatch('hashBlock.before', text, options, globals);
      text = text.replace(/(^\n+|\n+$)/g, '');
      text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
      text = globals.converter._dispatch('hashBlock.after', text, options, globals);
      return text;
    });
    /**
     * Hash and escape <code> elements that should not be parsed as markdown
     */

    showdown.subParser('hashCodeTags', function (text, options, globals) {

      text = globals.converter._dispatch('hashCodeTags.before', text, options, globals);

      var repFunc = function (wholeMatch, match, left, right) {
        var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
        return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
      }; // Hash naked <code>


      text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');
      text = globals.converter._dispatch('hashCodeTags.after', text, options, globals);
      return text;
    });
    showdown.subParser('hashElement', function (text, options, globals) {

      return function (wholeMatch, m1) {
        var blockText = m1; // Undo double lines

        blockText = blockText.replace(/\n\n/g, '\n');
        blockText = blockText.replace(/^\n/, ''); // strip trailing blank lines

        blockText = blockText.replace(/\n+$/g, ''); // Replace the element text with a marker ("¨KxK" where x is its key)

        blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';
        return blockText;
      };
    });
    showdown.subParser('hashHTMLBlocks', function (text, options, globals) {

      text = globals.converter._dispatch('hashHTMLBlocks.before', text, options, globals);

      var blockTags = ['pre', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'dl', 'ol', 'ul', 'script', 'noscript', 'form', 'fieldset', 'iframe', 'math', 'style', 'section', 'header', 'footer', 'nav', 'article', 'aside', 'address', 'audio', 'canvas', 'figure', 'hgroup', 'output', 'video', 'p'],
          repFunc = function (wholeMatch, match, left, right) {
        var txt = wholeMatch; // check if this html element is marked as markdown
        // if so, it's contents should be parsed as markdown

        if (left.search(/\bmarkdown\b/) !== -1) {
          txt = left + globals.converter.makeHtml(match) + right;
        }

        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      };

      if (options.backslashEscapesHTMLTags) {
        // encode backslash escaped HTML tags
        text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
          return '&lt;' + inside + '&gt;';
        });
      } // hash HTML Blocks


      for (var i = 0; i < blockTags.length; ++i) {
        var opTagPos,
            rgx1 = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
            patLeft = '<' + blockTags[i] + '\\b[^>]*>',
            patRight = '</' + blockTags[i] + '>'; // 1. Look for the first position of the first opening HTML tag in the text

        while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {
          // if the HTML tag is \ escaped, we need to escape it and break
          //2. Split the text in that position
          var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
              //3. Match recursively
          newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im'); // prevent an infinite loop

          if (newSubText1 === subTexts[1]) {
            break;
          }

          text = subTexts[0].concat(newSubText1);
        }
      } // HR SPECIAL CASE


      text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals)); // Special case for standalone HTML comments

      text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      }, '^ {0,3}<!--', '-->', 'gm'); // PHP and ASP-style processor instructions (<?...?> and <%...%>)

      text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));
      text = globals.converter._dispatch('hashHTMLBlocks.after', text, options, globals);
      return text;
    });
    /**
     * Hash span elements that should not be parsed as markdown
     */

    showdown.subParser('hashHTMLSpans', function (text, options, globals) {

      text = globals.converter._dispatch('hashHTMLSpans.before', text, options, globals);

      function hashHTMLSpan(html) {
        return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
      } // Hash Self Closing tags


      text = text.replace(/<[^>]+?\/>/gi, function (wm) {
        return hashHTMLSpan(wm);
      }); // Hash tags without properties

      text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
        return hashHTMLSpan(wm);
      }); // Hash tags with properties

      text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
        return hashHTMLSpan(wm);
      }); // Hash self closing tags without />

      text = text.replace(/<[^>]+?>/gi, function (wm) {
        return hashHTMLSpan(wm);
      });
      /*showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');*/

      text = globals.converter._dispatch('hashHTMLSpans.after', text, options, globals);
      return text;
    });
    /**
     * Unhash HTML spans
     */

    showdown.subParser('unhashHTMLSpans', function (text, options, globals) {

      text = globals.converter._dispatch('unhashHTMLSpans.before', text, options, globals);

      for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
        var repText = globals.gHtmlSpans[i],
            // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

        while (/¨C(\d+)C/.test(repText)) {
          var num = RegExp.$1;
          repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);

          if (limit === 10) {
            console.error('maximum nesting of 10 spans reached!!!');
            break;
          }

          ++limit;
        }

        text = text.replace('¨C' + i + 'C', repText);
      }

      text = globals.converter._dispatch('unhashHTMLSpans.after', text, options, globals);
      return text;
    });
    /**
     * Hash and escape <pre><code> elements that should not be parsed as markdown
     */

    showdown.subParser('hashPreCodeTags', function (text, options, globals) {

      text = globals.converter._dispatch('hashPreCodeTags.before', text, options, globals);

      var repFunc = function (wholeMatch, match, left, right) {
        // encode html entities
        var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
        return '\n\n¨G' + (globals.ghCodeBlocks.push({
          text: wholeMatch,
          codeblock: codeblock
        }) - 1) + 'G\n\n';
      }; // Hash <pre><code>


      text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');
      text = globals.converter._dispatch('hashPreCodeTags.after', text, options, globals);
      return text;
    });
    showdown.subParser('headers', function (text, options, globals) {

      text = globals.converter._dispatch('headers.before', text, options, globals);
      var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart),
          // Set text-style headers:
      //	Header 1
      //	========
      //
      //	Header 2
      //	--------
      //
      setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
          setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      text = text.replace(setextRegexH1, function (wholeMatch, m1) {
        var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
            hID = options.noHeaderId ? '' : ' id="' + headerId(m1) + '"',
            hLevel = headerLevelStart,
            hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
        return showdown.subParser('hashBlock')(hashBlock, options, globals);
      });
      text = text.replace(setextRegexH2, function (matchFound, m1) {
        var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
            hID = options.noHeaderId ? '' : ' id="' + headerId(m1) + '"',
            hLevel = headerLevelStart + 1,
            hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
        return showdown.subParser('hashBlock')(hashBlock, options, globals);
      }); // atx-style headers:
      //  # Header 1
      //  ## Header 2
      //  ## Header 2 with closing hashes ##
      //  ...
      //  ###### Header 6
      //

      var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
        var hText = m2;

        if (options.customizedHeaderId) {
          hText = m2.replace(/\s?\{([^{]+?)}\s*$/, '');
        }

        var span = showdown.subParser('spanGamut')(hText, options, globals),
            hID = options.noHeaderId ? '' : ' id="' + headerId(m2) + '"',
            hLevel = headerLevelStart - 1 + m1.length,
            header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';
        return showdown.subParser('hashBlock')(header, options, globals);
      });

      function headerId(m) {
        var title, prefix; // It is separate from other options to allow combining prefix and customized

        if (options.customizedHeaderId) {
          var match = m.match(/\{([^{]+?)}\s*$/);

          if (match && match[1]) {
            m = match[1];
          }
        }

        title = m; // Prefix id to prevent causing inadvertent pre-existing style matches.

        if (showdown.helper.isString(options.prefixHeaderId)) {
          prefix = options.prefixHeaderId;
        } else if (options.prefixHeaderId === true) {
          prefix = 'section-';
        } else {
          prefix = '';
        }

        if (!options.rawPrefixHeaderId) {
          title = prefix + title;
        }

        if (options.ghCompatibleHeaderId) {
          title = title.replace(/ /g, '-') // replace previously escaped chars (&, ¨ and $)
          .replace(/&amp;/g, '').replace(/¨T/g, '').replace(/¨D/g, '') // replace rest of the chars (&~$ are repeated as they might have been escaped)
          // borrowed from github's redcarpet (some they should produce similar results)
          .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '').toLowerCase();
        } else if (options.rawHeaderId) {
          title = title.replace(/ /g, '-') // replace previously escaped chars (&, ¨ and $)
          .replace(/&amp;/g, '&').replace(/¨T/g, '¨').replace(/¨D/g, '$') // replace " and '
          .replace(/["']/g, '-').toLowerCase();
        } else {
          title = title.replace(/[^\w]/g, '').toLowerCase();
        }

        if (options.rawPrefixHeaderId) {
          title = prefix + title;
        }

        if (globals.hashLinkCounts[title]) {
          title = title + '-' + globals.hashLinkCounts[title]++;
        } else {
          globals.hashLinkCounts[title] = 1;
        }

        return title;
      }

      text = globals.converter._dispatch('headers.after', text, options, globals);
      return text;
    });
    /**
     * Turn Markdown link shortcuts into XHTML <a> tags.
     */

    showdown.subParser('horizontalRule', function (text, options, globals) {

      text = globals.converter._dispatch('horizontalRule.before', text, options, globals);
      var key = showdown.subParser('hashBlock')('<hr />', options, globals);
      text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
      text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
      text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
      text = globals.converter._dispatch('horizontalRule.after', text, options, globals);
      return text;
    });
    /**
     * Turn Markdown image shortcuts into <img> tags.
     */

    showdown.subParser('images', function (text, options, globals) {

      text = globals.converter._dispatch('images.before', text, options, globals);
      var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
          crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
          base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
          referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
          refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;

      function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
        url = url.replace(/\s/g, '');
        return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
      }

      function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
        var gUrls = globals.gUrls,
            gTitles = globals.gTitles,
            gDims = globals.gDimensions;
        linkId = linkId.toLowerCase();

        if (!title) {
          title = '';
        } // Special case for explicit empty url


        if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
          url = '';
        } else if (url === '' || url === null) {
          if (linkId === '' || linkId === null) {
            // lower-case and turn embedded newlines into spaces
            linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
          }

          url = '#' + linkId;

          if (!showdown.helper.isUndefined(gUrls[linkId])) {
            url = gUrls[linkId];

            if (!showdown.helper.isUndefined(gTitles[linkId])) {
              title = gTitles[linkId];
            }

            if (!showdown.helper.isUndefined(gDims[linkId])) {
              width = gDims[linkId].width;
              height = gDims[linkId].height;
            }
          } else {
            return wholeMatch;
          }
        }

        altText = altText.replace(/"/g, '&quot;') //altText = showdown.helper.escapeCharacters(altText, '*_', false);
        .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback); //url = showdown.helper.escapeCharacters(url, '*_', false);

        url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
        var result = '<img src="' + url + '" alt="' + altText + '"';

        if (title && showdown.helper.isString(title)) {
          title = title.replace(/"/g, '&quot;') //title = showdown.helper.escapeCharacters(title, '*_', false);
          .replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
          result += ' title="' + title + '"';
        }

        if (width && height) {
          width = width === '*' ? 'auto' : width;
          height = height === '*' ? 'auto' : height;
          result += ' width="' + width + '"';
          result += ' height="' + height + '"';
        }

        result += ' />';
        return result;
      } // First, handle reference-style labeled images: ![alt text][id]


      text = text.replace(referenceRegExp, writeImageTag); // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")
      // base64 encoded images

      text = text.replace(base64RegExp, writeImageTagBase64); // cases with crazy urls like ./image/cat1).png

      text = text.replace(crazyRegExp, writeImageTag); // normal cases

      text = text.replace(inlineRegExp, writeImageTag); // handle reference-style shortcuts: ![img text]

      text = text.replace(refShortcutRegExp, writeImageTag);
      text = globals.converter._dispatch('images.after', text, options, globals);
      return text;
    });
    showdown.subParser('italicsAndBold', function (text, options, globals) {

      text = globals.converter._dispatch('italicsAndBold.before', text, options, globals); // it's faster to have 3 separate regexes for each case than have just one
      // because of backtracing, in some cases, it could lead to an exponential effect
      // called "catastrophic backtrace". Ominous!

      function parseInside(txt, left, right) {
        /*
        if (options.simplifiedAutoLink) {
          txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
        }
        */
        return left + txt + right;
      } // Parse underscores


      if (options.literalMidWordUnderscores) {
        text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
          return parseInside(txt, '<strong><em>', '</em></strong>');
        });
        text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
          return parseInside(txt, '<strong>', '</strong>');
        });
        text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
          return parseInside(txt, '<em>', '</em>');
        });
      } else {
        text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
          return /\S$/.test(m) ? parseInside(m, '<strong><em>', '</em></strong>') : wm;
        });
        text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
          return /\S$/.test(m) ? parseInside(m, '<strong>', '</strong>') : wm;
        });
        text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
          // !/^_[^_]/.test(m) - test if it doesn't start with __ (since it seems redundant, we removed it)
          return /\S$/.test(m) ? parseInside(m, '<em>', '</em>') : wm;
        });
      } // Now parse asterisks


      if (options.literalMidWordAsterisks) {
        text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function (wm, lead, txt) {
          return parseInside(txt, lead + '<strong><em>', '</em></strong>');
        });
        text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function (wm, lead, txt) {
          return parseInside(txt, lead + '<strong>', '</strong>');
        });
        text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function (wm, lead, txt) {
          return parseInside(txt, lead + '<em>', '</em>');
        });
      } else {
        text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
          return /\S$/.test(m) ? parseInside(m, '<strong><em>', '</em></strong>') : wm;
        });
        text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
          return /\S$/.test(m) ? parseInside(m, '<strong>', '</strong>') : wm;
        });
        text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
          // !/^\*[^*]/.test(m) - test if it doesn't start with ** (since it seems redundant, we removed it)
          return /\S$/.test(m) ? parseInside(m, '<em>', '</em>') : wm;
        });
      }

      text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
      return text;
    });
    /**
     * Form HTML ordered (numbered) and unordered (bulleted) lists.
     */

    showdown.subParser('lists', function (text, options, globals) {
      /**
       * Process the contents of a single ordered or unordered list, splitting it
       * into individual list items.
       * @param {string} listStr
       * @param {boolean} trimTrailing
       * @returns {string}
       */

      function processListItems(listStr, trimTrailing) {
        // The $g_list_level global keeps track of when we're inside a list.
        // Each time we enter a list, we increment it; when we leave a list,
        // we decrement. If it's zero, we're not in a list anymore.
        //
        // We do this because when we're not inside a list, we want to treat
        // something like this:
        //
        //    I recommend upgrading to version
        //    8. Oops, now this line is treated
        //    as a sub-list.
        //
        // As a single paragraph, despite the fact that the second line starts
        // with a digit-period-space sequence.
        //
        // Whereas when we're inside a list (or sub-list), that line will be
        // treated as the start of a sub-list. What a kludge, huh? This is
        // an aspect of Markdown's syntax that's hard to parse perfectly
        // without resorting to mind-reading. Perhaps the solution is to
        // change the syntax rules such that sub-lists must start with a
        // starting cardinal number; e.g. "1." or "a.".
        globals.gListLevel++; // trim trailing blank lines:

        listStr = listStr.replace(/\n{2,}$/, '\n'); // attacklab: add sentinel to emulate \z

        listStr += '¨0';
        var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
            isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr); // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
        // which is a syntax breaking change
        // activating this option reverts to old behavior

        if (options.disableForced4SpacesIndentedSublists) {
          rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
        }

        listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
          checked = checked && checked.trim() !== '';
          var item = showdown.subParser('outdent')(m4, options, globals),
              bulletStyle = ''; // Support for github tasklists

          if (taskbtn && options.tasklists) {
            bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
            item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
              var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';

              if (checked) {
                otp += ' checked';
              }

              otp += '>';
              return otp;
            });
          } // ISSUE #312
          // This input: - - - a
          // causes trouble to the parser, since it interprets it as:
          // <ul><li><li><li>a</li></li></li></ul>
          // instead of:
          // <ul><li>- - a</li></ul>
          // So, to prevent it, we will put a marker (¨A)in the beginning of the line
          // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser


          item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
            return '¨A' + wm2;
          }); // m1 - Leading line or
          // Has a double return (multi paragraph) or
          // Has sublist

          if (m1 || item.search(/\n{2,}/) > -1) {
            item = showdown.subParser('githubCodeBlocks')(item, options, globals);
            item = showdown.subParser('blockGamut')(item, options, globals);
          } else {
            // Recursion for sub-lists:
            item = showdown.subParser('lists')(item, options, globals);
            item = item.replace(/\n$/, ''); // chomp(item)

            item = showdown.subParser('hashHTMLBlocks')(item, options, globals); // Colapse double linebreaks

            item = item.replace(/\n\n+/g, '\n\n');

            if (isParagraphed) {
              item = showdown.subParser('paragraphs')(item, options, globals);
            } else {
              item = showdown.subParser('spanGamut')(item, options, globals);
            }
          } // now we need to remove the marker (¨A)


          item = item.replace('¨A', ''); // we can finally wrap the line in list item tags

          item = '<li' + bulletStyle + '>' + item + '</li>\n';
          return item;
        }); // attacklab: strip sentinel

        listStr = listStr.replace(/¨0/g, '');
        globals.gListLevel--;

        if (trimTrailing) {
          listStr = listStr.replace(/\s+$/, '');
        }

        return listStr;
      }

      function styleStartNumber(list, listType) {
        // check if ol and starts by a number different than 1
        if (listType === 'ol') {
          var res = list.match(/^ *(\d+)\./);

          if (res && res[1] !== '1') {
            return ' start="' + res[1] + '"';
          }
        }

        return '';
      }
      /**
       * Check and parse consecutive lists (better fix for issue #142)
       * @param {string} list
       * @param {string} listType
       * @param {boolean} trimTrailing
       * @returns {string}
       */


      function parseConsecutiveLists(list, listType, trimTrailing) {
        // check if we caught 2 or more consecutive lists by mistake
        // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
        var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
            ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
            counterRxg = listType === 'ul' ? olRgx : ulRgx,
            result = '';

        if (list.search(counterRxg) !== -1) {
          (function parseCL(txt) {
            var pos = txt.search(counterRxg),
                style = styleStartNumber(list, listType);

            if (pos !== -1) {
              // slice
              result += '\n\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n'; // invert counterType and listType

              listType = listType === 'ul' ? 'ol' : 'ul';
              counterRxg = listType === 'ul' ? olRgx : ulRgx; //recurse

              parseCL(txt.slice(pos));
            } else {
              result += '\n\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
            }
          })(list);
        } else {
          var style = styleStartNumber(list, listType);
          result = '\n\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
        }

        return result;
      }
      /** Start of list parsing **/


      text = globals.converter._dispatch('lists.before', text, options, globals); // add sentinel to hack around khtml/safari bug:
      // http://bugs.webkit.org/show_bug.cgi?id=11231

      text += '¨0';

      if (globals.gListLevel) {
        text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (wholeMatch, list, m2) {
          var listType = m2.search(/[*+-]/g) > -1 ? 'ul' : 'ol';
          return parseConsecutiveLists(list, listType, true);
        });
      } else {
        text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (wholeMatch, m1, list, m3) {
          var listType = m3.search(/[*+-]/g) > -1 ? 'ul' : 'ol';
          return parseConsecutiveLists(list, listType, false);
        });
      } // strip sentinel


      text = text.replace(/¨0/, '');
      text = globals.converter._dispatch('lists.after', text, options, globals);
      return text;
    });
    /**
     * Parse metadata at the top of the document
     */

    showdown.subParser('metadata', function (text, options, globals) {

      if (!options.metadata) {
        return text;
      }

      text = globals.converter._dispatch('metadata.before', text, options, globals);

      function parseMetadataContents(content) {
        // raw is raw so it's not changed in any way
        globals.metadata.raw = content; // escape chars forbidden in html attributes
        // double quotes

        content = content // ampersand first
        .replace(/&/g, '&amp;') // double quotes
        .replace(/"/g, '&quot;');
        content = content.replace(/\n {4}/g, ' ');
        content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function (wm, key, value) {
          globals.metadata.parsed[key] = value;
          return '';
        });
      }

      text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (wholematch, format, content) {
        parseMetadataContents(content);
        return '¨M';
      });
      text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (wholematch, format, content) {
        if (format) {
          globals.metadata.format = format;
        }

        parseMetadataContents(content);
        return '¨M';
      });
      text = text.replace(/¨M/g, '');
      text = globals.converter._dispatch('metadata.after', text, options, globals);
      return text;
    });
    /**
     * Remove one level of line-leading tabs or spaces
     */

    showdown.subParser('outdent', function (text, options, globals) {

      text = globals.converter._dispatch('outdent.before', text, options, globals); // attacklab: hack around Konqueror 3.5.4 bug:
      // "----------bug".replace(/^-/g,"") == "bug"

      text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0'); // attacklab: g_tab_width
      // attacklab: clean up hack

      text = text.replace(/¨0/g, '');
      text = globals.converter._dispatch('outdent.after', text, options, globals);
      return text;
    });
    /**
     *
     */

    showdown.subParser('paragraphs', function (text, options, globals) {

      text = globals.converter._dispatch('paragraphs.before', text, options, globals); // Strip leading and trailing lines:

      text = text.replace(/^\n+/g, '');
      text = text.replace(/\n+$/g, '');
      var grafs = text.split(/\n{2,}/g),
          grafsOut = [],
          end = grafs.length; // Wrap <p> tags

      for (var i = 0; i < end; i++) {
        var str = grafs[i]; // if this is an HTML marker, copy it

        if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
          grafsOut.push(str); // test for presence of characters to prevent empty lines being parsed
          // as paragraphs (resulting in undesired extra empty paragraphs)
        } else if (str.search(/\S/) >= 0) {
          str = showdown.subParser('spanGamut')(str, options, globals);
          str = str.replace(/^([ \t]*)/g, '<p>');
          str += '</p>';
          grafsOut.push(str);
        }
      }
      /** Unhashify HTML blocks */


      end = grafsOut.length;

      for (i = 0; i < end; i++) {
        var blockText = '',
            grafsOutIt = grafsOut[i],
            codeFlag = false; // if this is a marker for an html block...
        // use RegExp.test instead of string.search because of QML bug

        while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
          var delim = RegExp.$1,
              num = RegExp.$2;

          if (delim === 'K') {
            blockText = globals.gHtmlBlocks[num];
          } else {
            // we need to check if ghBlock is a false positive
            if (codeFlag) {
              // use encoded version of all text
              blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
            } else {
              blockText = globals.ghCodeBlocks[num].codeblock;
            }
          }

          blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

          grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText); // Check if grafsOutIt is a pre->code

          if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
            codeFlag = true;
          }
        }

        grafsOut[i] = grafsOutIt;
      }

      text = grafsOut.join('\n'); // Strip leading and trailing lines:

      text = text.replace(/^\n+/g, '');
      text = text.replace(/\n+$/g, '');
      return globals.converter._dispatch('paragraphs.after', text, options, globals);
    });
    /**
     * Run extension
     */

    showdown.subParser('runExtension', function (ext, text, options, globals) {

      if (ext.filter) {
        text = ext.filter(text, globals.converter, options);
      } else if (ext.regex) {
        // TODO remove this when old extension loading mechanism is deprecated
        var re = ext.regex;

        if (!(re instanceof RegExp)) {
          re = new RegExp(re, 'g');
        }

        text = text.replace(re, ext.replace);
      }

      return text;
    });
    /**
     * These are all the transformations that occur *within* block-level
     * tags like paragraphs, headers, and list items.
     */

    showdown.subParser('spanGamut', function (text, options, globals) {

      text = globals.converter._dispatch('spanGamut.before', text, options, globals);
      text = showdown.subParser('codeSpans')(text, options, globals);
      text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
      text = showdown.subParser('encodeBackslashEscapes')(text, options, globals); // Process anchor and image tags. Images must come first,
      // because ![foo][f] looks like an anchor.

      text = showdown.subParser('images')(text, options, globals);
      text = showdown.subParser('anchors')(text, options, globals); // Make links out of things like `<http://example.com/>`
      // Must come after anchors, because you can use < and >
      // delimiters in inline links like [this](<url>).

      text = showdown.subParser('autoLinks')(text, options, globals);
      text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);
      text = showdown.subParser('emoji')(text, options, globals);
      text = showdown.subParser('underline')(text, options, globals);
      text = showdown.subParser('italicsAndBold')(text, options, globals);
      text = showdown.subParser('strikethrough')(text, options, globals);
      text = showdown.subParser('ellipsis')(text, options, globals); // we need to hash HTML tags inside spans

      text = showdown.subParser('hashHTMLSpans')(text, options, globals); // now we encode amps and angles

      text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals); // Do hard breaks

      if (options.simpleLineBreaks) {
        // GFM style hard breaks
        // only add line breaks if the text does not contain a block (special case for lists)
        if (!/\n\n¨K/.test(text)) {
          text = text.replace(/\n+/g, '<br />\n');
        }
      } else {
        // Vanilla hard breaks
        text = text.replace(/  +\n/g, '<br />\n');
      }

      text = globals.converter._dispatch('spanGamut.after', text, options, globals);
      return text;
    });
    showdown.subParser('strikethrough', function (text, options, globals) {

      function parseInside(txt) {
        if (options.simplifiedAutoLink) {
          txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
        }

        return '<del>' + txt + '</del>';
      }

      if (options.strikethrough) {
        text = globals.converter._dispatch('strikethrough.before', text, options, globals);
        text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) {
          return parseInside(txt);
        });
        text = globals.converter._dispatch('strikethrough.after', text, options, globals);
      }

      return text;
    });
    /**
     * Strips link definitions from text, stores the URLs and titles in
     * hash references.
     * Link defs are in the form: ^[id]: url "optional title"
     */

    showdown.subParser('stripLinkDefinitions', function (text, options, globals) {

      var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
          base64Regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm; // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug

      text += '¨0';

      var replaceFunc = function (wholeMatch, linkId, url, width, height, blankLines, title) {
        linkId = linkId.toLowerCase();

        if (url.match(/^data:.+?\/.+?;base64,/)) {
          // remove newlines
          globals.gUrls[linkId] = url.replace(/\s/g, '');
        } else {
          globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals); // Link IDs are case-insensitive
        }

        if (blankLines) {
          // Oops, found blank lines, so it's not a title.
          // Put back the parenthetical statement we stole.
          return blankLines + title;
        } else {
          if (title) {
            globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
          }

          if (options.parseImgDimensions && width && height) {
            globals.gDimensions[linkId] = {
              width: width,
              height: height
            };
          }
        } // Completely remove the definition from the text


        return '';
      }; // first we try to find base64 link references


      text = text.replace(base64Regex, replaceFunc);
      text = text.replace(regex, replaceFunc); // attacklab: strip sentinel

      text = text.replace(/¨0/, '');
      return text;
    });
    showdown.subParser('tables', function (text, options, globals) {

      if (!options.tables) {
        return text;
      }

      var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,
          //singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n(?: {0,3}\|.+\|\n)+(?:\n\n|¨0)/gm;
      singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;

      function parseStyles(sLine) {
        if (/^:[ \t]*--*$/.test(sLine)) {
          return ' style="text-align:left;"';
        } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
          return ' style="text-align:right;"';
        } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
          return ' style="text-align:center;"';
        } else {
          return '';
        }
      }

      function parseHeaders(header, style) {
        var id = '';
        header = header.trim(); // support both tablesHeaderId and tableHeaderId due to error in documentation so we don't break backwards compatibility

        if (options.tablesHeaderId || options.tableHeaderId) {
          id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
        }

        header = showdown.subParser('spanGamut')(header, options, globals);
        return '<th' + id + style + '>' + header + '</th>\n';
      }

      function parseCells(cell, style) {
        var subText = showdown.subParser('spanGamut')(cell, options, globals);
        return '<td' + style + '>' + subText + '</td>\n';
      }

      function buildTable(headers, cells) {
        var tb = '<table>\n<thead>\n<tr>\n',
            tblLgn = headers.length;

        for (var i = 0; i < tblLgn; ++i) {
          tb += headers[i];
        }

        tb += '</tr>\n</thead>\n<tbody>\n';

        for (i = 0; i < cells.length; ++i) {
          tb += '<tr>\n';

          for (var ii = 0; ii < tblLgn; ++ii) {
            tb += cells[i][ii];
          }

          tb += '</tr>\n';
        }

        tb += '</tbody>\n</table>\n';
        return tb;
      }

      function parseTable(rawTable) {
        var i,
            tableLines = rawTable.split('\n');

        for (i = 0; i < tableLines.length; ++i) {
          // strip wrong first and last column if wrapped tables are used
          if (/^ {0,3}\|/.test(tableLines[i])) {
            tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
          }

          if (/\|[ \t]*$/.test(tableLines[i])) {
            tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
          } // parse code spans first, but we only support one line code spans


          tableLines[i] = showdown.subParser('codeSpans')(tableLines[i], options, globals);
        }

        var rawHeaders = tableLines[0].split('|').map(function (s) {
          return s.trim();
        }),
            rawStyles = tableLines[1].split('|').map(function (s) {
          return s.trim();
        }),
            rawCells = [],
            headers = [],
            styles = [],
            cells = [];
        tableLines.shift();
        tableLines.shift();

        for (i = 0; i < tableLines.length; ++i) {
          if (tableLines[i].trim() === '') {
            continue;
          }

          rawCells.push(tableLines[i].split('|').map(function (s) {
            return s.trim();
          }));
        }

        if (rawHeaders.length < rawStyles.length) {
          return rawTable;
        }

        for (i = 0; i < rawStyles.length; ++i) {
          styles.push(parseStyles(rawStyles[i]));
        }

        for (i = 0; i < rawHeaders.length; ++i) {
          if (showdown.helper.isUndefined(styles[i])) {
            styles[i] = '';
          }

          headers.push(parseHeaders(rawHeaders[i], styles[i]));
        }

        for (i = 0; i < rawCells.length; ++i) {
          var row = [];

          for (var ii = 0; ii < headers.length; ++ii) {
            if (showdown.helper.isUndefined(rawCells[i][ii])) ;

            row.push(parseCells(rawCells[i][ii], styles[ii]));
          }

          cells.push(row);
        }

        return buildTable(headers, cells);
      }

      text = globals.converter._dispatch('tables.before', text, options, globals); // find escaped pipe characters

      text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback); // parse multi column tables

      text = text.replace(tableRgx, parseTable); // parse one column tables

      text = text.replace(singeColTblRgx, parseTable);
      text = globals.converter._dispatch('tables.after', text, options, globals);
      return text;
    });
    showdown.subParser('underline', function (text, options, globals) {

      if (!options.underline) {
        return text;
      }

      text = globals.converter._dispatch('underline.before', text, options, globals);

      if (options.literalMidWordUnderscores) {
        text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
          return '<u>' + txt + '</u>';
        });
        text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
          return '<u>' + txt + '</u>';
        });
      } else {
        text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
          return /\S$/.test(m) ? '<u>' + m + '</u>' : wm;
        });
        text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
          return /\S$/.test(m) ? '<u>' + m + '</u>' : wm;
        });
      } // escape remaining underscores to prevent them being parsed by italic and bold


      text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);
      text = globals.converter._dispatch('underline.after', text, options, globals);
      return text;
    });
    /**
     * Swap back in all the special characters we've hidden.
     */

    showdown.subParser('unescapeSpecialChars', function (text, options, globals) {

      text = globals.converter._dispatch('unescapeSpecialChars.before', text, options, globals);
      text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
        var charCodeToReplace = parseInt(m1);
        return String.fromCharCode(charCodeToReplace);
      });
      text = globals.converter._dispatch('unescapeSpecialChars.after', text, options, globals);
      return text;
    });
    showdown.subParser('makeMarkdown.blockquote', function (node, globals) {

      var txt = '';

      if (node.hasChildNodes()) {
        var children = node.childNodes,
            childrenLength = children.length;

        for (var i = 0; i < childrenLength; ++i) {
          var innerTxt = showdown.subParser('makeMarkdown.node')(children[i], globals);

          if (innerTxt === '') {
            continue;
          }

          txt += innerTxt;
        }
      } // cleanup


      txt = txt.trim();
      txt = '> ' + txt.split('\n').join('\n> ');
      return txt;
    });
    showdown.subParser('makeMarkdown.codeBlock', function (node, globals) {

      var lang = node.getAttribute('language'),
          num = node.getAttribute('precodenum');
      return '```' + lang + '\n' + globals.preList[num] + '\n```';
    });
    showdown.subParser('makeMarkdown.codeSpan', function (node) {

      return '`' + node.innerHTML + '`';
    });
    showdown.subParser('makeMarkdown.emphasis', function (node, globals) {

      var txt = '';

      if (node.hasChildNodes()) {
        txt += '*';
        var children = node.childNodes,
            childrenLength = children.length;

        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
        }

        txt += '*';
      }

      return txt;
    });
    showdown.subParser('makeMarkdown.header', function (node, globals, headerLevel) {

      var headerMark = new Array(headerLevel + 1).join('#'),
          txt = '';

      if (node.hasChildNodes()) {
        txt = headerMark + ' ';
        var children = node.childNodes,
            childrenLength = children.length;

        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
        }
      }

      return txt;
    });
    showdown.subParser('makeMarkdown.hr', function () {

      return '---';
    });
    showdown.subParser('makeMarkdown.image', function (node) {

      var txt = '';

      if (node.hasAttribute('src')) {
        txt += '![' + node.getAttribute('alt') + '](';
        txt += '<' + node.getAttribute('src') + '>';

        if (node.hasAttribute('width') && node.hasAttribute('height')) {
          txt += ' =' + node.getAttribute('width') + 'x' + node.getAttribute('height');
        }

        if (node.hasAttribute('title')) {
          txt += ' "' + node.getAttribute('title') + '"';
        }

        txt += ')';
      }

      return txt;
    });
    showdown.subParser('makeMarkdown.links', function (node, globals) {

      var txt = '';

      if (node.hasChildNodes() && node.hasAttribute('href')) {
        var children = node.childNodes,
            childrenLength = children.length;
        txt = '[';

        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
        }

        txt += '](';
        txt += '<' + node.getAttribute('href') + '>';

        if (node.hasAttribute('title')) {
          txt += ' "' + node.getAttribute('title') + '"';
        }

        txt += ')';
      }

      return txt;
    });
    showdown.subParser('makeMarkdown.list', function (node, globals, type) {

      var txt = '';

      if (!node.hasChildNodes()) {
        return '';
      }

      var listItems = node.childNodes,
          listItemsLenght = listItems.length,
          listNum = node.getAttribute('start') || 1;

      for (var i = 0; i < listItemsLenght; ++i) {
        if (typeof listItems[i].tagName === 'undefined' || listItems[i].tagName.toLowerCase() !== 'li') {
          continue;
        } // define the bullet to use in list


        var bullet = '';

        if (type === 'ol') {
          bullet = listNum.toString() + '. ';
        } else {
          bullet = '- ';
        } // parse list item


        txt += bullet + showdown.subParser('makeMarkdown.listItem')(listItems[i], globals);
        ++listNum;
      } // add comment at the end to prevent consecutive lists to be parsed as one


      txt += '\n<!-- -->\n';
      return txt.trim();
    });
    showdown.subParser('makeMarkdown.listItem', function (node, globals) {

      var listItemTxt = '';
      var children = node.childNodes,
          childrenLenght = children.length;

      for (var i = 0; i < childrenLenght; ++i) {
        listItemTxt += showdown.subParser('makeMarkdown.node')(children[i], globals);
      } // if it's only one liner, we need to add a newline at the end


      if (!/\n$/.test(listItemTxt)) {
        listItemTxt += '\n';
      } else {
        // it's multiparagraph, so we need to indent
        listItemTxt = listItemTxt.split('\n').join('\n    ').replace(/^ {4}$/gm, '').replace(/\n\n+/g, '\n\n');
      }

      return listItemTxt;
    });
    showdown.subParser('makeMarkdown.node', function (node, globals, spansOnly) {

      spansOnly = spansOnly || false;
      var txt = ''; // edge case of text without wrapper paragraph

      if (node.nodeType === 3) {
        return showdown.subParser('makeMarkdown.txt')(node, globals);
      } // HTML comment


      if (node.nodeType === 8) {
        return '<!--' + node.data + '-->\n\n';
      } // process only node elements


      if (node.nodeType !== 1) {
        return '';
      }

      var tagName = node.tagName.toLowerCase();

      switch (tagName) {
        //
        // BLOCKS
        //
        case 'h1':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.header')(node, globals, 1) + '\n\n';
          }

          break;

        case 'h2':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.header')(node, globals, 2) + '\n\n';
          }

          break;

        case 'h3':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.header')(node, globals, 3) + '\n\n';
          }

          break;

        case 'h4':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.header')(node, globals, 4) + '\n\n';
          }

          break;

        case 'h5':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.header')(node, globals, 5) + '\n\n';
          }

          break;

        case 'h6':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.header')(node, globals, 6) + '\n\n';
          }

          break;

        case 'p':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.paragraph')(node, globals) + '\n\n';
          }

          break;

        case 'blockquote':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.blockquote')(node, globals) + '\n\n';
          }

          break;

        case 'hr':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.hr')(node, globals) + '\n\n';
          }

          break;

        case 'ol':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ol') + '\n\n';
          }

          break;

        case 'ul':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ul') + '\n\n';
          }

          break;

        case 'precode':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.codeBlock')(node, globals) + '\n\n';
          }

          break;

        case 'pre':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.pre')(node, globals) + '\n\n';
          }

          break;

        case 'table':
          if (!spansOnly) {
            txt = showdown.subParser('makeMarkdown.table')(node, globals) + '\n\n';
          }

          break;
        //
        // SPANS
        //

        case 'code':
          txt = showdown.subParser('makeMarkdown.codeSpan')(node, globals);
          break;

        case 'em':
        case 'i':
          txt = showdown.subParser('makeMarkdown.emphasis')(node, globals);
          break;

        case 'strong':
        case 'b':
          txt = showdown.subParser('makeMarkdown.strong')(node, globals);
          break;

        case 'del':
          txt = showdown.subParser('makeMarkdown.strikethrough')(node, globals);
          break;

        case 'a':
          txt = showdown.subParser('makeMarkdown.links')(node, globals);
          break;

        case 'img':
          txt = showdown.subParser('makeMarkdown.image')(node, globals);
          break;

        default:
          txt = node.outerHTML + '\n\n';
      } // common normalization
      // TODO eventually


      return txt;
    });
    showdown.subParser('makeMarkdown.paragraph', function (node, globals) {

      var txt = '';

      if (node.hasChildNodes()) {
        var children = node.childNodes,
            childrenLength = children.length;

        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
        }
      } // some text normalization


      txt = txt.trim();
      return txt;
    });
    showdown.subParser('makeMarkdown.pre', function (node, globals) {

      var num = node.getAttribute('prenum');
      return '<pre>' + globals.preList[num] + '</pre>';
    });
    showdown.subParser('makeMarkdown.strikethrough', function (node, globals) {

      var txt = '';

      if (node.hasChildNodes()) {
        txt += '~~';
        var children = node.childNodes,
            childrenLength = children.length;

        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
        }

        txt += '~~';
      }

      return txt;
    });
    showdown.subParser('makeMarkdown.strong', function (node, globals) {

      var txt = '';

      if (node.hasChildNodes()) {
        txt += '**';
        var children = node.childNodes,
            childrenLength = children.length;

        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
        }

        txt += '**';
      }

      return txt;
    });
    showdown.subParser('makeMarkdown.table', function (node, globals) {

      var txt = '',
          tableArray = [[], []],
          headings = node.querySelectorAll('thead>tr>th'),
          rows = node.querySelectorAll('tbody>tr'),
          i,
          ii;

      for (i = 0; i < headings.length; ++i) {
        var headContent = showdown.subParser('makeMarkdown.tableCell')(headings[i], globals),
            allign = '---';

        if (headings[i].hasAttribute('style')) {
          var style = headings[i].getAttribute('style').toLowerCase().replace(/\s/g, '');

          switch (style) {
            case 'text-align:left;':
              allign = ':---';
              break;

            case 'text-align:right;':
              allign = '---:';
              break;

            case 'text-align:center;':
              allign = ':---:';
              break;
          }
        }

        tableArray[0][i] = headContent.trim();
        tableArray[1][i] = allign;
      }

      for (i = 0; i < rows.length; ++i) {
        var r = tableArray.push([]) - 1,
            cols = rows[i].getElementsByTagName('td');

        for (ii = 0; ii < headings.length; ++ii) {
          var cellContent = ' ';

          if (typeof cols[ii] !== 'undefined') {
            cellContent = showdown.subParser('makeMarkdown.tableCell')(cols[ii], globals);
          }

          tableArray[r].push(cellContent);
        }
      }

      var cellSpacesCount = 3;

      for (i = 0; i < tableArray.length; ++i) {
        for (ii = 0; ii < tableArray[i].length; ++ii) {
          var strLen = tableArray[i][ii].length;

          if (strLen > cellSpacesCount) {
            cellSpacesCount = strLen;
          }
        }
      }

      for (i = 0; i < tableArray.length; ++i) {
        for (ii = 0; ii < tableArray[i].length; ++ii) {
          if (i === 1) {
            if (tableArray[i][ii].slice(-1) === ':') {
              tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, '-') + ':';
            } else {
              tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, '-');
            }
          } else {
            tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
          }
        }

        txt += '| ' + tableArray[i].join(' | ') + ' |\n';
      }

      return txt.trim();
    });
    showdown.subParser('makeMarkdown.tableCell', function (node, globals) {

      var txt = '';

      if (!node.hasChildNodes()) {
        return '';
      }

      var children = node.childNodes,
          childrenLength = children.length;

      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown.subParser('makeMarkdown.node')(children[i], globals, true);
      }

      return txt.trim();
    });
    showdown.subParser('makeMarkdown.txt', function (node) {

      var txt = node.nodeValue; // multiple spaces are collapsed

      txt = txt.replace(/ +/g, ' '); // replace the custom ¨NBSP; with a space

      txt = txt.replace(/¨NBSP;/g, ' '); // ", <, > and & should replace escaped html entities

      txt = showdown.helper.unescapeHTMLEntities(txt); // escape markdown magic characters
      // emphasis, strong and strikethrough - can appear everywhere
      // we also escape pipe (|) because of tables
      // and escape ` because of code blocks and spans

      txt = txt.replace(/([*_~|`])/g, '\\$1'); // escape > because of blockquotes

      txt = txt.replace(/^(\s*)>/g, '\\$1>'); // hash character, only troublesome at the beginning of a line because of headers

      txt = txt.replace(/^#/gm, '\\#'); // horizontal rules

      txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, '$1\\$2$3'); // dot, because of ordered lists, only troublesome at the beginning of a line when preceded by an integer

      txt = txt.replace(/^( {0,3}\d+)\./gm, '$1\\.'); // +, * and -, at the beginning of a line becomes a list, so we need to escape them also (asterisk was already escaped)

      txt = txt.replace(/^( {0,3})([+-])/gm, '$1\\$2'); // images and links, ] followed by ( is problematic, so we escape it

      txt = txt.replace(/]([\s]*)\(/g, '\\]$1\\('); // reference URIs must also be escaped

      txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, '\\[$1]:');
      return txt;
    });
    var root = this; // AMD Loader

    if ( module.exports) {
      module.exports = showdown; // Regular Browser loader
    } else {
      root.showdown = showdown;
    }
  }).call(commonjsGlobal);
  });

  var hasOwn = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;
  var defineProperty = Object.defineProperty;
  var gOPD = Object.getOwnPropertyDescriptor;

  var isArray$1 = function isArray(arr) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(arr);
    }

    return toStr.call(arr) === '[object Array]';
  };

  var isPlainObject = function isPlainObject(obj) {
    if (!obj || toStr.call(obj) !== '[object Object]') {
      return false;
    }

    var hasOwnConstructor = hasOwn.call(obj, 'constructor');
    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'); // Not own constructor property must be Object

    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
      return false;
    } // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.


    var key;

    for (key in obj) {
      /**/
    }

    return typeof key === 'undefined' || hasOwn.call(obj, key);
  }; // If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target


  var setProperty = function setProperty(target, options) {
    if (defineProperty && options.name === '__proto__') {
      defineProperty(target, options.name, {
        enumerable: true,
        configurable: true,
        value: options.newValue,
        writable: true
      });
    } else {
      target[options.name] = options.newValue;
    }
  }; // Return undefined instead of __proto__ if '__proto__' is not an own property


  var getProperty = function getProperty(obj, name) {
    if (name === '__proto__') {
      if (!hasOwn.call(obj, name)) {
        return void 0;
      } else if (gOPD) {
        // In early versions of node, obj['__proto__'] is buggy when obj has
        // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
        return gOPD(obj, name).value;
      }
    }

    return obj[name];
  };

  var extend$1 = function extend() {
    var options, name, src, copy, copyIsArray, clone;
    var target = arguments[0];
    var i = 1;
    var length = arguments.length;
    var deep = false; // Handle a deep copy situation

    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {}; // skip the boolean and the target

      i = 2;
    }

    if (target == null || typeof target !== 'object' && typeof target !== 'function') {
      target = {};
    }

    for (; i < length; ++i) {
      options = arguments[i]; // Only deal with non-null/undefined values

      if (options != null) {
        // Extend the base object
        for (name in options) {
          src = getProperty(target, name);
          copy = getProperty(options, name); // Prevent never-ending loop

          if (target !== copy) {
            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray$1(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && isArray$1(src) ? src : [];
              } else {
                clone = src && isPlainObject(src) ? src : {};
              } // Never move original objects, clone them


              setProperty(target, {
                name: name,
                newValue: extend(deep, clone, copy)
              }); // Don't bring in undefined values
            } else if (typeof copy !== 'undefined') {
              setProperty(target, {
                name: name,
                newValue: copy
              });
            }
          }
        }
      }
    } // Return the modified object


    return target;
  };

  var bail_1 = bail;

  function bail(err) {
    if (err) {
      throw err;
    }
  }

  var own$7 = {}.hasOwnProperty;
  var unistUtilStringifyPosition = stringify$2;

  function stringify$2(value) {
    // Nothing.
    if (!value || typeof value !== 'object') {
      return '';
    } // Node.


    if (own$7.call(value, 'position') || own$7.call(value, 'type')) {
      return position(value.position);
    } // Position.


    if (own$7.call(value, 'start') || own$7.call(value, 'end')) {
      return position(value);
    } // Point.


    if (own$7.call(value, 'line') || own$7.call(value, 'column')) {
      return point(value);
    } // ?


    return '';
  }

  function point(point) {
    if (!point || typeof point !== 'object') {
      point = {};
    }

    return index$4(point.line) + ':' + index$4(point.column);
  }

  function position(pos) {
    if (!pos || typeof pos !== 'object') {
      pos = {};
    }

    return point(pos.start) + '-' + point(pos.end);
  }

  function index$4(value) {
    return value && typeof value === 'number' ? value : 1;
  }

  var vfileMessage = VMessage; // Inherit from `Error#`.

  function VMessagePrototype() {}

  VMessagePrototype.prototype = Error.prototype;
  VMessage.prototype = new VMessagePrototype(); // Message properties.

  var proto$3 = VMessage.prototype;
  proto$3.file = '';
  proto$3.name = '';
  proto$3.reason = '';
  proto$3.message = '';
  proto$3.stack = '';
  proto$3.fatal = null;
  proto$3.column = null;
  proto$3.line = null; // Construct a new VMessage.
  //
  // Note: We cannot invoke `Error` on the created context, as that adds readonly
  // `line` and `column` attributes on Safari 9, thus throwing and failing the
  // data.

  function VMessage(reason, position, origin) {
    var parts;
    var range;
    var location;

    if (typeof position === 'string') {
      origin = position;
      position = null;
    }

    parts = parseOrigin(origin);
    range = unistUtilStringifyPosition(position) || '1:1';
    location = {
      start: {
        line: null,
        column: null
      },
      end: {
        line: null,
        column: null
      }
    }; // Node.

    if (position && position.position) {
      position = position.position;
    }

    if (position) {
      // Position.
      if (position.start) {
        location = position;
        position = position.start;
      } else {
        // Point.
        location.start = position;
      }
    }

    if (reason.stack) {
      this.stack = reason.stack;
      reason = reason.message;
    }

    this.message = reason;
    this.name = range;
    this.reason = reason;
    this.line = position ? position.line : null;
    this.column = position ? position.column : null;
    this.location = location;
    this.source = parts[0];
    this.ruleId = parts[1];
  }

  function parseOrigin(origin) {
    var result = [null, null];
    var index;

    if (typeof origin === 'string') {
      index = origin.indexOf(':');

      if (index === -1) {
        result[1] = origin;
      } else {
        result[0] = origin.slice(0, index);
        result[1] = origin.slice(index + 1);
      }
    }

    return result;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;

    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];

      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    } // if the path is allowed to go above the root, restore leading ..s


    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }

    return parts;
  } // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.


  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

  var splitPath = function (filename) {
    return splitPathRe.exec(filename).slice(1);
  }; // path.resolve([from ...], to)
  // posix version


  function resolve() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : '/'; // Skip empty and invalid entries

      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    } // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path


    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
      return !!p;
    }), !resolvedAbsolute).join('/');
    return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
  }
  // posix version

  function normalize$2(path) {
    var isPathAbsolute = isAbsolute(path),
        trailingSlash = substr(path, -1) === '/'; // Normalize the path

    path = normalizeArray(filter(path.split('/'), function (p) {
      return !!p;
    }), !isPathAbsolute).join('/');

    if (!path && !isPathAbsolute) {
      path = '.';
    }

    if (path && trailingSlash) {
      path += '/';
    }

    return (isPathAbsolute ? '/' : '') + path;
  }

  function isAbsolute(path) {
    return path.charAt(0) === '/';
  } // posix version

  function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize$2(filter(paths, function (p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }

      return p;
    }).join('/'));
  } // path.relative(from, to)
  // posix version

  function relative(from, to) {
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);

    function trim(arr) {
      var start = 0;

      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;

      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;

    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];

    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join('/');
  }
  var sep = '/';
  var delimiter = ':';
  function dirname(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  }
  function basename(path, ext) {
    var f = splitPath(path)[2]; // TODO: make this comparison case-insensitive on windows?

    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }

    return f;
  }
  function extname(path) {
    return splitPath(path)[3];
  }
  var path = {
    extname: extname,
    basename: basename,
    dirname: dirname,
    sep: sep,
    delimiter: delimiter,
    relative: relative,
    join: join,
    isAbsolute: isAbsolute,
    normalize: normalize$2,
    resolve: resolve
  };

  function filter(xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];

    for (var i = 0; i < xs.length; i++) {
      if (f(xs[i], i, xs)) res.push(xs[i]);
    }

    return res;
  } // String.prototype.substr - negative index don't work in IE8


  var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
    return str.substr(start, len);
  } : function (str, start, len) {
    if (start < 0) start = str.length + start;
    return str.substr(start, len);
  };

  function replaceExt(npath, ext) {
    if (typeof npath !== 'string') {
      return npath;
    }

    if (npath.length === 0) {
      return npath;
    }

    var nFileName = path.basename(npath, path.extname(npath)) + ext;
    return path.join(path.dirname(npath), nFileName);
  }

  var replaceExt_1 = replaceExt;

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  var isBuffer$2 = function isBuffer(obj) {
    return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
  };

  var core = VFile;
  var own$8 = {}.hasOwnProperty;
  var proto$4 = VFile.prototype; // Order of setting (least specific to most), we need this because otherwise
  // `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
  // stem can be set.

  var order$1 = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
  proto$4.toString = toString; // Access full path (`~/index.min.js`).

  Object.defineProperty(proto$4, 'path', {
    get: getPath,
    set: setPath
  }); // Access parent path (`~`).

  Object.defineProperty(proto$4, 'dirname', {
    get: getDirname,
    set: setDirname
  }); // Access basename (`index.min.js`).

  Object.defineProperty(proto$4, 'basename', {
    get: getBasename,
    set: setBasename
  }); // Access extname (`.js`).

  Object.defineProperty(proto$4, 'extname', {
    get: getExtname,
    set: setExtname
  }); // Access stem (`index.min`).

  Object.defineProperty(proto$4, 'stem', {
    get: getStem,
    set: setStem
  }); // Construct a new file.

  function VFile(options) {
    var prop;
    var index;
    var length;

    if (!options) {
      options = {};
    } else if (typeof options === 'string' || isBuffer$2(options)) {
      options = {
        contents: options
      };
    } else if ('message' in options && 'messages' in options) {
      return options;
    }

    if (!(this instanceof VFile)) {
      return new VFile(options);
    }

    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = process.cwd(); // Set path related properties in the correct order.

    index = -1;
    length = order$1.length;

    while (++index < length) {
      prop = order$1[index];

      if (own$8.call(options, prop)) {
        this[prop] = options[prop];
      }
    } // Set non-path related properties.


    for (prop in options) {
      if (order$1.indexOf(prop) === -1) {
        this[prop] = options[prop];
      }
    }
  }

  function getPath() {
    return this.history[this.history.length - 1];
  }

  function setPath(path) {
    assertNonEmpty(path, 'path');

    if (path !== this.path) {
      this.history.push(path);
    }
  }

  function getDirname() {
    return typeof this.path === 'string' ? path.dirname(this.path) : undefined;
  }

  function setDirname(dirname) {
    assertPath(this.path, 'dirname');
    this.path = path.join(dirname || '', this.basename);
  }

  function getBasename() {
    return typeof this.path === 'string' ? path.basename(this.path) : undefined;
  }

  function setBasename(basename) {
    assertNonEmpty(basename, 'basename');
    assertPart(basename, 'basename');
    this.path = path.join(this.dirname || '', basename);
  }

  function getExtname() {
    return typeof this.path === 'string' ? path.extname(this.path) : undefined;
  }

  function setExtname(extname) {
    var ext = extname || '';
    assertPart(ext, 'extname');
    assertPath(this.path, 'extname');

    if (ext) {
      if (ext.charAt(0) !== '.') {
        throw new Error('`extname` must start with `.`');
      }

      if (ext.indexOf('.', 1) !== -1) {
        throw new Error('`extname` cannot contain multiple dots');
      }
    }

    this.path = replaceExt_1(this.path, ext);
  }

  function getStem() {
    return typeof this.path === 'string' ? path.basename(this.path, this.extname) : undefined;
  }

  function setStem(stem) {
    assertNonEmpty(stem, 'stem');
    assertPart(stem, 'stem');
    this.path = path.join(this.dirname || '', stem + (this.extname || ''));
  } // Get the value of the file.


  function toString(encoding) {
    var value = this.contents || '';
    return isBuffer$2(value) ? value.toString(encoding) : String(value);
  } // Assert that `part` is not a path (i.e., does not contain `path.sep`).


  function assertPart(part, name) {
    if (part.indexOf(path.sep) !== -1) {
      throw new Error('`' + name + '` cannot be a path: did not expect `' + path.sep + '`');
    }
  } // Assert that `part` is not empty.


  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error('`' + name + '` cannot be empty');
    }
  } // Assert `path` exists.


  function assertPath(path, name) {
    if (!path) {
      throw new Error('Setting `' + name + '` requires `path` to be set too');
    }
  }

  var vfile = core;
  var proto$5 = core.prototype;
  proto$5.message = message;
  proto$5.info = info$1;
  proto$5.fail = fail; // Create a message with `reason` at `position`.
  // When an error is passed in as `reason`, copies the stack.

  function message(reason, position, origin) {
    var filePath = this.path;
    var message = new vfileMessage(reason, position, origin);

    if (filePath) {
      message.name = filePath + ':' + message.name;
      message.file = filePath;
    }

    message.fatal = false;
    this.messages.push(message);
    return message;
  } // Fail: creates a vmessage, associates it with the file, and throws it.


  function fail() {
    var message = this.message.apply(this, arguments);
    message.fatal = true;
    throw message;
  } // Info: creates a vmessage, associates it with the file, and marks the fatality
  // as null.


  function info$1() {
    var message = this.message.apply(this, arguments);
    message.fatal = null;
    return message;
  }

  var slice = [].slice;
  var wrap_1$1 = wrap$1; // Wrap `fn`.
  // Can be sync or async; return a promise, receive a completion handler, return
  // new values and errors.

  function wrap$1(fn, callback) {
    var invoked;
    return wrapped;

    function wrapped() {
      var params = slice.call(arguments, 0);
      var callback = fn.length > params.length;
      var result;

      if (callback) {
        params.push(done);
      }

      try {
        result = fn.apply(null, params);
      } catch (error) {
        // Well, this is quite the pickle.
        // `fn` received a callback and invoked it (thus continuing the pipeline),
        // but later also threw an error.
        // We’re not about to restart the pipeline again, so the only thing left
        // to do is to throw the thing instead.
        if (callback && invoked) {
          throw error;
        }

        return done(error);
      }

      if (!callback) {
        if (result && typeof result.then === 'function') {
          result.then(then, done);
        } else if (result instanceof Error) {
          done(result);
        } else {
          then(result);
        }
      }
    } // Invoke `next`, only once.


    function done() {
      if (!invoked) {
        invoked = true;
        callback.apply(null, arguments);
      }
    } // Invoke `done` with one value.
    // Tracks if an error is passed, too.


    function then(value) {
      done(null, value);
    }
  }

  var trough_1 = trough;
  trough.wrap = wrap_1$1;
  var slice$1 = [].slice; // Create new middleware.

  function trough() {
    var fns = [];
    var middleware = {};
    middleware.run = run;
    middleware.use = use;
    return middleware; // Run `fns`.  Last argument must be a completion handler.

    function run() {
      var index = -1;
      var input = slice$1.call(arguments, 0, -1);
      var done = arguments[arguments.length - 1];

      if (typeof done !== 'function') {
        throw new Error('Expected function as last argument, not ' + done);
      }

      next.apply(null, [null].concat(input)); // Run the next `fn`, if any.

      function next(err) {
        var fn = fns[++index];
        var params = slice$1.call(arguments, 0);
        var values = params.slice(1);
        var length = input.length;
        var pos = -1;

        if (err) {
          done(err);
          return;
        } // Copy non-nully input into values.


        while (++pos < length) {
          if (values[pos] === null || values[pos] === undefined) {
            values[pos] = input[pos];
          }
        }

        input = values; // Next or done.

        if (fn) {
          wrap_1$1(fn, next).apply(null, input);
        } else {
          done.apply(null, [null].concat(input));
        }
      }
    } // Add `fn` to the list.


    function use(fn) {
      if (typeof fn !== 'function') {
        throw new Error('Expected `fn` to be a function, not ' + fn);
      }

      fns.push(fn);
      return middleware;
    }
  }

  var isPlainObj = value => {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
      return false;
    }

    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
  };

  // Expose a frozen processor.


  var unified_1 = unified().freeze();
  var slice$2 = [].slice;
  var own$9 = {}.hasOwnProperty; // Process pipeline.

  var pipeline = trough_1().use(pipelineParse).use(pipelineRun).use(pipelineStringify);

  function pipelineParse(p, ctx) {
    ctx.tree = p.parse(ctx.file);
  }

  function pipelineRun(p, ctx, next) {
    p.run(ctx.tree, ctx.file, done);

    function done(err, tree, file) {
      if (err) {
        next(err);
      } else {
        ctx.tree = tree;
        ctx.file = file;
        next();
      }
    }
  }

  function pipelineStringify(p, ctx) {
    ctx.file.contents = p.stringify(ctx.tree, ctx.file);
  } // Function to create the first processor.


  function unified() {
    var attachers = [];
    var transformers = trough_1();
    var namespace = {};
    var frozen = false;
    var freezeIndex = -1; // Data management.

    processor.data = data; // Lock.

    processor.freeze = freeze; // Plugins.

    processor.attachers = attachers;
    processor.use = use; // API.

    processor.parse = parse;
    processor.stringify = stringify;
    processor.run = run;
    processor.runSync = runSync;
    processor.process = process;
    processor.processSync = processSync; // Expose.

    return processor; // Create a new processor based on the processor in the current scope.

    function processor() {
      var destination = unified();
      var length = attachers.length;
      var index = -1;

      while (++index < length) {
        destination.use.apply(null, attachers[index]);
      }

      destination.data(extend$1(true, {}, namespace));
      return destination;
    } // Freeze: used to signal a processor that has finished configuration.
    //
    // For example, take unified itself: it’s frozen.
    // Plugins should not be added to it.
    // Rather, it should be extended, by invoking it, before modifying it.
    //
    // In essence, always invoke this when exporting a processor.


    function freeze() {
      var values;
      var plugin;
      var options;
      var transformer;

      if (frozen) {
        return processor;
      }

      while (++freezeIndex < attachers.length) {
        values = attachers[freezeIndex];
        plugin = values[0];
        options = values[1];
        transformer = null;

        if (options === false) {
          continue;
        }

        if (options === true) {
          values[1] = undefined;
        }

        transformer = plugin.apply(processor, values.slice(1));

        if (typeof transformer === 'function') {
          transformers.use(transformer);
        }
      }

      frozen = true;
      freezeIndex = Infinity;
      return processor;
    } // Data management.
    // Getter / setter for processor-specific informtion.


    function data(key, value) {
      if (typeof key === 'string') {
        // Set `key`.
        if (arguments.length === 2) {
          assertUnfrozen('data', frozen);
          namespace[key] = value;
          return processor;
        } // Get `key`.


        return own$9.call(namespace, key) && namespace[key] || null;
      } // Set space.


      if (key) {
        assertUnfrozen('data', frozen);
        namespace = key;
        return processor;
      } // Get space.


      return namespace;
    } // Plugin management.
    //
    // Pass it:
    // *   an attacher and options,
    // *   a preset,
    // *   a list of presets, attachers, and arguments (list of attachers and
    //     options).


    function use(value) {
      var settings;
      assertUnfrozen('use', frozen);

      if (value === null || value === undefined) ; else if (typeof value === 'function') {
        addPlugin.apply(null, arguments);
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addList(value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`');
      }

      if (settings) {
        namespace.settings = extend$1(namespace.settings || {}, settings);
      }

      return processor;

      function addPreset(result) {
        addList(result.plugins);

        if (result.settings) {
          settings = extend$1(settings || {}, result.settings);
        }
      }

      function add(value) {
        if (typeof value === 'function') {
          addPlugin(value);
        } else if (typeof value === 'object') {
          if ('length' in value) {
            addPlugin.apply(null, value);
          } else {
            addPreset(value);
          }
        } else {
          throw new Error('Expected usable value, not `' + value + '`');
        }
      }

      function addList(plugins) {
        var length;
        var index;

        if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
          length = plugins.length;
          index = -1;

          while (++index < length) {
            add(plugins[index]);
          }
        } else {
          throw new Error('Expected a list of plugins, not `' + plugins + '`');
        }
      }

      function addPlugin(plugin, value) {
        var entry = find(plugin);

        if (entry) {
          if (isPlainObj(entry[1]) && isPlainObj(value)) {
            value = extend$1(entry[1], value);
          }

          entry[1] = value;
        } else {
          attachers.push(slice$2.call(arguments));
        }
      }
    }

    function find(plugin) {
      var length = attachers.length;
      var index = -1;
      var entry;

      while (++index < length) {
        entry = attachers[index];

        if (entry[0] === plugin) {
          return entry;
        }
      }
    } // Parse a file (in string or vfile representation) into a unist node using
    // the `Parser` on the processor.


    function parse(doc) {
      var file = vfile(doc);
      var Parser;
      freeze();
      Parser = processor.Parser;
      assertParser('parse', Parser);

      if (newable(Parser, 'parse')) {
        return new Parser(String(file), file).parse();
      }

      return Parser(String(file), file); // eslint-disable-line new-cap
    } // Run transforms on a unist node representation of a file (in string or
    // vfile representation), async.


    function run(node, file, cb) {
      assertNode(node);
      freeze();

      if (!cb && typeof file === 'function') {
        cb = file;
        file = null;
      }

      if (!cb) {
        return new Promise(executor);
      }

      executor(null, cb);

      function executor(resolve, reject) {
        transformers.run(node, vfile(file), done);

        function done(err, tree, file) {
          tree = tree || node;

          if (err) {
            reject(err);
          } else if (resolve) {
            resolve(tree);
          } else {
            cb(null, tree, file);
          }
        }
      }
    } // Run transforms on a unist node representation of a file (in string or
    // vfile representation), sync.


    function runSync(node, file) {
      var complete = false;
      var result;
      run(node, file, done);
      assertDone('runSync', 'run', complete);
      return result;

      function done(err, tree) {
        complete = true;
        bail_1(err);
        result = tree;
      }
    } // Stringify a unist node representation of a file (in string or vfile
    // representation) into a string using the `Compiler` on the processor.


    function stringify(node, doc) {
      var file = vfile(doc);
      var Compiler;
      freeze();
      Compiler = processor.Compiler;
      assertCompiler('stringify', Compiler);
      assertNode(node);

      if (newable(Compiler, 'compile')) {
        return new Compiler(node, file).compile();
      }

      return Compiler(node, file); // eslint-disable-line new-cap
    } // Parse a file (in string or vfile representation) into a unist node using
    // the `Parser` on the processor, then run transforms on that node, and
    // compile the resulting node using the `Compiler` on the processor, and
    // store that result on the vfile.


    function process(doc, cb) {
      freeze();
      assertParser('process', processor.Parser);
      assertCompiler('process', processor.Compiler);

      if (!cb) {
        return new Promise(executor);
      }

      executor(null, cb);

      function executor(resolve, reject) {
        var file = vfile(doc);
        pipeline.run(processor, {
          file: file
        }, done);

        function done(err) {
          if (err) {
            reject(err);
          } else if (resolve) {
            resolve(file);
          } else {
            cb(null, file);
          }
        }
      }
    } // Process the given document (in string or vfile representation), sync.


    function processSync(doc) {
      var complete = false;
      var file;
      freeze();
      assertParser('processSync', processor.Parser);
      assertCompiler('processSync', processor.Compiler);
      file = vfile(doc);
      process(file, done);
      assertDone('processSync', 'process', complete);
      return file;

      function done(err) {
        complete = true;
        bail_1(err);
      }
    }
  } // Check if `value` is a constructor.


  function newable(value, name) {
    return typeof value === 'function' && value.prototype && ( // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    keys$1(value.prototype) || name in value.prototype);
  } // Check if `value` is an object with keys.


  function keys$1(value) {
    var key;

    for (key in value) {
      return true;
    }

    return false;
  } // Assert a parser is available.


  function assertParser(name, Parser) {
    if (typeof Parser !== 'function') {
      throw new Error('Cannot `' + name + '` without `Parser`');
    }
  } // Assert a compiler is available.


  function assertCompiler(name, Compiler) {
    if (typeof Compiler !== 'function') {
      throw new Error('Cannot `' + name + '` without `Compiler`');
    }
  } // Assert the processor is not frozen.


  function assertUnfrozen(name, frozen) {
    if (frozen) {
      throw new Error('Cannot invoke `' + name + '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.');
    }
  } // Assert `node` is a unist node.


  function assertNode(node) {
    if (!node || typeof node.type !== 'string') {
      throw new Error('Expected node, got `' + node + '`');
    }
  } // Assert that `complete` is `true`.


  function assertDone(name, asyncName, complete) {
    if (!complete) {
      throw new Error('`' + name + '` finished async. Use `' + asyncName + '` instead');
    }
  }

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".container{border:1px solid grey;box-sizing:border-box;display:flex;flex-grow:1;height:100%;width:100%}.editor{border:0;border-right:1px solid #d3d3d3;flex-grow:1;font-family:monospace;max-width:50%;padding:1rem;width:50%}.editor:focus{outline:none}.preview{flex-grow:1;max-width:50%;padding:1rem;width:50%}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lZGl0b3IuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQ0UscUJBQXNCLENBQ3RCLHFCQUFzQixDQUN0QixZQUFhLENBQ2IsV0FBWSxDQUNaLFdBQVksQ0FDWixVQUNGLENBRUEsUUFDRSxRQUFTLENBQ1QsOEJBQWlDLENBQ2pDLFdBQVksQ0FDWixxQkFBc0IsQ0FDdEIsYUFBYyxDQUNkLFlBQWEsQ0FDYixTQUNGLENBQ0EsY0FDRSxZQUNGLENBRUEsU0FDRSxXQUFZLENBQ1osYUFBYyxDQUNkLFlBQWEsQ0FDYixTQUNGIiwiZmlsZSI6Ik1lZGl0b3IuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XG4gIGJvcmRlcjogc29saWQgMXB4IGdyYXk7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZ3JvdzogMTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmVkaXRvciB7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggbGlnaHRncmF5O1xuICBmbGV4LWdyb3c6IDE7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIG1heC13aWR0aDogNTAlO1xuICBwYWRkaW5nOiAxcmVtO1xuICB3aWR0aDogNTAlO1xufVxuLmVkaXRvcjpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5wcmV2aWV3IHtcbiAgZmxleC1ncm93OiAxO1xuICBtYXgtd2lkdGg6IDUwJTtcbiAgcGFkZGluZzogMXJlbTtcbiAgd2lkdGg6IDUwJTtcbn1cbiJdfQ== */";
  styleInject(css);

  var showdownConverter = new showdown.Converter();

  var Meditor =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Meditor, _React$Component);

    function Meditor(props) {
      var _this;

      _classCallCheck(this, Meditor);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Meditor).call(this, props));
      var defaultValue = props.defaultValue;
      _this.defaultValue = defaultValue !== undefined ? defaultValue : "";

      var jsx = _this.convertMarkdownToJsx(_this.defaultValue);

      _this.state = {
        jsx: jsx
      };
      return _this;
    }

    _createClass(Meditor, [{
      key: "customizeMarkdown",
      value: function customizeMarkdown(source) {
        var _this$props$headersOf = this.props.headersOffset,
            headersOffset = _this$props$headersOf === void 0 ? 1 : _this$props$headersOf;
        if (headersOffset === 1) return source;
        return source.replace(/^\s*(#+)/gm, "$1".concat("#".repeat(headersOffset - 1)));
      }
    }, {
      key: "normalizeMarkdown",
      value: function normalizeMarkdown(source) {
        return source.trim();
      }
    }, {
      key: "convertMarkdownToHtml",
      value: function convertMarkdownToHtml(source) {
        var customSource = this.customizeMarkdown(source);
        return showdownConverter.makeHtml(customSource);
      }
    }, {
      key: "convertMarkdownToJsx",
      value: function convertMarkdownToJsx(source) {
        var customSource = this.customizeMarkdown(source);
        return unified_1().use(remarkParse).use(remarkReact).processSync(customSource).contents;
      }
    }, {
      key: "onChange",
      value: function onChange() {
        var onChange = this.props.onChange;
        var value = this.$editor.value;
        var html = this.convertMarkdownToHtml(value);
        var jsx = this.convertMarkdownToJsx(value);
        var source = this.normalizeMarkdown(value);
        this.setState({
          jsx: jsx
        });

        if (onChange !== undefined) {
          onChange({
            html: html,
            jsx: jsx,
            source: source,
            rawSource: value
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var defaultValue = this.defaultValue;
        var _this$props = this.props,
            _this$props$className = _this$props.className,
            className = _this$props$className === void 0 ? "" : _this$props$className,
            _this$props$disabled = _this$props.disabled,
            disabled = _this$props$disabled === void 0 ? false : _this$props$disabled,
            _this$props$editorCla = _this$props.editorClassName,
            editorClassName = _this$props$editorCla === void 0 ? "" : _this$props$editorCla,
            _this$props$editorSty = _this$props.editorStyle,
            editorStyle = _this$props$editorSty === void 0 ? {} : _this$props$editorSty,
            _this$props$noEditor = _this$props.noEditor,
            noEditor = _this$props$noEditor === void 0 ? false : _this$props$noEditor,
            _this$props$noPreview = _this$props.noPreview,
            noPreview = _this$props$noPreview === void 0 ? false : _this$props$noPreview,
            _this$props$noSpellCh = _this$props.noSpellCheck,
            noSpellCheck = _this$props$noSpellCh === void 0 ? false : _this$props$noSpellCh,
            _this$props$previewCl = _this$props.previewClassName,
            previewClassName = _this$props$previewCl === void 0 ? "" : _this$props$previewCl,
            _this$props$previewSt = _this$props.previewStyle,
            previewStyle = _this$props$previewSt === void 0 ? {} : _this$props$previewSt,
            _this$props$style = _this$props.style,
            style = _this$props$style === void 0 ? {} : _this$props$style;
        var jsx = this.state.jsx;
        return React.createElement("div", {
          className: "container ".concat(className),
          style: style
        }, !noEditor && React.createElement("textarea", {
          className: "editor ".concat(editorClassName),
          defaultValue: defaultValue,
          disabled: disabled,
          onChange: this.onChange.bind(this),
          ref: function ref(node) {
            return _this2.$editor = node;
          },
          spellCheck: !noSpellCheck,
          style: editorStyle
        }), !noPreview && React.createElement("div", {
          className: "preview ".concat(previewClassName),
          style: previewStyle
        }, jsx));
      }
    }]);

    return Meditor;
  }(React.Component);

  Meditor.propTypes = {
    className: propTypes.string,
    defaultValue: propTypes.string,
    disabled: propTypes.bool,
    editorClassName: propTypes.string,
    editorStyle: propTypes.object,
    headersOffset: propTypes.number,
    onChange: propTypes.func,
    noEditor: propTypes.bool,
    noPreview: propTypes.bool,
    previewStyle: propTypes.object,
    previewClassName: propTypes.string,
    noSpellCheck: propTypes.bool,
    style: propTypes.object
  };

  return Meditor;

}));
