const auth = require("../middlewares/auth")
const todoControllers = require("../controllers/todoControllers")
const router =  require("express").Router()


router.post("/add_task", auth ,todoControllers.AddTask);

router.get("/get_task",auth, todoControllers.getTasks);

router.put("/update_task",auth, todoControllers.updateTask)

router.delete("/delete_task", auth, todoControllers.deleteTask)

router.put("/mark_all",auth, todoControllers.markAll)


module.exports =router;