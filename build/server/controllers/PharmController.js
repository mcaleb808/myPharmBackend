"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _PharmService = _interopRequireDefault(require("../services/PharmService"));

var _utils = _interopRequireDefault(require("../utils/utils"));

var util = new _utils["default"]();

var PharmController =
/*#__PURE__*/
function () {
  function PharmController() {
    (0, _classCallCheck2["default"])(this, PharmController);
  }

  (0, _createClass2["default"])(PharmController, null, [{
    key: "getAllPharms",
    value: function () {
      var _getAllPharms = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var allPharms;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _PharmService["default"].getAllPharms();

              case 3:
                allPharms = _context.sent;

                if (allPharms.length > 0) {
                  util.setSuccess(200, 'Pharmacies retrieved', allPharms);
                } else {
                  util.setSuccess(200, 'No pharmacy found');
                }

                return _context.abrupt("return", util.send(res));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getAllPharms(_x, _x2) {
        return _getAllPharms.apply(this, arguments);
      }

      return getAllPharms;
    }()
  }, {
    key: "addPharm",
    value: function () {
      var _addPharm = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var newPharm, insurances, createPharm;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!req.body.name || !req.body.logo)) {
                  _context2.next = 3;
                  break;
                }

                util.setError(400, 'Please provide complete details');
                return _context2.abrupt("return", util.send(res));

              case 3:
                newPharm = req.body;
                insurances = (0, _toConsumableArray2["default"])(new Set(newPharm.insurance));
                _context2.prev = 5;
                _context2.next = 8;
                return _PharmService["default"].addPharm({
                  name: newPharm.name,
                  logo: newPharm.logo,
                  insurance: insurances
                });

              case 8:
                createPharm = _context2.sent;
                util.setSuccess(201, 'Pharm Added', createPharm);
                return _context2.abrupt("return", util.send(res));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](5);
                util.setError(400, _context2.t0.message);
                return _context2.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 13]]);
      }));

      function addPharm(_x3, _x4) {
        return _addPharm.apply(this, arguments);
      }

      return addPharm;
    }()
  }, {
    key: "updatePharm",
    value: function () {
      var _updatePharm = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var updatedPharm, id, _updatePharm2;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                updatedPharm = req.body;
                id = req.params.id;
                _context3.prev = 2;
                _context3.next = 5;
                return _PharmService["default"].updatePharm(id, updatedPharm);

              case 5:
                _updatePharm2 = _context3.sent;

                if (!updatedPharm) {
                  util.setError(404, "Cannot find a Pharmacy with the id ".concat(id));
                } else {
                  util.setSuccess(200, 'Pharmacy updated', _updatePharm2);
                }

                return _context3.abrupt("return", util.send(res));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                util.setError(404, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 10]]);
      }));

      function updatePharm(_x5, _x6) {
        return _updatePharm.apply(this, arguments);
      }

      return updatePharm;
    }()
  }, {
    key: "getAPharm",
    value: function () {
      var _getAPharm = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var id, thePharm;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.prev = 1;
                _context4.next = 4;
                return _PharmService["default"].getAPharm(id);

              case 4:
                thePharm = _context4.sent;

                if (!thePharm) {
                  util.setError(404, "Cannot find Pharmacy with the id ".concat(id));
                } else {
                  util.setSuccess(200, 'Found Pharmacy', thePharm);
                }

                return _context4.abrupt("return", util.send(res));

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                util.setError(404, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
      }));

      function getAPharm(_x7, _x8) {
        return _getAPharm.apply(this, arguments);
      }

      return getAPharm;
    }()
  }, {
    key: "deletePharm",
    value: function () {
      var _deletePharm = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var id, pharmToDelete;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                _context5.prev = 1;
                _context5.next = 4;
                return _PharmService["default"].deletePharm(id);

              case 4:
                pharmToDelete = _context5.sent;

                if (pharmToDelete) {
                  util.setSuccess(200, 'Pharmacy deleted');
                } else {
                  util.setError(404, "Pharmacy with the id ".concat(id, " cannot be found"));
                }

                return _context5.abrupt("return", util.send(res));

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                util.setError(400, _context5.t0);
                return _context5.abrupt("return", util.send(res));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 9]]);
      }));

      function deletePharm(_x9, _x10) {
        return _deletePharm.apply(this, arguments);
      }

      return deletePharm;
    }()
  }]);
  return PharmController;
}();

var _default = PharmController;
exports["default"] = _default;
//# sourceMappingURL=PharmController.js.map