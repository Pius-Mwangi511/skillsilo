import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guards'

@Controller('silos')
@UseGuards(JwtAuthGuard)
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post(':id/join')
  join(@Param('id') siloId: string, @Req() req) {
    return this.membershipService.joinSilo(siloId, req.user.id);
  }

  @Patch(':id/leave')
  leave(@Param('id') siloId: string, @Req() req) {
    return this.membershipService.leaveSilo(siloId, req.user.id);
  }

  @Get(':id/members')
  members(@Param('id') siloId: string) {
    return this.membershipService.getMembers(siloId);
  }
}
