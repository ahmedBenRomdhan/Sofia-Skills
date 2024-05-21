var express = require('express');
var router = express.Router();
const {getFunctions,addFctsViaFile,addFunction,deleteFunction,updateFunction, getFunctionsIncludeDepart, importFile} = require("../controllers/function.controller");
const uploadExcelFile = require("../middlewares/upload-excel-file.middleware");
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
/* GET functions. */
router.get('/get',authMiddleware, getFunctions);
/* GET functions include department objects. */
router.get('/getIncludeDep',authMiddleware, getFunctionsIncludeDepart);
/* Add function */
router.post('/add',authMiddleware, addFunction);
/* Delete function */
router.delete('/delete/:id',authMiddleware, deleteFunction);
/* Edit function */
router.put('/update',authMiddleware, updateFunction);
/* Upload excel file to add functions */
router.post('/upload-file',authMiddleware,uploadExcelFile.single("file"),addFctsViaFile);
router.post(
    "/importFile",
    authMiddleware,
    multer({ storage: storageFiles }).single("file"),
    importFile
  );
module.exports = router;
