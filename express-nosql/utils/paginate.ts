import { Document, Query } from "mongoose";
import { PaginateOptions, PaginatedResult } from "../types/PaginateTypes";

const defaultValues: PaginateOptions = {
    page: 1,
    perPage: 10,
};

export async function paginate<T extends Document>(
    query: Query<T[], T>,
    options: PaginateOptions = defaultValues
): Promise<PaginatedResult<T>> {
    let { page, perPage } = options;

    page = Number(page);
    perPage = Number(perPage);
    if (isNaN(page)) page = Number(defaultValues.page);
    if (isNaN(perPage) || perPage > 100) perPage = Number(defaultValues.perPage);

    const data = await query.skip(perPage * (page - 1)).limit(perPage);
    const totalDocs = await query.model.countDocuments();
    const totalPages = Math.ceil(totalDocs / perPage);

    return {
        data,
        metaData: {
            totalDocs,
            totalPages,
            page,
            perPage
        }
    }
}