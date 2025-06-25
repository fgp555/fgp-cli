import { UserRepository } from "./user.repository";
import type { User } from "./types/user.types";

export class UserService {
  static getAll(): User[] {
    return UserRepository.getAll();
  }

  static getById(id: number): User | undefined {
    return UserRepository.getById(id);
  }

  static create(data: Omit<User, "id">): User {
    return UserRepository.create(data);
  }

  static update(id: number, data: Partial<User>): User | null {
    return UserRepository.update(id, data);
  }

  static remove(id: number): void {
    UserRepository.remove(id);
  }
}
