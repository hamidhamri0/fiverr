import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function ArraySize(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'arraySize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          if (object.type.genre !== 'multiple') {
            return true; // Skip validation if genre is not "multiple"
          }
          return (
            Array.isArray(value) && value.length >= 2 && value.length <= 10
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'Answer array size must be between 2 and 10 when genre is "multiple"';
        },
      },
    });
  };
}
