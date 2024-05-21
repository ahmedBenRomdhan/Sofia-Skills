const {login,resetPassword}=require('../services/auth.service')

exports.loginController = (req,res)=>{
    const {email, password}=req.body;
    if(email && password){
        return login(email, password, res);
    }else {
        res.status(400).send('All input is required !')
    }
}

exports.resetPwdController=async (req, res) => {
    const email = req.body.email;
    if (email) {
        let result = await resetPassword(email, res);
    } else {
        res.status(400).send('All input is required ')
    }
}
