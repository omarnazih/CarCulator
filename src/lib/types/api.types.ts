/**
 * Common API response types for the application
 */

/**
 * Standard API response format
 */
export interface ApiResponse<T> {
    data?: T;
    error?: string | Record<string, any>;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T> {
    meta?: PaginationMeta;
}

/**
 * Standard query parameters for API requests
 */
export interface QueryParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    [key: string]: any;
} 