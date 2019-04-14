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
                    imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPIZLy6k-hclcODfoIu4O1wz6VHCOH8_M13rYWY=w213-h160-k-no',
                    description: 'Rutgers University – New Brunswick in New Jersey is the oldest campus of Rutgers University, the others being in Camden and Newark. It is primarily located in New Brunswick and Piscataway.'
                }),
                Campus.create({
                    name: 'Jersey City University',
                    address: 'Jersey City, NJ',
                    imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipOkhYHQS6B4TqpXdz7fSzAdG0d_Fvx0PZXtAezN=w213-h160-k-no',
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
                    imageUrl: 'data:image/jpeg;base64,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',
                    campusId: Rutgers.id
                }),
                Student.create({
                    firstName: 'Louise',
                    lastName: 'Belcher',
                    email: 'lbelcher@college.edu',
                    gpa: 3.1,
                    imageUrl: 'data:image/jpeg;base64,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',
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
