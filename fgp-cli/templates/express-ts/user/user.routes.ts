import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/findAll", UserController.findAll);
router.get("/findOne/:id", UserController.findOne);
router.post("/create", UserController.create);
router.put("/update/:id", UserController.update);
router.delete("/remove/:id", UserController.remove);

export default router;
