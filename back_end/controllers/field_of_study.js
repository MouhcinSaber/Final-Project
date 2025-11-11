const Field_of_Study=require('../models/field_of_study');

//get all fields of study
const getAllFieldsOfStudy=async(req,res)=>{
    try {
        const fields=await Field_of_Study.find();
        res.status(200).json(fields);
    } catch (error) {
        res.status(500).json({message:'Server error',error});
    }
};

//create a new field of study
const createFieldOfStudy=async(req,res)=>{
    const {Name,Group_conversation,Field_Theme}=req.body;
    try {
        const newField=new Field_of_Study({
            Name,
            Group_conversation,
            Field_Theme
        });
        await newField.save();
        res.status(201).json(newField);
    } catch (error) {
        res.status(500).json({message:'Server error',error});
    }
};

//edit theme of field of study 
const updateFieldOfStudy=async(req,res)=>{
    const {fieldId}=req.params;
    const {Name,Group_conversation,Field_Theme}=req.body;
    try {
        const field=await Field_of_Study.findByIdAndUpdate(
            fieldId,
            {Name,Group_conversation,Field_Theme},
            {new:true}
        );
        if(!field){
            return res.status(404).json({message:'Field of study not found'});
        }
        res.status(200).json(field);
    }
    catch (error) {
        res.status(500).json({message:'Server error',error});
    }
};

module.exports={getAllFieldsOfStudy,createFieldOfStudy,updateFieldOfStudy};
