import { UserRepository } from "./user.repository";
import type { User } from "./types/user.types";

export class UserService {
  static findAll(): User[] {
    return UserRepository.findAll();
  }

  static findOne(id: number): User | undefined {
    return UserRepository.findOne(id);
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
