import { useEffect, useState } from 'react';
import { socketService } from '../services/socket';
import { Socket } from 'socket.io-client';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const s = socketService.connect();
        setSocket(s);

        return () => {
            socketService.disconnect();
        };
    }, []);

    return socket;
};
