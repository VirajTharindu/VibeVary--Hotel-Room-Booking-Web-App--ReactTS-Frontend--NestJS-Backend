import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post()
    sendMessage(@Body() messageDto: any) {
        return this.chatService.sendMessage(messageDto);
    }

    @Get()
    getRecentMessages() {
        return this.chatService.getRecentMessages();
    }
}
