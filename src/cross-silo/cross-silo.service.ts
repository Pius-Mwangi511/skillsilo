import { PrismaService } from "src/prisma/prisma.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CrossSiloService {
  constructor(private prisma: PrismaService) {}

  createRequest(dto: CreateRequestDto, userId: string) {
    return this.prisma.crossSiloRequest.create({
      data: {
        title: dto.title,
        content: dto.content,
        fromUserId: userId,
      },
    });
  }

  getAllRequests() {
    return this.prisma.crossSiloRequest.findMany({
      include: { fromUser: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  reply(requestId: string, userId: string, message: string) {
    return this.prisma.crossSiloReply.create({
      data: {
        message,
  
        request: {
          connect: { id: requestId },
        },
  
        user: {
          connect: { id: userId },
        },
      },
    });
  }
}
