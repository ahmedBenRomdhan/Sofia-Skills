const multer = require("multer");
const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheet")
    ) {
        cb(null, true);
    } else {
        cb("Please upload only excel file.", false);
    }
};
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-imported-${file.originalname}`);
    },
});
var uploadExcelFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadExcelFile;
