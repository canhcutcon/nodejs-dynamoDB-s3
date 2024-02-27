const nameRegex = /^[a-zA-Z0-9\s]+$/;
const typeRegex = /^[a-zA-Z0-9\s]+$/;
const semesterRegex = /^[0-9]+$/;
const facultyRegex = /^[a-zA-Z\s]+$/;
const checkEmpty = payload => {
  // Kiểm tra xem payload có thuốc tính nào bị rỗng không
  const { name, type, semester, faculty } = payload;
  if (!name || !type || !semester || !faculty) {
    return true;
  }
  return false;
};

module.exports = {
  validatePayload: payload => {
    const { name, type, semester, faculty } = payload;
    const errors = [];

    if (checkEmpty(payload)) {
      errors.push("All fields are required");
    }

    if (!nameRegex.test(name)) {
      errors.push("Name must be a string");
    }

    if (!typeRegex.test(type)) {
      errors.push("Type must be a string");
    }

    if (!facultyRegex.test(faculty)) {
      errors.push("Faculty must be a string");
    }

    if (errors?.length > 0) {
      return errors;
    }

    return null;
  },

  validateUpdate: payload => {
    const { name, type, semester, faculty } = payload;

    const errors = [];
    if (name && !nameRegex.test(name)) {
      errors.push("Name must be a string");
    }

    if (type && !typeRegex.test(type)) {
      errors.push("Type must be a string");
    }

    if (faculty && !facultyRegex.test(faculty)) {
      errors.push("Faculty must be a string");
    }

    if (semester && !semesterRegex.test(semester)) {
      errors.push("Semester must be a number");
    }

    return null;
  },
};
