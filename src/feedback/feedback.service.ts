import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async createFeedback(userId: string, siloId: string, dto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: {
        message: dto.message,
        rating: dto.rating,
        userId,
        siloId,
      },
    });
  }

  async getSiloFeedback(siloId: string) {
    return this.prisma.feedback.findMany({
      where: { siloId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}