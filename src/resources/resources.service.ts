import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ResourcesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async uploadResource(
    title: string,
    siloId: string,
    userId: string,
    file: Express.Multer.File,
  ) {
  
    if (!file) {
      throw new BadRequestException('File upload failed. No file received.');
    }
  
    const uploadResult: any = await this.cloudinary.uploadFile(file);
  
    return this.prisma.resource.create({
      data: {
        title,
        fileUrl: uploadResult.secure_url,
        fileType: uploadResult.resource_type,
        siloId,
        userId,
      },
    });
  }

  async getSiloResources(siloId: string) {
    return this.prisma.resource.findMany({
      where: { siloId },
      orderBy: { createdAt: 'desc' },
    });
  }
}