import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({ description: 'Album identifier', nullable: false })
  id: string;
  @ApiProperty({ description: 'Album name', nullable: true })
  name: string;
  @ApiProperty({ description: 'Album year', nullable: true })
  year: number;
  @ApiProperty({ description: 'Artist ID', nullable: true })
  artistId: string;

  constructor(id: string, name = '', year = 0, artistId = '') {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
