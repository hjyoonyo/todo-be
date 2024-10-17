const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
    },
    { timestamps:true }
);

//모델 만들기
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
