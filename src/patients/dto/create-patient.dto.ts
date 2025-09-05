import { IsNotEmpty, IsOptional, IsEmail, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entities/patient.entity';

export class CreatePatientDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  age?: number;

  @ApiProperty({ enum: Gender, example: Gender.MALE, required: false })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ example: '9876543210', required: false })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '123 Main St, City, State', required: false })
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '1999-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @ApiProperty({ example: 'B+', required: false })
  @IsOptional()
  bloodGroup?: string;

  @ApiProperty({ example: '9876543211', required: false })
  @IsOptional()
  emergencyContact?: string;

  @IsOptional()
  clinicId?: number;
}
