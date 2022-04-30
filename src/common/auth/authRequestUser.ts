import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/common/database/models/users.model';

export const AuthUser = createParamDecorator(
  (data, req: ExecutionContext): Users => {
    return req.switchToHttp().getRequest().user;
  },
);
