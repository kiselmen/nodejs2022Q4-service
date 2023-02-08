import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { CreateArtistDto } from './create.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy?: boolean;
}
