import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/common/constants/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { Users } from '../../../common/database/models/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { id: string, sessionToken: string }) {
    const user = await Users.findByPk(payload.id);
    if (!user) throw new UnauthorizedException();
    const _user = user.toJSON();
    delete _user["password"];
    return _user;
  }
}