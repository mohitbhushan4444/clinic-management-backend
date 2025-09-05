import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SearchPatientDto } from './dto/search-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Generate registration number
    const count = await this.patientsRepository.count();
    const registrationNumber = `REG${String(count + 1).padStart(4, '0')}`;

    const patient = this.patientsRepository.create({
      ...createPatientDto,
      registrationNumber,
    });

    return await this.patientsRepository.save(patient);
  }

  async findAll(clinicId?: number): Promise<Patient[]> {
    const where: any = { isDeleted: false };
    if (clinicId) {
      where.clinicId = clinicId;
    }

    return await this.patientsRepository.find({
      where,
      relations: ['consultations'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['consultations', 'consultations.doctor'],
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async search(searchDto: SearchPatientDto, clinicId?: number): Promise<Patient[]> {
    const { searchTerm } = searchDto;
    const where: any = { isDeleted: false };
    
    if (clinicId) {
      where.clinicId = clinicId;
    }

    if (searchTerm) {
      return await this.patientsRepository.find({
        where: [
          { ...where, fullName: Like(`%${searchTerm}%`) },
          { ...where, phone: Like(`%${searchTerm}%`) },
          { ...where, registrationNumber: Like(`%${searchTerm}%`) },
        ],
        relations: ['consultations'],
        order: { createdAt: 'DESC' },
      });
    }

    return this.findAll(clinicId);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    await this.patientsRepository.update(id, updatePatientDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.patientsRepository.update(id, { isDeleted: true });
  }

  async getPatientHistory(id: number): Promise<any> {
    const patient = await this.findById(id);
    return {
      patient,
      consultations: patient.consultations,
      totalVisits: patient.consultations?.length || 0,
      lastVisit: patient.consultations?.[0]?.visitDate || null,
    };
  }
}