import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionsRepository: Repository<Prescription>,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
    // Generate prescription number
    const count = await this.prescriptionsRepository.count();
    const prescriptionNumber = `PRX${String(count + 1).padStart(4, '0')}`;

    const prescription = this.prescriptionsRepository.create({
      ...createPrescriptionDto,
      prescriptionNumber,
    });

    return await this.prescriptionsRepository.save(prescription);
  }

  async findAll(): Promise<Prescription[]> {
    return await this.prescriptionsRepository.find({
      where: { isDeleted: false },
      relations: ['patient', 'doctor', 'consultation'],
      order: { prescriptionDate: 'DESC' },
    });
  }

  async findById(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionsRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['patient', 'doctor', 'consultation'],
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    return prescription;
  }

  async findByPatient(patientId: number): Promise<Prescription[]> {
    return await this.prescriptionsRepository.find({
      where: { patientId, isDeleted: false },
      relations: ['doctor', 'consultation'],
      order: { prescriptionDate: 'DESC' },
    });
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto): Promise<Prescription> {
    await this.prescriptionsRepository.update(id, updatePrescriptionDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.prescriptionsRepository.update(id, { isDeleted: true });
  }
}
