import {
  users,
  events,
  eventParticipants,
  eventWinners,
  type User,
  type UpsertUser,
  type Event,
  type InsertEvent,
  type EventParticipant,
  type InsertEventParticipant,
  type EventWinner,
  type InsertEventWinner,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getActiveEvents(): Promise<Event[]>;
  getScheduledEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, updates: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  
  // Event participation
  joinEvent(participation: InsertEventParticipant): Promise<EventParticipant>;
  getEventParticipants(eventId: string): Promise<EventParticipant[]>;
  
  // Rankings
  getTopPlayers(limit?: number): Promise<User[]>;
  
  // Event winners
  addEventWinner(winner: InsertEventWinner): Promise<EventWinner>;
  getEventWinners(eventId: string): Promise<EventWinner[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Event operations
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.createdAt));
  }

  async getActiveEvents(): Promise<Event[]> {
    const now = new Date();
    return await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.isActive, true),
          gte(events.endTime, now)
        )
      )
      .orderBy(events.endTime);
  }

  async getScheduledEvents(): Promise<Event[]> {
    const now = new Date();
    return await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.isActive, true),
          gte(events.startTime, now)
        )
      )
      .orderBy(events.startTime);
  }

  async getEventById(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [createdEvent] = await db.insert(events).values(event).returning();
    return createdEvent;
  }

  async updateEvent(id: string, updates: Partial<InsertEvent>): Promise<Event> {
    const [updatedEvent] = await db
      .update(events)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Event participation
  async joinEvent(participation: InsertEventParticipant): Promise<EventParticipant> {
    const [participant] = await db
      .insert(eventParticipants)
      .values(participation)
      .returning();
    return participant;
  }

  async getEventParticipants(eventId: string): Promise<EventParticipant[]> {
    return await db
      .select()
      .from(eventParticipants)
      .where(eq(eventParticipants.eventId, eventId));
  }

  // Rankings
  async getTopPlayers(limit: number = 10): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .orderBy(desc(users.totalRobuxEarned), desc(users.eventsWon))
      .limit(limit);
  }

  // Event winners
  async addEventWinner(winner: InsertEventWinner): Promise<EventWinner> {
    const [eventWinner] = await db.insert(eventWinners).values(winner).returning();
    return eventWinner;
  }

  async getEventWinners(eventId: string): Promise<EventWinner[]> {
    return await db
      .select()
      .from(eventWinners)
      .where(eq(eventWinners.eventId, eventId))
      .orderBy(eventWinners.position);
  }
}

export const storage = new DatabaseStorage();
