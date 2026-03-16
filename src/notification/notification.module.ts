import { Module } from '@nestjs/common';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service'
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.services';

@Module({
  
  
  controllers: [NotificationsController],
  providers: [NotificationsService,PrismaService,JwtService],
  exports: [NotificationsService],
})
export class NotificationsModule {}