import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'clinic_user',
      password: process.env.DB_PASSWORD || 'clinic_password',
      database: process.env.DB_DATABASE || 'clinic_management',
      autoLoadEntities: true,
      synchronize: true, // Don't use in production
    }),
    AuthModule,
    UsersModule,
    PatientsModule,
    ConsultationsModule,
    PrescriptionsModule,
  ],
})
export class AppModule {}