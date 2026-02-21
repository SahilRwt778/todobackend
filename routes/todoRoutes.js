const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const todoControllers = require("../controllers/todoControllers");

// Get all todos
router.get("/", auth, todoControllers.getTasks);

// Create a todo
router.post("/", auth, todoControllers.AddTask);

// Update a specific todo
router.put("/:id", auth, todoControllers.updateTask);

// Delete a specific todo
router.delete("/:id", auth, todoControllers.deleteTask);

// get a single task
router.get("/:id", todoControllers.getSingleTask);
// Mark all todos
router.patch("/mark-all", auth, todoControllers.markAll);

module.exports = router;