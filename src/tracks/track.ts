import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ description: 'Track identifier', nullable: false })
  id: string;
  @ApiProperty({ description: 'Track name', nullable: true })
  name: string;
  @ApiProperty({ description: 'Artist ID', nullable: true })
  artistId: string;
  @ApiProperty({ description: 'Album ID', nullable: true })
  albumId: string;
  @ApiProperty({ description: 'Track duration', nullable: true })
  duration: number;

  constructor(
    id: string,
    name = '',
    artistId = '',
    albumId = '',
    duration = 0,
  ) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
