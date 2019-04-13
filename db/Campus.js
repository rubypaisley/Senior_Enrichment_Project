const Sequelize = require('sequelize');
const db = require('./db');

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://lh5.googleusercontent.com/p/AF1QipPIZLy6k-hclcODfoIu4O1wz6VHCOH8_M13rYWY=w213-h160-k-no',

    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT
    }
});

module.exports = Campus
