import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const roomApi = {
    getAll: () => api.get('/rooms').then((res) => res.data),
    getOne: (id: string) => api.get(`/rooms/${id}`).then((res) => res.data),
    create: (data: any) => api.post('/rooms', data).then((res) => res.data),
    update: (id: string, data: any) => api.patch(`/rooms/${id}`, data).then((res) => res.data),
    remove: (id: string) => api.delete(`/rooms/${id}`).then((res) => res.data),
};

export const bookingApi = {
    getAll: () => api.get('/bookings').then((res) => res.data),
    getOne: (id: string) => api.get(`/bookings/${id}`).then((res) => res.data),
    create: (data: any) => api.post('/bookings', data).then((res) => res.data),
    update: (id: string, data: any) => api.patch(`/bookings/${id}`, data).then((res) => res.data),
    remove: (id: string) => api.delete(`/bookings/${id}`).then((res) => res.data),
};

export const chatApi = {
    getMessages: () => api.get('/chat').then((res) => res.data),
    sendMessage: (data: any) => api.post('/chat', data).then((res) => res.data),
};

export const serviceRequestApi = {
    getAll: () => api.get('/service-requests').then((res) => res.data),
    create: (data: any) => api.post('/service-requests', data).then((res) => res.data),
    updateStatus: (id: string, status: string) => api.patch(`/service-requests/${id}/status`, { status }).then((res) => res.data),
};

export default api;
