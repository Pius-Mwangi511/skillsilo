import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SiloController } from './silos.controller';
import { MembershipController } from './membership/membership.controller';
import { SiloService } from './silos.service';
import { MembershipService } from './membership/membership.service';
import { JwtService } from 'src/auth/jwt/jwt.services';

@Module({
  controllers: [SiloController, MembershipController],
  providers: [SiloService, MembershipService, PrismaService,JwtService],
})
export class SilosModule {}
