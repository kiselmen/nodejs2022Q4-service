import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { Track } from './track';
import { v4 as idv4 } from 'uuid';
import { validate as idValidate } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  public tracksDB: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favorites: FavoritesService,
  ) {}

  findTrackByID(id: string) {
    const isTrack = this.tracksDB.filter((item) => item.id === id);
    if (!isTrack.length) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return isTrack[0];
  }

  getAllTracks() {
    return this.tracksDB;
  }

  getTrackByID(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid trackId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.findTrackByID(id);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name) {
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
    this.tracksDB.push(track);
    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    if (!updateTrackDto.name) {
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
    const track = this.findTrackByID(id);
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  deleteTrack(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid trackId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.findTrackByID(id);
    this.favorites.deleteTrackFromFavorites(id);
    this.tracksDB = this.tracksDB.filter((item) => item.id !== id);
  }

  updateTracksArtist(id: string) {
    this.tracksDB.forEach((item) => {
      if (item.artistId === id) item.artistId = null;
    });
  }

  updateTracksAlbum(id: string) {
    this.tracksDB.forEach((item) => {
      if (item.albumId === id) item.albumId = null;
    });
  }
}
