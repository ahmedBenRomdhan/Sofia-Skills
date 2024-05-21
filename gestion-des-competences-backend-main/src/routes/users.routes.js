var express = require('express');
const fs = require('fs');
var router = express.Router();
const {addUser, deleteUser, updateUser, getUsers, getOne, updatePassword, getUserByEmail, addUsersViaFile,
    getUsersWithSkillEvaluation, disableUser, updateFrResumeUser,updateEngResumeUser, downloadFile,
    sendEmailSubmitEvals, importFile
} = require("../controllers/users.controller");
const uploadExcelFile = require("../middlewares/upload-excel-file.middleware");
const {authMiddleware} = require("../middlewares/auth.middleware");
const uploadEngResumeFile = require("../middlewares/upload-engResume-file-middleware");
const uploadFrResumeFile = require("../middlewares/upload-frResume-file-middleware");
const {findAllFullname} = require("../services/users.service");
const {adminVerifMiddleware} = require("../middlewares/adminVerif.middleware");

const multer = require("multer");
var storageFiles = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

/* GET users. */
router.get('/download', authMiddleware,downloadFile)
router.get('/',authMiddleware, getUsers);
router.get('/byId/:id',authMiddleware, getOne);
router.get('/get-fullnames',authMiddleware, findAllFullname);
router.get('/skillEval',authMiddleware, getUsersWithSkillEvaluation);
/* GET user by email. */
router.get('/:email',authMiddleware, getUserByEmail);
/* Add new user. */
router.post('/', addUser);
/* Delete user. */
router.delete('/delete/:id',authMiddleware,adminVerifMiddleware, deleteUser);
/* Disable user. */
router.delete('/disable/:id',authMiddleware,adminVerifMiddleware, disableUser);
/* Edit user credentials without password. */
router.put('/',authMiddleware, updateUser);
router.put('/update-fr-resume',authMiddleware,uploadFrResumeFile.array("files",1), updateFrResumeUser);
router.put('/update-eng-resume',authMiddleware,uploadEngResumeFile.array("files",1), updateEngResumeUser);
/* Edit user password. */
router.put('/update-password',authMiddleware, updatePassword);
/* Upload excel file to add users. */
router.post('/upload-file',authMiddleware,uploadExcelFile.single("file"),addUsersViaFile)
/* Send Email Submit Evaluations to DIRECTOR/MANAGER */
router.post('/send-submit-evaluations', authMiddleware, sendEmailSubmitEvals)
/* Import File  */
router.post(
    "/importFile",
    authMiddleware,
    multer({ storage: storageFiles }).single("file"),
    importFile
  );

module.exports = router;
