import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';

@Controller('service-requests')
export class ServiceRequestsController {
    constructor(private readonly serviceRequestsService: ServiceRequestsService) { }

    @Post()
    create(@Body() createDto: any) {
        return this.serviceRequestsService.create(createDto);
    }

    @Get()
    findAll() {
        return this.serviceRequestsService.findAll();
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: any) {
        return this.serviceRequestsService.updateStatus(id, status);
    }
}
