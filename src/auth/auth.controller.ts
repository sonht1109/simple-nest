import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() accountDto: CreateAccountDto) {
    return this.authService.register(accountDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: any) {
    return this.authService.generateToken(req.user);
  }
}
