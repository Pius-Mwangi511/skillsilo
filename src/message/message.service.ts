import {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  
  @Injectable()
  export class MessageService {
    constructor(private prisma: PrismaService) {}
  
    async create(siloId: string, userId: string, content: string) {
      return this.prisma.message.create({
        data: {
          content,
          siloId,
          userId,
        },
        include: { user: true },
      });
    }
  
    async findBySilo(siloId: string) {
      return this.prisma.message.findMany({
        where: { siloId },
        include: { user: true },
        orderBy: { createdAt: 'asc' },
      });
    }
  
    async update(messageId: string, userId: string, content: string) {
      const message = await this.prisma.message.findUnique({
        where: { id: messageId },
      });
  
      if (!message) throw new NotFoundException('Message not found');
      if (message.userId !== userId)
        throw new ForbiddenException('Not your message');
  
      return this.prisma.message.update({
        where: { id: messageId },
        data: { content },
      });
    }
  
    async delete(messageId: string, userId: string) {
      const message = await this.prisma.message.findUnique({
        where: { id: messageId },
      });
  
      if (!message) throw new NotFoundException('Message not found');
      if (message.userId !== userId)
        throw new ForbiddenException('Not your message');
  
      return this.prisma.message.delete({
        where: { id: messageId },
      });
    }
  }
  