import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User login', nullable: true })
  login: string;

  @ApiProperty({ description: 'User password', nullable: true })
  password: string;
}
