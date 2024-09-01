import { HttpException, HttpStatus } from '@nestjs/common';

export class Response<T> {
  message?: string;
  data?: T;
  success: boolean;
  status_code: HttpStatus;

  private constructor(
    success: boolean,
    status_code: HttpStatus,
    message?: string,
    data?: T,
  ) {
    this.success = success;
    this.status_code =
      status_code || (success ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    this.message = message;

    if (data !== null && data !== undefined) {
      this.data = data;
    }
  }

  static success<T>(
    data?: T,
    message?: string,
    status_code?: HttpStatus,
  ): Response<T> {
    return new Response(true, status_code, message, data);
  }

  static error<T>(message: string, status_code?: HttpStatus): Response<T> {
    throw new HttpException({ status_code, message }, status_code);
  }
}
