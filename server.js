const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/index').syncAndSeed;
const { Student, Campus } = require('./db/index').Models;

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/students', (req, res, next) => {
    Student.findAll()
        .then((students) => res.send(students))
        .catch(next)
})

app.get('/api/campuses', (req, res, next) => {
    Campus.findAll()
        .then((campuses) => res.send(campuses))
        .catch(next)
})

app.get('/api/campus/:id', (req, res, next) => {
    Campus.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Student
        }
    })
        .then(campus => res.send(campus))
        .catch(next)
})

app.get('/api/student/:id', (req, res, next) => {
    Student.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Campus
        }
    })
        .then(student => res.send(student))
        .catch(next)
})

app.post('/api/students', (req, res, next) => {
    Student.create(req.body)
        .then(student => res.send(student))
        .catch(next)
})

app.post('/api/campuses', (req, res, next) => {
    Campus.create(req.body)
        .then(campus => res.send(campus))
        .catch(next)
})

app.delete('/api/campus/:id', (req, res, next) => {
    Campus.findByPk(req.params.id)
        .then((campus) => campus.destroy())
        .then(() => res.sendStatus(204))
        .catch(next)
})

app.delete('/api/student/:id', (req, res, next) => {
    Student.findByPk(req.params.id)
        .then((student) => student.destroy())
        .then(() => res.sendStatus(204))
        .catch(next)
})


syncAndSeed()
    .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))

