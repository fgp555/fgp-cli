const UserRepository = require("./user.repository");

class UserService {
  static getAll() {
    return UserRepository.getAll();
  }

  static getById(id) {
    return UserRepository.getById(id);
  }

  static create(data) {
    return UserRepository.create(data);
  }

  static update(id, data) {
    return UserRepository.update(id, data);
  }

  static remove(id) {
    return UserRepository.remove(id);
  }
}

module.exports = UserService;
