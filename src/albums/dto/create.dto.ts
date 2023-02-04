import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ description: 'Album name', nullable: true })
  name: string;

  @ApiProperty({ description: 'Album year', nullable: true })
  year: number;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  artistId: string;
}
