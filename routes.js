const express = require('express');
const app = new express();

const studentRoute = require('./routes/student')

app.use(express.json({ limit: '5mb', extended: true }));

app.post('/student', studentRoute.addNewStudent);

module.exports = app
