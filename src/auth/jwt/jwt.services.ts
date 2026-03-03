import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

@Injectable()
export class JwtService {
  private readonly secret: jwt.Secret;
  private readonly expiresIn: string | number;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('JWT_SECRET') ?? 'default-secret';
    this.expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') ?? '24h';
  }

  generateToken(payload: JwtPayload, expiresIn?: string | number): string {
    return jwt.sign(payload, this.secret, {
        expiresIn: (expiresIn ?? this.expiresIn) as jwt.SignOptions['expiresIn'],
      });
      
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  decodeToken(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }

  extractTokenFromHeader(authHeader?: string): string {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    return token;
  }
}
