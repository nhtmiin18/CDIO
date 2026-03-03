//const mongoose = require("mongoose");

//const internshipPostSchema = new mongoose.Schema(
//    {
//        title: {
//            type: String,
//            required: true
//        },
//        description: String,
//        company: {
//            type: mongoose.Schema.Types.ObjectId,
//            ref: "Company",
//            required: true
//        },
//        slots: {
//            type: Number,
//            default: 1
//        }
//    },
//    { timestamps: true }
//);

//module.exports = mongoose.model("InternshipPost", internshipPostSchema);
const mongoose = require("mongoose");

const internshipPostSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        slots: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("InternshipPost", internshipPostSchema);