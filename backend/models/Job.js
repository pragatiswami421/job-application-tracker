const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define("Job", {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    jobRole: {
        type: DataTypes.STRING,
        allowNull: false,  
     },


     location:{
       type: DataTypes.STRING,  
       allowNull: false,
     },

     appliedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
     },

     status: {
        type: DataTypes.ENUM("Applied", "Interviewing", "Offered", "Rejected"),
        defaultValue: "Applied"
     },

     salary: {
        type: DataTypes.STRING,
        allowNull: true,
     },

     jobUrl:{
        type: DataTypes.STRING,
        allowNull: true,
     },
})

module.exports = Job;