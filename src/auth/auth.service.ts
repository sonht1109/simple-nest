import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/common/exceptions/app-error';
import { Account } from './account.entity';
import { AuthRepository } from './auth.repository';
import { CreateAccountDto } from './dto/create-account';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private readonly authRepo: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(accountDto: CreateAccountDto): Promise<string> {
    try {
      accountDto.password = await this.hashPassword(accountDto.password);
      await this.authRepo.save(accountDto);
      return 'Register successfully';
    } catch (err) {
      throw new AppError('Register fail', err);
    }
  }

  async login(accountDto: CreateAccountDto) {
    const account = await this.findOne(accountDto.username);
    if (account) {
      if (this.comparePassword(accountDto.password, account.password)) {
        return await this.generateToken(account);
      }
    }

    throw new AppError('Invalid account');
  }

  async generateToken(payload: Account) {
    return await this.jwtService.sign(payload);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async findOne(username: string): Promise<Account> {
    return await this.authRepo.findOneBy({ username });
  }
}
