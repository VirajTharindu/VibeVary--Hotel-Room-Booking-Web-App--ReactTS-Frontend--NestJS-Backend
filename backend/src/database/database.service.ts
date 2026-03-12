import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import PouchDB from 'pouchdb';
import * as PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db: PouchDB.Database;

  async onModuleInit() {
    this.db = new PouchDB('hotel_booking_db');
    console.log('PouchDB initialized');
  }

  async onModuleDestroy() {
    await this.db.close();
  }

  getDb() {
    return this.db;
  }
}
