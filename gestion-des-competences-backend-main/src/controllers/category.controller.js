const {findAll,update,create,smartDelete, upload, findEnabledCategories}=require('../services/category.service')
const db = require("../models");

var xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

exports.getCategories=(req,res)=>{
    findAll(res);
}
exports.getEnabledCategories=(req,res)=>{
  findEnabledCategories(res);
}
exports.addCategory=(req,res)=>{
    db.Category.findOne({where : {name : req.body.name}}).then(async category => {
        if (!category || !category.dataValues.enabled) {
            // add category if a category with same name doesn't exist or it's deleted
            let category = {
                name: req.body.name,
                //function: req.body.function,
            };
            create(category, res);
        } else {
            res.status(400).send({message:'This category already exists'})
        }
    }) 

}
exports.updateCategory=(req,res)=>{
    db.Category.findOne({where: {id: req.body.id}}).then((category) => {
        if (category) {
            let categoryEdited = {
                name: req.body.name,
                //function: req.body.function,

            }
            update(req.body.id, categoryEdited, res);
        } else {
            res.status(400).send({message:"This category doesn\'t exist"});
        }
    });
}
exports.deleteCategory=(req,res)=>{
    db.Category.findOne({where : {id : req.params.id}}).then( (category) => {
        if (category) {
            const existingCategory = category.dataValues;
            if (existingCategory.enabled){
                smartDelete(req.params.id,res)
            } else{
                res.status(400).send({message:'Category is already deleted'});
            }
        }else {
            res.status(400).send({message:'Category not found'});
        }});
}
exports.addCategoriesViaFile=async (req, res) => {
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
           
          if (!row.name ) {
            usersNotAddedCount++;
          } else {
            nameResponse= row.name
              const isNameExist = await db.Category.findOne({
                where: { name: nameResponse },
              });
              if (!isNameExist) {
                let categoryData = {
                    name: row.name
                  };
                create(categoryData, res);
             
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
