import { IsOptional, IsString, IsArray, IsIn } from 'class-validator';

export class SearchUsersDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projects?: string[];

  @IsOptional()
  @IsIn(['Y', 'N'])
  activeYn?: 'Y' | 'N';
}
