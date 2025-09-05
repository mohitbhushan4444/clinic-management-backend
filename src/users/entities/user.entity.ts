import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Consultation } from '../../consultations/entities/consultation.entity';

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  STAFF = 'staff',
  RECEPTIONIST = 'receptionist',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: UserRole;

  @Column({ nullable: true })
  clinicId: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Consultation, consultation => consultation.doctor)
  consultations: Consultation[];
}