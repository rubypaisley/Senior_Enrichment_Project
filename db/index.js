const db = require('./db');
const Campus = require('./Campus');
const Student = require('./Student');
const Sequelize = require('sequelize')

Campus.hasMany(Student);
Student.belongsTo(Campus);

const syncAndSeed = () => {
    return db.sync({ force: true })
        .then(() => {
            return Promise.all([
                Campus.create({
                    name: 'Rutgers',
                    address: 'New Brunswick, NJ',
                    description: 'Rutgers University – New Brunswick in New Jersey is the oldest campus of Rutgers University, the others being in Camden and Newark. It is primarily located in New Brunswick and Piscataway.'
                }),
                Campus.create({
                    name: 'Jersey City University',
                    address: 'Jersey City, NJ',
                    description: 'New Jersey City University is a public liberal arts university in Jersey City, New Jersey. Chartered in 1927, it opened in 1929 as the New Jersey State Normal School at Jersey City. Today consists of the NJCU School of Business, College of Arts and Sciences, College of Education, and College of Professional Studies.'
                })
            ])
        })
        .then(([Rutgers, JCU]) => {
            return Promise.all([
                Student.create({
                    firstName: 'Tina',
                    lastName: 'Belcher',
                    email: 'tbelcher@college.edu',
                    gpa: 3.6,
                    campusId: Rutgers.id
                }),
                Student.create({
                    firstName: 'Louise',
                    lastName: 'Belcher',
                    email: 'lbelcher@college.edu',
                    gpa: 3.1,
                    campusId: Rutgers.id
                }),
                Student.create({
                    firstName: 'Lisa',
                    lastName: 'Simpson',
                    email: 'lsimpson@college.edu',
                    gpa: 3.99,
                    campusId: JCU.id
                }),
                Student.create({
                    firstName: 'Bart',
                    lastName: 'Simpson',
                    email: 'bsimpson@college.edu',
                    gpa: 2.2,
                    campusId: JCU.id
                })
            ])
        })
        .then(students => console.log(students))
        .catch(error => console.log('error seeding data' + error))
}

module.exports = {
    Models: {
        Campus,
        Student
    },
    syncAndSeed
}
