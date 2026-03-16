import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guards';

@Controller('silos/:siloId/feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  createFeedback(
    @Param('siloId') siloId: string,
    @Body() dto: CreateFeedbackDto,
    @Req() req,
  ) {
    return this.feedbackService.createFeedback(req.user.id, siloId, dto);
  }

  @Get()
  getSiloFeedback(@Param('siloId') siloId: string) {
    return this.feedbackService.getSiloFeedback(siloId);
  }
}