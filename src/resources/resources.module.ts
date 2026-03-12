import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { JwtService } from 'src/auth/jwt/jwt.services';

@Module({
  imports: [CloudinaryModule],
  controllers: [ResourcesController],
  providers: [ResourcesService, PrismaService,JwtService],
})
export class ResourcesModule {}