

import { IsString, MinLength } from 'class-validator';

export class RespondConsultationDto {
  @IsString()
  @MinLength(5)
  responseMessage: string;
}