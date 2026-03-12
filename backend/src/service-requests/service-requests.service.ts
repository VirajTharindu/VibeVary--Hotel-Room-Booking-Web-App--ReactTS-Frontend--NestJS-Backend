import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EventsGateway } from '../events/events.gateway';

export interface ServiceRequest {
    _id?: string;
    _rev?: string;
    type: 'service_request';
    roomId: string;
    roomNumber: string;
    serviceType: string; // Accepts any service type from the frontend
    details: string;
    status: 'pending' | 'in-progress' | 'completed';
    timestamp: string;
}

@Injectable()
export class ServiceRequestsService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly eventsGateway: EventsGateway,
    ) { }

    private get db() {
        return this.databaseService.getDb();
    }

    async create(request: Omit<ServiceRequest, '_id' | '_rev' | 'type' | 'status' | 'timestamp'>) {
        try {
            const newRequest: ServiceRequest = {
                ...request,
                type: 'service_request',
                status: 'pending',
                timestamp: new Date().toISOString(),
            };
            const response = await this.db.post(newRequest);
            const savedRequest = await this.db.get(response.id);
            this.eventsGateway.server.emit('serviceRequestCreated', savedRequest);
            return savedRequest;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll() {
        try {
            const result = await this.db.allDocs({ include_docs: true });
            return result.rows
                .map((row: any) => row.doc)
                .filter((doc: any) => doc.type === 'service_request');
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateStatus(id: string, status: ServiceRequest['status']) {
        try {
            const request = await this.db.get<ServiceRequest>(id);
            request.status = status;
            await this.db.put(request);
            const updated = await this.db.get<ServiceRequest>(id);
            this.eventsGateway.server.emit('serviceRequestUpdated', updated);
            return updated;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
