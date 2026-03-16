import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateFeedbackDto {

  @IsString()
  message: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}