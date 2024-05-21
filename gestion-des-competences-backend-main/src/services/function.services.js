const db = require("../models");
const readXlsxFile = require("read-excel-file/node");
var path = require("path");

const nodeMailer = require("nodemailer");

/* Send User Auth */
exports.sendUserAuth = async (firstName, lastName, email, password) => {
  let transporter = nodeMailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const capitalizeFirstName = await capitalizeName(firstName);
  const capitalizeLastName = await capitalizeName(lastName);

  let mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Welcome to INT-Elegance",
    text:
      `Bonjour ${capitalizeFirstName} ${capitalizeLastName},\n\n` +
      "Félicitations ! Votre compte INT-Elegance a été créé.\n" +
      "Voici vos informations de connexion :\n" +
      "Email : " +
      email +
      "\n" +
      "Mot de passe : " +
      password +
      "\n\n" +
      "Cordialement,\n",
  };
  transporter.sendMail(mailOptions);
};
exports.findAll = (res) => {
    db.Function.findAll({
        order: [
            ['createdAt', 'DESC'],
        ]
    }).then(data => {
        res.status(200).send(data);
    })
}
exports.findAllIncludeDepart = (res) => {
    db.Function.findAll({
        where: {
            enabled: true
        },
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[db.Department]
    }).then(data => {
        res.status(200).send(data);
    })
}
exports.create = async (fct, res) => {
   try {
     db.Function.create(fct).then(
         fct => {
             if (fct) {
                 res.status(200).send({success: 'Function added successfully'})
             } else {
                 res.status(400).send({message:'Try again !'})
             }
         }
     )
   } catch (error) {
    res.status(500).send({message: error.message})
   }

}

exports.update = (id, fct, res) => {
    db.Function.update(fct, {
        where: {
            id: id
        }
    }).then(fct => {
        if (fct) {
            res.status(200).send({success: 'Function edited successfully'});
        }else {
            res.status(400).send({message:'Try again !'});
        }

    })

}
exports.smartDelete = (id, res) => {

    db.Function.update({enabled: false}, {
        where: {
            id: id
        }
    }).then(result => {
        if(result) {
            res.status(200).send({success: 'Function successfully deleted'})
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
            const departments = await db.Department.findAll();
            readXlsxFile(p).then(async (rows) => {
                // skip header
                rows.shift();
                let functions =[];
                let totalNbRows= rows.length;
                let nbRowsInsered=0;
                rows.forEach((row) => {
                    let department = departments.find(elet => elet.name === row[1]);
                    if(department && row[0]) {
                        let fct = {
                            name: row[0],
                            DepartmentId: department.id
                        };
                        nbRowsInsered ++;
                        functions.push(fct);
                    }
                })
                db.Function.bulkCreate(functions).then( result =>{
                    if (result){
                        res.status(200).send({
                            message: req.file.originalname +": Uploaded "
                                +nbRowsInsered+"/"+totalNbRows+" rows successfully "                          });
                    }
                    })

            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};
