import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
  
  export class ValidationException extends HttpException {
    name = 'ValidationException';
  }
    
  @Catch()
  export class HttpExceptions implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: any, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      if (exception instanceof ValidationException) {
        const exceptionResponse = exception.getResponse();
  
        const responseBody = {
          success: false,
          message: 'Validation failed',
          errors: exceptionResponse, // Assuming it's an array of validation errors
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      } else {
        const responseBody = {
          success: false,
          message: exception.message || 'Internal server error',
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      }
    }
  }
  