import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateChallengeDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}