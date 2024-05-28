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
  create(@Body() newUser: User): string {
    this.usersService.create(newUser);
    return `Added new user successfully: ${JSON.stringify(newUser)}`;
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updatedUser: User,
  ): string {
    this.usersService.update(username, updatedUser);
    return `Updated user successfully: ${JSON.stringify(updatedUser)}`;
  }

  @Delete(':username')
  delete(@Param('username') username: string): string {
    this.usersService.delete(username);
    return `User ${username} deleted successfully.`;
  }
}
