import type { User } from "./types/user.types";

let users: User[] = [];
let id = 1;

export class UserRepository {
  static getAll(): User[] {
    return users;
  }

  static getById(idSearch: number): User | undefined {
    return users.find((u) => u.id === idSearch);
  }

  static create(data: Omit<User, "id">): User {
    const newUser: User = { id: id++, ...data };
    users.push(newUser);
    return newUser;
  }

  static update(idSearch: number, data: Partial<User>): User | null {
    const index = users.findIndex((u) => u.id === idSearch);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
  }

  static remove(idSearch: number): void {
    users = users.filter((u) => u.id !== idSearch);
  }
}
