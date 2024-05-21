const db = require('../models');
const readXlsxFile = require("read-excel-file/node");
var path = require("path");
exports.findByIds = (req, res) => {
    const skills = req.params.skillsId.split(',');
    db.Skill.findAll({
        where: {id: skills},
        order: [
            ['name', 'ASC']
        ],
    }).then(result => {
        let skillsNames;
        if (result) {
            skillsNames = [];
            result.map(skill => {
                skillsNames.push(skill.name);
            })
            res.status(200).send(skillsNames);
        }
    });
}
exports.findByIdsForCategory = (req, res) => {
    const category = req.params.categoriesId.split(',');
    db.Skill.findAll({
        where: {categoryId: category},
        order: [
            ['name', 'ASC']
        ],
    }).then(result => {
        let skillsNames;
        if (result) {
            skillsNames = [];
            result.map(skill => {
                skillsNames.push(skill.name);
            })
            res.status(200).send(skillsNames);
        }
    });
}
exports.findByIdsForCategoryAndSkill = (req, res) => {
    const category = req.query.categories.split(',');
    const skills = req.query.skills.split(',');
    db.Skill.findAll({
        where: {id: skills, categoryId: category},
        order: [
            ['name', 'ASC']
        ],
    }).then(result => {
        let skillsNames;
        if (result) {
            skillsNames = [];
            result.map(skill => {
                skillsNames.push(skill.name);
            })
            res.status(200).send(skillsNames);
        }
    });
}
exports.selectSkillsNames = (req, res) => {
    db.Skill.findAll({
        order: [
            ['name', 'ASC']
         ],
            attributes: ['name','enabled']
        }
    ).then(result => {
        let skillsNames;
        if (result) {
            skillsNames = [];
            result.map(skill => {
                skillsNames.push(skill);
            })
            res.status(200).send(skillsNames);
        }
    });
}
exports.findAll = (res) => {
    db.Skill.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        include: [db.Function, db.Category]
    }).then(data => {
        res.status(200).send(data);
    })
}
exports.findAllSkills = (res) => {
    db.Skill.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        include: [db.Function, db.Category]
    }).then(data => {
        res.status(200).send(data);
    })
}
exports.create = (skill, res) => {
    db.Skill.create(skill).then(
        skill => {
            if (skill) {
                createSkillEvalForAllUsers(skill.id);
                res.status(200).send({success: 'Skill added successfully', data: skill})
            } else {
                res.status(400).send({message:'Try again !'})
            }
        }
    )

}

exports.update = (id, skill, res) => {
    db.Skill.update(skill, {
        where: {
            id: id
        }
    }).then(skill => {
        if (skill) {
           
            res.status(200).send({message: "Skill edited successfully", skill: skill[0]});

        } else {
            res.status(400).send({message:"Try again !"});
        }
    })

}
exports.smartDelete = (id, res) => {

    db.Skill.update({enabled: false}, {
        where: {
            id: id
        }
    }).then(() => {
            res.status(200).send({success: 'Skill successfully deleted'})
        }
    )
}
exports.upload = async (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(400).send({message:"Please upload an excel file!"});
        } else {
            let p = path.resolve('/home/node/app/' + req.file.path);
            const categories = await db.Category.findAll();
            const skills = await db.Skill.findAll();
            readXlsxFile(p).then(async (rows) => {
                // skip header
                rows.shift();
                let newSkills =[];
                let totalNbRows= rows.length;
                let nbRowsInsered=0;
                rows.forEach( (row) => {
                    let category = categories.find(elet => elet.name === row[1]);
                    let existSkill= skills.find(elet => elet.name === row[0]);
                    if(row[0] && category && !existSkill) {
                        let skill = {
                            name: row[0],
                            categoryId: category.id,
                        };
                        nbRowsInsered ++;
                        newSkills.push(skill);
                    }
                })
                db.Skill.bulkCreate(newSkills).then( result =>{
                    if (result){
                        result.map((skill) => {
                            createSkillEvalForAllUsers(skill.id);
                        });
                        res.status(200).send({
                            message: req.file.originalname +": Uploaded "
                                +nbRowsInsered+"/"+totalNbRows+" rows successfully "  ,
                        });
                    }
                })

            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

function createSkillEvalForAllUsers(skillId) {
    db.User.findAll({
        where: {enabled: true},
        attributes: ['id']
    }).then(async results => {
        const skillsEval = results.map(elet => {
            return {
                skillId: skillId,
                forUser: elet.id
            }
        });
        
        const skilleval = await db.SkillEvaluation.bulkCreate(skillsEval);
    })

}
