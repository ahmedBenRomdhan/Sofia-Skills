const {findAll,update,create,smartDelete, upload}=require('../services/roles.service')
const db = require("../models");

exports.getRoles=(req,res)=>{
    findAll(res);
}
exports.addRole=(req,res)=>{
    db.Role.findOne({where : {name : req.body.name}}).then(async role => {
        if (!role || !role.dataValues.enabled) {
            // add role if a role with same name doesn't exist or it's deleted
            let role = {
                name: req.body.name,
                description: req.body.description,
            };
            create(role, res);
        } else {
            res.status(400).send({message:'This role already exists'})
        }
    })

}
exports.updateRole=(req,res)=>{
    db.Role.findOne({where: {id: req.body.id}}).then( (role) => {
        if (role) {
            let roleEdited = {
                name: req.body.name,
                description: req.body.description,
            }
            update(req.body.id, roleEdited, res);
        } else {
            res.status(400).send({message:"This role doesn\'t exist"});
        }
    });
}
exports.deleteRole=(req,res)=>{
    db.Role.findOne({where : {id : req.params.id}}).then( (role) => {
        if (role) {
            const existingRole = role.dataValues;
            if (existingRole.enabled){
                smartDelete(req.params.id,res)
            } else{
                res.status(400).send({message:'Role is already deleted'});
            }
        }else {
            res.status(400).send({message:'Role not found'});
        }});
}

