const nodeMailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require("path");
const express = require("express");
const viewPath =  path.resolve(__dirname, '../../views/');
require('dotenv').config({ path: '.env' });

exports.sendMail=async (email, subject, htmlTemplate, context) => {
    
        var transporter = nodeMailer.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            auth: {
                user: process.env.ADDRESS_EMAIL,
                pass: process.env.PASSWORD
            }
        });
        transporter.use('compile', hbs({
            viewEngine: {
                extName: '.handlebars',
                layoutsDir: viewPath,
                defaultLayout: false,
                express
            },
            viewPath: viewPath,
            extName: '.handlebars',
        }))
        var mailOptions = {
            to: email,
            from: process.env.ADDRESS_EMAIL,
            subject: subject,
            template:htmlTemplate,
            context:context
        };
         await transporter.sendMail(mailOptions)  
}

  

exports.sendMail2= async (email, template, subject, context) => {
    let transporter = nodeMailer.createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        user: process.env.ADDRESS_EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            layoutsDir: viewPath,
            defaultLayout: false,
            express
        },
        viewPath: viewPath,
        extName: '.handlebars',
    }))
    let mailOptions = {
      from: process.env.ADDRESS_EMAIL,
      to: email,
      subject: subject,
      template:template,
      context:context
    };
    await transporter.sendMail(mailOptions)
  };

  exports.sendMail3= async (email, template, subject, context) => {
    let transporter = nodeMailer.createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        user: process.env.ADDRESS_EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            layoutsDir: viewPath,
            defaultLayout: false,
            express
        },
        viewPath: viewPath,
        extName: '.handlebars',
    }))
    let mailOptions = {
      from: process.env.ADDRESS_EMAIL,
      to: email,
      subject: subject,
      template:template,
      context:context
    };
    await transporter.sendMail(mailOptions)
  };


