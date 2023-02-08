import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './create.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({ description: 'New track name', nullable: true })
  name: string;

  @ApiProperty({ description: 'New artist ID', nullable: true })
  artistId: string;

  @ApiProperty({ description: 'New album ID', nullable: true })
  albumId: string;

  @ApiProperty({ description: 'New duration', nullable: true })
  duration: number;
}