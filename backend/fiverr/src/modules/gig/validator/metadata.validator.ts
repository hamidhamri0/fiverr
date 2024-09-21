import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMetadata', async: false })
export class IsMetadata implements ValidatorConstraintInterface {
  private errors: string[] = []; // Array to store multiple error messages
  validate(value: any, args: ValidationArguments) {
    // Check if value is an object and not null
    if (typeof value !== 'object' || value === null) {
      this.errors.push('Metadata must be a non-null object');
    } else {
      let keys = Object.keys(value);
      let values = Object.values(value);

      // Check if all keys are numbers
      let allKeysAreNumbers = keys.every((key) => !isNaN(Number(key)));
      if (!allKeysAreNumbers) {
        this.errors.push('metadata ids must be numbers');
      }

      // Check if all values are either numbers or arrays of numbers
      console.log(value);
      values.forEach((val) => {
        if (!Array.isArray(val) && typeof val !== 'number') {
          this.errors.push(
            'metadataTags must be a number or a list of numbers',
          );
          return false;
        }

        if (Array.isArray(val)) {
          // Check if the array has more than 3 elements
          if (val.length > 3) {
            this.errors.push('You should not select more than 3 items');
            return false;
          }

          // Check if all elements in the array are numbers
          let allElementsAreNumbers = val.every((id) => typeof id === 'number');
          if (!allElementsAreNumbers) {
            this.errors.push('metadataTags must only contain numbers Ids');
          }
          return true;
        }

        return typeof val === 'number';
      });
    }

    // Store the accumulated errors in args
    console.log(this.errors, 'ERROR');
    if (this.errors.length > 0) {
      return false;
    }

    return true; // Passed all validations
  }
  defaultMessage(args: ValidationArguments) {
    return this.errors ? this.errors.join(', ') : `${args.property} Invalid`;
  }
}

export function isMetadata(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMetadata',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsMetadata,
    });
  };
}
