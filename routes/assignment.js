const db = require('../config/db');
var ObjectId = require("mongodb").ObjectId;

const addAssignment = async (req, res) => {
    const data = req.body;
    try {
        let studentCollection = db.get().db('conference').collection('student');
        let courseCollection = db.get().db('conference').collection('course');
        let student = await studentCollection.findOne({ _id: new ObjectId(data.student) });
        let course = await courseCollection.findOne({ _id: new ObjectId(data.course) });
        if (!student || !course) {
            res.status(400).json({ 'error': 'Incorrect data.' });
            return
        }
        let result = await studentCollection.findOneAndUpdate({ _id: new ObjectId(data.student) },
            { $addToSet: { assignments: data.course } },
            { returnOriginal: false, }
        );
        res.json(result.value);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
};

const getAssignmentsByCourse = async (req, res) => {
    let id = req.params.id;
    try {
        let studentCollection = db.get().db('conference').collection('student');
        let courseCollection = db.get().db('conference').collection('course');
        let course = await courseCollection.findOne({ _id: new ObjectId(id) });
        if (!course) {
            res.status(400).json({ 'error': 'Incorrect data.' });
            return
        }
        let result = await studentCollection.find({ assignments: id }).toArray();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
};


const getAssignmentsByStudent = async (req, res) => {
    let resultArray = []
    let id = req.params.id;
    try {
        let studentCollection = db.get().db('conference').collection('student');
        let courseCollection = db.get().db('conference').collection('course');
        let student = await studentCollection.findOne({ _id: new ObjectId(id) });
        if (!student) {
            res.status(400).json({ 'error': 'Incorrect data.' });
            return
        }
        for (var i = 0; i < student.assignments.length; i++) {
            let course = await courseCollection.findOne({ _id: new ObjectId(student.assignments[i]) });
            resultArray.push(course);
        }
        res.json(resultArray);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
};



module.exports = { addAssignment, getAssignmentsByStudent, getAssignmentsByCourse };