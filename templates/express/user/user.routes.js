const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");

router.get("/getAll", UserController.getAll);
router.get("/getById/:id", UserController.getById);
router.post("/create", UserController.create);
router.put("/update/:id", UserController.update);
router.delete("/remove/:id", UserController.remove);

module.exports = router;
