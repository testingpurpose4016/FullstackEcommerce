import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
  jsonb,
} from 'drizzle-orm/pg-core';
import { usersTable } from './usersSchema.js';
import { productsTable } from './productsSchema.js';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default('New'),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),

  paymentMethod: varchar({ length: 50 }).notNull().default('cash_on_delivery'),

  // Store delivery information as JSON
  deliveryInfo: jsonb(),
});

export const orderItemsTable = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),

  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

// Define a schema for delivery information
const deliveryInfoSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
  phone: z.string(),
  notes: z.string().optional(),
});

export const insertOrderSchema = createInsertSchema(ordersTable)
  .omit({
    id: true,
    userId: true,
    status: true,
    createdAt: true,
  })
  .extend({
    deliveryInfo: deliveryInfoSchema.optional(),
  });

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  id: true,
  orderId: true,
});

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema.optional(),
  items: z.array(insertOrderItemSchema),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
  status: true,
});
