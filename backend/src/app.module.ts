import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { ChatModule } from './chat/chat.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    RoomsModule,
    BookingsModule,
    ChatModule,
    ServiceRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
