"use strict";

require("@babel/polyfill");

var _colors = _interopRequireDefault(require("colors"));

var _fetch = _interopRequireDefault(require("./fetch"));

var _nodes = require("./nodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.sourceNodes =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var boundActionCreators, apiKey, secretKey, username, password, domains, createNode, client, reviewsSummary, recentReviews, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            boundActionCreators = _ref.boundActionCreators;
            apiKey = _ref2.apiKey, secretKey = _ref2.secretKey, username = _ref2.username, password = _ref2.password, domains = _ref2.domains;
            createNode = boundActionCreators.createNode;
            client = new _fetch.default({
              apiKey: apiKey,
              secretKey: secretKey,
              username: username,
              password: password,
              domains: domains
            });
            logInfo('Connecting to the Trustpilot API...'); // Get Business Unit IDs for given domains

            _context.next = 7;
            return client.fetchUnitIdsForDomains();

          case 7:
            if (client.unitIds.length > 0) {
              logSuccess("Fetched Business Unit IDs for ", "".concat(client.unitIds.length).magenta, " domains");
            } else {
              logWarning('No Business Unit IDs found. Have you passed correct domains in config file?');
            }

            _context.next = 10;
            return client.getSummary();

          case 10:
            reviewsSummary = _context.sent;
            logSuccess("Fetched ", "".concat(reviewsSummary.length).magenta, " summary items");
            _context.next = 14;
            return client.getRecentReviews({
              perPage: 100
            });

          case 14:
            recentReviews = _context.sent;
            // Create node for summaries
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 18;

            _loop = function _loop() {
              var summary = _step.value;
              var currentUnit = client.unitIds.filter(function (_ref4) {
                var unitId = _ref4.unitId;
                return unitId === summary.unitId;
              });
              var summaryNode = (0, _nodes.SummaryNode)(summary);
              summary.domain = currentUnit[0].domain;
              createNode(summaryNode);
            };

            for (_iterator = reviewsSummary[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }

            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](18);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 38;

            _loop2 = function _loop2() {
              var unitData = _step2.value;
              var reviewsCount = 0; // Get current unit so we can attach the domain to the review

              var currentUnit = client.unitIds.filter(function (_ref5) {
                var unitId = _ref5.unitId;
                return unitId === unitData.unitId;
              }); // Create nodes for individual reviews

              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = unitData.reviews[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var review = _step3.value;
                  reviewsCount++;
                  review.unitId = unitData.unitId;
                  review.domain = currentUnit[0].domain;
                  var reviewNodeObject = (0, _nodes.ReviewNode)(review);
                  createNode(reviewNodeObject);
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              logSuccess('Fetched ', "".concat(reviewsCount).magenta, ' reviews for ', "".concat(currentUnit[0].domain).magenta, ' Business Unit ID');
            };

            for (_iterator2 = recentReviews[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _loop2();
            }

            _context.next = 47;
            break;

          case 43:
            _context.prev = 43;
            _context.t1 = _context["catch"](38);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 47:
            _context.prev = 47;
            _context.prev = 48;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 50:
            _context.prev = 50;

            if (!_didIteratorError2) {
              _context.next = 53;
              break;
            }

            throw _iteratorError2;

          case 53:
            return _context.finish(50);

          case 54:
            return _context.finish(47);

          case 55:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[18, 23, 27, 35], [28,, 30, 34], [38, 43, 47, 55], [48,, 50, 54]]);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var logWarning = function logWarning() {
  var _console;

  for (var _len = arguments.length, text = new Array(_len), _key = 0; _key < _len; _key++) {
    text[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, ['\ngatsby-source-trustpilot '.cyan, 'warning '.yellow].concat(text));
};

var logError = function logError() {
  var _console2;

  for (var _len2 = arguments.length, text = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    text[_key2] = arguments[_key2];
  }

  (_console2 = console).log.apply(_console2, ['\ngatsby-source-trustpilot '.cyan, 'success '.red].concat(text));
};

var logSuccess = function logSuccess() {
  var _console3;

  for (var _len3 = arguments.length, text = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    text[_key3] = arguments[_key3];
  }

  (_console3 = console).log.apply(_console3, ['\ngatsby-source-trustpilot '.cyan, 'success '.green].concat(text));
};

var logInfo = function logInfo() {
  var _console4;

  for (var _len4 = arguments.length, text = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    text[_key4] = arguments[_key4];
  }

  (_console4 = console).log.apply(_console4, ['\ngatsby-source-trustpilot '.cyan, 'info '.blue].concat(text));
};