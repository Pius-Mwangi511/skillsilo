import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ExperienceLevel } from '@prisma/client';

export class CreateSiloDto {
  @IsNotEmpty()
  @IsString()
  skill: string;

  @IsEnum(ExperienceLevel)
  level: ExperienceLevel;
  
//   @IsNotEmpty()
//   @IsString()
//   createdBy: string;
}
