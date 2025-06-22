type User = { id: number; name: string; email: string };

export class UserRepository {
  private users: User[] = [];
  private id = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  create(data: Omit<User, 'id'>): User {
    const user = { id: this.id++, ...data };
    this.users.push(user);
    return user;
  }

  update(id: number, data: Partial<User>): User | undefined {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  remove(id: number): boolean {
    const before = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < before;
  }
}
