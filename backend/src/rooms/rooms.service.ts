import { Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EventsGateway } from '../events/events.gateway';

export interface Room {
    _id?: string;
    _rev?: string;
    number: string;
    type: string;
    price: number;
    basePrice: number; // New field for dynamic pricing
    isAvailable: boolean;
    description: string;
}

@Injectable()
export class RoomsService implements OnModuleInit {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly eventsGateway: EventsGateway,
    ) { }

    async onModuleInit() {
        const result = await this.db.allDocs({ include_docs: true });
        // Clear all existing rooms to fix the 'type' field issue
        for (const row of result.rows) {
            if (row.doc && ((row.doc as any).type === 'room' || (row.doc as any).docType === 'room')) {
                await this.db.remove(row.doc);
            }
        }

        const defaultSuites = [
            { number: '101', type: 'Deluxe Suite', price: 450, basePrice: 450, isAvailable: true, description: 'Elegant sanctuary with city views and premium sanctuary amenities.' },
            { number: '102', type: 'Deluxe Suite', price: 450, basePrice: 450, isAvailable: true, description: 'Sophisticated living space with bespoke furnishings and floor-to-ceiling vistas.' },
            { number: '201', type: 'Presidential', price: 950, basePrice: 950, isAvailable: false, description: 'Spacious high-floor suite with a private terrace and plunge pool.' },
            { number: '202', type: 'Presidential', price: 950, basePrice: 950, isAvailable: true, description: 'Ultra-modern residence featuring a private cinema and executive workspace.' },
            { number: 'PH-1', type: 'Royal Suite', price: 2500, basePrice: 2500, isAvailable: true, description: 'The pinnacle of luxury. Two bedrooms, butler service, and panoramic skyline views.' },
            { number: 'PH-2', type: 'Royal Suite', price: 2500, basePrice: 2500, isAvailable: true, description: 'Majestic duplex penthouse with a grand piano and vaulted ceilings.' },
            { number: 'PH-3', type: 'Royal Suite', price: 3000, basePrice: 3000, isAvailable: true, description: 'Exclusive top-floor sanctuary featuring an infinity pool and private helipad access.' },
            { number: 'PH-4', type: 'Presidential', price: 1500, basePrice: 1500, isAvailable: true, description: 'Sweeping ocean views from a wraparound balcony in this ultra-modern ultra-premium suite.' },
        ];
        for (const suite of defaultSuites) {
            await this.create(suite);
        }
        console.log('Successfully purged and re-seeded 8 VibeVary luxury suites into the database.');
    }

    private get db() {
        return this.databaseService.getDb();
    }

    async create(room: Omit<Room, '_id' | '_rev'>) {
        try {
            const response = await this.db.post({
                ...room,
                docType: 'room', // Using docType to avoid overwriting the 'type' property
            });
            const newRoom = await this.findOne(response.id);
            this.eventsGateway.server.emit('roomCreated', newRoom);
            return newRoom;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll() {
        try {
            const result = await this.db.allDocs({ include_docs: true });
            const allRooms = result.rows
                .map((row: any) => row.doc)
                .filter((doc: any) => doc.docType === 'room') as Room[];

            if (allRooms.length === 0) return [];

            const totalRooms = allRooms.length;
            const availableRooms = allRooms.filter(r => r.isAvailable).length;
            const occupancyRate = (totalRooms - availableRooms) / totalRooms;

            // Dynamic Pricing Logic
            let priceMultiplier = 1.0;
            if (occupancyRate > 0.8) priceMultiplier = 1.25; // Surge pricing
            else if (occupancyRate < 0.2) priceMultiplier = 0.9; // Discount pricing

            return allRooms.map(room => ({
                ...room,
                price: Math.round((room.basePrice || room.price) * priceMultiplier)
            }));
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            return await this.db.get(id);
        } catch (error) {
            if (error.status === 404) throw new NotFoundException('Room not found');
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: string, updateRoomDto: Partial<Room>) {
        try {
            const room = await this.findOne(id);
            const updatedRoom = { ...room, ...updateRoomDto };
            await this.db.put(updatedRoom);
            const result = await this.findOne(id);
            this.eventsGateway.server.emit('roomUpdated', result);
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(id: string) {
        try {
            const room = await this.findOne(id);
            await this.db.remove(room);
            this.eventsGateway.server.emit('roomDeleted', id);
            return { deleted: true };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
