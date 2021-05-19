import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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

export class UpdateTourParams {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ required: false })
  @IsString()
  duration: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  agencyId: number;
  @ApiProperty({
    type: () => CreateCategoryParams,
    isArray: true,
    required: false,
  })
  @ValidateNested()
  @IsOptional()
  categories: CreateCategoryParams[];
  @ApiProperty({
    type: () => CreateDirectionParams,
    isArray: true,
    required: false,
  })
  @ValidateNested()
  @IsOptional()
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
