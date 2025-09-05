import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SearchPatientDto } from './dto/search-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new patient' })
  create(@Body() createPatientDto: CreatePatientDto, @Request() req) {
    createPatientDto.clinicId = req.user.clinicId || 1;
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  findAll(@Request() req) {
    return this.patientsService.findAll(req.user.clinicId);
  }

  @Post('search')
  @ApiOperation({ summary: 'Search patients' })
  search(@Body() searchDto: SearchPatientDto, @Request() req) {
    return this.patientsService.search(searchDto, req.user.clinicId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findById(+id);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Get patient consultation history' })
  getHistory(@Param('id') id: string) {
    return this.patientsService.getPatientHistory(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update patient' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}