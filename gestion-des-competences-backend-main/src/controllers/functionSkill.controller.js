const {create, getAllFunSkill, updateFunSkill, deleteFunSkill}=require('../services/functionSkill.service');
const db = require("../models");

exports.addSkillFunction=(req,res)=>{
    try{
            let skill = {
                FunctionId: req.body.FunctionId,
                SkillId: req.body.SkillId,
            };
            create(skill, res); 
    }
    catch(err){
        console.error(err)
    }
}

exports.getAllSkillFunction = (req, res) => {
    getAllFunSkill(req, res)
}

exports.updateSkillFunction = (req, res) => {
    updateFunSkill(req, res);
}

exports.deleteSkillFunction = (req, res) => {
    deleteFunSkill(req, res);
}