import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorite } from './favorite';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Favorite,
    isArray: true,
  })
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiOperation({ summary: 'Add track to the favorites' })
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204, description: 'The track has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid trackId (not uuid)',
  })
  deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  @ApiParam({ name: 'id', description: 'album ID' })
  @ApiOperation({ summary: 'Add album to the favorites' })
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @ApiParam({ name: 'id', description: 'album ID' })
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204, description: 'The album has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid albumId (not uuid)',
  })
  deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @ApiParam({ name: 'id', description: 'artist ID' })
  @ApiOperation({ summary: 'Add artist to the favorites' })
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @ApiParam({ name: 'id', description: 'artist ID' })
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({ status: 204, description: 'The artist has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid artistId (not uuid)',
  })
  deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteArtistFromFavorites(id);
  }
}
