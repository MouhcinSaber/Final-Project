var express=require('express');
var router=express.Router();
const {getAllFieldsOfStudy,createFieldOfStudy, updateFieldOfStudy}=require('../controllers/field_of_study');


//get all fields of study
router.get('/',getAllFieldsOfStudy);
//create a new field of study
router.post('/',createFieldOfStudy);
//edit a field of study (optional)
router.put('/:fieldId',updateFieldOfStudy);


module.exports=router;