"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = require("../src/models");

var PharmService =
/*#__PURE__*/
function () {
  function PharmService() {
    (0, _classCallCheck2["default"])(this, PharmService);
  }

  (0, _createClass2["default"])(PharmService, null, [{
    key: "getAllPharms",
    value: function () {
      var _getAllPharms = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.Pharmacie.findAll();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function getAllPharms() {
        return _getAllPharms.apply(this, arguments);
      }

      return getAllPharms;
    }()
  }, {
    key: "addPharm",
    value: function () {
      var _addPharm = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(newPharm) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.Pharmacie.create(newPharm);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function addPharm(_x) {
        return _addPharm.apply(this, arguments);
      }

      return addPharm;
    }()
  }, {
    key: "updatePharm",
    value: function () {
      var _updatePharm2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(id, _updatePharm) {
        var pharmToUpdate;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models.Pharmacie.findOne({
                  where: {
                    id: id
                  }
                });

              case 3:
                pharmToUpdate = _context3.sent;

                if (!pharmToUpdate) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 7;
                return _models.Pharmacie.update(_updatePharm, {
                  where: {
                    id: id
                  }
                });

              case 7:
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function updatePharm(_x2, _x3) {
        return _updatePharm2.apply(this, arguments);
      }

      return updatePharm;
    }()
  }, {
    key: "getAPharm",
    value: function () {
      var _getAPharm = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(id) {
        var thePharm;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models.Pharmacie.findOne({
                  where: {
                    id: id
                  }
                });

              case 3:
                thePharm = _context4.sent;
                return _context4.abrupt("return", thePharm);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function getAPharm(_x4) {
        return _getAPharm.apply(this, arguments);
      }

      return getAPharm;
    }()
  }, {
    key: "deletePharm",
    value: function () {
      var _deletePharm = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(id) {
        var pharmToDelete;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models.Pharmacie.findOne({
                  where: {
                    id: id
                  }
                });

              case 3:
                pharmToDelete = _context5.sent;

                if (!pharmToDelete) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 7;
                return _models.Pharmacie.destroy({
                  where: {
                    id: id
                  }
                });

              case 7:
                return _context5.abrupt("return", pharmToDelete);

              case 8:
                _context5.next = 13;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 10]]);
      }));

      function deletePharm(_x5) {
        return _deletePharm.apply(this, arguments);
      }

      return deletePharm;
    }()
  }]);
  return PharmService;
}();

exports["default"] = PharmService;
//# sourceMappingURL=PharmService.js.map