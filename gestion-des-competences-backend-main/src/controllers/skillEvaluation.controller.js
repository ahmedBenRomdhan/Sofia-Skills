const db = require('../models');
const {
    create, update, updateStatus, getSkillEvaluationsByUser, getSkillEvaluationsMatrix,
    getSkillEvaluationWithFilter
} = require("../services/skillEvaluation.service");

exports.createSkillEvaluation = (req, res) => {
    const newSkillEval = {
        level: req.body.level,
        evaluationEvidence: req.body.evaluationEvidence,
        status: req.body.status,
        skillId: req.body.skillId,
        evaluator: req.body.evaluator,
        forUser: req.body.forUser,
    }
    create(newSkillEval, res);
}
exports.updateSkillEvaluation = (req, res) => {
    const skillEvalEdited = {
        level: req.body.level,
        evaluationEvidence: req.body.evaluationEvidence,
        status: 'Evaluated',
        evaluatorId: req.data.id
    }
    update(skillEvalEdited, req.body.id, res)
}
exports.updateSkillEval = (req, res) =>{
    update(req.body, req.body.id, res);
}
exports.getUserSkillEvaluations = (req, res) => {

    getSkillEvaluationsByUser(req.params.userId, res);
}
exports.validateEvaluation = (req, res) => {
    // accept an array of ids exp : { id : ['1','2']}
    const ids = req.body.id;
    updateStatus(ids, 'Valid', req.data.id, res);
}
exports.getEvaluationsforSkills = (req, res) => {
    let departmentOptions={};
    const user = req.data;
    if(user.Role.name ==='MANAGER'){
        departmentOptions.id  = user.Department.id;
    }
    getSkillEvaluationsMatrix(departmentOptions,res);
}
exports.applyFilter = (req, res) => {
    
    let functions = 0;
    let categories = 0;
    let skills = 0;
    let users = 0;
    let departments = 0;
    if (req.query.skills !== '') {
        skills = req.query.skills.split(',');
    }
    if (req.query.users !== '') {
        users = req.query.users.split(',');
    }
    if (req.query.departments !== '') {
        departments = req.query.departments.split(',');
    }
    if (req.query.functions !== '') {
        functions = req.query.functions.split(',');
    }
    if (req.query.categories !== '') {
        categories = req.query.categories.split(',');
    }
    const minLevel = req.query.minLevel;
    const state = req.query.state;
    const pertinent = req.query.pertinent;
    getSkillEvaluationWithFilter(departments, users, skills, functions, minLevel, res, categories, pertinent, state);
}
