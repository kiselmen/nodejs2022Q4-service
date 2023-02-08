import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ description: 'Album New name', nullable: true })
  name: string;

  @ApiProperty({ description: 'Album year', nullable: true })
  year: number;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  artistId: string;
}
