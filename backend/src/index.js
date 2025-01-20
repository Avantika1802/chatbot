"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./app.js");
var connection_js_1 = require("./db/connection.js");
//conntections and listeners
var PORT = process.env.PORT || 5000;
(0, connection_js_1.connectToDatabase)()
    .then(function () {
    app_js_1.default.listen(PORT, function () { return console.log("Server Open & Connected To Database"); });
})
    .catch(function (err) { return console.log(err); });
