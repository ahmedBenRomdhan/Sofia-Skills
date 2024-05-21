const {createSkillEvaluation, updateSkillEvaluation, validateEvaluation, getUserSkillEvaluations,
    getEvaluationsforSkills, applyFilter, updateSkillEval
} = require("../controllers/skillEvaluation.controller");
const express = require("express");
const {authMiddleware} = require("../middlewares/auth.middleware");
const {getMeanEvaluationLevel, getReportWithTime, getReportRadar} = require("../services/skillEvaluation.service");
var router = express.Router();
/* Get user skill evaluations. */
router.get('/get-by-user-id/:userId',authMiddleware,getUserSkillEvaluations)
/* Add new evaluation. */
router.post('/',authMiddleware, createSkillEvaluation);
/* update an evaluation. */
router.put('/',authMiddleware, updateSkillEvaluation);
/* update affected */
router.put('/affected',authMiddleware, updateSkillEval);
/* validate skill evaluation */
router.patch('/validate-eval',authMiddleware,validateEvaluation);
/* skill dashboard */
router.get('/get-by-skills',authMiddleware,getEvaluationsforSkills);
router.get('/filter',authMiddleware,applyFilter);

/* skill report*/
router.get('/report',authMiddleware,getMeanEvaluationLevel);

/* Skill report (time) */
router.get('/reportTime', authMiddleware, getReportWithTime);

/* Skill report (radar) */
router.get('/reportRadar', authMiddleware, getReportRadar)

module.exports = router;
