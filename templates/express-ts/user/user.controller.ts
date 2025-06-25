import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getById(Number(req.params.id));
      if (!user) {
        res.status(404).json({ msg: "User not found" });
        return;
      }
      res.json(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.update(Number(req.params.id), req.body);
      if (!user) {
        res.status(404).json({ msg: "User not found" });
        return;
      }
      res.json(user);
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async remove(req: Request, res: Response): Promise<void> {
    try {
      await UserService.remove(Number(req.params.id));
      res.json({ msg: "User deleted" });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
