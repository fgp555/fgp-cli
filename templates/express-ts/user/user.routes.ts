import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/getAll", UserController.getAll);
router.get("/getById/:id", UserController.getById);
router.post("/create", UserController.create);
router.put("/update/:id", UserController.update);
router.delete("/remove/:id", UserController.remove);

export default router;
