import { Module } from '@nestjs/common';
import { CrossSiloService } from './cross-silo.service';
import { CrossSiloController } from './cross-silo.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.services';

@Module({
  controllers: [CrossSiloController],
  providers: [CrossSiloService,PrismaService,JwtService],
})
export class CrossSiloModule {}
