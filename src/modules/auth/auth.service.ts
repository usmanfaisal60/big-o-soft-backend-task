import { ConflictException, GoneException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create.dto";
import { Users } from "../../common/database/models/users.model";
import * as bcrypt from 'bcrypt';
import { EMAIL_ALREADY_EXISTS } from "src/common/constants/errors";

const saltOrRounds = 10;
@Injectable()
export class AuthService {
  public async registerUser(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const user = await Users.create({
        email: createUserDto.email,
        password: createUserDto.password,
      }, { returning: true });

      await user.createApplication({
        linkedInUrl: createUserDto.linkedInUrl,
      });

      return {
        success: true
      };
    } catch (e) {
      throw new ConflictException(EMAIL_ALREADY_EXISTS);
    }
  }
}