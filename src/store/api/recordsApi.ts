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
  sortOrder?: "asc" | "desc";
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

export interface AnalyticsApiResponse {
  success: boolean;
  data: {
    summary: {
      totalRecords: number;
      totalRevenue: number;
      avgProfitMargin: number;
      activeCount: number;
    };
    byCategory: Array<{ category: string; count: number; revenue: number }>;
    byStatus: Array<{ status: string; count: number }>;
    growthTrends: Array<{ month: string; recordCount: number; revenue: number }>;
  };
}

export const recordsApi = createApi({
  reducerPath: "recordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
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
      { success: boolean; data: any[] },
      { datasetId?: string }
    >({
      query: ({ datasetId }) =>
        datasetId ? `/saved-views?datasetId=${datasetId}` : `/saved-views`,
      providesTags: ["SavedViews"],
    }),

    saveView: builder.mutation<
      { success: boolean; data: any },
      Record<string, unknown>
    >({
      query: (body) => ({
        url: "/saved-views",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SavedViews"],
    }),

    deleteView: builder.mutation<{ success: boolean }, string>({
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

    getSearchHistory: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => "/history",
      providesTags: ["SearchHistory"],
    }),
  }),
});

export const {
  useGetRecordsQuery,
  useGetRecordByIdQuery,
  useGetAnalyticsQuery,
  useGetSavedViewsQuery,
  useSaveViewMutation,
  useDeleteViewMutation,
  useUpdateRecordMutation,
  useGetSearchHistoryQuery,
} = recordsApi;
