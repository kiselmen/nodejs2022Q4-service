import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'user id', nullable: false })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ description: 'User login', nullable: true })
  @Column()
  login: string;

  @ApiProperty({ description: 'User password', nullable: true })
  @Column()
  password: string;

  @ApiProperty({ description: 'User version', nullable: true })
  @Column()
  version: number;

  @ApiProperty({ description: 'User createdAt', nullable: true })
  @Column()
  createdAt: number;

  @ApiProperty({ description: 'User updatedAt', nullable: true })
  @Column()
  updatedAt: number;

  constructor(id: string, login = '', password = '') {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Number(new Date());
    this.updatedAt = 0;
  }
}
