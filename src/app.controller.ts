import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cat/cat.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(forwardRef(() => CatsService)) private catsServices: CatsService,
  ) {}

  @Get()
  get(): string {
    return this.catsServices.catCrossMethod();
  }
}
