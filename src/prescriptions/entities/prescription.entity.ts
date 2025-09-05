import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Consultation } from '../../consultations/entities/consultation.entity';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../users/entities/user.entity';

export enum PrescriptionStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('prescriptions')
export class Prescription extends BaseEntity {
  @ManyToOne(() => Consultation, consultation => consultation.prescriptions)
  @JoinColumn({ name: 'consultationId' })
  consultation: Consultation;

  @Column()
  consultationId: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  patientId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @Column()
  doctorId: number;

  @Column({ unique: true })
  prescriptionNumber: string;

  @Column({ type: 'date' })
  prescriptionDate: Date;

  @Column({ type: 'text', nullable: true })
  digitalSignature: string;

  @Column({ type: 'text', nullable: true })
  handwrittenNotes: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'date', nullable: true })
  followUpDate: Date;

  @Column({
    type: 'enum',
    enum: PrescriptionStatus,
    default: PrescriptionStatus.ACTIVE,
  })
  status: PrescriptionStatus;

  @Column({ type: 'json', nullable: true })
  medicines: Array<{
    name: string;
    dosage: string;
    duration: string;
    instructions?: string;
  }>;
}