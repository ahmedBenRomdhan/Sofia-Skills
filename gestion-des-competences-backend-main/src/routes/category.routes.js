var express = require('express');
var router = express.Router();
const {getCategories, addCategory, updateCategory,deleteCategory, addCategoriesViaFile, importFile, getEnabledCategories} = require("../controllers/category.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");
const uploadExcelFile = require("../middlewares/upload-excel-file.middleware");
const multer = require("multer");
var storageFiles = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

/* GET categories. */
router.get('/getCat',authMiddleware,getCategories );
/* GET enabled categories. */
router.get('/getEnabledCat',authMiddleware,getEnabledCategories );
/* Add category */
router.post('/addCat',authMiddleware, addCategory);
/* Delete category */
router.delete('/:id',authMiddleware, deleteCategory);
/* Edit category */
router.put('/updateCat',authMiddleware, updateCategory);
router.post('/upload-file',authMiddleware,uploadExcelFile.single("file"),addCategoriesViaFile);
router.post(
    "/importFile",
    authMiddleware,
    multer({ storage: storageFiles }).single("file"),
    importFile
  );
module.exports = router;
