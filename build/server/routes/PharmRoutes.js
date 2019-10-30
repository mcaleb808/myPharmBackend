"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _PharmController = _interopRequireDefault(require("../controllers/PharmController"));

var router = (0, _express.Router)();
router.get('/', _PharmController["default"].getAllPharms);
router.post('/', _PharmController["default"].addPharm);
router.get('/:id', _PharmController["default"].getAPharm);
router.put('/:id', _PharmController["default"].updatePharm);
router["delete"]('/:id', _PharmController["default"].deletePharm);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=PharmRoutes.js.map