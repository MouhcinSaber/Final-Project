var express=require('express');
var router=express.Router();
const {getAllFieldsOfStudy,createFieldOfStudy, updateFieldOfStudy}=require('../controllers/field_of_study');
const autMiddleware = require('../midllewares/autMiddleware');


//get all fields of study
router.get('/',autMiddleware,getAllFieldsOfStudy);
//create a new field of study
router.post('/',autMiddleware,createFieldOfStudy);
//edit a field of study (optional)
router.put('/:fieldId',autMiddleware,updateFieldOfStudy);


module.exports=router;