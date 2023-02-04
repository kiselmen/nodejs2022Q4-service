import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { Artist } from './artist';
import { v4 as idv4 } from 'uuid';
import { validate as idValidate } from 'uuid';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  public artistsDB: Artist[] = [];

  constructor(
    private readonly albums: AlbumsService,
    private readonly tracks: TracksService,
  ) {}

  async getAllArtists() {
    return this.albums.getAllAlbums();
    // return this.artistsDB;
  }

  async getArtistByID(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid artistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isArtist = this.artistsDB.filter((item) => item.id === id);
    if (!isArtist.length) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return isArtist[0];
  }

  async createArtist(createArtistDto: CreateArtistDto) {
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

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    if (updateArtistDto.name === '') {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid artistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isArtist = this.artistsDB.filter((item) => item.id === id);
    if (!isArtist.length) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    const artist = isArtist[0];
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  async deleteArtist(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid artistId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isArtist = this.artistsDB.filter((item) => item.id === id);
    if (!isArtist.length) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.artistsDB = this.artistsDB.filter((item) => item.id !== id);
  }
}
