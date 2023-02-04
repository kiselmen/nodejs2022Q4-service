import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { Track } from './track';
import { v4 as idv4 } from 'uuid';
import { validate as idValidate } from 'uuid';

@Injectable()
export class TracksService {
  public trackDB: Track[] = [];

  async getAllTracks() {
    return this.trackDB;
  }

  async getTrackByID(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid trackId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isTrack = this.trackDB.filter((item) => item.id === id);
    if (!isTrack.length) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return isTrack[0];
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    if (createTrackDto.name === '') {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = idv4();
    const track = new Track(
      id,
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );
    this.trackDB.push(track);
    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    if (updateTrackDto.name === '') {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid trackId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isTrack = this.trackDB.filter((item) => item.id === id);
    if (!isTrack.length) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    const track = isTrack[0];
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  async deleteTrack(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid trackId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isTrack = this.trackDB.filter((item) => item.id === id);
    if (!isTrack.length) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.trackDB = this.trackDB.filter((item) => item.id !== id);
  }
}
