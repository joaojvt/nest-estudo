import { Module } from "@nestjs/common";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { isNickNameUniqueConstraint } from './is-nick-name-unique.validator';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    isNickNameUniqueConstraint
  ]
})
export class UserModule { }