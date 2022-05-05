import { HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(public code: string, public data?: Record<string, unknown>) {
    super('AppError', null);
  }
}
