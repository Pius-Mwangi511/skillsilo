import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { JwtAuthGuard } from '../auth/guards/auth.guards';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller('silos/:siloId/challenges')
@UseGuards(JwtAuthGuard)
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Post()
  create(
    @Param('siloId') siloId: string,
    @Body() dto: CreateChallengeDto,
    @Req() req,
  ) {
    return this.challengesService.createChallenge(
      siloId,
      req.user.id,
      dto,
    );
  }

  @Get()
  getChallenges(@Param('siloId') siloId: string) {
    return this.challengesService.getSiloChallenges(siloId);
  }

  @Get(':id')
  getChallenge(@Param('id') id: string) {
    return this.challengesService.getChallenge(id);
  }
}