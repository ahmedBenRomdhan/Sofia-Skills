const multer = require("multer");
const wordFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("application/msword") ||
        file.mimetype.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
        cb(null, true);
    } else {
        cb("Please upload only word file.", false);
    }
};
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/resumes/french");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-frResume-${file.originalname}`);
    },
});
var uploadFrResumeFile = multer({
    storage: storage,
    fileFilter: wordFilter });

module.exports = uploadFrResumeFile;
