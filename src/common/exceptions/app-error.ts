import { HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(response: string | Record<string, any>, code: number) {
    super(response, code);
  }
}
