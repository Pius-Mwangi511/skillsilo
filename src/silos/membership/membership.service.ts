import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { Role } from '@prisma/client';
  
  @Injectable()
  export class MembershipService {
    constructor(private prisma: PrismaService) {}
  
    async joinSilo(siloId: string, userId: string) {
      const exists = await this.prisma.membership.findUnique({
        where: { userId_siloId: { userId, siloId } },
      });
  
      if (exists) throw new BadRequestException('Already a member');
  
      return this.prisma.membership.create({
        data: { userId, siloId, role: Role.MEMBER },
      });
    }
  
    async leaveSilo(siloId: string, userId: string) {
      const membership = await this.prisma.membership.findUnique({
        where: { userId_siloId: { userId, siloId } },
      });
  
      if (!membership) throw new NotFoundException('Not a member');
  
      if (membership.role === Role.ADMIN) {
        throw new BadRequestException('Admin cannot leave their own silo');
      }
  
      return this.prisma.membership.delete({
        where: { id: membership.id },
      });
    }
  
    async getMembers(siloId: string) {
      return this.prisma.membership.findMany({
        where: { siloId },
        include: { user: true },
      });
    }
  }
  