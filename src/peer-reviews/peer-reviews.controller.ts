import {
  Controller,
  Post,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PeerReviewsService } from './peer-reviews.service';
import { JwtAuthGuard } from '../auth/guards/auth.guards';
import { CreatePeerReviewDto } from './dto/create-peer-review.dto';

@Controller('submissions/:submissionId/reviews')
@UseGuards(JwtAuthGuard)
export class PeerReviewsController {
  constructor(private peerReviewsService: PeerReviewsService) {}

  @Post()
  review(
    @Param('submissionId') submissionId: string,
    @Body() dto: CreatePeerReviewDto,
    @Req() req,
  ) {
    return this.peerReviewsService.reviewSubmission(
      submissionId,
      req.user.id,
      dto,
    );
  }
}