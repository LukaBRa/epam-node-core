export interface PaginateOptions {
    page: number | undefined | string;
    perPage: number | undefined | string;
}

export type PaginatedResult<T> = {
    data: T[],
    metaData: {
        totalDocs: number;
        totalPages: number;
        page: number;
        perPage: number
    };
};