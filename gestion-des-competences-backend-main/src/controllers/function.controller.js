const {findAll,create,update,upload,smartDelete, findAllIncludeDepart} = require("../services/function.services");
const db = require("../models");

var xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

exports.getFunctions=(req,res)=>{
    findAll(res);
}
exports.getFunctionsIncludeDepart=(req,res)=>{
    findAllIncludeDepart(res);
}
exports.addFunction=(req,res)=>{
    db.Function.findOne({where : {name : req.body.name}}).then(async fct => {
        if (!fct) {
            // add fct if a fct with same name doesn't exist or it's deleted
            let fct = {
                name: req.body.name,
                DepartmentId: req.body.DepartmentId,
            };
            create(fct, res);
        } else {
            res.status(400).send({message:'This function already exists'})
        }
    })
}
exports.updateFunction=(req,res)=>{
    db.Function.findOne({where: {id: req.body.id}}).then( (fct) => {
        if (fct) {
            let fctEdited = {
                name: req.body.name,
                DepartmentId: req.body.DepartmentId,
            }
            update(req.body.id, fctEdited, res);
        } else {
            res.status(400).send({message:"This function doesn\'t exist"});
        }
    });
}
exports.deleteFunction=(req,res)=>{
    db.Function.findOne({where : {id : req.params.id}}).then( (fct) => {
        if (fct) {
            const existingFct= fct.dataValues;
            if (existingFct.enabled){
                smartDelete(req.params.id,res)
            } else{
                res.status(400).send({message:'Function is already deleted'});
            }
        }else {
            res.status(400).send({message:'Function not found'});
        }});
}
exports.addFctsViaFile=async (req, res) => {
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
         
           
          if (
            !row.name ||
            !row.department
          ) {
            usersNotAddedCount++;
          } else {
            
            const departmentResponse = row.department
            const isDepartmentExist = await db.Department.findOne({
                where: { name: departmentResponse },
              });
            
            if (isDepartmentExist) {
              row.department = isDepartmentExist.dataValues.id;
              const nameResponse = row.name;
              
              const isNameExist = await db.Function.findOne({
                where: { name: nameResponse },
              });
        
              if (!isNameExist) {
                
                let functionData = {
                    name: row.name,
                    DepartmentId: row.department,
                  };
                await create(functionData, res);
             
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