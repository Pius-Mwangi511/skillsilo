import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreatePeerReviewDto {

  @IsInt()
  @Min(1)
  @Max(10)
  score: number;

  @IsOptional()
  @IsString()
  comment?: string;
}