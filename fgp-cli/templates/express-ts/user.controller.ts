import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService = new UserService();

  findAll(req: Request, res: Response) {
    res.json(this.userService.findAll());
  }

  findOne(req: Request, res: Response) {
    const user = this.userService.findOne(Number(req.params.id));
    if (!user) return res.status(404).json({ msg: 'No encontrado' });
    res.json(user);
  }

  create(req: Request, res: Response) {
    const user = this.userService.create(req.body);
    res.status(201).json(user);
  }

  update(req: Request, res: Response) {
    const updated = this.userService.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ msg: 'No encontrado' });
    res.json(updated);
  }

  remove(req: Request, res: Response) {
    const deleted = this.userService.remove(Number(req.params.id));
    res.json({ msg: deleted ? 'Eliminado' : 'No encontrado' });
  }
}
