const {
    findAll,
    findOne,
    update,
    create,
    smartDelete,
    updatePwd,
    findByEmail,
    upload,
    findAllWithSkillEval,
    Delete, updateResume, sendEmailSubmitEvals
} = require('../services/users.service')
const db = require("../models");
const {generateRandomString} = require("../services/general.service");
const bcrypt = require("bcrypt");
const {sendUserAuth} = require("../services/function.services");
const {sendMail2} = require("../services/mail.service");
var xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

exports.getUsers = (req, res) => {
    findAll(res);
}

exports.getOne = (req, res) => {
    findOne(req, res);
}

exports.getUsersWithSkillEvaluation = (req, res) => {
    let departmentId;
    let userId = '';
    const user = req.data;
    const roles = ['ADMIN', 'DIRECTOR', 'USER'];
    if (roles.includes(user.Role.name)) {
        departmentId = '';
    } else {
        departmentId = req.data.Department.id;
    }
    if (user.Role.name === 'USER') {
        userId = user.id;
    }
    findAllWithSkillEval(departmentId, userId, res);
}
exports.getUserByEmail = (req, res) => {
    findByEmail(req.params.email, res)
}
exports.addUser = async (req, res) => {
    try {
        const existingUser = await db.User.findOne({ where: { email: req.body.email } });
        
        if (!existingUser) {
            const randomPwd = generateRandomString();
            const newPwd = await bcrypt.hash(randomPwd, 10);
            
            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                company: req.body.company,
                RoleId: req.body.RoleId,
                DepartmentId: req.body.DepartmentId,
                FunctionId: req.body.FunctionId,
                password: newPwd,
            };
            
            const skills = await db.Skill.findAll();
            const result = await create(newUser, res, randomPwd, skills);
            // Handle result if needed
            res.status(200).send({message: 'user added successfully'})
        } else {
            res.status(400).send({ message: 'User with this email already exists.' });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
exports.updateUser = (req, res) => {
    db.User.findByPk(req.body.id).then(async (user) => {
        if (user) {
            const userEdited = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                RoleId: req.body.RoleId,
                company: req.body.company,
                DepartmentId: req.body.DepartmentId,
                FunctionId: req.body.FunctionId,
                enabled: req.body.enabled
            }
            update(req.body.id, userEdited, res);
        } else {
            res.status(400).send({message: "This user doesn\'t exist"});
        }
    });
}
exports.updateFrResumeUser = (req, res) => {
    db.User.findByPk(req.body.id).then(async (user) => {
        if (user) {
            const userEdited = {
                experienceYears: req.body.experienceYears,
                availableDate: req.body.availableDate,
                sofiaStartWorkDate: req.body.sofiaStartWorkDate,
                pertinentSkill: req.body.pertinentSkill,
                frResumePath: req.files[0] ? req.files[0].path : user.frResumePath,
                frResumeFileName: req.files[0] ? req.files[0].originalname : user.frResumeFileName,
            }
            update(req.body.id, userEdited, res);
        } else {
            res.status(400).send({message: "This user doesn\'t exist"});
        }
    });
}
exports.updateEngResumeUser = (req, res) => {
    db.User.findByPk(req.body.id).then(async (user) => {
        if (user) {
            const userEdited = {
                engResumePath: req.files[0] ? req.files[0].path : user.engResumePath,
                engResumeFileName: req.files[0] ? req.files[0].originalname : user.engResumeFileName,
            }
            update(req.body.id, userEdited, res);
        }
    }).catch(error=>{
        console.log(error);
    });
}
exports.updatePassword = async (req, res) => {
    const randomPwd = generateRandomService();
    const newPwd = await bcrypt.hash(randomPwd, 10);
    const result = await updatePwd(req.body.id, newPwd, randomPwd, res);
}
exports.disableUser = (req, res) => {
    db.User.findOne({where: {id: req.params.id}}).then((user) => {
        if (user) {
            const existingUser = user.dataValues;
            if (existingUser.enabled) {
                smartDelete(req.params.id, res)
            } else {
                res.status(400).send({message: 'User is already deleted'});
            }
        } else {
            res.status(400).send({message: 'User not found'});
        }
    });
}
exports.deleteUser = (req, res) => {
    db.User.findOne({where: {id: req.params.id}}).then((user) => {
        if (user) {
            Delete(req.params.id, res)
        } else {
            res.status(400).send({message: 'User not found'});
        }
    });

}
exports.addUsersViaFile =async (req, res) => {
    const result =await upload(req, res);
}
exports.downloadFile=(req,res)=>{
    if(req.query.pathFile) {
        res.attachment(req.query.pathFile);
        res.download(req.query.pathFile);
    }else {
        res.status(400).send({message : 'File not found'});
    }
}

exports.sendEmailSubmitEvals = async (req, res) =>{
    await sendEmailSubmitEvals(req, res);
}

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

const createPassword = (length = 8, hasNumbers = true, hasSymbols = true) => {
  let chars = alpha;
  hasNumbers ? (chars += numbers) : "";
  hasSymbols ? (chars += symbols) : "";
  return generatePassword(length, chars);
};

const generatePassword = (length, chars) => {
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
  

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
            !row.firstName ||
            !row.lastName ||
            !row.email ||
            !row.company ||
            !row.function ||
            !row.role ||
            !row.department
          ) {
            usersNotAddedCount++;
          } else {
            const roleResponse = row.role;
        
            const isRoleExist = await db.Role.findOne({
              where: { name: roleResponse },
            });
           
            if (isRoleExist) {
              row.role = isRoleExist.dataValues.id;
             
              const functionId= await db.Function.findOne({
                where: {name : row.function}
              })
              row.function = functionId.dataValues.id
          
              const departmentId = await db.Department.findOne({
                where: {name : row.department}
              })
              row.department = departmentId.dataValues.id

              const emailResponse = row.email;
              const isUserExist = await db.User.findOne({
                where: { email: emailResponse },
              });
             
              if (!isUserExist) {
               
                const generatedPassword = createPassword(8, true, true);
                
                const hash = await bcrypt.hash(generatedPassword, 10);
                
                let userData = {
                  firstName: row.firstName,
                  lastName: row.lastName,
                  email: row.email,
                  password: hash,
                  DepartmentId: row.department,
                  FunctionId: row.function,
                  RoleId: row.role,
                  company: row.company
                };
                
                // await db.User.create(userData);
                // await sendMail2(userData.firstName, userData.lastName, userData.email, generatedPassword)
                const skills = await db.Skill.findAll();
                await create(userData, res, generatedPassword, skills);
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