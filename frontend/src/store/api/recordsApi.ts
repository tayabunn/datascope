import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RecordItem {
  id: string;
  datasetId: string;
  recordCode: string;
  title: string;
  companyName: string;
  category: string;
  status: "Active" | "Pending" | "Inactive" | "Archived";
  country: string;
  revenue: number;
  cost: number;
  profit: number;
  rating: number;
  priority: "Urgent" | "High" | "Medium" | "Low";
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface RecordsQueryParams {
  datasetId?: string;
  page?: number;
  pageSize?: number;
  q?: string;
  status?: string;
  category?: string;
  country?: string;
  minRevenue?: number | null;
  maxRevenue?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  sortField?: string;
  sortOrder?: "asc" | "desc" | string;
}

export interface RecordsApiResponse {
  success: boolean;
  data: RecordItem[];
  pagination: PaginationMeta;
  meta: {
    executionTimeMs: number;
    timestamp: string;
  };
}

export interface SingleRecordResponse {
  success: boolean;
  data: {
    record: RecordItem;
    relatedRecords: Array<{
      relationshipType: string;
      targetRecord: Partial<RecordItem>;
    }>;
    auditLogs: Array<{
      id: string;
      action: string;
      changedBy: string;
      previousValues: Record<string, unknown>;
      newValues: Record<string, unknown>;
      timestamp: string;
    }>;
  };
}

export interface SavedViewItem {
  id: string;
  viewName: string;
  description?: string;
  datasetId: string;
  datasetName: string;
  searchConditions: {
    q: string;
  };
  filters: {
    status?: string;
    category?: string;
    country?: string;
    minRevenue?: number | null;
    maxRevenue?: number | null;
    startDate?: string | null;
    endDate?: string | null;
  };
  sortingConfig: {
    field: string;
    order: string;
  };
  visibleColumns: string[];
  isShared: boolean;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchHistoryItem {
  id: string;
  queryString: string;
  datasetName: string;
  filterConfig: {
    status?: string;
    category?: string;
    country?: string;
    minRevenue?: number | null;
    maxRevenue?: number | null;
  };
  sortingConfig?: {
    field: string;
    order: string;
  };
  totalMatches: number;
  executionTimeMs: number;
  executedAt: string;
}

export interface AnalyticsApiResponse {
  success: boolean;
  data: {
    summary: {
      totalRecords: number;
      totalRevenue: number;
      avgProfitMargin: number;
      activeCount: number;
      totalSearchesExecuted?: number;
      avgQueryLatencyMs?: number;
    };
    byCategory: Array<{ category: string; count: number; revenue: number }>;
    byStatus: Array<{ status: string; count: number }>;
    growthTrends: Array<{ month: string; recordCount: number; revenue: number }>;
    searchActivity: Array<{
      time: string;
      queryCount: number;
      avgLatencyMs: number;
    }>;
    mostFrequentFilters: Array<{
      filterName: string;
      usageCount: number;
      percentage: number;
      type: "country" | "status" | "revenue" | "category" | "date";
    }>;
  };
}

export const recordsApi = createApi({
  reducerPath: "recordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.auth?.token;
      const role = state.auth?.user?.role;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (role) {
        headers.set("X-User-Role", role);
      }
      return headers;
    },
  }),
  tagTypes: ["DatasetRecords", "RecordDetail", "Analytics", "SavedViews", "SearchHistory"],
  // Retain unused data in cache for 300 seconds (5 minutes) for instant backward navigation
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getRecords: builder.query<RecordsApiResponse, RecordsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.datasetId) queryParams.set("datasetId", params.datasetId);
        if (params.page) queryParams.set("page", String(params.page));
        if (params.pageSize) queryParams.set("pageSize", String(params.pageSize));
        if (params.q) queryParams.set("q", params.q);
        if (params.status && params.status !== "all") queryParams.set("status", params.status);
        if (params.category && params.category !== "all") queryParams.set("category", params.category);
        if (params.country && params.country !== "all") queryParams.set("country", params.country);
        if (params.minRevenue != null) queryParams.set("minRevenue", String(params.minRevenue));
        if (params.maxRevenue != null) queryParams.set("maxRevenue", String(params.maxRevenue));
        if (params.startDate) queryParams.set("startDate", params.startDate);
        if (params.endDate) queryParams.set("endDate", params.endDate);
        if (params.sortField) queryParams.set("sortField", params.sortField);
        if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);

        return `/records?${queryParams.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "DatasetRecords" as const, id })),
              { type: "DatasetRecords", id: "PARTIAL-LIST" },
            ]
          : [{ type: "DatasetRecords", id: "PARTIAL-LIST" }],
    }),

    getRecordById: builder.query<SingleRecordResponse, string>({
      query: (id) => `/records/${id}`,
      providesTags: (result, error, id) => [{ type: "RecordDetail", id }],
    }),

    getAnalytics: builder.query<AnalyticsApiResponse, { datasetId?: string }>({
      query: ({ datasetId }) =>
        datasetId ? `/analytics?datasetId=${datasetId}` : `/analytics`,
      providesTags: ["Analytics"],
    }),

    getSavedViews: builder.query<
      { success: boolean; data: SavedViewItem[] },
      { datasetId?: string } | void
    >({
      query: (params) =>
        params && params.datasetId
          ? `/saved-views?datasetId=${params.datasetId}`
          : `/saved-views`,
      providesTags: ["SavedViews"],
    }),

    saveView: builder.mutation<
      { success: boolean; data: SavedViewItem; message?: string },
      Partial<SavedViewItem>
    >({
      query: (body) => ({
        url: "/saved-views",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SavedViews"],
    }),

    updateSavedView: builder.mutation<
      { success: boolean; data: SavedViewItem; message?: string },
      { id: string; view: Partial<SavedViewItem> }
    >({
      query: ({ id, view }) => ({
        url: `/saved-views/${id}`,
        method: "PUT",
        body: view,
      }),
      invalidatesTags: ["SavedViews"],
    }),

    toggleShareSavedView: builder.mutation<
      { success: boolean; data: SavedViewItem; message?: string },
      { id: string; isShared?: boolean; sharedWith?: string[] }
    >({
      query: ({ id, ...body }) => ({
        url: `/saved-views/${id}/share`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["SavedViews"],
    }),

    deleteView: builder.mutation<{ success: boolean; message?: string }, string>({
      query: (id) => ({
        url: `/saved-views/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedViews"],
    }),

    updateRecord: builder.mutation<
      { success: boolean; data: RecordItem },
      { id: string; changes: Partial<RecordItem> }
    >({
      query: ({ id, changes }) => ({
        url: `/records/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DatasetRecords", id },
        { type: "RecordDetail", id },
        "Analytics",
      ],
    }),

    getSearchHistory: builder.query<
      { success: boolean; data: SearchHistoryItem[] },
      void
    >({
      query: () => "/search-history",
      providesTags: ["SearchHistory"],
    }),

    recordSearchHistory: builder.mutation<
      { success: boolean; data?: SearchHistoryItem },
      Partial<SearchHistoryItem>
    >({
      query: (body) => ({
        url: "/search-history",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SearchHistory"],
    }),

    clearSearchHistory: builder.mutation<{ success: boolean; message?: string }, void>({
      query: () => ({
        url: "/search-history",
        method: "DELETE",
      }),
      invalidatesTags: ["SearchHistory"],
    }),

    deleteSearchHistoryItem: builder.mutation<
      { success: boolean; message?: string },
      string
    >({
      query: (id) => ({
        url: `/search-history/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SearchHistory"],
    }),
  }),
});

export const {
  useGetRecordsQuery,
  useGetRecordByIdQuery,
  useGetAnalyticsQuery,
  useGetSavedViewsQuery,
  useSaveViewMutation,
  useUpdateSavedViewMutation,
  useToggleShareSavedViewMutation,
  useDeleteViewMutation,
  useUpdateRecordMutation,
  useGetSearchHistoryQuery,
  useRecordSearchHistoryMutation,
  useClearSearchHistoryMutation,
  useDeleteSearchHistoryItemMutation,
} = recordsApi;

