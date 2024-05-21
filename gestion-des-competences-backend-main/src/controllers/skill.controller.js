const {findAll,findAllSkills,update,create,smartDelete, upload, findByIds, selectSkillsNames, findByIdsForCategory, findByIdsForCategoryAndSkill}=require('../services/skill.service');
const {updateSkillFunction} = require('./functionSkill.controller')
const db = require("../models");

var xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

exports.getSkills=(req,res)=>{
    findAll(res);
}
exports.getAllSkills=(req,res)=>{
    findAllSkills(res);
}
exports.getSkillsByIds = (req,res)=>{
    findByIds(req,res);
}
exports.getSkillsByIdsCategories = (req,res)=>{
    findByIdsForCategory(req,res);
}
exports.getSkillsByIdsCategoriesAndSkills = (req,res)=>{
    findByIdsForCategoryAndSkill(req,res);
}
exports.getSkillsNames=(req,res)=>{
    selectSkillsNames(req,res);
}
exports.addSkill=(req,res)=>{
    db.Skill.findOne({where : {name : req.body.name,
            // categoryId:req.body.CategoryId
    }}).then(async skill => {
        if (!skill || !skill.dataValues.enabled) {
            // add skill if a skill with same name doesn't exist or it's deleted
            let skill = {
                name: req.body.name,
                categoryId: req.body.CategoryId,
            };
            create(skill, res);
        } else {
            res.status(400).send({message:'This skill already exists'})
        }
    })

}
exports.updateSkill=(req,res)=>{
    db.Skill.findOne({where: {id: req.body.id}}).then((skill) => {
        if (skill) {
            let skillEdited = {
                name: req.body.name,
                categoryId: req.body.CategoryId,
                //function: req.body.function,

            }
            update(req.body.id, skillEdited, res);
            //updateSkillFunction(req, res)
        } else {
            res.status(400).send({message:"This skill doesn\'t exist"});
        }
    });
}
exports.deleteSkill=(req,res)=>{
    db.Skill.findOne({where : {id : req.params.id}}).then( (skill) => {
        if (skill) {
            const existingSkill = skill.dataValues;
            if (existingSkill.enabled){
                smartDelete(req.params.id,res)
            } else{
                res.status(400).send({message:'Skill is already deleted'});
            }
        }else {
            res.status(400).send({message:'Skill not found'});
        }});
}
exports.addSkillsViaFile=async (req, res) => {
    const result = await upload(req, res);
}


exports.importFile = async (req, res) => {
    try {
    
      const filename = req.file.filename;
      const filePath = path.join(__dirname, "../../public/uploads", filename);
  
      // Read the file buffer
      const fileBuffer = fs.readFileSync(filePath);
      const fileType = req.file.mimetype;
  
      let usersNotAddedCount = 0;
      let jsonData = [];
      if (fileType === "text/csv") {
        jsonData = await csv().fromString(fileBuffer.toString());
      } else if (
        fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        fileType === "application/vnd.ms-excel"
      ) {
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        jsonData = xlsx.utils.sheet_to_json(worksheet);
      } else {
        throw new Error("Invalid file type");
      }
      await Promise.all(
        jsonData.map(async (row) => {
          if (!row.name ||!row.category) {
            usersNotAddedCount++;
          } else {
            
            const categoryResponse = row.category
            const isCategoryExist = await db.Category.findOne({
                where: { name: categoryResponse },
              });
            
            if (isCategoryExist) {
              row.category = isCategoryExist.dataValues.id;
              const nameResponse = row.name;
              
              const isNameExist = await db.Skill.findOne({
                where: { name: nameResponse },
              });
              if (!isNameExist) {
              
                let skillData = {
                    name: row.name,
                    categoryId: row.category,
                  };
                create(skillData, res);
             
              } else {
                usersNotAddedCount++;
              }
            } else {
              usersNotAddedCount++;
            }
          }
        })
      );
    
      const result = `${jsonData.length - usersNotAddedCount}/${jsonData.length}`;
     
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };