import { IsString, MinLength } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(10)
  content: string;
}
