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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { Artist } from './artist';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: [Artist],
  })
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiParam({ name: 'id', description: 'Artist ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid artistId (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist not found',
  })
  getArtistByID(@Param('id') id: string) {
    return this.artistsService.getArtistByID(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Miss required fields',
  })
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Artist ID' })
  @ApiOperation({ summary: `Update a artist's data` })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Miss required fields',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist not found',
  })
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete artist` })
  @ApiParam({ name: 'id', description: 'Artist ID' })
  @ApiResponse({ status: 204, description: 'The artist has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid artistId (not uuid)',
  })
  deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
