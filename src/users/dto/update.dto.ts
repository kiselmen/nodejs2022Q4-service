import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Old user password' })
  oldPassword: string;

  @ApiProperty({ description: 'User password' })
  newPassword: string;
}
