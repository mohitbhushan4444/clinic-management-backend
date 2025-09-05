import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Consultation } from '../../consultations/entities/consultation.entity';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'Other',
}

@Entity('patients')
export class Patient extends BaseEntity {
  @Column({ unique: true })
  registrationNumber: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  age: number;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column()
  clinicId: number;

  @OneToMany(() => Consultation, consultation => consultation.patient)
  consultations: Consultation[];
}