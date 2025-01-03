const { Router } = require("express");
const { task1Controller, getTask1Data } = require("../controllers/Task1");
const { task2Controller, task2getData } = require("../controllers/Task2");
const router = Router();


// Task 1 routes
router.route("/add-task1").post(task1Controller);
router.route("/get-task1").get(getTask1Data);

// Task 2 routes
router.route("/add-task2").post(task2Controller); 
router.route("/get-task2").get(task2getData);

module.exports = router;
