const express = require("express");
const app = express();

const subjectRoute = require("./subject.route");

// file index.js dùng để định nghĩa các API endpoint cho hệ thống và sử dụng các route đã định nghĩa ở các file khác như subject.route.js
app.use("/subjects", subjectRoute);

module.exports = app;
