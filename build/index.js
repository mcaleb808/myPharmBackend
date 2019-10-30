"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _PharmRoutes = _interopRequireDefault(require("./server/routes/PharmRoutes"));

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
var port = process.env.PORT || 8000;
app.use('/api/v1/Pharmacies', _PharmRoutes["default"]);
app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to EasyPharm API'
  });
});
app.listen(port, function () {
  console.log("Server  double check is running on PORT ".concat(port));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map