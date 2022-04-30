import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/auth/public.meta';
import { CreateUserDto } from '../users/dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UseInterceptors(FileInterceptor('coverLetter'))
  public create(@Body() createUserDto: CreateUserDto, @UploadedFile("coverLetter") coverLetter: Express.Multer.File) {

    return this.authService.registerUser(createUserDto);
  }

}
