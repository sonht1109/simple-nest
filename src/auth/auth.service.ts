import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/common/exceptions/app-error';
import { Account } from './account.entity';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/create-account';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepo: AccountRepository,
    private jwtService: JwtService,
  ) {}

  async register(accountDto: CreateAccountDto): Promise<CreateAccountDto> {
    const hashPassword = await this.hashPassword(accountDto.password);
    await this.accountRepo.save({ ...accountDto, password: hashPassword });
    return accountDto;
  }

  async authentication(username: string, password: string) {
    const account = await this.findOne(username);
    if (account) {
      if (await this.comparePassword(password, account.password)) {
        return account;
      }
    }
    throw new AppError('Invalid account');
  }

  async generateToken(payload: Account) {
    return this.jwtService.sign({
      id: payload.id,
    });
  }

  async hashPassword(password: string): Promise<any> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async findOne(username: string): Promise<Account> {
    return await this.accountRepo.findOne({ where: { username } });
  }
}
