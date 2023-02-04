import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { Album } from './album';
import { v4 as idv4 } from 'uuid';
import { validate as idValidate } from 'uuid';

@Injectable()
export class AlbumsService {
  public albumsDB: Album[] = [];

  async getAllAlbums() {
    return this.albumsDB;
  }

  async getAlbumByID(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. albumsId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlbum = this.albumsDB.filter((item) => item.id === id);
    if (!isAlbum.length) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return isAlbum[0];
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.name === '' || createAlbumDto.year < 1900) {
      throw new HttpException(
        'Bad request. body does not contain required fields',
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

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (updateAlbumDto.name === '') {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlbum = this.albumsDB.filter((item) => item.id === id);
    if (!isAlbum.length) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    const album = isAlbum[0];
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  async deleteAlbum(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isAlbum = this.albumsDB.filter((item) => item.id === id);
    if (!isAlbum.length) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.albumsDB = this.albumsDB.filter((item) => item.id !== id);
  }
}
