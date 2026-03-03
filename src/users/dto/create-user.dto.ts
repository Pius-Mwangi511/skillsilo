
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    IsArray,
  } from 'class-validator';
  import { ExperienceLevel } from '@prisma/client';
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @MinLength(6)
    password: string;
  
    @IsOptional()
    @IsString()
    bio?: string;
  
    @IsEnum(ExperienceLevel)
    experience: ExperienceLevel;
  
    @IsArray()
    @IsString({ each: true })
    skills: string[];
  }
  