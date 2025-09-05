import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private consultationsRepository: Repository<Consultation>,
  ) {}

  async create(createConsultationDto: CreateConsultationDto): Promise<Consultation> {
    const consultation = this.consultationsRepository.create(createConsultationDto);
    return await this.consultationsRepository.save(consultation);
  }

  async findAll(clinicId?: number): Promise<Consultation[]> {
    const where: any = { isDeleted: false };
    if (clinicId) {
      where.clinicId = clinicId;
    }

    return await this.consultationsRepository.find({
      where,
      relations: ['patient', 'doctor', 'prescriptions'],
      order: { visitDate: 'DESC', visitTime: 'DESC' },
    });
  }

  async findById(id: number): Promise<Consultation> {
    const consultation = await this.consultationsRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['patient', 'doctor', 'prescriptions'],
    });

    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }

    return consultation;
  }

  async findByPatient(patientId: number): Promise<Consultation[]> {
    return await this.consultationsRepository.find({
      where: { patientId, isDeleted: false },
      relations: ['doctor', 'prescriptions'],
      order: { visitDate: 'DESC', visitTime: 'DESC' },
    });
  }

  async update(id: number, updateConsultationDto: UpdateConsultationDto): Promise<Consultation> {
    await this.consultationsRepository.update(id, updateConsultationDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.consultationsRepository.update(id, { isDeleted: true });
  }
}