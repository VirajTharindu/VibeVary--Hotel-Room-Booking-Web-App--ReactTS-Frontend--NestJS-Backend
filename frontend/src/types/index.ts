export interface Room {
  _id: string;
  number: string;
  type: string;
  price: number;
  basePrice?: number;
  isAvailable: boolean;
  description: string;
}

export interface ChatMessage {
  _id?: string;
  sender: string;
  text: string;
  timestamp?: string;
}

export interface ServiceRequest {
  _id: string;
  roomId: string;
  roomNumber: string;
  serviceType: string;
  details: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp?: string;
}
