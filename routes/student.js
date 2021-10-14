const db = require('../config/db');
var ObjectId = require("mongodb").ObjectId;

const addNewStudent = async (req, res) => {
    const data = req.body;
    try {
        data['assignments'] = [];
        let collection = db.get().db('conference').collection('student');
        let result = await collection.insertOne(data);
        data['_id'] = result.insertedId;
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        let collection = db.get().db('conference').collection('student');
        let result = await collection.find().toArray();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
};

const getOneStudent = async (req, res) => {
    let id = req.params.id;
    try {
        let collection = db.get().db('conference').collection('student');
        let result = await collection.find({ _id: new ObjectId(id) }).toArray();
        if (result.length) {
            res.json(result[0]);
        } else {
            res.status(400).json({'error' : 'Student not found.'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
};


module.exports = { addNewStudent, getAllStudents, getOneStudent };