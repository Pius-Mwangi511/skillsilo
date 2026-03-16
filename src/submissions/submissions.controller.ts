import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../auth/guards/auth.guards';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('challenges/:challengeId/submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private submissionsService: SubmissionsService) {}

  @Post()
  submit(
    @Param('challengeId') challengeId: string,
    @Body() dto: CreateSubmissionDto,
    @Req() req,
  ) {
    return this.submissionsService.submitChallenge(
      challengeId,
      req.user.id,
      dto,
    );
  }

  @Get()
  getSubmissions(@Param('challengeId') challengeId: string) {
    return this.submissionsService.getChallengeSubmissions(challengeId);
  }
}