import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.services';


@Module({
  // imports: [PrismaService],
  controllers: [ChallengesController],
  providers: [ChallengesService,PrismaService,JwtService],
})
export class ChallengesModule {}