// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { PrismaService } from '../prisma/prisma.service';
  import * as bcrypt from 'bcrypt';
  import { LoginDto } from '../auth/dto/login.dto.ts/login.dto.ts';
  import { RegisterDto } from '../auth/dto/register.dto.ts/register.dto.ts'; 
  import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto.ts/forgot-password.dto.ts'; 
  import { ResetPasswordDto } from '../auth/dto/reset-password.dto.ts/reset-password.dto.ts';
  import { VerifyEmailDto } from '../auth/dto/verify-email.dto.ts/verify-email.dto.ts';
  import { MailService } from '../mail/mail.service';
  import { AuthToken, TokenType } from '@prisma/client'; 
  import { randomUUID } from 'crypto';
  
  @Injectable()
  export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private mailService: MailService
    ) {}
  
    async register(dto: RegisterDto) {
      const userExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (userExists) throw new BadRequestException('Email already in use');
  
      const hash = await bcrypt.hash(dto.password, 6);
  
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          password: hash
        }
      });
  
      await this.sendVerifyEmailToken(user.id, user.email);
  
      return {
        message: 'Registration successful. Please check your email to verify.',
      };
    }
  
    async login(dto: LoginDto) {
      const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (!user) throw new NotFoundException('Invalid credentials');
  
      const passwordMatch = await bcrypt.compare(dto.password, user.password);
      if (!passwordMatch) throw new ForbiddenException('Invalid credentials');
  
      const payload = { sub: user.id, role: user.role ,email: user.email };
      const token = this.jwtService.sign(payload);
  
      return { access_token: token };
    }
  
    async forgotPassword(dto: ForgotPasswordDto) {
      const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (!user) return { message: 'If that email exists, a reset link was sent.' };
  
      const token = await this.createToken(user.id, 'RESET_PASSWORD');
  
      await this.mailService.send(
        user.email,
        'Reset Password',
        `Reset your password: ${process.env.FRONTEND_URL}/reset-password/${token.token}`
      );
  
      return { message: 'If that email exists, a reset link was sent.' };
    }
  
    async resetPassword(dto: ResetPasswordDto) {
      const record = await this.validateToken(dto.token, 'RESET_PASSWORD');
      const hash = await bcrypt.hash(dto.newPassword, 10);
  
      await this.prisma.user.update({
        where: { id: record.userId },
        data: { password: hash }
      });
  
      await this.prisma.authToken.delete({ where: { id: record.id } });
  
      return { message: 'Password reset successful' };
    }
  
    async verifyEmail(dto: VerifyEmailDto) {
      const record = await this.validateToken(dto.token, 'VERIFY_EMAIL');
  
      await this.prisma.user.update({
        where: { id: record.userId },
        data: { isVerified: true }
      });
  
      await this.prisma.authToken.delete({ where: { id: record.id } });
  
      return { message: 'Email verified successfully' };
    }
  
    private async createToken(userId: string, type: TokenType): Promise<AuthToken> {
      const token = Math.floor(100000 + Math.random() * 900000).toString();

      const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
  
      return this.prisma.authToken.create({
        data: { token, userId, type, expiresAt }
      });
    }
  
    private async validateToken(token: string, type: TokenType): Promise<AuthToken> {
      const record = await this.prisma.authToken.findUnique({ where: { token } });
      if (!record || record.type !== type || record.expiresAt < new Date()) {
        throw new BadRequestException('Invalid or expired token');
      }
      return record;
    }
  
    private async sendVerifyEmailToken(userId: string, email: string) {
      const token = await this.createToken(userId, 'VERIFY_EMAIL');
      await this.mailService.send(
        email,
        'Verify Email',
        `Click to verify: ${process.env.FRONTEND_URL}/verify-email/${token.token}`
      );

      
    }
  }
  