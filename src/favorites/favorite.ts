import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../albums/album';
import { Artist } from '../artists/artist';
import { Track } from '../tracks/track';

export class Favorite {
  @ApiProperty({ description: 'Artists', nullable: true })
  artists: Artist[];
  @ApiProperty({ description: 'Albums', nullable: true })
  albums: Album[];
  @ApiProperty({ description: 'Tracks', nullable: true })
  tracks: Track[];

  constructor(artists = [], albums = [], tracks = []) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
