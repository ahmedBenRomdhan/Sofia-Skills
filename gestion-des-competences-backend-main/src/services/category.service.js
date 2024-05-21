const db = require('../models');
const readXlsxFile = require("read-excel-file/node");
var path = require("path");
exports.findAll = (res) => {
    db.Category.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
    }).then(data => {
        console.log(data)
        res.status(200).send(data);
    })
}
exports.findEnabledCategories = (res) => {
    db.Category.findAll({
        where: {
            enabled: 1
        },
        order: [
            ['createdAt', 'DESC'],
        ],
    }).then(data => {
        console.log(data)
        res.status(200).send(data);
    });
}
exports.create = (category, res) => {
    db.Category.create(category).then(
        category => {
            if (category) {
                res.status(200).send({success: 'Category added successfully'})
            } else {
                res.status(400).send({message:'Try again !'})
            }
        }
    )

}

exports.update = (id,category, res) => {
    db.Category.update(category, {
        where: {
            id: id
        }
    }).then(category => {
        if (category){
            res.status(200).send({message:"Category edited successfully"});
        }else {
            res.status(400).send({message:"Try again !"});
        }
    })

}
exports.smartDelete = (id, res) => {

    db.Category.update({enabled: false}, {
        where: {
            id: id
        }
    }).then(() => {
            res.status(200).send({success: 'Category successfully deleted'})
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
                let categories =[];
                let totalNbRows= rows.length;
                let nbRowsInsered=0;
                rows.forEach((row) => {
                    if(row[0]) {
                        let category = {
                            name: row[0],
                        };
                        nbRowsInsered ++;
                        categories.push(category);
                    }
                })
                db.Category.bulkCreate(categories).then( result =>{
                    if (result){
                        res.status(200).send({
                            message: req.file.originalname +": Uploaded "
                                +nbRowsInsered+"/"+totalNbRows+" rows successfully "
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
