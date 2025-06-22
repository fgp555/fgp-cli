const UserRepository = require("./user.repository");

class UserService {
  static findAll() {
    return UserRepository.findAll();
  }

  static findOne(id) {
    return UserRepository.findOne(id);
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
