var express = require('express');
var router = express.Router();
const {addSkillFunction, getAllSkillFunction, updateSkillFunction, deleteSkillFunction} = require("../controllers/functionSkill.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");

/* Add function */
router.post('/add',authMiddleware, addSkillFunction);
/* Update function */
router.put('/put',authMiddleware, updateSkillFunction);
/* Delete function */
router.put('/delete',authMiddleware, deleteSkillFunction);
/* Get All function */
router.get('/get',authMiddleware, getAllSkillFunction);
module.exports = router;
