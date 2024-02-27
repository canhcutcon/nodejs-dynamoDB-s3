require("dotenv").config();
const { s3 } = require("../utils/aws-helper"); // Import S3 service đã khởi tạo từ file aws-helper.js

// Hàm randomString sẽ tạo ra một chuỗi ngẫu nhiên với độ dài numberCharacter ký tự dùng để tạo tên file
const randomString = numberCharacter => {
  return `${Math.random()
    .toString(36)
    .substring(2, numberCharacter + 2)}`;
};

// Mảng FILE_TYPE_MATCH chứa các loại file được phép upload lên AWS S3 (image, video, pdf, word, powerpoint, rar, zip)
const FILE_TYPE_MATCH = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "video/mp3",
  "video/mp4",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.rar",
  "application/zip",
];

// Hàm uploadFile sẽ thực hiện upload file lên AWS S3
const uploadFile = async file => {
  /**
   * Bước 1: Tạo tên file mới với định dạng: randomString(4)-timestamp-originalname
   * Bước 2: Kiểm tra loại file có phù hợp với FILE_TYPE_MATCH hay không
   * Bước 3: Tạo một object uploadParams chứa thông tin của file cần upload
   * Bước 4: Thực hiện upload file lên AWS S3 bằng method upload
   * Bước 5: Trả về thông tin của file đã upload
   * Bước 6: Xử lý lỗi nếu có
   */

  const filePath = `${randomString(4)}-${new Date().getTime()}-${file?.originalname}`; // Tạo tên file mới

  if (FILE_TYPE_MATCH.indexOf(file.mimetype) === -1) {
    // Kiểm tra loại file có phù hợp với FILE_TYPE_MATCH hay không, nếu file.metaType không nằm trong FILE_TYPE_MATCH thì throw error
    throw new Error(`${file?.originalname} is invalid!`);
  }

  const uploadParams = {
    // Tạo object uploadParams chứa thông tin của file cần upload
    Bucket: process.env.BUCKET_NAME, // Tên của bucket đã tạo trong AWS S3
    Body: file?.buffer, // Dữ liệu của file dưới dạng buffer
    Key: filePath, // Tên file mới
    ContentType: file?.mimetype, // Loại file
  };

  try {
    const data = await s3.upload(uploadParams).promise(); // Thực hiện upload file lên AWS S3 bằng method upload

    console.log(`File uploaded successfully. ${data.Location}`);

    const fileName = `${process.env.CLOUDFRONT_URL}${data.Key}`; // Trả về thông tin của file đã upload link file từ CloudFront URL

    return fileName;
  } catch (err) {
    console.error("Error uploading file to AWS S3:", err);
    throw new Error("Upload file to AWS S3 failed");
  }
};

module.exports = {
  uploadFile,
};
