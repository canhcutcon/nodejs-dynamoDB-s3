const SubjectModel = require("../models/subject");
const { uploadFile } = require("../service/file.service");
const { validatePayload, validateUpdate } = require("../utils/validate");
const Controller = {};

// method get sẽ thực hiện lấy tất cả các subject từ table Subject
Controller.get = async (req, res) => {
  /**
   * Bước 1: Thực hiện lấy tất cả các subject từ table Subject bằng method getSubjects của SubjectModel mà ta đã tạo
   * Bước 2: Trả về thông tin của các subject đã lấy
   */
  try {
    const subjects = await SubjectModel.getSubjects();
    return res.render("index", { subjects }); // truyền thông tin của các subject đã lấy vào file index.ejs
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting subjects");
  }
};

// method getOne sẽ thực hiện lấy thông tin của subject dựa vào id
Controller.getOne = async (req, res) => {
  /**
   * Bước 1: Lấy id của subject từ param của request
   * Bước 2: Thực hiện lấy thông tin của subject dựa vào id bằng method getOneSubject của SubjectModel mà ta đã tạo
   * Bước 3: Nếu subject tồn tại thì trả về thông tin của subject
   * Bước 4: Xử lý lỗi nếu có
   */
  try {
    const { id } = req.params;
    const subject = await SubjectModel.getOneSubject(id);
    if (subject) {
      return res.render("edit", { subject });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting subject");
  }
};

// method post sẽ thực hiện tạo mới một subject
Controller.post = async (req, res) => {
  /**
   * Bước 1: Validate dữ liệu trước khi tạo mới subject
   * Bước 2: Nếu dữ liệu không hợp lệ thì trả về lỗi
   * Bước 3: Nếu dữ liệu hợp lệ thì thực hiện tạo mới subject bằng method createSubject của SubjectModel mà ta đã tạo
   * Bước 4: Trả về thông báo tạo mới subject thành công
   * Bước 5: Xử lý lỗi nếu có
   */
  const errors = validatePayload(req.body);
  if (errors) {
    res.send(errors.join(", "));
  }
  const { name, type, semester, faculty } = req.body; // lấy thông tin của subject từ request.body
  const image = req.file; // lấy file ảnh từ request.file
  try {
    const imageUrl = await uploadFile(image); // thực hiện upload file ảnh lên S3 và lấy url của file ảnh
    const subject = await SubjectModel.createSubject({
      name,
      type,
      semester,
      faculty,
      image: imageUrl,
    });

    console.log("Subject created", subject);
    res.redirect("/subjects"); // sau khi tạo mới subject thành công thì chuyển hướng về trang danh sách các subject
  } catch (error) {
    res.status(500).send("Error creating subject");
  }
};

Controller.put = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validateUpdate(req.body);
    const image = req.file;
    if (errors) {
      res.send(errors.join(", "));
    }
    const { name, type, semester, faculty } = req.body;
    const imageUrl = await uploadFile(image);
    const subject = await SubjectModel.updateSubject(id, { name, type, semester, faculty, image: imageUrl });
    if (subject) {
      console.log("Subject updated", subject);
      res.redirect("/subjects");
    }
  } catch (error) {}
};

Controller.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const existSubject = await SubjectModel.getOneSubject(id);
    const subject = await SubjectModel.deleteSubject(id, existSubject.name);
    if (subject) {
      console.log("Subject deleted", subject);
      res.redirect("/subjects");
    }
  } catch (error) {}
};
module.exports = Controller;
