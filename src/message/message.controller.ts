import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guards';

@Controller()
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('silos/:id/messages')
  create(
    @Param('id') siloId: string,
    @Body() dto: CreateMessageDto,
    @Req() req,
  ) {
    return this.messageService.create(siloId, req.user.id, dto.content);
  }

  @Get('silos/:id/messages')
  findAll(@Param('id') siloId: string) {
    return this.messageService.findBySilo(siloId);
  }

  @Patch('messages/:id')
  update(
    @Param('id') messageId: string,
    @Body() dto: UpdateMessageDto,
    @Req() req,
  ) {
    return this.messageService.update(
      messageId,
      req.user.id,
      dto.content!,
    );
  }

  @Delete('messages/:id')
  remove(@Param('id') messageId: string, @Req() req) {
    return this.messageService.delete(messageId, req.user.id);
  }
}
