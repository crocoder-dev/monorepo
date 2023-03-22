import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  longtext
} from 'drizzle-orm/mysql-core';

export const editions = mysqlTable('editions', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
  title: varchar('title', { length: 191 }).notNull(),
  summary: longtext('summary').notNull(),
});

export const posts = mysqlTable('users', {
});