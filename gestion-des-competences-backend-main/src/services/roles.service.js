const db = require('../models');
const readXlsxFile = require("read-excel-file/node");

exports.findAll = (res) => {
    db.Role.findAll({
        where: {
            enabled: true
        },
        order: [
            ['createdAt', 'DESC'],
        ]
    }).then(data => {
        res.status(200).send(data);
    })
}
exports.create = (role, res) => {
    db.Role.create(role).then(
        role => {
            if (role) {
                res.status(200).send({success: 'Role added successfully'})
            } else {
                res.status(400).send({message:'Try again !'})
            }
        }
    )

}

exports.update = (id, role, res) => {
    db.Role.update(role, {
        where: {
            id: id
        }
    }).then(role => {
        if (role) {
            res.status(200).send({success: 'Role edited successfully'})
        }

    })

}
exports.smartDelete = (id, res) => {

    db.Role.update({enabled: false}, {
        where: {
            id: id
        }
    }).then(() => {
            res.status(200).send({success: 'Role successfully deleted'})
        }
    )

}

