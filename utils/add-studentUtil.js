const Student = require('../models/Student');
const fs = require('fs').promises;
const mongoose = require('mongoose');

const multer  = require('multer');

async function addStudent(req, res) {
    try {
        const { adminNumber, name, diploma, cGPA, image } = req.body;
        console.log(req.body);
        console.log(req.file);

        const storage = multer.diskStorage({
            destination:function(req,file,cb){
                return cb(null,'./uploads/')
            },
            filename:function (req, file, cb) {
                return cb(null,`${Date.now()}-${file.originalname}}`)
            }
        });

        const upload = multer({ storage: storage })

        const cGPADecimal = mongoose.Types.Decimal128.fromString(cGPA.toString());

        const newStudent = new Student({ adminNumber, name, diploma, cGPA: cGPADecimal, image });
        const savedStudent = await newStudent.save();

        return res.status(201).json(savedStudent);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addStudent
};