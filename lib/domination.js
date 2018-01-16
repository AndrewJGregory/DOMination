/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor(HTMLels) {
    this.HTMLels = HTMLels;
  }

  html(text) {
    if (text === "" || text === undefined) {
      return this.HTMLels[0].innerHTML;
    } else {
      this._iteratesOverAllEls(el => {
        el.innerHTML = text;
      });
      return this;
    }
  }

  empty() {
    return this.html("");
  }

  append(arg) {
    this._iteratesOverAllEls(el => {
      if (arg instanceof HTMLElement) {
        el.innerHTML += arg.outerHTML;
      } else if (typeof arg === 'string') {
        el.innerHTML += el;
      } else if (arg instanceof DOMNodeCollection) {
        arg._iteratesOverAllEls(argEl => {
          el.innerHTML += argEl.outerHTML;
        });
      }
    });
    return this;
  }

  attr(attr, val) {
    if (val) {
      this._iteratesOverAllEls(el => {
        el.setAttribute(attr, val);
      });
      return this;
    } else {
      return this.HTMLels[0].getAttribute(attr);
    }
  }

  addClass(name) {
    this._iteratesOverAllEls(el => {
      el.classList.add(name);
    });
    return this;
  }

  removeClass(name) {
    this._iteratesOverAllEls(el => {
      el.classList.remove(name);
    });
    return this;
  }

  children() {
    const allHTMLels = [];
    let children;
    this._iteratesOverAllEls(el => {
      children = Array.from(el.children);
      children.forEach(child => {
        allHTMLels.push(child);
      });
    });
    return new DOMNodeCollection(allHTMLels);
  }

  _iteratesOverAllEls(callback) {
    this.HTMLels.forEach(el => callback(el));
  }

  parent() {
    const allHTMLels = [];
    let parent;
    this._iteratesOverAllEls(el => {
      parent = el.parentNode;
      if (!allHTMLels.includes(parent)) {
        allHTMLels.push(parent);
      }
    });
    return new DOMNodeCollection(allHTMLels);
  }

  find(selector) {
    let allHTMLels = [];
    let nodeList;
    this._iteratesOverAllEls(el => {
      nodeList = el.querySelectorAll(selector);
      nodeList.forEach(node => {
        if (!allHTMLels.includes(node)) {
          allHTMLels.push(node);
        }
      });
    });
    return new DOMNodeCollection(allHTMLels);
  }

  remove() {
    this._iteratesOverAllEls(el => {
      el.remove();
    });
    return this;
  }

  on(eventType, callback) {
    this._iteratesOverAllEls(el => {
      el.addEventListener(eventType, callback);
      el.callback = callback;
    });
    return this;
  }

  off(eventType) {
    this._iteratesOverAllEls(el => {
      el.removeEventListener(eventType, el.callback);
    });
    return this;
  }

  val() {
    return this.HTMLels[0].value;
  }
}

/* harmony default export */ exports["a"] = DOMNodeCollection;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(0);


const $d = el => {
  if (el instanceof HTMLElement) {
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */]([el]);
  } else if (typeof el === 'string') {
    const arrayOfEls = Array.from(document.querySelectorAll(el));
    if (arrayOfEls.length === 0) {
      const HTMLEl = document.createElement(el);
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */]([HTMLEl]);
    } else {
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */](arrayOfEls);
    }
  }
};

let defaults = {
  method: 'GET',
  url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success(data) {
    console.log(data);
  },
  error() {
    console.error("Error");
  },
  data: {},
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
};

$d.extend = (...objs) => {
  let result = {};
  objs.forEach(obj => {
    for(let key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

$d.ajax = options => {
  options = $d.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(`${options.method}`, `${options.url}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      return options.success(JSON.parse(xhr.response));
    } else {
      return options.error(JSON.parse(xhr.response));
    }
  };
  xhr.send();
};

$d.create = str => {
  return document.createElement(str);
};

window.$d = $d;


/***/ }
/******/ ]);