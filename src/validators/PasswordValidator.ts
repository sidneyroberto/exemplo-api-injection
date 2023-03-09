import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'passwordValidator' })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(
    password: string,
    args?: ValidationArguments
  ): boolean | Promise<boolean> {
    const result: boolean =
      password != null &&
      password != undefined &&
      password.length >= 8 &&
      /[A-Z]/g.test(password) &&
      /[0-9]/g.test(password)

    return result
  }

  defaultMessage(args?: ValidationArguments): string {
    return 'Password must contain at least 8 characters, 1 uppercase character, and 1 digit'
  }
}
