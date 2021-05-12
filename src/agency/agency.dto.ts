import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAgencyParams {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  phoneNumber: number;
}

export class UpdateAgencyParams {
  @ApiProperty()
  @IsNumber()
  id: number
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  phoneNumber: number;
}
