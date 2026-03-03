//const mongoose = require("mongoose");

//const companySchema = new mongoose.Schema(
//    {
//        name: String,
//        address: String,
//        description: String
//    },
//    { timestamps: true }
//);

//module.exports = mongoose.model("Company", companySchema);
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: String,
        address: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);