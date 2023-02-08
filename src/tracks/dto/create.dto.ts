import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ description: 'Track name', nullable: true })
  name: string;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  artistId: string;

  @ApiProperty({ description: 'Album ID', nullable: true })
  albumId: string;

  @ApiProperty({ description: 'Album duration', nullable: true })
  duration: number;
}
