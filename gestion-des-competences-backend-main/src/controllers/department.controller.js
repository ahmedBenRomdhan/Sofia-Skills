const {findAll,create,update,upload,smartDelete, findAllActivated} = require("../services/department.service");
const db = require("../models");
var xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
exports.getDepartments=(req,res)=>{
    findAllActivated(res);
    console.log(res)
}
exports.getAllDepartments= (req,res)=>{
    findAll(res);
    console.log(res)
}
exports.addDepartment= async (req,res)=> {
    db.Department.findOne({where : {name : req.body.name}}).then(async result => {
        if (!result) {
            // add fct if a fct with same name doesn't exist or it's deleted
            let department = {
                name: req.body.name,
                description: req.body.description,
                enabled: true,
            };
           await create(department, res);
        } else {
            res.status(400).send({message:'This description already exists'})
        }
    })
}
exports.updateDepartment=(req,res)=>{
    db.Department.findOne({where: {id: req.body.id}}).then( (result) => {
        if (result) {
            let departmentEdited = {
                name: req.body.name,
                description: req.body.description,
            }
            update(req.body.id, departmentEdited, res);
        } else {
            res.status(400).send({message:"This department doesn\'t exist"});
        }
    });
}
exports.deleteDepartment=(req,res)=>{
    db.Department.findOne({where : {id : req.params.id}}).then( (result) => {
        if (result) {
            const existingDepartment= result.dataValues;
            if (existingDepartment.enabled){
                smartDelete(req.params.id,res)
            } else{
                res.status(400).send({message:'Department is already deleted'});
            }
        }else {
            res.status(400).send({message:'Department not found'});
        }});
}
exports.addDepartmentsViaFile=async (req, res) => {
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
          if (!row.name || !row.description ) {
            usersNotAddedCount++;
          } else {
            nameResponse= row.name
              const isNameExist = await db.Department.findOne({
                where: { name: nameResponse },
              });
              if (!isNameExist) {
                
                let departmentData = {
                    name: row.name,
                    description: row.description,
                    enabled: true
                  };
                await create(departmentData, res);
             
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
