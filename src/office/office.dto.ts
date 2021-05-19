import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOfficeParams {
  @ApiProperty()
  @IsNumber()
  agencyId: number;
  @ApiProperty()
  @IsString()
  phoneNumber: string;
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
  @IsString()
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  workingHours: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address: string;
}
