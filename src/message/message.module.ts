import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.services';

@Module({
  controllers: [MessageController],
  providers: [MessageService,PrismaService,JwtService],
})
export class MessageModule {}
