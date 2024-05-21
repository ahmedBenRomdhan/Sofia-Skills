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
        cb(null, "./public/uploads/resumes/english");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-engResume-${file.originalname}`);
    },
});
var uploadEngResumeFile = multer({
    storage: storage,
    fileFilter: wordFilter });

module.exports = uploadEngResumeFile;
