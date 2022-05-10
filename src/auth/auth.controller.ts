import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account';
import { LoginAccountDto } from './dto/login-account';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() accountDto: CreateAccountDto) {
    return this.authService.register(accountDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginAccountDto) {
    return this.authService.login(loginDto);
  }
}
