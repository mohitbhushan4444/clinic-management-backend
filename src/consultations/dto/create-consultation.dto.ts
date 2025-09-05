import { IsNotEmpty, IsOptional, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ConsultationStatus } from '../entities/consultation.entity';

export class CreateConsultationDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({ example: '2024-01-24' })
  @IsNotEmpty()
  @IsDateString()
  visitDate: Date;

  @ApiProperty({ example: '10:30' })
  @IsNotEmpty()
  visitTime: string;

  @ApiProperty({ example: 'Fever, headache, body ache', required: false })
  @IsOptional()
  chiefComplaints?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  historyOfPresentIllness?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  pastHistory?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  familyHistory?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  personalHistory?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  physicalGenerals?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  mentalGenerals?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  investigationNotes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  diagnosis?: string;

  @ApiProperty({ example: 500, required: false })
  @IsOptional()
  @IsNumber()
  consultationFee?: number;

  @ApiProperty({ enum: ConsultationStatus, required: false })
  @IsOptional()
  @IsEnum(ConsultationStatus)
  status?: ConsultationStatus;

  @IsOptional()
  doctorId?: number;

  @IsOptional()
  clinicId?: number;
}
