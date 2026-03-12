import * as React from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { roomApi, bookingApi, chatApi, serviceRequestApi } from './services/api';
import { useSocket } from './hooks/useSocket';
import type { Room, ChatMessage, ServiceRequest } from './types';

// UI Components
import AnimatedLoader from './components/AnimatedLoader';
import { Notifications } from './components/ui/Notifications';

// Layout Components
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Home Sections
import { HeroSection } from './components/home/HeroSection';
import { ExperiencesSection } from './components/home/ExperiencesSection';
import { SuitesSection } from './components/home/SuitesSection';
import { DiningSection } from './components/home/DiningSection';
import { WellnessSection } from './components/home/WellnessSection';

// Modals
import { BookingModal } from './components/modals/BookingModal';
import { AddSuiteModal } from './components/modals/AddSuiteModal';
import { ConciergeBoardModal } from './components/modals/ConciergeBoardModal';

// Chat Widget
import { ChatWidget } from './components/chat/ChatWidget';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
    // State
    const [rooms, setRooms] = useState<Room[]>([]);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isServiceRequestsOpen, setIsServiceRequestsOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    // New Service Request state for guests
    const [newServiceReq, setNewServiceReq] = useState({ roomNumber: '', serviceType: 'Room Service', details: '' });

    const socket = useSocket();
    const isAdmin = window.location.search.includes('admin=true'); // Simple toggle for demo

    // Smooth Scrolling & Animations
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            gsap.from(".hero-title span", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out",
                delay: 0.5
            });
        });

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    // Initial Data Fetch
    useEffect(() => {
        fetchData().finally(() => {
            setTimeout(() => setIsLoading(false), 1500);
        });
    }, []);

    // Socket Event Listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('roomCreated', (room: Room) => {
            setRooms(prev => [...prev.filter(r => r._id !== room._id), room]);
            addNotification(`New Room added: ${room.number}`);
        });

        socket.on('roomUpdated', (updatedRoom: Room) => {
            setRooms(prev => prev.map(r => r._id === updatedRoom._id ? updatedRoom : r));
        });

        socket.on('roomDeleted', (id: string) => {
            setRooms(prev => prev.filter(r => r._id !== id));
        });

        socket.on('bookingCreated', (booking: any) => {
            addNotification(`New Booking from ${booking.guestName}`);
            fetchData();
        });

        socket.on('chatMessage', (message: ChatMessage) => {
            setMessages(prev => [...prev, message]);
            if (!isChatOpen) addNotification(`New message from ${message.sender}`);
        });

        socket.on('serviceRequestCreated', (request: ServiceRequest) => {
            setServiceRequests(prev => [request, ...prev]);
            addNotification(`Service requested for Suite ${request.roomNumber}`);
        });

        socket.on('serviceRequestUpdated', (updated: ServiceRequest) => {
            setServiceRequests(prev => prev.map(r => r._id === updated._id ? updated : r));
        });

        return () => {
            socket.off('roomCreated');
            socket.off('roomUpdated');
            socket.off('roomDeleted');
            socket.off('bookingCreated');
            socket.off('chatMessage');
            socket.off('serviceRequestCreated');
            socket.off('serviceRequestUpdated');
        };
    }, [socket, isChatOpen]);

    // Handlers
    const fetchData = async () => {
        try {
            const [roomsData, messagesData, requestsData] = await Promise.all([
                roomApi.getAll(),
                chatApi.getMessages(),
                serviceRequestApi.getAll()
            ]);
            setRooms(roomsData);
            setMessages(messagesData);
            setServiceRequests(requestsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addNotification = (msg: string) => {
        setNotifications(prev => [msg, ...prev.slice(0, 19)]);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        try {
            await chatApi.sendMessage({ sender: isAdmin ? 'Admin' : 'Guest', text: chatInput });
            setChatInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleServiceRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await serviceRequestApi.create({
                roomId: rooms[0]?._id || 'temp', // Fallback for demo
                roomNumber: newServiceReq.roomNumber,
                serviceType: newServiceReq.serviceType,
                details: newServiceReq.details
            });
            setIsServiceRequestsOpen(false);
            setNewServiceReq({ roomNumber: '', serviceType: 'Room Service', details: '' });
        } catch (error) {
            alert('Failed to submit request');
        }
    };

    const handleUpdateServiceStatus = async (id: string, status: string) => {
        try {
            await serviceRequestApi.updateStatus(id, status);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleBookRoom = async (guestName: string) => {
        if (!selectedRoom) return;
        try {
            await bookingApi.create({
                roomId: selectedRoom._id,
                guestName: guestName,
                checkIn: new Date().toISOString(),
                checkOut: new Date(Date.now() + 86400000).toISOString(),
                status: 'confirmed'
            });
            setSelectedRoom(null);
            fetchData();
        } catch (error) {
            alert('Booking failed');
        }
    };

    const handleAddRoomSave = async (roomData: Partial<Room>) => {
        try {
            await roomApi.create({
                ...roomData,
                basePrice: roomData.price, // Set basePrice for dynamic pricing
                isAvailable: true
            });
            fetchData();
            return true;
        } catch (error) {
            alert('Failed to add room');
            return false;
        }
    };

    const handleRoomSelect = (room: Room) => {
        setSelectedRoom(room);
    };

    return (
        <div className="min-h-screen bg-[--color-background] text-[#fff9f2] selection:bg-brand-primary/40 selection:text-white">
            <AnimatePresence>
                {isLoading && <AnimatedLoader />}
            </AnimatePresence>

            <AmbientBackground />
            <Navbar 
                notificationsCount={notifications.length} 
                onConciergeClick={() => setIsServiceRequestsOpen(true)} 
                onNotificationsClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            />

            <HeroSection 
                onReserveClick={() => {
                    document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' });
                }} 
            />

            <ExperiencesSection />
            <DiningSection />
            <WellnessSection />
            
            <SuitesSection 
                rooms={rooms}
                isAdmin={isAdmin}
                onAddSuiteClick={() => setIsAddRoomModalOpen(true)}
                onRoomSelect={handleRoomSelect}
            />

            <Footer />

            <Notifications 
                notifications={notifications} 
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
            />

            <ChatWidget
                isChatOpen={isChatOpen}
                setIsChatOpen={setIsChatOpen}
                chatMessages={messages}
                messageInput={chatInput}
                setMessageInput={setChatInput}
                sendMessage={handleSendMessage}
                isAdmin={isAdmin}
            />

            {/* Modals */}
            <BookingModal
                selectedRoom={selectedRoom}
                onClose={() => setSelectedRoom(null)}
                onConfirm={handleBookRoom}
            />
            
            <AddSuiteModal
                isOpen={isAddRoomModalOpen}
                onClose={() => setIsAddRoomModalOpen(false)}
                onSave={handleAddRoomSave}
            />
            
            <ConciergeBoardModal
                isOpen={isServiceRequestsOpen}
                onClose={() => setIsServiceRequestsOpen(false)}
                serviceRequests={serviceRequests}
                isAdmin={isAdmin}
                handleUpdateServiceStatus={handleUpdateServiceStatus}
                requestService={handleServiceRequest}
                newServiceReq={newServiceReq}
                setNewServiceReq={setNewServiceReq}
            />
        </div>
    );
};

export default App;
