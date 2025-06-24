import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  static findAll(req: Request, res: Response): void {
    const users = UserService.findAll();
    res.json(users);
  }

  static findOne(req: Request, res: Response): void {
    const user = UserService.findOne(Number(req.params.id));
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.json(user);
  }

  static create(req: Request, res: Response): void {
    const user = UserService.create(req.body);
    res.status(201).json(user);
  }

  static update(req: Request, res: Response): void {
    const user = UserService.update(Number(req.params.id), req.body);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.json(user);
  }

  static remove(req: Request, res: Response): void {
    UserService.remove(Number(req.params.id));
    res.json({ msg: "User deleted" });
  }
}
