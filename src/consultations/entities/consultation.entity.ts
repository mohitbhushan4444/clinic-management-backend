import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../users/entities/user.entity';
import { Prescription } from '../../prescriptions/entities/prescription.entity';

export enum ConsultationStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('consultations')
export class Consultation extends BaseEntity {
  @ManyToOne(() => Patient, patient => patient.consultations)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  patientId: number;

  @ManyToOne(() => User, user => user.consultations)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @Column()
  doctorId: number;

  @Column()
  clinicId: number;

  @Column({ type: 'date' })
  visitDate: Date;

  @Column({ type: 'time' })
  visitTime: string;

  @Column({ type: 'text', nullable: true })
  chiefComplaints: string;

  @Column({ type: 'text', nullable: true })
  historyOfPresentIllness: string;

  @Column({ type: 'text', nullable: true })
  pastHistory: string;

  @Column({ type: 'text', nullable: true })
  familyHistory: string;

  @Column({ type: 'text', nullable: true })
  personalHistory: string;

  @Column({ type: 'text', nullable: true })
  physicalGenerals: string;

  @Column({ type: 'text', nullable: true })
  mentalGenerals: string;

  @Column({ type: 'text', nullable: true })
  investigationNotes: string;

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consultationFee: number;

  @Column({
    type: 'enum',
    enum: ConsultationStatus,
    default: ConsultationStatus.SCHEDULED,
  })
  status: ConsultationStatus;

  @OneToMany(() => Prescription, prescription => prescription.consultation)
  prescriptions: Prescription[];
}