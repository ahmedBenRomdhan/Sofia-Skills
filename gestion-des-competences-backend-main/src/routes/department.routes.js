var express = require('express');
var router = express.Router();
const uploadExcelFile = require("../middlewares/upload-excel-file.middleware");
const {getDepartments, addDepartment, deleteDepartment, updateDepartment, addDepartmentsViaFile, getAllDepartments, importFile} = require("../controllers/department.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");
const multer = require("multer");
var storageFiles = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

/* GET activated department. */
router.get('/get',authMiddleware, getDepartments);
/* GET all department with names order asc. */
router.get('/get-all',authMiddleware, getAllDepartments);
/* Add department */
router.post('/add',authMiddleware, addDepartment);
/* Delete department */
router.delete('/delete/:id',authMiddleware, deleteDepartment);
/* Edit department */
router.put('/update',authMiddleware, updateDepartment);
/* Upload excel file to add departments */
router.post('/upload-file',authMiddleware,uploadExcelFile.single("file"),addDepartmentsViaFile);
router.post(
    "/importFile",
    authMiddleware,
    multer({ storage: storageFiles }).single("file"),
    importFile
  );
module.exports = router;
