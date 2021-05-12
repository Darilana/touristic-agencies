import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOfficeParams {
  @ApiProperty()
  @IsNumber()
  agencyId: number;
  @ApiProperty()
  @IsNumber()
  phoneNumber: number;
  @ApiProperty()
  @IsString()
  workingHours: string;
  @IsString()
  @ApiProperty()
  address: string;
}

export class UpdateOfficeParams {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  phoneNumber: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  workingHours: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address: string;
}
