import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GoogleAuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // JSON data to send
    const jsonData = {
      message: exception.message,
      statusCode: exception.getStatus(),
    };

    // Redirect to the error page with JSON data as query parameter
    response.redirect(
      `http://localhost:3000/error?data=${JSON.stringify(jsonData)}`,
    );
  }
}
