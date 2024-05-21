const db = require('../models');
const {generateRandomString} = require('./general.service');
const bcrypt = require("bcrypt");
const {sendMail, sendMail2,sendMail3} = require("./mail.service");
const url = require("../config/config");
const readXlsxFile = require("read-excel-file/node");
var path = require("path");
const exp = require('constants');
exports.findAll = (res) => {
    db.User.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        attributes: ['id', 'email', 'firstName', 'lastName', 'company', 'enabled'],
        include: [db.Department, db.Function, db.Role],
    }).then(data => {
        
        res.status(200).send(data);
    })
}

exports.findOne = (req, res) => {
    db.User.findOne({
        where : {id: req.params.id},
        attributes: ['id', 'email', 'firstName', 'lastName', 'company', 'enabled'],
        include: [db.Department, db.Function, db.Role],
    }).then(data => {
        res.status(200).send(data);
    })
}

exports.findAllFullname = (req, res) => {
    let userOption = {};
    if (req.data.Role.name === 'MANAGER') {
        userOption.DepartmentId = req.data.Department.id;
    }
    db.User.findAll({
        where: userOption,
        order: [
            ['firstName', 'ASC']
        ],
        attributes: ['id', 'firstName', 'lastName', 'enabled'],
    }).then(data => {
        const users = data.map(user => {
            return {
                id: user.id,
                fullname: user.firstName + ' ' + user.lastName,
                enabled: user.enabled
            }
        })
        res.status(200).send(users);
    })
}
exports.findAllWithSkillEval = (departmentId, userId, res) => {
    let departmentOptions = {};
    let userOptions = {
        enabled: true
    };
    if (departmentId !== '') {
        departmentOptions.id = departmentId;
    }
    if (userId) {
        userOptions.id = userId;
    }
    db.User.findAll({
        where: userOptions,
        order: [
            ['createdAt', 'DESC'],
        ],
        attributes: ['id', 'email', 'firstName', 'lastName',
            'availableDate', 'experienceYears', 'sofiaStartWorkDate',
            'frResumePath', 'frResumeFileName',
            'engResumePath', 'engResumeFileName', 'pertinentSkill'],
        include: [
            {model: db.Department, where: departmentOptions},
            db.Function, db.Role,
        ],
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
    })
}
exports.findByEmail = (email, res) => {
    db.User.findOne({
        where: {
            enabled: true,
            email: email
        },
        attributes: ['id', 'email', 'firstName', 'lastName', 'company'],
        include: [db.Department, db.Function, db.Role]
    }).then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(400).send({message: 'User not found'});
        }
    })
}
exports.create = async (user, res, pwd, skills) => {
    try {
        const host = url.development.host;

        const newUser = await db.User.create(user);

        const skillsEval = skills.map(skill => {
            return {
                skillId: skill.dataValues.id,
                forUser: newUser.id
            };
        });
        await db.SkillEvaluation.bulkCreate(skillsEval);

        const subject = 'New Account';
        const context = {
            userFirstName: user.firstName,
            userEmail: user.email,
            password: pwd,
            url: host
        };

    
        let htmlTemplate = 'newUserMail';
        await sendMail2(user.email, htmlTemplate, subject, context);
    } catch (error) {
        console.error('Error creating user or sending email:', error);
    }


    // const host = url.development.host;
    // db.User.create(user).then(async newUser => {
    //         const skillsEval = skills.map(elet => {
    //             return {
    //                 skillId: elet.dataValues.id,
    //                 forUser: newUser.id
    //             }
    //         })
    //         const evaluations = await db.SkillEvaluation.bulkCreate(skillsEval);
    //         const subject = 'New Account';

    //         const context = {
    //             userFirstName: user.firstName,
    //             userEmail: user.email,
    //             password: pwd,
    //             url: host
    //         }
    //         let htmlTemplate = 'newUserMail';
    //         // var result = await sendMail(user.email,subject, htmlTemplate, context);
            
    //         await sendMail2(user.email, htmlTemplate,subject, context)
    //     }
    // )

}
exports.update = (id, user, res) => {
    db.User.update(user, {
        where: {
            id: id
        }
    }).then(user => {
        res.status(200).send({message: 'User edited successfully'});
    })

}
exports.updatePwd = async (id, newPwd, randomPwd, res) => {
    const hostup = url.development.host;
    db.User.update({
        password: newPwd,
    }, {
        where: {
            id: id
        }
    }).then(async user => {
        if (user) {
            const subject = 'New Password';
            const context = {
                userFirstName: user.dataValues.firstName,
                userEmail: user.dataValues.email,
                password: randomPwd,
                url: hostup
            }
            let htmlTemplate = 'newUserMail';
            var result = await sendMail(user.dataValues.email, res, subject, htmlTemplate, context);
            res.status(200).send(user.dataValues);
        } else {
            res.status(400).send({message: 'User not found!'});
        }

    })
}
exports.smartDelete = (id, res) => {

    db.User.update({enabled: false}, {
        where: {
            id: id
        }
    }).then(() => {
            res.status(200).send({success: 'user successfully deactivated'})
        }
    )

}
exports.Delete = (id, res) => {
    db.User.destroy({
        where: {
            id: id
        }
    }).then(() => {
            res.status(200).send({success: 'user successfully deleted'})
        }
    )

}
exports.upload = async (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(400).send({message: "Please upload an excel file!"});
        } else {
            const departments = await db.Department.findAll();
            const functions = await db.Function.findAll();
            const roles = await db.Role.findAll();
            const users = await db.User.findAll();
            const skills = await db.Skill.findAll();
            let p = path.resolve('/home/node/app/' + req.file.path);
            readXlsxFile(p).then(async (rows) => {
                // skip header
                rows.shift();
                let totalNbRows = rows.length;
                let nbRowsInsered = 0;
                rows.forEach((row) => {
                    let user = users.find(elet => elet.email === row[2])
                    if (row[0] && row[2] && row[1] && !user) {
                        let password = generateRandomString();
                        let department = departments.find(elet => elet.name === row[5]);
                        let fct = functions.find(elet => elet.name === row[6]);
                        let role = roles.find(elet => elet.name === row[3].toUpperCase());

                        bcrypt.hash(password, 10).then(async pwd => {
                            if (role && fct && department) {
                                let user = {
                                    firstName: row[0] || '',
                                    lastName: row[1].toUpperCase() || '',
                                    email: row[2],
                                    RoleId: role.id,
                                    company: row[4],
                                    FunctionId: fct.id,
                                    DepartmentId: department.id,
                                    password: pwd,
                                };
                                nbRowsInsered++;
                                const result = await this.create(user, res, password, skills)
                            }
                        })
                    }

                })

                res.status(200).send({
                    message: req.file.originalname + ": Uploaded "
                        + nbRowsInsered + "/" + totalNbRows + " rows successfully "
                });
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

exports.sendEmailSubmitEvals = async (req, res) => {
    try {
        let user = await db.User.findOne({
            where: {
                enabled: true,
                id: req.body.User
            }
        })
        let users = await db.User.findAll({
            where: {
                enabled: true,
                DepartmentId : user.DepartmentId,
                RoleId: [4, 3, 1]
            }
        })
        const emails = users.map(user => user.email);

        let htmlTemplate = 'skillsEvaluation';
        let subject = 'Evaluations submission';
        let context = {
            userFirstName: user.firstName,
            memberEmail: user.email,
            url : ''
        }
        
        await sendMail3(emails,htmlTemplate, subject,  context);
        
        // users.map( async (userr) =>{
        // let context = {
        //     userFirstName: userr.firstName,
        //     memberEmail: userr.email,
        //     url: ''
        // }
        //     await sendMail3(userr.email,htmlTemplate, subject,  context);
        // })
        res.status(200).send({
            message: "Email sent successfully",
        });
    } catch (error) {
        res.status(500).send({
            warning: "An error has occurred! Please try again.",
        });
        
    }
}

