import { IsNotEmpty, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'reset-token-here' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'newPassword123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}