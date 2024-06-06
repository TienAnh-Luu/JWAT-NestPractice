// users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  HttpException,
  HttpStatus,
  BadRequestException,
  HttpCode,
  Header,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { SearchUsersDto } from './dto/search-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  searchUsers(@Query() query: SearchUsersDto): User[] {
    return this.usersService.search(query);
  }

  @Post()
  create(@Body() newUser: User) {
    try {
      this.usersService.create(newUser);
      return { message: 'Added new user successfully', user: newUser };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        { message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':username')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  update(
    @Param('username') username: string,
    @Body() updatedUser: User,
  ): { message: string; user: User } {
    this.usersService.update(username, updatedUser);
    return { message: 'Updated user successfully', user: updatedUser };
  }

  @Delete(':username')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  delete(@Param('username') username: string): { message: string } {
    this.usersService.delete(username);
    return { message: `User ${username} deleted successfully.` };
  }
}
