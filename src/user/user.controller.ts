import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Res } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from './user.service';
import { NestResponse } from '../core/http/nest-reponse';
import { NestResponseBuilder } from "src/core/http/nest-response-builder";

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  public findAll(): User[] {
    return this.userService.findAll()
  }

  @Get()
  public findByNickName(@Query('nickname') nickName: string): User[] {
    const user = this.userService.findByNickName(nickName)
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User Not Found'
      })
    }
    return user
  }

  @Get(':id')
  public findByID(@Param('id') id: number): User {
    const user = this.userService.findByID(id)
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User Not Found'
      })
    }
    return user
  }

  @Post()
  public store(@Body() user: User): NestResponse {
    const userCreated = this.userService.store(user)

    return new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        'Location': `users/${userCreated.id}`
      })
      .setBody(userCreated)
      .build()

  }
}