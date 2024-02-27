require("dotenv").config(); // load các biến môi trường từ file .env
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // lấy giá trị PORT từ file .env, nếu không có thì lấy mặc định là 3000

app.use(express.json({ extended: false })); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
// Render giao diện
app.use(express.static("./views")); // render giao diện từ thư mục views
app.set("view engine", "ejs"); // sử dụng ejs làm view engine cho express
app.set("views", "./views"); // thư mục chứa các file ejs

// Router cho ứng dụng
app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
