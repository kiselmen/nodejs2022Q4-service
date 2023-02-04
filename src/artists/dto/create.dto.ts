import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist name', nullable: true })
  name: string;

  @ApiProperty({ description: 'Artist grammy', nullable: true })
  grammy: boolean;
}
