import { IsNotEmpty, IsOptional, IsDateString, IsEnum, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrescriptionStatus } from '../entities/prescription.entity';

export class CreatePrescriptionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  consultationId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({ example: '2024-01-24' })
  @IsNotEmpty()
  @IsDateString()
  prescriptionDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  digitalSignature?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  handwrittenNotes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  instructions?: string;

  @ApiProperty({ example: '2024-02-07', required: false })
  @IsOptional()
  @IsDateString()
  followUpDate?: Date;

  @ApiProperty({ enum: PrescriptionStatus, required: false })
  @IsOptional()
  @IsEnum(PrescriptionStatus)
  status?: PrescriptionStatus;

  @ApiProperty({
    example: [
      { name: 'Belladonna 30C', dosage: '3 drops twice daily', duration: '5 days' }
    ],
    required: false
  })
  @IsOptional()
  @IsArray()
  medicines?: Array<{
    name: string;
    dosage: string;
    duration: string;
    instructions?: string;
  }>;

  @IsOptional()
  doctorId?: number;
}
