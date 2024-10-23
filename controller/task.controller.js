//기능만 모아두기

const Task = require("../model/Task");

const taskController = {};

// create
taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const {userId} = req;
    const newTask = new Task({ task, isComplete, author:userId});
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "post fail", error: err });
  }
};

//get
taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).populate("author"); //mongoose.populate "조인"과 같은 기능
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "get fail", error: err });
  }
};

//update
taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    //id가 존재x
    if(!task){
        throw new Error("App can not find the task");
    }

    //isComplete 변경

    // if(task.isComplete){
    //     task.isComplete = false;
    // }else{
    //     task.isComplete = true;
    // }

    task.isComplete = !task.isComplete;
    
    //요청 본문에 있는 필드를 업데이트?
    const fields = Object.keys(req.body);
    fields.map((item)=> (task[item] = req.body[item]));
    await task.save();

    res.status(200).json({ status: "update success", data: task });
  } catch (err) {
    res.status(400).json({ status: "update fail", error: err });
  }
};


//delete
taskController.deleteTask = async (req, res) => {
  try {
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "delete success", data: deleteItem });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
