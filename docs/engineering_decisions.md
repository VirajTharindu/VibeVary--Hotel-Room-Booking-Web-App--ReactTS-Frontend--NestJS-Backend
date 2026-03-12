# 🧠 Comprehensive Engineering Decisions

This document outlines the core technical architecture decisions made for the **VibeVary** project, expanding deeply upon the rationale behind our stack and structural choices.

---

## 1. Monorepo vs Multi-repo Structure

VibeVary employs a **Decoupled, full-stack monorepo, modular, feature-based pattern** approach consisting of isolated `backend` and `frontend` directories within a single master repository.

- **Reasoning**: It ensures that both the API and the Client exist in the same conceptual space, drastically easing development onboarding and ensuring synchronization of features (e.g., when adding a `basePrice` field to the backend DTO, the frontend model can be updated simultaneously in the same commit). 
- **Tooling Avoidance**: We explicitly avoided strict monorepo managers (like Nx or Turborepo) for this phase. The goal was rapid, un-obstructed development. Introducing complex workspace linking immediately would have added unnecessary CI/CD friction for an application that currently thrives on simple `npm run dev` commands in isolated folders.

---

## 2. Backend Architecture: NestJS Modular Monolith

The backend is built as a **Modular Monolith** using the NestJS framework, rather than immediately splitting into microservices.

- **Reasoning for NestJS**: NestJS forces a highly opinionated, structurally rigid architecture (Controllers, Services, Modules). In the Node.js ecosystem (where Express allows messy, unstructured "spaghetti" code), NestJS strictly enforces Separation of Concerns and Dependency Injection out of the box. This ensures enterprise-grade maintainability.
- **Reasoning for a Monolithic Approach**: For a hotel booking system of this scope, jumping straight to Microservices (e.g., separating the Booking service from the Room service from the Chat service across different ports/containers) would introduce premature complexity. This includes network latency, distributed transactions, and complex DevOps pipelines. A Modular Monolith allows us to strictly decouple domains physically (in code) while retaining a single execution context, making it trivial to slice them into microservices later if the scale demands it.

### Feature-Based Folder Structure (Backend)

In `backend/src/`, folders are grouped by **Feature** (e.g., `rooms/`, `bookings/`, `chat/`) rather than by Role (e.g., all controllers together, all services together).

- **Reasoning**: Feature-based grouping ensures extreme cohesion. If an engineer needs to modify how rooms are fetched, they navigate to the `rooms/` directory and find everything they need (the Controller, the Service, the DTOs, the interface). Using Role-based grouping would force the developer to tab between 3 different root folders to understand a single feature's lifecycle.

---

## 3. Database: PouchDB (Temporary) -> PostgreSQL (Target)

Currently, VibeVary uses **PouchDB**, a local NoSQL document store that mimics CouchDB.

- **Reasoning for PouchDB**: It allowed for incredibly rapid, zero-setup prototyping. PouchDB stores data locally in a `.pouchdb/` directory. This meant the application could be cloned and immediately run by any developer without requiring Docker containers, setting up Postgres roles, or writing Prisma schemas immediately.
- **Reasoning for PostgreSQL Transition**: A hotel booking system handles highly relational data (Users -> Bookings -> Rooms -> Transactions). NoSQL architectures are notoriously poor at enforcing complex relational schema graphs and ACID compliance across multiple related documents. PostgreSQL ensures strict relational integrity at the database level, completely preventing catastrophic business-logic failures (such as double-booking a physical room because a secondary document update failed).

---

## 4. Real-Time Concurrency: WebSocket Gateway

We utilized `Socket.IO` attached to a centralized NestJS `EventsGateway`.

- **Reasoning**: Hotel booking is a highly concurrent, "first-come, first-served" domain. If User A navigates to the "Royal Suite", and User B books it simultaneously, User A needs to see that room visually change state to "Occupied" instantly without refreshing their browser. Standard REST APIs require continuous long-polling to achieve this, straining the server. WebSockets provide a highly efficient, full-duplex communication channel, allowing the server to push state mutations immediately to all connected clients.

---

## 5. Build Tools: Vite over Webpack or CRA

The React frontend utilizes **Vite** rather than Create-React-App or an intense Webpack setup.

- **Reasoning**: Vite leverages native ES modules in the browser, providing near-instantaneous continuous HMR (Hot Module Replacement) regardless of how large the component tree grows. In a highly visual application like VibeVary, where fine-tuning CSS glows or Framer Motion physics requires hundreds of microscopic adjustments, instant visual feedback is critical to engineering velocity.
