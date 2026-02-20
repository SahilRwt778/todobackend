const express = require("express");
const authRoutes = require("./routes/authRoutes");
const AppError = require("./utils/AppError");
const globalError = require("./middlewares/globalError");
const todoRoutes = require("./routes/todoRoutes")
const cors= require("cors")
const app = express();

app.use(express.json())
app.use(cors())
app.use("/api/v1/users", authRoutes)
app.use("/api/v1/todo", todoRoutes)

app.use("/{*any}/",(req, res, next) =>{
    next(new AppError(`path not found ${req.originalUrl}`, 404));
})


app.use(globalError)



module.exports = app;