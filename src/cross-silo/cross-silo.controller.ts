import { Body, Controller, Param, Post, Req, UseGuards,Get } from "@nestjs/common";
import { CrossSiloService } from "./cross-silo.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { JwtAuthGuard } from "src/auth/guards/auth.guards";
import { ReplyRequestDto } from "./dto/reply-request.dto";

@UseGuards(JwtAuthGuard)
@Controller('cross-silo')
export class CrossSiloController {
  constructor(private service: CrossSiloService) {}

  @Post('request')
  create(
    @Req() req,
    @Body() dto: CreateRequestDto,
  ) {
    return this.service.createRequest(dto, req.user.userId);
  }

  @Get('requests')
  findAll() {
    return this.service.getAllRequests();
  }

  @Post(':id/reply')
@UseGuards(JwtAuthGuard)
reply(
  @Param('id') requestId: string,
  @Req() req,
  @Body('message') message: string,
) {
  return this.service.reply(requestId, req.user.id, message);
}
}
