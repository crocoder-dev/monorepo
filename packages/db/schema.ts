import {
  int,
  mysqlTable,
  serial,
  varchar,
  timestamp,
  longtext
} from 'drizzle-orm/mysql-core';

export const editions = mysqlTable('editions', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  date: timestamp('date').notNull(),
  title : varchar('title', { length: 191 }).notNull(),
});

export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
  title: varchar('title', { length: 191 }).notNull(),
  summary: longtext('summary').notNull(),
  insight: longtext('insight').notNull(),
  url: varchar('url', { length: 191 }).notNull(),
  author: varchar('author', { length: 191 }),
  organization: varchar('organization', { length: 191 }),
  editionId: int('edition_id'),
});