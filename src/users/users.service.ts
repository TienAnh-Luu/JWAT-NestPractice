// users.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly userList: User[] = []; // Initialize with an empty array

  search(params?: {
    username?: string;
    fullname?: string;
    role?: string;
    projects?: string[];
    activeYn?: 'Y' | 'N';
  }): User[] {
    // If no parameters are provided, return the full userList
    if (!params || Object.keys(params).length === 0) {
      return this.userList;
    }

    return this.userList.filter((user) => {
      return (
        (!params.username || user.username === params.username) &&
        (!params.fullname || user.fullname === params.fullname) &&
        (!params.role || user.role === params.role) &&
        (!params.projects ||
          params.projects.every((project) =>
            user.projects.includes(project),
          )) &&
        (!params.activeYn || user.activeYn === params.activeYn)
      );
    });
  }

  create(newUser: User): void {
    const userExists = this.userList.some(
      (user) => user.username === newUser.username,
    );

    if (userExists) {
      throw new BadRequestException('Username already exists');
    }

    this.userList.push(newUser);
  }

  update(username: string, updatedUser: User): void {
    // Find the user by username and update properties
    const existingUser = this.userList.find(
      (user) => user.username === username,
    );
    if (existingUser) {
      // Update properties (role, fullname, etc.)
      existingUser.role = updatedUser.role;
      existingUser.fullname = updatedUser.fullname;
      existingUser.activeYn = updatedUser.activeYn;
      existingUser.projects = updatedUser.projects;
    }
  }

  delete(username: string): void {
    // Remove the user by username
    const userIndex = this.userList.findIndex(
      (user) => user.username === username,
    );
    if (userIndex !== -1) {
      this.userList.splice(userIndex, 1);
    }
  }
}
