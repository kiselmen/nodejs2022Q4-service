import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ description: 'Artist identifier', nullable: false })
  id: string;
  @ApiProperty({ description: 'Artist name', nullable: true })
  name: string;
  @ApiProperty({ description: 'Artist grammy', nullable: true })
  grammy: boolean;

  constructor(id: string, name = '', grammy = false) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
