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
import { ChallengesModule } from './challenges/challenges.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { PeerReviewsModule } from './peer-reviews/peer-reviews.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NotificationsModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    UsersModule, AuthModule, MailModule, SilosModule, MessageModule, CrossSiloModule, ConsultationsModule, CloudinaryModule, ResourcesModule, ChallengesModule, SubmissionsModule, PeerReviewsModule, FeedbackModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
