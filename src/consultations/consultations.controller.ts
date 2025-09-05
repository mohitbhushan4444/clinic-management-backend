import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Consultations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new consultation' })
  create(@Body() createConsultationDto: CreateConsultationDto, @Request() req) {
    createConsultationDto.doctorId = req.user.userId;
    createConsultationDto.clinicId = req.user.clinicId || 1;
    return this.consultationsService.create(createConsultationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all consultations' })
  findAll(@Request() req) {
    return this.consultationsService.findAll(req.user.clinicId);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get consultations by patient ID' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.consultationsService.findByPatient(+patientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get consultation by ID' })
  findOne(@Param('id') id: string) {
    return this.consultationsService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update consultation' })
  update(@Param('id') id: string, @Body() updateConsultationDto: UpdateConsultationDto) {
    return this.consultationsService.update(+id, updateConsultationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete consultation' })
  remove(@Param('id') id: string) {
    return this.consultationsService.remove(+id);
  }
}