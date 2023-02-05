import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { Album } from './album';
import { v4 as idv4 } from 'uuid';
import { validate as idValidate } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  public albumsDB: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracks: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favorites: FavoritesService,
  ) {}

  getAllAlbums() {
    return this.albumsDB;
  }

  getAlbumByID(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid albumsId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlbum = this.albumsDB.filter((item) => item.id === id);
    if (!isAlbum.length) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return isAlbum[0];
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.name === '' || createAlbumDto.year < 1900) {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = idv4();
    const album = new Album(
      id,
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    this.albumsDB.push(album);
    return album;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!updateAlbumDto.name) {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid albumsId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlbum = this.albumsDB.filter((item) => item.id === id);
    if (!isAlbum.length) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    if (!idValidate(updateAlbumDto.artistId)) {
      throw new HttpException(
        'Bad request. Invalid artistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = isAlbum[0];
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  deleteAlbum(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid albumsId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlbum = this.albumsDB.filter((item) => item.id === id);
    if (!isAlbum.length) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.favorites.deleteAlbumFromFavorites(id);
    this.albumsDB = this.albumsDB.filter((item) => item.id !== id);
    this.tracks.updateTracksAlbum(id);
  }

  updateAlbumsArtist(id: string) {
    this.albumsDB.forEach((item) => {
      if (item.artistId === id) item.artistId = null;
    });
  }
}
