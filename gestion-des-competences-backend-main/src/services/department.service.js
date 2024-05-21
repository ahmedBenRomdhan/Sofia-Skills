const db = require("../models");
const readXlsxFile = require("read-excel-file/node");
var path = require("path");
exports.findAllActivated = (res) => {
    db.Department.findAll({
        where: {
            enabled: true
        },
        order: [
            ['createdAt', 'DESC'],
        ],
    }).then(data => {
        console.log(data)
        res.status(200).send(data);
    })
}
exports.findAll = async (res) => {
    db.Department.findAll({
        order: [
            ['name', 'ASC'],
        ],
    }).then(data => {
        console.log(data)
        res.status(200).send(data);
    })


    const data = await db.Departmnet.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    conssole
}
exports.create = async (department, res) => {
    try{    db.Department.create(department).then(
        department => {
            if (department) {
                res.status(200).send({success: 'Department added successfully'})
            } else {
                res.status(400).send({message:'Try again !'})
            }
        }
    )}catch(error){console.log(error.message)};
}

exports.update = (id, department, res) => {
    db.Department.update(department, {
        where: {
            id: id
        }
    }).then(department => {
        if (department) {
            res.status(200).send({success: 'Department edited successfully'});
        }else {
            res.status(400).send({message:'Try again !'});
        }

    })

}
exports.smartDelete = (id, res) => {

    db.Department.update({enabled: false}, {
        where: {
            id: id
        }
    }).then(result => {
            if(result) {
                res.status(200).send({success: 'Department successfully deleted'})
            }else {
                res.status(400).send({message:'Try again !'});
            }
        }
    )

}
exports.upload = async (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(400).send({message:"Please upload an excel file!"});
        } else {
            let p = path.resolve('/home/node/app/' + req.file.path);
            readXlsxFile(p).then(async (rows) => {
                // skip header
                rows.shift();
                let departments =[];
                let totalNbRows= rows.length;
                let nbRowsInsered=0;
                rows.forEach((row) => {
                    if(row[0]) {
                        let department = {
                            name: row[0],
                            description: row[1]
                        };
                        nbRowsInsered ++;
                        departments.push(department);
                    }
                })
                db.Department.bulkCreate(departments).then( result =>{
                    if (result){
                        res.status(200).send({
                            message: req.file.originalname +": Uploaded "
                                +nbRowsInsered+"/"+totalNbRows+" rows successfully "                        });
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
