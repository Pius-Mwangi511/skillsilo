import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.services';


@Module({
  
  
  controllers: [FeedbackController],
  providers: [FeedbackService,PrismaService,JwtService],
})
export class FeedbackModule {}