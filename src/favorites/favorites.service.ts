import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Favorite } from 'src/favorites/favorite';
import { validate as idValidate } from 'uuid';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  public favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  getAllFavorites() {
    return this.favorites;
  }

  addTrackToFavorites(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid artistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isTrack = this.trackService.tracksDB.filter((item) => item.id === id);
    if (!isTrack.length) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const track = isTrack[0];
    this.favorites.tracks.push(track);
    return track;
  }

  deleteTrackFromFavorites(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid TrackId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const isTrack = this.favorites.tracks.filter((item) => item.id === id);

    // if (!isTrack.length) {
    //   throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    // }
    this.favorites.tracks = this.favorites.tracks.filter(
      (item) => item.id !== id,
    );
  }

  addAlbumToFavorites(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid AlbumId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlbum = this.albumService.albumsDB.filter((item) => item.id === id);
    if (!isAlbum.length) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const album = isAlbum[0];
    this.favorites.albums.push(album);
    return album;
  }

  deleteAlbumFromFavorites(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid albumId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const isAlbum = this.favorites.albums.filter((item) => item.id === id);

    // if (!isAlbum.length) {
    //   throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    // }
    this.favorites.albums = this.favorites.albums.filter(
      (item) => item.id !== id,
    );
  }

  addArtistToFavorites(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid ArtistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isArtist = this.artistService.artistsDB.filter(
      (item) => item.id === id,
    );
    if (!isArtist.length) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const artist = isArtist[0];
    this.favorites.artists.push(artist);
    return artist;
  }

  deleteArtistFromFavorites(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid ArtistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const isArtist = this.favorites.artists.filter((item) => item.id === id);

    // if (!isArtist.length) {
    //   throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    // }
    this.favorites.artists = this.favorites.artists.filter(
      (item) => item.id !== id,
    );
  }
}
