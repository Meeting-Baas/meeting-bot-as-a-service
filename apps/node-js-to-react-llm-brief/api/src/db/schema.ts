import { sql } from "drizzle-orm";
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

import { timestamps } from "./utils";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Meeting = pgTable("meeting", {
  id: serial("id"),
  name: text("name"),
  bot_id: text("bot_id"),
  attendees: text("role")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const CreateMeetingSchema = createInsertSchema(Meeting, {
  name: z.string().max(256),
  // todo: make this longer, idk
  path: z.array(z.string()).default(["/"]),
  parentId: z.string().uuid().optional(),
}).omit({
  id: true,
  authorId: true,
  ...timestamps,
});
