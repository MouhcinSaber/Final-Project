var express=require('express');
var router=express.Router();
const {getAuth,createAuth, updateAuth}=require('../controllers/Authentification');

//get all authentifications
router.get('/',getAuth);
//create a new authentification
router.post('/',createAuth);
//edit an authentification
router.put('/:authId',updateAuth);
//delete an authentification
router.delete('/:authId',deleteUserProfile);

module.exports=router;