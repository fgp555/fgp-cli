const UserService = require("./user.service");

class UserController {
  static findAll(req, res) {
    const users = UserService.findAll();
    res.json(users);
  }

  static findOne(req, res) {
    const user = UserService.findOne(Number(req.params.id));
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
