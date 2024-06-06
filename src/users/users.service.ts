// users.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly userList: User[] = [
    {
      username: 'nva',
      fullname: 'Nguyen Van A',
      role: 'Developer',
      activeYn: 'Y',
      projects: ['project1', 'project2'],
    },
    {
      username: 'nvb',
      fullname: 'Nguyen Van B',
      role: 'Developer',
      activeYn: 'Y',
      projects: ['project3', 'project4'],
    },
    {
      username: 'nvc',
      fullname: 'Nguyen Van C',
      role: 'Developer',
      activeYn: 'Y',
      projects: ['project5', 'project6'],
    },
    {
      username: 'nvd',
      fullname: 'Nguyen Van D',
      role: 'Developer',
      activeYn: 'N',
      projects: ['project5', 'project6'],
    },
    {
      username: 'nve',
      fullname: 'Nguyen Van E',
      role: 'HR',
      activeYn: 'N',
      projects: ['project5', 'project6'],
    },
    {
      username: 'nvf',
      fullname: 'Nguyen Van F',
      role: 'Security',
      activeYn: 'Y',
      projects: ['project5', 'project6'],
    },
    {
      username: 'nvg',
      fullname: 'Nguyen Van G',
      role: 'Customer',
      activeYn: 'N',
      projects: ['project5', 'project6'],
    },
    {
      username: 'nvh',
      fullname: 'Nguyen Van H',
      role: 'Developer',
      activeYn: 'Y',
      projects: ['project8', 'project9'],
    },
    {
      username: 'nvi',
      fullname: 'Nguyen Van I',
      role: 'Developer',
      activeYn: 'Y',
      projects: ['project5', 'project6'],
    },
    {
      username: 'nvj',
      fullname: 'Nguyen Van J',
      role: 'Developer',
      activeYn: 'N',
      projects: ['project5', 'project6'],
    },
    {
      username: 'nvk',
      fullname: 'Nguyen Van K',
      role: 'Developer',
      activeYn: 'Y',
      projects: ['project5', 'project6'],
    },
  ];

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
    console.log('User: ', newUser);
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

    if (!existingUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    existingUser.role = updatedUser.role;
    existingUser.fullname = updatedUser.fullname;
    existingUser.activeYn = updatedUser.activeYn;
    existingUser.projects = updatedUser.projects;
  }

  delete(username: string): void {
    const userIndex = this.userList.findIndex(
      (user) => user.username === username,
    );

    if (userIndex === -1) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    this.userList.splice(userIndex, 1);
  }
}
