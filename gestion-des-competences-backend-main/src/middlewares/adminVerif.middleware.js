var db = require('../models');

exports.adminVerifMiddleware = (req, res, next) => {

    db.User.findAll({
        include: [{model: db.Role, where: {name: 'ADMIN'}}]
    }).then(result =>{

            if(result.length===1 && req.params.id === result[0].id) {
                res.status(400).send({message: "Please add another admin user to manage your app before!"});
            }else{
                next();
            }

    })

};


