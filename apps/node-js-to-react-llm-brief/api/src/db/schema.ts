import { sql } from "drizzle-orm";
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const meetingsTable = pgTable("meetings", {
  id: serial("id"),
  name: text("name"),
  bot_id: text("bot_id").notNull(),
  attendees: text("role")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
});

export type InsertMeeting = typeof meetingsTable.$inferInsert;
export type SelectMeeting = typeof meetingsTable.$inferSelect;
