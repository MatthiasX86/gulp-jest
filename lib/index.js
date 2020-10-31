"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@jest/core");

var _pluginError = _interopRequireDefault(require("plugin-error"));

var _through = _interopRequireDefault(require("through2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _through["default"].obj(function (file, enc, cb) {
    options = Object.assign({
      rootDir: file ? process.cwd() : undefined
    }, options);
    (0, _core.runCLI)(options, [options.rootDir]).then(function (_ref) {
      var results = _ref.results;

      if (results.numFailedTests || results.numFailedTestSuites) {
        cb(new _pluginError["default"]('gulp-jest', {
          message: 'Tests Failed'
        }));
      } else if (typeof results.success !== 'undefined' && !results.success) {
        cb(new _pluginError["default"]('gulp-jest', {
          message: 'Tests Failed due to coverage threshold breaches'
        }));
      } else {
        cb();
      }
    });
  });
};

exports["default"] = _default;