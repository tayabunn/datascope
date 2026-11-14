import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

// ==========================================
// 1. USERS & ROLES
// ==========================================
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    role: varchar("role", { length: 64 })
      .notNull()
      .default("Data Analyst"), // "Administrator" | "Data Analyst" | "Viewer"
    avatar: text("avatar"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("idx_users_email").on(table.email),
    index("idx_users_role").on(table.role),
  ]
);

// ==========================================
// 2. DATASETS
// ==========================================
export const datasets = pgTable(
  "datasets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 100 })
      .notNull()
      .default("Enterprise"), // Finance, E-Commerce, Healthcare, Logistics, SaaS
    dataSource: varchar("data_source", { length: 150 })
      .notNull()
      .default("Enterprise Data Lake"),
    totalRecords: integer("total_records").notNull().default(0),
    accessLevel: varchar("access_level", { length: 50 })
      .notNull()
      .default("Public"), // Public, Internal, Restricted
    createdById: uuid("created_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_datasets_category").on(table.category),
    index("idx_datasets_created_at").on(table.createdAt),
  ]
);

// ==========================================
// 3. DATASET FIELDS
// ==========================================
export const datasetFields = pgTable(
  "dataset_fields",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    datasetId: uuid("dataset_id")
      .notNull()
      .references(() => datasets.id, { onDelete: "cascade" }),
    fieldName: varchar("field_name", { length: 100 }).notNull(),
    displayName: varchar("display_name", { length: 150 }).notNull(),
    dataType: varchar("data_type", { length: 50 }).notNull(), // string, number, date, boolean, enum
    isFilterable: boolean("is_filterable").notNull().default(true),
    isSortable: boolean("is_sortable").notNull().default(true),
    isSearchable: boolean("is_searchable").notNull().default(true),
    orderIndex: integer("order_index").notNull().default(0),
  },
  (table) => [
    index("idx_dataset_fields_dataset_id").on(table.datasetId),
  ]
);

// ==========================================
// 4. DATASET RECORDS (100,000+ High-Performance Rows)
// ==========================================
export const datasetRecords = pgTable(
  "dataset_records",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    datasetId: uuid("dataset_id")
      .notNull()
      .references(() => datasets.id, { onDelete: "cascade" }),
    recordCode: varchar("record_code", { length: 32 }).notNull().unique(), // e.g., REC-000001
    title: text("title").notNull(),
    companyName: text("company_name").notNull(),
    category: varchar("category", { length: 64 }).notNull(),
    status: varchar("status", { length: 32 }).notNull().default("Active"), // Active, Pending, Inactive, Archived
    country: varchar("country", { length: 64 }).notNull(),
    revenue: numeric("revenue", { precision: 14, scale: 2 }).notNull().default("0"),
    cost: numeric("cost", { precision: 14, scale: 2 }).notNull().default("0"),
    profit: numeric("profit", { precision: 14, scale: 2 }).notNull().default("0"),
    rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0.00"),
    priority: varchar("priority", { length: 16 }).notNull().default("Medium"), // Urgent, High, Medium, Low
    tags: text("tags").array(),
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("idx_records_record_code").on(table.recordCode),
    index("idx_records_dataset_id").on(table.datasetId),
    index("idx_records_status").on(table.status),
    index("idx_records_country").on(table.country),
    index("idx_records_category").on(table.category),
    index("idx_records_revenue").on(table.revenue),
    index("idx_records_created_at").on(table.createdAt),
    // Composite indexes for simultaneous filtering
    index("idx_records_status_country").on(table.status, table.country),
    index("idx_records_dataset_created").on(table.datasetId, table.createdAt),
  ]
);

// ==========================================
// 5. RECORD RELATIONSHIPS (Connected Graph)
// ==========================================
export const recordRelationships = pgTable(
  "record_relationships",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sourceRecordId: uuid("source_record_id")
      .notNull()
      .references(() => datasetRecords.id, { onDelete: "cascade" }),
    targetRecordId: uuid("target_record_id")
      .notNull()
      .references(() => datasetRecords.id, { onDelete: "cascade" }),
    relationshipType: varchar("relationship_type", { length: 64 })
      .notNull()
      .default("Associated Entity"), // Parent Account, Child Deal, Peer, Dependency
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_rel_source").on(table.sourceRecordId),
    index("idx_rel_target").on(table.targetRecordId),
  ]
);

// ==========================================
// 6. AUDIT LOGS (Historical Change Tracking)
// ==========================================
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    recordId: uuid("record_id")
      .notNull()
      .references(() => datasetRecords.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    action: varchar("action", { length: 32 }).notNull(), // CREATE, UPDATE, ARCHIVE, DELETE
    previousValues: jsonb("previous_values"),
    newValues: jsonb("new_values"),
    timestamp: timestamp("timestamp", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_audit_record_id").on(table.recordId),
    index("idx_audit_timestamp").on(table.timestamp),
  ]
);

// ==========================================
// 7. SAVED VIEWS
// ==========================================
export const savedViews = pgTable(
  "saved_views",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    datasetId: uuid("dataset_id")
      .notNull()
      .references(() => datasets.id, { onDelete: "cascade" }),
    viewName: varchar("view_name", { length: 255 }).notNull(),
    description: text("description"),
    searchConditions: jsonb("search_conditions").default(sql`'{}'::jsonb`),
    filters: jsonb("filters").default(sql`'{}'::jsonb`),
    sortingConfig: jsonb("sorting_config").default(sql`'{}'::jsonb`),
    visibleColumns: jsonb("visible_columns").default(sql`'[]'::jsonb`),
    isShared: boolean("is_shared").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_saved_views_user_id").on(table.userId),
    index("idx_saved_views_dataset_id").on(table.datasetId),
    index("idx_saved_views_is_shared").on(table.isShared),
  ]
);

// ==========================================
// 8. SEARCH HISTORY
// ==========================================
export const searchHistory = pgTable(
  "search_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    datasetId: uuid("dataset_id")
      .notNull()
      .references(() => datasets.id, { onDelete: "cascade" }),
    queryString: text("query_string").notNull().default(""),
    filterConfig: jsonb("filter_config").default(sql`'{}'::jsonb`),
    totalMatches: integer("total_matches").notNull().default(0),
    executionTimeMs: numeric("execution_time_ms", {
      precision: 8,
      scale: 2,
    }).notNull().default("0"),
    executedAt: timestamp("executed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_search_history_user_id").on(table.userId),
    index("idx_search_history_executed_at").on(table.executedAt),
  ]
);

// ==========================================
// 9. USER PREFERENCES
// ==========================================
export const userPreferences = pgTable(
  "user_preferences",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    theme: varchar("theme", { length: 16 }).notNull().default("dark"),
    pageSize: integer("page_size").notNull().default(50),
    tableDensity: varchar("table_density", { length: 16 })
      .notNull()
      .default("compact"), // compact, comfortable, spacious
    visibleColumns: jsonb("visible_columns").default(sql`'[]'::jsonb`),
    defaultDatasetId: uuid("default_dataset_id").references(() => datasets.id, {
      onDelete: "set null",
    }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("idx_user_preferences_user_id").on(table.userId),
  ]
);

// ==========================================
// 10. ACCESS PERMISSIONS
// ==========================================
export const accessPermissions = pgTable(
  "access_permissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    datasetId: uuid("dataset_id")
      .notNull()
      .references(() => datasets.id, { onDelete: "cascade" }),
    permissionLevel: varchar("permission_level", { length: 32 })
      .notNull()
      .default("read"), // "read" | "write" | "admin"
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("idx_user_dataset_perm").on(table.userId, table.datasetId),
  ]
);

// ==========================================
// RELATIONS DEFINITIONS
// ==========================================
export const usersRelations = relations(users, ({ many, one }) => ({
  datasets: many(datasets),
  savedViews: many(savedViews),
  searchHistory: many(searchHistory),
  preferences: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
  permissions: many(accessPermissions),
}));

export const datasetsRelations = relations(datasets, ({ one, many }) => ({
  creator: one(users, {
    fields: [datasets.createdById],
    references: [users.id],
  }),
  fields: many(datasetFields),
  records: many(datasetRecords),
  savedViews: many(savedViews),
  permissions: many(accessPermissions),
}));

export const datasetFieldsRelations = relations(datasetFields, ({ one }) => ({
  dataset: one(datasets, {
    fields: [datasetFields.datasetId],
    references: [datasets.id],
  }),
}));

export const datasetRecordsRelations = relations(
  datasetRecords,
  ({ one, many }) => ({
    dataset: one(datasets, {
      fields: [datasetRecords.datasetId],
      references: [datasets.id],
    }),
    auditLogs: many(auditLogs),
    outgoingRelationships: many(recordRelationships, {
      relationName: "sourceRecord",
    }),
    incomingRelationships: many(recordRelationships, {
      relationName: "targetRecord",
    }),
  })
);

export const recordRelationshipsRelations = relations(
  recordRelationships,
  ({ one }) => ({
    sourceRecord: one(datasetRecords, {
      fields: [recordRelationships.sourceRecordId],
      references: [datasetRecords.id],
      relationName: "sourceRecord",
    }),
    targetRecord: one(datasetRecords, {
      fields: [recordRelationships.targetRecordId],
      references: [datasetRecords.id],
      relationName: "targetRecord",
    }),
  })
);

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  record: one(datasetRecords, {
    fields: [auditLogs.recordId],
    references: [datasetRecords.id],
  }),
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));

export const savedViewsRelations = relations(savedViews, ({ one }) => ({
  user: one(users, {
    fields: [savedViews.userId],
    references: [users.id],
  }),
  dataset: one(datasets, {
    fields: [savedViews.datasetId],
    references: [datasets.id],
  }),
}));
