var express = require('express');
var router = express.Router();
const {getRoles, addRole, deleteRole, updateRole, addRolesViaFile} = require("../controllers/role.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");
/* GET roles. */
router.get('/',authMiddleware, getRoles);

/* Add role */
router.post('/',authMiddleware, addRole);
/* Delete role */
router.delete('/:id',authMiddleware, deleteRole);
/* Edit role */
router.put('/',authMiddleware, updateRole);
module.exports = router;
