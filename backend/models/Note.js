const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            require: true
        },

        content :{
            type: String,
            require: true
        },

        user: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true

        }
    },

 {timestamps: true}
)

module.exports = mongoose.model("Note", noteSchema);