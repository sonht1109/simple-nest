import { Body, Controller, Post } from '@nestjs/common';
import { PublicRoute } from 'src/common/decorators/auth';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @PublicRoute()
  register(@Body() accountDto: CreateAccountDto) {
    return this.authService.register(accountDto);
  }
}
