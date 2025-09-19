import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidV4 } from "uuid";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  originalUrl: text("original_url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  accessCount: integer("access_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
