import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { Artist } from './artist';
import { v4 as idv4 } from 'uuid';
import { validate as idValidate } from 'uuid';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistsService {
  public artistsDB: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albums: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracks: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favorites: FavoritesService,
  ) {}

  findArtistByID(id: string) {
    const isArtist = this.artistsDB.filter((item) => item.id === id);
    if (!isArtist.length) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return isArtist[0];
  }

  getAllArtists() {
    return this.artistsDB;
  }

  getArtistByID(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid artistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.findArtistByID(id);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    if (createArtistDto.name === '') {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = idv4();
    const artist = new Artist(id, createArtistDto.name, createArtistDto.grammy);
    this.artistsDB.push(artist);
    return artist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    if (!updateArtistDto.name || typeof updateArtistDto.name !== 'string') {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid artistId or albumId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.findArtistByID(id);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  deleteArtist(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid artistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.findArtistByID(id);
    this.favorites.deleteArtistFromFavorites(id);
    this.artistsDB = this.artistsDB.filter((item) => item.id !== id);
    this.tracks.updateTracksArtist(id);
    this.albums.updateAlbumsArtist(id);
  }
}
