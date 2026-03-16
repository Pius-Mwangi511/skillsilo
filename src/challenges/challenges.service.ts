import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async createChallenge(
    siloId: string,
    userId: string,
    dto: CreateChallengeDto,
  ) {
    return this.prisma.challenge.create({
      data: {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        siloId,
        createdBy: userId,
      },
    });
  }

  async getSiloChallenges(siloId: string) {
    return this.prisma.challenge.findMany({
      where: { siloId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getChallenge(id: string) {
    return this.prisma.challenge.findUnique({
      where: { id },
      include: {
        submissions: true,
      },
    });
  }
}