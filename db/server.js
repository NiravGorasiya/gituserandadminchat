const { Sequelize } = require('sequelize');
const config = require("../config/config.json");

// let configInfo;
// if (process.env.NODE_ENV === "development") {
//     configInfo = config.development
// } else if (process.env.NODE_ENV === "test") {
//     configInfo = config.test
// } else {
//     configInfo = config.production
// }

const sequelize = new Sequelize(config.development);
const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established with database.")
    } catch (error) {
        console.log("Unable to connect to the database:", error)

    }
}

module.exports = dbConnection;