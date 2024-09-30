import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsNumericStringObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNumericStringObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'object' || value === null) {
            return false;
          }
          return Object.keys(value).every((key) => {
            return !isNaN(Number(key)) && typeof value[key] === 'string';
          });
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an object with numeric keys and string values`;
        },
      },
    });
  };
}
