import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EventsGateway } from '../events/events.gateway';

export interface ChatMessage {
    _id?: string;
    _rev?: string;
    type: 'chat_message';
    sender: string;
    text: string;
    roomId?: string; // Optional if it's general concierge chat
    timestamp: string;
}

@Injectable()
export class ChatService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly eventsGateway: EventsGateway,
    ) { }

    private get db() {
        return this.databaseService.getDb();
    }

    async sendMessage(message: Omit<ChatMessage, '_id' | '_rev' | 'type' | 'timestamp'>) {
        try {
            const newMessage: ChatMessage = {
                ...message,
                type: 'chat_message',
                timestamp: new Date().toISOString(),
            };
            const response = await this.db.post(newMessage);
            const savedMessage = await this.db.get(response.id);
            this.eventsGateway.server.emit('chatMessage', savedMessage);
            return savedMessage;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getRecentMessages() {
        try {
            const result = await this.db.allDocs({ include_docs: true });
            return result.rows
                .map((row: any) => row.doc)
                .filter((doc: any) => doc.type === 'chat_message')
                .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
