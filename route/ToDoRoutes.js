const express = require("express");
const {createToDo} = require("../controllers/ToDoController");
const router = express.Router();


router.post('/create-to-do',createToDo);



module.exports = router;