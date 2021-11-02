import { Injectable } from "@nestjs/common"
import { User } from "./user.entity";

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      nickName: 'joaojvt',
      email: 'joao@teste.com',
      name: 'joao vitor',
      password: '14134123',
      createdAt: new Date().toDateString()
    }
  ]

  public findAll(): User[] {
    return this.users;
  }

  public store(user: User): User {
    this.users.push(user)
    return user
  }

  public findByNickName(nickName: string): User[] {
    return this.users.filter(user => user.nickName === nickName)
  }

  findByID(id: number): User {
    return this.users.find(user => user.id === id)
  }

}