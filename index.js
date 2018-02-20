(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(1);
const nodeExternals = __webpack_require__(2);
const ForkTsCheckerWebpackPlugin = __webpack_require__(3);
function setDefaultValue(obj, value) {
    return obj === undefined ? value : obj;
}
function safetify(cfg) {
    const config = Object.assign({}, cfg);
    config.target = 'node';
    config.externals = [nodeExternals()];
    config.resolve = setDefaultValue(config.resolve, {});
    config.resolve.extensions = setDefaultValue(config.resolve.extensions, []);
    config.module = setDefaultValue(config.module, {});
    config.module.rules = setDefaultValue(config.module.rules, []);
    config.resolveLoader = setDefaultValue(config.resolveLoader, {});
    config.resolveLoader.modules = setDefaultValue(config.resolveLoader.modules, []);
    config.plugins = setDefaultValue(config.plugins, []);
    return config;
}
function ts(cfg) {
    let config = safetify(cfg);
    const mainRule = Object.assign({
        test: /\.ts$/,
        exclude: /(node_modules|deploy)/,
        use: []
    });
    const tsLintRule = Object.assign({
        enforce: 'pre'
    }, mainRule);
    tsLintRule.use.push({
        loader: 'tslint-loader',
        options: {
            typeCheck: true
        }
    });
    mainRule.use.push({ loader: 'cache-loader' });
    mainRule.use.push({
        loader: 'thread-loader',
        options: {
            workers: __webpack_require__(4).cpus().length - 1
        }
    });
    mainRule.use.push({
        loader: 'ts-loader',
        options: {
            happyPackMode: true
        }
    });
    config.module.rules.push(tsLintRule, mainRule);
    Array.from(['.ts', '.tsx', '.js']).forEach((i) => {
        if (config.resolve && config.resolve.extensions) {
            config.resolve.extensions.push(i);
        }
    });
    if (config.resolveLoader && config.resolveLoader.modules) {
        config.resolveLoader.modules.push(path.join(__dirname, 'node_modules'), path.join(process.cwd(), 'node_modules'));
    }
    config.plugins.push(new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }));
    return config;
}
exports.ts = ts;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fork-ts-checker-webpack-plugin");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ })
/******/ ]);
});