// user.interface.ts

export interface User {
  username: string;
  fullname: string;
  role: string;
  projects: string[];
  activeYn: 'Y' | 'N';
}
