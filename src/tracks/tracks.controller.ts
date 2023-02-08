import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { Track } from './track';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: [Track],
  })
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid trackId (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  getTrackByID(@Param('id') id: string) {
    return this.trackService.getTrackByID(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Miss required fields',
  })
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiOperation({ summary: `Update a track's data` })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Miss required fields',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete track` })
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiResponse({ status: 204, description: 'The track has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid trackId (not uuid)',
  })
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
