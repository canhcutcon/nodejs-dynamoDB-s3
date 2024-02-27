const express = require("express"); // Import thư viện express
const router = express.Router(); // Khởi tạo một router từ express
const upload = require("../middleware/upload");
const subjectController = require("../controller"); // Import controller từ file controller/index.js
// file routes/subject.route.js dùng để định nghĩa các API endpoint cho subject
router.get("/", subjectController.get); // API endpoint lấy tất cả các subject
router.get("/:id", subjectController.getOne); // API endpoint lấy thông tin của subject dựa vào id
router.post("/", upload, subjectController.post); // API endpoint tạo mới một subject bằng method post
router.post("/update/:id", upload, subjectController.put);
router.post("/delete/:id", subjectController.delete);

module.exports = router;
