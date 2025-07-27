const express = require('express');
const { addExp, getAllExp, getExp, updateExp, deleteExp } = require('../controller/expController.js');

const router = express.Router();

router.post("/add",addExp);
router.get("/get", getAllExp);
router.get("/get/:id",getExp);
router.put("/update/:id", updateExp);
router.delete("/delete/:id", deleteExp);

module.exports = router;