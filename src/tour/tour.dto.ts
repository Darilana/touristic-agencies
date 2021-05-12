import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateTourParams {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  season: string;
  @ApiProperty()
  @IsString()
  duration: string;
  @ApiProperty()
  @IsNumber()
  agencyId: number;
  @ApiProperty({ type: () => CreateCategoryParams, isArray: true })
  @ValidateNested()
  categories: CreateCategoryParams[];
  @ApiProperty({ type: () => CreateDirectionParams, isArray: true })
  @ValidateNested()
  directions: CreateDirectionParams[];
}

class CreateCategoryParams {
  @ApiProperty()
  @IsString()
  name: string;
}

class CreateDirectionParams {
  @ApiProperty()
  @IsString()
  name: string;
}
