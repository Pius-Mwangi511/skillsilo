import { Module } from '@nestjs/common';
import { PeerReviewsController } from './peer-reviews.controller';
import { PeerReviewsService } from './peer-reviews.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.services';


@Module({
  
  controllers: [PeerReviewsController],
  providers: [PeerReviewsService,PrismaService,JwtService],
})
export class PeerReviewsModule {}