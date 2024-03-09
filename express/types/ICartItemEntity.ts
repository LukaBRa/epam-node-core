import type { IProductEntity } from "./IProductEntity";

export interface ICartItemEntity {
    product: IProductEntity,
    count: number
}