import { EntityRepository, Repository } from 'typeorm';
import { Account } from './account.entity';

@EntityRepository(Account)
export class AuthRepository extends Repository<Account> {}
