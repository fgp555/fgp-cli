import { UserRepository } from './user.repository';

export class UserService {
  private repo = new UserRepository();

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  create(data: any) {
    return this.repo.create(data);
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
