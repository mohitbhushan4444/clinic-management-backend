import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null
    console.log('password---', user.role, process.env.ADMIN_ROLE)
    const passwordMatch = user.role === process.env.ADMIN_ROLE ? password === user.passwordHash : await bcrypt.compare(password, user.passwordHash)
    if (passwordMatch) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {

    const user = await this.validateUser(loginDto.email, loginDto.password);
    console.log('user---', user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      clinicId: user.clinicId
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      passwordHash: hashedPassword,
    });

    const { passwordHash, ...result } = user;
    return result;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists or not for security reasons
      return {
        message: 'If an account with this email exists, you will receive a password reset link.',
        success: true
      };
    }

    // Generate reset token
    // const resetToken = crypto.randomBytes(32).toString('hex');
    // const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Save reset token to user (you may need to add these fields to your User entity)
    // await this.usersRepository.update(user.id, {
    //   resetPasswordToken: resetToken,
    //   resetPasswordExpires: resetTokenExpires,
    // });

    // Create reset URL
    // const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send email (implement email service)
    try {
      // await this.emailService.sendPasswordResetEmail(user.email, user.fullName, resetUrl);

      // For development, just log the reset URL
      // console.log(`Password reset URL for ${email}: ${resetUrl}`);

      return {
        message: 'Password reset link has been sent to your email.',
        success: true,
        // Remove this in production:
      };
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new BadRequestException('Failed to send password reset email');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const { email, password } = resetPasswordDto;
      console.log('email---', email, password)
      // Find user by reset token
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new BadRequestException('Invalid or expired reset token');
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Update user password and clear reset token
      await this.usersService.update(user.id, {
        passwordHash: hashedPassword,
      });

      return {
        message: 'Password has been reset successfully',
        success: true
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  // async verifyResetToken(token: string) {
  //   const user = await this.usersRepository.findOne({
  //     where: {
  //       resetPasswordToken: token,
  //       resetPasswordExpires: { $gt: new Date() } as any,
  //     }
  //   });

  //   if (!user) {
  //     throw new BadRequestException('Invalid or expired reset token');
  //   }

  //   return {
  //     message: 'Token is valid',
  //     success: true,
  //     email: user.email // You might want to show the email for confirmation
  //   };
  // }
}