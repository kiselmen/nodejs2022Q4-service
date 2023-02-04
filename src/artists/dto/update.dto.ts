import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ description: 'Artist New name', nullable: true })
  name: string;
  @ApiProperty({ description: 'Artist New grammy', nullable: true })
  grammy: boolean;
}
