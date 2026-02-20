const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is Required"] },
    description: String,
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
});


const Todo = mongoose.model( "Todo", todoSchema)

module.exports = Todo;