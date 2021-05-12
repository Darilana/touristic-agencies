import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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
  phoneNumber: number;
  @ApiProperty({ required: false })
  @IsString()
  workingHours: string;
  @IsString()
  @ApiProperty({ required: false })
  address: string;
}
