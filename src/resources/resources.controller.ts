import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../auth/guards/auth.guards';

@Controller('silos/:siloId/resources')
@UseGuards(JwtAuthGuard)
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('siloId') siloId: string,
    @Body('title') title: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return this.resourcesService.uploadResource(
      title,
      siloId,
      req.user.id,
      file,
    );
  }

  @Get()
  async getResources(@Param('siloId') siloId: string) {
    return this.resourcesService.getSiloResources(siloId);
  }
}