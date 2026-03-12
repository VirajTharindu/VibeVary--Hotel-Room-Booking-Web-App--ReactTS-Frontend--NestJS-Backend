import { Module } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { ServiceRequestsController } from './service-requests.controller';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from '../events/events.module';

@Module({
    imports: [DatabaseModule, EventsModule],
    controllers: [ServiceRequestsController],
    providers: [ServiceRequestsService],
    exports: [ServiceRequestsService],
})
export class ServiceRequestsModule { }
