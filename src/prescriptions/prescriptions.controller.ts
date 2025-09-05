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
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Prescriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new prescription' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto, @Request() req) {
    createPrescriptionDto.doctorId = req.user.userId;
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all prescriptions' })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get prescriptions by patient ID' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.prescriptionsService.findByPatient(+patientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prescription by ID' })
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update prescription' })
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete prescription' })
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
