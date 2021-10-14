const express = require('express');
const app = new express();

const studentRoute = require('./routes/student');
const courseRoute = require('./routes/course');
const assignmentRoute = require('./routes/assignment');

app.use(express.json({ limit: '5mb', extended: true }));

app.post('/student', studentRoute.addNewStudent);
app.get('/student', studentRoute.getAllStudents);
app.get('/student/:id', studentRoute.getOneStudent);

app.post('/course', courseRoute.addCourse);
app.get('/course', courseRoute.getAllCourses);
app.get('/course/:id', courseRoute.getOneCourse);

app.post('/assignment', assignmentRoute.addAssignment);
app.get('/assignment/student/:id', assignmentRoute.getAssignmentsByStudent);
app.get('/assignment/course/:id', assignmentRoute.getAssignmentsByCourse);

module.exports = app
