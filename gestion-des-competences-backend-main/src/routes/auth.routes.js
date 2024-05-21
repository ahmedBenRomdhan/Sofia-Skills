var express = require('express');
var router = express.Router();
var {loginController,resetPwdController}=require('../controllers/auth.controller');
var {authMiddleware}=require('../middlewares/auth.middleware')
/* login */
router.post('/signin',loginController);

router.put('/resetPwd',resetPwdController)
module.exports=router;
