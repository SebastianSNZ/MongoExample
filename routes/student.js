const db = require('../config/db');

const addNewStudent = async (req, res) => {
    const data = req.body;
    try {
        data['assignmets'] = [];
        let collection = db.get().db('conference').collection('student');
        let result = await collection.insertOne(data);
        data['_id'] = result.insertedId;
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err });
    }
};

module.exports = { addNewStudent };