const db = require("../models");
const { Op, where } = require("sequelize");
const exceljs = require("exceljs");
const sequelize = require("sequelize");
const fs = require('fs');
const path = require("path");


exports.create = (skillEvaluation, res) => {
  db.SkillEvaluation.create(skillEvaluation).then((result) => {
    if (result) {
      res.status(200).send({ message: "Evaluation added successfully" });
    }
  });
};  
exports.update = (skillEvaluation, id, res) => {
  db.SkillEvaluation.update(skillEvaluation, { 
    where: { id: id },
    individualHooks: true,
  }).then(async (result) => {
    if (result) {
      await createEvaluationTrace(result[1][0]);
      res.status(200).send(result);
    }
  });
};
// return all skill evaluation for user and an array of the skills of his function
exports.getSkillEvaluationsByUser = async (userId, res) => {
    const user = await db.User.findOne({
      where: {id: userId}
    })
    const userFunctionId= user.FunctionId
    const functionSkills = await db.FunctionSkill.findAll({
      where:{FunctionId: userFunctionId}
    })

    const functionRelatedSkills = functionSkills.map(x=> x.SkillId)
  
    await db.SkillEvaluation.findAll({
      where: { forUser: userId,
        skillId: { [Op.in]: functionRelatedSkills }
      },
      include: [
        { model: db.User, as: "evaluator" },
        { model: db.Skill, include: [db.Category, db.Function] },
      ],
    }).then((result) => {
      
      if (result) {
        res.status(200).send(result);
      }
    });
    // db.SkillEvaluation.findAll({
    //   where: { forUser: userId,
    //            skillId: functionRelatedSkills
    //   },
    //   order: [["index", "ASC"]],
    //   include: [
    //     // { model: db.User, as: "evaluator" },
    //     { model: db.Skill, include: [db.Category, db.Function] },
    //   ],
    // }).then((result) => {
    //   console.log(result)
    //   console.log("result", result.length)
    //   if (result) {
    //     res.status(200).send(result);
    //   }
    // });
  
  
};
exports.updateStatus = (ids, status, evaluatorId, res) => {
  db.SkillEvaluation.update(
    {
      status: status,
      evaluatorId: evaluatorId,
    },
    {
      where: { id: ids },
      individualHooks: true,
    }
  ).then(async (result) => {
    if (result) {
      await createEvaluationTrace(result[1][0]);
      res.status(200).send({
        message: "Status updated",
      });
    }
  });
};
exports.getSkillEvaluationsMatrix = (departmentOptions, res) => {
  db.User.findAll({
    attributes: ["firstName", "lastName", "enabled", "id"],
    include: [
      {
        model: db.SkillEvaluation,
        as: "OwnSkillEvaluation",
        attributes: ["level", "id", "status"],
        where: {
          status: ["Valid", "Evaluated"],
        },
        include: [{ model: db.Skill, attributes: ["name", "id"] }],
      },
      { model: db.Department, attributes: ["id"], where: departmentOptions },
    ],
  }).then((result) => {
    if (result) {
      const transformedData = transformDashboardData(result);
      res.send(transformedData);
    }
  });
};
exports.getSkillEvaluationWithFilter = (
  departments,
  users,
  skills,
  functions,
  minLevel,
  res,
  categories,
  pertinent,
  state
) => {
  var skillEvalOptions = { status: ["Valid", "Evaluated"] };
  const userOption = {};
  const skillOption = {};
  let trans = [];
  if (minLevel) {
    skillEvalOptions.level = { [Op.gte]: minLevel };
  }
  if (skills) {
    skillOption.id = skills;
  }
  if (users) {
    userOption.id = users;
  }
  if (departments) {
    userOption.DepartmentId = departments;
  }
  if (functions) {
    userOption.FunctionId = functions;
  }
  
  if (categories) {
    skillOption.categoryId = categories;
  }
  db.User.findAll({
    attributes: ["firstName", "lastName", "enabled", "FunctionId", "id"],
    where: userOption,
    include: [
      {
        model: db.SkillEvaluation,
        as: "OwnSkillEvaluation",
        attributes: ["level", "id", "status"],
        where: skillEvalOptions,
        include: [
          { model: db.Skill, attributes: ["name", "id","enabled"], where: skillOption, include: [{model: db.Function}]},
        ],
      },
    ],
  }).then((result) => {
    if (result) {
      const transformedData = transformDashboardData(result);
      
      const functionIds = transformedData.map(data => data.FunctionId);
      db.FunctionSkill.findAll({
        where: {
          FunctionId: functionIds
        }
      }).then(ress => {
        const skillIds = ress.map(skill => skill.SkillId);
        trans = transformedData.filter((item) =>{
          for (const [key, value] of Object.entries(item)) {
            if (typeof(value) == 'object'){
              return skillIds.includes(value.id)
            }
          }
        })
      
      if(state == 0){
        if (pertinent == 'true'){
          res.send(trans);
        }else{
          res.send(transformedData);
        }
      }
      else{
        let x = 0;
        if( skills != 0 ){
            x =1;
        }else if(categories != 0 ){
          x=categories;
        }
        if (pertinent == 'true'){
          generateExcel(res,trans,1)
        }else{
          generateExcel(res,transformedData,x)
        }
      }
    })
    }
  });
};
exports.getMeanEvaluationLevel = async (req, res) => {
  try {
    const user = req.data;
    const skillEvalOption = { status: "Valid" };
    const userOption = {};
    const skillOption = {};
    const includeClause = [
      { model: db.Skill, attributes: ["name", "id"], where: skillOption },
      {
        model: db.User,
        attributes: ["id", "FunctionId"],
        where: userOption,
        as: "user",
      }
    ];
    if (req.query.skills) {
      skillOption.id = req.query.skills.split(",");
    }
    if (req.query.userId) {
      skillEvalOption.forUser = req.query.userId;
    }
    if (req.query.department) {
      userOption.DepartmentId = req.query.department;
    }
    if (user.Role.name === "MANAGER") {
      userOption.DepartmentId = user.Department.id;
    }
    if(req.query.cat){
      skillOption.categoryId = req.query.cat
    }
    if(req.query.fun){
      userOption.FunctionId = req.query.fun
    }

    const result = await db.SkillEvaluation.findAll({
      where: skillEvalOption,
      attributes: [[sequelize.fn("avg", sequelize.col("level")), "avgLevel"]],
      group: "skillId",
      include: includeClause,
    });
    
    if (req.query.pertinent == 'true'){
    const functionIds = [...new Set(result.map(data => data.user.FunctionId))];
      db.FunctionSkill.findAll({
        where: {
          FunctionId: functionIds
        }
      }).then(ress => {
        const skillIds = ress.map(skill => skill.SkillId);
        trans = result.filter((item) =>{
          for (const [key, value] of Object.entries(item.Skill)) {
            if (typeof(value) == 'object'){
              return skillIds.includes(value.id)
            }
          }
      })
        res.send(trans);
    })
  }else{
    res.send(result);
  }

  } catch (err) {
    console.error(err);
  }
};

exports.getReportWithTime = async (req, res) => {
  try {
    let userOption = {};
    let skillOption = {};
    if(req.query.CategoryId){
      skillOption.categoryId = req.query.CategoryId
    }
    if(req.query.skills){
      skillOption.id = req.query.skills.split(",")
    }
    if(req.query.userId){
      userOption.id = req.query.userId
    }
    if(req.query.FunctionId){
      userOption.FunctionId = req.query.FunctionId
    }
    if(req.query.DepartmentId){
      userOption.DepartmentId = req.query.DepartmentId
    }
    const result = await db.SkillEvaluationHistory.findAll({
      where: {status : 'Valid'},
      include : [{ model: db.SkillEvaluation, 
        attributes:["skillId"], 
        include : [{ model: db.Skill, where: skillOption }, 
                  { model: db.User, as: 'user', where: userOption }],
        required: true
        }],
      attributes: [
        [sequelize.fn("avg", sequelize.col("SkillEvaluationHistory.level")), "avgLevel"], 
        [sequelize.fn("Date", sequelize.col("SkillEvaluationHistory.createdAt")), "created"],
      ],
      group: ["SkillEvaluation.skillId","created"],
      order: [["updatedAt", "ASC"]],
    })

    const functionIds = [...new Set(result.map(data => data.SkillEvaluation.user.FunctionId))];
      db.FunctionSkill.findAll({
        where: {
          FunctionId: functionIds
        }
      }).then(ress => {
        const skillIds = ress.map(skill => skill.SkillId);
        trans = result.filter((item) =>{
          for (const [key, value] of Object.entries(item.SkillEvaluation.Skill)) {
            if (typeof(value) == 'object'){
              return skillIds.includes(value.id)
            }
          }
      })
      if (req.query.pertinent == 'true'){
        res.send(trans);
      }else{
        res.send(result);
      }
    })

  } catch (error) {
    console.log(error);
  }
  
}

exports.getReportRadar = async (req, res) => {
  try {
    let userOption = {};
    let skillOption = {};
    const dateFormat = '%m/%Y';
    if(req.query.CategoryId){
      skillOption.categoryId = req.query.CategoryId
    }
    if(req.query.skills){
      skillOption.id = req.query.skills.split(",")
    }
    if(req.query.userId){
      userOption.id = req.query.userId
    }
    if(req.query.FunctionId){
      userOption.FunctionId = req.query.FunctionId
    }
    if(req.query.DepartmentId){ 
      userOption.DepartmentId = req.query.DepartmentId
    }
  const result = await db.SkillEvaluation.findAll({
    attributes: [
      [sequelize.fn("avg", sequelize.col("level")), "avgLevel"], 
      [sequelize.fn('DATE_FORMAT', sequelize.col("SkillEvaluation.updatedAt"), dateFormat), "created"],
      "skillId"
    ],
    where: {status : 'Valid'},
    include : [{ model: db.Skill, where: skillOption }, { model: db.User, as: 'user', where: userOption }],
    group: ["skillId","created"],
    order: [["updatedAt", "ASC"]],
  })
  res.status(200).send(result);

  } catch (error) {
    console.log(error);
  } 
}

async function generateExcel (res, transformedData,x)  {
  db.Skill.findAll({
    order: [
        ['name', 'ASC']
     ],
        attributes: ['name','enabled']
    }
).then(results => {
    let skillsNames;
    if (results) {
        skillsNames = [];
        results.map(skill => {
            skillsNames.push(skill);
        })
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Evaluations');
        if(x == 0){
          let columns = [{header: 'User', key : 'user'}];
          skillsNames.forEach((skill, index) => {
            columns.push({header: skill.name, key : 'skil' + index})
          })
          worksheet.columns = columns;
          writeCellsExcel(transformedData, columns, worksheet)
          downloadExcel(workbook, res);
        }else if(x == 1){
          // get all the unique skill names
          const allSkills = [];
          transformedData.forEach(evaluation => {
            Object.keys(evaluation).forEach(key => {
              if (typeof evaluation[key] === 'object' && evaluation[key].level != undefined) {
                allSkills.push(key);
              }
            });
          });
          const uniqueSkills = [...new Set(allSkills)];
          let columns = [{header: 'User', key : 'user'}];
          uniqueSkills.forEach((skill, index) => {
            columns.push({header: skill, key : 'skil' + index})
          })
          worksheet.columns = columns;
          writeCellsExcel(transformedData, columns, worksheet)
          downloadExcel(workbook, res);
          }else {
            db.Skill.findAll({
              where: [
                {categoryId: x}
              ],
              order: [
                  ['name', 'ASC']
              ],
                  attributes: ['name','enabled']
            }).then(resSkills => {
              let skillCat = []; 
              resSkills.map(sk=> skillCat.push(sk));
              let columns = [{header: 'User', key : 'user'}];
              skillCat.forEach((skill, index) => {
                columns.push({header: skill.name, key : 'skil' + index})
              })
            worksheet.columns = columns;
            writeCellsExcel(transformedData, columns, worksheet)
            downloadExcel(workbook, res);
            })
          }
    }
});
}

async function writeCellsExcel(transformedData, columns, worksheet) {
  worksheet.columns.forEach(column => {
    column.width = 20;
    column.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  transformedData.forEach((evaluation, index) => {
    let row = worksheet.addRow({ user: evaluation.user });
    columns.slice(1).map((sk) => {
      if (evaluation[sk.header] !== undefined) {
        row[sk.key] = evaluation[sk.header].level + '/4';
        let cell = row.getCell(`${sk.key}`);
        cell.value = row[sk.key];

        if (evaluation[sk.header].status === 'Valid') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '007bff' }
          };
        }

        // Check if evaluation[sk.header].enabled is false, color the column
        if (evaluation[sk.header].enabled === false) {
          worksheet.getColumn(sk.key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '717476' }
          };
        }
      } else {
        row[sk.key] = '--';
        let cell = row.getCell(sk.key);
        cell.value = row[sk.key];
      }
    });

    // Check if evaluation.enabled is false, color the entire row
    if (evaluation.enabled === false) {
      row.eachCell((cell, colNumber) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '717476' }
        };
      });
    }
  });
}
async function downloadExcel(workbook, res){
  workbook.xlsx.writeFile('evaluation.xlsx').then(() => {

    const binaryData = fs.readFileSync("evaluation.xlsx");
    res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.set("Content-Disposition", "attachment; filename=evaluation.xlsx");
    res.send(binaryData);

  // Remove the file from the file system
  fs.unlinkSync('evaluation.xlsx');
  //res.sendFile(path.join(__dirname, "evaluation.xlsx"));
}); 
}

async function createEvaluationTrace(instance) {
  const evaluator = await db.User.findOne({
    where: { id: instance.evaluatorId },
  });
  const evaluationHistory = {
    level: instance.level,
    evaluationEvidence: instance.evaluationEvidence,
    status: instance.status,
    updateDate: instance.updatedAt,
    evaluatorFullname: evaluator.firstName + " " + evaluator.lastName,
    evaluationId: instance.id,
  };
  db.SkillEvaluationHistory.create(evaluationHistory)
    .then()
    .catch((err) => {});
}
function transformDashboardData(data) {
  const resultData = [];
  data.forEach(function (column) {
    const jsonData = {};
    jsonData["user"] = column.firstName + " " + column.lastName;
    jsonData["enabled"] = column.enabled;
    jsonData["userId"] = column.id;
    jsonData["FunctionId"] = column.FunctionId;
    column.OwnSkillEvaluation.forEach((evaluation) => {
      jsonData["evaluationId"] = evaluation.id;
      const columnName = evaluation.Skill.name;
      jsonData[columnName] = {
        level: evaluation.level,
        status: evaluation.status,
        id: evaluation.Skill.id,
        enabled: evaluation.Skill.enabled
      };
    });
    resultData.push(jsonData);
  });
  return resultData;
}
