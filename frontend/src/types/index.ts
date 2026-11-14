// ==========================================
// 1. DATASET RECORD TYPES
// ==========================================
export type RecordStatus = "Active" | "Pending" | "Inactive" | "Archived";
export type RecordPriority = "Urgent" | "High" | "Medium" | "Low";

export interface BusinessRecord {
  id: string;
  datasetId: string;
  recordCode: string;
  title: string;
  companyName: string;
  category: string;
  status: RecordStatus;
  country: string;
  revenue: number;
  cost: number;
  profit: number;
  rating: number;
  priority: RecordPriority;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface RelatedRecord {
  relationshipType: string;
  targetRecord: Partial<BusinessRecord>;
}

export interface AuditLogItem {
  id: string;
  action: string;
  changedBy: string;
  previousValues: Record<string, unknown>;
  newValues: Record<string, unknown>;
  timestamp: string;
}

// ==========================================
// 2. DATASET METADATA TYPES
// ==========================================
export interface DatasetEntity {
  id: string;
  name: string;
  description: string;
  category: string;
  dataSource: string;
  totalRecords: number;
  accessLevel: "Public" | "Internal" | "Restricted";
  createdAt: string;
  updatedAt: string;
}

export interface DatasetFieldEntity {
  id: string;
  datasetId: string;
  fieldName: string;
  displayName: string;
  dataType: "string" | "number" | "date" | "boolean" | "enum";
  isFilterable: boolean;
  isSortable: boolean;
  isSearchable: boolean;
  orderIndex: number;
}

// ==========================================
// 3. FILTER & SEARCH TYPES
// ==========================================
export type FilterOperator = "equals" | "contains" | "gt" | "lt" | "gte" | "lte" | "in" | "between";

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: string | number | string[];
}

export interface SavedViewConfig {
  id: string;
  name: string;
  description?: string;
  filters: Record<string, unknown>;
  sorting: { field: string; order: "asc" | "desc" };
  visibleColumns: string[];
  isShared: boolean;
  createdAt: string;
}

// ==========================================
// 4. USER & RBAC TYPES
// ==========================================
export type UserRole = "Administrator" | "Data Analyst" | "Viewer";

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
}

// ==========================================
// 5. API & PAGINATION TYPES
// ==========================================
export interface PaginationMetadata {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationMetadata;
  meta?: {
    executionTimeMs: number;
    engine?: string;
    timestamp: string;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

