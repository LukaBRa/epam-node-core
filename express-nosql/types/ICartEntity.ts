import type { IProductEntity } from "./IProductEntity";

export interface ICartItemEntity {
    product: IProductEntity,
    count: number,
}

export interface ICartEntity {
    id: string,
    items: ICartItemEntity[],
    createdAt: Date,
    updatedAt: Date,
}