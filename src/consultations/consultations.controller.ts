import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { RespondConsultationDto } from './dto/respond-consultation.dto';

@Controller('consultations')
export class ConsultationsController {
  constructor(private service: ConsultationsService) {}

  // Create silo → silo request
  @Post()
  create(@Body() dto: CreateConsultationDto) {
    return this.service.create(dto);
  }

  // Incoming requests for a silo
  @Get('incoming/:siloId')
  incoming(@Param('siloId') siloId: string) {
    return this.service.incoming(siloId);
  }

  // Outgoing requests from a silo
  @Get('outgoing/:siloId')
  outgoing(@Param('siloId') siloId: string) {
    return this.service.outgoing(siloId);
  }

  // Respond to request
  @Patch(':id/respond')
respond(
  @Param('id') id: string,
  @Body() dto: RespondConsultationDto,
) {
  return this.service.respond(id, dto.responseMessage);
}
}