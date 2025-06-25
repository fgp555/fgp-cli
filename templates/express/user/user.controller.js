const UserService = require("./user.service");

class UserController {
  static getAll(req, res) {
    const users = UserService.getAll();
    res.json(users);
  }

  static getById(req, res) {
    const user = UserService.getById(Number(req.params.id));
    if (!user) return res.status(404).json({ msg: "No encontrado" });
    res.json(user);
  }

  static create(req, res) {
    const user = UserService.create(req.body);
    res.status(201).json(user);
  }

  static update(req, res) {
    const user = UserService.update(Number(req.params.id), req.body);
    if (!user) return res.status(404).json({ msg: "No encontrado" });
    res.json(user);
  }

  static remove(req, res) {
    UserService.remove(Number(req.params.id));
    res.json({ msg: "Eliminado" });
  }
}

module.exports = UserController;
