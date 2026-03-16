import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.services';


@Module({

  controllers: [SubmissionsController],
  providers: [SubmissionsService,PrismaService,JwtService],
})
export class SubmissionsModule {}