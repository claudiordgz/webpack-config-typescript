(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fork-ts-checker-webpack-plugin"));
	else if(typeof define === 'function' && define.amd)
		define(["fork-ts-checker-webpack-plugin"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("fork-ts-checker-webpack-plugin")) : factory(root["fork-ts-checker-webpack-plugin"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE_fork_ts_checker_webpack_plugin__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ForkTsCheckerWebpackPlugin = __webpack_require__(/*! fork-ts-checker-webpack-plugin */ \"fork-ts-checker-webpack-plugin\");\nconst path = __webpack_require__(/*! path */ \"path\");\nfunction setDefaultValue(obj, value) {\n    return obj === undefined ? value : obj;\n}\nfunction safetify(cfg) {\n    const config = Object.assign({}, cfg);\n    config.target = 'node';\n    config.resolve = setDefaultValue(config.resolve, {});\n    config.resolve.extensions = setDefaultValue(config.resolve.extensions, []);\n    config.module = setDefaultValue(config.module, {});\n    config.module.rules = setDefaultValue(config.module.rules, []);\n    config.resolveLoader = setDefaultValue(config.resolveLoader, {});\n    config.resolveLoader.modules = setDefaultValue(config.resolveLoader.modules, []);\n    config.plugins = setDefaultValue(config.plugins, []);\n    if (!('mode' in config)) {\n        config.mode = 'development';\n    }\n    return config;\n}\nfunction ts(cfg) {\n    let config = safetify(cfg);\n    const mainRule = {\n        test: /\\.ts$/,\n        exclude: /(node_modules|deploy)/,\n        use: []\n    };\n    mainRule.use.push({\n        loader: 'tslint-loader',\n        options: {\n            typeCheck: true\n        }\n    });\n    mainRule.use.push({\n        loader: 'ts-loader'\n    });\n    config.module.rules.push(mainRule);\n    Array.from(['.js', '.ts', '.tsx']).forEach((i) => {\n        if (config.resolve && config.resolve.extensions) {\n            config.resolve.extensions.push(i);\n        }\n    });\n    if (config.resolveLoader && config.resolveLoader.modules) {\n        config.resolveLoader.modules.push(path.join(__dirname, 'node_modules'), path.join(process.cwd(), 'node_modules'));\n    }\n    config.externals = {\n        'fork-ts-checker-webpack-plugin': 'fork-ts-checker-webpack-plugin'\n    };\n    if (config.plugins) {\n        config.plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }));\n    }\n    return config;\n}\nexports.ts = ts;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "fork-ts-checker-webpack-plugin":
/*!*************************************************!*\
  !*** external "fork-ts-checker-webpack-plugin" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_fork_ts_checker_webpack_plugin__;\n\n//# sourceURL=webpack:///external_%22fork-ts-checker-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
});