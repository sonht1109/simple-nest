import { SetMetadata } from '@nestjs/common';
import { EnumRole } from '../enum/role.enum';

export const ROLE_KEY = 'ROLES';

export const Roles = (...roles: EnumRole[]) => SetMetadata(ROLE_KEY, roles);
