import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateSiloDto } from './dto/create-silo.dto';
  import { Role } from '@prisma/client';
  
  @Injectable()
  export class SiloService {
    constructor(private prisma: PrismaService) {}
  
    async create(dto: CreateSiloDto, userId: string) {
      return this.prisma.$transaction(async (tx) => {
        const silo = await tx.silo.create({
          data: {
            skill: dto.skill,
            level: dto.level,
            createdBy: userId,
          },
        });
  
        await tx.membership.create({
          data: {
            userId,
            siloId: silo.id,
            role: Role.ADMIN,
          },
        });
  
        return silo;
      });
    }
  
    async findAll(skill?: string, level?: string) {
      return this.prisma.silo.findMany({
        where: {
          skill: skill ? { contains: skill, mode: 'insensitive' } : undefined,
          level: level ? (level as any) : undefined,
        },
      });
    }
  
    async findOne(id: string) {
      const silo = await this.prisma.silo.findUnique({
        where: { id },
        include: {
          memberships: {
            include: { user: true },
          },
        },
      });
  
      if (!silo) throw new NotFoundException('Silo not found');
      return silo;
    }
  }
  