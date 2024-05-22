// users.service.ts

import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly userList: User[] = []; // Initialize with an empty array

  findAll(): User[] {
    return this.userList;
  }

  create(newUser: User): void {
    // Add validation logic here (e.g., check if username is unique)
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
