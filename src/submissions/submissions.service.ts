import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async submitChallenge(
    challengeId: string,
    userId: string,
    dto: CreateSubmissionDto,
  ) {
    return this.prisma.submission.create({
      data: {
        challengeId,
        userId,
        content: dto.content,
        resourceUrl: dto.resourceUrl,
      },
    });
  }

  async getChallengeSubmissions(challengeId: string) {
    return this.prisma.submission.findMany({
      where: { challengeId },
      include: {
        user: true,
        reviews: true,
      },
    });
  }
}