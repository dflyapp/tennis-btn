import { sql } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
})
export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})
export type InsertPost = typeof postsTable.$inferInsert
export type SelectPost = typeof postsTable.$inferSelect

export const countsTable = pgTable('counts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  count: integer('count'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})
export type InsertCount = typeof countsTable.$inferInsert
export type SelectCount = typeof countsTable.$inferSelect

export const playersFemaleTable = pgTable('players_female', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone'),
  max: integer('max').notNull(),
  min: integer('min').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})
export type InsertPlayerFemale = typeof playersFemaleTable.$inferInsert
export type SelectPlayerFemale = typeof playersFemaleTable.$inferSelect

export const playersMaleTable = pgTable('players_male', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone'),
  max: integer('max').notNull(),
  min: integer('min').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})
export type InsertPlayerMale = typeof playersMaleTable.$inferInsert
export type SelectPlayerMale = typeof playersMaleTable.$inferSelect

export const playersLogTable = pgTable('players_log', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  refId: integer('ref_id').notNull(),
  isMale: boolean('is_male'),
  name: text('name').notNull(),
  max: integer('max').notNull(),
  min: integer('min').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
export type InsertLogMale = typeof playersLogTable.$inferInsert
export type SelectLogMale = typeof playersLogTable.$inferSelect
