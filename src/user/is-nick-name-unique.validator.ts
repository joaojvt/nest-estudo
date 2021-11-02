import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint()
export class isNickNameUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private useService: UserService) { }
  validate(nickName: string, validationArguments?: ValidationArguments): boolean {
    return !this.useService.findByNickName(nickName)?.length
  }

  defaultMessage(): string {
    return 'Campo nickName deve ser unico'
  }
}

export function IsNickNameExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: isNickNameUniqueConstraint,
    });
  };
}