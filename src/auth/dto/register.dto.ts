import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'doctor1' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'doctor@clinic.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Dr. John Doe' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ enum: UserRole, example: UserRole.DOCTOR })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  clinicId?: number;
}