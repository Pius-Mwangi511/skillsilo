import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../auth/dto/login.dto.ts/login.dto.ts';
import { RegisterDto } from '../auth/dto/register.dto.ts/register.dto.ts'; 
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto.ts/forgot-password.dto.ts'; 
import { ResetPasswordDto } from '../auth/dto/reset-password.dto.ts/reset-password.dto.ts';
import { VerifyEmailDto } from '../auth/dto/verify-email.dto.ts/verify-email.dto.ts';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }
}


