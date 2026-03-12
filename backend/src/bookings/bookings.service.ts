import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EventsGateway } from '../events/events.gateway';
import { RoomsService } from '../rooms/rooms.service';

export interface Booking {
    _id?: string;
    _rev?: string;
    roomId: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    status: 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';
    type: string;
}

@Injectable()
export class BookingsService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly eventsGateway: EventsGateway,
        private readonly roomsService: RoomsService,
    ) { }

    private get db() {
        return this.databaseService.getDb();
    }

    async create(booking: Omit<Booking, '_id' | '_rev'>) {
        try {
            // Check if room exists and is available
            const room: any = await this.roomsService.findOne(booking.roomId);
            if (!room.isAvailable) {
                throw new BadRequestException('Room is not available');
            }

            const response = await this.db.post({
                ...booking,
                type: 'booking',
            });

            // Update room availability
            await this.roomsService.update(booking.roomId, { isAvailable: false });

            const newBooking = await this.findOne(response.id);
            this.eventsGateway.server.emit('bookingCreated', newBooking);
            return newBooking;
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll() {
        try {
            const result = await this.db.allDocs({ include_docs: true });
            return result.rows
                .map((row: any) => row.doc)
                .filter((doc: any) => doc.type === 'booking');
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            return await this.db.get(id);
        } catch (error) {
            if (error.status === 404) throw new NotFoundException('Booking not found');
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: string, updateBookingDto: Partial<Booking>) {
        try {
            const booking = await this.findOne(id);
            const updatedBooking = { ...booking, ...updateBookingDto };
            await this.db.put(updatedBooking);
            const result = await this.findOne(id);
            this.eventsGateway.server.emit('bookingUpdated', result);
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(id: string) {
        try {
            const booking: any = await this.findOne(id);
            // Make room available again if booking is cancelled/removed or status changes
            await this.roomsService.update(booking.roomId, { isAvailable: true });

            await this.db.remove(booking);
            this.eventsGateway.server.emit('bookingDeleted', id);
            return { deleted: true };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
