"use client";

import { useState, useCallback } from "react";

export interface TableParams {
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: "asc" | "desc";
}

/**
 * useTableParams Hook
 * Manages pagination and sorting state for the enterprise data table
 */
export function useTableParams(initialParams: Partial<TableParams> = {}) {
  const [params, setParams] = useState<TableParams>({
    page: initialParams.page ?? 1,
    pageSize: initialParams.pageSize ?? 50,
    sortField: initialParams.sortField ?? "createdAt",
    sortOrder: initialParams.sortOrder ?? "desc",
  });

  const setPage = useCallback((newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const setPageSize = useCallback((newPageSize: number) => {
    setParams((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  }, []);

  const handleSortChange = useCallback((field: string) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      sortField: field,
      sortOrder: prev.sortField === field && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  }, []);

  return {
    params,
    setPage,
    setPageSize,
    handleSortChange,
  };
}

