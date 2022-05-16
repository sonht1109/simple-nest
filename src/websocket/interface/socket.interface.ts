import { Socket } from 'socket.io';
import { Account } from 'src/auth/account.entity';

export type SocketWithAccount = Socket & { account: Account };
