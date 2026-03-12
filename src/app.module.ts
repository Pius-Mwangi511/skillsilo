import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { SilosModule } from './silos/silos.module';
import { MessageModule } from './message/message.module';
import { CrossSiloModule } from './cross-silo/cross-silo.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    UsersModule, AuthModule, MailModule, SilosModule, MessageModule, CrossSiloModule, ConsultationsModule, CloudinaryModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
