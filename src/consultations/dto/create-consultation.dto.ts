import { IsString, IsUUID } from 'class-validator';

export class CreateConsultationDto {
  @IsUUID()
  fromSiloId: string;

  @IsUUID()
  toSiloId: string;

  @IsString()
  description: string;
}