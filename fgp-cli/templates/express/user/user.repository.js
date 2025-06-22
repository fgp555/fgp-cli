let users = [];
let id = 1;

class UserRepository {
  static findAll() {
    return users;
  }

  static findOne(idSearch) {
    return users.find((u) => u.id === idSearch);
  }

  static create(data) {
    const newUser = { id: id++, ...data };
    users.push(newUser);
    return newUser;
  }

  static update(idSearch, data) {
    const index = users.findIndex((u) => u.id === idSearch);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
  }

  static remove(idSearch) {
    users = users.filter((u) => u.id !== idSearch);
  }
}

module.exports = UserRepository;
