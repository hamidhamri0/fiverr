import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  private handleValidationErrors(
    errors: ValidationError[],
  ): Record<string, any> {
    return errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints);
      return acc;
    }, {});
  }

  private isValidationError(exception: unknown): boolean {
    return (
      Array.isArray(exception) &&
      exception.every((item) => typeof item == 'string')
    );
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = null;
    let stack = exception.toString();

    console.log(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      details = exception.getResponse();
      if (this.isValidationError(details.message)) {
        const validationErrors = (details as any).message;
        message = validationErrors;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message =
        this.configService.get('NODE_ENV') === 'production'
          ? 'Internal server error'
          : exception instanceof Error
            ? exception.message
            : String(exception);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(this.configService.get('NODE_ENV') === 'development' && {
        details,
        stack,
      }),
      message: message,
    });
  }
}
