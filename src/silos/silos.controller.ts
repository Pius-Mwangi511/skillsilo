import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SiloService } from './silos.service';
import { CreateSiloDto } from './dto/create-silo.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guards';

@Controller('silos')
@UseGuards(JwtAuthGuard)
export class SiloController {
  constructor(private readonly siloService: SiloService) {}

  @Post()
  create(@Body() dto: CreateSiloDto, @Req() req) {
    return this.siloService.create(dto, req.user.id);
  }
  


  @Get()
  findAll(
    @Query('skill') skill?: string,
    @Query('level') level?: string,
  ) {
    return this.siloService.findAll(skill, level);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siloService.findOne(id);
  }
}

