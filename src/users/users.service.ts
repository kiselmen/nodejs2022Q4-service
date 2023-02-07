import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { v4 as idv4 } from 'uuid';
import { validate as idValidate } from 'uuid';
import { User } from './user';

@Injectable()
export class UsersService {
  private usersDB: User[] = [];

  findUserByID(id: string) {
    const isUser = this.usersDB.filter((item) => item.id === id);
    if (!isUser.length) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // delete isUser[0].password;
    return isUser[0];
  }

  async getAllUsers() {
    const response = [...this.usersDB];
    response.map((item) => {
      return delete item.password;
    });
    return response;
  }

  async getUserByID(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid userId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.findUserByID(id);
    delete user.password;
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const vaildeteRequest = !createUserDto.login || !createUserDto.password;
    if (vaildeteRequest) {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = idv4();
    const user = new User(id, createUserDto.login, createUserDto.password);
    user.createdAt = Number(new Date());
    user.updatedAt = Number(new Date());
    this.usersDB.push(user);
    const response = { ...user };
    delete response.password;
    return response;
  }

  async updateUserPassword(id: string, passwordData: UpdatePasswordDto) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid userId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const vaildeteRequest =
      !passwordData.oldPassword || !passwordData.newPassword;
    if (vaildeteRequest) {
      throw new HttpException(
        'Bad request. Miss required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.findUserByID(id);
    if (user.password !== passwordData.oldPassword) {
      throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = passwordData.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Number(new Date());
    const response = { ...user };
    delete response.password;
    return response;
  }

  async deleteUser(id: string) {
    if (!idValidate(id)) {
      throw new HttpException(
        'Bad request. Invalid userId (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.findUserByID(id);
    this.usersDB = this.usersDB.filter((item) => item.id !== id);
  }
}
