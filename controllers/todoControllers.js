const Todo = require("../models/todoSchema");
const catchAsync = require("../utils/catchAsync");

exports.AddTask=catchAsync(async(req,res,next)=>{
     const todo = await Todo.create({
    ...req.body,
    user: req.user.id
  });
  res.json(todo);
})


exports.getTasks=catchAsync(async(req,res,next)=>{

    const { page = 1, limit = 5, search = "" } = req.query;

  const query = {
    user: req.user.id,
    title: { $regex: search, $options: "i" }
  };

  const todos = await Todo.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Todo.countDocuments(query);

  res.status(200).json({ todos, total });

})

exports.updateTask=catchAsync(async(req,res,next)=>{
    const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );

  res.status(200).json(todo);
})


exports.deleteTask=catchAsync(async(req,res,next)=>{

    await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  res.status(200).json({ message: "Deleted" });

})

exports.markAll=catchAsync(async (req,res,next)=>{
    await Todo.updateMany(
    { user: req.user.id },
    { isCompleted: true }
  );
  res.status(200).json({ message: "All marked completed" });
})