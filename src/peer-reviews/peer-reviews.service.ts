import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePeerReviewDto } from './dto/create-peer-review.dto';

@Injectable()
export class PeerReviewsService {
  constructor(private prisma: PrismaService) {}

  async reviewSubmission(
    submissionId: string,
    reviewerId: string,
    dto: CreatePeerReviewDto,
  ) {
    return this.prisma.peerReview.create({
      data: {
        submissionId,
        reviewerId,
        score: dto.score,
        comment: dto.comment,
      },
    });
  }
}