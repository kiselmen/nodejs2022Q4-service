import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [forwardRef(() => AlbumsModule), forwardRef(() => TracksModule)],
  exports: [ArtistsService],
})
export class ArtistsModule {}
