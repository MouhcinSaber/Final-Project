var express=require('express');
var router=express.Router();
const {getAuth,createAuth, updateAuth, login}=require('../controllers/Authentification');
const autMiddleware = require('../midllewares/autMiddleware');

//get all authentifications
router.get('/',getAuth);
//create a new authentification
router.post('/',createAuth);
// login
router.post('/login',login);
//edit an authentification
router.put('/:authId',autMiddleware,updateAuth);
//delete an authentification
router.delete('/:authId',autMiddleware,deleteUserProfile);

module.exports=router;