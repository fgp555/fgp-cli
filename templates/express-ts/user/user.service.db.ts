import { AppDataSource } from "../config/data-source";
import { UserEntity } from "./entities/user.entity";

export class UserService {
  private static repo = AppDataSource.getRepository(UserEntity);

  static async getAll(): Promise<UserEntity[]> {
    return this.repo.find();
  }

  static async getById(id: number): Promise<UserEntity | null> {
    return this.repo.findOneBy({ id }) || null;
  }

  static async create(data: Omit<UserEntity, "id">): Promise<UserEntity> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  static async update(id: number, data: Partial<UserEntity>): Promise<UserEntity | null> {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    const updated = this.repo.merge(user, data);
    return this.repo.save(updated);
  }

  static async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected === 1;
  }
}
