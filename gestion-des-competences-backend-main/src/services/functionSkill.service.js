const db = require("../models");

exports.create = (fct, res) => {
    db.FunctionSkill.create(fct).then(
        fct => {
            if (fct) {
                res.status(200).send({success: 'Function skill added successfully'})
            } else {
                res.status(400).send({message:'Try again !'})
            }
        }
    )

}

exports.getAllFunSkill = async (req, res) => {
    let result = await db.FunctionSkill.findAll({
        order: [
            ['createdAt', 'DESC'],
        ]
    })
    res.status(200).send(result)
}

exports.updateFunSkill = async (req, res) => {
    let result = await db.FunctionSkill.update({FunctionId: req.body.Functions, SkillId: req.body.id}, {
        where: {
            FunctionId: req.body.oldFun,
            SkillId: req.body.id
        }
    })
    res.status(200).send(result)
}

exports.deleteFunSkill = async (req, res) => {

    let result = await db.FunctionSkill.destroy({
        where: {
            FunctionId: req.body.oldFun.id,
            SkillId: req.body.id
        }
    })
    res.sendStatus(200).send(result);
}