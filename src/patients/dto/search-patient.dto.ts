import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPatientDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;
}