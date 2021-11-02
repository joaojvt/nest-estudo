import { Exclude } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { IsNickNameExist } from "./is-nick-name-unique.validator"

export class User {
  id: number

  @IsNotEmpty()
  @IsString()
  @IsNickNameExist()
  nickName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsNotEmpty()
  @MinLength(3)
  name: string

  createdAt?: string
}