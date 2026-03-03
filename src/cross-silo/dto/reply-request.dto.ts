import { IsString } from 'class-validator';

export class ReplyRequestDto {
  @IsString()
  message: string;
}
