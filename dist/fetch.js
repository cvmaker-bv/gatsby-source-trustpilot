"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _trustpilot = require("trustpilot");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrustPilotFetcher =
/*#__PURE__*/
function () {
  function TrustPilotFetcher(_ref) {
    var apiKey = _ref.apiKey,
        secretKey = _ref.secretKey,
        username = _ref.username,
        password = _ref.password,
        domains = _ref.domains;

    _classCallCheck(this, TrustPilotFetcher);

    if (!apiKey || apiKey === '') {
      throw new Error('Trustpilot API Key missing. Make sure to provide an API key in the config');
    }

    if (!secretKey || secretKey === '') {
      throw new Error('Trustpilot Secret Key missing. Make sure to provide a Secret Key in the config');
    }

    if (!username || username === '') {
      throw new Error('Trustpilot Username missing. Make sure to provide a username in the config');
    }

    if (!password || password === '') {
      throw new Error('Trustpilot Password missing. Make sure to provide a password in the config');
    }

    if (!domains || !Array.isArray(domains) || domains.length === 0) {
      throw new Error('You need to provide at least one domain in your gatsby config. Please refer to gatsby-source-trustpilot documentation');
    }

    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.username = username;
    this.password = password;
    this.domains = domains;
    this.unitIds = [];
    this.client = new _trustpilot.TrustpilotApi({
      key: apiKey,
      secret: secretKey
    });
  }

  _createClass(TrustPilotFetcher, [{
    key: "fetchUnitIdsForDomains",
    value: function () {
      var _fetchUnitIdsForDomains = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var unitPromises;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.domains.map(
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(domain) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this.client.apiRequest("https://api.trustpilot.com/v1/business-units/find?apikey=".concat(_this.apiKey, "&name=").concat(domain));

                          case 2:
                            res = _context.sent;

                            if (!(!res || !res.id)) {
                              _context.next = 5;
                              break;
                            }

                            throw new Error("Business Unit ID not found for domain: ".concat(domain));

                          case 5:
                            _this.unitIds.push({
                              domain: domain,
                              unitId: res.id
                            });

                            return _context.abrupt("return", res);

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 2:
                unitPromises = _context2.sent;
                _context2.next = 5;
                return Promise.all(unitPromises);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchUnitIdsForDomains() {
        return _fetchUnitIdsForDomains.apply(this, arguments);
      }

      return fetchUnitIdsForDomains;
    }()
  }, {
    key: "getSummary",
    value: function () {
      var _getSummary = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, unit, result;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                results = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 4;
                _iterator = this.unitIds[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 16;
                  break;
                }

                unit = _step.value;
                _context3.next = 10;
                return this.client.apiRequest("https://api.trustpilot.com/v1/business-units/".concat(unit.unitId));

              case 10:
                result = _context3.sent;
                result.unitId = unit.unitId;
                results.push(result);

              case 13:
                _iteratorNormalCompletion = true;
                _context3.next = 6;
                break;

              case 16:
                _context3.next = 22;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 22:
                _context3.prev = 22;
                _context3.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 25:
                _context3.prev = 25;

                if (!_didIteratorError) {
                  _context3.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context3.finish(25);

              case 29:
                return _context3.finish(22);

              case 30:
                return _context3.abrupt("return", results);

              case 31:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 18, 22, 30], [23,, 25, 29]]);
      }));

      function getSummary() {
        return _getSummary.apply(this, arguments);
      }

      return getSummary;
    }()
  }, {
    key: "createQueryString",
    value: function createQueryString(params) {
      return Object.keys(params).map(function (k) {
        return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(params[k]));
      }).join('&');
    }
  }, {
    key: "getRecentReviews",
    value: function () {
      var _getRecentReviews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(params) {
        var results, queryString, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, unit, result;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                results = [];
                queryString = this.createQueryString(params); // console.log('Query string:', { queryString, params });

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 5;
                _iterator2 = this.unitIds[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context4.next = 17;
                  break;
                }

                unit = _step2.value;
                _context4.next = 11;
                return this.getReviews("https://api.trustpilot.com/v1/business-units/".concat(unit.unitId, "/reviews?").concat(queryString));

              case 11:
                result = _context4.sent;
                result.unitId = unit.unitId;
                results.push(result);

              case 14:
                _iteratorNormalCompletion2 = true;
                _context4.next = 7;
                break;

              case 17:
                _context4.next = 23;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](5);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t0;

              case 23:
                _context4.prev = 23;
                _context4.prev = 24;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 26:
                _context4.prev = 26;

                if (!_didIteratorError2) {
                  _context4.next = 29;
                  break;
                }

                throw _iteratorError2;

              case 29:
                return _context4.finish(26);

              case 30:
                return _context4.finish(23);

              case 31:
                return _context4.abrupt("return", results);

              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 19, 23, 31], [24,, 26, 30]]);
      }));

      function getRecentReviews(_x2) {
        return _getRecentReviews.apply(this, arguments);
      }

      return getRecentReviews;
    }()
  }, {
    key: "getReviews",
    value: function () {
      var _getReviews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(uri) {
        var fragment, nextPage;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.client.apiRequest(uri);

              case 2:
                fragment = _context5.sent;
                nextPage = fragment.links.find(function (link) {
                  return link.rel === 'next-page';
                });

                if (!nextPage) {
                  _context5.next = 10;
                  break;
                }

                _context5.t0 = fragment.reviews;
                _context5.next = 8;
                return this.getReviews(nextPage.href.replace(this.client.baseUrl, ''));

              case 8:
                _context5.t1 = _context5.sent.reviews;
                fragment.reviews = _context5.t0.concat.call(_context5.t0, _context5.t1);

              case 10:
                return _context5.abrupt("return", fragment);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getReviews(_x3) {
        return _getReviews.apply(this, arguments);
      }

      return getReviews;
    }()
  }]);

  return TrustPilotFetcher;
}();

var _default = TrustPilotFetcher;
exports.default = _default;