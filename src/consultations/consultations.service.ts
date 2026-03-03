import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConsultationStatus } from '@prisma/client';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  // Silo → Silo request
  async create(dto: CreateConsultationDto) {
    if (dto.fromSiloId === dto.toSiloId) {
      throw new BadRequestException('Cannot consult same silo');
    }

    return this.prisma.consultationRequest.create({
      data: {
        fromSiloId: dto.fromSiloId,
        toSiloId: dto.toSiloId,
        description: dto.description,
        status: ConsultationStatus.OPEN,
      },
    });
  }

  // Incoming requests
  async incoming(siloId: string) {
    return this.prisma.consultationRequest.findMany({
      where: { toSiloId: siloId },
      include: { fromSilo: true },
    });
  }

  // Outgoing requests
  async outgoing(siloId: string) {
    return this.prisma.consultationRequest.findMany({
      where: { fromSiloId: siloId },
      include: { toSilo: true },
    });
  }

  // Respond (accept / close)
  async respond(
    requestId: string,
    responseMessage: string,
  ) {
    const request = await this.prisma.consultationRequest.findUnique({
      where: { id: requestId },
    });
  
    if (!request) {
      throw new NotFoundException('Request not found');
    }
  
    return this.prisma.consultationRequest.update({
      where: { id: requestId },
      data: {
        responseMessage,
        status: ConsultationStatus.RESPONDED,
        respondedAt: new Date(),
      },
    });
  }
}