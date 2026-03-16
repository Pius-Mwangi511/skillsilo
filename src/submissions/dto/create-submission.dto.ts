import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateSubmissionDto {

  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  resourceUrl?: string;
}