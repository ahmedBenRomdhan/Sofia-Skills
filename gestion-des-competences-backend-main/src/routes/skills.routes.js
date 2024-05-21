var express = require('express');
var router = express.Router();
const {getSkills,getAllSkills, addSkill, deleteSkill, updateSkill, getSkillsByIds, getSkillsNames, addSkillsViaFile, getSkillsByIdsCategoriesAndSkills, getSkillsByIdsCategories, importFile} = require("../controllers/skill.controller");
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


/* GET skills by ids by skills. */
router.get('/get-by-ids/:skillsId',authMiddleware, getSkillsByIds);
/* GET skills by ids by category. */
router.get('/category/:categoriesId',authMiddleware, getSkillsByIdsCategories);
/* GET skills by ids by both skills and categories. */
router.get('/both/',authMiddleware, getSkillsByIdsCategoriesAndSkills);
/* GET skills names. */
router.get('/get-names',authMiddleware, getSkillsNames);
/* GET skills. */
router.get('/get',authMiddleware, getSkills);
/* GET all skills. */
router.get('/gets',authMiddleware, getAllSkills);
/* Add skill */
router.post('/adds',authMiddleware, addSkill);
/* Delete skill */
router.delete('/:id',authMiddleware, deleteSkill);
/* Edit skill */
router.put('/updates',authMiddleware, updateSkill);
router.post('/upload-file',authMiddleware,uploadExcelFile.single("file"),addSkillsViaFile);
router.post(
    "/importFile",
    authMiddleware,
    multer({ storage: storageFiles }).single("file"),
    importFile
  );
module.exports = router;
